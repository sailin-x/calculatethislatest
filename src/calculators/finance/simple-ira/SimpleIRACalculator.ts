import { Calculator } from '../../../types/calculator';
import { SimpleIRAInputs, SimpleIRAOutputs } from './types';
import { calculateSimpleIRA } from './formulas';
import { validateSimpleIRAInputs, validateSimpleIRABusinessRules } from './validation';

export const SimpleIRACalculator: Calculator = {
  id: 'SimpleIRACalculator',
  title: 'SIMPLE IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate SIMPLE IRA contributions, employer matching, and tax-advantaged growth for small business employees.',
  usageInstructions: [
    'Enter your annual salary and contribution amounts',
    'Input employer match percentage and expected returns',
    'Select vesting schedule and tax information',
    'Review contribution limits and tax benefits'
  ],

  inputs: [
    {
      id: 'annualSalary',
      label: 'Annual Salary ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Your gross annual salary'
    },
    {
      id: 'employeeContribution',
      label: 'Annual Employee Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount you contribute annually (pre-tax)'
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      tooltip: 'Percentage of your contribution matched by employer'
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
      tooltip: 'Current SIMPLE IRA balance'
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
      max: 100,
      tooltip: 'Total number of employees in your company'
    },
    {
      id: 'vestingSchedule',
      label: 'Vesting Schedule',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate (100% vested)' },
        { value: 'graded', label: 'Graded (20% per year)' },
        { value: 'cliff', label: 'Cliff (100% after 2 years)' }
      ],
      tooltip: 'How employer contributions vest over time'
    }
  ],

  outputs: [
    {
      id: 'totalEmployeeContribution',
      label: 'Total Employee Contributions',
      type: 'currency',
      explanation: 'Total employee contributions over the contribution period'
    },
    {
      id: 'totalEmployerContribution',
      label: 'Total Employer Contributions',
      type: 'currency',
      explanation: 'Total employer matching contributions over the period'
    },
    {
      id: 'futureValue',
      label: 'Future Value',
      type: 'currency',
      explanation: 'Projected SIMPLE IRA balance after contribution period'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed (employee + employer)'
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
      explanation: 'Tax savings from pre-tax contributions'
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
      explanation: 'Maximum annual employee contribution allowed'
    },
    {
      id: 'employerMatchAmount',
      label: 'Annual Employer Match',
      type: 'currency',
      explanation: 'Annual employer matching contribution'
    },
    {
      id: 'eligibilityStatus',
      label: 'Eligibility Status',
      type: 'text',
      explanation: 'Your eligibility for SIMPLE IRA contributions'
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
      title: 'Small Business Employee with Match',
      description: 'Employee earning $60,000 with 50% employer match maximizing contributions',
      inputs: {
        annualSalary: 60000,
        employeeContribution: 14000,
        employerMatch: 50,
        expectedAnnualReturn: 7,
        yearsToContribute: 25,
        currentBalance: 0,
        taxBracket: 22,
        filingStatus: 'single',
        numberOfEmployees: 15,
        vestingSchedule: 'graded'
      },
      expectedOutputs: {
        totalEmployeeContribution: 350000,
        totalEmployerContribution: 175000,
        futureValue: 1200000,
        totalContributions: 525000,
        totalEarnings: 675000,
        taxSavings: 115500,
        effectiveReturn: 7,
        contributionLimit: 16000,
        employerMatchAmount: 7000,
        eligibilityStatus: 'Eligible for SIMPLE IRA contributions',
        projectedBalanceByYear: []
      }
    },
    {
      title: 'Catch-Up Contributions',
      description: '50+ employee using catch-up contributions with full employer match',
      inputs: {
        annualSalary: 80000,
        employeeContribution: 19500,
        employerMatch: 100,
        expectedAnnualReturn: 6,
        yearsToContribute: 15,
        currentBalance: 100000,
        taxBracket: 24,
        filingStatus: 'married_filing_jointly',
        numberOfEmployees: 8,
        vestingSchedule: 'immediate'
      },
      expectedOutputs: {
        totalEmployeeContribution: 292500,
        totalEmployerContribution: 292500,
        futureValue: 1500000,
        totalContributions: 685000,
        totalEarnings: 815000,
        taxSavings: 328900,
        effectiveReturn: 6,
        contributionLimit: 19500,
        employerMatchAmount: 19500,
        eligibilityStatus: 'Eligible for SIMPLE IRA contributions',
        projectedBalanceByYear: []
      }
    }
  ]
};