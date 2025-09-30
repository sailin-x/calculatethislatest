import { CapmCalculatorInputs } from './types';

export function validateCapmCalculatorInputs(inputs: CapmCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];
  // Add validation logic here
  return errors;
}

export function validateCapmCalculatorBusinessRules(inputs: CapmCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];
  // Add business rule validation here
  return warnings;
}
