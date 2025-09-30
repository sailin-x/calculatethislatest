import { Calculator } from '../../../../types/calculator';
import { return_on_ad_spend_roas_calculatorInputs, return_on_ad_spend_roas_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const return_on_ad_spend_roas_calculatorCalculator: Calculator = {
  id: 'return-on-ad-spend-roas-calculator',
  title: 'Return on Ad Spend (ROAS) Calculator Calculator',
  category: 'finance',
  subcategory: 'general',
  description: 'Calculate Return on Ad Spend (ROAS) Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Return on Ad Spend (ROAS) Calculator parameters',
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
      description: 'Basic Return on Ad Spend (ROAS) Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
