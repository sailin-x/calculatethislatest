import { Calculator } from '../../types/calculator';
import { calculateVALoan } from './formulas';
import { generateVALoanAnalysis } from './formulas';

export const VALoanCalculator: Calculator = {
  name: 'VA Loan Calculator',
  category: 'finance',
  description: 'Calculate VA home loan payments, funding fees, and eligibility including veteran benefits and service requirements.',
  
  inputs: {
    purchasePrice: {
      type: 'number',
      label: 'Purchase Price',
      description: 'Total purchase price of the property',
      placeholder: '350000',
      unit: '$',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment',
      description: 'Down payment amount (VA loans allow 0% down)',
      placeholder: '0',
      unit: '$',
      required: true,
      min: 0,
      max: 2000000,
      step: 1000
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate',
      description: 'Annual interest rate on the VA loan',
      placeholder: '6.0',
      unit: '%',
      required: true,
      min: 1,
      max: 15,
      step: 0.125
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term',
      description: 'Length of the loan in years',
      placeholder: '30',
      unit: 'years',
      required: true,
      min: 15,
      max: 30,
      step: 1
    },
    veteranStatus: {
      type: 'select',
      label: 'Veteran Status',
      description: 'Veteran status and service type',
      placeholder: 'Select veteran status',
      required: true,
      options: [
        { value: 'veteran', label: 'Veteran' },
        { value: 'active-duty', label: 'Active Duty' },
        { value: 'reserves', label: 'Reserves/National Guard' },
        { value: 'surviving-spouse', label: 'Surviving Spouse' }
      ]
    },
    serviceYears: {
      type: 'number',
      label: 'Years of Service',
      description: 'Total years of military service',
      placeholder: '4',
      unit: 'years',
      required: true,
      min: 0,
      max: 50,
      step: 0.5
    },
    disabilityRating: {
      type: 'number',
      label: 'Disability Rating',
      description: 'VA disability rating percentage (0-100)',
      placeholder: '0',
      unit: '%',
      required: true,
      min: 0,
      max: 100,
      step: 10
    },
    firstTimeUse: {
      type: 'select',
      label: 'First Time VA Loan',
      description: 'Whether this is the first time using VA loan benefit',
      placeholder: 'Select usage',
      required: true,
      options: [
        { value: 'yes', label: 'Yes - First Time' },
        { value: 'no', label: 'No - Previously Used' }
      ]
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property being purchased',
      placeholder: 'Select property type',
      required: true,
      options: [
        { value: 'single-family', label: 'Single-Family Home' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'condo', label: 'Condominium' },
        { value: 'manufactured', label: 'Manufactured Home' },
        { value: 'new-construction', label: 'New Construction' }
      ]
    },
    propertyLocation: {
      type: 'select',
      label: 'Property Location',
      description: 'Location of the property',
      placeholder: 'Select location type',
      required: true,
      options: [
        { value: 'rural', label: 'Rural Area' },
        { value: 'suburban', label: 'Suburban Area' },
        { value: 'urban', label: 'Urban Area' }
      ]
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age',
      description: 'Age of the property in years',
      placeholder: '15',
      unit: 'years',
      required: true,
      min: 0,
      max: 100,
      step: 1
    },
    propertySize: {
      type: 'number',
      label: 'Property Size',
      description: 'Square footage of the property',
      placeholder: '2200',
      unit: 'sq ft',
      required: true,
      min: 500,
      max: 15000,
      step: 100
    },
    propertyTaxes: {
      type: 'number',
      label: 'Annual Property Taxes',
      description: 'Annual property tax amount',
      placeholder: '4000',
      unit: '$',
      required: true,
      min: 0,
      max: 100000,
      step: 100
    },
    homeownersInsurance: {
      type: 'number',
      label: 'Annual Homeowners Insurance',
      description: 'Annual homeowners insurance premium',
      placeholder: '1500',
      unit: '$',
      required: true,
      min: 0,
      max: 20000,
      step: 100
    },
    monthlyDebts: {
      type: 'number',
      label: 'Monthly Debt Payments',
      description: 'Total monthly debt payments (excluding housing)',
      placeholder: '600',
      unit: '$',
      required: true,
      min: 0,
      max: 15000,
      step: 50
    },
    creditScore: {
      type: 'number',
      label: 'Credit Score',
      description: 'Lowest credit score among all borrowers',
      placeholder: '700',
      unit: 'score',
      required: true,
      min: 500,
      max: 850,
      step: 1
    },
    annualIncome: {
      type: 'number',
      label: 'Annual Household Income',
      description: 'Total annual household income for all borrowers',
      placeholder: '85000',
      unit: '$',
      required: true,
      min: 10000,
      max: 5000000,
      step: 1000
    },
    closingCosts: {
      type: 'number',
      label: 'Closing Costs',
      description: 'Estimated closing costs',
      placeholder: '6000',
      unit: '$',
      required: true,
      min: 0,
      max: 100000,
      step: 100
    },
    prepaidItems: {
      type: 'number',
      label: 'Prepaid Items',
      description: 'Prepaid items (escrow, insurance, etc.)',
      placeholder: '2500',
      unit: '$',
      required: true,
      min: 0,
      max: 50000,
      step: 100
    },
    sellerCredits: {
      type: 'number',
      label: 'Seller Credits',
      description: 'Credits from seller toward closing costs',
      placeholder: '0',
      unit: '$',
      required: true,
      min: 0,
      max: 200000,
      step: 100
    },
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period',
      description: 'Number of years for the analysis',
      placeholder: '30',
      unit: 'years',
      required: true,
      min: 1,
      max: 30,
      step: 1
    }
  },

  outputs: {
    loanAmount: {
      type: 'number',
      label: 'Loan Amount',
      description: 'Total loan amount including funding fee',
      unit: '$'
    },
    monthlyPayment: {
      type: 'number',
      label: 'Monthly Principal & Interest',
      description: 'Monthly principal and interest payment',
      unit: '$'
    },
    monthlyEscrow: {
      type: 'number',
      label: 'Monthly Escrow Payment',
      description: 'Monthly escrow for taxes and insurance',
      unit: '$'
    },
    totalMonthlyPayment: {
      type: 'number',
      label: 'Total Monthly Payment',
      description: 'Total monthly payment including all costs',
      unit: '$'
    },
    fundingFeeAmount: {
      type: 'number',
      label: 'VA Funding Fee',
      description: 'One-time VA funding fee amount',
      unit: '$'
    },
    fundingFeeRate: {
      type: 'number',
      label: 'Funding Fee Rate',
      description: 'VA funding fee percentage applied',
      unit: '%'
    },
    totalClosingCosts: {
      type: 'number',
      label: 'Total Closing Costs',
      description: 'Total closing costs including funding fee',
      unit: '$'
    },
    cashToClose: {
      type: 'number',
      label: 'Cash Required to Close',
      description: 'Total cash needed to close the loan',
      unit: '$'
    },
    debtToIncomeRatio: {
      type: 'number',
      label: 'Debt-to-Income Ratio',
      description: 'Total debt payments divided by gross income',
      unit: '%'
    },
    housingRatio: {
      type: 'number',
      label: 'Housing Ratio',
      description: 'Housing payment divided by gross income',
      unit: '%'
    },
    veteranEligibility: {
      type: 'string',
      label: 'Veteran Eligibility',
      description: 'Whether veteran meets VA loan requirements'
    },
    propertyEligibility: {
      type: 'string',
      label: 'Property Eligibility',
      description: 'Whether property meets VA requirements'
    },
    fundingFeeExemption: {
      type: 'string',
      label: 'Funding Fee Exemption',
      description: 'Whether veteran is exempt from funding fee'
    },
    totalInterestPaid: {
      type: 'number',
      label: 'Total Interest Paid',
      description: 'Total interest paid over the loan term',
      unit: '$'
    },
    totalFundingFees: {
      type: 'number',
      label: 'Total Funding Fees',
      description: 'Total VA funding fees paid',
      unit: '$'
    },
    totalCost: {
      type: 'number',
      label: 'Total Cost of Loan',
      description: 'Total cost including principal, interest, and fees',
      unit: '$'
    },
    savingsVsConventional: {
      type: 'number',
      label: 'Savings vs Conventional',
      description: 'Estimated savings compared to conventional loan',
      unit: '$'
    },
    eligibilityScore: {
      type: 'number',
      label: 'Eligibility Score',
      description: 'Overall VA loan eligibility assessment',
      unit: '/100'
    },
    recommendation: {
      type: 'string',
      label: 'Loan Recommendation',
      description: 'Detailed recommendation and analysis'
    }
  },

  calculate: calculateVALoan,
  generateReport: generateVALoanAnalysis
};
