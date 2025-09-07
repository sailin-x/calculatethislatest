import { Calculator } from '../../../types/calculator';
import { DefinedContributionPlanInputs, DefinedContributionPlanOutputs } from './types';
import { calculateDefinedContributionPlan } from './formulas';
import { validateDefinedContributionPlanInputs } from './validation';

export const DefinedContributionPlanCalculator: Calculator = {
  id: 'defined-contribution-plan-calculator',
  title: 'Defined Contribution Plan Calculator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate retirement savings growth, contribution strategies, and withdrawal planning for 401(k), IRA, and other defined contribution plans with comprehensive tax and fee analysis.',

  inputs: [
    // Personal Information
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 80,
      step: 1,
      placeholder: '35',
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
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      min: 70,
      max: 120,
      step: 1,
      placeholder: '90',
      tooltip: 'Expected lifespan for planning'
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      placeholder: 'male',
      tooltip: 'Gender for actuarial calculations'
    },

    // Account Information
    {
      id: 'currentAccountBalance',
      label: 'Current Account Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      tooltip: 'Current retirement account balance'
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
      tooltip: 'Monthly contribution amount'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '2000',
      tooltip: 'Additional annual contribution'
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 5,
      placeholder: '50',
      tooltip: 'Employer matching percentage'
    },
    {
      id: 'employerMatchLimit',
      label: 'Employer Match Limit ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 20000,
      step: 1000,
      placeholder: '6000',
      tooltip: 'Maximum employer match amount'
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
      placeholder: '7',
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
        { value: 'target_date', label: 'Target Date' },
        { value: 'balanced', label: 'Balanced' },
        { value: 'aggressive_growth', label: 'Aggressive Growth' },
        { value: 'conservative', label: 'Conservative' }
      ],
      placeholder: 'target_date',
      tooltip: 'Type of investment strategy'
    },

    // Plan Information
    {
      id: 'planType',
      label: 'Plan Type',
      type: 'select',
      required: true,
      options: [
        { value: '401k', label: '401(k)' },
        { value: '403b', label: '403(b)' },
        { value: '457', label: '457' },
        { value: 'traditional_ira', label: 'Traditional IRA' },
        { value: 'roth_ira', label: 'Roth IRA' },
        { value: 'sep_ira', label: 'SEP IRA' },
        { value: 'simple_ira', label: 'SIMPLE IRA' }
      ],
      placeholder: '401k',
      tooltip: 'Type of retirement plan'
    },
    {
      id: 'contributionLimit',
      label: 'Contribution Limit ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 70000,
      step: 1000,
      placeholder: '23000',
      tooltip: 'Annual contribution limit'
    },
    {
      id: 'catchUpContribution',
      label: 'Catch-Up Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 1000,
      placeholder: '1000',
      tooltip: 'Additional contribution for age 50+'
    },
    {
      id: 'vestingSchedule',
      label: 'Vesting Schedule',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate' },
        { value: 'graded', label: 'Graded' },
        { value: 'cliff', label: 'Cliff' }
      ],
      placeholder: 'immediate',
      tooltip: 'Employer contribution vesting schedule'
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
    {
      id: 'accountType',
      label: 'Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional', label: 'Traditional' },
        { value: 'roth', label: 'Roth' },
        { value: 'non_deductible', label: 'Non-Deductible' }
      ],
      placeholder: 'traditional',
      tooltip: 'Tax treatment of the account'
    },

    // Time Information
    {
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      tooltip: 'Years until retirement'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      tooltip: 'Period for financial analysis'
    },

    // Fees and Expenses
    {
      id: 'annualFees',
      label: 'Annual Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '100',
      tooltip: 'Annual account fees'
    },
    {
      id: 'expenseRatio',
      label: 'Expense Ratio (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '0.5',
      tooltip: 'Fund expense ratio'
    },
    {
      id: 'transactionFees',
      label: 'Transaction Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 500,
      step: 5,
      placeholder: '50',
      tooltip: 'Trading and transaction fees'
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
      id: 'salaryIncreaseRate',
      label: 'Salary Increase Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Expected annual salary increase'
    },

    // Social Security
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
    {
      id: 'socialSecurityStartAge',
      label: 'Social Security Start Age',
      type: 'number',
      required: true,
      min: 62,
      max: 70,
      step: 1,
      placeholder: '67',
      tooltip: 'Age to start Social Security'
    },

    // Withdrawal Strategy
    {
      id: 'withdrawalRate',
      label: 'Withdrawal Rate (%)',
      type: 'percentage',
      required: true,
      min: 2,
      max: 10,
      step: 0.5,
      placeholder: '4',
      tooltip: 'Annual withdrawal rate in retirement'
    },
    {
      id: 'withdrawalStartAge',
      label: 'Withdrawal Start Age',
      type: 'number',
      required: true,
      min: 50,
      max: 100,
      step: 1,
      placeholder: '65',
      tooltip: 'Age to start withdrawals'
    },
    {
      id: 'requiredMinimumDistribution',
      label: 'Required Minimum Distribution',
      type: 'boolean',
      required: true,
      tooltip: 'Subject to RMD rules'
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
    { id: 'projectedRetirementBalance', label: 'Projected Retirement Balance', type: 'currency', explanation: 'Expected account balance at retirement' },
    { id: 'monthlyRetirementIncome', label: 'Monthly Retirement Income', type: 'currency', explanation: 'Monthly income from retirement account' },
    { id: 'annualRetirementIncome', label: 'Annual Retirement Income', type: 'currency', explanation: 'Annual income from retirement account' },
    { id: 'totalValue', label: 'Total Account Value', type: 'currency', explanation: 'Total value including all contributions and growth' },
    { id: 'metrics', label: 'Plan Metrics', type: 'text', explanation: 'Detailed plan performance metrics' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive plan analysis' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '401(k) Retirement Planning',
      description: 'Comprehensive 401(k) retirement plan analysis',
      inputs: {
        currentAge: 35,
        retirementAge: 65,
        lifeExpectancy: 90,
        gender: 'male',
        currentAccountBalance: 50000,
        monthlyContribution: 500,
        annualContribution: 2000,
        employerMatch: 0.5,
        employerMatchLimit: 6000,
        expectedReturnRate: 0.07,
        riskTolerance: 'moderate',
        investmentType: 'target_date',
        planType: '401k',
        contributionLimit: 23000,
        catchUpContribution: 1000,
        vestingSchedule: 'immediate',
        taxBracket: 0.24,
        stateTaxRate: 0.05,
        accountType: 'traditional',
        yearsToRetirement: 30,
        analysisPeriod: 30,
        annualFees: 100,
        expenseRatio: 0.005,
        transactionFees: 50,
        inflationRate: 0.025,
        salaryIncreaseRate: 0.03,
        includeSocialSecurity: true,
        socialSecurityBenefit: 20000,
        socialSecurityStartAge: 67,
        withdrawalRate: 0.04,
        withdrawalStartAge: 65,
        requiredMinimumDistribution: true,
        currency: 'USD'
      },
      expectedOutputs: {
        projectedRetirementBalance: 1250000,
        monthlyRetirementIncome: 4167,
        annualRetirementIncome: 50000,
        totalValue: 1250000,
        metrics: 'Comprehensive plan metrics calculated',
        analysis: 'Detailed retirement analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your current age and retirement goals',
    'Input current account balance and contribution amounts',
    'Specify employer match and plan limits',
    'Choose investment strategy and risk tolerance',
    'Review tax implications and account type options',
    'Analyze retirement income projections',
    'Consider Social Security integration',
    'Evaluate withdrawal strategies and RMD requirements'
  ]
};