import { CAGRInputs } from './types';

export function validateCAGRInputs(inputs: CAGRInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Initial Value Validation
  if (!inputs.initialValue || inputs.initialValue <= 0) {
    errors.push({ field: 'initialValue', message: 'Initial value must be greater than 0' });
  }
  if (inputs.initialValue && inputs.initialValue > 1000000000) {
    errors.push({ field: 'initialValue', message: 'Initial value cannot exceed $1,000,000,000' });
  }

  // Final Value Validation
  if (!inputs.finalValue || inputs.finalValue <= 0) {
    errors.push({ field: 'finalValue', message: 'Final value must be greater than 0' });
  }
  if (inputs.finalValue && inputs.finalValue > 1000000000) {
    errors.push({ field: 'finalValue', message: 'Final value cannot exceed $1,000,000,000' });
  }

  // Time Period Validation
  if (!inputs.timePeriod || inputs.timePeriod <= 0) {
    errors.push({ field: 'timePeriod', message: 'Time period must be greater than 0' });
  }
  if (inputs.timePeriod && inputs.timePeriod > 100) {
    errors.push({ field: 'timePeriod', message: 'Time period cannot exceed 100 years' });
  }

  // Additional Contributions Validation
  if (inputs.additionalContributions && inputs.additionalContributions < 0) {
    errors.push({ field: 'additionalContributions', message: 'Additional contributions cannot be negative' });
  }

  // Inflation Rate Validation
  if (inputs.inflationRate && (inputs.inflationRate < -0.1 || inputs.inflationRate > 0.5)) {
    errors.push({ field: 'inflationRate', message: 'Inflation rate must be between -10% and 50%' });
  }

  // Tax Rate Validation
  if (inputs.taxRate && (inputs.taxRate < 0 || inputs.taxRate > 1)) {
    errors.push({ field: 'taxRate', message: 'Tax rate must be between 0% and 100%' });
  }

  return errors;
}

export function validateCAGRBusinessRules(inputs: CAGRInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Negative growth warning
  if (inputs.finalValue < inputs.initialValue) {
    warnings.push({ field: 'finalValue', message: 'Investment shows negative growth over the period' });
  }

  // Very short time period warning
  if (inputs.timePeriod < 1) {
    warnings.push({ field: 'timePeriod', message: 'Very short time periods may not provide meaningful CAGR calculations' });
  }

  // Very long time period warning
  if (inputs.timePeriod > 30) {
    warnings.push({ field: 'timePeriod', message: 'Long time periods may be affected by significant market changes' });
  }

  // High inflation warning
  if (inputs.inflationRate && inputs.inflationRate > 0.1) {
    warnings.push({ field: 'inflationRate', message: 'High inflation rates significantly impact real returns' });
  }

  // High tax rate warning
  if (inputs.taxRate && inputs.taxRate > 0.4) {
    warnings.push({ field: 'taxRate', message: 'High tax rates substantially reduce after-tax returns' });
  }

  return warnings;
}