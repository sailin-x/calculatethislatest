import { ValidationResult } from '../../../types/calculator';

export function validateAnnualContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualContribution: 'Annual contribution cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { annualContribution: 'Annual contribution cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentBalance: 'Current balance cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { currentBalance: 'Current balance cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 120) {
    return { isValid: false, errors: { age: 'Age must be between 0 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCoverageType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['self-only', 'family'].includes(value)) {
    return { isValid: false, errors: { coverageType: 'Please select a valid coverage type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateContributionType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['employee', 'self-employed', 'catch-up'].includes(value)) {
    return { isValid: false, errors: { contributionType: 'Please select a valid contribution type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInvestmentReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { investmentReturn: 'Investment return must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsToRetirement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { yearsToRetirement: 'Years to retirement must be between 0 and 100' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncomeTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { incomeTaxRate: 'Income tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCapitalGainsTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { capitalGainsTaxRate: 'Capital gains tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateComparisonInvestmentReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { comparisonInvestmentReturn: 'Comparison investment return must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}