import { Calculator } from '../../types/calculator';

export const roth_conversion_tax_calculator: Calculator = {
  id: 'RothConversionTax-calculator-calculator',
  title: 'Roth Conversion Tax Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Roth Conversion Tax Calculator',
  description: 'Calculate roth conversion tax calculator values.',
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
