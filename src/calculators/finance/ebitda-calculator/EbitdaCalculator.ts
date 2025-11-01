import { Calculator } from '../../types/calculator';
import { EbitdaCalculatorInputs, EbitdaCalculatorOutputs } from './types';
import {
  calculateEBITDA,
  calculateEBITDAMargin,
  calculateAdjustedEBITDA,
  calculateEBITDAToRevenue,
  generateEBITDAAnalysis
} from './formulas';
import { validateEbitdaCalculatorInputs } from './validation';

export const EbitdaCalculator: Calculator = {
  id: 'ebitda-calculator',
  title: 'EBITDA Calculator',
  category: 'finance',
  subcategory: 'Financial Analysis',
  description: 'Calculate EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) and related profitability metrics.',
  usageInstructions: [
    'Enter total revenue',
    'Specify operating expenses (excluding depreciation and amortization)',
    'Enter depreciation expense',
    'Enter amortization expense',
    'Optionally include interest expense and tax rate',
    'Review EBITDA, margins, and profitability analysis'
  ],

  inputs: [
    {
      id: 'revenue',
      label: 'Revenue ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total company revenue'
    },
    {
      id: 'operatingExpenses',
      label: 'Operating Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Operating expenses excluding depreciation and amortization'
    },
    {
      id: 'depreciation',
      label: 'Depreciation ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Depreciation expense'
    },
    {
      id: 'amortization',
      label: 'Amortization ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amortization expense'
    },
    {
      id: 'interestExpense',
      label: 'Interest Expense ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Interest expense (optional for EBITDA calculation)'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Corporate tax rate (optional)'
    }
  ],

  outputs: [
    {
      id: 'ebitda',
      label: 'EBITDA',
      type: 'currency',
      explanation: 'Earnings Before Interest, Taxes, Depreciation, and Amortization'
    },
    {
      id: 'ebitdaMargin',
      label: 'EBITDA Margin',
      type: 'percentage',
      explanation: 'EBITDA as a percentage of revenue'
    },
    {
      id: 'adjustedEbitda',
      label: 'Adjusted EBITDA',
      type: 'currency',
      explanation: 'EBITDA adjusted for one-time items'
    },
    {
      id: 'ebitdaToRevenue',
      label: 'EBITDA to Revenue Ratio',
      type: 'number',
      explanation: 'EBITDA divided by revenue'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Technology Company',
      description: 'Calculate EBITDA for a tech company with $10M revenue, $6M operating expenses, $1M depreciation, $500K amortization',
      inputs: {
        revenue: 10000000,
        operatingExpenses: 6000000,
        depreciation: 1000000,
        amortization: 500000,
        interestExpense: 200000,
        taxRate: 25
      },
      expectedOutputs: {
        ebitda: 4500000,
        ebitdaMargin: 45.00,
        adjustedEbitda: 4500000,
        ebitdaToRevenue: 0.45
      }
    },
    {
      title: 'Manufacturing Company',
      description: 'Calculate EBITDA for a manufacturing company with $5M revenue, $4M operating expenses, $800K depreciation, $200K amortization',
      inputs: {
        revenue: 5000000,
        operatingExpenses: 4000000,
        depreciation: 800000,
        amortization: 200000
      },
      expectedOutputs: {
        ebitda: 1000000,
        ebitdaMargin: 20.00,
        adjustedEbitda: 1000000,
        ebitdaToRevenue: 0.20
      }
    }
  ]
};
