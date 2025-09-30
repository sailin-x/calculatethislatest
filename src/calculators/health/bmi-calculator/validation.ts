import { BmiCalculatorInputs } from './types';

export function validateBmiCalculatorInputs(inputs: BmiCalculatorInputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Validate weight
  if (inputs.weight === undefined || inputs.weight === null) {
    errors.push({ field: 'weight', message: 'Weight is required' });
  } else if (typeof inputs.weight !== 'number' || isNaN(inputs.weight) || !isFinite(inputs.weight)) {
    errors.push({ field: 'weight', message: 'Weight must be a valid number' });
  } else if (inputs.weight <= 0) {
    errors.push({ field: 'weight', message: 'Weight must be greater than 0' });
  } else if (inputs.weight > 500) {
    errors.push({ field: 'weight', message: 'Weight seems unusually high (max 500kg)' });
  }

  // Validate height
  if (inputs.height === undefined || inputs.height === null) {
    errors.push({ field: 'height', message: 'Height is required' });
  } else if (typeof inputs.height !== 'number' || isNaN(inputs.height) || !isFinite(inputs.height)) {
    errors.push({ field: 'height', message: 'Height must be a valid number' });
  } else if (inputs.height <= 0) {
    errors.push({ field: 'height', message: 'Height must be greater than 0' });
  } else if (inputs.height < 50) {
    errors.push({ field: 'height', message: 'Height seems too low (minimum 50cm)' });
  } else if (inputs.height > 250) {
    errors.push({ field: 'height', message: 'Height seems too high (maximum 250cm)' });
  }

  return errors;
}

export function validateBmiCalculatorBusinessRules(inputs: BmiCalculatorInputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Medical validation warnings
  if (inputs.weight && inputs.height) {
    const heightM = inputs.height / 100;
    const bmi = inputs.weight / (heightM * heightM);

    if (bmi < 16) {
      warnings.push({ field: 'weight', message: 'BMI indicates severe underweight - consult healthcare professional' });
    } else if (bmi > 40) {
      warnings.push({ field: 'weight', message: 'BMI indicates severe obesity - consult healthcare professional' });
    }
  }

  return warnings;
}
