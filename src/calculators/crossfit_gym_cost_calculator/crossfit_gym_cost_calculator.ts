import { Calculator } from '../../types/calculator';

export const crossfit_gym_cost_calculator: Calculator = {
  id: 'CrossfitGymCost-calculator-calculator',
  title: 'Crossfit Gym Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Crossfit Gym Cost Calculator',
  description: 'Calculate crossfit gym cost calculator values.',
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
