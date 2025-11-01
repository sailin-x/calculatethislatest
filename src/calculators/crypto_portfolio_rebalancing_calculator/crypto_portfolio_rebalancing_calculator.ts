import { Calculator } from '../../types/calculator';

export const crypto_portfolio_rebalancing_calculator: Calculator = {
  id: 'CryptoPortfolioRebalancing-calculator-calculator',
  title: 'Crypto Portfolio Rebalancing Calculator Calculator',
  category: 'finance', // Adjust category as needed
  subcategory: 'Crypto Portfolio Rebalancing Calculator',
  description: 'Calculate crypto portfolio rebalancing calculator values.',
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
