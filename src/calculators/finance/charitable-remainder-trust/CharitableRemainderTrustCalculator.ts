import { Calculator } from '../../types/calculator';
import { CharitableRemainderTrustInputs, CharitableRemainderTrustOutputs } from './types';
import { calculateCharitableRemainderTrust } from './formulas';
import { validateCharitableRemainderTrustInputs } from './validation';

export const CharitableRemainderTrustCalculator: Calculator = {
  id: 'CharitableRemainderTrust-calculator',
  title: 'Charitable Remainder Trust Calculator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate the tax benefits and income stream from charitable remainder trusts. Analyze CRT payouts, remainder values, and compare with alternative investment strategies.',

  inputs: [
    // Personal Information
    {
      id: 'donorAge',
      label: 'Donor Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '65',
      tooltip: 'Your current age'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      min: 1,
      max: 120,
      step: 1,
      placeholder: '85',
      tooltip: 'Expected lifespan for calculations'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married_filing_jointly', label: 'Married Filing Jointly' },
        { value: 'married_filing_separately', label: 'Married Filing Separately' },
        { value: 'head_of_household', label: 'Head of Household' }
      ],
      placeholder: 'single',
      tooltip: 'Your tax filing status'
    },

    // Trust Information
    {
      id: 'trustType',
      label: 'Trust Type',
      type: 'select',
      required: true,
      options: [
        { value: 'charitable_remainder_annuity_trust', label: 'Charitable Remainder Annuity Trust (CRAT)' },
        { value: 'charitable_remainder_unitrust', label: 'Charitable Remainder Unitrust (CRUT)' }
      ],
      placeholder: 'charitable_remainder_annuity_trust',
      tooltip: 'Type of charitable remainder trust'
    },
    {
      id: 'trustValue',
      label: 'Trust Value ($)',
      type: 'currency',
      required: true,
      min: 100000,
      max: 10000000,
      step: 10000,
      placeholder: '1000000',
      tooltip: 'Initial value transferred to the trust'
    },
    {
      id: 'payoutRate',
      label: 'Payout Rate (%)',
      type: 'percentage',
      required: true,
      min: 5,
      max: 50,
      step: 0.5,
      placeholder: '6',
      tooltip: 'Annual payout rate from the trust'
    },
    {
      id: 'trustTerm',
      label: 'Trust Term (years)',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      step: 1,
      placeholder: '20',
      tooltip: 'Number of years until remainder goes to charity'
    },

    // Asset Information
    {
      id: 'assetType',
      label: 'Asset Type',
      type: 'select',
      required: true,
      options: [
        { value: 'cash', label: 'Cash' },
        { value: 'securities', label: 'Securities' },
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'business_interests', label: 'Business Interests' },
        { value: 'other_appreciated_property', label: 'Other Appreciated Property' }
      ],
      placeholder: 'securities',
      tooltip: 'Type of asset being transferred'
    },
    {
      id: 'fairMarketValue',
      label: 'Fair Market Value ($)',
      type: 'currency',
      required: true,
      min: 100000,
      max: 10000000,
      step: 10000,
      placeholder: '1000000',
      tooltip: 'Current market value of the asset'
    },
    {
      id: 'costBasis',
      label: 'Cost Basis ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 10000,
      placeholder: '200000',
      tooltip: 'Original cost of the asset'
    },

    // Tax Information
    {
      id: 'marginalTaxRate',
      label: 'Marginal Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '32',
      tooltip: 'Your federal marginal tax rate'
    },
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
      id: 'capitalGainsTaxRate',
      label: 'Capital Gains Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '15',
      tooltip: 'Your capital gains tax rate'
    },
    {
      id: 'includeStateTaxes',
      label: 'Include State Taxes',
      type: 'boolean',
      required: true,
      tooltip: 'Include state tax calculations'
    },

    // Financial Information
    {
      id: 'expectedReturn',
      label: 'Expected Trust Return (%)',
      type: 'percentage',
      required: true,
      min: 2,
      max: 15,
      step: 0.5,
      placeholder: '7',
      tooltip: 'Expected annual return on trust investments'
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
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      step: 0.5,
      placeholder: '5',
      tooltip: 'Rate for present value calculations'
    },

    // Trust Administration
    {
      id: 'trusteeFees',
      label: 'Trustee Fees (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '0.75',
      tooltip: 'Annual trustee fees as percentage of trust value'
    },
    {
      id: 'administrativeCosts',
      label: 'Administrative Costs ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '2000',
      tooltip: 'Annual administrative and maintenance costs'
    },
    {
      id: 'taxPreparationFees',
      label: 'Tax Preparation Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '1000',
      tooltip: 'Annual tax preparation and filing fees'
    },

    // Analysis Parameters
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: true,
      min: 5,
      max: 40,
      step: 1,
      placeholder: '20',
      tooltip: 'Period for financial analysis'
    },
    {
      id: 'survivorBenefit',
      label: 'Include Survivor Benefit',
      type: 'boolean',
      required: true,
      tooltip: 'Include survivor benefit calculations'
    },
    {
      id: 'survivorAge',
      label: 'Survivor Age',
      type: 'number',
      required: false,
      min: 0,
      max: 120,
      step: 1,
      placeholder: '60',
      tooltip: 'Age of survivor for benefit calculations'
    },
    {
      id: 'taxAdvantaged',
      label: 'Tax-Advantaged Account',
      type: 'boolean',
      required: true,
      tooltip: 'Account provides tax advantages'
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
    { id: 'taxDeduction', label: 'Tax Deduction', type: 'currency', explanation: 'Available tax deduction amount' },
    { id: 'annualPayout', label: 'Annual Payout', type: 'currency', explanation: 'Annual trust payout amount' },
    { id: 'netPresentValue', label: 'Net Present Value', type: 'currency', explanation: 'Present value of trust benefits' },
    { id: 'breakevenPeriod', label: 'Breakeven Period', type: 'number', explanation: 'Years to recover tax benefits' },
    { id: 'totalPayouts', label: 'Total Payouts', type: 'currency', explanation: 'Total payouts over analysis period' },
    { id: 'capitalGainsTaxSavings', label: 'Capital Gains Tax Savings', type: 'currency', explanation: 'Tax savings on capital gains' },
    { id: 'internalRateOfReturn', label: 'Internal Rate of Return', type: 'percentage', explanation: 'Overall return on trust investment' },
    { id: 'alternativeInvestmentValue', label: 'Alternative Investment Value', type: 'currency', explanation: 'Value if invested directly' },
    { id: 'remainderValue', label: 'Remainder Value', type: 'currency', explanation: 'Value going to charity' },
    { id: 'charityBenefit', label: 'Charity Benefit', type: 'currency', explanation: 'Total charitable impact' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive trust analysis' }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Retirement CRT Strategy',
      description: '65YearOld donor establishing CRAT with appreciated securities',
      inputs: {
        donorAge: 65,
        lifeExpectancy: 85,
        filingStatus: 'single',
        trustType: 'charitable_remainder_annuity_trust',
        trustValue: 1000000,
        payoutRate: 6,
        trustTerm: 20,
        remainderBeneficiary: 'Local University Foundation',
        assetType: 'securities',
        fairMarketValue: 1000000,
        costBasis: 200000,
        marginalTaxRate: 32,
        stateTaxRate: 6,
        capitalGainsTaxRate: 15,
        includeStateTaxes: true,
        expectedReturn: 7,
        inflationRate: 2.5,
        discountRate: 5,
        trusteeFees: 0.75,
        administrativeCosts: 2000,
        taxPreparationFees: 1000,
        analysisPeriod: 20,
        survivorBenefit: false,
        taxAdvantaged: true,
        currency: 'USD'
      },
      expectedOutputs: {
        taxDeduction: 320000,
        annualPayout: 60000,
        netPresentValue: 150000,
        breakevenPeriod: 5,
        totalPayouts: 1200000,
        capitalGainsTaxSavings: 120000,
        internalRateOfReturn: 8.2,
        alternativeInvestmentValue: 3863550,
        remainderValue: 400000,
        charityBenefit: 400000,
        analysis: 'Comprehensive CRT analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your personal information and trust details',
    'Specify asset information and tax rates',
    'Input trust administration costs',
    'Review the comprehensive analysis and recommendations'
  ]
};