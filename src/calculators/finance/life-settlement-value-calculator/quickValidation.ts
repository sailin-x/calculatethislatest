import { ValidationResult } from '../../../types/calculator';

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

export function validateDeathBenefit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { deathBenefit: 'Death benefit cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { deathBenefit: 'Death benefit cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualPremium(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualPremium: 'Annual premium cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { annualPremium: 'Annual premium cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePolicyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['term', 'whole', 'universal', 'variable'].includes(value)) {
    return { isValid: false, errors: { policyType: 'Please select a valid policy type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHealthStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['excellent', 'good', 'fair', 'poor'].includes(value)) {
    return { isValid: false, errors: { healthStatus: 'Please select a valid health status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSettlementOffer(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { settlementOffer: 'Settlement offer cannot be negative' } };
  }
  if (value > 5000000) {
    return { isValid: false, errors: { settlementOffer: 'Settlement offer cannot exceed $5,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSettlementCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { settlementCosts: 'Settlement costs cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { settlementCosts: 'Settlement costs cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRemainingTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { remainingTerm: 'Remaining term must be between 0 and 100 years' } };
  }
  return { isValid: true, errors: {} };
}