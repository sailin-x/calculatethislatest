import { Calculator } from '../../../types/calculator';
import { calculateFloodInsurance, generateFloodInsuranceAnalysis } from './formulas';
import { validateFloodInsuranceInputs } from './validation';
import { FloodInsuranceInputs, FloodInsuranceOutputs } from './types';

export const FloodInsuranceCalculator: Calculator = {
  id: 'flood-insurance-calculator',
  name: 'Flood Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Comprehensive flood insurance analysis tool for property owners to evaluate coverage needs, calculate premiums, and assess flood risk.',
  
  longDescription: `
    The Flood Insurance Calculator is a comprehensive insurance analysis tool designed for property owners to evaluate flood insurance coverage needs, calculate premiums, and assess flood risk. This professional calculator provides detailed analysis of flood zones, elevation factors, coverage options, and risk mitigation strategies.
  
    **Key Features:**
    • **Flood Zone Analysis**: FEMA flood zone assessment and risk evaluation
    • **Elevation Analysis**: Base flood elevation and property elevation calculations
    • **Coverage Assessment**: Building and contents coverage analysis
    • **Premium Calculation**: Detailed premium breakdown and cost analysis
    • **Risk Assessment**: Flood probability and expected loss calculations
    • **Policy Comparison**: Multiple policy options and coverage scenarios
    • **Cost Optimization**: Deductible analysis and premium optimization
    • **Risk Mitigation**: Flood prevention and protection strategies
    • **Claims Analysis**: Historical claims data and settlement analysis
    • **Market Comparison**: Competitive premium analysis and market trends
  
    **Use Cases:**
    • Flood insurance policy evaluation and selection
    • Property flood risk assessment and mitigation
    • Insurance premium optimization and cost analysis
    • Flood zone compliance and regulatory requirements
    • Property purchase and investment analysis
    • Risk management and disaster preparedness
    • Insurance claims analysis and settlement evaluation
    • Property value protection and asset preservation
  `,

  inputs: [
    // Property Information
    { id: 'propertyAddress', name: 'Property Address', type: 'text', required: true, description: 'Property address', placeholder: '123 Main St, City, State', maxLength: 200 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property', placeholder: 'Select property type', options: ['single_family', 'multi_family', 'condo', 'townhouse', 'commercial', 'rental'] },
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current property value', placeholder: '300000', min: 10000, max: 10000000 },
    { id: 'propertySize', name: 'Property Size', type: 'number', unit: 'sq ft', required: true, description: 'Square footage of property', placeholder: '2000', min: 100, max: 100000 },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: true, description: 'Year property was built', placeholder: '1990', min: 1800, max: 2030 },
    { id: 'numberOfStories', name: 'Number of Stories', type: 'number', required: true, description: 'Number of stories', placeholder: '2', min: 1, max: 50 },
    { id: 'foundationType', name: 'Foundation Type', type: 'select', required: true, description: 'Type of foundation', placeholder: 'Select foundation type', options: ['slab', 'crawlspace', 'basement', 'elevated', 'pier_and_beam'] },
    
    // Location Information
    { id: 'floodZone', name: 'Flood Zone', type: 'select', required: true, description: 'FEMA flood zone designation', placeholder: 'Select flood zone', options: ['A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE', 'B', 'C', 'D', 'X', 'M', 'P'] },
    { id: 'elevationCertificate', name: 'Elevation Certificate', type: 'boolean', required: false, description: 'Whether property has elevation certificate', placeholder: 'false' },
    { id: 'baseFloodElevation', name: 'Base Flood Elevation', type: 'number', unit: 'feet', required: false, description: 'Base flood elevation above sea level', placeholder: '10', min: -50, max: 10000 },
    { id: 'propertyElevation', name: 'Property Elevation', type: 'number', unit: 'feet', required: false, description: 'Property elevation above sea level', placeholder: '12', min: -50, max: 10000 },
    { id: 'distanceToWater', name: 'Distance to Water', type: 'number', unit: 'feet', required: false, description: 'Distance to nearest water body', placeholder: '500', min: 0, max: 100000 },
    { id: 'coastalLocation', name: 'Coastal Location', type: 'boolean', required: false, description: 'Whether property is in coastal area', placeholder: 'false' },
    
    // Coverage Information
    { id: 'buildingCoverage', name: 'Building Coverage', type: 'number', unit: 'USD', required: true, description: 'Building coverage amount', placeholder: '250000', min: 10000, max: 10000000 },
    { id: 'contentsCoverage', name: 'Contents Coverage', type: 'number', unit: 'USD', required: true, description: 'Contents coverage amount', placeholder: '100000', min: 0, max: 5000000 },
    { id: 'replacementCostValue', name: 'Replacement Cost Value', type: 'number', unit: 'USD', required: false, description: 'Replacement cost value', placeholder: '350000', min: 10000, max: 10000000 },
    { id: 'actualCashValue', name: 'Actual Cash Value', type: 'boolean', required: false, description: 'Whether policy uses actual cash value', placeholder: 'false' },
    { id: 'replacementCost', name: 'Replacement Cost', type: 'boolean', required: false, description: 'Whether policy uses replacement cost', placeholder: 'true' },
    
    // Deductible Information
    { id: 'buildingDeductible', name: 'Building Deductible', type: 'number', unit: 'USD', required: true, description: 'Building deductible amount', placeholder: '1000', min: 500, max: 100000 },
    { id: 'contentsDeductible', name: 'Contents Deductible', type: 'number', unit: 'USD', required: true, description: 'Contents deductible amount', placeholder: '1000', min: 500, max: 100000 },
    { id: 'separateDeductibles', name: 'Separate Deductibles', type: 'boolean', required: false, description: 'Whether building and contents have separate deductibles', placeholder: 'true' },
    
    // Policy Information
    { id: 'policyType', name: 'Policy Type', type: 'select', required: true, description: 'Type of flood insurance policy', placeholder: 'Select policy type', options: ['standard', 'preferred', 'excess', 'private'] },
    { id: 'policyTerm', name: 'Policy Term', type: 'number', unit: 'months', required: true, description: 'Policy term in months', placeholder: '12', min: 1, max: 60 },
    { id: 'policyStartDate', name: 'Policy Start Date', type: 'date', required: true, description: 'Policy start date', placeholder: '2024-01-01' },
    { id: 'policyEndDate', name: 'Policy End Date', type: 'date', required: true, description: 'Policy end date', placeholder: '2024-12-31' },
    
    // Risk Factors
    { id: 'floodHistory', name: 'Flood History', type: 'boolean', required: false, description: 'Whether property has flood history', placeholder: 'false' },
    { id: 'numberOfPreviousClaims', name: 'Number of Previous Claims', type: 'number', required: false, description: 'Number of previous flood claims', placeholder: '0', min: 0, max: 50 },
    { id: 'yearsSinceLastClaim', name: 'Years Since Last Claim', type: 'number', unit: 'years', required: false, description: 'Years since last flood claim', placeholder: '10', min: 0, max: 100 },
    { id: 'floodRiskScore', name: 'Flood Risk Score', type: 'number', unit: 'score', required: false, description: 'Flood risk score (1-10)', placeholder: '5', min: 1, max: 10 },
    { id: 'elevationRisk', name: 'Elevation Risk', type: 'select', required: false, description: 'Elevation risk level', placeholder: 'Select risk level', options: ['low', 'medium', 'high'] },
    
    // Building Characteristics
    { id: 'constructionType', name: 'Construction Type', type: 'select', required: false, description: 'Building construction type', placeholder: 'Select construction type', options: ['frame', 'masonry', 'fire_resistive', 'non_combustible'] },
    { id: 'roofType', name: 'Roof Type', type: 'select', required: false, description: 'Roof type', placeholder: 'Select roof type', options: ['gable', 'hip', 'flat', 'mansard', 'gambrel'] },
    { id: 'roofAge', name: 'Roof Age', type: 'number', unit: 'years', required: false, description: 'Age of roof in years', placeholder: '10', min: 0, max: 100 },
    { id: 'foundationHeight', name: 'Foundation Height', type: 'number', unit: 'feet', required: false, description: 'Foundation height above ground', placeholder: '2', min: 0, max: 50 },
    { id: 'floodVents', name: 'Flood Vents', type: 'boolean', required: false, description: 'Whether property has flood vents', placeholder: 'true' },
    { id: 'numberOfFloodVents', name: 'Number of Flood Vents', type: 'number', required: false, description: 'Number of flood vents', placeholder: '4', min: 0, max: 100 },
    
    // Community Information
    { id: 'communityRatingSystem', name: 'Community Rating System', type: 'number', unit: 'score', required: false, description: 'Community rating system score (1-10)', placeholder: '7', min: 1, max: 10 },
    { id: 'floodplainManagement', name: 'Floodplain Management', type: 'boolean', required: false, description: 'Whether community has floodplain management', placeholder: 'true' },
    { id: 'buildingCodes', name: 'Building Codes', type: 'select', required: false, description: 'Building code requirements', placeholder: 'Select building codes', options: ['none', 'basic', 'enhanced', 'strict'] },
    { id: 'emergencyServices', name: 'Emergency Services', type: 'boolean', required: false, description: 'Whether emergency services are available', placeholder: 'true' },
    
    // Insurance Company Information
    { id: 'insuranceCompany', name: 'Insurance Company', type: 'text', required: false, description: 'Insurance company name', placeholder: 'ABC Insurance Co.', maxLength: 100 },
    { id: 'companyRating', name: 'Company Rating', type: 'select', required: false, description: 'Insurance company rating', placeholder: 'Select rating', options: ['A++', 'A+', 'A', 'A-', 'B++', 'B+', 'B', 'B-', 'C++', 'C+', 'C', 'C-', 'D', 'E', 'F'] },
    { id: 'claimsService', name: 'Claims Service', type: 'select', required: false, description: 'Claims service quality', placeholder: 'Select service quality', options: ['excellent', 'good', 'fair', 'poor'] },
    
    // Discounts and Credits
    { id: 'multiPolicyDiscount', name: 'Multi-Policy Discount', type: 'boolean', required: false, description: 'Whether multi-policy discount applies', placeholder: 'true' },
    { id: 'claimsFreeDiscount', name: 'Claims-Free Discount', type: 'boolean', required: false, description: 'Whether claims-free discount applies', placeholder: 'true' },
    { id: 'protectiveDeviceDiscount', name: 'Protective Device Discount', type: 'boolean', required: false, description: 'Whether protective device discount applies', placeholder: 'false' },
    { id: 'communityDiscount', name: 'Community Discount', type: 'boolean', required: false, description: 'Whether community discount applies', placeholder: 'true' },
    { id: 'elevationDiscount', name: 'Elevation Discount', type: 'boolean', required: false, description: 'Whether elevation discount applies', placeholder: 'false' },
    
    // Additional Coverage
    { id: 'lossOfUse', name: 'Loss of Use', type: 'boolean', required: false, description: 'Whether loss of use coverage is included', placeholder: 'false' },
    { id: 'lossOfUseLimit', name: 'Loss of Use Limit', type: 'number', unit: 'USD', required: false, description: 'Loss of use coverage limit', placeholder: '5000', min: 0, max: 100000 },
    { id: 'ordinanceOrLaw', name: 'Ordinance or Law', type: 'boolean', required: false, description: 'Whether ordinance or law coverage is included', placeholder: 'false' },
    { id: 'ordinanceOrLawLimit', name: 'Ordinance or Law Limit', type: 'number', unit: 'USD', required: false, description: 'Ordinance or law coverage limit', placeholder: '10000', min: 0, max: 100000 },
    { id: 'sewerBackup', name: 'Sewer Backup', type: 'boolean', required: false, description: 'Whether sewer backup coverage is included', placeholder: 'false' },
    { id: 'sewerBackupLimit', name: 'Sewer Backup Limit', type: 'number', unit: 'USD', required: false, description: 'Sewer backup coverage limit', placeholder: '5000', min: 0, max: 100000 },
    
    // Analysis Parameters
    { id: 'analysisPeriod', name: 'Analysis Period', type: 'number', unit: 'years', required: true, description: 'Analysis period in years', placeholder: '10', min: 1, max: 30 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Annual inflation rate', placeholder: '2.5', min: -10, max: 20 },
    { id: 'propertyAppreciationRate', name: 'Property Appreciation Rate', type: 'number', unit: '%', required: false, description: 'Annual property appreciation rate', placeholder: '3', min: -20, max: 20 },
    
    // Reporting Preferences
    { id: 'currency', name: 'Currency', type: 'select', required: false, description: 'Display currency', placeholder: 'Select currency', options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'] },
    { id: 'displayFormat', name: 'Display Format', type: 'select', required: false, description: 'Number display format', placeholder: 'Select format', options: ['percentage', 'decimal', 'basis-points'] },
    { id: 'includeCharts', name: 'Include Charts', type: 'boolean', required: false, description: 'Include visual charts in analysis', placeholder: 'true' }
  ],

  outputs: [
    // Premium Analysis
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual flood insurance premium' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly flood insurance premium' },
    { id: 'totalPremium', name: 'Total Premium', type: 'number', unit: 'USD', description: 'Total premium over analysis period' },
    { id: 'premiumPerSquareFoot', name: 'Premium per Square Foot', type: 'number', unit: 'USD/sq ft', description: 'Premium per square foot' },
    { id: 'premiumToValueRatio', name: 'Premium to Value Ratio', type: 'number', unit: '%', description: 'Premium as percentage of property value' },
    
    // Coverage Analysis
    { id: 'totalCoverage', name: 'Total Coverage', type: 'number', unit: 'USD', description: 'Total coverage amount' },
    { id: 'coverageGap', name: 'Coverage Gap', type: 'number', unit: 'USD', description: 'Gap between coverage and property value' },
    { id: 'coverageAdequacy', name: 'Coverage Adequacy', type: 'number', unit: '%', description: 'Percentage of property value covered' },
    { id: 'replacementCostCoverage', name: 'Replacement Cost Coverage', type: 'number', unit: 'USD', description: 'Replacement cost coverage amount' },
    
    // Risk Analysis
    { id: 'floodRiskLevel', name: 'Flood Risk Level', type: 'string', description: 'Overall flood risk level' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: 'score', description: 'Overall risk score (1-10)' },
    { id: 'probabilityOfFlood', name: 'Probability of Flood', type: 'number', unit: '%', description: 'Probability of flood occurrence' },
    { id: 'expectedLoss', name: 'Expected Loss', type: 'number', unit: 'USD', description: 'Expected loss from flood' },
    
    // Cost Analysis
    { id: 'totalCost', name: 'Total Cost', type: 'number', unit: 'USD', description: 'Total cost over analysis period' },
    { id: 'costPerYear', name: 'Cost per Year', type: 'number', unit: 'USD', description: 'Average annual cost' },
    { id: 'costPerMonth', name: 'Cost per Month', type: 'number', unit: 'USD', description: 'Average monthly cost' },
    { id: 'costEffectiveness', name: 'Cost Effectiveness', type: 'number', unit: '%', description: 'Cost effectiveness rating' },
    
    // Deductible Analysis
    { id: 'totalDeductible', name: 'Total Deductible', type: 'number', unit: 'USD', description: 'Total deductible amount' },
    { id: 'deductibleImpact', name: 'Deductible Impact', type: 'number', unit: 'USD', description: 'Impact of deductible on premium' },
    { id: 'outOfPocketMaximum', name: 'Out of Pocket Maximum', type: 'number', unit: 'USD', description: 'Maximum out of pocket cost' },
    
    // Policy Analysis
    { id: 'policyEfficiency', name: 'Policy Efficiency', type: 'number', unit: '%', description: 'Overall policy efficiency rating' },
    { id: 'coverageEfficiency', name: 'Coverage Efficiency', type: 'number', unit: '%', description: 'Coverage efficiency rating' },
    { id: 'premiumEfficiency', name: 'Premium Efficiency', type: 'number', unit: '%', description: 'Premium efficiency rating' },
    
    // Policy Rating
    { id: 'policyRating', name: 'Policy Rating', type: 'string', description: 'Overall policy rating' },
    { id: 'riskRating', name: 'Risk Rating', type: 'string', description: 'Overall risk rating' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Insurance recommendation' },
    
    // Comprehensive Analysis
    { id: 'floodInsuranceAnalysis', name: 'Flood Insurance Analysis Report', type: 'string', description: 'Comprehensive flood insurance analysis with recommendations' }
  ],

  calculate: (inputs) => {
    return calculateFloodInsurance(inputs);
  },

  generateReport: (inputs, outputs) => {
    return generateFloodInsuranceAnalysis(inputs, outputs);
  },

  formulas: [
    {
      name: 'Annual Premium',
      formula: 'Annual Premium = Base Premium + Coverage Premium + Risk Surcharge - Discounts',
      description: 'Total annual flood insurance premium'
    },
    {
      name: 'Premium to Value Ratio',
      formula: 'Premium to Value Ratio = (Annual Premium / Property Value) × 100',
      description: 'Premium as percentage of property value'
    },
    {
      name: 'Coverage Adequacy',
      formula: 'Coverage Adequacy = (Total Coverage / Property Value) × 100',
      description: 'Percentage of property value covered'
    },
    {
      name: 'Risk Score',
      formula: 'Risk Score = Flood Zone Risk + Elevation Risk + Construction Risk + Claims Risk',
      description: 'Overall flood risk assessment'
    },
    {
      name: 'Expected Loss',
      formula: 'Expected Loss = Property Value × Probability of Flood × Loss Severity',
      description: 'Expected loss from flood event'
    },
    {
      name: 'Total Deductible',
      formula: 'Total Deductible = Building Deductible + Contents Deductible',
      description: 'Total deductible amount'
    },
    {
      name: 'Cost Effectiveness',
      formula: 'Cost Effectiveness = (Expected Loss - Total Premium) / Expected Loss × 100',
      description: 'Cost effectiveness of insurance'
    },
    {
      name: 'Policy Efficiency',
      formula: 'Policy Efficiency = (Coverage Adequacy + Cost Effectiveness) / 2',
      description: 'Overall policy efficiency rating'
    }
  ],

  examples: [
    {
      name: 'Standard Flood Insurance Policy',
      description: 'Typical flood insurance policy for residential property in moderate flood zone',
      inputs: {
        propertyAddress: '123 Oak Street, Suburbia, CA',
        propertyType: 'single_family',
        propertyValue: 350000,
        propertySize: 2000,
        yearBuilt: 1995,
        numberOfStories: 2,
        foundationType: 'slab',
        floodZone: 'AE',
        elevationCertificate: true,
        baseFloodElevation: 10,
        propertyElevation: 12,
        distanceToWater: 500,
        coastalLocation: false,
        buildingCoverage: 250000,
        contentsCoverage: 100000,
        replacementCostValue: 350000,
        actualCashValue: false,
        replacementCost: true,
        buildingDeductible: 1000,
        contentsDeductible: 1000,
        separateDeductibles: true,
        policyType: 'standard',
        policyTerm: 12,
        policyStartDate: '2024-01-01',
        policyEndDate: '2024-12-31',
        floodHistory: false,
        numberOfPreviousClaims: 0,
        yearsSinceLastClaim: 10,
        floodRiskScore: 5,
        elevationRisk: 'medium',
        constructionType: 'frame',
        roofType: 'gable',
        roofAge: 10,
        foundationHeight: 2,
        floodVents: true,
        numberOfFloodVents: 4,
        communityRatingSystem: 7,
        floodplainManagement: true,
        buildingCodes: 'enhanced',
        emergencyServices: true,
        insuranceCompany: 'ABC Insurance Co.',
        companyRating: 'A+',
        claimsService: 'good',
        multiPolicyDiscount: true,
        claimsFreeDiscount: true,
        protectiveDeviceDiscount: false,
        communityDiscount: true,
        elevationDiscount: false,
        lossOfUse: false,
        lossOfUseLimit: 5000,
        ordinanceOrLaw: false,
        ordinanceOrLawLimit: 10000,
        sewerBackup: false,
        sewerBackupLimit: 5000,
        analysisPeriod: 10,
        inflationRate: 2.5,
        propertyAppreciationRate: 3
      }
    },
    {
      name: 'High-Risk Flood Zone Policy',
      description: 'Flood insurance policy for property in high-risk flood zone',
      inputs: {
        propertyAddress: '456 Beach Road, Coastal City, FL',
        propertyType: 'single_family',
        propertyValue: 500000,
        propertySize: 2500,
        yearBuilt: 1980,
        numberOfStories: 1,
        foundationType: 'elevated',
        floodZone: 'VE',
        elevationCertificate: true,
        baseFloodElevation: 8,
        propertyElevation: 6,
        distanceToWater: 100,
        coastalLocation: true,
        buildingCoverage: 400000,
        contentsCoverage: 150000,
        replacementCostValue: 500000,
        actualCashValue: false,
        replacementCost: true,
        buildingDeductible: 2500,
        contentsDeductible: 1000,
        separateDeductibles: true,
        policyType: 'standard',
        policyTerm: 12,
        policyStartDate: '2024-01-01',
        policyEndDate: '2024-12-31',
        floodHistory: true,
        numberOfPreviousClaims: 2,
        yearsSinceLastClaim: 3,
        floodRiskScore: 8,
        elevationRisk: 'high',
        constructionType: 'masonry',
        roofType: 'hip',
        roofAge: 5,
        foundationHeight: 4,
        floodVents: true,
        numberOfFloodVents: 6,
        communityRatingSystem: 5,
        floodplainManagement: true,
        buildingCodes: 'strict',
        emergencyServices: true,
        insuranceCompany: 'XYZ Insurance Co.',
        companyRating: 'A',
        claimsService: 'excellent',
        multiPolicyDiscount: true,
        claimsFreeDiscount: false,
        protectiveDeviceDiscount: true,
        communityDiscount: true,
        elevationDiscount: true,
        lossOfUse: true,
        lossOfUseLimit: 10000,
        ordinanceOrLaw: true,
        ordinanceOrLawLimit: 25000,
        sewerBackup: true,
        sewerBackupLimit: 10000,
        analysisPeriod: 10,
        inflationRate: 2.5,
        propertyAppreciationRate: 2
      }
    }
  ],

  tags: ['Flood Insurance', 'Property Insurance', 'Risk Assessment', 'Flood Zone', 'Insurance Analysis', 'Disaster Preparedness', 'Property Protection', 'Insurance Premiums'],

  category_info: {
    name: 'Flood Insurance',
    description: 'Professional tools for flood insurance analysis, risk assessment, and policy optimization'
  }
};
