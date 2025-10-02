import { Calculator } from '../../types/calculator';
import { calculateRetirementSavings } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const retirementSavingsCalculator: Calculator = {
  id: 'retirement-savings-calculator',
  title: 'Retirement Savings Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate retirement savings goals, contribution strategies, and investment projections to ensure financial security in retirement with comprehensive planning tools.',

  usageInstructions: [
    'Enter your current age and retirement goals',
    'Specify current savings and contribution amounts',
    'Review savings projections and readiness assessment',
    'Adjust contributions and strategies as needed'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '35',
      tooltip: 'Your current age',
      defaultValue: 35,
      min: 18,
      max: 120
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age you plan to retire',
      defaultValue: 65,
      min: 50,
      max: 120
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Total retirement savings',
      defaultValue: 100000,
      min: 0,
      max: 10000000
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'currency',
      required: true,
      placeholder: '500',
      tooltip: 'Monthly retirement contribution',
      defaultValue: 500,
      min: 0,
      max: 10000
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '7',
      tooltip: 'Expected annual investment return',
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
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: -10,
      max: 20,
      step: 0.1
    },
    {
      id: 'retirementIncomeNeeded',
      label: 'Annual Retirement Income Needed',
      type: 'currency',
      required: true,
      placeholder: '60000',
      tooltip: 'Annual income needed in retirement',
      defaultValue: 60000,
      min: 0,
      max: 500000
    },
    {
      id: 'socialSecurityBenefit',
      label: 'Social Security Benefit',
      type: 'currency',
      required: false,
      placeholder: '20000',
      tooltip: 'Annual Social Security benefit',
      defaultValue: 20000,
      min: 0,
      max: 50000
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'contributionFrequency',
      label: 'Contribution Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'annual', label: 'Annual' }
      ],
      tooltip: 'How often you contribute',
      defaultValue: 'monthly'
    },
    {
      id: 'accountType',
      label: 'Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional_ira', label: 'Traditional IRA' },
        { value: 'roth_ira', label: 'Roth IRA' },
        { value: '401k', label: '401(k)' },
        { value: 'taxable', label: 'Taxable Account' }
      ],
      tooltip: 'Type of retirement account',
      defaultValue: '401k'
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: false,
      placeholder: '50',
      tooltip: 'Employer matching percentage',
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'employerMatchLimit',
      label: 'Employer Match Limit',
      type: 'currency',
      required: false,
      placeholder: '6000',
      tooltip: 'Maximum employer match amount',
      defaultValue: 6000,
      min: 0,
      max: 20000
    }
  ],

  outputs: [
    {
      id: 'totalSavingsAtRetirement',
      label: 'Total Savings at Retirement',
      type: 'currency',
      explanation: 'Projected total savings at retirement age'
    },
    {
      id: 'monthlySavingsNeeded',
      label: 'Monthly Savings Needed',
      type: 'currency',
      explanation: 'Additional monthly savings required'
    },
    {
      id: 'annualSavingsNeeded',
      label: 'Annual Savings Needed',
      type: 'currency',
      explanation: 'Additional annual savings required'
    },
    {
      id: 'savingsGap',
      label: 'Savings Gap',
      type: 'currency',
      explanation: 'Difference between needed and projected savings'
    },
    {
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      explanation: 'Years until retirement'
    },
    {
      id: 'retirementReadinessScore',
      label: 'Retirement Readiness Score',
      type: 'number',
      explanation: 'Score indicating retirement preparedness (0-100)'
    },
    {
      id: 'projectedAnnualIncome',
      label: 'Projected Annual Income',
      type: 'currency',
      explanation: 'Total annual income in retirement'
    },
    {
      id: 'replacementRatio',
      label: 'Income Replacement Ratio (%)',
      type: 'percentage',
      explanation: 'Percentage of pre-retirement income replaced'
    },
    {
      id: 'savingsStrategy',
      label: 'Savings Strategy',
      type: 'text',
      explanation: 'Recommended savings and investment strategy'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
    ValidationRuleFactory.required('currentSavings', 'Current savings is required'),
    ValidationRuleFactory.required('monthlyContribution', 'Monthly contribution is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('retirementIncomeNeeded', 'Retirement income needed is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.required('contributionFrequency', 'Contribution frequency is required'),
    ValidationRuleFactory.required('accountType', 'Account type is required'),
    ValidationRuleFactory.range('currentAge', 18, 120, 'Current age must be between 18 and 120'),
    ValidationRuleFactory.range('retirementAge', 50, 120, 'Retirement age must be between 50 and 120'),
    ValidationRuleFactory.range('currentSavings', 0, 10000000, 'Current savings must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('monthlyContribution', 0, 10000, 'Monthly contribution must be between $0 and $10,000'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
    ValidationRuleFactory.range('retirementIncomeNeeded', 0, 500000, 'Retirement income needed must be between $0 and $500,000'),
    ValidationRuleFactory.range('socialSecurityBenefit', 0, 50000, 'Social Security benefit must be between $0 and $50,000'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('employerMatch', 0, 100, 'Employer match must be between 0% and 100%'),
    ValidationRuleFactory.range('employerMatchLimit', 0, 20000, 'Employer match limit must be between $0 and $20,000'),
    ValidationRuleFactory.businessRule(
      'retirementAge',
      (retirementAge, allInputs) => {
        if (!allInputs?.currentAge) return true;
        return retirementAge > allInputs.currentAge;
      },
      'Retirement age must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'retirementIncomeNeeded',
      (retirementIncomeNeeded, allInputs) => {
        if (!allInputs?.socialSecurityBenefit) return true;
        return retirementIncomeNeeded > allInputs.socialSecurityBenefit;
      },
      'Retirement income needed should typically exceed Social Security benefits'
    )
  ],

  examples: [
    {
      title: 'Early Saver - Good Progress',
      description: '35-year-old with solid savings foundation',
      inputs: {
        currentAge: 35,
        retirementAge: 65,
        currentSavings: 150000,
        monthlyContribution: 800,
        expectedReturn: 7,
        inflationRate: 2.5,
        retirementIncomeNeeded: 60000,
        socialSecurityBenefit: 20000,
        taxBracket: 25,
        contributionFrequency: 'monthly',
        accountType: '401k',
        employerMatch: 50,
        employerMatchLimit: 6000
      },
      expectedOutputs: {
        totalSavingsAtRetirement: 1200000,
        monthlySavingsNeeded: 0,
        annualSavingsNeeded: 0,
        savingsGap: 0,
        yearsToRetirement: 30,
        retirementReadinessScore: 85,
        projectedAnnualIncome: 55000,
        replacementRatio: 91.7,
        savingsStrategy: 'Excellent progress - consider tax-advantaged accounts and catch-up contributions'
      }
    },
    {
      title: 'Late Starter - Needs Action',
      description: '50-year-old just starting retirement savings',
      inputs: {
        currentAge: 50,
        retirementAge: 65,
        currentSavings: 50000,
        monthlyContribution: 300,
        expectedReturn: 6,
        inflationRate: 2.5,
        retirementIncomeNeeded: 50000,
        socialSecurityBenefit: 18000,
        taxBracket: 28,
        contributionFrequency: 'monthly',
        accountType: 'traditional_ira',
        employerMatch: 0,
        employerMatchLimit: 0
      },
      expectedOutputs: {
        totalSavingsAtRetirement: 280000,
        monthlySavingsNeeded: 800,
        annualSavingsNeeded: 9600,
        savingsGap: 12000,
        yearsToRetirement: 15,
        retirementReadinessScore: 45,
        projectedAnnualIncome: 36800,
        replacementRatio: 73.6,
        savingsStrategy: 'Significantly behind - immediate action needed: increase contributions, reduce expenses, or delay retirement'
      }
    }
  ]
};