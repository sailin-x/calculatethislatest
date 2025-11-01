import { MortgageEquityInputs } from './types';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
  }
  return { isValid: true };
}

export function validateLoanBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Loan balance cannot be negative' };
  }
  if (allInputs?.propertyValue && value > allInputs.propertyValue) {
    return { isValid: false, message: 'Loan balance cannot exceed property value' };
  }
  return { isValid: true };
}

export function validateOriginalLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Original loan amount must be greater than 0' };
  }
  return { isValid: true };
}

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Monthly payment must be greater than 0' };
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

export function validateMonthsPaid(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Months paid cannot be negative' };
  }
  if (allInputs?.loanTerm && value > allInputs.loanTerm * 12) {
    return { isValid: false, message: 'Months paid cannot exceed total loan term' };
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

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20) {
    return { isValid: false, message: 'Market growth rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Market growth rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Analysis period must be at least 1 year' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Analysis period cannot exceed 30 years' };
  }
  return { isValid: true };
}

export function validateCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Cost cannot be negative' };
  }
  return { isValid: true };
}

export function validatePercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Percentage cannot be negative' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Percentage cannot exceed 100%' };
  }
  return { isValid: true };
}