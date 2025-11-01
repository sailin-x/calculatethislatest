import { Calculator } from '../../../types/calculator';
import { StretchIRAInputs, StretchIRAOutputs } from './types';
import { calculateStretchIRA } from './formulas';
import { validateStretchIRAInputs, validateStretchIRABusinessRules } from './validation';

export const StretchIRACalculator: Calculator = {
  id: 'StretchIRACalculator',
  title: 'Stretch IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate the benefits of stretching IRA distributions over multiple generations of beneficiaries to minimize taxes and maximize longevity.',
  usageInstructions: [
    'Enter your IRA balance and expected returns',
    'Specify number of beneficiaries and their ages',
    'Choose withdrawal strategy and tax information',
    'Review stretch projections and tax implications'
  ],

  inputs: [
    {
      id: 'initialBalance',
      label: 'Initial IRA Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Current balance in your IRA'
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
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 20,
      step: 0.1,
      defaultValue: 2.5,
      tooltip: 'Annual inflation rate'
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Marginal tax rate on distributions'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
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
      id: 'numberOfBeneficiaries',
      label: 'Number of Beneficiaries',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      tooltip: 'Number of beneficiaries who will inherit the IRA'
    },
    {
      id: 'beneficiaryAges',
      label: 'Beneficiary Ages (comma-separated)',
      type: 'text',
      required: true,
      tooltip: 'Ages of beneficiaries (e.g., 25,30,35)'
    },
    {
      id: 'lifeExpectancyMethod',
      label: 'Life Expectancy Method',
      type: 'select',
      required: true,
      options: [
        { value: 'uniform_lifetime', label: 'Uniform Lifetime Table' },
        { value: 'single_life', label: 'Single Life Expectancy' },
        { value: 'joint_life', label: 'Joint Life Expectancy' }
      ],
      tooltip: 'Method for calculating life expectancy'
    },
    {
      id: 'withdrawalStrategy',
      label: 'Withdrawal Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'required_minimum', label: 'Required Minimum Distributions' },
        { value: 'fixed_percentage', label: 'Fixed Percentage' },
        { value: 'fixed_amount', label: 'Fixed Amount' }
      ],
      tooltip: 'Strategy for annual withdrawals'
    },
    {
      id: 'fixedWithdrawalAmount',
      label: 'Fixed Withdrawal Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Fixed annual withdrawal amount'
    },
    {
      id: 'fixedWithdrawalPercentage',
      label: 'Fixed Withdrawal Percentage (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Fixed percentage of balance to withdraw annually'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      defaultValue: 30,
      tooltip: 'Number of years to project distributions'
    },
    {
      id: 'currentAge',
      label: 'Your Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Your current age'
    }
  ],

  outputs: [
    {
      id: 'totalDistributions',
      label: 'Total Distributions',
      type: 'currency',
      explanation: 'Total amount distributed over the analysis period'
    },
    {
      id: 'totalTaxesPaid',
      label: 'Total Taxes Paid',
      type: 'currency',
      explanation: 'Total taxes paid on distributions'
    },
    {
      id: 'netDistributions',
      label: 'Net Distributions',
      type: 'currency',
      explanation: 'Total distributions after taxes'
    },
    {
      id: 'remainingBalance',
      label: 'Remaining Balance',
      type: 'currency',
      explanation: 'Balance remaining after analysis period'
    },
    {
      id: 'averageAnnualDistribution',
      label: 'Average Annual Distribution',
      type: 'currency',
      explanation: 'Average annual distribution amount'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate (%)',
      type: 'percentage',
      explanation: 'Overall tax rate on distributions'
    },
    {
      id: 'stretchDuration',
      label: 'Stretch Duration (Years)',
      type: 'number',
      explanation: 'Maximum years the IRA can be stretched'
    },
    {
      id: 'beneficiaryAnalysis',
      label: 'Beneficiary Analysis',
      type: 'text',
      explanation: 'Breakdown of distributions by beneficiary'
    },
    {
      id: 'yearByYearProjections',
      label: 'Year-by-Year Projections',
      type: 'text',
      explanation: 'Detailed annual distribution projections'
    },
    {
      id: 'optimizationRecommendations',
      label: 'Optimization Recommendations',
      type: 'text',
      explanation: 'Recommendations for maximizing stretch benefits'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Single Beneficiary Stretch',
      description: 'IRA owner with one young beneficiary maximizing stretch potential',
      inputs: {
        initialBalance: 1000000,
        expectedAnnualReturn: 7,
        inflationRate: 2.5,
        taxBracket: 25,
        filingStatus: 'single',
        numberOfBeneficiaries: 1,
        beneficiaryAges: '25',
        lifeExpectancyMethod: 'single_life',
        withdrawalStrategy: 'required_minimum',
        analysisPeriod: 30,
        currentAge: 65
      },
      expectedOutputs: {
        totalDistributions: 2500000,
        totalTaxesPaid: 625000,
        netDistributions: 1875000,
        remainingBalance: 500000,
        averageAnnualDistribution: 83333,
        effectiveTaxRate: 25,
        stretchDuration: 58.9,
        beneficiaryAnalysis: [],
        yearByYearProjections: [],
        optimizationRecommendations: []
      }
    },
    {
      title: 'Multiple Beneficiaries',
      description: 'IRA with three beneficiaries of different ages',
      inputs: {
        initialBalance: 1500000,
        expectedAnnualReturn: 6,
        inflationRate: 2.5,
        taxBracket: 30,
        filingStatus: 'married_filing_jointly',
        numberOfBeneficiaries: 3,
        beneficiaryAges: '30,35,40',
        lifeExpectancyMethod: 'single_life',
        withdrawalStrategy: 'required_minimum',
        analysisPeriod: 40,
        currentAge: 70
      },
      expectedOutputs: {
        totalDistributions: 3200000,
        totalTaxesPaid: 960000,
        netDistributions: 2240000,
        remainingBalance: 200000,
        averageAnnualDistribution: 80000,
        effectiveTaxRate: 30,
        stretchDuration: 62.1,
        beneficiaryAnalysis: [],
        yearByYearProjections: [],
        optimizationRecommendations: []
      }
    }
  ]
};