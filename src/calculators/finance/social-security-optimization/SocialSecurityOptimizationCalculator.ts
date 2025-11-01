import { Calculator } from '../../../types/calculator';
import { SocialSecurityOptimizationInputs, SocialSecurityOptimizationOutputs } from './types';
import { calculateSocialSecurityOptimization } from './formulas';
import { validateSocialSecurityOptimizationInputs, validateSocialSecurityOptimizationBusinessRules } from './validation';

export const SocialSecurityOptimizationCalculator: Calculator = {
  id: 'SocialSecurityOptimizationCalculator',
  title: 'Social Security Optimization Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Optimize Social Security claiming strategy to maximize lifetime benefits, considering early retirement reductions, delayed retirement credits, and spousal benefits.',
  usageInstructions: [
    'Enter your current age and expected lifespan',
    'Input your Primary Insurance Amount (PIA)',
    'Select filing status and add spouse information if applicable',
    'Review optimal claiming ages and strategy comparisons'
  ],

  inputs: [
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
      label: 'Planned Retirement Age',
      type: 'number',
      required: true,
      min: 55,
      max: 75,
      tooltip: 'Age when you plan to retire from work'
    },
    {
      id: 'spouseCurrentAge',
      label: 'Spouse Current Age',
      type: 'number',
      required: false,
      min: 18,
      max: 100,
      tooltip: 'Spouse current age (if applicable)'
    },
    {
      id: 'spouseRetirementAge',
      label: 'Spouse Retirement Age',
      type: 'number',
      required: false,
      min: 55,
      max: 75,
      tooltip: 'Spouse planned retirement age'
    },
    {
      id: 'primaryInsuranceAmount',
      label: 'Primary Insurance Amount (PIA) ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 4000,
      tooltip: 'Your monthly benefit at full retirement age'
    },
    {
      id: 'spousePrimaryInsuranceAmount',
      label: 'Spouse Primary Insurance Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 4000,
      tooltip: 'Spouse monthly benefit at full retirement age'
    },
    {
      id: 'filingStrategy',
      label: 'Filing Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married_filing_jointly', label: 'Married Filing Jointly' },
        { value: 'married_filing_separately', label: 'Married Filing Separately' }
      ],
      tooltip: 'Your tax filing status'
    },
    {
      id: 'expectedLifespan',
      label: 'Expected Lifespan',
      type: 'number',
      required: true,
      min: 70,
      max: 120,
      defaultValue: 85,
      tooltip: 'Life expectancy for benefit calculations'
    },
    {
      id: 'spouseExpectedLifespan',
      label: 'Spouse Expected Lifespan',
      type: 'number',
      required: false,
      min: 70,
      max: 120,
      tooltip: 'Spouse life expectancy'
    },
    {
      id: 'inflationRate',
      label: 'Expected Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 20,
      step: 0.1,
      defaultValue: 2.5,
      tooltip: 'Annual inflation rate'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      step: 0.1,
      defaultValue: 3,
      tooltip: 'Rate used to discount future benefits'
    },
    {
      id: 'currentSavings',
      label: 'Current Retirement Savings ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current retirement savings balance'
    },
    {
      id: 'monthlyRetirementExpenses',
      label: 'Monthly Retirement Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly expenses in retirement'
    },
    {
      id: 'otherIncomeSources',
      label: 'Monthly Other Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly income from pensions, rentals, etc.'
    },
    {
      id: 'taxBracket',
      label: 'Retirement Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Expected marginal tax rate in retirement'
    }
  ],

  outputs: [
    {
      id: 'optimalClaimingAge',
      label: 'Optimal Claiming Age',
      type: 'number',
      explanation: 'Age that maximizes lifetime benefit value'
    },
    {
      id: 'spouseOptimalClaimingAge',
      label: 'Spouse Optimal Claiming Age',
      type: 'number',
      explanation: 'Optimal claiming age for spouse'
    },
    {
      id: 'monthlyBenefit',
      label: 'Monthly Benefit',
      type: 'currency',
      explanation: 'Monthly benefit amount at optimal claiming age'
    },
    {
      id: 'spouseMonthlyBenefit',
      label: 'Spouse Monthly Benefit',
      type: 'currency',
      explanation: 'Spouse monthly benefit amount'
    },
    {
      id: 'totalLifetimeBenefits',
      label: 'Total Lifetime Benefits',
      type: 'currency',
      explanation: 'Total benefits over expected lifespan'
    },
    {
      id: 'combinedMonthlyBenefit',
      label: 'Combined Monthly Benefit',
      type: 'currency',
      explanation: 'Total monthly benefit for couple'
    },
    {
      id: 'breakEvenAge',
      label: 'Break-Even Age',
      type: 'number',
      explanation: 'Age when delayed claiming breaks even with early claiming'
    },
    {
      id: 'netPresentValue',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of lifetime benefits'
    },
    {
      id: 'benefitIncreasePercentage',
      label: 'Benefit Increase (%)',
      type: 'percentage',
      explanation: 'Percentage increase over full retirement age benefit'
    },
    {
      id: 'yearsToBreakEven',
      label: 'Years to Break Even',
      type: 'number',
      explanation: 'Years needed for delayed claiming to break even'
    },
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Recommended claiming strategy based on calculations'
    },
    {
      id: 'strategyComparison',
      label: 'Strategy Comparison',
      type: 'text',
      explanation: 'Comparison of different claiming strategies'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Single Person Optimization',
      description: '65-year-old single person with $2,000 PIA optimizing claiming strategy',
      inputs: {
        currentAge: 60,
        retirementAge: 65,
        primaryInsuranceAmount: 2000,
        filingStrategy: 'single',
        expectedLifespan: 85,
        inflationRate: 2.5,
        discountRate: 3,
        currentSavings: 500000,
        monthlyRetirementExpenses: 4000,
        otherIncomeSources: 1000,
        taxBracket: 15
      },
      expectedOutputs: {
        optimalClaimingAge: 70,
        monthlyBenefit: 2640,
        totalLifetimeBenefits: 475200,
        breakEvenAge: 77.3,
        netPresentValue: 345000,
        benefitIncreasePercentage: 32,
        yearsToBreakEven: 10.3,
        recommendedStrategy: 'Claim at age 70 for maximum lifetime value (delayed claiming maximizes monthly benefit)'
      }
    },
    {
      title: 'Married Couple Coordination',
      description: 'Both spouses age 62 with different benefit amounts',
      inputs: {
        currentAge: 60,
        retirementAge: 65,
        spouseCurrentAge: 60,
        spouseRetirementAge: 65,
        primaryInsuranceAmount: 1800,
        spousePrimaryInsuranceAmount: 1200,
        filingStrategy: 'married_filing_jointly',
        expectedLifespan: 88,
        spouseExpectedLifespan: 90,
        inflationRate: 2.5,
        discountRate: 3,
        currentSavings: 800000,
        monthlyRetirementExpenses: 5000,
        otherIncomeSources: 1500,
        taxBracket: 20
      },
      expectedOutputs: {
        optimalClaimingAge: 67,
        spouseOptimalClaimingAge: 67,
        monthlyBenefit: 1800,
        spouseMonthlyBenefit: 1200,
        combinedMonthlyBenefit: 1800,
        totalLifetimeBenefits: 410400,
        breakEvenAge: 74.2,
        netPresentValue: 298000,
        benefitIncreasePercentage: 0,
        yearsToBreakEven: 7.2,
        recommendedStrategy: 'Claim at age 67 for maximum lifetime value'
      }
    }
  ]
};