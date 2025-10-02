import { Calculator } from '../../types/calculator';

export const RentersInsuranceCalculator: Calculator = {
  id: 'renters-insurance-calculator',
  name: 'Renters Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate renters insurance premiums and coverage needs based on personal property value, location, and risk factors',
  inputs: [
    // Personal Property Details
    { id: 'personalPropertyValue', name: 'Personal Property Value', type: 'number', unit: 'USD', required: true, description: 'Total value of personal belongings', placeholder: '25000', min: 0, max: 1000000 },
    { id: 'electronicsValue', name: 'Electronics Value', type: 'number', unit: 'USD', required: false, description: 'Value of electronics and computers', placeholder: '5000', min: 0, max: 100000 },
    { id: 'jewelryValue', name: 'Jewelry Value', type: 'number', unit: 'USD', required: false, description: 'Value of jewelry and watches', placeholder: '2000', min: 0, max: 50000 },
    { id: 'furnitureValue', name: 'Furniture Value', type: 'number', unit: 'USD', required: false, description: 'Value of furniture and appliances', placeholder: '8000', min: 0, max: 100000 },
    { id: 'clothingValue', name: 'Clothing Value', type: 'number', unit: 'USD', required: false, description: 'Value of clothing and accessories', placeholder: '3000', min: 0, max: 50000 },
    { id: 'artValue', name: 'Art Value', type: 'number', unit: 'USD', required: false, description: 'Value of art and collectibles', placeholder: '1000', min: 0, max: 50000 },
    { id: 'sportsEquipmentValue', name: 'Sports Equipment Value', type: 'number', unit: 'USD', required: false, description: 'Value of sports equipment', placeholder: '500', min: 0, max: 20000 },
    { id: 'musicalInstrumentsValue', name: 'Musical Instruments Value', type: 'number', unit: 'USD', required: false, description: 'Value of musical instruments', placeholder: '1000', min: 0, max: 20000 },

    // Coverage Details
    { id: 'liabilityCoverage', name: 'Liability Coverage', type: 'number', unit: 'USD', required: false, description: 'Personal liability coverage amount', placeholder: '100000', min: 0, max: 1000000 },
    { id: 'medicalPayments', name: 'Medical Payments', type: 'number', unit: 'USD', required: false, description: 'Medical payments to others coverage', placeholder: '1000', min: 0, max: 10000 },
    { id: 'lossOfUse', name: 'Loss of Use Coverage', type: 'number', unit: 'USD', required: false, description: 'Additional living expenses coverage', placeholder: '5000', min: 0, max: 50000 },
    { id: 'deductible', name: 'Deductible', type: 'number', unit: 'USD', required: false, description: 'Policy deductible amount', placeholder: '500', min: 0, max: 5000 },

    // Property Details
    { id: 'propertyType', name: 'Property Type', type: 'select', required: false, description: 'Type of rental property', options: [
      { value: 'apartment', label: 'Apartment' },
      { value: 'condo', label: 'Condominium' },
      { value: 'house', label: 'House' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'duplex', label: 'Duplex' },
      { value: 'studio', label: 'Studio' },
      { value: 'loft', label: 'Loft' },
      { value: 'mobile-home', label: 'Mobile Home' }
    ] },
    { id: 'squareFootage', name: 'Square Footage', type: 'number', required: false, description: 'Size of rental unit', placeholder: '800', min: 0, max: 10000 },
    { id: 'bedrooms', name: 'Bedrooms', type: 'number', required: false, description: 'Number of bedrooms', placeholder: '1', min: 0, max: 10 },
    { id: 'bathrooms', name: 'Bathrooms', type: 'number', required: false, description: 'Number of bathrooms', placeholder: '1', min: 0, max: 10 },
    { id: 'yearBuilt', name: 'Year Built', type: 'number', required: false, description: 'Year property was built', placeholder: '2000', min: 1800, max: 2030 },

    // Location Details
    { id: 'state', name: 'State', type: 'select', required: false, description: 'State where property is located', options: [
      { value: 'al', label: 'Alabama' }, { value: 'ak', label: 'Alaska' }, { value: 'az', label: 'Arizona' },
      { value: 'ar', label: 'Arkansas' }, { value: 'ca', label: 'California' }, { value: 'co', label: 'Colorado' },
      { value: 'ct', label: 'Connecticut' }, { value: 'de', label: 'Delaware' }, { value: 'fl', label: 'Florida' },
      { value: 'ga', label: 'Georgia' }, { value: 'hi', label: 'Hawaii' }, { value: 'id', label: 'Idaho' },
      { value: 'il', label: 'Illinois' }, { value: 'in', label: 'Indiana' }, { value: 'ia', label: 'Iowa' },
      { value: 'ks', label: 'Kansas' }, { value: 'ky', label: 'Kentucky' }, { value: 'la', label: 'Louisiana' },
      { value: 'me', label: 'Maine' }, { value: 'md', label: 'Maryland' }, { value: 'ma', label: 'Massachusetts' },
      { value: 'mi', label: 'Michigan' }, { value: 'mn', label: 'Minnesota' }, { value: 'ms', label: 'Mississippi' },
      { value: 'mo', label: 'Missouri' }, { value: 'mt', label: 'Montana' }, { value: 'ne', label: 'Nebraska' },
      { value: 'nv', label: 'Nevada' }, { value: 'nh', label: 'New Hampshire' }, { value: 'nj', label: 'New Jersey' },
      { value: 'nm', label: 'New Mexico' }, { value: 'ny', label: 'New York' }, { value: 'nc', label: 'North Carolina' },
      { value: 'nd', label: 'North Dakota' }, { value: 'oh', label: 'Ohio' }, { value: 'ok', label: 'Oklahoma' },
      { value: 'or', label: 'Oregon' }, { value: 'pa', label: 'Pennsylvania' }, { value: 'ri', label: 'Rhode Island' },
      { value: 'sc', label: 'South Carolina' }, { value: 'sd', label: 'South Dakota' }, { value: 'tn', label: 'Tennessee' },
      { value: 'tx', label: 'Texas' }, { value: 'ut', label: 'Utah' }, { value: 'vt', label: 'Vermont' },
      { value: 'va', label: 'Virginia' }, { value: 'wa', label: 'Washington' }, { value: 'wv', label: 'West Virginia' },
      { value: 'wi', label: 'Wisconsin' }, { value: 'wy', label: 'Wyoming' }
    ] },
    { id: 'city', name: 'City', type: 'select', required: false, description: 'City type', options: [
      { value: 'major-metro', label: 'Major Metropolitan' },
      { value: 'suburban', label: 'Suburban' },
      { value: 'small-city', label: 'Small City' },
      { value: 'rural', label: 'Rural' }
    ] },
    { id: 'crimeRate', name: 'Crime Rate', type: 'select', required: false, description: 'Local crime rate', options: [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ] },
    { id: 'zipCode', name: 'ZIP Code', type: 'text', required: false, description: 'ZIP code for location-specific rates', placeholder: '12345' },

    // Risk Factors
    { id: 'smoking', name: 'Smoking', type: 'select', required: false, description: 'Smoking status', options: [
      { value: 'non-smoker', label: 'Non-Smoker' },
      { value: 'smoker', label: 'Smoker' },
      { value: 'former-smoker', label: 'Former Smoker' }
    ] },
    { id: 'pets', name: 'Pets', type: 'select', required: false, description: 'Pet ownership', options: [
      { value: 'none', label: 'No Pets' },
      { value: 'dog', label: 'Dog' },
      { value: 'cat', label: 'Cat' },
      { value: 'other', label: 'Other Pets' }
    ] },
    { id: 'petBreed', name: 'Pet Breed', type: 'text', required: false, description: 'Pet breed (if applicable)', placeholder: 'Golden Retriever' },
    { id: 'securityFeatures', name: 'Security Features', type: 'select', required: false, description: 'Security features in building', options: [
      { value: 'none', label: 'None' },
      { value: 'basic', label: 'Basic (locks)' },
      { value: 'advanced', label: 'Advanced (alarm, cameras)' },
      { value: 'gated', label: 'Gated Community' }
    ] },
    { id: 'fireProtection', name: 'Fire Protection', type: 'select', required: false, description: 'Fire protection features', options: [
      { value: 'none', label: 'None' },
      { value: 'smoke-detectors', label: 'Smoke Detectors' },
      { value: 'sprinklers', label: 'Sprinkler System' },
      { value: 'fire-station-nearby', label: 'Fire Station Nearby' }
    ] },
    { id: 'floodZone', name: 'Flood Zone', type: 'select', required: false, description: 'Flood zone classification', options: [
      { value: 'none', label: 'Not in Flood Zone' },
      { value: 'low-risk', label: 'Low Risk' },
      { value: 'moderate-risk', label: 'Moderate Risk' },
      { value: 'high-risk', label: 'High Risk' }
    ] },
    { id: 'earthquakeZone', name: 'Earthquake Zone', type: 'select', required: false, description: 'Earthquake risk zone', options: [
      { value: 'none', label: 'No Risk' },
      { value: 'low', label: 'Low Risk' },
      { value: 'moderate', label: 'Moderate Risk' },
      { value: 'high', label: 'High Risk' }
    ] },

    // Personal Information
    { id: 'age', name: 'Age', type: 'number', required: false, description: 'Age of primary insured', placeholder: '30', min: 18, max: 100 },
    { id: 'creditScore', name: 'Credit Score', type: 'number', required: false, description: 'Credit score range', placeholder: '750', min: 300, max: 850 },
    { id: 'claimsHistory', name: 'Claims History', type: 'select', required: false, description: 'Previous insurance claims', options: [
      { value: 'none', label: 'No Claims' },
      { value: '1-2', label: '1-2 Claims' },
      { value: '3-5', label: '3-5 Claims' },
      { value: '5-plus', label: '5+ Claims' }
    ] },
    { id: 'occupation', name: 'Occupation', type: 'select', required: false, description: 'Primary occupation', options: [
      { value: 'student', label: 'Student' },
      { value: 'professional', label: 'Professional' },
      { value: 'service', label: 'Service Industry' },
      { value: 'retail', label: 'Retail' },
      { value: 'unemployed', label: 'Unemployed' },
      { value: 'retired', label: 'Retired' },
      { value: 'other', label: 'Other' }
    ] },

    // Policy Options
    { id: 'policyType', name: 'Policy Type', type: 'select', required: false, description: 'Type of renters insurance policy', options: [
      { value: 'basic', label: 'Basic Coverage' },
      { value: 'standard', label: 'Standard Coverage' },
      { value: 'premium', label: 'Premium Coverage' },
      { value: 'comprehensive', label: 'Comprehensive Coverage' }
    ] },
    { id: 'replacementCost', name: 'Replacement Cost Coverage', type: 'select', required: false, description: 'Replacement cost vs actual cash value', options: [
      { value: 'actual-cash-value', label: 'Actual Cash Value' },
      { value: 'replacement-cost', label: 'Replacement Cost' }
    ] },
    { id: 'identityTheft', name: 'Identity Theft Coverage', type: 'select', required: false, description: 'Identity theft protection', options: [
      { value: 'none', label: 'No Coverage' },
      { value: 'basic', label: 'Basic Coverage' },
      { value: 'comprehensive', label: 'Comprehensive Coverage' }
    ] },
    { id: 'waterBackup', name: 'Water Backup Coverage', type: 'select', required: false, description: 'Water backup and sump overflow', options: [
      { value: 'none', label: 'No Coverage' },
      { value: 'basic', label: 'Basic Coverage' },
      { value: 'enhanced', label: 'Enhanced Coverage' }
    ] }
  ],
  outputs: [
    { id: 'annualPremium', name: 'Annual Premium', type: 'number', unit: 'USD', description: 'Annual insurance premium' },
    { id: 'monthlyPremium', name: 'Monthly Premium', type: 'number', unit: 'USD', description: 'Monthly insurance premium' },
    { id: 'personalPropertyCoverage', name: 'Personal Property Coverage', type: 'number', unit: 'USD', description: 'Coverage for personal belongings' },
    { id: 'liabilityCoverageAmount', name: 'Liability Coverage Amount', type: 'number', unit: 'USD', description: 'Personal liability coverage' },
    { id: 'medicalPaymentsCoverage', name: 'Medical Payments Coverage', type: 'number', unit: 'USD', description: 'Medical payments to others' },
    { id: 'lossOfUseCoverage', name: 'Loss of Use Coverage', type: 'number', unit: 'USD', description: 'Additional living expenses' },
    { id: 'totalCoverage', name: 'Total Coverage', type: 'number', unit: 'USD', description: 'Total policy coverage' },
    { id: 'coverageGap', name: 'Coverage Gap', type: 'number', unit: 'USD', description: 'Difference between property value and coverage' },
    { id: 'coverageRatio', name: 'Coverage Ratio', type: 'number', unit: '%', description: 'Coverage as percentage of property value' },
    { id: 'premiumPerThousand', name: 'Premium per $1,000 Coverage', type: 'number', unit: 'USD', description: 'Cost per $1,000 of coverage' },
    { id: 'deductibleAmount', name: 'Deductible Amount', type: 'number', unit: 'USD', description: 'Policy deductible' },
    { id: 'outOfPocketMax', name: 'Out-of-Pocket Maximum', type: 'number', unit: 'USD', description: 'Maximum out-of-pocket expense' },
    { id: 'riskScore', name: 'Risk Score', type: 'number', description: 'Insurance risk assessment (0-100)' },
    { id: 'coverageScore', name: 'Coverage Score', type: 'number', description: 'Coverage adequacy score (0-100)' },
    { id: 'valueScore', name: 'Value Score', type: 'number', description: 'Value for money score (0-100)' },
    { id: 'overallScore', name: 'Overall Score', type: 'number', description: 'Overall policy quality score (0-100)' },
    { id: 'recommendation', name: 'Recommendation', type: 'string', description: 'Insurance recommendation' },
    { id: 'keyBenefits', name: 'Key Benefits', type: 'string', description: 'Primary policy benefits' },
    { id: 'keyRisks', name: 'Key Risks', type: 'string', description: 'Primary policy risks' },
    { id: 'rentersInsuranceAnalysis', name: 'Renters Insurance Analysis', type: 'string', description: 'Comprehensive renters insurance analysis report' }
  ],
  calculate: (inputs) => {
    // Import calculation functions
    const { calculateRentersInsurance } = require('./formulas');
    return calculateRentersInsurance(inputs);
  },
  generateReport: (inputs, outputs) => {
    // Import report generation function
    const { generateRentersInsuranceAnalysis } = require('./formulas');
    return generateRentersInsuranceAnalysis(inputs, outputs);
  },
  formulas: require('./formulas')
};
