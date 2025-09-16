import { ValidationResult } from '../../../types/calculator';

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { annualIncome: 'Annual income must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { annualIncome: 'Annual income must be at least $10,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { annualIncome: 'Annual income cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMortgageInterest(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { mortgageInterest: 'Mortgage interest cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { mortgageInterest: 'Mortgage interest cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { insurance: 'Insurance cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { insurance: 'Insurance cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { maintenance: 'Maintenance cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { maintenance: 'Maintenance cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRepairs(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { repairs: 'Repairs cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { repairs: 'Repairs cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUtilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { utilities: 'Utilities cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { utilities: 'Utilities cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot be negative' } };
  }
  if (value > 20000) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot exceed $20,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDepreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { depreciation: 'Depreciation cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { depreciation: 'Depreciation cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { managementFees: 'Management fees cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { managementFees: 'Management fees cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVacancyAllowance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { vacancyAllowance: 'Vacancy allowance cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { vacancyAllowance: 'Vacancy allowance cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be greater than 0%' } };
  }
  if (value < 10) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be at least 10%' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot exceed 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { filingStatus: 'Filing status is required' } };
  }
  const validStatuses = ['single', 'married-joint', 'married-separate', 'head-household'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, errors: { filingStatus: 'Invalid filing status selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateState(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { state: 'State is required' } };
  }
  // Basic validation - could be expanded with full state list
  if (typeof value !== 'string' || value.length < 2 || value.length > 20) {
    return { isValid: false, errors: { state: 'Invalid state format' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRentalIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0) {
    return { isValid: false, errors: { rentalIncome: 'Rental income cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { rentalIncome: 'Rental income cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePersonalUsePercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) return { isValid: true, errors: {} };
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { personalUsePercentage: 'Personal use percentage must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { propertyType: 'Property type is required' } };
  }
  const validTypes = ['residential', 'commercial', 'rental', 'vacation'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { propertyType: 'Invalid property type selected' } };
  }
  return { isValid: true, errors: {} };
}