import { ValidationResult } from '../../types';

export function validatePropertyType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Property type is required' };
  }

  const validTypes = ['residential', 'commercial', 'mixed-use', 'rental', 'vacation'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Property type must be residential, commercial, mixed-use, rental, or vacation' };
  }

  return { isValid: true };
}

export function validatePropertyValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Property value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Property value must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Property value must be greater than $0' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Property value cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateLandValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Land value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Land value must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Land value cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Land value cannot exceed $1 billion' };
  }

  // Check that land value doesn't exceed property value
  if (allInputs?.propertyValue && numValue > allInputs.propertyValue) {
    return { isValid: false, error: 'Land value cannot exceed property value' };
  }

  return { isValid: true };
}

export function validatePlacedInServiceDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Placed in service date is required' };
  }

  const dateObj = new Date(value);
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, error: 'Placed in service date must be a valid date' };
  }

  const currentYear = new Date().getFullYear();
  const year = dateObj.getFullYear();
  
  if (year < 1900) {
    return { isValid: false, error: 'Placed in service date cannot be before 1900' };
  }

  if (year > currentYear + 5) {
    return { isValid: false, error: 'Placed in service date cannot be more than 5 years in the future' };
  }

  return { isValid: true };
}

export function validateBusinessUsePercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Business use percentage is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Business use percentage must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Business use percentage cannot be negative' };
  }

  if (numValue > 100) {
    return { isValid: false, error: 'Business use percentage cannot exceed 100%' };
  }

  return { isValid: true };
}

export function validateAnnualRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Annual rent is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Annual rent must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Annual rent cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Annual rent cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateOperatingExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Operating expenses are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Operating expenses must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Operating expenses cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Operating expenses cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateMortgageInterest(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Mortgage interest is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Mortgage interest must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Mortgage interest cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Mortgage interest cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validatePropertyTaxes(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Property taxes are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Property taxes must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Property taxes cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Property taxes cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateInsurance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Insurance is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Insurance must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Insurance cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Insurance cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateUtilities(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Utilities are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Utilities must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Utilities cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Utilities cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateMaintenance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Maintenance is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Maintenance must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Maintenance cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Maintenance cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateManagementFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Management fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Management fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Management fees cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Management fees cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateAdvertising(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Advertising is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Advertising must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Advertising cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Advertising cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateLegalFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Legal fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Legal fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Legal fees cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Legal fees cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateAccountingFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Accounting fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Accounting fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Accounting fees cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Accounting fees cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateTravelExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Travel expenses are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Travel expenses must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Travel expenses cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Travel expenses cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateHomeOfficeExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Home office expenses are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Home office expenses must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Home office expenses cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Home office expenses cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateDepreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Depreciation is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Depreciation must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Depreciation cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Depreciation cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateBonusDepreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Bonus depreciation is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Bonus depreciation must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Bonus depreciation cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Bonus depreciation cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateSection179Deduction(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Section 179 deduction is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Section 179 deduction must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Section 179 deduction cannot be negative' };
  }

  if (numValue > 1080000) {
    return { isValid: false, error: 'Section 179 deduction cannot exceed $1,080,000' };
  }

  return { isValid: true };
}

export function validateCostSegregation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Cost segregation is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Cost segregation must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Cost segregation cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Cost segregation cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validatePassiveActivityLoss(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Passive activity loss is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Passive activity loss must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Passive activity loss cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Passive activity loss cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateAtRiskAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'At-risk amount is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'At-risk amount must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'At-risk amount cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'At-risk amount cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateMaterialParticipation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Material participation is required' };
  }

  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Material participation must be a boolean value' };
  }

  return { isValid: true };
}

export function validateRealEstateProfessional(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Real estate professional is required' };
  }

  if (typeof value !== 'boolean') {
    return { isValid: false, error: 'Real estate professional must be a boolean value' };
  }

  return { isValid: true };
}

export function validateTaxYear(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Tax year is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Tax year must be a valid integer' };
  }

  const currentYear = new Date().getFullYear();
  if (numValue < 1900) {
    return { isValid: false, error: 'Tax year cannot be before 1900' };
  }

  if (numValue > currentYear + 5) {
    return { isValid: false, error: 'Tax year cannot be more than 5 years in the future' };
  }

  return { isValid: true };
}

export function validateFilingStatus(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Filing status is required' };
  }

  const validStatuses = ['single', 'married-joint', 'married-separate', 'head-of-household'];
  if (!validStatuses.includes(value)) {
    return { isValid: false, error: 'Filing status must be single, married-joint, married-separate, or head-of-household' };
  }

  return { isValid: true };
}

export function validateAdjustedGrossIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Adjusted gross income is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Adjusted gross income must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Adjusted gross income cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Adjusted gross income cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateOtherPassiveIncome(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Other passive income is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Other passive income must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Other passive income cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Other passive income cannot exceed $100 million' };
  }

  return { isValid: true };
}

export function validateOtherPassiveLosses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Other passive losses are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Other passive losses must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Other passive losses cannot be negative' };
  }

  if (numValue > 100000000) {
    return { isValid: false, error: 'Other passive losses cannot exceed $100 million' };
  }

  return { isValid: true };
}