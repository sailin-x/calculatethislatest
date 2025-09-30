import { CatastropheBondPricingModelInputs } from './types';

export function validateField(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  // Add field validation logic here
  return { isValid: true };
}

// Additional validation functions with allInputs parameter
export function validateInputField(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Value must be greater than 0' };
  }
  return { isValid: true };
}
