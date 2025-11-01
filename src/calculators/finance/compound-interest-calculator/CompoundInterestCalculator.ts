import { Calculator } from '../../types/calculator';
import { compoundInterestCalculatorFormula } from './formulas';
import { validateCompoundInterestInputs } from './validation';
import { CompoundInterestInputs, CompoundInterestResults } from './types';

/**
 * Advanced Compound Interest Calculator
 * 
 * Features:
 * - Multiple compounding frequencies (daily, monthly, quarterly, annually, continuous)
 * - Regular contributions (monthly, quarterly, annually)
 * - Inflation adjustment calculations
 * - Tax impact analysis
 * - Target amount calculations
 * - Comprehensive schedule generation
 * - Real-time validation and error handling
 */
export const compoundInterestCalculator: Calculator = {
  id: 'CompoundInterestCalculator',
  title: 'Compound Interest Calculator',
  description: 'Advanced compound interest calculations with contributions, inflation adjustment, tax considerations, and comprehensive analysis',
  category: 'finance',
  subcategory: 'investment',
  tags: ['compound-interest', 'investment', 'savings', 'retirement', 'financial-planning', 'interest-calculator'],
  
  // Input fields
  inputs: [
    {
      id: 'principal',
      label: 'Principal Amount',
      type: 'number',
      required: true,
      min: 0.01,
      max: 1000000000,
      step: 0.01,
      placeholder: '10000',
      description: 'Initial investment amount'
    },
    {
      id: 'rate',
      label: 'Annual Interest Rate (%)',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.01,
      placeholder: '5.5',
      description: 'Annual interest rate in percentage'
    },
    {
      id: 'time',
      label: 'Time Period (Years)',
      type: 'number',
      required: true,
      min: 0.1,
      max: 100,
      step: 0.1,
      placeholder: '10',
      description: 'Investment time period in years'
    },
    {
      id: 'compoundingFrequency',
      label: 'Compounding Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'Annually' },
        { value: 2, label: 'Semi-annually' },
        { value: 4, label: 'Quarterly' },
        { value: 12, label: 'Monthly' },
        { value: 52, label: 'Weekly' },
        { value: 365, label: 'Daily' },
        { value: -1, label: 'Continuous' }
      ],
      defaultValue: 12,
      description: 'How often interest is compounded'
    },
    {
      id: 'monthlyContribution',
      label: 'Monthly Contribution',
      type: 'number',
      required: false,
      min: 0,
      max: 100000,
      step: 1,
      placeholder: '500',
      description: 'Optional monthly contribution amount'
    },
    {
      id: 'includeInflation',
      label: 'Include Inflation Adjustment',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Calculate real returns adjusted for inflation'
    },
    {
      id: 'inflationRate',
      label: 'Annual Inflation Rate (%)',
      type: 'number',
      required: false,
      min: -50,
      max: 100,
      step: 0.1,
      placeholder: '2.5',
      description: 'Expected annual inflation rate',
      dependsOn: 'includeInflation'
    },
    {
      id: 'includeTax',
      label: 'Include Tax Impact',
      type: 'checkbox',
      required: false,
      defaultValue: false,
      description: 'Calculate after-tax returns'
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'number',
      required: false,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: '25',
      description: 'Effective tax rate on investment returns',
      dependsOn: 'includeTax'
    },
    {
      id: 'targetAmount',
      label: 'Target Amount (Optional)',
      type: 'number',
      required: false,
      min: 0.01,
      max: 1000000000,
      step: 0.01,
      placeholder: '100000',
      description: 'Calculate time needed to reach this amount'
    }
  ],

  // Output fields
  outputs: [
    {
      id: 'basicCalculation',
      label: 'Basic Calculation',
      type: 'object',
      fields: [
        { id: 'futureValue', label: 'Future Value', type: 'currency' },
        { id: 'interestEarned', label: 'Interest Earned', type: 'currency' },
        { id: 'effectiveRate', label: 'Effective Annual Rate', type: 'percentage' }
      ]
    },
    {
      id: 'withContributions',
      label: 'With Contributions',
      type: 'object',
      fields: [
        { id: 'futureValue', label: 'Total Future Value', type: 'currency' },
        { id: 'totalContributions', label: 'Total Contributions', type: 'currency' },
        { id: 'interestEarned', label: 'Interest Earned', type: 'currency' }
      ]
    },
    {
      id: 'summary',
      label: 'Summary',
      type: 'object',
      fields: [
        { id: 'totalValue', label: 'Total Value', type: 'currency' },
        { id: 'totalInterest', label: 'Total Interest', type: 'currency' },
        { id: 'totalContributions', label: 'Total Contributions', type: 'currency' },
        { id: 'effectiveAnnualRate', label: 'Effective Annual Rate', type: 'percentage' }
      ]
    },
    {
      id: 'schedule',
      label: 'Growth Schedule',
      type: 'table',
      columns: [
        { id: 'year', label: 'Year', type: 'number' },
        { id: 'beginningBalance', label: 'Beginning Balance', type: 'currency' },
        { id: 'contributions', label: 'Contributions', type: 'currency' },
        { id: 'interestEarned', label: 'Interest Earned', type: 'currency' },
        { id: 'endingBalance', label: 'Ending Balance', type: 'currency' }
      ]
    }
  ],

  // Calculator functions
  calculate: compoundInterestCalculatorFormula.calculate,
  validate: validateCompoundInterestInputs,

  // Examples
  examples: [
    {
      title: 'Basic Investment',
      description: 'Simple compound interest calculation',
      inputs: {
        principal: 10000,
        rate: 5.5,
        time: 10,
        compoundingFrequency: 12,
        monthlyContribution: 0
      }
    },
    {
      title: 'Retirement Savings',
      description: 'Long-term investment with monthly contributions',
      inputs: {
        principal: 50000,
        rate: 7.2,
        time: 25,
        compoundingFrequency: 12,
        monthlyContribution: 1000,
        includeInflation: true,
        inflationRate: 2.5
      }
    },
    {
      title: 'Tax-Advantaged Account',
      description: 'Investment with tax considerations',
      inputs: {
        principal: 25000,
        rate: 6.8,
        time: 15,
        compoundingFrequency: 12,
        monthlyContribution: 500,
        includeTax: true,
        taxRate: 22
      }
    }
  ],

  // Usage instructions
  usageInstructions: [
    'Enter your initial investment amount (principal)',
    'Specify the annual interest rate you expect to earn',
    'Set the time period for your investment',
    'Choose how often interest compounds (monthly is most common)',
    'Add optional monthly contributions if applicable',
    'Enable inflation adjustment to see real returns',
    'Include tax impact for after-tax calculations',
    'Set a target amount to calculate time needed to reach your goal'
  ],

  // Tips and insights
  tips: [
    'Higher compounding frequencies (daily vs. monthly) provide slightly better returns',
    'Regular contributions can significantly boost long-term growth',
    'Inflation can erode real returns over time',
    'Taxes can significantly impact after-tax returns',
    'Start early - compound interest works best over longer time periods',
    'Consider using tax-advantaged accounts to minimize tax impact'
  ],

  // Related calculators
  relatedCalculators: [
    'mortgage-calculator',
    'InvestmentReturnCalculator',
    'RetirementPlanningCalculator',
    'SavingsGoalCalculator'
  ]
};
