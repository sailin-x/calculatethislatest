import { Calculator } from '../../../types/calculator';
import { calculateEstateTaxLiability } from './formulas';
import { ValidationRuleFactory } from '../../../utils/validation';

/**
 * Industry-leading Estate Tax Liability Calculator
 */
export const estateTaxLiabilityCalculator: Calculator = {
  id: 'estate-tax-liability-calculator',
  title: 'Estate Tax Liability Calculator',
  category: 'finance',
  subcategory: 'Retirement & Savings',
  description: 'Comprehensive estate tax liability calculation with planning strategies, exemption optimization, and wealth transfer recommendations with industry-standard accuracy.',

  usageInstructions: [
    'Enter estate details and beneficiary information',
    'Specify tax rates and planning options',
    'Review tax estimates and optimization strategies',
    'Compare planning scenarios and risk factors'
  ],

  inputs: [
    {
      id: 'totalGrossEstate',
      label: 'Total Gross Estate',
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
      id: 'hasStateEstateTax',
      label: 'Has State Estate Tax',
      type: 'boolean',
      required: false,
      tooltip: 'Does your state have estate tax?',
      defaultValue: true
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
      id: 'useUnifiedCredit',
      label: 'Use Unified Credit',
      type: 'boolean',
      required: false,
      tooltip: 'Apply unified estate and gift tax credit',
      defaultValue: true
    },
    {
      id: 'useQTIPTrust',
      label: 'Use QTIP Trust',
      type: 'boolean',
      required: false,
      tooltip: 'Use Qualified Terminable Interest Property trust',
      defaultValue: false
    },
    {
      id: 'useCreditShelterTrust',
      label: 'Use Credit Shelter Trust',
      type: 'boolean',
      required: false,
      tooltip: 'Use credit shelter trust for exemption maximization',
      defaultValue: true
    },
    {
      id: 'considerGiftingStrategy',
      label: 'Consider Gifting Strategy',
      type: 'boolean',
      required: false,
      tooltip: 'Include gifting strategies in planning',
      defaultValue: true
    },
    {
      id: 'annualGiftingAmount',
      label: 'Annual Gifting Amount',
      type: 'currency',
      required: false,
      placeholder: '36000',
      tooltip: 'Annual gift tax exclusion amount',
      defaultValue: 36000,
      min: 0,
      max: 1000000
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
      id: 'valuationRisk',
      label: 'Valuation Risk',
      type: 'number',
      required: false,
      placeholder: '10',
      tooltip: 'Risk from asset valuation disputes (0-100)',
      defaultValue: 10,
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
      id: 'trustPlanningBenefit',
      label: 'Trust Planning Benefit',
      type: 'currency',
      explanation: 'Tax savings from trust planning'
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
      id: 'valuationRiskImpact',
      label: 'Valuation Risk Impact',
      type: 'number',
      explanation: 'Impact of asset valuation changes (0-100)'
    },
    {
      id: 'overallRiskScore',
      label: 'Overall Risk Score',
      type: 'number',
      explanation: 'Comprehensive estate planning risk score (0-100)'
    },
    {
      id: 'recommendedEstatePlan',
      label: 'Recommended Estate Plan',
      type: 'text',
      explanation: 'Recommended estate planning strategy'
    },
    {
      id: 'optimalTrustStructure',
      label: 'Optimal Trust Structure',
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
      id: 'planningCosts',
      label: 'Planning Costs',
      type: 'currency',
      explanation: 'Estimated estate planning costs'
    },
    {
      id: 'benefitCostRatio',
      label: 'Benefit-Cost Ratio',
      type: 'number',
      explanation: 'Ratio of tax savings to planning costs'
    },
    {
      id: 'netBenefit',
      label: 'Net Benefit',
      type: 'currency',
      explanation: 'Net benefit from estate planning'
    }
  ],

  formulas: [],

  validationRules: [
    ValidationRuleFactory.required('totalGrossEstate', 'Total gross estate is required'),
    ValidationRuleFactory.required('federalEstateTaxRate', 'Federal estate tax rate is required'),
    ValidationRuleFactory.range('totalGrossEstate', 10000, 1000000000, 'Total gross estate must be between $10,000 and $1,000,000,000'),
    ValidationRuleFactory.range('federalEstateTaxRate', 0, 50, 'Federal estate tax rate must be between 0% and 50%'),
    ValidationRuleFactory.businessRule(
      'survivingChildren',
      (survivingChildren) => {
        return survivingChildren >= 0 && survivingChildren <= 20;
      },
      'Number of surviving children must be between 0 and 20'
    ),
    ValidationRuleFactory.businessRule(
      'survivingGrandchildren',
      (survivingGrandchildren) => {
        return survivingGrandchildren >= 0 && survivingGrandchildren <= 50;
      },
      'Number of surviving grandchildren must be between 0 and 50'
    ),
    ValidationRuleFactory.businessRule(
      'charitableOrganizations',
      (charitableOrganizations) => {
        return charitableOrganizations >= 0 && charitableOrganizations <= 100;
      },
      'Number of charitable organizations must be between 0 and 100'
    ),
    ValidationRuleFactory.businessRule(
      'marketVolatility',
      (marketVolatility) => {
        return marketVolatility >= 0 && marketVolatility <= 100;
      },
      'Market volatility must be between 0 and 100'
    ),
    ValidationRuleFactory.businessRule(
      'legislativeRisk',
      (legislativeRisk) => {
        return legislativeRisk >= 0 && legislativeRisk <= 100;
      },
      'Legislative risk must be between 0 and 100'
    ),
    ValidationRuleFactory.businessRule(
      'familyRisk',
      (familyRisk) => {
        return familyRisk >= 0 && familyRisk <= 100;
      },
      'Family risk must be between 0 and 100'
    ),
    ValidationRuleFactory.businessRule(
      'valuationRisk',
      (valuationRisk) => {
        return valuationRisk >= 0 && valuationRisk <= 100;
      },
      'Valuation risk must be between 0 and 100'
    )
  ],

  examples: [
    {
      title: 'High-Net-Worth Estate with Complex Planning',
      description: 'Comprehensive estate planning for $10M estate with multiple beneficiaries',
      inputs: {
        totalGrossEstate: 10000000,
        probateAssets: 6000000,
        nonProbateAssets: 4000000,
        survivingSpouse: true,
        survivingChildren: 2,
        survivingGrandchildren: 3,
        federalEstateTaxRate: 40,
        stateEstateTaxRate: 16,
        hasStateEstateTax: true,
        usePortability: true,
        useUnifiedCredit: true,
        useCreditShelterTrust: true,
        considerGiftingStrategy: true,
        optimizeForTaxSavings: true
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