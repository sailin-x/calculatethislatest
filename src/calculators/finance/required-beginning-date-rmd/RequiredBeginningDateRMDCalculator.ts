import { Calculator } from '../../types/calculator';
import { RequiredBeginningDateRMDInputs, RequiredBeginningDateRMDOutputs } from './types';
import { calculateRequiredBeginningDate } from './formulas';
import { validateRequiredBeginningDateRMDInputs, validateRequiredBeginningDateRMDBusinessRules } from './validation';

export const RequiredBeginningDateRMDCalculator: Calculator = {
  id: 'RequiredBeginningDateRMDCalculator',
  title: 'Required Beginning Date (RBD) for RMDs Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate your Required Beginning Date for Required Minimum Distributions (RMDs) from retirement accounts based on IRS rules and SECURE Act 2.0.',
  usageInstructions: [
    'Enter your birth year',
    'Select your account type',
    'Enter spouse birth year if applicable for beneficiary rules',
    'Review your RBD and explanation'
  ],

  inputs: [
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
      id: 'spouseBirthYear',
      label: 'Spouse Birth Year (Optional)',
      type: 'number',
      required: false,
      min: 1900,
      max: new Date().getFullYear(),
      tooltip: 'Spouse\'s birth year for beneficiary calculations'
    },
    {
      id: 'isSpouseBeneficialOwner',
      label: 'Spouse is Sole Beneficial Owner',
      type: 'boolean',
      required: false,
      tooltip: 'Check if spouse is the sole beneficial owner of the account'
    }
  ],

  outputs: [
    {
      id: 'requiredBeginningDate',
      label: 'Required Beginning Date',
      type: 'text',
      explanation: 'The date by which you must begin taking RMDs'
    },
    {
      id: 'ageAtRBD',
      label: 'Age at RBD',
      type: 'number',
      explanation: 'Your age when RBD occurs'
    },
    {
      id: 'yearsUntilRBD',
      label: 'Years Until RBD',
      type: 'number',
      explanation: 'Years remaining until RBD'
    },
    {
      id: 'rbdExplanation',
      label: 'RBD Explanation',
      type: 'text',
      explanation: 'Detailed explanation of RBD calculation'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Born in 1960 - Age 72 RBD',
      description: 'Individual born in 1960 subject to SECURE Act 2.0 rules',
      inputs: {
        birthYear: 1960,
        accountType: 'traditional_ira'
      },
      expectedOutputs: {
        requiredBeginningDate: 'April 1, 2032',
        ageAtRBD: 72,
        yearsUntilRBD: 7,
        rbdExplanation: 'RBD is April 1 of the year following the year you reach age 72 (SECURE Act 2.0).'
      }
    },
    {
      title: 'Born in 1945 - Age 70½ RBD',
      description: 'Individual born before 1951 subject to pre-SECURE Act rules',
      inputs: {
        birthYear: 1945,
        accountType: '401k'
      },
      expectedOutputs: {
        requiredBeginningDate: 'April 1, 2016',
        ageAtRBD: 70.5,
        yearsUntilRBD: 0,
        rbdExplanation: 'RBD is April 1 of the year following the year you reach age 70½ (pre-SECURE Act rules).'
      }
    },
    {
      title: 'Roth IRA - No RBD',
      description: 'Roth IRA owners are not required to take lifetime distributions',
      inputs: {
        birthYear: 1970,
        accountType: 'roth_ira'
      },
      expectedOutputs: {
        requiredBeginningDate: 'No RBD - Lifetime distributions not required',
        ageAtRBD: 0,
        yearsUntilRBD: 0,
        rbdExplanation: 'Roth IRA owners are not required to take distributions during their lifetime. Beneficiaries may be subject to RMD rules.'
      }
    }
  ]
};