import { MortgageLifeInputs } from './types';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Interest rate must be 0 or greater' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Interest rate cannot exceed 30%' };
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

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateBorrowerAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Borrower must be at least 18 years old' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Borrower age cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateBorrowerLifeExpectancy(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || (allInputs?.borrowerAge && value <= allInputs.borrowerAge)) {
    return { isValid: false, message: 'Life expectancy must be greater than current age' };
  }
  if (value > 120) {
    return { isValid: false, message: 'Life expectancy cannot exceed 120 years' };
  }
  return { isValid: true };
}

export function validateSpouseAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.includeSpouse && (!value || value < 18)) {
    return { isValid: false, message: 'Spouse must be at least 18 years old' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Spouse age cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Monthly payment must be greater than 0' };
  }
  return { isValid: true };
}

export function validateAppreciationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20) {
    return { isValid: false, message: 'Property appreciation rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Property appreciation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5) {
    return { isValid: false, message: 'Inflation rate cannot be less than -5%' };
  }
  if (value > 20) {
    return { isValid: false, message: 'Inflation rate cannot exceed 20%' };
  }
  return { isValid: true };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Discount rate must be 0 or greater' };
  }
  if (value > 25) {
    return { isValid: false, message: 'Discount rate cannot exceed 25%' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Analysis period must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Analysis period cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validateMonthlyIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly income cannot be negative' };
  }
  return { isValid: true };
}

export function validateMonthlyExpenses(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Monthly expenses cannot be negative' };
  }
  return { isValid: true };
}

export function validateChildrenCount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Children count cannot be negative' };
  }
  return { isValid: true };
}

export function validateCollegeFundNeeded(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'College fund needed cannot be negative' };
  }
  return { isValid: true };
}

export function validateRetirementSavings(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Retirement savings cannot be negative' };
  }
  return { isValid: true };
}

export function validateLifeInsuranceCoverage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Life insurance coverage cannot be negative' };
  }
  return { isValid: true };
}