import { ValidationResult } from '../../lib/errors';
import { cryptotaxharvestingcalculatorCalculatorInputs } from './types';

/**
 * Validate crypto tax harvesting calculator calculator inputs
 */
export function validatecryptotaxharvestingcalculatorCalculatorInputs(
  inputs: cryptotaxharvestingcalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for crypto tax harvesting calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
