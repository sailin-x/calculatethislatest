import { Calculator } from '../../types/calculator';

export const restricted_stock_unit_rsu_vs_stock_option_calculator: Calculator = {
  id: 'RestrictedStockUnit-RsuVsStock-OptionCalculatorCalculator',
  title: 'Restricted Stock Unit Rsu Vs Stock Option Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Restricted Stock Unit Rsu Vs Stock Option Calculator',
  description: 'Calculate restricted stock unit rsu vs stock option calculator values.',
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
