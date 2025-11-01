import { Calculator } from '../../../types/calculator';
import { MortgagePointsInputs, MortgagePointsOutputs } from './types';
import { calculateMortgagePoints } from './formulas';
import { validateMortgagePointsInputs, validateMortgagePointsBusinessRules } from './validation';

export const MortgagePointsCalculator: Calculator = {
  id: 'MortgagePointsCalculator',
  title: 'Mortgage Points Calculator',
  category: 'finance',
  subcategory: 'Mortgage & Real Estate',
  description: 'Calculate the costs and benefits of purchasing discount points on your mortgage, including breakeven analysis and ROI calculations.',
  usageInstructions: [
    'Enter loan amount, interest rate, and term',
    'Specify number of discount and origination points',
    'Input expected holding period and property details',
    'Review breakeven analysis and recommendations'
  ],

  inputs: [
    {
      id: 'loanAmount',
      label: 'Loan Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total loan amount'
    },
    {
      id: 'baseInterestRate',
      label: 'Base Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Interest rate without discount points'
    },
    {
      id: 'loanTerm',
      label: 'Loan Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Length of the loan in years'
    },
    {
      id: 'discountPoints',
      label: 'Discount Points',
      type: 'number',
      required: true,
      min: 0,
      max: 10,
      step: 0.5,
      tooltip: 'Number of discount points to purchase'
    },
    {
      id: 'originationPoints',
      label: 'Origination Points',
      type: 'number',
      required: false,
      min: 0,
      max: 5,
      step: 0.5,
      defaultValue: 0,
      tooltip: 'Number of origination points charged by lender'
    },
    {
      id: 'lenderCredits',
      label: 'Lender Credits ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Credits provided by lender to offset closing costs'
    },
    {
      id: 'expectedHoldingPeriod',
      label: 'Expected Holding Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'How long you plan to keep the loan'
    },
    {
      id: 'propertyAppreciationRate',
      label: 'Annual Property Appreciation (%)',
      type: 'percentage',
      required: false,
      min: -20,
      max: 50,
      step: 0.5,
      defaultValue: 3,
      tooltip: 'Expected annual property value increase'
    },
    {
      id: 'closingCosts',
      label: 'Closing Costs ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Total closing costs for the loan'
    },
    {
      id: 'otherFees',
      label: 'Other Fees ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Additional fees and costs'
    },
    {
      id: 'currentMarketRate',
      label: 'Current Market Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 30,
      step: 0.125,
      tooltip: 'Current market interest rate'
    },
    {
      id: 'creditScore',
      label: 'Credit Score',
      type: 'number',
      required: true,
      min: 300,
      max: 850,
      tooltip: 'Your FICO credit score'
    },
    {
      id: 'loanType',
      label: 'Loan Type',
      type: 'select',
      required: true,
      options: [
        { value: 'conventional', label: 'Conventional' },
        { value: 'fha', label: 'FHA' },
        { value: 'va', label: 'VA' },
        { value: 'usda', label: 'USDA' }
      ],
      tooltip: 'Type of mortgage loan'
    },
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'downPayment',
      label: 'Down Payment ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Down payment amount'
    },
    {
      id: 'monthlyPaymentWithoutPoints',
      label: 'Monthly Payment Without Points ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly payment at base interest rate'
    },
    {
      id: 'monthlyPaymentWithPoints',
      label: 'Monthly Payment With Points ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Monthly payment after purchasing points'
    }
  ],

  outputs: [
    {
      id: 'pointsCost',
      label: 'Points Cost',
      type: 'currency',
      explanation: 'Total cost of purchasing discount and origination points'
    },
    {
      id: 'monthlySavings',
      label: 'Monthly Savings',
      type: 'currency',
      explanation: 'Monthly payment reduction from purchasing points'
    },
    {
      id: 'annualSavings',
      label: 'Annual Savings',
      type: 'currency',
      explanation: 'Annual payment reduction from purchasing points'
    },
    {
      id: 'totalSavings',
      label: 'Total Savings',
      type: 'currency',
      explanation: 'Total savings over expected holding period'
    },
    {
      id: 'breakevenPeriod',
      label: 'Breakeven Period (Months)',
      type: 'number',
      explanation: 'Months required to recover points cost'
    },
    {
      id: 'breakevenMonths',
      label: 'Breakeven Months',
      type: 'number',
      explanation: 'Months to break even on points investment'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Net financial benefit from purchasing points'
    },
    {
      id: 'effectiveRateWithPoints',
      label: 'Effective Rate With Points (%)',
      type: 'percentage',
      explanation: 'Effective interest rate after purchasing points'
    },
    {
      id: 'effectiveRateWithoutPoints',
      label: 'Effective Rate Without Points (%)',
      type: 'percentage',
      explanation: 'Base interest rate without points'
    },
    {
      id: 'rateReduction',
      label: 'Rate Reduction (%)',
      type: 'percentage',
      explanation: 'Interest rate reduction from purchasing points'
    },
    {
      id: 'costPerBasisPoint',
      label: 'Cost Per Basis Point',
      type: 'currency',
      explanation: 'Cost for each 0.01% reduction in interest rate'
    },
    {
      id: 'returnOnInvestment',
      label: 'Return on Investment (%)',
      type: 'percentage',
      explanation: 'ROI from purchasing discount points'
    },
    {
      id: 'breakEvenAnalysis',
      label: 'Breakeven Analysis',
      type: 'text',
      explanation: 'Detailed breakeven analysis and projections'
    },
    {
      id: 'cashFlowImpact',
      label: 'Cash Flow Impact',
      type: 'text',
      explanation: 'Impact on monthly and annual cash flow'
    },
    {
      id: 'comparisonScenarios',
      label: 'Comparison Scenarios',
      type: 'text',
      explanation: 'Comparison of different points purchasing scenarios'
    },
    {
      id: 'recommendation',
      label: 'Recommendation',
      type: 'text',
      explanation: 'Recommendation on whether to purchase points'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Conventional Loan with 2 Points',
      description: 'Analysis of purchasing 2 discount points on a conventional loan',
      inputs: {
        loanAmount: 300000,
        baseInterestRate: 6.75,
        loanTerm: 30,
        discountPoints: 2,
        originationPoints: 0,
        lenderCredits: 0,
        expectedHoldingPeriod: 7,
        propertyAppreciationRate: 3,
        closingCosts: 6000,
        otherFees: 1000,
        currentMarketRate: 6.5,
        creditScore: 750,
        loanType: 'conventional',
        propertyValue: 400000,
        downPayment: 100000
      },
      expectedOutputs: {
        pointsCost: 6000,
        monthlySavings: 145,
        annualSavings: 1740,
        totalSavings: 12180,
        breakevenPeriod: 41,
        breakevenMonths: 41,
        netBenefit: 6180,
        effectiveRateWithPoints: 6.25,
        effectiveRateWithoutPoints: 6.75,
        rateReduction: 0.5,
        costPerBasisPoint: 300,
        returnOnInvestment: 103
      }
    },
    {
      title: 'FHA Loan Points Analysis',
      description: 'Points analysis for an FHA loan with lender credits',
      inputs: {
        loanAmount: 180000,
        baseInterestRate: 6.25,
        loanTerm: 30,
        discountPoints: 1,
        originationPoints: 0,
        lenderCredits: 1500,
        expectedHoldingPeriod: 5,
        propertyAppreciationRate: 4,
        closingCosts: 4500,
        otherFees: 800,
        currentMarketRate: 6.0,
        creditScore: 680,
        loanType: 'fha',
        propertyValue: 200000,
        downPayment: 20000
      },
      expectedOutputs: {
        pointsCost: 300, // 1800 - 1500 lender credits
        monthlySavings: 58,
        annualSavings: 696,
        totalSavings: 3480,
        breakevenPeriod: 5,
        breakevenMonths: 5,
        netBenefit: 3180,
        effectiveRateWithPoints: 6.0,
        effectiveRateWithoutPoints: 6.25,
        rateReduction: 0.25,
        costPerBasisPoint: 120,
        returnOnInvestment: 1060
      }
    }
  ]
};