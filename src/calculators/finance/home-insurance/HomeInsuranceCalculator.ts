import { Calculator } from '../../types/calculator';
import { HomeInsuranceCalculatorInputs, HomeInsuranceCalculatorOutputs } from './types';
import { calculateHomeInsurance } from './formulas';
import { validateHomeInsuranceInputs } from './validation';

export const HomeInsuranceCalculator: Calculator & {
  calculate: (inputs: HomeInsuranceCalculatorInputs) => HomeInsuranceCalculatorOutputs;
  generateReport: (inputs: HomeInsuranceCalculatorInputs, outputs: HomeInsuranceCalculatorOutputs) => string;
} = {
  id: 'home-insurance',
  title: 'Home Insurance Calculator',
  name: 'Home Insurance Calculator',
  category: 'finance',
  subcategory: 'insurance',
  description: 'Calculate comprehensive home insurance premiums and coverage analysis.',
  usageInstructions: [
    'Enter your property details and location',
    'Specify coverage amounts and deductibles',
    'Review risk factors and claims history',
    'Compare premium options and discounts',
    'Generate detailed insurance analysis report'
  ],

  inputs = [
    {
      id: 'propertyValue',
      label: 'Property Value ($)',
      type: 'currency' as const,
      required: true,
      min: 50000,
      max: 10000000,
      tooltip: 'Current market value of the property'
    },
    {
      id: 'propertyAddress',
      label: 'Property Address',
      type: 'text' as const,
      required: true,
      tooltip: 'Full address of the property'
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'single_family', label: 'Single Family Home' },
        { value: 'condo', label: 'Condominium' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi_family', label: 'Multi-Family' },
        { value: 'mobile_home', label: 'Mobile Home' }
      ],
      tooltip: 'Type of property being insured'
    },
    {
      id: 'propertyAge',
      label: 'Property Age (years)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Age of the property in years'
    },
    {
      id: 'propertySize',
      label: 'Property Size (sq ft)',
      type: 'number' as const,
      required: true,
      min: 500,
      max: 10000,
      tooltip: 'Total square footage of the property'
    },
    {
      id: 'constructionType',
      label: 'Construction Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'wood_frame', label: 'Wood Frame' },
        { value: 'brick', label: 'Brick' },
        { value: 'stone', label: 'Stone' },
        { value: 'concrete', label: 'Concrete' },
        { value: 'steel_frame', label: 'Steel Frame' },
        { value: 'mixed', label: 'Mixed' }
      ],
      tooltip: 'Primary construction material'
    },
    {
      id: 'roofType',
      label: 'Roof Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'asphalt_shingle', label: 'Asphalt Shingle' },
        { value: 'metal', label: 'Metal' },
        { value: 'tile', label: 'Tile' },
        { value: 'slate', label: 'Slate' },
        { value: 'wood_shake', label: 'Wood Shake' },
        { value: 'flat', label: 'Flat' }
      ],
      tooltip: 'Type of roof material'
    },
    {
      id: 'roofAge',
      label: 'Roof Age (years)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Age of the roof in years'
    },
    {
      id: 'state',
      label: 'State',
      type: 'text' as const,
      required: true,
      tooltip: 'State where property is located'
    },
    {
      id: 'city',
      label: 'City',
      type: 'text' as const,
      required: true,
      tooltip: 'City where property is located'
    },
    {
      id: 'zipCode',
      label: 'ZIP Code',
      type: 'text' as const,
      required: true,
      tooltip: 'ZIP code of the property'
    },
    {
      id: 'floodZone',
      label: 'Flood Zone',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'low_risk', label: 'Low Risk' },
        { value: 'moderate_risk', label: 'Moderate Risk' },
        { value: 'high_risk', label: 'High Risk' },
        { value: 'very_high_risk', label: 'Very High Risk' },
        { value: 'unknown', label: 'Unknown' }
      ],
      tooltip: 'Flood risk zone designation'
    },
    {
      id: 'crimeRate',
      label: 'Crime Rate',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
        { value: 'very_high', label: 'Very High' }
      ],
      tooltip: 'Local crime rate level'
    },
    {
      id: 'fireStationDistance',
      label: 'Fire Station Distance (miles)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Distance to nearest fire station'
    },
    {
      id: 'policeStationDistance',
      label: 'Police Station Distance (miles)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Distance to nearest police station'
    },
    {
      id: 'dwellingCoverage',
      label: 'Dwelling Coverage ($)',
      type: 'currency' as const,
      required: true,
      min: 50000,
      max: 5000000,
      tooltip: 'Coverage for the main dwelling'
    },
    {
      id: 'personalPropertyCoverage',
      label: 'Personal Property Coverage ($)',
      type: 'currency' as const,
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Coverage for personal belongings'
    },
    {
      id: 'liabilityCoverage',
      label: 'Liability Coverage ($)',
      type: 'currency' as const,
      required: true,
      min: 100000,
      max: 1000000,
      tooltip: 'Coverage for liability claims'
    },
    {
      id: 'medicalPaymentsCoverage',
      label: 'Medical Payments Coverage ($)',
      type: 'currency' as const,
      required: true,
      min: 1000,
      max: 10000,
      tooltip: 'Coverage for medical payments'
    },
    {
      id: 'lossOfUseCoverage',
      label: 'Loss of Use Coverage ($)',
      type: 'currency' as const,
      required: true,
      min: 10000,
      max: 100000,
      tooltip: 'Coverage for additional living expenses'
    },
    {
      id: 'otherStructuresCoverage',
      label: 'Other Structures Coverage ($)',
      type: 'currency' as const,
      required: true,
      min: 0,
      max: 500000,
      tooltip: 'Coverage for other structures on property'
    },
    {
      id: 'dwellingDeductible',
      label: 'Dwelling Deductible ($)',
      type: 'select' as const,
      required: true,
      options: [
        { value: '250', label: '$250' },
        { value: '500', label: '$500' },
        { value: '1000', label: '$1,000' },
        { value: '1500', label: '$1,500' },
        { value: '2000', label: '$2,000' },
        { value: '2500', label: '$2,500' },
        { value: '5000', label: '$5,000' },
        { value: '10000', label: '$10,000' }
      ],
      tooltip: 'Deductible for dwelling claims'
    },
    {
      id: 'personalPropertyDeductible',
      label: 'Personal Property Deductible ($)',
      type: 'select' as const,
      required: true,
      options: [
        { value: '250', label: '$250' },
        { value: '500', label: '$500' },
        { value: '1000', label: '$1,000' },
        { value: '1500', label: '$1,500' },
        { value: '2000', label: '$2,000' },
        { value: '2500', label: '$2,500' },
        { value: '5000', label: '$5,000' }
      ],
      tooltip: 'Deductible for personal property claims'
    },
    {
      id: 'liabilityDeductible',
      label: 'Liability Deductible ($)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 5000,
      tooltip: 'Deductible for liability claims'
    },
    {
      id: 'hurricaneDeductible',
      label: 'Hurricane Deductible ($)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 50000,
      tooltip: 'Deductible for hurricane claims'
    },
    {
      id: 'windstormDeductible',
      label: 'Windstorm Deductible ($)',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 25000,
      tooltip: 'Deductible for windstorm claims'
    },
    {
      id: 'claimsInLast3Years',
      label: 'Claims in Last 3 Years',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 10,
      tooltip: 'Number of claims filed in the last 3 years'
    },
    {
      id: 'claimsInLast5Years',
      label: 'Claims in Last 5 Years',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 15,
      tooltip: 'Number of claims filed in the last 5 years'
    },
    {
      id: 'claimsInLast10Years',
      label: 'Claims in Last 10 Years',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 25,
      tooltip: 'Number of claims filed in the last 10 years'
    },
    {
      id: 'totalClaimAmount',
      label: 'Total Claim Amount ($)',
      type: 'currency' as const,
      required: true,
      min: 0,
      max: 1000000,
      tooltip: 'Total amount of previous claims'
    },
    {
      id: 'insuranceCompany',
      label: 'Insurance Company',
      type: 'text' as const,
      required: true,
      tooltip: 'Name of the insurance company'
    },
    {
      id: 'policyType',
      label: 'Policy Type',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'standard', label: 'Standard' },
        { value: 'premium', label: 'Premium' },
        { value: 'basic', label: 'Basic' },
        { value: 'custom', label: 'Custom' }
      ],
      tooltip: 'Type of insurance policy'
    },
    {
      id: 'policyTerm',
      label: 'Policy Term (months)',
      type: 'number' as const,
      required: true,
      min: 6,
      max: 36,
      tooltip: 'Length of the policy term'
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number' as const,
      required: true,
      min: 1,
      max: 10,
      tooltip: 'Period for analysis and projections'
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: -5,
      max: 15,
      tooltip: 'Expected annual inflation rate'
    },
    {
      id: 'propertyAppreciationRate',
      label: 'Property Appreciation Rate (%)',
      type: 'percentage' as const,
      required: true,
      min: -10,
      max: 20,
      tooltip: 'Expected annual property appreciation'
    },
    {
      id: 'rentalUnits',
      label: 'Rental Units',
      type: 'number' as const,
      required: true,
      min: 0,
      max: 10,
      tooltip: 'Number of rental units on property'
    }
  ];

  outputs = [
    {
      id: 'annualPremium',
      label: 'Annual Premium',
      type: 'currency' as const,
      explanation: 'Total annual insurance premium'
    },
    {
      id: 'monthlyPremium',
      label: 'Monthly Premium',
      type: 'currency' as const,
      explanation: 'Monthly insurance premium payment'
    },
    {
      id: 'totalCoverage',
      label: 'Total Coverage',
      type: 'currency' as const,
      explanation: 'Total coverage amount across all policies'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number' as const,
      explanation: 'Property risk score (1-10 scale)'
    },
    {
      id: 'premiumToValueRatio',
      label: 'Premium to Value Ratio (%)',
      type: 'percentage' as const,
      explanation: 'Ratio of annual premium to property value'
    },
    {
      id: 'totalDiscounts',
      label: 'Total Discounts (%)',
      type: 'percentage' as const,
      explanation: 'Total discount applied to base premium'
    },
    {
      id: 'effectivePremium',
      label: 'Effective Premium',
      type: 'currency' as const,
      explanation: 'Premium after applying all discounts'
    }
  ],

  formulas: [],

  validationRules: [],

  examples: [],

  calculate(inputs: HomeInsuranceCalculatorInputs): HomeInsuranceCalculatorOutputs {
    const validation = validateHomeInsuranceInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Invalid inputs: ${validation.errors.join(', ')}`);
    }

    return calculateHomeInsurance(inputs);
  }

  generateReport: (inputs: HomeInsuranceCalculatorInputs, outputs: HomeInsuranceCalculatorOutputs): string => {
    return `
# Home Insurance Analysis Report

## Executive Summary
This report provides a comprehensive analysis of your home insurance needs based on the provided property information and coverage requirements.

## Key Metrics
- **Annual Premium**: $${outputs.annualPremium.toLocaleString()}
- **Monthly Premium**: $${outputs.monthlyPremium.toFixed(2)}
- **Total Coverage**: $${outputs.totalCoverage.toLocaleString()}
- **Risk Score**: ${outputs.riskScore}/10
- **Premium to Value Ratio**: ${outputs.premiumToValueRatio}%

## Property Information
- **Property Value**: $${inputs.propertyValue.toLocaleString()}
- **Location**: ${inputs.city}, ${inputs.state} ${inputs.zipCode}
- **Property Type**: ${inputs.propertyType.replace('_', ' ')}
- **Age**: ${inputs.propertyAge} years
- **Size**: ${inputs.propertySize} sq ft

## Coverage Details
- **Dwelling Coverage**: $${inputs.dwellingCoverage.toLocaleString()}
- **Personal Property**: $${inputs.personalPropertyCoverage.toLocaleString()}
- **Liability**: $${inputs.liabilityCoverage.toLocaleString()}
- **Medical Payments**: $${inputs.medicalPaymentsCoverage.toLocaleString()}

## Risk Assessment
Your property has a risk score of ${outputs.riskScore}/10, which is considered ${outputs.riskScore < 4 ? 'low' : outputs.riskScore < 7 ? 'moderate' : 'high'} risk.

## Recommendations
${outputs.riskScore > 7 ? '- Consider additional safety features to reduce risk\n- Review deductibles for potential savings\n- Consider bundling policies for discounts' : '- Your risk profile appears reasonable\n- Monitor for changes in local risk factors\n- Regular maintenance can help maintain low premiums'}

## Analysis Period: ${inputs.analysisPeriod} years
- **Inflation Rate**: ${inputs.inflationRate}%
- **Property Appreciation**: ${inputs.propertyAppreciationRate}%

*This analysis is for informational purposes only and should not replace professional insurance advice.*
    `.trim();
  }
}
