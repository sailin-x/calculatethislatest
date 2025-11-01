import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'ComparableCompanyAnalysis-calculator-calculator',
  title: 'Comparable Company Analysis Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Comparable Company Analysis Calculator',
  description: 'Calculate comparable company analysis calculator values.',
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
