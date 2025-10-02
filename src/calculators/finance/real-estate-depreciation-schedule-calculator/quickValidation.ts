import { ValidationResult } from '../../types/calculator';

export function validatePropertyCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { propertyCost: 'Property cost must be greater than $0' } };
  }
  if (value < 1000) {
    return { isValid: false, errors: { propertyCost: 'Property cost must be at least $1,000' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { propertyCost: 'Property cost cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLandValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { landValue: 'Land value cannot be negative' } };
  }
  if (allInputs?.propertyCost && value > allInputs.propertyCost) {
    return { isValid: false, errors: { landValue: 'Land value cannot exceed property cost' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDepreciationStartDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { depreciationStartDate: 'Depreciation start date is required' } };
  }
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { depreciationStartDate: 'Invalid date format' } };
  }
  const minDate = new Date('1900-01-01');
  const maxDate = new Date();
  if (date < minDate || date > maxDate) {
    return { isValid: false, errors: { depreciationStartDate: 'Date must be between 1900 and today' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUsefulLife(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { usefulLife: 'Useful life must be greater than 0' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { usefulLife: 'Useful life must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { usefulLife: 'Useful life cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCalculationYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { calculationYears: 'Calculation years must be greater than 0' } };
  }
  if (value < 1) {
    return { isValid: false, errors: { calculationYears: 'Calculation years must be at least 1' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { calculationYears: 'Calculation years cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSalvageValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { salvageValue: 'Salvage value cannot be negative' } };
  }
  if (allInputs?.propertyCost && value > allInputs.propertyCost) {
    return { isValid: false, errors: { salvageValue: 'Salvage value cannot exceed property cost' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDepreciationMethod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { depreciationMethod: 'Depreciation method is required' } };
  }
  const validMethods = ['straight-line', 'declining-balance', 'section-179', 'bonus-depreciation'];
  if (!validMethods.includes(value)) {
    return { isValid: false, errors: { depreciationMethod: 'Invalid depreciation method selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBonusDepreciationPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { bonusDepreciationPercentage: 'Bonus depreciation percentage must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSection179Deduction(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { section179Deduction: 'Section 179 deduction cannot be negative' } };
  }
  if (allInputs?.propertyCost && value > allInputs.propertyCost) {
    return { isValid: false, errors: { section179Deduction: 'Section 179 deduction cannot exceed property cost' } };
  }
  return { isValid: true, errors: {} };
}