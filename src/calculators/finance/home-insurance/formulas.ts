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

export function calculateHomeInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const homeValue = inputs.homeValue || 0;
  const replacementCost = inputs.replacementCost || homeValue * 0.9;
  const propertyType = inputs.propertyType || 'single-family';
  const constructionType = inputs.constructionType || 'frame';
  const yearBuilt = inputs.yearBuilt || 1990;
  const squareFootage = inputs.squareFootage || 2000;
  const location = inputs.location || 'suburban';
  const state = inputs.state || 'california';
  const deductible = inputs.deductible || 1000;
  const coverageLevel = inputs.coverageLevel || 'standard';
  const personalPropertyValue = inputs.personalPropertyValue || 50000;
  const liabilityCoverage = inputs.liabilityCoverage || 300000;
  const medicalPayments = inputs.medicalPayments || 5000;
  const lossOfUse = inputs.lossOfUse || 20000;
  const creditScore = inputs.creditScore || 750;
  const claimsHistory = inputs.claimsHistory || 'none';
  const occupancyType = inputs.occupancyType || 'owner-occupied';

  // Calculate base premium
  const baseRate = BASE_RATES[state] || BASE_RATES.default;
  const locationFactor = LOCATION_FACTORS[location] || 1.0;
  const constructionFactor = CONSTRUCTION_FACTORS[constructionType] || 1.0;
  const coverageLevelFactor = COVERAGE_LEVEL_FACTORS[coverageLevel] || 1.0;

  // Calculate natural disaster factors
  let naturalDisasterFactor = 1.0;
  if (inputs.floodZone && ['a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've'].includes(inputs.floodZone)) {
    naturalDisasterFactor *= 1.5;
  }
  if (inputs.earthquakeZone) {
    naturalDisasterFactor *= RISK_ZONE_FACTORS[inputs.earthquakeZone] || 1.0;
  }
  if (inputs.hurricaneZone) {
    naturalDisasterFactor *= RISK_ZONE_FACTORS[inputs.hurricaneZone] || 1.0;
  }
  if (inputs.tornadoZone) {
    naturalDisasterFactor *= RISK_ZONE_FACTORS[inputs.tornadoZone] || 1.0;
  }
  if (inputs.wildfireZone) {
    naturalDisasterFactor *= RISK_ZONE_FACTORS[inputs.wildfireZone] || 1.0;
  }

  // Calculate base premium
  let basePremium = (replacementCost / 1000) * baseRate * locationFactor * constructionFactor * coverageLevelFactor * naturalDisasterFactor;

  // Apply deductible discount
  const deductibleDiscount = DEDUCTIBLE_DISCOUNTS[deductible] || 0;
  const annualPremium = basePremium * (1 - deductibleDiscount);

  // Calculate coverage amounts
  const dwellingCoverage = replacementCost;
  const personalPropertyCoverage = dwellingCoverage * 0.5;
  const liabilityCoverageAmount = liabilityCoverage;
  const medicalPaymentsAmount = medicalPayments;
  const lossOfUseAmount = lossOfUse;

  // Calculate total coverage
  const totalCoverage = dwellingCoverage + personalPropertyCoverage + liabilityCoverageAmount + medicalPaymentsAmount + lossOfUseAmount;

  // Calculate ratios and gaps
  const replacementCostRatio = (dwellingCoverage / replacementCost) * 100;
  const coverageGap = Math.max(0, replacementCost - dwellingCoverage);

  // Calculate scores
  const riskScore = calculateRiskScore(inputs);
  const premiumScore = calculatePremiumScore(annualPremium, dwellingCoverage);
  const coverageScore = calculateCoverageScore(dwellingCoverage, replacementCost);

  // Calculate recommended deductible
  let recommendedDeductible = 1000;
  if (annualPremium > 2000) recommendedDeductible = 2500;
  else if (annualPremium > 1500) recommendedDeductible = 2000;
  else if (annualPremium > 1000) recommendedDeductible = 1500;

  // Calculate potential savings
  const recommendedDiscount = DEDUCTIBLE_DISCOUNTS[recommendedDeductible] || 0;
  const currentDiscount = DEDUCTIBLE_DISCOUNTS[deductible] || 0;
  const premiumSavings = basePremium * (recommendedDiscount - currentDiscount);

  // Determine risk factors
  const riskFactors = [];
  if (inputs.location === 'urban') riskFactors.push('Urban location');
  if (inputs.crimeRate === 'high') riskFactors.push('High crime area');
  if (inputs.floodZone && ['a', 'ae', 'ah', 'ao', 'ar', 'a99', 'v', 've'].includes(inputs.floodZone)) riskFactors.push('Flood zone');
  if (inputs.earthquakeZone === 'high' || inputs.earthquakeZone === 'very-high') riskFactors.push('High earthquake risk');
  if (inputs.hurricaneZone === 'high' || inputs.hurricaneZone === 'very-high') riskFactors.push('High hurricane risk');
  if (inputs.yearBuilt && inputs.yearBuilt < 1980) riskFactors.push('Older construction');
  if (inputs.claimsHistory && inputs.claimsHistory !== 'none') riskFactors.push('Claims history');

  // Determine available discounts
  const discounts = [];
  if (inputs.securityFeatures && inputs.securityFeatures.includes('alarm-system')) discounts.push('Security system');
  if (inputs.securityFeatures && inputs.securityFeatures.includes('smoke-detectors')) discounts.push('Smoke detectors');
  if (inputs.securityFeatures && inputs.securityFeatures.includes('fire-sprinklers')) discounts.push('Fire sprinklers');
  if (inputs.creditScore && inputs.creditScore >= 750) discounts.push('Good credit');
  if (inputs.occupancyType === 'owner-occupied') discounts.push('Owner occupied');
  if (inputs.fireStationDistance && inputs.fireStationDistance <= 1) discounts.push('Near fire station');

  // Determine coverage recommendations
  const recommendations = [];
  if (coverageGap > 0) recommendations.push(`Increase dwelling coverage by $${coverageGap.toLocaleString()}`);
  if (inputs.personalPropertyValue > personalPropertyCoverage) recommendations.push('Consider additional personal property coverage');
  if (inputs.liabilityCoverage && inputs.liabilityCoverage < 500000) recommendations.push('Consider higher liability coverage');
  if (recommendedDeductible !== deductible) recommendations.push(`Consider $${recommendedDeductible} deductible for savings`);

  // Calculate additional metrics
  const monthlyPremium = annualPremium / 12;
  const annualCost = annualPremium + deductible;
  const costPerThousand = (annualPremium / dwellingCoverage) * 1000;

  // Determine coverage adequacy
  let coverageAdequacy = 'Adequate';
  if (coverageRatio < 0.8) coverageAdequacy = 'Inadequate';
  else if (coverageRatio < 0.9) coverageAdequacy = 'Marginal';

  // Determine policy grade
  let policyGrade = 'C';
  const averageScore = (riskScore + premiumScore + coverageScore) / 3;
  if (averageScore >= 80) policyGrade = 'A';
  else if (averageScore >= 70) policyGrade = 'B';
  else if (averageScore >= 60) policyGrade = 'C';
  else if (averageScore >= 50) policyGrade = 'D';
  else policyGrade = 'F';

  return {
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium),
    dwellingCoverage: Math.round(dwellingCoverage),
    personalPropertyCoverage: Math.round(personalPropertyCoverage),
    liabilityCoverageAmount: Math.round(liabilityCoverageAmount),
    medicalPaymentsAmount: Math.round(medicalPaymentsAmount),
    lossOfUseAmount: Math.round(lossOfUseAmount),
    totalCoverage: Math.round(totalCoverage),
    replacementCostRatio: Math.round(replacementCostRatio * 100) / 100,
    coverageGap: Math.round(coverageGap),
    riskScore,
    premiumScore,
    coverageScore,
    recommendedDeductible,
    premiumSavings: Math.round(premiumSavings),
    riskFactors: riskFactors.join(', ') || 'None identified',
    discounts: discounts.join(', ') || 'None available',
    recommendations: recommendations.join('; ') || 'Coverage appears adequate',
    comparisonTable: `Deductible Comparison:\n$500: $${Math.round(basePremium * 0.95)}\n$1000: $${Math.round(basePremium)}\n$2500: $${Math.round(basePremium * 0.85)}`,
    annualCost: Math.round(annualCost),
    costPerThousand: Math.round(costPerThousand * 100) / 100,
    coverageAdequacy,
    policyGrade,
    homeInsuranceAnalysis: 'Comprehensive home insurance analysis completed'
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
