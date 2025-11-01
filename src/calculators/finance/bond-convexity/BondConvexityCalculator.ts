import { Calculator } from '../../../types/calculator';
import { BondConvexityInputs, BondConvexityOutputs } from './types';
import {
  calculateConvexity,
  calculateModifiedConvexity,
  calculateEffectiveConvexity,
  calculateDuration,
  calculateModifiedDuration,
  calculatePriceChange,
  calculatePercentagePriceChange,
  calculateConvexityAdjustment
} from './formulas';
import { validateBondConvexityInputs, validateBondConvexityBusinessRules } from './validation';

export const BondConvexityCalculator: Calculator = {
  id: 'BondConvexityCalculator',
  title: 'Bond Convexity Calculator',
  category: 'finance',
  subcategory: 'Fixed Income Analysis',
  description: 'Calculate bond convexity, duration, and interest rate risk measures. Includes modified convexity and price sensitivity analysis.',
  usageInstructions: [
    'Enter the bond\'s face value',
    'Input the annual coupon rate as a percentage',
    'Specify years remaining to maturity',
    'Enter the current yield to maturity',
    'Select coupon payment frequency',
    'Optionally provide current market price',
    'Review convexity and duration metrics'
  ],

  inputs: [
    {
      id: 'faceValue',
      label: 'Face Value ($)',
      type: 'currency',
      required: true,
      min: 1,
      max: 10000000,
      step: 1,
      defaultValue: 1000,
      tooltip: 'The bond\'s face or par value'
    },
    {
      id: 'couponRate',
      label: 'Coupon Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      step: 0.01,
      defaultValue: 5.0,
      tooltip: 'Annual coupon rate as a percentage of face value'
    },
    {
      id: 'yearsToMaturity',
      label: 'Years to Maturity',
      type: 'number',
      required: true,
      min: 0.1,
      max: 100,
      step: 0.1,
      defaultValue: 10,
      tooltip: 'Years remaining until the bond matures'
    },
    {
      id: 'yieldToMaturity',
      label: 'Yield to Maturity (%)',
      type: 'percentage',
      required: true,
      min: 0.01,
      max: 50,
      step: 0.01,
      defaultValue: 4.5,
      tooltip: 'Current market yield to maturity'
    },
    {
      id: 'couponFrequency',
      label: 'Coupon Frequency',
      type: 'select',
      required: true,
      options: [
        { value: '1', label: 'Annual' },
        { value: '2', label: 'Semi-Annual' },
        { value: '4', label: 'Quarterly' },
        { value: '12', label: 'Monthly' }
      ],
      defaultValue: 2,
      tooltip: 'Number of coupon payments per year'
    },
    {
      id: 'currentPrice',
      label: 'Current Price ($)',
      type: 'currency',
      required: false,
      min: 0.01,
      max: 20000,
      step: 0.01,
      tooltip: 'Current market price (optional, will be calculated if not provided)'
    }
  ],

  outputs: [
    {
      id: 'convexity',
      label: 'Convexity',
      type: 'number',
      explanation: 'Measure of the curvature of the price-yield relationship'
    },
    {
      id: 'modifiedConvexity',
      label: 'Modified Convexity',
      type: 'number',
      explanation: 'Convexity adjusted for yield compounding frequency'
    },
    {
      id: 'effectiveConvexity',
      label: 'Effective Convexity',
      type: 'number',
      explanation: 'Convexity accounting for embedded options'
    },
    {
      id: 'duration',
      label: 'Macaulay Duration',
      type: 'number',
      explanation: 'Weighted average time to receive cash flows'
    },
    {
      id: 'modifiedDuration',
      label: 'Modified Duration',
      type: 'number',
      explanation: 'Duration adjusted for yield compounding'
    },
    {
      id: 'priceChange',
      label: 'Price Change ($)',
      type: 'currency',
      explanation: 'Estimated price change for 1% yield change'
    },
    {
      id: 'percentagePriceChange',
      label: 'Price Change (%)',
      type: 'percentage',
      explanation: 'Percentage price change for 1% yield increase'
    },
    {
      id: 'convexityAdjustment',
      label: 'Convexity Adjustment ($)',
      type: 'currency',
      explanation: 'Additional price change due to convexity'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '10-Year Treasury Bond',
      description: 'Convexity analysis for a standard 10-year government bond',
      inputs: {
        faceValue: 1000,
        couponRate: 4.5,
        yearsToMaturity: 10,
        yieldToMaturity: 4.5,
        couponFrequency: 2,
        currentPrice: 1000
      },
      expectedOutputs: {
        convexity: 85.2,
        modifiedConvexity: 81.1,
        effectiveConvexity: 85.2,
        duration: 8.5,
        modifiedDuration: 8.1,
        priceChange: -81.0,
        percentagePriceChange: -8.1,
        convexityAdjustment: 4.25
      }
    },
    {
      title: 'Corporate Bond with Higher Yield',
      description: 'Analysis of a corporate bond trading at a premium',
      inputs: {
        faceValue: 1000,
        couponRate: 6.0,
        yearsToMaturity: 7,
        yieldToMaturity: 5.0,
        couponFrequency: 2,
        currentPrice: 1050
      },
      expectedOutputs: {
        convexity: 52.3,
        modifiedConvexity: 49.8,
        effectiveConvexity: 52.3,
        duration: 6.2,
        modifiedDuration: 5.9,
        priceChange: -61.8,
        percentagePriceChange: -5.9,
        convexityAdjustment: 2.75
      }
    }
  ]
};