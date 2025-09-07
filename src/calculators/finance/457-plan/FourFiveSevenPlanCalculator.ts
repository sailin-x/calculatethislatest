import { Calculator } from '../../../types/calculator';
import { FourFiveSevenInputs, FourFiveSevenOutputs } from './types';
import { calculateFourFiveSeven } from './formulas';
import { validateFourFiveSevenInputs } from './validation';

export const FourFiveSevenPlanCalculator: Calculator = {
  id: '457-plan-calculator',
  title: '457 Plan Calculator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate retirement savings, tax benefits, and growth projections for 457 deferred compensation plans. Analyze contributions, investment returns, and retirement income planning for state and local government employees.',

  inputs: [
    // Personal Information
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '35',
      tooltip: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      min: 55,
      max: 75,
      step: 1,
      placeholder: '65',
      tooltip: 'Age you plan to retire'
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
      tooltip: 'Expected lifespan for planning purposes'
    },

    // Account Information
    {
      id: 'currentBalance',
      label: 'Current Account Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      tooltip: 'Current balance in your 457 account'
    },
    {
      id: 'yearsOfService',
      label: 'Years of Service',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '10',
      tooltip: 'Years of service with current employer'
    },

    // Contribution Information
    {
      id: 'annualSalary',
      label: 'Annual Salary ($)',
      type: 'currency',
      required: true,
      min: 20000,
      max: 500000,
      step: 1000,
      placeholder: '75000',
      tooltip: 'Your current annual salary'
    },
    {
      id: 'employeeContributionPercent',
      label: 'Employee Contribution (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.5,
      placeholder: '6',
      tooltip: 'Percentage of salary you contribute'
    },
    {
      id: 'employerContributionPercent',
      label: 'Employer Contribution (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Percentage employer contributes'
    },
    {
      id: 'catchUpContributions',
      label: 'Catch-Up Contributions (Age 50+)',
      type: 'boolean',
      required: true,
      tooltip: 'Enable additional contributions if age 50 or older'
    },

    // Investment Information
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: 2,
      max: 15,
      step: 0.5,
      placeholder: '7',
      tooltip: 'Expected annual investment return'
    },
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

    // Tax Information
    {
      id: 'currentTaxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '25',
      tooltip: 'Your current marginal tax rate'
    },
    {
      id: 'retirementTaxRate',
      label: 'Retirement Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '20',
      tooltip: 'Expected tax rate in retirement'
    },

    // Plan Rules
    {
      id: 'contributionLimit',
      label: 'Annual Contribution Limit ($)',
      type: 'currency',
      required: true,
      min: 20000,
      max: 50000,
      step: 1000,
      placeholder: '22000',
      tooltip: 'Maximum annual contribution limit'
    },
    {
      id: 'lifetimeLimit',
      label: 'Lifetime Contribution Limit ($)',
      type: 'currency',
      required: true,
      min: 1000000,
      max: 5000000,
      step: 100000,
      placeholder: '1000000',
      tooltip: 'Maximum lifetime contribution limit'
    },
    {
      id: 'vestingSchedule',
      label: 'Vesting Schedule',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate (100%)' },
        { value: 'graded', label: 'Graded (20% per year)' },
        { value: 'cliff', label: 'Cliff (100% after 3 years)' }
      ],
      placeholder: 'graded',
      tooltip: 'How employer contributions vest over time'
    },

    // Analysis Parameters
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 5,
      max: 50,
      step: 1,
      placeholder: '30',
      tooltip: 'Period for retirement analysis'
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
      label: 'Monthly Social Security Benefit ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '2000',
      tooltip: 'Expected monthly Social Security benefit'
    },
    {
      id: 'otherRetirementIncome',
      label: 'Other Retirement Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '10000',
      tooltip: 'Other annual retirement income sources'
    },

    // Withdrawal Strategy
    {
      id: 'withdrawalStrategy',
      label: 'Withdrawal Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed_amount', label: 'Fixed Amount' },
        { value: 'percentage', label: 'Percentage of Balance' },
        { value: 'required_minimum', label: 'Required Minimum Distribution' }
      ],
      placeholder: 'required_minimum',
      tooltip: 'Strategy for withdrawing funds in retirement'
    },
    {
      id: 'annualWithdrawalAmount',
      label: 'Annual Withdrawal Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '40000',
      tooltip: 'Fixed annual withdrawal amount'
    },
    {
      id: 'withdrawalPercentage',
      label: 'Withdrawal Percentage (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '4',
      tooltip: 'Percentage of balance to withdraw annually'
    },

    // Cost Information
    {
      id: 'annualFees',
      label: 'Annual Fees (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '0.5',
      tooltip: 'Annual administrative and investment fees'
    },
    {
      id: 'administrativeFees',
      label: 'Administrative Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '50',
      tooltip: 'Annual administrative fees'
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
      tooltip: 'Currency for calculations and display'
    }
  ],

  outputs: [
    { id: 'projectedBalance', label: 'Projected Balance', type: 'currency', explanation: 'Expected account balance at retirement' },
    { id: 'monthlyRetirementIncome', label: 'Monthly Retirement Income', type: 'currency', explanation: 'Expected monthly income in retirement' },
    { id: 'totalContributions', label: 'Total Contributions', type: 'currency', explanation: 'Total amount contributed over time' },
    { id: 'totalTaxSavings', label: 'Total Tax Savings', type: 'currency', explanation: 'Tax benefits from contributions' },
    { id: 'annualContributions', label: 'Annual Contributions', type: 'currency', explanation: 'Average annual contribution amount' },
    { id: 'totalGrowth', label: 'Total Growth', type: 'currency', explanation: 'Investment growth over time' },
    { id: 'safeWithdrawalRate', label: 'Safe Withdrawal Rate', type: 'percentage', explanation: 'Sustainable withdrawal rate' },
    { id: 'replacementRatio', label: 'Replacement Ratio', type: 'percentage', explanation: 'Retirement income as percentage of pre-retirement income' },
    { id: 'conservativeProjection', label: 'Conservative Projection', type: 'currency', explanation: 'Projection with lower return assumptions' },
    { id: 'moderateProjection', label: 'Moderate Projection', type: 'currency', explanation: 'Projection with moderate return assumptions' },
    { id: 'aggressiveProjection', label: 'Aggressive Projection', type: 'currency', explanation: 'Projection with higher return assumptions' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive retirement analysis' }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'State Government Employee Retirement Planning',
      description: 'Analysis for a 40-year-old state employee planning for retirement at age 65',
      inputs: {
        currentAge: 40,
        retirementAge: 65,
        lifeExpectancy: 90,
        currentBalance: 75000,
        yearsOfService: 15,
        annualSalary: 65000,
        employeeContributionPercent: 7,
        employerContributionPercent: 4,
        catchUpContributions: false,
        expectedAnnualReturn: 7,
        inflationRate: 2.5,
        currentTaxRate: 24,
        retirementTaxRate: 18,
        contributionLimit: 22000,
        lifetimeLimit: 1000000,
        vestingSchedule: 'graded',
        analysisPeriod: 25,
        includeSocialSecurity: true,
        socialSecurityBenefit: 2200,
        otherRetirementIncome: 12000,
        withdrawalStrategy: 'required_minimum',
        annualWithdrawalAmount: 45000,
        withdrawalPercentage: 4,
        annualFees: 0.4,
        administrativeFees: 45,
        currency: 'USD'
      },
      expectedOutputs: {
        projectedBalance: 1200000,
        monthlyRetirementIncome: 5500,
        totalContributions: 350000,
        totalTaxSavings: 70000,
        annualContributions: 14000,
        totalGrowth: 850000,
        safeWithdrawalRate: 4.2,
        replacementRatio: 92.3,
        conservativeProjection: 850000,
        moderateProjection: 1200000,
        aggressiveProjection: 1650000,
        analysis: 'Comprehensive retirement analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your current age and retirement goals',
    'Input your salary and contribution information',
    'Specify investment return expectations',
    'Review tax implications and retirement projections',
    'Analyze different contribution and withdrawal strategies'
  ]
};