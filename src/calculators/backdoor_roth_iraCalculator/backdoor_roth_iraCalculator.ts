import { Calculator } from '../../types/calculator';

export const backdoor_roth_iraCalculator: Calculator = {
  id: 'BackdoorRothIra-calculator',
  title: 'Backdoor Roth Ira Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Backdoor Roth Ira',
  description: 'Calculate backdoor roth ira values.',
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
