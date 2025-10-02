import { Calculator } from '../../types/calculator';
import { FiveTwoNineInputs, FiveTwoNineOutputs } from './types';
import { calculateFiveTwoNine } from './formulas';
import { validateFiveTwoNineInputs } from './validation';

export const FiveTwoNineCollegeSavingsPlanCalculator: Calculator = {
  id: '529-college-savings-plan-calculator',
  title: '529 College Savings Plan Calculator',
  category: 'finance',
  subcategory: 'Education',
  description: 'Calculate college savings projections, tax benefits, and funding strategies for 529 education savings plans. Analyze contributions, investment growth, college cost inflation, and financial aid to optimize your child\'s education funding.',

  inputs: [
    // Personal Information
    {
      id: 'currentAge',
      label: 'Your Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '35',
      tooltip: 'Your current age'
    },
    {
      id: 'childAge',
      label: 'Child\'s Current Age',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 1,
      placeholder: '5',
      tooltip: 'Your child\'s current age'
    },
    {
      id: 'collegeStartAge',
      label: 'College Start Age',
      type: 'number',
      required: true,
      min: 17,
      max: 25,
      step: 1,
      placeholder: '18',
      tooltip: 'Age when child will start college'
    },
    {
      id: 'yearsUntilCollege',
      label: 'Years Until College',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 1,
      placeholder: '13',
      tooltip: 'Years until child starts college'
    },

    // Account Information
    {
      id: 'currentBalance',
      label: 'Current Account Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 500000,
      step: 1000,
      placeholder: '10000',
      tooltip: 'Current balance in 529 account'
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
      tooltip: 'Monthly contribution amount'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 20000,
      step: 500,
      placeholder: '2400',
      tooltip: 'Annual contribution amount'
    },
    {
      id: 'contributionFrequency',
      label: 'Contribution Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      placeholder: 'monthly',
      tooltip: 'How often you plan to contribute'
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
    {
      id: 'investmentStrategy',
      label: 'Investment Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'conservative', label: 'Conservative (Lower Risk)' },
        { value: 'moderate', label: 'Moderate (Balanced)' },
        { value: 'aggressive', label: 'Aggressive (Higher Risk)' }
      ],
      placeholder: 'moderate',
      tooltip: 'Risk level of investment strategy'
    },

    // College Cost Information
    {
      id: 'currentAnnualCost',
      label: 'Current Annual College Cost ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 80000,
      step: 1000,
      placeholder: '25000',
      tooltip: 'Current annual cost of college'
    },
    {
      id: 'costIncreaseRate',
      label: 'College Cost Increase Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '5',
      tooltip: 'Expected annual increase in college costs'
    },
    {
      id: 'yearsOfCollege',
      label: 'Years of College',
      type: 'number',
      required: true,
      min: 1,
      max: 6,
      step: 1,
      placeholder: '4',
      tooltip: 'Number of years child will attend college'
    },
    {
      id: 'collegeType',
      label: 'College Type',
      type: 'select',
      required: true,
      options: [
        { value: 'public_in_state', label: 'Public In-State' },
        { value: 'public_out_state', label: 'Public Out-of-State' },
        { value: 'private', label: 'Private' }
      ],
      placeholder: 'public_in_state',
      tooltip: 'Type of college your child will attend'
    },

    // Tax Information
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '6',
      tooltip: 'Your state income tax rate'
    },
    {
      id: 'federalTaxRate',
      label: 'Federal Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 40,
      step: 1,
      placeholder: '22',
      tooltip: 'Your federal income tax rate'
    },
    {
      id: 'includeStateTaxBenefits',
      label: 'Include State Tax Benefits',
      type: 'boolean',
      required: true,
      tooltip: 'Include state-specific tax benefits'
    },
    {
      id: 'includeFederalTaxBenefits',
      label: 'Include Federal Tax Benefits',
      type: 'boolean',
      required: true,
      tooltip: 'Include federal tax benefits'
    },
    {
      id: 'taxAdvantaged',
      label: 'Tax-Advantaged Account',
      type: 'boolean',
      required: true,
      tooltip: 'Account provides tax advantages'
    },

    // Financial Aid Information
    {
      id: 'expectedAidPercentage',
      label: 'Expected Financial Aid (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 5,
      placeholder: '30',
      tooltip: 'Expected percentage of costs covered by financial aid'
    },
    {
      id: 'scholarshipAmount',
      label: 'Expected Scholarships ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '5000',
      tooltip: 'Expected annual scholarship amount'
    },
    {
      id: 'workStudyAmount',
      label: 'Work-Study Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 500,
      placeholder: '2000',
      tooltip: 'Expected annual work-study earnings'
    },

    // Analysis Parameters
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 5,
      max: 25,
      step: 1,
      placeholder: '18',
      tooltip: 'Period for savings analysis'
    },

    // Cost Information
    {
      id: 'accountFees',
      label: 'Annual Account Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 500,
      step: 10,
      placeholder: '50',
      tooltip: 'Annual account maintenance fees'
    },
    {
      id: 'managementFees',
      label: 'Management Fees (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 3,
      step: 0.1,
      placeholder: '0.5',
      tooltip: 'Annual investment management fees'
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
    { id: 'projectedBalance', label: 'Projected Balance', type: 'currency', explanation: 'Expected account balance at college start' },
    { id: 'futureCollegeCost', label: 'Future College Cost', type: 'currency', explanation: 'Projected total college cost' },
    { id: 'fundingGap', label: 'Funding Gap', type: 'currency', explanation: 'Amount still needed for college' },
    { id: 'totalTaxSavings', label: 'Total Tax Savings', type: 'currency', explanation: 'Tax benefits from contributions' },
    { id: 'totalContributions', label: 'Total Contributions', type: 'currency', explanation: 'Total amount contributed' },
    { id: 'totalGrowth', label: 'Total Growth', type: 'currency', explanation: 'Investment growth over time' },
    { id: 'fundingRatio', label: 'Funding Ratio', type: 'percentage', explanation: 'Percentage of college costs funded' },
    { id: 'conservativeProjection', label: 'Conservative Projection', type: 'currency', explanation: 'Projection with lower return assumptions' },
    { id: 'moderateProjection', label: 'Moderate Projection', type: 'currency', explanation: 'Projection with moderate return assumptions' },
    { id: 'aggressiveProjection', label: 'Aggressive Projection', type: 'currency', explanation: 'Projection with higher return assumptions' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive college savings analysis' }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Planning for 4-Year Public College',
      description: 'Analysis for a family planning to save for their 5-year-old child\'s college education',
      inputs: {
        currentAge: 35,
        childAge: 5,
        collegeStartAge: 18,
        yearsUntilCollege: 13,
        currentBalance: 10000,
        monthlyContribution: 200,
        annualContribution: 2400,
        contributionFrequency: 'monthly',
        expectedAnnualReturn: 7,
        inflationRate: 2.5,
        investmentStrategy: 'moderate',
        currentAnnualCost: 25000,
        costIncreaseRate: 5,
        yearsOfCollege: 4,
        collegeType: 'public_in_state',
        stateTaxRate: 6,
        federalTaxRate: 22,
        includeStateTaxBenefits: true,
        includeFederalTaxBenefits: true,
        taxAdvantaged: true,
        expectedAidPercentage: 30,
        scholarshipAmount: 5000,
        workStudyAmount: 2000,
        analysisPeriod: 13,
        accountFees: 50,
        managementFees: 0.5,
        currency: 'USD'
      },
      expectedOutputs: {
        projectedBalance: 85000,
        futureCollegeCost: 140000,
        fundingGap: 55000,
        totalTaxSavings: 12000,
        totalContributions: 31200,
        totalGrowth: 43800,
        fundingRatio: 60.7,
        conservativeProjection: 65000,
        moderateProjection: 85000,
        aggressiveProjection: 110000,
        analysis: 'Comprehensive college savings analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your current age and child\'s age',
    'Input current college costs and expected increases',
    'Specify your contribution amounts and frequency',
    'Review tax benefits and financial aid expectations',
    'Analyze different scenarios and funding strategies'
  ]
};