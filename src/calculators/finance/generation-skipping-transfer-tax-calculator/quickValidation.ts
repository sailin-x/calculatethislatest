import { ValidationResult } from '../../../types/calculator';

export function validateTransferAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { transferAmount: 'Transfer amount cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { transferAmount: 'Transfer amount cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGSTTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { gstTaxRate: 'GST tax rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGSTExemptionUsed(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { gstExemptionUsed: 'GST exemption used cannot be negative' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { gstExemptionUsed: 'GST exemption used cannot exceed $20,000,000' } };
  }

  if (allInputs?.gstExemptionLimit && value > allInputs.gstExemptionLimit) {
    return { isValid: false, errors: { gstExemptionUsed: 'Cannot exceed GST exemption limit' } };
  }

  return { isValid: true, errors: {} };
}

export function validateGSTExemptionLimit(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { gstExemptionLimit: 'GST exemption limit cannot be negative' } };
  }
  if (value > 20000000) {
    return { isValid: false, errors: { gstExemptionLimit: 'GST exemption limit cannot exceed $20,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfSkipGenerations(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 1 || value > 10) {
    return { isValid: false, errors: { numberOfSkipGenerations: 'Number of skip generations must be between 1 and 10' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsDirectSkip(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isDirectSkip: 'Direct skip must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIsTrustDistribution(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { isTrustDistribution: 'Trust distribution must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeStateTax(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeStateTax: 'Include state tax must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { stateTaxRate: 'State tax rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 25) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between -10% and 25%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePlanningHorizon(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { planningHorizon: 'Planning horizon must be between 0 and 100 years' } };
  }
  return { isValid: true, errors: {} };
}