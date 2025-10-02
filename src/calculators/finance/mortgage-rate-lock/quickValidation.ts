import { ValidationResult } from '../../types/calculator';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { loanAmount: 'Loan amount must be greater than $0' } };
  }
  if (value < 25000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount must be at least $25,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { loanAmount: 'Loan amount cannot exceed $10,000,000' } };
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

export function validateMarketRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { marketRate: 'Market rate must be greater than 0%' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { marketRate: 'Market rate must be at least 1%' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { marketRate: 'Market rate cannot exceed 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLockPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { lockPeriod: 'Lock period must be greater than 0 days' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { lockPeriod: 'Lock period must be at least 1 day' } };
  }
  if (value > 180) {
    return { isValid: false, errors: { lockPeriod: 'Lock period cannot exceed 180 days' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLockCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { lockCost: 'Lock cost cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { lockCost: 'Lock cost cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateClosingDays(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { closingDays: 'Days to closing must be greater than 0' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { closingDays: 'Days to closing must be at least 1 day' } };
  }
  if (value > 365) {
    return { isValid: false, errors: { closingDays: 'Days to closing cannot exceed 365 days' } };
  }
  if (allInputs?.lockPeriod && value > allInputs.lockPeriod) {
    return { isValid: false, errors: { closingDays: 'Days to closing cannot exceed lock period' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedRateChange(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < -5) {
    return { isValid: false, errors: { expectedRateChange: 'Expected rate change cannot be less than -5%' } };
  }
  if (value > 5) {
    return { isValid: false, errors: { expectedRateChange: 'Expected rate change cannot exceed 5%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompareLockPeriod1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 1) {
    return { isValid: false, errors: { compareLockPeriod1: 'Comparison lock period must be at least 1 day' } };
  }
  if (value > 180) {
    return { isValid: false, errors: { compareLockPeriod1: 'Comparison lock period cannot exceed 180 days' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompareLockPeriod2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 1) {
    return { isValid: false, errors: { compareLockPeriod2: 'Comparison lock period must be at least 1 day' } };
  }
  if (value > 180) {
    return { isValid: false, errors: { compareLockPeriod2: 'Comparison lock period cannot exceed 180 days' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRateVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { rateVolatility: 'Rate volatility cannot be negative' } };
  }
  if (value > 5) {
    return { isValid: false, errors: { rateVolatility: 'Rate volatility cannot exceed 5%' } };
  }
  return { isValid: true, errors: {} };
}