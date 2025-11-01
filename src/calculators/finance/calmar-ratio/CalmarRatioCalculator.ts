import { Calculator } from '../../../types/calculator';
import { CalmarRatioInputs, CalmarRatioOutputs } from './types';
import {
  calculateCalmarRatio,
  calculateAnnualizedReturn,
  calculateMaximumDrawdown,
  calculateSharpeRatio,
  calculateSortinoRatio,
  calculateRecoveryTime,
  calculateVolatility,
  calculateDownsideDeviation
} from './formulas';
import { validateCalmarRatioInputs, validateCalmarRatioBusinessRules } from './validation';

export const CalmarRatioCalculator: Calculator = {
  id: 'CalmarRatioCalculator',
  title: 'Calmar Ratio Calculator',
  category: 'finance',
  subcategory: 'Risk-Adjusted Performance',
  description: 'Calculate Calmar ratio and other risk-adjusted performance metrics. Measures annualized return relative to maximum drawdown.',
  usageInstructions: [
    'Enter portfolio values as comma-separated numbers representing the value at each time period',
    'Select the time period frequency of your data',
    'Specify the current risk-free rate',
    'Optionally provide benchmark values for comparison',
    'Review Calmar ratio and risk metrics'
  ],

  inputs: [
    {
      id: 'portfolioValues',
      label: 'Portfolio Values',
      type: 'text',
      required: true,
      tooltip: 'Portfolio values as comma-separated numbers (e.g., 10000, 10500, 9800, 10200...)',
      placeholder: '10000, 10500, 9800, 10200, 10800...'
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
      tooltip: 'Frequency of the portfolio value data'
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
      tooltip: 'Current risk-free rate for Sharpe and Sortino ratio calculations'
    },
    {
      id: 'benchmarkValues',
      label: 'Benchmark Values (Optional)',
      type: 'text',
      required: false,
      tooltip: 'Benchmark values as comma-separated numbers for comparison',
      placeholder: '10000, 10400, 10100, 10300, 10600...'
    }
  ],

  outputs: [
    {
      id: 'calmarRatio',
      label: 'Calmar Ratio',
      type: 'number',
      explanation: 'Annualized return divided by maximum drawdown (higher is better)'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return (%)',
      type: 'percentage',
      explanation: 'Compound annual growth rate of the portfolio'
    },
    {
      id: 'maximumDrawdown',
      label: 'Maximum Drawdown (%)',
      type: 'percentage',
      explanation: 'Largest peak-to-trough decline in portfolio value'
    },
    {
      id: 'sharpeRatio',
      label: 'Sharpe Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return using total volatility'
    },
    {
      id: 'sortinoRatio',
      label: 'Sortino Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return using downside deviation only'
    },
    {
      id: 'recoveryTime',
      label: 'Recovery Time (Years)',
      type: 'number',
      explanation: 'Average time to recover from significant drawdowns'
    },
    {
      id: 'volatility',
      label: 'Annualized Volatility (%)',
      type: 'percentage',
      explanation: 'Standard deviation of returns annualized'
    },
    {
      id: 'downsideDeviation',
      label: 'Downside Deviation (%)',
      type: 'percentage',
      explanation: 'Volatility of negative returns only'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Conservative Portfolio Analysis',
      description: 'Analysis of a conservative portfolio with moderate returns and low drawdowns',
      inputs: {
        portfolioValues: [10000, 10200, 10100, 10300, 10250, 10400, 10350, 10500, 10600, 10500, 10700, 10800],
        timePeriod: 'monthly',
        riskFreeRate: 4.5,
        benchmarkValues: [10000, 10150, 10080, 10220, 10180, 10350, 10300, 10450, 10520, 10480, 10650, 10720]
      },
      expectedOutputs: {
        calmarRatio: 2.1,
        annualizedReturn: 8.2,
        maximumDrawdown: 3.9,
        sharpeRatio: 1.45,
        sortinoRatio: 1.85,
        recoveryTime: 0.3,
        volatility: 12.5,
        downsideDeviation: 8.2
      }
    },
    {
      title: 'Aggressive Portfolio Analysis',
      description: 'Analysis of an aggressive portfolio with high returns but significant drawdowns',
      inputs: {
        portfolioValues: [10000, 10800, 9500, 11000, 9200, 12500, 11800, 13500, 14200, 12800, 15200, 16800],
        timePeriod: 'monthly',
        riskFreeRate: 4.5
      },
      expectedOutputs: {
        calmarRatio: 0.85,
        annualizedReturn: 18.5,
        maximumDrawdown: 21.8,
        sharpeRatio: 1.25,
        sortinoRatio: 1.45,
        recoveryTime: 1.2,
        volatility: 28.5,
        downsideDeviation: 18.2
      }
    }
  ]
};