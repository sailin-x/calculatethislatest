import { Calculator } from '../../types/calculator';
import { BackdoorRothIRAInputs, BackdoorRothIRAOutputs } from './types';
import { calculateBackdoorRothIRA } from './formulas';
import { validateBackdoorRothIRAInputs } from './validation';

export const BackdoorRothIRACalculator: Calculator = {
  id: 'BackdoorRothIra-calculator',
  title: 'Backdoor Roth IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement',
  description: 'Calculate the benefits and tax implications of backdoor Roth IRA conversions for high-income earners. Analyze conversion strategies, tax savings, and long-term growth projections.',

  inputs: [
    // Personal Information
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '35',
      tooltip: 'Your current age'
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
    {
      id: 'modifiedAGILimit',
      label: 'Modified AGI Limit ($)',
      type: 'currency',
      required: true,
      min: 100000,
      max: 500000,
      step: 1000,
      placeholder: '140000',
      tooltip: 'Current year MAGI limit for Roth IRA contributions'
    },

    // Account Information
    {
      id: 'traditionalIRABalance',
      label: 'Traditional IRA Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      tooltip: 'Current balance in traditional IRA'
    },
    {
      id: 'rothIRABalance',
      label: 'Roth IRA Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '25000',
      tooltip: 'Current balance in Roth IRA'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 20000,
      step: 500,
      placeholder: '6000',
      tooltip: 'Annual contribution to traditional IRA'
    },
    {
      id: 'conversionAmount',
      label: 'Conversion Amount ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 500000,
      step: 1000,
      placeholder: '25000',
      tooltip: 'Amount to convert from traditional to Roth IRA'
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
      tooltip: 'Your marginal federal tax rate'
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
      id: 'includeStateTaxes',
      label: 'Include State Taxes',
      type: 'boolean',
      required: true,
      tooltip: 'Include state tax calculations'
    },

    // Investment Information
    {
      id: 'expectedReturn',
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

    // Conversion Strategy
    {
      id: 'conversionFrequency',
      label: 'Conversion Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi_annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      placeholder: 'annual',
      tooltip: 'How often to perform conversions'
    },
    {
      id: 'recharacterizationStrategy',
      label: 'Use Recharacterization',
      type: 'boolean',
      required: true,
      tooltip: 'Use recharacterization strategy (no longer available after 2017)'
    },
    {
      id: 'fiveYearRule',
      label: '5-Year Rule Applies',
      type: 'boolean',
      required: true,
      tooltip: 'Whether 5-year holding period applies'
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
      placeholder: '25',
      tooltip: 'Period for analysis and projections'
    },
    {
      id: 'includeRequiredMinimumDistributions',
      label: 'Include RMD Analysis',
      type: 'boolean',
      required: true,
      tooltip: 'Include required minimum distribution calculations'
    },
    {
      id: 'taxAdvantaged',
      label: 'Tax-Advantaged Account',
      type: 'boolean',
      required: true,
      tooltip: 'Account provides tax advantages'
    },

    // Cost Information
    {
      id: 'conversionFees',
      label: 'Conversion Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 500,
      step: 10,
      placeholder: '50',
      tooltip: 'Fees per conversion transaction'
    },
    {
      id: 'accountFees',
      label: 'Annual Account Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '100',
      tooltip: 'Annual account maintenance fees'
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
    { id: 'totalConverted', label: 'Total Converted', type: 'currency', explanation: 'Total amount converted to Roth IRA' },
    { id: 'totalTaxesPaid', label: 'Total Taxes Paid', type: 'currency', explanation: 'Total taxes paid on conversions' },
    { id: 'netBenefit', label: 'Net Benefit', type: 'currency', explanation: 'Net financial benefit of strategy' },
    { id: 'breakevenPeriod', label: 'Breakeven Period', type: 'number', explanation: 'Years to recover conversion costs' },
    { id: 'traditionalIRAFutureValue', label: 'Traditional IRA Future Value', type: 'currency', explanation: 'Projected traditional IRA value' },
    { id: 'rothIRAFutureValue', label: 'Roth IRA Future Value', type: 'currency', explanation: 'Projected Roth IRA value' },
    { id: 'totalTaxSavings', label: 'Total Tax Savings', type: 'currency', explanation: 'Tax savings from Roth IRA' },
    { id: 'internalRateOfReturn', label: 'Internal Rate of Return', type: 'percentage', explanation: 'Overall return on strategy' },
    { id: 'analysis', label: 'Analysis Report', type: 'text', explanation: 'Comprehensive strategy analysis' }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'High-Income Professional Backdoor Roth',
      description: 'Analysis for a 35YearOld professional with $50K traditional IRA balance',
      inputs: {
        currentAge: 35,
        filingStatus: 'single',
        modifiedAGILimit: 140000,
        traditionalIRABalance: 50000,
        rothIRABalance: 25000,
        annualContribution: 6000,
        conversionAmount: 25000,
        marginalTaxRate: 32,
        capitalGainsTaxRate: 15,
        stateTaxRate: 6,
        includeStateTaxes: true,
        expectedReturn: 7,
        inflationRate: 2.5,
        conversionFrequency: 'annual',
        recharacterizationStrategy: false,
        fiveYearRule: true,
        analysisPeriod: 25,
        includeRequiredMinimumDistributions: true,
        taxAdvantaged: true,
        conversionFees: 50,
        accountFees: 100,
        currency: 'USD'
      },
      expectedOutputs: {
        totalConverted: 25000,
        totalTaxesPaid: 9500,
        netBenefit: 45000,
        breakevenPeriod: 8,
        traditionalIRAFutureValue: 285000,
        rothIRAFutureValue: 330000,
        totalTaxSavings: 25000,
        internalRateOfReturn: 8.5,
        analysis: 'Comprehensive backdoor Roth IRA analysis completed'
      }
    }
  ],

  usageInstructions: [
    'Enter your current age and filing status',
    'Input your current IRA balances',
    'Specify the conversion amount and tax rates',
    'Set your expected investment returns',
    'Review the comprehensive analysis and recommendations'
  ]
};