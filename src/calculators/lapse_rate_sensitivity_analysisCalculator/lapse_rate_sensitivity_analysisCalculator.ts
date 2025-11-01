import { Calculator } from '../../types/calculator';

export const lapse_rate_sensitivity_analysisCalculator: Calculator = {
  id: 'LapseRateSensitivity-analysis-calculator',
  title: 'Lapse Rate Sensitivity Analysis Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Lapse Rate Sensitivity Analysis',
  description: 'Calculate lapse rate sensitivity analysis values.',
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
