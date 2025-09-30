import { ValidationResult } from '../../lib/errors';
import { lapseratesensitivityanalysisCalculatorInputs } from './types';

/**
 * Validate lapse rate sensitivity analysis calculator inputs
 */
export function validatelapseratesensitivityanalysisCalculatorInputs(
  inputs: lapseratesensitivityanalysisCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for lapse rate sensitivity analysis
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
