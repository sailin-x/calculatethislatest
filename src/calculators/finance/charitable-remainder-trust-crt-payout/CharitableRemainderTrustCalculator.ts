import { Calculator } from '../../types/calculator';
import { CharitableRemainderTrustInputs, CharitableRemainderTrustOutputs } from './types';
import {
  calculateInitialTaxDeduction,
  calculateAnnualPayout,
  calculateTotalPayouts,
  calculateRemainderValue,
  calculateTaxSavings,
  calculateEffectiveTaxRate,
  calculateNetCostToDonor,
  calculateTrustGrowth,
  calculateAnnualCashFlow,
  calculateTotalCashFlow,
  calculateEfficiencyRatio,
  generateCharitableRemainderTrustAnalysis
} from './formulas';
import { validateCharitableRemainderTrustInputs } from './validation';

export const CharitableRemainderTrustCalculator: Calculator = {
  id: 'charitable-remainder-trust-crt-payout-calculator',
  title: 'Charitable Remainder Trust (CRT) Payout Calculator',
  category: 'finance',
  subcategory: 'Tax-Advantaged Philanthropy',
  description: 'Calculate payouts, tax benefits, and charitable impact for Charitable Remainder Trusts (CRTs) with annuity trust and unitrust analysis.',
  usageInstructions: [
    'Enter initial contribution amount and trust type (annuity or unitrust)',
    'Specify payout rate and beneficiary information',
    'Set investment return expectations and tax rates',
    'Review payout projections, tax savings, and charitable remainder analysis'
  ],

  inputs: [
    {
      id: 'initialContribution',
      label: 'Initial Contribution ($)',
      type: 'currency',
      required: true,
      min: 100000,
      tooltip: 'Amount contributed to establish the CRT'
    },
    {
      id: 'trustType',
      label: 'Trust Type',
      type: 'select',
      required: true,
      options: [
        { value: 'charitable_remainder_annuity_trust', label: 'Annuity Trust (Fixed Payout)' },
        { value: 'charitable_remainder_unitrust', label: 'Unitrust (Variable Payout)' }
      ],
      tooltip: 'Type of CRT - annuity provides fixed payouts, unitrust varies with trust value'
    },
    {
      id: 'payoutRate',
      label: 'Annual Payout Rate (%)',
      type: 'percentage',
      required: true,
      min: 5,
      max: 50,
      tooltip: 'Annual payout as percentage of initial contribution (5-50% per IRS rules)'
    },
    {
      id: 'beneficiaryAge',
      label: 'Beneficiary Age',
      type: 'number',
      required: true,
      min: 18,
      max: 100,
      tooltip: 'Age of primary beneficiary'
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Expected years of payouts to beneficiary'
    },
    {
      id: 'numberOfBeneficiaries',
      label: 'Number of Beneficiaries',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      tooltip: 'Total number of income beneficiaries'
    },
    {
      id: 'expectedAnnualReturn',
      label: 'Expected Annual Return (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 30,
      tooltip: 'Expected annual investment return for trust assets'
    },
    {
      id: 'investmentFees',
      label: 'Annual Investment Fees (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 5,
      tooltip: 'Annual fees and expenses for trust investments'
    },
    {
      id: 'currentTaxRate',
      label: 'Current Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Your current marginal tax rate'
    },
    {
      id: 'ordinaryIncomeTaxRate',
      label: 'Ordinary Income Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Tax rate on ordinary income (applied to CRT payouts)'
    },
    {
      id: 'charitableDeductionRate',
      label: 'Charitable Deduction Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Tax rate for charitable contribution deduction'
    },
    {
      id: 'trustDuration',
      label: 'Trust Duration (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Years until remainder goes to charity'
    },
    {
      id: 'remainderBeneficiary',
      label: 'Remainder Beneficiary',
      type: 'text',
      required: true,
      tooltip: 'Charity or organization receiving remainder'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation Adjustment',
      type: 'boolean',
      required: false,
      tooltip: 'Adjust payouts for inflation over time'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: -5,
      max: 10,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'includeInvestmentFees',
      label: 'Include Investment Fees',
      type: 'boolean',
      required: false,
      tooltip: 'Account for investment management fees'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period',
      type: 'select',
      required: true,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'Time period for analysis and projections'
    },
    {
      id: 'includeTaxAnalysis',
      label: 'Include Tax Analysis',
      type: 'boolean',
      required: false,
      tooltip: 'Include detailed tax benefit calculations'
    },
    {
      id: 'includeCashFlowAnalysis',
      label: 'Include Cash Flow Analysis',
      type: 'boolean',
      required: false,
      tooltip: 'Include detailed cash flow projections'
    }
  ],

  outputs: [
    {
      id: 'annualPayout',
      label: 'Annual Payout',
      type: 'currency',
      explanation: 'Annual income payment from the CRT'
    },
    {
      id: 'totalPayouts',
      label: 'Total Payouts',
      type: 'currency',
      explanation: 'Total income payments over trust duration'
    },
    {
      id: 'remainderValue',
      label: 'Charitable Remainder',
      type: 'currency',
      explanation: 'Final amount going to designated charity'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Tax benefits from charitable deduction'
    },
    {
      id: 'annualCashFlow',
      label: 'Annual Cash Flow',
      type: 'currency',
      explanation: 'After-tax annual income to beneficiary'
    },
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow',
      type: 'currency',
      explanation: 'Total after-tax income over trust duration'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      explanation: 'Overall tax rate after CRT benefits'
    },
    {
      id: 'netCostToDonor',
      label: 'Net Cost to Donor',
      type: 'currency',
      explanation: 'Actual economic cost after tax benefits'
    },
    {
      id: 'trustGrowth',
      label: 'Trust Growth',
      type: 'currency',
      explanation: 'Total investment growth of trust assets'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Retirement Income CRT',
      description: 'Calculate CRT payouts for a 65-year-old donor with $500K contribution',
      inputs: {
        initialContribution: 500000,
        trustType: 'charitable_remainder_annuity_trust',
        payoutRate: 7,
        beneficiaryAge: 65,
        lifeExpectancy: 25,
        numberOfBeneficiaries: 1,
        expectedAnnualReturn: 6,
        investmentFees: 0.75,
        currentTaxRate: 32,
        ordinaryIncomeTaxRate: 22,
        charitableDeductionRate: 32,
        trustDuration: 25,
        remainderBeneficiary: 'Local University',
        includeInflation: true,
        inflationRate: 2.5,
        includeInvestmentFees: true,
        analysisPeriod: 'annual',
        includeTaxAnalysis: true,
        includeCashFlowAnalysis: true
      },
      expectedOutputs: {
        annualPayout: 35000,
        totalPayouts: 875000,
        remainderValue: 325000,
        taxSavings: 160000,
        annualCashFlow: 27300,
        totalCashFlow: 682500,
        effectiveTaxRate: 12.5,
        netCostToDonor: 175000,
        trustGrowth: 700000
      }
    },
    {
      title: 'Unitrust for Appreciated Assets',
      description: 'Calculate unitrust benefits for highly appreciated stock portfolio',
      inputs: {
        initialContribution: 1000000,
        trustType: 'charitable_remainder_unitrust',
        payoutRate: 6,
        beneficiaryAge: 70,
        lifeExpectancy: 20,
        numberOfBeneficiaries: 2,
        expectedAnnualReturn: 7,
        investmentFees: 1.0,
        currentTaxRate: 35,
        ordinaryIncomeTaxRate: 24,
        charitableDeductionRate: 35,
        trustDuration: 20,
        remainderBeneficiary: 'Medical Research Foundation',
        includeInflation: true,
        inflationRate: 3.0,
        includeInvestmentFees: true,
        analysisPeriod: 'annual',
        includeTaxAnalysis: true,
        includeCashFlowAnalysis: true
      },
      expectedOutputs: {
        annualPayout: 60000,
        totalPayouts: 1200000,
        remainderValue: 850000,
        taxSavings: 350000,
        annualCashFlow: 45600,
        totalCashFlow: 912000,
        effectiveTaxRate: 8.2,
        netCostToDonor: 315000,
        trustGrowth: 1650000
      }
    }
  ]
};