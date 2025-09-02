import { FuturesTradingInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof FuturesTradingInputs, value: any, inputs: FuturesTradingInputs): FieldValidationResult {
  switch (field) {
    case 'contractName':
      return validateContractName(value);
    case 'contractType':
      return validateContractType(value);
    case 'contractSize':
      return validateContractSize(value);
    case 'tickSize':
      return validateTickSize(value);
    case 'tickValue':
      return validateTickValue(value);
    case 'positionType':
      return validatePositionType(value);
    case 'quantity':
      return validateQuantity(value, inputs);
    case 'entryPrice':
      return validateEntryPrice(value);
    case 'currentPrice':
      return validateCurrentPrice(value);
    case 'targetPrice':
      return validateTargetPrice(value, inputs);
    case 'stopLossPrice':
      return validateStopLossPrice(value, inputs);
    case 'accountBalance':
      return validateAccountBalance(value);
    case 'initialMargin':
      return validateInitialMargin(value);
    case 'maintenanceMargin':
      return validateMaintenanceMargin(value, inputs);
    case 'leverage':
      return validateLeverage(value);
    case 'maxRiskPerTrade':
      return validateMaxRiskPerTrade(value);
    case 'maxDrawdown':
      return validateMaxDrawdown(value);
    case 'maxDailyLoss':
      return validateMaxDailyLoss(value);
    case 'maxOpenPositions':
      return validateMaxOpenPositions(value);
    case 'volatility':
      return validateVolatility(value);
    case 'correlation':
      return validateCorrelation(value);
    case 'beta':
      return validateBeta(value);
    case 'marketTrend':
      return validateMarketTrend(value);
    case 'openInterest':
      return validateOpenInterest(value);
    case 'volume':
      return validateVolume(value);
    case 'economicOutlook':
      return validateEconomicOutlook(value);
    case 'interestRateEnvironment':
      return validateInterestRateEnvironment(value);
    case 'inflationExpectation':
      return validateInflationExpectation(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'riskFreeRate':
      return validateRiskFreeRate(value);
    case 'dividendYield':
      return validateDividendYield(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validateContractName(value: any): FieldValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Contract name is required' };
  }
  if (value.trim().length < 2) {
    return { isValid: false, error: 'Contract name must be at least 2 characters' };
  }
  return { isValid: true };
}

function validateContractType(value: any): FieldValidationResult {
  const validTypes = ['commodity', 'financial', 'currency', 'index', 'energy'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid contract type' };
  }
  return { isValid: true };
}

function validateContractSize(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Contract size must be greater than 0' };
  }
  return { isValid: true };
}

function validateTickSize(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Tick size must be greater than 0' };
  }
  return { isValid: true };
}

function validateTickValue(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Tick value must be greater than 0' };
  }
  return { isValid: true };
}

function validatePositionType(value: any): FieldValidationResult {
  const validTypes = ['long', 'short'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid position type' };
  }
  return { isValid: true };
}

function validateQuantity(value: any, inputs: FuturesTradingInputs): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }
  
  // Check margin requirements
  if (inputs.accountBalance && inputs.leverage && inputs.contractSize) {
    const positionSize = numValue * inputs.contractSize;
    const marginRequired = positionSize / inputs.leverage;
    if (marginRequired > inputs.accountBalance) {
      return { isValid: false, error: 'Position size exceeds available margin' };
    }
  }
  
  return { isValid: true };
}

function validateEntryPrice(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Entry price must be greater than 0' };
  }
  return { isValid: true };
}

function validateCurrentPrice(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Current price must be greater than 0' };
  }
  return { isValid: true };
}

function validateTargetPrice(value: any, inputs: FuturesTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Target price must be greater than 0' };
  }
  
  if (inputs.entryPrice && inputs.positionType) {
    if (inputs.positionType === 'long' && numValue <= inputs.entryPrice) {
      return { isValid: false, error: 'Target price must be higher than entry price for long positions' };
    }
    if (inputs.positionType === 'short' && numValue >= inputs.entryPrice) {
      return { isValid: false, error: 'Target price must be lower than entry price for short positions' };
    }
  }
  
  return { isValid: true };
}

function validateStopLossPrice(value: any, inputs: FuturesTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Stop loss price must be greater than 0' };
  }
  
  if (inputs.entryPrice && inputs.positionType) {
    if (inputs.positionType === 'long' && numValue > inputs.entryPrice) {
      return { isValid: false, error: 'Stop loss price must be below entry price for long positions' };
    }
    if (inputs.positionType === 'short' && numValue < inputs.entryPrice) {
      return { isValid: false, error: 'Stop loss price must be above entry price for short positions' };
    }
  }
  
  return { isValid: true };
}

function validateAccountBalance(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Account balance must be greater than 0' };
  }
  return { isValid: true };
}

function validateInitialMargin(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Initial margin must be greater than 0' };
  }
  return { isValid: true };
}

function validateMaintenanceMargin(value: any, inputs: FuturesTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Maintenance margin must be greater than 0' };
  }
  
  if (inputs.initialMargin && numValue > inputs.initialMargin) {
    return { isValid: false, error: 'Maintenance margin cannot exceed initial margin' };
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

function validateMaxRiskPerTrade(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Maximum risk per trade must be between 0% and 100%' };
  }
  if (numValue > 5) {
    return { isValid: false, warning: 'Maximum risk per trade seems high' };
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

function validateVolatility(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Volatility cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, warning: 'Volatility seems unusually high' };
  }
  return { isValid: true };
}

function validateCorrelation(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -1 || numValue > 1) {
    return { isValid: false, error: 'Correlation must be between -1 and 1' };
  }
  return { isValid: true };
}

function validateBeta(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -5 || numValue > 5) {
    return { isValid: false, error: 'Beta seems unusually high or low' };
  }
  return { isValid: true };
}

function validateMarketTrend(value: any): FieldValidationResult {
  const validTrends = ['bullish', 'neutral', 'bearish'];
  if (!validTrends.includes(value)) {
    return { isValid: false, error: 'Invalid market trend' };
  }
  return { isValid: true };
}

function validateOpenInterest(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Open interest cannot be negative' };
  }
  return { isValid: true };
}

function validateVolume(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Volume cannot be negative' };
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
  const validEnvironments = ['stable', 'divergent', 'convergent'];
  if (!validEnvironments.includes(value)) {
    return { isValid: false, error: 'Invalid interest rate environment' };
  }
  return { isValid: true };
}

function validateInflationExpectation(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Inflation expectation must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1) {
    return { isValid: false, error: 'Analysis period must be at least 1 day' };
  }
  if (numValue > 365) {
    return { isValid: false, warning: 'Analysis period seems unusually long' };
  }
  return { isValid: true };
}

function validateRiskFreeRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Risk-free rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateDividendYield(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Dividend yield must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateCurrency(value: any): FieldValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
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