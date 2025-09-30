import { Calculator } from '../../../types/calculator';
import { GiftTaxCalculatorInputs, GiftTaxCalculatorOutputs } from './types';
import {
  calculateGiftTaxDue,
  calculateRemainingAnnualExclusion,
  calculateRemainingLifetimeExclusion,
  calculateAfterTaxGiftAmount,
  calculateEffectiveTaxRate,
  generateGiftTaxAnalysis
} from './formulas';
import { validateGiftTaxCalculatorInputs } from './validation';

export const GiftTaxCalculator: Calculator = {
  id: 'gift-tax-calculator',
  title: 'Gift Tax Calculator',
  category: 'finance',
  subcategory: 'Tax Planning',
  description: 'Calculate federal gift tax liability and exemption utilization for lifetime gifts, including annual and lifetime exclusions.',
  usageInstructions: [
    'Enter the gift amount being transferred',
    'Specify relationship to the recipient',
    'Input annual and lifetime exclusions already used',
    'Set applicable gift tax rate (currently 40%)',
    'Review tax calculations and exemption planning'
  ],

  inputs: [
    {
      id: 'giftAmount',
      label: 'Gift Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount being gifted to the recipient'
    },
    {
      id: 'relationship',
      label: 'Relationship to Recipient',
      type: 'select',
      required: true,
      options: [
        { value: 'spouse', label: 'Spouse' },
        { value: 'child', label: 'Child' },
        { value: 'grandchild', label: 'Grandchild' },
        { value: 'other', label: 'Other' }
      ],
      tooltip: 'Relationship between donor and recipient'
    },
    {
      id: 'annualExclusionUsed',
      label: 'Annual Exclusion Used This Year ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Portion of annual exclusion already used in current year'
    },
    {
      id: 'lifetimeExclusionUsed',
      label: 'Lifetime Exclusion Used ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Portion of lifetime exclusion already used'
    },
    {
      id: 'giftTaxRate',
      label: 'Gift Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      defaultValue: 40,
      tooltip: 'Applicable federal gift tax rate'
    },
    {
      id: 'isAnnualExclusion',
      label: 'Apply Annual Exclusion',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to apply the annual gift tax exclusion'
    },
    {
      id: 'isLifetimeExclusion',
      label: 'Apply Lifetime Exclusion',
      type: 'boolean',
      required: false,
      tooltip: 'Whether to apply the lifetime gift tax exclusion'
    }
  ],

  outputs: [
    {
      id: 'giftTaxDue',
      label: 'Gift Tax Due',
      type: 'currency',
      explanation: 'Federal gift tax liability on the transfer'
    },
    {
      id: 'remainingAnnualExclusion',
      label: 'Remaining Annual Exclusion',
      type: 'currency',
      explanation: 'Annual gift tax exclusion remaining for the year'
    },
    {
      id: 'remainingLifetimeExclusion',
      label: 'Remaining Lifetime Exclusion',
      type: 'currency',
      explanation: 'Lifetime gift tax exclusion remaining'
    },
    {
      id: 'afterTaxGiftAmount',
      label: 'After-Tax Gift Amount',
      type: 'currency',
      explanation: 'Net amount received by recipient after gift tax'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Gift Tax Rate',
      type: 'percentage',
      explanation: 'Effective tax rate after applying exclusions'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Tax-Free Annual Exclusion Gift',
      description: 'Gift within annual exclusion limits',
      inputs: {
        giftAmount: 15000,
        relationship: 'child',
        annualExclusionUsed: 0,
        lifetimeExclusionUsed: 0,
        giftTaxRate: 40,
        isAnnualExclusion: true,
        isLifetimeExclusion: false
      },
      expectedOutputs: {
        giftTaxDue: 0,
        remainingAnnualExclusion: 3400,
        remainingLifetimeExclusion: 13470000,
        afterTaxGiftAmount: 15000,
        effectiveTaxRate: 0
      }
    },
    {
      title: 'Gift Exceeding Exclusions',
      description: 'Large gift that triggers gift tax',
      inputs: {
        giftAmount: 100000,
        relationship: 'child',
        annualExclusionUsed: 18400,
        lifetimeExclusionUsed: 0,
        giftTaxRate: 40,
        isAnnualExclusion: true,
        isLifetimeExclusion: true
      },
      expectedOutputs: {
        giftTaxDue: 32720,
        remainingAnnualExclusion: 0,
        remainingLifetimeExclusion: 13337300,
        afterTaxGiftAmount: 67280,
        effectiveTaxRate: 32.72
      }
    }
  ]
};