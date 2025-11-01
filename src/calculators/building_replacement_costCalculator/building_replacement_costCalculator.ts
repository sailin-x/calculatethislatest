import { Calculator } from '../../types/calculator';

export const building_replacement_costCalculator: Calculator = {
  id: 'BuildingReplacementCost-calculator',
  title: 'Building Replacement Cost Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Building Replacement Cost',
  description: 'Calculate building replacement cost values.',
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
