import { Calculator } from '../../../types/calculator';
import { calculateRetirementAbroad } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const retirementAbroadCalculator: Calculator = {
  id: 'retirement-abroad-calculator',
  title: 'Retirement Abroad Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate retirement costs and savings requirements for living abroad, including healthcare, housing, cost of living adjustments, and tax implications for popular retirement destinations.',

  usageInstructions: [
    'Enter your current age and retirement plans',
    'Select target country and residency type',
    'Review cost projections and savings requirements',
    'Compare different countries and scenarios'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '55',
      tooltip: 'Your current age',
      defaultValue: 55,
      min: 0,
      max: 120
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'number',
      required: true,
      placeholder: '65',
      tooltip: 'Age you plan to retire',
      defaultValue: 65,
      min: 1,
      max: 120
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Total retirement savings',
      defaultValue: 500000,
      min: 0,
      max: 10000000
    },
    {
      id: 'monthlyRetirementIncome',
      label: 'Monthly Retirement Income',
      type: 'currency',
      required: true,
      placeholder: '3000',
      tooltip: 'Monthly income from pensions, Social Security, etc.',
      defaultValue: 3000,
      min: 0,
      max: 50000
    },
    {
      id: 'targetCountry',
      label: 'Target Country',
      type: 'select',
      required: true,
      options: [
        { value: 'portugal', label: 'Portugal' },
        { value: 'spain', label: 'Spain' },
        { value: 'mexico', label: 'Mexico' },
        { value: 'panama', label: 'Panama' },
        { value: 'thailand', label: 'Thailand' },
        { value: 'malaysia', label: 'Malaysia' },
        { value: 'costa_rica', label: 'Costa Rica' },
        { value: 'ecuador', label: 'Ecuador' },
        { value: 'uruguay', label: 'Uruguay' },
        { value: 'chile', label: 'Chile' }
      ],
      tooltip: 'Country you plan to retire in',
      defaultValue: 'portugal'
    },
    {
      id: 'residencyType',
      label: 'Residency Type',
      type: 'select',
      required: true,
      options: [
        { value: 'temporary', label: 'Temporary (Visa)' },
        { value: 'permanent', label: 'Permanent Resident' },
        { value: 'citizenship', label: 'Citizenship' }
      ],
      tooltip: 'Type of residency you plan to obtain',
      defaultValue: 'temporary'
    },
    {
      id: 'includeHealthcare',
      label: 'Include Healthcare',
      type: 'boolean',
      required: false,
      tooltip: 'Include healthcare costs in calculations',
      defaultValue: true
    },
    {
      id: 'healthcareCost',
      label: 'Monthly Healthcare Cost',
      type: 'currency',
      required: false,
      placeholder: '500',
      tooltip: 'Monthly healthcare insurance/premiums',
      defaultValue: 500,
      min: 0,
      max: 10000
    },
    {
      id: 'housingCost',
      label: 'Monthly Housing Cost',
      type: 'currency',
      required: true,
      placeholder: '1200',
      tooltip: 'Monthly housing/rent costs',
      defaultValue: 1200,
      min: 0,
      max: 10000
    },
    {
      id: 'costOfLivingAdjustment',
      label: 'Cost of Living Adjustment (%)',
      type: 'percentage',
      required: false,
      placeholder: '20',
      tooltip: 'Additional cost adjustment for lifestyle',
      defaultValue: 20,
      min: -50,
      max: 200,
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
      id: 'currencyExchangeRate',
      label: 'Currency Exchange Rate',
      type: 'number',
      required: false,
      placeholder: '1.1',
      tooltip: 'Exchange rate (local currency per USD)',
      defaultValue: 1.1,
      min: 0.1,
      max: 10,
      step: 0.1
    },
    {
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Your marginal tax rate',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 5
    }
  ],

  outputs: [
    {
      id: 'totalRetirementSavings',
      label: 'Total Retirement Savings',
      type: 'currency',
      explanation: 'Projected savings at retirement'
    },
    {
      id: 'annualRetirementCost',
      label: 'Annual Retirement Cost',
      type: 'currency',
      explanation: 'Total annual cost of retirement abroad'
    },
    {
      id: 'monthlyRetirementCost',
      label: 'Monthly Retirement Cost',
      type: 'currency',
      explanation: 'Monthly cost breakdown'
    },
    {
      id: 'yearsOfRetirement',
      label: 'Years of Retirement',
      type: 'number',
      explanation: 'Years your savings will last'
    },
    {
      id: 'savingsShortfall',
      label: 'Savings Shortfall',
      type: 'currency',
      explanation: 'Additional savings needed'
    },
    {
      id: 'healthcareCosts',
      label: 'Healthcare Costs',
      type: 'currency',
      explanation: 'Annual healthcare expenses'
    },
    {
      id: 'housingCosts',
      label: 'Housing Costs',
      type: 'currency',
      explanation: 'Annual housing expenses'
    },
    {
      id: 'totalAnnualExpenses',
      label: 'Total Annual Expenses',
      type: 'currency',
      explanation: 'Complete annual expense breakdown'
    },
    {
      id: 'netMonthlyIncome',
      label: 'Net Monthly Income',
      type: 'currency',
      explanation: 'Income after taxes'
    },
    {
      id: 'retirementReadiness',
      label: 'Retirement Readiness',
      type: 'text',
      explanation: 'Assessment of retirement preparedness'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('retirementAge', 'Retirement age is required'),
    ValidationRuleFactory.required('currentSavings', 'Current savings is required'),
    ValidationRuleFactory.required('monthlyRetirementIncome', 'Monthly retirement income is required'),
    ValidationRuleFactory.required('targetCountry', 'Target country is required'),
    ValidationRuleFactory.required('residencyType', 'Residency type is required'),
    ValidationRuleFactory.required('housingCost', 'Housing cost is required'),
    ValidationRuleFactory.required('expectedReturn', 'Expected return is required'),
    ValidationRuleFactory.required('taxRate', 'Tax rate is required'),
    ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
    ValidationRuleFactory.range('retirementAge', 1, 120, 'Retirement age must be between 1 and 120'),
    ValidationRuleFactory.range('currentSavings', 0, 10000000, 'Current savings must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('monthlyRetirementIncome', 0, 50000, 'Monthly retirement income must be between $0 and $50,000'),
    ValidationRuleFactory.range('healthcareCost', 0, 10000, 'Healthcare cost must be between $0 and $10,000'),
    ValidationRuleFactory.range('housingCost', 0, 10000, 'Housing cost must be between $0 and $10,000'),
    ValidationRuleFactory.range('expectedReturn', -20, 50, 'Expected return must be between -20% and 50%'),
    ValidationRuleFactory.range('inflationRate', -10, 20, 'Inflation rate must be between -10% and 20%'),
    ValidationRuleFactory.range('currencyExchangeRate', 0.1, 10, 'Currency exchange rate must be between 0.1 and 10'),
    ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
    ValidationRuleFactory.businessRule(
      'retirementAge',
      (retirementAge, allInputs) => {
        if (!allInputs?.currentAge) return true;
        return retirementAge > allInputs.currentAge;
      },
      'Retirement age must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'healthcareCost',
      (healthcareCost, allInputs) => {
        if (!allInputs?.includeHealthcare) return true;
        return healthcareCost >= 0;
      },
      'Healthcare cost must be provided when healthcare is included'
    )
  ],

  examples: [
    {
      title: 'Portugal Retirement',
      description: 'Retiring to Portugal with moderate lifestyle',
      inputs: {
        currentAge: 55,
        retirementAge: 65,
        currentSavings: 500000,
        monthlyRetirementIncome: 3000,
        targetCountry: 'portugal',
        residencyType: 'temporary',
        includeHealthcare: true,
        healthcareCost: 400,
        housingCost: 1200,
        costOfLivingAdjustment: 20,
        expectedReturn: 6,
        inflationRate: 2.5,
        currencyExchangeRate: 0.9,
        taxRate: 25
      },
      expectedOutputs: {
        totalRetirementSavings: 895000,
        annualRetirementCost: 42000,
        monthlyRetirementCost: 3500,
        yearsOfRetirement: 25,
        savingsShortfall: 0,
        healthcareCosts: 4800,
        housingCosts: 14400,
        totalAnnualExpenses: 42000,
        netMonthlyIncome: 2250,
        retirementReadiness: 'Well-funded for retirement abroad'
      }
    },
    {
      title: 'Thailand Retirement',
      description: 'Budget retirement in Thailand',
      inputs: {
        currentAge: 60,
        retirementAge: 65,
        currentSavings: 300000,
        monthlyRetirementIncome: 2000,
        targetCountry: 'thailand',
        residencyType: 'temporary',
        includeHealthcare: true,
        healthcareCost: 300,
        housingCost: 800,
        costOfLivingAdjustment: 10,
        expectedReturn: 5,
        inflationRate: 3,
        currencyExchangeRate: 36,
        taxRate: 20
      },
      expectedOutputs: {
        totalRetirementSavings: 382000,
        annualRetirementCost: 24000,
        monthlyRetirementCost: 2000,
        yearsOfRetirement: 20,
        savingsShortfall: 15000,
        healthcareCosts: 3600,
        housingCosts: 9600,
        totalAnnualExpenses: 24000,
        netMonthlyIncome: 1600,
        retirementReadiness: 'Adequately funded - consider cost reductions'
      }
    }
  ]
};