import { Calculator } from '../../types/calculator';

export const FHALoanCalculator: Calculator = {
  id: 'fha-loan-calculator',
  title: 'FHA Loan Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate FHA loan payments, eligibility, and requirements with FHA-specific underwriting rules including MIP calculations.',
  usageInstructions: [
    'Enter property details and loan information',
    'Input borrower financial information',
    'Specify FHA loan program details',
    'Review FHA eligibility and payment calculations',
    'Analyze total cost including MIP requirements'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current appraised value of the property'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Borrower down payment amount'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total FHA loan amount requested'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.125,
      tooltip: 'Annual interest rate for the FHA loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 15,
      max: 30,
      tooltip: 'Length of the FHA loan in years'
    },
    {
      id: 'borrowerIncome',
      label: 'Annual Borrower Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Gross annual income of primary borrower'
    },
    {
      id: 'coBorrowerIncome',
      label: 'Annual Co-Borrower Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Gross annual income of co-borrower'
    },
    {
      id: 'monthlyDebt',
      label: 'Monthly Debt Payments ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly payments for credit cards, loans, etc.'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Annual homeowners insurance premium'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly homeowners association fees'
    },
    {
      id: 'fhaCaseNumber',
      label: 'FHA Case Number',
      type: 'text',
      required: false,
      tooltip: 'FHA case number for loan application'
    },
    {
      id: 'creditScore',
      label: 'Borrower Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'Middle credit score of borrowers'
    },
    {
      id: 'occupancyType',
      label: 'Occupancy Type',
      type: 'select',
      required: true,
      options: [
        { value: 'primary_residence', label: 'Primary Residence' },
        { value: 'second_home', label: 'Second Home' }
      ],
      tooltip: 'Type of occupancy for FHA loan'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Principal & Interest',
      type: 'currency',
      explanation: 'Monthly principal and interest payment'
    },
    {
      id: 'upfrontMIP',
      label: 'Upfront MIP',
      type: 'currency',
      explanation: 'Up-front Mortgage Insurance Premium (1.75% of loan amount)'
    },
    {
      id: 'monthlyMIP',
      label: 'Monthly MIP',
      type: 'currency',
      explanation: 'Monthly Mortgage Insurance Premium'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      explanation: 'Complete monthly housing payment including MIP'
    },
    {
      id: 'loanToValueRatio',
      label: 'LTV Ratio (%)',
      type: 'percentage',
      explanation: 'Loan-to-value ratio for FHA loan'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'DTI Ratio (%)',
      type: 'percentage',
      explanation: 'Debt-to-income ratio including housing payment'
    },
    {
      id: 'fhaEligibility',
      label: 'FHA Eligibility',
      type: 'text',
      explanation: 'FHA loan eligibility status and requirements'
    },
    {
      id: 'totalClosingCosts',
      label: 'Estimated Closing Costs',
      type: 'currency',
      explanation: 'Estimated total closing costs for FHA loan'
    },
    {
      id: 'cashToClose',
      label: 'Cash to Close',
      type: 'currency',
      explanation: 'Total cash required to close the FHA loan'
    }
  ],

  formulas: [], // Will be implemented with calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'First-Time Homebuyer FHA Loan',
      description: '3.5% down FHA loan for primary residence',
      inputs: {
        propertyValue: 300000,
        downPayment: 10500,
        loanAmount: 294500,
        interestRate: 6.75,
        loanTerm: 30,
        borrowerIncome: 75000,
        monthlyDebt: 500,
        propertyTaxes: 3600,
        homeownersInsurance: 1200,
        creditScore: 680,
        occupancyType: 'primary_residence'
      },
      expectedOutputs: {
        monthlyPayment: 1910,
        upfrontMIP: 5160,
        monthlyMIP: 163,
        totalMonthlyPayment: 2873,
        loanToValueRatio: 98.17,
        debtToIncomeRatio: 46.0,
        fhaEligibility: 'Eligible',
        totalClosingCosts: 8835,
        cashToClose: 19935
      }
    }
  ]
};
