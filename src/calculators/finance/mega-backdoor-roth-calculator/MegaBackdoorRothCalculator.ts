import { Calculator } from '../../../types/calculator';
import { calculateMegaBackdoorRoth } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const megaBackdoorRothCalculator: Calculator = {
  id: 'mega-backdoor-roth-calculator',
  title: 'Mega Backdoor Roth Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate the benefits of Mega Backdoor Roth IRA contributions, including after-tax 401(k) contributions converted to Roth IRAs, tax savings analysis, and long-term retirement growth projections.',

  usageInstructions: [
    'Enter your salary and current retirement account balances',
    'Specify tax rates and expected investment returns',
    'Review contribution limits and tax optimization strategies',
    'Compare Mega Backdoor Roth vs. traditional retirement savings'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '45',
      tooltip: 'Your current age',
      defaultValue: 45,
      min: 0,
      max: 120
    },
    {
      id: 'annualSalary',
      label: 'Annual Salary',
      type: 'currency',
      required: true,
      placeholder: '150000',
      tooltip: 'Your gross annual salary',
      defaultValue: 150000,
      min: 0,
      max: 10000000
    },
    {
      id: 'employerMatch',
      label: 'Employer Match (%)',
      type: 'percentage',
      required: false,
      placeholder: '6',
      tooltip: 'Employer 401(k) match percentage',
      defaultValue: 6,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'current401kBalance',
      label: 'Current 401(k) Balance',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Current traditional 401(k) balance',
      defaultValue: 500000,
      min: 0,
      max: 10000000
    },
    {
      id: 'currentRothBalance',
      label: 'Current Roth IRA Balance',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Current Roth IRA balance',
      defaultValue: 100000,
      min: 0,
      max: 10000000
    },
    {
      id: 'expectedReturn',
      label: 'Expected Annual Return (%)',
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
      id: 'yearsToRetirement',
      label: 'Years to Retirement',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Years until retirement',
      defaultValue: 20,
      min: 0,
      max: 100
    },
    {
      id: 'taxBracket',
      label: 'Federal Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '32',
      tooltip: 'Your federal marginal tax rate',
      defaultValue: 32,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '8',
      tooltip: 'State income tax rate',
      defaultValue: 8,
      min: 0,
      max: 20,
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
      id: 'includeAfterTaxContributions',
      label: 'Include After-Tax 401(k)',
      type: 'boolean',
      required: false,
      tooltip: 'Include after-tax 401(k) contributions',
      defaultValue: true
    },
    {
      id: 'includeEmployerMatch',
      label: 'Include Employer Match',
      type: 'boolean',
      required: false,
      tooltip: 'Include employer matching contributions',
      defaultValue: true
    },
    {
      id: 'recharacterizationStrategy',
      label: 'Recharacterization Strategy',
      type: 'boolean',
      required: false,
      tooltip: 'Use recharacterization for tax optimization',
      defaultValue: false
    }
  ],

  outputs: [
    {
      id: 'maxAnnualContribution',
      label: 'Max Annual Contribution',
      type: 'currency',
      explanation: 'Maximum annual Mega Backdoor Roth contribution'
    },
    {
      id: 'afterTaxContribution',
      label: 'After-Tax Contribution',
      type: 'currency',
      explanation: 'Annual after-tax contribution amount'
    },
    {
      id: 'rothConversionAmount',
      label: 'Roth Conversion Amount',
      type: 'currency',
      explanation: 'Amount converted to Roth IRA'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from Roth conversion'
    },
    {
      id: 'futureRothValue',
      label: 'Future Roth Value',
      type: 'currency',
      explanation: 'Projected Roth IRA value at retirement'
    },
    {
      id: 'futureTraditionalValue',
      label: 'Future Traditional Value',
      type: 'currency',
      explanation: 'Projected traditional 401(k) value'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Additional retirement savings from strategy'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      explanation: 'Years to recover tax costs'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate (%)',
      type: 'percentage',
      explanation: 'Overall tax rate on contributions'
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
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('annualSalary', 'Annual salary is required'),
    ValidationRuleFactory.required('current401kBalance', 'Current 401(k) balance is required'),
    ValidationRuleFactory.required('currentRothBalance', 'Current Roth balance is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('yearsToRetirement', 'Years to retirement is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
    ValidationRuleFactory.range('annualSalary', 0, 10000000, 'Annual salary must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('yearsToRetirement', 0, 100, 'Years to retirement must be between 0 and 100'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),
    ValidationRuleFactory.businessRule(
      'currentAge',
      (currentAge, allInputs) => {
        if (!allInputs?.yearsToRetirement) return true;
        return currentAge + allInputs.yearsToRetirement <= 120;
      },
      'Age at retirement cannot exceed 120 years'
    ),
    ValidationRuleFactory.businessRule(
      'annualSalary',
      (annualSalary, allInputs) => {
        if (!allInputs?.currentAge) return true;

        // Mega Backdoor Roth typically requires high income
        const minSalary = allInputs.currentAge >= 50 ? 100000 : 150000;
        return annualSalary >= minSalary || annualSalary === 0;
      },
      'Mega Backdoor Roth typically requires higher income levels'
    )
  ],

  examples: [
    {
      title: 'High-Income Professional',
      description: 'Mega Backdoor Roth strategy for a 45-year-old professional',
      inputs: {
        currentAge: 45,
        annualSalary: 250000,
        employerMatch: 8,
        current401kBalance: 750000,
        currentRothBalance: 150000,
        expectedReturn: 7,
        yearsToRetirement: 20,
        taxBracket: 35,
        stateTaxRate: 10,
        inflationRate: 2.5,
        includeAfterTaxContributions: true,
        includeEmployerMatch: true,
        recharacterizationStrategy: false
      },
      expectedOutputs: {
        maxAnnualContribution: 30750,
        afterTaxContribution: 30750,
        rothConversionAmount: 30750,
        taxSavings: 16106,
        futureRothValue: 1200000,
        futureTraditionalValue: 2100000,
        netBenefit: 900000,
        breakEvenYears: 8,
        effectiveTaxRate: 45,
        retirementIncome: 48000
      }
    },
    {
      title: 'Catch-Up Contributions',
      description: 'Mega Backdoor Roth with catch-up contributions for age 50+',
      inputs: {
        currentAge: 55,
        annualSalary: 180000,
        employerMatch: 6,
        current401kBalance: 1200000,
        currentRothBalance: 300000,
        expectedReturn: 6,
        yearsToRetirement: 10,
        taxBracket: 28,
        stateTaxRate: 5,
        inflationRate: 2.5,
        includeAfterTaxContributions: true,
        includeEmployerMatch: true,
        recharacterizationStrategy: true
      },
      expectedOutputs: {
        maxAnnualContribution: 30750,
        afterTaxContribution: 30750,
        rothConversionAmount: 30750,
        taxSavings: 12950,
        futureRothValue: 650000,
        futureTraditionalValue: 1800000,
        netBenefit: 1150000,
        breakEvenYears: 6,
        effectiveTaxRate: 33,
        retirementIncome: 26000
      }
    }
  ]
};