import { Calculator } from '../../types/calculator';

export const economic_value_added_eva_calculator: Calculator = {
  id: 'EconomicValueAdded-EvaCalculatorCalculator',
  title: 'Economic Value Added Eva Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Economic Value Added Eva Calculator',
  description: 'Calculate economic value added eva calculator values.',
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
