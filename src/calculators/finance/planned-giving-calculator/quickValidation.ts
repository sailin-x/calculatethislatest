import { ValidationResult } from '../../../types/calculator';

export function validateGiftAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { giftAmount: 'Gift amount cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { giftAmount: 'Gift amount cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDonorAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { donorAge: 'Donor age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 120) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be between 1 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGivingMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['outright', 'charitable_remainder_trust', 'charitable_lead_trust', 'life_insurance', 'bequest'].includes(value)) {
    return { isValid: false, errors: { givingMethod: 'Please select a valid giving method' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxBracket: 'Tax bracket must be between 0% and 50%' } };
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

export function validateCharitableDeductionRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { charitableDeductionRate: 'Charitable deduction rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTrustType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['annuity', 'unitrust', 'lead', 'perpetual'].includes(value)) {
    return { isValid: false, errors: { trustType: 'Please select a valid trust type' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePayoutRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { payoutRate: 'Payout rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTrustTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 100) {
    return { isValid: false, errors: { trustTerm: 'Trust term must be between 1 and 100 years' } };
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