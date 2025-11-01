import { StudentLoanRefinancingInputs } from './types';

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current loan balance must be greater than 0' };
  }
  if (value > 500000) {
    return { isValid: false, message: 'Loan balance cannot exceed $500,000' };
  }
  return { isValid: true };
}

export function validateCurrentInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Current interest rate must be 0 or greater' };
  }
  if (value > 15) {
    return { isValid: false, message: 'Interest rate cannot exceed 15%' };
  }
  return { isValid: true };
}

export function validateCurrentMonthlyPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Current monthly payment must be greater than 0' };
  }
  return { isValid: true };
}

export function validateRemainingTermMonths(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Remaining term must be at least 1 month' };
  }
  if (value > 360) {
    return { isValid: false, message: 'Remaining term cannot exceed 30 years (360 months)' };
  }
  return { isValid: true };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 300) {
    return { isValid: false, message: 'Credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850' };
  }
  return { isValid: true };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Annual income must be greater than 0' };
  }
  if (value > 1000000) {
    return { isValid: false, message: 'Annual income cannot exceed $1,000,000' };
  }
  return { isValid: true };
}

export function validateDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'DTI ratio cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'DTI ratio cannot exceed 100%' };
  }
  return { isValid: true };
}

export function validateCosignerCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.cosignerAvailable && (!value || value < 300 || value > 850)) {
    return { isValid: false, message: 'Cosigner credit score must be between 300 and 850' };
  }
  return { isValid: true };
}

export function validateCosignerIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.cosignerAvailable && value && value <= 0) {
    return { isValid: false, message: 'Cosigner income must be greater than 0' };
  }
  return { isValid: true };
}

export function validateTargetInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (value < 0 || value > 15)) {
    return { isValid: false, message: 'Target interest rate must be between 0% and 15%' };
  }
  return { isValid: true };
}

export function validateTargetTermYears(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && (value < 1 || value > 30)) {
    return { isValid: false, message: 'Target term must be between 1 and 30 years' };
  }
  return { isValid: true };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Closing costs cannot be negative' };
  }
  return { isValid: true };
}

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value <= 0) {
    return { isValid: false, message: 'Monthly income must be greater than 0' };
  }
  return { isValid: true };
}

export function validateMonthlyDebts(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly debts cannot be negative' };
  }
  return { isValid: true };
}