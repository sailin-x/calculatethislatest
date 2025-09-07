import { Calculator } from '../../../types/calculator';
import { CollegeSavingsInputs, CollegeSavingsOutputs } from './types';
import { calculateCollegeSavings } from './formulas';
import { validateCollegeSavingsInputs } from './validation';

export const CollegeSavingsCalculator: Calculator = {
  id: 'college-savings-calculator',
  title: 'College Savings Calculator',
  category: 'finance',
  subcategory: 'Education',
  description: 'Plan and track college savings with projections, tax benefits, and investment growth calculations for 529 plans, Coverdell ESAs, and other savings vehicles.',

  inputs: [
    // Child Information
    {
      id: 'childAge',
      label: 'Child Age',
      type: 'number',
      required: true,
      min: 0,
      max: 18,
      step: 1,
      placeholder: '5',
      tooltip: 'Current age of the child'
    },
    {
      id: 'yearsUntilCollege',
      label: 'Years Until College',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      step: 1,
      placeholder: '13',
      tooltip: 'Years until child starts college'
    },

    // Savings Information
    {
      id: 'currentSavings',
      label: 'Current Savings ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '10000',
      tooltip: 'Current amount saved for college'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 5000,
      step: 50,
      placeholder: '200',
      tooltip: 'Monthly amount to contribute'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '2400',
      tooltip: 'Additional annual contribution'
    },
    {
      id: 'oneTimeContributions',
      label: 'One-Time Contributions ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'One-time lump sum contributions'
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

    // College Cost Information
    {
      id: 'expectedCollegeCost',
      label: 'Expected College Cost ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 300000,
      step: 5000,
      placeholder: '50000',
      tooltip: 'Expected annual college cost'
    },
    {
      id: 'yearsInCollege',
      label: 'Years in College',
      type: 'number',
      required: true,
      min: 2,
      max: 8,
      step: 1,
      placeholder: '4',
      tooltip: 'Expected years in college'
    },
    {
      id: 'costIncreaseRate',
      label: 'Cost Increase Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      placeholder: '3',
      tooltip: 'Expected annual increase in college costs'
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
      placeholder: '22',
      tooltip: 'Federal tax bracket'
    },
    {
      id: 'use529Plan',
      label: 'Use 529 Plan',
      type: 'boolean',
      required: true,
      tooltip: 'Whether to use a 529 college savings plan'
    },
    {
      id: 'useCoverdellESA',
      label: 'Use Coverdell ESA',
      type: 'boolean',
      required: true,
      tooltip: 'Whether to use a Coverdell Education Savings Account'
    },

    // Financial Aid Information
    {
      id: 'expectedFinancialAid',
      label: 'Expected Financial Aid ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 200000,
      step: 1000,
      placeholder: '15000',
      tooltip: 'Expected annual financial aid'
    },
    {
      id: 'expectedScholarships',
      label: 'Expected Scholarships ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'Expected annual scholarships'
    },

    // Analysis Parameters
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '18',
      tooltip: 'Period for savings analysis'
    },
    {
      id: 'includeStateTaxBenefits',
      label: 'Include State Tax Benefits',
      type: 'boolean',
      required: true,
      tooltip: 'Include state-specific tax benefits'
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
    { id: 'totalProjectedSavings', label: 'Total Projected Savings', type: 'currency', explanation: 'Total savings at college start' },
    { id: 'projectedShortfall', label: 'Projected Shortfall', type: 'currency', explanation: 'Amount short of college costs' },
    { id: 'recommendedMonthlyContribution', label: 'Recommended Monthly Contribution', type: 'currency', explanation: 'Suggested monthly savings amount' },
    { id: 'yearsToGoal', label: 'Years to Goal', type: 'number', explanation: 'Years needed to reach savings goal' },
    { id: 'metrics', label: 'Savings Metrics', type: 'text', explanation: 'Detailed savings metrics' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive savings analysis' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Middle-Income Family',
      description: 'Family planning for a 5-year-old child with moderate savings goals',
      inputs: {
        childAge: 5,
        childName: 'Emma Johnson',
        yearsUntilCollege: 13,
        currentSavings: 10000,
        monthlyContribution: 200,
        annualContribution: 2400,
        oneTimeContributions: 5000,
        expectedReturnRate: 0.07,
        inflationRate: 0.025,
        riskTolerance: 'moderate',
        expectedCollegeCost: 50000,
        yearsInCollege: 4,
        costIncreaseRate: 0.03,
        taxBracket: 0.22,
        use529Plan: true,
        useCoverdellESA: false,
        expectedFinancialAid: 15000,
        expectedScholarships: 5000,
        analysisPeriod: 18,
        includeStateTaxBenefits: true,
        currency: 'USD'
      },
      expectedOutputs: {
        totalProjectedSavings: 150000,
        projectedShortfall: 25000,
        recommendedMonthlyContribution: 350,
        yearsToGoal: 15,
        metrics: 'Comprehensive savings metrics calculated',
        analysis: 'Detailed savings analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter child information and current age',
    'Input current savings and planned contributions',
    'Specify investment return expectations',
    'Enter expected college costs and duration',
    'Review savings projections and recommendations'
  ]
};