import { Calculator } from '../../types/calculator';

export const calculatorRegistry: Calculator = {
  id: 'SidingRepairCost-calculator-calculator',
  title: 'Siding Repair Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Siding Repair Cost Calculator',
  description: 'Calculate siding repair cost calculator values.',
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
