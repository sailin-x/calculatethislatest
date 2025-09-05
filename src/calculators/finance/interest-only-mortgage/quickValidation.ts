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

  if (numValue < 50000) {
    errors.push('Loan amount must be at least $50,000');
  }
  if (numValue > 10000000) {
    errors.push('Loan amount cannot exceed $10,000,000');
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

export function validateInterestOnlyPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Interest-only period is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Interest-only period must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1) {
    errors.push('Interest-only period must be at least 1 year');
  }
  if (numValue > 30) {
    errors.push('Interest-only period cannot exceed 30 years');
  }

  if (numValue > 10) {
    warnings.push('Interest-only period over 10 years increases payment shock risk');
  }

  if (allInputs?.totalLoanTerm && numValue >= allInputs.totalLoanTerm) {
    errors.push('Interest-only period must be less than total loan term');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateTotalLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Total loan term is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Total loan term must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1) {
    errors.push('Total loan term must be at least 1 year');
  }
  if (numValue > 50) {
    errors.push('Total loan term cannot exceed 50 years');
  }

  if (allInputs?.interestOnlyPeriod && numValue <= allInputs.interestOnlyPeriod) {
    errors.push('Total loan term must be greater than interest-only period');
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
