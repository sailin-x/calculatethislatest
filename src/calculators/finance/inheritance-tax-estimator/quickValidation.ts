import { ValidationResult } from '../../../types/calculator';

export function validateEstateValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { estateValue: 'Estate value cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { estateValue: 'Estate value cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaritalStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['single', 'married', 'widowed', 'divorced'].includes(value)) {
    return { isValid: false, errors: { maritalStatus: 'Please select a valid marital status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfChildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { numberOfChildren: 'Number of children must be between 0 and 20' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateOfResidence(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  if (!value || !validStates.includes(value)) {
    return { isValid: false, errors: { stateOfResidence: 'Please select a valid state' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasWill(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasWill: 'Has will must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasTrust(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasTrust: 'Has trust must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCharitableDonations(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { charitableDonations: 'Charitable donations cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { charitableDonations: 'Charitable donations cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFuneralExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { funeralExpenses: 'Funeral expenses cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { funeralExpenses: 'Funeral expenses cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMedicalExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { medicalExpenses: 'Medical expenses cannot be negative' } };
  }
  if (value > 1000000) {
    return { isValid: false, errors: { medicalExpenses: 'Medical expenses cannot exceed $1,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAdministrativeExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { administrativeExpenses: 'Administrative expenses cannot be negative' } };
  }
  if (value > 500000) {
    return { isValid: false, errors: { administrativeExpenses: 'Administrative expenses cannot exceed $500,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDebtsAndLiabilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { debtsAndLiabilities: 'Debts and liabilities cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { debtsAndLiabilities: 'Debts and liabilities cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeInsuranceProceeds(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { lifeInsuranceProceeds: 'Life insurance proceeds must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRetirementAccounts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { retirementAccounts: 'Retirement accounts cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { retirementAccounts: 'Retirement accounts cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRealEstateValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { realEstateValue: 'Real estate value cannot be negative' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { realEstateValue: 'Real estate value cannot exceed $50,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateBusinessInterests(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { businessInterests: 'Business interests cannot be negative' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { businessInterests: 'Business interests cannot exceed $50,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePersonalProperty(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { personalProperty: 'Personal property cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { personalProperty: 'Personal property cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCashAndInvestments(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { cashAndInvestments: 'Cash and investments cannot be negative' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { cashAndInvestments: 'Cash and investments cannot exceed $50,000,000' } };
  }
  return { isValid: true, errors: {} };
}