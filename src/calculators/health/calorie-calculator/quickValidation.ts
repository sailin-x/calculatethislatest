/**
 * Calorie Calculator Quick Validation
 * Individual field validation functions with allInputs parameter
 */

import { ValidationResult } from '../../../types/calculator';

/**
 * Validate weight in pounds
 */
export function validateWeight(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { weight: 'Weight must be a valid number' } };
  }
  if (num < 20 || num > 500) {
    return { isValid: false, errors: { weight: 'Weight must be between 20 and 500 pounds' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate height in feet
 */
export function validateHeightFeet(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { heightFeet: 'Height feet must be a valid number' } };
  }
  if (num < 2 || num > 8) {
    return { isValid: false, errors: { heightFeet: 'Height feet must be between 2 and 8' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate height inches
 */
export function validateHeightInches(value: any, allInputs?: Record<string, any>): ValidationResult {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { heightInches: 'Height inches must be a valid number' } };
  }
  if (num < 0 || num > 11) {
    return { isValid: false, errors: { heightInches: 'Height inches must be between 0 and 11' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate age
 */
export function validateAge(value: any, allInputs?: Record<string, any>): ValidationResult {
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
export function validateActivityLevel(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validLevels = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'];
  if (!value || !validLevels.includes(value)) {
    return { isValid: false, errors: { activityLevel: 'Please select a valid activity level' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate gender
 */
export function validateGender(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value || (value !== 'male' && value !== 'female')) {
    return { isValid: false, errors: { gender: 'Please select male or female' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate weight goal
 */
export function validateGoal(value: any, allInputs?: Record<string, any>): ValidationResult {
  const validGoals = ['maintain', 'lose', 'gain'];
  if (!value || !validGoals.includes(value)) {
    return { isValid: false, errors: { goal: 'Please select a valid weight goal' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate weekly weight change
 */
export function validateWeeklyChange(value: any, allInputs?: Record<string, any>): ValidationResult {
  const goal = allInputs?.goal;

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
export function validateBodyFatPercentage(value: any, allInputs?: Record<string, any>): ValidationResult {
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
 * Validate protein ratio
 */
export function validateProteinRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { proteinRatio: 'Protein ratio must be a valid number' } };
  }
  if (num < 10 || num > 50) {
    return { isValid: false, errors: { proteinRatio: 'Protein ratio must be between 10% and 50%' } };
  }

  // Check if ratios sum to 100%
  const protein = num;
  const carbs = Number(allInputs?.carbRatio || 0);
  const fat = Number(allInputs?.fatRatio || 0);

  if (protein > 0 || carbs > 0 || fat > 0) {
    const total = protein + carbs + fat;
    if (Math.abs(total - 100) > 1) {
      return { isValid: false, errors: { proteinRatio: 'Macronutrient ratios must sum to 100%' } };
    }
  }

  return { isValid: true, errors: {} };
}

/**
 * Validate carb ratio
 */
export function validateCarbRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { carbRatio: 'Carb ratio must be a valid number' } };
  }
  if (num < 20 || num > 70) {
    return { isValid: false, errors: { carbRatio: 'Carb ratio must be between 20% and 70%' } };
  }

  // Check if ratios sum to 100%
  const protein = Number(allInputs?.proteinRatio || 0);
  const carbs = num;
  const fat = Number(allInputs?.fatRatio || 0);

  if (protein > 0 || carbs > 0 || fat > 0) {
    const total = protein + carbs + fat;
    if (Math.abs(total - 100) > 1) {
      return { isValid: false, errors: { carbRatio: 'Macronutrient ratios must sum to 100%' } };
    }
  }

  return { isValid: true, errors: {} };
}

/**
 * Validate fat ratio
 */
export function validateFatRatio(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { fatRatio: 'Fat ratio must be a valid number' } };
  }
  if (num < 15 || num > 40) {
    return { isValid: false, errors: { fatRatio: 'Fat ratio must be between 15% and 40%' } };
  }

  // Check if ratios sum to 100%
  const protein = Number(allInputs?.proteinRatio || 0);
  const carbs = Number(allInputs?.carbRatio || 0);
  const fat = num;

  if (protein > 0 || carbs > 0 || fat > 0) {
    const total = protein + carbs + fat;
    if (Math.abs(total - 100) > 1) {
      return { isValid: false, errors: { fatRatio: 'Macronutrient ratios must sum to 100%' } };
    }
  }

  return { isValid: true, errors: {} };
}

/**
 * Validate target weight
 */
export function validateTargetWeight(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { targetWeight: 'Target weight must be a valid number' } };
  }
  if (num < 20 || num > 500) {
    return { isValid: false, errors: { targetWeight: 'Target weight must be between 20 and 500 pounds' } };
  }

  // Check if target weight makes sense with current weight and goal
  const currentWeight = Number(allInputs?.weight || 0);
  const goal = allInputs?.goal;

  if (currentWeight > 0) {
    if (goal === 'lose' && num >= currentWeight) {
      return { isValid: false, errors: { targetWeight: 'Target weight should be less than current weight for weight loss' } };
    }
    if (goal === 'gain' && num <= currentWeight) {
      return { isValid: false, errors: { targetWeight: 'Target weight should be greater than current weight for weight gain' } };
    }
  }

  return { isValid: true, errors: {} };
}

/**
 * Validate target date
 */
export function validateTargetDate(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const date = new Date(value);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return { isValid: false, errors: { targetDate: 'Please enter a valid date' } };
  }

  if (date <= now) {
    return { isValid: false, errors: { targetDate: 'Target date must be in the future' } };
  }

  // Check if target date is reasonable (not more than 2 years away)
  const twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);

  if (date > twoYearsFromNow) {
    return { isValid: false, errors: { targetDate: 'Target date should not be more than 2 years in the future' } };
  }

  return { isValid: true, errors: {} };
}

/**
 * Validate exercise calories
 */
export function validateExerciseCalories(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { exerciseCalories: 'Exercise calories must be a valid number' } };
  }
  if (num < 0 || num > 2000) {
    return { isValid: false, errors: { exerciseCalories: 'Exercise calories must be between 0 and 2000' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate meal frequency
 */
export function validateMealFrequency(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { mealFrequency: 'Meal frequency must be a valid number' } };
  }
  if (num < 1 || num > 8) {
    return { isValid: false, errors: { mealFrequency: 'Meal frequency must be between 1 and 8 meals per day' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate water intake
 */
export function validateWaterIntake(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { waterIntake: 'Water intake must be a valid number' } };
  }
  if (num < 0 || num > 200) {
    return { isValid: false, errors: { waterIntake: 'Water intake must be between 0 and 200 ounces per day' } };
  }
  return { isValid: true, errors: {} };
}

/**
 * Validate sleep hours
 */
export function validateSleepHours(value: any, allInputs?: Record<string, any>): ValidationResult {
  if (!value) return { isValid: true, errors: {} }; // Optional field

  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, errors: { sleepHours: 'Sleep hours must be a valid number' } };
  }
  if (num < 4 || num > 12) {
    return { isValid: false, errors: { sleepHours: 'Sleep hours must be between 4 and 12 hours per night' } };
  }
  return { isValid: true, errors: {} };
}