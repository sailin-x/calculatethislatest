import { Calculator } from '../../../types/calculator';
import { calculateCAGR } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const compoundAnnualGrowthRateCalculator: Calculator = {
  id: 'compound-annual-growth-rate-calculator',
  title: 'Compound Annual Growth Rate (CAGR) Calculator',
  category: 'finance',
  subcategory: 'Investment & Portfolio',
  description: 'Calculate the compound annual growth rate (CAGR) of an investment, including real returns, after-tax returns, and risk-adjusted performance metrics.',

  usageInstructions: [
    'Enter beginning and ending values',
    'Specify the number of periods and period type',
    'Include dividends and adjust for inflation',
    'Review CAGR, real returns, and performance metrics'
  ],

  inputs: [
    {
      id: 'beginningValue',
      label: 'Beginning Value',
      type: 'currency',
      required: true,
      placeholder: '10000',
      tooltip: 'Initial investment value',
      defaultValue: 10000,
      min: 0.01,
      max: 100000000
    },
    {
      id: 'endingValue',
      label: 'Ending Value',
      type: 'currency',
      required: true,
      placeholder: '15000',
      tooltip: 'Final investment value',
      defaultValue: 15000,
      min: 0,
      max: 100000000
    },
    {
      id: 'numberOfPeriods',
      label: 'Number of Periods',
      type: 'number',
      required: true,
      placeholder: '5',
      tooltip: 'Number of periods the investment was held',
      defaultValue: 5,
      min: 1,
      max: 100
    },
    {
      id: 'periodType',
      label: 'Period Type',
      type: 'select',
      required: true,
      options: [
        { value: 'years', label: 'Years' },
        { value: 'months', label: 'Months' },
        { value: 'days', label: 'Days' }
      ],
      tooltip: 'Type of time period',
      defaultValue: 'years'
    },
    {
      id: 'includeDividends',
      label: 'Include Dividends',
      type: 'boolean',
      required: false,
      tooltip: 'Include dividend payments in calculation',
      defaultValue: false
    },
    {
      id: 'dividendAmount',
      label: 'Annual Dividend Amount',
      type: 'currency',
      required: false,
      placeholder: '200',
      tooltip: 'Annual dividend per period',
      defaultValue: 200,
      min: 0,
      max: 100000
    },
    {
      id: 'frequency',
      label: 'Compounding Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi-annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often returns are compounded',
      defaultValue: 'annual'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Annual inflation rate',
      defaultValue: 2.5,
      min: -10,
      max: 20,
      step: 0.1
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '25',
      tooltip: 'Applicable tax rate on returns',
      defaultValue: 25,
      min: 0,
      max: 100,
      step: 1
    }
  ],

  outputs: [
    {
      id: 'cagr',
      label: 'Compound Annual Growth Rate (CAGR)',
      type: 'percentage',
      explanation: 'The rate of return that would be required for an investment to grow from beginning to ending value'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'percentage',
      explanation: 'Total percentage return over the entire period'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return',
      type: 'percentage',
      explanation: 'Average annual return'
    },
    {
      id: 'realReturn',
      label: 'Real Return (Inflation-Adjusted)',
      type: 'percentage',
      explanation: 'Return adjusted for inflation'
    },
    {
      id: 'afterTaxReturn',
      label: 'After-Tax Return',
      type: 'percentage',
      explanation: 'Return after accounting for taxes'
    },
    {
      id: 'volatilityEstimate',
      label: 'Volatility Estimate',
      type: 'percentage',
      explanation: 'Estimated volatility of returns'
    },
    {
      id: 'riskAdjustedReturn',
      label: 'Risk-Adjusted Return',
      type: 'number',
      explanation: 'Return per unit of risk'
    },
    {
      id: 'compoundFrequency',
      label: 'Compounding Frequency',
      type: 'text',
      explanation: 'How often returns are compounded'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('beginningValue', 'Beginning value is required'),
    ValidationRuleFactory.required('endingValue', 'Ending value is required'),
    ValidationRuleFactory.required('numberOfPeriods', 'Number of periods is required'),
    ValidationRuleFactory.required('periodType', 'Period type is required'),
    ValidationRuleFactory.range('beginningValue', 0.01, 100000000, 'Beginning value must be between $0.01 and $100,000,000'),
    ValidationRuleFactory.range('endingValue', 0, 100000000, 'Ending value must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('numberOfPeriods', 1, 100, 'Number of periods must be between 1 and 100'),
    ValidationRuleFactory.range('dividendAmount', 0, 100000, 'Dividend amount must be between $0 and $100,000'),
    ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
    ValidationRuleFactory.range('taxRate', 0, 100, 'Tax rate must be between 0% and 100%'),
    ValidationRuleFactory.businessRule(
      'endingValue',
      (endingValue, allInputs) => {
        if (!allInputs?.beginningValue) return true;
        return endingValue >= 0; // Allow losses
      },
      'Ending value validation'
    ),
    ValidationRuleFactory.businessRule(
      'dividendAmount',
      (dividendAmount, allInputs) => {
        if (!allInputs?.includeDividends) return true;
        return dividendAmount >= 0;
      },
      'Dividend amount should be included when dividends are enabled'
    )
  ],

  examples: [
    {
      title: 'Stock Investment Growth',
      description: 'Calculate CAGR for a stock investment over 5 years',
      inputs: {
        beginningValue: 10000,
        endingValue: 15000,
        numberOfPeriods: 5,
        periodType: 'years',
        includeDividends: true,
        dividendAmount: 200,
        frequency: 'annual',
        inflationRate: 2.5,
        taxRate: 25
      },
      expectedOutputs: {
        cagr: 8.45,
        totalReturn: 70,
        annualizedReturn: 8.45,
        realReturn: 5.76,
        afterTaxReturn: 6.34,
        volatilityEstimate: 2.54,
        riskAdjustedReturn: 3.33,
        compoundFrequency: 'Annually'
      }
    },
    {
      title: 'Real Estate Investment',
      description: 'Calculate CAGR for real estate investment over 10 years',
      inputs: {
        beginningValue: 200000,
        endingValue: 350000,
        numberOfPeriods: 10,
        periodType: 'years',
        includeDividends: false,
        dividendAmount: 0,
        frequency: 'annual',
        inflationRate: 3,
        taxRate: 30
      },
      expectedOutputs: {
        cagr: 5.67,
        totalReturn: 75,
        annualizedReturn: 5.67,
        realReturn: 2.59,
        afterTaxReturn: 3.97,
        volatilityEstimate: 1.7,
        riskAdjustedReturn: 3.34,
        compoundFrequency: 'Annually'
      }
    }
  ]
};