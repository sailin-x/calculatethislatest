import { StudentLoanForgivenessInputs } from './types';

export function validateLoanBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan balance must be greater than 0' };
  }
  if (value > 5000000) {
    return { isValid: false, message: 'Loan balance cannot exceed $5,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 15) {
    return { isValid: false, message: 'Interest rate must be between 0% and 15%' };
  }
  return { isValid: true };
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Monthly payment must be greater than 0' };
  }
  if (value && allInputs?.loanBalance && value > allInputs.loanBalance * 0.1) {
    return { isValid: false, message: 'Monthly payment seems unusually high for the loan balance' };
  }
  return { isValid: true };
}

export function validateYearsOfService(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Years of service cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Years of service cannot exceed 50' };
  }
  return { isValid: true };
}

export function validateRequiredYearsForForgiveness(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Required years for forgiveness must be at least 1' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Required years for forgiveness cannot exceed 30' };
  }
  return { isValid: true };
}

export function validateIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Income cannot be negative' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateFamilySize(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Family size must be at least 1' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Family size cannot exceed 20' };
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

export function validateExpectedSalaryGrowth(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 20) {
    return { isValid: false, message: 'Expected salary growth must be between -10% and 20%' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Tax bracket must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateAlternativePayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Alternative payment cannot be negative' };
  }
  return { isValid: true };
}