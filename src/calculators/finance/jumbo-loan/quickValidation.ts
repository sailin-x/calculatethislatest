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

  if (numValue < 100000) {
    errors.push('Loan amount must be at least $100,000');
  }
  if (numValue > 50000000) {
    errors.push('Loan amount cannot exceed $50,000,000');
  }

  if (allInputs?.conformingLimit && numValue > allInputs.conformingLimit * 2) {
    warnings.push('Loan amount significantly exceeds conforming limit');
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

  if (numValue > 0.15) {
    warnings.push('Interest rate above 15% may impact affordability');
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

  if (numValue < 100000) {
    errors.push('Property value must be at least $100,000');
  }

  if (allInputs?.loanAmount && numValue < allInputs.loanAmount) {
    warnings.push('Property value is less than loan amount');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Debt-to-income ratio is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Debt-to-income ratio must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 1) {
    errors.push('Debt-to-income ratio must be between 0% and 100%');
  }

  if (numValue > 0.43) {
    warnings.push('Debt-to-income ratio above 43% may limit options');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLoanToValueRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Loan-to-value ratio is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Loan-to-value ratio must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 1) {
    errors.push('Loan-to-value ratio must be between 0% and 100%');
  }

  if (numValue > 0.90) {
    warnings.push('Loan-to-value ratio above 90% may require additional documentation');
  }

  return { isValid: errors.length === 0, errors, warnings };
}
