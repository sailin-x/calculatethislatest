import { ValidationResult } from '../../types';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Property value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Property value must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Property value must be greater than $0' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Property value cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Tax rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Tax rate must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Tax rate cannot be negative' };
  }

  if (numValue > 50) {
    return { isValid: false, error: 'Tax rate cannot exceed 50%' };
  }

  return { isValid: true };
}

export function validateExemptions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Exemptions are optional
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Exemption amount must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Exemption amount cannot be negative' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Exemption amount cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateAssessmentRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Assessment ratio is optional
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Assessment ratio must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Assessment ratio must be greater than 0' };
  }

  if (numValue > 2.0) {
    return { isValid: false, error: 'Assessment ratio cannot exceed 200%' };
  }

  return { isValid: true };
}

export function validateHomesteadExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  return validateExemptions(value, allInputs);
}

export function validateSeniorExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  return validateExemptions(value, allInputs);
}

export function validateDisabilityExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  return validateExemptions(value, allInputs);
}

export function validateVeteranExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  return validateExemptions(value, allInputs);
}

export function validateLocalTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  return validateExemptions(value, allInputs);
}

export function validateSpecialAssessments(value: any, allInputs?: Record<string, any>): ValidationResult {
  return validateExemptions(value, allInputs);
}