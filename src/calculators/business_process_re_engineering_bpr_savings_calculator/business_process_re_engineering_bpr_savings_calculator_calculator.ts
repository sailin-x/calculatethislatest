import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'BusinessProcessRe-EngineeringBprSavings-calculator-calculator',
  title: 'Business Process Re Engineering Bpr Savings Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Business Process Re Engineering Bpr Savings Calculator',
  description: 'Calculate business process re engineering bpr savings calculator values.',
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
