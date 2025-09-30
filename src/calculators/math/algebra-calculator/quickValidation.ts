import { AlgebraCalculatorInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateInputValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'number') {
    return { isValid: false, message: 'Value must be a number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Value cannot be negative' };
  }
  return { isValid: true };
}

export function validateMultiplier(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'number') {
    return { isValid: false, message: 'Multiplier must be a number' };
  }
  return { isValid: true };
}

export function validatePrincipalAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Principal amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Principal amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Interest rate seems unusually high' };
  }
  return { isValid: true };
}
