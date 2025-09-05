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

  // Check against property value if available
  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    return { isValid: false, errors: ['Down payment cannot exceed property value'], warnings: [] };
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

export function validateLtvThreshold(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['LTV threshold is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['LTV threshold must be a valid number'], warnings: [] };
  }

  if (numValue <= 0 || numValue > 1) {
    return { isValid: false, errors: ['LTV threshold must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.90) {
    return { isValid: true, errors: [], warnings: ['LTV threshold above 90% is unusually high'] };
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

export function validateBorrowerTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Borrower tax rate is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Borrower tax rate must be a valid number'], warnings: [] };
  }

  if (numValue < 0 || numValue > 1) {
    return { isValid: false, errors: ['Borrower tax rate must be between 0 and 1 (0% to 100%)'], warnings: [] };
  }

  if (numValue > 0.5) {
    return { isValid: true, errors: [], warnings: ['Borrower tax rate above 50% is unusually high'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateLoanStartDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, errors: ['Loan start date is required'], warnings: [] };
  }

  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return { isValid: false, errors: ['Loan start date must be a valid date'], warnings: [] };
    }

    const today = new Date();
    if (date > today) {
      return { isValid: true, errors: [], warnings: ['Loan start date is in the future'] };
    }

    return { isValid: true, errors: [], warnings: [] };
  } catch (error) {
    return { isValid: false, errors: ['Invalid date format'], warnings: [] };
  }
}

export function validatePaymentsMade(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Payments made is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Payments made must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Payments made must be non-negative'], warnings: [] };
  }

  // Check against loan term if available
  if (allInputs?.loanTerm && numValue > allInputs.loanTerm) {
    return { isValid: false, errors: ['Payments made cannot exceed loan term'], warnings: [] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateMonthsSinceLoanStart(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Months since loan start is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Months since loan start must be a valid number'], warnings: [] };
  }

  if (numValue < 0) {
    return { isValid: false, errors: ['Months since loan start must be non-negative'], warnings: [] };
  }

  // Check against payments made if available
  if (allInputs?.paymentsMade && numValue > allInputs.paymentsMade) {
    return { isValid: true, errors: [], warnings: ['Months since loan start should not exceed payments made'] };
  }

  return { isValid: true, errors: [], warnings: [] };
}

export function validateCurrentPrincipalBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, errors: ['Current principal balance is required'], warnings: [] };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, errors: ['Current principal balance must be a valid number'], warnings: [] };
  }

  if (numValue <= 0) {
    return { isValid: false, errors: ['Current principal balance must be greater than 0'], warnings: [] };
  }

  // Check against original loan amount if available
  if (allInputs?.loanAmount && numValue > allInputs.loanAmount) {
    return { isValid: false, errors: ['Current principal balance cannot exceed original loan amount'], warnings: [] };
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

  if (numValue > 0.2) {
    return { isValid: true, errors: [], warnings: ['Property appreciation rate above 20% is unusually high'] };
  }

  if (numValue < -0.2) {
    return { isValid: true, errors: [], warnings: ['Property appreciation rate below -20% indicates severe depreciation'] };
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