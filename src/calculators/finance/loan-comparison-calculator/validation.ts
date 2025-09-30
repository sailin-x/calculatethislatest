import { ValidationResult } from '../../lib/errors';
import { loancomparisoncalculatorCalculatorInputs } from './types';

/**
 * Validate loan comparison calculator calculator inputs
 */
export function validateloancomparisoncalculatorCalculatorInputs(
  inputs: loancomparisoncalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for loan comparison calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
