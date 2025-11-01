import { Calculator } from '../../types/calculator';

export const compound_annual_growth_rate_calculator: Calculator = {
  id: 'CompoundAnnualGrowth-RateCalculatorCalculator',
  title: 'Compound Annual Growth Rate Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Compound Annual Growth Rate Calculator',
  description: 'Calculate compound annual growth rate calculator values.',
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
