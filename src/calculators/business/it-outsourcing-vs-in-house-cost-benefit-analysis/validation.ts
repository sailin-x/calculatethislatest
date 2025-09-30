import { ValidationResult } from '../../lib/errors';
import { itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs } from './types';

/**
 * Validate it outsourcing vs in house cost benefit analysis calculator inputs
 */
export function validateitoutsourcingvsinhousecostbenefitanalysisCalculatorInputs(
  inputs: itoutsourcingvsinhousecostbenefitanalysisCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for it outsourcing vs in house cost benefit analysis
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
