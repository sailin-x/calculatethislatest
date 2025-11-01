import { Calculator } from '../../types/calculator';
import { OpportunityZoneInputs, OpportunityZoneOutputs } from './types';
import {
  calculateDeferredTaxSavings,
  calculateStepUpTaxSavings,
  calculateExclusionTaxSavings,
  calculateProjectedValue,
  calculateTotalCashFlow,
  calculateLeveragedReturn,
  calculateIRR,
  calculateNPV,
  calculateEffectiveTaxRate,
  calculateAfterTaxIRR,
  generateOpportunityZoneAnalysis
} from './formulas';
import { validateOpportunityZoneInputs } from './validation';

export const OpportunityZoneCalculator: Calculator = {
  id: 'opportunity-zone-investment-roi-calculator',
  title: 'Opportunity Zone Investment ROI Calculator',
  category: 'finance',
  subcategory: 'Tax-Advantaged Investing',
  description: 'Calculate returns and tax benefits for Opportunity Zone investments with deferral, step-up, and exclusion analysis.',
  usageInstructions: [
    'Enter initial investment amount and investment date',
    'Specify holding period and tax rates',
    'Set expected appreciation and cash flow',
    'Configure tax benefit options (deferral, step-up, exclusion)',
    'Review comprehensive ROI analysis and tax savings'
  ],

  inputs: [
    {
      id: 'initialInvestment',
      label: 'Initial Investment ($)',
      type: 'currency',
      required: true,
      min: 1000,
      max: 10000000,
      tooltip: 'Amount invested in Opportunity Zone property'
    },
    {
      id: 'investmentDate',
      label: 'Investment Date',
      type: 'date',
      required: true,
      tooltip: 'Date of investment in Opportunity Zone'
    },
    {
      id: 'holdingPeriodYears',
      label: 'Holding Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Total years investment will be held'
    },
    {
      id: 'capitalGainsTaxRate',
      label: 'Capital Gains Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Your current long-term capital gains tax rate'
    },
    {
      id: 'ordinaryIncomeTaxRate',
      label: 'Ordinary Income Tax Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Your ordinary income tax rate for comparison'
    },
    {
      id: 'expectedAnnualAppreciation',
      label: 'Expected Annual Appreciation (%)',
      type: 'percentage',
      required: true,
      min: -50,
      max: 100,
      tooltip: 'Expected annual property value growth'
    },
    {
      id: 'expectedAnnualIncome',
      label: 'Expected Annual Income ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Expected annual cash flow from investment'
    },
    {
      id: 'capitalGainAmount',
      label: 'Capital Gain Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Amount of capital gain being deferred'
    },
    {
      id: 'deferralPeriodYears',
      label: 'Deferral Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 10,
      tooltip: 'Years until capital gains tax payment is due'
    },
    {
      id: 'stepUpPercentage',
      label: 'Step-Up Percentage (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 20,
      tooltip: 'Tax basis step-up (10% at 5 years, 5% at 7 years)'
    },
    {
      id: 'exitYear',
      label: 'Exit Year',
      type: 'number',
      required: true,
      min: 1,
      max: 30,
      tooltip: 'Year of investment sale/exit'
    },
    {
      id: 'exitMultiple',
      label: 'Exit Multiple',
      type: 'number',
      required: true,
      min: 0.1,
      max: 10,
      tooltip: 'Investment value multiple at exit'
    },
    {
      id: 'leveragePercentage',
      label: 'Leverage Percentage (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 90,
      tooltip: 'Percentage of investment financed with debt'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 25,
      tooltip: 'Financing interest rate'
    },
    {
      id: 'includeTaxDeferral',
      label: 'Include Tax Deferral',
      type: 'boolean',
      required: false,
      tooltip: 'Account for capital gains tax deferral benefit'
    },
    {
      id: 'includeStepUp',
      label: 'Include Step-Up',
      type: 'boolean',
      required: false,
      tooltip: 'Account for tax basis step-up benefits'
    },
    {
      id: 'includeExclusion',
      label: 'Include Exclusion',
      type: 'boolean',
      required: false,
      tooltip: 'Account for complete tax exclusion after 10 years'
    },
    {
      id: 'riskAdjustedDiscountRate',
      label: 'Risk-Adjusted Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 50,
      tooltip: 'Discount rate adjusted for investment risk'
    }
  ],

  outputs: [
    {
      id: 'totalTaxSavings',
      label: 'Total Tax Savings',
      type: 'currency',
      explanation: 'Combined tax savings from deferral, step-up, and exclusion'
    },
    {
      id: 'projectedValue',
      label: 'Projected Value',
      type: 'currency',
      explanation: 'Expected investment value at exit'
    },
    {
      id: 'afterTaxIrr',
      label: 'After-Tax IRR',
      type: 'percentage',
      explanation: 'Internal rate of return after taxes'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate',
      type: 'percentage',
      explanation: 'Overall tax rate after Opportunity Zone benefits'
    },
    {
      id: 'deferredTaxSavings',
      label: 'Deferred Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from deferral benefit'
    },
    {
      id: 'stepUpTaxSavings',
      label: 'Step-Up Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from basis step-up'
    },
    {
      id: 'exclusionTaxSavings',
      label: 'Exclusion Tax Savings',
      type: 'currency',
      explanation: 'Tax savings from exclusion benefit'
    },
    {
      id: 'totalCashFlow',
      label: 'Total Cash Flow',
      type: 'currency',
      explanation: 'Total cash flow over holding period'
    },
    {
      id: 'leveragedReturn',
      label: 'Leveraged Return',
      type: 'percentage',
      explanation: 'Return on equity invested (with leverage)'
    },
    {
      id: 'npv',
      label: 'Net Present Value',
      type: 'currency',
      explanation: 'Present value of future cash flows'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '7-Year Opportunity Zone Investment',
      description: 'Calculate ROI for $500K investment held 7 years with 8% appreciation',
      inputs: {
        initialInvestment: 500000,
        investmentDate: '2024-01-01',
        holdingPeriodYears: 7,
        capitalGainsTaxRate: 20,
        ordinaryIncomeTaxRate: 35,
        expectedAnnualAppreciation: 8,
        expectedAnnualIncome: 25000,
        capitalGainAmount: 300000,
        deferralPeriodYears: 5,
        stepUpPercentage: 15,
        exitYear: 7,
        exitMultiple: 1.8,
        leveragePercentage: 60,
        interestRate: 6.5,
        includeTaxDeferral: true,
        includeStepUp: true,
        includeExclusion: false,
        riskAdjustedDiscountRate: 12
      },
      expectedOutputs: {
        totalTaxSavings: 135000,
        projectedValue: 900000,
        afterTaxIrr: 18.5,
        effectiveTaxRate: 8.5,
        deferredTaxSavings: 60000,
        stepUpTaxSavings: 45000,
        exclusionTaxSavings: 30000,
        totalCashFlow: 175000,
        leveragedReturn: 24.3,
        npv: 285000
      }
    },
    {
      title: '10-Year Complete Exclusion',
      description: 'Calculate benefits of holding investment for complete tax exclusion',
      inputs: {
        initialInvestment: 750000,
        investmentDate: '2024-01-01',
        holdingPeriodYears: 10,
        capitalGainsTaxRate: 20,
        ordinaryIncomeTaxRate: 35,
        expectedAnnualAppreciation: 6,
        expectedAnnualIncome: 37500,
        capitalGainAmount: 400000,
        deferralPeriodYears: 7,
        stepUpPercentage: 15,
        exitYear: 10,
        exitMultiple: 2.0,
        leveragePercentage: 70,
        interestRate: 5.5,
        includeTaxDeferral: true,
        includeStepUp: true,
        includeExclusion: true,
        riskAdjustedDiscountRate: 10
      },
      expectedOutputs: {
        totalTaxSavings: 320000,
        projectedValue: 1500000,
        afterTaxIrr: 22.1,
        effectiveTaxRate: 0,
        deferredTaxSavings: 80000,
        stepUpTaxSavings: 60000,
        exclusionTaxSavings: 180000,
        totalCashFlow: 375000,
        leveragedReturn: 31.7,
        npv: 485000
      }
    }
  ]
};