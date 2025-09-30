import { ValidationResult } from '../../../types/calculator';

export function validateBeginningValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0.01 || value > 100000000) {
    return { isValid: false, errors: { beginningValue: 'Beginning value must be between $0.01 and $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEndingValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100000000) {
    return { isValid: false, errors: { endingValue: 'Ending value must be between $0 and $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfPeriods(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 100) {
    return { isValid: false, errors: { numberOfPeriods: 'Number of periods must be between 1 and 100' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePeriodType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['years', 'months', 'days'].includes(value)) {
    return { isValid: false, errors: { periodType: 'Please select a valid period type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeDividends(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeDividends: 'Include dividends must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDividendAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100000) {
    return { isValid: false, errors: { dividendAmount: 'Dividend amount must be between $0 and $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['annual', 'semi-annual', 'quarterly', 'monthly'].includes(value)) {
    return { isValid: false, errors: { frequency: 'Please select a valid compounding frequency' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}