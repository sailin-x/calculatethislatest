import { Calculator } from '../../types/calculator';

export const project_management_cost_calculator: Calculator = {
  id: 'ProjectManagementCost-calculator-calculator',
  title: 'Project Management Cost Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Project Management Cost Calculator',
  description: 'Calculate project management cost calculator values.',
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
