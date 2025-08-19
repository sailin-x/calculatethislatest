import { Calculator } from '../../../types/calculator';

export const mortgagePaymentCalculator: Calculator = {
  id: 'mortgage-payment',
  title: 'Mortgage Payment Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate monthly mortgage payments, including principal, interest, taxes, and insurance (PITI).',
  usageInstructions: 'Enter your loan details to calculate your monthly mortgage payment. The calculator includes principal, interest, property taxes, and insurance.',
  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      tooltip: 'The total amount you are borrowing',
      placeholder: '300000',
      defaultValue: 300000
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Annual interest rate for the loan',
      placeholder: '4.5',
      defaultValue: 4.5
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '10', label: '10 Years' },
        { value: '15', label: '15 Years' },
        { value: '20', label: '20 Years' },
        { value: '30', label: '30 Years' },
        { value: '40', label: '40 Years' }
      ],
      tooltip: 'Length of the loan in years',
      defaultValue: '30'
    },
    {
      id: 'propertyTax',
      label: 'Annual Property Tax',
      type: 'number',
      required: false,
      min: 0,
      max: 50000,
      step: 100,
      tooltip: 'Annual property tax amount',
      placeholder: '3600',
      defaultValue: 3600
    },
    {
      id: 'homeInsurance',
      label: 'Annual Home Insurance',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 50,
      tooltip: 'Annual home insurance premium',
      placeholder: '1200',
      defaultValue: 1200
    },
    {
      id: 'pmiRate',
      label: 'PMI Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 2,
      step: 0.01,
      tooltip: 'Private Mortgage Insurance rate (if down payment < 20%)',
      placeholder: '0.5',
      defaultValue: 0
    },
    {
      id: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Down payment amount (used to calculate PMI)',
      placeholder: '60000',
      defaultValue: 60000
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' }
      ],
      tooltip: 'Type of mortgage loan',
      defaultValue: 'conventional'
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Bi-weekly' },
        { value: 'weekly', label: 'Weekly' }
      ],
      tooltip: 'How often you make payments',
      defaultValue: 'monthly'
    }
  ],
  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Total monthly mortgage payment including PITI'
    },
    {
      id: 'principalAndInterest',
      label: 'Principal & Interest',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly principal and interest payment'
    },
    {
      id: 'propertyTaxMonthly',
      label: 'Property Tax (Monthly)',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly property tax payment'
    },
    {
      id: 'insuranceMonthly',
      label: 'Insurance (Monthly)',
      type: 'currency',
      format: 'USD',
      explanation: 'Monthly insurance payment (home + PMI)'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      format: 'USD',
      explanation: 'Total interest paid over the life of the loan'
    },
    {
      id: 'totalPayments',
      label: 'Total Payments',
      type: 'currency',
      format: 'USD',
      explanation: 'Total amount paid over the life of the loan'
    },
    {
      id: 'amortizationSchedule',
      label: 'Amortization Schedule',
      type: 'table',
      format: 'JSON',
      explanation: 'Year-by-year breakdown of payments'
    },
    {
      id: 'paymentBreakdown',
      label: 'Payment Breakdown',
      type: 'chart',
      format: 'JSON',
      explanation: 'Visual breakdown of monthly payment components'
    }
  ],
  formulas: [
    {
      id: 'monthly-payment',
      name: 'Monthly Payment Calculation',
      description: 'Calculate monthly mortgage payment using the standard formula',
      calculate: (inputs) => {
        const { calculateMortgagePayment } = require('./formulas');
        return calculateMortgagePayment(inputs);
      }
    },
    {
      id: 'amortization',
      name: 'Amortization Schedule',
      description: 'Generate complete amortization schedule',
      calculate: (inputs) => {
        const { generateAmortizationSchedule } = require('./formulas');
        return generateAmortizationSchedule(inputs);
      }
    },
    {
      id: 'payment-breakdown',
      name: 'Payment Breakdown',
      description: 'Break down payment into components',
      calculate: (inputs) => {
        const { calculatePaymentBreakdown } = require('./formulas');
        return calculatePaymentBreakdown(inputs);
      }
    }
  ],
  validationRules: [
    {
      id: 'loan-amount-positive',
      name: 'Loan Amount Must Be Positive',
      description: 'Loan amount must be greater than zero',
      validate: (inputs) => {
        const { validateMortgagePaymentInputs } = require('./validation');
        return validateMortgagePaymentInputs(inputs);
      }
    }
  ],
  examples: [
    {
      title: 'Standard 30-Year Fixed Mortgage',
      description: 'A typical 30-year fixed-rate mortgage with 20% down payment',
      inputs: {
        loanAmount: 300000,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTax: 3600,
        homeInsurance: 1200,
        pmiRate: 0,
        downPayment: 60000,
        loanType: 'conventional',
        paymentFrequency: 'monthly'
      },
      expectedOutputs: {
        monthlyPayment: 1520.06,
        principalAndInterest: 1219.08,
        propertyTaxMonthly: 300.00,
        insuranceMonthly: 100.00,
        totalInterest: 138868.80,
        totalPayments: 458868.80
      }
    },
    {
      title: 'FHA Loan with PMI',
      description: 'FHA loan with 3.5% down payment and PMI',
      inputs: {
        loanAmount: 250000,
        interestRate: 5.0,
        loanTerm: '30',
        propertyTax: 3000,
        homeInsurance: 1000,
        pmiRate: 0.85,
        downPayment: 8750,
        loanType: 'fha',
        paymentFrequency: 'monthly'
      },
      expectedOutputs: {
        monthlyPayment: 1589.45,
        principalAndInterest: 1342.05,
        propertyTaxMonthly: 250.00,
        insuranceMonthly: 177.40,
        totalInterest: 233138.00,
        totalPayments: 483138.00
      }
    },
    {
      title: '15-Year Fixed Mortgage',
      description: 'Shorter term loan with higher monthly payment but less total interest',
      inputs: {
        loanAmount: 200000,
        interestRate: 3.75,
        loanTerm: '15',
        propertyTax: 2400,
        homeInsurance: 800,
        pmiRate: 0,
        downPayment: 40000,
        loanType: 'conventional',
        paymentFrequency: 'monthly'
      },
      expectedOutputs: {
        monthlyPayment: 1689.58,
        principalAndInterest: 1455.58,
        propertyTaxMonthly: 200.00,
        insuranceMonthly: 34.00,
        totalInterest: 62004.40,
        totalPayments: 262004.40
      }
    }
  ]
};