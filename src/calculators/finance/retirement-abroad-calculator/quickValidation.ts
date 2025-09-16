import { ValidationResult } from '../../../types/calculator';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 120) {
    return { isValid: false, errors: { retirementAge: 'Retirement age must be between 1 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentSavings: 'Current savings cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentSavings: 'Current savings cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyRetirementIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { monthlyRetirementIncome: 'Monthly retirement income cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { monthlyRetirementIncome: 'Monthly retirement income cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTargetCountry(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['portugal', 'spain', 'mexico', 'panama', 'thailand', 'malaysia', 'costa_rica', 'ecuador', 'uruguay', 'chile'].includes(value)) {
    return { isValid: false, errors: { targetCountry: 'Please select a valid target country' } };
  }
  return { isValid: true, errors: {} };
}

export function validateResidencyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['temporary', 'permanent', 'citizenship'].includes(value)) {
    return { isValid: false, errors: { residencyType: 'Please select a valid residency type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeHealthcare(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeHealthcare: 'Include healthcare must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHealthcareCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { healthcareCost: 'Healthcare cost cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { healthcareCost: 'Healthcare cost cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHousingCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { housingCost: 'Housing cost cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { housingCost: 'Housing cost cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCostOfLivingAdjustment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -50 || value > 200) {
    return { isValid: false, errors: { costOfLivingAdjustment: 'Cost of living adjustment must be between -50% and 200%' } };
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

export function validateCurrencyExchangeRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0.1 || value > 10) {
    return { isValid: false, errors: { currencyExchangeRate: 'Currency exchange rate must be between 0.1 and 10' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}