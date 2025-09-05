import { ValidationResult } from '../../types';

export function validatePropertyCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Property cost is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Property cost must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Property cost must be greater than $0' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Property cost cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateLandValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Land value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Land value must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Land value cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Land value cannot exceed $1 billion' };
  }

  // Check that land value doesn't exceed property cost
  if (allInputs?.propertyCost && numValue > allInputs.propertyCost) {
    return { isValid: false, error: 'Land value cannot exceed property cost' };
  }

  return { isValid: true };
}

export function validatePlacedInServiceDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Placed in service date is required' };
  }

  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Placed in service date must be a valid date' };
  }

  const currentYear = new Date().getFullYear();
  const year = dateObj.getFullYear();
  
  if (year < 1900) {
    return { isValid: false, error: 'Placed in service date cannot be before 1900' };
  }

  if (year > currentYear + 5) {
    return { isValid: false, error: 'Placed in service date cannot be more than 5 years in the future' };
  }

  return { isValid: true };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Property type is required' };
  }

  const validTypes = ['residential', 'commercial', 'mixed-use'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Property type must be residential, commercial, or mixed-use' };
  }

  return { isValid: true };
}

export function validateDepreciationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Depreciation method is required' };
  }

  const validMethods = ['straight-line', 'accelerated', 'bonus'];
  if (!validMethods.includes(value)) {
    return { isValid: false, error: 'Depreciation method must be straight-line, accelerated, or bonus' };
  }

  return { isValid: true };
}

export function validateBonusDepreciationPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Bonus depreciation percentage is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Bonus depreciation percentage must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Bonus depreciation percentage cannot be negative' };
  }

  if (numValue > 100) {
    return { isValid: false, error: 'Bonus depreciation percentage cannot exceed 100%' };
  }

  return { isValid: true };
}

export function validateSection179Deduction(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Section 179 deduction is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Section 179 deduction must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Section 179 deduction cannot be negative' };
  }

  if (numValue > 1080000) {
    return { isValid: false, error: 'Section 179 deduction cannot exceed $1,080,000' };
  }

  return { isValid: true };
}

export function validateCostSegregation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Cost segregation is required' };
  }

  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Cost segregation must be a boolean value' };
  }

  return { isValid: true };
}

export function validateCostSegregationAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Cost segregation amount is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Cost segregation amount must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Cost segregation amount cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Cost segregation amount cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateCostSegregationBreakdown(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  if (typeof value !== 'object' || value === null) {
    return { isValid: false, error: 'Cost segregation breakdown must be an object' };
  }

  const requiredFields = ['fiveYear', 'sevenYear', 'fifteenYear', 'twentySevenPointFiveYear', 'thirtyNineYear'];
  
  for (const field of requiredFields) {
    if (!(field in value)) {
      return { isValid: false, error: `Cost segregation breakdown must include ${field}` };
    }
    
    const fieldValue = Number(value[field]);
    if (isNaN(fieldValue)) {
      return { isValid: false, error: `${field} must be a valid number` };
    }
    
    if (fieldValue < 0) {
      return { isValid: false, error: `${field} cannot be negative` };
    }
    
    if (fieldValue > 100000000) {
      return { isValid: false, error: `${field} cannot exceed $100 million` };
    }
  }

  return { isValid: true };
}

export function validateTaxYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Tax year is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Tax year must be a valid integer' };
  }

  const currentYear = new Date().getFullYear();
  if (numValue < 1900) {
    return { isValid: false, error: 'Tax year cannot be before 1900' };
  }

  if (numValue > currentYear + 5) {
    return { isValid: false, error: 'Tax year cannot be more than 5 years in the future' };
  }

  return { isValid: true };
}

export function validateDisposalDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Disposal date must be a valid date' };
  }

  // Check that disposal date is after placed in service date
  if (allInputs?.placedInServiceDate) {
    const placedInService = new Date(allInputs.placedInServiceDate);
    if (dateObj <= placedInService) {
      return { isValid: false, error: 'Disposal date must be after placed in service date' };
    }
  }

  return { isValid: true };
}

export function validateDisposalValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Disposal value must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Disposal value cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Disposal value cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateRecaptureRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Recapture rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Recapture rate must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Recapture rate cannot be negative' };
  }

  if (numValue > 1) {
    return { isValid: false, error: 'Recapture rate cannot exceed 100%' };
  }

  return { isValid: true };
}