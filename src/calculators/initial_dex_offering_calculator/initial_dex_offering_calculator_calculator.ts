import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'InitialDexOffering-calculator-calculator',
  title: 'Initial Dex Offering Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Initial Dex Offering Calculator',
  description: 'Calculate initial dex offering calculator values.',
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
