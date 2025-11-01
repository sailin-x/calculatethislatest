import { Calculator } from '../../types/calculator';
import { calculateGRAT } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const grantorRetainedAnnuityTrustCalculator: Calculator = {
  id: 'GrantorRetainedAnnuity-TrustGratCalculator',
  title: 'Grantor Retained Annuity Trust (GRAT) Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate GRAT performance, annuity payments, remainder values, and tax implications for estate planning with comprehensive GRAT analysis and optimization strategies.',

  usageInstructions: [
    'Enter the initial trust value and annuity rate',
    'Specify term length and growth assumptions',
    'Select trust type and tax parameters',
    'Review annuity payments and tax implications'
  ],

  inputs: [
    {
      id: 'initialValue',
      label: 'Initial Trust Value',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Total value transferred to the GRAT',
      defaultValue: 1000000,
      min: 0,
      max: 100000000
    },
    {
      id: 'annuityRate',
      label: 'Annuity Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '7.5',
      tooltip: 'Annual annuity payment as percentage of initial value',
      defaultValue: 7.5,
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      id: 'termYears',
      label: 'Term (Years)',
      type: 'number',
      required: true,
      placeholder: '5',
      tooltip: 'Length of the GRAT term',
      defaultValue: 5,
      min: 1,
      max: 20
    },
    {
      id: 'growthRate',
      label: 'Asset Growth Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '8',
      tooltip: 'Expected annual growth rate of trust assets',
      defaultValue: 8,
      min: -20,
      max: 50,
      step: 0.5
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '6',
      tooltip: 'Rate used to calculate present value',
      defaultValue: 6,
      min: 0,
      max: 30,
      step: 0.5
    },
    {
      id: 'gstTaxRate',
      label: 'GST Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '40',
      tooltip: 'Generation-skipping transfer tax rate',
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'estateTaxRate',
      label: 'Estate Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '40',
      tooltip: 'Federal estate tax rate',
      defaultValue: 40,
      min: 0,
      max: 100,
      step: 5
    },
    {
      id: 'includeStateTax',
      label: 'Include State Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Include state-level estate tax calculations',
      defaultValue: false
    },
    {
      id: 'stateTaxRate',
      label: 'State Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'State estate tax rate',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 0.5
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
      id: 'trustType',
      label: 'Trust Type',
      type: 'select',
      required: true,
      options: [
        { value: 'standard', label: 'Standard GRAT' },
        { value: 'zeroed-out', label: 'Zeroed-Out GRAT' },
        { value: 'rollover', label: 'Rollover GRAT' }
      ],
      tooltip: 'Type of GRAT structure',
      defaultValue: 'standard'
    }
  ],

  outputs: [
    {
      id: 'annuityPayment',
      label: 'Annual Annuity Payment',
      type: 'currency',
      explanation: 'Annual payment received from the GRAT'
    },
    {
      id: 'remainderValue',
      label: 'Remainder Value',
      type: 'currency',
      explanation: 'Value remaining in trust at term end'
    },
    {
      id: 'gstTaxLiability',
      label: 'GST Tax Liability',
      type: 'currency',
      explanation: 'Generation-skipping transfer tax owed'
    },
    {
      id: 'estateTaxLiability',
      label: 'Estate Tax Liability',
      type: 'currency',
      explanation: 'Estate tax if trust fails'
    },
    {
      id: 'totalTaxLiability',
      label: 'Total Tax Liability',
      type: 'currency',
      explanation: 'Combined GST and estate tax'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Value transferred minus taxes'
    },
    {
      id: 'internalRateOfReturn',
      label: 'Internal Rate of Return',
      type: 'percentage',
      explanation: 'IRR of the GRAT investment'
    },
    {
      id: 'breakEvenPoint',
      label: 'Break-Even Point',
      type: 'currency',
      explanation: 'Point where benefits equal costs'
    },
    {
      id: 'optimalStrategy',
      label: 'Optimal Strategy',
      type: 'text',
      explanation: 'Recommended GRAT strategy'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('initialValue', 'Initial value is required'),
    ValidationRuleFactory.required('annuityRate', 'Annuity rate is required'),
    ValidationRuleFactory.required('termYears', 'Term years is required'),
    ValidationRuleFactory.required('growthRate', 'Growth rate is required'),
    ValidationRuleFactory.required('discountRate', 'Discount rate is required'),
    ValidationRuleFactory.required('gstTaxRate', 'GST tax rate is required'),
    ValidationRuleFactory.required('estateTaxRate', 'Estate tax rate is required'),
    ValidationRuleFactory.required('trustType', 'Trust type is required'),
    ValidationRuleFactory.range('initialValue', 0, 100000000, 'Initial value must be between $0 and $100,000,000'),
    ValidationRuleFactory.range('annuityRate', 0, 50, 'Annuity rate must be between 0% and 50%'),
    ValidationRuleFactory.range('termYears', 1, 20, 'Term years must be between 1 and 20'),
    ValidationRuleFactory.range('growthRate', -20, 50, 'Growth rate must be between -20% and 50%'),
    ValidationRuleFactory.range('discountRate', 0, 30, 'Discount rate must be between 0% and 30%'),
    ValidationRuleFactory.range('gstTaxRate', 0, 100, 'GST tax rate must be between 0% and 100%'),
    ValidationRuleFactory.range('estateTaxRate', 0, 100, 'Estate tax rate must be between 0% and 100%'),
    ValidationRuleFactory.businessRule(
      'annuityRate',
      (annuityRate, allInputs) => {
        if (!allInputs?.termYears) return true;
        return annuityRate > 0 && annuityRate <= 100 / allInputs.termYears;
      },
      'Annuity rate too high for term length'
    )
  ],

  examples: [
    {
      title: 'Standard GRAT',
      description: 'Traditional GRAT with moderate annuity rate',
      inputs: {
        initialValue: 1000000,
        annuityRate: 7.5,
        termYears: 5,
        growthRate: 8,
        discountRate: 6,
        gstTaxRate: 40,
        estateTaxRate: 40,
        includeStateTax: false,
        stateTaxRate: 5,
        inflationRate: 2.5,
        trustType: 'standard'
      },
      expectedOutputs: {
        annuityPayment: 75000,
        remainderValue: 1460000,
        gstTaxLiability: 155200,
        estateTaxLiability: 62080,
        totalTaxLiability: 217280,
        netBenefit: 1242720,
        internalRateOfReturn: 4.6,
        breakEvenPoint: 28970,
        optimalStrategy: 'Standard GRAT structure'
      }
    },
    {
      title: 'Zeroed-Out GRAT',
      description: 'Aggressive GRAT with minimal annuity',
      inputs: {
        initialValue: 1000000,
        annuityRate: 2.1,
        termYears: 3,
        growthRate: 10,
        discountRate: 5,
        gstTaxRate: 40,
        estateTaxRate: 40,
        includeStateTax: true,
        stateTaxRate: 5,
        inflationRate: 2.5,
        trustType: 'zeroed-out'
      },
      expectedOutputs: {
        annuityPayment: 21000,
        remainderValue: 1290000,
        gstTaxLiability: 206400,
        estateTaxLiability: 103200,
        totalTaxLiability: 309600,
        netBenefit: 980400,
        internalRateOfReturn: 9.0,
        breakEvenPoint: 147600,
        optimalStrategy: 'Zeroed-out GRAT for maximum transfer'
      }
    }
  ]
};