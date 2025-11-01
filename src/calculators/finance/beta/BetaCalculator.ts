import { Calculator } from '../../../types/calculator';
import { BetaInputs, BetaOutputs } from './types';
import {
  calculateBeta,
  calculateAlpha,
  calculateRSquared,
  calculateStandardError,
  calculateCorrelationCoefficient,
  calculateVolatility,
  calculateMarketVolatility,
  calculateSharpeRatio,
  calculateSystematicRisk,
  calculateUnsystematicRisk,
  calculateTotalRisk
} from './formulas';
import { validateBetaInputs, validateBetaBusinessRules } from './validation';

export const BetaCalculator: Calculator = {
  id: 'BetaCalculator',
  title: 'Beta Calculator',
  category: 'finance',
  subcategory: 'Investment Analysis',
  description: 'Calculate beta coefficient, systematic risk, and market sensitivity for stocks and portfolios. Includes CAPM analysis, correlation, and risk decomposition.',
  usageInstructions: [
    'Enter historical stock returns as comma-separated values',
    'Enter corresponding market/benchmark returns',
    'Select time period for the return data',
    'Specify risk-free rate for analysis',
    'Choose benchmark index for comparison',
    'Review beta coefficient and risk metrics'
  ],

  inputs: [
    {
      id: 'stockReturns',
      label: 'Stock Returns (%)',
      type: 'text',
      required: true,
      tooltip: 'Historical stock returns as comma-separated percentages (e.g., 1.5, -2.3, 0.8, 3.2)',
      placeholder: '1.5, -2.3, 0.8, 3.2, -1.1, 2.7...'
    },
    {
      id: 'marketReturns',
      label: 'Market Returns (%)',
      type: 'text',
      required: true,
      tooltip: 'Historical market/benchmark returns as comma-separated percentages',
      placeholder: '1.2, -1.8, 0.5, 2.8, -0.9, 2.1...'
    },
    {
      id: 'riskFreeRate',
      label: 'Risk-Free Rate (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 20,
      step: 0.01,
      defaultValue: 4.5,
      tooltip: 'Current risk-free rate (e.g., 10-year Treasury yield)'
    },
    {
      id: 'timePeriod',
      label: 'Time Period',
      type: 'select',
      required: true,
      options: [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'yearly', label: 'Yearly' }
      ],
      defaultValue: 'monthly',
      tooltip: 'Frequency of the return data'
    },
    {
      id: 'benchmarkIndex',
      label: 'Benchmark Index',
      type: 'select',
      required: true,
      options: [
        { value: 'S&P 500', label: 'S&P 500' },
        { value: 'Dow Jones', label: 'Dow Jones Industrial Average' },
        { value: 'NASDAQ', label: 'NASDAQ Composite' },
        { value: 'Russell 2000', label: 'Russell 2000' },
        { value: 'MSCI World', label: 'MSCI World Index' },
        { value: 'Custom', label: 'Custom Benchmark' }
      ],
      defaultValue: 'S&P 500',
      tooltip: 'Market benchmark for comparison'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level (%)',
      type: 'percentage',
      required: true,
      min: 80,
      max: 99,
      step: 1,
      defaultValue: 95,
      tooltip: 'Confidence level for statistical calculations'
    }
  ],

  outputs: [
    {
      id: 'beta',
      label: 'Beta Coefficient',
      type: 'number',
      explanation: 'Measure of stock\'s volatility relative to the market (1.0 = market volatility)'
    },
    {
      id: 'alpha',
      label: 'Alpha (%)',
      type: 'percentage',
      explanation: 'Excess return relative to CAPM expected return'
    },
    {
      id: 'rSquared',
      label: 'R-Squared (%)',
      type: 'percentage',
      explanation: 'Percentage of stock\'s movements explained by market movements'
    },
    {
      id: 'standardError',
      label: 'Standard Error',
      type: 'number',
      explanation: 'Standard error of the beta estimate'
    },
    {
      id: 'correlation',
      label: 'Correlation Coefficient',
      type: 'number',
      explanation: 'Correlation between stock and market returns'
    },
    {
      id: 'volatility',
      label: 'Stock Volatility (%)',
      type: 'percentage',
      explanation: 'Annualized volatility of the stock'
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility (%)',
      type: 'percentage',
      explanation: 'Annualized volatility of the market'
    },
    {
      id: 'sharpeRatio',
      label: 'Sharpe Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return measure'
    },
    {
      id: 'systematicRisk',
      label: 'Systematic Risk (%)',
      type: 'percentage',
      explanation: 'Market-related risk component'
    },
    {
      id: 'unsystematicRisk',
      label: 'Unsystematic Risk (%)',
      type: 'percentage',
      explanation: 'Stock-specific risk component'
    },
    {
      id: 'totalRisk',
      label: 'Total Risk (%)',
      type: 'percentage',
      explanation: 'Total volatility of the stock'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Technology Stock Beta Analysis',
      description: 'Beta calculation for a high-growth technology stock',
      inputs: {
        stockReturns: [2.1, -3.4, 4.2, 1.8, -2.7, 3.9, 0.5, -1.2, 5.1, 2.3, -4.1, 3.7],
        marketReturns: [1.2, -2.1, 2.8, 1.1, -1.9, 2.5, 0.8, -0.9, 3.2, 1.7, -2.8, 2.1],
        riskFreeRate: 4.5,
        timePeriod: 'monthly',
        benchmarkIndex: 'S&P 500',
        confidenceLevel: 95
      },
      expectedOutputs: {
        beta: 1.25,
        alpha: 2.1,
        rSquared: 78.5,
        standardError: 0.1234,
        correlation: 0.885,
        volatility: 18.5,
        marketVolatility: 14.2,
        sharpeRatio: 1.45,
        systematicRisk: 15.2,
        unsystematicRisk: 8.9,
        totalRisk: 18.5
      }
    },
    {
      title: 'Defensive Stock Analysis',
      description: 'Beta calculation for a utility stock with low market sensitivity',
      inputs: {
        stockReturns: [0.8, -1.2, 1.5, 0.9, -0.8, 1.3, 0.6, -0.5, 1.8, 1.1, -1.4, 1.2],
        marketReturns: [1.2, -2.1, 2.8, 1.1, -1.9, 2.5, 0.8, -0.9, 3.2, 1.7, -2.8, 2.1],
        riskFreeRate: 4.5,
        timePeriod: 'monthly',
        benchmarkIndex: 'S&P 500',
        confidenceLevel: 95
      },
      expectedOutputs: {
        beta: 0.65,
        alpha: -0.8,
        rSquared: 65.2,
        standardError: 0.0987,
        correlation: 0.807,
        volatility: 9.8,
        marketVolatility: 14.2,
        sharpeRatio: 0.85,
        systematicRisk: 6.2,
        unsystematicRisk: 7.1,
        totalRisk: 9.8
      }
    }
  ]
};