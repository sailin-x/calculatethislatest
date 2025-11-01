import { Calculator } from '../../types/calculator';
import { DividendDiscountModelInputs, DividendDiscountModelOutputs } from './types';
import {
  calculateGordonGrowthModel,
  calculateTwoStageDDM,
  calculateDividendYield,
  generateAnalysis
} from './formulas';
import { validateDividendDiscountModelInputs } from './validation';

export const DividendDiscountModelCalculator: Calculator = {
  id: 'dividend-discount-model-calculator',
  title: 'Dividend Discount Model Calculator',
  category: 'finance',
  subcategory: 'Valuation',
  description: 'Calculate intrinsic value using Dividend Discount Model (DDM) with Gordon Growth and Two-Stage models.',
  usageInstructions: [
    'Enter the current annual dividend per share',
    'Specify the expected dividend growth rate',
    'Set the required rate of return (discount rate)',
    'Choose model type (Gordon Growth or Two-Stage)',
    'Review the calculated intrinsic value and analysis'
  ],

  inputs: [
    {
      id: 'currentDividend',
      label: 'Current Annual Dividend ($)',
      type: 'currency',
      required: true,
      min: 0.01,
      tooltip: 'Current annual dividend per share'
    },
    {
      id: 'expectedGrowthRate',
      label: 'Expected Growth Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Expected annual dividend growth rate'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      min: 0.1,
      max: 50,
      tooltip: 'Required rate of return (cost of equity)'
    },
    {
      id: 'numberOfYears',
      label: 'High Growth Years',
      type: 'number',
      required: false,
      min: 1,
      max: 20,
      tooltip: 'Years of high growth for two-stage model (optional)'
    }
  ],

  outputs: [
    {
      id: 'intrinsicValue',
      label: 'Intrinsic Value',
      type: 'currency',
      explanation: 'Fair value of the stock based on DDM'
    },
    {
      id: 'dividendYield',
      label: 'Dividend Yield',
      type: 'percentage',
      explanation: 'Annual dividend as percentage of intrinsic value'
    },
    {
      id: 'growthRate',
      label: 'Growth Rate',
      type: 'percentage',
      explanation: 'Expected dividend growth rate used in calculation'
    },
    {
      id: 'discountRate',
      label: 'Discount Rate',
      type: 'percentage',
      explanation: 'Required rate of return used in calculation'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Stable Dividend Stock',
      description: 'Calculate intrinsic value of a stock with $2 dividend, 3% growth, 8% discount rate',
      inputs: {
        currentDividend: 2.00,
        expectedGrowthRate: 3,
        discountRate: 8,
        numberOfYears: undefined
      },
      expectedOutputs: {
        intrinsicValue: 33.33,
        dividendYield: 6.00,
        growthRate: 3,
        discountRate: 8
      }
    },
    {
      title: 'Growth Stock',
      description: 'Calculate intrinsic value with $1 dividend, 8% growth, 12% discount rate',
      inputs: {
        currentDividend: 1.00,
        expectedGrowthRate: 8,
        discountRate: 12,
        numberOfYears: undefined
      },
      expectedOutputs: {
        intrinsicValue: 25.00,
        dividendYield: 4.00,
        growthRate: 8,
        discountRate: 12
      }
    }
  ]
};