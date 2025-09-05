import { ValidationResult } from '../../types';

export function validateInvestmentAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Investment amount is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Investment amount must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Investment amount must be greater than $0' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Investment amount cannot exceed $10 million' };
  }

  // Check against minimum investment if provided
  if (allInputs?.minimumInvestment && numValue < allInputs.minimumInvestment) {
    return { isValid: false, error: `Investment amount must be at least $${allInputs.minimumInvestment.toLocaleString()}` };
  }

  // Check against maximum investment if provided
  if (allInputs?.maximumInvestment && numValue > allInputs.maximumInvestment) {
    return { isValid: false, error: `Investment amount cannot exceed $${allInputs.maximumInvestment.toLocaleString()}` };
  }

  return { isValid: true };
}

export function validateProjectValue(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Project value is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Project value must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Project value must be greater than $0' };
  }

  if (numValue > 1000000000) {
    return { isValid: false, error: 'Project value cannot exceed $1 billion' };
  }

  // Check that investment amount doesn't exceed project value
  if (allInputs?.investmentAmount && allInputs.investmentAmount > numValue) {
    return { isValid: false, error: 'Investment amount cannot exceed project value' };
  }

  return { isValid: true };
}

export function validateExpectedHoldPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Expected hold period is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Expected hold period must be a valid integer' };
  }

  if (numValue < 1) {
    return { isValid: false, error: 'Expected hold period must be at least 1 year' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Expected hold period cannot exceed 20 years' };
  }

  return { isValid: true };
}

export function validateExpectedAnnualReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Expected annual return is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Expected annual return must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Expected annual return cannot be negative' };
  }

  if (numValue > 50) {
    return { isValid: false, error: 'Expected annual return cannot exceed 50%' };
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

  if (numValue > 20) {
    return { isValid: false, error: 'Management fees cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validatePlatformFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Platform fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Platform fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Platform fees cannot be negative' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Platform fees cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validateExitFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Exit fees are required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Exit fees must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Exit fees cannot be negative' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Exit fees cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validateMinimumInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Minimum investment is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Minimum investment must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Minimum investment must be greater than $0' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Minimum investment cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateMaximumInvestment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Maximum investment is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Maximum investment must be a valid number' };
  }

  if (numValue <= 0) {
    return { isValid: false, error: 'Maximum investment must be greater than $0' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Maximum investment cannot exceed $10 million' };
  }

  // Check that maximum is greater than minimum
  if (allInputs?.minimumInvestment && numValue < allInputs.minimumInvestment) {
    return { isValid: false, error: 'Maximum investment must be greater than minimum investment' };
  }

  return { isValid: true };
}

export function validateProjectType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Project type is required' };
  }

  const validTypes = ['residential', 'commercial', 'industrial', 'retail', 'mixed-use'];
  if (!validTypes.includes(value)) {
    return { isValid: false, error: 'Project type must be residential, commercial, industrial, retail, or mixed-use' };
  }

  return { isValid: true };
}

export function validateLocation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Location is required' };
  }

  if (typeof value !== 'string') {
    return { isValid: false, error: 'Location must be a valid string' };
  }

  if (value.length === 0) {
    return { isValid: false, error: 'Location cannot be empty' };
  }

  if (value.length > 100) {
    return { isValid: false, error: 'Location cannot exceed 100 characters' };
  }

  return { isValid: true };
}

export function validateExpectedAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Expected appreciation is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Expected appreciation must be a valid number' };
  }

  if (numValue < -10) {
    return { isValid: false, error: 'Expected appreciation cannot be less than -10%' };
  }

  if (numValue > 20) {
    return { isValid: false, error: 'Expected appreciation cannot exceed 20%' };
  }

  return { isValid: true };
}

export function validateExpectedCashFlow(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, error: 'Expected cash flow is required' };
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Expected cash flow must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Expected cash flow cannot be negative' };
  }

  if (numValue > 10000000) {
    return { isValid: false, error: 'Expected cash flow cannot exceed $10 million' };
  }

  return { isValid: true };
}

export function validateTaxBenefits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue)) {
    return { isValid: false, error: 'Tax benefits must be a valid number' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Tax benefits cannot be negative' };
  }

  if (numValue > 1000000) {
    return { isValid: false, error: 'Tax benefits cannot exceed $1 million' };
  }

  return { isValid: true };
}

export function validateLiquidityPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { isValid: true }; // Optional field
  }

  const numValue = Number(value);
  if (isNaN(numValue) || !Number.isInteger(numValue)) {
    return { isValid: false, error: 'Liquidity period must be a valid integer' };
  }

  if (numValue < 0) {
    return { isValid: false, error: 'Liquidity period cannot be negative' };
  }

  if (numValue > 10) {
    return { isValid: false, error: 'Liquidity period cannot exceed 10 years' };
  }

  return { isValid: true };
}