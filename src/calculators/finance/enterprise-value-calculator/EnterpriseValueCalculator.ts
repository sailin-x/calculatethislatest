import { Calculator } from '../../types/calculator';
import { EnterpriseValueCalculatorInputs, EnterpriseValueCalculatorOutputs } from './types';
import {
  calculateEnterpriseValue,
  calculateNetDebt,
  calculateDebtToEquity,
  calculateCashToDebt,
  generateEnterpriseValueAnalysis
} from './formulas';
import { validateEnterpriseValueCalculatorInputs } from './validation';

export const EnterpriseValueCalculator: Calculator = {
  id: 'enterprise-value-calculator',
  title: 'Enterprise Value Calculator',
  category: 'finance',
  subcategory: 'Valuation',
  description: 'Calculate enterprise value (EV) and related financial metrics for company valuation.',
  usageInstructions: [
    'Enter the market capitalization',
    'Specify total debt outstanding',
    'Enter cash and cash equivalents',
    'Optionally include preferred stock and minority interest',
    'Review enterprise value calculation and leverage analysis'
  ],

  inputs: [
    {
      id: 'marketCap',
      label: 'Market Capitalization ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Equity value (share price × shares outstanding)'
    },
    {
      id: 'totalDebt',
      label: 'Total Debt ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'All interest-bearing debt obligations'
    },
    {
      id: 'cashAndEquivalents',
      label: 'Cash & Equivalents ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Cash, cash equivalents, and short-term investments'
    },
    {
      id: 'preferredStock',
      label: 'Preferred Stock ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Value of preferred stock (optional)'
    },
    {
      id: 'minorityInterest',
      label: 'Minority Interest ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Non-controlling interest in subsidiaries (optional)'
    }
  ],

  outputs: [
    {
      id: 'enterpriseValue',
      label: 'Enterprise Value',
      type: 'currency',
      explanation: 'Total value of the business to all stakeholders'
    },
    {
      id: 'netDebt',
      label: 'Net Debt',
      type: 'currency',
      explanation: 'Total debt minus cash and equivalents'
    },
    {
      id: 'debtToEquity',
      label: 'Debt-to-Equity Ratio',
      type: 'number',
      explanation: 'Leverage ratio comparing debt to equity'
    },
    {
      id: 'cashToDebt',
      label: 'Cash-to-Debt Ratio',
      type: 'number',
      explanation: 'Liquidity ratio showing cash relative to debt'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Technology Company',
      description: 'Calculate EV for a tech company with $50B market cap, $10B debt, $15B cash',
      inputs: {
        marketCap: 50000000000,
        totalDebt: 10000000000,
        cashAndEquivalents: 15000000000,
        preferredStock: 0,
        minorityInterest: 0
      },
      expectedOutputs: {
        enterpriseValue: 46000000000,
        netDebt: -5000000000,
        debtToEquity: 0.20,
        cashToDebt: 1.50
      }
    },
    {
      title: 'Industrial Company',
      description: 'Calculate EV for an industrial company with $20B market cap, $15B debt, $3B cash',
      inputs: {
        marketCap: 20000000000,
        totalDebt: 15000000000,
        cashAndEquivalents: 3000000000,
        preferredStock: 1000000000,
        minorityInterest: 500000000
      },
      expectedOutputs: {
        enterpriseValue: 37500000000,
        netDebt: 12000000000,
        debtToEquity: 0.75,
        cashToDebt: 0.20
      }
    }
  ]
};
