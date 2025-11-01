import { Calculator } from '../../types/calculator';

export const personal_trainer_cost_calculator: Calculator = {
  id: 'PersonalTrainerCost-calculator-calculator',
  title: 'Personal Trainer Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Personal Trainer Cost Calculator',
  description: 'Calculate personal trainer cost calculator values.',
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
