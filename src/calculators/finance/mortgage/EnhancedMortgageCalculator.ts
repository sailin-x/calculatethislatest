import { Calculator } from '../../types/calculator';
import { mortgageCalculatorFormula } from './formulas';
import { getMortgageValidationRules } from './validation';

/**
 * Enhanced mortgage calculator with real-world data integration
 * Automatically fetches current mortgage rates and regional property data
 */
export const enhancedMortgageCalculator: Calculator = {
  id: 'EnhancedMortgageCalculator',
  title: 'Enhanced Mortgage Calculator with Live Data',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Advanced mortgage calculator with real-time interest rates, regional property tax data, and comprehensive loan analysis with industry-standard accuracy.',
  
  usageInstructions: [
    'Enter the home purchase price and your down payment amount',
    'Select your loan type - rates are automatically updated from market data',
    'Choose your state for accurate property tax and insurance estimates',
    'Input the loan term and any additional monthly payments',
    'Review comprehensive analysis with current market conditions',
    'Export results or save calculation for future reference'
  ],

  inputs: [
    {
      id: 'homePrice',
      label: 'Home Purchase Price',
      type: 'currency',
      required: true,
      min: 50000,
      max: 10000000,
      placeholder: '400000',
      tooltip: 'Total purchase price of the home'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: true,
      min: 0,
      placeholder: '80000',
      tooltip: 'Initial down payment amount'
    },
    {
      id: 'downPaymentPercent',
      label: 'Down Payment %',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Down payment as percentage of home price (auto-calculated)'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional (Live Rate)' },
        { value: 'fha', label: 'FHA (Live Rate)' },
        { value: 'va', label: 'VA (Live Rate)' },
        { value: 'usda', label: 'USDA Rural' },
        { value: 'jumbo', label: 'Jumbo (Live Rate)' },
        { value: 'custom', label: 'Custom Rate' }
      ],
      defaultValue: 'conventional',
      tooltip: 'Type of mortgage loan - rates updated from market data'
    },
    {
      id: 'customInterestRate',
      label: 'Custom Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0.1,
      max: 20,
      placeholder: '7.25',
      tooltip: 'Custom interest rate (only if Custom Rate selected)'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'select',
      required: true,
      options: [
        { value: '15', label: '15 years' },
        { value: '20', label: '20 years' },
        { value: '25', label: '25 years' },
        { value: '30', label: '30 years' }
      ],
      defaultValue: '30',
      tooltip: 'Length of the mortgage loan'
    },
    {
      id: 'state',
      label: 'Property State',
      type: 'select',
      required: true,
      options: [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' }
      ],
      defaultValue: 'CA',
      tooltip: 'State where property is located (for tax and insurance estimates)'
    },
    {
      id: 'customPropertyTax',
      label: 'Custom Property Tax (Annual)',
      type: 'currency',
      required: false,
      placeholder: '4400',
      tooltip: 'Override automatic property tax calculation'
    },
    {
      id: 'customInsurance',
      label: 'Custom Home Insurance (Annual)',
      type: 'currency',
      required: false,
      placeholder: '1600',
      tooltip: 'Override automatic insurance calculation'
    },
    {
      id: 'hoaFees',
      label: 'HOA Fees (Monthly)',
      type: 'currency',
      required: false,
      min: 0,
      placeholder: '150',
      tooltip: 'Monthly homeowners association fees'
    },
    {
      id: 'extraPayment',
      label: 'Extra Monthly Payment',
      type: 'currency',
      required: false,
      min: 0,
      placeholder: '200',
      tooltip: 'Additional principal payment each month'
    },
    {
      id: 'includeClosingCosts',
      label: 'Include Closing Costs',
      type: 'boolean',
      required: false,
      defaultValue: true,
      tooltip: 'Include estimated closing costs in analysis'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment (P&I)',
      type: 'currency',
      explanation: 'Principal and interest payment only'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      explanation: 'Including taxes, insurance, PMI, and HOA'
    },
    {
      id: 'currentInterestRate',
      label: 'Current Interest Rate',
      type: 'percentage',
      explanation: 'Live market rate for selected loan type'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      explanation: 'Amount being financed'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest over life of loan'
    },
    {
      id: 'totalCost',
      label: 'Total Cost of Loan',
      type: 'currency',
      explanation: 'Principal plus total interest'
    },
    {
      id: 'pmiAmount',
      label: 'Monthly PMI',
      type: 'currency',
      explanation: 'Private mortgage insurance payment'
    },
    {
      id: 'propertyTax',
      label: 'Monthly Property Tax',
      type: 'currency',
      explanation: 'Based on regional data for your state'
    },
    {
      id: 'homeInsurance',
      label: 'Monthly Home Insurance',
      type: 'currency',
      explanation: 'Based on regional data for your state'
    },
    {
      id: 'closingCosts',
      label: 'Estimated Closing Costs',
      type: 'currency',
      explanation: 'Typical closing costs for this loan'
    },
    {
      id: 'cashToClose',
      label: 'Cash to Close',
      type: 'currency',
      explanation: 'Down payment plus closing costs'
    },
    {
      id: 'payoffDate',
      label: 'Payoff Date',
      type: 'text',
      explanation: 'When loan will be paid off'
    },
    {
      id: 'payoffDateWithExtra',
      label: 'Payoff Date (with extra payments)',
      type: 'text',
      explanation: 'Earlier payoff with extra payments'
    },
    {
      id: 'interestSaved',
      label: 'Interest Saved (extra payments)',
      type: 'currency',
      explanation: 'Interest saved by making extra payments'
    },
    {
      id: 'dataFreshness',
      label: 'Data Freshness',
      type: 'text',
      explanation: 'When market data was last updated'
    },
    {
      id: 'marketTrend',
      label: 'Rate Trend',
      type: 'text',
      explanation: 'Recent interest rate trend'
    }
  ],

  formulas: [mortgageCalculatorFormula],
  validationRules: getMortgageValidationRules(),

  examples: [
    {
      title: 'Conventional Loan with Live Rates',
      description: 'Calculate payments for a $400,000 home with 20% down using current market rates',
      inputs: {
        homePrice: 400000,
        downPayment: 80000,
        loanType: 'conventional',
        loanTerm: '30',
        state: 'CA',
        includeClosingCosts: true
      },
      expectedOutputs: {
        loanAmount: 320000,
        monthlyPayment: 2100,
        totalMonthlyPayment: 2800
      }
    },
    {
      title: 'FHA Loan Analysis',
      description: 'First-time buyer with 3.5% down payment using FHA loan',
      inputs: {
        homePrice: 300000,
        downPayment: 10500,
        loanType: 'fha',
        loanTerm: '30',
        state: 'TX',
        extraPayment: 100
      },
      expectedOutputs: {
        loanAmount: 289500,
        pmiAmount: 241,
        payoffDateWithExtra: '2051'
      }
    },
    {
      title: 'Jumbo Loan with Regional Data',
      description: 'High-value property in expensive market',
      inputs: {
        homePrice: 1200000,
        downPayment: 240000,
        loanType: 'jumbo',
        loanTerm: '30',
        state: 'NY',
        hoaFees: 500
      },
      expectedOutputs: {
        loanAmount: 960000,
        propertyTax: 1240,
        totalMonthlyPayment: 8500
      }
    }
  ],

  // Enhanced features for real-world data integration
  dataIntegration: {
    requiredSources: ['mortgage-rates', 'RegionalPropertyData'],
    refreshInterval: 3600000, // 1 hour
    fallbackBehavior: 'UseCachedOr-default',
    trackCalculations: true
  },

  // Market insights and recommendations
  insights: {
    rateComparison: true,
    affordabilityAnalysis: true,
    refinanceRecommendations: true,
    marketTiming: true
  }
};