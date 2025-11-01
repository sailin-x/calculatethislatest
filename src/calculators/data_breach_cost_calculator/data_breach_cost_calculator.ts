import { Calculator } from '../../types/calculator';

export const data_breach_cost_calculator: Calculator = {
  id: 'DataBreachCost-calculator-calculator',
  title: 'Data Breach Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Data Breach Cost Calculator',
  description: 'Calculate data breach cost calculator values.',
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
