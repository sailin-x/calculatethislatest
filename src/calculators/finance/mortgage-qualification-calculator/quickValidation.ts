import { MortgageQualificationInputs } from './types';

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Annual income must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Annual income cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
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

export function validateDownPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Down payment cannot be negative' };
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

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Loan term must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Loan term cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Interest rate cannot exceed 30%' };
  }
  return { isValid: true };
}

export function validateEmploymentLength(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Employment length cannot be negative' };
  }
  return { isValid: true };
}

export function validateLatePayments(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Late payments count cannot be negative' };
  }
  return { isValid: true };
}

export function validateGiftFunds(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Gift funds cannot be negative' };
  }
  return { isValid: true };
}

export function validateCoSignerIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.coSigner && (!value || value <= 0)) {
    return { isValid: false, message: 'Co-signer income must be greater than 0' };
  }
  return { isValid: true };
}

export function validateCoSignerCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.coSigner && value) {
    if (value < 300 || value > 850) {
      return { isValid: false, message: 'Co-signer credit score must be between 300 and 850' };
    }
  }
  return { isValid: true };
}

export function validateIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Income cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpense(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Expense cannot be negative' };
  }
  return { isValid: true };
}

export function validateNumberOfDependents(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Number of dependents cannot be negative' };
  }
  return { isValid: true };
}

export function validateAsset(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Asset balance cannot be negative' };
  }
  return { isValid: true };
}

export function validateDebt(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Debt balance cannot be negative' };
  }
  return { isValid: true };
}