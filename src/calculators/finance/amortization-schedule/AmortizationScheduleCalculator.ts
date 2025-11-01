import { Calculator } from '../../types/calculator';
import { AmortizationScheduleInputs, AmortizationScheduleOutputs } from './types';
import {
  calculateMonthlyPayment,
  generateAmortizationSchedule,
  calculateAmortizationMetrics,
  generateAmortizationAnalysis
} from './formulas';
import { validateAmortizationScheduleInputs } from './validation';

export const AmortizationScheduleCalculator: Calculator = {
  id: 'amortization-schedule-calculator',
  title: 'Amortization Schedule Calculator',
  category: 'finance',
  subcategory: 'Loan Analysis',
  description: 'Generate detailed amortization schedules showing principal and interest payments over time, with options for extra payments.',
  usageInstructions: [
    'Enter the loan amount',
    'Specify the annual interest rate',
    'Set the loan term in years',
    'Optionally set a start date and extra payment amount',
    'Review the complete amortization schedule and payment breakdown'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 10000000,
      tooltip: 'Total amount borrowed'
    },
    {
      id: 'annualInterestRate',
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Annual interest rate for the loan'
    },
    {
      id: 'loanTermYears',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: false,
      tooltip: 'Optional start date for the amortization schedule'
    },
    {
      id: 'extraPayment',
      label: 'Extra Payment ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Optional extra payment per month to reduce loan term'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Regular monthly payment amount'
    },
    {
      id: 'totalPayments',
      label: 'Total Payments',
      type: 'currency',
      explanation: 'Total amount paid over loan term'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest',
      type: 'currency',
      explanation: 'Total interest paid over loan term'
    },
    {
      id: 'numberOfPayments',
      label: 'Number of Payments',
      type: 'number',
      explanation: 'Total number of payments required'
    },
    {
      id: 'loanPayoffDate',
      label: 'Loan Payoff Date',
      type: 'text',
      explanation: 'Date when loan will be fully paid'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '30-Year Mortgage',
      description: 'Calculate amortization schedule for a $300,000 mortgage at 4% interest',
      inputs: {
        loanAmount: 300000,
        annualInterestRate: 4,
        loanTermYears: 30,
        startDate: undefined,
        extraPayment: undefined
      },
      expectedOutputs: {
        monthlyPayment: 1432.25,
        totalPayments: 515610.00,
        totalInterest: 215610.00,
        numberOfPayments: 360,
        loanPayoffDate: '2054-10-26'
      }
    },
    {
      title: '15-Year Mortgage with Extra Payments',
      description: 'Calculate accelerated payoff with $200 monthly extra payments',
      inputs: {
        loanAmount: 250000,
        annualInterestRate: 3.5,
        loanTermYears: 15,
        startDate: undefined,
        extraPayment: 200
      },
      expectedOutputs: {
        monthlyPayment: 1796.18,
        totalPayments: 215541.60,
        totalInterest: 35541.60,
        numberOfPayments: 120,
        loanPayoffDate: '2039-10-26'
      }
    }
  ]
};