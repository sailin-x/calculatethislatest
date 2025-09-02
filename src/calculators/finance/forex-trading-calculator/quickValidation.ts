import { ForexTradingInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof ForexTradingInputs, value: any, inputs: ForexTradingInputs): FieldValidationResult {
  switch (field) {
    case 'baseCurrency':
      return validateBaseCurrency(value);
    case 'quoteCurrency':
      return validateQuoteCurrency(value, inputs);
    case 'entryPrice':
      return validateEntryPrice(value);
    case 'targetPrice':
      return validateTargetPrice(value, inputs);
    case 'stopLossPrice':
      return validateStopLossPrice(value, inputs);
    case 'direction':
      return validateDirection(value);
    case 'lotSize':
      return validateLotSize(value, inputs);
    case 'accountBalance':
      return validateAccountBalance(value);
    case 'leverage':
      return validateLeverage(value);
    case 'riskPerTrade':
      return validateRiskPerTrade(value);
    case 'dailyVolatility':
      return validateDailyVolatility(value);
    case 'marketLiquidity':
      return validateMarketLiquidity(value);
    case 'marketCondition':
      return validateMarketCondition(value);
    case 'economicOutlook':
      return validateEconomicOutlook(value);
    case 'interestRateEnvironment':
      return validateInterestRateEnvironment(value);
    case 'commission':
      return validateCommission(value);
    case 'swap':
      return validateSwap(value);
    case 'holdingPeriod':
      return validateHoldingPeriod(value);
    case 'highImpactNews':
      return validateHighImpactNews(value);
    case 'maxDrawdown':
      return validateMaxDrawdown(value);
    case 'maxDailyLoss':
      return validateMaxDailyLoss(value);
    case 'maxOpenPositions':
      return validateMaxOpenPositions(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validateBaseCurrency(value: any): FieldValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Base currency is required' };
  }
  if (value.trim().length !== 3) {
    return { isValid: false, error: 'Base currency must be 3 characters' };
  }
  return { isValid: true };
}

function validateQuoteCurrency(value: any, inputs: ForexTradingInputs): FieldValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Quote currency is required' };
  }
  if (value.trim().length !== 3) {
    return { isValid: false, error: 'Quote currency must be 3 characters' };
  }
  if (inputs.baseCurrency && value === inputs.baseCurrency) {
    return { isValid: false, error: 'Base and quote currencies must be different' };
  }
  return { isValid: true };
}

function validateEntryPrice(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Entry price must be greater than 0' };
  }
  if (numValue > 1000000) {
    return { isValid: false, warning: 'Entry price seems unusually high' };
  }
  return { isValid: true };
}

function validateTargetPrice(value: any, inputs: ForexTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Target price must be greater than 0' };
  }
  
  if (inputs.entryPrice && inputs.direction) {
    if (inputs.direction === 'long' && numValue <= inputs.entryPrice) {
      return { isValid: false, error: 'Target price must be higher than entry price for long positions' };
    }
    if (inputs.direction === 'short' && numValue >= inputs.entryPrice) {
      return { isValid: false, error: 'Target price must be lower than entry price for short positions' };
    }
  }
  
  return { isValid: true };
}

function validateStopLossPrice(value: any, inputs: ForexTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Stop loss price must be greater than 0' };
  }
  
  if (inputs.entryPrice && inputs.direction) {
    if (inputs.direction === 'long' && numValue >= inputs.entryPrice) {
      return { isValid: false, error: 'Stop loss price must be lower than entry price for long positions' };
    }
    if (inputs.direction === 'short' && numValue <= inputs.entryPrice) {
      return { isValid: false, error: 'Stop loss price must be higher than entry price for short positions' };
    }
  }
  
  return { isValid: true };
}

function validateDirection(value: any): FieldValidationResult {
  const validDirections = ['long', 'short'];
  if (!validDirections.includes(value)) {
    return { isValid: false, error: 'Invalid direction' };
  }
  return { isValid: true };
}

function validateLotSize(value: any, inputs: ForexTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Lot size must be greater than 0' };
  }
  if (numValue > 100) {
    return { isValid: false, warning: 'Lot size seems unusually large' };
  }
  
  // Check margin requirements
  if (inputs.accountBalance && inputs.leverage) {
    const positionSize = numValue * 100000;
    const marginRequired = positionSize / inputs.leverage;
    if (marginRequired > inputs.accountBalance) {
      return { isValid: false, error: 'Position size exceeds available margin' };
    }
  }
  
  return { isValid: true };
}

function validateAccountBalance(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Account balance must be greater than 0' };
  }
  if (numValue > 10000000) {
    return { isValid: false, warning: 'Account balance seems unusually high' };
  }
  return { isValid: true };
}

function validateLeverage(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Leverage must be greater than 0' };
  }
  if (numValue > 1000) {
    return { isValid: false, warning: 'Leverage seems unusually high' };
  }
  return { isValid: true };
}

function validateRiskPerTrade(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Risk per trade must be between 0% and 100%' };
  }
  if (numValue > 5) {
    return { isValid: false, warning: 'Risk per trade seems high' };
  }
  return { isValid: true };
}

function validateDailyVolatility(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Daily volatility cannot be negative' };
  }
  if (numValue > 10) {
    return { isValid: false, warning: 'Daily volatility seems unusually high' };
  }
  return { isValid: true };
}

function validateMarketLiquidity(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Market liquidity must be between 1 and 10' };
  }
  if (numValue <= 3) {
    return { isValid: false, warning: 'Low market liquidity may impact trading' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any): FieldValidationResult {
  const validConditions = ['trending', 'ranging', 'volatile'];
  if (!validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid market condition' };
  }
  return { isValid: true };
}

function validateEconomicOutlook(value: any): FieldValidationResult {
  const validOutlooks = ['positive', 'neutral', 'negative'];
  if (!validOutlooks.includes(value)) {
    return { isValid: false, error: 'Invalid economic outlook' };
  }
  return { isValid: true };
}

function validateInterestRateEnvironment(value: any): FieldValidationResult {
  const validEnvironments = ['divergent', 'convergent', 'stable'];
  if (!validEnvironments.includes(value)) {
    return { isValid: false, error: 'Invalid interest rate environment' };
  }
  return { isValid: true };
}

function validateCommission(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Commission cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, warning: 'Commission seems unusually high' };
  }
  return { isValid: true };
}

function validateSwap(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Swap must be a valid number' };
  }
  if (numValue < -1000 || numValue > 1000) {
    return { isValid: false, warning: 'Swap seems unusually high or low' };
  }
  return { isValid: true };
}

function validateHoldingPeriod(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1) {
    return { isValid: false, error: 'Holding period must be at least 1 day' };
  }
  if (numValue > 365) {
    return { isValid: false, warning: 'Holding period seems unusually long' };
  }
  return { isValid: true };
}

function validateHighImpactNews(value: any): FieldValidationResult {
  const validNews = ['none', 'nfp', 'cpi', 'rate-decision', 'election', 'other'];
  if (!validNews.includes(value)) {
    return { isValid: false, error: 'Invalid high impact news type' };
  }
  return { isValid: true };
}

function validateMaxDrawdown(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Maximum drawdown must be between 0% and 100%' };
  }
  if (numValue > 20) {
    return { isValid: false, warning: 'Maximum drawdown seems high' };
  }
  return { isValid: true };
}

function validateMaxDailyLoss(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Maximum daily loss must be between 0% and 100%' };
  }
  if (numValue > 10) {
    return { isValid: false, warning: 'Maximum daily loss seems high' };
  }
  return { isValid: true };
}

function validateMaxOpenPositions(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1) {
    return { isValid: false, error: 'Maximum open positions must be at least 1' };
  }
  if (numValue > 50) {
    return { isValid: false, warning: 'Maximum open positions seems unusually high' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): FieldValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any): FieldValidationResult {
  const validFormats = ['currency', 'percentage', 'decimal'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}