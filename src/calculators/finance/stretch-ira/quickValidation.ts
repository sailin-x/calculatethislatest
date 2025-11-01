import { StretchIRAInputs } from './types';

export function validateInitialBalance(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Initial balance must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Initial balance cannot exceed $10,000,000' };
  }
  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -10 || value > 50) {
    return { isValid: false, message: 'Expected annual return must be between -10% and 50%' };
  }
  return { isValid: true };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < -5 || value > 20) {
    return { isValid: false, message: 'Inflation rate must be between -5% and 20%' };
  }
  return { isValid: true };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (value < 0 || value > 100) {
    return { isValid: false, message: 'Tax bracket must be between 0% and 100%' };
  }
  return { isValid: true };
}

export function validateNumberOfBeneficiaries(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Number of beneficiaries must be at least 1' };
  }
  if (value > 10) {
    return { isValid: false, message: 'Number of beneficiaries cannot exceed 10' };
  }
  return { isValid: true };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 1) {
    return { isValid: false, message: 'Analysis period must be at least 1 year' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Analysis period cannot exceed 100 years' };
  }
  return { isValid: true };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 18) {
    return { isValid: false, message: 'Current age must be at least 18' };
  }
  if (value > 100) {
    return { isValid: false, message: 'Current age cannot exceed 100' };
  }
  return { isValid: true };
}

export function validateFixedWithdrawalAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.withdrawalStrategy === 'fixed_amount' && (!value || value <= 0)) {
    return { isValid: false, message: 'Fixed withdrawal amount must be greater than 0' };
  }
  return { isValid: true };
}

export function validateFixedWithdrawalPercentage(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (allInputs?.withdrawalStrategy === 'fixed_percentage' && (!value || value <= 0 || value > 100)) {
    return { isValid: false, message: 'Fixed withdrawal percentage must be between 0% and 100%' };
  }
  return { isValid: true };
}