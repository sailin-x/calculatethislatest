import { ValidationResult } from '../../lib/errors';
import { mergeracquisitionmadivestiturevaluationCalculatorInputs } from './types';

/**
 * Validate merger acquisition m a divestiture valuation calculator inputs
 */
export function validatemergeracquisitionmadivestiturevaluationCalculatorInputs(
  inputs: mergeracquisitionmadivestiturevaluationCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for merger acquisition m a divestiture valuation
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
