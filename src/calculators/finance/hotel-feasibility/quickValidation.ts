import { ValidationResult } from './validation';

export function validateTotalRooms(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Total rooms is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Total rooms must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 1) {
    errors.push('Total rooms must be at least 1');
  }
  if (numValue > 1000) {
    errors.push('Total rooms cannot exceed 1000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateAcquisitionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Acquisition cost is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Acquisition cost must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 100000) {
    errors.push('Acquisition cost must be at least $100,000');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateProjectedOccupancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Projected occupancy is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Projected occupancy must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 100) {
    errors.push('Projected occupancy must be between 0% and 100%');
  }

  if (numValue < 50) {
    warnings.push('Projected occupancy below 50% may indicate market challenges');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Interest rate is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Interest rate must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0 || numValue > 0.5) {
    errors.push('Interest rate must be between 0% and 50%');
  }

  if (numValue > 0.15) {
    warnings.push('Interest rate above 15% may impact profitability');
  }

  return { isValid: errors.length === 0, errors, warnings };
}

export function validateLoanAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (value === null || value === undefined || value === '') {
    errors.push('Loan amount is required');
    return { isValid: false, errors, warnings };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push('Loan amount must be a valid number');
    return { isValid: false, errors, warnings };
  }

  if (numValue < 0) {
    errors.push('Loan amount cannot be negative');
  }

  if (allInputs?.acquisitionCost && numValue > allInputs.acquisitionCost) {
    errors.push('Loan amount cannot exceed acquisition cost');
  }

  return { isValid: errors.length === 0, errors, warnings };
}
