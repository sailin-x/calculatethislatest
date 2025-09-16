import { ValidationResult } from '../../../types/calculator';

export function validateInitialValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { initialValue: 'Initial value cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { initialValue: 'Initial value cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnuityRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { annuityRate: 'Annuity rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTermYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 20) {
    return { isValid: false, errors: { termYears: 'Term years must be between 1 and 20' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { growthRate: 'Growth rate must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 30) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between 0% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGSTTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { gstTaxRate: 'GST tax rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEstateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { estateTaxRate: 'Estate tax rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeStateTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeStateTax: 'Include state tax must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { stateTaxRate: 'State tax rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between 0% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTrustType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['standard', 'zeroed-out', 'rollover'].includes(value)) {
    return { isValid: false, errors: { trustType: 'Please select a valid trust type' } };
  }
  return { isValid: true, errors: {} };
}