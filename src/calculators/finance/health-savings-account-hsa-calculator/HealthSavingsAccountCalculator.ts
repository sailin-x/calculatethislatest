import { Calculator } from '../../types/calculator';
import { calculateHSA } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const healthSavingsAccountCalculator: Calculator = {
  id: 'health-savings-account-hsa-calculator',
  title: 'Health Savings Account (HSA) Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate HSA contributions, tax benefits, investment growth, and optimal withdrawal strategies for healthcare savings and retirement planning.',

  usageInstructions: [
    'Enter your annual HSA contribution amount',
    'Specify current balance and investment returns',
    'Select coverage type and contribution limits',
    'Review tax savings and future value projections'
  ],

  inputs: [
    {
      id: 'annualContribution',
      label: 'Annual HSA Contribution',
      type: 'currency',
      required: true,
      placeholder: '4000',
      tooltip: 'Annual contribution to HSA (2024 limits: $4,150 self-only, $8,300 family)',
      defaultValue: 4000,
      min: 0,
      max: 10000
    },
    {
      id: 'currentBalance',
      label: 'Current HSA Balance',
      type: 'currency',
      required: true,
      placeholder: '10000',
      tooltip: 'Current amount in HSA account',
      defaultValue: 10000,
      min: 0,
      max: 10000000
    },
    {
      id: 'age',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '35',
      tooltip: 'Your current age',
      defaultValue: 35,
      min: 0,
      max: 120
    },
    {
      id: 'coverageType',
      label: 'Coverage Type',
      type: 'select',
      required: true,
      options: [
        { value: 'self-only', label: 'Self-Only' },
        { value: 'family', label: 'Family' }
      ],
      tooltip: 'Type of HDHP coverage',
      defaultValue: 'self-only'
    },
    {
      id: 'contributionType',
      label: 'Contribution Type',
      type: 'select',
      required: true,
      options: [
        { value: 'employee', label: 'Employee' },
        { value: 'self-employed', label: 'Self-Employed' },
        { value: 'catch-up', label: 'Catch-Up (55+)' }
      ],
      tooltip: 'Type of HSA contribution',
      defaultValue: 'employee'
    },
    {
      id: 'investmentReturn',
      label: 'Expected Investment Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Annual investment return on HSA funds',
      defaultValue: 7,
      min: -20,
      max: 50,
      step: 0.5
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Annual inflation rate',
      defaultValue: 2.5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'yearsUntilRetirement',
      label: 'Years Until Retirement',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Years until you plan to retire',
      defaultValue: 30,
      min: 0,
      max: 100
    },
    {
      id: 'qualifiedExpenses',
      label: 'Annual Qualified Expenses',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Annual qualified medical expenses',
      defaultValue: 2000,
      min: 0,
      max: 100000
    },
    {
      id: 'nonQualifiedWithdrawals',
      label: 'Non-Qualified Withdrawals',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Non-qualified withdrawals (subject to penalties and taxes)',
      defaultValue: 0,
      min: 0,
      max: 1000000
    },
    {
      id: 'penaltyRate',
      label: 'Early Withdrawal Penalty Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'IRS penalty for non-qualified withdrawals before age 65',
      defaultValue: 20,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'incomeTaxRate',
      label: 'Income Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your marginal income tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 5
    }
  ],

  outputs: [
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed to HSA'
    },
    {
      id: 'investmentGrowth',
      label: 'Investment Growth',
      type: 'currency',
      explanation: 'Growth from HSA investments'
    },
    {
      id: 'totalBalance',
      label: 'Total HSA Balance',
      type: 'currency',
      explanation: 'Current HSA balance plus future contributions and growth'
    },
    {
      id: 'qualifiedWithdrawals',
      label: 'Qualified Withdrawals',
      type: 'currency',
      explanation: 'Tax-free withdrawals for qualified expenses'
    },
    {
      id: 'nonQualifiedWithdrawals',
      label: 'Non-Qualified Withdrawals',
      type: 'currency',
      explanation: 'Withdrawals subject to penalties and taxes'
    },
    {
      id: 'penaltiesPaid',
      label: 'Penalties Paid',
      type: 'currency',
      explanation: 'IRS penalties on non-qualified withdrawals'
    },
    {
      id: 'taxesPaid',
      label: 'Taxes Paid',
      type: 'currency',
      explanation: 'Income taxes on non-qualified withdrawals'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Net value after penalties and taxes'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from pre-tax contributions'
    },
    {
      id: 'futureValue',
      label: 'Future Value',
      type: 'currency',
      explanation: 'Value of remaining HSA balance at retirement'
    },
    {
      id: 'breakEvenAge',
      label: 'Break-Even Age',
      type: 'number',
      explanation: 'Age when penalty-free withdrawals begin'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
    ValidationRuleFactory.required('currentBalance', 'Current balance is required'),
    ValidationRuleFactory.required('age', 'Age is required'),
    ValidationRuleFactory.required('coverageType', 'Coverage type is required'),
    ValidationRuleFactory.required('contributionType', 'Contribution type is required'),
    ValidationRuleFactory.required('investmentReturn', 'Investment return is required'),
    ValidationRuleFactory.required('yearsUntilRetirement', 'Years until retirement is required'),
    ValidationRuleFactory.required('incomeTaxRate', 'Income tax rate is required'),
    ValidationRuleFactory.range('annualContribution', 0, 10000, 'Annual contribution must be between $0 and $10,000'),
    ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('age', 0, 120, 'Age must be between 0 and 120'),
    ValidationRuleFactory.range('investmentReturn', -20, 50, 'Investment return must be between -20% and 50%'),
    ValidationRuleFactory.range('yearsUntilRetirement', 0, 100, 'Years until retirement must be between 0 and 100'),
    ValidationRuleFactory.range('incomeTaxRate', 0, 50, 'Income tax rate must be between 0% and 50%'),
    ValidationRuleFactory.businessRule(
      'annualContribution',
      (annualContribution, allInputs) => {
        if (!allInputs?.coverageType || !allInputs?.contributionType) return true;
        const maxLimits = {
          'self-only': { employee: 4150, 'self-employed': 4150, 'catch-up': 4950 },
          family: { employee: 8300, 'self-employed': 8300, 'catch-up': 9100 }
        };
        const limit = maxLimits[allInputs.coverageType]?.[allInputs.contributionType] || 10000;
        return annualContribution <= limit;
      },
      'Contribution exceeds IRS annual limit'
    )
  ],

  examples: [
    {
      title: 'Standard HSA Contribution',
      description: 'Employee with self-only coverage making standard contributions',
      inputs: {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only',
        contributionType: 'employee',
        investmentReturn: 7,
        inflationRate: 2.5,
        yearsUntilRetirement: 30,
        qualifiedExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        penaltyRate: 20,
        incomeTaxRate: 25
      },
      expectedOutputs: {
        totalContributions: 130000,
        investmentGrowth: 231000,
        totalBalance: 361000,
        qualifiedWithdrawals: 2000,
        nonQualifiedWithdrawals: 0,
        penaltiesPaid: 0,
        taxesPaid: 0,
        netBenefit: 2000,
        taxSavings: 32500,
        futureValue: 241000,
        breakEvenAge: 65
      }
    },
    {
      title: 'Catch-Up Contributions',
      description: '55+ employee maximizing catch-up contributions',
      inputs: {
        annualContribution: 5000,
        currentBalance: 50000,
        age: 58,
        coverageType: 'family',
        contributionType: 'catch-up',
        investmentReturn: 6,
        inflationRate: 2.5,
        yearsUntilRetirement: 7,
        qualifiedExpenses: 3000,
        nonQualifiedWithdrawals: 1000,
        penaltyRate: 20,
        incomeTaxRate: 30
      },
      expectedOutputs: {
        totalContributions: 85000,
        investmentGrowth: 28000,
        totalBalance: 113000,
        qualifiedWithdrawals: 3000,
        nonQualifiedWithdrawals: 1000,
        penaltiesPaid: 0,
        taxesPaid: 300,
        netBenefit: 3700,
        taxSavings: 25500,
        futureValue: 80000,
        breakEvenAge: 65
      }
    }
  ]
};