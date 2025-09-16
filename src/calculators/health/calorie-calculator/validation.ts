/**
 * Calorie Calculator Validation Rules
 * Comprehensive validation for nutritional calculations
 */

import { ValidationRule, ValidationResult } from '../../../types/calculator';

/**
 * Comprehensive validation rules for calorie calculator
 */
export const calorieValidationRules: ValidationRule[] = [
  // Weight validation
  {
    field: 'weight',
    type: 'range',
    message: 'Weight must be between 20 and 500 pounds',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 20 && num <= 500;
    }
  },

  // Height validation
  {
    field: 'heightFeet',
    type: 'range',
    message: 'Height feet must be between 2 and 8',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 2 && num <= 8;
    }
  },

  {
    field: 'heightInches',
    type: 'range',
    message: 'Height inches must be between 0 and 11',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 0 && num <= 11;
    }
  },

  // Age validation
  {
    field: 'age',
    type: 'range',
    message: 'Age must be between 10 and 120 years',
    validator: (value: any) => {
      const num = Number(value);
      return !isNaN(num) && num >= 10 && num <= 120;
    }
  },

  // Activity level validation
  {
    field: 'activityLevel',
    type: 'required',
    message: 'Activity level is required',
    validator: (value: any) => {
      const validLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'];
      return value && validLevels.includes(value);
    }
  },

  // Gender validation
  {
    field: 'gender',
    type: 'required',
    message: 'Gender is required',
    validator: (value: any) => {
      return value && (value === 'male' || value === 'female');
    }
  },

  // Goal validation
  {
    field: 'goal',
    type: 'required',
    message: 'Weight goal is required',
    validator: (value: any) => {
      const validGoals = ['maintain', 'lose', 'gain'];
      return value && validGoals.includes(value);
    }
  },

  // Weekly weight change validation
  {
    field: 'weeklyChange',
    type: 'range',
    message: 'Weekly weight change must be between 0.25 and 2 pounds',
    validator: (value: any, allInputs?: Record<string, any>) => {
      if (allInputs?.goal === 'maintain') return true; // No weekly change needed for maintenance

      const num = Number(value);
      return !isNaN(num) && num >= 0.25 && num <= 2;
    }
  },

  // Cross-field validation for weight goal and weekly change
  {
    field: 'goal',
    type: 'cross-field',
    message: 'Weekly weight change is required when goal is not maintenance',
    validator: (value: any, allInputs?: Record<string, any>) => {
      if (value === 'maintain') return true;
      return allInputs?.weeklyChange && Number(allInputs.weeklyChange) > 0;
    }
  },

  // Body fat percentage validation (optional field)
  {
    field: 'bodyFatPercentage',
    type: 'range',
    message: 'Body fat percentage must be between 2 and 50',
    validator: (value: any) => {
      if (!value) return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 2 && num <= 50;
    }
  },

  // Macronutrient ratio validation
  {
    field: 'proteinRatio',
    type: 'range',
    message: 'Protein ratio must be between 10 and 50 percent',
    validator: (value: any) => {
      if (!value) return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 10 && num <= 50;
    }
  },

  {
    field: 'carbRatio',
    type: 'range',
    message: 'Carb ratio must be between 20 and 70 percent',
    validator: (value: any) => {
      if (!value) return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 20 && num <= 70;
    }
  },

  {
    field: 'fatRatio',
    type: 'range',
    message: 'Fat ratio must be between 15 and 40 percent',
    validator: (value: any) => {
      if (!value) return true; // Optional field
      const num = Number(value);
      return !isNaN(num) && num >= 15 && num <= 40;
    }
  },

  // Macronutrient ratio sum validation
  {
    field: 'proteinRatio',
    type: 'cross-field',
    message: 'Macronutrient ratios must sum to 100%',
    validator: (value: any, allInputs?: Record<string, any>) => {
      const protein = Number(allInputs?.proteinRatio || 0);
      const carbs = Number(allInputs?.carbRatio || 0);
      const fat = Number(allInputs?.fatRatio || 0);

      if (protein === 0 && carbs === 0 && fat === 0) return true; // All optional

      const total = protein + carbs + fat;
      return Math.abs(total - 100) <= 1; // Allow small rounding differences
    }
  }
];

/**
 * Validate all calorie calculator inputs
 */
export function validateCalorieInputs(inputs: Record<string, any>): ValidationResult {
  const errors: Record<string, string> = {};
  const isValid = calorieValidationRules.every(rule => {
    const value = inputs[rule.field];
    const isFieldValid = rule.validator(value, inputs);

    if (!isFieldValid) {
      errors[rule.field] = rule.message;
    }

    return isFieldValid;
  });

  return {
    isValid,
    errors
  };
}

/**
 * Validate individual fields for quick validation
 */
export function validateCalorieField(fieldName: string, value: any, allInputs?: Record<string, any>): ValidationResult {
  const relevantRules = calorieValidationRules.filter(rule => rule.field === fieldName);

  if (relevantRules.length === 0) {
    return { isValid: true, errors: {} };
  }

  const errors: Record<string, string> = {};
  const isValid = relevantRules.every(rule => {
    const isFieldValid = rule.validator(value, allInputs);

    if (!isFieldValid) {
      errors[rule.field] = rule.message;
    }

    return isFieldValid;
  });

  return {
    isValid,
    errors
  };
}

/**
 * Validate weight input
 */
export function validateWeightKg(value: any): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { weight: 'Weight must be a valid number' } };
  }
  if (num < 20 || num > 500) {
    return { isValid: false, errors: { weight: 'Weight must be between 20 and 500 kg' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate height input
 */
export function validateHeightCm(value: any): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { height: 'Height must be a valid number' } };
  }
  if (num < 100 || num > 250) {
    return { isValid: false, errors: { height: 'Height must be between 100 and 250 cm' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate age input
 */
export function validateAge(value: any): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { age: 'Age must be a valid number' } };
  }
  if (num < 10 || num > 120) {
    return { isValid: false, errors: { age: 'Age must be between 10 and 120 years' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate activity level
 */
export function validateActivityLevel(value: any): ValidationResult {
  const validLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'];
  if (!value || !validLevels.includes(value)) {
    return { isValid: false, errors: { activityLevel: 'Please select a valid activity level' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate gender
 */
export function validateGender(value: any): ValidationResult {
  if (!value || (value !== 'male' && value !== 'female')) {
    return { isValid: false, errors: { gender: 'Please select male or female' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate weight goal
 */
export function validateGoal(value: any): ValidationResult {
  const validGoals = ['maintain', 'lose', 'gain'];
  if (!value || !validGoals.includes(value)) {
    return { isValid: false, errors: { goal: 'Please select a valid weight goal' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate weekly weight change
 */
export function validateWeeklyChange(value: any, goal?: string): ValidationResult {
  if (goal === 'maintain') {
    return { isValid: true, errors: {} }; // No validation needed for maintenance
  }

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { weeklyChange: 'Weekly change must be a valid number' } };
  }
  if (num < 0.25 || num > 2) {
    return { isValid: false, errors: { weeklyChange: 'Weekly change must be between 0.25 and 2 pounds' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate body fat percentage
 */
export function validateBodyFatPercentage(value: any): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { bodyFatPercentage: 'Body fat percentage must be a valid number' } };
  }
  if (num < 2 || num > 50) {
    return { isValid: false, errors: { bodyFatPercentage: 'Body fat percentage must be between 2% and 50%' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate macronutrient ratios
 */
export function validateMacronutrientRatios(protein: any, carbs: any, fat: any): ValidationResult {
  const p = Number(protein || 0);
  const c = Number(carbs || 0);
  const f = Number(fat || 0);

  if (isNaN(p) || isNaN(c) || isNaN(f)) {
    return { isValid: false, errors: { macronutrients: 'All macronutrient ratios must be valid numbers' } };
  }

  if (p < 10 || p > 50) {
    return { isValid: false, errors: { proteinRatio: 'Protein ratio must be between 10% and 50%' } };
  }

  if (c < 20 || c > 70) {
    return { isValid: false, errors: { carbRatio: 'Carb ratio must be between 20% and 70%' } };
  }

  if (f < 15 || f > 40) {
    return { isValid: false, errors: { fatRatio: 'Fat ratio must be between 15% and 40%' } };
  }

  const total = p + c + f;
  if (Math.abs(total - 100) > 1) {
    return { isValid: false, errors: { macronutrients: 'Macronutrient ratios must sum to 100%' } };
  }

  return { isValid: true, errors: {} };
}