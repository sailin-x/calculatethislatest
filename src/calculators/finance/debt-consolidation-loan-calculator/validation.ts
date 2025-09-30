import { ValidationResult } from '../../lib/errors';
import { debtconsolidationloancalculatorCalculatorInputs } from './types';

/**
 * Validate debt consolidation loan calculator calculator inputs
 */
export function validatedebtconsolidationloancalculatorCalculatorInputs(
  inputs: debtconsolidationloancalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for debt consolidation loan calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
