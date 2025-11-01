import { Calculator } from '../../types/calculator';

export const loan_to_cost_ratioCalculator: Calculator = {
  id: 'LoanToCost-ratio-calculator',
  title: 'Loan To Cost Ratio Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Loan To Cost Ratio',
  description: 'Calculate loan to cost ratio values.',
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
