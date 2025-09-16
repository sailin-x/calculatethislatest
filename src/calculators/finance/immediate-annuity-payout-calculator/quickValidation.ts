import { ValidationResult } from '../../../types/calculator';

export function validatePrincipalAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { principalAmount: 'Principal amount cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { principalAmount: 'Principal amount cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { age: 'Age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGender(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['male', 'female'].includes(value)) {
    return { isValid: false, errors: { gender: 'Please select a valid gender' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePayoutType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['single-life', 'joint-life', 'period-certain'].includes(value)) {
    return { isValid: false, errors: { payoutType: 'Please select a valid payout type' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePayoutFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['monthly', 'quarterly', 'semi-annual', 'annual'].includes(value)) {
    return { isValid: false, errors: { payoutFrequency: 'Please select a valid payout frequency' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnuityType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['fixed', 'variable', 'inflation-adjusted'].includes(value)) {
    return { isValid: false, errors: { annuityType: 'Please select a valid annuity type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGuaranteePeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 40) {
    return { isValid: false, errors: { guaranteePeriod: 'Guarantee period must be between 0 and 40 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateJointAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { jointAge: 'Joint age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateJointGender(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['male', 'female'].includes(value)) {
    return { isValid: false, errors: { jointGender: 'Please select a valid joint gender' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between 0% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}