import { Calculator } from '../../types/calculator';

export const economic_order_quantity_calculator: Calculator = {
  id: 'EconomicOrderQuantity-calculator-calculator',
  title: 'Economic Order Quantity Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Economic Order Quantity Calculator',
  description: 'Calculate economic order quantity calculator values.',
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
