import { Calculator } from '../../types/calculator';
import { TraditionalIRAInputs, TraditionalIRAOutputs } from './types';
import {
  calculateTraditionalIRA,
  generateTraditionalIRAAnalysis
} from './formulas';
import { validateTraditionalIRAInputs, validateTraditionalIRABusinessRules } from './validation';

export const TraditionalIRACalculator: Calculator = {
  id: 'TraditionalIRACalculator',
  title: 'Traditional IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement Planning',
  description: 'Calculate Traditional IRA growth, tax savings, and retirement projections with contribution limits and investment strategies.',
  usageInstructions: [
    'Enter your current IRA balance and contribution amount',
    'Provide your age and retirement goals',
    'Specify expected returns and tax information',
    'Review projected balance and tax savings',
    'Compare different contribution and investment strategies'
  ],

  inputs: [
    {
      id: 'currentBalance',
      label: 'Current IRA Balance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current balance in your Traditional IRA'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 8000,
      tooltip: 'Annual contribution to your Traditional IRA'
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      min: 50,
      max: 100,
      tooltip: 'Age you plan to retire'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: false,
      min: -10,
      max: 30,
      defaultValue: 7,
      step: 0.1,
      tooltip: 'Expected annual return on investments'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: -5,
      max: 15,
      defaultValue: 3,
      step: 0.1,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'taxBracket',
      label: 'Current Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      tooltip: 'Your current marginal tax rate'
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Employer 401(k) match percentage'
    },
    {
      id: 'catchUpContributions',
      label: 'Catch-Up Contributions',
      type: 'boolean',
      required: false,
      tooltip: 'Eligible for $1,000 catch-up contributions (age 50+)'
    },
    {
      id: 'spousalIRA',
      label: 'Spousal IRA',
      type: 'boolean',
      required: false,
      tooltip: 'Contributing to a spousal IRA'
    },
    {
      id: 'spousalIncome',
      label: 'Spousal Annual Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual income of your spouse'
    },
    {
      id: 'investmentStrategy',
      label: 'Investment Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'aggressive', label: 'Aggressive' }
      ],
      tooltip: 'Risk level of your investment approach'
    },
    {
      id: 'contributionFrequency',
      label: 'Contribution Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often you make contributions'
    },
    {
      id: 'taxFilingStatus',
      label: 'Tax Filing Status',
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
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      tooltip: 'Your state income tax rate'
    },
    {
      id: 'yearsUntilRetirement',
      label: 'Years Until Retirement',
      type: 'number',
      required: true,
      min: 0,
      max: 80,
      tooltip: 'Years until you plan to retire'
    }
  ],

  outputs: [
    {
      id: 'projectedBalance',
      label: 'Projected Balance',
      type: 'currency',
      explanation: 'Estimated IRA balance at retirement'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed over time'
    },
    {
      id: 'totalEarnings',
      label: 'Total Earnings',
      type: 'currency',
      explanation: 'Total investment earnings'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Total tax savings from deductible contributions'
    },
    {
      id: 'effectiveReturn',
      label: 'Effective Return (%)',
      type: 'percentage',
      explanation: 'Return after taxes and inflation'
    },
    {
      id: 'requiredMonthlyContribution',
      label: 'Required Monthly Contribution',
      type: 'currency',
      explanation: 'Monthly contribution needed to reach $1M'
    },
    {
      id: 'retirementIncome',
      label: 'Monthly Retirement Income',
      type: 'currency',
      explanation: 'Estimated monthly income in retirement (4% rule)'
    },
    {
      id: 'breakEvenAge',
      label: 'Break-Even Age',
      type: 'number',
      explanation: 'Age when tax benefits exceed costs'
    },
    {
      id: 'riskAdjustedProjection',
      label: 'Risk-Adjusted Projection',
      type: 'currency',
      explanation: 'Projection adjusted for investment risk'
    },
    {
      id: 'contributionSchedule',
      label: 'Contribution Schedule',
      type: 'text',
      explanation: 'Recommended contribution schedule'
    },
    {
      id: 'taxEfficiency',
      label: 'Tax Efficiency (%)',
      type: 'percentage',
      explanation: 'Overall tax efficiency of the IRA'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Early Career Professional',
      description: '25-year-old professional starting IRA contributions',
      inputs: {
        currentBalance: 0,
        annualContribution: 6000,
        currentAge: 25,
        retirementAge: 65,
        expectedReturn: 8,
        inflationRate: 3,
        taxBracket: 24,
        catchUpContributions: false,
        investmentStrategy: 'moderate',
        contributionFrequency: 'annual',
        taxFilingStatus: 'single',
        yearsUntilRetirement: 40
      },
      expectedOutputs: {
        projectedBalance: 1200000,
        totalContributions: 240000,
        totalEarnings: 960000,
        taxSavings: 57600,
        effectiveReturn: 4.0,
        requiredMonthlyContribution: 2000,
        retirementIncome: 4000,
        breakEvenAge: 35,
        riskAdjustedProjection: 1150000,
        contributionSchedule: ['Age 25: $6000.00', 'Age 26: $6000.00'],
        taxEfficiency: 85
      }
    },
    {
      title: 'Mid-Career with Existing Balance',
      description: '40-year-old with existing IRA balance',
      inputs: {
        currentBalance: 150000,
        annualContribution: 7000,
        currentAge: 40,
        retirementAge: 67,
        expectedReturn: 7,
        inflationRate: 2.5,
        taxBracket: 32,
        catchUpContributions: false,
        investmentStrategy: 'moderate',
        contributionFrequency: 'monthly',
        taxFilingStatus: 'married_filing_jointly',
        yearsUntilRetirement: 27
      },
      expectedOutputs: {
        projectedBalance: 850000,
        totalContributions: 189000,
        totalEarnings: 511000,
        taxSavings: 60480,
        effectiveReturn: 3.4,
        requiredMonthlyContribution: 1800,
        retirementIncome: 2833,
        breakEvenAge: 45,
        riskAdjustedProjection: 825000,
        contributionSchedule: ['Age 40: $7000.00', 'Age 41: $7000.00'],
        taxEfficiency: 82
      }
    },
    {
      title: 'Pre-Retirement Catch-Up',
      description: '55-year-old maximizing catch-up contributions',
      inputs: {
        currentBalance: 500000,
        annualContribution: 8000,
        currentAge: 55,
        retirementAge: 70,
        expectedReturn: 6,
        inflationRate: 3,
        taxBracket: 28,
        catchUpContributions: true,
        investmentStrategy: 'conservative',
        contributionFrequency: 'annual',
        taxFilingStatus: 'married_filing_jointly',
        yearsUntilRetirement: 15
      },
      expectedOutputs: {
        projectedBalance: 950000,
        totalContributions: 120000,
        totalEarnings: 330000,
        taxSavings: 33600,
        effectiveReturn: 2.4,
        requiredMonthlyContribution: 1500,
        retirementIncome: 3167,
        breakEvenAge: 58,
        riskAdjustedProjection: 925000,
        contributionSchedule: ['Age 55: $8000.00', 'Age 56: $8000.00'],
        taxEfficiency: 88
      }
    }
  ]
};