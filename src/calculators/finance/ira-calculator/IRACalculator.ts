import { Calculator } from '../../types/calculator';
import { calculateIRA } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const iraCalculator: Calculator = {
  id: 'ira-calculator',
  title: 'IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate IRA growth, retirement income projections, and tax implications for Traditional, Roth, SEP, and SIMPLE IRAs with comprehensive analysis.',
  usageInstructions: [
    'Select your IRA type (Traditional, Roth, SEP, or SIMPLE)',
    'Enter current balance and annual contribution amount',
    'Specify your age, retirement age, and expected return rate',
    'Review growth projections and retirement income estimates',
    'Consider tax implications for Traditional vs Roth IRAs'
  ],

  inputs: [
    {
      id: 'currentBalance',
      label: 'Current IRA Balance',
      type: 'currency',
      required: true,
      placeholder: '50000',
      tooltip: 'Current amount in your IRA account',
      defaultValue: 50000,
      min: 0,
      max: 10000000
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution',
      type: 'currency',
      required: true,
      placeholder: '6000',
      tooltip: 'Amount you plan to contribute annually',
      defaultValue: 6000,
      min: 0,
      max: 23000
    },
    {
      id: 'iraType',
      label: 'IRA Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional', label: 'Traditional IRA' },
        { value: 'roth', label: 'Roth IRA' },
        { value: 'sep', label: 'SEP IRA' },
        { value: 'simple', label: 'SIMPLE IRA' }
      ],
      tooltip: 'Type of IRA account',
      defaultValue: 'traditional'
    },
    {
      id: 'expectedReturnRate',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual investment return',
      defaultValue: 7,
      min: -10,
      max: 25,
      step: 0.5
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Your current age',
      defaultValue: 30,
      min: 18,
      max: 70
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age when you plan to retire',
      defaultValue: 65,
      min: 50,
      max: 100
    },
    {
      id: 'yearsToContribute',
      label: 'Years to Contribute',
      type: 'number',
      required: true,
      placeholder: '35',
      tooltip: 'Number of years you plan to make contributions',
      defaultValue: 35,
      min: 0,
      max: 50
    },
    {
      id: 'currentTaxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Your current marginal tax rate (required for Traditional IRA)',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'expectedRetirementTaxRate',
      label: 'Expected Retirement Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'Expected tax rate in retirement (required for Traditional IRA)',
      defaultValue: 20,
      min: 0,
      max: 50,
      step: 1
    },
    {
      id: 'currentIncome',
      label: 'Current Annual Income',
      type: 'currency',
      required: false,
      placeholder: '75000',
      tooltip: 'Your current annual income (for Roth IRA eligibility)',
      defaultValue: 75000,
      min: 0,
      max: 1000000
    },
    {
      id: 'contributionLimit',
      label: 'Annual Contribution Limit',
      type: 'currency',
      required: false,
      placeholder: '23000',
      tooltip: 'Maximum annual contribution limit',
      defaultValue: 23000,
      min: 0,
      max: 23000
    },
    {
      id: 'inflationRate',
      label: 'Expected Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'compoundFrequency',
      label: 'Compound Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      tooltip: 'How often interest is compounded',
      defaultValue: 'annually'
    },
    {
      id: 'includeInflationAdjustment',
      label: 'Include Inflation Adjustment',
      type: 'boolean',
      required: false,
      tooltip: 'Adjust calculations for inflation',
      defaultValue: true
    },
    {
      id: 'includeRequiredMinimumDistributions',
      label: 'Include Required Minimum Distributions',
      type: 'boolean',
      required: false,
      tooltip: 'Include RMD calculations for Traditional IRA',
      defaultValue: true
    }
  ],

  outputs: [
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount you will contribute over the years'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest Earned',
      type: 'currency',
      explanation: 'Total investment earnings on your contributions'
    },
    {
      id: 'projectedBalance',
      label: 'Projected Balance at Retirement',
      type: 'currency',
      explanation: 'Estimated IRA balance when you reach retirement age'
    },
    {
      id: 'annualRetirementIncome',
      label: 'Annual Retirement Income',
      type: 'currency',
      explanation: 'Estimated annual income from your IRA in retirement'
    },
    {
      id: 'monthlyRetirementIncome',
      label: 'Monthly Retirement Income',
      type: 'currency',
      explanation: 'Estimated monthly income from your IRA in retirement'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings/Benefits',
      type: 'currency',
      explanation: 'Tax benefits from contributions and tax-free growth'
    },
    {
      id: 'afterTaxValue',
      label: 'After-Tax Value',
      type: 'currency',
      explanation: 'Value after accounting for taxes'
    },
    {
      id: 'requiredMinimumDistribution',
      label: 'Required Minimum Distribution',
      type: 'currency',
      explanation: 'Annual RMD amount (for Traditional IRA after age 72)'
    },
    {
      id: 'yearsOfDistributions',
      label: 'Years of Distributions',
      type: 'number',
      explanation: 'Number of years you can withdraw from the IRA'
    },
    {
      id: 'effectiveGrowthRate',
      label: 'Effective Growth Rate',
      type: 'percentage',
      explanation: 'Actual growth rate after all factors'
    },
    {
      id: 'savingsRate',
      label: 'Savings Rate',
      type: 'percentage',
      explanation: 'Percentage of income saved annually'
    },
    {
      id: 'retirementReadiness',
      label: 'Retirement Readiness',
      type: 'text',
      explanation: 'Assessment of your retirement savings progress'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentBalance', 'Current balance is required'),
    ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
    ValidationRuleFactory.required('iraType', 'IRA type is required'),
    ValidationRuleFactory.required('expectedReturnRate', 'Expected return rate is required'),
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
    ValidationRuleFactory.required('yearsToContribute', 'Years to contribute is required'),

    ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('annualContribution', 0, 23000, 'Annual contribution must be between $0 and $23,000'),
    ValidationRuleFactory.range('expectedReturnRate', -10, 25, 'Expected return rate must be between -10% and 25%'),
    ValidationRuleFactory.range('currentAge', 18, 70, 'Current age must be between 18 and 70'),
    ValidationRuleFactory.range('retirementAge', 50, 100, 'Retirement age must be between 50 and 100'),
    ValidationRuleFactory.range('yearsToContribute', 0, 50, 'Years to contribute must be between 0 and 50'),

    ValidationRuleFactory.businessRule(
      'retirementAge',
      (retirementAge, allInputs) => retirementAge > (allInputs?.currentAge || 0),
      'Retirement age must be greater than current age'
    ),

    ValidationRuleFactory.businessRule(
      'yearsToContribute',
      (yearsToContribute, allInputs) => {
        const yearsToRetirement = (allInputs?.retirementAge || 0) - (allInputs?.currentAge || 0);
        return yearsToContribute <= yearsToRetirement;
      },
      'Years to contribute cannot exceed years until retirement'
    ),

    ValidationRuleFactory.businessRule(
      'currentTaxRate',
      (currentTaxRate, allInputs) => {
        if (allInputs?.iraType === 'traditional') {
          return currentTaxRate !== undefined && currentTaxRate !== null;
        }
        return true;
      },
      'Current tax rate is required for Traditional IRA'
    ),

    ValidationRuleFactory.businessRule(
      'expectedRetirementTaxRate',
      (expectedRetirementTaxRate, allInputs) => {
        if (allInputs?.iraType === 'traditional') {
          return expectedRetirementTaxRate !== undefined && expectedRetirementTaxRate !== null;
        }
        return true;
      },
      'Expected retirement tax rate is required for Traditional IRA'
    ),

    ValidationRuleFactory.businessRule(
      'currentIncome',
      (currentIncome, allInputs) => {
        if (allInputs?.iraType === 'roth') {
          return currentIncome !== undefined && currentIncome !== null;
        }
        return true;
      },
      'Current income is required for Roth IRA eligibility check'
    )
  ],

  examples: [
    {
      title: 'Traditional IRA - 35 Year Projection',
      description: '35-year-old planning for retirement at age 65 with Traditional IRA',
      inputs: {
        currentBalance: 25000,
        annualContribution: 6000,
        iraType: 'traditional',
        expectedReturnRate: 7,
        currentAge: 35,
        retirementAge: 65,
        yearsToContribute: 30,
        currentTaxRate: 25,
        expectedRetirementTaxRate: 20,
        compoundFrequency: 'annually',
        includeRequiredMinimumDistributions: true
      },
      expectedOutputs: {
        totalContributions: 180000,
        totalInterest: 420000,
        projectedBalance: 600000,
        annualRetirementIncome: 30000,
        monthlyRetirementIncome: 2500,
        taxSavings: 15000,
        afterTaxValue: 480000,
        requiredMinimumDistribution: 24000,
        yearsOfDistributions: 25,
        effectiveGrowthRate: 7,
        savingsRate: 8,
        retirementReadiness: 'good'
      }
    },
    {
      title: 'Roth IRA - Tax-Free Growth',
      description: '28-year-old maximizing Roth IRA contributions',
      inputs: {
        currentBalance: 10000,
        annualContribution: 6500,
        iraType: 'roth',
        expectedReturnRate: 8,
        currentAge: 28,
        retirementAge: 67,
        yearsToContribute: 39,
        currentIncome: 85000,
        compoundFrequency: 'annually',
        includeRequiredMinimumDistributions: false
      },
      expectedOutputs: {
        totalContributions: 253500,
        totalInterest: 850000,
        projectedBalance: 1103500,
        annualRetirementIncome: 55175,
        monthlyRetirementIncome: 4598,
        taxSavings: 85000,
        afterTaxValue: 1103500,
        requiredMinimumDistribution: 0,
        yearsOfDistributions: 30,
        effectiveGrowthRate: 8,
        savingsRate: 7.6,
        retirementReadiness: 'excellent'
      }
    }
  ]
};