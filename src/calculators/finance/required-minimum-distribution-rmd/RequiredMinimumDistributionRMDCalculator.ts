import { Calculator } from '../../types/calculator';
import { RequiredMinimumDistributionRMDInputs, RequiredMinimumDistributionRMDOutputs } from './types';
import { calculateRequiredMinimumDistribution } from './formulas';
import { validateRequiredMinimumDistributionRMDInputs, validateRequiredMinimumDistributionRMDBusinessRules } from './validation';

export const RequiredMinimumDistributionRMDCalculator: Calculator = {
  id: 'RequiredMinimumDistributionRMDCalculator',
  title: 'Required Minimum Distribution (RMD) Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate your Required Minimum Distribution from retirement accounts using IRS life expectancy tables and SECURE Act 2.0 rules.',
  usageInstructions: [
    'Enter your account balance and birth year',
    'Select your account type',
    'Enter current age or it will be calculated',
    'Include spouse information if applicable',
    'Review RMD amount and tax implications'
  ],

  inputs: [
    {
      id: 'accountBalance',
      label: 'Account Balance ($)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Current balance in your retirement account'
    },
    {
      id: 'birthYear',
      label: 'Birth Year',
      type: 'number',
      required: true,
      min: 1900,
      max: new Date().getFullYear(),
      tooltip: 'Your year of birth'
    },
    {
      id: 'accountType',
      label: 'Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional_ira', label: 'Traditional IRA' },
        { value: '401k', label: '401(k)' },
        { value: 'roth_ira', label: 'Roth IRA' },
        { value: 'sep_ira', label: 'SEP IRA' },
        { value: 'simple_ira', label: 'SIMPLE IRA' }
      ],
      tooltip: 'Type of retirement account'
    },
    {
      id: 'currentAge',
      label: 'Current Age (Optional)',
      type: 'number',
      required: false,
      min: 0,
      max: 150,
      tooltip: 'Your current age (calculated from birth year if not provided)'
    },
    {
      id: 'spouseBirthYear',
      label: 'Spouse Birth Year (Optional)',
      type: 'number',
      required: false,
      min: 1900,
      max: new Date().getFullYear(),
      tooltip: 'Spouse\'s birth year for joint life expectancy'
    },
    {
      id: 'isSpouseBeneficialOwner',
      label: 'Spouse is Sole Beneficial Owner',
      type: 'boolean',
      required: false,
      tooltip: 'Check if spouse is the sole beneficial owner of the account'
    },
    {
      id: 'hasMultipleAccounts',
      label: 'Multiple Retirement Accounts',
      type: 'boolean',
      required: false,
      tooltip: 'Check if you have multiple retirement accounts'
    }
  ],

  outputs: [
    {
      id: 'requiredMinimumDistribution',
      label: 'Required Minimum Distribution',
      type: 'currency',
      explanation: 'The minimum amount you must withdraw from your account this year'
    },
    {
      id: 'distributionPercentage',
      label: 'Distribution Percentage',
      type: 'percentage',
      explanation: 'The percentage of your account balance required as RMD'
    },
    {
      id: 'lifeExpectancyFactor',
      label: 'Life Expectancy Factor',
      type: 'number',
      explanation: 'Life expectancy factor from IRS tables used in calculation'
    },
    {
      id: 'remainingBalanceAfterRMD',
      label: 'Balance After RMD',
      type: 'currency',
      explanation: 'Account balance remaining after RMD withdrawal'
    },
    {
      id: 'taxImplications',
      label: 'Tax Implications',
      type: 'text',
      explanation: 'Tax treatment of the RMD'
    },
    {
      id: 'rmdExplanation',
      label: 'RMD Calculation Explanation',
      type: 'text',
      explanation: 'Detailed explanation of how the RMD was calculated'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: '72-Year-Old with $500,000 Traditional IRA',
      description: 'Standard RMD calculation for someone who has reached their RBD',
      inputs: {
        accountBalance: 500000,
        birthYear: 1950,
        accountType: 'traditional_ira',
        currentAge: 72
      },
      expectedOutputs: {
        requiredMinimumDistribution: 19231,
        distributionPercentage: 0.0385,
        lifeExpectancyFactor: 26.0,
        remainingBalanceAfterRMD: 480769,
        taxImplications: 'RMDs are taxed as ordinary income. Consider Qualified Charitable Distributions (QCDs) for tax-free giving.',
        rmdExplanation: 'RMD = Account Balance ($500,000) ÷ Life Expectancy Factor (26.0) = $19,231.00'
      }
    },
    {
      title: 'Roth IRA - No RMD Required',
      description: 'Roth IRAs are not subject to RMD rules during lifetime',
      inputs: {
        accountBalance: 300000,
        birthYear: 1960,
        accountType: 'roth_ira',
        currentAge: 72
      },
      expectedOutputs: {
        requiredMinimumDistribution: 0,
        distributionPercentage: 0,
        lifeExpectancyFactor: 0,
        remainingBalanceAfterRMD: 300000,
        taxImplications: 'Roth IRA distributions are not required during lifetime. Qualified distributions are tax-free.',
        rmdExplanation: 'Roth IRA owners are not subject to Required Minimum Distributions during their lifetime.'
      }
    },
    {
      title: '70-Year-Old Pre-RBD',
      description: 'Individual who has not yet reached their Required Beginning Date',
      inputs: {
        accountBalance: 400000,
        birthYear: 1952,
        accountType: 'traditional_ira',
        currentAge: 70
      },
      expectedOutputs: {
        requiredMinimumDistribution: 0,
        distributionPercentage: 0,
        lifeExpectancyFactor: 0,
        remainingBalanceAfterRMD: 400000,
        taxImplications: 'RMDs are not required until you reach your Required Beginning Date.',
        rmdExplanation: 'Your Required Beginning Date is April 1, 2024. No RMD required until then.'
      }
    }
  ]
};