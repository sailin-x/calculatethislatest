import { ValidationResult } from '../../lib/errors';
import { titleloancalculatorCalculatorInputs } from './types';

/**
 * Validate title loan calculator calculator inputs
 */
export function validatetitleloancalculatorCalculatorInputs(
  inputs: titleloancalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for title loan calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
