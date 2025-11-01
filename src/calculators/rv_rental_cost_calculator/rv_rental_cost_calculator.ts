import { Calculator } from '../../types/calculator';

export const rv_rental_cost_calculator: Calculator = {
  id: 'RvRentalCost-calculator-calculator',
  title: 'Rv Rental Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Rv Rental Cost Calculator',
  description: 'Calculate rv rental cost calculator values.',
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
