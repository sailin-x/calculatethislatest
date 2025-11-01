import { Calculator } from '../../../types/calculator';
import { VariableAnnuityInputs, VariableAnnuityOutputs } from './types';
import {
  calculateProjectedValue,
  calculateAnnuityIncome,
  calculateTotalContributions,
  calculateTaxLiability,
  calculateBreakEvenAge,
  calculateInternalRateOfReturn,
  calculateLifetimeIncome
} from './formulas';
import { validateVariableAnnuityInputs, validateVariableAnnuityBusinessRules } from './validation';

export const VariableAnnuityCalculator: Calculator = {
  id: 'VariableAnnuityCalculator',
  title: 'Variable Annuity Calculator',
  category: 'finance',
  subcategory: 'Retirement & Income',
  description: 'Calculate projected value, annuity income, and risk analysis for variable annuities with market volatility considerations. Includes tax implications and suitability analysis.',
  usageInstructions: [
    'Enter initial investment and monthly contributions',
    'Specify investment horizon and expected return rate',
    'Input volatility and annuity payout parameters',
    'Select annuity type and payout options',
    'Review projected income and risk analysis',
    'Consider tax implications and fees'
  ],

  inputs: [
    {
      id: 'initialInvestment',
      label: 'Initial Investment ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 10000000,
      tooltip: 'One-time initial deposit to the variable annuity'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 50000,
      tooltip: 'Monthly investment amount'
    },
    {
      id: 'investmentHorizon',
      label: 'Investment Horizon (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Number of years until annuity payments begin'
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Your current age'
    },
    {
      id: 'annuityStartAge',
      label: 'Annuity Start Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Age when annuity payments will begin'
    },
    {
      id: 'expectedReturnRate',
      label: 'Expected Return Rate (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 25,
      step: 0.1,
      defaultValue: 7,
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'volatility',
      label: 'Volatility (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      defaultValue: 15,
      tooltip: 'Expected annual volatility of investments'
    },
    {
      id: 'annuityPayoutRate',
      label: 'Annuity Payout Rate (%)',
      type: 'percentage',
      required: true,
      min: 1,
      max: 15,
      step: 0.1,
      defaultValue: 6,
      tooltip: 'Annual payout rate for annuity income'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 10,
      step: 0.1,
      defaultValue: 3,
      tooltip: 'Expected annual inflation rate'
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
      tooltip: 'Your marginal tax bracket'
    },
    {
      id: 'annuityType',
      label: 'Annuity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate Annuity' },
        { value: 'deferred', label: 'Deferred Annuity' }
      ],
      tooltip: 'Immediate starts payments immediately, deferred accumulates first'
    },
    {
      id: 'payoutType',
      label: 'Payout Type',
      type: 'select',
      required: true,
      options: [
        { value: 'lifetime', label: 'Lifetime Only' },
        { value: 'period_certain', label: 'Period Certain' },
        { value: 'joint_survivor', label: 'Joint & Survivor' }
      ],
      tooltip: 'How long payments continue'
    },
    {
      id: 'riderFees',
      label: 'Rider Fees (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 5,
      step: 0.1,
      defaultValue: 0.5,
      tooltip: 'Annual cost of annuity riders'
    },
    {
      id: 'managementFees',
      label: 'Management Fees (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 3,
      step: 0.1,
      defaultValue: 1.0,
      tooltip: 'Annual investment management fees'
    }
  ],

  outputs: [
    {
      id: 'projectedValue',
      label: 'Projected Value',
      type: 'currency',
      explanation: 'Estimated value of the variable annuity at maturity'
    },
    {
      id: 'annuityIncome',
      label: 'Monthly Annuity Income',
      type: 'currency',
      explanation: 'Expected monthly income from the annuity'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Sum of all contributions made'
    },
    {
      id: 'totalEarnings',
      label: 'Total Earnings',
      type: 'currency',
      explanation: 'Investment earnings and growth'
    },
    {
      id: 'taxLiability',
      label: 'Tax Liability',
      type: 'currency',
      explanation: 'Taxes owed on annuity earnings'
    },
    {
      id: 'netAnnuityIncome',
      label: 'Net Annuity Income',
      type: 'currency',
      explanation: 'After-tax monthly annuity income'
    },
    {
      id: 'breakEvenAge',
      label: 'Break-Even Age',
      type: 'number',
      explanation: 'Age when annuity payments exceed contributions'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Overall rate of return on the investment'
    },
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return',
      type: 'number',
      explanation: 'Return adjusted for volatility risk'
    },
    {
      id: 'annuityPurchaseValue',
      label: 'Annuity Purchase Value',
      type: 'currency',
      explanation: 'Value used to purchase the annuity'
    },
    {
      id: 'lifetimeIncome',
      label: 'Lifetime Income',
      type: 'currency',
      explanation: 'Total income expected over lifetime'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Retirement Planning with Variable Annuity',
      description: '30-year-old planning for retirement with deferred variable annuity',
      inputs: {
        initialInvestment: 50000,
        monthlyContribution: 1000,
        investmentHorizon: 30,
        currentAge: 30,
        annuityStartAge: 65,
        expectedReturnRate: 7,
        volatility: 15,
        annuityPayoutRate: 6,
        inflationRate: 3,
        taxBracket: 25,
        annuityType: 'deferred',
        payoutType: 'lifetime',
        riderFees: 0.5,
        managementFees: 1.0
      },
      expectedOutputs: {
        projectedValue: 1500000,
        annuityIncome: 7500,
        totalContributions: 410000,
        totalEarnings: 1090000,
        taxLiability: 272500,
        netAnnuityIncome: 5625,
        breakEvenAge: 78,
        internalRateOfReturn: 7.0,
        riskAdjustedReturn: 0.47,
        annuityPurchaseValue: 1500000,
        lifetimeIncome: 1350000
      }
    },
    {
      title: 'Immediate Variable Annuity',
      description: '60-year-old converting savings to immediate annuity income',
      inputs: {
        initialInvestment: 500000,
        monthlyContribution: 0,
        investmentHorizon: 0,
        currentAge: 60,
        annuityStartAge: 60,
        expectedReturnRate: 5,
        volatility: 12,
        annuityPayoutRate: 5.5,
        inflationRate: 2.5,
        taxBracket: 22,
        annuityType: 'immediate',
        payoutType: 'joint_survivor',
        riderFees: 0.3,
        managementFees: 0.8
      },
      expectedOutputs: {
        projectedValue: 500000,
        annuityIncome: 2292,
        totalContributions: 500000,
        totalEarnings: 0,
        taxLiability: 0,
        netAnnuityIncome: 2292,
        breakEvenAge: 60,
        internalRateOfReturn: 5.5,
        riskAdjustedReturn: 0.46,
        annuityPurchaseValue: 500000,
        lifetimeIncome: 823000
      }
    }
  ]
};