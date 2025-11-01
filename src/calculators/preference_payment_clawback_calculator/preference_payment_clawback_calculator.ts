import { Calculator } from '../../types/calculator';

export const preference_payment_clawback_calculator: Calculator = {
  id: 'PreferencePaymentClawback-calculator-calculator',
  title: 'Preference Payment Clawback Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Preference Payment Clawback Calculator',
  description: 'Calculate preference payment clawback calculator values.',
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
