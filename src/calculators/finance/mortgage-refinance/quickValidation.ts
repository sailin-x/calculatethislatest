import { ValidationResult } from '../../../types/calculator';

export function validateCurrentLoanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentLoanBalance: 'Current loan balance cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { currentRate: 'Current rate must be greater than 0%' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { currentRate: 'Current rate must be at least 1%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { currentRate: 'Current rate cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentTermRemaining(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { currentTermRemaining: 'Current term remaining must be greater than 0 years' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { currentTermRemaining: 'Current term remaining must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { currentTermRemaining: 'Current term remaining cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNewLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { newLoanAmount: 'New loan amount must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { newLoanAmount: 'New loan amount must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { newLoanAmount: 'New loan amount cannot exceed $10,000,000' } };
  }
  if (allInputs?.homeValue && value > allInputs.homeValue) {
    return { isValid: false, errors: { newLoanAmount: 'New loan amount cannot exceed home value' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNewRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { newRate: 'New rate must be greater than 0%' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { newRate: 'New rate must be at least 1%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { newRate: 'New rate cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNewTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { newTerm: 'New loan term must be greater than 0 years' } };
  }
  if (value < 5) {
    return { isValid: false, errors: { newTerm: 'New loan term must be at least 5 years' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { newTerm: 'New loan term cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCashOut(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { cashOut: 'Cash out amount cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { cashOut: 'Cash out amount cannot exceed $500,000' } };
  }
  if (allInputs?.homeValue && allInputs?.currentLoanBalance && allInputs?.newLoanAmount) {
    const availableEquity = allInputs.homeValue - allInputs.currentLoanBalance;
    const maxCashOut = availableEquity - (allInputs.newLoanAmount - allInputs.currentLoanBalance);
    if (value > maxCashOut) {
      return { isValid: false, errors: { cashOut: 'Cash out amount cannot exceed available equity' } };
    }
  }
  return { isValid: true, errors: {} };
}

export function validatePoints(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { points: 'Discount points cannot be negative' } };
  }
  if (value > 5) {
    return { isValid: false, errors: { points: 'Discount points cannot exceed 5' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 25000) {
    return { isValid: false, errors: { homeValue: 'Home value must be at least $25,000' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { homeValue: 'Home value cannot exceed $20,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsToStay(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 1) {
    return { isValid: false, errors: { yearsToStay: 'Years to stay must be at least 1' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { yearsToStay: 'Years to stay cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}