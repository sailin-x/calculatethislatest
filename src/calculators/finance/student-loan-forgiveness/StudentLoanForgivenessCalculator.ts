import { Calculator } from '../../../types/calculator';
import { StudentLoanForgivenessInputs, StudentLoanForgivenessOutputs } from './types';
import { calculateStudentLoanForgiveness } from './formulas';
import { validateStudentLoanForgivenessInputs, validateStudentLoanForgivenessBusinessRules } from './validation';

export const StudentLoanForgivenessCalculator: Calculator = {
  id: 'StudentLoanForgivenessCalculator',
  title: 'Student Loan Forgiveness Calculator',
  category: 'finance',
  subcategory: 'Education & Student Loans',
  description: 'Calculate potential savings from student loan forgiveness programs including Public Service Loan Forgiveness (PSLF), income-driven repayment, and other forgiveness options.',
  usageInstructions: [
    'Enter your loan balance and current payment information',
    'Select the forgiveness program you qualify for',
    'Input your employment details and years of service',
    'Review eligibility status and potential savings'
  ],

  inputs: [
    {
      id: 'loanBalance',
      label: 'Current Loan Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 5000000,
      tooltip: 'Your remaining student loan balance'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 15,
      step: 0.125,
      tooltip: 'Annual interest rate on your loan'
    },
    {
      id: 'monthlyPayment',
      label: 'Current Monthly Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Your current monthly loan payment'
    },
    {
      id: 'forgivenessProgram',
      label: 'Forgiveness Program',
      type: 'select',
      required: true,
      options: [
        { value: 'public_service', label: 'Public Service Loan Forgiveness (PSLF)' },
        { value: 'income_driven', label: 'Income-Driven Repayment (IDR)' },
        { value: 'teacher', label: 'Teacher Loan Forgiveness' },
        { value: 'nurse', label: 'Nurse Corps Loan Repayment' },
        { value: 'other', label: 'Other Forgiveness Program' }
      ],
      tooltip: 'The forgiveness program you are enrolled in or plan to use'
    },
    {
      id: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'government', label: 'Government' },
        { value: 'nonprofit', label: 'Nonprofit Organization' },
        { value: 'teacher', label: 'Teacher' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'military', label: 'Military' },
        { value: 'other', label: 'Other' }
      ],
      tooltip: 'Your current employment sector'
    },
    {
      id: 'yearsOfService',
      label: 'Years of Service',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      tooltip: 'Years you have worked in qualifying employment'
    },
    {
      id: 'requiredYearsForForgiveness',
      label: 'Required Years for Forgiveness',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Years required for your forgiveness program'
    },
    {
      id: 'income',
      label: 'Annual Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Your current annual income'
    },
    {
      id: 'familySize',
      label: 'Family Size',
      type: 'number',
      required: true,
      min: 1,
      max: 20,
      tooltip: 'Number of people in your household'
    },
    {
      id: 'state',
      label: 'State',
      type: 'text',
      required: true,
      tooltip: 'Your state of residence (for state-specific programs)'
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
      id: 'expectedSalaryGrowth',
      label: 'Expected Salary Growth (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual salary increase'
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      tooltip: 'Your marginal tax rate (for tax on forgiven amount)'
    },
    {
      id: 'alternativePayment',
      label: 'Alternative Monthly Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly payment under standard repayment (for comparison)'
    }
  ],

  outputs: [
    {
      id: 'totalPaymentsMade',
      label: 'Total Payments Made',
      type: 'currency',
      explanation: 'Total amount paid before forgiveness'
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over the payment period'
    },
    {
      id: 'amountForgiven',
      label: 'Amount Forgiven',
      type: 'currency',
      explanation: 'Loan balance forgiven through the program'
    },
    {
      id: 'netSavings',
      label: 'Net Savings',
      type: 'currency',
      explanation: 'Savings compared to full repayment'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point',
      type: 'number',
      explanation: 'Years until forgiveness benefits equal payments made'
    },
    {
      id: 'timeToForgiveness',
      label: 'Time to Forgiveness',
      type: 'number',
      explanation: 'Years until loan forgiveness'
    },
    {
      id: 'monthlyPaymentSavings',
      label: 'Monthly Payment Savings',
      type: 'currency',
      explanation: 'Monthly savings compared to standard repayment'
    },
    {
      id: 'taxImplications',
      label: 'Tax on Forgiven Amount',
      type: 'currency',
      explanation: 'Tax liability on forgiven loan balance'
    },
    {
      id: 'effectiveCost',
      label: 'Effective Cost of Loan',
      type: 'currency',
      explanation: 'Total cost including taxes on forgiveness'
    },
    {
      id: 'forgivenessEligibility',
      label: 'Eligibility Status',
      type: 'text',
      explanation: 'Your eligibility for the selected forgiveness program'
    },
    {
      id: 'paymentSchedule',
      label: 'Payment Schedule',
      type: 'text',
      explanation: 'Year-by-year breakdown of payments and loan balance'
    },
    {
      id: 'alternativeScenarios',
      label: 'Alternative Scenarios',
      type: 'text',
      explanation: 'Comparison with other repayment options'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Personalized recommendations based on your situation'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Public Service Loan Forgiveness',
      description: 'Teacher with $80,000 loan balance eligible for PSLF after 10 years',
      inputs: {
        loanBalance: 80000,
        interestRate: 5.5,
        monthlyPayment: 400,
        forgivenessProgram: 'public_service',
        employmentType: 'teacher',
        yearsOfService: 7,
        requiredYearsForForgiveness: 10,
        income: 55000,
        familySize: 2,
        state: 'California',
        currentAge: 32,
        expectedSalaryGrowth: 3,
        taxBracket: 22,
        alternativePayment: 600
      },
      expectedOutputs: {
        totalPaymentsMade: 48000,
        totalInterestPaid: 8000,
        amountForgiven: 48000,
        netSavings: 40000,
        breakEvenPoint: 10,
        timeToForgiveness: 3,
        monthlyPaymentSavings: 200,
        taxImplications: 10560,
        effectiveCost: 37440,
        forgivenessEligibility: {
          isEligible: true,
          requirementsMet: ['Completed 7 years of required 10 years', 'Employment type (teacher) qualifies for public_service forgiveness'],
          requirementsNotMet: [],
          estimatedForgivenessDate: '2027'
        },
        paymentSchedule: [],
        alternativeScenarios: [],
        recommendations: []
      }
    },
    {
      title: 'Income-Driven Repayment',
      description: 'Graduate with high debt considering IDR forgiveness after 20 years',
      inputs: {
        loanBalance: 150000,
        interestRate: 6.5,
        monthlyPayment: 800,
        forgivenessProgram: 'income_driven',
        employmentType: 'nonprofit',
        yearsOfService: 3,
        requiredYearsForForgiveness: 20,
        income: 65000,
        familySize: 1,
        state: 'New York',
        currentAge: 28,
        expectedSalaryGrowth: 4,
        taxBracket: 24,
        alternativePayment: 1200
      },
      expectedOutputs: {
        totalPaymentsMade: 192000,
        totalInterestPaid: 42000,
        amountForgiven: 78000,
        netSavings: 36000,
        breakEvenPoint: 20,
        timeToForgiveness: 17,
        monthlyPaymentSavings: 400,
        taxImplications: 18720,
        effectiveCost: 173280,
        forgivenessEligibility: {
          isEligible: true,
          requirementsMet: ['Completed 3 years of required 20 years'],
          requirementsNotMet: [],
          estimatedForgivenessDate: '2045'
        },
        paymentSchedule: [],
        alternativeScenarios: [],
        recommendations: []
      }
    }
  ]
};