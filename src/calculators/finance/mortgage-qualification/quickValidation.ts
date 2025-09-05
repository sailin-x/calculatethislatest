import { ValidationResult } from './validation';

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Borrower income cannot be negative');
  }

  if (numValue < 20000) {
    warnings.push('Borrower income below $20,000 may limit loan options');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCoBorrowerIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Co-borrower income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Co-borrower income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Co-borrower income cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower credit score is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower credit score must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 300 || numValue > 850) {
    errors.push('Borrower credit score must be between 300 and 850');
  }

  if (numValue < 620) {
    warnings.push('Borrower credit score below 620 may limit loan options');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCoBorrowerCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Co-borrower credit score is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Co-borrower credit score must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 300 || numValue > 850) {
    errors.push('Co-borrower credit score must be between 300 and 850');
  }

  if (numValue < 620) {
    warnings.push('Co-borrower credit score below 620 may limit loan options');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerEmploymentLength(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower employment length is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower employment length must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 50) {
    errors.push('Borrower employment length must be between 0 and 50 years');
  }

  if (numValue < 1) {
    warnings.push('Short employment history may affect qualification');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCoBorrowerEmploymentLength(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Co-borrower employment length is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Co-borrower employment length must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 50) {
    errors.push('Co-borrower employment length must be between 0 and 50 years');
  }

  if (numValue < 1) {
    warnings.push('Short co-borrower employment history may affect qualification');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBaseSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Base salary is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Base salary must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Base salary cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateOvertimeIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Overtime income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Overtime income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Overtime income cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBonusIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Bonus income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Bonus income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Bonus income cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCommissionIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Commission income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Commission income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Commission income cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateRentalIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Rental income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Rental income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Rental income cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateInvestmentIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Investment income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Investment income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Investment income cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateOtherIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Other income is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Other income must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Other income cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower assets is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower assets must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Borrower assets cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCoBorrowerAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Co-borrower assets is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Co-borrower assets must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Co-borrower assets cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerLiquidity(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower liquidity is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower liquidity must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Borrower liquidity cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCoBorrowerLiquidity(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Co-borrower liquidity is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Co-borrower liquidity must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Co-borrower liquidity cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower debts is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower debts must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Borrower debts cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCoBorrowerDebts(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Co-borrower debts is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Co-borrower debts must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Co-borrower debts cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property value is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property value must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 10000) {
    errors.push('Property value must be at least $10,000');
  }
  if (numValue > 50000000) {
    errors.push('Property value cannot exceed $50,000,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || typeof value !== 'string' || value.trim().length < 10) {
    errors.push('Property address is required and must be at least 10 characters');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertySize(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property size is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property size must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 100) {
    errors.push('Property size must be at least 100 sq ft');
  }
  if (numValue > 100000) {
    errors.push('Property size cannot exceed 100,000 sq ft');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property age is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property age must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 200) {
    errors.push('Property age must be between 0 and 200 years');
  }

  if (numValue > 50) {
    warnings.push('Property age over 50 years may affect loan terms');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Loan amount is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Loan amount must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 10000) {
    errors.push('Loan amount must be at least $10,000');
  }
  if (numValue > 10000000) {
    errors.push('Loan amount cannot exceed $10,000,000');
  }

  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    warnings.push('Loan amount exceeds property value');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Interest rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Interest rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 0.5) {
    errors.push('Interest rate must be between 0% and 50%');
  }

  if (numValue > 0.1) {
    warnings.push('Interest rate above 10% is considered high');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Loan term is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Loan term must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1 || numValue > 50) {
    errors.push('Loan term must be between 1 and 50 years');
  }

  if (numValue > 30) {
    warnings.push('Loan terms over 30 years may have higher interest rates');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Down payment is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Down payment must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Down payment cannot be negative');
  }

  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    errors.push('Down payment cannot exceed property value');
  }

  if (allInputs?.propertyValue && numValue < allInputs.propertyValue * 0.05) {
    warnings.push('Down payment below 5% may require mortgage insurance');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDownPaymentPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Down payment percentage is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Down payment percentage must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Down payment percentage must be between 0% and 100%');
  }

  if (numValue < 5) {
    warnings.push('Down payment below 5% may require mortgage insurance');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateCreditCardDebt(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Credit card debt is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Credit card debt must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Credit card debt cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateAutoLoanDebt(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Auto loan debt is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Auto loan debt must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Auto loan debt cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateStudentLoanDebt(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Student loan debt is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Student loan debt must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Student loan debt cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePersonalLoanDebt(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Personal loan debt is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Personal loan debt must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Personal loan debt cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateOtherDebt(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Other debt is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Other debt must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Other debt cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMaxDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Max debt-to-income ratio is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Max debt-to-income ratio must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 1) {
    errors.push('Max debt-to-income ratio must be between 0% and 100%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMaxHousingExpenseRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Max housing expense ratio is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Max housing expense ratio must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 1) {
    errors.push('Max housing expense ratio must be between 0% and 100%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMinCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Min credit score is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Min credit score must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 300 || numValue > 850) {
    errors.push('Min credit score must be between 300 and 850');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMinDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Min down payment is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Min down payment must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Min down payment must be between 0% and 100%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMaxLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Max loan amount is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Max loan amount must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 10000) {
    errors.push('Max loan amount must be at least $10,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || typeof value !== 'string' || value.trim().length < 2) {
    errors.push('Market location is required and must be at least 2 characters');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Market growth rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Market growth rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < -0.2 || numValue > 0.3) {
    errors.push('Market growth rate must be between -20% and 30%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Analysis period is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Analysis period must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1 || numValue > 50) {
    errors.push('Analysis period must be between 1 and 50 years');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Inflation rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Inflation rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < -0.1 || numValue > 0.2) {
    errors.push('Inflation rate must be between -10% and 20%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property appreciation rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property appreciation rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < -0.2 || numValue > 0.3) {
    errors.push('Property appreciation rate must be between -20% and 30%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Discount rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Discount rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 0.3) {
    errors.push('Discount rate must be between 0% and 30%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}
