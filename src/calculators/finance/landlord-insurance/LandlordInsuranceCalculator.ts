import { Calculator } from '../../types';
import { LandlordInsuranceInputs, LandlordInsuranceOutputs } from './types';
import { calculateLandlordInsurance } from './formulas';
import { validateLandlordInsuranceInputs } from './validation';

export const LandlordInsuranceCalculator: Calculator<LandlordInsuranceInputs, LandlordInsuranceOutputs> = {
  id: 'landlord-insurance',
  name: 'Landlord Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate landlord insurance premiums, coverage, and costs for rental properties',
  longDescription: `A comprehensive landlord insurance calculator that analyzes insurance premiums, coverage options, and costs for rental properties. This calculator evaluates property characteristics, location risks, rental operations, and policy features to provide accurate insurance cost estimates. It includes risk assessment, coverage analysis, premium comparisons, and optimization recommendations to help landlords make informed insurance decisions.`,
  
  inputs: {
    // Property Information
    propertyValue: {
      type: 'number',
      label: 'Property Value ($)',
      description: 'Current market value of the property',
      required: true,
      min: 100000,
      max: 50000000,
      step: 1000,
      placeholder: '500000'
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
      description: 'Type of rental property',
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi_family', label: 'Multi Family' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'duplex', label: 'Duplex' },
        { value: 'triplex', label: 'Triplex' },
        { value: 'fourplex', label: 'Fourplex' }
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
      placeholder: '20'
    },
    squareFootage: {
      type: 'number',
      label: 'Square Footage',
      description: 'Total square footage of the property',
      required: true,
      min: 500,
      max: 100000,
      step: 100,
      placeholder: '2000'
    },
    numberOfUnits: {
      type: 'number',
      label: 'Number of Units',
      description: 'Number of rental units',
      required: true,
      min: 1,
      max: 100,
      step: 1,
      placeholder: '1'
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
      min: 100000,
      max: 100000000,
      step: 1000,
      placeholder: '500000'
    },
    personalPropertyCoverage: {
      type: 'number',
      label: 'Personal Property Coverage ($)',
      description: 'Coverage amount for personal belongings',
      required: true,
      min: 10000,
      max: 50000000,
      step: 1000,
      placeholder: '250000'
    },
    liabilityCoverage: {
      type: 'number',
      label: 'Liability Coverage ($)',
      description: 'Coverage amount for liability protection',
      required: true,
      min: 100000,
      max: 10000000,
      step: 10000,
      placeholder: '500000'
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
    lossOfRentsCoverage: {
      type: 'number',
      label: 'Loss of Rents Coverage ($)',
      description: 'Coverage amount for loss of rental income',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '36000'
    },
    additionalLivingExpenses: {
      type: 'number',
      label: 'Additional Living Expenses ($)',
      description: 'Coverage amount for additional living expenses',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '100000'
    },
    deductible: {
      type: 'number',
      label: 'Deductible ($)',
      description: 'Deductible amount for claims',
      required: true,
      min: 500,
      max: 25000,
      step: 250,
      placeholder: '1000'
    },
    
    // Policy Features
    replacementCost: {
      type: 'boolean',
      label: 'Replacement Cost Coverage',
      description: 'Include replacement cost coverage',
      required: false,
      placeholder: true
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
      placeholder: true
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
      placeholder: true
    },
    equipmentBreakdownCoverage: {
      type: 'boolean',
      label: 'Equipment Breakdown Coverage',
      description: 'Include equipment breakdown coverage',
      required: false,
      placeholder: false
    },
    rentalIncomeProtection: {
      type: 'boolean',
      label: 'Rental Income Protection',
      description: 'Include rental income protection',
      required: false,
      placeholder: true
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
      placeholder: true
    },
    deadboltDiscount: {
      type: 'boolean',
      label: 'Deadbolt Discount',
      description: 'Have deadbolt locks on all doors',
      required: false,
      placeholder: true
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
    
    // Landlord Specific Information
    age: {
      type: 'number',
      label: 'Age',
      description: 'Your age',
      required: true,
      min: 18,
      max: 100,
      step: 1,
      placeholder: '45'
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
    landlordExperience: {
      type: 'number',
      label: 'Landlord Experience (years)',
      description: 'Years of experience as a landlord',
      required: true,
      min: 0,
      max: 50,
      step: 0.5,
      placeholder: '5'
    },
    numberOfProperties: {
      type: 'number',
      label: 'Number of Properties',
      description: 'Total number of rental properties owned',
      required: true,
      min: 0,
      max: 1000,
      step: 1,
      placeholder: '1'
    },
    
    // Rental Information
    monthlyRent: {
      type: 'number',
      label: 'Monthly Rent ($)',
      description: 'Monthly rental income',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000'
    },
    annualRent: {
      type: 'number',
      label: 'Annual Rent ($)',
      description: 'Annual rental income',
      required: true,
      min: 0,
      max: 1200000,
      step: 1000,
      placeholder: '36000'
    },
    occupancyRate: {
      type: 'number',
      label: 'Occupancy Rate (%)',
      description: 'Percentage of time property is occupied',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '95'
    },
    averageTenantLength: {
      type: 'number',
      label: 'Average Tenant Length (months)',
      description: 'Average length of tenant stays',
      required: true,
      min: 0,
      max: 120,
      step: 1,
      placeholder: '24'
    },
    tenantScreening: {
      type: 'boolean',
      label: 'Tenant Screening',
      description: 'Perform comprehensive tenant screening',
      required: false,
      placeholder: true
    },
    leaseAgreement: {
      type: 'boolean',
      label: 'Lease Agreement',
      description: 'Use written lease agreements',
      required: false,
      placeholder: true
    },
    securityDeposit: {
      type: 'number',
      label: 'Security Deposit ($)',
      description: 'Security deposit amount',
      required: true,
      min: 0,
      max: 100000,
      step: 100,
      placeholder: '3000'
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
    vacantProperty: {
      type: 'boolean',
      label: 'Vacant Property',
      description: 'Property is currently vacant',
      required: false,
      placeholder: false
    },
    shortTermRental: {
      type: 'boolean',
      label: 'Short-Term Rental',
      description: 'Property is used for short-term rentals',
      required: false,
      placeholder: false
    },
    furnishedRental: {
      type: 'boolean',
      label: 'Furnished Rental',
      description: 'Property is furnished for rental',
      required: false,
      placeholder: false
    },
    
    // Risk Management
    propertyManagement: {
      type: 'boolean',
      label: 'Property Management',
      description: 'Use professional property management',
      required: false,
      placeholder: false
    },
    regularInspections: {
      type: 'boolean',
      label: 'Regular Inspections',
      description: 'Perform regular property inspections',
      required: false,
      placeholder: true
    },
    maintenanceProgram: {
      type: 'boolean',
      label: 'Maintenance Program',
      description: 'Have a preventive maintenance program',
      required: false,
      placeholder: true
    },
    tenantInsurance: {
      type: 'boolean',
      label: 'Tenant Insurance',
      description: 'Require tenants to have insurance',
      required: false,
      placeholder: false
    },
    umbrellaPolicy: {
      type: 'boolean',
      label: 'Umbrella Policy',
      description: 'Have umbrella liability policy',
      required: false,
      placeholder: false
    }
  },
  
  calculate: calculateLandlordInsurance,
  validate: validateLandlordInsuranceInputs
};
