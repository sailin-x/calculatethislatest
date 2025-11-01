import { ValidationResult } from '../../lib/errors';
import { stockcalculatorInputs } from './types';

/**
 * Validate stock calculator calculator inputs
 */
export function validatestockcalculatorInputs(
  inputs: stockcalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for stock calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
