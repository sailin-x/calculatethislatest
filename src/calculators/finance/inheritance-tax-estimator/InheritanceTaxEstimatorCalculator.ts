import { Calculator, Formula } from '../../../types/calculator';
import { calculateInheritanceTaxEstimator, validateInheritanceTaxEstimatorInputs } from './formulas';
import { getInheritanceTaxEstimatorValidationRules } from './validation';

/**
 * Inheritance Tax Estimator formula implementation
 */
const inheritanceTaxEstimatorFormula: Formula = {
  id: 'inheritance-tax-estimator',
  name: 'Inheritance Tax Estimation and Planning',
  description: 'Comprehensive estate tax calculation with planning strategies and optimization recommendations',
  calculate: (inputs: Record<string, any>) => {
    const result = calculateInheritanceTaxEstimator(inputs as any);
    return {
      outputs: result,
      explanation: 'Inheritance tax estimation and planning analysis completed',
      intermediateSteps: {}
    };
  }
};

/**
 * Industry-leading Inheritance Tax Estimator Calculator
 */
export const inheritanceTaxEstimatorCalculator: Calculator = {
  id: 'inheritance-tax-estimator-calculator',
  title: 'Inheritance Tax Estimator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive inheritance tax estimation with estate planning strategies, exemption optimization, comparative analysis, and wealth transfer recommendations with industry-standard accuracy.',

  usageInstructions: [
    'Enter estate details and beneficiary information',
    'Specify tax rates and planning options',
    'Review tax estimates and optimization strategies',
    'Compare planning scenarios and risk factors'
  ],

  inputs: [
    {
      id: 'totalEstateValue',
      label: 'Total Estate Value',
      type: 'currency',
      required: true,
      placeholder: '5000000',
      tooltip: 'Total value of all estate assets',
      defaultValue: 5000000,
      min: 10000,
      max: 1000000000
    },
    {
      id: 'probateAssets',
      label: 'Probate Assets',
      type: 'currency',
      required: false,
      placeholder: '3000000',
      tooltip: 'Assets that pass through probate',
      defaultValue: 3000000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'nonProbateAssets',
      label: 'Non-Probate Assets',
      type: 'currency',
      required: false,
      placeholder: '2000000',
      tooltip: 'Assets that pass outside probate',
      defaultValue: 2000000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'jointlyOwnedAssets',
      label: 'Jointly Owned Assets',
      type: 'currency',
      required: false,
      placeholder: '500000',
      tooltip: 'Assets owned jointly with right of survivorship',
      defaultValue: 500000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'lifeInsuranceProceeds',
      label: 'Life Insurance Proceeds',
      type: 'currency',
      required: false,
      placeholder: '1000000',
      tooltip: 'Proceeds from life insurance policies',
      defaultValue: 1000000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'retirementAccounts',
      label: 'Retirement Accounts',
      type: 'currency',
      required: false,
      placeholder: '1500000',
      tooltip: 'IRAs, 401(k)s, and other retirement accounts',
      defaultValue: 1500000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'businessInterests',
      label: 'Business Interests',
      type: 'currency',
      required: false,
      placeholder: '2000000',
      tooltip: 'Value of business ownership interests',
      defaultValue: 2000000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'realEstateValue',
      label: 'Real Estate Value',
      type: 'currency',
      required: false,
      placeholder: '1500000',
      tooltip: 'Value of real property holdings',
      defaultValue: 1500000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'personalPropertyValue',
      label: 'Personal Property Value',
      type: 'currency',
      required: false,
      placeholder: '200000',
      tooltip: 'Value of personal property and belongings',
      defaultValue: 200000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'investmentAccounts',
      label: 'Investment Accounts',
      type: 'currency',
      required: false,
      placeholder: '800000',
      tooltip: 'Brokerage and investment accounts',
      defaultValue: 800000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'cashAndEquivalents',
      label: 'Cash and Equivalents',
      type: 'currency',
      required: false,
      placeholder: '300000',
      tooltip: 'Cash, checking, and savings accounts',
      defaultValue: 300000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'funeralExpenses',
      label: 'Funeral Expenses',
      type: 'currency',
      required: false,
      placeholder: '15000',
      tooltip: 'Funeral and burial expenses',
      defaultValue: 15000,
      min: 0,
      max: 500000
    },
    {
      id: 'medicalExpenses',
      label: 'Medical Expenses',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Final medical and related expenses',
      defaultValue: 50000,
      min: 0,
      max: 1000000
    },
    {
      id: 'estateTaxesPaid',
      label: 'Estate Taxes Paid',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Taxes paid on prior transfers',
      defaultValue: 0,
      min: 0,
      max: 100000000
    },
    {
      id: 'administrativeExpenses',
      label: 'Administrative Expenses',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'Legal and administrative fees',
      defaultValue: 25000,
      min: 0,
      max: 1000000
    },
    {
      id: 'debtsAndLiabilities',
      label: 'Debts and Liabilities',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Outstanding debts and liabilities',
      defaultValue: 100000,
      min: 0,
      max: 100000000
    },
    {
      id: 'charitableBequests',
      label: 'Charitable Bequests',
      type: 'currency',
      required: false,
      placeholder: '200000',
      tooltip: 'Gifts to charitable organizations',
      defaultValue: 200000,
      min: 0,
      max: 1000000000
    },
    {
      id: 'maritalDeduction',
      label: 'Marital Deduction',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Unlimited deduction for surviving spouse',
      defaultValue: 0,
      min: 0,
      max: 1000000000
    },
    {
      id: 'annualExclusionGifts',
      label: 'Annual Exclusion Gifts',
      type: 'currency',
      required: false,
      placeholder: '36000',
      tooltip: 'Annual gift tax exclusion amount',
      defaultValue: 36000,
      min: 0,
      max: 1000000
    },
    {
      id: 'lifetimeExclusionUsed',
      label: 'Lifetime Exclusion Used',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Portion of lifetime exemption already used',
      defaultValue: 0,
      min: 0,
      max: 13800000
    },
    {
      id: 'numberOfBeneficiaries',
      label: 'Number of Beneficiaries',
      type: 'number',
      required: true,
      placeholder: '3',
      tooltip: 'Total number of beneficiaries',
      defaultValue: 3,
      min: 1,
      max: 100
    },
    {
      id: 'survivingSpouse',
      label: 'Surviving Spouse',
      type: 'boolean',
      required: false,
      tooltip: 'Is there a surviving spouse?',
      defaultValue: true
    },
    {
      id: 'survivingChildren',
      label: 'Surviving Children',
      type: 'number',
      required: false,
      placeholder: '2',
      tooltip: 'Number of surviving children',
      defaultValue: 2,
      min: 0,
      max: 20
    },
    {
      id: 'survivingGrandchildren',
      label: 'Surviving Grandchildren',
      type: 'number',
      required: false,
      placeholder: '4',
      tooltip: 'Number of surviving grandchildren',
      defaultValue: 4,
      min: 0,
      max: 50
    },
    {
      id: 'charitableOrganizations',
      label: 'Charitable Organizations',
      type: 'number',
      required: false,
      placeholder: '1',
      tooltip: 'Number of charitable beneficiaries',
      defaultValue: 1,
      min: 0,
      max: 100
    },
    {
      id: 'federalEstateTaxRate',
      label: 'Federal Estate Tax Rate (%)',
      type: 'percentage',
      required: true,
      placeholder: '40',
      tooltip: 'Federal estate tax rate',
      defaultValue: 40,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'stateEstateTaxRate',
      label: 'State Estate Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '16',
      tooltip: 'State estate tax rate',
      defaultValue: 16,
      min: 0,
      max: 20,
      step: 1
    },
    {
      id: 'generationSkippingTaxRate',
      label: 'Generation Skipping Tax Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '40',
      tooltip: 'Generation skipping transfer tax rate',
      defaultValue: 40,
      min: 0,
      max: 50,
      step: 5
    },
    {
      id: 'hasStateEstateTax',
      label: 'Has State Estate Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Does your state have estate tax?',
      defaultValue: true
    },
    {
      id: 'stateName',
      label: 'State Name',
      type: 'select',
      required: false,
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
      tooltip: 'Name of state for tax purposes',
      defaultValue: 'California'
    },
    {
      id: 'usePortability',
      label: 'Use Portability',
      type: 'boolean',
      required: false,
      tooltip: 'Use deceased spousal unused exclusion amount (DSUEA)',
      defaultValue: true
    },
    {
      id: 'useAnnualExclusions',
      label: 'Use Annual Exclusions',
      type: 'boolean',
      required: false,
      tooltip: 'Utilize annual gift tax exclusions',
      defaultValue: true
    },
    {
      id: 'useLifetimeExclusions',
      label: 'Use Lifetime Exclusions',
      type: 'boolean',
      required: false,
      tooltip: 'Utilize lifetime gift and estate tax exclusions',
      defaultValue: true
    },
    {
      id: 'considerLifeInsurance',
      label: 'Consider Life Insurance',
      type: 'boolean',
      required: false,
      tooltip: 'Include life insurance in planning',
      defaultValue: true
    },
    {
      id: 'considerTrusts',
      label: 'Consider Trusts',
      type: 'boolean',
      required: false,
      tooltip: 'Include trust planning options',
      defaultValue: true
    },
    {
      id: 'considerGifting',
      label: 'Consider Gifting',
      type: 'boolean',
      required: false,
      tooltip: 'Include gifting strategies',
      defaultValue: true
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '3',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 3,
      min: -5,
      max: 15,
      step: 0.5
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (%)',
      type: 'percentage',
      required: false,
      placeholder: '5',
      tooltip: 'Rate used for present value calculations',
      defaultValue: 5,
      min: 0,
      max: 20,
      step: 0.5
    },
    {
      id: 'estatePlanningHorizon',
      label: 'Planning Horizon (Years)',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Years to plan for',
      defaultValue: 20,
      min: 0,
      max: 50
    },
    {
      id: 'considerStepUpInBasis',
      label: 'Consider Step-Up in Basis',
      type: 'boolean',
      required: false,
      tooltip: 'Account for stepped-up basis at death',
      defaultValue: true
    },
    {
      id: 'considerCapitalGainsTax',
      label: 'Consider Capital Gains Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Include capital gains tax considerations',
      defaultValue: true
    },
    {
      id: 'includeGenerationSkipping',
      label: 'Include Generation Skipping',
      type: 'boolean',
      required: false,
      tooltip: 'Include generation skipping transfer tax',
      defaultValue: false
    },
    {
      id: 'marketVolatility',
      label: 'Market Volatility',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Expected market volatility (0-100)',
      defaultValue: 20,
      min: 0,
      max: 100
    },
    {
      id: 'interestRateRisk',
      label: 'Interest Rate Risk',
      type: 'number',
      required: false,
      placeholder: '30',
      tooltip: 'Risk from interest rate changes (0-100)',
      defaultValue: 30,
      min: 0,
      max: 100
    },
    {
      id: 'legislativeRisk',
      label: 'Legislative Risk',
      type: 'number',
      required: false,
      placeholder: '25',
      tooltip: 'Risk from tax law changes (0-100)',
      defaultValue: 25,
      min: 0,
      max: 100
    },
    {
      id: 'familyRisk',
      label: 'Family Risk',
      type: 'number',
      required: false,
      placeholder: '15',
      tooltip: 'Risk from family dynamics (0-100)',
      defaultValue: 15,
      min: 0,
      max: 100
    },
    {
      id: 'optimizeForTaxSavings',
      label: 'Optimize for Tax Savings',
      type: 'boolean',
      required: false,
      tooltip: 'Focus optimization on tax efficiency',
      defaultValue: true
    },
    {
      id: 'optimizeForBeneficiaryProtection',
      label: 'Optimize for Beneficiary Protection',
      type: 'boolean',
      required: false,
      tooltip: 'Focus optimization on beneficiary protection',
      defaultValue: false
    },
    {
      id: 'optimizeForAssetProtection',
      label: 'Optimize for Asset Protection',
      type: 'boolean',
      required: false,
      tooltip: 'Focus optimization on asset protection',
      defaultValue: false
    },
    {
      id: 'considerAssetProtectionTrust',
      label: 'Consider Asset Protection Trust',
      type: 'boolean',
      required: false,
      tooltip: 'Include asset protection trust options',
      defaultValue: false
    },
    {
      id: 'considerIrrevocableTrust',
      label: 'Consider Irrevocable Trust',
      type: 'boolean',
      required: false,
      tooltip: 'Include irrevocable trust options',
      defaultValue: true
    },
    {
      id: 'considerCharitableRemainderTrust',
      label: 'Consider Charitable Remainder Trust',
      type: 'boolean',
      required: false,
      tooltip: 'Include charitable remainder trust options',
      defaultValue: false
    }
  ],

  outputs: [
    {
      id: 'grossEstateValue',
      label: 'Gross Estate Value',
      type: 'currency',
      explanation: 'Total value of all estate assets before deductions'
    },
    {
      id: 'netEstateValue',
      label: 'Net Estate Value',
      type: 'currency',
      explanation: 'Estate value after deductions and liabilities'
    },
    {
      id: 'taxableEstateValue',
      label: 'Taxable Estate Value',
      type: 'currency',
      explanation: 'Estate value subject to estate tax'
    },
    {
      id: 'estateTaxExemption',
      label: 'Estate Tax Exemption',
      type: 'currency',
      explanation: 'Available estate tax exemption amount'
    },
    {
      id: 'remainingExemption',
      label: 'Remaining Exemption',
      type: 'currency',
      explanation: 'Unused portion of estate tax exemption'
    },
    {
      id: 'federalEstateTax',
      label: 'Federal Estate Tax',
      type: 'currency',
      explanation: 'Federal estate tax liability'
    },
    {
      id: 'stateEstateTax',
      label: 'State Estate Tax',
      type: 'currency',
      explanation: 'State estate tax liability'
    },
    {
      id: 'generationSkippingTax',
      label: 'Generation Skipping Tax',
      type: 'currency',
      explanation: 'Generation skipping transfer tax liability'
    },
    {
      id: 'totalEstateTax',
      label: 'Total Estate Tax',
      type: 'currency',
      explanation: 'Combined federal, state, and GST tax liability'
    },
    {
      id: 'effectiveTaxRate',
      label: 'Effective Tax Rate (%)',
      type: 'percentage',
      explanation: 'Overall estate tax rate as percentage of taxable estate'
    },
    {
      id: 'beneficiaryShareValue',
      label: 'Beneficiary Share Value',
      type: 'currency',
      explanation: 'Average value each beneficiary receives before tax'
    },
    {
      id: 'afterTaxBeneficiaryShare',
      label: 'After-Tax Beneficiary Share',
      type: 'currency',
      explanation: 'Average value each beneficiary receives after tax'
    },
    {
      id: 'charitableDeductionValue',
      label: 'Charitable Deduction Value',
      type: 'currency',
      explanation: 'Value of charitable deductions'
    },
    {
      id: 'maritalDeductionValue',
      label: 'Marital Deduction Value',
      type: 'currency',
      explanation: 'Value of marital deductions'
    },
    {
      id: 'taxSavingsFromPlanning',
      label: 'Tax Savings from Planning',
      type: 'currency',
      explanation: 'Estimated tax savings from estate planning'
    },
    {
      id: 'additionalExemptionAvailable',
      label: 'Additional Exemption Available',
      type: 'currency',
      explanation: 'Additional exemption available through portability'
    },
    {
      id: 'portabilityBenefit',
      label: 'Portability Benefit',
      type: 'currency',
      explanation: 'Tax savings from portability of exemption'
    },
    {
      id: 'giftingStrategyBenefit',
      label: 'Gifting Strategy Benefit',
      type: 'currency',
      explanation: 'Tax savings from gifting strategies'
    },
    {
      id: 'taxLiabilityVolatility',
      label: 'Tax Liability Volatility',
      type: 'number',
      explanation: 'Volatility of tax liability estimates (0-100)'
    },
    {
      id: 'legislativeRiskImpact',
      label: 'Legislative Risk Impact',
      type: 'number',
      explanation: 'Impact of potential tax law changes (0-100)'
    },
    {
      id: 'familyRiskImpact',
      label: 'Family Risk Impact',
      type: 'number',
      explanation: 'Impact of family dynamic changes (0-100)'
    },
    {
      id: 'recommendedInsuranceAmount',
      label: 'Recommended Insurance Amount',
      type: 'currency',
      explanation: 'Recommended life insurance to cover estate tax'
    },
    {
      id: 'optimalEstatePlan',
      label: 'Optimal Estate Plan',
      type: 'text',
      explanation: 'Recommended estate planning strategy'
    },
    {
      id: 'recommendedTrustStructure',
      label: 'Recommended Trust Structure',
      type: 'text',
      explanation: 'Recommended trust structure'
    },
    {
      id: 'giftingStrategy',
      label: 'Gifting Strategy',
      type: 'text',
      explanation: 'Recommended gifting strategy'
    },
    {
      id: 'insuranceStrategy',
      label: 'Insurance Strategy',
      type: 'text',
      explanation: 'Recommended insurance strategy'
    },
    {
      id: 'estateTaxEfficiencyScore',
      label: 'Estate Tax Efficiency Score',
      type: 'number',
      explanation: 'Overall estate tax efficiency rating (0-100)'
    },
    {
      id: 'beneficiaryProtectionScore',
      label: 'Beneficiary Protection Score',
      type: 'number',
      explanation: 'Beneficiary protection effectiveness (0-100)'
    },
    {
      id: 'assetProtectionScore',
      label: 'Asset Protection Score',
      type: 'number',
      explanation: 'Asset protection effectiveness (0-100)'
    },
    {
      id: 'overallPlanningScore',
      label: 'Overall Planning Score',
      type: 'number',
      explanation: 'Comprehensive estate planning effectiveness (0-100)'
    },
    {
      id: 'complianceChecklist',
      label: 'Compliance Checklist',
      type: 'text',
      explanation: 'Required compliance steps'
    },
    {
      id: 'requiredFilings',
      label: 'Required Filings',
      type: 'text',
      explanation: 'Required IRS filings and forms'
    },
    {
      id: 'taxReportingRequirements',
      label: 'Tax Reporting Requirements',
      type: 'text',
      explanation: 'Required tax reporting obligations'
    },
    {
      id: 'beneficiaryDesignationNeeds',
      label: 'Beneficiary Designation Needs',
      type: 'text',
      explanation: 'Required beneficiary designations'
    },
    {
      id: 'annualGiftingAmount',
      label: 'Annual Gifting Amount',
      type: 'currency',
      explanation: 'Recommended annual gifting amount'
    },
    {
      id: 'lifetimeGiftingCapacity',
      label: 'Lifetime Gifting Capacity',
      type: 'currency',
      explanation: 'Total lifetime gifting capacity'
    },
    {
      id: 'trustFundingStrategy',
      label: 'Trust Funding Strategy',
      type: 'text',
      explanation: 'Recommended trust funding approach'
    },
    {
      id: 'businessSuccessionPlan',
      label: 'Business Succession Plan',
      type: 'text',
      explanation: 'Recommended business succession strategy'
    },
    {
      id: 'planningCosts',
      label: 'Planning Costs',
      type: 'currency',
      explanation: 'Estimated estate planning costs'
    },
    {
      id: 'implementationCosts',
      label: 'Implementation Costs',
      type: 'currency',
      explanation: 'Estimated implementation costs'
    },
    {
      id: 'ongoingCosts',
      label: 'Ongoing Costs',
      type: 'currency',
      explanation: 'Estimated ongoing maintenance costs'
    },
    {
      id: 'totalCosts',
      label: 'Total Costs',
      type: 'currency',
      explanation: 'Total estimated costs'
    },
    {
      id: 'benefitCostRatio',
      label: 'Benefit-Cost Ratio',
      type: 'number',
      explanation: 'Ratio of tax savings to planning costs'
    }
  ],

  formulas: [inheritanceTaxEstimatorFormula],

  validationRules: getInheritanceTaxEstimatorValidationRules(),

  examples: [
    {
      title: 'High-Net-Worth Estate with Complex Planning',
      description: 'Comprehensive estate planning for $10M estate with multiple beneficiaries',
      inputs: {
        totalEstateValue: 10000000,
        probateAssets: 6000000,
        nonProbateAssets: 4000000,
        numberOfBeneficiaries: 4,
        survivingSpouse: true,
        survivingChildren: 2,
        survivingGrandchildren: 3,
        federalEstateTaxRate: 40,
        stateEstateTaxRate: 16,
        hasStateEstateTax: true,
        stateName: 'California',
        usePortability: true,
        useAnnualExclusions: true,
        useLifetimeExclusions: true,
        considerLifeInsurance: true,
        considerTrusts: true,
        considerGifting: true,
        optimizeForTaxSavings: true,
        considerIrrevocableTrust: true
      },
      expectedOutputs: {
        grossEstateValue: 10000000,
        netEstateValue: 9500000,
        taxableEstateValue: 8120000,
        federalEstateTax: 3248000,
        stateEstateTax: 1299200,
        totalEstateTax: 4547200,
        effectiveTaxRate: 45.5,
        taxSavingsFromPlanning: 1364160,
        estateTaxEfficiencyScore: 75,
        beneficiaryProtectionScore: 85,
        assetProtectionScore: 80,
        overallPlanningScore: 82,
        benefitCostRatio: 15.2
      }
    }
  ]
};