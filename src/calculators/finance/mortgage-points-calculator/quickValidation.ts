import { MortgagePointsInputs } from './types';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateBaseInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value === null || value === undefined || value < 0) {
    return { isValid: false, message: 'Base interest rate must be 0 or greater' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Base interest rate cannot exceed 30%' };
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

export function validateDiscountPoints(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Discount points cannot be negative' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Discount points cannot exceed 10' };
  }
  return { isValid: true };
}

export function validateOriginationPoints(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Origination points cannot be negative' };
  }
  if (value > 5) {
    return { isValid: false, message: 'Origination points cannot exceed 5' };
  }
  return { isValid: true };
}

export function validateLenderCredits(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Lender credits cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedHoldingPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Expected holding period must be at least 1 year' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Expected holding period cannot exceed 50 years' };
  }
  return { isValid: true };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20) {
    return { isValid: false, message: 'Property appreciation rate cannot be less than -20%' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Property appreciation rate cannot exceed 50%' };
  }
  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
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

export function validateMonthlyPayment(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Monthly payment must be greater than 0' };
  }
  return { isValid: true };
}

export function validateCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Cost cannot be negative' };
  }
  return { isValid: true };
}

export function validateCurrentMarketRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Current market rate cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Current market rate cannot exceed 30%' };
  }
  return { isValid: true };
}