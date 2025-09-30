import { ValidationResult } from '../../lib/errors';
import { commercialfleetinsurancepremiumestimatorCalculatorInputs } from './types';

/**
 * Validate commercial fleet insurance premium estimator calculator inputs
 */
export function validatecommercialfleetinsurancepremiumestimatorCalculatorInputs(
  inputs: commercialfleetinsurancepremiumestimatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for commercial fleet insurance premium estimator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
