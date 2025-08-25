import { ValidationResult } from '../../../types/calculator';

/**
 * Quick validation functions for annuity calculator
 * Each function validates a single field and includes the allInputs parameter
 */

export function validatePrincipal(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { principal: 'Principal must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { principal: 'Principal must be greater than 0' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { principal: 'Principal cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnualRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { annualRate: 'Annual rate must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { annualRate: 'Annual rate cannot be negative' } };
  }
  if (num > 20) {
    return { isValid: false, errors: { annualRate: 'Annual rate above 20% is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTerm(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { term: 'Term must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { term: 'Term must be greater than 0' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { term: 'Term cannot exceed 50 years' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePaymentFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { paymentFrequency: 'Payment frequency must be a valid number' } };
  }
  if (num <= 0) {
    return { isValid: false, errors: { paymentFrequency: 'Payment frequency must be greater than 0' } };
  }
  if (num > 365) {
    return { isValid: false, errors: { paymentFrequency: 'Payment frequency cannot exceed 365 times per year' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDeferralPeriod(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { deferralPeriod: 'Deferral period must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { deferralPeriod: 'Deferral period cannot be negative' } };
  }
  if (num > 30) {
    return { isValid: false, errors: { deferralPeriod: 'Deferral period cannot exceed 30 years' } };
  }
  
  // Check if deferral period is less than term
  if (allInputs?.term && num >= Number(allInputs.term)) {
    return { isValid: false, errors: { deferralPeriod: 'Deferral period must be less than the annuity term' } };
  }
  
  return { isValid: true, errors: {} };
}

export function validateAccumulationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { accumulationRate: 'Accumulation rate must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { accumulationRate: 'Accumulation rate cannot be negative' } };
  }
  if (num > 20) {
    return { isValid: false, errors: { accumulationRate: 'Accumulation rate above 20% is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateExpectedReturn(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { expectedReturn: 'Expected return must be a valid number' } };
  }
  if (num < -50) {
    return { isValid: false, errors: { expectedReturn: 'Expected return cannot be below -50%' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { expectedReturn: 'Expected return above 50% is unrealistic' } };
  }
  return { isValid: true, errors: {} };
}

export function validateVolatility(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { volatility: 'Volatility must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { volatility: 'Volatility cannot be negative' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { volatility: 'Volatility cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateTaxRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { taxRate: 'Tax rate must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot be negative' } };
  }
  if (num > 100) {
    return { isValid: false, errors: { taxRate: 'Tax rate cannot exceed 100%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateInflationRate(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate must be a valid number' } };
  }
  if (num < -20) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate cannot be below -20%' } };
  }
  if (num > 50) {
    return { isValid: false, errors: { inflationRate: 'Inflation rate above 50% is unusual' } };
  }
  return { isValid: true, errors: {} };
}

export function validateDeathBenefitAmount(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) {
    return { isValid: true, errors: {} }; // Optional field
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { deathBenefitAmount: 'Death benefit amount must be a valid number' } };
  }
  if (num < 0) {
    return { isValid: false, errors: { deathBenefitAmount: 'Death benefit amount cannot be negative' } };
  }
  if (num > 10000000) {
    return { isValid: false, errors: { deathBenefitAmount: 'Death benefit amount cannot exceed $10 million' } };
  }
  return { isValid: true, errors: {} };
}

export function validateMonteCarloSamples(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { monteCarloSamples: 'Monte Carlo samples must be a valid number' } };
  }
  if (num < 1000) {
    return { isValid: false, errors: { monteCarloSamples: 'Monte Carlo samples must be at least 1,000' } };
  }
  if (num > 100000) {
    return { isValid: false, errors: { monteCarloSamples: 'Monte Carlo samples cannot exceed 100,000' } };
  }
  return { isValid: true, errors: {} };
}

export function validateConfidenceLevel(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { confidenceLevel: 'Confidence level must be a valid number' } };
  }
  if (num < 50) {
    return { isValid: false, errors: { confidenceLevel: 'Confidence level must be at least 50%' } };
  }
  if (num > 99) {
    return { isValid: false, errors: { confidenceLevel: 'Confidence level cannot exceed 99%' } };
  }
  return { isValid: true, errors: {} };
}

export function validateAnnuityType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['immediate', 'deferred', 'fixed', 'variable'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { annuityType: 'Invalid annuity type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePaymentType(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validTypes = ['single-premium', 'flexible-premium'];
  if (!validTypes.includes(value)) {
    return { isValid: false, errors: { paymentType: 'Invalid payment type selected' } };
  }
  return { isValid: true, errors: {} };
}

export function validatePaymentMode(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validModes = ['receive', 'pay'];
  if (!validModes.includes(value)) {
    return { isValid: false, errors: { paymentMode: 'Invalid payment mode selected' } };
  }
  return { isValid: true, errors: {} };
}
