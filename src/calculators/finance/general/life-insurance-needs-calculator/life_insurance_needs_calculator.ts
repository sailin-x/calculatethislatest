import { Calculator } from '../../../../types/calculator';
import { life_insurance_needs_calculatorInputs, life_insurance_needs_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const LifeInsuranceNeeds-calculator: Calculator = {
  id: 'LifeInsuranceNeeds-calculator',
  title: 'Life Insurance Needs Calculator Calculator',
  category: 'finance',
  subcategory: 'general',
  description: 'Calculate Life Insurance Needs Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Life Insurance Needs Calculator parameters',
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
      description: 'Basic Life Insurance Needs Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
