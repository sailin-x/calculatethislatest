import { Calculator } from '../../../../types/calculator';
import { restricted_stock_unit_rsu_vs_stock_option_calculatorInputs, restricted_stock_unit_rsu_vs_stock_option_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const restricted_stock_unit_rsu_vs_stock_option_calculatorCalculator: Calculator = {
  id: 'restricted-stock-unit-rsu-vs-stock-option-calculator',
  title: 'Restricted Stock Unit (RSU) vs. Stock Option Calculator Calculator',
  category: 'businessmarketingoperations',
  subcategory: 'businessoperationsfinancehub',
  description: 'Calculate Restricted Stock Unit (RSU) vs. Stock Option Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Restricted Stock Unit (RSU) vs. Stock Option Calculator parameters',
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
      description: 'Basic Restricted Stock Unit (RSU) vs. Stock Option Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
