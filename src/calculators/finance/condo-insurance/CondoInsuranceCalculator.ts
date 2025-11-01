import { Calculator } from '../../types/calculator';
import { calculateInsurance, generateInsuranceAnalysis } from './formulas';
import { validateInsuranceInputs } from './validation';

export const CondoInsuranceCalculator: Calculator = {
  id: 'CondoInsuranceCalculator',
  name: 'Condo Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate condo insurance coverage needs, premiums, and policy analysis for condominium owners.',
  
  inputs: [
    {
      id: 'propertyType',
      name: 'Property Type',
      type: 'select',
      required: true,
      description: 'Type of condominium property',
      options: [
        { value: 'studio', label: 'Studio' },
        { value: 'one-bedroom', label: 'One Bedroom' },
        { value: 'two-bedroom', label: 'Two Bedroom' },
        { value: 'three-bedroom', label: 'Three Bedroom' },
        { value: 'penthouse', label: 'Penthouse' },
        { value: 'townhouse', label: 'Townhouse' }
      ]
    },
    {
      id: 'squareFootage',
      name: 'Square Footage',
      type: 'number',
      unit: 'sq ft',
      required: true,
      description: 'Total square footage of the unit',
      placeholder: '1200',
      min: 300,
      max: 10000
    },
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Current market value of the condo',
      placeholder: '350000',
      min: 50000,
      max: 5000000
    },
    {
      id: 'personalPropertyValue',
      name: 'Personal Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Value of personal belongings and improvements',
      placeholder: '50000',
      min: 5000,
      max: 500000
    },
    {
      id: 'buildingCoverage',
      name: 'Building Coverage',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Coverage for building improvements and fixtures',
      placeholder: '25000',
      min: 0,
      max: 500000
    },
    {
      id: 'lossOfUseCoverage',
      name: 'Loss of Use Coverage',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Additional living expenses if unit is uninhabitable',
      placeholder: '20000',
      min: 0,
      max: 100000
    },
    {
      id: 'personalLiabilityCoverage',
      name: 'Personal Liability Coverage',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Liability coverage for personal injury or property damage',
      placeholder: '300000',
      min: 100000,
      max: 2000000
    },
    {
      id: 'medicalPaymentsCoverage',
      name: 'Medical Payments Coverage',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Medical payments to others coverage',
      placeholder: '5000',
      min: 1000,
      max: 50000
    },
    {
      id: 'deductible',
      name: 'Deductible',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Insurance deductible amount',
      placeholder: '1000',
      min: 250,
      max: 10000
    },
    {
      id: 'location',
      name: 'Location',
      type: 'select',
      required: true,
      description: 'Geographic location of the condo',
      options: [
        { value: 'urban', label: 'Urban' },
        { value: 'suburban', label: 'Suburban' },
        { value: 'rural', label: 'Rural' },
        { value: 'coastal', label: 'Coastal' },
        { value: 'mountain', label: 'Mountain' }
      ]
    },
    {
      id: 'constructionType',
      name: 'Construction Type',
      type: 'select',
      required: true,
      description: 'Type of building construction',
      options: [
        { value: 'frame', label: 'Frame' },
        { value: 'masonry', label: 'Masonry' },
        { value: 'fire-resistive', label: 'Fire Resistive' },
        { value: 'non-combustible', label: 'Non-Combustible' }
      ]
    },
    {
      id: 'yearBuilt',
      name: 'Year Built',
      type: 'number',
      required: true,
      description: 'Year the building was constructed',
      placeholder: '2010',
      min: 1900,
      max: 2024
    },
    {
      id: 'securityFeatures',
      name: 'Security Features',
      type: 'multiselect',
      required: true,
      description: 'Security features in the building',
      options: [
        { value: 'alarm-system', label: 'Alarm System' },
        { value: 'security-camera', label: 'Security Camera' },
        { value: 'doorman', label: 'Doorman' },
        { value: 'gated-access', label: 'Gated Access' },
        { value: 'fire-sprinklers', label: 'Fire Sprinklers' },
        { value: 'none', label: 'None' }
      ]
    },
    {
      id: 'claimsHistory',
      name: 'Claims History',
      type: 'select',
      required: true,
      description: 'Number of insurance claims in past 5 years',
      options: [
        { value: '0', label: '0 Claims' },
        { value: '1', label: '1 Claim' },
        { value: '2', label: '2 Claims' },
        { value: '3+', label: '3+ Claims' }
      ]
    },
    {
      id: 'creditScore',
      name: 'Credit Score',
      type: 'select',
      required: true,
      description: 'Credit score range',
      options: [
        { value: 'excellent', label: 'Excellent (750+)' },
        { value: 'good', label: 'Good (700-749)' },
        { value: 'fair', label: 'Fair (650-699)' },
        { value: 'poor', label: 'Poor (Below 650)' }
      ]
    },
    {
      id: 'occupancyType',
      name: 'Occupancy Type',
      type: 'select',
      required: true,
      description: 'How the condo is occupied',
      options: [
        { value: 'owner-occupied', label: 'Owner Occupied' },
        { value: 'rental', label: 'Rental Property' },
        { value: 'vacation', label: 'Vacation Home' }
      ]
    },
    {
      id: 'hoaInsurance',
      name: 'HOA Master Policy Coverage',
      type: 'select',
      required: true,
      description: 'What the HOA master policy covers',
      options: [
        { value: 'bare-walls', label: 'Bare Walls (Structure Only)' },
        { value: 'single-entity', label: 'Single Entity (Structure + Fixtures)' },
        { value: 'all-inclusive', label: 'All Inclusive (Structure + Fixtures + Improvements)' }
      ]
    },
    {
      id: 'floodZone',
      name: 'Flood Zone',
      type: 'select',
      required: true,
      description: 'Flood zone classification',
      options: [
        { value: 'x', label: 'Zone X (Low Risk)' },
        { value: 'a', label: 'Zone A (High Risk)' },
        { value: 'v', label: 'Zone V (High Risk Coastal)' },
        { value: 'unknown', label: 'Unknown' }
      ]
    },
    {
      id: 'earthquakeZone',
      name: 'Earthquake Zone',
      type: 'select',
      required: true,
      description: 'Earthquake risk zone',
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'moderate', label: 'Moderate Risk' },
        { value: 'high', label: 'High Risk' }
      ]
    }
  ],

  outputs: [
    {
      id: 'annualPremium',
      name: 'Annual Premium',
      type: 'number',
      unit: 'USD',
      description: 'Estimated annual insurance premium'
    },
    {
      id: 'monthlyPremium',
      name: 'Monthly Premium',
      type: 'number',
      unit: 'USD',
      description: 'Estimated monthly insurance premium'
    },
    {
      id: 'totalCoverage',
      name: 'Total Coverage',
      type: 'number',
      unit: 'USD',
      description: 'Total insurance coverage amount'
    },
    {
      id: 'coverageBreakdown',
      name: 'Coverage Breakdown',
      type: 'string',
      description: 'Detailed breakdown of coverage amounts'
    },
    {
      id: 'riskScore',
      name: 'Risk Score',
      type: 'number',
      description: 'Overall risk assessment score (1-100)'
    },
    {
      id: 'premiumFactors',
      name: 'Premium Factors',
      type: 'string',
      description: 'Factors affecting the premium calculation'
    },
    {
      id: 'recommendedCoverage',
      name: 'Recommended Coverage',
      type: 'string',
      description: 'Recommended coverage adjustments'
    },
    {
      id: 'costSavings',
      name: 'Potential Cost Savings',
      type: 'number',
      unit: 'USD',
      description: 'Potential annual savings with optimizations'
    },
    {
      id: 'coverageGaps',
      name: 'Coverage Gaps',
      type: 'string',
      description: 'Identified coverage gaps and recommendations'
    },
    {
      id: 'policyComparison',
      name: 'Policy Comparison',
      type: 'string',
      description: 'Comparison of different policy options'
    },
    {
      id: 'claimsProbability',
      name: 'Claims Probability',
      type: 'number',
      unit: '%',
      description: 'Estimated probability of filing a claim'
    },
    {
      id: 'replacementCost',
      name: 'Replacement Cost',
      type: 'number',
      unit: 'USD',
      description: 'Estimated replacement cost for the unit'
    },
    {
      id: 'actualCashValue',
      name: 'Actual Cash Value',
      type: 'number',
      unit: 'USD',
      description: 'Actual cash value of the unit'
    },
    {
      id: 'insuranceAnalysis',
      name: 'Insurance Analysis',
      type: 'string',
      description: 'Comprehensive insurance analysis and recommendations'
    }
  ],

  calculate: (inputs) => {
    const validation = validateInsuranceInputs(inputs);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    return calculateInsurance(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateInsuranceAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Base Premium',
      formula: 'Base Premium = Property Value × Base Rate × Location Factor × Construction Factor',
      description: 'Calculates the base insurance premium'
    },
    {
      name: 'Risk Adjustment',
      formula: 'Risk Adjustment = Base Premium × (Claims Factor + Credit Factor + Security Factor)',
      description: 'Adjusts premium based on risk factors'
    },
    {
      name: 'Coverage Calculation',
      formula: 'Total Coverage = Personal Property + Building Coverage + Loss of Use + Liability + Medical',
      description: 'Calculates total coverage amount'
    },
    {
      name: 'Replacement Cost',
      formula: 'Replacement Cost = Square Footage × Cost per Square Foot × Construction Factor',
      description: 'Estimates replacement cost of the unit'
    }
  ],

  examples: [
    {
      name: 'Urban One-Bedroom Condo',
      description: 'A 1,200 sq ft one-bedroom condo in an urban area',
      inputs: {
        propertyType: 'one-bedroom',
        squareFootage: 1200,
        propertyValue: 350000,
        personalPropertyValue: 50000,
        buildingCoverage: 25000,
        lossOfUseCoverage: 20000,
        personalLiabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        deductible: 1000,
        location: 'urban',
        constructionType: 'masonry',
        yearBuilt: 2010,
        securityFeatures: ['alarm-system', 'doorman'],
        claimsHistory: '0',
        creditScore: 'excellent',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'single-entity',
        floodZone: 'x',
        earthquakeZone: 'low'
      },
      expectedOutputs: {
        annualPremium: 1200,
        monthlyPremium: 100,
        totalCoverage: 400000,
        coverageBreakdown: 'Personal Property: $50,000, Building: $25,000, Loss of Use: $20,000, Liability: $300,000, Medical: $5,000',
        riskScore: 25,
        premiumFactors: 'Low risk location, excellent credit, no claims history, good security features',
        recommendedCoverage: 'Adequate coverage for current needs',
        costSavings: 150,
        coverageGaps: 'Consider umbrella liability policy for additional protection',
        policyComparison: 'Standard policy provides good value for coverage',
        claimsProbability: 8.5,
        replacementCost: 360000,
        actualCashValue: 315000,
        insuranceAnalysis: 'Well-insured condo with good risk profile and adequate coverage'
      }
    },
    {
      name: 'Coastal Penthouse',
      description: 'A 2,500 sq ft penthouse in a coastal area',
      inputs: {
        propertyType: 'penthouse',
        squareFootage: 2500,
        propertyValue: 1200000,
        personalPropertyValue: 150000,
        buildingCoverage: 75000,
        lossOfUseCoverage: 50000,
        personalLiabilityCoverage: 500000,
        medicalPaymentsCoverage: 10000,
        deductible: 2500,
        location: 'coastal',
        constructionType: 'fire-resistive',
        yearBuilt: 2015,
        securityFeatures: ['alarm-system', 'security-camera', 'doorman', 'gated-access'],
        claimsHistory: '1',
        creditScore: 'good',
        occupancyType: 'owner-occupied',
        hoaInsurance: 'all-inclusive',
        floodZone: 'v',
        earthquakeZone: 'moderate'
      },
      expectedOutputs: {
        annualPremium: 4800,
        monthlyPremium: 400,
        totalCoverage: 785000,
        coverageBreakdown: 'Personal Property: $150,000, Building: $75,000, Loss of Use: $50,000, Liability: $500,000, Medical: $10,000',
        riskScore: 65,
        premiumFactors: 'High property value, coastal location, flood zone V, previous claim',
        recommendedCoverage: 'Consider additional flood and earthquake coverage',
        costSavings: 600,
        coverageGaps: 'Flood insurance recommended, earthquake coverage advised',
        policyComparison: 'High-value policy with comprehensive coverage',
        claimsProbability: 15.2,
        replacementCost: 1250000,
        actualCashValue: 1080000,
        insuranceAnalysis: 'High-value property requiring comprehensive coverage and additional flood/earthquake protection'
      }
    }
  ]
};
