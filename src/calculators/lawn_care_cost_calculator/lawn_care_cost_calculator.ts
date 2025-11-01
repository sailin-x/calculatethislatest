import { Calculator } from '../../types/calculator';

export const lawn_care_cost_calculator: Calculator = {
  id: 'LawnCareCost-calculator-calculator',
  title: 'Lawn Care Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Lawn Care Cost Calculator',
  description: 'Calculate lawn care cost calculator values.',
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
