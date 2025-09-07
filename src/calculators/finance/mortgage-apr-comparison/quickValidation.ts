import { ValidationResult } from '@/lib/validation';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 10000) {
    return { isValid: false, error: 'Loan amount must be at least $10,000' };
  }
  if (value > 10000000) {
    return { isValid: false, error: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value <= 0) {
    return { isValid: false, error: 'Interest rate must be greater than 0%' };
  }
  if (value > 20) {
    return { isValid: false, error: 'Interest rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Closing costs cannot be negative' };
  }
  if (value > 50000) {
    return { isValid: false, error: 'Closing costs cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validatePoints(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value < 0) {
    return { isValid: false, error: 'Points cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, error: 'Points cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateOfferName(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: 'Offer name is required' };
  }
  if (value.length > 50) {
    return { isValid: false, error: 'Offer name cannot exceed 50 characters' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTerms = ['15', '20', '30'];
  if (!validTerms.includes(value)) {
    return { isValid: false, error: 'Loan term must be 15, 20, or 30 years' };
  }
  return { isValid: true };
}
