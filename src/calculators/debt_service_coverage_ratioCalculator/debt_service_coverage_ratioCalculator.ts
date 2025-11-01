import { Calculator } from '../../types/calculator';

export const debt_service_coverage_ratioCalculator: Calculator = {
  id: 'DebtServiceCoverage-ratio-calculator',
  title: 'Debt Service Coverage Ratio Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Debt Service Coverage Ratio',
  description: 'Calculate debt service coverage ratio values.',
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
