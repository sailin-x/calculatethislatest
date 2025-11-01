import { CAGRInputs } from './types';

export function validateInitialValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Initial value must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, message: 'Initial value cannot exceed $1,000,000,000' };
  }
  return { isValid: true };
}

export function validateFinalValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Final value must be greater than 0' };
  }
  if (value > 1000000000) {
    return { isValid: false, message: 'Final value cannot exceed $1,000,000,000' };
  }
  return { isValid: true };
}

export function validateTimePeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Time period must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Time period cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateAdditionalContributions(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Additional contributions cannot be negative' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -0.1 || value > 0.5) {
    return { isValid: false, message: 'Inflation rate must be between -10% and 50%' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 1) {
    return { isValid: false, message: 'Tax rate must be between 0% and 100%' };
  }
  return { isValid: true };
}