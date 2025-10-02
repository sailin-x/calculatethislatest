import { ValidationResult } from '../../types/calculator';

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { propertyValue: 'Property value must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { propertyValue: 'Property value must be at least $10,000' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { propertyValue: 'Property value cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePurchasePrice(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { purchasePrice: 'Purchase price must be greater than $0' } };
  }
  if (value < 10000) {
    return { isValid: false, errors: { purchasePrice: 'Purchase price must be at least $10,000' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { purchasePrice: 'Purchase price cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHouseholdIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { householdIncome: 'Household income must be greater than $0' } };
  }
  if (value < 1000) {
    return { isValid: false, errors: { householdIncome: 'Household income must be at least $1,000' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { householdIncome: 'Household income cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHouseholdSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { householdSize: 'Household size must be at least 1' } };
  }
  if (value > 10) {
    return { isValid: false, errors: { householdSize: 'Household size cannot exceed 10' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCreditScore(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 300 || value > 850) {
    return { isValid: false, errors: { creditScore: 'Credit score must be between 300 and 850' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDebtToIncomeRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { debtToIncomeRatio: 'Debt-to-income ratio must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDownPayment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { downPayment: 'Down payment cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { interestRate: 'Interest rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateClosingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { closingCosts: 'Closing costs cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { propertyTaxes: 'Property taxes cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHomeownersInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { homeownersInsurance: 'Homeowners insurance cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { homeownersInsurance: 'Homeowners insurance cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoaFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { hoaFees: 'HOA fees cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period must be at least 1 year' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { location: 'Location is required' } };
  }
  const validLocations = ['rural', 'suburban', 'small-town'];
  if (!validLocations.includes(value)) {
    return { isValid: false, errors: { location: 'Invalid location type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsPrimaryResidence(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isPrimaryResidence: 'Primary residence must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsModestHousing(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isModestHousing: 'Modest housing must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMeetsIncomeLimits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { meetsIncomeLimits: 'Meets income limits must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMeetsLocationRequirements(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { meetsLocationRequirements: 'Meets location requirements must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeTaxesInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeTaxesInsurance: 'Include taxes insurance must be true or false' } };
  }
  return { isValid: true, errors: {} };
}