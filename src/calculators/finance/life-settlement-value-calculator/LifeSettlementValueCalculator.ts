import { Calculator } from '../../../types/calculator';
import { calculateLifeSettlement } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const lifeSettlementValueCalculator: Calculator = {
  id: 'life-settlement-value-calculator',
  title: 'Life Settlement Value Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate the value of life insurance policy settlements, determine optimal settlement timing, and analyze settlement offers with comprehensive risk assessment and tax implications.',

  usageInstructions: [
    'Enter policy details and current settlement offer',
    'Specify health status and life expectancy',
    'Review settlement analysis and risk assessment',
    'Compare settlement value with continued policy ownership'
  ],

  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'number',
      required: true,
      placeholder: '70',
      tooltip: 'Your current age',
      defaultValue: 70,
      min: 0,
      max: 120
    },
    {
      id: 'lifeExpectancy',
      label: 'Life Expectancy',
      type: 'number',
      required: true,
      placeholder: '85',
      tooltip: 'Estimated life expectancy in years',
      defaultValue: 85,
      min: 1,
      max: 120
    },
    {
      id: 'deathBenefit',
      label: 'Death Benefit',
      type: 'currency',
      required: true,
      placeholder: '500000',
      tooltip: 'Policy death benefit amount',
      defaultValue: 500000,
      min: 0,
      max: 10000000
    },
    {
      id: 'annualPremium',
      label: 'Annual Premium',
      type: 'currency',
      required: true,
      placeholder: '8000',
      tooltip: 'Annual premium cost',
      defaultValue: 8000,
      min: 0,
      max: 100000
    },
    {
      id: 'policyType',
      label: 'Policy Type',
      type: 'select',
      required: true,
      options: [
        { value: 'term', label: 'Term Life' },
        { value: 'whole', label: 'Whole Life' },
        { value: 'universal', label: 'Universal Life' },
        { value: 'variable', label: 'Variable Life' }
      ],
      tooltip: 'Type of life insurance policy',
      defaultValue: 'whole'
    },
    {
      id: 'healthStatus',
      label: 'Health Status',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      tooltip: 'Current health condition',
      defaultValue: 'good'
    },
    {
      id: 'settlementOffer',
      label: 'Settlement Offer',
      type: 'currency',
      required: true,
      placeholder: '200000',
      tooltip: 'Settlement offer amount',
      defaultValue: 200000,
      min: 0,
      max: 5000000
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '5',
      tooltip: 'Rate used for present value calculations',
      defaultValue: 5,
      min: -10,
      max: 20,
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
      id: 'taxRate',
      label: 'Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '25',
      tooltip: 'Applicable tax rate on settlement',
      defaultValue: 25,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'settlementCosts',
      label: 'Settlement Costs',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Costs associated with settlement process',
      defaultValue: 5000,
      min: 0,
      max: 50000
    },
    {
      id: 'remainingTerm',
      label: 'Remaining Term (Years)',
      type: 'number',
      required: true,
      placeholder: '15',
      tooltip: 'Years remaining on policy term',
      defaultValue: 15,
      min: 0,
      max: 100
    }
  ],

  outputs: [
    {
      id: 'netSettlementValue',
      label: 'Net Settlement Value',
      type: 'currency',
      explanation: 'Settlement amount after costs'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to recover settlement costs through premium savings'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return (%)',
      type: 'percentage',
      explanation: 'Annual return on settlement investment'
    },
    {
      id: 'presentValueOfPremiums',
      label: 'Present Value of Premiums',
      type: 'currency',
      explanation: 'Current value of future premium payments'
    },
    {
      id: 'settlementEfficiency',
      label: 'Settlement Efficiency (%)',
      type: 'percentage',
      explanation: 'Efficiency of settlement vs. continued ownership'
    },
    {
      id: 'taxLiability',
      label: 'Tax Liability',
      type: 'currency',
      explanation: 'Taxes owed on settlement proceeds'
    },
    {
      id: 'netAfterTaxValue',
      label: 'Net After-Tax Value',
      type: 'currency',
      explanation: 'Settlement value after taxes'
    },
    {
      id: 'monthlyIncome',
      label: 'Monthly Income',
      type: 'currency',
      explanation: 'Monthly income if settlement is invested'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk level of settlement'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('currentAge', 'Current age is required'),
    ValidationRuleFactory.required('lifeExpectancy', 'Life expectancy is required'),
    ValidationRuleFactory.required('deathBenefit', 'Death benefit is required'),
    ValidationRuleFactory.required('annualPremium', 'Annual premium is required'),
    ValidationRuleFactory.required('policyType', 'Policy type is required'),
    ValidationRuleFactory.required('healthStatus', 'Health status is required'),
    ValidationRuleFactory.required('settlementOffer', 'Settlement offer is required'),
    ValidationRuleFactory.required('discountRate', 'Discount rate is required'),
    ValidationRuleFactory.required('taxRate', 'Tax rate is required'),
    ValidationRuleFactory.required('remainingTerm', 'Remaining term is required'),
    ValidationRuleFactory.range('currentAge', 0, 120, 'Current age must be between 0 and 120'),
    ValidationRuleFactory.range('lifeExpectancy', 1, 120, 'Life expectancy must be between 1 and 120'),
    ValidationRuleFactory.range('deathBenefit', 0, 10000000, 'Death benefit must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('annualPremium', 0, 100000, 'Annual premium must be between $0 and $100,000'),
    ValidationRuleFactory.range('settlementOffer', 0, 5000000, 'Settlement offer must be between $0 and $5,000,000'),
    ValidationRuleFactory.range('discountRate', -10, 20, 'Discount rate must be between -10% and 20%'),
    ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
    ValidationRuleFactory.range('remainingTerm', 0, 100, 'Remaining term must be between 0 and 100'),
    ValidationRuleFactory.businessRule(
      'lifeExpectancy',
      (lifeExpectancy, allInputs) => {
        if (!allInputs?.currentAge) return true;
        return lifeExpectancy > allInputs.currentAge;
      },
      'Life expectancy must be greater than current age'
    ),
    ValidationRuleFactory.businessRule(
      'settlementOffer',
      (settlementOffer, allInputs) => {
        if (!allInputs?.deathBenefit) return true;
        return settlementOffer <= allInputs.deathBenefit * 1.5; // Settlement shouldn't exceed 150% of death benefit
      },
      'Settlement offer seems unusually high relative to death benefit'
    )
  ],

  examples: [
    {
      title: 'Senior Life Settlement',
      description: 'Life settlement analysis for a 75-year-old with whole life policy',
      inputs: {
        currentAge: 75,
        lifeExpectancy: 85,
        deathBenefit: 500000,
        annualPremium: 8000,
        policyType: 'whole',
        healthStatus: 'fair',
        settlementOffer: 200000,
        discountRate: 5,
        inflationRate: 2.5,
        taxRate: 25,
        settlementCosts: 5000,
        remainingTerm: 10
      },
      expectedOutputs: {
        netSettlementValue: 195000,
        breakEvenPeriod: 24,
        internalRateOfReturn: 0.042,
        presentValueOfPremiums: 60000,
        settlementEfficiency: 333,
        taxLiability: 9750,
        netAfterTaxValue: 185250,
        monthlyIncome: 770,
        riskAssessment: 'Medium'
      }
    },
    {
      title: 'Term Life Settlement',
      description: 'Settlement analysis for term life policy with poor health',
      inputs: {
        currentAge: 65,
        lifeExpectancy: 75,
        deathBenefit: 1000000,
        annualPremium: 15000,
        policyType: 'term',
        healthStatus: 'poor',
        settlementOffer: 150000,
        discountRate: 6,
        inflationRate: 2.5,
        taxRate: 30,
        settlementCosts: 3000,
        remainingTerm: 10
      },
      expectedOutputs: {
        netSettlementValue: 147000,
        breakEvenPeriod: 10,
        internalRateOfReturn: 0.038,
        presentValueOfPremiums: 95000,
        settlementEfficiency: 155,
        taxLiability: 7350,
        netAfterTaxValue: 139650,
        monthlyIncome: 581,
        riskAssessment: 'High'
      }
    }
  ]
};