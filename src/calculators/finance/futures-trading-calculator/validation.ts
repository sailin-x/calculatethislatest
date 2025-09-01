import { FuturesTradingInputs, FuturesTradingOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateFuturesTradingInputs(inputs: FuturesTradingInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Contract Information validation
  if (!inputs.contractName || inputs.contractName.trim().length === 0) {
    errors.contractName = 'Contract name is required';
  }

  if (!['commodity', 'financial', 'currency', 'index', 'energy'].includes(inputs.contractType)) {
    errors.contractType = 'Invalid contract type';
  }

  if (inputs.contractSize <= 0) {
    errors.contractSize = 'Contract size must be greater than 0';
  }

  if (inputs.tickSize <= 0) {
    errors.tickSize = 'Tick size must be greater than 0';
  }

  if (inputs.tickValue <= 0) {
    errors.tickValue = 'Tick value must be greater than 0';
  }

  // Trading Information validation
  if (!['long', 'short'].includes(inputs.positionType)) {
    errors.positionType = 'Invalid position type';
  }

  if (inputs.quantity <= 0) {
    errors.quantity = 'Quantity must be greater than 0';
  }

  if (inputs.entryPrice <= 0) {
    errors.entryPrice = 'Entry price must be greater than 0';
  }

  if (inputs.currentPrice <= 0) {
    errors.currentPrice = 'Current price must be greater than 0';
  }

  if (inputs.targetPrice <= 0) {
    errors.targetPrice = 'Target price must be greater than 0';
  }

  if (inputs.stopLossPrice <= 0) {
    errors.stopLossPrice = 'Stop loss price must be greater than 0';
  }

  // Account Information validation
  if (inputs.accountBalance <= 0) {
    errors.accountBalance = 'Account balance must be greater than 0';
  }

  if (inputs.initialMargin <= 0) {
    errors.initialMargin = 'Initial margin must be greater than 0';
  }

  if (inputs.maintenanceMargin <= 0) {
    errors.maintenanceMargin = 'Maintenance margin must be greater than 0';
  }

  if (inputs.leverage <= 0) {
    errors.leverage = 'Leverage must be greater than 0';
  }

  if (inputs.leverage > 1000) {
    errors.leverage = 'Leverage seems unusually high';
  }

  // Risk Management validation
  if (inputs.maxRiskPerTrade < 0 || inputs.maxRiskPerTrade > 100) {
    errors.maxRiskPerTrade = 'Maximum risk per trade must be between 0% and 100%';
  }

  if (inputs.maxDrawdown < 0 || inputs.maxDrawdown > 100) {
    errors.maxDrawdown = 'Maximum drawdown must be between 0% and 100%';
  }

  if (inputs.maxDailyLoss < 0 || inputs.maxDailyLoss > 100) {
    errors.maxDailyLoss = 'Maximum daily loss must be between 0% and 100%';
  }

  if (inputs.maxOpenPositions < 1) {
    errors.maxOpenPositions = 'Maximum open positions must be at least 1';
  }

  if (inputs.maxOpenPositions > 50) {
    errors.maxOpenPositions = 'Maximum open positions seems unusually high';
  }

  // Market Data validation
  if (inputs.volatility < 0) {
    errors.volatility = 'Volatility cannot be negative';
  }

  if (inputs.volatility > 100) {
    errors.volatility = 'Volatility seems unusually high';
  }

  if (inputs.correlation < -1 || inputs.correlation > 1) {
    errors.correlation = 'Correlation must be between -1 and 1';
  }

  if (inputs.beta < -5 || inputs.beta > 5) {
    errors.beta = 'Beta seems unusually high or low';
  }

  if (!['bullish', 'neutral', 'bearish'].includes(inputs.marketTrend)) {
    errors.marketTrend = 'Invalid market trend';
  }

  if (inputs.openInterest < 0) {
    errors.openInterest = 'Open interest cannot be negative';
  }

  if (inputs.volume < 0) {
    errors.volume = 'Volume cannot be negative';
  }

  // Technical Analysis validation
  if (!inputs.technicalIndicators || inputs.technicalIndicators.length === 0) {
    errors.technicalIndicators = 'At least one technical indicator is required';
  } else {
    inputs.technicalIndicators.forEach((indicator, index) => {
      if (!indicator.name || indicator.name.trim().length === 0) {
        errors[`technicalIndicators[${index}].name`] = 'Indicator name is required';
      }
      if (!['buy', 'sell', 'neutral'].includes(indicator.signal)) {
        errors[`technicalIndicators[${index}].signal`] = 'Invalid signal';
      }
      if (typeof indicator.value !== 'number') {
        errors[`technicalIndicators[${index}].value`] = 'Indicator value must be a number';
      }
    });
  }

  // Economic Factors validation
  if (!['positive', 'neutral', 'negative'].includes(inputs.economicOutlook)) {
    errors.economicOutlook = 'Invalid economic outlook';
  }

  if (!['stable', 'divergent', 'convergent'].includes(inputs.interestRateEnvironment)) {
    errors.interestRateEnvironment = 'Invalid interest rate environment';
  }

  if (inputs.inflationExpectation < 0 || inputs.inflationExpectation > 50) {
    errors.inflationExpectation = 'Inflation expectation must be between 0% and 50%';
  }

  // Analysis Parameters validation
  if (inputs.analysisPeriod < 1) {
    errors.analysisPeriod = 'Analysis period must be at least 1 day';
  }

  if (inputs.analysisPeriod > 365) {
    errors.analysisPeriod = 'Analysis period seems unusually long';
  }

  if (inputs.riskFreeRate < 0 || inputs.riskFreeRate > 50) {
    errors.riskFreeRate = 'Risk-free rate must be between 0% and 50%';
  }

  if (inputs.dividendYield < 0 || inputs.dividendYield > 50) {
    errors.dividendYield = 'Dividend yield must be between 0% and 50%';
  }

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  if (inputs.maintenanceMargin > inputs.initialMargin) {
    errors.maintenanceMargin = 'Maintenance margin cannot exceed initial margin';
  }

  if (inputs.stopLossPrice > inputs.entryPrice && inputs.positionType === 'long') {
    errors.stopLossPrice = 'Stop loss price must be below entry price for long positions';
  }

  if (inputs.stopLossPrice < inputs.entryPrice && inputs.positionType === 'short') {
    errors.stopLossPrice = 'Stop loss price must be above entry price for short positions';
  }

  if (inputs.targetPrice < inputs.entryPrice && inputs.positionType === 'long') {
    errors.targetPrice = 'Target price must be above entry price for long positions';
  }

  if (inputs.targetPrice > inputs.entryPrice && inputs.positionType === 'short') {
    errors.targetPrice = 'Target price must be below entry price for short positions';
  }

  // Cross-field validations
  const positionSize = inputs.quantity * inputs.contractSize;
  const marginRequired = positionSize / inputs.leverage;
  
  if (marginRequired > inputs.accountBalance) {
    errors.quantity = 'Position size exceeds available margin';
  }

  const riskAmount = inputs.accountBalance * (inputs.maxRiskPerTrade / 100);
  const potentialLoss = Math.abs(inputs.entryPrice - inputs.stopLossPrice) * inputs.quantity * inputs.contractSize;
  
  if (potentialLoss > riskAmount) {
    errors.stopLossPrice = 'Stop loss exceeds maximum risk per trade';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateFuturesTradingOutputs(outputs: FuturesTradingOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.positionSize <= 0) {
    errors.positionSize = 'Position size must be greater than 0';
  }

  if (outputs.metrics.marginUsed <= 0) {
    errors.marginUsed = 'Margin used must be greater than 0';
  }

  if (outputs.metrics.freeMargin < 0) {
    errors.freeMargin = 'Free margin cannot be negative';
  }

  if (outputs.metrics.marginLevel < 0) {
    errors.marginLevel = 'Margin level cannot be negative';
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

  if (outputs.metrics.breakEvenPrice <= 0) {
    errors.breakEvenPrice = 'Break-even price must be greater than 0';
  }

  if (outputs.metrics.daysToExpiration < 0) {
    errors.daysToExpiration = 'Days to expiration cannot be negative';
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

  if (outputs.metrics.beta < -5 || outputs.metrics.beta > 5) {
    errors.beta = 'Beta seems unusually high or low';
  }

  if (outputs.metrics.correlation < -1 || outputs.metrics.correlation > 1) {
    errors.correlation = 'Correlation must be between -1 and 1';
  }

  if (outputs.metrics.marginEfficiency < -1000 || outputs.metrics.marginEfficiency > 1000) {
    errors.marginEfficiency = 'Margin efficiency seems unusually high or low';
  }

  if (outputs.metrics.timeValue < 0) {
    errors.timeValue = 'Time value cannot be negative';
  }

  if (outputs.metrics.technicalScore < -100 || outputs.metrics.technicalScore > 100) {
    errors.technicalScore = 'Technical score must be between -100 and 100';
  }

  if (outputs.metrics.economicScore < 0 || outputs.metrics.economicScore > 100) {
    errors.economicScore = 'Economic score must be between 0 and 100';
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