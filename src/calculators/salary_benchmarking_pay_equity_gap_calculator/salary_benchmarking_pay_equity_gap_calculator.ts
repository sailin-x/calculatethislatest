import { Calculator } from '../../types/calculator';

export const salary_benchmarking_pay_equity_gap_calculator: Calculator = {
  id: 'SalaryBenchmarkingPay-EquityGapCalculator-calculator',
  title: 'Salary Benchmarking Pay Equity Gap Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Salary Benchmarking Pay Equity Gap Calculator',
  description: 'Calculate salary benchmarking pay equity gap calculator values.',
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
