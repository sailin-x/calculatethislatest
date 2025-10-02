import { Calculator } from '../../types/calculator';
import { CoverdellESAInputs, CoverdellESAOutputs } from './types';
import { calculateCoverdellESA } from './formulas';
import { validateCoverdellESAInputs } from './validation';

export const CoverdellESACalculator: Calculator = {
  id: 'coverdell-esa-calculator',
  title: 'Coverdell ESA Calculator',
  category: 'finance',
  subcategory: 'Education',
  description: 'Calculate Coverdell Education Savings Account contributions, tax benefits, and growth projections for education expenses.',

  inputs: [
    // Account Information
    {
      id: 'currentBalance',
      label: 'Current Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '5000',
      tooltip: 'Current account balance'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 4000,
      step: 100,
      placeholder: '2000',
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
      placeholder: 'annually',
      tooltip: 'How often contributions are made'
    },
    {
      id: 'accountAge',
      label: 'Account Age (years)',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      step: 1,
      placeholder: '2',
      tooltip: 'How long the account has been open'
    },

    // Beneficiary Information
    {
      id: 'beneficiaryAge',
      label: 'Beneficiary Age',
      type: 'number',
      required: true,
      min: 0,
      max: 30,
      step: 1,
      placeholder: '10',
      tooltip: 'Age of the beneficiary'
    },
    {
      id: 'relationshipToOwner',
      label: 'Relationship to Owner',
      type: 'select',
      required: true,
      options: [
        { value: 'parent', label: 'Parent' },
        { value: 'grandparent', label: 'Grandparent' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'parent',
      tooltip: 'Relationship to account owner'
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
      placeholder: '6',
      tooltip: 'Expected annual investment return'
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
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.5,
      placeholder: '5',
      tooltip: 'State tax rate'
    },

    // Education Planning
    {
      id: 'yearsUntilEducation',
      label: 'Years Until Education',
      type: 'number',
      required: true,
      min: 0,
      max: 25,
      step: 1,
      placeholder: '8',
      tooltip: 'Years until education begins'
    },
    {
      id: 'expectedEducationCost',
      label: 'Expected Education Cost ($)',
      type: 'currency',
      required: true,
      min: 10000,
      max: 200000,
      step: 5000,
      placeholder: '50000',
      tooltip: 'Expected annual education cost'
    },
    {
      id: 'educationDuration',
      label: 'Education Duration (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 8,
      step: 1,
      placeholder: '4',
      tooltip: 'Expected years of education'
    },

    // Contribution Limits
    {
      id: 'useSpouseAccount',
      label: 'Use Spouse Account',
      type: 'boolean',
      required: true,
      tooltip: 'Whether spouse has separate account'
    },
    {
      id: 'numberOfBeneficiaries',
      label: 'Number of Beneficiaries',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      step: 1,
      placeholder: '1',
      tooltip: 'Number of beneficiaries'
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
      tooltip: 'Period for analysis'
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
    { id: 'projectedBalance', label: 'Projected Balance', type: 'currency', explanation: 'Projected account balance' },
    { id: 'totalTaxSavings', label: 'Total Tax Savings', type: 'currency', explanation: 'Total tax savings from account' },
    { id: 'educationFundingPotential', label: 'Education Funding Potential', type: 'currency', explanation: 'Potential funding for education' },
    { id: 'recommendedAnnualContribution', label: 'Recommended Annual Contribution', type: 'currency', explanation: 'Suggested annual contribution' },
    { id: 'metrics', label: 'Account Metrics', type: 'text', explanation: 'Detailed account metrics' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive account analysis' }
  ],


  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Family Planning for College',
      description: 'A family planning education savings for their 8-year-old child',
      inputs: {
        currentBalance: 5000,
        annualContribution: 2000,
        contributionFrequency: 'annually',
        accountAge: 2,
        beneficiaryAge: 8,
        relationshipToOwner: 'parent',
        expectedReturnRate: 0.06,
        riskTolerance: 'moderate',
        taxBracket: 0.22,
        stateTaxRate: 0.05,
        yearsUntilEducation: 10,
        expectedEducationCost: 50000,
        educationDuration: 4,
        useSpouseAccount: false,
        numberOfBeneficiaries: 1,
        analysisPeriod: 18,
        inflationRate: 0.025,
        includeStateTaxBenefits: true,
        currency: 'USD'
      },
      expectedOutputs: {
        projectedBalance: 35000,
        totalTaxSavings: 2500,
        educationFundingPotential: 35000,
        recommendedAnnualContribution: 2000,
        metrics: 'Comprehensive account metrics calculated',
        analysis: 'Detailed account analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter current account balance and contribution information',
    'Specify beneficiary details and relationship',
    'Input investment expectations and risk tolerance',
    'Enter tax bracket and education planning details',
    'Review projections and tax benefits analysis'
  ]
};