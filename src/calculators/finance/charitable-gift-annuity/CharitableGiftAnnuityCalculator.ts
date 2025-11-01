import { Calculator } from '../../types/calculator';
import { CharitableGiftAnnuityInputs, CharitableGiftAnnuityOutputs } from './types';
import { calculateCharitableGiftAnnuity } from './formulas';
import { validateCharitableGiftAnnuityInputs } from './validation';

export const CharitableGiftAnnuityCalculator: Calculator = {
  id: 'CharitableGiftAnnuity-calculator',
  title: 'Charitable Gift Annuity Calculator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate the tax benefits and annuity payments from charitable gift annuities. Analyze the financial and philanthropic impact of donating assets for guaranteed income.',

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
      id: 'annuityAge',
      label: 'Annuity Start Age',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '65',
      tooltip: 'Age when annuity payments begin'
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

    // Gift Information
    {
      id: 'giftAmount',
      label: 'Gift Amount ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      tooltip: 'Amount being donated'
    },
    {
      id: 'giftType',
      label: 'Gift Type',
      type: 'select',
      required: true,
      options: [
        { value: 'cash', label: 'Cash' },
        { value: 'securities', label: 'Securities' },
        { value: 'real_estate', label: 'Real Estate' },
        { value: 'other_appreciated_property', label: 'Other Appreciated Property' }
      ],
      placeholder: 'cash',
      tooltip: 'Type of asset being donated'
    },
    {
      id: 'fairMarketValue',
      label: 'Fair Market Value ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      tooltip: 'Current market value of the asset'
    },
    {
      id: 'costBasis',
      label: 'Cost Basis ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      tooltip: 'Original cost of the asset'
    },

    // Annuity Information
    {
      id: 'annuityRate',
      label: 'Annuity Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      step: 0.1,
      placeholder: '5.5',
      tooltip: 'Annual annuity payment rate'
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi_annual', label: 'Semi-Annual' },
        { value: 'annual', label: 'Annual' }
      ],
      placeholder: 'annual',
      tooltip: 'How often payments are made'
    },
    {
      id: 'annuityType',
      label: 'Annuity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate' },
        { value: 'deferred', label: 'Deferred' }
      ],
      placeholder: 'immediate',
      tooltip: 'When payments begin'
    },
    {
      id: 'deferralPeriod',
      label: 'Deferral Period (years)',
      type: 'number',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '5',
      tooltip: 'Years to defer payments (for deferred annuities)'
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
      label: 'Expected Investment Return (%)',
      type: 'percentage',
      required: true,
      min: 2,
      max: 15,
      step: 0.5,
      placeholder: '7',
      tooltip: 'Expected return if not donating'
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

    // Charitable Organization
    {
      id: 'charityType',
      label: 'Charity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'public_charity', label: 'Public Charity' },
        { value: 'private_foundation', label: 'Private Foundation' },
        { value: 'university', label: 'University' },
        { value: 'hospital', label: 'Hospital' },
        { value: 'church', label: 'Church' }
      ],
      placeholder: 'public_charity',
      tooltip: 'Type of charitable organization'
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
    { id: 'annualPayment', label: 'Annual Payment', type: 'currency', explanation: 'Annual annuity payment amount' },
    { id: 'netPresentValue', label: 'Net Present Value', type: 'currency', explanation: 'Present value of annuity vs. cost' },
    { id: 'breakevenPeriod', label: 'Breakeven Period', type: 'number', explanation: 'Years to recover tax benefits' },
    { id: 'totalPayments', label: 'Total Payments', type: 'currency', explanation: 'Total annuity payments over lifetime' },
    { id: 'capitalGainsTaxSavings', label: 'Capital Gains Tax Savings', type: 'currency', explanation: 'Tax savings on capital gains' },
    { id: 'internalRateOfReturn', label: 'Internal Rate of Return', type: 'percentage', explanation: 'Overall return on charitable gift' },
    { id: 'alternativeInvestmentValue', label: 'Alternative Investment Value', type: 'currency', explanation: 'Value if invested instead' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive strategy analysis' }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Retirement Charitable Gift',
      description: '65YearOld donor contributing $100K for immediate annuity',
      inputs: {
        donorAge: 65,
        annuityAge: 65,
        lifeExpectancy: 85,
        filingStatus: 'single',
        giftAmount: 100000,
        giftType: 'cash',
        fairMarketValue: 100000,
        costBasis: 100000,
        annuityRate: 5.5,
        paymentFrequency: 'annual',
        annuityType: 'immediate',
        marginalTaxRate: 32,
        stateTaxRate: 6,
        capitalGainsTaxRate: 15,
        includeStateTaxes: true,
        expectedReturn: 7,
        inflationRate: 2.5,
        discountRate: 5,
        charityType: 'public_charity',
        analysisPeriod: 20,
        survivorBenefit: false,
        taxAdvantaged: true,
        currency: 'USD'
      },
      expectedOutputs: {
        taxDeduction: 32000,
        annualPayment: 5500,
        netPresentValue: 15000,
        breakevenPeriod: 6,
        totalPayments: 110000,
        capitalGainsTaxSavings: 0,
        internalRateOfReturn: 6.2,
        alternativeInvestmentValue: 386355,
        analysis: 'Comprehensive charitable gift annuity analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your personal information and gift details',
    'Specify annuity terms and payment preferences',
    'Input your tax rates and financial expectations',
    'Review the comprehensive analysis and recommendations'
  ]
};