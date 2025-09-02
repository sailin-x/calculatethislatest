import { StockOptionsInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof StockOptionsInputs, value: any, inputs: StockOptionsInputs): FieldValidationResult {
  switch (field) {
    case 'optionType':
      return validateOptionType(value);
    case 'stockPrice':
      return validateStockPrice(value);
    case 'strikePrice':
      return validateStrikePrice(value, inputs);
    case 'timeToExpiration':
      return validateTimeToExpiration(value);
    case 'volatility':
      return validateVolatility(value);
    case 'riskFreeRate':
      return validateRiskFreeRate(value);
    case 'dividendYield':
      return validateDividendYield(value);
    case 'quantity':
      return validateQuantity(value);
    case 'premium':
      return validatePremium(value, inputs);
    case 'currentMarketPrice':
      return validateCurrentMarketPrice(value);
    case 'delta':
      return validateDelta(value);
    case 'gamma':
      return validateGamma(value);
    case 'theta':
      return validateTheta(value);
    case 'vega':
      return validateVega(value);
    case 'rho':
      return validateRho(value);
    case 'marketTrend':
      return validateMarketTrend(value);
    case 'impliedVolatility':
      return validateImpliedVolatility(value);
    case 'volume':
      return validateVolume(value);
    case 'openInterest':
      return validateOpenInterest(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'confidenceLevel':
      return validateConfidenceLevel(value);
    case 'monteCarloSamples':
      return validateMonteCarloSamples(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    default:
      return { isValid: true };
  }
}

function validateOptionType(value: any): FieldValidationResult {
  const validTypes = ['call', 'put'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid option type' };
  }
  return { isValid: true };
}

function validateStockPrice(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Stock price must be greater than 0' };
  }
  if (numValue > 1000000) {
    return { isValid: false, warning: 'Stock price seems unusually high' };
  }
  return { isValid: true };
}

function validateStrikePrice(value: any, inputs: StockOptionsInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Strike price must be greater than 0' };
  }
  if (numValue > 1000000) {
    return { isValid: false, warning: 'Strike price seems unusually high' };
  }

  // Cross-field validation with stock price
  if (inputs.stockPrice) {
    if (inputs.optionType === 'call' && numValue > inputs.stockPrice * 2) {
      return { isValid: false, warning: 'Strike price seems unusually high for call option' };
    }
    if (inputs.optionType === 'put' && numValue < inputs.stockPrice * 0.5) {
      return { isValid: false, warning: 'Strike price seems unusually low for put option' };
    }
  }

  return { isValid: true };
}

function validateTimeToExpiration(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Time to expiration must be greater than 0' };
  }
  if (numValue > 365) {
    return { isValid: false, error: 'Time to expiration cannot exceed 365 days' };
  }
  if (numValue < 7) {
    return { isValid: false, warning: 'Near expiration increases time decay risk' };
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
  if (numValue > 50) {
    return { isValid: false, warning: 'High volatility increases risk' };
  }
  return { isValid: true };
}

function validateRiskFreeRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Risk-free rate must be between 0% and 50%' };
  }
  if (numValue > 20) {
    return { isValid: false, warning: 'Risk-free rate seems unusually high' };
  }
  return { isValid: true };
}

function validateDividendYield(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Dividend yield must be between 0% and 50%' };
  }
  if (numValue > 20) {
    return { isValid: false, warning: 'Dividend yield seems unusually high' };
  }
  return { isValid: true };
}

function validateQuantity(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }
  if (numValue > 1000) {
    return { isValid: false, warning: 'Quantity seems unusually high' };
  }
  return { isValid: true };
}

function validatePremium(value: any, inputs: StockOptionsInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Premium must be greater than 0' };
  }

  // Cross-field validation with stock price
  if (inputs.stockPrice && numValue > inputs.stockPrice) {
    return { isValid: false, error: 'Premium cannot exceed stock price' };
  }

  return { isValid: true };
}

function validateCurrentMarketPrice(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Current market price cannot be negative' };
  }
  return { isValid: true };
}

function validateDelta(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -1 || numValue > 1) {
    return { isValid: false, error: 'Delta must be between -1 and 1' };
  }
  if (Math.abs(numValue) > 0.8) {
    return { isValid: false, warning: 'High delta indicates strong directional exposure' };
  }
  return { isValid: true };
}

function validateGamma(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Gamma cannot be negative' };
  }
  if (numValue > 1) {
    return { isValid: false, warning: 'Gamma seems unusually high' };
  }
  if (numValue > 0.05) {
    return { isValid: false, warning: 'High gamma indicates rapid delta changes' };
  }
  return { isValid: true };
}

function validateTheta(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -1 || numValue > 1) {
    return { isValid: false, error: 'Theta must be between -1 and 1' };
  }
  if (Math.abs(numValue) > 0.1) {
    return { isValid: false, warning: 'High theta indicates rapid time decay' };
  }
  return { isValid: true };
}

function validateVega(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Vega cannot be negative' };
  }
  if (numValue > 1) {
    return { isValid: false, warning: 'Vega seems unusually high' };
  }
  if (numValue > 0.2) {
    return { isValid: false, warning: 'High vega indicates volatility sensitivity' };
  }
  return { isValid: true };
}

function validateRho(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < -1 || numValue > 1) {
    return { isValid: false, error: 'Rho must be between -1 and 1' };
  }
  if (Math.abs(numValue) > 0.1) {
    return { isValid: false, warning: 'High rho indicates interest rate sensitivity' };
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

function validateImpliedVolatility(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Implied volatility cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, warning: 'Implied volatility seems unusually high' };
  }
  return { isValid: true };
}

function validateVolume(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Volume cannot be negative' };
  }
  if (numValue < 100) {
    return { isValid: false, warning: 'Low volume may impact trading' };
  }
  return { isValid: true };
}

function validateOpenInterest(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Open interest cannot be negative' };
  }
  if (numValue < 100) {
    return { isValid: false, warning: 'Low open interest may impact liquidity' };
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

function validateConfidenceLevel(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 50 || numValue > 99) {
    return { isValid: false, error: 'Confidence level must be between 50% and 99%' };
  }
  if (numValue < 70) {
    return { isValid: false, warning: 'Low confidence level may indicate uncertainty' };
  }
  return { isValid: true };
}

function validateMonteCarloSamples(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1000) {
    return { isValid: false, error: 'Monte Carlo samples must be at least 1,000' };
  }
  if (numValue > 100000) {
    return { isValid: false, warning: 'Monte Carlo samples cannot exceed 100,000' };
  }
  if (numValue < 5000) {
    return { isValid: false, warning: 'Low sample count may reduce accuracy' };
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