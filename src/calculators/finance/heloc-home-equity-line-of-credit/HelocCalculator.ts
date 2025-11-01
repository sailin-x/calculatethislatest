import { Calculator } from '../../types/calculator';
import { HelocInputs, HelocOutputs } from './types';
import {
  calculateHomeEquity,
  calculateMaximumCreditLimit,
  calculateMonthlyPaymentDuringDraw,
  calculateMonthlyPaymentDuringRepayment,
  calculateTotalInterestPaid,
  calculateTotalPayments,
  calculatePayoffDate,
  generateHelocAnalysis
} from './formulas';
import { validateHelocInputs } from './validation';

export const HelocCalculator: Calculator = {
  id: 'heloc-calculator',
  title: 'HELOC (Home Equity Line of Credit) Calculator',
  category: 'finance',
  subcategory: 'Home Equity',
  description: 'Calculate Home Equity Line of Credit terms, payments, and costs with draw and repayment periods.',
  usageInstructions: [
    'Enter your home value and outstanding mortgage balance',
    'Specify the credit limit percentage available as HELOC',
    'Set the interest rate and draw period',
    'Define the repayment period for the drawn amount',
    'Review available credit, payments, and cost analysis'
  ],

  inputs: [
    {
      id: 'homeValue',
      label: 'Home Value ($)',
      type: 'currency',
      required: true,
      min: 50000,
      max: 10000000,
      tooltip: 'Current market value of your home'
    },
    {
      id: 'outstandingMortgageBalance',
      label: 'Outstanding Mortgage Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Remaining balance on your mortgage'
    },
    {
      id: 'creditLimitPercentage',
      label: 'Credit Limit Percentage (%)',
      type: 'percentage',
      required: true,
      min: 10,
      max: 100,
      tooltip: 'Percentage of home equity available as HELOC (typically 75-90%)'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      tooltip: 'Variable interest rate for HELOC (typically 2-3% above prime rate)'
    },
    {
      id: 'drawPeriodYears',
      label: 'Draw Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Years you can draw funds (interest-only period)'
    },
    {
      id: 'repaymentPeriodYears',
      label: 'Repayment Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Years to repay the drawn amount'
    },
    {
      id: 'monthlyDrawAmount',
      label: 'Monthly Draw Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Optional: Fixed monthly amount to draw'
    },
    {
      id: 'oneTimeDrawAmount',
      label: 'One-Time Draw Amount ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Optional: One-time draw amount'
    }
  ],

  outputs: [
    {
      id: 'availableCredit',
      label: 'Available Credit',
      type: 'currency',
      explanation: 'Maximum amount you can borrow based on home equity'
    },
    {
      id: 'maximumCreditLimit',
      label: 'Maximum Credit Limit',
      type: 'currency',
      explanation: 'Credit limit based on equity and percentage'
    },
    {
      id: 'monthlyPaymentDuringDraw',
      label: 'Monthly Payment (Draw Period)',
      type: 'currency',
      explanation: 'Interest-only payment during draw period'
    },
    {
      id: 'monthlyPaymentDuringRepayment',
      label: 'Monthly Payment (Repayment Period)',
      type: 'currency',
      explanation: 'Principal + interest payment during repayment'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest over life of HELOC'
    },
    {
      id: 'totalPayments',
      label: 'Total Payments',
      type: 'currency',
      explanation: 'Total amount paid including principal and interest'
    },
    {
      id: 'payoffDate',
      label: 'Payoff Date',
      type: 'text',
      explanation: 'Date when HELOC will be fully paid'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Standard HELOC',
      description: 'Calculate HELOC for $400K home with $200K mortgage at 80% credit limit',
      inputs: {
        homeValue: 400000,
        outstandingMortgageBalance: 200000,
        creditLimitPercentage: 80,
        interestRate: 7.5,
        drawPeriodYears: 10,
        repaymentPeriodYears: 20,
        monthlyDrawAmount: undefined,
        oneTimeDrawAmount: undefined
      },
      expectedOutputs: {
        availableCredit: 200000,
        maximumCreditLimit: 160000,
        monthlyPaymentDuringDraw: 1000,
        monthlyPaymentDuringRepayment: 1330,
        totalInterestPaid: 176000,
        totalPayments: 336000,
        payoffDate: '2054-10-26'
      }
    },
    {
      title: 'Conservative HELOC',
      description: 'Calculate conservative HELOC with lower credit limit percentage',
      inputs: {
        homeValue: 300000,
        outstandingMortgageBalance: 150000,
        creditLimitPercentage: 70,
        interestRate: 6.0,
        drawPeriodYears: 5,
        repaymentPeriodYears: 15,
        monthlyDrawAmount: undefined,
        oneTimeDrawAmount: 50000
      },
      expectedOutputs: {
        availableCredit: 150000,
        maximumCreditLimit: 105000,
        monthlyPaymentDuringDraw: 250,
        monthlyPaymentDuringRepayment: 650,
        totalInterestPaid: 42000,
        totalPayments: 92000,
        payoffDate: '2046-10-26'
      }
    }
  ]
};