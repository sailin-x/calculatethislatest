import { Calculator } from '../../types';
import { InterestOnlyMortgageInputs, InterestOnlyMortgageOutputs } from './types';
import { calculateInterestOnlyMortgage } from './formulas';
import { validateInterestOnlyMortgageInputs } from './validation';

export const InterestOnlyMortgageCalculator: Calculator<InterestOnlyMortgageInputs, InterestOnlyMortgageOutputs> = {
  id: 'interest-only-mortgage',
  name: 'Interest-Only Mortgage Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate interest-only mortgage payments, savings, and investment potential',
  longDescription: `A comprehensive interest-only mortgage calculator that analyzes payment structures, cash flow benefits, and investment opportunities. This calculator helps borrowers understand the financial implications of interest-only mortgages, including payment schedules, total interest costs, and potential investment returns from saved cash flow. It includes risk assessment, refinancing analysis, and strategic recommendations for optimizing interest-only mortgage benefits.`,
  
  inputs: {
    // Loan Information
    loanAmount: {
      type: 'number',
      label: 'Loan Amount ($)',
      description: 'Total loan amount',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      placeholder: '400000'
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
    interestOnlyPeriod: {
      type: 'number',
      label: 'Interest-Only Period (years)',
      description: 'Number of years for interest-only payments',
      required: true,
      min: 1,
      max: 30,
      step: 1,
      placeholder: '10'
    },
    totalLoanTerm: {
      type: 'number',
      label: 'Total Loan Term (years)',
      description: 'Total loan term in years',
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
    
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 100000,
      max: 20000000,
      step: 1000,
      placeholder: '500000'
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
        { value: 'investment', label: 'Investment Property' },
        { value: 'second_home', label: 'Second Home' },
        { value: 'commercial', label: 'Commercial' }
      ],
      placeholder: 'primary_residence'
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
    downPayment: {
      type: 'number',
      label: 'Down Payment ($)',
      description: 'Down payment amount',
      required: true,
      min: 0,
      max: 20000000,
      step: 1000,
      placeholder: '100000'
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
    
    // Payment Information
    interestOnlyPayment: {
      type: 'number',
      label: 'Interest-Only Payment ($)',
      description: 'Monthly interest-only payment',
      required: true,
      min: 0,
      max: 100000,
      step: 1,
      placeholder: '2167'
    },
    principalAndInterestPayment: {
      type: 'number',
      label: 'Principal & Interest Payment ($)',
      description: 'Monthly P&I payment after interest-only period',
      required: true,
      min: 0,
      max: 100000,
      step: 1,
      placeholder: '2528'
    },
    totalMonthlyPayment: {
      type: 'number',
      label: 'Total Monthly Payment ($)',
      description: 'Total monthly payment including taxes and insurance',
      required: true,
      min: 0,
      max: 100000,
      step: 1,
      placeholder: '3200'
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
      placeholder: '6000'
    },
    homeownersInsurance: {
      type: 'number',
      label: 'Homeowners Insurance ($)',
      description: 'Annual homeowners insurance',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '1200'
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
      placeholder: '2400'
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
    
    // Refinancing Options
    refinanceAfterInterestOnly: {
      type: 'boolean',
      label: 'Refinance After Interest-Only Period',
      description: 'Plan to refinance after interest-only period',
      required: false,
      placeholder: false
    },
    refinanceRate: {
      type: 'number',
      label: 'Refinance Rate (%)',
      description: 'Expected refinance interest rate',
      required: false,
      min: 0,
      max: 50,
      step: 0.01,
      placeholder: '5.5'
    },
    refinanceTerm: {
      type: 'number',
      label: 'Refinance Term (years)',
      description: 'Refinance loan term',
      required: false,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '30'
    },
    
    // Investment Analysis
    expectedPropertyAppreciation: {
      type: 'number',
      label: 'Expected Property Appreciation (%)',
      description: 'Expected annual property appreciation',
      required: true,
      min: -20,
      max: 50,
      step: 0.1,
      placeholder: '3.0'
    },
    rentalIncome: {
      type: 'number',
      label: 'Rental Income ($)',
      description: 'Monthly rental income (if investment property)',
      required: true,
      min: 0,
      max: 50000,
      step: 100,
      placeholder: '0'
    },
    taxDeductionBenefit: {
      type: 'number',
      label: 'Tax Deduction Benefit ($)',
      description: 'Annual tax deduction benefit',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '5000'
    },
    opportunityCost: {
      type: 'number',
      label: 'Opportunity Cost (%)',
      description: 'Expected return on alternative investment',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '8.0'
    }
  },
  
  calculate: calculateInterestOnlyMortgage,
  validate: validateInterestOnlyMortgageInputs
};
