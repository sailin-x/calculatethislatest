import { ValidationResult } from '../../../types/calculator';

/**
 * Quick validation functions for individual mortgage calculator fields
 * Each function validates a single field and includes allInputs parameter
 */

export function validateHomePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { homePrice: 'Home price is required' } };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 50000 || numValue > 50000000) {
    return { isValid: false, errors: { homePrice: 'Home price must be between $50,000 and $50,000,000' } };
  }

  return { isValid: true, errors: {} };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { downPayment: 'Down payment is required' } };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 10000000) {
    return { isValid: false, errors: { downPayment: 'Down payment must be between $0 and $10,000,000' } };
  }

  // Check if down payment exceeds home price
  if (allInputs?.homePrice && numValue > allInputs.homePrice) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot exceed home price' } };
  }

  return { isValid: true, errors: {} };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { loanTerm: 'Loan term is required' } };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 1 || numValue > 50) {
    return { isValid: false, errors: { loanTerm: 'Loan term must be between 1 and 50 years' } };
  }

  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { interestRate: 'Interest rate is required' } };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0.1 || numValue > 30) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0.1% and 30%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateLoanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { loanType: 'Loan type is required' } };
  }

  const validTypes = ['conventional', 'fha', 'va', 'usda', 'jumbo'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { loanType: 'Please select a valid loan type' } };
  }

  return { isValid: true, errors: {} };
}

export function validatePropertyTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { propertyTax: 'Property tax cannot be negative' } };
  }

  if (numValue > 500000) {
    return { isValid: false, errors: { propertyTax: 'Property tax seems unreasonably high' } };
  }

  return { isValid: true, errors: {} };
}

export function validateHomeInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0) {
    return { isValid: false, errors: { homeInsurance: 'Home insurance cannot be negative' } };
  }

  if (numValue > 100000) {
    return { isValid: false, errors: { homeInsurance: 'Home insurance seems unreasonably high' } };
  }

  return { isValid: true, errors: {} };
}

export function validatePmiRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 5) {
    return { isValid: false, errors: { pmiRate: 'PMI rate must be between 0% and 5%' } };
  }

  return { isValid: true, errors: {} };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 5000) {
    return { isValid: false, errors: { hoaFees: 'HOA fees must be between $0 and $5,000 per month' } };
  }

  return { isValid: true, errors: {} };
}

export function validateExtraPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null || value === '') {
    return { isValid: true, errors: {} }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue) || numValue < 0 || numValue > 50000) {
    return { isValid: false, errors: { extraPayment: 'Extra payment must be between $0 and $50,000 per month' } };
  }

  return { isValid: true, errors: {} };
}