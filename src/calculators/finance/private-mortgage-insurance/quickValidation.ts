import { ValidationResult } from '../../../types/calculator';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { loanAmount: 'Loan amount must be greater than $0' } };
  }
  if (value < 25000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount must be at least $25,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed $10,000,000' } };
  }
  if (allInputs?.homeValue && value > allInputs.homeValue) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed home value' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { downPayment: 'Down payment is required' } };
  }
  if (value < 0) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot be negative' } };
  }
  if (allInputs?.homeValue && value > allInputs.homeValue) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot exceed home value' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { homeValue: 'Home value must be greater than $0' } };
  }
  if (value < 25000) {
    return { isValid: false, errors: { homeValue: 'Home value must be at least $25,000' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { homeValue: 'Home value cannot exceed $20,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePmiRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { pmiRate: 'PMI rate must be greater than 0%' } };
  }
  if (value < 0.1) {
    return { isValid: false, errors: { pmiRate: 'PMI rate must be at least 0.1%' } };
  }
  if (value > 2.0) {
    return { isValid: false, errors: { pmiRate: 'PMI rate cannot exceed 2.0%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be greater than 0 years' } };
  }
  if (value < 5) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be at least 5 years' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { loanTerm: 'Loan term cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 10000) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance cannot exceed $10,000,000' } };
  }
  if (allInputs?.loanAmount && value > allInputs.loanAmount) {
    return { isValid: false, errors: { currentLoanBalance: 'Current balance cannot exceed original loan amount' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsOwned(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { yearsOwned: 'Years owned cannot be negative' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { yearsOwned: 'Years owned cannot exceed 50' } };
  }
  if (allInputs?.loanTerm && value > allInputs.loanTerm) {
    return { isValid: false, errors: { yearsOwned: 'Years owned cannot exceed loan term' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompareRate1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0.1) {
    return { isValid: false, errors: { compareRate1: 'Comparison PMI rate must be at least 0.1%' } };
  }
  if (value > 2.0) {
    return { isValid: false, errors: { compareRate1: 'Comparison PMI rate cannot exceed 2.0%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompareRate2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0.1) {
    return { isValid: false, errors: { compareRate2: 'Comparison PMI rate must be at least 0.1%' } };
  }
  if (value > 2.0) {
    return { isValid: false, errors: { compareRate2: 'Comparison PMI rate cannot exceed 2.0%' } };
  }
  return { isValid: true, errors: {} };
}