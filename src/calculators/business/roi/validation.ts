import { ROIInputs } from './types';

export function validateROIInputs(
  inputs: ROIInputs,
  allInputs?: Record<string, any>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Basic validation for required fields
  if (!inputs.initialInvestment || inputs.initialInvestment <= 0) {
    errors.push('Initial investment is required and must be greater than 0');
  }

  if (!inputs.finalValue || inputs.finalValue < 0) {
    errors.push('Final value is required and cannot be negative');
  }

  if (!inputs.totalReturn) {
    errors.push('Total return is required');
  }

  if (!inputs.investmentPeriod || inputs.investmentPeriod <= 0) {
    errors.push('Investment period is required and must be greater than 0');
  }

  // Range validations
  if (inputs.initialInvestment && (inputs.initialInvestment < 0.01 || inputs.initialInvestment > 1000000000)) {
    errors.push('Initial investment must be between $0.01 and $1 billion');
  }

  if (inputs.finalValue && (inputs.finalValue < 0 || inputs.finalValue > 1000000000)) {
    errors.push('Final value must be between $0 and $1 billion');
  }

  if (inputs.totalReturn && (inputs.totalReturn < 0 || inputs.totalReturn > 1000000000)) {
    errors.push('Total return must be between $0 and $1 billion');
  }

  if (inputs.investmentPeriod && (inputs.investmentPeriod < 1 || inputs.investmentPeriod > 600)) {
    errors.push('Investment period must be between 1 and 600 months');
  }

  // Rate validations
  if (inputs.discountRate !== undefined && (inputs.discountRate < 0 || inputs.discountRate > 100)) {
    errors.push('Discount rate must be between 0% and 100%');
  }

  if (inputs.inflationRate !== undefined && (inputs.inflationRate < 0 || inputs.inflationRate > 100)) {
    errors.push('Inflation rate must be between 0% and 100%');
  }

  if (inputs.opportunityCost !== undefined && (inputs.opportunityCost < 0 || inputs.opportunityCost > 100)) {
    errors.push('Opportunity cost must be between 0% and 100%');
  }

  if (inputs.taxRate !== undefined && (inputs.taxRate < 0 || inputs.taxRate > 100)) {
    errors.push('Tax rate must be between 0% and 100%');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
