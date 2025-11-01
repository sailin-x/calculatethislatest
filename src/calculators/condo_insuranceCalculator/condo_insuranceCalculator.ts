import { Calculator } from '../../types/calculator';

export const condo_insuranceCalculator: Calculator = {
  id: 'CondoInsuranceCalculator',
  title: 'Condo Insurance Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Condo Insurance',
  description: 'Calculate condo insurance values.',
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
