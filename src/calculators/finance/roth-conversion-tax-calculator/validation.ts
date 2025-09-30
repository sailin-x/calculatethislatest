import { RothConversionTaxCalculatorInputs } from './types';

export function validateRothConversionTaxCalculatorInputs(inputs: RothConversionTaxCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  // Add validation logic here
  return errors;
}

export function validateRothConversionTaxCalculatorBusinessRules(inputs: RothConversionTaxCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  // Add business rule validation here
  return warnings;
}
