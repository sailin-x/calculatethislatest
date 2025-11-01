import { ValidationResult } from '../../lib/errors';
import { stretchiracalculatorInputs } from './types';

/**
 * Validate stretch ira calculator calculator inputs
 */
export function validatestretchiracalculatorInputs(
  inputs: stretchiracalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for stretch ira calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
