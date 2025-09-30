import { ValidationResult } from '../../lib/errors';
import { realestateinvestmentcalculatorexistsbutneedsregistrationCalculatorInputs } from './types';

/**
 * Validate real estate investment calculator exists but needs registration calculator inputs
 */
export function validaterealestateinvestmentcalculatorexistsbutneedsregistrationCalculatorInputs(
  inputs: realestateinvestmentcalculatorexistsbutneedsregistrationCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for real estate investment calculator exists but needs registration
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
