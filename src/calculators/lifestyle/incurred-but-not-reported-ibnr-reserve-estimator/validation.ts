import { ValidationResult } from '../../lib/errors';
import { incurredbutnotreportedibnrreserveestimatorCalculatorInputs } from './types';

/**
 * Validate incurred but not reported ibnr reserve estimator calculator inputs
 */
export function validateincurredbutnotreportedibnrreserveestimatorCalculatorInputs(
  inputs: incurredbutnotreportedibnrreserveestimatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for incurred but not reported ibnr reserve estimator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
