import { BondTradingInputs, BondTradingOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateBondTradingInputs(inputs: BondTradingInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Bond Information validation
  if (!inputs.bondName || inputs.bondName.trim().length === 0) {
    errors.bondName = 'Bond name is required';
  }

  if (!['corporate', 'government', 'municipal', 'agency', 'international'].includes(inputs.bondType)) {
    errors.bondType = 'Invalid bond type';
  }

  if (inputs.faceValue <= 0) {
    errors.faceValue = 'Face value must be greater than 0';
  }

  if (inputs.couponRate < 0 || inputs.couponRate > 50) {
    errors.couponRate = 'Coupon rate must be between 0% and 50%';
  }

  if (!['annual', 'semi-annual', 'quarterly', 'monthly'].includes(inputs.couponFrequency)) {
    errors.couponFrequency = 'Invalid coupon frequency';
  }

  if (!inputs.maturityDate) {
    errors.maturityDate = 'Maturity date is required';
  }

  if (inputs.issueDate && inputs.maturityDate) {
    const issueDate = new Date(inputs.issueDate);
    const maturityDate = new Date(inputs.maturityDate);
    if (maturityDate <= issueDate) {
      errors.maturityDate = 'Maturity date must be after issue date';
    }
  }

  // Market Information validation
  if (inputs.currentPrice <= 0) {
    errors.currentPrice = 'Current price must be greater than 0';
  }

  if (inputs.yieldToMaturity < 0 || inputs.yieldToMaturity > 50) {
    errors.yieldToMaturity = 'Yield to maturity must be between 0% and 50%';
  }

  if (inputs.currentYield < 0 || inputs.currentYield > 50) {
    errors.currentYield = 'Current yield must be between 0% and 50%';
  }

  if (inputs.bidPrice < 0) {
    errors.bidPrice = 'Bid price cannot be negative';
  }

  if (inputs.askPrice < 0) {
    errors.askPrice = 'Ask price cannot be negative';
  }

  if (inputs.bidPrice > inputs.askPrice) {
    errors.bidPrice = 'Bid price cannot be higher than ask price';
  }

  if (inputs.spread < 0) {
    errors.spread = 'Spread cannot be negative';
  }

  // Trading Information validation
  if (inputs.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }

  if (!['buy', 'sell', 'hold'].includes(inputs.tradeType)) {
    errors.tradeType = 'Invalid trade type';
  }

  if (!['market', 'limit', 'stop', 'stop-limit'].includes(inputs.orderType)) {
    errors.orderType = 'Invalid order type';
  }

  if (inputs.commission < 0) {
    errors.commission = 'Commission cannot be negative';
  }

  if (inputs.fees < 0) {
    errors.fees = 'Fees cannot be negative';
  }

  // Risk Metrics validation
  if (inputs.duration < 0) {
    errors.duration = 'Duration cannot be negative';
  }

  if (inputs.modifiedDuration < 0) {
    errors.modifiedDuration = 'Modified duration cannot be negative';
  }

  if (inputs.convexity < 0) {
    errors.convexity = 'Convexity cannot be negative';
  }

  if (!['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'].includes(inputs.creditRating)) {
    errors.creditRating = 'Invalid credit rating';
  }

  if (inputs.creditSpread < 0) {
    errors.creditSpread = 'Credit spread cannot be negative';
  }

  if (inputs.liquidityScore < 1 || inputs.liquidityScore > 10) {
    errors.liquidityScore = 'Liquidity score must be between 1 and 10';
  }

  // Market Data validation
  if (inputs.benchmarkYield < 0 || inputs.benchmarkYield > 50) {
    errors.benchmarkYield = 'Benchmark yield must be between 0% and 50%';
  }

  if (inputs.benchmarkDuration < 0) {
    errors.benchmarkDuration = 'Benchmark duration cannot be negative';
  }

  if (inputs.marketVolatility < 0) {
    errors.marketVolatility = 'Market volatility cannot be negative';
  }

  if (!['stable', 'rising', 'falling'].includes(inputs.interestRateEnvironment)) {
    errors.interestRateEnvironment = 'Invalid interest rate environment';
  }

  if (!['positive', 'neutral', 'negative'].includes(inputs.economicOutlook)) {
    errors.economicOutlook = 'Invalid economic outlook';
  }

  // Analysis Parameters validation
  if (inputs.analysisPeriod < 1) {
    errors.analysisPeriod = 'Analysis period must be at least 1 year';
  }

  if (inputs.reinvestmentRate < 0 || inputs.reinvestmentRate > 50) {
    errors.reinvestmentRate = 'Reinvestment rate must be between 0% and 50%';
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 100) {
    errors.taxRate = 'Tax rate must be between 0% and 100%';
  }

  if (inputs.inflationRate < 0 || inputs.inflationRate > 50) {
    errors.inflationRate = 'Inflation rate must be between 0% and 50%';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  if (inputs.callable && !inputs.callDate) {
    errors.callDate = 'Call date is required for callable bonds';
  }

  if (inputs.putable && !inputs.putDate) {
    errors.putDate = 'Put date is required for putable bonds';
  }

  if (inputs.callDate && inputs.maturityDate) {
    const callDate = new Date(inputs.callDate);
    const maturityDate = new Date(inputs.maturityDate);
    if (callDate >= maturityDate) {
      errors.callDate = 'Call date must be before maturity date';
    }
  }

  if (inputs.putDate && inputs.maturityDate) {
    const putDate = new Date(inputs.putDate);
    const maturityDate = new Date(inputs.maturityDate);
    if (putDate >= maturityDate) {
      errors.putDate = 'Put date must be before maturity date';
    }
  }

  // Cross-field validations
  if (inputs.currentPrice > inputs.faceValue * 2) {
    errors.currentPrice = 'Current price seems unusually high relative to face value';
  }

  if (inputs.currentPrice < inputs.faceValue * 0.5) {
    errors.currentPrice = 'Current price seems unusually low relative to face value';
  }

  if (inputs.yieldToMaturity > inputs.currentYield + 10) {
    errors.yieldToMaturity = 'Yield to maturity seems unusually high relative to current yield';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateBondTradingOutputs(outputs: BondTradingOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.cleanPrice <= 0) {
    errors.cleanPrice = 'Clean price must be greater than 0';
  }

  if (outputs.metrics.dirtyPrice <= 0) {
    errors.dirtyPrice = 'Dirty price must be greater than 0';
  }

  if (outputs.metrics.accruedInterest < 0) {
    errors.accruedInterest = 'Accrued interest cannot be negative';
  }

  if (outputs.metrics.yieldToMaturity < 0 || outputs.metrics.yieldToMaturity > 50) {
    errors.yieldToMaturity = 'Yield to maturity must be between 0% and 50%';
  }

  if (outputs.metrics.currentYield < 0 || outputs.metrics.currentYield > 50) {
    errors.currentYield = 'Current yield must be between 0% and 50%';
  }

  if (outputs.metrics.yieldToCall < 0) {
    errors.yieldToCall = 'Yield to call cannot be negative';
  }

  if (outputs.metrics.yieldToPut < 0) {
    errors.yieldToPut = 'Yield to put cannot be negative';
  }

  if (outputs.metrics.duration < 0) {
    errors.duration = 'Duration cannot be negative';
  }

  if (outputs.metrics.modifiedDuration < 0) {
    errors.modifiedDuration = 'Modified duration cannot be negative';
  }

  if (outputs.metrics.convexity < 0) {
    errors.convexity = 'Convexity cannot be negative';
  }

  if (outputs.metrics.creditSpread < 0) {
    errors.creditSpread = 'Credit spread cannot be negative';
  }

  if (outputs.metrics.liquidityScore < 1 || outputs.metrics.liquidityScore > 10) {
    errors.liquidityScore = 'Liquidity score must be between 1 and 10';
  }

  if (outputs.metrics.totalCost <= 0) {
    errors.totalCost = 'Total cost must be greater than 0';
  }

  if (outputs.metrics.marketValue <= 0) {
    errors.marketValue = 'Market value must be greater than 0';
  }

  if (outputs.metrics.annualIncome < 0) {
    errors.annualIncome = 'Annual income cannot be negative';
  }

  if (outputs.metrics.couponPayment < 0) {
    errors.couponPayment = 'Coupon payment cannot be negative';
  }

  // Validate trading analysis
  if (!outputs.tradingAnalysis) {
    errors.tradingAnalysis = 'Trading analysis is required';
  } else {
    if (!['buy', 'hold', 'sell'].includes(outputs.tradingAnalysis.recommendation)) {
      errors.recommendation = 'Invalid recommendation';
    }
    if (outputs.tradingAnalysis.confidenceLevel < 1 || outputs.tradingAnalysis.confidenceLevel > 10) {
      errors.confidenceLevel = 'Confidence level must be between 1 and 10';
    }
    if (!outputs.tradingAnalysis.keyFactors || outputs.tradingAnalysis.keyFactors.length === 0) {
      errors.keyFactors = 'Key factors are required';
    }
    if (!outputs.tradingAnalysis.risks || outputs.tradingAnalysis.risks.length === 0) {
      errors.risks = 'Risks are required';
    }
    if (!outputs.tradingAnalysis.opportunities || outputs.tradingAnalysis.opportunities.length === 0) {
      errors.opportunities = 'Opportunities are required';
    }
  }

  // Validate market analysis
  if (!outputs.marketAnalysis) {
    errors.marketAnalysis = 'Market analysis is required';
  } else {
    if (!['undervalued', 'fair-value', 'overvalued'].includes(outputs.marketAnalysis.marketPosition)) {
      errors.marketPosition = 'Invalid market position';
    }
    if (!['low', 'medium', 'high'].includes(outputs.marketAnalysis.marketRisk)) {
      errors.marketRisk = 'Invalid market risk';
    }
    if (!outputs.marketAnalysis.marketFactors || outputs.marketAnalysis.marketFactors.length === 0) {
      errors.marketFactors = 'Market factors are required';
    }
    if (!outputs.marketAnalysis.marketOutlook || outputs.marketAnalysis.marketOutlook.length === 0) {
      errors.marketOutlook = 'Market outlook is required';
    }
  }

  // Validate trading strategies
  if (!outputs.tradingStrategies || outputs.tradingStrategies.length === 0) {
    errors.tradingStrategies = 'Trading strategies are required';
  } else {
    outputs.tradingStrategies.forEach((strategy, index) => {
      if (!strategy.name || strategy.name.trim().length === 0) {
        errors[`tradingStrategies[${index}].name`] = 'Strategy name is required';
      }
      if (strategy.entryPrice <= 0) {
        errors[`tradingStrategies[${index}].entryPrice`] = 'Entry price must be greater than 0';
      }
      if (strategy.exitPrice <= 0) {
        errors[`tradingStrategies[${index}].exitPrice`] = 'Exit price must be greater than 0';
      }
      if (!['low', 'medium', 'high'].includes(strategy.riskLevel)) {
        errors[`tradingStrategies[${index}].riskLevel`] = 'Invalid risk level';
      }
      if (!strategy.timeHorizon || strategy.timeHorizon.trim().length === 0) {
        errors[`tradingStrategies[${index}].timeHorizon`] = 'Time horizon is required';
      }
      if (!strategy.description || strategy.description.trim().length === 0) {
        errors[`tradingStrategies[${index}].description`] = 'Description is required';
      }
    });
  }

  // Validate risk metrics
  if (!outputs.riskMetrics || outputs.riskMetrics.length === 0) {
    errors.riskMetrics = 'Risk metrics are required';
  } else {
    outputs.riskMetrics.forEach((metric, index) => {
      if (!metric.name || metric.name.trim().length === 0) {
        errors[`riskMetrics[${index}].name`] = 'Risk metric name is required';
      }
      if (typeof metric.value !== 'number') {
        errors[`riskMetrics[${index}].value`] = 'Risk metric value must be a number';
      }
      if (!metric.description || metric.description.trim().length === 0) {
        errors[`riskMetrics[${index}].description`] = 'Risk metric description is required';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}