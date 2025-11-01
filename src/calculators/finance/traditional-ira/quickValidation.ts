import { TraditionalIRAInputs } from './types';

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current balance cannot be negative' };
  }
  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Annual contribution must be greater than 0' };
  }
  if (value > 8000) {
    return { isValid: false, message: 'Annual contribution cannot exceed $8,000 (2024 limit)' };
  }
  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || (allInputs?.currentAge && value < allInputs.currentAge + 1)) {
    return { isValid: false, message: 'Retirement age must be greater than current age' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Retirement age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 30) {
    return { isValid: false, message: 'Expected return must be between -10% and 30%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 15) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 15%' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Tax bracket must be 0 or greater' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Tax bracket cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Employer match cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Employer match cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateSpousalIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Spousal income cannot be negative' };
  }
  return { isValid: true };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 20) {
    return { isValid: false, message: 'State tax rate must be between 0% and 20%' };
  }
  return { isValid: true };
}

export function validateYearsUntilRetirement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Years until retirement must be 0 or greater' };
  }
  if (value > 80) {
    return { isValid: false, message: 'Years until retirement cannot exceed 80' };
  }
  return { isValid: true };
}