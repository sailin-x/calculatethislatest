import { Calculator } from '../../../types/calculator';
import { calculateMortgagePayment, generateMortgagePaymentAnalysis } from './formulas';
import { validateMortgagePaymentInputs } from './validation';

export const MortgagePaymentCalculator: Calculator = {
  id: 'mortgage-payment-calculator',
  name: 'Mortgage Payment Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage payments, amortization schedules, and payment breakdowns for various loan types and scenarios.',
  inputs: [
    {
      id: 'loanAmount',
      name: 'Loan Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '250000',
      description: 'Total loan amount in dollars'
    },
    {
      id: 'interestRate',
      name: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 25,
      step: 0.125,
      placeholder: '4.5',
      description: 'Annual interest rate percentage'
    },
    {
      id: 'loanTerm',
      name: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30',
      description: 'Length of loan in years'
    },
    {
      id: 'loanType',
      name: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' },
        { value: 'arm', label: 'Adjustable Rate (ARM)' }
      ],
      placeholder: 'conventional',
      description: 'Type of mortgage loan'
    },
    {
      id: 'downPayment',
      name: 'Down Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '50000',
      description: 'Down payment amount in dollars'
    },
    {
      id: 'downPaymentPercent',
      name: 'Down Payment (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.5,
      placeholder: '20',
      description: 'Down payment as percentage of home price'
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      required: false,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '300000',
      description: 'Total property value'
    },
    {
      id: 'propertyTax',
      name: 'Annual Property Tax',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000',
      description: 'Annual property tax amount'
    },
    {
      id: 'propertyTaxRate',
      name: 'Property Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.01,
      placeholder: '1.2',
      description: 'Property tax rate as percentage of property value'
    },
    {
      id: 'homeInsurance',
      name: 'Annual Home Insurance',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1200',
      description: 'Annual homeowners insurance premium'
    },
    {
      id: 'pmi',
      name: 'PMI Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '0.5',
      description: 'Private mortgage insurance rate'
    },
    {
      id: 'hoaFees',
      name: 'Monthly HOA Fees',
      type: 'number',
      required: false,
      min: 0,
      max: 2000,
      step: 10,
      placeholder: '200',
      description: 'Monthly homeowners association fees'
    },
    {
      id: 'closingCosts',
      name: 'Closing Costs',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '8000',
      description: 'Total closing costs'
    },
    {
      id: 'armInitialRate',
      name: 'ARM Initial Rate (%)',
      type: 'number',
      required: false,
      min: 0.1,
      max: 25,
      step: 0.125,
      placeholder: '3.5',
      description: 'Initial rate for adjustable rate mortgages'
    },
    {
      id: 'armFixedPeriod',
      name: 'ARM Fixed Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '5',
      description: 'Fixed rate period for ARM loans'
    },
    {
      id: 'armMargin',
      name: 'ARM Margin (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.125,
      placeholder: '2.5',
      description: 'Margin added to index rate for ARM adjustments'
    },
    {
      id: 'armCap',
      name: 'ARM Rate Cap (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      step: 0.25,
      placeholder: '2',
      description: 'Maximum rate increase per adjustment period'
    },
    {
      id: 'armLifetimeCap',
      name: 'ARM Lifetime Cap (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 15,
      step: 0.25,
      placeholder: '5',
      description: 'Maximum rate increase over loan lifetime'
    },
    {
      id: 'fhaUpfrontMIP',
      name: 'FHA Upfront MIP (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '1.75',
      description: 'FHA upfront mortgage insurance premium'
    },
    {
      id: 'fhaAnnualMIP',
      name: 'FHA Annual MIP (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 2,
      step: 0.01,
      placeholder: '0.85',
      description: 'FHA annual mortgage insurance premium'
    },
    {
      id: 'vaFundingFee',
      name: 'VA Funding Fee (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      placeholder: '2.3',
      description: 'VA loan funding fee percentage'
    },
    {
      id: 'usdaGuaranteeFee',
      name: 'USDA Guarantee Fee (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 2,
      step: 0.01,
      placeholder: '1',
      description: 'USDA loan guarantee fee percentage'
    },
    {
      id: 'includeTaxes',
      name: 'Include Property Taxes',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include property taxes in payment calculation'
    },
    {
      id: 'includeInsurance',
      name: 'Include Insurance',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include insurance in payment calculation'
    },
    {
      id: 'includePMI',
      name: 'Include PMI',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include private mortgage insurance in payment calculation'
    },
    {
      id: 'includeHOA',
      name: 'Include HOA Fees',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Include HOA fees in payment calculation'
    },
    {
      id: 'amortizationSchedule',
      name: 'Generate Amortization Schedule',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Generate detailed amortization schedule'
    },
    {
      id: 'schedulePeriods',
      name: 'Schedule Periods',
      type: 'number',
      required: false,
      min: 1,
      max: 360,
      step: 1,
      placeholder: '12',
      description: 'Number of periods to show in amortization schedule'
    },
    {
      id: 'extraPayment',
      name: 'Extra Monthly Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 50,
      placeholder: '100',
      description: 'Additional monthly payment amount'
    },
    {
      id: 'lumpSumPayment',
      name: 'Lump Sum Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '10000',
      description: 'One-time lump sum payment'
    },
    {
      id: 'lumpSumMonth',
      name: 'Lump Sum Month',
      type: 'number',
      required: false,
      min: 1,
      max: 360,
      step: 1,
      placeholder: '12',
      description: 'Month to apply lump sum payment'
    },
    {
      id: 'biweeklyPayment',
      name: 'Biweekly Payments',
      type: 'boolean',
      required: false,
      default: false,
      description: 'Use biweekly payment schedule'
    },
    {
      id: 'compareScenarios',
      name: 'Compare Payment Scenarios',
      type: 'boolean',
      required: false,
      default: true,
      description: 'Compare different payment scenarios'
    }
  ],
  outputs: [
    {
      id: 'monthlyPayment',
      name: 'Monthly Payment',
      type: 'number',
      description: 'Principal and interest payment'
    },
    {
      id: 'totalMonthlyPayment',
      name: 'Total Monthly Payment',
      type: 'number',
      description: 'Total payment including taxes, insurance, and fees'
    },
    {
      id: 'totalInterest',
      name: 'Total Interest',
      type: 'number',
      description: 'Total interest paid over loan term'
    },
    {
      id: 'totalCost',
      name: 'Total Cost',
      type: 'number',
      description: 'Total cost including principal, interest, and fees'
    },
    {
      id: 'loanToValue',
      name: 'Loan-to-Value Ratio',
      type: 'number',
      description: 'LTV ratio as percentage'
    },
    {
      id: 'downPaymentAmount',
      name: 'Down Payment Amount',
      type: 'number',
      description: 'Actual down payment amount'
    },
    {
      id: 'downPaymentPercentage',
      name: 'Down Payment Percentage',
      type: 'number',
      description: 'Down payment as percentage of property value'
    },
    {
      id: 'amortizationSchedule',
      name: 'Amortization Schedule',
      type: 'array',
      description: 'Detailed payment schedule'
    },
    {
      id: 'paymentBreakdown',
      name: 'Payment Breakdown',
      type: 'object',
      description: 'Breakdown of monthly payment components'
    },
    {
      id: 'scenarioComparison',
      name: 'Scenario Comparison',
      type: 'object',
      description: 'Comparison of different payment scenarios'
    },
    {
      id: 'affordabilityAnalysis',
      name: 'Affordability Analysis',
      type: 'object',
      description: 'Analysis of payment affordability'
    },
    {
      id: 'costAnalysis',
      name: 'Cost Analysis',
      type: 'object',
      description: 'Detailed cost analysis and breakdown'
    }
  ],
  calculate: (inputs) => {
    return calculateMortgagePayment(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateMortgagePaymentAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Monthly Payment (P&I)',
      formula: 'P = L[c(1 + c)^n]/[(1 + c)^n - 1]',
      description: 'Where P = monthly payment, L = loan amount, c = monthly interest rate, n = total number of payments'
    },
    {
      name: 'Loan-to-Value Ratio',
      formula: 'LTV = (Loan Amount / Property Value) × 100',
      description: 'Percentage of property value financed'
    },
    {
      name: 'Total Interest',
      formula: 'Total Interest = (Monthly Payment × Total Payments) - Loan Amount',
      description: 'Total interest paid over loan term'
    },
    {
      name: 'Amortization',
      formula: 'Principal Payment = Monthly Payment - Interest Payment',
      description: 'Monthly principal reduction'
    }
  ]
};