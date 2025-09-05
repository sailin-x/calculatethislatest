import { ValidationResult } from './validation';

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

export function validateBaseInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Base interest rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Base interest rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 0.5) {
    errors.push('Base interest rate must be between 0% and 50%');
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

  if (numValue < 10) {
    warnings.push('Short loan term may limit point benefits');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDiscountPoints(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Discount points is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Discount points must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 10) {
    errors.push('Discount points must be between 0 and 10');
  }

  if (numValue > 3) {
    warnings.push('Discount points above 3 may not provide proportional savings');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateOriginationPoints(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Origination points is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Origination points must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 10) {
    errors.push('Origination points must be between 0 and 10');
  }

  if (numValue > 2) {
    warnings.push('Origination points above 2% may be high');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePointCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Point cost is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Point cost must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Point cost cannot be negative');
  }

  if (allInputs?.loanAmount && numValue > allInputs.loanAmount) {
    errors.push('Point cost cannot exceed loan amount');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePointValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Point value is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Point value must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Point value cannot be negative');
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

  if (numValue < 30000) {
    warnings.push('Income below $30,000 may limit loan options');
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
    warnings.push('Credit score below 620 may limit loan options');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower debt-to-income ratio is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower debt-to-income ratio must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 1) {
    errors.push('Borrower debt-to-income ratio must be between 0% and 100%');
  }

  if (numValue > 0.43) {
    warnings.push('Debt-to-income ratio exceeds recommended 43%');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateBorrowerTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Borrower tax rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Borrower tax rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Borrower tax rate must be between 0% and 100%');
  }

  if (numValue < 20) {
    warnings.push('Low tax rate limits deduction benefit');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property insurance is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property insurance must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Property insurance cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property taxes is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property taxes must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Property taxes cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('HOA fees is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('HOA fees must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('HOA fees cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateFloodInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Flood insurance is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Flood insurance must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Flood insurance cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMortgageInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Mortgage insurance is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Mortgage insurance must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Mortgage insurance cannot be negative');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMortgageInsuranceRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Mortgage insurance rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Mortgage insurance rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 0.1) {
    errors.push('Mortgage insurance rate must be between 0% and 10%');
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

export function validateTaxDeductionPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Tax deduction period is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Tax deduction period must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1 || numValue > 50) {
    errors.push('Tax deduction period must be between 1 and 50 years');
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
