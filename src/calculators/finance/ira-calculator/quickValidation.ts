import { ValidationResult } from '../../../types/calculator';

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentBalance: 'Current balance cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentBalance: 'Current balance cannot exceed $10,000,000' } };
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

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsToRetirement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { yearsToRetirement: 'Years to retirement must be between 0 and 100' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIRAType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['traditional', 'roth', 'sep', 'simple'].includes(value)) {
    return { isValid: false, errors: { iraType: 'Please select a valid IRA type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxBracket: 'Tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeRequiredMinimumDistributions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeRequiredMinimumDistributions: 'Include RMDs must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpousalIRA(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { spousalIRA: 'Spousal IRA must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCatchUpContributions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { catchUpContributions: 'Catch-up contributions must be true or false' } };
  }
  return { isValid: true, errors: {} };
}