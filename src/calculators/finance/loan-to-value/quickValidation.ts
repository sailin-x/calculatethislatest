import { ValidationResult } from './validation';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Loan amount is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Loan amount must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Loan amount must be greater than 0'], warnings: [] };
  }

  if (numValue > 10000000) {
    return { isValid: false, errors: ['Loan amount seems unusually high'], warnings: [] };
  }

  // Check against property value if available
  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    return { isValid: false, errors: ['Loan amount cannot exceed property value'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Interest rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Interest rate must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Interest rate must be greater than 0'], warnings: [] };
  }

  if (numValue > 1) {
    return { isValid: false, errors: ['Interest rate must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.15) {
    return { isValid: true, errors: [], warnings: ['Interest rate above 15% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Loan term is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Loan term must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Loan term must be greater than 0'], warnings: [] };
  }

  if (numValue > 480) {
    return { isValid: true, errors: [], warnings: ['Loan term longer than 40 years is unusual'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Property value must be greater than 0'], warnings: [] };
  }

  if (numValue > 50000000) {
    return { isValid: true, errors: [], warnings: ['Property value seems unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Property address is required'], warnings: [] };
  }

  if (value.length < 10) {
    return { isValid: true, errors: [], warnings: ['Property address seems too short'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property size is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property size must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Property size must be greater than 0'], warnings: [] };
  }

  if (numValue > 100000) {
    return { isValid: true, errors: [], warnings: ['Property size seems unusually large'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property age is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property age must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property age must be non-negative'], warnings: [] };
  }

  if (numValue > 100) {
    return { isValid: true, errors: [], warnings: ['Property age seems unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAppraisalValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Appraisal value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Appraisal value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Appraisal value must be greater than 0'], warnings: [] };
  }

  // Check against property value if available
  if (allInputs?.propertyValue) {
    if (numValue < allInputs.propertyValue * 0.8) {
      return { isValid: true, errors: [], warnings: ['Appraisal value is significantly below property value'] };
    }
    if (numValue > allInputs.propertyValue * 1.2) {
      return { isValid: true, errors: [], warnings: ['Appraisal value is significantly above property value'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Market value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Market value must be greater than 0'], warnings: [] };
  }

  // Check against property value if available
  if (allInputs?.propertyValue) {
    if (numValue < allInputs.propertyValue * 0.8) {
      return { isValid: true, errors: [], warnings: ['Market value is significantly below property value'] };
    }
    if (numValue > allInputs.propertyValue * 1.2) {
      return { isValid: true, errors: [], warnings: ['Market value is significantly above property value'] };
    }
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAssessedValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Assessed value is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Assessed value must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Assessed value must be greater than 0'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Purchase price is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Purchase price must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Purchase price must be greater than 0'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Down payment is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Down payment must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Down payment must be non-negative'], warnings: [] };
  }

  // Check against purchase price if available
  if (allInputs?.purchasePrice && numValue > allInputs.purchasePrice) {
    return { isValid: false, errors: ['Down payment cannot exceed purchase price'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDownPaymentPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Down payment percentage is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Down payment percentage must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Down payment percentage must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue < 0.05) {
    return { isValid: true, errors: [], warnings: ['Down payment percentage below 5% is very low'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower income is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower income must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Borrower income must be greater than 0'], warnings: [] };
  }

  if (numValue > 10000000) {
    return { isValid: true, errors: [], warnings: ['Borrower income seems unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower credit score is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower credit score must be a valid number'], warnings: [] };
  }

  if (numValue < 300 || numValue > 850) {
    return { isValid: false, errors: ['Borrower credit score must be between 300 and 850'], warnings: [] };
  }

  if (numValue < 500) {
    return { isValid: true, errors: [], warnings: ['Borrower credit score is very low'] };
  }

  if (numValue < 620) {
    return { isValid: true, errors: [], warnings: ['Borrower credit score is below average'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower debt-to-income ratio is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower debt-to-income ratio must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Borrower debt-to-income ratio must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.6) {
    return { isValid: true, errors: [], warnings: ['Borrower debt-to-income ratio is very high'] };
  }

  if (numValue > 0.45) {
    return { isValid: true, errors: [], warnings: ['Borrower debt-to-income ratio is above average'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower assets are required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower assets must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Borrower assets must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateBorrowerLiquidity(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower liquidity is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower liquidity must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Borrower liquidity must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property insurance is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property insurance must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property insurance must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property taxes are required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property taxes must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Property taxes must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['HOA fees are required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['HOA fees must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['HOA fees must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateFloodInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Flood insurance is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Flood insurance must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Flood insurance must be non-negative'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Market location is required'], warnings: [] };
  }

  if (value.length < 5) {
    return { isValid: true, errors: [], warnings: ['Market location seems too short'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Market growth rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Market growth rate must be a valid number'], warnings: [] };
  }

  if (numValue < -1 || numValue > 1) {
    return { isValid: false, errors: ['Market growth rate must be between -100% and 100%'], warnings: [] };
  }

  if (numValue > 0.2) {
    return { isValid: true, errors: [], warnings: ['Market growth rate above 20% is unusually high'] };
  }

  if (numValue < -0.2) {
    return { isValid: true, errors: [], warnings: ['Market growth rate below -20% indicates severe market decline'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDaysOnMarket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Days on market is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Days on market must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Days on market must be non-negative'], warnings: [] };
  }

  if (numValue > 365) {
    return { isValid: true, errors: [], warnings: ['Property has been on market for over a year'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMaxLtvRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Maximum LTV ratio is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Maximum LTV ratio must be a valid number'], warnings: [] };
  }

  if (numValue <= 0 || numValue > 1) {
    return { isValid: false, errors: ['Maximum LTV ratio must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMinDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Minimum down payment is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Minimum down payment must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Minimum down payment must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePmiRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['PMI rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['PMI rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['PMI rate must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.02) {
    return { isValid: true, errors: [], warnings: ['PMI rate above 2% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePmiThreshold(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['PMI threshold is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['PMI threshold must be a valid number'], warnings: [] };
  }

  if (numValue <= 0 || numValue > 1) {
    return { isValid: false, errors: ['PMI threshold must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Analysis period is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Analysis period must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Analysis period must be greater than 0'], warnings: [] };
  }

  if (numValue > 60) {
    return { isValid: true, errors: [], warnings: ['Analysis period longer than 5 years may have reduced accuracy'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Inflation rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Inflation rate must be a valid number'], warnings: [] };
  }

  if (numValue < -1 || numValue > 1) {
    return { isValid: false, errors: ['Inflation rate must be between -100% and 100%'], warnings: [] };
  }

  if (numValue > 0.1) {
    return { isValid: true, errors: [], warnings: ['Inflation rate above 10% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Property appreciation rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Property appreciation rate must be a valid number'], warnings: [] };
  }

  if (numValue < -1 || numValue > 1) {
    return { isValid: false, errors: ['Property appreciation rate must be between -100% and 100%'], warnings: [] };
  }

  if (numValue > 0.15) {
    return { isValid: true, errors: [], warnings: ['Property appreciation rate above 15% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Discount rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Discount rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Discount rate must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.15) {
    return { isValid: true, errors: [], warnings: ['Discount rate above 15% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}