import { Calculator } from '../../types/calculator';
import { EconomicValueAddedInputs, EconomicValueAddedOutputs } from './types';
import {
  calculateNOPAT,
  calculateCapitalCharge,
  calculateEVA,
  calculateEVAMargin,
  calculateEVASpread,
  calculateCapitalProductivity,
  generateEVAAnalysis
} from './formulas';
import { validateEconomicValueAddedInputs } from './validation';

export const EconomicValueAddedCalculator: Calculator = {
  id: 'economic-value-added-calculator',
  title: 'Economic Value Added Calculator',
  category: 'finance',
  subcategory: 'Performance Measurement',
  description: 'Calculate Economic Value Added (EVA) and related performance metrics to measure true economic profit.',
  usageInstructions: [
    'Enter net operating profit after tax (NOPAT)',
    'Specify capital employed by the business',
    'Set the cost of capital (WACC)',
    'Enter tax rate',
    'Optionally provide company financial information',
    'Review EVA calculation and performance analysis'
  ],

  inputs: [
    {
      id: 'netOperatingProfitAfterTax',
      label: 'NOPAT ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Net Operating Profit After Tax'
    },
    {
      id: 'capitalEmployed',
      label: 'Capital Employed ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total capital invested in the business'
    },
    {
      id: 'costOfCapital',
      label: 'Cost of Capital (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Weighted Average Cost of Capital (WACC)'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Corporate tax rate'
    },
    {
      id: 'totalAssets',
      label: 'Total Assets ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total company assets (optional)'
    },
    {
      id: 'currentLiabilities',
      label: 'Current Liabilities ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current liabilities (optional)'
    },
    {
      id: 'totalEquity',
      label: 'Total Equity ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total shareholder equity (optional)'
    }
  ],

  outputs: [
    {
      id: 'economicValueAdded',
      label: 'Economic Value Added (EVA)',
      type: 'currency',
      explanation: 'True economic profit after cost of capital'
    },
    {
      id: 'valueCreation',
      label: 'Value Creation',
      type: 'currency',
      explanation: 'Economic value created for shareholders'
    },
    {
      id: 'performanceRating',
      label: 'Performance Rating',
      type: 'text',
      explanation: 'Overall EVA performance assessment'
    },
    {
      id: 'evaMargin',
      label: 'EVA Margin',
      type: 'percentage',
      explanation: 'EVA as percentage of capital employed'
    },
    {
      id: 'capitalProductivity',
      label: 'Capital Productivity',
      type: 'number',
      explanation: 'Revenue to capital employed ratio'
    },
    {
      id: 'riskAdjustedEva',
      label: 'Risk-Adjusted EVA',
      type: 'currency',
      explanation: 'EVA adjusted for business risk factors'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Value-Creating Company',
      description: 'Calculate EVA for a company with $2M NOPAT, $10M capital employed, 10% cost of capital',
      inputs: {
        netOperatingProfitAfterTax: 2000000,
        capitalEmployed: 10000000,
        costOfCapital: 10,
        taxRate: 25,
        totalAssets: 15000000,
        currentLiabilities: 3000000,
        totalEquity: 8000000
      },
      expectedOutputs: {
        economicValueAdded: 1000000,
        valueCreation: 1000000,
        performanceRating: 'Excellent',
        evaMargin: 10.00,
        capitalProductivity: 0,
        riskAdjustedEva: 1000000
      }
    },
    {
      title: 'Value-Destroying Company',
      description: 'Calculate EVA for a company with $500K NOPAT, $8M capital employed, 12% cost of capital',
      inputs: {
        netOperatingProfitAfterTax: 500000,
        capitalEmployed: 8000000,
        costOfCapital: 12,
        taxRate: 25
      },
      expectedOutputs: {
        economicValueAdded: -460000,
        valueCreation: -460000,
        performanceRating: 'Poor',
        evaMargin: -5.75,
        capitalProductivity: 0,
        riskAdjustedEva: -460000
      }
    }
  ]
};