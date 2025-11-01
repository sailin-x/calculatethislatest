import { Calculator } from '../../../types/calculator';
import { BondYieldInputs, BondYieldOutputs } from './types';
import {
  calculateYieldToMaturity,
  calculateCurrentYield,
  calculateTotalReturn,
  calculateAverageAnnualReturn,
  calculateMacaulayDuration,
  calculateModifiedDuration,
  calculateConvexity
} from './formulas';
import { validateBondYieldInputs, validateBondYieldBusinessRules } from './validation';

export const BondYieldCalculator: Calculator = {
  id: 'BondYieldCalculator',
  title: 'Bond Yield Calculator',
  category: 'finance',
  subcategory: 'Fixed Income Analysis',
  description: 'Calculate various bond yield measures including YTM, current yield, duration, and convexity. Essential for fixed income investment analysis.',
  usageInstructions: [
    'Enter the bond\'s face value',
    'Input the annual coupon rate as a percentage',
    'Specify years remaining to maturity',
    'Enter the current market price',
    'Select coupon payment frequency',
    'Optionally provide settlement and maturity dates',
    'Review comprehensive yield and risk metrics'
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
      id: 'currentPrice',
      label: 'Current Price ($)',
      type: 'currency',
      required: true,
      min: 0.01,
      max: 20000,
      step: 0.01,
      defaultValue: 1000,
      tooltip: 'Current market price of the bond'
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
      defaultValue: '2',
      tooltip: 'Number of coupon payments per year'
    },
    {
      id: 'settlementDate',
      label: 'Settlement Date',
      type: 'date',
      required: false,
      tooltip: 'Date of settlement (optional, for precise calculations)'
    },
    {
      id: 'maturityDate',
      label: 'Maturity Date',
      type: 'date',
      required: false,
      tooltip: 'Bond maturity date (optional, for precise calculations)'
    }
  ],

  outputs: [
    {
      id: 'yieldToMaturity',
      label: 'Yield to Maturity (YTM) (%)',
      type: 'percentage',
      explanation: 'Internal rate of return if bond held to maturity'
    },
    {
      id: 'currentYield',
      label: 'Current Yield (%)',
      type: 'percentage',
      explanation: 'Annual coupon payment divided by current price'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'number',
      explanation: 'Total return if held to maturity'
    },
    {
      id: 'averageAnnualReturn',
      label: 'Average Annual Return (%)',
      type: 'percentage',
      explanation: 'Compound annual growth rate to maturity'
    },
    {
      id: 'macaulayDuration',
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
      id: 'convexity',
      label: 'Convexity',
      type: 'number',
      explanation: 'Measure of price sensitivity to yield changes'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '10-Year Treasury Bond at Par',
      description: 'Standard government bond trading at face value',
      inputs: {
        faceValue: 1000,
        couponRate: 4.5,
        yearsToMaturity: 10,
        currentPrice: 1000,
        couponFrequency: 2
      },
      expectedOutputs: {
        yieldToMaturity: 4.5,
        currentYield: 4.5,
        totalReturn: 0.553,
        averageAnnualReturn: 4.5,
        macaulayDuration: 8.5,
        modifiedDuration: 8.1,
        convexity: 85.2
      }
    },
    {
      title: 'Corporate Bond at Premium',
      description: 'Investment grade corporate bond trading above par',
      inputs: {
        faceValue: 1000,
        couponRate: 6.0,
        yearsToMaturity: 7,
        currentPrice: 1050,
        couponFrequency: 2
      },
      expectedOutputs: {
        yieldToMaturity: 5.2,
        currentYield: 5.7,
        totalReturn: 0.454,
        averageAnnualReturn: 5.7,
        macaulayDuration: 6.2,
        modifiedDuration: 5.9,
        convexity: 52.3
      }
    },
    {
      title: 'High-Yield Bond at Discount',
      description: 'Below investment grade bond trading below par',
      inputs: {
        faceValue: 1000,
        couponRate: 8.0,
        yearsToMaturity: 5,
        currentPrice: 850,
        couponFrequency: 2
      },
      expectedOutputs: {
        yieldToMaturity: 12.1,
        currentYield: 9.4,
        totalReturn: 0.829,
        averageAnnualReturn: 12.1,
        macaulayDuration: 4.1,
        modifiedDuration: 3.8,
        convexity: 21.5
      }
    }
  ]
};