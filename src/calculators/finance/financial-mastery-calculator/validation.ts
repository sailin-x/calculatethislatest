import { FinancialMasteryCalculatorInputs } from './types';

export function validateFinancialMasteryCalculatorInputs(inputs: FinancialMasteryCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Add specific validation based on calculator type
  const inputKeys = Object.keys(inputs) as Array<keyof FinancialMasteryCalculatorInputs>;

  inputKeys.forEach(key => {
    const value = inputs[key];
    if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      errors.push({ field: key, message: `${key} must be a valid number` });
    }
    if (typeof value === 'number' && value < 0) {
      errors.push({ field: key, message: `${key} cannot be negative` });
    }
  });

  return errors;
}

export function validateFinancialMasteryCalculatorBusinessRules(inputs: FinancialMasteryCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Add business rule validations based on calculator type
  // These are examples - customize based on specific calculator requirements

  return warnings;
}
