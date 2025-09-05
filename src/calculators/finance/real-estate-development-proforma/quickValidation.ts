import { ValidationResult } from '../../types';

export function validateProjectName(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Project name is required' };
  }

  if (typeof value !== 'string') {
    return { isValid: false, error: 'Project name must be a valid string' };
  }

  if (value.length === 0) {
    return { isValid: false, error: 'Project name cannot be empty' };
  }

  if (value.length > 100) {
    return { isValid: false, error: 'Project name cannot exceed 100 characters' };
  }

  return { isValid: true };
}

export function validateProjectType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Project type is required' };
  }

  const validTypes = ['residential', 'commercial', 'mixed-use', 'industrial', 'retail'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Project type must be residential, commercial, mixed-use, industrial, or retail' };
  }

  return { isValid: true };
}

export function validateTotalUnits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Total units is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Total units must be a valid integer' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Total units must be greater than 0' };
  }

  if (numValue > 10000) {
    return { isValid: false, error: 'Total units cannot exceed 10,000' };
  }

  return { isValid: true };
}

export function validateAverageUnitSize(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Average unit size is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Average unit size must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Average unit size must be greater than 0' };
  }

  if (numValue > 10000) {
    return { isValid: false, error: 'Average unit size cannot exceed 10,000 square feet' };
  }

  return { isValid: true };
}

export function validateConstructionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Construction cost is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Construction cost must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Construction cost cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Construction cost cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateLandCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Land cost is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Land cost must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Land cost cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Land cost cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateSoftCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Soft costs are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Soft costs must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Soft costs cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Soft costs cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateFinancingCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Financing costs are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Financing costs must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Financing costs cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Financing costs cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateContingency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Contingency is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Contingency must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Contingency cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Contingency cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateDevelopmentPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Development period is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Development period must be a valid integer' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Development period cannot be negative' };
  }

  if (numValue > 10) {
    return { isValid: false, error: 'Development period cannot exceed 10 years' };
  }

  return { isValid: true };
}

export function validateStabilizationPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Stabilization period is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Stabilization period must be a valid integer' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Stabilization period cannot be negative' };
  }

  if (numValue > 10) {
    return { isValid: false, error: 'Stabilization period cannot exceed 10 years' };
  }

  return { isValid: true };
}

export function validateAverageRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Average rent is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Average rent must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Average rent must be greater than $0' };
  }

  if (numValue > 50000) {
    return { isValid: false, error: 'Average rent cannot exceed $50,000 per unit per month' };
  }

  return { isValid: true };
}

export function validateOccupancyRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Occupancy rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Occupancy rate must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Occupancy rate must be greater than 0%' };
  }

  if (numValue > 1) {
    return { isValid: false, error: 'Occupancy rate cannot exceed 100%' };
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

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Operating expenses cannot exceed $1 billion' };
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

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Management fees cannot exceed $1 billion' };
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

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Property taxes cannot exceed $1 billion' };
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

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Insurance cannot exceed $1 billion' };
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

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Utilities cannot exceed $1 billion' };
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

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Maintenance cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateMarketing(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Marketing is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Marketing must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Marketing cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Marketing cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateOtherExpenses(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Other expenses are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Other expenses must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Other expenses cannot be negative' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Other expenses cannot exceed $1 billion' };
  }

  return { isValid: true };
}

export function validateExitCapRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Exit cap rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Exit cap rate must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Exit cap rate must be greater than 0%' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Exit cap rate cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validateAppreciationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Appreciation rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Appreciation rate must be a valid number' };
  }

  if (numValue < -10) {
    return { isValid: false, error: 'Appreciation rate cannot be less than -10%' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Appreciation rate cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validateFinancingRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Financing rate is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Financing rate must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Financing rate cannot be negative' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Financing rate cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validateLoanToCostRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Loan-to-cost ratio is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Loan-to-cost ratio must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Loan-to-cost ratio cannot be negative' };
  }

  if (numValue > 90) {
    return { isValid: false, error: 'Loan-to-cost ratio cannot exceed 90%' };
  }

  return { isValid: true };
}

export function validateInterestOnlyPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Interest-only period is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Interest-only period must be a valid integer' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Interest-only period cannot be negative' };
  }

  if (numValue > 5) {
    return { isValid: false, error: 'Interest-only period cannot exceed 5 years' };
  }

  return { isValid: true };
}