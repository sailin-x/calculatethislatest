import { Calculator } from '../../../types/calculator';
import { FinancialAchievementCalculatorInputs, FinancialAchievementCalculatorOutputs } from './types';
import {
  calculateTotalAmount,
  calculateTotalInterest,
  calculateMonthlyPayment,
  calculateEffectiveRate,
  generateAnalysis
} from './formulas';
import { validateFinancialAchievementCalculatorInputs } from './validation';

export const FinancialAchievementCalculator: Calculator = {
  id: 'financial-achievement-calculator',
  title: 'Financial Achievement Calculator',
  category: 'finance',
  subcategory: 'Financial Planning',
  description: 'Calculate financial achievement metrics.',
  usageInstructions: [
    'Enter the principal amount to invest',
    'Specify the expected interest rate',
    'Set the time period in years',
    'Choose compounding frequency',
    'Review the calculated returns and analysis'
  ],

  inputs: [
    {
      id: 'principalAmount',
      label: 'Principal Amount ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Initial investment amount'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Annual interest rate'
    },
    {
      id: 'timePeriod',
      label: 'Time Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Investment duration in years'
    },
    {
      id: 'compoundingFrequency',
      label: 'Compounding Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'Annually' },
        { value: 2, label: 'Semi-Annually' },
        { value: 4, label: 'Quarterly' },
        { value: 12, label: 'Monthly' },
        { value: 365, label: 'Daily' }
      ],
      tooltip: 'How often interest is compounded'
    }
  ],

  outputs: [
    {
      id: 'totalAmount',
      label: 'Total Amount',
      type: 'currency',
      explanation: 'Final amount including principal and interest'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest',
      type: 'currency',
      explanation: 'Total interest earned'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Monthly equivalent payment'
    },
    {
      id: 'effectiveRate',
      label: 'Effective Annual Rate',
      type: 'percentage',
      explanation: 'Effective annual interest rate'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Long-term Investment Growth',
      description: 'Calculate growth of $10,000 investment over 20 years at 7% interest',
      inputs: {
        principalAmount: 10000,
        interestRate: 7,
        timePeriod: 20,
        compoundingFrequency: 12
      },
      expectedOutputs: {
        totalAmount: 38715,
        totalInterest: 28715,
        monthlyPayment: 161,
        effectiveRate: 7.23
      }
    },
    {
      title: 'Short-term Savings',
      description: 'Calculate growth of $5,000 savings over 3 years at 3% interest',
      inputs: {
        principalAmount: 5000,
        interestRate: 3,
        timePeriod: 3,
        compoundingFrequency: 4
      },
      expectedOutputs: {
        totalAmount: 5460,
        totalInterest: 460,
        monthlyPayment: 152,
        effectiveRate: 3.03
      }
    }
  ]
};
