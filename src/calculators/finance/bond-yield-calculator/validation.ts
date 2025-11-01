import { ValidationResult } from '../../lib/errors';
import { bondyieldcalculatorInputs } from './types';

/**
 * Validate bond yield calculator calculator inputs
 */
export function validatebondyieldcalculatorInputs(
  inputs: bondyieldcalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for bond yield calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
