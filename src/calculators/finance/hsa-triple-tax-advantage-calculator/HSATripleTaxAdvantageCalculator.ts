import { Calculator } from '../../types/calculator';
import { calculateHSATripleTax } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const hsaTripleTaxAdvantageCalculator: Calculator = {
  id: 'hsa-triple-tax-advantage-calculator',
  title: 'HSA Triple Tax Advantage Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Compare HSA triple tax advantages against traditional and taxable savings accounts, calculate lifetime tax savings, and determine optimal healthcare savings strategy.',

  usageInstructions: [
    'Enter your HSA contribution details',
    'Specify comparison investment returns',
    'Select tax rates for comparison',
    'Review tax advantages and optimal strategy'
  ],

  inputs: [
    {
      id: 'annualContribution',
      label: 'Annual HSA Contribution',
      type: 'currency',
      required: true,
      placeholder: '4000',
      tooltip: 'Annual contribution to HSA',
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
      label: 'HSA Investment Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual return on HSA investments',
      defaultValue: 7,
      min: -20,
      max: 50,
      step: 0.5
    },
    {
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Years until you plan to retire',
      defaultValue: 30,
      min: 0,
      max: 100
    },
    {
      id: 'qualifiedMedicalExpenses',
      label: 'Annual Qualified Medical Expenses',
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
      tooltip: 'Non-qualified withdrawals for comparison',
      defaultValue: 0,
      min: 0,
      max: 1000000
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
    },
    {
      id: 'capitalGainsTaxRate',
      label: 'Capital Gains Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '15',
      tooltip: 'Your capital gains tax rate',
      defaultValue: 15,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'comparisonInvestmentReturn',
      label: 'Comparison Investment Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '8',
      tooltip: 'Expected return on traditional/taxable investments',
      defaultValue: 8,
      min: -20,
      max: 50,
      step: 0.5
    }
  ],

  outputs: [
    {
      id: 'hsaTaxSavings',
      label: 'HSA Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from HSA triple tax advantage'
    },
    {
      id: 'traditionalSavingsTaxSavings',
      label: 'Traditional Savings Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from traditional savings'
    },
    {
      id: 'taxableSavingsTaxSavings',
      label: 'Taxable Savings Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from taxable savings'
    },
    {
      id: 'hsaNetBenefit',
      label: 'HSA Net Benefit',
      type: 'currency',
      explanation: 'Net benefit from HSA after taxes'
    },
    {
      id: 'traditionalSavingsNetBenefit',
      label: 'Traditional Savings Net Benefit',
      type: 'currency',
      explanation: 'Net benefit from traditional savings'
    },
    {
      id: 'taxableSavingsNetBenefit',
      label: 'Taxable Savings Net Benefit',
      type: 'currency',
      explanation: 'Net benefit from taxable savings'
    },
    {
      id: 'hsaVsTraditionalAdvantage',
      label: 'HSA vs Traditional Advantage',
      type: 'currency',
      explanation: 'HSA advantage over traditional savings'
    },
    {
      id: 'hsaVsTaxableAdvantage',
      label: 'HSA vs Taxable Advantage',
      type: 'currency',
      explanation: 'HSA advantage over taxable savings'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      explanation: 'Years to break even on HSA vs alternatives'
    },
    {
      id: 'lifetimeTaxSavings',
      label: 'Lifetime Tax Savings',
      type: 'currency',
      explanation: 'Total tax savings over lifetime'
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
    ValidationRuleFactory.required('yearsToRetirement', 'Years to retirement is required'),
    ValidationRuleFactory.required('incomeTaxRate', 'Income tax rate is required'),
    ValidationRuleFactory.required('capitalGainsTaxRate', 'Capital gains tax rate is required'),
    ValidationRuleFactory.required('comparisonInvestmentReturn', 'Comparison investment return is required'),
    ValidationRuleFactory.range('annualContribution', 0, 10000, 'Annual contribution must be between $0 and $10,000'),
    ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('age', 0, 120, 'Age must be between 0 and 120'),
    ValidationRuleFactory.range('investmentReturn', -20, 50, 'Investment return must be between -20% and 50%'),
    ValidationRuleFactory.range('yearsToRetirement', 0, 100, 'Years to retirement must be between 0 and 100'),
    ValidationRuleFactory.range('incomeTaxRate', 0, 50, 'Income tax rate must be between 0% and 50%'),
    ValidationRuleFactory.range('capitalGainsTaxRate', 0, 50, 'Capital gains tax rate must be between 0% and 50%'),
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
      title: 'HSA vs Traditional IRA',
      description: 'Compare HSA triple tax advantage with traditional IRA',
      inputs: {
        annualContribution: 4000,
        currentBalance: 10000,
        age: 35,
        coverageType: 'self-only',
        contributionType: 'employee',
        investmentReturn: 7,
        yearsToRetirement: 30,
        qualifiedMedicalExpenses: 2000,
        nonQualifiedWithdrawals: 0,
        incomeTaxRate: 25,
        capitalGainsTaxRate: 15,
        comparisonInvestmentReturn: 8
      },
      expectedOutputs: {
        hsaTaxSavings: 2500,
        traditionalSavingsTaxSavings: 0,
        taxableSavingsTaxSavings: 0,
        hsaNetBenefit: 2000,
        traditionalSavingsNetBenefit: 1800,
        taxableSavingsNetBenefit: 1900,
        hsaVsTraditionalAdvantage: 200,
        hsaVsTaxableAdvantage: 100,
        breakEvenYears: 30,
        lifetimeTaxSavings: 2500
      }
    },
    {
      title: 'High Earner Comparison',
      description: 'HSA advantages for high-income earner',
      inputs: {
        annualContribution: 8000,
        currentBalance: 50000,
        age: 45,
        coverageType: 'family',
        contributionType: 'employee',
        investmentReturn: 6,
        yearsToRetirement: 20,
        qualifiedMedicalExpenses: 3000,
        nonQualifiedWithdrawals: 1000,
        incomeTaxRate: 35,
        capitalGainsTaxRate: 20,
        comparisonInvestmentReturn: 7
      },
      expectedOutputs: {
        hsaTaxSavings: 5600,
        traditionalSavingsTaxSavings: 0,
        taxableSavingsTaxSavings: 0,
        hsaNetBenefit: 3700,
        traditionalSavingsNetBenefit: 3200,
        taxableSavingsNetBenefit: 3400,
        hsaVsTraditionalAdvantage: 500,
        hsaVsTaxableAdvantage: 300,
        breakEvenYears: 20,
        lifetimeTaxSavings: 5600
      }
    }
  ]
};