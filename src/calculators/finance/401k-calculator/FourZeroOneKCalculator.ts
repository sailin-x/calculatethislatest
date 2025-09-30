import { Calculator } from '../../../types/calculator';
import { FourZeroOneKInputs, FourZeroOneKResults } from './types';
import { calculateFourZeroOneK, validateFourZeroOneKInputs } from './formulas';
import { getFourZeroOneKValidationRules } from './validation';

export const fourZeroOneKCalculator: Calculator = {
  id: '401k-calculator',
  title: '401(k) Retirement Calculator',
  category: 'finance',
  subcategory: 'Retirement Planning',
  description: 'Comprehensive 401(k) retirement calculator with employer matching, tax analysis, and personalized retirement projections.',
  usageInstructions: [
    'Enter your current age, salary, and retirement goals',
    'Specify your contribution percentage and employer match details',
    'Review projections and adjust for different scenarios',
    'Use recommendations to optimize your retirement savings'
  ],

  inputs: [
    // Personal Information
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '35',
      tooltip: 'Your current age in years',
      defaultValue: 35,
      min: 18,
      max: 100,
      step: 1
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age when you plan to retire',
      defaultValue: 65,
      min: 55,
      max: 100,
      step: 1
    },
    {
      id: 'currentBalance',
      label: 'Current 401(k) Balance',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Current amount in your 401(k) account',
      defaultValue: 50000,
      min: 0,
      max: 10000000,
      step: 1000
    },

    // Salary & Contributions
    {
      id: 'annualSalary',
      label: 'Annual Salary',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Your current annual salary before taxes',
      defaultValue: 75000,
      min: 10000,
      max: 10000000,
      step: 1000
    },
    {
      id: 'employeeContributionPercent',
      label: 'Your Contribution (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Percentage of salary you contribute',
      defaultValue: 6,
      min: 0,
      max: 100,
      step: 0.5
    },
    {
      id: 'employerMatchPercent',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: false,
      placeholder: '50',
      tooltip: 'Percentage of your contribution matched by employer',
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 0.5
    },
    {
      id: 'employerMatchLimit',
      label: 'Employer Match Limit (%)',
      type: 'percentage',
      required: false,
      placeholder: '6',
      tooltip: 'Maximum percentage of salary employer will match',
      defaultValue: 6,
      min: 0,
      max: 100,
      step: 0.5
    },
    {
      id: 'catchUpContributions',
      label: 'Catch-Up Contributions (Age 50+)',
      type: 'boolean',
      required: false,
      tooltip: 'Additional $6,500 annual contribution if age 50 or older',
      defaultValue: false
    },

    // Investment Assumptions
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual investment return (historical average: 7%)',
      defaultValue: 7,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '3',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.1
    },

    // Tax Information
    {
      id: 'currentTaxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your current marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'retirementTaxRate',
      label: 'Retirement Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '20',
      tooltip: 'Expected tax rate in retirement',
      defaultValue: 20,
      min: 0,
      max: 50,
      step: 1
    },

    // Advanced Options
    {
      id: 'contributionIncreaseRate',
      label: 'Annual Contribution Increase (%)',
      type: 'percentage',
      required: false,
      placeholder: '2',
      tooltip: 'Annual increase in contribution percentage',
      defaultValue: 2,
      min: -5,
      max: 10,
      step: 0.5
    },
    {
      id: 'salaryIncreaseRate',
      label: 'Annual Salary Increase (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual salary increase',
      defaultValue: 3,
      min: 0,
      max: 10,
      step: 0.5
    },
    {
      id: 'fees',
      label: 'Annual Fees (%)',
      type: 'percentage',
      required: false,
      placeholder: '0.5',
      tooltip: 'Annual fees and expenses',
      defaultValue: 0.5,
      min: 0,
      max: 5,
      step: 0.1
    }
  ],

  outputs: [
    // Current Status
    {
      id: 'currentBalance',
      label: 'Current Balance',
      type: 'currency',
      explanation: 'Your current 401(k) balance'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'currency',
      explanation: 'Your monthly contribution amount'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution',
      type: 'currency',
      explanation: 'Your annual contribution amount'
    },
    {
      id: 'employerMatch',
      label: 'Monthly Employer Match',
      type: 'currency',
      explanation: 'Monthly employer matching contribution'
    },

    // Projections
    {
      id: 'projectedBalance',
      label: 'Projected Balance at Retirement',
      type: 'currency',
      explanation: 'Estimated balance at retirement age'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount you will contribute'
    },
    {
      id: 'totalEmployerMatch',
      label: 'Total Employer Match',
      type: 'currency',
      explanation: 'Total employer matching contributions'
    },
    {
      id: 'totalInvestmentGrowth',
      label: 'Investment Growth',
      type: 'currency',
      explanation: 'Total growth from investments'
    },

    // Retirement Income
    {
      id: 'monthlyRetirementIncome',
      label: 'Monthly Retirement Income',
      type: 'currency',
      explanation: 'Monthly income from 401(k) (4% withdrawal)'
    },
    {
      id: 'annualRetirementIncome',
      label: 'Annual Retirement Income',
      type: 'currency',
      explanation: 'Annual income from 401(k) (4% withdrawal)'
    },
    {
      id: 'retirementIncomeReplacement',
      label: 'Income Replacement (%)',
      type: 'percentage',
      explanation: 'Percentage of pre-retirement income replaced'
    },

    // Tax Analysis
    {
      id: 'taxDeferredAmount',
      label: 'Tax-Deferred Amount',
      type: 'currency',
      explanation: 'Total amount saved in taxes through deferral'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Estimated tax savings from contributions'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      explanation: 'Average tax rate on retirement withdrawals'
    },

    // Growth Breakdown
    {
      id: 'contributionGrowth',
      label: 'From Your Contributions',
      type: 'currency',
      explanation: 'Growth from your contributions'
    },
    {
      id: 'employerMatchGrowth',
      label: 'From Employer Match',
      type: 'currency',
      explanation: 'Growth from employer matching contributions'
    },
    {
      id: 'investmentGrowth',
      label: 'From Investment Returns',
      type: 'currency',
      explanation: 'Growth from investment returns'
    },

    // Risk Analysis
    {
      id: 'requiredMonthlyContribution',
      label: 'Required Monthly Contribution',
      type: 'currency',
      explanation: 'Monthly contribution needed to reach target'
    },
    {
      id: 'shortfallAmount',
      label: 'Retirement Shortfall',
      type: 'currency',
      explanation: 'Amount short of retirement target'
    },
    {
      id: 'yearsToReachTarget',
      label: 'Years to Reach Target',
      type: 'number',
      explanation: 'Years needed with current contributions'
    },

    // Scenario Analysis
    {
      id: 'conservativeProjection',
      label: 'Conservative Projection (4%)',
      type: 'currency',
      explanation: 'Projection with 4% annual return'
    },
    {
      id: 'moderateProjection',
      label: 'Moderate Projection (6%)',
      type: 'currency',
      explanation: 'Projection with 6% annual return'
    },
    {
      id: 'aggressiveProjection',
      label: 'Aggressive Projection (8%)',
      type: 'currency',
      explanation: 'Projection with 8% annual return'
    },

    // Recommendations
    {
      id: 'recommendedContributionIncrease',
      label: 'Recommended Contribution Increase (%)',
      type: 'percentage',
      explanation: 'Suggested increase in contribution percentage'
    },
    {
      id: 'catchUpContributionAmount',
      label: 'Catch-Up Contribution Amount',
      type: 'currency',
      explanation: 'Additional contribution if age 50+'
    },
    {
      id: 'investmentStrategy',
      label: 'Investment Strategy Recommendation',
      type: 'text',
      explanation: 'Recommended investment approach'
    },
    {
      id: 'taxOptimizationTips',
      label: 'Tax Optimization Tips',
      type: 'text',
      explanation: 'Tips for tax-efficient retirement planning'
    },

    // Milestone Projections
    {
      id: 'balanceAtAge50',
      label: 'Balance at Age 50',
      type: 'currency',
      explanation: 'Projected balance when you turn 50'
    },
    {
      id: 'balanceAtAge60',
      label: 'Balance at Age 60',
      type: 'currency',
      explanation: 'Projected balance when you turn 60'
    },
    {
      id: 'balanceAtAge70',
      label: 'Balance at Age 70',
      type: 'currency',
      explanation: 'Projected balance when you turn 70'
    },

    // Withdrawal Analysis
    {
      id: 'requiredMinimumDistribution',
      label: 'Required Minimum Distribution (Age 73)',
      type: 'currency',
      explanation: 'Annual withdrawal required by IRS'
    },
    {
      id: 'sustainableWithdrawalRate',
      label: 'Sustainable Withdrawal Rate (%)',
      type: 'percentage',
      explanation: 'Safe annual withdrawal percentage'
    },
    {
      id: 'longevityRisk',
      label: 'Longevity Risk Assessment',
      type: 'text',
      explanation: 'Risk of outliving your savings'
    },

    // Comparison Metrics
    {
      id: 'vsTargetBalance',
      label: 'vs Target Balance (%)',
      type: 'percentage',
      explanation: 'Comparison to recommended retirement savings'
    },
    {
      id: 'vsAverageRetirement',
      label: 'vs Average Retirement Savings (%)',
      type: 'percentage',
      explanation: 'Comparison to average retirement savings'
    },
    {
      id: 'percentileRanking',
      label: 'Percentile Ranking',
      type: 'text',
      explanation: 'How you compare to others in your age group'
    }
  ],

  formulas: [],

  validationRules: getFourZeroOneKValidationRules(),

  examples: [
    {
      title: 'Young Professional Starting Out',
      description: '28-year-old professional with moderate salary and good employer match',
      inputs: {
        currentAge: 28,
        retirementAge: 65,
        currentBalance: 15000,
        annualSalary: 65000,
        employeeContributionPercent: 6,
        employerMatchPercent: 50,
        employerMatchLimit: 6,
        catchUpContributions: false,
        expectedAnnualReturn: 7,
        inflationRate: 3,
        currentTaxRate: 24,
        retirementTaxRate: 20
      },
      expectedOutputs: {
        projectedBalance: 1250000,
        monthlyRetirementIncome: 4167,
        retirementIncomeReplacement: 77,
        totalContributions: 468000,
        totalEmployerMatch: 117000
      }
    },
    {
      title: 'Mid-Career Professional',
      description: '42-year-old with higher salary and established savings',
      inputs: {
        currentAge: 42,
        retirementAge: 65,
        currentBalance: 200000,
        annualSalary: 95000,
        employeeContributionPercent: 8,
        employerMatchPercent: 75,
        employerMatchLimit: 8,
        catchUpContributions: false,
        expectedAnnualReturn: 7,
        inflationRate: 3,
        currentTaxRate: 28,
        retirementTaxRate: 22
      },
      expectedOutputs: {
        projectedBalance: 1850000,
        monthlyRetirementIncome: 6167,
        retirementIncomeReplacement: 78,
        totalContributions: 552000,
        totalEmployerMatch: 138000
      }
    },
    {
      title: 'Pre-Retirement Planning',
      description: '55-year-old maximizing catch-up contributions',
      inputs: {
        currentAge: 55,
        retirementAge: 65,
        currentBalance: 500000,
        annualSalary: 85000,
        employeeContributionPercent: 10,
        employerMatchPercent: 50,
        employerMatchLimit: 10,
        catchUpContributions: true,
        expectedAnnualReturn: 6,
        inflationRate: 3,
        currentTaxRate: 26,
        retirementTaxRate: 18
      },
      expectedOutputs: {
        projectedBalance: 1100000,
        monthlyRetirementIncome: 3667,
        retirementIncomeReplacement: 52,
        totalContributions: 340000,
        totalEmployerMatch: 85000
      }
    }
  ]
};