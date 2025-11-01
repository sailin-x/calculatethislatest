import { HelocInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateHomeValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Home value must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Home value cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateOutstandingMortgageBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Outstanding mortgage balance cannot be negative' };
  }
  if (allInputs?.homeValue && value > allInputs.homeValue) {
    return { isValid: false, message: 'Outstanding mortgage balance cannot exceed home value' };
  }
  return { isValid: true };
}

export function validateCreditLimitPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Credit limit percentage must be greater than 0' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Credit limit percentage cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Interest rate seems unusually high (>25%)' };
  }
  return { isValid: true };
}

export function validateDrawPeriodYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Draw period must be greater than 0 years' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Draw period cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateRepaymentPeriodYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Repayment period must be greater than 0 years' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Repayment period cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateMonthlyDrawAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Monthly draw amount cannot be negative' };
  }
  return { isValid: true };
}

export function validateOneTimeDrawAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'One-time draw amount cannot be negative' };
  }
  return { isValid: true };
}