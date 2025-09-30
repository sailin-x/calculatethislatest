import { ValidationResult } from '../../lib/errors';
import { freecashflowtofirmfcffvaluationCalculatorInputs } from './types';

/**
 * Validate free cash flow to firm fcff valuation calculator inputs
 */
export function validatefreecashflowtofirmfcffvaluationCalculatorInputs(
  inputs: freecashflowtofirmfcffvaluationCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for free cash flow to firm fcff valuation
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
