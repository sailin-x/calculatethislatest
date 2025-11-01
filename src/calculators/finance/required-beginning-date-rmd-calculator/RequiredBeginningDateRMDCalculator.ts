import { Calculator } from '../../types/calculator';
import { calculateRBDRMD } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const requiredBeginningDateRMDCalculator: Calculator = {
  id: 'RequiredBeginningDate-rmd-calculator',
  title: 'Required Beginning Date (RBD) for RMDs Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate Required Beginning Date for RMDs, annual withdrawal amounts, and tax implications for traditional IRAs, Roth IRAs, and retirement accounts with comprehensive RMD planning strategies.',

  usageInstructions: [
    'Enter your birth year and account details',
    'Specify account type and beneficiary information',
    'Review RMD amounts and tax implications',
    'Compare different RMD strategies and timing options'
  ],

  inputs: [
    {
      id: 'birthYear',
      label: 'Birth Year',
      type: 'number',
      required: true,
      placeholder: '1960',
      tooltip: 'Year you were born (affects RBD calculation)',
      defaultValue: 1960,
      min: 1900,
      max: 2010
    },
    {
      id: 'currentYear',
      label: 'Current Year',
      type: 'number',
      required: true,
      placeholder: '2024',
      tooltip: 'Current year for calculations',
      defaultValue: 2024,
      min: 2020,
      max: 2050
    },
    {
      id: 'accountBalance',
      label: 'Account Balance',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Current account balance',
      defaultValue: 500000,
      min: 0,
      max: 10000000
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      placeholder: '85',
      tooltip: 'Your estimated life expectancy',
      defaultValue: 85,
      min: 1,
      max: 120
    },
    {
      id: 'accountType',
      label: 'Account Type',
      type: 'select',
      required: true,
      options: [
        { value: 'traditional_ira', label: 'Traditional IRA' },
        { value: 'roth_ira', label: 'Roth IRA' },
        { value: '401k', label: '401(k)' },
        { value: '403b', label: '403(b)' },
        { value: 'sep_ira', label: 'SEP IRA' },
        { value: 'simple_ira', label: 'SIMPLE IRA' }
      ],
      tooltip: 'Type of retirement account',
      defaultValue: 'traditional_ira'
    },
    {
      id: 'beneficiaryType',
      label: 'Beneficiary Type',
      type: 'select',
      required: true,
      options: [
        { value: 'spouse', label: 'Spouse' },
        { value: 'non_spouse', label: 'Non-Spouse' },
        { value: 'charity', label: 'Charity' },
        { value: 'estate', label: 'Estate' }
      ],
      tooltip: 'Primary beneficiary designation',
      defaultValue: 'non_spouse'
    },
    {
      id: 'includeSpouse',
      label: 'Include Spouse',
      type: 'boolean',
      required: false,
      tooltip: 'Include spouse in RMD calculations',
      defaultValue: false
    },
    {
      id: 'spouseBirthYear',
      label: 'Spouse Birth Year',
      type: 'number',
      required: false,
      placeholder: '1962',
      tooltip: 'Spouse birth year',
      defaultValue: 1962,
      min: 1900,
      max: 2010
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Expected annual investment return',
      defaultValue: 6,
      min: -20,
      max: 50,
      step: 0.5
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: -10,
      max: 20,
      step: 0.1
    }
  ],

  outputs: [
    {
      id: 'requiredBeginningDate',
      label: 'Required Beginning Date',
      type: 'number',
      explanation: 'Year you must begin taking RMDs'
    },
    {
      id: 'annualRMD',
      label: 'Annual RMD',
      type: 'currency',
      explanation: 'Required annual withdrawal amount'
    },
    {
      id: 'monthlyRMD',
      label: 'Monthly RMD',
      type: 'currency',
      explanation: 'Monthly RMD amount'
    },
    {
      id: 'totalLifetimeRMDs',
      label: 'Total Lifetime RMDs',
      type: 'currency',
      explanation: 'Total RMDs over remaining lifetime'
    },
    {
      id: 'remainingLifeExpectancy',
      label: 'Remaining Life Expectancy',
      type: 'number',
      explanation: 'Years remaining for RMD calculations'
    },
    {
      id: 'rmdPercentage',
      label: 'RMD Percentage',
      type: 'percentage',
      explanation: 'Percentage of account balance required annually'
    },
    {
      id: 'taxOnRMD',
      label: 'Tax on RMD',
      type: 'currency',
      explanation: 'Estimated tax on RMD withdrawal'
    },
    {
      id: 'netRMD',
      label: 'Net RMD',
      type: 'currency',
      explanation: 'RMD amount after taxes'
    },
    {
      id: 'rmdStrategy',
      label: 'RMD Strategy',
      type: 'text',
      explanation: 'Recommended RMD planning strategy'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('birthYear', 'Birth year is required'),
    ValidationRuleFactory.required('currentYear', 'Current year is required'),
    ValidationRuleFactory.required('accountBalance', 'Account balance is required'),
    ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
    ValidationRuleFactory.required('accountType', 'Account type is required'),
    ValidationRuleFactory.required('beneficiaryType', 'Beneficiary type is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.range('birthYear', 1900, 2010, 'Birth year must be between 1900 and 2010'),
    ValidationRuleFactory.range('currentYear', 2020, 2050, 'Current year must be between 2020 and 2050'),
    ValidationRuleFactory.range('accountBalance', 0, 10000000, 'Account balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120 years'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.businessRule(
      'currentYear',
      (currentYear, allInputs) => {
        if (!allInputs?.birthYear) return true;
        return currentYear >= allInputs.birthYear;
      },
      'Current year must be greater than or equal to birth year'
    ),
    ValidationRuleFactory.businessRule(
      'lifeExpectancy',
      (lifeExpectancy, allInputs) => {
        if (!allInputs?.birthYear || !allInputs?.currentYear) return true;
        const currentAge = allInputs.currentYear - allInputs.birthYear;
        return lifeExpectancy > currentAge;
      },
      'Life expectancy must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'spouseBirthYear',
      (spouseBirthYear, allInputs) => {
        if (!allInputs?.includeSpouse) return true;
        return spouseBirthYear >= 1900 && spouseBirthYear <= 2010;
      },
      'Spouse birth year must be between 1900 and 2010 when spouse is included'
    )
  ],

  examples: [
    {
      title: 'Traditional IRA RMD Calculation',
      description: '72YearOld with traditional IRA requiring RMDs',
      inputs: {
        birthYear: 1952,
        currentYear: 2024,
        accountBalance: 750000,
        lifeExpectancy: 87,
        accountType: 'traditional_ira',
        beneficiaryType: 'non_spouse',
        includeSpouse: false,
        spouseBirthYear: 1950,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5
      },
      expectedOutputs: {
        requiredBeginningDate: 2025,
        annualRMD: 28500,
        monthlyRMD: 2375,
        totalLifetimeRMDs: 570000,
        remainingLifeExpectancy: 23,
        rmdPercentage: 3.8,
        taxOnRMD: 7980,
        netRMD: 20520,
        rmdStrategy: 'Standard RMD strategy - take required distributions annually'
      }
    },
    {
      title: 'Roth IRA - No RMDs Required',
      description: 'Roth IRA owner not required to take RMDs during lifetime',
      inputs: {
        birthYear: 1960,
        currentYear: 2024,
        accountBalance: 600000,
        lifeExpectancy: 88,
        accountType: 'roth_ira',
        beneficiaryType: 'spouse',
        includeSpouse: true,
        spouseBirthYear: 1962,
        taxBracket: 25,
        expectedReturn: 7,
        inflationRate: 2.5
      },
      expectedOutputs: {
        requiredBeginningDate: 2033,
        annualRMD: 0,
        monthlyRMD: 0,
        totalLifetimeRMDs: 0,
        remainingLifeExpectancy: 24,
        rmdPercentage: 0,
        taxOnRMD: 0,
        netRMD: 0,
        rmdStrategy: 'No RMDs required during lifetime - consider Qualified Charitable Distributions'
      }
    }
  ]
};