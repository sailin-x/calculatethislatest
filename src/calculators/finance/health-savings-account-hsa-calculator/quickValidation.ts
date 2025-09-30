import { HealthSavingsAccountHsaCalculatorInputs } from './types';

export function validateAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Age must be greater than 0' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Age cannot exceed 120' };
  }
  return { isValid: true };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current balance cannot be negative' };
  }
  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual contribution cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -50 || value > 50) {
    return { isValid: false, message: 'Expected growth rate must be between -50% and 50%' };
  }
  return { isValid: true };
}

export function validateYearsToRetirement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Years to retirement cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Years to retirement cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateQualifiedWithdrawals(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Qualified withdrawals cannot be negative' };
  }
  return { isValid: true };
}

export function validateNonQualifiedWithdrawals(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Non-qualified withdrawals cannot be negative' };
  }
  return { isValid: true };
}

export function validateCoverageType(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validTypes = ['self-only', 'family'];
  if (!value || !validTypes.includes(value)) {
    return { isValid: false, message: 'Please select a valid coverage type' };
  }
  return { isValid: true };
}