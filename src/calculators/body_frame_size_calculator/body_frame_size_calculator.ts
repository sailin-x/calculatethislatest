import { Calculator } from '../../types/calculator';

export const body_frame_size_calculator: Calculator = {
  id: 'BodyFrameSize-calculator-calculator',
  title: 'Body Frame Size Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Body Frame Size Calculator',
  description: 'Calculate body frame size calculator values.',
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
