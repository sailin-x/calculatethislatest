import { ValidationResult } from '../../lib/errors';
import { portfoliocompanyebitdagrowthcalculatorInputs } from './types';

/**
 * Validate portfolio company ebitda growth calculator calculator inputs
 */
export function validateportfoliocompanyebitdagrowthcalculatorInputs(
  inputs: portfoliocompanyebitdagrowthcalculatorInputs
): ValidationResult {
  const errors: string[] = [];

  // Domain-specific validation for portfolio company ebitda growth calculator
  if (inputs.value < 0) {
    errors.push('Value must be non-negative');
  }

  // TODO: Add more domain-specific validations

  return {
    isValid: errors.length === 0,
    errors
  };
}
