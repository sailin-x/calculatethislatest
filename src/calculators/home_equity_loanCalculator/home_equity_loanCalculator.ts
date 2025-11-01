import { Calculator } from '../../types/calculator';

export const home_equity_loanCalculator: Calculator = {
  id: 'HomeEquityLoan-calculator',
  title: 'Home Equity Loan Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Home Equity Loan',
  description: 'Calculate home equity loan values.',
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
