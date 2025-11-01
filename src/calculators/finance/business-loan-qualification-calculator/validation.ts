import { ValidationResult } from '../../lib/errors';
import { businessloanqualificationcalculatorInputs } from './types';

/**
 * Validate business loan qualification calculator calculator inputs
 */
export function validatebusinessloanqualificationcalculatorInputs(
  inputs: businessloanqualificationcalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for business loan qualification calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
