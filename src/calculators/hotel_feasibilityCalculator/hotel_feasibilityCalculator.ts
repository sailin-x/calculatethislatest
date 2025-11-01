import { Calculator } from '../../types/calculator';

export const hotel_feasibilityCalculator: Calculator = {
  id: 'HotelFeasibilityCalculator',
  title: 'Hotel Feasibility Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Hotel Feasibility',
  description: 'Calculate hotel feasibility values.',
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
