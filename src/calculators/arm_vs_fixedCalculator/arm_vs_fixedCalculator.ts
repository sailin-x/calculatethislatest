import { Calculator } from '../../types/calculator';

export const arm_vs_fixedCalculator: Calculator = {
  id: 'ArmVsFixed-calculator',
  title: 'Arm Vs Fixed Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Arm Vs Fixed',
  description: 'Calculate arm vs fixed values.',
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
