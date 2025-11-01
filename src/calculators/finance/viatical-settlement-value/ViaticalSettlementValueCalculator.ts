import { Calculator } from '../../../types/calculator';
import { ViaticalSettlementInputs, ViaticalSettlementOutputs } from './types';
import {
  calculateSettlementValue,
  calculateNetSettlementAmount,
  calculateViaticalDiscount,
  calculateMonthlyPremiumSavings,
  calculateAnnualPremiumSavings,
  calculateBreakEvenPeriod,
  calculateTaxLiability,
  calculateNetBenefit,
  calculateSettlementRatio,
  calculateInternalRateOfReturn,
  calculateRiskAdjustedValue
} from './formulas';
import { validateViaticalSettlementInputs, validateViaticalSettlementBusinessRules } from './validation';

export const ViaticalSettlementValueCalculator: Calculator = {
  id: 'ViaticalSettlementValueCalculator',
  title: 'Viatical Settlement Value Calculator',
  category: 'finance',
  subcategory: 'Insurance & Settlements',
  description: 'Calculate the value of viatical settlements for life insurance policies based on health condition, life expectancy, and market factors. Includes tax implications and settlement viability analysis.',
  usageInstructions: [
    'Enter life insurance policy details and face value',
    'Specify current health condition and life expectancy',
    'Input premium information and policy ownership details',
    'Select state for regulatory compliance',
    'Review settlement value and net benefit analysis',
    'Consider tax implications and break-even analysis'
  ],

  inputs: [
    {
      id: 'faceValue',
      label: 'Policy Face Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'Total death benefit of the life insurance policy'
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Policy owner\'s current age'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy (Months)',
      type: 'number',
      required: true,
      min: 1,
      max: 600,
      tooltip: 'Estimated life expectancy in months'
    },
    {
      id: 'healthCondition',
      label: 'Health Condition',
      type: 'select',
      required: true,
      options: [
        { value: 'terminal', label: 'Terminal (Life expectancy ≤ 24 months)' },
        { value: 'critical', label: 'Critical (Life expectancy ≤ 60 months)' },
        { value: 'serious', label: 'Serious (Chronic or serious illness)' }
      ],
      tooltip: 'Severity of health condition affecting life expectancy'
    },
    {
      id: 'policyType',
      label: 'Policy Type',
      type: 'select',
      required: true,
      options: [
        { value: 'whole_life', label: 'Whole Life' },
        { value: 'universal', label: 'Universal Life' },
        { value: 'term', label: 'Term Life' }
      ],
      tooltip: 'Type of life insurance policy'
    },
    {
      id: 'premiumAmount',
      label: 'Annual Premium Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000,
      tooltip: 'Annual premium cost'
    },
    {
      id: 'premiumFrequency',
      label: 'Premium Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      tooltip: 'How often premiums are paid'
    },
    {
      id: 'yearsOwned',
      label: 'Years Policy Owned',
      type: 'number',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Number of years the policy has been owned'
    },
    {
      id: 'discountRate',
      label: 'Market Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      defaultValue: 8,
      tooltip: 'Market discount rate for viatical settlements'
    },
    {
      id: 'settlementFees',
      label: 'Settlement Fees ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      tooltip: 'Total fees associated with the settlement'
    },
    {
      id: 'state',
      label: 'State',
      type: 'select',
      required: true,
      options: [
        { value: 'CA', label: 'California' },
        { value: 'NY', label: 'New York' },
        { value: 'FL', label: 'Florida' },
        { value: 'TX', label: 'Texas' }
      ],
      tooltip: 'State for regulatory compliance and tax calculations'
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      defaultValue: 25,
      tooltip: 'Marginal tax bracket for tax calculations'
    }
  ],

  outputs: [
    {
      id: 'settlementValue',
      label: 'Settlement Value',
      type: 'currency',
      explanation: 'Estimated viatical settlement amount'
    },
    {
      id: 'netSettlementAmount',
      label: 'Net Settlement Amount',
      type: 'currency',
      explanation: 'Settlement value after fees and taxes'
    },
    {
      id: 'viaticalDiscount',
      label: 'Viatical Discount (%)',
      type: 'percentage',
      explanation: 'Discount from face value'
    },
    {
      id: 'monthlyPremiumSavings',
      label: 'Monthly Premium Savings',
      type: 'currency',
      explanation: 'Monthly savings from not paying premiums'
    },
    {
      id: 'annualPremiumSavings',
      label: 'Annual Premium Savings',
      type: 'currency',
      explanation: 'Annual savings from not paying premiums'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to recover settlement value through premium savings'
    },
    {
      id: 'taxLiability',
      label: 'Tax Liability',
      type: 'currency',
      explanation: 'Taxes owed on settlement proceeds'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Total financial benefit of viatical settlement'
    },
    {
      id: 'settlementRatio',
      label: 'Settlement Ratio (%)',
      type: 'percentage',
      explanation: 'Settlement value as percentage of face value'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Rate of return on the viatical settlement'
    },
    {
      id: 'riskAdjustedValue',
      label: 'Risk-Adjusted Value',
      type: 'currency',
      explanation: 'Settlement value adjusted for risk factors'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Terminal Illness Settlement',
      description: 'Viatical settlement for a terminally ill patient with 6-month life expectancy',
      inputs: {
        faceValue: 500000,
        currentAge: 65,
        lifeExpectancy: 6,
        healthCondition: 'terminal',
        policyType: 'whole_life',
        premiumAmount: 8500,
        premiumFrequency: 'annually',
        yearsOwned: 15,
        discountRate: 8,
        settlementFees: 15000,
        state: 'CA',
        taxBracket: 25
      },
      expectedOutputs: {
        settlementValue: 425000,
        netSettlementAmount: 401250,
        viaticalDiscount: 15,
        monthlyPremiumSavings: 708,
        annualPremiumSavings: 8500,
        breakEvenPeriod: 47.2,
        taxLiability: 0,
        netBenefit: 416250,
        settlementRatio: 85,
        internalRateOfReturn: 12.5,
        riskAdjustedValue: 425000
      }
    },
    {
      title: 'Critical Condition Settlement',
      description: 'Settlement for patient with critical condition and 18-month life expectancy',
      inputs: {
        faceValue: 250000,
        currentAge: 55,
        lifeExpectancy: 18,
        healthCondition: 'critical',
        policyType: 'universal',
        premiumAmount: 4200,
        premiumFrequency: 'annually',
        yearsOwned: 8,
        discountRate: 10,
        settlementFees: 8000,
        state: 'FL',
        taxBracket: 22
      },
      expectedOutputs: {
        settlementValue: 187500,
        netSettlementAmount: 175250,
        viaticalDiscount: 25,
        monthlyPremiumSavings: 350,
        annualPremiumSavings: 4200,
        breakEvenPeriod: 41.7,
        taxLiability: 0,
        netBenefit: 179250,
        settlementRatio: 75,
        internalRateOfReturn: 8.9,
        riskAdjustedValue: 168750
      }
    }
  ]
};