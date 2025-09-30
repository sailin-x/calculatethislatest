import { CapitalGainsCalculatorInputs } from './types';

export function validateCapitalGainsCalculatorInputs(inputs: CapitalGainsCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  // Add validation logic here
  return errors;
}

export function validateCapitalGainsCalculatorBusinessRules(inputs: CapitalGainsCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  // Add business rule validation here
  return warnings;
}
