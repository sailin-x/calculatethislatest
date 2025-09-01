import { ForexTradingInputs, ForexTradingOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateForexTradingInputs(inputs: ForexTradingInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Currency Pair validation
  if (!inputs.baseCurrency || inputs.baseCurrency.trim().length === 0) {
    errors.baseCurrency = 'Base currency is required';
  }

  if (!inputs.quoteCurrency || inputs.quoteCurrency.trim().length === 0) {
    errors.quoteCurrency = 'Quote currency is required';
  }

  if (inputs.baseCurrency === inputs.quoteCurrency) {
    errors.quoteCurrency = 'Base and quote currencies must be different';
  }

  // Trading Information validation
  if (inputs.entryPrice <= 0) {
    errors.entryPrice = 'Entry price must be greater than 0';
  }

  if (inputs.targetPrice <= 0) {
    errors.targetPrice = 'Target price must be greater than 0';
  }

  if (inputs.stopLossPrice <= 0) {
    errors.stopLossPrice = 'Stop loss price must be greater than 0';
  }

  if (!['long', 'short'].includes(inputs.direction)) {
    errors.direction = 'Invalid direction';
  }

  if (inputs.direction === 'long') {
    if (inputs.targetPrice <= inputs.entryPrice) {
      errors.targetPrice = 'Target price must be higher than entry price for long positions';
    }
    if (inputs.stopLossPrice >= inputs.entryPrice) {
      errors.stopLossPrice = 'Stop loss price must be lower than entry price for long positions';
    }
  } else {
    if (inputs.targetPrice >= inputs.entryPrice) {
      errors.targetPrice = 'Target price must be lower than entry price for short positions';
    }
    if (inputs.stopLossPrice <= inputs.entryPrice) {
      errors.stopLossPrice = 'Stop loss price must be higher than entry price for short positions';
    }
  }

  // Position Sizing validation
  if (inputs.lotSize <= 0) {
    errors.lotSize = 'Lot size must be greater than 0';
  }

  if (inputs.lotSize > 100) {
    errors.lotSize = 'Lot size seems unusually large';
  }

  if (inputs.accountBalance <= 0) {
    errors.accountBalance = 'Account balance must be greater than 0';
  }

  if (inputs.leverage <= 0) {
    errors.leverage = 'Leverage must be greater than 0';
  }

  if (inputs.leverage > 1000) {
    errors.leverage = 'Leverage seems unusually high';
  }

  if (inputs.riskPerTrade < 0 || inputs.riskPerTrade > 100) {
    errors.riskPerTrade = 'Risk per trade must be between 0% and 100%';
  }

  // Market Data validation
  if (inputs.dailyVolatility < 0) {
    errors.dailyVolatility = 'Daily volatility cannot be negative';
  }

  if (inputs.dailyVolatility > 10) {
    errors.dailyVolatility = 'Daily volatility seems unusually high';
  }

  if (inputs.marketLiquidity < 1 || inputs.marketLiquidity > 10) {
    errors.marketLiquidity = 'Market liquidity must be between 1 and 10';
  }

  if (!['trending', 'ranging', 'volatile'].includes(inputs.marketCondition)) {
    errors.marketCondition = 'Invalid market condition';
  }

  if (!['positive', 'neutral', 'negative'].includes(inputs.economicOutlook)) {
    errors.economicOutlook = 'Invalid economic outlook';
  }

  if (!['divergent', 'convergent', 'stable'].includes(inputs.interestRateEnvironment)) {
    errors.interestRateEnvironment = 'Invalid interest rate environment';
  }

  // Trading Costs validation
  if (inputs.commission < 0) {
    errors.commission = 'Commission cannot be negative';
  }

  if (inputs.swap < -1000 || inputs.swap > 1000) {
    errors.swap = 'Swap seems unusually high or low';
  }

  if (inputs.holdingPeriod < 1) {
    errors.holdingPeriod = 'Holding period must be at least 1 day';
  }

  if (inputs.holdingPeriod > 365) {
    errors.holdingPeriod = 'Holding period seems unusually long';
  }

  // News Events validation
  if (!['none', 'nfp', 'cpi', 'rate-decision', 'election', 'other'].includes(inputs.highImpactNews)) {
    errors.highImpactNews = 'Invalid high impact news type';
  }

  // Technical Indicators validation
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
      if (indicator.value < 0) {
        errors[`technicalIndicators[${index}].value`] = 'Indicator value cannot be negative';
      }
    });
  }

  // Correlation Pairs validation
  if (inputs.correlationPairs) {
    inputs.correlationPairs.forEach((pair, index) => {
      if (!pair.pair || pair.pair.trim().length === 0) {
        errors[`correlationPairs[${index}].pair`] = 'Correlation pair is required';
      }
      if (pair.correlation < -1 || pair.correlation > 1) {
        errors[`correlationPairs[${index}].correlation`] = 'Correlation must be between -1 and 1';
      }
    });
  }

  // Risk Management validation
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

  // Reporting Preferences validation
  if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'].includes(inputs.currency)) {
    errors.currency = 'Invalid currency';
  }

  if (!['currency', 'percentage', 'decimal'].includes(inputs.displayFormat)) {
    errors.displayFormat = 'Invalid display format';
  }

  // Business logic validations
  const positionSize = inputs.lotSize * 100000;
  const marginRequired = positionSize / inputs.leverage;
  
  if (marginRequired > inputs.accountBalance) {
    errors.lotSize = 'Position size exceeds available margin';
  }

  const riskAmount = inputs.accountBalance * (inputs.riskPerTrade / 100);
  const potentialLoss = Math.abs(inputs.entryPrice - inputs.stopLossPrice) * inputs.lotSize * 100000;
  
  if (potentialLoss > riskAmount) {
    errors.stopLossPrice = 'Stop loss exceeds maximum risk per trade';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateForexTradingOutputs(outputs: ForexTradingOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate metrics
  if (outputs.metrics.positionSize <= 0) {
    errors.positionSize = 'Position size must be greater than 0';
  }

  if (outputs.metrics.leverageRatio < 0) {
    errors.leverageRatio = 'Leverage ratio cannot be negative';
  }

  if (outputs.metrics.marginRequired <= 0) {
    errors.marginRequired = 'Margin required must be greater than 0';
  }

  if (outputs.metrics.freeMargin < 0) {
    errors.freeMargin = 'Free margin cannot be negative';
  }

  if (outputs.metrics.marginLevel < 0) {
    errors.marginLevel = 'Margin level cannot be negative';
  }

  if (outputs.metrics.pipValue <= 0) {
    errors.pipValue = 'Pip value must be greater than 0';
  }

  if (outputs.metrics.riskRewardRatio < 0) {
    errors.riskRewardRatio = 'Risk-reward ratio cannot be negative';
  }

  if (outputs.metrics.positionRisk < 0 || outputs.metrics.positionRisk > 100) {
    errors.positionRisk = 'Position risk must be between 0% and 100%';
  }

  if (outputs.metrics.accountRisk < 0 || outputs.metrics.accountRisk > 100) {
    errors.accountRisk = 'Account risk must be between 0% and 100%';
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

  if (outputs.metrics.probabilityOfProfit < 0 || outputs.metrics.probabilityOfProfit > 1) {
    errors.probabilityOfProfit = 'Probability of profit must be between 0 and 1';
  }

  if (outputs.metrics.probabilityOfStopLoss < 0 || outputs.metrics.probabilityOfStopLoss > 1) {
    errors.probabilityOfStopLoss = 'Probability of stop loss must be between 0 and 1';
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