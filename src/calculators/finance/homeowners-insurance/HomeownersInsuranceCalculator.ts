import { Calculator } from '../../types';
import { HomeownersInsuranceInputs, HomeownersInsuranceOutputs } from './types';
import { calculateHomeownersInsurance } from './formulas';
import { validateHomeownersInsuranceInputs } from './validation';

export const HomeownersInsuranceCalculator: Calculator<HomeownersInsuranceInputs, HomeownersInsuranceOutputs> = {
  id: 'homeowners-insurance',
  name: 'Homeowners Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate homeowners insurance premiums, coverage, and costs for comprehensive property protection',
  longDescription: `A comprehensive homeowners insurance calculator that analyzes insurance premiums, coverage options, and costs for residential properties. This calculator evaluates property characteristics, location risks, coverage needs, and policy features to provide accurate homeowners insurance cost estimates. It includes risk assessment, coverage analysis, premium comparisons, and optimization recommendations to help homeowners make informed insurance decisions.`,
  
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
        { value: 'mobile_home', label: 'Mobile Home' }
      ],
      placeholder: 'single_family'
    },
    propertyAge: {
      type: 'number',
      label: 'Property Age (years)',
      description: 'Age of the property in years',
      required: true,
      min: 0,
      max: 100,
      step: 1,
      placeholder: '15'
    },
    propertySize: {
      type: 'number',
      label: 'Property Size (sq ft)',
      description: 'Total square footage of the property',
      required: true,
      min: 500,
      max: 10000,
      step: 100,
      placeholder: '2500'
    },
    constructionType: {
      type: 'select',
      label: 'Construction Type',
      description: 'Primary construction material',
      required: true,
      options: [
        { value: 'wood_frame', label: 'Wood Frame' },
        { value: 'brick', label: 'Brick' },
        { value: 'stone', label: 'Stone' },
        { value: 'concrete', label: 'Concrete' },
        { value: 'steel_frame', label: 'Steel Frame' },
        { value: 'mixed', label: 'Mixed' }
      ],
      placeholder: 'wood_frame'
    },
    roofType: {
      type: 'select',
      label: 'Roof Type',
      description: 'Type of roof material',
      required: true,
      options: [
        { value: 'asphalt_shingle', label: 'Asphalt Shingle' },
        { value: 'metal', label: 'Metal' },
        { value: 'tile', label: 'Tile' },
        { value: 'slate', label: 'Slate' },
        { value: 'wood_shake', label: 'Wood Shake' },
        { value: 'flat', label: 'Flat' }
      ],
      placeholder: 'asphalt_shingle'
    },
    roofAge: {
      type: 'number',
      label: 'Roof Age (years)',
      description: 'Age of the roof in years',
      required: true,
      min: 0,
      max: 50,
      step: 1,
      placeholder: '10'
    },
    
    // Location Information
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
      description: 'Flood risk zone classification',
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
    crimeRate: {
      type: 'select',
      label: 'Crime Rate',
      description: 'Crime rate in the area',
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      placeholder: 'medium'
    },
    fireStationDistance: {
      type: 'number',
      label: 'Fire Station Distance (miles)',
      description: 'Distance to nearest fire station',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '2.5'
    },
    policeStationDistance: {
      type: 'number',
      label: 'Police Station Distance (miles)',
      description: 'Distance to nearest police station',
      required: true,
      min: 0,
      max: 50,
      step: 0.1,
      placeholder: '3.0'
    },
    
    // Coverage Information
    dwellingCoverage: {
      type: 'number',
      label: 'Dwelling Coverage ($)',
      description: 'Coverage for the main structure',
      required: true,
      min: 50000,
      max: 5000000,
      step: 1000,
      placeholder: '350000'
    },
    personalPropertyCoverage: {
      type: 'number',
      label: 'Personal Property Coverage ($)',
      description: 'Coverage for personal belongings',
      required: true,
      min: 10000,
      max: 1000000,
      step: 1000,
      placeholder: '175000'
    },
    liabilityCoverage: {
      type: 'number',
      label: 'Liability Coverage ($)',
      description: 'Personal liability coverage',
      required: true,
      min: 100000,
      max: 1000000,
      step: 10000,
      placeholder: '300000'
    },
    medicalPaymentsCoverage: {
      type: 'number',
      label: 'Medical Payments Coverage ($)',
      description: 'Medical payments to others',
      required: true,
      min: 1000,
      max: 10000,
      step: 100,
      placeholder: '5000'
    },
    lossOfUseCoverage: {
      type: 'number',
      label: 'Loss of Use Coverage ($)',
      description: 'Additional living expenses',
      required: true,
      min: 10000,
      max: 100000,
      step: 1000,
      placeholder: '70000'
    },
    otherStructuresCoverage: {
      type: 'number',
      label: 'Other Structures Coverage ($)',
      description: 'Coverage for detached structures',
      required: true,
      min: 0,
      max: 500000,
      step: 1000,
      placeholder: '35000'
    },
    
    // Deductibles
    dwellingDeductible: {
      type: 'number',
      label: 'Dwelling Deductible ($)',
      description: 'Deductible for dwelling claims',
      required: true,
      min: 250,
      max: 10000,
      step: 250,
      placeholder: '1000'
    },
    personalPropertyDeductible: {
      type: 'number',
      label: 'Personal Property Deductible ($)',
      description: 'Deductible for personal property claims',
      required: true,
      min: 250,
      max: 5000,
      step: 250,
      placeholder: '1000'
    },
    liabilityDeductible: {
      type: 'number',
      label: 'Liability Deductible ($)',
      description: 'Deductible for liability claims',
      required: true,
      min: 0,
      max: 5000,
      step: 100,
      placeholder: '0'
    },
    hurricaneDeductible: {
      type: 'number',
      label: 'Hurricane Deductible ($)',
      description: 'Deductible for hurricane claims',
      required: true,
      min: 0,
      max: 50000,
      step: 1000,
      placeholder: '5000'
    },
    windstormDeductible: {
      type: 'number',
      label: 'Windstorm Deductible ($)',
      description: 'Deductible for windstorm claims',
      required: true,
      min: 0,
      max: 25000,
      step: 500,
      placeholder: '2500'
    },
    
    // Policy Features
    replacementCost: {
      type: 'boolean',
      label: 'Replacement Cost Coverage',
      description: 'Coverage for replacement cost vs actual cash value',
      required: true,
      placeholder: true
    },
    guaranteedReplacementCost: {
      type: 'boolean',
      label: 'Guaranteed Replacement Cost',
      description: 'Guaranteed replacement cost coverage',
      required: true,
      placeholder: false
    },
    ordinanceOrLawCoverage: {
      type: 'boolean',
      label: 'Ordinance or Law Coverage',
      description: 'Coverage for building code upgrades',
      required: true,
      placeholder: false
    },
    waterBackupCoverage: {
      type: 'boolean',
      label: 'Water Backup Coverage',
      description: 'Coverage for water backup and sump overflow',
      required: true,
      placeholder: false
    },
    identityTheftCoverage: {
      type: 'boolean',
      label: 'Identity Theft Coverage',
      description: 'Identity theft protection coverage',
      required: true,
      placeholder: false
    },
    equipmentBreakdownCoverage: {
      type: 'boolean',
      label: 'Equipment Breakdown Coverage',
      description: 'Coverage for mechanical equipment breakdown',
      required: true,
      placeholder: false
    },
    
    // Discounts
    multiPolicyDiscount: {
      type: 'boolean',
      label: 'Multi-Policy Discount',
      description: 'Discount for bundling multiple policies',
      required: true,
      placeholder: true
    },
    claimsFreeDiscount: {
      type: 'boolean',
      label: 'Claims-Free Discount',
      description: 'Discount for no recent claims',
      required: true,
      placeholder: true
    },
    securitySystemDiscount: {
      type: 'boolean',
      label: 'Security System Discount',
      description: 'Discount for security system',
      required: true,
      placeholder: false
    },
    smokeDetectorDiscount: {
      type: 'boolean',
      label: 'Smoke Detector Discount',
      description: 'Discount for smoke detectors',
      required: true,
      placeholder: true
    },
    deadboltDiscount: {
      type: 'boolean',
      label: 'Deadbolt Discount',
      description: 'Discount for deadbolt locks',
      required: true,
      placeholder: true
    },
    newHomeDiscount: {
      type: 'boolean',
      label: 'New Home Discount',
      description: 'Discount for newly constructed home',
      required: true,
      placeholder: false
    },
    seniorDiscount: {
      type: 'boolean',
      label: 'Senior Discount',
      description: 'Discount for senior homeowners',
      required: true,
      placeholder: false
    },
    
    // Claims History
    claimsInLast3Years: {
      type: 'number',
      label: 'Claims in Last 3 Years',
      description: 'Number of claims in the last 3 years',
      required: true,
      min: 0,
      max: 10,
      step: 1,
      placeholder: '0'
    },
    claimsInLast5Years: {
      type: 'number',
      label: 'Claims in Last 5 Years',
      description: 'Number of claims in the last 5 years',
      required: true,
      min: 0,
      max: 15,
      step: 1,
      placeholder: '0'
    },
    claimsInLast10Years: {
      type: 'number',
      label: 'Claims in Last 10 Years',
      description: 'Number of claims in the last 10 years',
      required: true,
      min: 0,
      max: 25,
      step: 1,
      placeholder: '0'
    },
    totalClaimAmount: {
      type: 'number',
      label: 'Total Claim Amount ($)',
      description: 'Total amount of all claims',
      required: true,
      min: 0,
      max: 1000000,
      step: 1000,
      placeholder: '0'
    },
    
    // Risk Factors
    swimmingPool: {
      type: 'boolean',
      label: 'Swimming Pool',
      description: 'Property has a swimming pool',
      required: true,
      placeholder: false
    },
    trampoline: {
      type: 'boolean',
      label: 'Trampoline',
      description: 'Property has a trampoline',
      required: true,
      placeholder: false
    },
    aggressiveDog: {
      type: 'boolean',
      label: 'Aggressive Dog',
      description: 'Property has an aggressive dog breed',
      required: true,
      placeholder: false
    },
    homeBusiness: {
      type: 'boolean',
      label: 'Home Business',
      description: 'Business operated from home',
      required: true,
      placeholder: false
    },
    rentalUnits: {
      type: 'number',
      label: 'Rental Units',
      description: 'Number of rental units on property',
      required: true,
      min: 0,
      max: 10,
      step: 1,
      placeholder: '0'
    },
    vacantProperty: {
      type: 'boolean',
      label: 'Vacant Property',
      description: 'Property is vacant or unoccupied',
      required: true,
      placeholder: false
    },
    
    // Insurance Company
    insuranceCompany: {
      type: 'text',
      label: 'Insurance Company',
      description: 'Name of the insurance company',
      required: true,
      placeholder: 'State Farm'
    },
    policyType: {
      type: 'select',
      label: 'Policy Type',
      description: 'Type of insurance policy',
      required: true,
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'premium', label: 'Premium' },
        { value: 'basic', label: 'Basic' },
        { value: 'custom', label: 'Custom' }
      ],
      placeholder: 'standard'
    },
    policyTerm: {
      type: 'number',
      label: 'Policy Term (months)',
      description: 'Duration of the insurance policy',
      required: true,
      min: 6,
      max: 36,
      step: 6,
      placeholder: '12'
    },
    
    // Analysis Parameters
    analysisPeriod: {
      type: 'number',
      label: 'Analysis Period (years)',
      description: 'Period for insurance analysis',
      required: true,
      min: 1,
      max: 10,
      step: 1,
      placeholder: '5'
    },
    inflationRate: {
      type: 'number',
      label: 'Inflation Rate (%)',
      description: 'Expected annual inflation rate',
      required: true,
      min: -5,
      max: 15,
      step: 0.5,
      placeholder: '2.5'
    },
    propertyAppreciationRate: {
      type: 'number',
      label: 'Property Appreciation Rate (%)',
      description: 'Expected annual property appreciation',
      required: true,
      min: -10,
      max: 20,
      step: 0.5,
      placeholder: '3.0'
    },
    
    // Reporting Preferences
    currency: {
      type: 'select',
      label: 'Currency',
      description: 'Currency for calculations and display',
      required: true,
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'CAD', label: 'CAD' },
        { value: 'AUD', label: 'AUD' }
      ],
      placeholder: 'USD'
    },
    displayFormat: {
      type: 'select',
      label: 'Display Format',
      description: 'Format for displaying results',
      required: true,
      options: [
        { value: 'percentage', label: 'Percentage' },
        { value: 'decimal', label: 'Decimal' },
        { value: 'currency', label: 'Currency' }
      ],
      placeholder: 'currency'
    },
    includeCharts: {
      type: 'boolean',
      label: 'Include Charts',
      description: 'Include charts in the analysis report',
      required: true,
      placeholder: true
    }
  },
  
  outputs: {
    annualPremium: {
      type: 'number',
      label: 'Annual Premium',
      description: 'Annual homeowners insurance premium cost'
    },
    monthlyPremium: {
      type: 'number',
      label: 'Monthly Premium',
      description: 'Monthly homeowners insurance premium cost'
    },
    totalCoverage: {
      type: 'number',
      label: 'Total Coverage',
      description: 'Total homeowners insurance coverage amount'
    },
    riskScore: {
      type: 'number',
      label: 'Risk Score',
      description: 'Overall risk assessment score (1-10)'
    },
    premiumToValueRatio: {
      type: 'number',
      label: 'Premium to Value Ratio',
      description: 'Premium as percentage of property value'
    },
    totalDiscounts: {
      type: 'number',
      label: 'Total Discounts',
      description: 'Total discount amount'
    },
    effectivePremium: {
      type: 'number',
      label: 'Effective Premium',
      description: 'Premium after discounts'
    },
    analysis: {
      type: 'object',
      label: 'Analysis Report',
      description: 'Comprehensive homeowners insurance analysis'
    }
  },
  
  calculate: (inputs: HomeownersInsuranceInputs): HomeownersInsuranceOutputs => {
    const validation = validateHomeownersInsuranceInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }
    
    return calculateHomeownersInsurance(inputs);
  },
  
  generateReport: (inputs: HomeownersInsuranceInputs, outputs: HomeownersInsuranceOutputs): string => {
    const { analysis } = outputs;
    
    return `
# Homeowners Insurance Analysis Report

## Executive Summary
- **Insurance Rating**: ${analysis.insuranceRating}
- **Risk Rating**: ${analysis.riskRating}
- **Recommendation**: ${analysis.recommendation}

## Key Metrics
- **Annual Premium**: $${outputs.annualPremium.toLocaleString()}
- **Monthly Premium**: $${outputs.monthlyPremium.toLocaleString()}
- **Total Coverage**: $${outputs.totalCoverage.toLocaleString()}
- **Premium to Value Ratio**: ${outputs.premiumToValueRatio.toFixed(2)}%
- **Risk Score**: ${outputs.riskScore}/10
- **Total Discounts**: $${outputs.totalDiscounts.toLocaleString()}
- **Effective Premium**: $${outputs.effectivePremium.toLocaleString()}

## Analysis
${analysis.insuranceSummary}

## Risk Assessment
${analysis.riskAssessment}

## Recommendations
${analysis.purchaseRecommendations.join('\n')}

## Next Steps
${analysis.nextSteps.join('\n')}
    `.trim();
  },
  
  formulas: {
    'Annual Premium': 'Base premium adjusted for risk factors, coverage, and discounts',
    'Monthly Premium': 'Annual Premium / 12',
    'Total Coverage': 'Sum of all coverage amounts',
    'Premium to Value Ratio': 'Annual Premium / Property Value × 100',
    'Risk Score': 'Weighted average of property, location, and coverage risk factors',
    'Total Discounts': 'Sum of all applicable discounts',
    'Effective Premium': 'Annual Premium - Total Discounts'
  },
  
  examples: [
    {
      name: 'Standard Homeowners Insurance',
      inputs: {
        propertyValue: 350000,
        propertyAddress: '123 Main St, Los Angeles, CA 90210',
        propertyType: 'single_family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood_frame',
        roofType: 'asphalt_shingle',
        roofAge: 10,
        state: 'CA',
        city: 'Los Angeles',
        zipCode: '90210',
        floodZone: 'low_risk',
        crimeRate: 'medium',
        fireStationDistance: 2.5,
        policeStationDistance: 3.0,
        dwellingCoverage: 350000,
        personalPropertyCoverage: 175000,
        liabilityCoverage: 300000,
        medicalPaymentsCoverage: 5000,
        lossOfUseCoverage: 70000,
        otherStructuresCoverage: 35000,
        dwellingDeductible: 1000,
        personalPropertyDeductible: 1000,
        liabilityDeductible: 0,
        hurricaneDeductible: 5000,
        windstormDeductible: 2500,
        replacementCost: true,
        guaranteedReplacementCost: false,
        ordinanceOrLawCoverage: false,
        waterBackupCoverage: false,
        identityTheftCoverage: false,
        equipmentBreakdownCoverage: false,
        multiPolicyDiscount: true,
        claimsFreeDiscount: true,
        securitySystemDiscount: false,
        smokeDetectorDiscount: true,
        deadboltDiscount: true,
        newHomeDiscount: false,
        seniorDiscount: false,
        claimsInLast3Years: 0,
        claimsInLast5Years: 0,
        claimsInLast10Years: 0,
        totalClaimAmount: 0,
        swimmingPool: false,
        trampoline: false,
        aggressiveDog: false,
        homeBusiness: false,
        rentalUnits: 0,
        vacantProperty: false,
        insuranceCompany: 'State Farm',
        policyType: 'standard',
        policyTerm: 12,
        analysisPeriod: 5,
        inflationRate: 2.5,
        propertyAppreciationRate: 3.0,
        currency: 'USD',
        displayFormat: 'currency',
        includeCharts: true
      }
    }
  ],
  
  tags: [
    'homeowners insurance',
    'property insurance',
    'insurance',
    'premium',
    'coverage',
    'risk assessment',
    'property protection',
    'liability',
    'deductible',
    'claims'
  ],
  
  category_info: {
    name: 'Insurance',
    description: 'Insurance calculators for property and liability protection',
    icon: '🛡️'
  }
};
