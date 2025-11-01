import { Calculator } from '../../types/calculator';

export const private_mortgage_insuranceCalculator: Calculator = {
  id: 'PrivateMortgageInsurance-calculator',
  title: 'Private Mortgage Insurance Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Private Mortgage Insurance',
  description: 'Calculate private mortgage insurance values.',
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
