import { Calculator } from '../../../types/calculator';
import { RothIRAInputs, RothIRAOutputs } from './types';
import { calculateRothIRA } from './formulas';
import { validateRothIRAInputs, validateRothIRABusinessRules } from './validation';

export const RothIRACalculator: Calculator = {
  id: 'RothIRACalculator',
  title: 'Roth IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate Roth IRA growth, contribution limits, eligibility, and tax advantages for tax-free retirement savings.',
  usageInstructions: [
    'Enter your current age and income information',
    'Input expected returns and contribution amounts',
    'Select filing status and tax bracket',
    'Review eligibility, growth projections, and tax benefits'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 120,
      tooltip: 'Your current age'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      tooltip: 'Amount you plan to contribute annually'
    },
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 50,
      step: 0.1,
      defaultValue: 7,
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'yearsToContribute',
      label: 'Years to Contribute',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Number of years you plan to contribute'
    },
    {
      id: 'currentBalance',
      label: 'Current Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current Roth IRA balance'
    },
    {
      id: 'taxBracket',
      label: 'Current Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Your current marginal tax rate'
    },
    {
      id: 'inflationRate',
      label: 'Expected Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 20,
      step: 0.1,
      defaultValue: 3,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married_filing_jointly', label: 'Married Filing Jointly' },
        { value: 'married_filing_separately', label: 'Married Filing Separately' },
        { value: 'head_of_household', label: 'Head of Household' }
      ],
      tooltip: 'Your tax filing status'
    },
    {
      id: 'income',
      label: 'Modified AGI ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Modified Adjusted Gross Income for Roth IRA eligibility'
    }
  ],

  outputs: [
    {
      id: 'futureValue',
      label: 'Future Value',
      type: 'currency',
      explanation: 'Projected Roth IRA balance after contribution period'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed over the period'
    },
    {
      id: 'totalEarnings',
      label: 'Total Earnings',
      type: 'currency',
      explanation: 'Total investment earnings (tax-free in Roth IRA)'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from tax-free growth and withdrawals'
    },
    {
      id: 'effectiveReturn',
      label: 'Effective Return',
      type: 'percentage',
      explanation: 'Effective annual return after tax advantages'
    },
    {
      id: 'contributionLimitReached',
      label: 'Contribution Limit Reached',
      type: 'boolean',
      explanation: 'Whether your planned contribution exceeds annual limits'
    },
    {
      id: 'eligibilityStatus',
      label: 'Eligibility Status',
      type: 'text',
      explanation: 'Your eligibility for Roth IRA contributions'
    },
    {
      id: 'projectedBalanceByAge',
      label: 'Balance Projection by Age',
      type: 'table',
      explanation: 'Year-by-year balance projection showing growth over time'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '30-Year-Old Professional',
      description: 'Young professional maximizing Roth IRA contributions',
      inputs: {
        currentAge: 30,
        annualContribution: 7500,
        expectedAnnualReturn: 7,
        yearsToContribute: 35,
        currentBalance: 0,
        taxBracket: 25,
        inflationRate: 3,
        filingStatus: 'single',
        income: 90000
      },
      expectedOutputs: {
        futureValue: 1500000,
        totalContributions: 262500,
        totalEarnings: 1237500,
        taxSavings: 309375,
        effectiveReturn: 7,
        contributionLimitReached: false,
        eligibilityStatus: 'Income within limits for Roth IRA contributions',
        projectedBalanceByAge: []
      }
    },
    {
      title: 'High-Income Earner - Backdoor Roth',
      description: 'High-income individual using Backdoor Roth strategy',
      inputs: {
        currentAge: 45,
        annualContribution: 7500,
        expectedAnnualReturn: 8,
        yearsToContribute: 20,
        currentBalance: 50000,
        taxBracket: 35,
        inflationRate: 3,
        filingStatus: 'married_filing_jointly',
        income: 250000
      },
      expectedOutputs: {
        futureValue: 800000,
        totalContributions: 200000,
        totalEarnings: 600000,
        taxSavings: 210000,
        effectiveReturn: 8,
        contributionLimitReached: false,
        eligibilityStatus: 'Modified AGI exceeds limit of $240,000. Consider Backdoor Roth IRA strategy.',
        projectedBalanceByAge: []
      }
    },
    {
      title: '50+ Catch-Up Contributions',
      description: 'Individual over 50 taking advantage of catch-up contributions',
      inputs: {
        currentAge: 52,
        annualContribution: 8500,
        expectedAnnualReturn: 6,
        yearsToContribute: 15,
        currentBalance: 100000,
        taxBracket: 28,
        inflationRate: 3,
        filingStatus: 'single',
        income: 120000
      },
      expectedOutputs: {
        futureValue: 650000,
        totalContributions: 227500,
        totalEarnings: 422500,
        taxSavings: 118300,
        effectiveReturn: 6,
        contributionLimitReached: false,
        eligibilityStatus: 'Income within limits for Roth IRA contributions',
        projectedBalanceByAge: []
      }
    }
  ]
};