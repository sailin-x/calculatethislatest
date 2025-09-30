import { Calculator } from '../../../types/calculator';
import { GrantorRetainedAnnuityTrustGratCalculatorInputs, GrantorRetainedAnnuityTrustGratCalculatorOutputs } from './types';
import {
  calculateAnnualAnnuityPayment,
  calculateTotalAnnuityPayments,
  calculateRemainingValue,
  calculateTaxSavings,
  calculateEffectiveTransfer,
  generateGratAnalysis
} from './formulas';
import { validateGrantorRetainedAnnuityTrustGratCalculatorInputs } from './validation';

export const GrantorRetainedAnnuityTrustGratCalculator: Calculator = {
  id: 'grantor-retained-annuity-trust-grat-calculator',
  title: 'Grantor Retained Annuity Trust (GRAT) Calculator',
  category: 'finance',
  subcategory: 'Tax Planning',
  description: 'Calculate GRAT annuity payments, remaining value to beneficiaries, and estate tax savings from grantor retained annuity trusts.',
  usageInstructions: [
    'Enter the initial trust value and annuity rate',
    'Specify the term length in years',
    'Input expected growth and discount rates',
    'Review annuity payments and tax-advantaged transfer to beneficiaries'
  ],

  inputs: [
    {
      id: 'initialValue',
      label: 'Initial Trust Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Initial value transferred to the GRAT'
    },
    {
      id: 'annuityRate',
      label: 'Annuity Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Annual annuity payment as percentage of initial value'
    },
    {
      id: 'termYears',
      label: 'Term Length (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Number of years the GRAT will pay annuities'
    },
    {
      id: 'growthRate',
      label: 'Expected Growth Rate (%)',
      type: 'percentage',
      required: false,
      min: -50,
      max: 50,
      defaultValue: 6,
      tooltip: 'Expected annual growth rate of trust assets'
    },
    {
      id: 'discountRate',
      label: '7520 Discount Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: 4,
      tooltip: 'IRS discount rate for valuing annuity payments'
    },
    {
      id: 'isZeroedOut',
      label: 'Zeroed-Out GRAT',
      type: 'boolean',
      required: false,
      tooltip: 'Whether this is designed to have zero value at term end'
    }
  ],

  outputs: [
    {
      id: 'annualAnnuityPayment',
      label: 'Annual Annuity Payment',
      type: 'currency',
      explanation: 'Annual payment received by the grantor'
    },
    {
      id: 'totalAnnuityPayments',
      label: 'Total Annuity Payments',
      type: 'currency',
      explanation: 'Total payments received over the GRAT term'
    },
    {
      id: 'remainingValue',
      label: 'Remaining Value to Beneficiaries',
      type: 'currency',
      explanation: 'Value transferred to beneficiaries tax-free'
    },
    {
      id: 'taxSavings',
      label: 'Estate Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from removing assets from estate'
    },
    {
      id: 'effectiveTransfer',
      label: 'Effective Transfer Amount',
      type: 'currency',
      explanation: 'Net benefit after annuity payments'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Standard 5-Year GRAT',
      description: 'Typical GRAT with moderate growth and annuity rate',
      inputs: {
        initialValue: 1000000,
        annuityRate: 7.5,
        termYears: 5,
        growthRate: 6,
        discountRate: 4,
        isZeroedOut: false
      },
      expectedOutputs: {
        annualAnnuityPayment: 75000,
        totalAnnuityPayments: 375000,
        remainingValue: 358000,
        taxSavings: 143200,
        effectiveTransfer: -17000
      }
    }
  ]
};