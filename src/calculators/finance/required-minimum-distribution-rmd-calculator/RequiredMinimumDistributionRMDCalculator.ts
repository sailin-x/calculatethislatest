import { Calculator } from '../../../types/calculator';
import { calculateRMDRMD } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const requiredMinimumDistributionRMDCalculator: Calculator = {
  id: 'required-minimum-distribution-rmd-calculator',
  title: 'Required Minimum Distribution (RMD) Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate required minimum distributions from retirement accounts, tax implications, penalty risks, and optimal withdrawal strategies for traditional IRAs, Roth IRAs, and retirement plans.',

  usageInstructions: [
    'Enter your account balance and current age',
    'Specify account type and beneficiary information',
    'Review RMD amounts, tax implications, and penalty risks',
    'Compare different withdrawal strategies and timing options'
  ],

  inputs: [
    {
      id: 'accountBalance',
      label: 'Account Balance',
      type: 'currency',
      required: true,
      placeholder: '750000',
      tooltip: 'Current account balance',
      defaultValue: 750000,
      min: 0,
      max: 10000000
    },
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '72',
      tooltip: 'Your current age',
      defaultValue: 72,
      min: 0,
      max: 120
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      placeholder: '87',
      tooltip: 'Your estimated life expectancy',
      defaultValue: 87,
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
      id: 'spouseAge',
      label: 'Spouse Age',
      type: 'number',
      required: false,
      placeholder: '70',
      tooltip: 'Spouse current age',
      defaultValue: 70,
      min: 0,
      max: 120
    },
    {
      id: 'taxBracket',
      label: 'Tax Bracket (%)',
      type: 'percentage',
      required: true,
      placeholder: '28',
      tooltip: 'Your marginal tax rate',
      defaultValue: 28,
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
    },
    {
      id: 'previousYearBalance',
      label: 'Previous Year Balance',
      type: 'currency',
      required: false,
      placeholder: '700000',
      tooltip: 'Account balance at end of previous year',
      defaultValue: 700000,
      min: 0,
      max: 10000000
    },
    {
      id: 'qualifiedCharitableDistribution',
      label: 'Qualified Charitable Distribution',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Amount of qualified charitable distributions',
      defaultValue: 0,
      min: 0,
      max: 10000000
    }
  ],

  outputs: [
    {
      id: 'annualRMD',
      label: 'Annual RMD',
      type: 'currency',
      explanation: 'Required annual minimum distribution'
    },
    {
      id: 'monthlyRMD',
      label: 'Monthly RMD',
      type: 'currency',
      explanation: 'Monthly RMD amount'
    },
    {
      id: 'quarterlyRMD',
      label: 'Quarterly RMD',
      type: 'currency',
      explanation: 'Quarterly RMD amount'
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
      id: 'penaltyAmount',
      label: 'Penalty Amount',
      type: 'currency',
      explanation: 'Potential penalty for missing RMD'
    },
    {
      id: 'totalRMDRequired',
      label: 'Total RMD Required',
      type: 'currency',
      explanation: 'Total RMD required after QCDs'
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
    ValidationRuleFactory.required('accountBalance', 'Account balance is required'),
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
    ValidationRuleFactory.required('accountType', 'Account type is required'),
    ValidationRuleFactory.required('beneficiaryType', 'Beneficiary type is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.range('accountBalance', 0, 10000000, 'Account balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
    ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('previousYearBalance', 0, 10000000, 'Previous year balance must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('qualifiedCharitableDistribution', 0, 10000000, 'Qualified charitable distribution must be between $0 and $10,000,000'),
    ValidationRuleFactory.businessRule(
      'lifeExpectancy',
      (lifeExpectancy, allInputs) => {
        if (!allInputs?.currentAge) return true;
        return lifeExpectancy > allInputs.currentAge;
      },
      'Life expectancy must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'qualifiedCharitableDistribution',
      (qualifiedCharitableDistribution, allInputs) => {
        if (!allInputs?.accountBalance) return true;
        return qualifiedCharitableDistribution <= allInputs.accountBalance;
      },
      'Qualified charitable distribution cannot exceed account balance'
    ),
    ValidationRuleFactory.businessRule(
      'spouseAge',
      (spouseAge, allInputs) => {
        if (!allInputs?.includeSpouse) return true;
        return spouseAge >= 0 && spouseAge <= 120;
      },
      'Spouse age must be between 0 and 120 when spouse is included'
    )
  ],

  examples: [
    {
      title: 'Traditional IRA RMD Calculation',
      description: '72-year-old with traditional IRA requiring annual RMDs',
      inputs: {
        accountBalance: 750000,
        currentAge: 72,
        lifeExpectancy: 87,
        accountType: 'traditional_ira',
        beneficiaryType: 'non_spouse',
        includeSpouse: false,
        spouseAge: 70,
        taxBracket: 28,
        expectedReturn: 6,
        inflationRate: 2.5,
        previousYearBalance: 700000,
        qualifiedCharitableDistribution: 0
      },
      expectedOutputs: {
        annualRMD: 28500,
        monthlyRMD: 2375,
        quarterlyRMD: 7125,
        remainingLifeExpectancy: 15,
        rmdPercentage: 3.8,
        taxOnRMD: 7980,
        netRMD: 20520,
        penaltyAmount: 0,
        totalRMDRequired: 28500,
        rmdStrategy: 'Standard annual RMD withdrawal - monitor account balance and life expectancy annually'
      }
    },
    {
      title: 'Roth IRA - No RMDs Required',
      description: 'Roth IRA owner not required to take RMDs during lifetime',
      inputs: {
        accountBalance: 600000,
        currentAge: 75,
        lifeExpectancy: 88,
        accountType: 'roth_ira',
        beneficiaryType: 'spouse',
        includeSpouse: true,
        spouseAge: 72,
        taxBracket: 25,
        expectedReturn: 7,
        inflationRate: 2.5,
        previousYearBalance: 550000,
        qualifiedCharitableDistribution: 0
      },
      expectedOutputs: {
        annualRMD: 0,
        monthlyRMD: 0,
        quarterlyRMD: 0,
        remainingLifeExpectancy: 13,
        rmdPercentage: 0,
        taxOnRMD: 0,
        netRMD: 0,
        penaltyAmount: 0,
        totalRMDRequired: 0,
        rmdStrategy: 'No RMDs required during lifetime - consider Qualified Charitable Distributions for tax planning'
      }
    }
  ]
};