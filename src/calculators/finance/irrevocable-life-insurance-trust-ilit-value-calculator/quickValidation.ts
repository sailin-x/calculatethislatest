import { ValidationResult } from '../../../types/calculator';

export function validateTrustValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { trustValue: 'Trust value cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { trustValue: 'Trust value cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualPremium(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualPremium: 'Annual premium cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { annualPremium: 'Annual premium cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDeathBenefit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { deathBenefit: 'Death benefit cannot be negative' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { deathBenefit: 'Death benefit cannot exceed $50,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTrustDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 100) {
    return { isValid: false, errors: { trustDuration: 'Trust duration must be between 1 and 100 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between -10% and 20%' } };
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
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAdministrativeCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { administrativeCosts: 'Administrative costs cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { administrativeCosts: 'Administrative costs cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfBeneficiaries(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 50) {
    return { isValid: false, errors: { numberOfBeneficiaries: 'Number of beneficiaries must be between 1 and 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTrustType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['life-insurance', 'charitable-remainder', 'grantor'].includes(value)) {
    return { isValid: false, errors: { trustType: 'Please select a valid trust type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeCrummeyPowers(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeCrummeyPowers: 'Include Crummey powers must be true or false' } };
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