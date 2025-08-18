import { Calculator } from '../../../types/calculator';
import { calculateHomeownersInsurance, generateHomeownersInsuranceAnalysis } from './formulas';
import { validateHomeownersInsuranceInputs } from './validation';

export const HomeownersInsuranceCalculator: Calculator = {
  id: 'homeowners-insurance-calculator',
  name: 'Homeowners Insurance Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate homeowners insurance premiums, coverage options, and policy recommendations based on property details, location, and risk factors.',
  inputs: [
    { id: 'homeValue', name: 'Home Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the home', placeholder: '500000', min: 10000, max: 10000000 },
    { id: 'replacementCost', name: 'Replacement Cost', type: 'number', unit: 'USD', required: false, description: 'Cost to rebuild the home', placeholder: '450000', min: 10000, max: 15000000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of residential property', placeholder: 'single-family', options: ['single-family', 'condo', 'townhouse', 'duplex', 'multi-family'] },
    { id: 'constructionType', name: 'Construction Type', type: 'select', required: false, description: 'Primary construction material', placeholder: 'frame', options: ['frame', 'brick', 'stone', 'concrete', 'steel', 'mixed'] },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: false, description: 'Year the home was constructed', placeholder: '1990', min: 1800, max: 2024 },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', required: false, description: 'Total living area in square feet', placeholder: '2000', min: 100, max: 50000 },
    { id: 'location', name: 'Location Type', type: 'select', required: false, description: 'Urban, suburban, or rural location', placeholder: 'suburban', options: ['urban', 'suburban', 'rural'] },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'State where the property is located', placeholder: 'california', options: ['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'] },
    { id: 'zipCode', name: 'Zip Code', type: 'string', required: false, description: 'Property zip code for rate calculation', placeholder: '90210' },
    { id: 'crimeRate', name: 'Crime Rate', type: 'select', required: false, description: 'Local crime rate level', placeholder: 'low', options: ['low', 'medium', 'high'] },
    { id: 'fireStationDistance', name: 'Distance to Fire Station', type: 'number', unit: 'miles', required: false, description: 'Distance to nearest fire station', placeholder: '2.5', min: 0, max: 50 },
    { id: 'floodZone', name: 'Flood Zone', type: 'select', required: false, description: 'FEMA flood zone designation', placeholder: 'none', options: ['none', 'a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've', 'x'] },
    { id: 'earthquakeZone', name: 'Earthquake Zone', type: 'select', required: false, description: 'Earthquake risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'hurricaneZone', name: 'Hurricane Zone', type: 'select', required: false, description: 'Hurricane risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'tornadoZone', name: 'Tornado Zone', type: 'select', required: false, description: 'Tornado risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'wildfireZone', name: 'Wildfire Zone', type: 'select', required: false, description: 'Wildfire risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'deductible', name: 'Deductible', type: 'select', required: false, description: 'Insurance deductible amount', placeholder: '1000', options: ['500', '1000', '1500', '2000', '2500', '5000'] },
    { id: 'coverageLevel', name: 'Coverage Level', type: 'select', required: false, description: 'Level of coverage selected', placeholder: 'standard', options: ['basic', 'standard', 'premium', 'comprehensive'] },
    { id: 'personalPropertyValue', name: 'Personal Property Value', type: 'number', unit: 'USD', required: false, description: 'Value of personal belongings', placeholder: '50000', min: 0, max: 1000000 },
    { id: 'liabilityCoverage', name: 'Liability Coverage', type: 'number', unit: 'USD', required: false, description: 'Personal liability coverage amount', placeholder: '300000', min: 100000, max: 5000000 },
    { id: 'medicalPayments', name: 'Medical Payments', type: 'number', unit: 'USD', required: false, description: 'Medical payments to others coverage', placeholder: '5000', min: 1000, max: 100000 },
    { id: 'lossOfUse', name: 'Loss of Use', type: 'number', unit: 'USD', required: false, description: 'Additional living expenses coverage', placeholder: '20000', min: 5000, max: 200000 },
    { id: 'jewelryCoverage', name: 'Jewelry Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional jewelry coverage', placeholder: '5000', min: 0, max: 100000 },
    { id: 'electronicsCoverage', name: 'Electronics Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional electronics coverage', placeholder: '10000', min: 0, max: 50000 },
    { id: 'businessEquipmentCoverage', name: 'Business Equipment Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional business equipment coverage', placeholder: '5000', min: 0, max: 100000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Homeowner credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'claimsHistory', name: 'Claims History', type: 'select', required: false, description: 'Number of claims in past 5 years', placeholder: 'none', options: ['none', '1-2', '3-5', '5-plus'] },
    { id: 'occupancyType', name: 'Occupancy Type', type: 'select', required: false, description: 'How the property is occupied', placeholder: 'owner-occupied', options: ['owner-occupied', 'rental', 'vacation', 'investment'] },
    { id: 'securityFeatures', name: 'Security Features', type: 'multiselect', required: false, description: 'Security and safety features', placeholder: 'Select features', options: ['alarm-system', 'smoke-detectors', 'fire-sprinklers', 'deadbolts', 'security-cameras', 'gated-community'] },
    { id: 'roofAge', name: 'Roof Age', type: 'number', unit: 'years', required: false, description: 'Age of the roof in years', placeholder: '10', min: 0, max: 50 },
    { id: 'heatingSystemAge', name: 'Heating System Age', type: 'number', unit: 'years', required: false, description: 'Age of heating system in years', placeholder: '15', min: 0, max: 50 },
    { id: 'electricalSystemAge', name: 'Electrical System Age', type: 'number', unit: 'years', required: false, description: 'Age of electrical system in years', placeholder: '20', min: 0, max: 50 },
    { id: 'plumbingSystemAge', name: 'Plumbing System Age', type: 'number', unit: 'years', required: false, description: 'Age of plumbing system in years', placeholder: '25', min: 0, max: 50 },
    { id: 'waterBackup', name: 'Water Backup Coverage', type: 'number', unit: 'USD', required: false, description: 'Water backup and sump overflow coverage', placeholder: '10000', min: 0, max: 50000 },
    { id: 'identityTheft', name: 'Identity Theft Coverage', type: 'number', unit: 'USD', required: false, description: 'Identity theft protection coverage', placeholder: '5000', min: 0, max: 25000 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Local property tax rate', placeholder: '1.2', min: 0, max: 100 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: -50, max: 100 }
  ],
  outputs: [
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual homeowners insurance premium' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly homeowners insurance premium' },
    { id: 'dwellingCoverage', name: 'Dwelling Coverage', type: 'number', unit: 'USD', description: 'Coverage for the main structure' },
    { id: 'personalPropertyCoverage', name: 'Personal Property Coverage', type: 'number', unit: 'USD', description: 'Coverage for personal belongings' },
    { id: 'liabilityCoverageAmount', name: 'Liability Coverage Amount', type: 'number', unit: 'USD', description: 'Personal liability protection amount' },
    { id: 'medicalPaymentsAmount', name: 'Medical Payments Amount', type: 'number', unit: 'USD', description: 'Medical payments to others coverage' },
    { id: 'lossOfUseAmount', name: 'Loss of Use Amount', type: 'number', unit: 'USD', description: 'Additional living expenses coverage' },
    { id: 'totalCoverage', name: 'Total Coverage', type: 'number', unit: 'USD', description: 'Total insurance coverage amount' },
    { id: 'replacementCostRatio', name: 'Replacement Cost Ratio', type: 'number', unit: '%', description: 'Percentage of replacement cost covered' },
    { id: 'coverageGap', name: 'Coverage Gap', type: 'number', unit: 'USD', description: 'Difference between replacement cost and coverage' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Property risk assessment score (0-100)' },
    { id: 'premiumScore', name: 'Premium Score', type: 'number', description: 'Premium competitiveness score (0-100)' },
    { id: 'coverageScore', name: 'Coverage Score', type: 'number', description: 'Coverage adequacy score (0-100)' },
    { id: 'recommendedDeductible', name: 'Recommended Deductible', type: 'number', unit: 'USD', description: 'Optimal deductible for cost savings' },
    { id: 'premiumSavings', name: 'Premium Savings', type: 'number', unit: 'USD', description: 'Potential annual savings with recommended deductible' },
    { id: 'riskFactors', name: 'Risk Factors', type: 'string', description: 'Identified risk factors affecting premium' },
    { id: 'discounts', name: 'Available Discounts', type: 'string', description: 'Potential discounts available' },
    { id: 'recommendations', name: 'Recommendations', type: 'string', description: 'Coverage and policy recommendations' },
    { id: 'comparisonTable', name: 'Deductible Comparison', type: 'string', description: 'Premium comparison for different deductibles' },
    { id: 'annualCost', name: 'Annual Cost', type: 'number', unit: 'USD', description: 'Total annual cost including deductible' },
    { id: 'costPerThousand', name: 'Cost per $1000 Coverage', type: 'number', unit: 'USD', description: 'Cost per $1000 of dwelling coverage' },
    { id: 'coverageAdequacy', name: 'Coverage Adequacy', type: 'string', description: 'Assessment of coverage adequacy' },
    { id: 'policyGrade', name: 'Policy Grade', type: 'string', description: 'Overall policy quality grade (A-F)' },
    { id: 'homeownersInsuranceAnalysis', name: 'Homeowners Insurance Analysis', type: 'string', description: 'Comprehensive analysis report' }
  ],
  calculate: (inputs) => {
    return calculateHomeownersInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateHomeownersInsuranceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Base Premium Calculation',
      formula: 'Base Premium = (Replacement Cost / 1000) × Base Rate × Location Factor × Construction Factor × Coverage Level Factor × Natural Disaster Factor',
      description: 'Calculates the base premium before applying deductible discounts'
    },
    {
      name: 'Deductible Discount',
      formula: 'Final Premium = Base Premium × (1 - Deductible Discount Rate)',
      description: 'Applies discount based on selected deductible amount'
    },
    {
      name: 'Personal Property Coverage',
      formula: 'Personal Property Coverage = Dwelling Coverage × 0.5',
      description: 'Standard personal property coverage is 50% of dwelling coverage'
    },
    {
      name: 'Risk Score Calculation',
      formula: 'Risk Score = Location Risk + Crime Risk + Natural Disaster Risk + Property Age Risk + Claims History Risk + Construction Risk',
      description: 'Aggregates various risk factors into a single score'
    },
    {
      name: 'Coverage Score',
      formula: 'Coverage Score = (Dwelling Coverage / Replacement Cost) × 100',
      description: 'Measures adequacy of dwelling coverage relative to replacement cost'
    },
    {
      name: 'Cost per $1000',
      formula: 'Cost per $1000 = (Annual Premium / Dwelling Coverage) × 1000',
      description: 'Standardized cost metric for comparing policies'
    }
  ],
  examples: [
    {
      name: 'Standard Homeowners Policy',
      inputs: {
        homeValue: 500000,
        replacementCost: 450000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1990,
        location: 'suburban',
        state: 'california',
        deductible: 1000,
        coverageLevel: 'standard',
        personalPropertyValue: 50000,
        liabilityCoverage: 300000,
        medicalPayments: 5000,
        lossOfUse: 20000,
        creditScore: 750,
        claimsHistory: 'none',
        occupancyType: 'owner-occupied'
      },
      description: 'Typical homeowners insurance policy for a suburban single-family home'
    },
    {
      name: 'High-Risk Property',
      inputs: {
        homeValue: 750000,
        replacementCost: 675000,
        propertyType: 'single-family',
        constructionType: 'frame',
        yearBuilt: 1950,
        location: 'urban',
        state: 'florida',
        deductible: 2500,
        coverageLevel: 'premium',
        personalPropertyValue: 75000,
        liabilityCoverage: 500000,
        medicalPayments: 10000,
        lossOfUse: 30000,
        floodZone: 'ae',
        hurricaneZone: 'high',
        crimeRate: 'high',
        creditScore: 650,
        claimsHistory: '1-2',
        occupancyType: 'owner-occupied'
      },
      description: 'High-risk property with multiple risk factors requiring comprehensive coverage'
    },
    {
      name: 'New Construction',
      inputs: {
        homeValue: 800000,
        replacementCost: 720000,
        propertyType: 'single-family',
        constructionType: 'brick',
        yearBuilt: 2020,
        location: 'suburban',
        state: 'texas',
        deductible: 1500,
        coverageLevel: 'comprehensive',
        personalPropertyValue: 100000,
        liabilityCoverage: 1000000,
        medicalPayments: 10000,
        lossOfUse: 50000,
        creditScore: 800,
        claimsHistory: 'none',
        occupancyType: 'owner-occupied',
        securityFeatures: ['alarm-system', 'smoke-detectors', 'security-cameras']
      },
      description: 'New construction with modern features and comprehensive coverage'
    }
  ]
};
