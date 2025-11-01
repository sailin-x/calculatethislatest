import { Calculator } from '../../types/calculator';

export const term_vs_universal_life_insurance_calculator: Calculator = {
  id: 'TermVsUniversal-LifeInsuranceCalculator-calculator',
  title: 'Term Vs Universal Life Insurance Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Term Vs Universal Life Insurance Calculator',
  description: 'Calculate term vs universal life insurance calculator values.',
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
