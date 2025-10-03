import { Calculator } from '../../types/calculator';
import { LoanCalculatorInputs, LoanCalculatorOutputs } from './types';
import {
  calculateLoanResult,
  generateLoanAnalysis
} from './formulas';
import { validateLoanCalculatorInputs, validateLoanCalculatorBusinessRules } from './validation';

export const LoanCalculator: Calculator = {
  id: 'loan-calculator',
  title: 'Loan Calculator',
  category: 'finance',
  subcategory: 'Loan Analysis',
  description: 'Calculate loan payments, total interest, amortization schedules, and early payoff analysis for personal, business, student, and auto loans.',

  usageInstructions: [
    'Enter loan amount, interest rate, and term',
    'Select payment frequency (monthly, quarterly, etc.)',
    'Choose loan type for appropriate analysis',
    'Add extra payments to see early payoff benefits',
    'Review amortization schedule and total costs',
    'Analyze different payment scenarios'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Total loan amount borrowed'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.125,
      tooltip: 'Annual interest rate for the loan'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi-annually', label: 'Semi-Annually' },
        { value: 'annually', label: 'Annually' }
      ],
      defaultValue: 'monthly',
      tooltip: 'How often payments are made'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: false,
      options: [
        { value: 'personal', label: 'Personal Loan' },
        { value: 'business', label: 'Business Loan' },
        { value: 'student', label: 'Student Loan' },
        { value: 'auto', label: 'Auto Loan' },
        { value: 'other', label: 'Other' }
      ],
      tooltip: 'Type of loan for appropriate analysis'
    },
    {
      id: 'extraPayment',
      label: 'Extra Payment per Period ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Additional payment amount applied each period'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Payment Amount',
      type: 'currency',
      explanation: 'Regular payment amount based on selected frequency'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the life of the loan'
    },
    {
      id: 'totalAmountPaid',
      label: 'Total Amount Paid',
      type: 'currency',
      explanation: 'Total of all payments (principal + interest)'
    },
    {
      id: 'numberOfPayments',
      label: 'Number of Payments',
      type: 'number',
      explanation: 'Total number of payments required'
    },
    {
      id: 'payoffDate',
      label: 'Estimated Payoff Date',
      type: 'date',
      explanation: 'Expected date when loan will be paid off'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Personal Loan - 5 Years',
      description: 'Standard 5-year personal loan for debt consolidation',
      inputs: {
        loanAmount: 25000,
        interestRate: 8.5,
        loanTerm: 5,
        paymentFrequency: 'monthly',
        loanType: 'personal'
      },
      expectedOutputs: {
        monthlyPayment: 510,
        totalInterestPaid: 5600,
        totalAmountPaid: 30600,
        numberOfPayments: 60,
        payoffDate: '2029-10-03'
      }
    },
    {
      title: 'Business Loan with Extra Payments',
      description: '3-year business loan with quarterly payments and extra payments',
      inputs: {
        loanAmount: 50000,
        interestRate: 6.75,
        loanTerm: 3,
        paymentFrequency: 'quarterly',
        loanType: 'business',
        extraPayment: 2000
      },
      expectedOutputs: {
        monthlyPayment: 4600,
        totalInterestPaid: 7800,
        totalAmountPaid: 57800,
        numberOfPayments: 12,
        payoffDate: '2027-07-03'
      }
    },
    {
      title: 'Student Loan - 10 Years',
      description: 'Long-term student loan with annual payments',
      inputs: {
        loanAmount: 35000,
        interestRate: 4.5,
        loanTerm: 10,
        paymentFrequency: 'annually',
        loanType: 'student'
      },
      expectedOutputs: {
        monthlyPayment: 4200,
        totalInterestPaid: 7000,
        totalAmountPaid: 42000,
        numberOfPayments: 10,
        payoffDate: '2034-10-03'
      }
    }
  ],

  calculateResult: (inputs: LoanCalculatorInputs): LoanCalculatorOutputs => {
    // Validate inputs
    const inputErrors = validateLoanCalculatorInputs(inputs);
    if (inputErrors.length > 0) {
      throw new Error(`Validation failed: ${inputErrors.map(e => e.message).join(', ')}`);
    }

    // Calculate results
    const outputs = calculateLoanResult(inputs);

    // Add business rule warnings
    const warnings = validateLoanCalculatorBusinessRules(inputs);
    if (warnings.length > 0) {
      console.warn('Business rule warnings:', warnings.map(w => w.message).join(', '));
    }

    return outputs;
  },

  generateAnalysis: (inputs: LoanCalculatorInputs, outputs: LoanCalculatorOutputs) => {
    return generateLoanAnalysis(inputs, outputs);
  }
};
