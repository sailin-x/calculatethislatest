import { Calculator } from '../../types/calculator';
import { DividendCalculatorInputs, DividendCalculatorOutputs } from './types';
import {
  calculateDividendYield,
  calculateAnnualDividendIncome,
  calculateTotalDividendIncome,
  calculateDividendPayoutRatio,
  calculateDividendCoverageRatio,
  generateDividendAnalysis
} from './formulas';
import { validateDividendCalculatorInputs } from './validation';

export const DividendCalculator: Calculator = {
  id: 'dividend-calculator',
  title: 'Dividend Calculator',
  category: 'finance',
  subcategory: 'Income Investing',
  description: 'Calculate dividend yields, income potential, and dividend sustainability metrics.',
  usageInstructions: [
    'Enter the current stock price',
    'Specify the annual dividend amount',
    'Select dividend payment frequency',
    'Optionally enter holding period for total income calculation',
    'Review dividend yield, income potential, and sustainability analysis'
  ],

  inputs: [
    {
      id: 'stockPrice',
      label: 'Stock Price ($)',
      type: 'currency',
      required: true,
      min: 0.01,
      tooltip: 'Current market price per share'
    },
    {
      id: 'annualDividend',
      label: 'Annual Dividend ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total annual dividend per share'
    },
    {
      id: 'dividendFrequency',
      label: 'Dividend Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi-annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often dividends are paid'
    },
    {
      id: 'holdingPeriod',
      label: 'Holding Period (Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 50,
      tooltip: 'Investment holding period for total income calculation'
    }
  ],

  outputs: [
    {
      id: 'dividendYield',
      label: 'Dividend Yield',
      type: 'percentage',
      explanation: 'Annual dividend as percentage of stock price'
    },
    {
      id: 'annualDividendIncome',
      label: 'Annual Dividend Income',
      type: 'currency',
      explanation: 'Total annual dividend income based on frequency'
    },
    {
      id: 'totalDividendIncome',
      label: 'Total Dividend Income',
      type: 'currency',
      explanation: 'Total dividend income over holding period'
    },
    {
      id: 'dividendPayoutRatio',
      label: 'Dividend Payout Ratio',
      type: 'percentage',
      explanation: 'Percentage of earnings paid as dividends'
    },
    {
      id: 'dividendCoverageRatio',
      label: 'Dividend Coverage Ratio',
      type: 'number',
      explanation: 'How many times earnings cover dividend payments'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'High-Yield Dividend Stock',
      description: 'Calculate dividend metrics for a $50 stock paying $2 annual dividend',
      inputs: {
        stockPrice: 50.00,
        annualDividend: 2.00,
        dividendFrequency: 'quarterly',
        holdingPeriod: 5
      },
      expectedOutputs: {
        dividendYield: 4.00,
        annualDividendIncome: 2.00,
        totalDividendIncome: 10.00,
        dividendPayoutRatio: 0, // Would need EPS input
        dividendCoverageRatio: 0 // Would need EPS input
      }
    },
    {
      title: 'Monthly Dividend Investment',
      description: 'Calculate income from monthly dividend stock at $25 price with $1 annual dividend',
      inputs: {
        stockPrice: 25.00,
        annualDividend: 1.00,
        dividendFrequency: 'monthly',
        holdingPeriod: 3
      },
      expectedOutputs: {
        dividendYield: 4.00,
        annualDividendIncome: 1.00,
        totalDividendIncome: 3.00,
        dividendPayoutRatio: 0,
        dividendCoverageRatio: 0
      }
    }
  ]
};
