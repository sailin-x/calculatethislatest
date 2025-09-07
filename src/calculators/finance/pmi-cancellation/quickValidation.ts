import { ValidationResult } from '../../../types/calculator';

export function validateOriginalLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { originalLoanAmount: 'Original loan amount must be greater than $0' } };
  }
  if (value < 25000) {
    return { isValid: false, errors: { originalLoanAmount: 'Original loan amount must be at least $25,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { originalLoanAmount: 'Original loan amount cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance cannot exceed $10,000,000' } };
  }
  if (allInputs?.currentHomeValue && value > allInputs.currentHomeValue) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance cannot exceed home value' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentHomeValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { currentHomeValue: 'Current home value must be greater than $0' } };
  }
  if (value < 25000) {
    return { isValid: false, errors: { currentHomeValue: 'Current home value must be at least $25,000' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { currentHomeValue: 'Current home value cannot exceed $20,000,000' } };
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
  if (value > 2) {
    return { isValid: false, errors: { pmiRate: 'PMI rate cannot exceed 2%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyPmiPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 10) {
    return { isValid: false, errors: { monthlyPmiPayment: 'Monthly PMI payment must be at least $10' } };
  }
  if (value > 500) {
    return { isValid: false, errors: { monthlyPmiPayment: 'Monthly PMI payment cannot exceed $500' } };
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

export function validateYearsOwned(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { yearsOwned: 'Years owned is required' } };
  }
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

export function validateCancellationType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { cancellationType: 'Cancellation type is required' } };
  }
  const validTypes = ['automatic', 'lender', 'borrower'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { cancellationType: 'Invalid cancellation type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < -10) {
    return { isValid: false, errors: { homeAppreciation: 'Home appreciation cannot be less than -10%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { homeAppreciation: 'Home appreciation cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsToCancel(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { yearsToCancel: 'Years to cancel cannot be negative' } };
  }
  if (value > 30) {
    return { isValid: false, errors: { yearsToCancel: 'Years to cancel cannot exceed 30' } };
  }
  return { isValid: true, errors: {} };
}