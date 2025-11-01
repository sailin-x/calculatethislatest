import { Calculator } from '../../types/calculator';

export const executive_deferred_compensation_plan_calculator: Calculator = {
  id: 'ExecutiveDeferredCompensation-PlanCalculatorCalculator',
  title: 'Executive Deferred Compensation Plan Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Executive Deferred Compensation Plan Calculator',
  description: 'Calculate executive deferred compensation plan calculator values.',
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
