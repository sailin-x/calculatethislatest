import { Calculator } from '../../../types/calculator';
import { RetirementAbroadInputs, RetirementAbroadOutputs } from './types';
import { calculateRetirementAbroad } from './formulas';
import { validateRetirementAbroadInputs, validateRetirementAbroadBusinessRules } from './validation';

export const RetirementAbroadCalculator: Calculator = {
  id: 'RetirementAbroadCalculator',
  title: 'Retirement Abroad Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Plan your retirement abroad by comparing costs of living, calculating required savings, and assessing feasibility across different countries.',
  usageInstructions: [
    'Enter your current income and expenses',
    'Select target and current countries',
    'Input expected rates and time to retirement',
    'Enter detailed cost breakdowns',
    'Review feasibility score and recommendations'
  ],

  inputs: [
    {
      id: 'currentAnnualIncome',
      label: 'Current Annual Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Your current gross annual income'
    },
    {
      id: 'currentAnnualExpenses',
      label: 'Current Annual Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Your current annual living expenses'
    },
    {
      id: 'targetCountry',
      label: 'Target Country',
      type: 'select',
      required: true,
      options: [
        { value: 'Mexico', label: 'Mexico' },
        { value: 'Portugal', label: 'Portugal' },
        { value: 'Spain', label: 'Spain' },
        { value: 'Thailand', label: 'Thailand' },
        { value: 'Malaysia', label: 'Malaysia' },
        { value: 'Costa Rica', label: 'Costa Rica' },
        { value: 'Panama', label: 'Panama' },
        { value: 'Ecuador', label: 'Ecuador' },
        { value: 'Colombia', label: 'Colombia' },
        { value: 'Vietnam', label: 'Vietnam' },
        { value: 'Indonesia', label: 'Indonesia' },
        { value: 'Philippines', label: 'Philippines' },
        { value: 'Brazil', label: 'Brazil' },
        { value: 'Argentina', label: 'Argentina' },
        { value: 'Chile', label: 'Chile' },
        { value: 'Uruguay', label: 'Uruguay' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Australia', label: 'Australia' },
        { value: 'New Zealand', label: 'New Zealand' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Germany', label: 'Germany' },
        { value: 'France', label: 'France' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Japan', label: 'Japan' },
        { value: 'South Korea', label: 'South Korea' },
        { value: 'Singapore', label: 'Singapore' },
        { value: 'Hong Kong', label: 'Hong Kong' },
        { value: 'UAE', label: 'UAE' },
        { value: 'Turkey', label: 'Turkey' }
      ],
      tooltip: 'Country where you plan to retire'
    },
    {
      id: 'currentCountry',
      label: 'Current Country',
      type: 'select',
      required: true,
      options: [
        { value: 'United States', label: 'United States' },
        { value: 'Canada', label: 'Canada' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Germany', label: 'Germany' },
        { value: 'France', label: 'France' },
        { value: 'Japan', label: 'Japan' },
        { value: 'Other', label: 'Other' }
      ],
      tooltip: 'Country where you currently live'
    },
    {
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Number of years until you plan to retire'
    },
    {
      id: 'expectedInflationRate',
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
      id: 'expectedInvestmentReturn',
      label: 'Expected Investment Return (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 50,
      step: 0.1,
      defaultValue: 7,
      tooltip: 'Expected annual return on investments'
    },
    {
      id: 'currentSavings',
      label: 'Current Savings ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current retirement savings balance'
    },
    {
      id: 'monthlyRetirementContribution',
      label: 'Monthly Retirement Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly amount you plan to save for retirement'
    },
    {
      id: 'healthcareCosts',
      label: 'Annual Healthcare Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual healthcare expenses in retirement'
    },
    {
      id: 'housingCosts',
      label: 'Annual Housing Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual housing expenses (rent/mortgage, utilities, etc.)'
    },
    {
      id: 'transportationCosts',
      label: 'Annual Transportation Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual transportation expenses'
    },
    {
      id: 'foodCosts',
      label: 'Annual Food Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual food and dining expenses'
    },
    {
      id: 'entertainmentCosts',
      label: 'Annual Entertainment Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual entertainment and leisure expenses'
    },
    {
      id: 'taxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Your current effective tax rate'
    },
    {
      id: 'exchangeRate',
      label: 'Exchange Rate (Target Currency per USD)',
      type: 'number',
      required: true,
      min: 0.01,
      step: 0.01,
      defaultValue: 1,
      tooltip: 'Exchange rate between USD and target country currency'
    }
  ],

  outputs: [
    {
      id: 'totalSavingsAtRetirement',
      label: 'Total Savings at Retirement',
      type: 'currency',
      explanation: 'Projected total retirement savings at retirement date'
    },
    {
      id: 'annualRetirementIncome',
      label: 'Annual Retirement Income',
      type: 'currency',
      explanation: 'Annual income from retirement savings (4% safe withdrawal rate)'
    },
    {
      id: 'annualRetirementExpenses',
      label: 'Annual Retirement Expenses',
      type: 'currency',
      explanation: 'Projected annual expenses in retirement abroad'
    },
    {
      id: 'retirementGap',
      label: 'Annual Retirement Gap',
      type: 'currency',
      explanation: 'Difference between retirement income and expenses'
    },
    {
      id: 'monthlyShortfall',
      label: 'Monthly Shortfall',
      type: 'currency',
      explanation: 'Monthly amount needed to cover expenses'
    },
    {
      id: 'yearsSavingsWillLast',
      label: 'Years Savings Will Last',
      type: 'number',
      explanation: 'Estimated years savings will support retirement lifestyle'
    },
    {
      id: 'requiredMonthlyContribution',
      label: 'Required Monthly Contribution',
      type: 'currency',
      explanation: 'Additional monthly savings needed to close the gap'
    },
    {
      id: 'costOfLivingComparison',
      label: 'Cost of Living Comparison',
      type: 'number',
      explanation: 'Ratio of target country cost of living vs current country'
    },
    {
      id: 'purchasingPowerParity',
      label: 'Purchasing Power Parity',
      type: 'number',
      explanation: 'Adjusted purchasing power in target country'
    },
    {
      id: 'taxSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Potential tax savings from retiring abroad'
    },
    {
      id: 'feasibilityScore',
      label: 'Feasibility Score (0-100)',
      type: 'number',
      explanation: 'Overall feasibility score for retirement abroad plan'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Retiring to Portugal from US',
      description: 'American planning retirement in Portugal with moderate savings',
      inputs: {
        currentAnnualIncome: 80000,
        currentAnnualExpenses: 50000,
        targetCountry: 'Portugal',
        currentCountry: 'United States',
        yearsToRetirement: 15,
        expectedInflationRate: 3,
        expectedInvestmentReturn: 7,
        currentSavings: 200000,
        monthlyRetirementContribution: 1500,
        healthcareCosts: 4000,
        housingCosts: 12000,
        transportationCosts: 3000,
        foodCosts: 8000,
        entertainmentCosts: 6000,
        taxRate: 25,
        exchangeRate: 0.85
      },
      expectedOutputs: {
        totalSavingsAtRetirement: 750000,
        annualRetirementIncome: 30000,
        annualRetirementExpenses: 32000,
        retirementGap: 2000,
        monthlyShortfall: 167,
        yearsSavingsWillLast: 25,
        requiredMonthlyContribution: 100,
        costOfLivingComparison: 0.75,
        purchasingPowerParity: 0.88,
        taxSavings: 5000,
        feasibilityScore: 85
      }
    },
    {
      title: 'Retiring to Thailand from Canada',
      description: 'Canadian planning retirement in Thailand with lower cost of living',
      inputs: {
        currentAnnualIncome: 70000,
        currentAnnualExpenses: 45000,
        targetCountry: 'Thailand',
        currentCountry: 'Canada',
        yearsToRetirement: 10,
        expectedInflationRate: 3.5,
        expectedInvestmentReturn: 6,
        currentSavings: 150000,
        monthlyRetirementContribution: 1200,
        healthcareCosts: 3000,
        housingCosts: 6000,
        transportationCosts: 2000,
        foodCosts: 4000,
        entertainmentCosts: 3000,
        taxRate: 30,
        exchangeRate: 27
      },
      expectedOutputs: {
        totalSavingsAtRetirement: 400000,
        annualRetirementIncome: 16000,
        annualRetirementExpenses: 18000,
        retirementGap: 2000,
        monthlyShortfall: 167,
        yearsSavingsWillLast: 20,
        requiredMonthlyContribution: 150,
        costOfLivingComparison: 0.55,
        purchasingPowerParity: 0.02,
        taxSavings: 8000,
        feasibilityScore: 75
      }
    }
  ]
};