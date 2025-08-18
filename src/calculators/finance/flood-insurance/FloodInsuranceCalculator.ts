import { Calculator } from '../../../types/calculator';
import { calculateFloodInsurance, generateFloodInsuranceAnalysis } from './formulas';
import { validateFloodInsuranceInputs } from './validation';

export const FloodInsuranceCalculator: Calculator = {
  id: 'flood-insurance-calculator',
  name: 'Flood Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate flood insurance premiums, coverage requirements, and risk assessment for properties in flood zones including NFIP and private insurance options.',
  inputs: [
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Total value of the property', placeholder: '300000', min: 10000, max: 10000000 },
    { id: 'buildingValue', name: 'Building Value', type: 'number', unit: 'USD', required: true, description: 'Value of the building structure', placeholder: '250000', min: 10000, max: 10000000 },
    { id: 'contentsValue', name: 'Contents Value', type: 'number', unit: 'USD', required: true, description: 'Value of personal property and contents', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'floodZone', name: 'Flood Zone', type: 'select', required: true, description: 'FEMA flood zone designation', options: ['X', 'A', 'AE', 'AH', 'AO', 'AR', 'A99', 'V', 'VE', 'B', 'C', 'D'] },
    { id: 'elevationCertificate', name: 'Elevation Certificate', type: 'select', required: true, description: 'Whether property has elevation certificate', options: ['yes', 'no', 'unknown'] },
    { id: 'baseFloodElevation', name: 'Base Flood Elevation (BFE)', type: 'number', unit: 'feet', required: false, description: 'Base flood elevation from elevation certificate', placeholder: '10.5', min: -50, max: 100 },
    { id: 'buildingElevation', name: 'Building Elevation', type: 'number', unit: 'feet', required: false, description: 'Elevation of the lowest floor of the building', placeholder: '12.0', min: -50, max: 100 },
    { id: 'deductible', name: 'Deductible', type: 'number', unit: 'USD', required: true, description: 'Insurance deductible amount', placeholder: '1000', min: 500, max: 10000 },
    { id: 'policyType', name: 'Policy Type', type: 'select', required: true, description: 'Type of flood insurance policy', options: ['nfip-standard', 'nfip-prefered-risk', 'private-insurance', 'excess-coverage'] },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property being insured', options: ['single-family', 'multi-family', 'condo', 'commercial', 'rental'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: true, description: 'How the property is occupied', options: ['primary-residence', 'secondary-home', 'rental', 'business'] },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: false, description: 'Year the building was constructed', placeholder: '1990', min: 1800, max: 2024 },
    { id: 'numberOfFloors', name: 'Number of Floors', type: 'number', required: false, description: 'Number of floors in the building', placeholder: '2', min: 1, max: 20 },
    { id: 'basement', name: 'Basement', type: 'select', required: false, description: 'Whether the building has a basement', options: ['yes', 'no', 'partial'] },
    { id: 'floodHistory', name: 'Flood History', type: 'select', required: false, description: 'History of flood damage to the property', options: ['none', 'minor', 'moderate', 'severe', 'unknown'] },
    { id: 'location', name: 'Location', type: 'string', required: true, description: 'Property location (city, state)', placeholder: 'Miami, FL' },
    { id: 'distanceToWater', name: 'Distance to Water', type: 'number', unit: 'feet', required: false, description: 'Distance to nearest body of water', placeholder: '500', min: 0, max: 10000 },
    { id: 'waterType', name: 'Water Type', type: 'select', required: false, description: 'Type of nearest water body', options: ['ocean', 'lake', 'river', 'stream', 'pond', 'none'] },
    { id: 'coastalArea', name: 'Coastal Area', type: 'select', required: false, description: 'Whether property is in a coastal area', options: ['yes', 'no'] },
    { id: 'stormSurgeRisk', name: 'Storm Surge Risk', type: 'select', required: false, description: 'Risk level for storm surge', options: ['low', 'moderate', 'high', 'very-high'] },
    { id: 'communityRating', name: 'Community Rating', type: 'select', required: false, description: 'NFIP Community Rating System score', options: ['class-1', 'class-2', 'class-3', 'class-4', 'class-5', 'class-6', 'class-7', 'class-8', 'class-9', 'class-10'] },
    { id: 'mitigationMeasures', name: 'Mitigation Measures', type: 'multiselect', required: false, description: 'Flood mitigation measures in place', options: ['elevated-foundation', 'flood-walls', 'sump-pump', 'backflow-valve', 'waterproofing', 'none'] },
    { id: 'buildingCode', name: 'Building Code Compliance', type: 'select', required: false, description: 'Compliance with flood-resistant building codes', options: ['compliant', 'partially-compliant', 'non-compliant', 'unknown'] },
    { id: 'coverageType', name: 'Coverage Type', type: 'select', required: true, description: 'Type of coverage needed', options: ['building-only', 'contents-only', 'building-and-contents'] },
    { id: 'replacementCost', name: 'Replacement Cost', type: 'number', unit: 'USD', required: false, description: 'Cost to rebuild the building', placeholder: '300000', min: 10000, max: 10000000 },
    { id: 'actualCashValue', name: 'Actual Cash Value', type: 'number', unit: 'USD', required: false, description: 'Actual cash value of the building', placeholder: '200000', min: 10000, max: 10000000 },
    { id: 'additionalCoverage', name: 'Additional Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional coverage beyond standard limits', placeholder: '0', min: 0, max: 1000000 },
    { id: 'lossOfUse', name: 'Loss of Use Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional living expenses coverage', placeholder: '0', min: 0, max: 100000 },
    { id: 'debrisRemoval', name: 'Debris Removal Coverage', type: 'number', unit: 'USD', required: false, description: 'Debris removal coverage amount', placeholder: '0', min: 0, max: 100000 },
    { id: 'increasedCost', name: 'Increased Cost of Compliance', type: 'number', unit: 'USD', required: false, description: 'ICC coverage for code upgrades', placeholder: '0', min: 0, max: 100000 },
    { id: 'policyTerm', name: 'Policy Term', type: 'select', required: true, description: 'Duration of the insurance policy', options: ['1-year', '3-year', '5-year'] },
    { id: 'paymentFrequency', name: 'Payment Frequency', type: 'select', required: true, description: 'How often premiums are paid', options: ['annual', 'semi-annual', 'quarterly', 'monthly'] },
    { id: 'discounts', name: 'Available Discounts', type: 'multiselect', required: false, description: 'Discounts that may apply', options: ['elevation-discount', 'mitigation-discount', 'community-discount', 'loyalty-discount', 'multi-policy', 'none'] },
    { id: 'surcharges', name: 'Surcharges', type: 'multiselect', required: false, description: 'Additional charges that may apply', options: ['late-fee', 'administrative-fee', 'risk-surcharge', 'coastal-surcharge', 'none'] },
    { id: 'agentFee', name: 'Agent Fee', type: 'number', unit: 'USD', required: false, description: 'Insurance agent or broker fee', placeholder: '0', min: 0, max: 5000 },
    { id: 'inspectionFee', name: 'Inspection Fee', type: 'number', unit: 'USD', required: false, description: 'Property inspection fee', placeholder: '0', min: 0, max: 1000 },
    { id: 'applicationFee', name: 'Application Fee', type: 'number', unit: 'USD', required: false, description: 'Policy application fee', placeholder: '0', min: 0, max: 500 },
    { id: 'riskTolerance', name: 'Risk Tolerance', type: 'select', required: false, description: 'Insured risk tolerance level', options: ['conservative', 'moderate', 'aggressive'] },
    { id: 'budget', name: 'Monthly Budget', type: 'number', unit: 'USD', required: false, description: 'Monthly budget for insurance', placeholder: '200', min: 0, max: 5000 },
    { id: 'comparisonCount', name: 'Number of Quotes', type: 'number', required: false, description: 'Number of insurance quotes to compare', placeholder: '3', min: 1, max: 10 }
  ],
  outputs: [
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual flood insurance premium' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly flood insurance premium' },
    { id: 'buildingCoverage', name: 'Building Coverage', type: 'number', unit: 'USD', description: 'Maximum building coverage amount' },
    { id: 'contentsCoverage', name: 'Contents Coverage', type: 'number', unit: 'USD', description: 'Maximum contents coverage amount' },
    { id: 'totalCoverage', name: 'Total Coverage', type: 'number', unit: 'USD', description: 'Total coverage amount' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Flood risk assessment score (1-100)' },
    { id: 'premiumRate', name: 'Premium Rate', type: 'number', unit: '%', description: 'Premium rate as percentage of coverage' },
    { id: 'coverageRatio', name: 'Coverage Ratio', type: 'number', unit: '%', description: 'Percentage of property value covered' },
    { id: 'deductibleAmount', name: 'Deductible Amount', type: 'number', unit: 'USD', description: 'Amount of deductible' },
    { id: 'outOfPocketMax', name: 'Out of Pocket Maximum', type: 'number', unit: 'USD', description: 'Maximum out of pocket expense' },
    { id: 'replacementCostRatio', name: 'Replacement Cost Ratio', type: 'number', unit: '%', description: 'Percentage of replacement cost covered' },
    { id: 'annualSavings', name: 'Annual Savings', type: 'number', unit: 'USD', description: 'Potential annual savings with discounts' },
    { id: 'totalCost', name: 'Total Cost', type: 'number', unit: 'USD', description: 'Total annual cost including fees' },
    { id: 'costPerMonth', name: 'Cost Per Month', type: 'number', unit: 'USD', description: 'Total monthly cost' },
    { id: 'affordabilityScore', name: 'Affordability Score', type: 'number', description: 'Affordability assessment score (1-100)' },
    { id: 'recommendedCoverage', name: 'Recommended Coverage', type: 'number', unit: 'USD', description: 'Recommended coverage amount' },
    { id: 'minimumRequired', name: 'Minimum Required', type: 'number', unit: 'USD', description: 'Minimum required coverage' },
    { id: 'excessCoverage', name: 'Excess Coverage', type: 'number', unit: 'USD', description: 'Amount of excess coverage needed' },
    { id: 'floodZoneRisk', name: 'Flood Zone Risk', type: 'string', description: 'Risk assessment for the flood zone' },
    { id: 'elevationRisk', name: 'Elevation Risk', type: 'string', description: 'Risk assessment based on elevation' },
    { id: 'mitigationBenefits', name: 'Mitigation Benefits', type: 'string', description: 'Benefits of mitigation measures' },
    { id: 'policyComparison', name: 'Policy Comparison', type: 'string', description: 'Comparison of different policy options' },
    { id: 'costBreakdown', name: 'Cost Breakdown', type: 'string', description: 'Detailed breakdown of costs' },
    { id: 'savingsOpportunities', name: 'Savings Opportunities', type: 'string', description: 'Opportunities to reduce premiums' },
    { id: 'riskMitigation', name: 'Risk Mitigation', type: 'string', description: 'Risk mitigation recommendations' },
    { id: 'complianceStatus', name: 'Compliance Status', type: 'string', description: 'Compliance with flood insurance requirements' },
    { id: 'floodInsuranceAnalysis', name: 'Flood Insurance Analysis', type: 'string', description: 'Comprehensive flood insurance analysis report' }
  ],
  calculate: (inputs) => {
    return calculateFloodInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateFloodInsuranceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'NFIP Building Premium',
      formula: 'Building Premium = Base Rate × Building Coverage × Zone Factor × Elevation Factor × Occupancy Factor',
      description: 'Standard NFIP building premium calculation'
    },
    {
      name: 'NFIP Contents Premium',
      formula: 'Contents Premium = Base Rate × Contents Coverage × Zone Factor × Occupancy Factor',
      description: 'Standard NFIP contents premium calculation'
    },
    {
      name: 'Private Insurance Premium',
      formula: 'Private Premium = Base Rate × Coverage × Risk Factor × Property Factor × Location Factor',
      description: 'Private flood insurance premium calculation'
    },
    {
      name: 'Risk Score',
      formula: 'Risk Score = Base Risk + Zone Risk + Elevation Risk + Location Risk + Property Risk',
      description: 'Composite flood risk assessment score'
    },
    {
      name: 'Premium Rate',
      formula: 'Premium Rate = (Annual Premium / Total Coverage) × 100',
      description: 'Premium as percentage of coverage amount'
    },
    {
      name: 'Coverage Ratio',
      formula: 'Coverage Ratio = (Total Coverage / Property Value) × 100',
      description: 'Percentage of property value covered by insurance'
    },
    {
      name: 'Out of Pocket Maximum',
      formula: 'Out of Pocket Max = Deductible + Additional Costs',
      description: 'Maximum amount insured would pay in a claim'
    },
    {
      name: 'Replacement Cost Ratio',
      formula: 'Replacement Cost Ratio = (Building Coverage / Replacement Cost) × 100',
      description: 'Percentage of replacement cost covered'
    },
    {
      name: 'Annual Savings',
      formula: 'Annual Savings = Base Premium × Discount Percentage',
      description: 'Savings from available discounts'
    },
    {
      name: 'Total Cost',
      formula: 'Total Cost = Annual Premium + Fees + Surcharges - Discounts',
      description: 'Total annual cost including all fees and discounts'
    },
    {
      name: 'Affordability Score',
      formula: 'Affordability Score = (Budget - Monthly Cost) / Budget × 100',
      description: 'Assessment of premium affordability'
    },
    {
      name: 'Minimum Required Coverage',
      formula: 'Minimum Required = Outstanding Mortgage Balance or 80% of Building Value',
      description: 'Minimum coverage required by lenders or regulations'
    },
    {
      name: 'Excess Coverage',
      formula: 'Excess Coverage = Property Value - Standard Coverage Limits',
      description: 'Additional coverage needed beyond standard limits'
    },
    {
      name: 'Elevation Factor',
      formula: 'Elevation Factor = (Building Elevation - Base Flood Elevation) / BFE',
      description: 'Factor based on building elevation relative to flood level'
    },
    {
      name: 'Zone Risk Factor',
      formula: 'Zone Risk = Base Zone Risk × Community Rating × Mitigation Factor',
      description: 'Risk factor based on flood zone and community rating'
    },
    {
      name: 'Mitigation Discount',
      formula: 'Mitigation Discount = Base Premium × Mitigation Factor × 0.15',
      description: 'Discount for flood mitigation measures'
    },
    {
      name: 'Community Rating Discount',
      formula: 'Community Discount = Base Premium × CRS Factor × 0.45',
      description: 'Discount based on NFIP Community Rating System'
    }
  ],
  examples: [
    {
      name: 'Standard NFIP Policy',
      inputs: {
        propertyValue: '300000',
        buildingValue: '250000',
        contentsValue: '50000',
        floodZone: 'AE',
        elevationCertificate: 'yes',
        baseFloodElevation: '10.5',
        buildingElevation: '12.0',
        deductible: '1000',
        policyType: 'nfip-standard',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        location: 'Miami, FL'
      },
      description: 'Standard NFIP flood insurance policy for a primary residence in a high-risk flood zone'
    },
    {
      name: 'Preferred Risk Policy',
      inputs: {
        propertyValue: '400000',
        buildingValue: '320000',
        contentsValue: '80000',
        floodZone: 'X',
        elevationCertificate: 'no',
        deductible: '1000',
        policyType: 'nfip-prefered-risk',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        location: 'Austin, TX'
      },
      description: 'NFIP Preferred Risk Policy for property in low-risk flood zone'
    },
    {
      name: 'Private Flood Insurance',
      inputs: {
        propertyValue: '500000',
        buildingValue: '400000',
        contentsValue: '100000',
        floodZone: 'VE',
        elevationCertificate: 'yes',
        baseFloodElevation: '8.0',
        buildingElevation: '10.5',
        deductible: '2500',
        policyType: 'private-insurance',
        propertyType: 'single-family',
        occupancyType: 'primary-residence',
        location: 'Galveston, TX'
      },
      description: 'Private flood insurance for coastal property with higher coverage limits'
    },
    {
      name: 'Commercial Property',
      inputs: {
        propertyValue: '1000000',
        buildingValue: '800000',
        contentsValue: '200000',
        floodZone: 'A',
        elevationCertificate: 'unknown',
        deductible: '5000',
        policyType: 'nfip-standard',
        propertyType: 'commercial',
        occupancyType: 'business',
        location: 'New Orleans, LA'
      },
      description: 'Commercial flood insurance policy for business property in flood-prone area'
    },
    {
      name: 'Rental Property',
      inputs: {
        propertyValue: '250000',
        buildingValue: '200000',
        contentsValue: '50000',
        floodZone: 'B',
        elevationCertificate: 'no',
        deductible: '1000',
        policyType: 'nfip-standard',
        propertyType: 'rental',
        occupancyType: 'rental',
        location: 'Tampa, FL'
      },
      description: 'Flood insurance for rental property with landlord coverage'
    }
  ]
};
