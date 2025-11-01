import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'AdReachAnd-FrequencyCalculatorCalculator',
  title: 'Ad Reach And Frequency Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Ad Reach And Frequency Calculator',
  description: 'Calculate ad reach and frequency calculator values.',
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
