import { Calculator } from '../../../../types/calculator';
import { debt_snowball_calculatorInputs, debt_snowball_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const debt_snowball_calculatorCalculator: Calculator = {
  id: 'debt-snowball-calculator',
  title: 'Debt Snowball Calculator Calculator',
  category: 'financeinvestment',
  subcategory: 'loansdebthub',
  description: 'Calculate Debt Snowball Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Debt Snowball Calculator parameters',
    'Review calculation results',
    'Consider professional consultation for large amounts'
  ],

  inputs: [
    {
      id: 'amount',
      label: 'Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Primary amount for calculation'
    },
    {
      id: 'rate',
      label: 'Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 5,
      tooltip: 'Applicable rate percentage'
    },
    {
      id: 'time',
      label: 'Time Period',
      type: 'number',
      required: false,
      min: 1,
      max: 100,
      defaultValue: 1,
      tooltip: 'Time period for calculation'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result ($)',
      type: 'currency',
      explanation: 'Calculated result based on inputs'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [
    {
      title: 'Standard Calculation',
      description: 'Basic Debt Snowball Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
