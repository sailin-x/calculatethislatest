import { Calculator } from '../../types/calculator';
import { CorporateBondInputs, CorporateBondOutputs } from './types';
import { calculateCorporateBondMetrics } from './formulas';
import { validateCorporateBondInputs, validateCorporateBondBusinessRules } from './validation';

export const CorporateBondCalculator: Calculator = {
  id: 'CorporateBondCalculator',
  title: 'Corporate Bond Calculator',
  category: 'finance',
  subcategory: 'Fixed Income & Bonds',
  description: 'Comprehensive corporate bond analysis calculator with pricing, yield calculations, duration, convexity, credit risk assessment, and advanced metrics including option-adjusted spreads and scenario analysis.',
  usageInstructions: [
    'Enter bond face value and coupon details',
    'Input current market price and yield information',
    'Specify credit rating and risk parameters',
    'Review pricing metrics and risk analysis',
    'Analyze duration, convexity, and interest rate sensitivity',
    'Evaluate credit spreads and default risk',
    'Compare scenarios and stress test results'
  ],

  inputs: [
    {
      id: 'faceValue',
      label: 'Face Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Par value of the bond'
    },
    {
      id: 'couponRate',
      label: 'Coupon Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.125,
      tooltip: 'Annual coupon rate as percentage of face value'
    },
    {
      id: 'marketPrice',
      label: 'Market Price ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current market price of the bond'
    },
    {
      id: 'yearsToMaturity',
      label: 'Years to Maturity',
      type: 'number',
      required: true,
      min: 0.1,
      max: 100,
      step: 0.1,
      tooltip: 'Time remaining until bond matures'
    },
    {
      id: 'yieldToMaturity',
      label: 'Yield to Maturity (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      tooltip: 'Expected rate of return if held to maturity'
    },
    {
      id: 'couponFrequency',
      label: 'Coupon Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'Annual' },
        { value: 2, label: 'Semi-Annual' },
        { value: 4, label: 'Quarterly' },
        { value: 12, label: 'Monthly' }
      ],
      tooltip: 'Number of coupon payments per year'
    },
    {
      id: 'creditRating',
      label: 'Credit Rating',
      type: 'select',
      required: true,
      options: [
        { value: 'AAA', label: 'AAA' },
        { value: 'AA', label: 'AA' },
        { value: 'A', label: 'A' },
        { value: 'BBB', label: 'BBB' },
        { value: 'BB', label: 'BB' },
        { value: 'B', label: 'B' },
        { value: 'CCC', label: 'CCC' },
        { value: 'CC', label: 'CC' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' }
      ],
      tooltip: 'Credit rating assigned by rating agencies'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 100,
      defaultValue: 30,
      tooltip: 'Applicable tax rate for income tax calculations'
    },
    {
      id: 'marketRiskPremium',
      label: 'Market Risk Premium (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 6,
      tooltip: 'Expected market return minus risk-free rate'
    },
    {
      id: 'beta',
      label: 'Beta',
      type: 'number',
      required: false,
      min: -5,
      max: 5,
      step: 0.01,
      defaultValue: 1.0,
      tooltip: 'Measure of systematic risk relative to market'
    },
    {
      id: 'riskFreeRate',
      label: 'Risk-Free Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 20,
      defaultValue: 4.5,
      tooltip: 'Return on risk-free investment (e.g., Treasury bonds)'
    }
  ],

  outputs: [
    {
      id: 'currentYield',
      label: 'Current Yield',
      type: 'percentage',
      explanation: 'Annual coupon payment divided by current market price'
    },
    {
      id: 'yieldToMaturity',
      label: 'Yield to Maturity',
      type: 'percentage',
      explanation: 'Total return expected if bond is held to maturity'
    },
    {
      id: 'duration',
      label: 'Macaulay Duration',
      type: 'number',
      explanation: 'Weighted average time until cash flows are received'
    },
    {
      id: 'modifiedDuration',
      label: 'Modified Duration',
      type: 'number',
      explanation: 'Duration adjusted for yield changes'
    },
    {
      id: 'convexity',
      label: 'Convexity',
      type: 'number',
      explanation: 'Measure of curvature in price-yield relationship'
    },
    {
      id: 'bondPrice',
      label: 'Calculated Bond Price',
      type: 'currency',
      explanation: 'Theoretical price based on inputs'
    },
    {
      id: 'creditSpread',
      label: 'Credit Spread',
      type: 'percentage',
      explanation: 'Additional yield over risk-free rate for credit risk'
    },
    {
      id: 'afterTaxYield',
      label: 'After-Tax Yield',
      type: 'percentage',
      explanation: 'Yield after accounting for taxes'
    },
    {
      id: 'sharpeRatio',
      label: 'Sharpe Ratio',
      type: 'number',
      explanation: 'Risk-adjusted return measure'
    },
    {
      id: 'defaultProbability',
      label: 'Default Probability',
      type: 'percentage',
      explanation: 'Estimated probability of bond default'
    },
    {
      id: 'expectedLoss',
      label: 'Expected Loss',
      type: 'currency',
      explanation: 'Expected loss from default'
    },
    {
      id: 'investmentGrade',
      label: 'Investment Grade',
      type: 'boolean',
      explanation: 'Whether bond is investment grade (BBB- or higher)'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'percentage',
      explanation: 'Total percentage return over holding period'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return',
      type: 'percentage',
      explanation: 'Annualized rate of return'
    },
    {
      id: 'valueAtRisk',
      label: 'Value at Risk (95%)',
      type: 'currency',
      explanation: 'Potential loss over specified confidence interval'
    },
    {
      id: 'optionAdjustedSpread',
      label: 'Option-Adjusted Spread',
      type: 'percentage',
      explanation: 'Spread adjusted for embedded options'
    },
    {
      id: 'priceValueOfBasisPoint',
      label: 'PVBP',
      type: 'currency',
      explanation: 'Price change for 1 basis point yield change'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Investment Grade Corporate Bond',
      description: '10-year AAA-rated corporate bond with 5% coupon',
      inputs: {
        faceValue: 1000,
        couponRate: 5,
        marketPrice: 1050,
        yearsToMaturity: 10,
        yieldToMaturity: 4.5,
        couponFrequency: 2,
        creditRating: 'AAA',
        taxRate: 30,
        marketRiskPremium: 6,
        beta: 0.8,
        riskFreeRate: 4.0
      },
      expectedOutputs: {
        currentYield: 4.76,
        yieldToMaturity: 4.5,
        duration: 8.5,
        modifiedDuration: 8.2,
        convexity: 85,
        bondPrice: 1050,
        creditSpread: 0.5,
        afterTaxYield: 3.15,
        sharpeRatio: 1.2,
        defaultProbability: 0.001,
        expectedLoss: 0.4,
        investmentGrade: true,
        totalReturn: 5.2,
        annualizedReturn: 4.8,
        valueAtRisk: -45,
        optionAdjustedSpread: 0.45,
        priceValueOfBasisPoint: 8.2
      }
    },
    {
      title: 'High-Yield Bond',
      description: '7-year BB-rated bond with 8% coupon trading at discount',
      inputs: {
        faceValue: 1000,
        couponRate: 8,
        marketPrice: 920,
        yearsToMaturity: 7,
        yieldToMaturity: 9.5,
        couponFrequency: 2,
        creditRating: 'BB',
        taxRate: 30,
        marketRiskPremium: 6,
        beta: 1.2,
        riskFreeRate: 4.0
      },
      expectedOutputs: {
        currentYield: 8.7,
        yieldToMaturity: 9.5,
        duration: 6.2,
        modifiedDuration: 6.0,
        convexity: 45,
        bondPrice: 920,
        creditSpread: 5.5,
        afterTaxYield: 6.65,
        sharpeRatio: 0.8,
        defaultProbability: 0.06,
        expectedLoss: 28.8,
        investmentGrade: false,
        totalReturn: 12.3,
        annualizedReturn: 9.8,
        valueAtRisk: -85,
        optionAdjustedSpread: 5.2,
        priceValueOfBasisPoint: 5.5
      }
    },
    {
      title: 'Zero-Coupon Bond',
      description: '20-year zero-coupon bond trading at deep discount',
      inputs: {
        faceValue: 1000,
        couponRate: 0,
        marketPrice: 350,
        yearsToMaturity: 20,
        yieldToMaturity: 6.5,
        couponFrequency: 1,
        creditRating: 'A',
        taxRate: 30,
        marketRiskPremium: 6,
        beta: 0.9,
        riskFreeRate: 4.0
      },
      expectedOutputs: {
        currentYield: 0,
        yieldToMaturity: 6.5,
        duration: 20,
        modifiedDuration: 18.9,
        convexity: 600,
        bondPrice: 350,
        creditSpread: 2.5,
        afterTaxYield: 4.55,
        sharpeRatio: 1.5,
        defaultProbability: 0.01,
        expectedLoss: 6.5,
        investmentGrade: true,
        totalReturn: 185.7,
        annualizedReturn: 6.5,
        valueAtRisk: -120,
        optionAdjustedSpread: 2.3,
        priceValueOfBasisPoint: 6.6
      }
    }
  ]
};