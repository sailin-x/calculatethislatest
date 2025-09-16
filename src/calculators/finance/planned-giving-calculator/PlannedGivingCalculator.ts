import { Calculator } from '../../../types/calculator';
import { calculatePlannedGiving } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const plannedGivingCalculator: Calculator = {
  id: 'planned-giving-calculator',
  title: 'Planned Giving Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate tax benefits and charitable impact of planned giving strategies including charitable remainder trusts, lead trusts, life insurance, and bequests with comprehensive analysis of giving methods.',

  usageInstructions: [
    'Enter your planned gift amount and personal details',
    'Select your preferred giving method and trust type',
    'Review tax savings, charitable impact, and income benefits',
    'Compare different planned giving strategies'
  ],

  inputs: [
    {
      id: 'giftAmount',
      label: 'Gift Amount',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Total amount planned for charitable giving',
      defaultValue: 100000,
      min: 0,
      max: 100000000
    },
    {
      id: 'donorAge',
      label: 'Donor Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Your current age',
      defaultValue: 65,
      min: 0,
      max: 120
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      placeholder: '85',
      tooltip: 'Your estimated life expectancy',
      defaultValue: 85,
      min: 1,
      max: 120
    },
    {
      id: 'givingMethod',
      label: 'Giving Method',
      type: 'select',
      required: true,
      options: [
        { value: 'outright', label: 'Outright Gift' },
        { value: 'charitable_remainder_trust', label: 'Charitable Remainder Trust' },
        { value: 'charitable_lead_trust', label: 'Charitable Lead Trust' },
        { value: 'life_insurance', label: 'Life Insurance' },
        { value: 'bequest', label: 'Bequest' }
      ],
      tooltip: 'Method of planned giving',
      defaultValue: 'charitable_remainder_trust'
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '32',
      tooltip: 'Your marginal tax rate',
      defaultValue: 32,
      min: 0,
      max: 50,
      step: 5
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
      id: 'charitableDeductionRate',
      label: 'Charitable Deduction Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '50',
      tooltip: 'Percentage of gift deductible for tax purposes',
      defaultValue: 50,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'trustType',
      label: 'Trust Type',
      type: 'select',
      required: false,
      options: [
        { value: 'annuity', label: 'Annuity Trust' },
        { value: 'unitrust', label: 'Unitrust' },
        { value: 'lead', label: 'Lead Trust' },
        { value: 'perpetual', label: 'Perpetual Trust' }
      ],
      tooltip: 'Type of charitable trust',
      defaultValue: 'annuity'
    },
    {
      id: 'payoutRate',
      label: 'Payout Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'Annual payout rate for trusts',
      defaultValue: 5,
      min: 0,
      max: 50,
      step: 0.5
    },
    {
      id: 'trustTerm',
      label: 'Trust Term (Years)',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Duration of trust term',
      defaultValue: 20,
      min: 1,
      max: 100
    },
    {
      id: 'includeSpouse',
      label: 'Include Spouse',
      type: 'boolean',
      required: false,
      tooltip: 'Include spouse in planning',
      defaultValue: false
    },
    {
      id: 'spouseAge',
      label: 'Spouse Age',
      type: 'number',
      required: false,
      placeholder: '62',
      tooltip: 'Spouse current age',
      defaultValue: 62,
      min: 0,
      max: 120
    }
  ],

  outputs: [
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax benefits from charitable deduction'
    },
    {
      id: 'netCost',
      label: 'Net Cost',
      type: 'currency',
      explanation: 'Actual cost after tax savings'
    },
    {
      id: 'charitableImpact',
      label: 'Charitable Impact',
      type: 'currency',
      explanation: 'Total charitable benefit'
    },
    {
      id: 'incomeGenerated',
      label: 'Income Generated',
      type: 'currency',
      explanation: 'Annual income from trust payouts'
    },
    {
      id: 'remainderValue',
      label: 'Remainder Value',
      type: 'currency',
      explanation: 'Value remaining for charity'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      explanation: 'Overall tax efficiency'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      explanation: 'Years to recover tax benefits'
    },
    {
      id: 'lifetimeGivingValue',
      label: 'Lifetime Giving Value',
      type: 'currency',
      explanation: 'Total value of charitable giving'
    },
    {
      id: 'optimalGivingStrategy',
      label: 'Optimal Giving Strategy',
      type: 'text',
      explanation: 'Recommended giving approach'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('giftAmount', 'Gift amount is required'),
    ValidationRuleFactory.required('donorAge', 'Donor age is required'),
    ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
    ValidationRuleFactory.required('givingMethod', 'Giving method is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('charitableDeductionRate', 'Charitable deduction rate is required'),
    ValidationRuleFactory.range('giftAmount', 0, 100000000, 'Gift amount must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('donorAge', 0, 120, 'Donor age must be between 0 and 120'),
    ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('charitableDeductionRate', 0, 100, 'Charitable deduction rate must be between 0% and 100%'),
    ValidationRuleFactory.range('payoutRate', 0, 50, 'Payout rate must be between 0% and 50%'),
    ValidationRuleFactory.range('trustTerm', 1, 100, 'Trust term must be between 1 and 100 years'),
    ValidationRuleFactory.businessRule(
      'lifeExpectancy',
      (lifeExpectancy, allInputs) => {
        if (!allInputs?.donorAge) return true;
        return lifeExpectancy > allInputs.donorAge;
      },
      'Life expectancy must be greater than donor age'
    ),
    ValidationRuleFactory.businessRule(
      'spouseAge',
      (spouseAge, allInputs) => {
        if (!allInputs?.includeSpouse) return true;
        return spouseAge >= 0 && spouseAge <= 120;
      },
      'Spouse age must be between 0 and 120 when spouse is included'
    ),
    ValidationRuleFactory.businessRule(
      'payoutRate',
      (payoutRate, allInputs) => {
        if (!allInputs?.givingMethod || !allInputs?.givingMethod.includes('trust')) return true;
        return payoutRate >= 0 && payoutRate <= 50;
      },
      'Payout rate must be between 0% and 50% for trust-based giving'
    )
  ],

  examples: [
    {
      title: 'Charitable Remainder Trust',
      description: 'High-income donor using CRT for tax benefits and income',
      inputs: {
        giftAmount: 500000,
        donorAge: 65,
        lifeExpectancy: 85,
        givingMethod: 'charitable_remainder_trust',
        taxBracket: 35,
        expectedReturn: 7,
        inflationRate: 2.5,
        charitableDeductionRate: 50,
        trustType: 'annuity',
        payoutRate: 5,
        trustTerm: 20,
        includeSpouse: false,
        spouseAge: 62
      },
      expectedOutputs: {
        taxSavings: 87500,
        netCost: 412500,
        charitableImpact: 500000,
        incomeGenerated: 25000,
        remainderValue: 300000,
        effectiveTaxRate: 17.5,
        breakEvenYears: 8,
        lifetimeGivingValue: 1000000,
        optimalGivingStrategy: 'Excellent for high-income donors seeking income and tax benefits'
      }
    },
    {
      title: 'Outright Charitable Gift',
      description: 'Immediate tax deduction for substantial gift',
      inputs: {
        giftAmount: 250000,
        donorAge: 60,
        lifeExpectancy: 80,
        givingMethod: 'outright',
        taxBracket: 32,
        expectedReturn: 6,
        inflationRate: 2.5,
        charitableDeductionRate: 45,
        trustType: 'annuity',
        payoutRate: 0,
        trustTerm: 0,
        includeSpouse: true,
        spouseAge: 58
      },
      expectedOutputs: {
        taxSavings: 36000,
        netCost: 214000,
        charitableImpact: 250000,
        incomeGenerated: 0,
        remainderValue: 0,
        effectiveTaxRate: 14.4,
        breakEvenYears: 0,
        lifetimeGivingValue: 500000,
        optimalGivingStrategy: 'Maximize tax deductions with immediate giving'
      }
    }
  ]
};