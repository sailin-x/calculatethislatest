import { Calculator } from '../../types/calculator';

export const cost_of_poor_quality_calculator: Calculator = {
  id: 'CostOfPoor-QualityCalculatorCalculator',
  title: 'Cost Of Poor Quality Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Cost Of Poor Quality Calculator',
  description: 'Calculate cost of poor quality calculator values.',
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
