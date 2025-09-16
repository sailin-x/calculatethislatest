import { Calculator } from '../../../types/calculator';
import { calculateIRA } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const iraCalculator: Calculator = {
  id: 'ira-calculator',
  title: 'IRA Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate IRA growth, compare Traditional vs Roth IRAs, determine optimal contribution strategies, and plan for retirement with comprehensive tax analysis and required minimum distribution calculations.',

  usageInstructions: [
    'Enter your current IRA balance and contribution details',
    'Select IRA type and specify tax information',
    'Choose investment return assumptions',
    'Review growth projections and tax implications'
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
      placeholder: '7000',
      tooltip: 'Annual amount you plan to contribute',
      defaultValue: 7000,
      min: 0,
      max: 23000
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual return on investments',
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
      placeholder: '25',
      tooltip: 'Years until you plan to retire',
      defaultValue: 25,
      min: 0,
      max: 100
    },
    {
      id: 'currentAge',
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
      id: 'taxBracket',
      label: 'Current Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your current marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: -10,
      max: 20,
      step: 0.1
    },
    {
      id: 'includeRequiredMinimumDistributions',
      label: 'Include RMDs',
      type: 'boolean',
      required: false,
      tooltip: 'Include required minimum distributions in calculations',
      defaultValue: true
    },
    {
      id: 'spousalIRA',
      label: 'Spousal IRA',
      type: 'boolean',
      required: false,
      tooltip: 'Is this a spousal IRA?',
      defaultValue: false
    },
    {
      id: 'catchUpContributions',
      label: 'Catch-Up Contributions (50+)',
      type: 'boolean',
      required: false,
      tooltip: 'Include catch-up contributions for age 50+',
      defaultValue: false
    }
  ],

  outputs: [
    {
      id: 'futureValue',
      label: 'Future Value',
      type: 'currency',
      explanation: 'Projected value of IRA at retirement'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Total amount contributed over time'
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
      explanation: 'Tax benefits from IRA contributions'
    },
    {
      id: 'netValue',
      label: 'Net Value',
      type: 'currency',
      explanation: 'Value after taxes and fees'
    },
    {
      id: 'requiredMinimumDistribution',
      label: 'Required Minimum Distribution',
      type: 'currency',
      explanation: 'Annual RMD amount at age 72'
    },
    {
      id: 'effectiveReturn',
      label: 'Effective Annual Return (%)',
      type: 'percentage',
      explanation: 'Actual annual return achieved'
    },
    {
      id: 'breakEvenAge',
      label: 'Break-Even Age',
      type: 'number',
      explanation: 'Age when tax benefits equal costs'
    },
    {
      id: 'retirementIncome',
      label: 'Annual Retirement Income',
      type: 'currency',
      explanation: 'Estimated annual income in retirement'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentBalance', 'Current balance is required'),
    ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('yearsToRetirement', 'Years to retirement is required'),
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('iraType', 'IRA type is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.range('currentBalance', 0, 10000000, 'Current balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('annualContribution', 0, 23000, 'Annual contribution must be between $0 and $23,000'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('yearsToRetirement', 0, 100, 'Years to retirement must be between 0 and 100'),
    ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.businessRule(
      'annualContribution',
      (annualContribution, allInputs) => {
        if (!allInputs?.iraType || !allInputs?.currentAge || !allInputs?.catchUpContributions) return true;

        const limits = {
          traditional: 7000,
          roth: 7000,
          sep: 69000,
          simple: 16000
        };

        let limit = limits[allInputs.iraType as keyof typeof limits] || 7000;

        if (allInputs.catchUpContributions && allInputs.currentAge >= 50) {
          limit += 1000;
        }

        if (allInputs.spousalIRA) {
          limit *= 2;
        }

        return annualContribution <= limit;
      },
      'Contribution exceeds IRS annual limit for selected IRA type'
    ),
    ValidationRuleFactory.businessRule(
      'currentAge',
      (currentAge, allInputs) => {
        if (!allInputs?.yearsToRetirement) return true;
        return currentAge + allInputs.yearsToRetirement <= 120;
      },
      'Age at retirement cannot exceed 120 years'
    )
  ],

  examples: [
    {
      title: 'Traditional IRA Growth',
      description: 'Traditional IRA with steady contributions and moderate returns',
      inputs: {
        currentBalance: 50000,
        annualContribution: 7000,
        expectedReturn: 7,
        yearsToRetirement: 25,
        currentAge: 35,
        iraType: 'traditional',
        taxBracket: 25,
        inflationRate: 2.5,
        includeRequiredMinimumDistributions: true,
        spousalIRA: false,
        catchUpContributions: false
      },
      expectedOutputs: {
        futureValue: 850000,
        totalContributions: 225000,
        totalEarnings: 625000,
        taxSavings: 43750,
        netValue: 731250,
        requiredMinimumDistribution: 29000,
        effectiveReturn: 6.8,
        breakEvenAge: 60,
        retirementIncome: 34000
      }
    },
    {
      title: 'Roth IRA Tax-Free Growth',
      description: 'Roth IRA with tax-free withdrawals in retirement',
      inputs: {
        currentBalance: 30000,
        annualContribution: 7000,
        expectedReturn: 7,
        yearsToRetirement: 30,
        currentAge: 30,
        iraType: 'roth',
        taxBracket: 25,
        inflationRate: 2.5,
        includeRequiredMinimumDistributions: false,
        spousalIRA: false,
        catchUpContributions: false
      },
      expectedOutputs: {
        futureValue: 950000,
        totalContributions: 240000,
        totalEarnings: 710000,
        taxSavings: 0,
        netValue: 950000,
        requiredMinimumDistribution: 0,
        effectiveReturn: 7.0,
        breakEvenAge: 60,
        retirementIncome: 38000
      }
    }
  ]
};