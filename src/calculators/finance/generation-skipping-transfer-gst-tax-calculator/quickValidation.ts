import { ValidationResult } from '../../../types/calculator';

export function validateTransferAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { transferAmount: 'Transfer amount must be greater than $0' } };
  }
  if (value < 1000) {
    return { isValid: false, errors: { transferAmount: 'Transfer amount must be at least $1,000' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { transferAmount: 'Transfer amount cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGstTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { gstTaxRate: 'GST tax rate is required' } };
  }
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { gstTaxRate: 'GST tax rate must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualExclusionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { annualExclusionAmount: 'Annual exclusion amount is required' } };
  }
  if (value < 0) {
    return { isValid: false, errors: { annualExclusionAmount: 'Annual exclusion amount cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { annualExclusionAmount: 'Annual exclusion amount seems unreasonably high' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGstExemptionAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { gstExemptionAmount: 'GST exemption amount is required' } };
  }
  if (value < 0) {
    return { isValid: false, errors: { gstExemptionAmount: 'GST exemption amount cannot be negative' } };
  }
  if (value > 15000000) {
    return { isValid: false, errors: { gstExemptionAmount: 'GST exemption amount cannot exceed $15,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateGstExemptionUsed(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { gstExemptionUsed: 'GST exemption used is required' } };
  }
  if (value < 0) {
    return { isValid: false, errors: { gstExemptionUsed: 'GST exemption used cannot be negative' } };
  }
  if (allInputs?.gstExemptionAmount && value > allInputs.gstExemptionAmount) {
    return { isValid: false, errors: { gstExemptionUsed: 'GST exemption used cannot exceed total exemption amount' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfSkipBeneficiaries(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { numberOfSkipBeneficiaries: 'Number of skip beneficiaries must be at least 1' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { numberOfSkipBeneficiaries: 'Number of skip beneficiaries cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTransferType(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: false, errors: { transferType: 'Transfer type is required' } };
  }
  const validTypes = ['direct', 'trust', 'life-insurance', 'other'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { transferType: 'Invalid transfer type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateGstTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!allInputs?.includeStateGstTax) return { isValid: true, errors: {} };
  if (value === undefined || value === null) {
    return { isValid: false, errors: { stateGstTaxRate: 'State GST tax rate is required when state tax is included' } };
  }
  if (value < 0 || value > 50) {
    return { isValid: false, errors: { stateGstTaxRate: 'State GST tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePlanningHorizon(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { planningHorizon: 'Planning horizon is required' } };
  }
  if (value < 0 || value > 100) {
    return { isValid: false, errors: { planningHorizon: 'Planning horizon must be between 0 and 100 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedGrowthRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { expectedGrowthRate: 'Expected growth rate is required' } };
  }
  if (value < -10 || value > 20) {
    return { isValid: false, errors: { expectedGrowthRate: 'Expected growth rate must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { discountRate: 'Discount rate is required' } };
  }
  if (value < 0 || value > 15) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between 0% and 15%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationAdjustment(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value === null) {
    return { isValid: false, errors: { inflationAdjustment: 'Inflation adjustment is required' } };
  }
  if (value < -5 || value > 10) {
    return { isValid: false, errors: { inflationAdjustment: 'Inflation adjustment must be between -5% and 10%' } };
  }
  return { isValid: true, errors: {} };
}