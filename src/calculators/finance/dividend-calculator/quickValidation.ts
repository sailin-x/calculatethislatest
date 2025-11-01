import { DividendCalculatorInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateStockPrice(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Stock price must be greater than 0' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Stock price seems unusually high' };
  }
  return { isValid: true };
}

export function validateAnnualDividend(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Annual dividend cannot be negative' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Annual dividend seems unusually high' };
  }
  return { isValid: true };
}

export function validateDividendFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validFrequencies = ['annual', 'semi-annual', 'quarterly', 'monthly'];
  if (!value || !validFrequencies.includes(value)) {
    return { isValid: false, message: 'Dividend frequency must be annual, semi-annual, quarterly, or monthly' };
  }
  return { isValid: true };
}

export function validateHoldingPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value <= 0 || value > 100) {
    return { isValid: false, message: 'Holding period must be between 0 and 100 years' };
  }
  return { isValid: true };
}
