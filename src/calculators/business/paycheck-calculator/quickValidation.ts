import { PaycheckCalculatorInputs } from './types';

export function validateGrossPay(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Gross pay must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Gross pay cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validatePayFrequency(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Pay frequency is required' };
  }
  return { isValid: true };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Filing status is required' };
  }
  return { isValid: true };
}

export function validateDependents(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of dependents cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Number of dependents cannot exceed 10' };
  }
  return { isValid: true };
}

export function validatePreTaxDeductions(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Pre-tax deductions cannot be negative' };
  }
  return { isValid: true };
}

export function validateRetirementContributions(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Retirement contributions cannot be negative' };
  }
  return { isValid: true };
}

export function validateHealthInsurance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Health insurance cannot be negative' };
  }
  return { isValid: true };
}

export function validateAdditionalDeductions(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Additional deductions cannot be negative' };
  }
  return { isValid: true };
}