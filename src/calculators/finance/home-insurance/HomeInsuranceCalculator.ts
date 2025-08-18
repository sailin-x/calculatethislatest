import { Calculator } from '../../../types/calculator';
import { calculateHomeInsurance, generateHomeInsuranceAnalysis } from './formulas';
import { validateHomeInsuranceInputs } from './validation';

export const HomeInsuranceCalculator: Calculator = {
  id: 'home-insurance-calculator',
  name: 'Home Insurance Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate home insurance premiums, coverage amounts, and policy recommendations based on property value, location, and risk factors.',
  inputs: [
    { id: 'homeValue', name: 'Home Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the home', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'replacementCost', name: 'Replacement Cost', type: 'number', unit: 'USD', required: false, description: 'Cost to rebuild the home (if different from market value)', placeholder: '450000', min: 10000, max: 10000000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: true, description: 'Type of property', placeholder: 'single-family', options: ['single-family', 'condo', 'townhouse', 'multi-family', 'manufactured'] },
    { id: 'constructionType', name: 'Construction Type', type: 'select', required: false, description: 'Primary construction material', placeholder: 'frame', options: ['frame', 'brick', 'stone', 'concrete', 'steel', 'mixed'] },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', unit: 'year', required: false, description: 'Year the home was built', placeholder: '1995', min: 1800, max: 2024 },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', unit: 'sqft', required: false, description: 'Total living area in square feet', placeholder: '2500', min: 100, max: 50000 },
    { id: 'location', name: 'Location', type: 'select', required: true, description: 'Property location type', placeholder: 'suburban', options: ['urban', 'suburban', 'rural'] },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'State where property is located', placeholder: 'california', options: ['alabama', 'alaska', 'arizona', 'arkansas', 'california', 'colorado', 'connecticut', 'delaware', 'florida', 'georgia', 'hawaii', 'idaho', 'illinois', 'indiana', 'iowa', 'kansas', 'kentucky', 'louisiana', 'maine', 'maryland', 'massachusetts', 'michigan', 'minnesota', 'mississippi', 'missouri', 'montana', 'nebraska', 'nevada', 'new-hampshire', 'new-jersey', 'new-mexico', 'new-york', 'north-carolina', 'north-dakota', 'ohio', 'oklahoma', 'oregon', 'pennsylvania', 'rhode-island', 'south-carolina', 'south-dakota', 'tennessee', 'texas', 'utah', 'vermont', 'virginia', 'washington', 'west-virginia', 'wisconsin', 'wyoming'] },
    { id: 'zipCode', name: 'ZIP Code', type: 'string', required: false, description: 'ZIP code for location-specific rates', placeholder: '90210' },
    { id: 'crimeRate', name: 'Crime Rate', type: 'select', required: false, description: 'Local crime rate level', placeholder: 'low', options: ['low', 'medium', 'high'] },
    { id: 'fireStationDistance', name: 'Fire Station Distance', type: 'number', unit: 'miles', required: false, description: 'Distance to nearest fire station', placeholder: '2', min: 0, max: 50 },
    { id: 'floodZone', name: 'Flood Zone', type: 'select', required: false, description: 'FEMA flood zone classification', placeholder: 'x', options: ['a', 'ae', 'ah', 'ao', 'ar', 'a99', 'b', 'c', 'd', 'v', 've', 'x'] },
    { id: 'earthquakeZone', name: 'Earthquake Zone', type: 'select', required: false, description: 'Earthquake risk zone', placeholder: 'low', options: ['low', 'moderate', 'high', 'very-high'] },
    { id: 'hurricaneZone', name: 'Hurricane Zone', type: 'select', required: false, description: 'Hurricane risk zone', placeholder: 'low', options: ['low', 'moderate', 'high', 'very-high'] },
    { id: 'tornadoZone', name: 'Tornado Zone', type: 'select', required: false, description: 'Tornado risk zone', placeholder: 'low', options: ['low', 'moderate', 'high', 'very-high'] },
    { id: 'wildfireZone', name: 'Wildfire Zone', type: 'select', required: false, description: 'Wildfire risk zone', placeholder: 'low', options: ['low', 'moderate', 'high', 'very-high'] },
    { id: 'deductible', name: 'Deductible', type: 'number', unit: 'USD', required: false, description: 'Insurance deductible amount', placeholder: '1000', min: 100, max: 10000 },
    { id: 'coverageLevel', name: 'Coverage Level', type: 'select', required: false, description: 'Desired coverage level', placeholder: 'standard', options: ['basic', 'standard', 'premium', 'comprehensive'] },
    { id: 'personalPropertyValue', name: 'Personal Property Value', type: 'number', unit: 'USD', required: false, description: 'Value of personal belongings to insure', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'liabilityCoverage', name: 'Liability Coverage', type: 'number', unit: 'USD', required: false, description: 'Desired liability coverage amount', placeholder: '300000', min: 100000, max: 5000000 },
    { id: 'medicalPayments', name: 'Medical Payments', type: 'number', unit: 'USD', required: false, description: 'Medical payments coverage amount', placeholder: '5000', min: 1000, max: 100000 },
    { id: 'lossOfUse', name: 'Loss of Use Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional living expenses coverage', placeholder: '20000', min: 0, max: 100000 },
    { id: 'identityTheft', name: 'Identity Theft Coverage', type: 'boolean', required: false, description: 'Include identity theft protection', placeholder: 'false' },
    { id: 'waterBackup', name: 'Water Backup Coverage', type: 'boolean', required: false, description: 'Include water backup and sump overflow', placeholder: 'false' },
    { id: 'jewelryCoverage', name: 'Jewelry Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional jewelry coverage amount', placeholder: '5000', min: 0, max: 100000 },
    { id: 'electronicsCoverage', name: 'Electronics Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional electronics coverage amount', placeholder: '10000', min: 0, max: 100000 },
    { id: 'businessEquipment', name: 'Business Equipment Coverage', type: 'number', unit: 'USD', required: false, description: 'Business equipment coverage amount', placeholder: '5000', min: 0, max: 100000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', unit: 'score', required: false, description: 'Credit score (affects rates)', placeholder: '750', min: 300, max: 850 },
    { id: 'claimsHistory', name: 'Claims History', type: 'select', required: false, description: 'Recent claims history', placeholder: 'none', options: ['none', '1-2', '3-5', '5-plus'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property is occupied', placeholder: 'owner-occupied', options: ['owner-occupied', 'tenant-occupied', 'vacant'] },
    { id: 'securityFeatures', name: 'Security Features', type: 'multiselect', required: false, description: 'Security features installed', placeholder: 'alarm-system', options: ['alarm-system', 'smoke-detectors', 'fire-sprinklers', 'deadbolts', 'security-cameras', 'gated-community', 'none'] },
    { id: 'roofAge', name: 'Roof Age', type: 'number', unit: 'years', required: false, description: 'Age of the roof in years', placeholder: '10', min: 0, max: 50 },
    { id: 'heatingSystem', name: 'Heating System', type: 'select', required: false, description: 'Type of heating system', placeholder: 'forced-air', options: ['forced-air', 'baseboard', 'radiant', 'heat-pump', 'boiler', 'none'] },
    { id: 'electricalSystem', name: 'Electrical System', type: 'select', required: false, description: 'Type of electrical system', placeholder: 'modern', options: ['modern', 'updated', 'original', 'knob-and-tube'] },
    { id: 'plumbingSystem', name: 'Plumbing System', type: 'select', required: false, description: 'Type of plumbing system', placeholder: 'modern', options: ['modern', 'updated', 'original', 'galvanized'] }
  ],
  outputs: [
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual insurance premium' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly insurance premium' },
    { id: 'dwellingCoverage', name: 'Dwelling Coverage', type: 'number', unit: 'USD', description: 'Recommended dwelling coverage amount' },
    { id: 'personalPropertyCoverage', name: 'Personal Property Coverage', type: 'number', unit: 'USD', description: 'Personal property coverage amount' },
    { id: 'liabilityCoverageAmount', name: 'Liability Coverage Amount', type: 'number', unit: 'USD', description: 'Liability coverage amount' },
    { id: 'medicalPaymentsAmount', name: 'Medical Payments Amount', type: 'number', unit: 'USD', description: 'Medical payments coverage amount' },
    { id: 'lossOfUseAmount', name: 'Loss of Use Amount', type: 'number', unit: 'USD', description: 'Loss of use coverage amount' },
    { id: 'totalCoverage', name: 'Total Coverage', type: 'number', unit: 'USD', description: 'Total coverage amount' },
    { id: 'replacementCostRatio', name: 'Replacement Cost Ratio', type: 'number', unit: '%', description: 'Coverage as percentage of replacement cost' },
    { id: 'coverageGap', name: 'Coverage Gap', type: 'number', unit: 'USD', description: 'Gap between coverage and replacement cost' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: 'score', description: 'Overall risk assessment score' },
    { id: 'premiumScore', name: 'Premium Score', type: 'number', unit: 'score', description: 'Premium competitiveness score' },
    { id: 'coverageScore', name: 'Coverage Score', type: 'number', unit: 'score', description: 'Coverage adequacy score' },
    { id: 'recommendedDeductible', name: 'Recommended Deductible', type: 'number', unit: 'USD', description: 'Recommended deductible amount' },
    { id: 'premiumSavings', name: 'Potential Premium Savings', type: 'number', unit: 'USD', description: 'Potential savings with recommended deductible' },
    { id: 'riskFactors', name: 'Risk Factors', type: 'string', description: 'Key risk factors affecting premium' },
    { id: 'discounts', name: 'Available Discounts', type: 'string', description: 'Available discounts and savings' },
    { id: 'recommendations', name: 'Coverage Recommendations', type: 'string', description: 'Coverage recommendations' },
    { id: 'comparisonTable', name: 'Premium Comparison', type: 'string', description: 'Premium comparison with different deductibles' },
    { id: 'annualCost', name: 'Annual Cost', type: 'number', unit: 'USD', description: 'Total annual cost including premium and deductible' },
    { id: 'costPerThousand', name: 'Cost per $1000 Coverage', type: 'number', unit: 'USD', description: 'Cost per $1000 of dwelling coverage' },
    { id: 'coverageAdequacy', name: 'Coverage Adequacy', type: 'string', description: 'Assessment of coverage adequacy' },
    { id: 'policyGrade', name: 'Policy Grade', type: 'string', description: 'Overall policy grade assessment' },
    { id: 'homeInsuranceAnalysis', name: 'Home Insurance Analysis', type: 'string', description: 'Comprehensive home insurance analysis report' }
  ],
  calculate: (inputs) => {
    return calculateHomeInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHomeInsuranceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Base Premium Calculation',
      description: 'Calculate base premium using replacement cost and location factors',
      formula: 'Base Premium = Replacement Cost × Base Rate × Location Factor × Construction Factor',
      variables: {
        'Replacement Cost': 'Cost to rebuild the home',
        'Base Rate': 'Base rate per $1000 of coverage',
        'Location Factor': 'Geographic risk factor',
        'Construction Factor': 'Construction type risk factor'
      }
    },
    {
      name: 'Risk Factor Calculation',
      description: 'Calculate risk factors affecting premium',
      formula: 'Risk Factor = (Crime Factor + Natural Disaster Factor + Property Factor + Claims Factor) / 4',
      variables: {
        'Crime Factor': 'Local crime rate impact',
        'Natural Disaster Factor': 'Natural disaster risk impact',
        'Property Factor': 'Property condition and features impact',
        'Claims Factor': 'Claims history impact'
      }
    },
    {
      name: 'Deductible Impact',
      description: 'Calculate premium savings with higher deductibles',
      formula: 'Premium Savings = Base Premium × Deductible Discount Rate',
      variables: {
        'Base Premium': 'Premium with standard deductible',
        'Deductible Discount Rate': 'Discount percentage for higher deductible'
      }
    },
    {
      name: 'Coverage Adequacy',
      description: 'Assess coverage adequacy relative to replacement cost',
      formula: 'Coverage Ratio = Dwelling Coverage / Replacement Cost',
      variables: {
        'Dwelling Coverage': 'Insurance dwelling coverage amount',
        'Replacement Cost': 'Actual replacement cost of the home'
      }
    }
  ],
  examples: [
    {
      name: 'Standard Home Insurance',
      description: 'Typical single-family home with standard coverage',
      inputs: {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1995,
        squareFootage: 2500,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard',
        personalPropertyValue: 50000,
        liabilityCoverage: 300000
      },
      expectedOutputs: {
        annualPremium: 1200,
        dwellingCoverage: 450000,
        personalPropertyCoverage: 225000,
        liabilityCoverageAmount: 300000,
        riskScore: 25,
        coverageScore: 85
      }
    },
    {
      name: 'High-Risk Area Insurance',
      description: 'Home in high-risk area with comprehensive coverage',
      inputs: {
        homeValue: 600000,
        replacementCost: 550000,
        propertyType: 'single-family',
        constructionType: 'brick',
        yearBuilt: 2000,
        squareFootage: 3000,
        location: 'urban',
        state: 'florida',
        floodZone: 'ae',
        hurricaneZone: 'high',
        deductible: 2500,
        coverageLevel: 'comprehensive',
        personalPropertyValue: 75000,
        liabilityCoverage: 500000
      },
      expectedOutputs: {
        annualPremium: 3500,
        dwellingCoverage: 550000,
        personalPropertyCoverage: 275000,
        liabilityCoverageAmount: 500000,
        riskScore: 65,
        coverageScore: 90
      }
    },
    {
      name: 'Low-Risk Area Insurance',
      description: 'Home in low-risk area with basic coverage',
      inputs: {
        homeValue: 300000,
        replacementCost: 280000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 2010,
        squareFootage: 2000,
        location: 'suburban',
        state: 'minnesota',
        crimeRate: 'low',
        fireStationDistance: 1,
        deductible: 500,
        coverageLevel: 'basic',
        personalPropertyValue: 30000,
        liabilityCoverage: 200000
      },
      expectedOutputs: {
        annualPremium: 800,
        dwellingCoverage: 280000,
        personalPropertyCoverage: 140000,
        liabilityCoverageAmount: 200000,
        riskScore: 15,
        coverageScore: 75
      }
    }
  ]
};
