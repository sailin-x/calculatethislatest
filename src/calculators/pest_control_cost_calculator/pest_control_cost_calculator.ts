import { Calculator } from '../../types/calculator';

export const pest_control_cost_calculator: Calculator = {
  id: 'PestControlCost-calculator-calculator',
  title: 'Pest Control Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Pest Control Cost Calculator',
  description: 'Calculate pest control cost calculator values.',
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
