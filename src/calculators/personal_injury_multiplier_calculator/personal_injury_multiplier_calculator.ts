import { Calculator } from '../../types/calculator';

export const personal_injury_multiplier_calculator: Calculator = {
  id: 'PersonalInjuryMultiplier-calculator-calculator',
  title: 'Personal Injury Multiplier Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Personal Injury Multiplier Calculator',
  description: 'Calculate personal injury multiplier calculator values.',
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
