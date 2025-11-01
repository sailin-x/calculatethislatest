import { Calculator } from '../../../types/calculator';
import { StructuredSettlementPayoutInputs, StructuredSettlementPayoutOutputs } from './types';
import { calculateStructuredSettlementPayout } from './formulas';
import { validateStructuredSettlementPayoutInputs, validateStructuredSettlementPayoutBusinessRules } from './validation';

export const StructuredSettlementPayoutCalculator: Calculator = {
  id: 'StructuredSettlementPayoutCalculator',
  title: 'Structured Settlement Payout Calculator',
  category: 'finance',
  subcategory: 'Insurance & Settlements',
  description: 'Compare structured settlement payouts with lump sum payments to determine the best financial option considering taxes, inflation, and investment returns.',
  usageInstructions: [
    'Enter your settlement amount and payout terms',
    'Input lump sum offer if available',
    'Specify discount rate and tax considerations',
    'Review NPV analysis and recommendations'
  ],

  inputs: [
    {
      id: 'settlementAmount',
      label: 'Settlement Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 100000000,
      tooltip: 'Total settlement amount'
    },
    {
      id: 'payoutPeriod',
      label: 'Payout Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      tooltip: 'Number of years over which payments will be made'
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' },
        { value: 'lump_sum', label: 'Lump Sum' }
      ],
      tooltip: 'How often payments will be received'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 25,
      step: 0.1,
      defaultValue: 3,
      tooltip: 'Rate used to calculate present value of future payments'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 20,
      step: 0.1,
      defaultValue: 2.5,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      tooltip: 'Applicable tax rate on payments'
    },
    {
      id: 'lumpSumOffer',
      label: 'Lump Sum Offer ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'One-time lump sum payment offer'
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      min: 0,
      max: 120,
      tooltip: 'Your current age'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      min: 1,
      max: 150,
      tooltip: 'Your expected lifespan'
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low - Prefer guaranteed payments' },
        { value: 'medium', label: 'Medium - Balanced approach' },
        { value: 'high', label: 'High - Willing to invest lump sum' }
      ],
      tooltip: 'Your willingness to accept investment risk'
    },
    {
      id: 'investmentReturn',
      label: 'Expected Investment Return (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 50,
      step: 0.1,
      defaultValue: 7,
      tooltip: 'Expected return if investing lump sum'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      defaultValue: 30,
      tooltip: 'Period over which to analyze payments'
    }
  ],

  outputs: [
    {
      id: 'totalStructuredPayments',
      label: 'Total Structured Payments',
      type: 'currency',
      explanation: 'Total amount that will be paid through structured settlement'
    },
    {
      id: 'lumpSumEquivalent',
      label: 'Lump Sum Equivalent',
      type: 'currency',
      explanation: 'Present value equivalent of lump sum offer'
    },
    {
      id: 'netPresentValueStructured',
      label: 'NPV Structured Settlement',
      type: 'currency',
      explanation: 'Net present value of structured payment stream'
    },
    {
      id: 'netPresentValueLumpSum',
      label: 'NPV Lump Sum',
      type: 'currency',
      explanation: 'Net present value of lump sum after taxes'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax advantages of structured settlement'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period',
      type: 'number',
      explanation: 'Years for structured settlement to equal lump sum value'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Equivalent monthly payment amount'
    },
    {
      id: 'annualPayment',
      label: 'Annual Payment',
      type: 'currency',
      explanation: 'Annual payment amount'
    },
    {
      id: 'totalPaymentsOverLife',
      label: 'Total Payments Over Lifetime',
      type: 'currency',
      explanation: 'Total payments you will receive during your lifetime'
    },
    {
      id: 'remainingValueAtDeath',
      label: 'Remaining Value at Death',
      type: 'currency',
      explanation: 'Value remaining in settlement at end of life expectancy'
    },
    {
      id: 'paymentSchedule',
      label: 'Payment Schedule',
      type: 'text',
      explanation: 'Year-by-year breakdown of payments and present values'
    },
    {
      id: 'comparisonAnalysis',
      label: 'Comparison Analysis',
      type: 'text',
      explanation: 'Analysis comparing structured vs lump sum options'
    },
    {
      id: 'sensitivityAnalysis',
      label: 'Sensitivity Analysis',
      type: 'text',
      explanation: 'How results change with different investment return assumptions'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Personal Injury Settlement',
      description: 'Compare structured settlement vs lump sum for $1M personal injury award',
      inputs: {
        settlementAmount: 1000000,
        payoutPeriod: 20,
        paymentFrequency: 'monthly',
        discountRate: 3,
        inflationRate: 2.5,
        taxRate: 25,
        lumpSumOffer: 650000,
        currentAge: 45,
        lifeExpectancy: 85,
        riskTolerance: 'medium',
        investmentReturn: 7,
        analysisPeriod: 30
      },
      expectedOutputs: {
        totalStructuredPayments: 1000000,
        lumpSumEquivalent: 650000,
        netPresentValueStructured: 850000,
        netPresentValueLumpSum: 487500,
        taxSavings: 75000,
        breakEvenPeriod: 15.2,
        monthlyPayment: 4167,
        annualPayment: 50000,
        totalPaymentsOverLife: 800000,
        remainingValueAtDeath: 200000,
        paymentSchedule: [],
        comparisonAnalysis: {
          structuredAdvantage: 362500,
          lumpSumAdvantage: -362500,
          recommendation: 'Structured settlement provides better long-term value',
          riskAssessment: 'Medium risk - consider investment returns'
        },
        sensitivityAnalysis: []
      }
    },
    {
      title: 'Lump Sum Advantage Scenario',
      description: 'When lump sum offers better value due to high discount rates',
      inputs: {
        settlementAmount: 500000,
        payoutPeriod: 10,
        paymentFrequency: 'annually',
        discountRate: 8,
        inflationRate: 3,
        taxRate: 30,
        lumpSumOffer: 350000,
        currentAge: 55,
        lifeExpectancy: 80,
        riskTolerance: 'high',
        investmentReturn: 8,
        analysisPeriod: 20
      },
      expectedOutputs: {
        totalStructuredPayments: 500000,
        lumpSumEquivalent: 350000,
        netPresentValueStructured: 280000,
        netPresentValueLumpSum: 245000,
        taxSavings: 30000,
        breakEvenPeriod: 8.5,
        monthlyPayment: 3472,
        annualPayment: 41667,
        totalPaymentsOverLife: 333333,
        remainingValueAtDeath: 166667,
        paymentSchedule: [],
        comparisonAnalysis: {
          structuredAdvantage: 35000,
          lumpSumAdvantage: -35000,
          recommendation: 'Lump sum payment provides better current value',
          riskAssessment: 'Higher risk - requires good investment management'
        },
        sensitivityAnalysis: []
      }
    }
  ]
};