import { ValidationResult } from '../../types/calculator';

export function validateTrustAssets(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { trustAssets: 'Trust assets cannot be negative' } };
  }
  if (value > 100000000) {
    return { isValid: false, errors: { trustAssets: 'Trust assets cannot exceed $100,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualContributions(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualContributions: 'Annual contributions cannot be negative' } };
  }
  if (value > 10000000) {
    return { isValid: false, errors: { annualContributions: 'Annual contributions cannot exceed $10,000,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTrustDuration(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { trustDuration: 'Trust duration must be at least 1 year' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { trustDuration: 'Trust duration cannot exceed 100 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < -10 || value > 30) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be between -10% and 30%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateNumberOfBeneficiaries(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { numberOfBeneficiaries: 'Number of beneficiaries must be at least 1' } };
  }
  if (value > 50) {
    return { isValid: false, errors: { numberOfBeneficiaries: 'Number of beneficiaries cannot exceed 50' } };
  }
  return { isValid: true, errors: {} };
}

export function validateSetupCosts(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { setupCosts: 'Setup costs cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { setupCosts: 'Setup costs cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTrusteeFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { trusteeFees: 'Trustee fees cannot be negative' } };
  }
  if (value > 100000) {
    return { isValid: false, errors: { trusteeFees: 'Trustee fees cannot exceed $100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualLegalFees(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0) {
    return { isValid: false, errors: { annualLegalFees: 'Annual legal fees cannot be negative' } };
  }
  if (value > 50000) {
    return { isValid: false, errors: { annualLegalFees: 'Annual legal fees cannot exceed $50,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnalysisPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period must be at least 1 year' } };
  }
  if (value > 100) {
    return { isValid: false, errors: { analysisPeriod: 'Analysis period cannot exceed 100 years' } };
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

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (value === undefined || value < 0 || value > 10) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be between 0% and 10%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateLifeExpectancy(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value < 1) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy must be at least 1 year' } };
  }
  if (value > 120) {
    return { isValid: false, errors: { lifeExpectancy: 'Life expectancy cannot exceed 120 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validateStateOfFormation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { stateOfFormation: 'State of formation is required' } };
  }
  const validStates = ['alaska', 'delaware', 'south dakota', 'wyoming', 'new hampshire'];
  if (!validStates.includes(value.toLowerCase())) {
    return { isValid: false, errors: { stateOfFormation: 'State should be known for strong asset protection laws' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDistributionFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { distributionFrequency: 'Distribution frequency is required' } };
  }
  const validFrequencies = ['annual', 'semi-annual', 'quarterly', 'monthly'];
  if (!validFrequencies.includes(value)) {
    return { isValid: false, errors: { distributionFrequency: 'Invalid distribution frequency selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validateRiskTolerance(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || value === '') {
    return { isValid: false, errors: { riskTolerance: 'Risk tolerance is required' } };
  }
  const validTolerances = ['low', 'medium', 'high'];
  if (!validTolerances.includes(value)) {
    return { isValid: false, errors: { riskTolerance: 'Risk tolerance must be low, medium, or high' } };
  }
  return { isValid: true, errors: {} };
}

export function validateIncludeInflation(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (typeof value !== 'boolean' && value !== undefined) {
    return { isValid: false, errors: { includeInflation: 'Include inflation must be true or false' } };
  }
  return { isValid: true, errors: {} };
}