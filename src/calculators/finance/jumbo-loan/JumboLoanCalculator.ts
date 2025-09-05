import { Calculator } from '../../types';
import { JumboLoanInputs, JumboLoanOutputs } from './types';
import { calculateJumboLoan } from './formulas';
import { validateJumboLoanInputs } from './validation';

export const JumboLoanCalculator: Calculator<JumboLoanInputs, JumboLoanOutputs> = {
  id: 'jumbo-loan',
  name: 'Jumbo Loan Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate jumbo loan payments, qualification, and alternatives',
  longDescription: `A comprehensive jumbo loan calculator that analyzes loan structures, qualification requirements, and alternative financing options for high-value properties. This calculator helps borrowers understand the financial implications of jumbo loans, including blended rates, qualification factors, and comparison with conforming loans. It includes risk assessment, alternative loan structures, and strategic recommendations for optimizing jumbo loan benefits.`,
  
  inputs: {
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Total loan amount',
      required: true,
      min: 100000,
      max: 50000000,
      step: 1000,
      placeholder: '800000'
    },
    interestRate: {
      type: 'number',
      label: 'Interest Rate (%)',
      description: 'Annual interest rate',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      placeholder: '6.5'
    },
    loanTerm: {
      type: 'number',
      label: 'Loan Term (years)',
      description: 'Loan term in years',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    loanType: {
      type: 'select',
      label: 'Loan Type',
      description: 'Type of mortgage loan',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed Rate' },
        { value: 'adjustable', label: 'Adjustable Rate' },
        { value: 'hybrid', label: 'Hybrid ARM' }
      ],
      placeholder: 'fixed'
    },
    downPayment: {
      type: 'number',
      label: 'Down Payment ($)',
      description: 'Down payment amount',
      required: true,
      min: 0,
      max: 50000000,
      step: 1000,
      placeholder: '200000'
    },
    loanToValueRatio: {
      type: 'number',
      label: 'Loan-to-Value Ratio (%)',
      description: 'Loan amount divided by property value',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '80'
    },
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 100000,
      max: 100000000,
      step: 1000,
      placeholder: '1000000'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full property address',
      required: true,
      placeholder: '123 Main St, City, State 12345'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of property',
      required: true,
      options: [
        { value: 'primary_residence', label: 'Primary Residence' },
        { value: 'second_home', label: 'Second Home' },
        { value: 'investment', label: 'Investment Property' }
      ],
      placeholder: 'primary_residence'
    },
    propertyState: {
      type: 'text',
      label: 'Property State',
      description: 'State where property is located',
      required: true,
      placeholder: 'CA'
    },
    propertyCounty: {
      type: 'text',
      label: 'Property County',
      description: 'County where property is located',
      required: true,
      placeholder: 'Los Angeles'
    },
    
    // Borrower Information
    creditScore: {
      type: 'select',
      label: 'Credit Score',
      description: 'Credit score range',
      required: true,
      options: [
        { value: 'poor', label: 'Poor (300-579)' },
        { value: 'fair', label: 'Fair (580-669)' },
        { value: 'good', label: 'Good (670-739)' },
        { value: 'very_good', label: 'Very Good (740-799)' },
        { value: 'excellent', label: 'Excellent (800-850)' }
      ],
      placeholder: 'good'
    },
    debtToIncomeRatio: {
      type: 'number',
      label: 'Debt-to-Income Ratio (%)',
      description: 'Monthly debt payments divided by monthly income',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '35'
    },
    annualIncome: {
      type: 'number',
      label: 'Annual Income ($)',
      description: 'Annual household income',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      placeholder: '200000'
    },
    employmentType: {
      type: 'select',
      label: 'Employment Type',
      description: 'Type of employment',
      required: true,
      options: [
        { value: 'w2', label: 'W-2 Employee' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'business_owner', label: 'Business Owner' },
        { value: 'retired', label: 'Retired' }
      ],
      placeholder: 'w2'
    },
    employmentLength: {
      type: 'number',
      label: 'Employment Length (years)',
      description: 'Length of current employment',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '5'
    },
    
    // Financial Information
    liquidAssets: {
      type: 'number',
      label: 'Liquid Assets ($)',
      description: 'Total liquid assets',
      required: true,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000'
    },
    reserves: {
      type: 'number',
      label: 'Reserves (months)',
      description: 'Months of payments in reserves',
      required: true,
      min: 0,
      max: 60,
      step: 1,
      placeholder: '12'
    },
    otherProperties: {
      type: 'number',
      label: 'Other Properties',
      description: 'Number of other properties owned',
      required: true,
      min: 0,
      max: 20,
      step: 1,
      placeholder: '0'
    },
    existingDebt: {
      type: 'number',
      label: 'Existing Debt ($)',
      description: 'Total existing debt',
      required: true,
      min: 0,
      max: 5000000,
      step: 1000,
      placeholder: '0'
    },
    
    // Jumbo Loan Specifics
    conformingLimit: {
      type: 'number',
      label: 'Conforming Limit ($)',
      description: 'FHFA conforming loan limit for the area',
      required: true,
      min: 100000,
      max: 2000000,
      step: 1000,
      placeholder: '766550'
    },
    jumboAmount: {
      type: 'number',
      label: 'Jumbo Amount ($)',
      description: 'Amount above conforming limit',
      required: true,
      min: 0,
      max: 50000000,
      step: 1000,
      placeholder: '33450'
    },
    jumboPremium: {
      type: 'number',
      label: 'Jumbo Premium (%)',
      description: 'Additional rate for jumbo portion',
      required: true,
      min: 0,
      max: 10,
      step: 0.01,
      placeholder: '0.25'
    },
    
    // Additional Costs
    propertyTaxes: {
      type: 'number',
      label: 'Property Taxes ($)',
      description: 'Annual property taxes',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '12000'
    },
    homeownersInsurance: {
      type: 'number',
      label: 'Homeowners Insurance ($)',
      description: 'Annual homeowners insurance',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '2400'
    },
    privateMortgageInsurance: {
      type: 'number',
      label: 'Private Mortgage Insurance ($)',
      description: 'Annual PMI (if applicable)',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '0'
    },
    hoaFees: {
      type: 'number',
      label: 'HOA Fees ($)',
      description: 'Annual HOA fees',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '4800'
    },
    otherMonthlyExpenses: {
      type: 'number',
      label: 'Other Monthly Expenses ($)',
      description: 'Other monthly housing expenses',
      required: true,
      min: 0,
      max: 10000,
      step: 100,
      placeholder: '0'
    },
    
    // Loan Features
    interestOnlyOption: {
      type: 'boolean',
      label: 'Interest-Only Option',
      description: 'Include interest-only payment option',
      required: false,
      placeholder: false
    },
    interestOnlyPeriod: {
      type: 'number',
      label: 'Interest-Only Period (years)',
      description: 'Number of years for interest-only payments',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10'
    },
    prepaymentPenalty: {
      type: 'boolean',
      label: 'Prepayment Penalty',
      description: 'Loan has prepayment penalty',
      required: false,
      placeholder: false
    },
    prepaymentPenaltyPeriod: {
      type: 'number',
      label: 'Prepayment Penalty Period (years)',
      description: 'Years of prepayment penalty',
      required: false,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '3'
    },
    rateLockPeriod: {
      type: 'number',
      label: 'Rate Lock Period (days)',
      description: 'Rate lock period in days',
      required: true,
      min: 0,
      max: 365,
      step: 1,
      placeholder: '60'
    },
    
    // Qualification Requirements
    minimumCreditScore: {
      type: 'number',
      label: 'Minimum Credit Score',
      description: 'Minimum credit score required',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      placeholder: '680'
    },
    maximumDTI: {
      type: 'number',
      label: 'Maximum DTI (%)',
      description: 'Maximum debt-to-income ratio allowed',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '43'
    },
    minimumReserves: {
      type: 'number',
      label: 'Minimum Reserves (months)',
      description: 'Minimum months of reserves required',
      required: true,
      min: 0,
      max: 60,
      step: 1,
      placeholder: '6'
    },
    maximumLTV: {
      type: 'number',
      label: 'Maximum LTV (%)',
      description: 'Maximum loan-to-value ratio allowed',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '90'
    },
    
    // Market Conditions
    marketConditions: {
      type: 'select',
      label: 'Market Conditions',
      description: 'Current market conditions',
      required: true,
      options: [
        { value: 'favorable', label: 'Favorable' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'challenging', label: 'Challenging' }
      ],
      placeholder: 'neutral'
    },
    rateEnvironment: {
      type: 'select',
      label: 'Rate Environment',
      description: 'Current interest rate environment',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'rising', label: 'Rising' }
      ],
      placeholder: 'moderate'
    },
    competitionLevel: {
      type: 'select',
      label: 'Competition Level',
      description: 'Level of competition among lenders',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' }
      ],
      placeholder: 'moderate'
    }
  },
  
  calculate: calculateJumboLoan,
  validate: validateJumboLoanInputs
};
