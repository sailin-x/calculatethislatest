import { ValidationResult } from '../../../types/calculator';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 18 || value > 120) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 18 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConversionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { conversionAmount: 'Conversion amount cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { conversionAmount: 'Conversion amount cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { currentTaxBracket: 'Current tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { expectedTaxBracket: 'Expected tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFiveYearRule(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { fiveYearRule: 'Five-year rule must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTimeHorizon(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 100) {
    return { isValid: false, errors: { timeHorizon: 'Time horizon must be between 1 and 100 years' } };
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

export function validateAccountType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['traditional_ira', '401k', 'sep_ira', 'simple_ira'].includes(value)) {
    return { isValid: false, errors: { accountType: 'Please select a valid account type' } };
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

export function validateMedicalExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { medicalExpenses: 'Medical expenses cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { medicalExpenses: 'Medical expenses cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCharitableContributions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { charitableContributions: 'Charitable contributions cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { charitableContributions: 'Charitable contributions cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}