import { Calculator } from '../../types/calculator';

export const generation_skipping_transfer_tax_calculator: Calculator = {
  id: 'GenerationSkippingTransfer-TaxCalculatorCalculator',
  title: 'Generation Skipping Transfer Tax Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Generation Skipping Transfer Tax Calculator',
  description: 'Calculate generation skipping transfer tax calculator values.',
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
