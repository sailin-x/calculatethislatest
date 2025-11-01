import { ValidationResult } from '../../lib/errors';
import { cloudrepatriationsavingscalculatorInputs } from './types';

/**
 * Validate cloud repatriation savings calculator calculator inputs
 */
export function validatecloudrepatriationsavingscalculatorInputs(
  inputs: cloudrepatriationsavingscalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for cloud repatriation savings calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
