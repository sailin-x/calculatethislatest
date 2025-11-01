import { ValidationResult } from '../../lib/errors';
import { carloancalculatorInputs } from './types';

/**
 * Validate car loan calculator calculator inputs
 */
export function validatecarloancalculatorInputs(
  inputs: carloancalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for car loan calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
