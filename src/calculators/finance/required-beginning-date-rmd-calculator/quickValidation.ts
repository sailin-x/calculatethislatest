import { ValidationResult } from '../../../types/calculator';

export function validateBirthYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1900 || value > 2010) {
    return { isValid: false, errors: { birthYear: 'Birth year must be between 1900 and 2010' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 2020 || value > 2050) {
    return { isValid: false, errors: { currentYear: 'Current year must be between 2020 and 2050' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAccountBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { accountBalance: 'Account balance cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { accountBalance: 'Account balance cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 120) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be between 1 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAccountType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['traditional_ira', 'roth_ira', '401k', '403b', 'sep_ira', 'simple_ira'].includes(value)) {
    return { isValid: false, errors: { accountType: 'Please select a valid account type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBeneficiaryType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['spouse', 'non_spouse', 'charity', 'estate'].includes(value)) {
    return { isValid: false, errors: { beneficiaryType: 'Please select a valid beneficiary type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeSpouse(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeSpouse: 'Include spouse must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpouseBirthYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1900 || value > 2010) {
    return { isValid: false, errors: { spouseBirthYear: 'Spouse birth year must be between 1900 and 2010' } };
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