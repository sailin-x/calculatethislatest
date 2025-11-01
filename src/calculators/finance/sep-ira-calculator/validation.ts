import { ValidationResult } from '../../lib/errors';
import { sepiracalculatorInputs } from './types';

/**
 * Validate sep ira calculator calculator inputs
 */
export function validatesepiracalculatorInputs(
  inputs: sepiracalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for sep ira calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
