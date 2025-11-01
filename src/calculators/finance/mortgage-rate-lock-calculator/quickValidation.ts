import { MortgageRateLockInputs } from './types';

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Loan amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Loan amount cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateLockedInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Locked interest rate cannot be negative' };
  }
  if (value > 30) {
    return { isValid: false, message: 'Locked interest rate cannot exceed 30%' };
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

export function validateLockPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Lock period must be greater than 0 days' };
  }
  if (value > 180) {
    return { isValid: false, message: 'Lock period cannot exceed 180 days' };
  }
  return { isValid: true };
}

export function validateLockExpirationDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Lock expiration date is required' };
  }
  const expirationDate = new Date(value);
  const today = new Date();
  if (expirationDate <= today) {
    return { isValid: false, message: 'Lock expiration date must be in the future' };
  }
  return { isValid: true };
}

export function validateEstimatedClosingDate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value) {
    return { isValid: false, message: 'Estimated closing date is required' };
  }
  const closingDate = new Date(value);
  const today = new Date();
  if (closingDate <= today) {
    return { isValid: false, message: 'Estimated closing date must be in the future' };
  }
  return { isValid: true };
}

export function validateRateLockCost(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Rate lock cost cannot be negative' };
  }
  return { isValid: true };
}

export function validateLenderCredit(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Lender credit cannot be negative' };
  }
  return { isValid: true };
}

export function validateFloatDownRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.floatDownOption && value < 0) {
    return { isValid: false, message: 'Float down rate cannot be negative' };
  }
  return { isValid: true };
}

export function validateExpectedRateMovement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (Math.abs(value) > 500) {
    return { isValid: false, message: 'Expected rate movement cannot exceed 500 basis points' };
  }
  return { isValid: true };
}

export function validateConfidenceLevel(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Confidence level must be between 0 and 100' };
  }
  return { isValid: true };
}

export function validateAverageMovement(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -200 || value > 200) {
    return { isValid: false, message: 'Average movement must be between -200 and 200 basis points per day' };
  }
  return { isValid: true };
}

export function validateVolatilityIndex(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Volatility index must be between 0 and 100' };
  }
  return { isValid: true };
}

export function validateRateAdjustmentCap(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0) {
    return { isValid: false, message: 'Rate adjustment cap cannot be negative' };
  }
  return { isValid: true };
}