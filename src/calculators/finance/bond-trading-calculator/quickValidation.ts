import { BondTradingInputs } from './types';

export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
  warning?: string;
}

export function validateField(field: keyof BondTradingInputs, value: any, inputs: BondTradingInputs): FieldValidationResult {
  switch (field) {
    case 'bondName':
      return validateBondName(value);
    case 'bondType':
      return validateBondType(value);
    case 'faceValue':
      return validateFaceValue(value);
    case 'couponRate':
      return validateCouponRate(value);
    case 'couponFrequency':
      return validateCouponFrequency(value);
    case 'maturityDate':
      return validateMaturityDate(value, inputs);
    case 'issueDate':
      return validateIssueDate(value, inputs);
    case 'currentPrice':
      return validateCurrentPrice(value, inputs);
    case 'yieldToMaturity':
      return validateYieldToMaturity(value);
    case 'currentYield':
      return validateCurrentYield(value);
    case 'bidPrice':
      return validateBidPrice(value, inputs);
    case 'askPrice':
      return validateAskPrice(value, inputs);
    case 'spread':
      return validateSpread(value);
    case 'quantity':
      return validateQuantity(value);
    case 'tradeType':
      return validateTradeType(value);
    case 'orderType':
      return validateOrderType(value);
    case 'commission':
      return validateCommission(value);
    case 'fees':
      return validateFees(value);
    case 'duration':
      return validateDuration(value);
    case 'modifiedDuration':
      return validateModifiedDuration(value);
    case 'convexity':
      return validateConvexity(value);
    case 'creditRating':
      return validateCreditRating(value);
    case 'creditSpread':
      return validateCreditSpread(value);
    case 'liquidityScore':
      return validateLiquidityScore(value);
    case 'benchmarkYield':
      return validateBenchmarkYield(value);
    case 'benchmarkDuration':
      return validateBenchmarkDuration(value);
    case 'marketVolatility':
      return validateMarketVolatility(value);
    case 'interestRateEnvironment':
      return validateInterestRateEnvironment(value);
    case 'economicOutlook':
      return validateEconomicOutlook(value);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value);
    case 'reinvestmentRate':
      return validateReinvestmentRate(value);
    case 'taxRate':
      return validateTaxRate(value);
    case 'inflationRate':
      return validateInflationRate(value);
    case 'currency':
      return validateCurrency(value);
    case 'displayFormat':
      return validateDisplayFormat(value);
    case 'callDate':
      return validateCallDate(value, inputs);
    case 'putDate':
      return validatePutDate(value, inputs);
    default:
      return { isValid: true };
  }
}

function validateBondName(value: any): FieldValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Bond name is required' };
  }
  if (value.trim().length < 2) {
    return { isValid: false, error: 'Bond name must be at least 2 characters' };
  }
  if (value.trim().length > 100) {
    return { isValid: false, error: 'Bond name must be less than 100 characters' };
  }
  return { isValid: true };
}

function validateBondType(value: any): FieldValidationResult {
  const validTypes = ['corporate', 'government', 'municipal', 'agency', 'international'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid bond type' };
  }
  return { isValid: true };
}

function validateFaceValue(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Face value must be greater than 0' };
  }
  if (numValue > 1000000000) {
    return { isValid: false, error: 'Face value seems unusually high' };
  }
  return { isValid: true };
}

function validateCouponRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Coupon rate must be between 0% and 50%' };
  }
  if (numValue > 20) {
    return { isValid: false, warning: 'Coupon rate seems unusually high' };
  }
  return { isValid: true };
}

function validateCouponFrequency(value: any): FieldValidationResult {
  const validFrequencies = ['annual', 'semi-annual', 'quarterly', 'monthly'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, error: 'Invalid coupon frequency' };
  }
  return { isValid: true };
}

function validateMaturityDate(value: any, inputs: BondTradingInputs): FieldValidationResult {
  if (!value) {
    return { isValid: false, error: 'Maturity date is required' };
  }
  
  const maturityDate = new Date(value);
  const today = new Date();
  
  if (maturityDate <= today) {
    return { isValid: false, error: 'Maturity date must be in the future' };
  }
  
  if (inputs.issueDate) {
    const issueDate = new Date(inputs.issueDate);
    if (maturityDate <= issueDate) {
      return { isValid: false, error: 'Maturity date must be after issue date' };
    }
  }
  
  return { isValid: true };
}

function validateIssueDate(value: any, inputs: BondTradingInputs): FieldValidationResult {
  if (!value) {
    return { isValid: true }; // Issue date is optional
  }
  
  const issueDate = new Date(value);
  const today = new Date();
  
  if (issueDate > today) {
    return { isValid: false, error: 'Issue date cannot be in the future' };
  }
  
  if (inputs.maturityDate) {
    const maturityDate = new Date(inputs.maturityDate);
    if (maturityDate <= issueDate) {
      return { isValid: false, error: 'Issue date must be before maturity date' };
    }
  }
  
  return { isValid: true };
}

function validateCurrentPrice(value: any, inputs: BondTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Current price must be greater than 0' };
  }
  
  if (inputs.faceValue) {
    if (numValue > inputs.faceValue * 2) {
      return { isValid: false, warning: 'Current price seems unusually high relative to face value' };
    }
    if (numValue < inputs.faceValue * 0.5) {
      return { isValid: false, warning: 'Current price seems unusually low relative to face value' };
    }
  }
  
  return { isValid: true };
}

function validateYieldToMaturity(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Yield to maturity must be between 0% and 50%' };
  }
  if (numValue > 20) {
    return { isValid: false, warning: 'Yield to maturity seems unusually high' };
  }
  return { isValid: true };
}

function validateCurrentYield(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Current yield must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateBidPrice(value: any, inputs: BondTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Bid price cannot be negative' };
  }
  
  if (inputs.askPrice && numValue > inputs.askPrice) {
    return { isValid: false, error: 'Bid price cannot be higher than ask price' };
  }
  
  return { isValid: true };
}

function validateAskPrice(value: any, inputs: BondTradingInputs): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Ask price cannot be negative' };
  }
  
  if (inputs.bidPrice && numValue < inputs.bidPrice) {
    return { isValid: false, error: 'Ask price cannot be lower than bid price' };
  }
  
  return { isValid: true };
}

function validateSpread(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Spread cannot be negative' };
  }
  if (numValue > 100) {
    return { isValid: false, warning: 'Spread seems unusually wide' };
  }
  return { isValid: true };
}

function validateQuantity(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }
  if (numValue > 1000000) {
    return { isValid: false, warning: 'Quantity seems unusually high' };
  }
  return { isValid: true };
}

function validateTradeType(value: any): FieldValidationResult {
  const validTypes = ['buy', 'sell', 'hold'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid trade type' };
  }
  return { isValid: true };
}

function validateOrderType(value: any): FieldValidationResult {
  const validTypes = ['market', 'limit', 'stop', 'stop-limit'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid order type' };
  }
  return { isValid: true };
}

function validateCommission(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Commission cannot be negative' };
  }
  return { isValid: true };
}

function validateFees(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Fees cannot be negative' };
  }
  return { isValid: true };
}

function validateDuration(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Duration cannot be negative' };
  }
  if (numValue > 30) {
    return { isValid: false, warning: 'Duration seems unusually long' };
  }
  return { isValid: true };
}

function validateModifiedDuration(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Modified duration cannot be negative' };
  }
  return { isValid: true };
}

function validateConvexity(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Convexity cannot be negative' };
  }
  return { isValid: true };
}

function validateCreditRating(value: any): FieldValidationResult {
  const validRatings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
  if (!validRatings.includes(value)) {
    return { isValid: false, error: 'Invalid credit rating' };
  }
  return { isValid: true };
}

function validateCreditSpread(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Credit spread cannot be negative' };
  }
  if (numValue > 1000) {
    return { isValid: false, warning: 'Credit spread seems unusually wide' };
  }
  return { isValid: true };
}

function validateLiquidityScore(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 10) {
    return { isValid: false, error: 'Liquidity score must be between 1 and 10' };
  }
  return { isValid: true };
}

function validateBenchmarkYield(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Benchmark yield must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateBenchmarkDuration(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Benchmark duration cannot be negative' };
  }
  return { isValid: true };
}

function validateMarketVolatility(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, error: 'Market volatility cannot be negative' };
  }
  if (numValue > 50) {
    return { isValid: false, warning: 'Market volatility seems unusually high' };
  }
  return { isValid: true };
}

function validateInterestRateEnvironment(value: any): FieldValidationResult {
  const validEnvironments = ['stable', 'rising', 'falling'];
  if (!validEnvironments.includes(value)) {
    return { isValid: false, error: 'Invalid interest rate environment' };
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

function validateAnalysisPeriod(value: any): FieldValidationResult {
  const numValue = parseInt(value);
  if (isNaN(numValue) || numValue < 1) {
    return { isValid: false, error: 'Analysis period must be at least 1 year' };
  }
  if (numValue > 50) {
    return { isValid: false, warning: 'Analysis period seems unusually long' };
  }
  return { isValid: true };
}

function validateReinvestmentRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Reinvestment rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

function validateTaxRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 100) {
    return { isValid: false, error: 'Tax rate must be between 0% and 100%' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any): FieldValidationResult {
  const numValue = parseFloat(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50) {
    return { isValid: false, error: 'Inflation rate must be between 0% and 50%' };
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

function validateCallDate(value: any, inputs: BondTradingInputs): FieldValidationResult {
  if (!value) {
    return { isValid: true }; // Call date is optional unless bond is callable
  }
  
  const callDate = new Date(value);
  const today = new Date();
  
  if (callDate <= today) {
    return { isValid: false, error: 'Call date must be in the future' };
  }
  
  if (inputs.maturityDate) {
    const maturityDate = new Date(inputs.maturityDate);
    if (callDate >= maturityDate) {
      return { isValid: false, error: 'Call date must be before maturity date' };
    }
  }
  
  return { isValid: true };
}

function validatePutDate(value: any, inputs: BondTradingInputs): FieldValidationResult {
  if (!value) {
    return { isValid: true }; // Put date is optional unless bond is putable
  }
  
  const putDate = new Date(value);
  const today = new Date();
  
  if (putDate <= today) {
    return { isValid: false, error: 'Put date must be in the future' };
  }
  
  if (inputs.maturityDate) {
    const maturityDate = new Date(inputs.maturityDate);
    if (putDate >= maturityDate) {
      return { isValid: false, error: 'Put date must be before maturity date' };
    }
  }
  
  return { isValid: true };
}