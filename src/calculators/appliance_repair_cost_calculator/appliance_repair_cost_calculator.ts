import { Calculator } from '../../types/calculator';

export const appliance_repair_cost_calculator: Calculator = {
  id: 'ApplianceRepairCost-calculator-calculator',
  title: 'Appliance Repair Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Appliance Repair Cost Calculator',
  description: 'Calculate appliance repair cost calculator values.',
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
