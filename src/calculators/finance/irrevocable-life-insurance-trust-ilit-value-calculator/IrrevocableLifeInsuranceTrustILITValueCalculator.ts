import { Calculator } from '../../../types/calculator';
import { calculateILIT } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

export const irrevocableLifeInsuranceTrustILITValueCalculator: Calculator = {
  id: 'irrevocable-life-insurance-trust-ilit-value-calculator',
  title: 'Irrevocable Life Insurance Trust (ILIT) Value Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Calculate the value and benefits of an Irrevocable Life Insurance Trust (ILIT), including tax savings, estate planning benefits, and beneficiary protection with comprehensive trust analysis.',

  usageInstructions: [
    'Enter trust details and insurance information',
    'Specify beneficiary and tax parameters',
    'Select trust type and state considerations',
    'Review tax savings and estate planning benefits'
  ],

  inputs: [
    {
      id: 'trustValue',
      label: 'Current Trust Value',
      type: 'currency',
      required: true,
      placeholder: '100000',
      tooltip: 'Current value of assets in the ILIT',
      defaultValue: 100000,
      min: 0,
      max: 10000000
    },
    {
      id: 'annualPremium',
      label: 'Annual Premium',
      type: 'currency',
      required: true,
      placeholder: '5000',
      tooltip: 'Annual life insurance premium paid to the trust',
      defaultValue: 5000,
      min: 0,
      max: 100000
    },
    {
      id: 'deathBenefit',
      label: 'Death Benefit',
      type: 'currency',
      required: true,
      placeholder: '1000000',
      tooltip: 'Life insurance death benefit amount',
      defaultValue: 1000000,
      min: 0,
      max: 50000000
    },
    {
      id: 'trustDuration',
      label: 'Trust Duration (Years)',
      type: 'number',
      required: true,
      placeholder: '20',
      tooltip: 'Expected duration of the trust',
      defaultValue: 20,
      min: 1,
      max: 100
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '3',
      tooltip: 'Rate used to discount future values',
      defaultValue: 3,
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
      label: 'Estate Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '40',
      tooltip: 'Applicable estate tax rate',
      defaultValue: 40,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'administrativeCosts',
      label: 'Annual Administrative Costs',
      type: 'currency',
      required: false,
      placeholder: '2000',
      tooltip: 'Annual trust administration costs',
      defaultValue: 2000,
      min: 0,
      max: 50000
    },
    {
      id: 'numberOfBeneficiaries',
      label: 'Number of Beneficiaries',
      type: 'number',
      required: true,
      placeholder: '3',
      tooltip: 'Number of trust beneficiaries',
      defaultValue: 3,
      min: 1,
      max: 50
    },
    {
      id: 'trustType',
      label: 'Trust Type',
      type: 'select',
      required: true,
      options: [
        { value: 'life-insurance', label: 'Life Insurance Trust' },
        { value: 'charitable-remainder', label: 'Charitable Remainder Trust' },
        { value: 'grantor', label: 'Grantor Trust' }
      ],
      tooltip: 'Type of irrevocable trust',
      defaultValue: 'life-insurance'
    },
    {
      id: 'includeCrummeyPowers',
      label: 'Include Crummey Powers',
      type: 'boolean',
      required: false,
      tooltip: 'Whether the trust includes Crummey withdrawal powers',
      defaultValue: true
    },
    {
      id: 'stateOfResidence',
      label: 'State of Residence',
      type: 'select',
      required: true,
      options: [
        { value: 'Alabama', label: 'Alabama' },
        { value: 'Alaska', label: 'Alaska' },
        { value: 'Arizona', label: 'Arizona' },
        { value: 'Arkansas', label: 'Arkansas' },
        { value: 'California', label: 'California' },
        { value: 'Colorado', label: 'Colorado' },
        { value: 'Connecticut', label: 'Connecticut' },
        { value: 'Delaware', label: 'Delaware' },
        { value: 'Florida', label: 'Florida' },
        { value: 'Georgia', label: 'Georgia' },
        { value: 'Hawaii', label: 'Hawaii' },
        { value: 'Idaho', label: 'Idaho' },
        { value: 'Illinois', label: 'Illinois' },
        { value: 'Indiana', label: 'Indiana' },
        { value: 'Iowa', label: 'Iowa' },
        { value: 'Kansas', label: 'Kansas' },
        { value: 'Kentucky', label: 'Kentucky' },
        { value: 'Louisiana', label: 'Louisiana' },
        { value: 'Maine', label: 'Maine' },
        { value: 'Maryland', label: 'Maryland' },
        { value: 'Massachusetts', label: 'Massachusetts' },
        { value: 'Michigan', label: 'Michigan' },
        { value: 'Minnesota', label: 'Minnesota' },
        { value: 'Mississippi', label: 'Mississippi' },
        { value: 'Missouri', label: 'Missouri' },
        { value: 'Montana', label: 'Montana' },
        { value: 'Nebraska', label: 'Nebraska' },
        { value: 'Nevada', label: 'Nevada' },
        { value: 'New Hampshire', label: 'New Hampshire' },
        { value: 'New Jersey', label: 'New Jersey' },
        { value: 'New Mexico', label: 'New Mexico' },
        { value: 'New York', label: 'New York' },
        { value: 'North Carolina', label: 'North Carolina' },
        { value: 'North Dakota', label: 'North Dakota' },
        { value: 'Ohio', label: 'Ohio' },
        { value: 'Oklahoma', label: 'Oklahoma' },
        { value: 'Oregon', label: 'Oregon' },
        { value: 'Pennsylvania', label: 'Pennsylvania' },
        { value: 'Rhode Island', label: 'Rhode Island' },
        { value: 'South Carolina', label: 'South Carolina' },
        { value: 'South Dakota', label: 'South Dakota' },
        { value: 'Tennessee', label: 'Tennessee' },
        { value: 'Texas', label: 'Texas' },
        { value: 'Utah', label: 'Utah' },
        { value: 'Vermont', label: 'Vermont' },
        { value: 'Virginia', label: 'Virginia' },
        { value: 'Washington', label: 'Washington' },
        { value: 'West Virginia', label: 'West Virginia' },
        { value: 'Wisconsin', label: 'Wisconsin' },
        { value: 'Wyoming', label: 'Wyoming' }
      ],
      tooltip: 'State affects estate tax rates and trust laws',
      defaultValue: 'California'
    }
  ],

  outputs: [
    {
      id: 'presentValue',
      label: 'Present Value of Premiums',
      type: 'currency',
      explanation: 'Current value of all future premium payments'
    },
    {
      id: 'futureValue',
      label: 'Future Trust Value',
      type: 'currency',
      explanation: 'Projected value of trust at end of duration'
    },
    {
      id: 'taxSavings',
      label: 'Tax Savings',
      type: 'currency',
      explanation: 'Estate tax savings from ILIT structure'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Total benefit after costs and taxes'
    },
    {
      id: 'beneficiaryShare',
      label: 'Beneficiary Share',
      type: 'currency',
      explanation: 'Amount each beneficiary receives'
    },
    {
      id: 'administrativeCostTotal',
      label: 'Total Administrative Costs',
      type: 'currency',
      explanation: 'Total trust administration costs'
    },
    {
      id: 'effectiveYield',
      label: 'Effective Yield (%)',
      type: 'percentage',
      explanation: 'Annual effective return on trust assets'
    },
    {
      id: 'breakEvenPeriod',
      label: 'Break-Even Period (Years)',
      type: 'number',
      explanation: 'Years to recover initial investment'
    },
    {
      id: 'riskAssessment',
      label: 'Risk Assessment',
      type: 'text',
      explanation: 'Overall risk level of the trust structure'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('trustValue', 'Trust value is required'),
    ValidationRuleFactory.required('annualPremium', 'Annual premium is required'),
    ValidationRuleFactory.required('deathBenefit', 'Death benefit is required'),
    ValidationRuleFactory.required('trustDuration', 'Trust duration is required'),
    ValidationRuleFactory.required('discountRate', 'Discount rate is required'),
    ValidationRuleFactory.required('taxRate', 'Tax rate is required'),
    ValidationRuleFactory.required('numberOfBeneficiaries', 'Number of beneficiaries is required'),
    ValidationRuleFactory.required('trustType', 'Trust type is required'),
    ValidationRuleFactory.required('stateOfResidence', 'State of residence is required'),
    ValidationRuleFactory.range('trustValue', 0, 10000000, 'Trust value must be between $0 and $10,000,000'),
    ValidationRuleFactory.range('annualPremium', 0, 100000, 'Annual premium must be between $0 and $100,000'),
    ValidationRuleFactory.range('deathBenefit', 0, 50000000, 'Death benefit must be between $0 and $50,000,000'),
    ValidationRuleFactory.range('trustDuration', 1, 100, 'Trust duration must be between 1 and 100 years'),
    ValidationRuleFactory.range('discountRate', -10, 20, 'Discount rate must be between -10% and 20%'),
    ValidationRuleFactory.range('taxRate', 0, 50, 'Tax rate must be between 0% and 50%'),
    ValidationRuleFactory.range('numberOfBeneficiaries', 1, 50, 'Number of beneficiaries must be between 1 and 50'),
    ValidationRuleFactory.businessRule(
      'deathBenefit',
      (deathBenefit, allInputs) => {
        if (!allInputs?.trustValue) return true;
        return deathBenefit >= allInputs.trustValue;
      },
      'Death benefit should typically exceed trust value'
    )
  ],

  examples: [
    {
      title: 'Basic Life Insurance Trust',
      description: 'Standard ILIT with life insurance for estate tax avoidance',
      inputs: {
        trustValue: 100000,
        annualPremium: 5000,
        deathBenefit: 1000000,
        trustDuration: 20,
        discountRate: 3,
        inflationRate: 2.5,
        taxRate: 40,
        administrativeCosts: 2000,
        numberOfBeneficiaries: 3,
        trustType: 'life-insurance',
        includeCrummeyPowers: true,
        stateOfResidence: 'California'
      },
      expectedOutputs: {
        presentValue: 70000,
        futureValue: 1609000,
        taxSavings: 360000,
        netBenefit: 1539000,
        beneficiaryShare: 513000,
        administrativeCostTotal: 40000,
        effectiveYield: 0.035,
        breakEvenPeriod: 16,
        riskAssessment: 'Low'
      }
    },
    {
      title: 'Charitable Remainder Trust',
      description: 'ILIT with charitable remainder for maximum tax benefits',
      inputs: {
        trustValue: 500000,
        annualPremium: 10000,
        deathBenefit: 2000000,
        trustDuration: 25,
        discountRate: 4,
        inflationRate: 2.5,
        taxRate: 40,
        administrativeCosts: 3000,
        numberOfBeneficiaries: 2,
        trustType: 'charitable-remainder',
        includeCrummeyPowers: true,
        stateOfResidence: 'New York'
      },
      expectedOutputs: {
        presentValue: 180000,
        futureValue: 4200000,
        taxSavings: 760000,
        netBenefit: 3760000,
        beneficiaryShare: 1880000,
        administrativeCostTotal: 75000,
        effectiveYield: 0.042,
        breakEvenPeriod: 20,
        riskAssessment: 'Medium'
      }
    }
  ]
};