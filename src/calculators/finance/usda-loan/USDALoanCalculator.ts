import { Calculator } from '../../../types/calculator';
import { calculateUSDALoan } from './formulas';
import { generateUSDALoanAnalysis } from './formulas';

export const USDALoanCalculator: Calculator = {
  name: 'USDA Loan Calculator',
  category: 'finance',
  description: 'Calculate USDA Rural Development loan payments, eligibility, and costs including guarantee fees and annual fees.',
  
  inputs: {
    purchasePrice: {
      type: 'number',
      label: 'Purchase Price',
      description: 'Total purchase price of the property',
      placeholder: '250000',
      unit: '$',
      required: true,
      min: 50000,
      max: 5000000,
      step: 1000
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment',
      description: 'Down payment amount (USDA loans allow 0% down)',
      placeholder: '0',
      unit: '$',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate',
      description: 'Annual interest rate on the USDA loan',
      placeholder: '6.5',
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
    annualIncome: {
      type: 'number',
      label: 'Annual Household Income',
      description: 'Total annual household income for all borrowers',
      placeholder: '75000',
      unit: '$',
      required: true,
      min: 10000,
      max: 2000000,
      step: 1000
    },
    householdSize: {
      type: 'number',
      label: 'Household Size',
      description: 'Number of people in the household',
      placeholder: '4',
      unit: 'people',
      required: true,
      min: 1,
      max: 20,
      step: 1
    },
    propertyLocation: {
      type: 'select',
      label: 'Property Location',
      description: 'Location of the property for USDA eligibility',
      placeholder: 'Select location type',
      required: true,
      options: [
        { value: 'rural', label: 'Rural Area' },
        { value: 'suburban', label: 'Suburban Area' },
        { value: 'urban', label: 'Urban Area' }
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
    propertyAge: {
      type: 'number',
      label: 'Property Age',
      description: 'Age of the property in years',
      placeholder: '10',
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
      placeholder: '2000',
      unit: 'sq ft',
      required: true,
      min: 500,
      max: 10000,
      step: 100
    },
    propertyTaxes: {
      type: 'number',
      label: 'Annual Property Taxes',
      description: 'Annual property tax amount',
      placeholder: '3000',
      unit: '$',
      required: true,
      min: 0,
      max: 50000,
      step: 100
    },
    homeownersInsurance: {
      type: 'number',
      label: 'Annual Homeowners Insurance',
      description: 'Annual homeowners insurance premium',
      placeholder: '1200',
      unit: '$',
      required: true,
      min: 0,
      max: 10000,
      step: 100
    },
    monthlyDebts: {
      type: 'number',
      label: 'Monthly Debt Payments',
      description: 'Total monthly debt payments (excluding housing)',
      placeholder: '500',
      unit: '$',
      required: true,
      min: 0,
      max: 10000,
      step: 50
    },
    creditScore: {
      type: 'number',
      label: 'Credit Score',
      description: 'Lowest credit score among all borrowers',
      placeholder: '680',
      unit: 'score',
      required: true,
      min: 500,
      max: 850,
      step: 1
    },
    guaranteeFee: {
      type: 'number',
      label: 'USDA Guarantee Fee',
      description: 'USDA guarantee fee percentage (typically 1%)',
      placeholder: '1.0',
      unit: '%',
      required: true,
      min: 0.5,
      max: 3.5,
      step: 0.1
    },
    annualFee: {
      type: 'number',
      label: 'USDA Annual Fee',
      description: 'USDA annual fee percentage (typically 0.35%)',
      placeholder: '0.35',
      unit: '%',
      required: true,
      min: 0.1,
      max: 1.0,
      step: 0.01
    },
    closingCosts: {
      type: 'number',
      label: 'Closing Costs',
      description: 'Estimated closing costs',
      placeholder: '5000',
      unit: '$',
      required: true,
      min: 0,
      max: 50000,
      step: 100
    },
    prepaidItems: {
      type: 'number',
      label: 'Prepaid Items',
      description: 'Prepaid items (escrow, insurance, etc.)',
      placeholder: '2000',
      unit: '$',
      required: true,
      min: 0,
      max: 20000,
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
      max: 100000,
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
      description: 'Total loan amount including guarantee fee',
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
    monthlyUSDAFee: {
      type: 'number',
      label: 'Monthly USDA Annual Fee',
      description: 'Monthly USDA annual fee payment',
      unit: '$'
    },
    totalMonthlyPayment: {
      type: 'number',
      label: 'Total Monthly Payment',
      description: 'Total monthly payment including all costs',
      unit: '$'
    },
    guaranteeFeeAmount: {
      type: 'number',
      label: 'USDA Guarantee Fee',
      description: 'One-time guarantee fee amount',
      unit: '$'
    },
    totalClosingCosts: {
      type: 'number',
      label: 'Total Closing Costs',
      description: 'Total closing costs including guarantee fee',
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
    incomeEligibility: {
      type: 'string',
      label: 'Income Eligibility',
      description: 'Whether household income meets USDA limits'
    },
    locationEligibility: {
      type: 'string',
      label: 'Location Eligibility',
      description: 'Whether property location is USDA eligible'
    },
    propertyEligibility: {
      type: 'string',
      label: 'Property Eligibility',
      description: 'Whether property meets USDA requirements'
    },
    totalInterestPaid: {
      type: 'number',
      label: 'Total Interest Paid',
      description: 'Total interest paid over the loan term',
      unit: '$'
    },
    totalUSDAFees: {
      type: 'number',
      label: 'Total USDA Fees',
      description: 'Total USDA fees paid over the loan term',
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
      description: 'Overall USDA loan eligibility assessment',
      unit: '/100'
    },
    recommendation: {
      type: 'string',
      label: 'Loan Recommendation',
      description: 'Detailed recommendation and analysis'
    }
  },

  calculate: calculateUSDALoan,
  generateReport: generateUSDALoanAnalysis
};
