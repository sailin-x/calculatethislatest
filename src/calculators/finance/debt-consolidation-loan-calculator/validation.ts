import { ValidationResult } from '../../lib/errors';
import { debtconsolidationloancalculatorInputs } from './types';

/**
 * Validate debt consolidation loan calculator calculator inputs
 */
export function validatedebtconsolidationloancalculatorInputs(
  inputs: debtconsolidationloancalculatorInputs
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
