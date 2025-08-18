import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Base rates per $1000 of coverage by state (simplified)
const BASE_RATES: { [key: string]: number } = {
  'California': 2.5, 'New York': 3.2, 'Texas': 2.1, 'Florida': 3.8, 'Illinois': 2.8,
  'Pennsylvania': 2.3, 'Ohio': 2.0, 'Georgia': 2.4, 'Michigan': 2.6, 'North Carolina': 2.2,
  'New Jersey': 3.0, 'Virginia': 2.3, 'Washington': 2.7, 'Arizona': 2.4, 'Massachusetts': 2.9,
  'Tennessee': 2.1, 'Indiana': 2.0, 'Missouri': 2.2, 'Maryland': 2.5, 'Colorado': 2.6,
  'Minnesota': 2.3, 'Wisconsin': 2.1, 'Alabama': 2.3, 'South Carolina': 2.4, 'Louisiana': 3.2,
  'Kentucky': 2.1, 'Oregon': 2.5, 'Oklahoma': 2.2, 'Connecticut': 2.8, 'Utah': 2.3,
  'Iowa': 2.0, 'Nevada': 2.6, 'Arkansas': 2.2, 'Mississippi': 2.4, 'Kansas': 2.1,
  'New Mexico': 2.3, 'Nebraska': 2.0, 'West Virginia': 2.2, 'Idaho': 2.1, 'Hawaii': 3.5,
  'New Hampshire': 2.4, 'Maine': 2.3, 'Montana': 2.2, 'Rhode Island': 2.7, 'Delaware': 2.4,
  'South Dakota': 2.0, 'North Dakota': 2.0, 'Alaska': 3.0, 'Vermont': 2.3, 'Wyoming': 2.1
};

// Location factors
const LOCATION_FACTORS = {
  'Urban': 1.2, 'Suburban': 1.0, 'Rural': 0.9, 'Coastal': 1.4, 'Mountain': 1.1, 'Desert': 1.0
};

// Construction type factors
const CONSTRUCTION_FACTORS = {
  'Frame': 1.0, 'Brick': 0.9, 'Masonry': 0.95, 'Steel': 0.85, 'Concrete': 0.8, 'Mixed': 1.0
};

// Risk zone factors
const RISK_ZONE_FACTORS = {
  'Low': 0.9, 'Medium': 1.0, 'High': 1.3, 'Very High': 1.6
};

// Coverage level factors
const COVERAGE_LEVEL_FACTORS = {
  'Basic': 0.8, 'Standard': 1.0, 'Comprehensive': 1.3, 'Premium': 1.6
};

// Property type factors
const PROPERTY_TYPE_FACTORS = {
  'Single Family': 1.0, 'Multi-Family': 1.2, 'Condo': 0.9, 'Townhouse': 1.0, 'Apartment Building': 1.3, 'Commercial': 1.4
};

// Tenant type factors
const TENANT_TYPE_FACTORS = {
  'Residential': 1.0, 'Student': 1.3, 'Section 8': 1.2, 'Corporate': 0.9, 'Short-term': 1.4, 'Vacant': 1.1
};

// Claims history factors
const CLAIMS_HISTORY_FACTORS = {
  'None': 1.0, '1-2 Claims': 1.2, '3-5 Claims': 1.5, '5+ Claims': 2.0
};

// Insurance score factors
const INSURANCE_SCORE_FACTORS = {
  'Excellent': 0.8, 'Good': 1.0, 'Fair': 1.3, 'Poor': 1.8
};

// Discount percentages
const DISCOUNT_PERCENTAGES = {
  'multiPolicy': { 'None': 0, 'Auto': 10, 'Umbrella': 5, 'Life': 5, 'Multiple': 15 },
  'loyalty': { '0': 0, '1': 2, '2': 4, '3': 6, '4': 8, '5': 10 },
  'paymentMethod': { 'Monthly': 0, 'Quarterly': 2, 'Semi-Annual': 4, 'Annual': 8 },
  'paperless': { 'Yes': 3, 'No': 0 },
  'autoPay': { 'Yes': 2, 'No': 0 },
  'newCustomer': { 'Yes': 5, 'No': 0 },
  'bundling': { 'None': 0, 'Auto': 8, 'Umbrella': 4, 'Life': 4, 'Multiple': 12 },
  'safety': { 'None': 0, 'Basic': 5, 'Advanced': 10, 'Premium': 15 },
  'claimsFree': { 'None': 0, '1-3 Years': 5, '3-5 Years': 10, '5+ Years': 15 }
};

// Security feature discounts
const SECURITY_FEATURE_DISCOUNTS = {
  'Alarm System': 5, 'Security Cameras': 3, 'Deadbolts': 2, 'Fire Sprinklers': 8,
  'Smoke Detectors': 2, 'Carbon Monoxide Detectors': 2, 'Gated Community': 4, 'Doorman': 3
};

// Helper function to calculate risk score
function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 50; // Base risk score

  // Property type risk
  if (inputs.propertyType) {
    const propertyRisk = {
      'Single Family': 0, 'Multi-Family': 10, 'Condo': -5, 'Townhouse': 0, 'Apartment Building': 15, 'Commercial': 20
    }[inputs.propertyType] || 0;
    riskScore += propertyRisk;
  }

  // Location risk
  if (inputs.location) {
    const locationRisk = {
      'Urban': 10, 'Suburban': 0, 'Rural': -5, 'Coastal': 20, 'Mountain': 5, 'Desert': 0
    }[inputs.location] || 0;
    riskScore += locationRisk;
  }

  // Risk zone
  if (inputs.riskZone) {
    const zoneRisk = {
      'Low': -10, 'Medium': 0, 'High': 15, 'Very High': 30
    }[inputs.riskZone] || 0;
    riskScore += zoneRisk;
  }

  // Construction type
  if (inputs.constructionType) {
    const constructionRisk = {
      'Frame': 10, 'Brick': 0, 'Masonry': 5, 'Steel': -5, 'Concrete': -10, 'Mixed': 5
    }[inputs.constructionType] || 0;
    riskScore += constructionRisk;
  }

  // Tenant type
  if (inputs.tenantType) {
    const tenantRisk = {
      'Residential': 0, 'Student': 15, 'Section 8': 10, 'Corporate': -5, 'Short-term': 20, 'Vacant': 5
    }[inputs.tenantType] || 0;
    riskScore += tenantRisk;
  }

  // Claims history
  if (inputs.claimsHistory) {
    const claimsRisk = {
      'None': -10, '1-2 Claims': 10, '3-5 Claims': 25, '5+ Claims': 40
    }[inputs.claimsHistory] || 0;
    riskScore += claimsRisk;
  }

  // Age of property
  if (inputs.yearBuilt) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - inputs.yearBuilt;
    if (age > 50) riskScore += 20;
    else if (age > 30) riskScore += 10;
    else if (age > 20) riskScore += 5;
    else if (age < 5) riskScore -= 5;
  }

  return Math.max(0, Math.min(100, riskScore));
}

// Helper function to calculate premium score
function calculatePremiumScore(annualPremium: number, propertyValue: number): number {
  const premiumToValueRatio = (annualPremium / propertyValue) * 100;
  
  if (premiumToValueRatio < 0.5) return 90;
  if (premiumToValueRatio < 0.8) return 80;
  if (premiumToValueRatio < 1.2) return 70;
  if (premiumToValueRatio < 1.8) return 60;
  if (premiumToValueRatio < 2.5) return 50;
  return 30;
}

// Helper function to calculate coverage score
function calculateCoverageScore(totalCoverage: number, propertyValue: number, replacementCost: number): number {
  const targetCoverage = replacementCost || propertyValue * 0.9;
  const coverageRatio = totalCoverage / targetCoverage;
  
  if (coverageRatio >= 1.0) return 100;
  if (coverageRatio >= 0.9) return 90;
  if (coverageRatio >= 0.8) return 80;
  if (coverageRatio >= 0.7) return 70;
  if (coverageRatio >= 0.6) return 60;
  return 40;
}

// Helper function to calculate overall score
function calculateOverallScore(riskScore: number, premiumScore: number, coverageScore: number): number {
  const weightedScore = (riskScore * 0.3) + (premiumScore * 0.4) + (coverageScore * 0.3);
  return Math.round(weightedScore);
}

// Helper function to generate recommendation
function generateRecommendation(overallScore: number, riskScore: number, premiumScore: number): string {
  if (overallScore >= 80) {
    return 'Excellent policy with competitive pricing and comprehensive coverage.';
  } else if (overallScore >= 70) {
    return 'Good policy with reasonable pricing and adequate coverage.';
  } else if (overallScore >= 60) {
    return 'Acceptable policy but consider shopping around for better rates.';
  } else {
    return 'Policy needs improvement. Consider adjusting coverage or shopping for alternatives.';
  }
}

export function calculateLandlordInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const {
    propertyValue = 0,
    replacementCost = propertyValue * 0.9,
    annualRent = 0,
    propertyType = 'Single Family',
    constructionType = 'Frame',
    yearBuilt = 2000,
    squareFootage = 2000,
    numberOfUnits = 1,
    location = 'Suburban',
    state = 'California',
    riskZone = 'Low',
    coverageLevel = 'Standard',
    liabilityLimit = 300000,
    medicalPayments = 5000,
    lossOfRent = 12000,
    personalProperty = 5000,
    deductible = 1000,
    securityFeatures = [],
    tenantType = 'Residential',
    occupancyRate = 95,
    claimsHistory = 'None',
    creditScore = 750,
    insuranceScore = 'Good',
    multiPolicyDiscount = 'None',
    loyaltyDiscount = 0,
    paymentMethod = 'Monthly',
    paperlessDiscount = 'No',
    autoPayDiscount = 'No',
    newCustomerDiscount = 'No',
    bundlingDiscount = 'None',
    safetyDiscount = 'None',
    claimsFreeDiscount = 'None'
  } = inputs;

  // Calculate base premium
  const baseRate = BASE_RATES[state] || 2.5;
  const basePremium = (propertyValue * baseRate / 1000) + (squareFootage * 0.5);

  // Apply risk factors
  const locationFactor = LOCATION_FACTORS[location as keyof typeof LOCATION_FACTORS] || 1.0;
  const constructionFactor = CONSTRUCTION_FACTORS[constructionType as keyof typeof CONSTRUCTION_FACTORS] || 1.0;
  const riskZoneFactor = RISK_ZONE_FACTORS[riskZone as keyof typeof RISK_ZONE_FACTORS] || 1.0;
  const propertyTypeFactor = PROPERTY_TYPE_FACTORS[propertyType as keyof typeof PROPERTY_TYPE_FACTORS] || 1.0;
  const tenantTypeFactor = TENANT_TYPE_FACTORS[tenantType as keyof typeof TENANT_TYPE_FACTORS] || 1.0;
  const claimsHistoryFactor = CLAIMS_HISTORY_FACTORS[claimsHistory as keyof typeof CLAIMS_HISTORY_FACTORS] || 1.0;
  const insuranceScoreFactor = INSURANCE_SCORE_FACTORS[insuranceScore as keyof typeof INSURANCE_SCORE_FACTORS] || 1.0;

  // Calculate risk-adjusted premium
  let riskAdjustedPremium = basePremium * locationFactor * constructionFactor * riskZoneFactor * 
                           propertyTypeFactor * tenantTypeFactor * claimsHistoryFactor * insuranceScoreFactor;

  // Apply coverage level factor
  const coverageLevelFactor = COVERAGE_LEVEL_FACTORS[coverageLevel as keyof typeof COVERAGE_LEVEL_FACTORS] || 1.0;
  let coverageAdjustedPremium = riskAdjustedPremium * coverageLevelFactor;

  // Apply liability factor
  const liabilityFactor = 1 + (liabilityLimit / 1000000) * 0.2;
  coverageAdjustedPremium *= liabilityFactor;

  // Calculate discounts
  let totalDiscount = 0;

  // Multi-policy discount
  totalDiscount += DISCOUNT_PERCENTAGES.multiPolicy[multiPolicyDiscount as keyof typeof DISCOUNT_PERCENTAGES.multiPolicy] || 0;

  // Loyalty discount
  const loyaltyYears = Math.min(loyaltyDiscount, 5);
  totalDiscount += DISCOUNT_PERCENTAGES.loyalty[loyaltyYears.toString() as keyof typeof DISCOUNT_PERCENTAGES.loyalty] || 0;

  // Payment method discount
  totalDiscount += DISCOUNT_PERCENTAGES.paymentMethod[paymentMethod as keyof typeof DISCOUNT_PERCENTAGES.paymentMethod] || 0;

  // Paperless discount
  totalDiscount += DISCOUNT_PERCENTAGES.paperless[paperlessDiscount as keyof typeof DISCOUNT_PERCENTAGES.paperless] || 0;

  // Auto-pay discount
  totalDiscount += DISCOUNT_PERCENTAGES.autoPay[autoPayDiscount as keyof typeof DISCOUNT_PERCENTAGES.autoPay] || 0;

  // New customer discount
  totalDiscount += DISCOUNT_PERCENTAGES.newCustomer[newCustomerDiscount as keyof typeof DISCOUNT_PERCENTAGES.newCustomer] || 0;

  // Bundling discount
  totalDiscount += DISCOUNT_PERCENTAGES.bundling[bundlingDiscount as keyof typeof DISCOUNT_PERCENTAGES.bundling] || 0;

  // Safety discount
  totalDiscount += DISCOUNT_PERCENTAGES.safety[safetyDiscount as keyof typeof DISCOUNT_PERCENTAGES.safety] || 0;

  // Claims-free discount
  totalDiscount += DISCOUNT_PERCENTAGES.claimsFree[claimsFreeDiscount as keyof typeof DISCOUNT_PERCENTAGES.claimsFree] || 0;

  // Security features discount
  if (Array.isArray(securityFeatures)) {
    securityFeatures.forEach(feature => {
      totalDiscount += SECURITY_FEATURE_DISCOUNTS[feature as keyof typeof SECURITY_FEATURE_DISCOUNTS] || 0;
    });
  }

  // Cap total discount at 40%
  totalDiscount = Math.min(totalDiscount, 40);

  // Calculate final premium
  const annualPremium = coverageAdjustedPremium * (1 - totalDiscount / 100);
  const monthlyPremium = annualPremium / 12;

  // Calculate coverage amounts
  const dwellingCoverage = replacementCost;
  const liabilityCoverage = liabilityLimit;
  const medicalPaymentsCoverage = medicalPayments;
  const lossOfRentCoverage = lossOfRent;
  const personalPropertyCoverage = personalProperty;
  const totalCoverage = dwellingCoverage + liabilityCoverage + medicalPaymentsCoverage + 
                       lossOfRentCoverage + personalPropertyCoverage;

  // Calculate ratios
  const coverageToValueRatio = (totalCoverage / propertyValue) * 100;
  const premiumToRentRatio = annualRent > 0 ? (annualPremium / annualRent) * 100 : 0;

  // Calculate scores
  const riskScore = calculateRiskScore(inputs);
  const premiumScore = calculatePremiumScore(annualPremium, propertyValue);
  const coverageScore = calculateCoverageScore(totalCoverage, propertyValue, replacementCost);
  const overallScore = calculateOverallScore(riskScore, premiumScore, coverageScore);

  // Generate recommendation
  const recommendation = generateRecommendation(overallScore, riskScore, premiumScore);

  return {
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium),
    dwellingCoverage: Math.round(dwellingCoverage),
    liabilityCoverage: Math.round(liabilityCoverage),
    medicalPaymentsCoverage: Math.round(medicalPaymentsCoverage),
    lossOfRentCoverage: Math.round(lossOfRentCoverage),
    personalPropertyCoverage: Math.round(personalPropertyCoverage),
    totalCoverage: Math.round(totalCoverage),
    coverageToValueRatio: Math.round(coverageToValueRatio * 100) / 100,
    premiumToRentRatio: Math.round(premiumToRentRatio * 100) / 100,
    riskScore,
    premiumScore,
    coverageScore,
    overallScore,
    recommendation,
    coverageBreakdown: `Dwelling: $${Math.round(dwellingCoverage).toLocaleString()}, Liability: $${Math.round(liabilityCoverage).toLocaleString()}, Medical: $${Math.round(medicalPaymentsCoverage).toLocaleString()}, Loss of Rent: $${Math.round(lossOfRentCoverage).toLocaleString()}, Personal Property: $${Math.round(personalPropertyCoverage).toLocaleString()}`,
    discountBreakdown: `Total discount: ${totalDiscount}% (Multi-policy: ${DISCOUNT_PERCENTAGES.multiPolicy[multiPolicyDiscount as keyof typeof DISCOUNT_PERCENTAGES.multiPolicy] || 0}%, Loyalty: ${DISCOUNT_PERCENTAGES.loyalty[Math.min(loyaltyDiscount, 5).toString() as keyof typeof DISCOUNT_PERCENTAGES.loyalty] || 0}%, Payment: ${DISCOUNT_PERCENTAGES.paymentMethod[paymentMethod as keyof typeof DISCOUNT_PERCENTAGES.paymentMethod] || 0}%)`,
    riskAnalysis: `Risk score: ${riskScore}/100. Factors: ${location} location (${locationFactor}x), ${constructionType} construction (${constructionFactor}x), ${riskZone} risk zone (${riskZoneFactor}x)`,
    costAnalysis: `Annual premium: $${Math.round(annualPremium).toLocaleString()}, Monthly: $${Math.round(monthlyPremium).toLocaleString()}, Premium to rent ratio: ${Math.round(premiumToRentRatio * 100) / 100}%`,
    comparisonAnalysis: `Market comparison: Premium score ${premiumScore}/100, Coverage score ${coverageScore}/100, Overall score ${overallScore}/100`,
    landlordInsuranceAnalysis: 'Comprehensive landlord insurance analysis completed'
  };
}

export function generateLandlordInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Landlord Insurance Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Overall Score:** ${outputs.overallScore}/100
**Risk Score:** ${outputs.riskScore}/100
**Premium Score:** ${outputs.premiumScore}/100
**Coverage Score:** ${outputs.coverageScore}/100

## Premium Overview
- **Annual Premium:** $${outputs.annualPremium.toLocaleString()}
- **Monthly Premium:** $${outputs.monthlyPremium.toLocaleString()}
- **Premium to Rent Ratio:** ${outputs.premiumToRentRatio}%

## Coverage Breakdown
- **Dwelling Coverage:** $${outputs.dwellingCoverage.toLocaleString()}
- **Liability Coverage:** $${outputs.liabilityCoverage.toLocaleString()}
- **Medical Payments:** $${outputs.medicalPaymentsCoverage.toLocaleString()}
- **Loss of Rent:** $${outputs.lossOfRentCoverage.toLocaleString()}
- **Personal Property:** $${outputs.personalPropertyCoverage.toLocaleString()}
- **Total Coverage:** $${outputs.totalCoverage.toLocaleString()}

## Key Metrics
- **Coverage to Value Ratio:** ${outputs.coverageToValueRatio}%
- **Premium to Rent Ratio:** ${outputs.premiumToRentRatio}%

## Risk Analysis
${outputs.riskAnalysis}

## Cost Analysis
${outputs.costAnalysis}

## Discount Breakdown
${outputs.discountBreakdown}

## Coverage Breakdown
${outputs.coverageBreakdown}

## Comparison Analysis
${outputs.comparisonAnalysis}

## Recommendations
1. Review coverage limits for adequacy
2. Consider increasing liability coverage if needed
3. Evaluate loss of rent coverage based on rental income
4. Compare with other insurers for competitive pricing
5. Consider bundling with other policies for additional savings

## Next Steps
1. Obtain quotes from multiple insurers
2. Review policy exclusions and limitations
3. Consider umbrella liability coverage
4. Evaluate deductible options
5. Review policy annually for updates`;
}
