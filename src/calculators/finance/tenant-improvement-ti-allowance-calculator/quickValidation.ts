import { ValidationResult } from '../../types/calculator';

export function validateLeaseTermYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { leaseTermYears: 'Lease term must be greater than 0 years' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { leaseTermYears: 'Lease term cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualRent(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualRent: 'Annual rent cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { annualRent: 'Annual rent cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTenantImprovementAllowance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { tenantImprovementAllowance: 'TI allowance cannot be negative' } };
  }
  if (value > 5000000) {
    return { isValid: false, errors: { tenantImprovementAllowance: 'TI allowance cannot exceed $5,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLandlordContributionPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 100) {
    return { isValid: false, errors: { landlordContributionPercentage: 'Landlord contribution percentage must be between 0% and 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTotalConstructionCost(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { totalConstructionCost: 'Total construction cost cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { totalConstructionCost: 'Total construction cost cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConstructionPeriodMonths(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { constructionPeriodMonths: 'Construction period cannot be negative' } };
  }
  if (value > 60) {
    return { isValid: false, errors: { constructionPeriodMonths: 'Construction period cannot exceed 60 months' } };
  }
  return { isValid: true, errors: {} };
}

export function validateFinancingRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 30) {
    return { isValid: false, errors: { financingRate: 'Financing rate must be between 0% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateHoldingPeriodYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { holdingPeriodYears: 'Holding period cannot be negative' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { holdingPeriodYears: 'Holding period cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDiscountRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 20) {
    return { isValid: false, errors: { discountRate: 'Discount rate must be between 0% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 50) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be between 0% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDepreciationYears(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value <= 0) {
    return { isValid: false, errors: { depreciationYears: 'Depreciation years must be greater than 0' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { depreciationYears: 'Depreciation years cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedAppreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 20) {
    return { isValid: false, errors: { expectedAppreciation: 'Expected appreciation must be between -10% and 20%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeFinancing(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeFinancing: 'Include financing must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeDepreciation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeDepreciation: 'Include depreciation must be true or false' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeTaxBenefits(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeTaxBenefits: 'Include tax benefits must be true or false' } };
  }
  return { isValid: true, errors: {} };
}