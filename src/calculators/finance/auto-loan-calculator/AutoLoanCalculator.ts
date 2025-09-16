import { Calculator } from '../../../types/calculator';
import { calculateAutoLoan } from './formulas';
import { getAutoLoanValidationRules } from './validation';

/**
 * Auto Loan Calculator
 * Industry-standard calculator for auto loan payments and costs
 */
export const autoLoanCalculator: Calculator = {
  id: 'auto-loan-calculator',
  title: 'Auto Loan Calculator',
  category: 'finance',
  description: 'Calculate monthly payments, total interest, and costs for auto loans. Compare different loan terms and interest rates to find the best financing option for your vehicle purchase.',
  usageInstructions: [
    'Enter the vehicle price and your down payment amount or percentage',
    'Select your preferred loan term in years',
    'Enter the interest rate offered by your lender',
    'Include any applicable sales tax, registration fees, and monthly insurance',
    'Add trade-in value if applicable',
    'Review monthly payment, total cost, and loan-to-value ratio'
  ],

  inputs: [
    {
      id: 'vehiclePrice',
      label: 'Vehicle Price',
      type: 'currency',
      required: true,
      min: 5000,
      max: 2000000,
      tooltip: 'The total price of the vehicle before taxes and fees'
    },
    {
      id: 'downPayment',
      label: 'Down Payment Amount',
      type: 'currency',
      required: false,
      min: 0,
      max: 2000000,
      tooltip: 'Cash down payment (leave blank if using percentage)'
    },
    {
      id: 'downPaymentPercent',
      label: 'Down Payment Percentage',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Down payment as percentage of vehicle price'
    },
    {
      id: 'loanTermYears',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      step: 0.1,
      tooltip: 'Annual interest rate offered by lender'
    },
    {
      id: 'salesTax',
      label: 'Sales Tax (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      tooltip: 'State sales tax rate'
    },
    {
      id: 'registrationFees',
      label: 'Registration & Fees',
      type: 'currency',
      required: false,
      min: 0,
      max: 2000,
      tooltip: 'DMV registration, title, and other upfront fees'
    },
    {
      id: 'monthlyInsurance',
      label: 'Monthly Insurance',
      type: 'currency',
      required: false,
      min: 0,
      max: 500,
      tooltip: 'Monthly auto insurance premium'
    },
    {
      id: 'tradeInValue',
      label: 'Trade-in Value',
      type: 'currency',
      required: false,
      min: 0,
      max: 2000000,
      tooltip: 'Value of vehicle being traded in'
    }
  ],

  outputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'currency',
      format: 'currency',
      explanation: 'Total amount financed after down payment and trade-in'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Principal & Interest',
      type: 'currency',
      format: 'currency',
      explanation: 'Monthly payment for loan principal and interest only'
    },
    {
      id: 'totalMonthlyPayment',
      label: 'Total Monthly Payment',
      type: 'currency',
      format: 'currency',
      explanation: 'Total monthly payment including taxes and insurance'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      format: 'currency',
      explanation: 'Total interest paid over the life of the loan'
    },
    {
      id: 'totalCost',
      label: 'Total Cost',
      type: 'currency',
      format: 'currency',
      explanation: 'Total amount paid including principal, interest, taxes, and fees'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio',
      type: 'percentage',
      format: 'percentage',
      explanation: 'Percentage of vehicle value financed (lower is better)'
    },
    {
      id: 'apr',
      label: 'Annual Percentage Rate (APR)',
      type: 'percentage',
      format: 'percentage',
      explanation: 'True cost of borrowing including fees (higher than interest rate)'
    }
  ],

  formulas: [
    {
      id: 'auto-loan-calculation',
      name: 'Auto Loan Payment Calculation',
      description: 'Calculate monthly payments and total costs for auto loans',
      calculate: calculateAutoLoan
    }
  ],

  validationRules: getAutoLoanValidationRules(),

  examples: [
    {
      title: 'New Car Purchase',
      description: 'Financing a $35,000 new car with 20% down',
      inputs: {
        vehiclePrice: 35000,
        downPaymentPercent: 20,
        loanTermYears: 5,
        interestRate: 6.5,
        salesTax: 8.5,
        registrationFees: 500,
        monthlyInsurance: 120
      },
      expectedOutputs: {
        loanAmount: 28000,
        monthlyPayment: 552,
        totalMonthlyPayment: 672,
        totalInterest: 5132,
        totalCost: 40332,
        loanToValueRatio: 80,
        apr: 7.2
      }
    },
    {
      title: 'Used Car with Trade-in',
      description: 'Financing a $25,000 used car with trade-in',
      inputs: {
        vehiclePrice: 25000,
        downPayment: 3000,
        loanTermYears: 4,
        interestRate: 7.8,
        salesTax: 6.0,
        registrationFees: 300,
        monthlyInsurance: 95,
        tradeInValue: 5000
      },
      expectedOutputs: {
        loanAmount: 17000,
        monthlyPayment: 428,
        totalMonthlyPayment: 523,
        totalInterest: 3068,
        totalCost: 25068,
        loanToValueRatio: 68,
        apr: 8.4
      }
    },
    {
      title: 'Long-term Financing',
      description: 'Extended 7-year loan for budget-conscious buyer',
      inputs: {
        vehiclePrice: 28000,
        downPaymentPercent: 10,
        loanTermYears: 7,
        interestRate: 5.9,
        salesTax: 7.5,
        registrationFees: 400,
        monthlyInsurance: 110
      },
      expectedOutputs: {
        loanAmount: 25200,
        monthlyPayment: 372,
        totalMonthlyPayment: 482,
        totalInterest: 6264,
        totalCost: 40464,
        loanToValueRatio: 90,
        apr: 6.3
      }
    }
  ]
};