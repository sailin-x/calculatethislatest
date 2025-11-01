import { Calculator } from '../../types/calculator';

export const down_payment_assistanceCalculator: Calculator = {
  id: 'DownPaymentAssistance-calculator',
  title: 'Down Payment Assistance Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Down Payment Assistance',
  description: 'Calculate down payment assistance values.',
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
