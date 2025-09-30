import { ValidationResult } from '../../lib/errors';
import { capitalcallscheduleplannerCalculatorInputs } from './types';

/**
 * Validate capital call schedule planner calculator inputs
 */
export function validatecapitalcallscheduleplannerCalculatorInputs(
  inputs: capitalcallscheduleplannerCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for capital call schedule planner
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
