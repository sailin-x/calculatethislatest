import { Calculator } from '../../../types/calculator';
import { bmrTdeeCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const bmrCalculator: Calculator = {
  id: 'bmr-tdee-calculator',
  title: 'BMR & TDEE Calculator',
  category: 'health',
  subcategory: 'Fitness & Exercise',
  description: 'Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure using multiple validated medical formulas including Harris-Benedict, Mifflin-St Jeor, and Katch-McArdle.',
  
  usageInstructions: [
    'Enter your age, gender, weight, and height accurately',
    'Select your typical activity level throughout the week',
    'Choose your fitness goal (maintain, lose, or gain weight)',
    'Add body fat percentage if known for more accurate results',
    'Review your BMR, TDEE, and personalized calorie recommendations'
  ],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Your current age in years',
      defaultValue: 30,
      min: 10,
      max: 120
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
      tooltip: 'Biological gender affects metabolic calculations',
      defaultValue: 'male'
    },
    {
      id: 'weight',
      label: 'Weight',
      type: 'number',
      required: true,
      placeholder: '170',
      tooltip: 'Your current body weight',
      defaultValue: 170
    },
    {
      id: 'weightUnit',
      label: 'Weight Unit',
      type: 'select',
      required: true,
      options: [
        { value: 'lbs', label: 'Pounds (lbs)' },
        { value: 'kg', label: 'Kilograms (kg)' }
      ],
      defaultValue: 'lbs'
    },
    {
      id: 'height',
      label: 'Height',
      type: 'number',
      required: true,
      placeholder: '70',
      tooltip: 'Your height',
      defaultValue: 70
    },
    {
      id: 'heightUnit',
      label: 'Height Unit',
      type: 'select',
      required: true,
      options: [
        { value: 'inches', label: 'Inches' },
        { value: 'cm', label: 'Centimeters' }
      ],
      defaultValue: 'inches'
    },
    {
      id: 'activityLevel',
      label: 'Activity Level',
      type: 'select',
      required: true,
      options: [
        { value: 'sedentary', label: 'Sedentary (desk job, no exercise)' },
        { value: 'light', label: 'Light (light exercise 1-3 days/week)' },
        { value: 'moderate', label: 'Moderate (moderate exercise 3-5 days/week)' },
        { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
        { value: 'very-active', label: 'Very Active (very hard exercise, physical job)' }
      ],
      tooltip: 'Your typical weekly activity level',
      defaultValue: 'moderate'
    },
    {
      id: 'bodyFatPercentage',
      label: 'Body Fat Percentage - Optional',
      type: 'percentage',
      required: false,
      placeholder: '15',
      tooltip: 'If known, enables more accurate Katch-McArdle calculation'
    },
    {
      id: 'goal',
      label: 'Fitness Goal',
      type: 'select',
      required: true,
      options: [
        { value: 'maintain', label: 'Maintain Current Weight' },
        { value: 'lose', label: 'Lose Weight' },
        { value: 'gain', label: 'Gain Weight' }
      ],
      tooltip: 'Your primary fitness objective',
      defaultValue: 'maintain'
    },
    {
      id: 'targetWeightLoss',
      label: 'Target Weight Loss (lbs/week) - Optional',
      type: 'number',
      required: false,
      placeholder: '1',
      tooltip: 'Desired weight loss rate (1-2 lbs/week recommended)',
      step: 0.5,
      min: 0.5,
      max: 3
    }
  ],

  outputs: [
    {
      id: 'recommendedBMR',
      label: 'Basal Metabolic Rate (BMR)',
      type: 'number',
      explanation: 'Calories your body burns at rest (Mifflin-St Jeor formula)'
    },
    {
      id: 'tdee',
      label: 'Total Daily Energy Expenditure',
      type: 'number',
      explanation: 'Total calories burned per day including activity'
    },
    {
      id: 'calorieGoal',
      label: 'Daily Calorie Goal',
      type: 'number',
      explanation: 'Recommended daily calories based on your goal'
    },
    {
      id: 'harrisBenedictBMR',
      label: 'Harris-Benedict BMR',
      type: 'number',
      explanation: 'BMR using the Harris-Benedict equation'
    },
    {
      id: 'mifflinStJeorBMR',
      label: 'Mifflin-St Jeor BMR',
      type: 'number',
      explanation: 'BMR using the more accurate Mifflin-St Jeor equation'
    },
    {
      id: 'katchMcArdleBMR',
      label: 'Katch-McArdle BMR',
      type: 'number',
      explanation: 'BMR using body fat percentage (if provided)'
    }
  ],

  formulas: [bmrTdeeCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('age', 'Age is required'),
    ValidationRuleFactory.required('gender', 'Gender is required'),
    ValidationRuleFactory.required('weight', 'Weight is required'),
    ValidationRuleFactory.required('height', 'Height is required'),
    ValidationRuleFactory.required('activityLevel', 'Activity level is required'),
    ValidationRuleFactory.required('goal', 'Fitness goal is required'),
    
    ValidationRuleFactory.range('age', 10, 120, 'Age must be between 10 and 120'),
    ValidationRuleFactory.positive('weight', 'Weight must be positive'),
    ValidationRuleFactory.positive('height', 'Height must be positive'),
    
    ValidationRuleFactory.businessRule(
      'bodyFatPercentage',
      (bodyFat, allInputs) => {
        if (!bodyFat) return true;
        const gender = allInputs?.gender;
        if (gender === 'male') return bodyFat >= 3 && bodyFat <= 35;
        if (gender === 'female') return bodyFat >= 10 && bodyFat <= 45;
        return bodyFat >= 3 && bodyFat <= 45;
      },
      'Body fat percentage is outside normal range for your gender'
    )
  ],

  examples: [
    {
      title: 'Active Male Weight Loss',
      description: '30-year-old active male looking to lose 1 lb per week',
      inputs: {
        age: 30,
        gender: 'male',
        weight: 180,
        weightUnit: 'lbs',
        height: 72,
        heightUnit: 'inches',
        activityLevel: 'active',
        goal: 'lose',
        targetWeightLoss: 1
      },
      expectedOutputs: {
        recommendedBMR: 1850,
        tdee: 2870,
        calorieGoal: 2370
      }
    },
    {
      title: 'Sedentary Female Maintenance',
      description: '25-year-old sedentary female maintaining current weight',
      inputs: {
        age: 25,
        gender: 'female',
        weight: 140,
        weightUnit: 'lbs',
        height: 65,
        heightUnit: 'inches',
        activityLevel: 'sedentary',
        goal: 'maintain'
      },
      expectedOutputs: {
        recommendedBMR: 1400,
        tdee: 1680,
        calorieGoal: 1680
      }
    }
  ]
};