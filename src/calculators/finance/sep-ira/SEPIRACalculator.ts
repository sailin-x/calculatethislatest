import { Calculator } from '../../../types/calculator';
import { SEPIRAInputs, SEPIRAOutputs } from './types';
import { calculateSEPIRA } from './formulas';
import { validateSEPIRAInputs, validateSEPIRABusinessRules } from './validation';

export const SEPIRACalculator: Calculator = {
  id: 'SEPIRACalculator',
  title: 'SEP IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate SEP IRA contributions, growth, and tax advantages for self-employed individuals and small business owners.',
  usageInstructions: [
    'Enter your self-employment income and business details',
    'Input expected returns and contribution amounts',
    'Select filing status and tax bracket',
    'Review contribution limits and tax benefits'
  ],

  inputs: [
    {
      id: 'selfEmploymentIncome',
      label: 'Self-Employment Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Your net self-employment income (after business expenses)'
    },
    {
      id: 'employerContribution',
      label: 'Annual Employer Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount contributed by the employer (business owner)'
    },
    {
      id: 'employeeContribution',
      label: 'Annual Employee Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount contributed by the employee'
    },
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 50,
      step: 0.1,
      defaultValue: 7,
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'yearsToContribute',
      label: 'Years to Contribute',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Number of years you plan to contribute'
    },
    {
      id: 'currentBalance',
      label: 'Current Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current SEP IRA balance'
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Your marginal tax rate'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married_filing_jointly', label: 'Married Filing Jointly' },
        { value: 'married_filing_separately', label: 'Married Filing Separately' }
      ],
      tooltip: 'Your tax filing status'
    },
    {
      id: 'numberOfEmployees',
      label: 'Number of Employees',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Number of employees in your business (excluding yourself)'
    },
    {
      id: 'businessType',
      label: 'Business Type',
      type: 'select',
      required: true,
      options: [
        { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'corporation', label: 'Corporation' }
      ],
      tooltip: 'Legal structure of your business'
    }
  ],

  outputs: [
    {
      id: 'totalEmployerContribution',
      label: 'Total Employer Contributions',
      type: 'currency',
      explanation: 'Total employer contributions over the contribution period'
    },
    {
      id: 'totalEmployeeContribution',
      label: 'Total Employee Contributions',
      type: 'currency',
      explanation: 'Total employee contributions over the contribution period'
    },
    {
      id: 'futureValue',
      label: 'Future Value',
      type: 'currency',
      explanation: 'Projected SEP IRA balance after contribution period'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed over the period'
    },
    {
      id: 'totalEarnings',
      label: 'Total Earnings',
      type: 'currency',
      explanation: 'Total investment earnings'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from deductible contributions'
    },
    {
      id: 'effectiveReturn',
      label: 'Effective Return',
      type: 'percentage',
      explanation: 'Effective annual return after tax advantages'
    },
    {
      id: 'contributionLimit',
      label: 'Annual Contribution Limit',
      type: 'currency',
      explanation: 'Maximum annual contribution allowed'
    },
    {
      id: 'eligibilityStatus',
      label: 'Eligibility Status',
      type: 'text',
      explanation: 'Your eligibility for SEP IRA contributions'
    },
    {
      id: 'projectedBalanceByYear',
      label: 'Balance Projection by Year',
      type: 'text',
      explanation: 'Year-by-year balance projection showing growth and contributions'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Self-Employed Consultant',
      description: 'Consultant with $100,000 self-employment income maximizing SEP IRA contributions',
      inputs: {
        selfEmploymentIncome: 100000,
        employerContribution: 25000,
        employeeContribution: 0,
        expectedAnnualReturn: 7,
        yearsToContribute: 20,
        currentBalance: 0,
        taxBracket: 32,
        filingStatus: 'single',
        numberOfEmployees: 0,
        businessType: 'sole_proprietorship'
      },
      expectedOutputs: {
        totalEmployerContribution: 500000,
        totalEmployeeContribution: 0,
        futureValue: 1000000,
        totalContributions: 500000,
        totalEarnings: 500000,
        taxSavings: 160000,
        effectiveReturn: 7,
        contributionLimit: 25000,
        eligibilityStatus: 'Eligible for SEP IRA contributions',
        projectedBalanceByYear: []
      }
    },
    {
      title: 'Small Business Owner',
      description: 'Business owner with employees using SEP IRA for retirement planning',
      inputs: {
        selfEmploymentIncome: 150000,
        employerContribution: 30000,
        employeeContribution: 5000,
        expectedAnnualReturn: 8,
        yearsToContribute: 15,
        currentBalance: 50000,
        taxBracket: 35,
        filingStatus: 'married_filing_jointly',
        numberOfEmployees: 3,
        businessType: 'partnership'
      },
      expectedOutputs: {
        totalEmployerContribution: 450000,
        totalEmployeeContribution: 75000,
        futureValue: 800000,
        totalContributions: 575000,
        totalEarnings: 225000,
        taxSavings: 157500,
        effectiveReturn: 8,
        contributionLimit: 37500,
        eligibilityStatus: 'Eligible for SEP IRA contributions',
        projectedBalanceByYear: []
      }
    }
  ]
};