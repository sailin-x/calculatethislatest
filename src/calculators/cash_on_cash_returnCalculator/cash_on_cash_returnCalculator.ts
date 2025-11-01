import { Calculator } from '../../types/calculator';

export const cash_on_cash_returnCalculator: Calculator = {
  id: 'CashOnCash-return-calculator',
  title: 'Cash On Cash Return Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Cash On Cash Return',
  description: 'Calculate cash on cash return values.',
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
