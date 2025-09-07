import { ValidationResult } from '../../../types/calculator';

export function validateGrossRentalIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { grossRentalIncome: 'Gross rental income must be greater than $0' } };
  }
  if (value < 1000) {
    return { isValid: false, errors: { grossRentalIncome: 'Gross rental income must be at least $1,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { grossRentalIncome: 'Gross rental income cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateOtherIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { otherIncome: 'Other income cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { otherIncome: 'Other income cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyManagement(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { propertyManagement: 'Property management percentage cannot be negative' } };
  }
  if (value > 20) {
    return { isValid: false, errors: { propertyManagement: 'Property management percentage cannot exceed 20%' } };
  }
  if (value && allInputs?.propertyManagementFixed) {
    return { isValid: false, errors: { propertyManagement: 'Cannot specify both percentage and fixed property management fees' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyManagementFixed(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { propertyManagementFixed: 'Fixed property management fee cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { propertyManagementFixed: 'Fixed property management fee cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { maintenance: 'Maintenance expenses cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { maintenance: 'Maintenance expenses cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUtilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { utilities: 'Utilities cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { utilities: 'Utilities cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { insurance: 'Insurance cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { insurance: 'Insurance cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot be negative' } };
  }
  if (value > 2000000) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot exceed $2,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLegalFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { legalFees: 'Legal and accounting fees cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { legalFees: 'Legal and accounting fees cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAdvertising(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { advertising: 'Advertising expenses cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { advertising: 'Advertising expenses cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSupplies(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { supplies: 'Office supplies cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { supplies: 'Office supplies cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMiscellaneous(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { miscellaneous: 'Miscellaneous expenses cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { miscellaneous: 'Miscellaneous expenses cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}