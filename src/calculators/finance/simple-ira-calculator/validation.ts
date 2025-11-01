import { ValidationResult } from '../../lib/errors';
import { simpleiracalculatorInputs } from './types';

/**
 * Validate simple ira calculator calculator inputs
 */
export function validatesimpleiracalculatorInputs(
  inputs: simpleiracalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for simple ira calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
