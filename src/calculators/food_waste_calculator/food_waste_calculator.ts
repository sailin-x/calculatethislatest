import { Calculator } from '../../types/calculator';

export const food_waste_calculator: Calculator = {
  id: 'FoodWasteCalculator-calculator',
  title: 'Food Waste Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Food Waste Calculator',
  description: 'Calculate food waste calculator values.',
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
