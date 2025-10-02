import { Calculator } from '../../types/calculator';
import { HealthSavingsAccountHsaCalculatorInputs, HealthSavingsAccountHsaCalculatorOutputs } from './types';
import {
  calculateAnnualContributionLimit,
  calculateTotalContributions,
  calculateInvestmentGrowth,
  calculateQualifiedWithdrawalTaxSavings,
  calculateNonQualifiedWithdrawalTax,
  calculateNetTaxAdvantage,
  generateHsaAnalysis
} from './formulas';
import { validateHealthSavingsAccountHsaCalculatorInputs } from './validation';

export const HealthSavingsAccountHsaCalculator: Calculator = {
  id: 'health-savings-account-hsa-calculator',
  title: 'Health Savings Account (HSA) Calculator',
  category: 'finance',
  subcategory: 'Tax Planning',
  description: 'Calculate HSA contribution limits, tax advantages, and investment growth for healthcare savings with triple tax benefits.',
  usageInstructions: [
    'Enter your age and coverage type (self-only or family)',
    'Input current HSA balance and annual contribution amount',
    'Specify expected investment growth rate',
    'Enter years until retirement for long-term planning',
    'Review tax savings and contribution strategy'
  ],

  inputs: [
    {
      id: 'coverageType',
      label: 'Coverage Type',
      type: 'select',
      required: true,
      options: [
        { value: 'self-only', label: 'Self-Only' },
        { value: 'family', label: 'Family' }
      ],
      tooltip: 'HSA coverage type affects contribution limits'
    },
    {
      id: 'age',
      label: 'Your Age',
      type: 'number',
      required: true,
      min: 0,
      max: 120,
      tooltip: 'Age affects catch-up contribution eligibility'
    },
    {
      id: 'currentBalance',
      label: 'Current HSA Balance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current amount in your HSA'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount contributed annually to HSA'
    },
    {
      id: 'expectedGrowthRate',
      label: 'Expected Growth Rate (%)',
      type: 'percentage',
      required: false,
      min: -50,
      max: 50,
      defaultValue: 6,
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Years until you plan to retire'
    },
    {
      id: 'qualifiedWithdrawals',
      label: 'Annual Qualified Withdrawals ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Tax-free withdrawals for qualified medical expenses'
    },
    {
      id: 'nonQualifiedWithdrawals',
      label: 'Annual Non-Qualified Withdrawals ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Withdrawals not used for qualified medical expenses'
    }
  ],

  outputs: [
    {
      id: 'annualContributionLimit',
      label: 'Annual Contribution Limit',
      type: 'currency',
      explanation: 'Maximum amount you can contribute annually'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed over time'
    },
    {
      id: 'investmentGrowth',
      label: 'Investment Growth',
      type: 'currency',
      explanation: 'Growth from HSA investments'
    },
    {
      id: 'qualifiedWithdrawalTaxSavings',
      label: 'Qualified Withdrawal Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from qualified medical expense withdrawals'
    },
    {
      id: 'nonQualifiedWithdrawalTax',
      label: 'Non-Qualified Withdrawal Tax',
      type: 'currency',
      explanation: 'Taxes due on non-qualified withdrawals'
    },
    {
      id: 'netTaxAdvantage',
      label: 'Net Tax Advantage',
      type: 'currency',
      explanation: 'Overall tax benefit from HSA triple tax advantage'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Family Coverage HSA Planning',
      description: 'HSA planning for a 45-year-old with family coverage',
      inputs: {
        coverageType: 'family',
        age: 45,
        currentBalance: 10000,
        annualContribution: 7500,
        expectedGrowthRate: 6,
        yearsToRetirement: 20,
        qualifiedWithdrawals: 2000,
        nonQualifiedWithdrawals: 0
      },
      expectedOutputs: {
        annualContributionLimit: 8200,
        totalContributions: 160000,
        investmentGrowth: 191000,
        qualifiedWithdrawalTaxSavings: 440,
        nonQualifiedWithdrawalTax: 0,
        netTaxAdvantage: 440
      }
    }
  ]
};