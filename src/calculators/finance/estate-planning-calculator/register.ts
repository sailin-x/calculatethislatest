import { Calculator } from '../../types/Calculator';
import { calculateEstatePlanning } from './formulas';
import { validateEstatePlanningInputs } from './validation';
import { EstatePlanningInputs, EstatePlanningResults } from './types';

export const estatePlanningCalculator: Calculator<EstatePlanningInputs, EstatePlanningResults> = {
  id: 'estate-planning-calculator',
  name: 'Estate Planning Calculator',
  description: 'Comprehensive estate planning analysis with tax optimization, trust planning, and beneficiary protection strategies.',
  category: 'Finance & Investment',
  tags: ['estate planning', 'tax optimization', 'trust planning', 'beneficiary protection', 'life insurance', 'charitable giving', 'business succession'],
  
  inputs: [
    {
      id: 'estateInfo.totalAssets',
      label: 'Total Assets',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter total estate value',
      description: 'Total value of all assets in the estate'
    },
    {
      id: 'estateInfo.totalLiabilities',
      label: 'Total Liabilities',
      type: 'number',
      required: true,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter total liabilities',
      description: 'Total value of all liabilities and debts'
    },
    {
      id: 'estateInfo.netEstate',
      label: 'Net Estate',
      type: 'number',
      required: true,
      min: -1000000000,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter net estate value',
      description: 'Net estate value (assets minus liabilities)'
    },
    {
      id: 'estateInfo.estateOwner',
      label: 'Estate Owner Name',
      type: 'text',
      required: true,
      maxLength: 100,
      placeholder: 'Enter estate owner name',
      description: 'Name of the estate owner'
    },
    {
      id: 'estateInfo.age',
      label: 'Age',
      type: 'number',
      required: true,
      min: 18,
      max: 120,
      step: 1,
      placeholder: 'Enter age',
      description: 'Age of the estate owner'
    },
    {
      id: 'estateInfo.healthStatus',
      label: 'Health Status',
      type: 'select',
      required: true,
      options: [
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'fair', label: 'Fair' },
        { value: 'poor', label: 'Poor' }
      ],
      placeholder: 'Select health status',
      description: 'Current health status of the estate owner'
    },
    {
      id: 'assets.liquidAssets.cash',
      label: 'Cash & Cash Equivalents',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter cash value',
      description: 'Cash and cash equivalents'
    },
    {
      id: 'assets.liquidAssets.stocks',
      label: 'Stocks & Bonds',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter stocks value',
      description: 'Value of stocks and bonds'
    },
    {
      id: 'assets.realEstate.primaryResidence',
      label: 'Primary Residence',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter primary residence value',
      description: 'Value of primary residence'
    },
    {
      id: 'assets.businessInterests.businessValue',
      label: 'Business Value',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter business value',
      description: 'Value of business interests'
    },
    {
      id: 'assets.retirementAccounts.traditionalIRA',
      label: 'Traditional IRA',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter Traditional IRA value',
      description: 'Value of Traditional IRA accounts'
    },
    {
      id: 'assets.lifeInsurance.deathBenefit',
      label: 'Life Insurance Death Benefit',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter death benefit',
      description: 'Total death benefit from life insurance policies'
    },
    {
      id: 'liabilities.mortgages',
      label: 'Mortgages',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter mortgage amount',
      description: 'Total mortgage debt'
    },
    {
      id: 'liabilities.creditCardDebt',
      label: 'Credit Card Debt',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter credit card debt',
      description: 'Total credit card debt'
    },
    {
      id: 'taxConsiderations.federalEstateTax.exemption',
      label: 'Federal Estate Tax Exemption',
      type: 'number',
      required: true,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: 'Enter federal exemption',
      description: 'Federal estate tax exemption amount'
    },
    {
      id: 'taxConsiderations.federalEstateTax.rate',
      label: 'Federal Estate Tax Rate',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
      step: 0.1,
      placeholder: 'Enter federal tax rate',
      description: 'Federal estate tax rate percentage'
    },
    {
      id: 'taxConsiderations.giftTax.annualExclusion',
      label: 'Annual Gift Tax Exclusion',
      type: 'number',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: 'Enter annual exclusion',
      description: 'Annual gift tax exclusion amount'
    },
    {
      id: 'taxConsiderations.giftTax.lifetimeExemption',
      label: 'Lifetime Gift Tax Exemption',
      type: 'number',
      required: true,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: 'Enter lifetime exemption',
      description: 'Lifetime gift tax exemption amount'
    },
    {
      id: 'taxConsiderations.giftTax.giftsMade',
      label: 'Gifts Already Made',
      type: 'number',
      required: false,
      min: 0,
      max: 100000000,
      step: 1000,
      placeholder: 'Enter gifts made',
      description: 'Total gifts already made'
    },
    {
      id: 'trustInfo.trustValue',
      label: 'Trust Value',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter trust value',
      description: 'Value of existing trusts'
    },
    {
      id: 'lifeInsurancePlanning.insuranceNeeds.incomeReplacement',
      label: 'Income Replacement Needs',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter income replacement needs',
      description: 'Life insurance needed for income replacement'
    },
    {
      id: 'lifeInsurancePlanning.insuranceNeeds.debtPayoff',
      label: 'Debt Payoff Needs',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter debt payoff needs',
      description: 'Life insurance needed for debt payoff'
    },
    {
      id: 'lifeInsurancePlanning.insuranceNeeds.educationFunding',
      label: 'Education Funding Needs',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: 'Enter education funding needs',
      description: 'Life insurance needed for education funding'
    },
    {
      id: 'lifeInsurancePlanning.insuranceNeeds.estateTaxFunding',
      label: 'Estate Tax Funding Needs',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter estate tax funding needs',
      description: 'Life insurance needed for estate tax funding'
    },
    {
      id: 'businessSuccession.businessValue',
      label: 'Business Value',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000000,
      step: 1000,
      placeholder: 'Enter business value',
      description: 'Value of business for succession planning'
    },
    {
      id: 'estateAdministration.executor',
      label: 'Executor Name',
      type: 'text',
      required: true,
      maxLength: 100,
      placeholder: 'Enter executor name',
      description: 'Name of the estate executor'
    },
    {
      id: 'estateAdministration.estimatedCosts',
      label: 'Estimated Administration Costs',
      type: 'number',
      required: false,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: 'Enter estimated costs',
      description: 'Estimated estate administration costs'
    }
  ],
  
  calculate: calculateEstatePlanning,
  validate: validateEstatePlanningInputs,
  
  examples: [
    {
      name: 'High Net Worth Individual',
      description: 'Estate planning for a high net worth individual with complex assets',
      inputs: {
        estateInfo: {
          totalAssets: 25000000,
          totalLiabilities: 2000000,
          netEstate: 23000000,
          estateOwner: 'Robert Johnson',
          age: 68,
          healthStatus: 'good'
        },
        assets: {
          liquidAssets: { cash: 2000000, stocks: 5000000, mutualFunds: 2000000, etfs: 1000000, otherSecurities: 500000 },
          realEstate: { primaryResidence: 3000000, investmentProperties: 2000000, commercialProperties: 1500000, land: 500000 },
          businessInterests: { businessValue: 3000000, partnershipInterests: 1000000, llcInterests: 500000, stockOptions: 500000 },
          retirementAccounts: { traditionalIRA: 1500000, rothIRA: 500000, employerPlans: 1000000, annuities: 500000 },
          lifeInsurance: { deathBenefit: 5000000, cashValue: 200000, policyType: 'universal' },
          personalProperty: { vehicles: 300000, jewelry: 200000, artwork: 500000, otherPersonalProperty: 100000 },
          otherAssets: { trusts: 1000000, foreignAssets: 0, otherAssets: 200000 }
        },
        liabilities: {
          mortgages: 1000000,
          personalLoans: 200000,
          creditCardDebt: 50000,
          businessDebt: 300000,
          taxLiabilities: 100000,
          otherLiabilities: 350000
        },
        beneficiaries: [
          { name: 'Margaret Johnson', relationship: 'Spouse', age: 65, percentage: 50, specificAssets: [], specialNeeds: false },
          { name: 'David Johnson', relationship: 'Son', age: 40, percentage: 25, specificAssets: [], specialNeeds: false },
          { name: 'Lisa Johnson', relationship: 'Daughter', age: 38, percentage: 25, specificAssets: [], specialNeeds: false }
        ],
        estateDocuments: {
          will: true,
          trust: true,
          powerOfAttorney: true,
          healthcareDirective: true,
          beneficiaryDesignations: true,
          businessSuccessionPlan: true
        },
        trustInfo: {
          trustType: 'revocable',
          trustValue: 1000000,
          trustee: 'Margaret Johnson',
          beneficiaries: ['Margaret Johnson', 'David Johnson', 'Lisa Johnson'],
          fundingStatus: 'funded'
        },
        taxConsiderations: {
          federalEstateTax: { exemption: 12000000, rate: 40, portability: true },
          stateEstateTax: { exemption: 1000000, rate: 16, state: 'California' },
          giftTax: { annualExclusion: 17000, lifetimeExemption: 12000000, giftsMade: 1000000 },
          generationSkippingTax: { exemption: 12000000, rate: 40, transfers: 0 }
        },
        charitableGiving: {
          charitableTrusts: { charitableRemainderTrust: true, charitableLeadTrust: false, value: 2000000, charitableBeneficiary: 'Charity Foundation' },
          charitableGifts: { annualGifts: 50000, plannedGifts: 200000, charitableDeductions: 75000 }
        },
        businessSuccession: {
          businessType: 'corporation',
          businessValue: 3000000,
          successionPlan: 'family',
          keyEmployees: ['CEO', 'CFO', 'COO'],
          buySellAgreement: true,
          fundingMechanism: 'life-insurance'
        },
        lifeInsurancePlanning: {
          existingPolicies: [
            { policyType: 'universal', deathBenefit: 5000000, cashValue: 200000, premium: 25000, ownership: 'trust' }
          ],
          insuranceNeeds: {
            incomeReplacement: 5000000,
            debtPayoff: 2000000,
            educationFunding: 500000,
            estateTaxFunding: 2000000,
            businessContinuation: 3000000
          }
        },
        internationalConsiderations: {
          foreignAssets: 0,
          foreignTrusts: false,
          dualCitizenship: false,
          foreignTaxTreaties: [],
          reportingRequirements: false
        },
        specialSituations: {
          blendedFamily: false,
          specialNeedsBeneficiary: false,
          minorChildren: false,
          spendthriftBeneficiary: false,
          creditorProtection: true
        },
        estateAdministration: {
          executor: 'Margaret Johnson',
          trustee: 'Margaret Johnson',
          guardian: '',
          attorney: 'Estate Attorney',
          accountant: 'CPA Firm',
          estimatedCosts: 100000
        },
        scenarios: [],
        includeTaxAnalysis: true,
        includeTrustAnalysis: true,
        includeInsuranceAnalysis: true,
        includeCharitableAnalysis: true,
        includeBusinessSuccession: true,
        includeDetailedBreakdown: true,
        includeMultipleScenarios: true,
        includeRecommendations: true
      }
    },
    {
      name: 'Small Business Owner',
      description: 'Estate planning for a small business owner with family succession',
      inputs: {
        estateInfo: {
          totalAssets: 3000000,
          totalLiabilities: 500000,
          netEstate: 2500000,
          estateOwner: 'Maria Rodriguez',
          age: 55,
          healthStatus: 'excellent'
        },
        assets: {
          liquidAssets: { cash: 200000, stocks: 300000, mutualFunds: 200000, etfs: 100000, otherSecurities: 50000 },
          realEstate: { primaryResidence: 800000, investmentProperties: 400000, commercialProperties: 0, land: 0 },
          businessInterests: { businessValue: 800000, partnershipInterests: 0, llcInterests: 0, stockOptions: 0 },
          retirementAccounts: { traditionalIRA: 200000, rothIRA: 100000, employerPlans: 150000, annuities: 0 },
          lifeInsurance: { deathBenefit: 1000000, cashValue: 50000, policyType: 'term' },
          personalProperty: { vehicles: 80000, jewelry: 20000, artwork: 0, otherPersonalProperty: 10000 },
          otherAssets: { trusts: 0, foreignAssets: 0, otherAssets: 0 }
        },
        liabilities: {
          mortgages: 300000,
          personalLoans: 50000,
          creditCardDebt: 15000,
          businessDebt: 100000,
          taxLiabilities: 15000,
          otherLiabilities: 20000
        },
        beneficiaries: [
          { name: 'Carlos Rodriguez', relationship: 'Spouse', age: 52, percentage: 60, specificAssets: [], specialNeeds: false },
          { name: 'Ana Rodriguez', relationship: 'Daughter', age: 25, percentage: 25, specificAssets: [], specialNeeds: false },
          { name: 'Jose Rodriguez', relationship: 'Son', age: 22, percentage: 15, specificAssets: [], specialNeeds: false }
        ],
        estateDocuments: {
          will: true,
          trust: false,
          powerOfAttorney: true,
          healthcareDirective: true,
          beneficiaryDesignations: true,
          businessSuccessionPlan: false
        },
        trustInfo: {
          trustType: 'revocable',
          trustValue: 0,
          trustee: '',
          beneficiaries: [],
          fundingStatus: 'unfunded'
        },
        taxConsiderations: {
          federalEstateTax: { exemption: 12000000, rate: 40, portability: true },
          stateEstateTax: { exemption: 1000000, rate: 16, state: 'Texas' },
          giftTax: { annualExclusion: 17000, lifetimeExemption: 12000000, giftsMade: 100000 },
          generationSkippingTax: { exemption: 12000000, rate: 40, transfers: 0 }
        },
        charitableGiving: {
          charitableTrusts: { charitableRemainderTrust: false, charitableLeadTrust: false, value: 0, charitableBeneficiary: '' },
          charitableGifts: { annualGifts: 5000, plannedGifts: 10000, charitableDeductions: 3000 }
        },
        businessSuccession: {
          businessType: 'llc',
          businessValue: 800000,
          successionPlan: 'family',
          keyEmployees: ['Manager'],
          buySellAgreement: false,
          fundingMechanism: 'life-insurance'
        },
        lifeInsurancePlanning: {
          existingPolicies: [
            { policyType: 'term', deathBenefit: 1000000, cashValue: 0, premium: 3000, ownership: 'individual' }
          ],
          insuranceNeeds: {
            incomeReplacement: 1500000,
            debtPayoff: 500000,
            educationFunding: 200000,
            estateTaxFunding: 0,
            businessContinuation: 800000
          }
        },
        internationalConsiderations: {
          foreignAssets: 0,
          foreignTrusts: false,
          dualCitizenship: false,
          foreignTaxTreaties: [],
          reportingRequirements: false
        },
        specialSituations: {
          blendedFamily: false,
          specialNeedsBeneficiary: false,
          minorChildren: false,
          spendthriftBeneficiary: false,
          creditorProtection: false
        },
        estateAdministration: {
          executor: 'Carlos Rodriguez',
          trustee: '',
          guardian: '',
          attorney: 'Local Attorney',
          accountant: 'Local CPA',
          estimatedCosts: 25000
        },
        scenarios: [],
        includeTaxAnalysis: true,
        includeTrustAnalysis: true,
        includeInsuranceAnalysis: true,
        includeCharitableAnalysis: true,
        includeBusinessSuccession: true,
        includeDetailedBreakdown: true,
        includeMultipleScenarios: true,
        includeRecommendations: true
      }
    },
    {
      name: 'Retiree with Charitable Intentions',
      description: 'Estate planning for a retiree with significant charitable giving goals',
      inputs: {
        estateInfo: {
          totalAssets: 8000000,
          totalLiabilities: 200000,
          netEstate: 7800000,
          estateOwner: 'Eleanor Thompson',
          age: 75,
          healthStatus: 'good'
        },
        assets: {
          liquidAssets: { cash: 500000, stocks: 2000000, mutualFunds: 1000000, etfs: 500000, otherSecurities: 200000 },
          realEstate: { primaryResidence: 1200000, investmentProperties: 800000, commercialProperties: 0, land: 0 },
          businessInterests: { businessValue: 0, partnershipInterests: 0, llcInterests: 0, stockOptions: 0 },
          retirementAccounts: { traditionalIRA: 800000, rothIRA: 400000, employerPlans: 200000, annuities: 300000 },
          lifeInsurance: { deathBenefit: 500000, cashValue: 100000, policyType: 'whole' },
          personalProperty: { vehicles: 60000, jewelry: 40000, artwork: 100000, otherPersonalProperty: 20000 },
          otherAssets: { trusts: 500000, foreignAssets: 0, otherAssets: 100000 }
        },
        liabilities: {
          mortgages: 100000,
          personalLoans: 0,
          creditCardDebt: 5000,
          businessDebt: 0,
          taxLiabilities: 50000,
          otherLiabilities: 45000
        },
        beneficiaries: [
          { name: 'Children Trust', relationship: 'Trust', age: 0, percentage: 40, specificAssets: [], specialNeeds: false },
          { name: 'Charity Foundation', relationship: 'Charity', age: 0, percentage: 30, specificAssets: [], specialNeeds: false },
          { name: 'Grandchildren Trust', relationship: 'Trust', age: 0, percentage: 30, specificAssets: [], specialNeeds: false }
        ],
        estateDocuments: {
          will: true,
          trust: true,
          powerOfAttorney: true,
          healthcareDirective: true,
          beneficiaryDesignations: true,
          businessSuccessionPlan: false
        },
        trustInfo: {
          trustType: 'charitable',
          trustValue: 500000,
          trustee: 'Trust Company',
          beneficiaries: ['Children Trust', 'Charity Foundation', 'Grandchildren Trust'],
          fundingStatus: 'funded'
        },
        taxConsiderations: {
          federalEstateTax: { exemption: 12000000, rate: 40, portability: true },
          stateEstateTax: { exemption: 1000000, rate: 16, state: 'New York' },
          giftTax: { annualExclusion: 17000, lifetimeExemption: 12000000, giftsMade: 2000000 },
          generationSkippingTax: { exemption: 12000000, rate: 40, transfers: 500000 }
        },
        charitableGiving: {
          charitableTrusts: { charitableRemainderTrust: true, charitableLeadTrust: true, value: 1000000, charitableBeneficiary: 'Charity Foundation' },
          charitableGifts: { annualGifts: 100000, plannedGifts: 500000, charitableDeductions: 150000 }
        },
        businessSuccession: {
          businessType: 'none',
          businessValue: 0,
          successionPlan: 'none',
          keyEmployees: [],
          buySellAgreement: false,
          fundingMechanism: 'none'
        },
        lifeInsurancePlanning: {
          existingPolicies: [
            { policyType: 'whole', deathBenefit: 500000, cashValue: 100000, premium: 8000, ownership: 'trust' }
          ],
          insuranceNeeds: {
            incomeReplacement: 0,
            debtPayoff: 200000,
            educationFunding: 0,
            estateTaxFunding: 0,
            businessContinuation: 0
          }
        },
        internationalConsiderations: {
          foreignAssets: 0,
          foreignTrusts: false,
          dualCitizenship: false,
          foreignTaxTreaties: [],
          reportingRequirements: false
        },
        specialSituations: {
          blendedFamily: false,
          specialNeedsBeneficiary: false,
          minorChildren: false,
          spendthriftBeneficiary: false,
          creditorProtection: true
        },
        estateAdministration: {
          executor: 'Trust Company',
          trustee: 'Trust Company',
          guardian: '',
          attorney: 'Estate Attorney',
          accountant: 'CPA Firm',
          estimatedCosts: 75000
        },
        scenarios: [],
        includeTaxAnalysis: true,
        includeTrustAnalysis: true,
        includeInsuranceAnalysis: true,
        includeCharitableAnalysis: true,
        includeBusinessSuccession: false,
        includeDetailedBreakdown: true,
        includeMultipleScenarios: true,
        includeRecommendations: true
      }
    }
  ],
  
  relatedCalculators: [
    'tax-calculator',
    'life-insurance-calculator',
    'business-valuation-calculator',
    'retirement-planning-calculator',
    'investment-return-calculator',
    'mortgage-calculator',
    'compound-interest-calculator',
    'annuity-calculator'
  ]
};

export default estatePlanningCalculator;
