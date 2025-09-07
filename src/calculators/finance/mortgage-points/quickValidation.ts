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

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Property value must be greater than 0' };
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

export function validatePointCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Point cost must be greater than 0' };
  }
  if (value > 10000) {
    return { isValid: false, message: 'Point cost cannot exceed $10,000' };
  }
  return { isValid: true };
}

export function validateBorrowerIncome(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Borrower income must be greater than 0' };
  }
  return { isValid: true };
}

export function validateBorrowerCreditScore(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 300) {
    return { isValid: false, message: 'Credit score must be at least 300' };
  }
  if (value > 850) {
    return { isValid: false, message: 'Credit score cannot exceed 850' };
  }
  return { isValid: true };
}

export function validateBorrowerTaxRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Tax rate must be between 0% and 50%' };
  }
  return { isValid: true };
}

export function validateMarketGrowthRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -20 || value > 50) {
    return { isValid: false, message: 'Market growth rate must be between -20% and 50%' };
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

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validatePropertyAppreciationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 30) {
    return { isValid: false, message: 'Property appreciation rate must be between -10% and 30%' };
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

export function validateTaxDeductionPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value && value < 1) {
    return { isValid: false, message: 'Tax deduction period must be at least 1 year' };
  }
  if (value && allInputs?.loanTerm && value > allInputs.loanTerm) {
    return { isValid: false, message: 'Tax deduction period cannot exceed loan term' };
  }
  return { isValid: true };
}