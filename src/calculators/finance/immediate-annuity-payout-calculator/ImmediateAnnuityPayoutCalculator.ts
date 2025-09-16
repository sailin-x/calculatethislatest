import { Calculator } from '../../../types/calculator';
import { calculateImmediateAnnuity } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const immediateAnnuityPayoutCalculator: Calculator = {
  id: 'immediate-annuity-payout-calculator',
  title: 'Immediate Annuity Payout Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate immediate annuity payouts, compare payout options, and determine optimal annuity strategies for retirement income planning with comprehensive analysis of payment structures and longevity protection.',

  usageInstructions: [
    'Enter your annuity principal amount and personal details',
    'Select payout type and frequency options',
    'Choose annuity type and guarantee periods',
    'Review payout amounts and longevity protection'
  ],

  inputs: [
    {
      id: 'principalAmount',
      label: 'Principal Amount',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Total amount invested in the annuity',
      defaultValue: 500000,
      min: 0,
      max: 10000000
    },
    {
      id: 'age',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Your current age',
      defaultValue: 65,
      min: 0,
      max: 120
    },
    {
      id: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      tooltip: 'Gender affects life expectancy calculations',
      defaultValue: 'male'
    },
    {
      id: 'payoutType',
      label: 'Payout Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single-life', label: 'Single Life' },
        { value: 'joint-life', label: 'Joint Life' },
        { value: 'period-certain', label: 'Period Certain' }
      ],
      tooltip: 'Type of annuity payout structure',
      defaultValue: 'single-life'
    },
    {
      id: 'payoutFrequency',
      label: 'Payout Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' },
        { value: 'semi-annual', label: 'Semi-Annual' },
        { value: 'annual', label: 'Annual' }
      ],
      tooltip: 'How often payments are made',
      defaultValue: 'monthly'
    },
    {
      id: 'annuityType',
      label: 'Annuity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed' },
        { value: 'variable', label: 'Variable' },
        { value: 'inflation-adjusted', label: 'Inflation-Adjusted' }
      ],
      tooltip: 'Type of annuity investment',
      defaultValue: 'fixed'
    },
    {
      id: 'guaranteePeriod',
      label: 'Guarantee Period (Years)',
      type: 'number',
      required: false,
      placeholder: '10',
      tooltip: 'Number of years payments are guaranteed',
      defaultValue: 10,
      min: 0,
      max: 40
    },
    {
      id: 'jointAge',
      label: 'Joint Annuitant Age',
      type: 'number',
      required: false,
      placeholder: '62',
      tooltip: 'Age of joint annuitant for joint-life payout',
      defaultValue: 62,
      min: 0,
      max: 120
    },
    {
      id: 'jointGender',
      label: 'Joint Annuitant Gender',
      type: 'select',
      required: false,
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      tooltip: 'Gender of joint annuitant',
      defaultValue: 'female'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Annual inflation rate',
      defaultValue: 2.5,
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '4',
      tooltip: 'Annual interest rate for calculations',
      defaultValue: 4,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      placeholder: '85',
      tooltip: 'Expected lifespan for payout calculations',
      defaultValue: 85,
      min: 0,
      max: 120
    }
  ],

  outputs: [
    {
      id: 'monthlyPayout',
      label: 'Monthly Payout',
      type: 'currency',
      explanation: 'Monthly annuity payment amount'
    },
    {
      id: 'annualPayout',
      label: 'Annual Payout',
      type: 'currency',
      explanation: 'Annual annuity payment amount'
    },
    {
      id: 'totalPayments',
      label: 'Total Payments',
      type: 'number',
      explanation: 'Total number of payments expected'
    },
    {
      id: 'totalPayoutAmount',
      label: 'Total Payout Amount',
      type: 'currency',
      explanation: 'Total amount paid out over annuity period'
    },
    {
      id: 'payoutDuration',
      label: 'Payout Duration (Years)',
      type: 'number',
      explanation: 'Expected duration of payments'
    },
    {
      id: 'remainingPrincipal',
      label: 'Remaining Principal',
      type: 'currency',
      explanation: 'Principal remaining after payouts'
    },
    {
      id: 'effectiveYield',
      label: 'Effective Yield (%)',
      type: 'percentage',
      explanation: 'Annual effective yield on investment'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point (Months)',
      type: 'number',
      explanation: 'Months to recover principal'
    },
    {
      id: 'survivorBenefit',
      label: 'Survivor Benefit',
      type: 'currency',
      explanation: 'Benefit paid to survivor'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('principalAmount', 'Principal amount is required'),
    ValidationRuleFactory.required('age', 'Age is required'),
    ValidationRuleFactory.required('gender', 'Gender is required'),
    ValidationRuleFactory.required('payoutType', 'Payout type is required'),
    ValidationRuleFactory.required('payoutFrequency', 'Payout frequency is required'),
    ValidationRuleFactory.required('annuityType', 'Annuity type is required'),
    ValidationRuleFactory.required('interestRate', 'Interest rate is required'),
    ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
    ValidationRuleFactory.range('principalAmount', 0, 10000000, 'Principal amount must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('age', 0, 120, 'Age must be between 0 and 120'),
    ValidationRuleFactory.range('lifeExpectancy', 0, 120, 'Life expectancy must be between 0 and 120'),
    ValidationRuleFactory.range('interestRate', 0, 20, 'Interest rate must be between 0% and 20%'),
    ValidationRuleFactory.range('guaranteePeriod', 0, 40, 'Guarantee period must be between 0 and 40 years'),
    ValidationRuleFactory.businessRule(
      'lifeExpectancy',
      (lifeExpectancy, allInputs) => {
        if (!allInputs?.age) return true;
        return lifeExpectancy > allInputs.age;
      },
      'Life expectancy must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'jointAge',
      (jointAge, allInputs) => {
        if (!allInputs?.payoutType || allInputs.payoutType !== 'joint-life') return true;
        return jointAge !== undefined && jointAge >= 0 && jointAge <= 120;
      },
      'Joint age is required for joint-life payout'
    ),
    ValidationRuleFactory.businessRule(
      'jointGender',
      (jointGender, allInputs) => {
        if (!allInputs?.payoutType || allInputs.payoutType !== 'joint-life') return true;
        return jointGender !== undefined;
      },
      'Joint gender is required for joint-life payout'
    )
  ],

  examples: [
    {
      title: 'Single Life Immediate Annuity',
      description: 'Standard single-life annuity with monthly payouts',
      inputs: {
        principalAmount: 500000,
        age: 65,
        gender: 'male',
        payoutType: 'single-life',
        payoutFrequency: 'monthly',
        annuityType: 'fixed',
        guaranteePeriod: 10,
        inflationRate: 2.5,
        interestRate: 4,
        lifeExpectancy: 85
      },
      expectedOutputs: {
        monthlyPayout: 2500,
        annualPayout: 30000,
        totalPayments: 240,
        totalPayoutAmount: 600000,
        payoutDuration: 20,
        remainingPrincipal: 0,
        effectiveYield: 3.5,
        breakEvenPoint: 200,
        survivorBenefit: 0
      }
    },
    {
      title: 'Joint Life with Guarantee',
      description: 'Joint-life annuity with 10-year guarantee period',
      inputs: {
        principalAmount: 600000,
        age: 65,
        gender: 'female',
        payoutType: 'joint-life',
        payoutFrequency: 'monthly',
        annuityType: 'inflation-adjusted',
        guaranteePeriod: 10,
        jointAge: 62,
        jointGender: 'male',
        inflationRate: 2.5,
        interestRate: 3.5,
        lifeExpectancy: 88
      },
      expectedOutputs: {
        monthlyPayout: 2200,
        annualPayout: 26400,
        totalPayments: 276,
        totalPayoutAmount: 607200,
        payoutDuration: 23,
        remainingPrincipal: 0,
        effectiveYield: 3.2,
        breakEvenPoint: 273,
        survivorBenefit: 1320
      }
    }
  ]
};