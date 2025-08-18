import { Calculator } from '../../../types/calculator';
import { calculateEarthquakeInsurance, generateEarthquakeInsuranceAnalysis } from './formulas';
import { validateEarthquakeInsuranceInputs } from './validation';

export const EarthquakeInsuranceCalculator: Calculator = {
  id: 'earthquake-insurance-calculator',
  name: 'Earthquake Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate earthquake insurance premiums, coverage options, and risk assessment based on location, building characteristics, and seismic factors.',
  inputs: [
    {
      id: 'propertyValue',
      name: 'Property Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Total value of the property to be insured',
      placeholder: '500000',
      min: 50000,
      max: 10000000
    },
    {
      id: 'location',
      name: 'Location',
      type: 'select',
      required: true,
      description: 'State or region for seismic risk assessment',
      options: [
        { value: 'CA', label: 'California' },
        { value: 'AK', label: 'Alaska' },
        { value: 'WA', label: 'Washington' },
        { value: 'OR', label: 'Oregon' },
        { value: 'NV', label: 'Nevada' },
        { value: 'UT', label: 'Utah' },
        { value: 'ID', label: 'Idaho' },
        { value: 'MT', label: 'Montana' },
        { value: 'WY', label: 'Wyoming' },
        { value: 'CO', label: 'Colorado' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'TX', label: 'Texas' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'MO', label: 'Missouri' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'OH', label: 'Ohio' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'NY', label: 'New York' },
        { value: 'VT', label: 'Vermont' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'ME', label: 'Maine' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'DE', label: 'Delaware' },
        { value: 'MD', label: 'Maryland' },
        { value: 'GA', label: 'Georgia' },
        { value: 'FL', label: 'Florida' },
        { value: 'AL', label: 'Alabama' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'other', label: 'Other States' }
      ]
    },
    {
      id: 'seismicZone',
      name: 'Seismic Zone',
      type: 'select',
      required: true,
      description: 'Seismic zone classification based on earthquake risk',
      options: [
        { value: 'zone-1', label: 'Zone 1 - Low Risk' },
        { value: 'zone-2', label: 'Zone 2 - Moderate Risk' },
        { value: 'zone-3', label: 'Zone 3 - High Risk' },
        { value: 'zone-4', label: 'Zone 4 - Very High Risk' }
      ]
    },
    {
      id: 'buildingType',
      name: 'Building Type',
      type: 'select',
      required: true,
      description: 'Type of building construction',
      options: [
        { value: 'wood-frame', label: 'Wood Frame' },
        { value: 'steel-frame', label: 'Steel Frame' },
        { value: 'concrete', label: 'Concrete' },
        { value: 'masonry', label: 'Masonry' },
        { value: 'mixed', label: 'Mixed Construction' },
        { value: 'manufactured', label: 'Manufactured Home' }
      ]
    },
    {
      id: 'buildingAge',
      name: 'Building Age',
      type: 'number',
      unit: 'years',
      required: true,
      description: 'Age of the building in years',
      placeholder: '25',
      min: 0,
      max: 200
    },
    {
      id: 'stories',
      name: 'Number of Stories',
      type: 'number',
      unit: 'stories',
      required: true,
      description: 'Number of stories in the building',
      placeholder: '2',
      min: 1,
      max: 100
    },
    {
      id: 'squareFootage',
      name: 'Square Footage',
      type: 'number',
      unit: 'sq ft',
      required: true,
      description: 'Total square footage of the building',
      placeholder: '2000',
      min: 100,
      max: 100000
    },
    {
      id: 'foundationType',
      name: 'Foundation Type',
      type: 'select',
      required: true,
      description: 'Type of building foundation',
      options: [
        { value: 'slab', label: 'Concrete Slab' },
        { value: 'crawlspace', label: 'Crawlspace' },
        { value: 'basement', label: 'Basement' },
        { value: 'pier-beam', label: 'Pier & Beam' },
        { value: 'post-tension', label: 'Post-Tension' }
      ]
    },
    {
      id: 'soilType',
      name: 'Soil Type',
      type: 'select',
      required: true,
      description: 'Soil type classification',
      options: [
        { value: 'rock', label: 'Rock' },
        { value: 'hard-soil', label: 'Hard Soil' },
        { value: 'soft-soil', label: 'Soft Soil' },
        { value: 'fill', label: 'Fill/Artificial' }
      ]
    },
    {
      id: 'retrofitStatus',
      name: 'Seismic Retrofit Status',
      type: 'select',
      required: true,
      description: 'Whether the building has been seismically retrofitted',
      options: [
        { value: 'none', label: 'No Retrofit' },
        { value: 'partial', label: 'Partial Retrofit' },
        { value: 'complete', label: 'Complete Retrofit' },
        { value: 'unknown', label: 'Unknown' }
      ]
    },
    {
      id: 'coverageType',
      name: 'Coverage Type',
      type: 'select',
      required: true,
      description: 'Type of earthquake insurance coverage',
      options: [
        { value: 'building-only', label: 'Building Only' },
        { value: 'contents-only', label: 'Contents Only' },
        { value: 'building-contents', label: 'Building & Contents' },
        { value: 'loss-of-use', label: 'Loss of Use' },
        { value: 'comprehensive', label: 'Comprehensive' }
      ]
    },
    {
      id: 'deductiblePercentage',
      name: 'Deductible Percentage',
      type: 'number',
      unit: '%',
      required: true,
      description: 'Deductible as percentage of coverage amount',
      placeholder: '10',
      min: 1,
      max: 25
    },
    {
      id: 'coverageLimit',
      name: 'Coverage Limit',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Maximum coverage amount',
      placeholder: '400000',
      min: 10000,
      max: 10000000
    },
    {
      id: 'contentsValue',
      name: 'Contents Value',
      type: 'number',
      unit: 'USD',
      required: true,
      description: 'Value of personal property/contents',
      placeholder: '50000',
      min: 0,
      max: 1000000
    },
    {
      id: 'businessInterruption',
      name: 'Business Interruption Coverage',
      type: 'select',
      required: true,
      description: 'Whether to include business interruption coverage',
      options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' }
      ]
    },
    {
      id: 'annualIncome',
      name: 'Annual Income (for Business Interruption)',
      type: 'number',
      unit: 'USD',
      required: false,
      description: 'Annual income for business interruption calculation',
      placeholder: '100000',
      min: 0,
      max: 10000000
    },
    {
      id: 'policyType',
      name: 'Policy Type',
      type: 'select',
      required: true,
      description: 'Type of earthquake insurance policy',
      options: [
        { value: 'standalone', label: 'Standalone Policy' },
        { value: 'endorsement', label: 'Homeowners Endorsement' },
        { value: 'commercial', label: 'Commercial Policy' }
      ]
    },
    {
      id: 'claimsHistory',
      name: 'Claims History',
      type: 'select',
      required: true,
      description: 'Previous earthquake insurance claims',
      options: [
        { value: 'none', label: 'No Claims' },
        { value: 'one', label: '1 Claim' },
        { value: 'multiple', label: 'Multiple Claims' }
      ]
    }
  ],
  outputs: [
    {
      id: 'annualPremium',
      name: 'Annual Premium',
      type: 'number',
      unit: 'USD',
      description: 'Annual earthquake insurance premium'
    },
    {
      id: 'monthlyPremium',
      name: 'Monthly Premium',
      type: 'number',
      unit: 'USD',
      description: 'Monthly earthquake insurance premium'
    },
    {
      id: 'deductibleAmount',
      name: 'Deductible Amount',
      type: 'number',
      unit: 'USD',
      description: 'Deductible amount in dollars'
    },
    {
      id: 'riskScore',
      name: 'Risk Score',
      type: 'number',
      unit: 'score',
      description: 'Earthquake risk score (0-100)'
    },
    {
      id: 'seismicRiskLevel',
      name: 'Seismic Risk Level',
      type: 'string',
      description: 'Qualitative risk assessment'
    },
    {
      id: 'premiumFactors',
      name: 'Premium Factors',
      type: 'string',
      description: 'Factors affecting premium calculation'
    },
    {
      id: 'coverageBreakdown',
      name: 'Coverage Breakdown',
      type: 'string',
      description: 'Detailed breakdown of coverage amounts'
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      type: 'string',
      description: 'Insurance and mitigation recommendations'
    },
    {
      id: 'costBenefitAnalysis',
      name: 'Cost-Benefit Analysis',
      type: 'string',
      description: 'Analysis of insurance cost vs. potential loss'
    },
    {
      id: 'mitigationOptions',
      name: 'Mitigation Options',
      type: 'string',
      description: 'Available mitigation and retrofit options'
    },
    {
      id: 'policyComparison',
      name: 'Policy Comparison',
      type: 'string',
      description: 'Comparison of different policy options'
    },
    {
      id: 'claimProbability',
      name: 'Claim Probability',
      type: 'number',
      unit: '%',
      description: 'Probability of filing a claim in 30 years'
    },
    {
      id: 'expectedLoss',
      name: 'Expected Loss',
      type: 'number',
      unit: 'USD',
      description: 'Expected loss over 30 years'
    },
    {
      id: 'earthquakeInsuranceAnalysis',
      name: 'Earthquake Insurance Analysis',
      type: 'string',
      description: 'Comprehensive analysis report'
    }
  ],
  calculate: (inputs) => {
    return calculateEarthquakeInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateEarthquakeInsuranceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Base Premium Rate',
      formula: 'Base Rate = Seismic Zone Factor × Building Type Factor × Age Factor',
      description: 'Calculate base premium rate based on risk factors'
    },
    {
      name: 'Premium Calculation',
      formula: 'Annual Premium = Coverage Limit × Base Rate × Coverage Factor × Deductible Factor',
      description: 'Calculate annual premium using coverage and risk factors'
    },
    {
      name: 'Risk Score',
      formula: 'Risk Score = (Zone Factor + Building Factor + Age Factor + Soil Factor) × 25',
      description: 'Calculate overall earthquake risk score'
    },
    {
      name: 'Deductible Amount',
      formula: 'Deductible = Coverage Limit × (Deductible Percentage ÷ 100)',
      description: 'Calculate deductible amount in dollars'
    },
    {
      name: 'Claim Probability',
      formula: 'Probability = Base Probability × Location Factor × Building Factor × 100',
      description: 'Calculate probability of filing a claim in 30 years'
    },
    {
      name: 'Expected Loss',
      formula: 'Expected Loss = Property Value × Claim Probability × Average Loss Ratio',
      description: 'Calculate expected loss over 30 years'
    }
  ],
  examples: [
    {
      name: 'California Wood Frame Home',
      inputs: {
        propertyValue: 750000,
        location: 'CA',
        seismicZone: 'zone-4',
        buildingType: 'wood-frame',
        buildingAge: 30,
        stories: 2,
        squareFootage: 2500,
        foundationType: 'crawlspace',
        soilType: 'soft-soil',
        retrofitStatus: 'none',
        coverageType: 'building-contents',
        deductiblePercentage: 15,
        coverageLimit: 600000,
        contentsValue: 75000,
        businessInterruption: 'no',
        policyType: 'standalone',
        claimsHistory: 'none'
      },
      description: 'Older wood frame home in high-risk California seismic zone'
    },
    {
      name: 'Retrofitted Steel Frame Building',
      inputs: {
        propertyValue: 1200000,
        location: 'WA',
        seismicZone: 'zone-3',
        buildingType: 'steel-frame',
        buildingAge: 45,
        stories: 4,
        squareFootage: 8000,
        foundationType: 'basement',
        soilType: 'hard-soil',
        retrofitStatus: 'complete',
        coverageType: 'comprehensive',
        deductiblePercentage: 10,
        coverageLimit: 1000000,
        contentsValue: 150000,
        businessInterruption: 'yes',
        annualIncome: 200000,
        policyType: 'commercial',
        claimsHistory: 'none'
      },
      description: 'Retrofitted commercial building in moderate-risk Washington'
    },
    {
      name: 'Low-Risk Masonry Building',
      inputs: {
        propertyValue: 400000,
        location: 'TX',
        seismicZone: 'zone-1',
        buildingType: 'masonry',
        buildingAge: 15,
        stories: 1,
        squareFootage: 3000,
        foundationType: 'slab',
        soilType: 'rock',
        retrofitStatus: 'none',
        coverageType: 'building-only',
        deductiblePercentage: 5,
        coverageLimit: 350000,
        contentsValue: 25000,
        businessInterruption: 'no',
        policyType: 'endorsement',
        claimsHistory: 'none'
      },
      description: 'Newer masonry building in low-risk Texas area'
    }
  ]
};
