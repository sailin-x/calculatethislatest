import { Calculator } from '../../../types/calculator';
import { assetProtectionCalculatorFormula } from './formulas';
import { AssetProtectionCalculatorInputs, AssetProtectionCalculatorResults } from './types';

/**
 * Asset Protection Calculator
 * Comprehensive analysis tool for evaluating asset protection strategies and risk assessment
 */
export const assetProtectionCalculator: Calculator = {
  id: 'asset-protection-calculator',
  title: 'Asset Protection Calculator',
  description: 'Advanced calculator for analyzing asset protection strategies, risk assessment, trust and LLC recommendations, insurance analysis, and comprehensive protection planning.',
  category: 'Business',
  subcategory: 'Legal & Financial Planning',
  tags: ['asset-protection', 'trusts', 'llc', 'insurance', 'risk-assessment', 'legal-planning', 'financial-planning', 'monte-carlo'],
  
  inputs: {
    personalAssets: {
      label: 'Personal Assets',
      type: 'object',
      required: true,
      description: 'Personal asset values including cash, investments, real estate, vehicles, business interests, retirement accounts, life insurance, and other assets',
      default: {
        cash: 50000,
        investments: 200000,
        realEstate: 500000,
        vehicles: 50000,
        businessInterests: 100000,
        retirementAccounts: 300000,
        lifeInsurance: 100000,
        otherAssets: 25000
      }
    },
    businessAssets: {
      label: 'Business Assets',
      type: 'object',
      required: true,
      description: 'Business asset values including business value, accounts receivable, inventory, equipment, intellectual property, goodwill, and other business assets',
      default: {
        businessValue: 500000,
        accountsReceivable: 100000,
        inventory: 75000,
        equipment: 125000,
        intellectualProperty: 50000,
        goodwill: 100000,
        otherBusinessAssets: 25000
      }
    },
    riskFactors: {
      label: 'Risk Factors',
      type: 'object',
      required: true,
      description: 'Risk assessment factors including profession, business type, liability exposure, lawsuit probability, bankruptcy risk, divorce risk, and estate tax exposure',
      default: {
        profession: 'medium-risk',
        businessType: 'medium-risk',
        personalLiability: 100000,
        businessLiability: 250000,
        lawsuitProbability: 15,
        bankruptcyRisk: 5,
        divorceRisk: 10,
        estateTaxExposure: 50000
      }
    },
    currentProtection: {
      label: 'Current Protection',
      type: 'object',
      required: true,
      description: 'Current asset protection including personal insurance, business insurance, umbrella policy, trusts, LLC protection, and other protection',
      default: {
        personalInsurance: 100000,
        businessInsurance: 200000,
        umbrellaPolicy: 0,
        trusts: 0,
        llcProtection: 0,
        otherProtection: 0
      }
    },
    protectionOptions: {
      label: 'Protection Options',
      type: 'object',
      required: false,
      description: 'Asset protection options to include in analysis',
      default: {
        includeTrusts: true,
        includeLLC: true,
        includeInsurance: true,
        includeOffshore: false,
        includeRetirementProtection: true,
        includeHomesteadExemption: true
      }
    },
    trustConfiguration: {
      label: 'Trust Configuration',
      type: 'object',
      required: false,
      description: 'Trust configuration options including revocable, irrevocable, asset protection, domestic, and offshore trusts',
      default: {
        revocableTrust: true,
        irrevocableTrust: false,
        assetProtectionTrust: false,
        domesticTrust: true,
        offshoreTrust: false,
        trustSetupCost: 5000,
        trustAnnualCost: 1000
      }
    },
    llcConfiguration: {
      label: 'LLC Configuration',
      type: 'object',
      required: false,
      description: 'LLC configuration options including single member, multi member, series LLC, and jurisdiction selection',
      default: {
        singleMemberLLC: true,
        multiMemberLLC: false,
        seriesLLC: false,
        llcSetupCost: 1000,
        llcAnnualCost: 400,
        llcJurisdiction: 'domestic'
      }
    },
    insuranceConfiguration: {
      label: 'Insurance Configuration',
      type: 'object',
      required: false,
      description: 'Insurance configuration including personal liability, business liability, umbrella policy, professional liability, directors and officers, and cyber liability insurance',
      default: {
        personalLiabilityInsurance: 100000,
        businessLiabilityInsurance: 200000,
        umbrellaPolicyAmount: 1000000,
        professionalLiabilityInsurance: 0,
        directorsAndOfficersInsurance: 0,
        cyberLiabilityInsurance: 0
      }
    },
    analysisPeriod: {
      label: 'Analysis Period',
      type: 'number',
      unit: 'years',
      required: false,
      description: 'Time period for analysis in years',
      placeholder: '10',
      min: 1,
      max: 50,
      step: 1,
      default: 10
    },
    discountRate: {
      label: 'Discount Rate',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Discount rate for present value calculations',
      placeholder: '5',
      min: 0,
      max: 100,
      step: 0.1,
      default: 5
    },
    includeTaxAnalysis: {
      label: 'Include Tax Analysis',
      type: 'boolean',
      required: false,
      description: 'Include tax implications and savings analysis',
      default: true
    },
    includeCostBenefitAnalysis: {
      label: 'Include Cost-Benefit Analysis',
      type: 'boolean',
      required: false,
      description: 'Include cost-benefit analysis and ROI calculations',
      default: true
    },
    includeRiskAssessment: {
      label: 'Include Risk Assessment',
      type: 'boolean',
      required: false,
      description: 'Include comprehensive risk assessment and mitigation strategies',
      default: true
    },
    monteCarloSamples: {
      label: 'Monte Carlo Samples',
      type: 'number',
      unit: '',
      required: false,
      description: 'Number of Monte Carlo simulation samples',
      placeholder: '10000',
      min: 1000,
      max: 100000,
      step: 1000,
      default: 10000
    },
    confidenceLevel: {
      label: 'Confidence Level',
      type: 'number',
      unit: '%',
      required: false,
      description: 'Confidence level for statistical analysis',
      placeholder: '95',
      min: 80,
      max: 99.9,
      step: 0.1,
      default: 95
    }
  },
  
  outputs: {
    assetSummary: {
      label: 'Asset Summary',
      type: 'object',
      description: 'Summary of total assets and breakdown between personal and business assets'
    },
    riskAssessment: {
      label: 'Risk Assessment',
      type: 'object',
      description: 'Comprehensive risk assessment including risk factors, vulnerability analysis, and overall risk level'
    },
    currentProtectionAnalysis: {
      label: 'Current Protection Analysis',
      type: 'object',
      description: 'Analysis of current protection levels and protection gap'
    },
    recommendedProtection: {
      label: 'Recommended Protection',
      type: 'object',
      description: 'Recommended protection strategies with costs, benefits, and priorities'
    },
    trustAnalysis: {
      label: 'Trust Analysis',
      type: 'object',
      description: 'Trust recommendations and analysis including setup costs, annual costs, and protection amounts'
    },
    llcAnalysis: {
      label: 'LLC Analysis',
      type: 'object',
      description: 'LLC recommendations and analysis including setup costs, annual costs, and protection amounts'
    },
    insuranceAnalysis: {
      label: 'Insurance Analysis',
      type: 'object',
      description: 'Insurance recommendations and analysis including premiums, coverage amounts, and benefits'
    },
    costBenefitAnalysis: {
      label: 'Cost-Benefit Analysis',
      type: 'object',
      description: 'Cost-benefit analysis including ROI, payback period, and net benefit calculations'
    },
    taxAnalysis: {
      label: 'Tax Analysis',
      type: 'object',
      description: 'Tax implications and savings analysis including estate tax, income tax, and capital gains savings'
    },
    riskMitigation: {
      label: 'Risk Mitigation',
      type: 'object',
      description: 'Risk mitigation strategies and effectiveness analysis'
    },
    implementationPlan: {
      label: 'Implementation Plan',
      type: 'object',
      description: 'Phased implementation plan with timelines, costs, and activities'
    },
    recommendations: {
      label: 'Strategic Recommendations',
      type: 'object',
      description: 'Actionable recommendations for immediate, short-term, and long-term actions'
    },
    summary: {
      label: 'Executive Summary',
      type: 'object',
      description: 'Key metrics, insights, and action items for decision making'
    },
    monteCarloResults: {
      label: 'Monte Carlo Simulation Results',
      type: 'object',
      description: 'Statistical analysis of protection outcomes and risk distribution'
    }
  },
  
  calculate: assetProtectionCalculatorFormula.calculate,
  
  examples: [
    {
      name: 'High Net Worth Individual',
      description: 'A high net worth individual with significant assets and high-risk profession',
      inputs: {
        personalAssets: {
          cash: 200000,
          investments: 2000000,
          realEstate: 3000000,
          vehicles: 150000,
          businessInterests: 500000,
          retirementAccounts: 1000000,
          lifeInsurance: 500000,
          otherAssets: 100000
        },
        businessAssets: {
          businessValue: 2000000,
          accountsReceivable: 300000,
          inventory: 200000,
          equipment: 500000,
          intellectualProperty: 250000,
          goodwill: 500000,
          otherBusinessAssets: 100000
        },
        riskFactors: {
          profession: 'high-risk',
          businessType: 'high-risk',
          personalLiability: 500000,
          businessLiability: 1000000,
          lawsuitProbability: 25,
          bankruptcyRisk: 10,
          divorceRisk: 15,
          estateTaxExposure: 200000
        },
        currentProtection: {
          personalInsurance: 300000,
          businessInsurance: 500000,
          umbrellaPolicy: 0,
          trusts: 0,
          llcProtection: 0,
          otherProtection: 0
        },
        protectionOptions: {
          includeTrusts: true,
          includeLLC: true,
          includeInsurance: true,
          includeOffshore: true,
          includeRetirementProtection: true,
          includeHomesteadExemption: true
        },
        analysisPeriod: 20,
        includeTaxAnalysis: true,
        includeCostBenefitAnalysis: true,
        includeRiskAssessment: true
      }
    },
    {
      name: 'Small Business Owner',
      description: 'A small business owner with moderate assets and medium-risk profile',
      inputs: {
        personalAssets: {
          cash: 50000,
          investments: 150000,
          realEstate: 400000,
          vehicles: 40000,
          businessInterests: 200000,
          retirementAccounts: 200000,
          lifeInsurance: 100000,
          otherAssets: 20000
        },
        businessAssets: {
          businessValue: 300000,
          accountsReceivable: 50000,
          inventory: 75000,
          equipment: 100000,
          intellectualProperty: 25000,
          goodwill: 50000,
          otherBusinessAssets: 15000
        },
        riskFactors: {
          profession: 'medium-risk',
          businessType: 'medium-risk',
          personalLiability: 150000,
          businessLiability: 300000,
          lawsuitProbability: 15,
          bankruptcyRisk: 8,
          divorceRisk: 12,
          estateTaxExposure: 75000
        },
        currentProtection: {
          personalInsurance: 100000,
          businessInsurance: 200000,
          umbrellaPolicy: 0,
          trusts: 0,
          llcProtection: 0,
          otherProtection: 0
        },
        protectionOptions: {
          includeTrusts: true,
          includeLLC: true,
          includeInsurance: true,
          includeOffshore: false,
          includeRetirementProtection: true,
          includeHomesteadExemption: true
        },
        analysisPeriod: 15,
        includeTaxAnalysis: true,
        includeCostBenefitAnalysis: true,
        includeRiskAssessment: true
      }
    },
    {
      name: 'Retiree with Estate Planning',
      description: 'A retiree with significant assets focused on estate planning and asset protection',
      inputs: {
        personalAssets: {
          cash: 100000,
          investments: 1500000,
          realEstate: 800000,
          vehicles: 30000,
          businessInterests: 0,
          retirementAccounts: 800000,
          lifeInsurance: 300000,
          otherAssets: 50000
        },
        businessAssets: {
          businessValue: 0,
          accountsReceivable: 0,
          inventory: 0,
          equipment: 0,
          intellectualProperty: 0,
          goodwill: 0,
          otherBusinessAssets: 0
        },
        riskFactors: {
          profession: 'low-risk',
          businessType: 'low-risk',
          personalLiability: 75000,
          businessLiability: 0,
          lawsuitProbability: 8,
          bankruptcyRisk: 3,
          divorceRisk: 5,
          estateTaxExposure: 150000
        },
        currentProtection: {
          personalInsurance: 150000,
          businessInsurance: 0,
          umbrellaPolicy: 0,
          trusts: 0,
          llcProtection: 0,
          otherProtection: 0
        },
        protectionOptions: {
          includeTrusts: true,
          includeLLC: false,
          includeInsurance: true,
          includeOffshore: false,
          includeRetirementProtection: true,
          includeHomesteadExemption: true
        },
        analysisPeriod: 25,
        includeTaxAnalysis: true,
        includeCostBenefitAnalysis: true,
        includeRiskAssessment: true
      }
    }
  ],
  
  usageInstructions: [
    'Enter your personal and business asset values',
    'Assess your risk factors including profession, business type, and liability exposure',
    'Input your current protection levels (insurance, trusts, LLCs)',
    'Select protection options to include in the analysis',
    'Configure trust, LLC, and insurance parameters',
    'Set analysis period and other parameters',
    'Review comprehensive results including risk assessment, recommendations, and implementation plan'
  ],
  
  tips: [
    'Be thorough in documenting all assets and their values',
    'Honestly assess your risk factors and exposure levels',
    'Consider both immediate and long-term protection needs',
    'Review trust and LLC options with legal professionals',
    'Factor in tax implications when evaluating protection strategies',
    'Implement protection strategies in phases to manage costs',
    'Regularly review and update your protection plan',
    'Consider state-specific laws and regulations for asset protection'
  ],
  
  relatedCalculators: [
    'business-valuation-calculator',
    'estate-planning-calculator',
    'insurance-needs-calculator',
    'tax-planning-calculator',
    'retirement-planning-calculator',
    'investment-portfolio-calculator',
    'risk-assessment-calculator',
    'legal-cost-calculator'
  ]
};
