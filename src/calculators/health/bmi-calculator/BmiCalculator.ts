import { Calculator } from '../../types/calculator';
import { BmiCalculatorInputs, BmiCalculatorOutputs } from './types';
import { calculateBmiCalculatorResults } from './formulas';
import { validateBmiCalculatorInputs } from './validation';
import { validateWeight, validateHeight } from './quickValidation';

export const BmiCalculator: Calculator = {
  id: 'bmi-calculator',
  title: 'BMI Calculator',
  category: 'health',
  subcategory: 'Fitness',
  description: 'Calculate Body Mass Index (BMI) to assess weight status',
  usageInstructions: [
    'Enter your weight in kilograms',
    'Enter your height in centimeters',
    'Review your BMI category and healthy weight range'
  ],

  inputs: [
    {
      id: 'weight',
      label: 'Weight (kg)',
      type: 'number',
      required: true,
      min: 1,
      max: 500,
      step: 0.1,
      tooltip: 'Your current weight in kilograms'
    },
    {
      id: 'height',
      label: 'Height (cm)',
      type: 'number',
      required: true,
      min: 50,
      max: 250,
      step: 0.1,
      tooltip: 'Your height in centimeters'
    }
  ],

  outputs: [
    {
      id: 'bmi',
      label: 'BMI',
      type: 'number',
      format: '0.1',
      explanation: 'Your Body Mass Index value'
    },
    {
      id: 'category',
      label: 'Category',
      type: 'text',
      explanation: 'BMI classification category'
    },
    {
      id: 'healthyRange',
      label: 'Healthy Weight Range',
      type: 'text',
      explanation: 'Recommended weight range for your height'
    }
  ],

  formulas: [
    {
      id: 'bmi-calculation',
      name: 'BMI Calculation',
      description: 'Calculate BMI using weight and height',
      calculate: (inputs: Record<string, any>) => {
        const results = calculateBmiCalculatorResults(inputs as BmiCalculatorInputs);
        return {
          outputs: {
            bmi: results.bmi,
            category: results.category,
            healthyRange: results.healthyRange
          },
          explanation: results.explanation
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'weight',
      type: 'required',
      message: 'Weight is required',
      validator: (value) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'height',
      type: 'required',
      message: 'Height is required',
      validator: (value) => value !== undefined && value !== null && value > 0
    },
    {
      field: 'weight',
      type: 'range',
      message: 'Weight must be between 1 and 500 kg',
      validator: (value) => value >= 1 && value <= 500
    },
    {
      field: 'height',
      type: 'range',
      message: 'Height must be between 50 and 250 cm',
      validator: (value) => value >= 50 && value <= 250
    }
  ],

  examples: [
    {
      title: 'Normal BMI',
      description: 'Calculate BMI for a person with normal weight',
      inputs: {
        weight: 70,
        height: 175
      },
      expectedOutputs: {
        bmi: 22.9,
        category: 'Normal weight',
        healthyRange: '59.6 - 80.6 kg (for 175cm height)'
      }
    },
    {
      title: 'Overweight BMI',
      description: 'Calculate BMI for a person who is overweight',
      inputs: {
        weight: 85,
        height: 170
      },
      expectedOutputs: {
        bmi: 29.4,
        category: 'Overweight',
        healthyRange: '52.2 - 70.6 kg (for 170cm height)'
      }
    }
  ]
};
