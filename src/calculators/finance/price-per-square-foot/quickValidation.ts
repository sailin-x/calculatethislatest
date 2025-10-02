import { ValidationResult } from '../../types/calculator';

export function validatePropertyPrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { propertyPrice: 'Property price must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { propertyPrice: 'Property price must be at least $10,000' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { propertyPrice: 'Property price cannot exceed $50,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSquareFootage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { squareFootage: 'Square footage must be greater than 0' } };
  }
  if (value < 100) {
    return { isValid: false, errors: { squareFootage: 'Square footage must be at least 100 sq ft' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { squareFootage: 'Square footage cannot exceed 100,000 sq ft' } };
  }
  return { isValid: true, errors: {} };
}

export function validateComparePrice1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 10000) {
    return { isValid: false, errors: { comparePrice1: 'Comparison property price must be at least $10,000' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { comparePrice1: 'Comparison property price cannot exceed $50,000,000' } };
  }
  if (value && !allInputs?.compareSqft1) {
    return { isValid: false, errors: { comparePrice1: 'Square footage is required when price is provided' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompareSqft1(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 100) {
    return { isValid: false, errors: { compareSqft1: 'Square footage must be at least 100 sq ft' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { compareSqft1: 'Square footage cannot exceed 100,000 sq ft' } };
  }
  if (value && !allInputs?.comparePrice1) {
    return { isValid: false, errors: { compareSqft1: 'Price is required when square footage is provided' } };
  }
  return { isValid: true, errors: {} };
}

export function validateComparePrice2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 10000) {
    return { isValid: false, errors: { comparePrice2: 'Comparison property price must be at least $10,000' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { comparePrice2: 'Comparison property price cannot exceed $50,000,000' } };
  }
  if (value && !allInputs?.compareSqft2) {
    return { isValid: false, errors: { comparePrice2: 'Square footage is required when price is provided' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompareSqft2(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 100) {
    return { isValid: false, errors: { compareSqft2: 'Square footage must be at least 100 sq ft' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { compareSqft2: 'Square footage cannot exceed 100,000 sq ft' } };
  }
  if (value && !allInputs?.comparePrice2) {
    return { isValid: false, errors: { compareSqft2: 'Price is required when square footage is provided' } };
  }
  return { isValid: true, errors: {} };
}

export function validateComparePrice3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 10000) {
    return { isValid: false, errors: { comparePrice3: 'Comparison property price must be at least $10,000' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { comparePrice3: 'Comparison property price cannot exceed $50,000,000' } };
  }
  if (value && !allInputs?.compareSqft3) {
    return { isValid: false, errors: { comparePrice3: 'Square footage is required when price is provided' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCompareSqft3(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 100) {
    return { isValid: false, errors: { compareSqft3: 'Square footage must be at least 100 sq ft' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { compareSqft3: 'Square footage cannot exceed 100,000 sq ft' } };
  }
  if (value && !allInputs?.compareSqft3) {
    return { isValid: false, errors: { compareSqft3: 'Price is required when square footage is provided' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarketAverage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 10) {
    return { isValid: false, errors: { marketAverage: 'Market average must be at least $10 per sq ft' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { marketAverage: 'Market average cannot exceed $10,000 per sq ft' } };
  }
  return { isValid: true, errors: {} };
}