import { AnnuityInputs, AnnuityOutputs } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors?: Record<string, string>;
}

export function validateAnnuityInputs(inputs: AnnuityInputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Basic validation
  if (inputs.principal <= 0) {
    errors.principal = 'Principal must be greater than 0';
  }

  if (inputs.annualRate < 0 || inputs.annualRate > 100) {
    errors.annualRate = 'Annual rate must be between 0% and 100%';
  }

  if (inputs.years <= 0) {
    errors.years = 'Years must be greater than 0';
  }

  if (inputs.years > 100) {
    errors.years = 'Years cannot exceed 100';
  }

  if (inputs.paymentFrequency < 1 || inputs.paymentFrequency > 365) {
    errors.paymentFrequency = 'Payment frequency must be between 1 and 365';
  }

  if (inputs.annuityType !== 'ordinary' && inputs.annuityType !== 'due') {
    errors.annuityType = 'Invalid annuity type';
  }

  if (inputs.taxRate < 0 || inputs.taxRate > 100) {
    errors.taxRate = 'Tax rate must be between 0% and 100%';
  }

  if (inputs.inflationRate < 0 || inputs.inflationRate > 100) {
    errors.inflationRate = 'Inflation rate must be between 0% and 100%';
  }

  // Business logic validations
  if (inputs.principal > 1000000000) {
    errors.principal = 'Principal seems unusually high';
  }

  if (inputs.annualRate > 50) {
    errors.annualRate = 'Annual rate seems unusually high';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

export function validateAnnuityOutputs(outputs: AnnuityOutputs): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate outputs
  if (outputs.futureValue <= 0) {
    errors.futureValue = 'Future value must be greater than 0';
  }

  if (outputs.totalInterest < 0) {
    errors.totalInterest = 'Total interest cannot be negative';
  }

  if (outputs.totalPayments <= 0) {
    errors.totalPayments = 'Total payments must be greater than 0';
  }

  if (outputs.effectiveAnnualRate < 0) {
    errors.effectiveAnnualRate = 'Effective annual rate cannot be negative';
  }

  if (outputs.presentValue <= 0) {
    errors.presentValue = 'Present value must be greater than 0';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}