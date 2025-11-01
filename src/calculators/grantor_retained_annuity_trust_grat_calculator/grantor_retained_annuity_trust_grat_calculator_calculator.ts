import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'GrantorRetainedAnnuity-TrustGratCalculator-calculator',
  title: 'Grantor Retained Annuity Trust Grat Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Grantor Retained Annuity Trust Grat Calculator',
  description: 'Calculate grantor retained annuity trust grat calculator values.',
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
