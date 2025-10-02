import { ValidationResult } from '../../types/calculator';

/**
 * Quick validation functions for compound interest calculator
 * Each function validates a single field and includes the allInputs parameter
 */

export function validatePrincipal(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { principal: 'Principal must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { principal: 'Principal must be greater than 0' } };
  }
  if (num > 1000000000) {
    return { isValid: false, errors: { principal: 'Principal cannot exceed $1 billion' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { rate: 'Interest rate must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { rate: 'Interest rate cannot be negative' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { rate: 'Interest rate cannot exceed 100%' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { rate: 'Interest rates above 50% are unusual and may indicate an error' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTime(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { time: 'Time period must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { time: 'Time period must be greater than 0' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { time: 'Time period cannot exceed 100 years' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { time: 'Time periods over 50 years may not be realistic for most investment scenarios' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompoundingFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { compoundingFrequency: 'Compounding frequency must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { compoundingFrequency: 'Compounding frequency must be greater than 0' } };
  }
  if (num > 365) {
    return { isValid: false, errors: { compoundingFrequency: 'Compounding frequency cannot exceed 365 times per year' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyContribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution cannot be negative' } };
  }
  if (num > 100000) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution cannot exceed $100,000' } };
  }
  
  // Check if contribution is unusually high compared to principal
  if (allInputs?.principal && num > Number(allInputs.principal) * 12) {
    return { isValid: false, errors: { monthlyContribution: 'Monthly contribution is unusually high compared to principal' } };
  }
  
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be a valid number' } };
  }
  if (num < -50) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate cannot be below -50%' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate cannot exceed 100%' } };
  }
  
  // Check if inflation rate is higher than interest rate
  if (allInputs?.rate && num > Number(allInputs.rate)) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate should not exceed interest rate for positive real returns' } };
  }
  
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot be negative' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTargetAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { targetAmount: 'Target amount must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { targetAmount: 'Target amount must be greater than 0' } };
  }
  if (num > 1000000000) {
    return { isValid: false, errors: { targetAmount: 'Target amount cannot exceed $1 billion' } };
  }
  
  // Check if target is greater than principal
  if (allInputs?.principal && num <= Number(allInputs.principal)) {
    return { isValid: false, errors: { targetAmount: 'Target amount must be greater than the principal amount' } };
  }
  
  return { isValid: true, errors: {} };
}

export function validateIncludeInflation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value && (!allInputs?.inflationRate || Number(allInputs.inflationRate) === 0)) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate is required when inflation adjustment is enabled' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value && (!allInputs?.taxRate || Number(allInputs.taxRate) === 0)) {
    return { isValid: false, errors: { taxRate: 'Tax rate is required when tax impact calculation is enabled' } };
  }
  return { isValid: true, errors: {} };
}
