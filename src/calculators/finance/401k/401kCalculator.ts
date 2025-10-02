import { Calculator } from '../../types/calculator';
import { calculate401k } from './formulas';
import { generate401kAnalysis } from './formulas';

export const FourZeroOneKCalculator: Calculator = {
  id: '401k-calculator',
  name: '401(k) Retirement Calculator',
  category: 'finance',
  subcategory: 'retirement',
  description: 'Calculate 401(k) retirement savings, employer matching, tax benefits, and projected retirement income.',
  inputs: {
    currentAge: {
      name: 'Current Age',
      type: 'number',
      unit: 'years',
      description: 'Your current age',
      placeholder: '30',
      min: 18,
      max: 80,
      step: 1,
      required: true
    },
    retirementAge: {
      name: 'Retirement Age',
      type: 'number',
      unit: 'years',
      description: 'Age when you plan to retire',
      placeholder: '65',
      min: 45,
      max: 85,
      step: 1,
      required: true
    },
    currentSalary: {
      name: 'Current Annual Salary',
      type: 'number',
      unit: '$',
      description: 'Your current annual salary before taxes',
      placeholder: '75000',
      min: 10000,
      max: 1000000,
      step: 1000,
      required: true
    },
    current401kBalance: {
      name: 'Current 401(k) Balance',
      type: 'number',
      unit: '$',
      description: 'Current balance in your 401(k) account',
      placeholder: '25000',
      min: 0,
      max: 10000000,
      step: 1000,
      required: true
    },
    employeeContribution: {
      name: 'Employee Contribution %',
      type: 'number',
      unit: '%',
      description: 'Percentage of salary you contribute to 401(k)',
      placeholder: '6',
      min: 0,
      max: 100,
      step: 0.5,
      required: true
    },
    employerMatch: {
      name: 'Employer Match %',
      type: 'number',
      unit: '%',
      description: 'Percentage of salary employer matches',
      placeholder: '3',
      min: 0,
      max: 100,
      step: 0.5,
      required: true
    },
    employerMatchLimit: {
      name: 'Employer Match Limit %',
      type: 'number',
      unit: '%',
      description: 'Maximum percentage of salary employer will match',
      placeholder: '6',
      min: 0,
      max: 100,
      step: 0.5,
      required: true
    },
    salaryGrowthRate: {
      name: 'Annual Salary Growth Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual increase in salary',
      placeholder: '3',
      min: 0,
      max: 20,
      step: 0.5,
      required: true
    },
    investmentReturn: {
      name: 'Expected Investment Return',
      type: 'number',
      unit: '%',
      description: 'Expected annual return on 401(k) investments',
      placeholder: '7',
      min: 1,
      max: 15,
      step: 0.5,
      required: true
    },
    inflationRate: {
      name: 'Expected Inflation Rate',
      type: 'number',
      unit: '%',
      description: 'Expected annual inflation rate',
      placeholder: '2.5',
      min: 0,
      max: 10,
      step: 0.1,
      required: true
    },
    contributionIncrease: {
      name: 'Annual Contribution Increase',
      type: 'number',
      unit: '%',
      description: 'Annual increase in contribution percentage',
      placeholder: '0.5',
      min: 0,
      max: 5,
      step: 0.1,
      required: true
    },
    catchUpContribution: {
      name: 'Catch-up Contributions (50+)',
      type: 'boolean',
      description: 'Whether you plan to make catch-up contributions after age 50',
      required: true
    },
    taxRate: {
      name: 'Current Tax Rate',
      type: 'number',
      unit: '%',
      description: 'Your current marginal tax rate',
      placeholder: '22',
      min: 10,
      max: 50,
      step: 1,
      required: true
    },
    retirementTaxRate: {
      name: 'Expected Retirement Tax Rate',
      type: 'number',
      unit: '%',
      description: 'Expected tax rate in retirement',
      placeholder: '15',
      min: 10,
      max: 50,
      step: 1,
      required: true
    },
    lifeExpectancy: {
      name: 'Life Expectancy',
      type: 'number',
      unit: 'years',
      description: 'Expected life expectancy for retirement planning',
      placeholder: '85',
      min: 70,
      max: 100,
      step: 1,
      required: true
    },
    socialSecurityIncome: {
      name: 'Expected Social Security Income',
      type: 'number',
      unit: '$/year',
      description: 'Expected annual Social Security benefits',
      placeholder: '25000',
      min: 0,
      max: 100000,
      step: 1000,
      required: true
    },
    otherRetirementIncome: {
      name: 'Other Retirement Income',
      type: 'number',
      unit: '$/year',
      description: 'Other expected retirement income (pensions, etc.)',
      placeholder: '0',
      min: 0,
      max: 500000,
      step: 1000,
      required: true
    }
  },
  outputs: [
    {
      id: 'totalContributions',
      name: 'Total Employee Contributions',
      type: 'number',
      unit: '$',
      description: 'Total amount you will contribute over your career'
    },
    {
      id: 'totalEmployerMatch',
      name: 'Total Employer Match',
      type: 'number',
      unit: '$',
      description: 'Total amount your employer will match'
    },
    {
      id: 'total401kBalance',
      name: 'Projected 401(k) Balance',
      type: 'number',
      unit: '$',
      description: 'Total 401(k) balance at retirement'
    },
    {
      id: 'annualContribution',
      name: 'Annual Contribution',
      type: 'number',
      unit: '$',
      description: 'Current annual contribution amount'
    },
    {
      id: 'annualEmployerMatch',
      name: 'Annual Employer Match',
      type: 'number',
      unit: '$',
      description: 'Current annual employer match amount'
    },
    {
      id: 'taxSavings',
      name: 'Annual Tax Savings',
      type: 'number',
      unit: '$',
      description: 'Annual tax savings from 401(k) contributions'
    },
    {
      id: 'totalTaxSavings',
      name: 'Total Tax Savings',
      type: 'number',
      unit: '$',
      description: 'Total tax savings over your career'
    },
    {
      id: 'monthlyRetirementIncome',
      name: 'Monthly Retirement Income',
      type: 'number',
      unit: '$',
      description: 'Monthly income from 401(k) in retirement'
    },
    {
      id: 'annualRetirementIncome',
      name: 'Annual Retirement Income',
      type: 'number',
      unit: '$',
      description: 'Annual income from 401(k) in retirement'
    },
    {
      id: 'totalRetirementIncome',
      name: 'Total Retirement Income',
      type: 'number',
      unit: '$',
      description: 'Total retirement income including Social Security'
    },
    {
      id: 'replacementRatio',
      name: 'Income Replacement Ratio',
      type: 'number',
      unit: '%',
      description: 'Percentage of pre-retirement income replaced'
    },
    {
      id: 'yearsOfIncome',
      name: 'Years of Income',
      type: 'number',
      unit: 'years',
      description: 'Number of years 401(k) will provide income'
    },
    {
      id: 'maxContribution',
      name: 'Maximum Annual Contribution',
      type: 'number',
      unit: '$',
      description: 'Maximum allowed annual contribution'
    },
    {
      id: 'catchUpAmount',
      name: 'Catch-up Contribution Amount',
      type: 'number',
      unit: '$',
      description: 'Additional catch-up contribution amount (50+)'
    },
    {
      id: 'contributionGap',
      name: 'Contribution Gap',
      type: 'number',
      unit: '$',
      description: 'Difference between current and maximum contribution'
    },
    {
      id: 'retirementScore',
      name: 'Retirement Readiness Score',
      type: 'number',
      unit: '/100',
      description: 'Overall retirement readiness assessment'
    },
    {
      id: 'savingsScore',
      name: 'Savings Rate Score',
      type: 'number',
      unit: '/100',
      description: 'Assessment of your savings rate'
    },
    {
      id: 'investmentScore',
      name: 'Investment Strategy Score',
      type: 'number',
      unit: '/100',
      description: 'Assessment of your investment strategy'
    },
    {
      id: 'taxEfficiencyScore',
      name: 'Tax Efficiency Score',
      type: 'number',
      unit: '/100',
      description: 'Assessment of tax efficiency'
    },
    {
      id: 'projectedValue',
      name: 'Projected Account Value',
      type: 'number',
      unit: '$',
      description: 'Projected 401(k) value at retirement (inflation-adjusted)'
    },
    {
      id: 'monthlyContribution',
      name: 'Monthly Contribution',
      type: 'number',
      unit: '$',
      description: 'Current monthly contribution amount'
    },
    {
      id: 'employerMatchRate',
      name: 'Effective Employer Match Rate',
      type: 'number',
      unit: '%',
      description: 'Actual employer match rate based on your contribution'
    },
    {
      id: 'totalGrowth',
      name: 'Investment Growth',
      type: 'number',
      unit: '$',
      description: 'Total investment growth over your career'
    },
    {
      id: 'contributionEfficiency',
      name: 'Contribution Efficiency',
      type: 'number',
      unit: '%',
      description: 'Percentage of maximum contribution you are making'
    }
  ],
  calculate: calculate401k,
  generateReport: generate401kAnalysis
};
