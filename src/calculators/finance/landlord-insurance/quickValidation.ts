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

  if (numValue < 100000) {
    errors.push('Property value must be at least $100,000');
  }
  if (numValue > 50000000) {
    errors.push('Property value cannot exceed $50,000,000');
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

  if (numValue < 100000) {
    errors.push('Dwelling coverage must be at least $100,000');
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
  if (numValue < 500000) {
    warnings.push('Consider increasing liability coverage to at least $500,000 for landlords');
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

  if (numValue < 500) {
    errors.push('Deductible must be at least $500');
  }
  if (numValue > 25000) {
    errors.push('Deductible cannot exceed $25,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateMonthlyRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Monthly rent is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Monthly rent must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Monthly rent cannot be negative');
  }
  if (numValue > 100000) {
    errors.push('Monthly rent cannot exceed $100,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Occupancy rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Occupancy rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Occupancy rate must be between 0% and 100%');
  }

  if (numValue < 70) {
    warnings.push('Low occupancy rate may indicate market challenges');
  }

  return { isValid: errors.length === 0, errors, warnings };
}
