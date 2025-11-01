import { Calculator } from '../../types/calculator';
import { socialSecurityCalculatorFormula } from './formulas';
import { SocialSecurityCalculatorInputs, SocialSecurityCalculatorResults } from './types';

/**
 * Social Security Benefits Calculator
 * 
 * Features:
 * - Comprehensive benefit calculations
 * - Retirement age optimization
 * - Spousal and survivor benefits
 * - Tax and inflation considerations
 * - Monte Carlo solvency analysis
 * - Professional-grade calculations
 */
export const socialSecurityCalculator: Calculator = {
  id: 'SocialSecurityCalculator',
  title: 'Social Security Benefits Calculator',
  description: 'Comprehensive Social Security benefit calculations with retirement age optimization and solvency analysis',
  category: 'finance',
  subcategory: 'retirement',
  tags: ['social-security', 'retirement', 'benefits', 'government', 'pension', 'income'],
  
  // Input fields
  inputs: [
    {
      id: 'birthYear',
      label: 'Birth Year',
      type: 'number',
      required: true,
      min: 1900,
      max: 2010,
      step: 1,
      placeholder: '1980',
      description: 'Year of birth for benefit calculations'
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '45',
      description: 'Current age in years'
    },
    {
      id: 'plannedRetirementAge',
      label: 'Planned Retirement Age',
      type: 'number',
      required: true,
      min: 62,
      max: 70,
      step: 1,
      placeholder: '67',
      description: 'Age at which you plan to start receiving benefits'
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
      defaultValue: 'male',
      description: 'Gender for life expectancy calculations'
    },
    {
      id: 'currentAnnualEarnings',
      label: 'Current Annual Earnings',
      type: 'number',
      required: true,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '75000',
      description: 'Current annual earnings for benefit calculations'
    },
    {
      id: 'expectedEarningsGrowth',
      label: 'Expected Earnings Growth (%)',
      type: 'number',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.0',
      description: 'Expected annual growth in earnings'
    },
    {
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '22',
      description: 'Number of years until planned retirement'
    },
    {
      id: 'averageIndexedMonthlyEarnings',
      label: 'Average Indexed Monthly Earnings',
      type: 'number',
      required: true,
      min: 0,
      max: 20000,
      step: 100,
      placeholder: '5000',
      description: 'Average indexed monthly earnings (AIME)'
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      defaultValue: 'single',
      description: 'Current marital status'
    },
    {
      id: 'spouseEarnings',
      label: 'Spouse Annual Earnings',
      type: 'number',
      required: false,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '60000',
      description: 'Spouse annual earnings (if married)',
      dependsOn: 'maritalStatus'
    },
    {
      id: 'childrenUnder18',
      label: 'Children Under 18',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 1,
      placeholder: '0',
      description: 'Number of children under 18'
    },
    {
      id: 'disabledChildren',
      label: 'Disabled Children',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 1,
      placeholder: '0',
      description: 'Number of disabled children'
    },
    {
      id: 'benefitType',
      label: 'Benefit Type',
      type: 'select',
      required: true,
      options: [
        { value: 'retirement', label: 'Retirement Benefits' },
        { value: 'spousal', label: 'Spousal Benefits' },
        { value: 'survivor', label: 'Survivor Benefits' },
        { value: 'disability', label: 'Disability Benefits' }
      ],
      defaultValue: 'retirement',
      description: 'Type of Social Security benefits to calculate'
    },
    {
      id: 'includeSpousalBenefits',
      label: 'Include Spousal Benefits',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Calculate spousal benefits if applicable'
    },
    {
      id: 'includeSurvivorBenefits',
      label: 'Include Survivor Benefits',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Calculate survivor benefits if applicable'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation Analysis',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Calculate inflation-adjusted benefits'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'number',
      required: true,
      min: -20,
      max: 50,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    {
      id: 'includeTaxes',
      label: 'Include Tax Analysis',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Calculate after-tax benefits'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '22',
      description: 'Effective tax rate on benefits'
    },
    {
      id: 'optimizeRetirementAge',
      label: 'Optimize Retirement Age',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Find optimal retirement age for maximum benefits'
    },
    {
      id: 'targetMonthlyIncome',
      label: 'Target Monthly Income',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '3000',
      description: 'Target monthly income for optimization',
      dependsOn: 'optimizeRetirementAge'
    },
    {
      id: 'monteCarloSamples',
      label: 'Monte Carlo Samples',
      type: 'number',
      required: false,
      min: 1000,
      max: 100000,
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
        { id: 'primaryInsuranceAmount', label: 'Primary Insurance Amount', type: 'currency' },
        { id: 'fullRetirementAge', label: 'Full Retirement Age', type: 'number' },
        { id: 'fullRetirementBenefit', label: 'Full Retirement Benefit', type: 'currency' },
        { id: 'earlyRetirementBenefit', label: 'Early Retirement Benefit', type: 'currency' },
        { id: 'delayedRetirementBenefit', label: 'Delayed Retirement Benefit', type: 'currency' }
      ]
    },
    {
      id: 'ageBasedBenefits',
      label: 'Age-Based Benefits',
      type: 'object',
      fields: [
        { id: 'age62', label: 'Age 62 Benefit', type: 'currency' },
        { id: 'age65', label: 'Age 65 Benefit', type: 'currency' },
        { id: 'age66', label: 'Age 66 Benefit', type: 'currency' },
        { id: 'age67', label: 'Age 67 Benefit', type: 'currency' },
        { id: 'age70', label: 'Age 70 Benefit', type: 'currency' },
        { id: 'optimalAge', label: 'Optimal Age', type: 'number' },
        { id: 'optimalBenefit', label: 'Optimal Benefit', type: 'currency' }
      ]
    },
    {
      id: 'earningsAnalysis',
      label: 'Earnings Analysis',
      type: 'object',
      fields: [
        { id: 'totalLifetimeEarnings', label: 'Total Lifetime Earnings', type: 'currency' },
        { id: 'averageIndexedMonthlyEarnings', label: 'Average Indexed Monthly Earnings', type: 'currency' },
        { id: 'yearsOfCoverage', label: 'Years of Coverage', type: 'number' },
        { id: 'quartersOfCoverage', label: 'Quarters of Coverage', type: 'number' }
      ]
    },
    {
      id: 'spousalBenefits',
      label: 'Spousal Benefits',
      type: 'object',
      fields: [
        { id: 'spousalBenefit', label: 'Spousal Benefit', type: 'currency' },
        { id: 'combinedBenefits', label: 'Combined Benefits', type: 'currency' },
        { id: 'survivorBenefit', label: 'Survivor Benefit', type: 'currency' }
      ]
    },
    {
      id: 'taxAnalysis',
      label: 'Tax Analysis',
      type: 'object',
      fields: [
        { id: 'taxablePortion', label: 'Taxable Portion', type: 'currency' },
        { id: 'taxFreePortion', label: 'Tax-Free Portion', type: 'currency' },
        { id: 'afterTaxBenefit', label: 'After-Tax Benefit', type: 'currency' }
      ]
    },
    {
      id: 'inflationAnalysis',
      label: 'Inflation Analysis',
      type: 'object',
      fields: [
        { id: 'inflationAdjustedBenefit', label: 'Inflation-Adjusted Benefit', type: 'currency' },
        { id: 'purchasingPower', label: 'Purchasing Power', type: 'percentage' },
        { id: 'realValue', label: 'Real Value', type: 'currency' }
      ]
    },
    {
      id: 'optimizationResults',
      label: 'Optimization Results',
      type: 'object',
      fields: [
        { id: 'optimalRetirementAge', label: 'Optimal Retirement Age', type: 'number' },
        { id: 'optimalMonthlyBenefit', label: 'Optimal Monthly Benefit', type: 'currency' },
        { id: 'optimalAnnualBenefit', label: 'Optimal Annual Benefit', type: 'currency' },
        { id: 'totalLifetimeBenefits', label: 'Total Lifetime Benefits', type: 'currency' },
        { id: 'breakevenAge', label: 'Breakeven Age', type: 'number' }
      ]
    },
    {
      id: 'comparison',
      label: 'Comparison Analysis',
      type: 'object',
      fields: [
        { id: 'vsPrivateAnnuity', label: 'vs Private Annuity', type: 'currency' },
        { id: 'vs401kWithdrawal', label: 'vs 401k Withdrawal', type: 'currency' },
        { id: 'vsPension', label: 'vs Pension', type: 'currency' },
        { id: 'replacementRatio', label: 'Replacement Ratio', type: 'percentage' },
        { id: 'adequacyScore', label: 'Adequacy Score', type: 'number' }
      ]
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'object',
      fields: [
        { id: 'probabilityOfSolvency', label: 'Probability of Solvency', type: 'percentage' },
        { id: 'worstCaseScenario', label: 'Worst Case Scenario', type: 'currency' },
        { id: 'bestCaseScenario', label: 'Best Case Scenario', type: 'currency' },
        { id: 'medianScenario', label: 'Median Scenario', type: 'currency' }
      ]
    },
    {
      id: 'summary',
      label: 'Summary',
      type: 'object',
      fields: [
        { id: 'monthlyBenefit', label: 'Monthly Benefit', type: 'currency' },
        { id: 'annualBenefit', label: 'Annual Benefit', type: 'currency' },
        { id: 'lifetimeBenefits', label: 'Lifetime Benefits', type: 'currency' },
        { id: 'benefitAdequacy', label: 'Benefit Adequacy', type: 'number' },
        { id: 'keyRecommendations', label: 'Key Recommendations', type: 'array' }
      ]
    }
  ],

  // Calculator functions
  calculate: socialSecurityCalculatorFormula.calculate,

  // Examples
  examples: [
    {
      title: 'Basic Retirement Benefits',
      description: 'Standard retirement benefit calculation',
      inputs: {
        birthYear: 1980,
        currentAge: 45,
        plannedRetirementAge: 67,
        gender: 'male',
        currentAnnualEarnings: 75000,
        expectedEarningsGrowth: 3.0,
        yearsToRetirement: 22,
        averageIndexedMonthlyEarnings: 5000,
        maritalStatus: 'single',
        benefitType: 'retirement',
        inflationRate: 2.5,
        taxRate: 22
      }
    },
    {
      title: 'Married Couple with Spousal Benefits',
      description: 'Retirement benefits including spousal benefits',
      inputs: {
        birthYear: 1975,
        currentAge: 50,
        plannedRetirementAge: 66,
        gender: 'male',
        currentAnnualEarnings: 85000,
        expectedEarningsGrowth: 2.5,
        yearsToRetirement: 16,
        averageIndexedMonthlyEarnings: 6000,
        maritalStatus: 'married',
        spouseEarnings: 60000,
        includeSpousalBenefits: true,
        benefitType: 'retirement',
        inflationRate: 2.5,
        taxRate: 24
      }
    },
    {
      title: 'Early Retirement with Optimization',
      description: 'Early retirement with age optimization',
      inputs: {
        birthYear: 1985,
        currentAge: 40,
        plannedRetirementAge: 62,
        gender: 'female',
        currentAnnualEarnings: 65000,
        expectedEarningsGrowth: 3.5,
        yearsToRetirement: 22,
        averageIndexedMonthlyEarnings: 4500,
        maritalStatus: 'single',
        benefitType: 'retirement',
        optimizeRetirementAge: true,
        targetMonthlyIncome: 2500,
        inflationRate: 2.5,
        taxRate: 20
      }
    }
  ],

  // Usage instructions
  usageInstructions: [
    'Enter your birth year and current age',
    'Set your planned retirement age (62-70)',
    'Provide your current earnings and expected growth',
    'Enter your average indexed monthly earnings',
    'Select your marital status and include spousal benefits if applicable',
    'Choose the type of benefits to calculate',
    'Include inflation and tax analysis for comprehensive results',
    'Use optimization to find the best retirement age',
    'Review detailed results and recommendations'
  ],

  // Tips and insights
  tips: [
    'Full retirement age varies by birth year (66-67 for most people)',
    'Early retirement reduces benefits by 5/9 of 1% per month for first 36 months',
    'Delayed retirement increases benefits by 2/3 of 1% per month up to age 70',
    'Spousal benefits are 50% of the worker\'s full retirement benefit',
    'Survivor benefits are 100% of the worker\'s benefit',
    'Benefits are indexed for inflation with annual COLA adjustments',
    'Up to 85% of Social Security benefits may be taxable',
    'Consider your life expectancy when choosing retirement age'
  ],

  // Related calculators
  relatedCalculators: [
    'retirement-calculator',
    'annuity-calculator',
    'pension-calculator',
    'LifeInsuranceCalculator',
    '401k-calculator'
  ]
};
