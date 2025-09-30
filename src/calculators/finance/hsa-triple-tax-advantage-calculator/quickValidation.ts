import { HsaTripleTaxAdvantageCalculatorInputs } from './types';

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Annual contribution must be greater than 0' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Annual contribution cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Tax rate must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Tax rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateYearsOfContributions(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Years of contributions must be greater than 0' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Years of contributions cannot exceed 50' };
  }
  return { isValid: true };
}

export function validateExpectedGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -50 || value > 50) {
    return { isValid: false, message: 'Expected growth rate must be between -50% and 50%' };
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