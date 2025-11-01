import { Calculator } from '../../../types/calculator';
import { MortgageLifeInputs, MortgageLifeOutputs } from './types';
import { calculateMortgageLife } from './formulas';
import { validateMortgageLifeInputs, validateMortgageLifeBusinessRules } from './validation';

export const MortgageLifeCalculator: Calculator = {
  id: 'MortgageLifeCalculator',
  title: 'Mortgage Life Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Analyze mortgage implications over your lifetime including loan payoff timing, estate impact, survivor scenarios, and life insurance recommendations.',
  usageInstructions: [
    'Enter loan details and personal information',
    'Specify life expectancy and family situation',
    'Input financial details and goals',
    'Review lifetime projections and recommendations'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total loan amount'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Annual interest rate'
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
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'borrowerAge',
      label: 'Borrower Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Current age of the borrower'
    },
    {
      id: 'borrowerLifeExpectancy',
      label: 'Borrower Life Expectancy',
      type: 'number',
      required: true,
      min: 18,
      max: 120,
      tooltip: 'Expected lifespan of the borrower'
    },
    {
      id: 'includeSpouse',
      label: 'Include Spouse',
      type: 'boolean',
      required: false,
      tooltip: 'Include spouse in survivor calculations'
    },
    {
      id: 'spouseAge',
      label: 'Spouse Age',
      type: 'number',
      required: false,
      min: 18,
      max: 100,
      tooltip: 'Current age of the spouse'
    },
    {
      id: 'spouseLifeExpectancy',
      label: 'Spouse Life Expectancy',
      type: 'number',
      required: false,
      min: 18,
      max: 120,
      tooltip: 'Expected lifespan of the spouse'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly mortgage payment amount'
    },
    {
      id: 'propertyAppreciationRate',
      label: 'Annual Property Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual property value increase'
    },
    {
      id: 'inflationRate',
      label: 'Annual Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: -5,
      max: 20,
      step: 0.25,
      defaultValue: 3,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 25,
      step: 0.5,
      defaultValue: 5,
      tooltip: 'Rate used to discount future values'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: false,
      min: 1,
      max: 50,
      defaultValue: 30,
      tooltip: 'Period for long-term analysis'
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly gross income'
    },
    {
      id: 'monthlyExpenses',
      label: 'Monthly Expenses ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Monthly household expenses'
    },
    {
      id: 'estatePlanningConsiderations',
      label: 'Estate Planning Considerations',
      type: 'boolean',
      required: false,
      tooltip: 'Include estate planning analysis'
    },
    {
      id: 'childrenCount',
      label: 'Number of Children',
      type: 'number',
      required: false,
      min: 0,
      max: 10,
      defaultValue: 0,
      tooltip: 'Number of dependent children'
    },
    {
      id: 'childrenAges',
      label: 'Children Ages',
      type: 'text',
      required: false,
      tooltip: 'Ages of dependent children (comma-separated)'
    },
    {
      id: 'collegeFundNeeded',
      label: 'College Fund Needed ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total college education funding needed'
    },
    {
      id: 'retirementSavings',
      label: 'Retirement Savings ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current retirement savings balance'
    },
    {
      id: 'otherDebts',
      label: 'Other Debts ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total other household debts'
    },
    {
      id: 'lifeInsuranceCoverage',
      label: 'Current Life Insurance Coverage ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Current life insurance coverage amount'
    }
  ],

  outputs: [
    {
      id: 'loanPayoffAge',
      label: 'Loan Payoff Age',
      type: 'number',
      explanation: 'Age when mortgage will be paid off'
    },
    {
      id: 'loanPayoffYear',
      label: 'Loan Payoff Year',
      type: 'number',
      explanation: 'Year when mortgage will be paid off'
    },
    {
      id: 'totalPayments',
      label: 'Total Payments',
      type: 'currency',
      explanation: 'Total amount paid over loan life'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Paid',
      type: 'currency',
      explanation: 'Total interest paid over loan life'
    },
    {
      id: 'remainingBalanceAtDeath',
      label: 'Remaining Balance at Death',
      type: 'currency',
      explanation: 'Loan balance if borrower passes away'
    },
    {
      id: 'equityAtDeath',
      label: 'Equity at Death',
      type: 'currency',
      explanation: 'Property equity if borrower passes away'
    },
    {
      id: 'lifeInsuranceRecommendation',
      label: 'Life Insurance Recommendation',
      type: 'text',
      explanation: 'Recommended life insurance coverage'
    },
    {
      id: 'estateImpact',
      label: 'Estate Impact',
      type: 'text',
      explanation: 'Impact on estate and heirs'
    },
    {
      id: 'survivorScenarios',
      label: 'Survivor Scenarios',
      type: 'text',
      explanation: 'Analysis of scenarios if borrower or spouse dies first'
    },
    {
      id: 'longTermProjections',
      label: 'Long-Term Projections',
      type: 'text',
      explanation: 'Projections of loan balance and equity over time'
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'text',
      explanation: 'Assessment of longevity, market, and inflation risks'
    },
    {
      id: 'financialPlanning',
      label: 'Financial Planning Recommendations',
      type: 'text',
      explanation: 'Actionable recommendations for financial planning'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Young Professional with Long Mortgage',
      description: 'Analysis for a 30-year-old with a 30-year mortgage and long life expectancy',
      inputs: {
        loanAmount: 400000,
        interestRate: 6.5,
        loanTerm: 30,
        propertyValue: 500000,
        borrowerAge: 30,
        borrowerLifeExpectancy: 85,
        includeSpouse: true,
        spouseAge: 28,
        spouseLifeExpectancy: 87,
        monthlyPayment: 2538,
        propertyAppreciationRate: 3,
        inflationRate: 3,
        discountRate: 5,
        analysisPeriod: 30,
        monthlyIncome: 8000,
        monthlyExpenses: 5500,
        estatePlanningConsiderations: true,
        childrenCount: 2,
        collegeFundNeeded: 200000,
        retirementSavings: 50000,
        otherDebts: 25000,
        lifeInsuranceCoverage: 500000
      },
      expectedOutputs: {
        loanPayoffAge: 60,
        loanPayoffYear: 2054,
        totalPayments: 914000,
        totalInterest: 514000,
        remainingBalanceAtDeath: 0,
        equityAtDeath: 500000
      }
    },
    {
      title: 'Retiring with Mortgage Debt',
      description: 'Analysis for a 55-year-old approaching retirement with remaining mortgage',
      inputs: {
        loanAmount: 150000,
        interestRate: 5.25,
        loanTerm: 15,
        propertyValue: 300000,
        borrowerAge: 55,
        borrowerLifeExpectancy: 82,
        includeSpouse: true,
        spouseAge: 54,
        spouseLifeExpectancy: 84,
        monthlyPayment: 1280,
        propertyAppreciationRate: 2.5,
        inflationRate: 2.5,
        discountRate: 4,
        analysisPeriod: 20,
        monthlyIncome: 6000,
        monthlyExpenses: 4800,
        estatePlanningConsiderations: true,
        childrenCount: 0,
        collegeFundNeeded: 0,
        retirementSavings: 800000,
        otherDebts: 10000,
        lifeInsuranceCoverage: 250000
      },
      expectedOutputs: {
        loanPayoffAge: 70,
        loanPayoffYear: 2039,
        totalPayments: 230000,
        totalInterest: 80000,
        remainingBalanceAtDeath: 0,
        equityAtDeath: 300000
      }
    }
  ]
};