import { './finance/estate-tax-liability-calculator';Inputs } from './types';

export function validateValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined) {
    return { isValid: false, message: 'Value is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Value must be a number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Value cannot be negative' };
  }
  return { isValid: true };
}

export function validateRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined) {
    return { isValid: false, message: 'Rate is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Rate must be a number' };
  }
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Rate must be between 0 and 100' };
  }
  return { isValid: true };
}
