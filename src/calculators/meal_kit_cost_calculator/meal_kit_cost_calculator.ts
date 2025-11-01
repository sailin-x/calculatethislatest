import { Calculator } from '../../types/calculator';

export const meal_kit_cost_calculator: Calculator = {
  id: 'MealKitCost-calculator-calculator',
  title: 'Meal Kit Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Meal Kit Cost Calculator',
  description: 'Calculate meal kit cost calculator values.',
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
