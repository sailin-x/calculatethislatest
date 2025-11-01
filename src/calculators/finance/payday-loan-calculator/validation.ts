import { ValidationResult } from '../../lib/errors';
import { paydayloancalculatorInputs } from './types';

/**
 * Validate payday loan calculator calculator inputs
 */
export function validatepaydayloancalculatorInputs(
  inputs: paydayloancalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for payday loan calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
