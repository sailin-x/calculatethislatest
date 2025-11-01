import { Calculator } from '../../types/calculator';

export const hard_money_loanCalculator: Calculator = {
  id: 'HardMoneyLoan-calculator',
  title: 'Hard Money Loan Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Hard Money Loan',
  description: 'Calculate hard money loan values.',
  usageInstructions: [
    'Enter the required input values',
    'Review the calculated results'
  ],

  inputs: [
    {
      id: 'value',
      label: 'Value',
      type: 'number',
      required: true,
      min: 0
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result',
      type: 'number',
      explanation: 'Calculated result'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [
    {
      title: 'Example Calculation',
      description: 'Basic calculation example',
      inputs: {
        value: 100
      },
      expectedOutputs: {
        result: 100
      }
    }
  ]
};
