import { ValidationResult } from '../../lib/errors';
import { suretybondpremiumcalculatorCalculatorInputs } from './types';

/**
 * Validate surety bond premium calculator calculator inputs
 */
export function validatesuretybondpremiumcalculatorCalculatorInputs(
  inputs: suretybondpremiumcalculatorCalculatorInputs
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
