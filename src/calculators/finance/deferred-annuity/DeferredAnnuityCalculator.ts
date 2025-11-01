import { Calculator } from '../../types/calculator';
import { DeferredAnnuityInputs, DeferredAnnuityOutputs } from './types';
import { calculateDeferredAnnuity } from './formulas';
import { validateDeferredAnnuityInputs } from './validation';

export const DeferredAnnuityCalculator: Calculator = {
  id: 'DeferredAnnuityCalculator',
  title: 'Deferred Annuity Calculator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate deferred annuity growth, payouts, and tax implications for retirement planning with comprehensive risk analysis and comparison tools.',

  inputs: [
    // Account Information
    {
      id: 'initialInvestment',
      label: 'Initial Investment ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      tooltip: 'Initial amount invested in the annuity'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '500',
      tooltip: 'Monthly amount added to the annuity'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '6000',
      tooltip: 'Additional annual contribution'
    },
    {
      id: 'currentAccountValue',
      label: 'Current Account Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      tooltip: 'Current value of existing annuity'
    },

    // Time Information
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 80,
      step: 1,
      placeholder: '45',
      tooltip: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      min: 50,
      max: 100,
      step: 1,
      placeholder: '65',
      tooltip: 'Age when you plan to retire'
    },
    {
      id: 'annuityStartAge',
      label: 'Annuity Start Age',
      type: 'number',
      required: true,
      min: 50,
      max: 100,
      step: 1,
      placeholder: '65',
      tooltip: 'Age when annuity payments begin'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      min: 70,
      max: 120,
      step: 1,
      placeholder: '90',
      tooltip: 'Expected lifespan for payout calculations'
    },

    // Investment Information
    {
      id: 'expectedReturnRate',
      label: 'Expected Return Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '6',
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      placeholder: 'moderate',
      tooltip: 'Investment risk tolerance level'
    },
    {
      id: 'investmentType',
      label: 'Investment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed' },
        { value: 'variable', label: 'Variable' },
        { value: 'indexed', label: 'Indexed' }
      ],
      placeholder: 'fixed',
      tooltip: 'Type of annuity investment'
    },

    // Annuity Information
    {
      id: 'annuityType',
      label: 'Annuity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed' },
        { value: 'variable', label: 'Variable' },
        { value: 'immediate', label: 'Immediate' },
        { value: 'deferred', label: 'Deferred' }
      ],
      placeholder: 'deferred',
      tooltip: 'Type of annuity contract'
    },
    {
      id: 'payoutType',
      label: 'Payout Type',
      type: 'select',
      required: true,
      options: [
        { value: 'lifetime', label: 'Lifetime' },
        { value: 'period_certain', label: 'Period Certain' },
        { value: 'joint_survivor', label: 'Joint Survivor' },
        { value: 'lump_sum', label: 'Lump Sum' }
      ],
      placeholder: 'lifetime',
      tooltip: 'How annuity payments are distributed'
    },
    {
      id: 'payoutFrequency',
      label: 'Payout Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      placeholder: 'monthly',
      tooltip: 'How often payments are received'
    },

    // Tax Information
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '24',
      tooltip: 'Federal tax bracket'
    },
    {
      id: 'accountType',
      label: 'Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional', label: 'Traditional' },
        { value: 'roth', label: 'Roth' },
        { value: 'non_qualified', label: 'Non-Qualified' }
      ],
      placeholder: 'traditional',
      tooltip: 'Type of retirement account'
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '5',
      tooltip: 'State tax rate'
    },

    // Fees and Expenses
    {
      id: 'annualFees',
      label: 'Annual Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 5000,
      step: 50,
      placeholder: '200',
      tooltip: 'Annual maintenance fees'
    },
    {
      id: 'expenseRatio',
      label: 'Expense Ratio (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '1.5',
      tooltip: 'Annual expense ratio'
    },
    {
      id: 'surrenderCharges',
      label: 'Surrender Charges (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 1,
      placeholder: '7',
      tooltip: 'Early withdrawal penalty'
    },

    // Inflation and Assumptions
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'annuityGrowthRate',
      label: 'Annuity Growth Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '4',
      tooltip: 'Expected annuity growth rate'
    },

    // Analysis Parameters
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      tooltip: 'Period for analysis'
    },
    {
      id: 'includeSocialSecurity',
      label: 'Include Social Security',
      type: 'boolean',
      required: true,
      tooltip: 'Include Social Security benefits in analysis'
    },
    {
      id: 'socialSecurityBenefit',
      label: 'Social Security Benefit ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '20000',
      tooltip: 'Annual Social Security benefit'
    },

    // Currency
    {
      id: 'currency',
      label: 'Currency',
      type: 'select',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD',
      tooltip: 'Currency for calculations'
    }
  ],

  outputs: [
    { id: 'projectedValue', label: 'Projected Value', type: 'currency', explanation: 'Projected annuity value at retirement' },
    { id: 'monthlyIncome', label: 'Monthly Income', type: 'currency', explanation: 'Expected monthly annuity payment' },
    { id: 'totalTaxSavings', label: 'Total Tax Savings', type: 'currency', explanation: 'Total tax savings from annuity' },
    { id: 'netBenefit', label: 'Net Benefit', type: 'currency', explanation: 'Net financial benefit of annuity' },
    { id: 'metrics', label: 'Account Metrics', type: 'text', explanation: 'Detailed account performance metrics' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive annuity analysis' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Retirement Planning with Deferred Annuity',
      description: 'A 45YearOld planning retirement with systematic contributions',
      inputs: {
        initialInvestment: 100000,
        monthlyContribution: 500,
        annualContribution: 6000,
        currentAccountValue: 50000,
        currentAge: 45,
        retirementAge: 65,
        annuityStartAge: 65,
        lifeExpectancy: 90,
        expectedReturnRate: 0.06,
        riskTolerance: 'moderate',
        investmentType: 'fixed',
        annuityType: 'deferred',
        payoutType: 'lifetime',
        payoutFrequency: 'monthly',
        taxBracket: 0.24,
        accountType: 'traditional',
        stateTaxRate: 0.05,
        annualFees: 200,
        expenseRatio: 0.015,
        surrenderCharges: 0.07,
        inflationRate: 0.025,
        annuityGrowthRate: 0.04,
        analysisPeriod: 30,
        includeSocialSecurity: true,
        socialSecurityBenefit: 20000,
        currency: 'USD'
      },
      expectedOutputs: {
        projectedValue: 750000,
        monthlyIncome: 3500,
        totalTaxSavings: 50000,
        netBenefit: 200000,
        metrics: 'Comprehensive annuity metrics calculated',
        analysis: 'Detailed retirement analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your current age and retirement plans',
    'Input existing annuity values and contributions',
    'Specify investment return expectations',
    'Choose annuity type and payout options',
    'Review tax implications and fees',
    'Compare with other retirement strategies'
  ]
};