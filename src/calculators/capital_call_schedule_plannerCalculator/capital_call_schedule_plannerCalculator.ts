import { Calculator } from '../../types/calculator';

export const capital_call_schedule_plannerCalculator: Calculator = {
  id: 'CapitalCallSchedule-planner-calculator',
  title: 'Capital Call Schedule Planner Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Capital Call Schedule Planner',
  description: 'Calculate capital call schedule planner values.',
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
