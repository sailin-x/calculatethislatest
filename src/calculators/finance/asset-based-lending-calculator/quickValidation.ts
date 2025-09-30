import { AssetBasedLendingCalculatorInputs } from './types';

/**
 * Quick validation for individual fields in asset-based lending calculator
 * Includes allInputs parameter as required by validation standards
 */
export function validateAssetValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0) {
    return { isValid: false, message: 'Asset value must be greater than 0' };
  }
  if (value > 100000000) {
    return { isValid: false, message: 'Asset value cannot exceed $100,000,000' };
  }
  return { isValid: true };
}

export function validateAdvanceRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 100) {
    return { isValid: false, message: 'Advance rate must be between 0 and 100 percent' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 50) {
    return { isValid: false, message: 'Interest rate must be between 0 and 50 percent' };
  }
  return { isValid: true };
}

export function validateLoanTerm(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value <= 0 || value > 360) {
    return { isValid: false, message: 'Loan term must be between 1 and 360 months' };
  }
  return { isValid: true };
}

export function validateOriginationFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 10) {
    return { isValid: false, message: 'Origination fee must be between 0 and 10 percent' };
  }
  return { isValid: true };
}

export function validateMonitoringFee(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 5) {
    return { isValid: false, message: 'Monitoring fee must be between 0 and 5 percent' };
  }
  return { isValid: true };
}
