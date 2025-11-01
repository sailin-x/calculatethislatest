import { Calculator } from '../../../types/calculator';
import { UGMACustodialAccountInputs, UGMACustodialAccountOutputs } from './types';
import {
  calculateFutureValue,
  calculateTotalContributions,
  calculateTaxLiability,
  calculateGiftTaxImpact,
  calculateCustodialAccountValue,
  calculateAnnualTaxSavings,
  calculateTransferAge,
  calculateTransferValue
} from './formulas';
import { validateUGMACustodialAccountInputs, validateUGMACustodialAccountBusinessRules } from './validation';

export const UGMACustodialAccountCalculator: Calculator = {
  id: 'UGMACustodialAccountCalculator',
  title: 'UGMA/UTMA Custodial Account Calculator',
  category: 'finance',
  subcategory: 'Education & Savings',
  description: 'Calculate future value, tax implications, and growth potential of UGMA/UTMA custodial accounts for minors. Includes gift tax analysis and state-specific considerations.',
  usageInstructions: [
    'Enter initial contribution and annual gift amounts',
    'Select custodial account type (UGMA vs UTMA)',
    'Input child\'s current age and expected return rate',
    'Specify state for tax calculations',
    'Review future value projections and tax implications',
    'Consider gift tax exclusion limits and timing'
  ],

  inputs: [
    {
      id: 'initialContribution',
      label: 'Initial Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'One-time initial deposit to the custodial account'
    },
    {
      id: 'annualContribution',
      label: 'Annual Contribution ($)',
      type: 'currency',
      required: true,
      min: 0,
      max: 18000,
      tooltip: 'Annual gift amount (limited by gift tax exclusion)'
    },
    {
      id: 'contributionFrequency',
      label: 'Contribution Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'annually', label: 'Annually' }
      ],
      tooltip: 'How often contributions are made'
    },
    {
      id: 'expectedReturnRate',
      label: 'Expected Return Rate (%)',
      type: 'percentage',
      required: true,
      min: -10,
      max: 25,
      step: 0.1,
      defaultValue: 7,
      tooltip: 'Expected annual investment return'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: true,
      min: -5,
      max: 10,
      step: 0.1,
      defaultValue: 3,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'childAge',
      label: 'Child\'s Current Age',
      type: 'number',
      required: true,
      min: 0,
      max: 17,
      tooltip: 'Child\'s age in years'
    },
    {
      id: 'custodialAccountType',
      label: 'Custodial Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'UGMA', label: 'UGMA (Uniform Gifts to Minors Act)' },
        { value: 'UTMA', label: 'UTMA (Uniform Transfers to Minors Act)' }
      ],
      tooltip: 'UGMA for gifts, UTMA for transfers including real estate'
    },
    {
      id: 'state',
      label: 'State',
      type: 'select',
      required: true,
      options: [
        { value: 'CA', label: 'California' },
        { value: 'NY', label: 'New York' },
        { value: 'TX', label: 'Texas' },
        { value: 'FL', label: 'Florida' },
        { value: 'WA', label: 'Washington' },
        { value: 'NV', label: 'Nevada' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'SD', label: 'South Dakota' }
      ],
      tooltip: 'State for tax calculations'
    },
    {
      id: 'taxYear',
      label: 'Tax Year',
      type: 'number',
      required: true,
      min: 2024,
      max: 2030,
      defaultValue: 2024,
      tooltip: 'Tax year for calculations'
    },
    {
      id: 'giftTaxExclusionUsed',
      label: 'Gift Tax Exclusion Already Used ($)',
      type: 'currency',
      required: false,
      min: 0,
      max: 18000,
      defaultValue: 0,
      tooltip: 'Portion of annual gift tax exclusion already used'
    }
  ],

  outputs: [
    {
      id: 'futureValue',
      label: 'Future Value',
      type: 'currency',
      explanation: 'Projected value of the custodial account at transfer age'
    },
    {
      id: 'totalContributions',
      label: 'Total Contributions',
      type: 'currency',
      explanation: 'Sum of all contributions made to the account'
    },
    {
      id: 'totalEarnings',
      label: 'Total Earnings',
      type: 'currency',
      explanation: 'Investment earnings and growth'
    },
    {
      id: 'taxLiability',
      label: 'Tax Liability',
      type: 'currency',
      explanation: 'Federal and state capital gains taxes owed'
    },
    {
      id: 'netValue',
      label: 'Net Value',
      type: 'currency',
      explanation: 'Future value after taxes'
    },
    {
      id: 'annualTaxSavings',
      label: 'Annual Tax Savings',
      type: 'currency',
      explanation: 'Tax savings compared to parent\'s tax rate'
    },
    {
      id: 'giftTaxImpact',
      label: 'Gift Tax Impact',
      type: 'currency',
      explanation: 'Gift tax owed on contributions exceeding exclusion'
    },
    {
      id: 'stateTaxImpact',
      label: 'State Tax Impact',
      type: 'currency',
      explanation: 'State-specific tax implications'
    },
    {
      id: 'custodialAccountValue',
      label: 'Custodial Account Value',
      type: 'currency',
      explanation: 'Final value available to child'
    },
    {
      id: 'transferAge',
      label: 'Transfer Age',
      type: 'number',
      explanation: 'Age at which account transfers to child (18 for UGMA, 21 for UTMA)'
    },
    {
      id: 'transferValue',
      label: 'Transfer Value',
      type: 'currency',
      explanation: 'Value transferred to child at account maturity'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'College Savings for Newborn',
      description: 'UGMA account for a newborn with annual gifts at exclusion limit',
      inputs: {
        initialContribution: 5000,
        annualContribution: 18000,
        contributionFrequency: 'annually',
        expectedReturnRate: 7,
        inflationRate: 3,
        childAge: 0,
        custodialAccountType: 'UGMA',
        state: 'CA',
        taxYear: 2024,
        giftTaxExclusionUsed: 0
      },
      expectedOutputs: {
        futureValue: 1200000,
        totalContributions: 365000,
        totalEarnings: 835000,
        taxLiability: 167000,
        netValue: 1033000,
        annualTaxSavings: 25000,
        giftTaxImpact: 0,
        stateTaxImpact: 16700,
        custodialAccountValue: 1033000,
        transferAge: 18,
        transferValue: 1033000
      }
    },
    {
      title: 'UTMA for Teenager',
      description: 'UTMA account for a 15-year-old with smaller annual contributions',
      inputs: {
        initialContribution: 10000,
        annualContribution: 15000,
        contributionFrequency: 'annually',
        expectedReturnRate: 6,
        inflationRate: 2.5,
        childAge: 15,
        custodialAccountType: 'UTMA',
        state: 'TX',
        taxYear: 2024,
        giftTaxExclusionUsed: 3000
      },
      expectedOutputs: {
        futureValue: 85000,
        totalContributions: 40000,
        totalEarnings: 45000,
        taxLiability: 9000,
        netValue: 76000,
        annualTaxSavings: 13500,
        giftTaxImpact: 0,
        stateTaxImpact: 0,
        custodialAccountValue: 76000,
        transferAge: 21,
        transferValue: 76000
      }
    }
  ]
};