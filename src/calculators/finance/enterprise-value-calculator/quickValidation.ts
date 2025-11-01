import { EnterpriseValueCalculatorInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateMarketCap(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Market capitalization must be greater than 0' };
  }
  if (value > 10000000000000) {
    return { isValid: false, message: 'Market capitalization seems unusually high (> $10T)' };
  }
  return { isValid: true };
}

export function validateTotalDebt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Total debt cannot be negative' };
  }
  if (value > 10000000000000) {
    return { isValid: false, message: 'Total debt seems unusually high (> $10T)' };
  }
  return { isValid: true };
}

export function validateCashAndEquivalents(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Cash and equivalents cannot be negative' };
  }
  if (value > 10000000000000) {
    return { isValid: false, message: 'Cash and equivalents seem unusually high (> $10T)' };
  }
  return { isValid: true };
}

export function validatePreferredStock(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Preferred stock cannot be negative' };
  }
  if (value > 1000000000000) {
    return { isValid: false, message: 'Preferred stock seems unusually high (> $1T)' };
  }
  return { isValid: true };
}

export function validateMinorityInterest(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Minority interest cannot be negative' };
  }
  if (value > 1000000000000) {
    return { isValid: false, message: 'Minority interest seems unusually high (> $1T)' };
  }
  return { isValid: true };
}
