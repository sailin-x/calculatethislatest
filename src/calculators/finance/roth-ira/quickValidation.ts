import { RothIRAInputs } from './types';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Age must be 18 or older' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Age cannot exceed 120' };
  }
  return { isValid: true };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Annual contribution cannot be negative' };
  }
  if (value > 100000) {
    return { isValid: false, message: 'Annual contribution cannot exceed $100,000' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 50) {
    return { isValid: false, message: 'Expected return must be between -10% and 50%' };
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

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  const validStatuses = ['single', 'married_filing_jointly', 'married_filing_separately', 'head_of_household'];
  if (!value || !validStatuses.includes(value)) {
    return { isValid: false, message: 'Please select a valid filing status' };
  }
  return { isValid: true };
}

export function validateIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}