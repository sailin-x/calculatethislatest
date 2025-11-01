import { Calculator } from '../../types/calculator';
import { StudentLoanRepaymentInputs, StudentLoanRepaymentOutputs } from './types';
import {
  calculateStudentLoanRepayment,
  generateStudentLoanRepaymentAnalysis
} from './formulas';
import { validateStudentLoanRepaymentInputs, validateStudentLoanRepaymentBusinessRules } from './validation';

export const StudentLoanRepaymentCalculator: Calculator = {
  id: 'StudentLoanRepaymentCalculator',
  title: 'Student Loan Repayment Calculator',
  category: 'finance',
  subcategory: 'Student Loans',
  description: 'Calculate monthly payments and compare different federal student loan repayment plans including Standard, Income-Based, PAYE, and more.',
  usageInstructions: [
    'Enter your loan balance, interest rate, and term',
    'Provide your income and expense information',
    'Select your preferred repayment plan',
    'Review payment amounts and affordability analysis',
    'Compare different repayment options'
  ],

  inputs: [
    {
      id: 'loanBalance',
      label: 'Loan Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total remaining student loan balance'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.125,
      tooltip: 'Current interest rate on your student loans'
    },
    {
      id: 'loanTermYears',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Original loan term in years'
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Your gross monthly income'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total monthly expenses excluding student loan payments'
    },
    {
      id: 'repaymentPlan',
      label: 'Repayment Plan',
      type: 'select',
      required: true,
      options: [
        { value: 'standard', label: 'Standard Repayment' },
        { value: 'graduated', label: 'Graduated Repayment' },
        { value: 'extended', label: 'Extended Repayment' },
        { value: 'income_based', label: 'Income-Based Repayment (IBR)' },
        { value: 'pay_as_you_earn', label: 'Pay As You Earn (PAYE)' },
        { value: 'revised_pay_as_you_earn', label: 'Revised Pay As You Earn (REPAYE)' },
        { value: 'income_contingent', label: 'Income Contingent Repayment (ICR)' },
        { value: 'income_sensitive', label: 'Income Sensitive Repayment (ISR)' }
      ],
      tooltip: 'Federal student loan repayment plan'
    },
    {
      id: 'familySize',
      label: 'Family Size',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      tooltip: 'Total number of people in your household'
    },
    {
      id: 'stateOfResidence',
      label: 'State of Residence',
      type: 'text',
      required: false,
      tooltip: 'Your state of residence (affects poverty guidelines)'
    },
    {
      id: 'employmentStatus',
      label: 'Employment Status',
      type: 'select',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'unemployed', label: 'Unemployed' },
        { value: 'student', label: 'Student' },
        { value: 'retired', label: 'Retired' }
      ],
      tooltip: 'Your current employment status'
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: false,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
      ],
      tooltip: 'Your marital status'
    },
    {
      id: 'spouseIncome',
      label: 'Spouse Annual Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual income of your spouse (for REPAYE calculations)'
    },
    {
      id: 'dependents',
      label: 'Number of Dependents',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      tooltip: 'Number of dependents claimed on taxes'
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Your current age'
    },
    {
      id: 'expectedIncomeGrowth',
      label: 'Expected Income Growth (%/year)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      tooltip: 'Expected annual income growth rate'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%/year)',
      type: 'percentage',
      required: false,
      min: -5,
      max: 20,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      tooltip: 'Your marginal tax rate'
    }
  ],

  outputs: [
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Monthly payment amount for the selected repayment plan'
    },
    {
      id: 'totalPayments',
      label: 'Total Payments',
      type: 'currency',
      explanation: 'Total amount paid over the loan term'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest',
      type: 'currency',
      explanation: 'Total interest paid over the loan term'
    },
    {
      id: 'payoffDate',
      label: 'Payoff Date',
      type: 'text',
      explanation: 'Estimated date when the loan will be paid off'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio',
      type: 'percentage',
      explanation: 'Total debt payments as percentage of income'
    },
    {
      id: 'paymentToIncomeRatio',
      label: 'Payment-to-Income Ratio',
      type: 'percentage',
      explanation: 'Student loan payment as percentage of income'
    },
    {
      id: 'affordabilityScore',
      label: 'Affordability Score (0-100)',
      type: 'number',
      explanation: 'Score indicating how affordable the payment plan is'
    },
    {
      id: 'recommendedPlan',
      label: 'Recommended Plan',
      type: 'text',
      explanation: 'Suggested repayment plan based on your situation'
    },
    {
      id: 'estimatedMonthlySavings',
      label: 'Estimated Monthly Savings',
      type: 'currency',
      explanation: 'Potential monthly savings compared to standard repayment'
    },
    {
      id: 'yearsToPayoff',
      label: 'Years to Payoff',
      type: 'number',
      explanation: 'Number of years to pay off the loan'
    },
    {
      id: 'totalCost',
      label: 'Total Cost',
      type: 'currency',
      explanation: 'Total cost of the loan including all payments'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Standard Repayment Plan',
      description: '10-year standard repayment for a $30,000 loan',
      inputs: {
        loanBalance: 30000,
        interestRate: 5.5,
        loanTermYears: 10,
        monthlyIncome: 5000,
        monthlyExpenses: 3500,
        repaymentPlan: 'standard',
        familySize: 1,
        employmentStatus: 'employed',
        currentAge: 25
      },
      expectedOutputs: {
        monthlyPayment: 332,
        totalPayments: 39840,
        totalInterest: 9840,
        payoffDate: '2034-10-26',
        debtToIncomeRatio: 76.6,
        paymentToIncomeRatio: 6.64,
        affordabilityScore: 65,
        recommendedPlan: 'standard',
        estimatedMonthlySavings: 0,
        yearsToPayoff: 10,
        totalCost: 39840
      }
    },
    {
      title: 'Income-Based Repayment',
      description: 'Income-based repayment for lower income borrower',
      inputs: {
        loanBalance: 40000,
        interestRate: 6.0,
        loanTermYears: 10,
        monthlyIncome: 3000,
        monthlyExpenses: 2500,
        repaymentPlan: 'income_based',
        familySize: 2,
        employmentStatus: 'employed',
        currentAge: 28
      },
      expectedOutputs: {
        monthlyPayment: 200,
        totalPayments: 72000,
        totalInterest: 32000,
        payoffDate: '2044-10-26',
        debtToIncomeRatio: 75.0,
        paymentToIncomeRatio: 6.67,
        affordabilityScore: 70,
        recommendedPlan: 'income_based',
        estimatedMonthlySavings: 132,
        yearsToPayoff: 20,
        totalCost: 72000
      }
    },
    {
      title: 'PAYE Plan for Recent Graduate',
      description: 'Pay As You Earn plan for a recent graduate with student loan debt',
      inputs: {
        loanBalance: 50000,
        interestRate: 4.5,
        loanTermYears: 10,
        monthlyIncome: 4000,
        monthlyExpenses: 3000,
        repaymentPlan: 'pay_as_you_earn',
        familySize: 1,
        employmentStatus: 'employed',
        currentAge: 24
      },
      expectedOutputs: {
        monthlyPayment: 200,
        totalPayments: 72000,
        totalInterest: 22000,
        payoffDate: '2044-10-26',
        debtToIncomeRatio: 80.0,
        paymentToIncomeRatio: 5.0,
        affordabilityScore: 75,
        recommendedPlan: 'pay_as_you_earn',
        estimatedMonthlySavings: 183,
        yearsToPayoff: 20,
        totalCost: 72000
      }
    }
  ]
};