import { Calculator } from '../../types/calculator';

export const private_equity_returns_calculator: Calculator = {
  id: 'PrivateEquityReturns-calculator-calculator',
  title: 'Private Equity Returns Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Private Equity Returns Calculator',
  description: 'Calculate private equity returns calculator values.',
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
