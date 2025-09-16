import { ValidationResult } from '../../../types/calculator';

export function validateMonthlyRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { monthlyRent: 'Monthly rent must be greater than $0' } };
  }
  if (value < 100) {
    return { isValid: false, errors: { monthlyRent: 'Monthly rent must be at least $100' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { monthlyRent: 'Monthly rent cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualRentIncrease(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { annualRentIncrease: 'Annual rent increase must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCoverageYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { coverageYears: 'Coverage years must be at least 1' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { coverageYears: 'Coverage years must be at least 1' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { coverageYears: 'Coverage years cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePersonalPropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { personalPropertyValue: 'Personal property value cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { personalPropertyValue: 'Personal property value cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLiabilityCoverage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { liabilityCoverage: 'Liability coverage cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { liabilityCoverage: 'Liability coverage cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDeductibleAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { deductibleAmount: 'Deductible amount cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { deductibleAmount: 'Deductible amount cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsurancePremium(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { insurancePremium: 'Insurance premium must be greater than $0' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { insurancePremium: 'Insurance premium must be at least $1' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { insurancePremium: 'Insurance premium cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -5 || value > 15) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -5% and 15%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAleCoverageDays(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs?.additionalLivingExpenses) return { isValid: true, errors: {} };
  if (value === undefined || value < 0 || value > 365) {
    return { isValid: false, errors: { aleCoverageDays: 'ALE coverage days must be between 0 and 365' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAleDailyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs?.additionalLivingExpenses) return { isValid: true, errors: {} };
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { aleDailyRate: 'ALE daily rate cannot be negative' } };
  }
  if (value > 500) {
    return { isValid: false, errors: { aleDailyRate: 'ALE daily rate cannot exceed $500' } };
  }
  return { isValid: true, errors: {} };
}

export function validateReplacementCostCoverage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { replacementCostCoverage: 'Invalid value for replacement cost coverage' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAdditionalLivingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { additionalLivingExpenses: 'Invalid value for additional living expenses' } };
  }
  return { isValid: true, errors: {} };
}