import { Calculator } from '../../../../types/calculator';
import { crypto_portfolio_rebalancing_calculatorInputs, crypto_portfolio_rebalancing_calculatorOutputs } from './types';
import { calculateResult, generateAnalysis } from './formulas';

export const crypto_portfolio_rebalancing_calculatorCalculator: Calculator = {
  id: 'crypto-portfolio-rebalancing-calculator',
  title: 'Crypto Portfolio Rebalancing Calculator Calculator',
  category: 'financeinvestment',
  subcategory: 'cryptocurrencyhub',
  description: 'Calculate Crypto Portfolio Rebalancing Calculator metrics with professional accuracy.',
  usageInstructions: [
    'Enter your Crypto Portfolio Rebalancing Calculator parameters',
    'Review calculation results',
    'Consider professional consultation for large amounts'
  ],

  inputs: [
    {
      id: 'amount',
      label: 'Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Primary amount for calculation'
    },
    {
      id: 'rate',
      label: 'Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 5,
      tooltip: 'Applicable rate percentage'
    },
    {
      id: 'time',
      label: 'Time Period',
      type: 'number',
      required: false,
      min: 1,
      max: 100,
      defaultValue: 1,
      tooltip: 'Time period for calculation'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result ($)',
      type: 'currency',
      explanation: 'Calculated result based on inputs'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [
    {
      title: 'Standard Calculation',
      description: 'Basic Crypto Portfolio Rebalancing Calculator calculation',
      inputs: { amount: 10000, rate: 5, time: 1 },
      expectedOutputs: { result: 500 }
    }
  ]
};
