import { ValidationResult } from '../../lib/errors';
import { stretchiracalculatorCalculatorInputs } from './types';

/**
 * Validate stretch ira calculator calculator inputs
 */
export function validatestretchiracalculatorCalculatorInputs(
  inputs: stretchiracalculatorCalculatorInputs
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
