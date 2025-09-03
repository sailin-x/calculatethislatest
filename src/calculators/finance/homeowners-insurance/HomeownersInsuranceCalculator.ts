import { Calculator } from '../../../types/calculator';

export const homeownersInsuranceCalculator: Calculator = {
  id: 'homeowners-insurance',
  title: 'Homeowners Insurance Calculator',
  category: 'finance',
  subcategory: 'Insurance & Risk Management',
  description: 'Calculate homeowners insurance premiums, coverage, and costs for comprehensive property protection',
  
  usageInstructions: [
    'Enter property information including value, type, age, and construction details',
    'Input location and risk factors such as crime rate and natural disaster risk',
    'Set coverage limits and deductibles for different insurance types',
    'Provide policy features and discounts information',
    'Review comprehensive insurance analysis with premium estimates and risk assessment'
  ],

  inputs: [
    {
      id: 'propertyValue',
      label: 'Property Value',
      type: 'currency',
      required: true,
      placeholder: '350000',
      tooltip: 'Current market value of the property',
      defaultValue: 350000,
      min: 50000,
      max: 10000000
    },
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'single-family', label: 'Single Family' },
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'multi-family', label: 'Multi Family' },
        { value: 'mobile-home', label: 'Mobile Home' }
      ],
      tooltip: 'Type of residential property',
      defaultValue: 'single-family'
    },
    {
      id: 'propertyAge',
      label: 'Property Age (years)',
      type: 'number',
      required: true,
      placeholder: '15',
      tooltip: 'Age of the property in years',
      defaultValue: 15,
      min: 0,
      max: 100
    },
    {
      id: 'propertySize',
      label: 'Property Size (sq ft)',
      type: 'number',
      required: true,
      placeholder: '2500',
      tooltip: 'Total square footage of the property',
      defaultValue: 2500,
      min: 500,
      max: 10000
    },
    {
      id: 'constructionType',
      label: 'Construction Type',
      type: 'select',
      required: true,
      options: [
        { value: 'wood-frame', label: 'Wood Frame' },
        { value: 'brick', label: 'Brick' },
        { value: 'stone', label: 'Stone' },
        { value: 'concrete', label: 'Concrete' },
        { value: 'steel-frame', label: 'Steel Frame' },
        { value: 'mixed', label: 'Mixed' }
      ],
      tooltip: 'Primary construction material',
      defaultValue: 'wood-frame'
    },
    {
      id: 'roofType',
      label: 'Roof Type',
      type: 'select',
      required: true,
      options: [
        { value: 'asphalt-shingle', label: 'Asphalt Shingle' },
        { value: 'metal', label: 'Metal' },
        { value: 'tile', label: 'Tile' },
        { value: 'slate', label: 'Slate' },
        { value: 'wood-shake', label: 'Wood Shake' },
        { value: 'flat', label: 'Flat' }
      ],
      tooltip: 'Type of roof material',
      defaultValue: 'asphalt-shingle'
    },
    {
      id: 'roofAge',
      label: 'Roof Age (years)',
      type: 'number',
      required: true,
      placeholder: '10',
      tooltip: 'Age of the roof in years',
      defaultValue: 10,
      min: 0,
      max: 50
    },
    {
      id: 'locationRisk',
      label: 'Location Risk Level',
      type: 'select',
      required: true,
      options: [
        { value: 'low', label: 'Low Risk' },
        { value: 'medium', label: 'Medium Risk' },
        { value: 'high', label: 'High Risk' }
      ],
      tooltip: 'Overall risk level of the property location',
      defaultValue: 'medium'
    },
    {
      id: 'crimeRate',
      label: 'Crime Rate',
      type: 'select',
      required: false,
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      tooltip: 'Crime rate in the area',
      defaultValue: 'medium'
    },
    {
      id: 'naturalDisasterRisk',
      label: 'Natural Disaster Risk',
      type: 'select',
      required: false,
      options: [
        { value: 'none', label: 'None' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ],
      tooltip: 'Risk of natural disasters in the area',
      defaultValue: 'low'
    },
    {
      id: 'coverageAmount',
      label: 'Coverage Amount',
      type: 'currency',
      required: true,
      placeholder: '350000',
      tooltip: 'Total insurance coverage amount',
      defaultValue: 350000,
      min: 50000,
      max: 10000000
    },
    {
      id: 'deductible',
      label: 'Deductible',
      type: 'currency',
      required: true,
      placeholder: '1000',
      tooltip: 'Insurance deductible amount',
      defaultValue: 1000,
      min: 250,
      max: 10000
    },
    {
      id: 'liabilityCoverage',
      label: 'Liability Coverage',
      type: 'currency',
      required: false,
      placeholder: '300000',
      tooltip: 'Personal liability coverage amount',
      defaultValue: 300000,
      min: 100000,
      max: 1000000
    },
    {
      id: 'medicalPayments',
      label: 'Medical Payments',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Medical payments coverage amount',
      defaultValue: 5000,
      min: 1000,
      max: 10000
    },
    {
      id: 'additionalCoverages',
      label: 'Additional Coverages',
      type: 'select',
      required: false,
      options: [
        { value: 'none', label: 'None' },
        { value: 'flood', label: 'Flood Insurance' },
        { value: 'earthquake', label: 'Earthquake Insurance' },
        { value: 'wind', label: 'Wind Insurance' },
        { value: 'sewer-backup', label: 'Sewer Backup' },
        { value: 'identity-theft', label: 'Identity Theft' }
      ],
      tooltip: 'Additional coverage options',
      defaultValue: 'none'
    },
    {
      id: 'discounts',
      label: 'Available Discounts',
      type: 'select',
      required: false,
      options: [
        { value: 'none', label: 'None' },
        { value: 'multi-policy', label: 'Multi-Policy' },
        { value: 'security-system', label: 'Security System' },
        { value: 'smoke-detectors', label: 'Smoke Detectors' },
        { value: 'new-home', label: 'New Home' },
        { value: 'senior-citizen', label: 'Senior Citizen' }
      ],
      tooltip: 'Available insurance discounts',
      defaultValue: 'none'
    }
  ],

  outputs: [
    {
      id: 'annualPremium',
      label: 'Annual Premium',
      type: 'currency',
      format: '$0,0',
      explanation: 'Estimated annual insurance premium'
    },
    {
      id: 'monthlyPremium',
      label: 'Monthly Premium',
      type: 'currency',
      format: '$0,0',
      explanation: 'Estimated monthly insurance premium'
    },
    {
      id: 'riskScore',
      label: 'Risk Score',
      type: 'number',
      format: '0',
      explanation: 'Overall risk assessment score (0-100)'
    },
    {
      id: 'riskLevel',
      label: 'Risk Level',
      type: 'text',
      explanation: 'Risk level classification (Low/Medium/High)'
    },
    {
      id: 'coverageRatio',
      label: 'Coverage Ratio',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Ratio of coverage amount to property value'
    },
    {
      id: 'premiumToValueRatio',
      label: 'Premium to Value Ratio',
      type: 'percentage',
      format: '0.00%',
      explanation: 'Annual premium as percentage of property value'
    },
    {
      id: 'recommendedCoverage',
      label: 'Recommended Coverage',
      type: 'currency',
      format: '$0,0',
      explanation: 'Recommended insurance coverage amount'
    },
    {
      id: 'costSavings',
      label: 'Potential Cost Savings',
      type: 'currency',
      format: '$0,0',
      explanation: 'Potential savings from available discounts'
    }
  ],

  formulas: [
    {
      id: 'homeowners-insurance-premium',
      name: 'Homeowners Insurance Premium Calculation',
      description: 'Calculate comprehensive homeowners insurance premiums and risk assessment',
      calculate: (inputs: Record<string, any>) => {
        const propertyValue = inputs.propertyValue || 0;
        const coverageAmount = inputs.coverageAmount || 0;
        const deductible = inputs.deductible || 0;
        const propertyAge = inputs.propertyAge || 0;
        const propertySize = inputs.propertySize || 0;
        const locationRisk = inputs.locationRisk || 'medium';
        const constructionType = inputs.constructionType || 'wood-frame';
        const roofAge = inputs.roofAge || 0;
        
        // Calculate base premium
        let basePremium = calculateBasePremium(propertyValue, coverageAmount, propertySize);
        
        // Apply risk factors
        basePremium = applyRiskFactors(basePremium, inputs);
        
        // Apply discounts
        const costSavings = calculateDiscounts(basePremium, inputs);
        const finalPremium = basePremium - costSavings;
        
        // Calculate risk score
        const riskScore = calculateRiskScore(inputs);
        const riskLevel = determineRiskLevel(riskScore);
        
        // Calculate ratios
        const coverageRatio = propertyValue > 0 ? (coverageAmount / propertyValue) * 100 : 0;
        const premiumToValueRatio = propertyValue > 0 ? (finalPremium / propertyValue) * 100 : 0;
        
        // Calculate recommended coverage
        const recommendedCoverage = calculateRecommendedCoverage(propertyValue, inputs);
        
        return {
          outputs: {
            annualPremium: Math.round(finalPremium),
            monthlyPremium: Math.round(finalPremium / 12),
            riskScore,
            riskLevel,
            coverageRatio: Math.round(coverageRatio * 100) / 100,
            premiumToValueRatio: Math.round(premiumToValueRatio * 10000) / 10000,
            recommendedCoverage: Math.round(recommendedCoverage),
            costSavings: Math.round(costSavings)
          },
          explanation: `Estimated annual premium: $${finalPremium.toLocaleString()}. Risk level: ${riskLevel}. Coverage ratio: ${coverageRatio.toFixed(1)}%.`,
          intermediateSteps: {
            basePremium: Math.round(basePremium),
            riskAdjustments: Math.round(basePremium - finalPremium),
            finalPremium: Math.round(finalPremium)
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'propertyValue',
      type: 'required',
      message: 'Property value is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'coverageAmount',
      type: 'required',
      message: 'Coverage amount is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'coverageAmount',
      type: 'business',
      message: 'Coverage amount should not exceed property value by more than 20%',
      validator: (value: any, allInputs: Record<string, any>) => {
        const propertyValue = allInputs?.propertyValue || 0;
        return value <= propertyValue * 1.2;
      }
    },
    {
      field: 'deductible',
      type: 'range',
      message: 'Deductible must be between $250 and $10,000',
      validator: (value: any) => value === null || value === undefined || (value >= 250 && value <= 10000)
    }
  ],

  examples: [
    {
      title: 'Standard Single Family Home',
      description: 'A 15-year-old single family home with standard coverage and medium risk location',
      inputs: {
        propertyValue: 350000,
        propertyType: 'single-family',
        propertyAge: 15,
        propertySize: 2500,
        constructionType: 'wood-frame',
        roofType: 'asphalt-shingle',
        roofAge: 10,
        locationRisk: 'medium',
        coverageAmount: 350000,
        deductible: 1000,
        liabilityCoverage: 300000,
        medicalPayments: 5000
      },
      expectedOutputs: {
        annualPremium: 1200,
        monthlyPremium: 100,
        riskScore: 45,
        riskLevel: 'Medium',
        coverageRatio: 100,
        premiumToValueRatio: 0.34,
        recommendedCoverage: 350000,
        costSavings: 120
      }
    },
    {
      title: 'High-Risk Coastal Property',
      description: 'A newer home in a high-risk coastal area with additional wind coverage',
      inputs: {
        propertyValue: 500000,
        propertyType: 'single-family',
        propertyAge: 5,
        propertySize: 3000,
        constructionType: 'concrete',
        roofType: 'metal',
        roofAge: 5,
        locationRisk: 'high',
        naturalDisasterRisk: 'high',
        coverageAmount: 500000,
        deductible: 2500,
        liabilityCoverage: 500000,
        additionalCoverages: 'wind',
        discounts: 'security-system'
      },
      expectedOutputs: {
        annualPremium: 2800,
        monthlyPremium: 233,
        riskScore: 75,
        riskLevel: 'High',
        coverageRatio: 100,
        premiumToValueRatio: 0.56,
        recommendedCoverage: 500000,
        costSavings: 140
      }
    }
  ]
};

// Helper functions for calculations
function calculateBasePremium(propertyValue: number, coverageAmount: number, propertySize: number): number {
  // Base rate: $0.35 per $100 of coverage
  let basePremium = (coverageAmount / 100) * 0.35;
  
  // Adjust for property size (larger homes cost more to insure)
  if (propertySize > 5000) basePremium *= 1.3;
  else if (propertySize > 3000) basePremium *= 1.15;
  else if (propertySize < 1500) basePremium *= 0.9;
  
  return basePremium;
}

function applyRiskFactors(basePremium: number, inputs: Record<string, any>): number {
  let adjustedPremium = basePremium;
  
  // Location risk
  const locationRisk = inputs.locationRisk;
  if (locationRisk === 'high') adjustedPremium *= 1.4;
  else if (locationRisk === 'medium') adjustedPremium *= 1.1;
  
  // Property age
  const propertyAge = inputs.propertyAge || 0;
  if (propertyAge > 50) adjustedPremium *= 1.3;
  else if (propertyAge > 30) adjustedPremium *= 1.2;
  else if (propertyAge > 20) adjustedPremium *= 1.1;
  else if (propertyAge < 5) adjustedPremium *= 0.9;
  
  // Construction type
  const constructionType = inputs.constructionType;
  if (constructionType === 'wood-frame') adjustedPremium *= 1.15;
  else if (constructionType === 'concrete') adjustedPremium *= 0.9;
  else if (constructionType === 'steel-frame') adjustedPremium *= 0.95;
  
  // Roof age
  const roofAge = inputs.roofAge || 0;
  if (roofAge > 20) adjustedPremium *= 1.25;
  else if (roofAge > 15) adjustedPremium *= 1.15;
  else if (roofAge > 10) adjustedPremium *= 1.05;
  
  // Natural disaster risk
  const naturalDisasterRisk = inputs.naturalDisasterRisk;
  if (naturalDisasterRisk === 'high') adjustedPremium *= 1.5;
  else if (naturalDisasterRisk === 'medium') adjustedPremium *= 1.25;
  
  // Additional coverages
  const additionalCoverages = inputs.additionalCoverages;
  if (additionalCoverages === 'flood') adjustedPremium *= 1.3;
  else if (additionalCoverages === 'earthquake') adjustedPremium *= 1.4;
  else if (additionalCoverages === 'wind') adjustedPremium *= 1.25;
  
  return adjustedPremium;
}

function calculateDiscounts(basePremium: number, inputs: Record<string, any>): number {
  let totalDiscount = 0;
  
  const discounts = inputs.discounts;
  if (discounts === 'multi-policy') totalDiscount += basePremium * 0.15;
  else if (discounts === 'security-system') totalDiscount += basePremium * 0.1;
  else if (discounts === 'smoke-detectors') totalDiscount += basePremium * 0.05;
  else if (discounts === 'new-home') totalDiscount += basePremium * 0.1;
  else if (discounts === 'senior-citizen') totalDiscount += basePremium * 0.05;
  
  return totalDiscount;
}

function calculateRiskScore(inputs: Record<string, any>): number {
  let riskScore = 30; // Base risk score
  
  // Location risk
  const locationRisk = inputs.locationRisk;
  if (locationRisk === 'high') riskScore += 30;
  else if (locationRisk === 'medium') riskScore += 15;
  
  // Property age
  const propertyAge = inputs.propertyAge || 0;
  if (propertyAge > 50) riskScore += 25;
  else if (propertyAge > 30) riskScore += 20;
  else if (propertyAge > 20) riskScore += 15;
  else if (propertyAge < 5) riskScore -= 10;
  
  // Construction type
  const constructionType = inputs.constructionType;
  if (constructionType === 'wood-frame') riskScore += 15;
  else if (constructionType === 'concrete') riskScore -= 10;
  
  // Natural disaster risk
  const naturalDisasterRisk = inputs.naturalDisasterRisk;
  if (naturalDisasterRisk === 'high') riskScore += 25;
  else if (naturalDisasterRisk === 'medium') riskScore += 15;
  
  // Crime rate
  const crimeRate = inputs.crimeRate;
  if (crimeRate === 'high') riskScore += 20;
  else if (crimeRate === 'medium') riskScore += 10;
  
  return Math.min(100, Math.max(0, riskScore));
}

function determineRiskLevel(riskScore: number): string {
  if (riskScore >= 70) return 'High';
  else if (riskScore >= 40) return 'Medium';
  else return 'Low';
}

function calculateRecommendedCoverage(propertyValue: number, inputs: Record<string, any>): number {
  // Base recommendation: 100% of property value
  let recommended = propertyValue;
  
  // Adjust based on property type
  const propertyType = inputs.propertyType;
  if (propertyType === 'condo') recommended *= 0.8; // Condos need less coverage
  else if (propertyType === 'mobile-home') recommended *= 0.9;
  
  // Adjust based on location risk
  const locationRisk = inputs.locationRisk;
  if (locationRisk === 'high') recommended *= 1.1; // Higher risk areas need more coverage
  
  return Math.round(recommended);
}
