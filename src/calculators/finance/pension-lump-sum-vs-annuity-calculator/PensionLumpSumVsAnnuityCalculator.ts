import { Calculator } from '../../../types/calculator';
import { calculatePensionComparison } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const pensionLumpSumVsAnnuityCalculator: Calculator = {
  id: 'pension-lump-sum-vs-annuity-calculator',
  title: 'Pension Lump Sum vs. Annuity Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Compare pension lump sum payments vs. annuity payments, including present value analysis, risk assessment, and personalized recommendations for retirement income planning.',

  usageInstructions: [
    'Enter your pension lump sum offer and annuity payment details',
    'Specify your age, life expectancy, and risk tolerance',
    'Review present value comparisons and risk assessments',
    'Compare monthly income options and long-term benefits'
  ],

  inputs: [
    {
      id: 'lumpSumAmount',
      label: 'Lump Sum Amount',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Total lump sum pension payment offered',
      defaultValue: 500000,
      min: 0,
      max: 10000000
    },
    {
      id: 'annualAnnuityPayment',
      label: 'Annual Annuity Payment',
      type: 'currency',
      required: true,
      placeholder: '30000',
      tooltip: 'Annual annuity payment amount',
      defaultValue: 30000,
      min: 0,
      max: 1000000
    },
    {
      id: 'currentAge',
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
      id: 'expectedReturn',
      label: 'Expected Investment Return (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Expected annual return on lump sum investment',
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
      id: 'annuityType',
      label: 'Annuity Type',
      type: 'select',
      required: true,
      options: [
        { value: 'fixed', label: 'Fixed Annuity' },
        { value: 'variable', label: 'Variable Annuity' },
        { value: 'inflation_adjusted', label: 'Inflation-Adjusted Annuity' }
      ],
      tooltip: 'Type of annuity payment structure',
      defaultValue: 'fixed'
    },
    {
      id: 'includeSpouse',
      label: 'Include Spouse Benefits',
      type: 'boolean',
      required: false,
      tooltip: 'Include spouse in calculations',
      defaultValue: false
    },
    {
      id: 'spouseAge',
      label: 'Spouse Age',
      type: 'number',
      required: false,
      placeholder: '62',
      tooltip: 'Spouse current age',
      defaultValue: 62,
      min: 0,
      max: 120
    },
    {
      id: 'spouseLifeExpectancy',
      label: 'Spouse Life Expectancy',
      type: 'number',
      required: false,
      placeholder: '82',
      tooltip: 'Spouse estimated life expectancy',
      defaultValue: 82,
      min: 1,
      max: 120
    },
    {
      id: 'riskTolerance',
      label: 'Risk Tolerance',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      tooltip: 'Your risk tolerance for investments',
      defaultValue: 'medium'
    }
  ],

  outputs: [
    {
      id: 'lumpSumPresentValue',
      label: 'Lump Sum Present Value',
      type: 'currency',
      explanation: 'Present value of lump sum after taxes'
    },
    {
      id: 'annuityPresentValue',
      label: 'Annuity Present Value',
      type: 'currency',
      explanation: 'Present value of annuity payments'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Difference between lump sum and annuity values'
    },
    {
      id: 'breakEvenYears',
      label: 'Break-Even Years',
      type: 'number',
      explanation: 'Years needed to break even with lump sum'
    },
    {
      id: 'lumpSumMonthlyIncome',
      label: 'Lump Sum Monthly Income',
      type: 'currency',
      explanation: 'Estimated monthly income from lump sum'
    },
    {
      id: 'annuityMonthlyIncome',
      label: 'Annuity Monthly Income',
      type: 'currency',
      explanation: 'Monthly annuity payment'
    },
    {
      id: 'riskAdjustedValue',
      label: 'Risk-Adjusted Value',
      type: 'currency',
      explanation: 'Value adjusted for risk tolerance'
    },
    {
      id: 'recommendedChoice',
      label: 'Recommended Choice',
      type: 'text',
      explanation: 'Recommended option based on analysis'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('lumpSumAmount', 'Lump sum amount is required'),
    ValidationRuleFactory.required('annualAnnuityPayment', 'Annual annuity payment is required'),
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('taxBracket', 'Tax bracket is required'),
    ValidationRuleFactory.required('annuityType', 'Annuity type is required'),
    ValidationRuleFactory.required('riskTolerance', 'Risk tolerance is required'),
    ValidationRuleFactory.range('lumpSumAmount', 0, 10000000, 'Lump sum amount must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('annualAnnuityPayment', 0, 1000000, 'Annual annuity payment must be between $0 and $1,000,000'),
    ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
    ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('taxBracket', 0, 50, 'Tax bracket must be between 0% and 50%'),
    ValidationRuleFactory.businessRule(
      'lifeExpectancy',
      (lifeExpectancy, allInputs) => {
        if (!allInputs?.currentAge) return true;
        return lifeExpectancy > allInputs.currentAge;
      },
      'Life expectancy must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'spouseLifeExpectancy',
      (spouseLifeExpectancy, allInputs) => {
        if (!allInputs?.includeSpouse || !allInputs?.spouseAge) return true;
        return spouseLifeExpectancy > allInputs.spouseAge;
      },
      'Spouse life expectancy must be greater than spouse age'
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
      title: 'Conservative Retiree',
      description: '65-year-old retiree comparing lump sum vs. annuity with low risk tolerance',
      inputs: {
        lumpSumAmount: 500000,
        annualAnnuityPayment: 25000,
        currentAge: 65,
        lifeExpectancy: 85,
        expectedReturn: 5,
        inflationRate: 2.5,
        taxBracket: 25,
        annuityType: 'fixed',
        includeSpouse: false,
        spouseAge: 62,
        spouseLifeExpectancy: 82,
        riskTolerance: 'low'
      },
      expectedOutputs: {
        lumpSumPresentValue: 375000,
        annuityPresentValue: 350000,
        netBenefit: 25000,
        breakEvenYears: 15,
        lumpSumMonthlyIncome: 1875,
        annuityMonthlyIncome: 2083,
        riskAdjustedValue: 300000,
        recommendedChoice: 'Annuity'
      }
    },
    {
      title: 'Aggressive Investor',
      description: '60-year-old with high risk tolerance comparing investment options',
      inputs: {
        lumpSumAmount: 750000,
        annualAnnuityPayment: 35000,
        currentAge: 60,
        lifeExpectancy: 90,
        expectedReturn: 8,
        inflationRate: 2.5,
        taxBracket: 30,
        annuityType: 'variable',
        includeSpouse: true,
        spouseAge: 58,
        spouseLifeExpectancy: 88,
        riskTolerance: 'high'
      },
      expectedOutputs: {
        lumpSumPresentValue: 525000,
        annuityPresentValue: 480000,
        netBenefit: 45000,
        breakEvenYears: 12,
        lumpSumMonthlyIncome: 2625,
        annuityMonthlyIncome: 2917,
        riskAdjustedValue: 630000,
        recommendedChoice: 'Lump Sum'
      }
    }
  ]
};