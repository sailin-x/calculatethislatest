import { Calculator } from '../../../types/calculator';
import { calculateUSDALoan } from './formulas';
import { generateUSDALoanAnalysis } from './formulas';

export const USDALoanCalculator: Calculator = {
  id: 'usda-loan-calculator',
  name: 'USDA Loan Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate USDA Rural Development loan payments, eligibility, and financial impact.',
  
  inputs: [
    // Borrower Information
    {
      id: 'householdIncome',
      label: 'Household Income',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 10000,
      max: 200000,
      step: 1000,
      placeholder: '75000',
      description: 'Total annual household income'
    },
    {
      id: 'householdSize',
      label: 'Household Size',
      type: 'number',
      unit: 'people',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '4',
      description: 'Number of people in the household'
    },
    {
      id: 'state',
      label: 'State',
      type: 'select',
      required: true,
      options: [
        { value: 'al', label: 'Alabama' }, { value: 'ak', label: 'Alaska' }, { value: 'az', label: 'Arizona' },
        { value: 'ar', label: 'Arkansas' }, { value: 'ca', label: 'California' }, { value: 'co', label: 'Colorado' },
        { value: 'ct', label: 'Connecticut' }, { value: 'de', label: 'Delaware' }, { value: 'fl', label: 'Florida' },
        { value: 'ga', label: 'Georgia' }, { value: 'hi', label: 'Hawaii' }, { value: 'id', label: 'Idaho' },
        { value: 'il', label: 'Illinois' }, { value: 'in', label: 'Indiana' }, { value: 'ia', label: 'Iowa' },
        { value: 'ks', label: 'Kansas' }, { value: 'ky', label: 'Kentucky' }, { value: 'la', label: 'Louisiana' },
        { value: 'me', label: 'Maine' }, { value: 'md', label: 'Maryland' }, { value: 'ma', label: 'Massachusetts' },
        { value: 'mi', label: 'Michigan' }, { value: 'mn', label: 'Minnesota' }, { value: 'ms', label: 'Mississippi' },
        { value: 'mo', label: 'Missouri' }, { value: 'mt', label: 'Montana' }, { value: 'ne', label: 'Nebraska' },
        { value: 'nv', label: 'Nevada' }, { value: 'nh', label: 'New Hampshire' }, { value: 'nj', label: 'New Jersey' },
        { value: 'nm', label: 'New Mexico' }, { value: 'ny', label: 'New York' }, { value: 'nc', label: 'North Carolina' },
        { value: 'nd', label: 'North Dakota' }, { value: 'oh', label: 'Ohio' }, { value: 'ok', label: 'Oklahoma' },
        { value: 'or', label: 'Oregon' }, { value: 'pa', label: 'Pennsylvania' }, { value: 'ri', label: 'Rhode Island' },
        { value: 'sc', label: 'South Carolina' }, { value: 'sd', label: 'South Dakota' }, { value: 'tn', label: 'Tennessee' },
        { value: 'tx', label: 'Texas' }, { value: 'ut', label: 'Utah' }, { value: 'vt', label: 'Vermont' },
        { value: 'va', label: 'Virginia' }, { value: 'wa', label: 'Washington' }, { value: 'wv', label: 'West Virginia' },
        { value: 'wi', label: 'Wisconsin' }, { value: 'wy', label: 'Wyoming' }
      ],
      description: 'State where the property is located'
    },
    {
      id: 'county',
      label: 'County',
      type: 'text',
      required: true,
      placeholder: 'Jefferson',
      description: 'County where the property is located'
    },
    {
      id: 'propertyAddress',
      label: 'Property Address',
      type: 'text',
      required: true,
      placeholder: '123 Main St',
      description: 'Property address for eligibility check'
    },
    {
      id: 'occupancyType',
      label: 'Occupancy Type',
      type: 'select',
      required: true,
      options: [
        { value: 'primary', label: 'Primary Residence' },
        { value: 'secondary', label: 'Secondary Residence' },
        { value: 'investment', label: 'Investment Property' }
      ],
      description: 'How the property will be occupied'
    },

    // Property Information
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 50000,
      max: 1000000,
      step: 1000,
      placeholder: '250000',
      description: 'Purchase price or appraised value of the property'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single-family', label: 'Single-Family Home' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'manufactured', label: 'Manufactured Home' },
        { value: 'modular', label: 'Modular Home' }
      ],
      description: 'Type of property being purchased'
    },
    {
      id: 'propertySize',
      label: 'Property Size',
      type: 'number',
      unit: 'sq ft',
      required: false,
      min: 500,
      max: 10000,
      step: 100,
      placeholder: '2000',
      description: 'Square footage of the property'
    },
    {
      id: 'propertyAge',
      label: 'Property Age',
      type: 'number',
      unit: 'years',
      required: false,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '15',
      description: 'Age of the property in years'
    },
    {
      id: 'locationType',
      label: 'Location Type',
      type: 'select',
      required: true,
      options: [
        { value: 'rural', label: 'Rural Area' },
        { value: 'suburban', label: 'Suburban Area' },
        { value: 'urban', label: 'Urban Area' }
      ],
      description: 'Location classification of the property'
    },

    // Loan Information
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      unit: 'USD',
      required: true,
      min: 50000,
      max: 1000000,
      step: 1000,
      placeholder: '250000',
      description: 'Total loan amount needed'
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 100000,
      step: 1000,
      placeholder: '0',
      description: 'Down payment amount (USDA loans typically require 0% down)'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'number',
      unit: '%',
      required: true,
      min: 1,
      max: 10,
      step: 0.125,
      placeholder: '6.5',
      description: 'Annual interest rate on the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term',
      type: 'number',
      unit: 'years',
      required: true,
      min: 15,
      max: 30,
      step: 1,
      placeholder: '30',
      description: 'Loan term in years'
    },
    {
      id: 'loanType',
      label: 'USDA Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'direct', label: 'USDA Direct Loan' },
        { value: 'guaranteed', label: 'USDA Guaranteed Loan' }
      ],
      description: 'Type of USDA loan program'
    },

    // Financial Information
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 1000,
      max: 50000,
      step: 100,
      placeholder: '6250',
      description: 'Monthly household income'
    },
    {
      id: 'monthlyDebts',
      label: 'Monthly Debts',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '800',
      description: 'Total monthly debt payments'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      unit: 'score',
      required: false,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '680',
      description: 'Borrower credit score'
    },
    {
      id: 'assets',
      label: 'Total Assets',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '50000',
      description: 'Total liquid assets available'
    },

    // Costs and Fees
    {
      id: 'guaranteeFee',
      label: 'Guarantee Fee',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 5,
      step: 0.1,
      placeholder: '1.0',
      description: 'USDA guarantee fee percentage'
    },
    {
      id: 'annualFee',
      label: 'Annual Fee',
      type: 'number',
      unit: '%',
      required: false,
      min: 0,
      max: 1,
      step: 0.01,
      placeholder: '0.35',
      description: 'Annual fee percentage'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '5000',
      description: 'Estimated closing costs'
    },
    {
      id: 'prepaidItems',
      label: 'Prepaid Items',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '2000',
      description: 'Prepaid items (insurance, taxes, etc.)'
    },

    // Additional Information
    {
      id: 'veteranStatus',
      label: 'Veteran Status',
      type: 'select',
      required: false,
      options: [
        { value: 'veteran', label: 'Veteran' },
        { value: 'active-duty', label: 'Active Duty' },
        { value: 'non-veteran', label: 'Non-Veteran' }
      ],
      description: 'Veteran status of the borrower'
    },
    {
      id: 'firstTimeBuyer',
      label: 'First-Time Homebuyer',
      type: 'select',
      required: false,
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ],
      description: 'Whether this is the first home purchase'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 20000,
      step: 100,
      placeholder: '2500',
      description: 'Annual property tax amount'
    },
    {
      id: 'homeInsurance',
      label: 'Annual Home Insurance',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '1200',
      description: 'Annual homeowners insurance premium'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees',
      type: 'number',
      unit: 'USD',
      required: false,
      min: 0,
      max: 1000,
      step: 10,
      placeholder: '0',
      description: 'Monthly homeowners association fees'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'number',
      unit: 'USD',
      description: 'Total monthly mortgage payment'
    },
    {
      id: 'principalInterest',
      label: 'Principal & Interest',
      type: 'number',
      unit: 'USD',
      description: 'Monthly principal and interest payment'
    },
    {
      id: 'propertyTaxes',
      label: 'Monthly Property Taxes',
      type: 'number',
      unit: 'USD',
      description: 'Monthly property tax payment'
    },
    {
      id: 'insurance',
      label: 'Monthly Insurance',
      type: 'number',
      unit: 'USD',
      description: 'Monthly insurance payment'
    },
    {
      id: 'guaranteeFee',
      label: 'Monthly Guarantee Fee',
      type: 'number',
      unit: 'USD',
      description: 'Monthly USDA guarantee fee'
    },
    {
      id: 'annualFee',
      label: 'Monthly Annual Fee',
      type: 'number',
      unit: 'USD',
      description: 'Monthly USDA annual fee'
    },
    {
      id: 'totalCosts',
      label: 'Total Closing Costs',
      type: 'number',
      unit: 'USD',
      description: 'Total closing costs including fees'
    },
    {
      id: 'downPaymentRequired',
      label: 'Down Payment Required',
      type: 'number',
      unit: 'USD',
      description: 'Required down payment amount'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio',
      type: 'number',
      unit: '%',
      description: 'Total debt-to-income ratio'
    },
    {
      id: 'housingRatio',
      label: 'Housing Ratio',
      type: 'number',
      unit: '%',
      description: 'Housing expense ratio'
    },
    {
      id: 'loanToValue',
      label: 'Loan-to-Value Ratio',
      type: 'number',
      unit: '%',
      description: 'Loan-to-value ratio'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'number',
      unit: 'USD',
      description: 'Total interest paid over loan term'
    },
    {
      id: 'totalCost',
      label: 'Total Cost of Loan',
      type: 'number',
      unit: 'USD',
      description: 'Total cost including principal, interest, and fees'
    },
    {
      id: 'amortizationSchedule',
      label: 'Amortization Schedule',
      type: 'array',
      description: 'Complete loan amortization schedule'
    },
    {
      id: 'eligibilityScore',
      label: 'Eligibility Score',
      type: 'number',
      unit: '0-100',
      description: 'Overall eligibility assessment score'
    },
    {
      id: 'affordabilityScore',
      label: 'Affordability Score',
      type: 'number',
      unit: '0-100',
      description: 'Affordability assessment score'
    },
    {
      id: 'benefitAnalysis',
      label: 'Benefit Analysis',
      type: 'object',
      description: 'Analysis of USDA loan benefits vs conventional'
    },
    {
      id: 'costComparison',
      label: 'Cost Comparison',
      type: 'object',
      description: 'Comparison with other loan types'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'string',
      description: 'Professional recommendations based on analysis'
    }
  ],

  calculate: calculateUSDALoan,
  generateReport: generateUSDALoanAnalysis
};
