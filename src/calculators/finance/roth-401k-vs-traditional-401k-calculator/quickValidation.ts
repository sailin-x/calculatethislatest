import { ValidationResult } from '../../../types/calculator';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 18 || value > 120) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 18 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRetirementAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 50 || value > 120) {
    return { isValid: false, errors: { retirementAge: 'Retirement age must be between 50 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentIncome: 'Current income cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentIncome: 'Current income cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedIncomeGrowth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { expectedIncomeGrowth: 'Expected income growth must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { currentTaxBracket: 'Current tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRetirementTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { retirementTaxBracket: 'Retirement tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualContribution: 'Annual contribution cannot be negative' } };
  }
  if (value > 23000) {
    return { isValid: false, errors: { annualContribution: 'Annual contribution cannot exceed $23,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { employerMatch: 'Employer match must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEmployerMatchLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { employerMatchLimit: 'Employer match limit cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { employerMatchLimit: 'Employer match limit cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTimeHorizon(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 100) {
    return { isValid: false, errors: { timeHorizon: 'Time horizon must be between 1 and 100 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRothConversionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { rothConversionAmount: 'Roth conversion amount cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { rothConversionAmount: 'Roth conversion amount cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFiveYearRule(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { fiveYearRule: 'Five-year rule must be true or false' } };
  }
  return { isValid: true, errors: {} };
}