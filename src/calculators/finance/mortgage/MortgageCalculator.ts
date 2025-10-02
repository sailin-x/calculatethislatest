import { Calculator } from '../../types/calculator';
import { mortgageCalculatorFormula } from './formulas';
import { getMortgageValidationRules } from './validation';

/**
 * Industry-leading mortgage calculator with comprehensive features
 */
export const mortgageCalculator: Calculator = {
  id: 'mortgage-calculator',
  title: 'Mortgage Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate mortgage payments, PMI, amortization schedules, and total costs with industry-standard accuracy for all loan types.',
  
  usageInstructions: [
    'Enter the home purchase price and your down payment amount',
    'Select your loan type (Conventional, FHA, VA, USDA, or Jumbo)',
    'Input the loan term in years and current interest rate',
    'Add property tax and home insurance (annual amounts)',
    'Include HOA fees and any extra monthly payments if applicable',
    'Review your complete monthly payment breakdown and amortization details'
  ],

  inputs: [
    {
      id: 'homePrice',
      label: 'Home Price',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Total purchase price of the home',
      defaultValue: 500000
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Amount you will pay upfront (typically 3-20% of home price)',
      defaultValue: 100000
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional (3% down min)' },
        { value: 'fha', label: 'FHA (3.5% down min)' },
        { value: 'va', label: 'VA (0% down)' },
        { value: 'usda', label: 'USDA (0% down)' },
        { value: 'jumbo', label: 'Jumbo (10% down min)' }
      ],
      tooltip: 'Type of mortgage loan - affects down payment requirements and PMI',
      defaultValue: 'conventional'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Length of the loan in years (typically 15 or 30 years)',
      defaultValue: 30,
      min: 1,
      max: 50
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '7.0',
      tooltip: 'Annual interest rate for the loan',
      defaultValue: 7.0,
      step: 0.125
    },
    {
      id: 'propertyTax',
      label: 'Annual Property Tax',
      type: 'currency',
      required: true,
      placeholder: '8000',
      tooltip: 'Annual property tax amount (varies by location)',
      defaultValue: 8000
    },
    {
      id: 'homeInsurance',
      label: 'Annual Home Insurance',
      type: 'currency',
      required: true,
      placeholder: '2000',
      tooltip: 'Annual homeowners insurance premium',
      defaultValue: 2000
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%) - Optional',
      type: 'percentage',
      required: false,
      placeholder: '0.5',
      tooltip: 'Private Mortgage Insurance rate (auto-calculated if not provided)',
      step: 0.05
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees - Optional',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Monthly Homeowners Association fees'
    },
    {
      id: 'extraPayment',
      label: 'Extra Monthly Payment - Optional',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Additional principal payment each month to pay off loan faster'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      explanation: 'Complete monthly housing payment including principal, interest, taxes, insurance, PMI, and HOA'
    },
    {
      id: 'principalAndInterest',
      label: 'Principal & Interest',
      type: 'currency',
      explanation: 'Monthly payment for loan principal and interest only'
    },
    {
      id: 'propertyTax',
      label: 'Monthly Property Tax',
      type: 'currency',
      explanation: 'Monthly portion of annual property tax'
    },
    {
      id: 'homeInsurance',
      label: 'Monthly Home Insurance',
      type: 'currency',
      explanation: 'Monthly portion of annual homeowners insurance'
    },
    {
      id: 'pmi',
      label: 'Monthly PMI',
      type: 'currency',
      explanation: 'Private Mortgage Insurance (required when down payment < 20%)'
    },
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      explanation: 'Total amount being financed (home price minus down payment)'
    },
    {
      id: 'loanToValue',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      explanation: 'Percentage of home value being financed'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the life of the loan'
    },
    {
      id: 'totalPayments',
      label: 'Total of All Payments',
      type: 'currency',
      explanation: 'Sum of all principal and interest payments over loan term'
    },
    {
      id: 'payoffTimeMonths',
      label: 'Payoff Time',
      type: 'number',
      explanation: 'Number of months to pay off the loan (may be less than term with extra payments)'
    }
  ],

  formulas: [mortgageCalculatorFormula],
  
  validationRules: getMortgageValidationRules(),

  examples: [
    {
      title: 'First-Time Homebuyer (FHA Loan)',
      description: 'Young couple buying their first home with minimal down payment',
      inputs: {
        homePrice: 350000,
        downPayment: 12250, // 3.5%
        loanType: 'fha',
        loanTerm: 30,
        interestRate: 6.5,
        propertyTax: 5250,
        homeInsurance: 1800,
        hoaFees: 0,
        extraPayment: 0
      },
      expectedOutputs: {
        monthlyPayment: 2847,
        principalAndInterest: 2134,
        loanToValue: 96.5,
        totalInterest: 430000
      }
    },
    {
      title: 'Conventional Loan with 20% Down',
      description: 'Standard mortgage with no PMI requirement',
      inputs: {
        homePrice: 500000,
        downPayment: 100000, // 20%
        loanType: 'conventional',
        loanTerm: 30,
        interestRate: 7.0,
        propertyTax: 8000,
        homeInsurance: 2000,
        hoaFees: 250,
        extraPayment: 0
      },
      expectedOutputs: {
        monthlyPayment: 3750,
        principalAndInterest: 2661,
        loanToValue: 80.0,
        totalInterest: 558000
      }
    },
    {
      title: 'VA Loan (No Down Payment)',
      description: 'Veteran purchasing with 100% financing',
      inputs: {
        homePrice: 400000,
        downPayment: 0,
        loanType: 'va',
        loanTerm: 30,
        interestRate: 6.25,
        propertyTax: 6000,
        homeInsurance: 1600,
        hoaFees: 0,
        extraPayment: 200
      },
      expectedOutputs: {
        monthlyPayment: 3096,
        principalAndInterest: 2463,
        loanToValue: 100.0,
        payoffTimeMonths: 319 // Faster payoff with extra payment
      }
    },
    {
      title: 'Jumbo Loan (High-Value Property)',
      description: 'Luxury home purchase exceeding conforming loan limits',
      inputs: {
        homePrice: 1200000,
        downPayment: 240000, // 20%
        loanType: 'jumbo',
        loanTerm: 30,
        interestRate: 7.25,
        propertyTax: 18000,
        homeInsurance: 4000,
        hoaFees: 500,
        extraPayment: 0
      },
      expectedOutputs: {
        monthlyPayment: 8890,
        principalAndInterest: 6557,
        loanToValue: 80.0,
        totalInterest: 1400000
      }
    }
  ]
};