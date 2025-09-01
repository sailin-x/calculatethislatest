import { StockOptionsInputs, StockOptionsOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateStockOptionsInputs(inputs: StockOptionsInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Option Details validation
  if (!['call', 'put'].includes(inputs.optionType)) {
    errors.optionType = 'Invalid option type';
  }

  if (inputs.stockPrice <= 0) {
    errors.stockPrice = 'Stock price must be greater than 0';
  }

  if (inputs.strikePrice <= 0) {
    errors.strikePrice = 'Strike price must be greater than 0';
  }

  if (inputs.timeToExpiration <= 0) {
    errors.timeToExpiration = 'Time to expiration must be greater than 0';
  }

  if (inputs.timeToExpiration > 365) {
    errors.timeToExpiration = 'Time to expiration cannot exceed 365 days';
  }

  if (inputs.volatility < 0) {
    errors.volatility = 'Volatility cannot be negative';
  }

  if (inputs.volatility > 100) {
    errors.volatility = 'Volatility seems unusually high';
  }

  if (inputs.riskFreeRate < 0 || inputs.riskFreeRate > 50) {
    errors.riskFreeRate = 'Risk-free rate must be between 0% and 50%';
  }

  if (inputs.dividendYield < 0 || inputs.dividendYield > 50) {
    errors.dividendYield = 'Dividend yield must be between 0% and 50%';
  }

  // Position Information validation
  if (inputs.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }

  if (inputs.quantity > 1000) {
    errors.quantity = 'Quantity seems unusually high';
  }

  if (inputs.premium <= 0) {
    errors.premium = 'Premium must be greater than 0';
  }

  if (inputs.premium > inputs.stockPrice) {
    errors.premium = 'Premium cannot exceed stock price';
  }

  if (inputs.currentMarketPrice < 0) {
    errors.currentMarketPrice = 'Current market price cannot be negative';
  }

  // Greeks and Risk validation
  if (inputs.delta < -1 || inputs.delta > 1) {
    errors.delta = 'Delta must be between -1 and 1';
  }

  if (inputs.gamma < 0) {
    errors.gamma = 'Gamma cannot be negative';
  }

  if (inputs.gamma > 1) {
    errors.gamma = 'Gamma seems unusually high';
  }

  if (inputs.theta < -1 || inputs.theta > 1) {
    errors.theta = 'Theta must be between -1 and 1';
  }

  if (inputs.vega < 0) {
    errors.vega = 'Vega cannot be negative';
  }

  if (inputs.vega > 1) {
    errors.vega = 'Vega seems unusually high';
  }

  if (inputs.rho < -1 || inputs.rho > 1) {
    errors.rho = 'Rho must be between -1 and 1';
  }

  // Market Conditions validation
  if (!['bullish', 'neutral', 'bearish'].includes(inputs.marketTrend)) {
    errors.marketTrend = 'Invalid market trend';
  }

  if (inputs.impliedVolatility < 0) {
    errors.impliedVolatility = 'Implied volatility cannot be negative';
  }

  if (inputs.impliedVolatility > 100) {
    errors.impliedVolatility = 'Implied volatility seems unusually high';
  }

  if (inputs.volume < 0) {
    errors.volume = 'Volume cannot be negative';
  }

  if (inputs.openInterest < 0) {
    errors.openInterest = 'Open interest cannot be negative';
  }

  // Analysis Parameters validation
  if (inputs.analysisPeriod < 1) {
    errors.analysisPeriod = 'Analysis period must be at least 1 day';
  }

  if (inputs.analysisPeriod > 365) {
    errors.analysisPeriod = 'Analysis period seems unusually long';
  }

  if (inputs.confidenceLevel < 50 || inputs.confidenceLevel > 99) {
    errors.confidenceLevel = 'Confidence level must be between 50% and 99%';
  }

  if (inputs.monteCarloSamples < 1000) {
    errors.monteCarloSamples = 'Monte Carlo samples must be at least 1,000';
  }

  if (inputs.monteCarloSamples > 100000) {
    errors.monteCarloSamples = 'Monte Carlo samples cannot exceed 100,000';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  if (inputs.stockPrice > 1000000) {
    errors.stockPrice = 'Stock price seems unusually high';
  }

  if (inputs.strikePrice > 1000000) {
    errors.strikePrice = 'Strike price seems unusually high';
  }

  // Cross-field validations
  if (inputs.optionType === 'call' && inputs.strikePrice > inputs.stockPrice * 2) {
    errors.strikePrice = 'Strike price seems unusually high for call option';
  }

  if (inputs.optionType === 'put' && inputs.strikePrice < inputs.stockPrice * 0.5) {
    errors.strikePrice = 'Strike price seems unusually low for put option';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateStockOptionsOutputs(outputs: StockOptionsOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.intrinsicValue < 0) {
    errors.intrinsicValue = 'Intrinsic value cannot be negative';
  }

  if (outputs.metrics.timeValue < 0) {
    errors.timeValue = 'Time value cannot be negative';
  }

  if (outputs.metrics.breakEvenPrice <= 0) {
    errors.breakEvenPrice = 'Break-even price must be greater than 0';
  }

  if (outputs.metrics.daysToExpiration < 0) {
    errors.daysToExpiration = 'Days to expiration cannot be negative';
  }

  if (outputs.metrics.delta < -1 || outputs.metrics.delta > 1) {
    errors.delta = 'Delta must be between -1 and 1';
  }

  if (outputs.metrics.gamma < 0) {
    errors.gamma = 'Gamma cannot be negative';
  }

  if (outputs.metrics.vega < 0) {
    errors.vega = 'Vega cannot be negative';
  }

  if (outputs.metrics.positionRisk < 0 || outputs.metrics.positionRisk > 100) {
    errors.positionRisk = 'Position risk must be between 0% and 100%';
  }

  if (outputs.metrics.accountRisk < 0 || outputs.metrics.accountRisk > 100) {
    errors.accountRisk = 'Account risk must be between 0% and 100%';
  }

  if (outputs.metrics.riskRewardRatio < 0) {
    errors.riskRewardRatio = 'Risk-reward ratio cannot be negative';
  }

  if (outputs.metrics.probabilityOfProfit < 0 || outputs.metrics.probabilityOfProfit > 1) {
    errors.probabilityOfProfit = 'Probability of profit must be between 0 and 1';
  }

  if (outputs.metrics.volatility < 0) {
    errors.volatility = 'Volatility cannot be negative';
  }

  if (outputs.metrics.dailyVolatility < 0) {
    errors.dailyVolatility = 'Daily volatility cannot be negative';
  }

  if (outputs.metrics.weeklyVolatility < 0) {
    errors.weeklyVolatility = 'Weekly volatility cannot be negative';
  }

  if (outputs.metrics.monthlyVolatility < 0) {
    errors.monthlyVolatility = 'Monthly volatility cannot be negative';
  }

  if (outputs.metrics.expectedDailyMove < 0) {
    errors.expectedDailyMove = 'Expected daily move cannot be negative';
  }

  if (outputs.metrics.expectedWeeklyMove < 0) {
    errors.expectedWeeklyMove = 'Expected weekly move cannot be negative';
  }

  // Validate trading analysis
  if (!outputs.tradingAnalysis) {
    errors.tradingAnalysis = 'Trading analysis is required';
  } else {
    if (!['buy', 'sell', 'hold'].includes(outputs.tradingAnalysis.recommendation)) {
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
    if (!['bullish', 'neutral', 'bearish'].includes(outputs.marketAnalysis.marketPosition)) {
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