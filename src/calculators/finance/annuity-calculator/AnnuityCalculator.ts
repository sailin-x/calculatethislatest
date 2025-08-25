import { Calculator } from '../../../types/calculator';
import { annuityCalculatorFormula } from './formulas';
import { AnnuityCalculatorInputs, AnnuityCalculatorResults } from './types';

/**
 * Advanced Annuity Calculator
 * 
 * Features:
 * - Multiple annuity types (immediate, deferred, fixed, variable)
 * - Tax and inflation considerations
 * - Monte Carlo risk analysis
 * - Comparison with alternative investments
 * - Comprehensive payment schedules
 * - Professional-grade calculations
 */
export const annuityCalculator: Calculator = {
  id: 'annuity-calculator',
  title: 'Annuity Calculator',
  description: 'Comprehensive annuity calculations including immediate, deferred, fixed, and variable annuities with tax and inflation considerations',
  category: 'finance',
  subcategory: 'retirement',
  tags: ['annuity', 'retirement', 'financial-planning', 'insurance', 'income-stream', 'pension'],
  
  // Input fields
  inputs: [
    {
      id: 'annuityType',
      label: 'Annuity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'immediate', label: 'Immediate Annuity' },
        { value: 'deferred', label: 'Deferred Annuity' },
        { value: 'fixed', label: 'Fixed Annuity' },
        { value: 'variable', label: 'Variable Annuity' }
      ],
      defaultValue: 'immediate',
      description: 'Type of annuity to calculate'
    },
    {
      id: 'paymentType',
      label: 'Payment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single-premium', label: 'Single Premium' },
        { value: 'flexible-premium', label: 'Flexible Premium' }
      ],
      defaultValue: 'single-premium',
      description: 'Payment structure for the annuity'
    },
    {
      id: 'principal',
      label: 'Principal Amount',
      type: 'number',
      required: true,
      min: 1000,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      description: 'Initial investment amount'
    },
    {
      id: 'annualRate',
      label: 'Annual Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '5.5',
      description: 'Annual interest rate for the annuity'
    },
    {
      id: 'term',
      label: 'Annuity Term (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      step: 1,
      placeholder: '20',
      description: 'Duration of the annuity'
    },
    {
      id: 'paymentFrequency',
      label: 'Payment Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'Annually' },
        { value: 2, label: 'Semi-annually' },
        { value: 4, label: 'Quarterly' },
        { value: 12, label: 'Monthly' },
        { value: 52, label: 'Weekly' }
      ],
      defaultValue: 12,
      description: 'How often payments are made'
    },
    {
      id: 'paymentMode',
      label: 'Payment Mode',
      type: 'select',
      required: true,
      options: [
        { value: 'receive', label: 'Receive Payments' },
        { value: 'pay', label: 'Make Payments' }
      ],
      defaultValue: 'receive',
      description: 'Whether you receive or make payments'
    },
    {
      id: 'deferralPeriod',
      label: 'Deferral Period (Years)',
      type: 'number',
      required: false,
      min: 0,
      max: 30,
      step: 1,
      placeholder: '10',
      description: 'Years before payments begin (for deferred annuities)',
      dependsOn: 'annuityType'
    },
    {
      id: 'accumulationRate',
      label: 'Accumulation Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 20,
      step: 0.1,
      placeholder: '6.0',
      description: 'Interest rate during accumulation phase',
      dependsOn: 'annuityType'
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return (%)',
      type: 'number',
      required: false,
      min: -50,
      max: 50,
      step: 0.1,
      placeholder: '8.0',
      description: 'Expected annual return for variable annuities',
      dependsOn: 'annuityType'
    },
    {
      id: 'volatility',
      label: 'Volatility (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '15.0',
      description: 'Expected volatility for variable annuities',
      dependsOn: 'annuityType'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '25',
      description: 'Effective tax rate on annuity gains'
    },
    {
      id: 'includeTaxes',
      label: 'Include Tax Analysis',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Calculate after-tax returns'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'number',
      required: true,
      min: -20,
      max: 50,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation Analysis',
      type: 'checkbox',
      required: false,
      defaultValue: true,
      description: 'Calculate inflation-adjusted returns'
    },
    {
      id: 'includeDeathBenefit',
      label: 'Include Death Benefit',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include death benefit calculations'
    },
    {
      id: 'deathBenefitAmount',
      label: 'Death Benefit Amount',
      type: 'number',
      required: false,
      min: 0,
      max: 10000000,
      step: 1000,
      placeholder: '100000',
      description: 'Death benefit amount',
      dependsOn: 'includeDeathBenefit'
    },
    {
      id: 'includeSurrenderCharges',
      label: 'Include Surrender Charges',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Include surrender charge calculations'
    },
    {
      id: 'monteCarloSamples',
      label: 'Monte Carlo Samples',
      type: 'number',
      required: false,
      min: 1000,
      max: 100000,
      step: 1000,
      placeholder: '10000',
      description: 'Number of Monte Carlo simulation samples'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level (%)',
      type: 'number',
      required: false,
      min: 50,
      max: 99,
      step: 1,
      placeholder: '90',
      description: 'Confidence level for risk analysis'
    }
  ],

  // Output fields
  outputs: [
    {
      id: 'basicCalculation',
      label: 'Basic Calculation',
      type: 'object',
      fields: [
        { id: 'presentValue', label: 'Present Value', type: 'currency' },
        { id: 'futureValue', label: 'Future Value', type: 'currency' },
        { id: 'totalPayments', label: 'Total Payments', type: 'currency' },
        { id: 'totalInterest', label: 'Total Interest', type: 'currency' },
        { id: 'effectiveRate', label: 'Effective Rate', type: 'percentage' }
      ]
    },
    {
      id: 'paymentAnalysis',
      label: 'Payment Analysis',
      type: 'object',
      fields: [
        { id: 'periodicPayment', label: 'Periodic Payment', type: 'currency' },
        { id: 'totalPayments', label: 'Total Payments', type: 'currency' },
        { id: 'interestEarned', label: 'Interest Earned', type: 'currency' },
        { id: 'principalReturned', label: 'Principal Returned', type: 'currency' }
      ]
    },
    {
      id: 'deferredResults',
      label: 'Deferred Results',
      type: 'object',
      fields: [
        { id: 'accumulationValue', label: 'Accumulation Value', type: 'currency' },
        { id: 'payoutValue', label: 'Payout Value', type: 'currency' },
        { id: 'totalAccumulation', label: 'Total Accumulation', type: 'currency' },
        { id: 'totalPayout', label: 'Total Payout', type: 'currency' },
        { id: 'effectiveRate', label: 'Effective Rate', type: 'percentage' }
      ]
    },
    {
      id: 'variableResults',
      label: 'Variable Results',
      type: 'object',
      fields: [
        { id: 'expectedValue', label: 'Expected Value', type: 'currency' },
        { id: 'worstCase', label: 'Worst Case', type: 'currency' },
        { id: 'bestCase', label: 'Best Case', type: 'currency' },
        { id: 'probabilityOfLoss', label: 'Probability of Loss', type: 'percentage' },
        { id: 'volatilityImpact', label: 'Volatility Impact', type: 'currency' }
      ]
    },
    {
      id: 'taxAnalysis',
      label: 'Tax Analysis',
      type: 'object',
      fields: [
        { id: 'afterTaxValue', label: 'After-Tax Value', type: 'currency' },
        { id: 'taxPaid', label: 'Tax Paid', type: 'currency' },
        { id: 'effectiveAfterTaxRate', label: 'Effective After-Tax Rate', type: 'percentage' },
        { id: 'taxDeferredGrowth', label: 'Tax-Deferred Growth', type: 'currency' }
      ]
    },
    {
      id: 'inflationAnalysis',
      label: 'Inflation Analysis',
      type: 'object',
      fields: [
        { id: 'realValue', label: 'Real Value', type: 'currency' },
        { id: 'purchasingPower', label: 'Purchasing Power', type: 'percentage' },
        { id: 'inflationAdjustedRate', label: 'Inflation-Adjusted Rate', type: 'percentage' },
        { id: 'realReturn', label: 'Real Return', type: 'percentage' }
      ]
    },
    {
      id: 'riskAnalysis',
      label: 'Risk Analysis',
      type: 'object',
      fields: [
        { id: 'probabilityOfSuccess', label: 'Probability of Success', type: 'percentage' },
        { id: 'worstCaseScenario', label: 'Worst Case Scenario', type: 'currency' },
        { id: 'bestCaseScenario', label: 'Best Case Scenario', type: 'currency' },
        { id: 'medianScenario', label: 'Median Scenario', type: 'currency' },
        { id: 'valueAtRisk', label: 'Value at Risk', type: 'currency' }
      ]
    },
    {
      id: 'comparison',
      label: 'Comparison Analysis',
      type: 'object',
      fields: [
        { id: 'vsLumpSum', label: 'vs Lump Sum', type: 'currency' },
        { id: 'vsBondInvestment', label: 'vs Bond Investment', type: 'currency' },
        { id: 'vsStockInvestment', label: 'vs Stock Investment', type: 'currency' },
        { id: 'breakevenPeriod', label: 'Breakeven Period', type: 'number' }
      ]
    },
    {
      id: 'summary',
      label: 'Summary',
      type: 'object',
      fields: [
        { id: 'totalValue', label: 'Total Value', type: 'currency' },
        { id: 'totalCost', label: 'Total Cost', type: 'currency' },
        { id: 'netBenefit', label: 'Net Benefit', type: 'currency' },
        { id: 'annualizedReturn', label: 'Annualized Return', type: 'percentage' },
        { id: 'keyRecommendations', label: 'Key Recommendations', type: 'array' }
      ]
    }
  ],

  // Calculator functions
  calculate: annuityCalculatorFormula.calculate,

  // Examples
  examples: [
    {
      title: 'Immediate Fixed Annuity',
      description: 'Basic immediate annuity calculation',
      inputs: {
        annuityType: 'immediate',
        paymentType: 'single-premium',
        principal: 100000,
        annualRate: 5.5,
        term: 20,
        paymentFrequency: 12,
        paymentMode: 'receive',
        taxRate: 25,
        inflationRate: 2.5
      }
    },
    {
      title: 'Deferred Variable Annuity',
      description: 'Deferred annuity with variable returns',
      inputs: {
        annuityType: 'deferred',
        paymentType: 'single-premium',
        principal: 100000,
        annualRate: 6.0,
        term: 15,
        paymentFrequency: 12,
        paymentMode: 'receive',
        deferralPeriod: 10,
        accumulationRate: 7.0,
        expectedReturn: 8.0,
        volatility: 15.0,
        taxRate: 22,
        inflationRate: 2.5
      }
    },
    {
      title: 'Variable Annuity with Risk Analysis',
      description: 'Variable annuity with comprehensive risk analysis',
      inputs: {
        annuityType: 'variable',
        paymentType: 'single-premium',
        principal: 200000,
        annualRate: 6.5,
        term: 25,
        paymentFrequency: 12,
        paymentMode: 'receive',
        expectedReturn: 9.0,
        volatility: 18.0,
        taxRate: 24,
        inflationRate: 2.5,
        monteCarloSamples: 15000,
        confidenceLevel: 95
      }
    }
  ],

  // Usage instructions
  usageInstructions: [
    'Select the type of annuity you want to calculate',
    'Enter the principal amount and interest rate',
    'Set the annuity term and payment frequency',
    'Choose whether you receive or make payments',
    'For deferred annuities, specify the deferral period',
    'For variable annuities, set expected return and volatility',
    'Include tax and inflation considerations',
    'Enable advanced options for detailed analysis',
    'Review comprehensive results and recommendations'
  ],

  // Tips and insights
  tips: [
    'Immediate annuities provide income right away',
    'Deferred annuities allow for tax-deferred growth',
    'Variable annuities offer higher potential returns but more risk',
    'Consider surrender charges when evaluating liquidity',
    'Tax-deferred growth can significantly boost long-term returns',
    'Inflation can erode the purchasing power of fixed payments',
    'Compare annuities with other retirement income options',
    'Consider your life expectancy when choosing annuity terms'
  ],

  // Related calculators
  relatedCalculators: [
    'retirement-calculator',
    'compound-interest-calculator',
    'life-insurance-calculator',
    'pension-calculator',
    'social-security-calculator'
  ]
};
