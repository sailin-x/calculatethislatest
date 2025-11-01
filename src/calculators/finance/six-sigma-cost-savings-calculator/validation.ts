import { ValidationResult } from '../../lib/errors';
import { sixsigmacostsavingscalculatorInputs } from './types';

/**
 * Validate six sigma cost savings calculator calculator inputs
 */
export function validatesixsigmacostsavingscalculatorInputs(
  inputs: sixsigmacostsavingscalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for six sigma cost savings calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
