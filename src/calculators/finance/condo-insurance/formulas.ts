import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Base rates by property type
const BASE_RATES = {
  'studio': 0.0035,
  'one-bedroom': 0.0032,
  'two-bedroom': 0.0030,
  'three-bedroom': 0.0028,
  'penthouse': 0.0040,
  'townhouse': 0.0035
};

// Location factors
const LOCATION_FACTORS = {
  'urban': 1.2,
  'suburban': 1.0,
  'rural': 0.9,
  'coastal': 1.5,
  'mountain': 1.1
};

// Construction type factors
const CONSTRUCTION_FACTORS = {
  'frame': 1.3,
  'masonry': 1.0,
  'fire-resistive': 0.8,
  'non-combustible': 0.9
};

// Claims history factors
const CLAIMS_FACTORS = {
  '0': 1.0,
  '1': 1.15,
  '2': 1.35,
  '3+': 1.6
};

// Credit score factors
const CREDIT_FACTORS = {
  'excellent': 0.85,
  'good': 1.0,
  'fair': 1.2,
  'poor': 1.5
};

// Security feature discounts
const SECURITY_DISCOUNTS = {
  'alarm-system': 0.05,
  'security-camera': 0.03,
  'doorman': 0.08,
  'gated-access': 0.04,
  'fire-sprinklers': 0.06,
  'none': 0.0
};

// Occupancy type factors
const OCCUPANCY_FACTORS = {
  'owner-occupied': 1.0,
  'rental': 1.25,
  'vacation': 1.15
};

// Flood zone factors
const FLOOD_FACTORS = {
  'x': 1.0,
  'a': 1.3,
  'v': 1.5,
  'unknown': 1.1
};

// Earthquake zone factors
const EARTHQUAKE_FACTORS = {
  'low': 1.0,
  'moderate': 1.2,
  'high': 1.4
};

// Calculate base premium
function calculateBasePremium(propertyValue: number, propertyType: string, location: string, constructionType: string): number {
  const baseRate = BASE_RATES[propertyType as keyof typeof BASE_RATES] || 0.0032;
  const locationFactor = LOCATION_FACTORS[location as keyof typeof LOCATION_FACTORS] || 1.0;
  const constructionFactor = CONSTRUCTION_FACTORS[constructionType as keyof typeof CONSTRUCTION_FACTORS] || 1.0;
  
  return propertyValue * baseRate * locationFactor * constructionFactor;
}

// Calculate risk adjustments
function calculateRiskAdjustments(
  basePremium: number,
  claimsHistory: string,
  creditScore: string,
  securityFeatures: string[],
  occupancyType: string,
  floodZone: string,
  earthquakeZone: string
): number {
  const claimsFactor = CLAIMS_FACTORS[claimsHistory as keyof typeof CLAIMS_FACTORS] || 1.0;
  const creditFactor = CREDIT_FACTORS[creditScore as keyof typeof CREDIT_FACTORS] || 1.0;
  const occupancyFactor = OCCUPANCY_FACTORS[occupancyType as keyof typeof OCCUPANCY_FACTORS] || 1.0;
  const floodFactor = FLOOD_FACTORS[floodZone as keyof typeof FLOOD_FACTORS] || 1.0;
  const earthquakeFactor = EARTHQUAKE_FACTORS[earthquakeZone as keyof typeof EARTHQUAKE_FACTORS] || 1.0;
  
  // Calculate security discount
  let securityDiscount = 0;
  securityFeatures.forEach(feature => {
    securityDiscount += SECURITY_DISCOUNTS[feature as keyof typeof SECURITY_DISCOUNTS] || 0;
  });
  
  const totalRiskFactor = claimsFactor * creditFactor * occupancyFactor * floodFactor * earthquakeFactor * (1 - securityDiscount);
  
  return basePremium * (totalRiskFactor - 1);
}

// Calculate total coverage
function calculateTotalCoverage(
  personalPropertyValue: number,
  buildingCoverage: number,
  lossOfUseCoverage: number,
  personalLiabilityCoverage: number,
  medicalPaymentsCoverage: number
): number {
  return personalPropertyValue + buildingCoverage + lossOfUseCoverage + personalLiabilityCoverage + medicalPaymentsCoverage;
}

// Calculate risk score
function calculateRiskScore(
  location: string,
  constructionType: string,
  claimsHistory: string,
  creditScore: string,
  securityFeatures: string[],
  occupancyType: string,
  floodZone: string,
  earthquakeZone: string
): number {
  let riskScore = 50; // Base score
  
  // Location risk
  if (location === 'coastal') riskScore += 20;
  else if (location === 'urban') riskScore += 10;
  else if (location === 'rural') riskScore -= 5;
  
  // Construction risk
  if (constructionType === 'frame') riskScore += 15;
  else if (constructionType === 'fire-resistive') riskScore -= 10;
  
  // Claims history risk
  if (claimsHistory === '1') riskScore += 10;
  else if (claimsHistory === '2') riskScore += 20;
  else if (claimsHistory === '3+') riskScore += 30;
  
  // Credit risk
  if (creditScore === 'poor') riskScore += 15;
  else if (creditScore === 'excellent') riskScore -= 10;
  
  // Security features (reduce risk)
  securityFeatures.forEach(feature => {
    if (feature !== 'none') riskScore -= 5;
  });
  
  // Occupancy risk
  if (occupancyType === 'rental') riskScore += 15;
  else if (occupancyType === 'vacation') riskScore += 10;
  
  // Natural disaster risk
  if (floodZone === 'v') riskScore += 20;
  else if (floodZone === 'a') riskScore += 15;
  
  if (earthquakeZone === 'high') riskScore += 20;
  else if (earthquakeZone === 'moderate') riskScore += 10;
  
  return Math.max(1, Math.min(100, riskScore));
}

// Generate premium factors description
function generatePremiumFactors(
  location: string,
  constructionType: string,
  claimsHistory: string,
  creditScore: string,
  securityFeatures: string[],
  occupancyType: string,
  floodZone: string,
  earthquakeZone: string
): string {
  const factors = [];
  
  if (location === 'coastal') factors.push('coastal location');
  if (location === 'urban') factors.push('urban location');
  if (constructionType === 'frame') factors.push('frame construction');
  if (claimsHistory !== '0') factors.push(`${claimsHistory} previous claim(s)`);
  if (creditScore === 'excellent') factors.push('excellent credit');
  if (creditScore === 'poor') factors.push('poor credit');
  if (securityFeatures.length > 0 && !securityFeatures.includes('none')) factors.push('security features');
  if (occupancyType === 'rental') factors.push('rental property');
  if (floodZone !== 'x') factors.push(`flood zone ${floodZone.toUpperCase()}`);
  if (earthquakeZone !== 'low') factors.push(`${earthquakeZone} earthquake risk`);
  
  return factors.length > 0 ? factors.join(', ') : 'standard risk factors';
}

// Generate recommended coverage
function generateRecommendedCoverage(
  propertyValue: number,
  personalPropertyValue: number,
  floodZone: string,
  earthquakeZone: string,
  hoaInsurance: string
): string {
  const recommendations = [];
  
  if (personalPropertyValue < propertyValue * 0.15) {
    recommendations.push('increase personal property coverage');
  }
  
  if (floodZone !== 'x') {
    recommendations.push('add flood insurance');
  }
  
  if (earthquakeZone !== 'low') {
    recommendations.push('consider earthquake coverage');
  }
  
  if (hoaInsurance === 'bare-walls') {
    recommendations.push('increase building coverage for fixtures');
  }
  
  return recommendations.length > 0 ? recommendations.join(', ') : 'adequate coverage for current needs';
}

// Calculate potential cost savings
function calculateCostSavings(
  annualPremium: number,
  securityFeatures: string[],
  creditScore: string,
  deductible: number
): number {
  let savings = 0;
  
  // Security feature savings
  securityFeatures.forEach(feature => {
    if (feature !== 'none') {
      savings += annualPremium * (SECURITY_DISCOUNTS[feature as keyof typeof SECURITY_DISCOUNTS] || 0);
    }
  });
  
  // Higher deductible savings
  if (deductible > 1000) {
    savings += annualPremium * 0.1;
  }
  
  // Credit score savings
  if (creditScore === 'excellent') {
    savings += annualPremium * 0.15;
  }
  
  return Math.round(savings);
}

// Generate coverage gaps analysis
function generateCoverageGaps(
  propertyValue: number,
  personalPropertyValue: number,
  buildingCoverage: number,
  personalLiabilityCoverage: number,
  floodZone: string,
  earthquakeZone: string,
  hoaInsurance: string
): string {
  const gaps = [];
  
  if (personalLiabilityCoverage < 500000) {
    gaps.push('consider umbrella liability policy');
  }
  
  if (floodZone !== 'x') {
    gaps.push('flood insurance recommended');
  }
  
  if (earthquakeZone !== 'low') {
    gaps.push('earthquake coverage advised');
  }
  
  if (hoaInsurance === 'bare-walls' && buildingCoverage < propertyValue * 0.1) {
    gaps.push('increase building coverage for fixtures');
  }
  
  return gaps.length > 0 ? gaps.join(', ') : 'no significant coverage gaps identified';
}

// Calculate claims probability
function calculateClaimsProbability(
  riskScore: number,
  location: string,
  constructionType: string,
  claimsHistory: string
): number {
  let probability = 10; // Base 10%
  
  // Risk score adjustment
  probability += (riskScore - 50) * 0.2;
  
  // Location adjustment
  if (location === 'coastal') probability += 5;
  if (location === 'urban') probability += 3;
  
  // Construction adjustment
  if (constructionType === 'frame') probability += 3;
  if (constructionType === 'fire-resistive') probability -= 2;
  
  // Claims history adjustment
  if (claimsHistory === '1') probability += 5;
  if (claimsHistory === '2') probability += 10;
  if (claimsHistory === '3+') probability += 15;
  
  return Math.max(1, Math.min(50, Math.round(probability * 10) / 10));
}

// Calculate replacement cost
function calculateReplacementCost(
  squareFootage: number,
  constructionType: string,
  yearBuilt: number
): number {
  const baseCostPerSqFt = 150;
  const constructionFactor = CONSTRUCTION_FACTORS[constructionType as keyof typeof CONSTRUCTION_FACTORS] || 1.0;
  const ageFactor = Math.max(0.7, 1 - (2024 - yearBuilt) * 0.01);
  
  return squareFootage * baseCostPerSqFt * constructionFactor * ageFactor;
}

// Calculate actual cash value
function calculateActualCashValue(replacementCost: number, yearBuilt: number): number {
  const depreciation = (2024 - yearBuilt) * 0.02; // 2% per year
  return replacementCost * (1 - Math.min(0.5, depreciation));
}

// Generate coverage breakdown
function generateCoverageBreakdown(
  personalPropertyValue: number,
  buildingCoverage: number,
  lossOfUseCoverage: number,
  personalLiabilityCoverage: number,
  medicalPaymentsCoverage: number
): string {
  return `Personal Property: $${personalPropertyValue.toLocaleString()}, Building: $${buildingCoverage.toLocaleString()}, Loss of Use: $${lossOfUseCoverage.toLocaleString()}, Liability: $${personalLiabilityCoverage.toLocaleString()}, Medical: $${medicalPaymentsCoverage.toLocaleString()}`;
}

// Generate policy comparison
function generatePolicyComparison(
  annualPremium: number,
  totalCoverage: number,
  riskScore: number
): string {
  const coverageRatio = totalCoverage / annualPremium;
  
  if (coverageRatio > 300) {
    return 'Excellent value policy with high coverage-to-premium ratio';
  } else if (coverageRatio > 200) {
    return 'Good value policy with adequate coverage';
  } else {
    return 'Standard policy - consider shopping for better rates';
  }
}

export function calculateInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  const propertyType = inputs.propertyType as string;
  const squareFootage = inputs.squareFootage as number;
  const propertyValue = inputs.propertyValue as number;
  const personalPropertyValue = inputs.personalPropertyValue as number;
  const buildingCoverage = inputs.buildingCoverage as number;
  const lossOfUseCoverage = inputs.lossOfUseCoverage as number;
  const personalLiabilityCoverage = inputs.personalLiabilityCoverage as number;
  const medicalPaymentsCoverage = inputs.medicalPaymentsCoverage as number;
  const deductible = inputs.deductible as number;
  const location = inputs.location as string;
  const constructionType = inputs.constructionType as string;
  const yearBuilt = inputs.yearBuilt as number;
  const securityFeatures = inputs.securityFeatures as string[];
  const claimsHistory = inputs.claimsHistory as string;
  const creditScore = inputs.creditScore as string;
  const occupancyType = inputs.occupancyType as string;
  const hoaInsurance = inputs.hoaInsurance as string;
  const floodZone = inputs.floodZone as string;
  const earthquakeZone = inputs.earthquakeZone as string;
  
  // Calculate base premium
  const basePremium = calculateBasePremium(propertyValue, propertyType, location, constructionType);
  
  // Calculate risk adjustments
  const riskAdjustment = calculateRiskAdjustments(
    basePremium, claimsHistory, creditScore, securityFeatures, 
    occupancyType, floodZone, earthquakeZone
  );
  
  // Calculate final premium
  const annualPremium = Math.round(basePremium + riskAdjustment);
  const monthlyPremium = Math.round(annualPremium / 12);
  
  // Calculate coverage and other metrics
  const totalCoverage = calculateTotalCoverage(
    personalPropertyValue, buildingCoverage, lossOfUseCoverage,
    personalLiabilityCoverage, medicalPaymentsCoverage
  );
  
  const riskScore = calculateRiskScore(
    location, constructionType, claimsHistory, creditScore,
    securityFeatures, occupancyType, floodZone, earthquakeZone
  );
  
  const premiumFactors = generatePremiumFactors(
    location, constructionType, claimsHistory, creditScore,
    securityFeatures, occupancyType, floodZone, earthquakeZone
  );
  
  const recommendedCoverage = generateRecommendedCoverage(
    propertyValue, personalPropertyValue, floodZone, earthquakeZone, hoaInsurance
  );
  
  const costSavings = calculateCostSavings(annualPremium, securityFeatures, creditScore, deductible);
  
  const coverageGaps = generateCoverageGaps(
    propertyValue, personalPropertyValue, buildingCoverage,
    personalLiabilityCoverage, floodZone, earthquakeZone, hoaInsurance
  );
  
  const claimsProbability = calculateClaimsProbability(riskScore, location, constructionType, claimsHistory);
  
  const replacementCost = calculateReplacementCost(squareFootage, constructionType, yearBuilt);
  const actualCashValue = calculateActualCashValue(replacementCost, yearBuilt);
  
  const coverageBreakdown = generateCoverageBreakdown(
    personalPropertyValue, buildingCoverage, lossOfUseCoverage,
    personalLiabilityCoverage, medicalPaymentsCoverage
  );
  
  const policyComparison = generatePolicyComparison(annualPremium, totalCoverage, riskScore);
  
  return {
    annualPremium,
    monthlyPremium,
    totalCoverage,
    coverageBreakdown,
    riskScore,
    premiumFactors,
    recommendedCoverage,
    costSavings,
    coverageGaps,
    policyComparison,
    claimsProbability,
    replacementCost: Math.round(replacementCost),
    actualCashValue: Math.round(actualCashValue),
    insuranceAnalysis: 'Comprehensive condo insurance analysis completed'
  };
}

export function generateInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const propertyType = inputs.propertyType as string;
  const squareFootage = inputs.squareFootage as number;
  const propertyValue = inputs.propertyValue as number;
  const annualPremium = outputs.annualPremium as number;
  const monthlyPremium = outputs.monthlyPremium as number;
  const totalCoverage = outputs.totalCoverage as number;
  const riskScore = outputs.riskScore as number;
  const claimsProbability = outputs.claimsProbability as number;
  
  let analysis = `## Condo Insurance Analysis\n\n`;
  
  analysis += `### Property Overview\n`;
  analysis += `- **Property Type**: ${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}\n`;
  analysis += `- **Square Footage**: ${squareFootage.toLocaleString()} sq ft\n`;
  analysis += `- **Property Value**: $${propertyValue.toLocaleString()}\n`;
  analysis += `- **Annual Premium**: $${annualPremium.toLocaleString()}\n`;
  analysis += `- **Monthly Premium**: $${monthlyPremium.toLocaleString()}\n\n`;
  
  analysis += `### Coverage Summary\n`;
  analysis += `- **Total Coverage**: $${totalCoverage.toLocaleString()}\n`;
  analysis += `- **Coverage Breakdown**: ${outputs.coverageBreakdown as string}\n`;
  analysis += `- **Risk Score**: ${riskScore}/100\n`;
  analysis += `- **Claims Probability**: ${claimsProbability}%\n\n`;
  
  analysis += `### Premium Analysis\n`;
  analysis += `- **Premium Factors**: ${outputs.premiumFactors as string}\n`;
  analysis += `- **Policy Comparison**: ${outputs.policyComparison as string}\n`;
  analysis += `- **Potential Savings**: $${(outputs.costSavings as number).toLocaleString()}\n\n`;
  
  analysis += `### Coverage Assessment\n`;
  analysis += `- **Recommended Coverage**: ${outputs.recommendedCoverage as string}\n`;
  analysis += `- **Coverage Gaps**: ${outputs.coverageGaps as string}\n`;
  analysis += `- **Replacement Cost**: $${(outputs.replacementCost as number).toLocaleString()}\n`;
  analysis += `- **Actual Cash Value**: $${(outputs.actualCashValue as number).toLocaleString()}\n\n`;
  
  analysis += `### Risk Assessment\n`;
  if (riskScore <= 30) {
    analysis += `**Low Risk Profile**: Excellent insurance risk with favorable premium rates.\n`;
  } else if (riskScore <= 60) {
    analysis += `**Moderate Risk Profile**: Standard risk with typical premium rates.\n`;
  } else {
    analysis += `**High Risk Profile**: Higher risk requiring specialized coverage and higher premiums.\n`;
  }
  
  if (claimsProbability <= 10) {
    analysis += `**Low Claims Risk**: Unlikely to file claims in the near term.\n`;
  } else if (claimsProbability <= 20) {
    analysis += `**Moderate Claims Risk**: Standard claims probability.\n`;
  } else {
    analysis += `**High Claims Risk**: Higher likelihood of filing claims.\n`;
  }
  
  analysis += `\n### Recommendations\n`;
  analysis += `1. **Review Coverage Limits**: Ensure adequate protection for your property and belongings\n`;
  analysis += `2. **Consider Additional Coverage**: Evaluate need for flood, earthquake, or umbrella policies\n`;
  analysis += `3. **Optimize Premiums**: Implement security features and maintain good credit for savings\n`;
  analysis += `4. **Regular Reviews**: Update coverage annually to reflect property value changes\n`;
  
  return analysis;
}
