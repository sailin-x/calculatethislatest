import { ValidationResult } from '../../../types/calculator';

export function validateCurrentAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { currentAge: 'Current age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualSalary: 'Annual salary cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { annualSalary: 'Annual salary cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { employerMatch: 'Employer match must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrent401kBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { current401kBalance: 'Current 401(k) balance cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { current401kBalance: 'Current 401(k) balance cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentRothBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentRothBalance: 'Current Roth balance cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentRothBalance: 'Current Roth balance cannot exceed $10,000,000' } };
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

export function validateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxBracket: 'Tax bracket must be between 0% and 50%' } };
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
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeAfterTaxContributions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeAfterTaxContributions: 'Include after-tax contributions must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeEmployerMatch: 'Include employer match must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRecharacterizationStrategy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { recharacterizationStrategy: 'Recharacterization strategy must be true or false' } };
  }
  return { isValid: true, errors: {} };
}