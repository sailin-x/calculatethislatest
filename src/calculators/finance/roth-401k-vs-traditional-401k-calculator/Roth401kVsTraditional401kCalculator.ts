import { Calculator } from '../../../types/calculator';
import { calculateRothVsTraditional } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const roth401kVsTraditional401kCalculator: Calculator = {
  id: 'roth-401k-vs-traditional-401k-calculator',
  title: 'Roth 401(k) vs. Traditional 401(k) Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Compare Roth 401(k) and Traditional 401(k) options to determine which retirement savings strategy provides better tax advantages and long-term growth based on your current and expected future tax brackets.',

  usageInstructions: [
    'Enter your current age and income information',
    'Specify current and expected tax brackets',
    'Review comparison results and recommended strategy',
    'Consider employer match and contribution limits'
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
      id: 'currentIncome',
      label: 'Current Annual Income',
      type: 'currency',
      required: true,
      placeholder: '75000',
      tooltip: 'Your current annual income',
      defaultValue: 75000,
      min: 0,
      max: 10000000
    },
    {
      id: 'expectedIncomeGrowth',
      label: 'Expected Income Growth (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual income growth',
      defaultValue: 3,
      min: -20,
      max: 50,
      step: 0.5
    },
    {
      id: 'currentTaxBracket',
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
      id: 'retirementTaxBracket',
      label: 'Retirement Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '20',
      tooltip: 'Expected tax rate in retirement',
      defaultValue: 20,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'expectedReturn',
      label: 'Expected Investment Return (%)',
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
      id: 'annualContribution',
      label: 'Annual Contribution',
      type: 'currency',
      required: true,
      placeholder: '6000',
      tooltip: 'Annual contribution amount',
      defaultValue: 6000,
      min: 0,
      max: 23000
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
      placeholder: '3000',
      tooltip: 'Maximum employer match amount',
      defaultValue: 3000,
      min: 0,
      max: 10000
    },
    {
      id: 'timeHorizon',
      label: 'Time Horizon (Years)',
      type: 'number',
      required: true,
      placeholder: '30',
      tooltip: 'Years until retirement',
      defaultValue: 30,
      min: 1,
      max: 100
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
      id: 'rothConversionAmount',
      label: 'Roth Conversion Amount',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Amount to convert from Traditional to Roth',
      defaultValue: 0,
      min: 0,
      max: 1000000
    },
    {
      id: 'fiveYearRule',
      label: 'Five-Year Rule Satisfied',
      type: 'boolean',
      required: false,
      tooltip: 'Whether five-year rule is satisfied for Roth withdrawals',
      defaultValue: false
    }
  ],

  outputs: [
    {
      id: 'traditional401kValue',
      label: 'Traditional 401(k) Value',
      type: 'currency',
      explanation: 'Projected value of Traditional 401(k) at retirement'
    },
    {
      id: 'roth401kValue',
      label: 'Roth 401(k) Value',
      type: 'currency',
      explanation: 'Projected value of Roth 401(k) at retirement'
    },
    {
      id: 'traditionalTaxSavings',
      label: 'Traditional Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from Traditional 401(k) contributions'
    },
    {
      id: 'rothTaxSavings',
      label: 'Roth Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from Roth 401(k) (typically $0)'
    },
    {
      id: 'traditionalNetValue',
      label: 'Traditional Net Value',
      type: 'currency',
      explanation: 'Traditional 401(k) value after retirement taxes'
    },
    {
      id: 'rothNetValue',
      label: 'Roth Net Value',
      type: 'currency',
      explanation: 'Roth 401(k) value (tax-free withdrawals)'
    },
    {
      id: 'breakevenTaxRate',
      label: 'Breakeven Tax Rate',
      type: 'percentage',
      explanation: 'Tax rate at which both options are equal'
    },
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Recommended retirement savings strategy'
    },
    {
      id: 'taxEfficiency',
      label: 'Tax Efficiency Score',
      type: 'number',
      explanation: 'Score indicating tax efficiency (0-100)'
    },
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return',
      type: 'percentage',
      explanation: 'Return adjusted for tax risk factors'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
    ValidationRuleFactory.required('currentIncome', 'Current income is required'),
    ValidationRuleFactory.required('currentTaxBracket', 'Current tax bracket is required'),
    ValidationRuleFactory.required('retirementTaxBracket', 'Retirement tax bracket is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('annualContribution', 'Annual contribution is required'),
    ValidationRuleFactory.required('timeHorizon', 'Time horizon is required'),
    ValidationRuleFactory.range('currentAge', 18, 120, 'Current age must be between 18 and 120'),
    ValidationRuleFactory.range('retirementAge', 50, 120, 'Retirement age must be between 50 and 120'),
    ValidationRuleFactory.range('currentIncome', 0, 10000000, 'Current income must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('expectedIncomeGrowth', -20, 50, 'Expected income growth must be between -20% and 50%'),
    ValidationRuleFactory.range('currentTaxBracket', 0, 50, 'Current tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('retirementTaxBracket', 0, 50, 'Retirement tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('annualContribution', 0, 23000, 'Annual contribution must be between $0 and $23,000'),
    ValidationRuleFactory.range('employerMatch', 0, 100, 'Employer match must be between 0% and 100%'),
    ValidationRuleFactory.range('employerMatchLimit', 0, 10000, 'Employer match limit must be between $0 and $10,000'),
    ValidationRuleFactory.range('timeHorizon', 1, 100, 'Time horizon must be between 1 and 100 years'),
    ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
    ValidationRuleFactory.range('rothConversionAmount', 0, 1000000, 'Roth conversion amount must be between $0 and $1,000,000'),
    ValidationRuleFactory.businessRule(
      'retirementAge',
      (retirementAge, allInputs) => {
        if (!allInputs?.currentAge) return true;
        return retirementAge > allInputs.currentAge;
      },
      'Retirement age must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'annualContribution',
      (annualContribution, allInputs) => {
        if (!allInputs?.currentIncome) return true;
        return annualContribution <= allInputs.currentIncome * 0.5; // Reasonable contribution limit
      },
      'Annual contribution should not exceed 50% of current income'
    )
  ],

  examples: [
    {
      title: 'Higher Current Tax Bracket',
      description: 'Individual in 28% tax bracket expecting 20% in retirement',
      inputs: {
        currentAge: 35,
        retirementAge: 65,
        currentIncome: 85000,
        expectedIncomeGrowth: 3,
        currentTaxBracket: 28,
        retirementTaxBracket: 20,
        expectedReturn: 7,
        annualContribution: 6000,
        employerMatch: 50,
        employerMatchLimit: 3000,
        timeHorizon: 30,
        inflationRate: 2.5,
        rothConversionAmount: 0,
        fiveYearRule: false
      },
      expectedOutputs: {
        traditional401kValue: 510000,
        roth401kValue: 442000,
        traditionalTaxSavings: 1680,
        rothTaxSavings: 0,
        traditionalNetValue: 408000,
        rothNetValue: 442000,
        breakevenTaxRate: 84,
        recommendedStrategy: 'Roth 401(k) recommended - pay taxes now at higher rate, withdraw tax-free later',
        taxEfficiency: 80,
        riskAdjustedReturn: 5.6
      }
    },
    {
      title: 'Lower Retirement Tax Bracket',
      description: 'Individual expecting lower taxes in retirement',
      inputs: {
        currentAge: 45,
        retirementAge: 65,
        currentIncome: 65000,
        expectedIncomeGrowth: 2,
        currentTaxBracket: 22,
        retirementTaxBracket: 15,
        expectedReturn: 6,
        annualContribution: 5500,
        employerMatch: 75,
        employerMatchLimit: 4125,
        timeHorizon: 20,
        inflationRate: 2.5,
        rothConversionAmount: 0,
        fiveYearRule: true
      },
      expectedOutputs: {
        traditional401kValue: 220000,
        roth401kValue: 190000,
        traditionalTaxSavings: 1210,
        rothTaxSavings: 0,
        traditionalNetValue: 187000,
        rothNetValue: 190000,
        breakevenTaxRate: 86.4,
        recommendedStrategy: 'Traditional 401(k) recommended - defer taxes to lower retirement tax rate',
        taxEfficiency: 85,
        riskAdjustedReturn: 5.1
      }
    }
  ]
};