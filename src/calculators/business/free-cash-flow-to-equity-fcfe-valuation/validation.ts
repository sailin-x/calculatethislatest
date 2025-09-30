import { ValidationResult } from '../../lib/errors';
import { freecashflowtoequityfcfevaluationCalculatorInputs } from './types';

/**
 * Validate free cash flow to equity fcfe valuation calculator inputs
 */
export function validatefreecashflowtoequityfcfevaluationCalculatorInputs(
  inputs: freecashflowtoequityfcfevaluationCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for free cash flow to equity fcfe valuation
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
