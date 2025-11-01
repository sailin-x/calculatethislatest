import { Calculator } from '../../types/calculator';
import { StudentLoanRefinancingInputs, StudentLoanRefinancingOutputs } from './types';
import {
  calculateStudentLoanRefinancing,
  generateStudentLoanRefinancingAnalysis
} from './formulas';
import { validateStudentLoanRefinancingInputs, validateStudentLoanRefinancingBusinessRules } from './validation';

export const StudentLoanRefinancingCalculator: Calculator = {
  id: 'StudentLoanRefinancingCalculator',
  title: 'Student Loan Refinancing Calculator',
  category: 'finance',
  subcategory: 'Student Loans',
  description: 'Calculate potential savings and compare options for refinancing student loans. Includes eligibility assessment, break-even analysis, and risk evaluation.',
  usageInstructions: [
    'Enter your current loan details (balance, rate, payment)',
    'Provide your credit score and income information',
    'Specify target refinancing terms if known',
    'Review savings analysis and eligibility score',
    'Consider risk assessment and recommendations'
  ],

  inputs: [
    {
      id: 'currentLoanBalance',
      label: 'Current Loan Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total remaining balance on your student loans'
    },
    {
      id: 'currentInterestRate',
      label: 'Current Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.125,
      tooltip: 'Current interest rate on your student loans'
    },
    {
      id: 'currentMonthlyPayment',
      label: 'Current Monthly Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Your current monthly student loan payment'
    },
    {
      id: 'remainingTermMonths',
      label: 'Remaining Term (Months)',
      type: 'number',
      required: true,
      min: 1,
      max: 360,
      tooltip: 'Months remaining on your current loan'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'Your current FICO credit score'
    },
    {
      id: 'annualIncome',
      label: 'Annual Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Your gross annual income'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      tooltip: 'Current debt obligations as percentage of income'
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
        { value: 'retired', label: 'Retired' }
      ],
      tooltip: 'Your current employment status'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'federal', label: 'Federal' },
        { value: 'private', label: 'Private' },
        { value: 'consolidation', label: 'Consolidation' }
      ],
      tooltip: 'Type of student loan'
    },
    {
      id: 'cosignerAvailable',
      label: 'Cosigner Available',
      type: 'boolean',
      required: false,
      tooltip: 'Do you have a cosigner available?'
    },
    {
      id: 'cosignerCreditScore',
      label: 'Cosigner Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      tooltip: 'Credit score of your cosigner'
    },
    {
      id: 'cosignerIncome',
      label: 'Cosigner Annual Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual income of your cosigner'
    },
    {
      id: 'targetInterestRate',
      label: 'Target Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 15,
      step: 0.125,
      tooltip: 'Desired interest rate for refinancing (leave blank for estimate)'
    },
    {
      id: 'targetTermYears',
      label: 'Target Term (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 30,
      tooltip: 'Desired loan term in years (leave blank to keep current term)'
    },
    {
      id: 'closingCosts',
      label: 'Estimated Closing Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Estimated fees and closing costs for refinancing'
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Your monthly income (calculated from annual if not provided)'
    },
    {
      id: 'monthlyDebts',
      label: 'Monthly Debt Payments ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total monthly debt payments excluding student loans'
    }
  ],

  outputs: [
    {
      id: 'newMonthlyPayment',
      label: 'New Monthly Payment',
      type: 'currency',
      explanation: 'Estimated monthly payment after refinancing'
    },
    {
      id: 'totalSavings',
      label: 'Total Savings',
      type: 'currency',
      explanation: 'Total savings over the life of the loan after closing costs'
    },
    {
      id: 'breakEvenMonths',
      label: 'Break-Even Period',
      type: 'number',
      explanation: 'Months needed to recover closing costs through savings'
    },
    {
      id: 'totalInterestSaved',
      label: 'Total Interest Saved',
      type: 'currency',
      explanation: 'Total interest savings over the loan term'
    },
    {
      id: 'newTotalPayments',
      label: 'New Total Payments',
      type: 'currency',
      explanation: 'Total amount paid over the new loan term'
    },
    {
      id: 'newTotalInterest',
      label: 'New Total Interest',
      type: 'currency',
      explanation: 'Total interest paid over the new loan term'
    },
    {
      id: 'paymentToIncomeRatio',
      label: 'Payment-to-Income Ratio',
      type: 'percentage',
      explanation: 'New monthly payment as percentage of income'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'New Debt-to-Income Ratio',
      type: 'percentage',
      explanation: 'Updated DTI ratio including new payment'
    },
    {
      id: 'eligibilityScore',
      label: 'Eligibility Score (0-100)',
      type: 'number',
      explanation: 'Score indicating likelihood of qualifying for refinancing'
    },
    {
      id: 'recommendedRefinance',
      label: 'Recommended to Refinance',
      type: 'boolean',
      explanation: 'Whether refinancing is recommended based on analysis'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk level of the refinancing decision'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Standard Refinancing Scenario',
      description: '30-year-old professional with good credit looking to refinance federal loans',
      inputs: {
        currentLoanBalance: 45000,
        currentInterestRate: 5.25,
        currentMonthlyPayment: 242,
        remainingTermMonths: 120,
        creditScore: 750,
        annualIncome: 85000,
        debtToIncomeRatio: 25,
        employmentStatus: 'employed',
        loanType: 'federal',
        cosignerAvailable: false,
        targetInterestRate: 3.75,
        targetTermYears: 10,
        closingCosts: 1500
      },
      expectedOutputs: {
        newMonthlyPayment: 477,
        totalSavings: 8900,
        breakEvenMonths: 7,
        totalInterestSaved: 10400,
        newTotalPayments: 57240,
        newTotalInterest: 12240,
        paymentToIncomeRatio: 0.67,
        debtToIncomeRatio: 28.5,
        eligibilityScore: 85,
        recommendedRefinance: true,
        riskAssessment: 'Low'
      }
    },
    {
      title: 'High Balance with Cosigner',
      description: 'Graduate student with high loan balance using cosigner',
      inputs: {
        currentLoanBalance: 120000,
        currentInterestRate: 6.8,
        currentMonthlyPayment: 1380,
        remainingTermMonths: 180,
        creditScore: 650,
        annualIncome: 45000,
        debtToIncomeRatio: 35,
        employmentStatus: 'employed',
        loanType: 'private',
        cosignerAvailable: true,
        cosignerCreditScore: 780,
        cosignerIncome: 95000,
        targetInterestRate: 4.5,
        targetTermYears: 15,
        closingCosts: 3000
      },
      expectedOutputs: {
        newMonthlyPayment: 909,
        totalSavings: 45000,
        breakEvenMonths: 12,
        totalInterestSaved: 48000,
        newTotalPayments: 163620,
        newTotalInterest: 43620,
        paymentToIncomeRatio: 2.42,
        debtToIncomeRatio: 38.2,
        eligibilityScore: 75,
        recommendedRefinance: true,
        riskAssessment: 'Medium'
      }
    },
    {
      title: 'Short Remaining Term',
      description: 'Borrower with only 2 years left on loan',
      inputs: {
        currentLoanBalance: 15000,
        currentInterestRate: 4.5,
        currentMonthlyPayment: 680,
        remainingTermMonths: 24,
        creditScore: 720,
        annualIncome: 65000,
        debtToIncomeRatio: 22,
        employmentStatus: 'employed',
        loanType: 'federal',
        cosignerAvailable: false,
        targetInterestRate: 3.25,
        targetTermYears: 10,
        closingCosts: 800
      },
      expectedOutputs: {
        newMonthlyPayment: 152,
        totalSavings: 2800,
        breakEvenMonths: 18,
        totalInterestSaved: 3600,
        newTotalPayments: 18240,
        newTotalInterest: 3240,
        paymentToIncomeRatio: 0.28,
        debtToIncomeRatio: 24.8,
        eligibilityScore: 80,
        recommendedRefinance: false,
        riskAssessment: 'Low'
      }
    }
  ]
};