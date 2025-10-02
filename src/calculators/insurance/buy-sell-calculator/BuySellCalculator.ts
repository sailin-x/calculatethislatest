import { Calculator } from '../../types/calculator';
import { BuySellCalculatorInputs, BuySellCalculatorOutputs } from './types';
import { calculateResult, generateCalculation, generateAnalysis } from './formulas';
import { validateBuySellCalculatorInputs } from './validation';

export const BuySellCalculator: Calculator = {
  id: 'buy-sell-calculator',
  title: 'Buy Sell Calculator',
  category: 'insurance',
  subcategory: 'General',
  description: 'Calculate buy-sell agreement insurance',
  usageInstructions: [
    'Enter input value',
    'Specify multiplier',
    'Review calculation result'
  ],

  inputs: [
    {
      id: 'inputValue',
      label: 'Input Value',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Value to be calculated'
    },
    {
      id: 'multiplier',
      label: 'Multiplier',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Multiplication factor'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result',
      type: 'number',
      explanation: 'Calculation result'
    },
    {
      id: 'calculation',
      label: 'Calculation',
      type: 'text',
      explanation: 'Calculation breakdown'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Basic Multiplication',
      description: 'Multiply 10 by 5',
      inputs: {
        inputValue: 10,
        multiplier: 5
      },
      expectedOutputs: {
        result: 50,
        calculation: '10 × 5 = 50'
      }
    },
    {
      title: 'Zero Multiplication',
      description: 'Multiply any number by zero',
      inputs: {
        inputValue: 100,
        multiplier: 0
      },
      expectedOutputs: {
        result: 0,
        calculation: '100 × 0 = 0'
      }
    }
  ]
};
