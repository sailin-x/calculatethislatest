import { Calculator } from '../../types/calculator';

export const tax_loss_harvesting_calculator: Calculator = {
  id: 'TaxLossHarvesting-calculator-calculator',
  title: 'Tax Loss Harvesting Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Tax Loss Harvesting Calculator',
  description: 'Calculate tax loss harvesting calculator values.',
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
