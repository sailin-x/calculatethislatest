import { MortgageInsuranceInputs } from './types';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative' };
  }
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 300) {
    return { isValid: false, message: 'Credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Loan term must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateBorrowerAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Borrower must be at least 18 years old' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Borrower age cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Monthly income must be greater than 0' };
  }
  return { isValid: true };
}

export function validateMonthlyDebts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly debts cannot be negative' };
  }
  return { isValid: true };
}

export function validateDwellingCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Dwelling coverage must be greater than 0' };
  }
  return { isValid: true };
}

export function validateLiabilityCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Liability coverage must be greater than 0' };
  }
  return { isValid: true };
}

export function validateDeductible(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Deductible cannot be negative' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Deductible cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateLatePayments(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Late payments count cannot be negative' };
  }
  if (value > 12) {
    return { isValid: false, message: 'Late payments count cannot exceed 12' };
  }
  return { isValid: true };
}

export function validatePropertyState(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Property state is required' };
  }
  return { isValid: true };
}

export function validatePropertyCounty(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Property county is required' };
  }
  return { isValid: true };
}

export function validatePropertyZipCode(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: 'Property ZIP code is required' };
  }
  const zipRegex = /^\d{5}(-\d{4})?$/;
  if (!zipRegex.test(value.trim())) {
    return { isValid: false, message: 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)' };
  }
  return { isValid: true };
}

export function validateInsuranceCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Insurance coverage cannot be negative' };
  }
  return { isValid: true };
}