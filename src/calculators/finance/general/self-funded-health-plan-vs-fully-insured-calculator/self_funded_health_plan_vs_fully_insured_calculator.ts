import { Calculator } from '../../../../types/calculator';
import { self_funded_health_plan_vs_fully_insured_calculatorInputs, self_funded_health_plan_vs_fully_insured_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const self_funded_health_plan_vs_fully_insured_calculatorCalculator: Calculator = {
  id: 'self-funded-health-plan-vs-fully-insured-calculator',
  title: 'Self Funded Health Plan vs. Fully Insured Calculator Calculator',
  category: 'finance',
  subcategory: 'general',
  description: 'Calculate Self-Funded Health Plan vs. Fully-Insured Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Self-Funded Health Plan vs. Fully-Insured Calculator parameters',
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
      description: 'Basic Self-Funded Health Plan vs. Fully-Insured Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
