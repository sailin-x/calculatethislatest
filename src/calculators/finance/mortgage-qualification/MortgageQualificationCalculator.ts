import { Calculator } from '../../../types/calculator';
import { calculateMortgageQualification, analyzeQualificationFactors, calculateQualificationScenarios } from './formulas';
import { validateMortgageQualificationInputs } from './validation';
import { quickValidateAllInputs } from './quickValidation';

export const mortgageQualificationCalculator: Calculator = {
  id: 'mortgage-qualification',
  title: 'Mortgage Qualification Calculator',
  category: 'finance',
  subcategory: 'mortgage',
  description: 'Calculate mortgage qualification amounts, debt-to-income ratios, and analyze factors that affect your ability to qualify for a mortgage loan.',
  usageInstructions: 'Enter your financial information including income, debts, and down payment to see how much mortgage you can qualify for and what factors affect your qualification.',
  inputs: [
    {
      id: 'grossMonthlyIncome',
      label: 'Gross Monthly Income',
      type: 'number',
      required: true,
      min: 1000,
      max: 1000000,
      step: 100,
      tooltip: 'Your total monthly income before taxes and deductions',
      placeholder: '8000',
      defaultValue: 8000
    },
    {
      id: 'monthlyDebts',
      label: 'Monthly Debt Payments',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 50,
      tooltip: 'Total monthly payments on existing debts (credit cards, car loans, student loans, etc.)',
      placeholder: '1200',
      defaultValue: 1200
    },
    {
      id: 'downPayment',
      label: 'Down Payment Amount',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      tooltip: 'Amount you can put down as a down payment',
      placeholder: '60000',
      defaultValue: 60000
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      step: 1,
      tooltip: 'Your current credit score (FICO score)',
      placeholder: '750',
      defaultValue: 750
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 20,
      step: 0.125,
      tooltip: 'Expected mortgage interest rate',
      placeholder: '4.5',
      defaultValue: 4.5
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'select',
      required: true,
      options: [
        { value: '15', label: '15 Years' },
        { value: '20', label: '20 Years' },
        { value: '30', label: '30 Years' }
      ],
      tooltip: 'Length of the mortgage loan',
      defaultValue: '30'
    },
    {
      id: 'propertyTaxRate',
      label: 'Property Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.01,
      tooltip: 'Annual property tax rate for the area',
      placeholder: '1.2',
      defaultValue: 1.2
    },
    {
      id: 'homeownersInsurance',
      label: 'Annual Homeowners Insurance',
      type: 'number',
      required: false,
      min: 0,
      max: 10000,
      step: 100,
      tooltip: 'Annual cost of homeowners insurance',
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
      defaultValue: 0.5
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
      id: 'dtiRatio',
      label: 'Maximum DTI Ratio (%)',
      type: 'number',
      required: false,
      min: 20,
      max: 50,
      step: 1,
      tooltip: 'Maximum debt-to-income ratio allowed by lender',
      placeholder: '43',
      defaultValue: 43
    },
    {
      id: 'frontEndRatio',
      label: 'Maximum Front-End Ratio (%)',
      type: 'number',
      required: false,
      min: 20,
      max: 40,
      step: 1,
      tooltip: 'Maximum housing expense ratio allowed by lender',
      placeholder: '28',
      defaultValue: 28
    },
    {
      id: 'reserves',
      label: 'Reserves (Months)',
      type: 'number',
      required: false,
      min: 0,
      max: 24,
      step: 1,
      tooltip: 'Number of months of mortgage payments in reserves',
      placeholder: '6',
      defaultValue: 6
    },
    {
      id: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: false,
      options: [
        { value: 'w2', label: 'W-2 Employee' },
        { value: 'self-employed', label: 'Self-Employed' },
        { value: 'business-owner', label: 'Business Owner' },
        { value: 'retired', label: 'Retired' }
      ],
      tooltip: 'Your employment status',
      defaultValue: 'w2'
    },
    {
      id: 'incomeStability',
      label: 'Income Stability (Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.5,
      tooltip: 'Years in current job or business',
      placeholder: '3',
      defaultValue: 3
    }
  ],
  outputs: [
    {
      id: 'maxLoanAmount',
      label: 'Maximum Loan Amount',
      type: 'currency',
      format: 'USD',
      explanation: 'Maximum mortgage loan amount you can qualify for'
    },
    {
      id: 'maxHomePrice',
      label: 'Maximum Home Price',
      type: 'currency',
      format: 'USD',
      explanation: 'Maximum home price you can afford including down payment'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Mortgage Payment',
      type: 'currency',
      format: 'USD',
      explanation: 'Estimated monthly mortgage payment (PITI)'
    },
    {
      id: 'dtiRatio',
      label: 'Debt-to-Income Ratio',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Your debt-to-income ratio with the mortgage'
    },
    {
      id: 'frontEndRatio',
      label: 'Front-End Ratio',
      type: 'percentage',
      format: 'decimal',
      explanation: 'Your housing expense ratio'
    },
    {
      id: 'qualificationScore',
      label: 'Qualification Score',
      type: 'number',
      format: 'decimal',
      explanation: 'Overall qualification score (0-100)'
    },
    {
      id: 'qualificationFactors',
      label: 'Qualification Factors',
      type: 'table',
      format: 'JSON',
      explanation: 'Detailed analysis of factors affecting qualification'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      format: 'markdown',
      explanation: 'Personalized recommendations to improve qualification'
    }
  ],
  formulas: [
    {
      id: 'calculateQualification',
      name: 'Calculate Mortgage Qualification',
      description: 'Calculate maximum loan amount and qualification metrics',
      calculate: calculateMortgageQualification
    },
    {
      id: 'analyzeFactors',
      name: 'Analyze Qualification Factors',
      description: 'Analyze factors that affect mortgage qualification',
      calculate: analyzeQualificationFactors
    },
    {
      id: 'calculateScenarios',
      name: 'Calculate Qualification Scenarios',
      description: 'Generate different qualification scenarios based on various factors',
      calculate: calculateQualificationScenarios
    }
  ],
  validationRules: [
    {
      id: 'validateInputs',
      name: 'Validate Inputs',
      description: 'Validate all input values for reasonableness and business rules',
      validate: validateMortgageQualificationInputs
    }
  ],
  examples: [
    {
      title: 'Standard Conventional Loan',
      description: 'Calculate qualification for a conventional 30-year fixed mortgage',
      inputs: {
        grossMonthlyIncome: 8000,
        monthlyDebts: 1200,
        downPayment: 60000,
        creditScore: 750,
        interestRate: 4.5,
        loanTerm: '30',
        propertyTaxRate: 1.2,
        homeownersInsurance: 1200,
        pmiRate: 0.5,
        loanType: 'conventional',
        dtiRatio: 43,
        frontEndRatio: 28,
        reserves: 6,
        employmentType: 'w2',
        incomeStability: 3
      },
      expectedOutputs: {
        maxLoanAmount: 320000,
        maxHomePrice: 380000,
        monthlyPayment: 1620,
        dtiRatio: 35.5,
        frontEndRatio: 20.3,
        qualificationScore: 85
      }
    },
    {
      title: 'FHA Loan with Lower Credit Score',
      description: 'Calculate qualification for an FHA loan with a lower credit score',
      inputs: {
        grossMonthlyIncome: 6000,
        monthlyDebts: 800,
        downPayment: 20000,
        creditScore: 650,
        interestRate: 5.0,
        loanTerm: '30',
        propertyTaxRate: 1.0,
        homeownersInsurance: 1000,
        pmiRate: 0.85,
        loanType: 'fha',
        dtiRatio: 43,
        frontEndRatio: 31,
        reserves: 3,
        employmentType: 'w2',
        incomeStability: 2
      },
      expectedOutputs: {
        maxLoanAmount: 240000,
        maxHomePrice: 260000,
        monthlyPayment: 1350,
        dtiRatio: 35.8,
        frontEndRatio: 22.5,
        qualificationScore: 72
      }
    },
    {
      title: 'High-Income Borrower',
      description: 'Calculate qualification for a high-income borrower with excellent credit',
      inputs: {
        grossMonthlyIncome: 15000,
        monthlyDebts: 2000,
        downPayment: 150000,
        creditScore: 800,
        interestRate: 4.0,
        loanTerm: '30',
        propertyTaxRate: 1.5,
        homeownersInsurance: 2000,
        pmiRate: 0,
        loanType: 'conventional',
        dtiRatio: 43,
        frontEndRatio: 28,
        reserves: 12,
        employmentType: 'w2',
        incomeStability: 5
      },
      expectedOutputs: {
        maxLoanAmount: 750000,
        maxHomePrice: 900000,
        monthlyPayment: 3580,
        dtiRatio: 37.2,
        frontEndRatio: 23.9,
        qualificationScore: 92
      }
    }
  ],
  quickValidation: quickValidateAllInputs
};