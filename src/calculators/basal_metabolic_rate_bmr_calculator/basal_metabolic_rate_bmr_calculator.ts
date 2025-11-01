import { Calculator } from '../../types/calculator';

export const basal_metabolic_rate_bmr_calculator: Calculator = {
  id: 'BasalMetabolicRate-BmrCalculatorCalculator',
  title: 'Basal Metabolic Rate Bmr Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Basal Metabolic Rate Bmr Calculator',
  description: 'Calculate basal metabolic rate bmr calculator values.',
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
