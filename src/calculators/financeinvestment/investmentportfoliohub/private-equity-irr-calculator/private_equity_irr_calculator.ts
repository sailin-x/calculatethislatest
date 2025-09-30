import { Calculator } from '../../../../types/calculator';
import { private_equity_irr_calculatorInputs, private_equity_irr_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const private_equity_irr_calculatorCalculator: Calculator = {
  id: 'private-equity-irr-calculator',
  title: 'Private Equity IRR Calculator Calculator',
  category: 'financeinvestment',
  subcategory: 'investmentportfoliohub',
  description: 'Calculate Private Equity IRR Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Private Equity IRR Calculator parameters',
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
      description: 'Basic Private Equity IRR Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
