import { ValidationResult } from '../../lib/errors';
import { loancalculatorCalculatorInputs } from './types';

/**
 * Validate loan calculator calculator inputs
 */
export function validateloancalculatorCalculatorInputs(
  inputs: loancalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for loan calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
