import { Calculator } from '../../types';
import { HomeownersInsuranceInputs, HomeownersInsuranceOutputs } from './types';
import { calculateHomeownersInsurance } from './formulas';
import { validateHomeownersInsuranceInputs } from './validation';

export const HomeownersInsuranceCalculator: Calculator<HomeownersInsuranceInputs, HomeownersInsuranceOutputs> = {
  id: 'homeowners-insurance',
  name: 'Homeowners Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate homeowners insurance premiums, coverage, and costs for residential property protection',
  longDescription: `A comprehensive homeowners insurance calculator that analyzes insurance premiums, coverage options, and costs for residential properties. This calculator evaluates property characteristics, location risks, coverage needs, and policy features to provide accurate insurance cost estimates. It includes risk assessment, coverage analysis, premium comparisons, and optimization recommendations to help homeowners make informed insurance decisions.`,
  
  inputs: {
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 50000,
      max: 10000000,
      step: 1000,
      placeholder: '350000'
    },
    propertyAddress: {
      type: 'text',
      label: 'Property Address',
      description: 'Full property address',
      required: true,
      placeholder: '123 Main St, City, State 12345'
    },
    propertyType: {
      type: 'select',
      label: 'Property Type',
      description: 'Type of residential property',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi_family', label: 'Multi Family' },
        { value: 'mobile_home', label: 'Mobile Home' },
        { value: 'manufactured_home', label: 'Manufactured Home' }
      ],
      placeholder: 'single_family'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 200,
      step: 1,
      placeholder: '15'
    },
    squareFootage: {
      type: 'number',
      label: 'Square Footage',
      description: 'Total square footage of the property',
      required: true,
      min: 100,
      max: 50000,
      step: 100,
      placeholder: '2000'
    },
    constructionType: {
      type: 'select',
      label: 'Construction Type',
      description: 'Primary construction material',
      required: true,
      options: [
        { value: 'frame', label: 'Frame' },
        { value: 'brick', label: 'Brick' },
        { value: 'stone', label: 'Stone' },
        { value: 'stucco', label: 'Stucco' },
        { value: 'concrete', label: 'Concrete' },
        { value: 'steel', label: 'Steel' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'frame'
    },
    roofType: {
      type: 'select',
      label: 'Roof Type',
      description: 'Type of roofing material',
      required: true,
      options: [
        { value: 'asphalt_shingle', label: 'Asphalt Shingle' },
        { value: 'metal', label: 'Metal' },
        { value: 'tile', label: 'Tile' },
        { value: 'slate', label: 'Slate' },
        { value: 'wood_shake', label: 'Wood Shake' },
        { value: 'flat', label: 'Flat' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'asphalt_shingle'
    },
    foundationType: {
      type: 'select',
      label: 'Foundation Type',
      description: 'Type of foundation',
      required: true,
      options: [
        { value: 'concrete', label: 'Concrete' },
        { value: 'crawl_space', label: 'Crawl Space' },
        { value: 'basement', label: 'Basement' },
        { value: 'slab', label: 'Slab' },
        { value: 'pier_beam', label: 'Pier & Beam' },
        { value: 'other', label: 'Other' }
      ],
      placeholder: 'concrete'
    },
    
    // Location & Risk Factors
    state: {
      type: 'text',
      label: 'State',
      description: 'State where property is located',
      required: true,
      placeholder: 'CA'
    },
    city: {
      type: 'text',
      label: 'City',
      description: 'City where property is located',
      required: true,
      placeholder: 'Los Angeles'
    },
    zipCode: {
      type: 'text',
      label: 'ZIP Code',
      description: 'ZIP code of the property',
      required: true,
      placeholder: '90210'
    },
    floodZone: {
      type: 'select',
      label: 'Flood Zone',
      description: 'Flood risk level for the area',
      required: true,
      options: [
        { value: 'low_risk', label: 'Low Risk' },
        { value: 'moderate_risk', label: 'Moderate Risk' },
        { value: 'high_risk', label: 'High Risk' },
        { value: 'very_high_risk', label: 'Very High Risk' },
        { value: 'unknown', label: 'Unknown' }
      ],
      placeholder: 'low_risk'
    },
    earthquakeRisk: {
      type: 'select',
      label: 'Earthquake Risk',
      description: 'Earthquake risk level for the area',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'low'
    },
    wildfireRisk: {
      type: 'select',
      label: 'Wildfire Risk',
      description: 'Wildfire risk level for the area',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'low'
    },
    crimeRate: {
      type: 'select',
      label: 'Crime Rate',
      description: 'Crime rate level for the area',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'moderate', label: 'Moderate' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'low'
    },
    distanceToFireStation: {
      type: 'number',
      label: 'Distance to Fire Station (miles)',
      description: 'Distance to nearest fire station',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '2.5'
    },
    distanceToHydrant: {
      type: 'number',
      label: 'Distance to Fire Hydrant (feet)',
      description: 'Distance to nearest fire hydrant',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '500'
    },
    
    // Coverage Details
    dwellingCoverage: {
      type: 'number',
      label: 'Dwelling Coverage ($)',
      description: 'Coverage amount for the dwelling structure',
      required: true,
      min: 50000,
      max: 20000000,
      step: 1000,
      placeholder: '350000'
    },
    personalPropertyCoverage: {
      type: 'number',
      label: 'Personal Property Coverage ($)',
      description: 'Coverage amount for personal belongings',
      required: true,
      min: 10000,
      max: 10000000,
      step: 1000,
      placeholder: '175000'
    },
    liabilityCoverage: {
      type: 'number',
      label: 'Liability Coverage ($)',
      description: 'Coverage amount for liability protection',
      required: true,
      min: 100000,
      max: 5000000,
      step: 10000,
      placeholder: '300000'
    },
    medicalPaymentsCoverage: {
      type: 'number',
      label: 'Medical Payments Coverage ($)',
      description: 'Coverage amount for medical payments',
      required: true,
      min: 1000,
      max: 100000,
      step: 1000,
      placeholder: '5000'
    },
    additionalLivingExpenses: {
      type: 'number',
      label: 'Additional Living Expenses ($)',
      description: 'Coverage amount for additional living expenses',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '70000'
    },
    deductible: {
      type: 'number',
      label: 'Deductible ($)',
      description: 'Deductible amount for claims',
      required: true,
      min: 250,
      max: 10000,
      step: 250,
      placeholder: '1000'
    },
    
    // Policy Features
    replacementCost: {
      type: 'boolean',
      label: 'Replacement Cost Coverage',
      description: 'Include replacement cost coverage',
      required: false,
      placeholder: false
    },
    extendedReplacementCost: {
      type: 'boolean',
      label: 'Extended Replacement Cost',
      description: 'Include extended replacement cost coverage',
      required: false,
      placeholder: false
    },
    guaranteedReplacementCost: {
      type: 'boolean',
      label: 'Guaranteed Replacement Cost',
      description: 'Include guaranteed replacement cost coverage',
      required: false,
      placeholder: false
    },
    inflationProtection: {
      type: 'boolean',
      label: 'Inflation Protection',
      description: 'Include inflation protection',
      required: false,
      placeholder: false
    },
    ordinanceOrLawCoverage: {
      type: 'boolean',
      label: 'Ordinance or Law Coverage',
      description: 'Include ordinance or law coverage',
      required: false,
      placeholder: false
    },
    waterBackupCoverage: {
      type: 'boolean',
      label: 'Water Backup Coverage',
      description: 'Include water backup coverage',
      required: false,
      placeholder: false
    },
    identityTheftCoverage: {
      type: 'boolean',
      label: 'Identity Theft Coverage',
      description: 'Include identity theft coverage',
      required: false,
      placeholder: false
    },
    equipmentBreakdownCoverage: {
      type: 'boolean',
      label: 'Equipment Breakdown Coverage',
      description: 'Include equipment breakdown coverage',
      required: false,
      placeholder: false
    },
    
    // Discounts & Credits
    multiPolicyDiscount: {
      type: 'boolean',
      label: 'Multi-Policy Discount',
      description: 'Bundle with other insurance policies',
      required: false,
      placeholder: false
    },
    securitySystemDiscount: {
      type: 'boolean',
      label: 'Security System Discount',
      description: 'Have a monitored security system',
      required: false,
      placeholder: false
    },
    smokeDetectorDiscount: {
      type: 'boolean',
      label: 'Smoke Detector Discount',
      description: 'Have working smoke detectors',
      required: false,
      placeholder: false
    },
    deadboltDiscount: {
      type: 'boolean',
      label: 'Deadbolt Discount',
      description: 'Have deadbolt locks on all doors',
      required: false,
      placeholder: false
    },
    newHomeDiscount: {
      type: 'boolean',
      label: 'New Home Discount',
      description: 'Property is less than 10 years old',
      required: false,
      placeholder: false
    },
    claimsFreeDiscount: {
      type: 'boolean',
      label: 'Claims-Free Discount',
      description: 'No claims in the past 5 years',
      required: false,
      placeholder: false
    },
    loyaltyDiscount: {
      type: 'boolean',
      label: 'Loyalty Discount',
      description: 'Long-term customer with same insurer',
      required: false,
      placeholder: false
    },
    paperlessDiscount: {
      type: 'boolean',
      label: 'Paperless Discount',
      description: 'Receive paperless billing',
      required: false,
      placeholder: false
    },
    autopayDiscount: {
      type: 'boolean',
      label: 'Autopay Discount',
      description: 'Set up automatic payments',
      required: false,
      placeholder: false
    },
    
    // Personal Information
    age: {
      type: 'number',
      label: 'Age',
      description: 'Your age',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '35'
    },
    creditScore: {
      type: 'select',
      label: 'Credit Score',
      description: 'Your credit score range',
      required: true,
      options: [
        { value: 'poor', label: 'Poor (300-579)' },
        { value: 'fair', label: 'Fair (580-669)' },
        { value: 'good', label: 'Good (670-739)' },
        { value: 'very_good', label: 'Very Good (740-799)' },
        { value: 'excellent', label: 'Excellent (800-850)' }
      ],
      placeholder: 'good'
    },
    claimsHistory: {
      type: 'number',
      label: 'Claims History (past 5 years)',
      description: 'Number of insurance claims in past 5 years',
      required: true,
      min: 0,
      max: 10,
      step: 1,
      placeholder: '0'
    },
    insuranceScore: {
      type: 'select',
      label: 'Insurance Score',
      description: 'Your insurance score',
      required: true,
      options: [
        { value: 'poor', label: 'Poor' },
        { value: 'fair', label: 'Fair' },
        { value: 'good', label: 'Good' },
        { value: 'very_good', label: 'Very Good' },
        { value: 'excellent', label: 'Excellent' }
      ],
      placeholder: 'good'
    },
    
    // Additional Features
    swimmingPool: {
      type: 'boolean',
      label: 'Swimming Pool',
      description: 'Property has a swimming pool',
      required: false,
      placeholder: false
    },
    trampoline: {
      type: 'boolean',
      label: 'Trampoline',
      description: 'Property has a trampoline',
      required: false,
      placeholder: false
    },
    aggressiveDog: {
      type: 'boolean',
      label: 'Aggressive Dog',
      description: 'Property has an aggressive dog breed',
      required: false,
      placeholder: false
    },
    homeBusiness: {
      type: 'boolean',
      label: 'Home Business',
      description: 'Property is used for business purposes',
      required: false,
      placeholder: false
    },
    rentalIncome: {
      type: 'boolean',
      label: 'Rental Income',
      description: 'Property generates rental income',
      required: false,
      placeholder: false
    },
    vacantProperty: {
      type: 'boolean',
      label: 'Vacant Property',
      description: 'Property is vacant or unoccupied',
      required: false,
      placeholder: false
    }
  },
  
  calculate: calculateHomeownersInsurance,
  validate: validateHomeownersInsuranceInputs
};
