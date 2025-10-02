import { Calculator } from '../../types/calculator';
import { calculateLandlordInsurance, generateLandlordInsuranceAnalysis } from './formulas';
import { validateLandlordInsuranceInputs } from './validation';

export const LandlordInsuranceCalculator: Calculator = {
  id: 'landlord-insurance-calculator',
  name: 'Landlord Insurance Calculator',
  category: 'finance',
  subcategory: 'investment',
  description: 'Calculate landlord insurance premiums, coverage options, and policy recommendations for rental properties including liability, property damage, and loss of rental income protection.',
  inputs: [
    { id: 'propertyValue', name: 'Property Value', type: 'number', unit: 'USD', required: true, description: 'Current market value of the rental property', placeholder: '500000', min: 50000, max: 10000000 },
    { id: 'replacementCost', name: 'Replacement Cost', type: 'number', unit: 'USD', required: false, description: 'Cost to rebuild the property', placeholder: '450000', min: 50000, max: 15000000 },
    { id: 'annualRent', name: 'Annual Rent', type: 'number', unit: 'USD', required: false, description: 'Annual rental income', placeholder: '36000', min: 0, max: 500000 },
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of rental property', placeholder: 'Single Family', options: ['Single Family', 'Multi-Family', 'Condo', 'Townhouse', 'Apartment Building', 'Commercial'] },
    { id: 'constructionType', name: 'Construction Type', type: 'select', required: false, description: 'Building construction material', placeholder: 'Frame', options: ['Frame', 'Brick', 'Masonry', 'Steel', 'Concrete', 'Mixed'] },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: false, description: 'Year the property was built', placeholder: '2000', min: 1800, max: 2024 },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', unit: 'sqft', required: false, description: 'Total square footage of the property', placeholder: '2000', min: 500, max: 50000 },
    { id: 'numberOfUnits', name: 'Number of Units', type: 'number', required: false, description: 'Number of rental units', placeholder: '1', min: 1, max: 100 },
    { id: 'location', name: 'Location', type: 'select', required: false, description: 'Property location type', placeholder: 'Urban', options: ['Urban', 'Suburban', 'Rural', 'Coastal', 'Mountain', 'Desert'] },
    { id: 'state', name: 'State', type: 'select', required: false, description: 'State where property is located', placeholder: 'California', options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'] },
    { id: 'riskZone', name: 'Risk Zone', type: 'select', required: false, description: 'Natural disaster risk zone', placeholder: 'Low', options: ['Low', 'Medium', 'High', 'Very High'] },
    { id: 'coverageLevel', name: 'Coverage Level', type: 'select', required: false, description: 'Desired coverage level', placeholder: 'Standard', options: ['Basic', 'Standard', 'Comprehensive', 'Premium'] },
    { id: 'liabilityLimit', name: 'Liability Limit', type: 'number', unit: 'USD', required: false, description: 'Personal liability coverage limit', placeholder: '300000', min: 100000, max: 5000000 },
    { id: 'medicalPayments', name: 'Medical Payments', type: 'number', unit: 'USD', required: false, description: 'Medical payments coverage limit', placeholder: '5000', min: 1000, max: 100000 },
    { id: 'lossOfRent', name: 'Loss of Rent Coverage', type: 'number', unit: 'USD', required: false, description: 'Loss of rental income coverage', placeholder: '12000', min: 0, max: 100000 },
    { id: 'personalProperty', name: 'Personal Property', type: 'number', unit: 'USD', required: false, description: 'Personal property coverage limit', placeholder: '5000', min: 0, max: 100000 },
    { id: 'deductible', name: 'Deductible', type: 'number', unit: 'USD', required: false, description: 'Policy deductible amount', placeholder: '1000', min: 250, max: 10000 },
    { id: 'securityFeatures', name: 'Security Features', type: 'multiselect', required: false, description: 'Security features installed', placeholder: 'Select security features', options: ['Alarm System', 'Security Cameras', 'Deadbolts', 'Fire Sprinklers', 'Smoke Detectors', 'Carbon Monoxide Detectors', 'Gated Community', 'Doorman', 'None'] },
    { id: 'tenantType', name: 'Tenant Type', type: 'select', required: false, description: 'Type of tenants', placeholder: 'Residential', options: ['Residential', 'Student', 'Section 8', 'Corporate', 'Short-term', 'Vacant'] },
    { id: 'occupancyRate', name: 'Occupancy Rate', type: 'number', unit: '%', required: false, description: 'Average occupancy rate', placeholder: '95', min: 0, max: 100 },
    { id: 'claimsHistory', name: 'Claims History', type: 'select', required: false, description: 'Recent claims history', placeholder: 'None', options: ['None', '1-2 Claims', '3-5 Claims', '5+ Claims'] },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Landlord credit score', placeholder: '750', min: 300, max: 850 },
    { id: 'insuranceScore', name: 'Insurance Score', type: 'select', required: false, description: 'Insurance risk score', placeholder: 'Good', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
    { id: 'multiPolicyDiscount', name: 'Multi-Policy Discount', type: 'select', required: false, description: 'Other policies with same insurer', placeholder: 'None', options: ['None', 'Auto', 'Umbrella', 'Life', 'Multiple'] },
    { id: 'loyaltyDiscount', name: 'Loyalty Discount', type: 'number', unit: 'years', required: false, description: 'Years with current insurer', placeholder: '0', min: 0, max: 50 },
    { id: 'paymentMethod', name: 'Payment Method', type: 'select', required: false, description: 'Premium payment method', placeholder: 'Monthly', options: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'] },
    { id: 'paperlessDiscount', name: 'Paperless Discount', type: 'select', required: false, description: 'Paperless billing discount', placeholder: 'No', options: ['Yes', 'No'] },
    { id: 'autoPayDiscount', name: 'Auto-Pay Discount', type: 'select', required: false, description: 'Automatic payment discount', placeholder: 'No', options: ['Yes', 'No'] },
    { id: 'newCustomerDiscount', name: 'New Customer Discount', type: 'select', required: false, description: 'New customer discount', placeholder: 'No', options: ['Yes', 'No'] },
    { id: 'bundlingDiscount', name: 'Bundling Discount', type: 'select', required: false, description: 'Policy bundling discount', placeholder: 'None', options: ['None', 'Auto', 'Umbrella', 'Life', 'Multiple'] },
    { id: 'safetyDiscount', name: 'Safety Discount', type: 'select', required: false, description: 'Safety features discount', placeholder: 'None', options: ['None', 'Basic', 'Advanced', 'Premium'] },
    { id: 'claimsFreeDiscount', name: 'Claims-Free Discount', type: 'select', required: false, description: 'Claims-free discount', placeholder: 'None', options: ['None', '1-3 Years', '3-5 Years', '5+ Years'] }
  ],
  outputs: [
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual insurance premium' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly insurance premium' },
    { id: 'dwellingCoverage', name: 'Dwelling Coverage', type: 'number', unit: 'USD', description: 'Dwelling coverage amount' },
    { id: 'liabilityCoverage', name: 'Liability Coverage', type: 'number', unit: 'USD', description: 'Personal liability coverage amount' },
    { id: 'medicalPaymentsCoverage', name: 'Medical Payments Coverage', type: 'number', unit: 'USD', description: 'Medical payments coverage amount' },
    { id: 'lossOfRentCoverage', name: 'Loss of Rent Coverage', type: 'number', unit: 'USD', description: 'Loss of rental income coverage amount' },
    { id: 'personalPropertyCoverage', name: 'Personal Property Coverage', type: 'number', unit: 'USD', description: 'Personal property coverage amount' },
    { id: 'totalCoverage', name: 'Total Coverage', type: 'number', unit: 'USD', description: 'Total coverage amount' },
    { id: 'coverageToValueRatio', name: 'Coverage to Value Ratio', type: 'number', unit: '%', description: 'Ratio of coverage to property value' },
    { id: 'premiumToRentRatio', name: 'Premium to Rent Ratio', type: 'number', unit: '%', description: 'Ratio of annual premium to annual rent' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', unit: '/100', description: 'Property risk assessment score' },
    { id: 'premiumScore', name: 'Premium Score', type: 'number', unit: '/100', description: 'Premium competitiveness score' },
    { id: 'coverageScore', name: 'Coverage Score', type: 'number', unit: '/100', description: 'Coverage adequacy score' },
    { id: 'overallScore', name: 'Overall Score', type: 'number', unit: '/100', description: 'Overall policy assessment score' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Policy recommendation' },
    { id: 'coverageBreakdown', name: 'Coverage Breakdown', type: 'string', description: 'Detailed coverage breakdown' },
    { id: 'discountBreakdown', name: 'Discount Breakdown', type: 'string', description: 'Applied discounts breakdown' },
    { id: 'riskAnalysis', name: 'Risk Analysis', type: 'string', description: 'Property risk analysis' },
    { id: 'costAnalysis', name: 'Cost Analysis', type: 'string', description: 'Cost-benefit analysis' },
    { id: 'comparisonAnalysis', name: 'Comparison Analysis', type: 'string', description: 'Market comparison analysis' },
    { id: 'landlordInsuranceAnalysis', name: 'Landlord Insurance Analysis', type: 'string', description: 'Comprehensive landlord insurance analysis' }
  ],
  calculate: (inputs) => {
    return calculateLandlordInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    return generateLandlordInsuranceAnalysis(inputs, outputs);
  },
  formulas: [
    {
      name: 'Base Premium Calculation',
      formula: 'Base Premium = (Property Value × Base Rate) + (Square Footage × Per Sq Ft Rate)',
      description: 'Base premium calculation using property value and square footage'
    },
    {
      name: 'Risk Factor Adjustment',
      formula: 'Risk Adjusted Premium = Base Premium × Location Factor × Construction Factor × Risk Zone Factor',
      description: 'Premium adjustment based on property risk factors'
    },
    {
      name: 'Coverage Factor Adjustment',
      formula: 'Coverage Adjusted Premium = Risk Adjusted Premium × Coverage Level Factor × Liability Factor',
      description: 'Premium adjustment based on coverage levels and liability limits'
    },
    {
      name: 'Discount Calculation',
      formula: 'Final Premium = Coverage Adjusted Premium × (1 - Total Discount Percentage)',
      description: 'Final premium after applying all applicable discounts'
    },
    {
      name: 'Coverage to Value Ratio',
      formula: 'CVR = (Total Coverage / Property Value) × 100',
      description: 'Ratio of total coverage to property value'
    },
    {
      name: 'Premium to Rent Ratio',
      formula: 'PRR = (Annual Premium / Annual Rent) × 100',
      description: 'Ratio of annual premium to annual rental income'
    }
  ],
  examples: [
    {
      name: 'Single Family Rental',
      inputs: {
        propertyValue: 500000,
        replacementCost: 450000,
        annualRent: 36000,
        propertyType: 'Single Family',
        constructionType: 'Frame',
        yearBuilt: 2000,
        squareFootage: 2000,
        location: 'Suburban',
        state: 'California',
        riskZone: 'Low',
        coverageLevel: 'Standard',
        liabilityLimit: 300000,
        deductible: 1000
      },
      description: 'Standard single family rental property with typical coverage'
    },
    {
      name: 'Multi-Family Property',
      inputs: {
        propertyValue: 800000,
        replacementCost: 750000,
        annualRent: 72000,
        propertyType: 'Multi-Family',
        constructionType: 'Brick',
        yearBuilt: 1995,
        squareFootage: 4000,
        numberOfUnits: 4,
        location: 'Urban',
        state: 'New York',
        riskZone: 'Medium',
        coverageLevel: 'Comprehensive',
        liabilityLimit: 500000,
        lossOfRent: 24000,
        deductible: 2500
      },
      description: 'Multi-family property with comprehensive coverage and loss of rent protection'
    },
    {
      name: 'High-Risk Coastal Property',
      inputs: {
        propertyValue: 1200000,
        replacementCost: 1100000,
        annualRent: 60000,
        propertyType: 'Single Family',
        constructionType: 'Concrete',
        yearBuilt: 2010,
        squareFootage: 3000,
        location: 'Coastal',
        state: 'Florida',
        riskZone: 'Very High',
        coverageLevel: 'Premium',
        liabilityLimit: 1000000,
        medicalPayments: 10000,
        lossOfRent: 18000,
        deductible: 5000
      },
      description: 'High-value coastal property with premium coverage and high liability limits'
    }
  ]
};
