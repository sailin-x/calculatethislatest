import { ValidationResult } from './validation';

export function validateAmount(value: any): ValidationResult {
  if (value <= 0) return { isValid: false, message: 'Amount must be greater than 0' };
  return { isValid: true, message: 'Valid amount' };
}

export function validateRate(value: any): ValidationResult {
  if (value < 0 || value > 1) return { isValid: false, message: 'Rate must be between 0 and 1' };
  return { isValid: true, message: 'Valid rate' };
}

export function validateTime(value: any): ValidationResult {
  if (value <= 0) return { isValid: false, message: 'Time must be greater than 0' };
  return { isValid: true, message: 'Valid time' };
}
