import { ValidationResult } from '../../../types/calculator';

export function validateCurrentSharePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentSharePrice: 'Current share price cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { currentSharePrice: 'Current share price cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOriginalPurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { originalPurchasePrice: 'Original purchase price cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { originalPurchasePrice: 'Original purchase price cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfShares(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 1000000) {
    return { isValid: false, errors: { numberOfShares: 'Number of shares must be between 1 and 1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsHeld(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { yearsHeld: 'Years held must be between 0 and 50' } };
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

export function validateExpectedGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -20 || value > 50) {
    return { isValid: false, errors: { expectedGrowthRate: 'Expected growth rate must be between -20% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateYearsToSale(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 30) {
    return { isValid: false, errors: { yearsToSale: 'Years to sale must be between 0 and 30' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLumpSumDistribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { lumpSumDistribution: 'Lump sum distribution must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeStateTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeStateTax: 'Include state tax must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEmployerStock(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { employerStock: 'Employer stock must be true or false' } };
  }
  return { isValid: true, errors: {} };
}