import { StudentLoanRepaymentInputs } from './types';

export function validateLoanBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan balance must be greater than 0' };
  }
  if (value > 500000) {
    return { isValid: false, message: 'Loan balance cannot exceed $500,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Interest rate must be 0 or greater' };
  }
  if (value > 15) {
    return { isValid: false, message: 'Interest rate cannot exceed 15%' };
  }
  return { isValid: true };
}

export function validateLoanTermYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Loan term must be at least 1 year' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Loan term cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Monthly income must be greater than 0' };
  }
  if (value > 50000) {
    return { isValid: false, message: 'Monthly income cannot exceed $50,000' };
  }
  return { isValid: true };
}

export function validateMonthlyExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly expenses cannot be negative' };
  }
  if (allInputs?.monthlyIncome && value >= allInputs.monthlyIncome) {
    return { isValid: false, message: 'Monthly expenses cannot be greater than or equal to income' };
  }
  return { isValid: true };
}

export function validateFamilySize(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Family size must be at least 1' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Family size cannot exceed 10' };
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

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateSpouseIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Spouse income cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedIncomeGrowth(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20 || value > 50) {
    return { isValid: false, message: 'Expected income growth must be between -20% and 50%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}