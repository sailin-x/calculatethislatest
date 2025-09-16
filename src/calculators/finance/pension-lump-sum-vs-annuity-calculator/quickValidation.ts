import { ValidationResult } from '../../../types/calculator';

export function validateLumpSumAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { lumpSumAmount: 'Lump sum amount cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { lumpSumAmount: 'Lump sum amount cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualAnnuityPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualAnnuityPayment: 'Annual annuity payment cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { annualAnnuityPayment: 'Annual annuity payment cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 120) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be between 1 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxBracket: 'Tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnuityType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['fixed', 'variable', 'inflation_adjusted'].includes(value)) {
    return { isValid: false, errors: { annuityType: 'Please select a valid annuity type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeSpouse(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeSpouse: 'Include spouse must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpouseAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { spouseAge: 'Spouse age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpouseLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 120) {
    return { isValid: false, errors: { spouseLifeExpectancy: 'Spouse life expectancy must be between 1 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['low', 'medium', 'high'].includes(value)) {
    return { isValid: false, errors: { riskTolerance: 'Please select a valid risk tolerance' } };
  }
  return { isValid: true, errors: {} };
}