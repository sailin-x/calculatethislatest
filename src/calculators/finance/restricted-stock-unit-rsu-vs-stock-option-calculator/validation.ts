import { ValidationResult } from '../../lib/errors';
import { restrictedstockunitrsuvsstockoptioncalculatorInputs } from './types';

/**
 * Validate restricted stock unit rsu vs stock option calculator calculator inputs
 */
export function validaterestrictedstockunitrsuvsstockoptioncalculatorInputs(
  inputs: restrictedstockunitrsuvsstockoptioncalculatorInputs
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
