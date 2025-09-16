import { Calculator } from '../../../types/calculator';
import { calculateRothConversion } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const rothConversionTaxCalculator: Calculator = {
  id: 'roth-conversion-tax-calculator',
  title: 'Roth Conversion Tax Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate the tax implications of converting traditional retirement accounts to Roth accounts, including immediate tax liability, long-term benefits, and optimal conversion strategies.',

  usageInstructions: [
    'Enter your current age and conversion amount',
    'Specify current and expected tax brackets',
    'Review tax implications and breakeven analysis',
    'Consider five-year rule and time horizon'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '55',
      tooltip: 'Your current age',
      defaultValue: 55,
      min: 18,
      max: 120
    },
    {
      id: 'conversionAmount',
      label: 'Conversion Amount',
      type: 'currency',
      required: true,
      placeholder: '50000',
      tooltip: 'Amount to convert from Traditional to Roth',
      defaultValue: 50000,
      min: 0,
      max: 1000000
    },
    {
      id: 'currentTaxBracket',
      label: 'Current Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '28',
      tooltip: 'Your current marginal tax rate',
      defaultValue: 28,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'expectedTaxBracket',
      label: 'Expected Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '22',
      tooltip: 'Expected tax rate in retirement',
      defaultValue: 22,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'fiveYearRule',
      label: 'Five-Year Rule Satisfied',
      type: 'boolean',
      required: false,
      tooltip: 'Whether five-year rule is satisfied for Roth withdrawals',
      defaultValue: false
    },
    {
      id: 'timeHorizon',
      label: 'Time Horizon (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Years until you need the funds',
      defaultValue: 20,
      min: 1,
      max: 100
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
      id: 'accountType',
      label: 'Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional_ira', label: 'Traditional IRA' },
        { value: '401k', label: '401(k)' },
        { value: 'sep_ira', label: 'SEP IRA' },
        { value: 'simple_ira', label: 'SIMPLE IRA' }
      ],
      tooltip: 'Type of account being converted',
      defaultValue: 'traditional_ira'
    },
    {
      id: 'includeStateTax',
      label: 'Include State Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Include state-level tax calculations',
      defaultValue: false
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'State tax rate for conversion',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'medicalExpenses',
      label: 'Medical Expenses',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Annual medical expenses (may affect tax bracket)',
      defaultValue: 0,
      min: 0,
      max: 100000
    },
    {
      id: 'charitableContributions',
      label: 'Charitable Contributions',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Annual charitable contributions',
      defaultValue: 0,
      min: 0,
      max: 100000
    }
  ],

  outputs: [
    {
      id: 'immediateTaxLiability',
      label: 'Immediate Tax Liability',
      type: 'currency',
      explanation: 'Taxes owed on the conversion this year'
    },
    {
      id: 'stateTaxLiability',
      label: 'State Tax Liability',
      type: 'currency',
      explanation: 'State taxes owed on the conversion'
    },
    {
      id: 'totalTaxLiability',
      label: 'Total Tax Liability',
      type: 'currency',
      explanation: 'Combined federal and state taxes'
    },
    {
      id: 'netConversionAmount',
      label: 'Net Conversion Amount',
      type: 'currency',
      explanation: 'Amount that actually goes into Roth account'
    },
    {
      id: 'projectedValue',
      label: 'Projected Roth Value',
      type: 'currency',
      explanation: 'Future value of converted amount'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Long-term tax savings from conversion'
    },
    {
      id: 'breakevenYears',
      label: 'Breakeven Years',
      type: 'number',
      explanation: 'Years needed to recover conversion costs'
    },
    {
      id: 'conversionEfficiency',
      label: 'Conversion Efficiency (%)',
      type: 'percentage',
      explanation: 'Percentage of original amount that goes to Roth'
    },
    {
      id: 'recommendedStrategy',
      label: 'Recommended Strategy',
      type: 'text',
      explanation: 'Recommended conversion strategy based on inputs'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('conversionAmount', 'Conversion amount is required'),
    ValidationRuleFactory.required('currentTaxBracket', 'Current tax bracket is required'),
    ValidationRuleFactory.required('expectedTaxBracket', 'Expected tax bracket is required'),
    ValidationRuleFactory.required('timeHorizon', 'Time horizon is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('accountType', 'Account type is required'),
    ValidationRuleFactory.range('currentAge', 18, 120, 'Current age must be between 18 and 120'),
    ValidationRuleFactory.range('conversionAmount', 0, 1000000, 'Conversion amount must be between $0 and $1,000,000'),
    ValidationRuleFactory.range('currentTaxBracket', 0, 50, 'Current tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('expectedTaxBracket', 0, 50, 'Expected tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('timeHorizon', 1, 100, 'Time horizon must be between 1 and 100 years'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
    ValidationRuleFactory.range('stateTaxRate', 0, 20, 'State tax rate must be between 0% and 20%'),
    ValidationRuleFactory.range('medicalExpenses', 0, 100000, 'Medical expenses must be between $0 and $100,000'),
    ValidationRuleFactory.range('charitableContributions', 0, 100000, 'Charitable contributions must be between $0 and $100,000'),
    ValidationRuleFactory.businessRule(
      'conversionAmount',
      (conversionAmount, allInputs) => {
        if (!allInputs?.accountType) return true;

        // Different limits for different account types
        if (allInputs.accountType === 'traditional_ira') {
          return conversionAmount <= 100000; // Reasonable IRA conversion limit
        }
        return conversionAmount <= 1000000; // Higher limit for 401k
      },
      'Conversion amount exceeds typical limits for selected account type'
    ),
    ValidationRuleFactory.businessRule(
      'timeHorizon',
      (timeHorizon, allInputs) => {
        if (!allInputs?.fiveYearRule) return true;
        return timeHorizon >= 5; // Five-year rule consideration
      },
      'Consider five-year rule requirements for Roth conversions'
    )
  ],

  examples: [
    {
      title: 'High Current Tax Bracket',
      description: 'Individual in 28% bracket expecting 22% in retirement',
      inputs: {
        currentAge: 55,
        conversionAmount: 50000,
        currentTaxBracket: 28,
        expectedTaxBracket: 22,
        fiveYearRule: false,
        timeHorizon: 20,
        expectedReturn: 7,
        inflationRate: 2.5,
        accountType: 'traditional_ira',
        includeStateTax: true,
        stateTaxRate: 5,
        medicalExpenses: 0,
        charitableContributions: 0
      },
      expectedOutputs: {
        immediateTaxLiability: 19000,
        stateTaxLiability: 2500,
        totalTaxLiability: 21500,
        netConversionAmount: 28500,
        projectedValue: 102000,
        taxSavings: 15000,
        breakevenYears: 3.1,
        conversionEfficiency: 57,
        recommendedStrategy: 'Strong candidate for Roth conversion - pay taxes now at higher rate, benefit from tax-free growth'
      }
    },
    {
      title: 'Five-Year Rule Consideration',
      description: 'Conversion with five-year rule satisfied',
      inputs: {
        currentAge: 60,
        conversionAmount: 75000,
        currentTaxBracket: 24,
        expectedTaxBracket: 20,
        fiveYearRule: true,
        timeHorizon: 15,
        expectedReturn: 6,
        inflationRate: 2.5,
        accountType: '401k',
        includeStateTax: false,
        stateTaxRate: 0,
        medicalExpenses: 5000,
        charitableContributions: 2000
      },
      expectedOutputs: {
        immediateTaxLiability: 18000,
        stateTaxLiability: 0,
        totalTaxLiability: 18000,
        netConversionAmount: 57000,
        projectedValue: 152000,
        taxSavings: 12000,
        breakevenYears: 2.9,
        conversionEfficiency: 76,
        recommendedStrategy: 'Good conversion candidate - high efficiency and long time horizon'
      }
    }
  ]
};