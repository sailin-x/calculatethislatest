import { Calculator } from '../../types/calculator';

export const term_vs_whole_life_calculator: Calculator = {
  id: 'TermVsWhole-LifeCalculatorCalculator',
  title: 'Term Vs Whole Life Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Term Vs Whole Life Calculator',
  description: 'Calculate term vs whole life calculator values.',
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
