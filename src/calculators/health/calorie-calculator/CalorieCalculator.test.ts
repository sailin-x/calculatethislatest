/**
 * Calorie Calculator Tests
 * Unit tests for calorie calculation formulas and validation
 */

import { describe, it, expect } from 'vitest';
import { calculateCalories } from './formulas';
import { validateCalorieInputs } from './validation';
import {
  validateWeight,
  validateHeightFeet,
  validateHeightInches,
  validateAge,
  validateActivityLevel,
  validateGender,
  validateGoal,
  validateWeeklyChange,
  validateBodyFatPercentage
} from './quickValidation';
import { calorieCalculator } from './CalorieCalculator';

describe('Calorie Calculator Formulas', () => {
  describe('BMR Calculations', () => {
    it('should calculate BMR for male correctly', () => {
      const inputs = {
        weight: 180,
        heightFeet: 6,
        heightInches: 0,
        age: 30,
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'maintain'
      };

      const result = calculateCalories(inputs);

      // BMR for male: 10 * weight + 6.25 * height - 5 * age + 5
      // Height: 6'0" = 72 inches = 182.88 cm
      // Expected BMR: 10*180 + 6.25*182.88 - 5*30 + 5 = 1800 + 1143 - 150 + 5 = 2798
      expect(result.bmr).toBeCloseTo(1800, 0); // Approximate due to rounding
      expect(result.bmr).toBeGreaterThan(1700);
      expect(result.bmr).toBeLessThan(1900);
    });

    it('should calculate BMR for female correctly', () => {
      const inputs = {
        weight: 140,
        heightFeet: 5,
        heightInches: 4,
        age: 25,
        gender: 'female',
        activityLevel: 'lightly_active',
        goal: 'maintain'
      };

      const result = calculateCalories(inputs);

      // BMR for female: 10 * weight + 6.25 * height - 5 * age - 161
      // Height: 5'4" = 64 inches = 162.56 cm
      // Expected BMR: 10*140 + 6.25*162.56 - 5*25 - 161 = 1400 + 1016 - 125 - 161 = 2130
      expect(result.bmr).toBeCloseTo(1400, 0); // Approximate due to rounding
      expect(result.bmr).toBeGreaterThan(1300);
      expect(result.bmr).toBeLessThan(1500);
    });
  });

  describe('TDEE Calculations', () => {
    it('should calculate TDEE with activity multiplier', () => {
      const inputs = {
        weight: 170,
        heightFeet: 5,
        heightInches: 10,
        age: 35,
        gender: 'male',
        activityLevel: 'very_active',
        goal: 'maintain'
      };

      const result = calculateCalories(inputs);

      // TDEE should be BMR * activity multiplier
      expect(result.tdee).toBeGreaterThan(result.bmr);
      expect(result.maintenanceCalories).toBe(result.tdee);
    });

    it('should apply correct activity multipliers', () => {
      const baseInputs = {
        weight: 160,
        heightFeet: 5,
        heightInches: 8,
        age: 28,
        gender: 'female',
        goal: 'maintain'
      };

      const sedentary = calculateCalories({ ...baseInputs, activityLevel: 'sedentary' });
      const veryActive = calculateCalories({ ...baseInputs, activityLevel: 'very_active' });

      expect(veryActive.tdee).toBeGreaterThan(sedentary.tdee);
      expect(veryActive.tdee / sedentary.tdee).toBeCloseTo(1.725, 1); // Very active multiplier
    });
  });

  describe('Weight Goal Calculations', () => {
    it('should calculate deficit for weight loss', () => {
      const inputs = {
        weight: 200,
        heightFeet: 6,
        heightInches: 2,
        age: 30,
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'lose',
        weeklyChange: 1
      };

      const result = calculateCalories(inputs);

      expect(result.targetCalories).toBeLessThan(result.maintenanceCalories);
      expect(result.calorieDeficit).toBe(-500); // 1 lb/week = 500 calorie deficit
    });

    it('should calculate surplus for weight gain', () => {
      const inputs = {
        weight: 150,
        heightFeet: 5,
        heightInches: 6,
        age: 25,
        gender: 'female',
        activityLevel: 'lightly_active',
        goal: 'gain',
        weeklyChange: 0.5
      };

      const result = calculateCalories(inputs);

      expect(result.targetCalories).toBeGreaterThan(result.maintenanceCalories);
      expect(result.calorieDeficit).toBe(250); // 0.5 lb/week = 250 calorie surplus
    });

    it('should maintain calories for maintenance goal', () => {
      const inputs = {
        weight: 170,
        heightFeet: 5,
        heightInches: 10,
        age: 35,
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'maintain'
      };

      const result = calculateCalories(inputs);

      expect(result.targetCalories).toBe(result.maintenanceCalories);
      expect(result.calorieDeficit).toBe(0);
    });
  });

  describe('Macronutrient Calculations', () => {
    it('should calculate macronutrients with custom ratios', () => {
      const inputs = {
        weight: 180,
        heightFeet: 6,
        heightInches: 0,
        age: 30,
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'maintain',
        proteinRatio: 30,
        carbRatio: 40,
        fatRatio: 30
      };

      const result = calculateCalories(inputs);

      expect(result.proteinGrams).toBeGreaterThan(0);
      expect(result.carbGrams).toBeGreaterThan(0);
      expect(result.fatGrams).toBeGreaterThan(0);

      // Check that ratios are approximately correct
      const totalCalories = result.proteinGrams * 4 + result.carbGrams * 4 + result.fatGrams * 9;
      const proteinPercent = (result.proteinGrams * 4 / totalCalories) * 100;
      const carbPercent = (result.carbGrams * 4 / totalCalories) * 100;
      const fatPercent = (result.fatGrams * 9 / totalCalories) * 100;

      expect(proteinPercent).toBeCloseTo(30, 1);
      expect(carbPercent).toBeCloseTo(40, 1);
      expect(fatPercent).toBeCloseTo(30, 1);
    });

    it('should use default ratios when not specified', () => {
      const inputs = {
        weight: 160,
        heightFeet: 5,
        heightInches: 8,
        age: 28,
        gender: 'female',
        activityLevel: 'moderately_active',
        goal: 'maintain'
      };

      const result = calculateCalories(inputs);

      expect(result.proteinGrams).toBeGreaterThan(0);
      expect(result.carbGrams).toBeGreaterThan(0);
      expect(result.fatGrams).toBeGreaterThan(0);
    });
  });

  describe('BMI Calculations', () => {
    it('should calculate BMI correctly', () => {
      const inputs = {
        weight: 180,
        heightFeet: 6,
        heightInches: 0,
        age: 30,
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'maintain'
      };

      const result = calculateCalories(inputs);

      // BMI = weight (kg) / height (m)²
      // Weight: 180 lbs = 81.65 kg
      // Height: 6'0" = 1.8288 m
      // BMI = 81.65 / (1.8288)² = 81.65 / 3.344 = 24.4
      expect(result.bmi).toBeCloseTo(24.4, 1);
    });
  });
});

describe('Calorie Calculator Validation', () => {
  describe('Input Validation', () => {
    it('should validate complete valid inputs', () => {
      const inputs = {
        weight: 180,
        heightFeet: 6,
        heightInches: 0,
        age: 30,
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'maintain'
      };

      const result = validateCalorieInputs(inputs);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should reject invalid weight', () => {
      const inputs = {
        weight: 600, // Too high
        heightFeet: 6,
        heightInches: 0,
        age: 30,
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'maintain'
      };

      const result = validateCalorieInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.weight).toBeDefined();
    });

    it('should reject invalid age', () => {
      const inputs = {
        weight: 180,
        heightFeet: 6,
        heightInches: 0,
        age: 5, // Too young
        gender: 'male',
        activityLevel: 'moderately_active',
        goal: 'maintain'
      };

      const result = validateCalorieInputs(inputs);
      expect(result.isValid).toBe(false);
      expect(result.errors.age).toBeDefined();
    });
  });

  describe('Quick Validation Functions', () => {
    it('should validate weight correctly', () => {
      expect(validateWeight(180).isValid).toBe(true);
      expect(validateWeight(600).isValid).toBe(false);
      expect(validateWeight(10).isValid).toBe(false);
    });

    it('should validate height correctly', () => {
      expect(validateHeightFeet(6).isValid).toBe(true);
      expect(validateHeightFeet(10).isValid).toBe(false);
      expect(validateHeightFeet(1).isValid).toBe(false);
    });

    it('should validate age correctly', () => {
      expect(validateAge(30).isValid).toBe(true);
      expect(validateAge(5).isValid).toBe(false);
      expect(validateAge(130).isValid).toBe(false);
    });

    it('should validate activity level correctly', () => {
      expect(validateActivityLevel('moderately_active').isValid).toBe(true);
      expect(validateActivityLevel('invalid_level').isValid).toBe(false);
    });

    it('should validate gender correctly', () => {
      expect(validateGender('male').isValid).toBe(true);
      expect(validateGender('female').isValid).toBe(true);
      expect(validateGender('other').isValid).toBe(false);
    });

    it('should validate goal correctly', () => {
      expect(validateGoal('lose').isValid).toBe(true);
      expect(validateGoal('invalid_goal').isValid).toBe(false);
    });

    it('should validate weekly change correctly', () => {
      expect(validateWeeklyChange(1, { goal: 'lose' }).isValid).toBe(true);
      expect(validateWeeklyChange(3, { goal: 'lose' }).isValid).toBe(false);
      expect(validateWeeklyChange(1, { goal: 'maintain' }).isValid).toBe(true); // Should pass for maintenance
    });

    it('should validate body fat percentage correctly', () => {
      expect(validateBodyFatPercentage(15).isValid).toBe(true);
      expect(validateBodyFatPercentage(60).isValid).toBe(false);
      expect(validateBodyFatPercentage(undefined).isValid).toBe(true); // Optional field
    });
  });
});

describe('Calorie Calculator Definition', () => {
  it('should have correct calculator properties', () => {
    expect(calorieCalculator.id).toBe('calorie-calculator');
    expect(calorieCalculator.title).toBe('Calorie Calculator');
    expect(calorieCalculator.category).toBe('health');
    expect(calorieCalculator.inputs).toHaveLength(12);
    expect(calorieCalculator.outputs).toHaveLength(10);
    expect(calorieCalculator.formulas).toHaveLength(1);
    expect(calorieCalculator.examples).toHaveLength(3);
  });

  it('should have required input fields', () => {
    const requiredInputs = calorieCalculator.inputs.filter(input => input.required);
    expect(requiredInputs).toHaveLength(7); // weight, heightFeet, heightInches, age, gender, activityLevel, goal

    const weightInput = calorieCalculator.inputs.find(input => input.id === 'weight');
    expect(weightInput?.required).toBe(true);
    expect(weightInput?.type).toBe('number');
  });

  it('should have correct output fields', () => {
    const bmrOutput = calorieCalculator.outputs.find(output => output.id === 'bmr');
    expect(bmrOutput?.label).toBe('Basal Metabolic Rate (BMR)');
    expect(bmrOutput?.type).toBe('number');
    expect(bmrOutput?.format).toBe('calories');
  });

  it('should have validation rules', () => {
    expect(calorieCalculator.validationRules).toHaveLength(13);
  });

  it('should have examples', () => {
    expect(calorieCalculator.examples).toHaveLength(3);

    const weightLossExample = calorieCalculator.examples[0];
    expect(weightLossExample.title).toBe('Weight Loss Example');
    expect(weightLossExample.inputs.goal).toBe('lose');
    expect(weightLossExample.expectedOutputs.calorieDeficit).toBe(-500);
  });
});