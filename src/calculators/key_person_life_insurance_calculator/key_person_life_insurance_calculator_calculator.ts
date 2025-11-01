import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'KeyPersonLife-InsuranceCalculatorCalculator',
  title: 'Key Person Life Insurance Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Key Person Life Insurance Calculator',
  description: 'Calculate key person life insurance calculator values.',
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
