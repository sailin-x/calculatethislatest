import { ValidationResult } from '../../../types/calculator';

export function validateCurrentPlanBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentPlanBalance: 'Current plan balance cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentPlanBalance: 'Current plan balance cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTargetRetirementBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { targetRetirementBalance: 'Target retirement balance cannot be negative' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { targetRetirementBalance: 'Target retirement balance cannot exceed $20,000,000' } };
  }
  return { isValid: true, errors: {} };
}

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

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualContribution: 'Annual contribution cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { annualContribution: 'Annual contribution cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { employerMatch: 'Employer match must be between 0% and 100%' } };
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

export function validateCurrentSalary(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentSalary: 'Current salary cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentSalary: 'Current salary cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSalaryGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { salaryGrowthRate: 'Salary growth rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePlanType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['defined_benefit', 'defined_contribution', 'cash_balance'].includes(value)) {
    return { isValid: false, errors: { planType: 'Please select a valid plan type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFundingStrategy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['conservative', 'moderate', 'aggressive'].includes(value)) {
    return { isValid: false, errors: { fundingStrategy: 'Please select a valid funding strategy' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeCatchUp(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeCatchUp: 'Include catch-up must be true or false' } };
  }
  return { isValid: true, errors: {} };
}