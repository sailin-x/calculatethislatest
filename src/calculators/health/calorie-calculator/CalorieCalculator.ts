/**
 * Calorie Calculator
 * Comprehensive nutritional calculator for BMR, TDEE, and macronutrient planning
 */

import { Calculator, CalculatorInput, CalculatorOutput, Formula } from '../../../types/calculator';
import { calculateCalories } from './formulas';
import { calorieValidationRules } from './validation';

/**
 * Calorie calculator inputs
 */
const calorieInputs: CalculatorInput[] = [
  {
    id: 'weight',
    label: 'Current Weight (lbs)',
    type: 'number',
    required: true,
    min: 20,
    max: 500,
    step: 0.1,
    tooltip: 'Your current weight in pounds'
  },
  {
    id: 'heightFeet',
    label: 'Height (feet)',
    type: 'number',
    required: true,
    min: 2,
    max: 8,
    step: 1,
    tooltip: 'Your height in feet'
  },
  {
    id: 'heightInches',
    label: 'Height (inches)',
    type: 'number',
    required: true,
    min: 0,
    max: 11,
    step: 1,
    tooltip: 'Additional inches of your height'
  },
  {
    id: 'age',
    label: 'Age (years)',
    type: 'number',
    required: true,
    min: 10,
    max: 120,
    step: 1,
    tooltip: 'Your current age in years'
  },
  {
    id: 'gender',
    label: 'Gender',
    type: 'select',
    required: true,
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' }
    ],
    tooltip: 'Your biological gender'
  },
  {
    id: 'activityLevel',
    label: 'Activity Level',
    type: 'select',
    required: true,
    options: [
      { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
      { value: 'lightly_active', label: 'Lightly Active (light exercise 1-3 days/week)' },
      { value: 'moderately_active', label: 'Moderately Active (moderate exercise 3-5 days/week)' },
      { value: 'very_active', label: 'Very Active (hard exercise 6-7 days/week)' },
      { value: 'extremely_active', label: 'Extremely Active (very hard exercise & physical job)' }
    ],
    tooltip: 'Your typical daily activity level'
  },
  {
    id: 'goal',
    label: 'Weight Goal',
    type: 'select',
    required: true,
    options: [
      { value: 'maintain', label: 'Maintain Current Weight' },
      { value: 'lose', label: 'Lose Weight' },
      { value: 'gain', label: 'Gain Weight' }
    ],
    tooltip: 'Your weight management goal'
  },
  {
    id: 'weeklyChange',
    label: 'Weekly Weight Change (lbs)',
    type: 'number',
    required: false,
    min: 0.25,
    max: 2,
    step: 0.25,
    tooltip: 'How many pounds you want to lose/gain per week (0.5-1 lb is recommended)'
  },
  {
    id: 'bodyFatPercentage',
    label: 'Body Fat Percentage (optional)',
    type: 'number',
    required: false,
    min: 2,
    max: 50,
    step: 0.1,
    tooltip: 'Your current body fat percentage for more accurate calculations'
  },
  {
    id: 'proteinRatio',
    label: 'Protein Ratio (%)',
    type: 'number',
    required: false,
    min: 10,
    max: 50,
    step: 1,
    tooltip: 'Percentage of calories from protein (recommended: 10-35%)'
  },
  {
    id: 'carbRatio',
    label: 'Carb Ratio (%)',
    type: 'number',
    required: false,
    min: 20,
    max: 70,
    step: 1,
    tooltip: 'Percentage of calories from carbohydrates (recommended: 45-65%)'
  },
  {
    id: 'fatRatio',
    label: 'Fat Ratio (%)',
    type: 'number',
    required: false,
    min: 15,
    max: 40,
    step: 1,
    tooltip: 'Percentage of calories from fat (recommended: 20-35%)'
  }
];

/**
 * Calorie calculator outputs
 */
const calorieOutputs: CalculatorOutput[] = [
  {
    id: 'bmr',
    label: 'Basal Metabolic Rate (BMR)',
    type: 'number',
    format: 'calories',
    explanation: 'Calories your body burns at rest'
  },
  {
    id: 'tdee',
    label: 'Total Daily Energy Expenditure (TDEE)',
    type: 'number',
    format: 'calories',
    explanation: 'Total calories you burn in a day including activity'
  },
  {
    id: 'maintenanceCalories',
    label: 'Maintenance Calories',
    type: 'number',
    format: 'calories',
    explanation: 'Calories needed to maintain current weight'
  },
  {
    id: 'targetCalories',
    label: 'Target Daily Calories',
    type: 'number',
    format: 'calories',
    explanation: 'Calories needed to achieve your weight goal'
  },
  {
    id: 'calorieDeficit',
    label: 'Daily Calorie Deficit/Surplus',
    type: 'number',
    format: 'calories',
    explanation: 'Difference from maintenance calories'
  },
  {
    id: 'proteinGrams',
    label: 'Daily Protein',
    type: 'number',
    format: 'grams',
    explanation: 'Recommended daily protein intake'
  },
  {
    id: 'carbGrams',
    label: 'Daily Carbohydrates',
    type: 'number',
    format: 'grams',
    explanation: 'Recommended daily carbohydrate intake'
  },
  {
    id: 'fatGrams',
    label: 'Daily Fat',
    type: 'number',
    format: 'grams',
    explanation: 'Recommended daily fat intake'
  },
  {
    id: 'estimatedTime',
    label: 'Estimated Time to Goal',
    type: 'text',
    explanation: 'Time required to reach your target weight'
  },
  {
    id: 'bmi',
    label: 'Body Mass Index (BMI)',
    type: 'number',
    explanation: 'Your current BMI category'
  }
];

/**
 * Calorie calculator formulas
 */
const calorieFormulas: Formula[] = [
  {
    id: 'bmr_calculation',
    name: 'BMR Calculation',
    description: 'Calculate Basal Metabolic Rate using Mifflin-St Jeor equation',
    calculate: (inputs: Record<string, any>) => {
      const result = calculateCalories(inputs);
      return {
        outputs: {
          bmr: result.bmr,
          tdee: result.tdee,
          maintenanceCalories: result.maintenanceCalories,
          targetCalories: result.targetCalories,
          calorieDeficit: result.calorieDeficit,
          proteinGrams: result.proteinGrams,
          carbGrams: result.carbGrams,
          fatGrams: result.fatGrams,
          estimatedTime: result.estimatedTime,
          bmi: result.bmi
        },
        explanation: 'BMR calculated using Mifflin-St Jeor equation, TDEE includes activity multiplier'
      };
    }
  }
];

/**
 * Calorie calculator examples
 */
const calorieExamples = [
  {
    title: 'Weight Loss Example',
    description: '30-year-old male, 6ft 2in, 220 lbs, moderately active, wants to lose 1 lb/week',
    inputs: {
      weight: 220,
      heightFeet: 6,
      heightInches: 2,
      age: 30,
      gender: 'male',
      activityLevel: 'moderately_active',
      goal: 'lose',
      weeklyChange: 1,
      proteinRatio: 30,
      carbRatio: 40,
      fatRatio: 30
    },
    expectedOutputs: {
      bmr: 2200,
      tdee: 2900,
      maintenanceCalories: 2900,
      targetCalories: 2400,
      calorieDeficit: -500,
      proteinGrams: 180,
      carbGrams: 240,
      fatGrams: 80,
      estimatedTime: '44 weeks (approximately 11 months)',
      bmi: 28.2
    }
  },
  {
    title: 'Weight Gain Example',
    description: '25-year-old female, 5ft 4in, 120 lbs, lightly active, wants to gain 0.5 lb/week',
    inputs: {
      weight: 120,
      heightFeet: 5,
      heightInches: 4,
      age: 25,
      gender: 'female',
      activityLevel: 'lightly_active',
      goal: 'gain',
      weeklyChange: 0.5,
      proteinRatio: 25,
      carbRatio: 50,
      fatRatio: 25
    },
    expectedOutputs: {
      bmr: 1300,
      tdee: 1700,
      maintenanceCalories: 1700,
      targetCalories: 1950,
      calorieDeficit: 250,
      proteinGrams: 122,
      carbGrams: 244,
      fatGrams: 65,
      estimatedTime: '40 weeks (approximately 10 months)',
      bmi: 20.6
    }
  },
  {
    title: 'Maintenance Example',
    description: '35-year-old male, 5ft 10in, 170 lbs, very active, wants to maintain weight',
    inputs: {
      weight: 170,
      heightFeet: 5,
      heightInches: 10,
      age: 35,
      gender: 'male',
      activityLevel: 'very_active',
      goal: 'maintain',
      proteinRatio: 30,
      carbRatio: 45,
      fatRatio: 25
    },
    expectedOutputs: {
      bmr: 1700,
      tdee: 2600,
      maintenanceCalories: 2600,
      targetCalories: 2600,
      calorieDeficit: 0,
      proteinGrams: 195,
      carbGrams: 325,
      fatGrams: 72,
      estimatedTime: 'N/A (maintenance goal)',
      bmi: 24.4
    }
  }
];

/**
 * Main calorie calculator definition
 */
export const calorieCalculator: Calculator = {
  id: 'calorie-calculator',
  title: 'Calorie Calculator',
  category: 'health',
  description: 'Calculate your daily calorie needs, BMR, TDEE, and macronutrient requirements for weight management goals',
  usageInstructions: [
    'Enter your current weight, height, age, and gender',
    'Select your activity level that best describes your lifestyle',
    'Choose your weight goal (maintain, lose, or gain)',
    'If losing or gaining weight, specify your weekly target',
    'Optionally set macronutrient ratios for personalized meal planning',
    'Review your BMR, TDEE, and daily calorie recommendations'
  ],
  inputs: calorieInputs,
  outputs: calorieOutputs,
  formulas: calorieFormulas,
  validationRules: calorieValidationRules,
  examples: calorieExamples
};