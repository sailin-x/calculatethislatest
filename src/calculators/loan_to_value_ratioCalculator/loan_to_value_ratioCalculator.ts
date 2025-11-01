import { Calculator } from '../../types/calculator';

export const loan_to_value_ratioCalculator: Calculator = {
  id: 'LoanToValue-ratio-calculator',
  title: 'Loan To Value Ratio Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Loan To Value Ratio',
  description: 'Calculate loan to value ratio values.',
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
