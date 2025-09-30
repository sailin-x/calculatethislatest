import { Calculator } from '../../../types/calculator';
import { PaycheckCalculatorInputs, PaycheckCalculatorOutputs } from './types';
import {
  calculateFederalIncomeTax,
  calculateStateIncomeTax,
  calculateSocialSecurityTax,
  calculateMedicareTax,
  calculateTotalDeductions,
  calculateNetPay,
  calculateTakeHomePercentage,
  generatePaycheckAnalysis
} from './formulas';
import { validatePaycheckCalculatorInputs, validatePaycheckCalculatorBusinessRules } from './validation';

export const PaycheckCalculator: Calculator = {
  id: 'paycheck-calculator',
  title: 'Paycheck Calculator',
  category: 'business',
  subcategory: 'HR & Payroll',
  description: 'Calculate take-home pay, tax deductions, and net paycheck amounts with support for federal and state taxes, pre-tax deductions, and various pay frequencies.',
  usageInstructions: [
    'Enter gross pay amount and pay frequency',
    'Select filing status and number of dependents',
    'Choose state for accurate state tax calculations',
    'Include pre-tax deductions (401k, health insurance)',
    'Review tax breakdown and net take-home pay'
  ],

  inputs: [
    {
      id: 'grossPay',
      label: 'Gross Pay ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total gross pay before deductions'
    },
    {
      id: 'payFrequency',
      label: 'Pay Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'weekly', label: 'Weekly' },
        { value: 'biweekly', label: 'Biweekly' },
        { value: 'semimonthly', label: 'Semimonthly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'annually', label: 'Annually' }
      ],
      tooltip: 'How often you get paid'
    },
    {
      id: 'filingStatus',
      label: 'Filing Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married_filing_jointly', label: 'Married Filing Jointly' },
        { value: 'married_filing_separately', label: 'Married Filing Separately' },
        { value: 'head_of_household', label: 'Head of Household' }
      ],
      tooltip: 'Federal tax filing status'
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
      id: 'state',
      label: 'State',
      type: 'select',
      required: false,
      options: [
        { value: 'CA', label: 'California' },
        { value: 'TX', label: 'Texas' },
        { value: 'FL', label: 'Florida' },
        { value: 'NY', label: 'New York' },
        { value: 'IL', label: 'Illinois' }
      ],
      tooltip: 'State for state income tax calculation'
    },
    {
      id: 'preTaxDeductions',
      label: 'Pre-Tax Deductions ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: '401k, HSA, and other pre-tax deductions'
    },
    {
      id: 'retirementContributions',
      label: 'Retirement Contributions ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: '401k, IRA, and retirement plan contributions'
    },
    {
      id: 'healthInsurance',
      label: 'Health Insurance ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly health insurance premium'
    },
    {
      id: 'additionalDeductions',
      label: 'Additional Deductions ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Other deductions (union dues, parking, etc.)'
    }
  ],

  outputs: [
    {
      id: 'netPay',
      label: 'Net Pay',
      type: 'currency',
      explanation: 'Take-home pay after all deductions'
    },
    {
      id: 'totalDeductions',
      label: 'Total Deductions',
      type: 'currency',
      explanation: 'Sum of all tax and non-tax deductions'
    },
    {
      id: 'takeHomePercentage',
      label: 'Take-Home Percentage',
      type: 'percentage',
      explanation: 'Percentage of gross pay that is take-home'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Software Engineer - Monthly Pay',
      description: 'Monthly paycheck calculation for a software engineer',
      inputs: {
        grossPay: 8000,
        payFrequency: 'monthly',
        filingStatus: 'single',
        dependents: 0,
        state: 'CA',
        preTaxDeductions: 800,
        retirementContributions: 400,
        healthInsurance: 200,
        additionalDeductions: 50
      },
      expectedOutputs: {
        netPay: 5200,
        totalDeductions: 2800,
        takeHomePercentage: 65
      }
    }
  ]
};