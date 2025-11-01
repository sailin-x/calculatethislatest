import { Calculator } from '../../types/calculator';

export const net_unrealized_appreciation_nua_tax_calculator: Calculator = {
  id: 'NetUnrealizedAppreciation-NuaTaxCalculator-calculator',
  title: 'Net Unrealized Appreciation Nua Tax Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Net Unrealized Appreciation Nua Tax Calculator',
  description: 'Calculate net unrealized appreciation nua tax calculator values.',
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
