import { Calculator, CalculationResult } from '../../types/calculator';
import { CAGRInputs, CAGROutputs } from './types';
import { calculateCAGRResult } from './formulas';
import { validateCAGRInputs, validateCAGRBusinessRules } from './validation';

export const CompoundAnnualGrowthRateCalculator: Calculator = {
  id: 'CompoundAnnualGrowthRateCalculator',
  title: 'Compound Annual Growth Rate (CAGR) Calculator',
  category: 'finance',
  subcategory: 'Investment Analysis',
  description: 'Calculate the compound annual growth rate of an investment over a specified time period, including real returns after inflation and after-tax returns.',
  usageInstructions: [
    'Enter initial and final investment values',
    'Specify the time period and unit (years, months, or days)',
    'Optionally include inflation rate for real returns',
    'Optionally include tax rate for after-tax calculations',
    'Review CAGR, total return, and annualized performance metrics'
  ],

  inputs: [
    {
      id: 'initialValue',
      label: 'Initial Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Starting value of the investment'
    },
    {
      id: 'finalValue',
      label: 'Final Value ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Ending value of the investment'
    },
    {
      id: 'timePeriod',
      label: 'Time Period',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Length of the investment period'
    },
    {
      id: 'timePeriodUnit',
      label: 'Time Period Unit',
      type: 'select',
      required: true,
      options: [
        { value: 'years', label: 'Years' },
        { value: 'months', label: 'Months' },
        { value: 'days', label: 'Days' }
      ],
      tooltip: 'Unit of time for the period'
    },
    {
      id: 'compoundingFrequency',
      label: 'Compounding Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi-annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'daily', label: 'Daily' }
      ],
      tooltip: 'How often returns are compounded'
    },
    {
      id: 'additionalContributions',
      label: 'Additional Contributions ($)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Regular contributions made during the period'
    },
    {
      id: 'contributionFrequency',
      label: 'Contribution Frequency',
      type: 'select',
      required: false,
      options: [
        { value: 'annual', label: 'Annual' },
        { value: 'semi-annual', label: 'Semi-Annual' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'monthly', label: 'Monthly' }
      ],
      tooltip: 'How often additional contributions are made'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      min: -0.1,
      max: 0.5,
      step: 0.01,
      tooltip: 'Annual inflation rate for real return calculations'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 1,
      step: 0.01,
      tooltip: 'Capital gains tax rate'
    }
  ],

  outputs: [
    {
      id: 'cagr',
      label: 'CAGR',
      type: 'percentage',
      explanation: 'Compound Annual Growth Rate'
    },
    {
      id: 'totalReturn',
      label: 'Total Return',
      type: 'currency',
      explanation: 'Total dollar return over the period'
    },
    {
      id: 'totalReturnPercentage',
      label: 'Total Return Percentage',
      type: 'percentage',
      explanation: 'Total percentage return over the period'
    },
    {
      id: 'annualizedReturn',
      label: 'Annualized Return',
      type: 'percentage',
      explanation: 'Average annual return'
    },
    {
      id: 'realCAGR',
      label: 'Real CAGR (After Inflation)',
      type: 'percentage',
      explanation: 'CAGR adjusted for inflation'
    },
    {
      id: 'afterTaxCAGR',
      label: 'After-Tax CAGR',
      type: 'percentage',
      explanation: 'CAGR after taxes'
    },
    {
      id: 'futureValue',
      label: 'Projected Future Value',
      type: 'currency',
      explanation: 'Projected value after one more year at current CAGR'
    },
    {
      id: 'investmentMultiple',
      label: 'Investment Multiple',
      type: 'number',
      explanation: 'How many times the investment has grown'
    },
    {
      id: 'averageAnnualReturn',
      label: 'Average Annual Return',
      type: 'percentage',
      explanation: 'Simple average annual return'
    }
  ],

  calculate: (inputs: Record<string, any>): CalculationResult => {
    const cagrInputs: CAGRInputs = {
      initialValue: inputs.initialValue,
      finalValue: inputs.finalValue,
      timePeriod: inputs.timePeriod,
      timePeriodUnit: inputs.timePeriodUnit,
      compoundingFrequency: inputs.compoundingFrequency,
      additionalContributions: inputs.additionalContributions,
      contributionFrequency: inputs.contributionFrequency,
      inflationRate: inputs.inflationRate,
      taxRate: inputs.taxRate,
      currency: inputs.currency
    };

    const outputs = calculateCAGRResult(cagrInputs);
    return { outputs };
  },

  validate: (inputs: Record<string, any>) => {
    const cagrInputs: CAGRInputs = {
      initialValue: inputs.initialValue,
      finalValue: inputs.finalValue,
      timePeriod: inputs.timePeriod,
      timePeriodUnit: inputs.timePeriodUnit,
      compoundingFrequency: inputs.compoundingFrequency,
      additionalContributions: inputs.additionalContributions,
      contributionFrequency: inputs.contributionFrequency,
      inflationRate: inputs.inflationRate,
      taxRate: inputs.taxRate,
      currency: inputs.currency
    };

    return validateCAGRInputs(cagrInputs);
  },

  validateBusinessRules: (inputs: Record<string, any>) => {
    const cagrInputs: CAGRInputs = {
      initialValue: inputs.initialValue,
      finalValue: inputs.finalValue,
      timePeriod: inputs.timePeriod,
      timePeriodUnit: inputs.timePeriodUnit,
      compoundingFrequency: inputs.compoundingFrequency,
      additionalContributions: inputs.additionalContributions,
      contributionFrequency: inputs.contributionFrequency,
      inflationRate: inputs.inflationRate,
      taxRate: inputs.taxRate,
      currency: inputs.currency
    };

    return validateCAGRBusinessRules(cagrInputs);
  },

  examples: [
    {
      title: 'Stock Portfolio Growth',
      description: '10-year growth of a $10,000 stock portfolio to $25,000',
      inputs: {
        initialValue: 10000,
        finalValue: 25000,
        timePeriod: 10,
        timePeriodUnit: 'years',
        inflationRate: 0.03,
        taxRate: 0.15
      },
      expectedOutputs: {
        cagr: 0.0948,
        totalReturn: 15000,
        totalReturnPercentage: 150,
        annualizedReturn: 0.0948,
        realCAGR: 0.0638,
        afterTaxCAGR: 0.0806,
        futureValue: 26750,
        investmentMultiple: 2.5,
        averageAnnualReturn: 15
      }
    },
    {
      title: 'Real Estate Investment',
      description: '5-year property value increase from $200,000 to $300,000',
      inputs: {
        initialValue: 200000,
        finalValue: 300000,
        timePeriod: 5,
        timePeriodUnit: 'years',
        inflationRate: 0.025,
        taxRate: 0.20
      },
      expectedOutputs: {
        cagr: 0.0849,
        totalReturn: 100000,
        totalReturnPercentage: 50,
        annualizedReturn: 0.0849,
        realCAGR: 0.0584,
        afterTaxCAGR: 0.0679,
        futureValue: 32547,
        investmentMultiple: 1.5,
        averageAnnualReturn: 10
      }
    }
  ]
};