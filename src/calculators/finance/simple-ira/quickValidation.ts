import { SimpleIRAInputs } from './types';

export function validateAnnualSalary(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Annual salary must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Annual salary cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateEmployeeContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Employee contribution cannot be negative' };
  }
  if (value > 19500) {
    return { isValid: false, message: 'Employee contribution cannot exceed $19,500 for 2024' };
  }
  return { isValid: true };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Employer match percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Employer match percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 50) {
    return { isValid: false, message: 'Expected annual return must be between -10% and 50%' };
  }
  return { isValid: true };
}

export function validateYearsToContribute(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Years to contribute must be at least 1' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Years to contribute cannot exceed 50' };
  }
  return { isValid: true };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current balance cannot be negative' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Tax bracket must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateNumberOfEmployees(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of employees cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'SIMPLE IRAs are limited to businesses with 100 or fewer employees' };
  }
  return { isValid: true };
}