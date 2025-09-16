import { Calculator } from '../../../types/calculator';
import { calculateGiftTax } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const giftTaxCalculator: Calculator = {
  id: 'gift-tax-calculator',
  title: 'Gift Tax Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate gift tax liability, optimize annual and lifetime exclusions, and plan tax-efficient wealth transfers with comprehensive analysis of federal gift tax rules.',

  usageInstructions: [
    'Enter the gift amount and recipient details',
    'Specify annual and lifetime exclusion amounts',
    'Select marital status and planning parameters',
    'Review tax calculations and optimization strategies'
  ],

  inputs: [
    {
      id: 'giftAmount',
      label: 'Gift Amount',
      type: 'currency',
      required: true,
      placeholder: '50000',
      tooltip: 'Total amount being gifted',
      defaultValue: 50000,
      min: 0,
      max: 100000000
    },
    {
      id: 'annualExclusionAmount',
      label: 'Annual Exclusion Amount',
      type: 'currency',
      required: true,
      placeholder: '18000',
      tooltip: 'Annual gift tax exclusion per recipient (2024: $18,000)',
      defaultValue: 18000,
      min: 0,
      max: 50000
    },
    {
      id: 'lifetimeExclusionUsed',
      label: 'Lifetime Exclusion Used',
      type: 'currency',
      required: true,
      placeholder: '2000000',
      tooltip: 'Amount of lifetime exclusion already used',
      defaultValue: 2000000,
      min: 0,
      max: 15000000
    },
    {
      id: 'lifetimeExclusionLimit',
      label: 'Lifetime Exclusion Limit',
      type: 'currency',
      required: true,
      placeholder: '13800000',
      tooltip: 'Total lifetime gift/estate tax exclusion (2024: $13.8M)',
      defaultValue: 13800000,
      min: 0,
      max: 20000000
    },
    {
      id: 'giftTaxRate',
      label: 'Gift Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '40',
      tooltip: 'Federal gift tax rate (currently 40%)',
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'numberOfRecipients',
      label: 'Number of Recipients',
      type: 'number',
      required: true,
      placeholder: '3',
      tooltip: 'Number of people receiving gifts',
      defaultValue: 3,
      min: 1,
      max: 50
    },
    {
      id: 'maritalStatus',
      label: 'Marital Status',
      type: 'select',
      required: true,
      options: [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' }
      ],
      tooltip: 'Marital status affects spousal gift rules',
      defaultValue: 'married'
    },
    {
      id: 'includeSpousalPortion',
      label: 'Include Spousal Portion',
      type: 'boolean',
      required: false,
      tooltip: 'Include unlimited spousal gifts in calculations',
      defaultValue: true
    },
    {
      id: 'inflationAdjustment',
      label: 'Inflation Adjustment (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Annual inflation rate for projections',
      defaultValue: 2.5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'planningHorizon',
      label: 'Planning Horizon (Years)',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Years to project gift growth',
      defaultValue: 20,
      min: 1,
      max: 100
    },
    {
      id: 'expectedGrowthRate',
      label: 'Expected Growth Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '7',
      tooltip: 'Expected annual return on gifted assets',
      defaultValue: 7,
      min: -10,
      max: 25,
      step: 0.5
    }
  ],

  outputs: [
    {
      id: 'taxableGiftAmount',
      label: 'Taxable Gift Amount',
      type: 'currency',
      explanation: 'Amount subject to gift tax after exclusions'
    },
    {
      id: 'giftTaxLiability',
      label: 'Gift Tax Liability',
      type: 'currency',
      explanation: 'Total gift tax owed'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      explanation: 'Overall tax rate on the gift'
    },
    {
      id: 'remainingLifetimeExclusion',
      label: 'Remaining Lifetime Exclusion',
      type: 'currency',
      explanation: 'Unused portion of lifetime exclusion'
    },
    {
      id: 'totalAnnualExclusions',
      label: 'Total Annual Exclusions',
      type: 'currency',
      explanation: 'Total annual exclusions available'
    },
    {
      id: 'netGiftAmount',
      label: 'Net Gift Amount',
      type: 'currency',
      explanation: 'Amount received after tax'
    },
    {
      id: 'projectedFutureValue',
      label: 'Projected Future Value',
      type: 'currency',
      explanation: 'Future value of gift after growth'
    },
    {
      id: 'taxSavingsFromExclusions',
      label: 'Tax Savings from Exclusions',
      type: 'currency',
      explanation: 'Tax savings from using exclusions'
    },
    {
      id: 'breakEvenGiftAmount',
      label: 'Break-Even Gift Amount',
      type: 'currency',
      explanation: 'Gift amount that fully utilizes exclusions'
    },
    {
      id: 'optimalGiftStrategy',
      label: 'Optimal Gift Strategy',
      type: 'text',
      explanation: 'Recommended gifting strategy'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('giftAmount', 'Gift amount is required'),
    ValidationRuleFactory.required('annualExclusionAmount', 'Annual exclusion amount is required'),
    ValidationRuleFactory.required('lifetimeExclusionLimit', 'Lifetime exclusion limit is required'),
    ValidationRuleFactory.required('giftTaxRate', 'Gift tax rate is required'),
    ValidationRuleFactory.required('numberOfRecipients', 'Number of recipients is required'),
    ValidationRuleFactory.required('maritalStatus', 'Marital status is required'),
    ValidationRuleFactory.range('giftAmount', 0, 100000000, 'Gift amount must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('annualExclusionAmount', 0, 50000, 'Annual exclusion must be between $0 and $50,000'),
    ValidationRuleFactory.range('lifetimeExclusionUsed', 0, 20000000, 'Lifetime exclusion used must be between $0 and $20,000,000'),
    ValidationRuleFactory.range('lifetimeExclusionLimit', 0, 20000000, 'Lifetime exclusion limit must be between $0 and $20,000,000'),
    ValidationRuleFactory.range('giftTaxRate', 0, 100, 'Gift tax rate must be between 0% and 100%'),
    ValidationRuleFactory.range('numberOfRecipients', 1, 50, 'Number of recipients must be between 1 and 50'),
    ValidationRuleFactory.businessRule(
      'lifetimeExclusionUsed',
      (lifetimeExclusionUsed, allInputs) => {
        if (!allInputs?.lifetimeExclusionLimit) return true;
        return lifetimeExclusionUsed <= allInputs.lifetimeExclusionLimit;
      },
      'Lifetime exclusion used cannot exceed lifetime exclusion limit'
    ),
    ValidationRuleFactory.businessRule(
      'planningHorizon',
      (planningHorizon) => {
        if (planningHorizon === undefined || planningHorizon === null) return true;
        return planningHorizon >= 0 && planningHorizon <= 100;
      },
      'Planning horizon must be between 0 and 100 years'
    ),
    ValidationRuleFactory.businessRule(
      'expectedGrowthRate',
      (expectedGrowthRate) => {
        if (expectedGrowthRate === undefined || expectedGrowthRate === null) return true;
        return expectedGrowthRate >= -10 && expectedGrowthRate <= 25;
      },
      'Expected growth rate must be between -10% and 25%'
    )
  ],

  examples: [
    {
      title: 'Annual Exclusion Gift',
      description: 'Standard annual exclusion gift to children',
      inputs: {
        giftAmount: 18000,
        annualExclusionAmount: 18000,
        lifetimeExclusionUsed: 0,
        lifetimeExclusionLimit: 13800000,
        giftTaxRate: 40,
        numberOfRecipients: 1,
        maritalStatus: 'married',
        includeSpousalPortion: true,
        inflationAdjustment: 2.5,
        planningHorizon: 20,
        expectedGrowthRate: 7
      },
      expectedOutputs: {
        taxableGiftAmount: 0,
        giftTaxLiability: 0,
        effectiveTaxRate: 0,
        remainingLifetimeExclusion: 13800000,
        totalAnnualExclusions: 18000,
        netGiftAmount: 18000,
        projectedFutureValue: 69120,
        taxSavingsFromExclusions: 7200,
        breakEvenGiftAmount: 18000,
        optimalGiftStrategy: 'Standard annual exclusion gifts'
      }
    },
    {
      title: 'Large Gift Using Lifetime Exclusion',
      description: 'Substantial gift utilizing lifetime exclusion',
      inputs: {
        giftAmount: 2000000,
        annualExclusionAmount: 18000,
        lifetimeExclusionUsed: 0,
        lifetimeExclusionLimit: 13800000,
        giftTaxRate: 40,
        numberOfRecipients: 1,
        maritalStatus: 'married',
        includeSpousalPortion: false,
        inflationAdjustment: 2.5,
        planningHorizon: 30,
        expectedGrowthRate: 6
      },
      expectedOutputs: {
        taxableGiftAmount: 1982000,
        giftTaxLiability: 792800,
        effectiveTaxRate: 39.64,
        remainingLifetimeExclusion: 11800000,
        totalAnnualExclusions: 18000,
        netGiftAmount: 1207200,
        projectedFutureValue: 5773440,
        taxSavingsFromExclusions: 7200,
        breakEvenGiftAmount: 18000,
        optimalGiftStrategy: 'Utilize lifetime exclusion for large gifts'
      }
    }
  ]
};