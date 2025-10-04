import { PortfolioOptimizationCalculatorInputs } from './types';

export function validatePrimaryInput(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Primary input must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Primary input cannot exceed 1,000,000' };
  }
  return { isValid: true };
}

export function validateSecondaryInput(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Secondary input cannot be negative' };
  }
  if (allInputs?.primaryInput && value > allInputs.primaryInput) {
    return { isValid: false, message: 'Secondary input cannot exceed primary input' };
  }
  return { isValid: true };
}

export function validateSelectInput(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validOptions = ['option1', 'option2'];
  if (!value || !validOptions.includes(value)) {
    return { isValid: false, message: 'Please select a valid option' };
  }
  return { isValid: true };
}

export function validateOptionalParameter(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value.length > 100) {
    return { isValid: false, message: 'Optional parameter cannot exceed 100 characters' };
  }
  return { isValid: true };
}

export function validateBooleanFlag(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, message: 'Boolean flag must be true or false' };
  }
  return { isValid: true };
}

// Additional validation functions as needed
export function validateNumericRange(value: any, min: number, max: number, fieldName: string, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < min) {
    return { isValid: false, message: `${fieldName} must be at least ${min}` };
  }
  if (value > max) {
    return { isValid: false, message: `${fieldName} cannot exceed ${max}` };
  }
  return { isValid: true };
}

export function validateRequired(value: any, fieldName: string, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true };
}