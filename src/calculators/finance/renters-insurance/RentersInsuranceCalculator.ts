import { Calculator } from '../../../types/calculator';
import { calculateRentersInsurance, generateRentersInsuranceAnalysis } from './formulas';
import { validateRentersInsuranceInputs } from './validation';

export const RentersInsuranceCalculator: Calculator = {
  id: 'renters-insurance-calculator',
  name: 'Renters Insurance Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate renters insurance premiums, coverage options, and policy recommendations based on rental property details, personal belongings, and risk factors.',
  inputs: [
    { id: 'rentalValue', name: 'Rental Property Value', type: 'number', unit: 'USD', required: true, description: 'Estimated value of the rental property', placeholder: '300000', min: 50000, max: 5000000 },
    { id: 'personalPropertyValue', name: 'Personal Property Value', type: 'number', unit: 'USD', required: true, description: 'Total value of personal belongings', placeholder: '25000', min: 1000, max: 500000 },
    { id: 'rentalType', name: 'Rental Type', type: 'select', required: false, description: 'Type of rental property', placeholder: 'apartment', options: ['apartment', 'house', 'condo', 'townhouse', 'studio', 'duplex', 'mobile-home'] },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', required: false, description: 'Size of rental unit in square feet', placeholder: '800', min: 100, max: 10000 },
    { id: 'location', name: 'Location Type', type: 'select', required: false, description: 'Urban, suburban, or rural location', placeholder: 'urban', options: ['urban', 'suburban', 'rural'] },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'State where the rental is located', placeholder: 'california', options: ['california', 'florida', 'texas', 'new-york', 'illinois', 'pennsylvania', 'ohio', 'georgia', 'north-carolina', 'michigan'] },
    { id: 'zipCode', name: 'Zip Code', type: 'string', required: false, description: 'Rental property zip code for rate calculation', placeholder: '90210' },
    { id: 'crimeRate', name: 'Crime Rate', type: 'select', required: false, description: 'Local crime rate level', placeholder: 'medium', options: ['low', 'medium', 'high'] },
    { id: 'fireStationDistance', name: 'Distance to Fire Station', type: 'number', unit: 'miles', required: false, description: 'Distance to nearest fire station', placeholder: '1.5', min: 0, max: 50 },
    { id: 'floodZone', name: 'Flood Zone', type: 'select', required: false, description: 'FEMA flood zone designation', placeholder: 'none', options: ['none', 'a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've', 'x'] },
    { id: 'earthquakeZone', name: 'Earthquake Zone', type: 'select', required: false, description: 'Earthquake risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'hurricaneZone', name: 'Hurricane Zone', type: 'select', required: false, description: 'Hurricane risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'tornadoZone', name: 'Tornado Zone', type: 'select', required: false, description: 'Tornado risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'wildfireZone', name: 'Wildfire Zone', type: 'select', required: false, description: 'Wildfire risk zone', placeholder: 'none', options: ['none', 'low', 'moderate', 'high', 'very-high'] },
    { id: 'deductible', name: 'Deductible', type: 'select', required: false, description: 'Insurance deductible amount', placeholder: '500', options: ['250', '500', '1000', '1500', '2000', '2500'] },
    { id: 'coverageLevel', name: 'Coverage Level', type: 'select', required: false, description: 'Level of coverage selected', placeholder: 'standard', options: ['basic', 'standard', 'premium', 'comprehensive'] },
    { id: 'liabilityCoverage', name: 'Liability Coverage', type: 'number', unit: 'USD', required: false, description: 'Personal liability coverage amount', placeholder: '100000', min: 25000, max: 1000000 },
    { id: 'medicalPayments', name: 'Medical Payments', type: 'number', unit: 'USD', required: false, description: 'Medical payments to others coverage', placeholder: '1000', min: 500, max: 10000 },
    { id: 'lossOfUse', name: 'Loss of Use', type: 'number', unit: 'USD', required: false, description: 'Additional living expenses coverage', placeholder: '5000', min: 1000, max: 50000 },
    { id: 'jewelryCoverage', name: 'Jewelry Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional jewelry coverage', placeholder: '2000', min: 0, max: 50000 },
    { id: 'electronicsCoverage', name: 'Electronics Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional electronics coverage', placeholder: '5000', min: 0, max: 25000 },
    { id: 'businessEquipmentCoverage', name: 'Business Equipment Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional business equipment coverage', placeholder: '2000', min: 0, max: 50000 },
    { id: 'musicalInstrumentsCoverage', name: 'Musical Instruments Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional musical instruments coverage', placeholder: '1000', min: 0, max: 25000 },
    { id: 'sportsEquipmentCoverage', name: 'Sports Equipment Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional sports equipment coverage', placeholder: '1000', min: 0, max: 10000 },
    { id: 'artworkCoverage', name: 'Artwork Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional artwork coverage', placeholder: '1000', min: 0, max: 25000 },
    { id: 'collectiblesCoverage', name: 'Collectibles Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional collectibles coverage', placeholder: '1000', min: 0, max: 25000 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Renter credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'claimsHistory', name: 'Claims History', type: 'select', required: false, description: 'Number of claims in past 5 years', placeholder: 'none', options: ['none', '1-2', '3-5', '5-plus'] },
    { id: 'occupancyDuration', name: 'Occupancy Duration', type: 'number', unit: 'years', required: false, description: 'How long you plan to rent', placeholder: '2', min: 0.1, max: 20 },
    { id: 'securityFeatures', name: 'Security Features', type: 'multiselect', required: false, description: 'Security and safety features', placeholder: 'Select features', options: ['alarm-system', 'smoke-detectors', 'deadbolts', 'security-cameras', 'gated-community', 'doorman', 'fire-sprinklers'] },
    { id: 'buildingAge', name: 'Building Age', type: 'number', unit: 'years', required: false, description: 'Age of the building in years', placeholder: '15', min: 0, max: 100 },
    { id: 'floorLevel', name: 'Floor Level', type: 'number', required: false, description: 'Floor level of rental unit', placeholder: '3', min: 1, max: 100 },
    { id: 'parkingType', name: 'Parking Type', type: 'select', required: false, description: 'Type of parking available', placeholder: 'street', options: ['street', 'assigned', 'garage', 'covered', 'none'] },
    { id: 'petOwnership', name: 'Pet Ownership', type: 'select', required: false, description: 'Do you own pets', placeholder: 'none', options: ['none', 'dog', 'cat', 'multiple', 'exotic'] },
    { id: 'roommates', name: 'Number of Roommates', type: 'number', required: false, description: 'Number of roommates sharing the rental', placeholder: '0', min: 0, max: 10 },
    { id: 'waterBackup', name: 'Water Backup Coverage', type: 'number', unit: 'USD', required: false, description: 'Water backup and sump overflow coverage', placeholder: '5000', min: 0, max: 25000 },
    { id: 'identityTheft', name: 'Identity Theft Coverage', type: 'number', unit: 'USD', required: false, description: 'Identity theft protection coverage', placeholder: '2500', min: 0, max: 15000 },
    { id: 'petLiability', name: 'Pet Liability Coverage', type: 'number', unit: 'USD', required: false, description: 'Pet liability coverage amount', placeholder: '10000', min: 0, max: 50000 },
    { id: 'taxRate', name: 'Tax Rate', type: 'number', unit: '%', required: false, description: 'Local sales tax rate', placeholder: '8.5', min: 0, max: 100 },
    { id: 'inflationRate', name: 'Inflation Rate', type: 'number', unit: '%', required: false, description: 'Expected annual inflation rate', placeholder: '2.5', min: -50, max: 100 }
  ],
  outputs: [
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual renters insurance premium' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly renters insurance premium' },
    { id: 'personalPropertyCoverage', name: 'Personal Property Coverage', type: 'number', unit: 'USD', description: 'Coverage for personal belongings' },
    { id: 'liabilityCoverageAmount', name: 'Liability Coverage Amount', type: 'number', unit: 'USD', description: 'Personal liability protection amount' },
    { id: 'medicalPaymentsAmount', name: 'Medical Payments Amount', type: 'number', unit: 'USD', description: 'Medical payments to others coverage' },
    { id: 'lossOfUseAmount', name: 'Loss of Use Amount', type: 'number', unit: 'USD', description: 'Additional living expenses coverage' },
    { id: 'totalCoverage', name: 'Total Coverage', type: 'number', unit: 'USD', description: 'Total insurance coverage amount' },
    { id: 'coverageRatio', name: 'Coverage Ratio', type: 'number', unit: '%', description: 'Percentage of personal property value covered' },
    { id: 'coverageGap', name: 'Coverage Gap', type: 'number', unit: 'USD', description: 'Difference between property value and coverage' },
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
    { id: 'costPerThousand', name: 'Cost per $1000 Coverage', type: 'number', unit: 'USD', description: 'Cost per $1000 of personal property coverage' },
    { id: 'coverageAdequacy', name: 'Coverage Adequacy', type: 'string', description: 'Assessment of coverage adequacy' },
    { id: 'policyGrade', name: 'Policy Grade', type: 'string', description: 'Overall policy quality grade (A-F)' },
    { id: 'rentersInsuranceAnalysis', name: 'Renters Insurance Analysis', type: 'string', description: 'Comprehensive analysis report' }
  ],
  calculate: (inputs) => {
    return calculateRentersInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateRentersInsuranceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Base Premium Calculation',
      formula: 'Base Premium = (Personal Property Value / 1000) × Base Rate × Location Factor × Rental Type Factor × Coverage Level Factor × Natural Disaster Factor',
      description: 'Calculates the base premium before applying deductible discounts'
    },
    {
      name: 'Deductible Discount',
      formula: 'Final Premium = Base Premium × (1 - Deductible Discount Rate)',
      description: 'Applies discount based on selected deductible amount'
    },
    {
      name: 'Personal Property Coverage',
      formula: 'Personal Property Coverage = Personal Property Value × Coverage Level Factor',
      description: 'Coverage for personal belongings based on declared value'
    },
    {
      name: 'Risk Score Calculation',
      formula: 'Risk Score = Location Risk + Crime Risk + Natural Disaster Risk + Building Age Risk + Claims History Risk + Security Risk',
      description: 'Calculates overall risk assessment score'
    },
    {
      name: 'Liability Coverage',
      formula: 'Liability Coverage = Base Liability + Additional Coverage + Pet Liability',
      description: 'Total personal liability protection amount'
    },
    {
      name: 'Loss of Use Coverage',
      formula: 'Loss of Use = Monthly Rent × Coverage Months × Coverage Factor',
      description: 'Additional living expenses if rental becomes uninhabitable'
    }
  ],
  examples: [
    {
      name: 'Basic Apartment Coverage',
      inputs: {
        rentalValue: 250000,
        personalPropertyValue: 15000,
        rentalType: 'apartment',
        location: 'urban',
        deductible: '500',
        coverageLevel: 'standard',
        liabilityCoverage: 100000
      },
      description: 'Standard renters insurance for a city apartment with basic belongings'
    },
    {
      name: 'Comprehensive House Coverage',
      inputs: {
        rentalValue: 400000,
        personalPropertyValue: 50000,
        rentalType: 'house',
        location: 'suburban',
        deductible: '1000',
        coverageLevel: 'comprehensive',
        liabilityCoverage: 300000,
        jewelryCoverage: 10000,
        electronicsCoverage: 15000
      },
      description: 'Comprehensive coverage for a suburban house with valuable belongings'
    },
    {
      name: 'High-Risk Area Coverage',
      inputs: {
        rentalValue: 300000,
        personalPropertyValue: 25000,
        rentalType: 'condo',
        location: 'urban',
        floodZone: 'ae',
        earthquakeZone: 'high',
        deductible: '1500',
        coverageLevel: 'premium',
        liabilityCoverage: 200000
      },
      description: 'Premium coverage for high-risk natural disaster areas'
    }
  ],
  tags: ['renters', 'insurance', 'rental', 'property', 'coverage', 'liability', 'personal-property', 'risk-assessment'],
  references: [
    'Insurance Information Institute (III)',
    'National Association of Insurance Commissioners (NAIC)',
    'Consumer Financial Protection Bureau (CFPB)',
    'State insurance department guidelines'
  ]
};