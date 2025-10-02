import { ValidationResult } from '../../types/calculator';

export function validateAccountType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['health', 'dependent', 'parking', 'transit'].includes(value)) {
    return { isValid: false, errors: { accountType: 'Please select a valid account type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualContributionLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualContributionLimit: 'Annual contribution limit cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { annualContributionLimit: 'Annual contribution limit cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCurrentBalance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { currentBalance: 'Current balance cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { currentBalance: 'Current balance cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateContributionFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['monthly', 'bi-weekly', 'weekly'].includes(value)) {
    return { isValid: false, errors: { contributionFrequency: 'Please select a valid contribution frequency' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['single', 'married-joint', 'married-separate', 'head-household'].includes(value)) {
    return { isValid: false, errors: { filingStatus: 'Please select a valid filing status' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfDependents(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { numberOfDependents: 'Number of dependents must be between 0 and 10' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasSpouse(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasSpouse: 'Has spouse must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSpouseHasCoverage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { spouseHasCoverage: 'Spouse has coverage must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHasHealthInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { hasHealthInsurance: 'Has health insurance must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInsuranceType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['individual', 'family', 'none'].includes(value)) {
    return { isValid: false, errors: { insuranceType: 'Please select a valid insurance type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedMedicalExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { expectedMedicalExpenses: 'Expected medical expenses cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { expectedMedicalExpenses: 'Expected medical expenses cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePreventiveCareExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { preventiveCareExpenses: 'Preventive care expenses cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { preventiveCareExpenses: 'Preventive care expenses cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePrescriptionExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { prescriptionExpenses: 'Prescription expenses cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { prescriptionExpenses: 'Prescription expenses cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDentalExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { dentalExpenses: 'Dental expenses cannot be negative' } };
  }
  if (value > 5000) {
    return { isValid: false, errors: { dentalExpenses: 'Dental expenses cannot exceed $5,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVisionExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { visionExpenses: 'Vision expenses cannot be negative' } };
  }
  if (value > 2000) {
    return { isValid: false, errors: { visionExpenses: 'Vision expenses cannot exceed $2,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateChildcareExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { childcareExpenses: 'Childcare expenses cannot be negative' } };
  }
  if (value > 30000) {
    return { isValid: false, errors: { childcareExpenses: 'Childcare expenses cannot exceed $30,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEldercareExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { eldercareExpenses: 'Eldercare expenses cannot be negative' } };
  }
  if (value > 30000) {
    return { isValid: false, errors: { eldercareExpenses: 'Eldercare expenses cannot exceed $30,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateChildcareProvider(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || !['licensed', 'unlicensed', 'relative'].includes(value)) {
    return { isValid: false, errors: { childcareProvider: 'Please select a valid childcare provider type' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyParkingCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { monthlyParkingCost: 'Monthly parking cost cannot be negative' } };
  }
  if (value > 280) {
    return { isValid: false, errors: { monthlyParkingCost: 'Monthly parking cost cannot exceed $280' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonthlyTransitCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { monthlyTransitCost: 'Monthly transit cost cannot be negative' } };
  }
  if (value > 315) {
    return { isValid: false, errors: { monthlyTransitCost: 'Monthly transit cost cannot exceed $315' } };
  }
  return { isValid: true, errors: {} };
}

export function validateWorkDaysPerMonth(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 31) {
    return { isValid: false, errors: { workDaysPerMonth: 'Work days per month must be between 1 and 31' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDistanceToWork(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { distanceToWork: 'Distance to work cannot be negative' } };
  }
  if (value > 500) {
    return { isValid: false, errors: { distanceToWork: 'Distance to work cannot exceed 500 miles' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMarginalTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { marginalTaxRate: 'Marginal tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { stateTaxRate: 'State tax rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateEmployerMatch(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { employerMatch: 'Employer match must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGracePeriodDays(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 365) {
    return { isValid: false, errors: { gracePeriodDays: 'Grace period days must be between 0 and 365' } };
  }
  return { isValid: true, errors: {} };
}

export function validateCarryoverAllowed(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { carryoverAllowed: 'Carryover allowed must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMaxCarryoverAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { maxCarryoverAmount: 'Maximum carryover amount cannot be negative' } };
  }
  if (value > 500) {
    return { isValid: false, errors: { maxCarryoverAmount: 'Maximum carryover amount cannot exceed $500' } };
  }
  return { isValid: true, errors: {} };
}

export function validateUsedToDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { usedToDate: 'Used to date cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { usedToDate: 'Used to date cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateProjectedUsage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { projectedUsage: 'Projected usage cannot be negative' } };
  }
  if (value > 10000) {
    return { isValid: false, errors: { projectedUsage: 'Projected usage cannot exceed $10,000' } };
  }
  return { isValid: true, errors: {} };
}