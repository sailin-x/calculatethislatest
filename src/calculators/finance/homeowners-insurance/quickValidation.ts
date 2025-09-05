import { ValidationResult } from './validation';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Property value is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Property value must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 50000) {
    errors.push('Property value must be at least $50,000');
  }
  if (numValue > 10000000) {
    errors.push('Property value cannot exceed $10,000,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validatePropertyAddress(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!value || typeof value !== 'string' || value.trim().length < 10) {
    errors.push('Property address is required and must be at least 10 characters');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDwellingCoverage(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Dwelling coverage is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Dwelling coverage must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 50000) {
    errors.push('Dwelling coverage must be at least $50,000');
  }

  if (allInputs?.propertyValue && numValue > allInputs.propertyValue * 2) {
    warnings.push('Dwelling coverage exceeds 200% of property value');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLiabilityCoverage(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Liability coverage is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Liability coverage must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 100000) {
    errors.push('Liability coverage must be at least $100,000');
  }
  if (numValue < 300000) {
    warnings.push('Consider increasing liability coverage to at least $300,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateDeductible(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Deductible is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Deductible must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 250) {
    errors.push('Deductible must be at least $250');
  }
  if (numValue > 10000) {
    errors.push('Deductible cannot exceed $10,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}
