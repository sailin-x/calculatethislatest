import { Calculator } from '../../types/calculator';

export const health_savings_account_contribution_calculator: Calculator = {
  id: 'HealthSavingsAccount-ContributionCalculatorCalculator',
  title: 'Health Savings Account Contribution Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Health Savings Account Contribution Calculator',
  description: 'Calculate health savings account contribution calculator values.',
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
