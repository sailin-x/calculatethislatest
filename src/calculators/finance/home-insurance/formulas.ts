import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Base rates per $1000 of coverage by state (simplified)
const BASE_RATES: { [key: string]: number } = {
  'california': 0.8,
  'florida': 1.2,
  'texas': 1.0,
  'new-york': 1.1,
  'illinois': 0.9,
  'pennsylvania': 0.8,
  'ohio': 0.7,
  'georgia': 0.9,
  'north-carolina': 0.8,
  'michigan': 0.9,
  'default': 0.9
};

// Location factors
const LOCATION_FACTORS = {
  'urban': 1.3,
  'suburban': 1.0,
  'rural': 0.8
};

// Construction type factors
const CONSTRUCTION_FACTORS = {
  'frame': 1.2,
  'brick': 0.9,
  'stone': 0.8,
  'concrete': 0.7,
  'steel': 0.6,
  'mixed': 1.0
};

// Risk zone factors
const RISK_ZONE_FACTORS = {
  'low': 0.8,
  'moderate': 1.0,
  'high': 1.5,
  'very-high': 2.0
};

// Coverage level factors
const COVERAGE_LEVEL_FACTORS = {
  'basic': 0.8,
  'standard': 1.0,
  'premium': 1.3,
  'comprehensive': 1.6
};

// Deductible discount rates
const DEDUCTIBLE_DISCOUNTS = {
  500: 0.05,
  1000: 0.00,
  1500: 0.08,
  2000: 0.12,
  2500: 0.15,
  5000: 0.25
};

// Helper function to calculate risk score
function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 0;

  // Location risk
  if (inputs.location === 'urban') riskScore += 20;
  else if (inputs.location === 'suburban') riskScore += 10;

  // Crime rate risk
  if (inputs.crimeRate === 'high') riskScore += 15;
  else if (inputs.crimeRate === 'medium') riskScore += 10;

  // Natural disaster risk
  if (inputs.floodZone && ['a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've'].includes(inputs.floodZone)) riskScore += 20;
  if (inputs.earthquakeZone === 'high' || inputs.earthquakeZone === 'very-high') riskScore += 15;
  if (inputs.hurricaneZone === 'high' || inputs.hurricaneZone === 'very-high') riskScore += 15;
  if (inputs.tornadoZone === 'high' || inputs.tornadoZone === 'very-high') riskScore += 10;
  if (inputs.wildfireZone === 'high' || inputs.wildfireZone === 'very-high') riskScore += 15;

  // Property age risk
  if (inputs.yearBuilt && inputs.yearBuilt < 1950) riskScore += 15;
  else if (inputs.yearBuilt && inputs.yearBuilt < 1980) riskScore += 10;

  // Claims history risk
  if (inputs.claimsHistory === '5-plus') riskScore += 20;
  else if (inputs.claimsHistory === '3-5') riskScore += 15;
  else if (inputs.claimsHistory === '1-2') riskScore += 10;

  // Construction risk
  if (inputs.constructionType === 'frame') riskScore += 10;

  // Fire station distance risk
  if (inputs.fireStationDistance && inputs.fireStationDistance > 5) riskScore += 10;

  return Math.min(riskScore, 100);
}

// Helper function to calculate premium score
function calculatePremiumScore(annualPremium: number, dwellingCoverage: number): number {
  const costPerThousand = (annualPremium / dwellingCoverage) * 1000;
  
  if (costPerThousand < 1.0) return 95;
  else if (costPerThousand < 1.5) return 85;
  else if (costPerThousand < 2.0) return 75;
  else if (costPerThousand < 2.5) return 65;
  else if (costPerThousand < 3.0) return 55;
  else return 45;
}

// Helper function to calculate coverage score
function calculateCoverageScore(dwellingCoverage: number, replacementCost: number): number {
  const coverageRatio = dwellingCoverage / replacementCost;
  
  if (coverageRatio >= 1.0) return 95;
  else if (coverageRatio >= 0.9) return 85;
  else if (coverageRatio >= 0.8) return 75;
  else if (coverageRatio >= 0.7) return 65;
  else if (coverageRatio >= 0.6) return 55;
  else return 45;
}

export function calculateHomeInsurance(inputs: any): any {
  // Extract inputs with defaults
  const propertyValue = inputs.propertyValue || 0;
  const dwellingCoverage = inputs.dwellingCoverage || propertyValue;
  const personalPropertyCoverage = inputs.personalPropertyCoverage || dwellingCoverage * 0.5;
  const liabilityCoverage = inputs.liabilityCoverage || 300000;
  const medicalPaymentsCoverage = inputs.medicalPaymentsCoverage || 5000;
  const lossOfUseCoverage = inputs.lossOfUseCoverage || dwellingCoverage * 0.2;
  const otherStructuresCoverage = inputs.otherStructuresCoverage || dwellingCoverage * 0.1;
  const propertyType = inputs.propertyType || 'single_family';
  const constructionType = inputs.constructionType || 'wood_frame';
  const propertyAge = inputs.propertyAge || 15;
  const roofAge = inputs.roofAge || 10;
  const state = inputs.state || 'CA';
  const floodZone = inputs.floodZone || 'low_risk';
  const crimeRate = inputs.crimeRate || 'medium';
  const dwellingDeductible = inputs.dwellingDeductible || 1000;
  const personalPropertyDeductible = inputs.personalPropertyDeductible || 1000;
  const liabilityDeductible = inputs.liabilityDeductible || 0;
  const hurricaneDeductible = inputs.hurricaneDeductible || 5000;
  const windstormDeductible = inputs.windstormDeductible || 2500;
  const claimsInLast3Years = inputs.claimsInLast3Years || 0;
  const claimsInLast5Years = inputs.claimsInLast5Years || 0;
  const claimsInLast10Years = inputs.claimsInLast10Years || 0;
  const totalClaimAmount = inputs.totalClaimAmount || 0;
  const rentalUnits = inputs.rentalUnits || 0;

  // Calculate base premium
  const baseRate = BASE_RATES[state.toLowerCase()] || BASE_RATES.default;
  const constructionFactor = CONSTRUCTION_FACTORS[constructionType] || 1.0;

  // Calculate risk factors
  let riskFactor = 1.0;

  // Property age risk
  if (propertyAge > 30) riskFactor *= 1.2;
  else if (propertyAge > 20) riskFactor *= 1.1;

  // Roof age risk
  if (roofAge > 15) riskFactor *= 1.1;

  // Flood zone risk
  if (floodZone === 'high_risk' || floodZone === 'very_high_risk') riskFactor *= 1.5;
  else if (floodZone === 'moderate_risk') riskFactor *= 1.2;

  // Crime rate risk
  if (crimeRate === 'high' || crimeRate === 'very_high') riskFactor *= 1.1;

  // Claims history risk
  if (claimsInLast3Years > 0) riskFactor *= 1.1;
  if (claimsInLast5Years > 2) riskFactor *= 1.2;
  if (totalClaimAmount > 10000) riskFactor *= 1.1;

  // Rental units risk
  if (rentalUnits > 0) riskFactor *= 1.1;

  // Calculate base premium
  let basePremium = (dwellingCoverage / 1000) * baseRate * constructionFactor * riskFactor;

  // Apply deductible discount (simplified)
  let deductibleDiscount = 0;
  if (dwellingDeductible >= 2500) deductibleDiscount = 0.1;
  else if (dwellingDeductible >= 1500) deductibleDiscount = 0.05;

  const annualPremium = basePremium * (1 - deductibleDiscount);

  // Calculate total coverage
  const totalCoverage = dwellingCoverage + personalPropertyCoverage + liabilityCoverage + medicalPaymentsCoverage + lossOfUseCoverage + otherStructuresCoverage;

  // Calculate ratios
  const premiumToValueRatio = (annualPremium / propertyValue) * 100;

  // Calculate risk score (1-10 scale)
  let riskScore = 5; // Base score
  if (propertyAge > 30) riskScore += 1;
  if (roofAge > 15) riskScore += 1;
  if (floodZone === 'high_risk' || floodZone === 'very_high_risk') riskScore += 2;
  if (crimeRate === 'high' || crimeRate === 'very_high') riskScore += 1;
  if (claimsInLast3Years > 0) riskScore += 1;
  if (rentalUnits > 0) riskScore += 1;
  riskScore = Math.min(Math.max(riskScore, 1), 10);

  // Calculate total discounts (simplified)
  const totalDiscounts = basePremium - annualPremium;

  // Calculate monthly premium
  const monthlyPremium = annualPremium / 12;

  // Calculate effective premium (after discounts)
  const effectivePremium = annualPremium;

  // Create analysis object
  const analysis = {
    insuranceRating: riskScore <= 3 ? 'Excellent' : riskScore <= 6 ? 'Good' : 'Needs Improvement',
    riskRating: riskScore <= 4 ? 'Low' : riskScore <= 7 ? 'Medium' : 'High',
    recommendation: riskScore <= 5 ? 'Current coverage appears adequate' : 'Consider reviewing coverage options',
    insuranceSummary: `Based on your property details, estimated annual premium is $${annualPremium.toLocaleString()}. Risk score: ${riskScore}/10.`,
    riskAssessment: `Property risk factors include age (${propertyAge} years), location (${state}), and flood zone (${floodZone}).`,
    purchaseRecommendations: [
      'Compare quotes from multiple insurance providers',
      'Review coverage limits annually',
      'Consider bundling with auto insurance for discounts'
    ],
    nextSteps: [
      'Get quotes from at least 3 providers',
      'Review policy exclusions and limitations',
      'Update coverage as property value changes'
    ]
  };

  return {
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium),
    totalCoverage: Math.round(totalCoverage),
    riskScore,
    premiumToValueRatio: Math.round(premiumToValueRatio * 100) / 100,
    totalDiscounts: Math.round(totalDiscounts),
    effectivePremium: Math.round(effectivePremium),
    analysis
  };
}

export function generateHomeInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Home Insurance Analysis

## Summary
Your estimated annual premium is **$${outputs.annualPremium.toLocaleString()}** with a monthly cost of **$${outputs.monthlyPremium.toLocaleString()}**.

## Coverage Breakdown
- **Dwelling Coverage:** $${outputs.dwellingCoverage.toLocaleString()}
- **Personal Property:** $${outputs.personalPropertyCoverage.toLocaleString()}
- **Liability Coverage:** $${outputs.liabilityCoverageAmount.toLocaleString()}
- **Medical Payments:** $${outputs.medicalPaymentsAmount.toLocaleString()}
- **Loss of Use:** $${outputs.lossOfUseAmount.toLocaleString()}
- **Total Coverage:** $${outputs.totalCoverage.toLocaleString()}

## Key Metrics
- **Replacement Cost Ratio:** ${outputs.replacementCostRatio}%
- **Coverage Gap:** $${outputs.coverageGap.toLocaleString()}
- **Risk Score:** ${outputs.riskScore}/100
- **Premium Score:** ${outputs.premiumScore}/100
- **Coverage Score:** ${outputs.coverageScore}/100
- **Policy Grade:** ${outputs.policyGrade}

## Cost Analysis
- **Annual Cost:** $${outputs.annualCost.toLocaleString()}
- **Cost per $1000 Coverage:** $${outputs.costPerThousand}
- **Coverage Adequacy:** ${outputs.coverageAdequacy}

## Risk Factors
**${outputs.riskFactors}**

## Available Discounts
**${outputs.discounts}**

## Recommendations
**${outputs.recommendations}**

## Deductible Options
${outputs.comparisonTable}

## Next Steps
1. Compare quotes from multiple insurers
2. Review coverage limits and endorsements
3. Consider bundling with auto insurance
4. Evaluate deductible options for savings
5. Update coverage as property value changes`;
}
