import { Calculator } from '../../types/calculator';

export const average_order_value_calculator: Calculator = {
  id: 'AverageOrderValue-calculator-calculator',
  title: 'Average Order Value Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Average Order Value Calculator',
  description: 'Calculate average order value calculator values.',
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
