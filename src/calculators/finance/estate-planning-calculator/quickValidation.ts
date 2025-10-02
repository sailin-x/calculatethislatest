import { ValidationResult } from '../../types/calculator';

export function validateAge(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 18 || value > 120) {
    return { isValid: false, errors: { age: 'Age must be between 18 and 120' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaritalStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['single', 'married', 'divorced', 'widowed'].includes(value)) {
    return { isValid: false, errors: { maritalStatus: 'Please select a valid marital status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { totalAssets: 'Total assets cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { totalAssets: 'Total assets cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualIncome: 'Annual income cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { annualIncome: 'Annual income cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualExpenses: 'Annual expenses cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { annualExpenses: 'Annual expenses cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFederalTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { federalTaxBracket: 'Federal tax bracket must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateTaxBracket(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { stateTaxBracket: 'State tax bracket must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEstateTaxExemption(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { estateTaxExemption: 'Estate tax exemption cannot be negative' } };
  }
  if (value > 50000000) {
    return { isValid: false, errors: { estateTaxExemption: 'Estate tax exemption cannot exceed $50,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePlanningHorizon(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1 || value > 50) {
    return { isValid: false, errors: { planningHorizon: 'Planning horizon must be between 1 and 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedInflation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { expectedInflation: 'Expected inflation must be between 0% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 30) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be between -10% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfChildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { numberOfChildren: 'Number of children must be between 0 and 20' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfGrandchildren(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { numberOfGrandchildren: 'Number of grandchildren must be between 0 and 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDesiredLegacy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { desiredLegacy: 'Desired legacy cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { desiredLegacy: 'Desired legacy cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEducationFunding(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { educationFunding: 'Education funding cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { educationFunding: 'Education funding cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCharitableGiving(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { charitableGiving: 'Charitable giving cannot be negative' } };
  }
  if (value > 1000000000) {
    return { isValid: false, errors: { charitableGiving: 'Charitable giving cannot exceed $1,000,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHealthStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['excellent', 'good', 'fair', 'poor'].includes(value)) {
    return { isValid: false, errors: { healthStatus: 'Please select a valid health status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1 || value > 150) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be between 1 and 150 years' } };
  }
  if (allInputs?.age && value <= allInputs.age) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be greater than current age' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasWill(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasWill: 'Has Will must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasTrust(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasTrust: 'Has Trust must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasPowerOfAttorney(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasPowerOfAttorney: 'Has Power of Attorney must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasHealthcareDirective(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasHealthcareDirective: 'Has Healthcare Directive must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLongTermCare(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { longTermCare: 'Long-term care must be true or false' } };
  }
  return { isValid: true, errors: {} };
}
