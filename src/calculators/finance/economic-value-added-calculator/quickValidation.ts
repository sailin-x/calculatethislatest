import { EconomicValueAddedInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateNetOperatingProfitAfterTax(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'NOPAT cannot be negative' };
  }
  if (value > 10000000000) {
    return { isValid: false, message: 'NOPAT seems unusually high (> $10B)' };
  }
  return { isValid: true };
}

export function validateCapitalEmployed(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Capital employed must be greater than 0' };
  }
  if (value > 100000000000) {
    return { isValid: false, message: 'Capital employed seems unusually high (> $100B)' };
  }
  return { isValid: true };
}

export function validateCostOfCapital(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0 || value > 1) {
    return { isValid: false, message: 'Cost of capital must be between 0 and 100%' };
  }
  if (value > 0.5) {
    return { isValid: false, message: 'Cost of capital seems unusually high (>50%)' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0 || value > 1) {
    return { isValid: false, message: 'Tax rate must be between 0 and 100%' };
  }
  return { isValid: true };
}

export function validateTotalAssets(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Total assets cannot be negative' };
  }
  if (value > 100000000000) {
    return { isValid: false, message: 'Total assets seem unusually high (> $100B)' };
  }
  return { isValid: true };
}

export function validateCurrentLiabilities(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Current liabilities cannot be negative' };
  }
  if (value > 100000000000) {
    return { isValid: false, message: 'Current liabilities seem unusually high (> $100B)' };
  }
  return { isValid: true };
}

export function validateTotalEquity(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Total equity cannot be negative' };
  }
  if (value > 100000000000) {
    return { isValid: false, message: 'Total equity seems unusually high (> $100B)' };
  }
  return { isValid: true };
}