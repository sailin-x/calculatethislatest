import { Calculator } from '../../types/calculator';

export const free_cash_flow_to_firm_calculator: Calculator = {
  id: 'FreeCashFlow-ToFirmCalculator-calculator',
  title: 'Free Cash Flow To Firm Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Free Cash Flow To Firm Calculator',
  description: 'Calculate free cash flow to firm calculator values.',
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
