import { ValidationResult } from '../../lib/errors';
import { rothiracalculatorInputs } from './types';

/**
 * Validate roth ira calculator calculator inputs
 */
export function validaterothiracalculatorInputs(
  inputs: rothiracalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for roth ira calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
