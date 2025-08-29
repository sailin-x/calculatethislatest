import { MortgageRateLockInputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateField(field: keyof MortgageRateLockInputs, value: any, allInputs?: Record<string, any>): ValidationResult {
  switch (field) {
    case 'loanAmount':
      return validateLoanAmount(value, allInputs);
    case 'lockedRate':
      return validateLockedRate(value, allInputs);
    case 'currentMarketRate':
      return validateCurrentMarketRate(value, allInputs);
    case 'loanTerm':
      return validateLoanTerm(value, allInputs);
    case 'loanType':
      return validateLoanType(value, allInputs);
    case 'paymentType':
      return validatePaymentType(value, allInputs);
    case 'lockDate':
      return validateLockDate(value, allInputs);
    case 'lockExpirationDate':
      return validateLockExpirationDate(value, allInputs);
    case 'lockDuration':
      return validateLockDuration(value, allInputs);
    case 'lockType':
      return validateLockType(value, allInputs);
    case 'lockFee':
      return validateLockFee(value, allInputs);
    case 'lockFeeType':
      return validateLockFeeType(value, allInputs);
    case 'propertyValue':
      return validatePropertyValue(value, allInputs);
    case 'propertyAddress':
      return validatePropertyAddress(value, allInputs);
    case 'propertyType':
      return validatePropertyType(value, allInputs);
    case 'propertySize':
      return validatePropertySize(value, allInputs);
    case 'propertyAge':
      return validatePropertyAge(value, allInputs);
    case 'estimatedClosingDate':
      return validateEstimatedClosingDate(value, allInputs);
    case 'actualClosingDate':
      return validateActualClosingDate(value, allInputs);
    case 'closingDelay':
      return validateClosingDelay(value, allInputs);
    case 'extensionFee':
      return validateExtensionFee(value, allInputs);
    case 'extensionFeeType':
      return validateExtensionFeeType(value, allInputs);
    case 'marketLocation':
      return validateMarketLocation(value, allInputs);
    case 'marketCondition':
      return validateMarketCondition(value, allInputs);
    case 'marketVolatility':
      return validateMarketVolatility(value, allInputs);
    case 'rateTrend':
      return validateRateTrend(value, allInputs);
    case 'rateForecast':
      return validateRateForecast(value, allInputs);
    case 'borrowerIncome':
      return validateBorrowerIncome(value, allInputs);
    case 'borrowerCreditScore':
      return validateBorrowerCreditScore(value, allInputs);
    case 'borrowerDebtToIncomeRatio':
      return validateBorrowerDebtToIncomeRatio(value, allInputs);
    case 'borrowerEmploymentType':
      return validateBorrowerEmploymentType(value, allInputs);
    case 'analysisPeriod':
      return validateAnalysisPeriod(value, allInputs);
    case 'inflationRate':
      return validateInflationRate(value, allInputs);
    case 'propertyAppreciationRate':
      return validatePropertyAppreciationRate(value, allInputs);
    case 'discountRate':
      return validateDiscountRate(value, allInputs);
    case 'riskTolerance':
      return validateRiskTolerance(value, allInputs);
    case 'maxRateIncrease':
      return validateMaxRateIncrease(value, allInputs);
    case 'minRateDecrease':
      return validateMinRateDecrease(value, allInputs);
    case 'currency':
      return validateCurrency(value, allInputs);
    case 'displayFormat':
      return validateDisplayFormat(value, allInputs);
    case 'includeCharts':
      return validateIncludeCharts(value, allInputs);
    default:
      return { isValid: true };
  }
}

function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Loan amount cannot exceed $10,000,000' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, error: 'Loan amount cannot exceed property value' };
  }
  return { isValid: true };
}

function validateLockedRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Locked rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Locked rate cannot exceed 25%' };
  }
  if (allInputs?.currentMarketRate && Math.abs(value - allInputs.currentMarketRate) > 5) {
    return { isValid: false, error: 'Locked rate should be within 5% of current market rate' };
  }
  return { isValid: true };
}

function validateCurrentMarketRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Current market rate must be greater than 0' };
  }
  if (value > 25) {
    return { isValid: false, error: 'Current market rate cannot exceed 25%' };
  }
  return { isValid: true };
}

function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Loan term must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo', 'hard_money', 'private'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid loan type' };
  }
  return { isValid: true };
}

function validatePaymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['principal_interest', 'interest_only', 'balloon', 'arm'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid payment type' };
  }
  return { isValid: true };
}

function validateLockDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Lock date is required' };
  }
  const lockDate = new Date(value);
  if (isNaN(lockDate.getTime())) {
    return { isValid: false, error: 'Invalid lock date format' };
  }
  if (allInputs?.lockExpirationDate) {
    const expirationDate = new Date(allInputs.lockExpirationDate);
    if (expirationDate <= lockDate) {
      return { isValid: false, error: 'Lock expiration date must be after lock date' };
    }
  }
  return { isValid: true };
}

function validateLockExpirationDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Lock expiration date is required' };
  }
  const expirationDate = new Date(value);
  if (isNaN(expirationDate.getTime())) {
    return { isValid: false, error: 'Invalid expiration date format' };
  }
  if (allInputs?.lockDate) {
    const lockDate = new Date(allInputs.lockDate);
    if (expirationDate <= lockDate) {
      return { isValid: false, error: 'Lock expiration date must be after lock date' };
    }
  }
  return { isValid: true };
}

function validateLockDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Lock duration must be greater than 0' };
  }
  if (value > 365) {
    return { isValid: false, error: 'Lock duration cannot exceed 365 days' };
  }
  return { isValid: true };
}

function validateLockType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['free', 'paid', 'float_down', 'extended'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid lock type' };
  }
  return { isValid: true };
}

function validateLockFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Lock fee cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Lock fee cannot exceed $10,000' };
  }
  if (allInputs?.lockFeeType === 'percentage' && value > 5) {
    return { isValid: false, error: 'Lock fee percentage should not exceed 5%' };
  }
  return { isValid: true };
}

function validateLockFeeType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['percentage', 'fixed', 'none'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid lock fee type' };
  }
  return { isValid: true };
}

function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Property value must be greater than 0' };
  }
  if (value > 50000000) {
    return { isValid: false, error: 'Property value cannot exceed $50,000,000' };
  }
  return { isValid: true };
}

function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Property address must be a non-empty string' };
  }
  return { isValid: true };
}

function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid property type' };
  }
  return { isValid: true };
}

function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property size cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, error: 'Property size cannot exceed 100,000 sq ft' };
  }
  return { isValid: true };
}

function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Property age cannot be negative' };
  }
  if (value > 200) {
    return { isValid: false, error: 'Property age cannot exceed 200 years' };
  }
  return { isValid: true };
}

function validateEstimatedClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, error: 'Estimated closing date is required' };
  }
  const estimatedClosing = new Date(value);
  if (isNaN(estimatedClosing.getTime())) {
    return { isValid: false, error: 'Invalid estimated closing date format' };
  }
  if (allInputs?.lockExpirationDate) {
    const expirationDate = new Date(allInputs.lockExpirationDate);
    const daysDifference = (estimatedClosing.getTime() - expirationDate.getTime()) / (1000 * 3600 * 24);
    if (daysDifference > 30) {
      return { isValid: false, error: 'Estimated closing date should be within 30 days of lock expiration' };
    }
  }
  return { isValid: true };
}

function validateActualClosingDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value) {
    const actualClosing = new Date(value);
    if (isNaN(actualClosing.getTime())) {
      return { isValid: false, error: 'Invalid actual closing date format' };
    }
  }
  return { isValid: true };
}

function validateClosingDelay(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Closing delay cannot be negative' };
  }
  if (value > 365) {
    return { isValid: false, error: 'Closing delay cannot exceed 365 days' };
  }
  return { isValid: true };
}

function validateExtensionFee(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Extension fee cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Extension fee cannot exceed $10,000' };
  }
  return { isValid: true };
}

function validateExtensionFeeType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['percentage', 'fixed', 'daily'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid extension fee type' };
  }
  return { isValid: true };
}

function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return { isValid: false, error: 'Market location must be a non-empty string' };
  }
  return { isValid: true };
}

function validateMarketCondition(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validConditions = ['declining', 'stable', 'growing', 'volatile'];
  if (!validConditions.includes(value)) {
    return { isValid: false, error: 'Invalid market condition' };
  }
  return { isValid: true };
}

function validateMarketVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Market volatility cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Market volatility cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateRateTrend(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTrends = ['falling', 'stable', 'rising', 'volatile'];
  if (!validTrends.includes(value)) {
    return { isValid: false, error: 'Invalid rate trend' };
  }
  return { isValid: true };
}

function validateRateForecast(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!Array.isArray(value)) {
    return { isValid: false, error: 'Rate forecast must be an array' };
  }
  for (let i = 0; i < value.length; i++) {
    const forecast = value[i];
    if (!forecast.date) {
      return { isValid: false, error: `Forecast ${i + 1}: date is required` };
    }
    const forecastDate = new Date(forecast.date);
    if (isNaN(forecastDate.getTime())) {
      return { isValid: false, error: `Forecast ${i + 1}: invalid date format` };
    }
    if (forecast.predictedRate <= 0) {
      return { isValid: false, error: `Forecast ${i + 1}: predicted rate must be greater than 0` };
    }
    if (forecast.predictedRate > 25) {
      return { isValid: false, error: `Forecast ${i + 1}: predicted rate cannot exceed 25%` };
    }
    if (forecast.confidence < 0) {
      return { isValid: false, error: `Forecast ${i + 1}: confidence cannot be negative` };
    }
    if (forecast.confidence > 100) {
      return { isValid: false, error: `Forecast ${i + 1}: confidence cannot exceed 100%` };
    }
  }
  // Check chronological order
  for (let i = 1; i < value.length; i++) {
    const prevDate = new Date(value[i - 1].date);
    const currDate = new Date(value[i].date);
    if (currDate <= prevDate) {
      return { isValid: false, error: 'Rate forecast dates must be in chronological order' };
    }
  }
  return { isValid: true };
}

function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Borrower income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Borrower income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 300) {
    return { isValid: false, error: 'Borrower credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, error: 'Borrower credit score cannot exceed 850' };
  }
  return { isValid: true };
}

function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Debt-to-income ratio cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, error: 'Debt-to-income ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

function validateBorrowerEmploymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['employed', 'self_employed', 'retired', 'business_owner'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Invalid employment type' };
  }
  return { isValid: true };
}

function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, error: 'Analysis period must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Analysis period cannot exceed 50 years' };
  }
  return { isValid: true };
}

function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -10) {
    return { isValid: false, error: 'Inflation rate cannot be less than -10%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Inflation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < -20) {
    return { isValid: false, error: 'Property appreciation rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Property appreciation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Discount rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, error: 'Discount rate cannot exceed 50%' };
  }
  return { isValid: true };
}

function validateRiskTolerance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTolerances = ['conservative', 'moderate', 'aggressive'];
  if (!validTolerances.includes(value)) {
    return { isValid: false, error: 'Invalid risk tolerance' };
  }
  return { isValid: true };
}

function validateMaxRateIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Maximum rate increase cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Maximum rate increase cannot exceed 10%' };
  }
  return { isValid: true };
}

function validateMinRateDecrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Minimum rate decrease cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, error: 'Minimum rate decrease cannot exceed 10%' };
  }
  return { isValid: true };
}

function validateCurrency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD'];
  if (!validCurrencies.includes(value)) {
    return { isValid: false, error: 'Invalid currency' };
  }
  return { isValid: true };
}

function validateDisplayFormat(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validFormats = ['percentage', 'decimal', 'currency'];
  if (!validFormats.includes(value)) {
    return { isValid: false, error: 'Invalid display format' };
  }
  return { isValid: true };
}

function validateIncludeCharts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Include charts must be a boolean' };
  }
  return { isValid: true };
}