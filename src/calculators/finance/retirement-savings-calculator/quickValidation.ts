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

export function validateCurrentSavings(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentSavings: 'Current savings cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentSavings: 'Current savings cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution cannot exceed $10,000' } };
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

export function validateRetirementIncomeNeeded(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { retirementIncomeNeeded: 'Retirement income needed cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { retirementIncomeNeeded: 'Retirement income needed cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSocialSecurityBenefit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { socialSecurityBenefit: 'Social Security benefit cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { socialSecurityBenefit: 'Social Security benefit cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxBracket: 'Tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateContributionFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['monthly', 'annual'].includes(value)) {
    return { isValid: false, errors: { contributionFrequency: 'Please select a valid contribution frequency' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAccountType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['traditional_ira', 'roth_ira', '401k', 'taxable'].includes(value)) {
    return { isValid: false, errors: { accountType: 'Please select a valid account type' } };
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
  if (value > 20000) {
    return { isValid: false, errors: { employerMatchLimit: 'Employer match limit cannot exceed $20,000' } };
  }
  return { isValid: true, errors: {} };
}