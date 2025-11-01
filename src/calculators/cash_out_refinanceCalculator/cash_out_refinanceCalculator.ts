import { Calculator } from '../../types/calculator';

export const cash_out_refinanceCalculator: Calculator = {
  id: 'CashOutRefinance-calculator',
  title: 'Cash Out Refinance Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Cash Out Refinance',
  description: 'Calculate cash out refinance values.',
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
