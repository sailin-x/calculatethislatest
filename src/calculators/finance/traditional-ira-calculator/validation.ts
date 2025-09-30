import { ValidationResult } from '../../lib/errors';
import { traditionaliracalculatorCalculatorInputs } from './types';

/**
 * Validate traditional ira calculator calculator inputs
 */
export function validatetraditionaliracalculatorCalculatorInputs(
  inputs: traditionaliracalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for traditional ira calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
