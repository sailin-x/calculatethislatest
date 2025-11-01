import { Calculator } from '../../types/calculator';
import { CreditCardPayoffInputs, CreditCardPayoffResults } from './types';
import { calculateCreditCardPayoff, validateCreditCardPayoffInputs } from './formulas';
import { getCreditCardPayoffValidationRules } from './validation';

export const creditCardPayoffCalculator: Calculator = {
  id: 'CreditCardPayoff-calculator',
  title: 'Credit Card Payoff Calculator',
  category: 'finance',
  subcategory: 'Loans & Debt',
  description: 'Calculate optimal strategies to pay off credit card debt. Compare minimum payments vs. accelerated payoff plans, analyze interest savings, and get personalized recommendations.',
  usageInstructions: [
    'Enter your current credit card balance and interest rate',
    'Input your minimum payment amount',
    'Specify your planned monthly payment',
    'Choose a payoff strategy (minimum, fixed, avalanche, or snowball)',
    'Review payoff timeline, total interest, and savings analysis',
    'Follow personalized recommendations to optimize your debt payoff'
  ],

  inputs: [
    // Current Debt Information
    {
      id: 'currentBalance',
      label: 'Current Balance',
      type: 'currency',
      required: true,
      placeholder: '5000',
      tooltip: 'Your current credit card balance',
      defaultValue: 5000,
      min: 1,
      max: 100000,
      step: 100
    },
    {
      id: 'annualInterestRate',
      label: 'Annual Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '18.99',
      tooltip: 'APR on your credit card',
      defaultValue: 18.99,
      min: 0,
      max: 50,
      step: 0.01
    },

    // Payment Information
    {
      id: 'minimumPayment',
      label: 'Minimum Payment',
      type: 'currency',
      required: true,
      placeholder: '125',
      tooltip: 'Minimum payment required by your card issuer',
      defaultValue: 125,
      min: 1,
      step: 5
    },
    {
      id: 'monthlyPayment',
      label: 'Your Monthly Payment',
      type: 'currency',
      required: true,
      placeholder: '200',
      tooltip: 'How much you plan to pay each month',
      defaultValue: 200,
      min: 1,
      step: 10
    },

    // Payoff Strategy
    {
      id: 'payoffStrategy',
      label: 'Payoff Strategy',
      type: 'select',
      required: true,
      options: [
        { value: 'minimum', label: 'Minimum Payment Only' },
        { value: 'fixed', label: 'Fixed Monthly Payment' },
        { value: 'avalanche', label: 'Debt Avalanche (High Interest First)' },
        { value: 'snowball', label: 'Debt Snowball (Smallest Balance First)' }
      ],
      defaultValue: 'fixed',
      tooltip: 'Strategy for paying off multiple debts'
    },

    // Additional Options
    {
      id: 'includeFees',
      label: 'Include Fees in Calculation',
      type: 'boolean',
      required: false,
      tooltip: 'Include late fees and other charges',
      defaultValue: false
    },
    {
      id: 'lateFees',
      label: 'Late Fees',
      type: 'currency',
      required: false,
      placeholder: '35',
      tooltip: 'Monthly late payment fees',
      defaultValue: 35,
      min: 0,
      max: 500,
      step: 5
    },
    {
      id: 'cashAdvanceFees',
      label: 'Cash Advance Fees',
      type: 'currency',
      required: false,
      placeholder: '50',
      tooltip: 'Cash advance fees and charges',
      defaultValue: 50,
      min: 0,
      max: 1000,
      step: 10
    },

    // Extra Payment Options
    {
      id: 'extraPayment',
      label: 'Extra Payment Amount',
      type: 'currency',
      required: false,
      placeholder: '50',
      tooltip: 'Additional amount to pay beyond minimum',
      defaultValue: 0,
      min: 0,
      step: 10
    },
    {
      id: 'extraPaymentFrequency',
      label: 'Extra Payment Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Biweekly' },
        { value: 'weekly', label: 'Weekly' }
      ],
      defaultValue: 'monthly',
      tooltip: 'How often to make extra payments'
    },

    // Goals
    {
      id: 'payoffGoalMonths',
      label: 'Payoff Goal (Months)',
      type: 'number',
      required: false,
      placeholder: '24',
      tooltip: 'Target months to become debt-free',
      defaultValue: 24,
      min: 1,
      max: 600
    }
  ],

  outputs: [
    // Current Situation Analysis
    {
      id: 'minimumPayment',
      label: 'Minimum Payment',
      type: 'currency',
      explanation: 'Your current minimum payment requirement'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate',
      type: 'percentage',
      explanation: 'Your current annual interest rate'
    },
    {
      id: 'timeToPayoffMinimum',
      label: 'Months to Payoff (Minimum)',
      type: 'number',
      explanation: 'Time to pay off debt with minimum payments only'
    },
    {
      id: 'totalInterestMinimum',
      label: 'Total Interest (Minimum)',
      type: 'currency',
      explanation: 'Total interest paid with minimum payments'
    },

    // Recommended Strategy
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Optimal payoff strategy based on your situation'
    },
    {
      id: 'recommendedMonthlyPayment',
      label: 'Recommended Monthly Payment',
      type: 'currency',
      explanation: 'Suggested monthly payment for optimal results'
    },
    {
      id: 'timeToPayoffRecommended',
      label: 'Months to Payoff (Recommended)',
      type: 'number',
      explanation: 'Time to pay off debt with recommended strategy'
    },
    {
      id: 'totalInterestRecommended',
      label: 'Total Interest (Recommended)',
      type: 'currency',
      explanation: 'Total interest paid with recommended strategy'
    },
    {
      id: 'interestSaved',
      label: 'Interest Saved',
      type: 'currency',
      explanation: 'Interest saved compared to minimum payments'
    },

    // Your Custom Strategy
    {
      id: 'timeToPayoffCustom',
      label: 'Your Payoff Timeline',
      type: 'number',
      explanation: 'Months to pay off debt with your planned payments'
    },
    {
      id: 'totalInterestCustom',
      label: 'Total Interest (Your Plan)',
      type: 'currency',
      explanation: 'Total interest paid with your payment plan'
    },
    {
      id: 'totalCostCustom',
      label: 'Total Cost (Your Plan)',
      type: 'currency',
      explanation: 'Total amount paid (principal + interest) with your plan'
    },

    // Financial Impact
    {
      id: 'monthlySavings',
      label: 'Monthly Savings vs Minimum',
      type: 'currency',
      explanation: 'How much you save monthly vs minimum payments'
    },
    {
      id: 'yearlySavings',
      label: 'Yearly Savings',
      type: 'currency',
      explanation: 'Annual savings with your payoff strategy'
    },

    // Timeline & Goals
    {
      id: 'debtFreeDate',
      label: 'Debt-Free Date',
      type: 'text',
      explanation: 'Estimated date you will be debt-free'
    },
    {
      id: 'payoffProgress',
      label: 'Current Progress',
      type: 'percentage',
      explanation: 'Progress toward becoming debt-free'
    },

    // Alternative Payment Options
    {
      id: 'biweeklyPayment',
      label: 'Biweekly Payment Equivalent',
      type: 'currency',
      explanation: 'Your monthly payment converted to biweekly'
    },
    {
      id: 'acceleratedPayoffMonths',
      label: 'Accelerated Payoff (20% Extra)',
      type: 'number',
      explanation: 'Months to payoff with 20% higher payments'
    },

    // Risk Assessment
    {
      id: 'riskAssessment',
      label: 'Risk Level',
      type: 'text',
      explanation: 'Assessment of your current debt situation'
    },
    {
      id: 'riskMessage',
      label: 'Risk Assessment Details',
      type: 'text',
      explanation: 'Detailed analysis of your debt situation'
    },

    // Recommendations
    {
      id: 'recommendations',
      label: 'Personalized Recommendations',
      type: 'text',
      explanation: 'Custom recommendations based on your situation'
    }
  ],

  formulas: [],

  validationRules: getCreditCardPayoffValidationRules(),

  examples: [
    {
      title: 'Average Credit Card Debt Payoff',
      description: '35YearOld with $5,000 balance at 18.99% APR',
      inputs: {
        currentBalance: 5000,
        annualInterestRate: 18.99,
        minimumPayment: 125,
        monthlyPayment: 200,
        payoffStrategy: 'fixed',
        includeFees: false,
        extraPayment: 0,
        extraPaymentFrequency: 'monthly'
      },
      expectedOutputs: {
        minimumPayment: 125,
        interestRate: 18.99,
        timeToPayoffMinimum: 83,
        totalInterestMinimum: 5417.50,
        recommendedStrategy: 'Pay more than minimum payment',
        recommendedMonthlyPayment: 187.50,
        timeToPayoffRecommended: 36,
        totalInterestRecommended: 1875.00,
        interestSaved: 3542.50,
        timeToPayoffCustom: 32,
        totalInterestCustom: 1596.67,
        totalCostCustom: 6596.67,
        monthlySavings: 75,
        debtFreeDate: 'March 2028',
        riskAssessment: 'medium'
      }
    },
    {
      title: 'High-Interest Debt Crisis',
      description: '28YearOld with $12,000 balance at 24.99% APR',
      inputs: {
        currentBalance: 12000,
        annualInterestRate: 24.99,
        minimumPayment: 300,
        monthlyPayment: 500,
        payoffStrategy: 'avalanche',
        includeFees: true,
        lateFees: 35,
        extraPayment: 100,
        extraPaymentFrequency: 'monthly'
      },
      expectedOutputs: {
        minimumPayment: 300,
        interestRate: 24.99,
        timeToPayoffMinimum: 120,
        totalInterestMinimum: 21600.00,
        recommendedStrategy: 'Consider debt consolidation or balance transfer',
        recommendedMonthlyPayment: 600,
        timeToPayoffRecommended: 28,
        totalInterestRecommended: 4080.00,
        interestSaved: 17520.00,
        timeToPayoffCustom: 24,
        totalInterestCustom: 2880.00,
        totalCostCustom: 14880.00,
        monthlySavings: 200,
        debtFreeDate: 'December 2027',
        riskAssessment: 'high'
      }
    },
    {
      title: 'Successful Debt Payoff Plan',
      description: '42YearOld with $2,500 balance at 12.99% APR',
      inputs: {
        currentBalance: 2500,
        annualInterestRate: 12.99,
        minimumPayment: 75,
        monthlyPayment: 150,
        payoffStrategy: 'snowball',
        includeFees: false,
        extraPayment: 50,
        extraPaymentFrequency: 'biweekly'
      },
      expectedOutputs: {
        minimumPayment: 75,
        interestRate: 12.99,
        timeToPayoffMinimum: 48,
        totalInterestMinimum: 1102.50,
        recommendedStrategy: 'Pay more than minimum payment',
        recommendedMonthlyPayment: 125,
        timeToPayoffRecommended: 24,
        totalInterestRecommended: 500.00,
        interestSaved: 602.50,
        timeToPayoffCustom: 16,
        totalInterestCustom: 283.33,
        totalCostCustom: 2783.33,
        monthlySavings: 75,
        debtFreeDate: 'August 2027',
        riskAssessment: 'low'
      }
    }
  ]
};