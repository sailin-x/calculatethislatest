import { ValidationResult } from '../../lib/errors';
import { suretybondpremiumcalculatorInputs } from './types';

/**
 * Validate surety bond premium calculator calculator inputs
 */
export function validatesuretybondpremiumcalculatorInputs(
  inputs: suretybondpremiumcalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for surety bond premium calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
