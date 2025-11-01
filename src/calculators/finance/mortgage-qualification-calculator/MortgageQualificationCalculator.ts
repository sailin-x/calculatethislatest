import { Calculator } from '../../../types/calculator';
import { MortgageQualificationInputs, MortgageQualificationOutputs } from './types';
import { calculateMortgageQualification } from './formulas';
import { validateMortgageQualificationInputs, validateMortgageQualificationBusinessRules } from './validation';

export const MortgageQualificationCalculator: Calculator = {
  id: 'MortgageQualificationCalculator',
  title: 'Mortgage Qualification Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Determine mortgage qualification based on income, credit, assets, and debts. Get pre-qualification amounts and improvement strategies.',
  usageInstructions: [
    'Enter income and employment details',
    'Provide credit score and debt information',
    'Input asset and property details',
    'Review qualification status and recommendations'
  ],

  inputs: [
    {
      id: 'annualIncome',
      label: 'Annual Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total annual gross income'
    },
    {
      id: 'monthlyDebts',
      label: 'Monthly Debts ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total monthly debt payments'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Available down payment amount'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'FICO credit score'
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
        { value: 'usda', label: 'USDA' },
        { value: 'jumbo', label: 'Jumbo' }
      ],
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Estimated property value'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Desired loan term in years'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Estimated interest rate'
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total monthly gross income'
    },
    {
      id: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'employed', label: 'Employed' },
        { value: 'self_employed', label: 'Self-Employed' },
        { value: 'retired', label: 'Retired' },
        { value: 'unemployed', label: 'Unemployed' }
      ],
      tooltip: 'Employment status'
    },
    {
      id: 'employmentLength',
      label: 'Employment Length (Months)',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Months at current employment'
    },
    {
      id: 'bankruptcyHistory',
      label: 'Bankruptcy History',
      type: 'boolean',
      required: false,
      tooltip: 'Filed for bankruptcy in last 7 years?'
    },
    {
      id: 'foreclosureHistory',
      label: 'Foreclosure History',
      type: 'boolean',
      required: false,
      tooltip: 'Experienced foreclosure in last 7 years?'
    },
    {
      id: 'latePayments',
      label: 'Late Payments (Last 2 Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 12,
      tooltip: 'Number of late payments in last 2 years'
    },
    {
      id: 'giftFunds',
      label: 'Gift Funds ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Gift funds for down payment'
    },
    {
      id: 'coSigner',
      label: 'Co-Signer Available',
      type: 'boolean',
      required: false,
      tooltip: 'Co-signer available for loan?'
    },
    {
      id: 'coSignerIncome',
      label: 'Co-Signer Monthly Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Co-signer monthly income'
    },
    {
      id: 'coSignerCreditScore',
      label: 'Co-Signer Credit Score',
      type: 'number',
      required: false,
      min: 300,
      max: 850,
      tooltip: 'Co-signer credit score'
    },
    {
      id: 'rentalIncome',
      label: 'Monthly Rental Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly rental income from investments'
    },
    {
      id: 'alimonyIncome',
      label: 'Monthly Alimony Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly alimony/child support income'
    },
    {
      id: 'commissionIncome',
      label: 'Monthly Commission Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly commission income'
    },
    {
      id: 'bonusIncome',
      label: 'Monthly Bonus Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly bonus income'
    },
    {
      id: 'overtimeIncome',
      label: 'Monthly Overtime Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly overtime income'
    },
    {
      id: 'otherIncome',
      label: 'Other Monthly Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other monthly income sources'
    },
    {
      id: 'monthlyRent',
      label: 'Monthly Rent ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current monthly rent payment'
    },
    {
      id: 'hoaFees',
      label: 'Monthly HOA Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly homeowners association fees'
    },
    {
      id: 'propertyTaxes',
      label: 'Annual Property Taxes ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual property tax amount'
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Annual homeowners insurance premium'
    },
    {
      id: 'floodInsurance',
      label: 'Monthly Flood Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly flood insurance premium'
    },
    {
      id: 'mortgageInsurance',
      label: 'Monthly Mortgage Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly private mortgage insurance'
    },
    {
      id: 'childCareExpenses',
      label: 'Monthly Child Care ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly child care expenses'
    },
    {
      id: 'educationExpenses',
      label: 'Monthly Education ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly education expenses'
    },
    {
      id: 'medicalExpenses',
      label: 'Monthly Medical ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly medical expenses'
    },
    {
      id: 'transportationExpenses',
      label: 'Monthly Transportation ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly transportation expenses'
    },
    {
      id: 'foodExpenses',
      label: 'Monthly Food ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly food expenses'
    },
    {
      id: 'utilitiesExpenses',
      label: 'Monthly Utilities ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly utility expenses'
    },
    {
      id: 'entertainmentExpenses',
      label: 'Monthly Entertainment ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly entertainment expenses'
    },
    {
      id: 'otherExpenses',
      label: 'Other Monthly Expenses ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other monthly expenses'
    },
    {
      id: 'numberOfDependents',
      label: 'Number of Dependents',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      tooltip: 'Number of dependents'
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
      tooltip: 'Marital status'
    },
    {
      id: 'spouseIncome',
      label: 'Spouse Monthly Income ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Spouse monthly income'
    },
    {
      id: 'spouseDebts',
      label: 'Spouse Monthly Debts ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Spouse monthly debt payments'
    },
    {
      id: 'assets.checking',
      label: 'Checking Account Balance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Checking account balance'
    },
    {
      id: 'assets.savings',
      label: 'Savings Account Balance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Savings account balance'
    },
    {
      id: 'assets.investments',
      label: 'Investment Account Balance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Investment account balance'
    },
    {
      id: 'assets.retirement',
      label: 'Retirement Account Balance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Retirement account balance'
    },
    {
      id: 'assets.other',
      label: 'Other Assets ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other asset balances'
    },
    {
      id: 'debts.creditCards',
      label: 'Credit Card Balances ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total credit card balances'
    },
    {
      id: 'debts.carLoans',
      label: 'Car Loan Balances ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total car loan balances'
    },
    {
      id: 'debts.studentLoans',
      label: 'Student Loan Balances ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total student loan balances'
    },
    {
      id: 'debts.personalLoans',
      label: 'Personal Loan Balances ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total personal loan balances'
    },
    {
      id: 'debts.other',
      label: 'Other Debts ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other debt balances'
    }
  ],

  outputs: [
    {
      id: 'preQualificationAmount',
      label: 'Pre-Qualification Amount',
      type: 'currency',
      explanation: 'Estimated loan amount you may qualify for'
    },
    {
      id: 'debtToIncomeRatio',
      label: 'Debt-to-Income Ratio (%)',
      type: 'percentage',
      explanation: 'Ratio of monthly debts to monthly income'
    },
    {
      id: 'frontEndRatio',
      label: 'Front-End Ratio (%)',
      type: 'percentage',
      explanation: 'Housing expenses as percentage of income'
    },
    {
      id: 'backEndRatio',
      label: 'Back-End Ratio (%)',
      type: 'percentage',
      explanation: 'All debts as percentage of income'
    },
    {
      id: 'loanToValueRatio',
      label: 'Loan-to-Value Ratio (%)',
      type: 'percentage',
      explanation: 'Loan amount as percentage of property value'
    },
    {
      id: 'qualificationStatus',
      label: 'Qualification Status',
      type: 'text',
      explanation: 'Overall qualification assessment'
    },
    {
      id: 'maximumLoanAmount',
      label: 'Maximum Loan Amount',
      type: 'currency',
      explanation: 'Maximum loan amount based on qualification'
    },
    {
      id: 'minimumDownPayment',
      label: 'Minimum Down Payment',
      type: 'currency',
      explanation: 'Minimum required down payment'
    },
    {
      id: 'estimatedMonthlyPayment',
      label: 'Estimated Monthly Payment',
      type: 'currency',
      explanation: 'Estimated monthly mortgage payment'
    },
    {
      id: 'affordabilityAnalysis',
      label: 'Affordability Analysis',
      type: 'text',
      explanation: 'Analysis of payment affordability'
    },
    {
      id: 'creditAnalysis',
      label: 'Credit Analysis',
      type: 'text',
      explanation: 'Credit score and history assessment'
    },
    {
      id: 'incomeAnalysis',
      label: 'Income Analysis',
      type: 'text',
      explanation: 'Income stability and sources assessment'
    },
    {
      id: 'debtAnalysis',
      label: 'Debt Analysis',
      type: 'text',
      explanation: 'Debt composition and reduction suggestions'
    },
    {
      id: 'assetAnalysis',
      label: 'Asset Analysis',
      type: 'text',
      explanation: 'Asset sufficiency and reserve analysis'
    },
    {
      id: 'loanOptions',
      label: 'Loan Options',
      type: 'text',
      explanation: 'Available loan programs and options'
    },
    {
      id: 'improvementStrategies',
      label: 'Improvement Strategies',
      type: 'text',
      explanation: 'Strategies to improve qualification'
    },
    {
      id: 'nextSteps',
      label: 'Next Steps',
      type: 'text',
      explanation: 'Recommended next steps in the process'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk assessment and mitigation'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Strong Conventional Qualification',
      description: 'High-income borrower with excellent credit seeking conventional loan',
      inputs: {
        annualIncome: 120000,
        monthlyDebts: 800,
        downPayment: 60000,
        creditScore: 780,
        loanType: 'conventional',
        propertyValue: 400000,
        loanTerm: 30,
        interestRate: 6.25,
        monthlyIncome: 10000,
        employmentType: 'employed',
        employmentLength: 60,
        bankruptcyHistory: false,
        foreclosureHistory: false,
        latePayments: 0,
        assets: {
          checking: 15000,
          savings: 50000,
          investments: 100000,
          retirement: 200000,
          other: 25000
        },
        debts: {
          creditCards: 2000,
          carLoans: 8000,
          studentLoans: 0,
          personalLoans: 0,
          other: 0
        }
      },
      expectedOutputs: {
        preQualificationAmount: 340000,
        debtToIncomeRatio: 8,
        qualificationStatus: 'Strong',
        maximumLoanAmount: 340000,
        estimatedMonthlyPayment: 2080
      }
    },
    {
      title: 'FHA Qualification with Credit Issues',
      description: 'First-time buyer with fair credit seeking FHA loan',
      inputs: {
        annualIncome: 65000,
        monthlyDebts: 600,
        downPayment: 8000,
        creditScore: 620,
        loanType: 'fha',
        propertyValue: 200000,
        loanTerm: 30,
        interestRate: 6.75,
        monthlyIncome: 5417,
        employmentType: 'employed',
        employmentLength: 18,
        bankruptcyHistory: false,
        foreclosureHistory: false,
        latePayments: 2,
        assets: {
          checking: 3000,
          savings: 8000,
          investments: 0,
          retirement: 15000,
          other: 0
        },
        debts: {
          creditCards: 3000,
          carLoans: 12000,
          studentLoans: 25000,
          personalLoans: 0,
          other: 0
        }
      },
      expectedOutputs: {
        preQualificationAmount: 192000,
        debtToIncomeRatio: 11,
        qualificationStatus: 'Fair',
        maximumLoanAmount: 192000,
        estimatedMonthlyPayment: 1240
      }
    }
  ]
};