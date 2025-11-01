import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'OverallEquipmentEffectiveness-OeeCalculatorCalculator',
  title: 'Overall Equipment Effectiveness Oee Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Overall Equipment Effectiveness Oee Calculator',
  description: 'Calculate overall equipment effectiveness oee calculator values.',
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
