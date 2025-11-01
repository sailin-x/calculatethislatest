import { AmortizationScheduleInputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateAnnualInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined || value < 0) {
    return { isValid: false, message: 'Annual interest rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Annual interest rate seems unusually high (>50%)' };
  }
  return { isValid: true };
}

export function validateLoanTermYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan term must be greater than 0 years' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateStartDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) return { isValid: true }; // Optional field

  const date = new Date(value);
  const now = new Date();
  if (isNaN(date.getTime())) {
    return { isValid: false, message: 'Start date must be a valid date' };
  }
  if (date < new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())) {
    return { isValid: false, message: 'Start date cannot be more than 1 year in the past' };
  }
  return { isValid: true };
}

export function validateExtraPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === undefined) return { isValid: true }; // Optional field

  if (value < 0) {
    return { isValid: false, message: 'Extra payment cannot be negative' };
  }
  if (allInputs?.loanAmount && value > allInputs.loanAmount) {
    return { isValid: false, message: 'Extra payment cannot exceed loan amount' };
  }
  return { isValid: true };
}