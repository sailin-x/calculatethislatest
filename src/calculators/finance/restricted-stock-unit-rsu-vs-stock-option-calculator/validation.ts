import { ValidationResult } from '../../lib/errors';
import { restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs } from './types';

/**
 * Validate restricted stock unit rsu vs stock option calculator calculator inputs
 */
export function validaterestrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs(
  inputs: restrictedstockunitrsuvsstockoptioncalculatorCalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for restricted stock unit rsu vs stock option calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
