import { EbitdaCalculatorInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateRevenue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Revenue must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, message: 'Revenue seems unusually high (> $1B)' };
  }
  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Operating expenses cannot be negative' };
  }
  if (value > 1000000000) {
    return { isValid: false, message: 'Operating expenses seem unusually high (> $1B)' };
  }
  return { isValid: true };
}

export function validateDepreciation(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Depreciation cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Depreciation seems unusually high (> $100M)' };
  }
  return { isValid: true };
}

export function validateAmortization(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Amortization cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Amortization seems unusually high (> $100M)' };
  }
  return { isValid: true };
}

export function validateInterestExpense(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Interest expense cannot be negative' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Interest expense seems unusually high (> $100M)' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Tax rate must be between 0 and 100 percent' };
  }
  return { isValid: true };
}
