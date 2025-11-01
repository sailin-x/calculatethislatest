import { Calculator } from '../../types/calculator';
import { BmiCalculatorInputs, BmiCalculatorOutputs } from './types';
import {
  // Import calculation functions from formulas.ts
  calculateResult,
  calculateSecondaryResult,
  // Add other formula imports as needed
} from './formulas';
import { validateBmiCalculatorInputs, validateBmiCalculatorBusinessRules } from './validation';

export const BmiCalculator: Calculator = {
  id: 'BmiCalculatorCalculator',
  title: 'BMI Calculator Calculator',
  health: 'health', // e.g., 'finance', 'math', 'health', 'business'
  subhealth: 'Subhealth Name',
  description: 'Brief description of what this calculator does and its purpose.',
  usageInstructions: [
    'Step 1: Enter the primary input values',
    'Step 2: Configure any optional parameters',
    'Step 3: Review the calculated results',
    'Step 4: Adjust inputs as needed for different scenarios'
  ],

  inputs: [
    {
        "id": "weightKg",
        "label": "Weight (kg)",
        "type": "number",
        "required": true,
        "min": 20,
        "max": 500,
        "tooltip": "Body weight in kilograms"
    },
    {
        "id": "heightCm",
        "label": "Height (cm)",
        "type": "number",
        "required": true,
        "min": 50,
        "max": 300,
        "tooltip": "Height in centimeters"
    }
],

  outputs: [
    {
        "id": "bmi",
        "label": "BMI",
        "type": "number",
        "explanation": "Body Mass Index value"
    },
    {
        "id": "category",
        "label": "BMI Category",
        "type": "text",
        "explanation": "BMI classification category"
    }
],

  formulas: [], // Formulas are implemented in formulas.ts

  validationRules: [], // Validation rules are implemented in validation.ts

  examples: [
    {
        "title": "Average Adult",
        "description": "BMI calculation for average adult",
        "inputs": {
            "weightKg": 70,
            "heightCm": 175
        },
        "expectedOutputs": {
            "bmi": 22.86,
            "category": "Normal weight"
        }
    }
]
};