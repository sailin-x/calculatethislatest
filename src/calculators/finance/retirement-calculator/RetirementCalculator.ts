import { Calculator } from '../../../types/calculator';
import { retirementCalculatorFormula } from './formulas';
import { RetirementCalculatorInputs, RetirementCalculatorResults } from './types';

/**
 * Comprehensive Retirement Planning Calculator
 * 
 * Features:
 * - Multiple income sources (savings, Social Security, pension, other)
 * - Inflation adjustment calculations
 * - Healthcare cost projections
 * - Monte Carlo risk analysis
 * - Tax considerations
 * - Comprehensive recommendations
 * - Detailed savings schedule
 */
export const retirementCalculator: Calculator = {
  id: 'retirement-calculator',
  title: 'Retirement Planning Calculator',
  description: 'Comprehensive retirement planning with multiple income sources, inflation adjustment, healthcare costs, and Monte Carlo analysis',
  category: 'finance',
  subcategory: 'retirement',
  tags: ['retirement', 'financial-planning', 'savings', 'social-security', '401k', 'ira', 'pension'],
  
  // Input fields
  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '35',
      description: 'Your current age'
    },
    {
      id: 'retirementAge',
      label: 'Planned Retirement Age',
      type: 'number',
      required: true,
      min: 55,
      max: 85,
      step: 1,
      placeholder: '65',
      description: 'Age when you plan to retire'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      min: 70,
      max: 120,
      step: 1,
      placeholder: '85',
      description: 'Expected life expectancy'
    },
    {
      id: 'currentIncome',
      label: 'Current Annual Income',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '75000',
      description: 'Your current annual income'
    },
    {
      id: 'expectedIncomeGrowth',
      label: 'Expected Income Growth (%)',
      type: 'number',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3',
      description: 'Expected annual income growth rate'
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      description: 'Current savings outside retirement accounts'
    },
    {
      id: 'current401k',
      label: 'Current 401(k) Balance',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      description: 'Current 401(k) account balance'
    },
    {
      id: 'currentIRA',
      label: 'Current IRA Balance',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '25000',
      description: 'Current IRA account balance'
    },
    {
      id: 'otherInvestments',
      label: 'Other Investments',
      type: 'number',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '15000',
      description: 'Other investment account balances'
    },
    {
      id: 'monthly401kContribution',
      label: 'Monthly 401(k) Contribution',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '1500',
      description: 'Monthly contribution to 401(k)'
    },
    {
      id: 'monthlyIRAContribution',
      label: 'Monthly IRA Contribution',
      type: 'number',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '500',
      description: 'Monthly contribution to IRA'
    },
    {
      id: 'otherMonthlyContributions',
      label: 'Other Monthly Contributions',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '200',
      description: 'Other monthly investment contributions'
    },
    {
      id: 'employerMatch',
      label: 'Employer 401(k) Match',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '750',
      description: 'Monthly employer 401(k) match'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '7',
      description: 'Expected annual investment return'
    },
    {
      id: 'inflationRate',
      label: 'Expected Inflation Rate (%)',
      type: 'number',
      required: true,
      min: -10,
      max: 20,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '22',
      description: 'Effective tax rate in retirement'
    },
    {
      id: 'socialSecurityMonthly',
      label: 'Expected Social Security (Monthly)',
      type: 'number',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '2500',
      description: 'Expected monthly Social Security benefit'
    },
    {
      id: 'pensionMonthly',
      label: 'Pension Income (Monthly)',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '0',
      description: 'Expected monthly pension income'
    },
    {
      id: 'otherIncomeMonthly',
      label: 'Other Income (Monthly)',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '0',
      description: 'Other monthly retirement income'
    },
    {
      id: 'desiredRetirementIncome',
      label: 'Desired Annual Retirement Income',
      type: 'number',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '60000',
      description: 'Desired annual income in retirement'
    },
    {
      id: 'retirementIncomeReplacement',
      label: 'Income Replacement Rate (%)',
      type: 'number',
      required: true,
      min: 50,
      max: 150,
      step: 5,
      placeholder: '80',
      description: 'Percentage of current income needed in retirement'
    },
    {
      id: 'healthcareCosts',
      label: 'Annual Healthcare Costs',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '8000',
      description: 'Expected annual healthcare costs in retirement'
    },
    {
      id: 'longTermCareCosts',
      label: 'Annual Long-Term Care Costs',
      type: 'number',
      required: true,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '0',
      description: 'Expected annual long-term care costs'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation Adjustment',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Adjust calculations for inflation'
    },
    {
      id: 'includeTaxes',
      label: 'Include Tax Impact',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Include tax considerations in calculations'
    },
    {
      id: 'includeHealthcare',
      label: 'Include Healthcare Costs',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Include healthcare costs in retirement expenses'
    },
    {
      id: 'includeLongTermCare',
      label: 'Include Long-Term Care',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include long-term care costs'
    },
    {
      id: 'includeSocialSecurity',
      label: 'Include Social Security',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Include Social Security benefits in calculations'
    },
    {
      id: 'monteCarloSamples',
      label: 'Monte Carlo Samples',
      type: 'number',
      required: false,
      min: 1000,
      max: 50000,
      step: 1000,
      placeholder: '10000',
      description: 'Number of Monte Carlo simulation samples'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level (%)',
      type: 'number',
      required: false,
      min: 50,
      max: 99,
      step: 1,
      placeholder: '90',
      description: 'Confidence level for risk analysis'
    }
  ],

  // Output fields
  outputs: [
    {
      id: 'basicCalculation',
      label: 'Basic Calculation',
      type: 'object',
      fields: [
        { id: 'totalSavingsAtRetirement', label: 'Total Savings at Retirement', type: 'currency' },
        { id: 'monthlyRetirementIncome', label: 'Monthly Retirement Income', type: 'currency' },
        { id: 'annualRetirementIncome', label: 'Annual Retirement Income', type: 'currency' },
        { id: 'retirementIncomeGap', label: 'Income Gap', type: 'currency' },
        { id: 'yearsOfRetirement', label: 'Years of Retirement', type: 'number' }
      ]
    },
    {
      id: 'detailedAnalysis',
      label: 'Detailed Analysis',
      type: 'object',
      fields: [
        { id: 'projectedSavings', label: 'Projected Savings', type: 'object' },
        { id: 'retirementIncome', label: 'Retirement Income Sources', type: 'object' },
        { id: 'retirementExpenses', label: 'Retirement Expenses', type: 'object' }
      ]
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'object',
      fields: [
        { id: 'probabilityOfSuccess', label: 'Probability of Success', type: 'percentage' },
        { id: 'worstCaseScenario', label: 'Worst Case Scenario', type: 'currency' },
        { id: 'bestCaseScenario', label: 'Best Case Scenario', type: 'currency' },
        { id: 'medianScenario', label: 'Median Scenario', type: 'currency' },
        { id: 'yearsOfSavings', label: 'Years of Savings', type: 'number' },
        { id: 'shortfallAmount', label: 'Shortfall Amount', type: 'currency' }
      ]
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'object',
      fields: [
        { id: 'requiredMonthlySavings', label: 'Required Monthly Savings', type: 'currency' },
        { id: 'requiredAnnualSavings', label: 'Required Annual Savings', type: 'currency' },
        { id: 'savingsRate', label: 'Savings Rate', type: 'percentage' },
        { id: 'catchUpContributions', label: 'Catch-Up Contributions', type: 'currency' },
        { id: 'retirementAgeAdjustment', label: 'Retirement Age Adjustment', type: 'number' },
        { id: 'incomeReplacementNeeded', label: 'Income Replacement Needed', type: 'currency' }
      ]
    },
    {
      id: 'savingsSchedule',
      label: 'Savings Schedule',
      type: 'table',
      columns: [
        { id: 'age', label: 'Age', type: 'number' },
        { id: 'year', label: 'Year', type: 'number' },
        { id: 'beginningBalance', label: 'Beginning Balance', type: 'currency' },
        { id: 'contributions', label: 'Contributions', type: 'currency' },
        { id: 'investmentReturns', label: 'Investment Returns', type: 'currency' },
        { id: 'endingBalance', label: 'Ending Balance', type: 'currency' },
        { id: 'projectedRetirementIncome', label: 'Projected Retirement Income', type: 'currency' }
      ]
    },
    {
      id: 'summary',
      label: 'Summary',
      type: 'object',
      fields: [
        { id: 'totalContributions', label: 'Total Contributions', type: 'currency' },
        { id: 'totalInvestmentReturns', label: 'Total Investment Returns', type: 'currency' },
        { id: 'finalPortfolioValue', label: 'Final Portfolio Value', type: 'currency' },
        { id: 'monthlyRetirementIncome', label: 'Monthly Retirement Income', type: 'currency' },
        { id: 'retirementReadinessScore', label: 'Retirement Readiness Score', type: 'percentage' },
        { id: 'keyRecommendations', label: 'Key Recommendations', type: 'array' }
      ]
    }
  ],

  // Calculator functions
  calculate: retirementCalculatorFormula.calculate,

  // Examples
  examples: [
    {
      title: 'Early Career Planning',
      description: 'Young professional starting retirement planning',
      inputs: {
        currentAge: 25,
        retirementAge: 65,
        lifeExpectancy: 85,
        currentIncome: 60000,
        expectedIncomeGrowth: 3,
        currentSavings: 10000,
        current401k: 5000,
        currentIRA: 0,
        otherInvestments: 0,
        monthly401kContribution: 1000,
        monthlyIRAContribution: 500,
        otherMonthlyContributions: 200,
        employerMatch: 500,
        expectedReturn: 7,
        inflationRate: 2.5,
        taxRate: 22,
        socialSecurityMonthly: 2500,
        pensionMonthly: 0,
        otherIncomeMonthly: 0,
        desiredRetirementIncome: 60000,
        retirementIncomeReplacement: 80,
        healthcareCosts: 8000,
        longTermCareCosts: 0
      }
    },
    {
      title: 'Mid-Career Assessment',
      description: 'Mid-career professional evaluating retirement readiness',
      inputs: {
        currentAge: 45,
        retirementAge: 65,
        lifeExpectancy: 85,
        currentIncome: 100000,
        expectedIncomeGrowth: 2,
        currentSavings: 50000,
        current401k: 200000,
        currentIRA: 75000,
        otherInvestments: 25000,
        monthly401kContribution: 2000,
        monthlyIRAContribution: 600,
        otherMonthlyContributions: 500,
        employerMatch: 1000,
        expectedReturn: 6.5,
        inflationRate: 2.5,
        taxRate: 24,
        socialSecurityMonthly: 3500,
        pensionMonthly: 0,
        otherIncomeMonthly: 0,
        desiredRetirementIncome: 80000,
        retirementIncomeReplacement: 80,
        healthcareCosts: 10000,
        longTermCareCosts: 5000
      }
    },
    {
      title: 'Pre-Retirement Planning',
      description: 'Near-retirement individual finalizing plans',
      inputs: {
        currentAge: 60,
        retirementAge: 65,
        lifeExpectancy: 85,
        currentIncome: 120000,
        expectedIncomeGrowth: 1,
        currentSavings: 100000,
        current401k: 500000,
        currentIRA: 150000,
        otherInvestments: 100000,
        monthly401kContribution: 2500,
        monthlyIRAContribution: 700,
        otherMonthlyContributions: 1000,
        employerMatch: 1250,
        expectedReturn: 5.5,
        inflationRate: 2.5,
        taxRate: 22,
        socialSecurityMonthly: 4000,
        pensionMonthly: 2000,
        otherIncomeMonthly: 500,
        desiredRetirementIncome: 100000,
        retirementIncomeReplacement: 85,
        healthcareCosts: 12000,
        longTermCareCosts: 10000
      }
    }
  ],

  // Usage instructions
  usageInstructions: [
    'Enter your current age and planned retirement age',
    'Specify your current income and expected growth rate',
    'Input all current savings and investment balances',
    'Set your monthly contribution amounts',
    'Choose realistic investment return and inflation assumptions',
    'Estimate your Social Security and pension benefits',
    'Define your desired retirement income and expenses',
    'Enable advanced options for more detailed analysis',
    'Review the comprehensive results and recommendations'
  ],

  // Tips and insights
  tips: [
    'Start saving early - compound interest works best over longer time periods',
    'Maximize employer 401(k) matches - it\'s free money',
    'Consider catch-up contributions if you\'re 50 or older',
    'Factor in healthcare costs - they can be significant in retirement',
    'Social Security benefits may be reduced in the future',
    'Diversify your retirement income sources',
    'Review and adjust your plan annually',
    'Consider working longer if you\'re behind on savings'
  ],

  // Related calculators
  relatedCalculators: [
    'compound-interest-calculator',
    '401k-calculator',
    'social-security-calculator',
    'investment-return-calculator',
    'savings-goal-calculator'
  ]
};
