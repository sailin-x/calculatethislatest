import { DividendDiscountModelInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateCurrentDividend(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current dividend must be greater than 0' };
  }
  if (value > 1000) {
    return { isValid: false, message: 'Current dividend seems unusually high' };
  }
  return { isValid: true };
}

export function validateExpectedGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Expected growth rate cannot be negative' };
  }
  if (value > 0.5) {
    return { isValid: false, message: 'Expected growth rate seems unusually high (>50%)' };
  }
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Discount rate must be greater than 0' };
  }
  if (value > 0.5) {
    return { isValid: false, message: 'Discount rate seems unusually high (>50%)' };
  }

  // Check relationship with growth rate if both are provided
  if (allInputs?.expectedGrowthRate !== undefined && value <= allInputs.expectedGrowthRate) {
    return { isValid: false, message: 'Discount rate must be greater than growth rate' };
  }

  return { isValid: true };
}

export function validateNumberOfYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value <= 0 || value > 100) {
    return { isValid: false, message: 'Number of years must be between 1 and 100' };
  }
  return { isValid: true };
}