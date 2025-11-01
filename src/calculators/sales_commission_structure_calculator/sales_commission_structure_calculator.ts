import { Calculator } from '../../types/calculator';

export const sales_commission_structure_calculator: Calculator = {
  id: 'SalesCommissionStructure-calculator-calculator',
  title: 'Sales Commission Structure Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Sales Commission Structure Calculator',
  description: 'Calculate sales commission structure calculator values.',
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
