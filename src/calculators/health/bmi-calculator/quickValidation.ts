import { BmiCalculatorInputs } from './types';

// BMI-specific validation functions
export function validateWeight(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Weight is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Weight must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Weight must be greater than 0' };
  }
  if (value > 500) {
    return { isValid: false, message: 'Weight seems unusually high (max 500kg)' };
  }
  return { isValid: true };
}

export function validateHeight(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: 'Height is required' };
  }
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, message: 'Height must be a valid number' };
  }
  if (value <= 0) {
    return { isValid: false, message: 'Height must be greater than 0' };
  }
  if (value < 50) {
    return { isValid: false, message: 'Height seems too low (minimum 50cm)' };
  }
  if (value > 250) {
    return { isValid: false, message: 'Height seems too high (maximum 250cm)' };
  }
  return { isValid: true };
}
