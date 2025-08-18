import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Seismic zone factors (base rates per $1000 of coverage)
const SEISMIC_ZONE_FACTORS = {
  'zone-1': 0.5,   // Low risk
  'zone-2': 1.2,   // Moderate risk
  'zone-3': 2.8,   // High risk
  'zone-4': 4.5    // Very high risk
};

// Building type factors
const BUILDING_TYPE_FACTORS = {
  'wood-frame': 1.0,      // Base rate
  'steel-frame': 0.7,     // Better performance
  'concrete': 0.8,        // Good performance
  'masonry': 1.2,         // Poor performance
  'mixed': 1.1,           // Variable performance
  'manufactured': 1.5     // Poor performance
};

// Age factors
function getAgeFactor(buildingAge: number): number {
  if (buildingAge < 10) return 0.8;
  if (buildingAge < 25) return 1.0;
  if (buildingAge < 50) return 1.3;
  if (buildingAge < 75) return 1.6;
  return 2.0; // 75+ years
}

// Soil type factors
const SOIL_TYPE_FACTORS = {
  'rock': 0.7,        // Best performance
  'hard-soil': 0.9,   // Good performance
  'soft-soil': 1.4,   // Poor performance
  'fill': 1.8         // Worst performance
};

// Foundation type factors
const FOUNDATION_TYPE_FACTORS = {
  'slab': 1.0,           // Base rate
  'crawlspace': 1.1,     // Slightly higher risk
  'basement': 0.9,       // Better performance
  'pier-beam': 1.3,      // Higher risk
  'post-tension': 0.8    // Better performance
};

// Retrofit status factors
const RETROFIT_FACTORS = {
  'none': 1.0,       // No discount
  'partial': 0.9,    // 10% discount
  'complete': 0.7,   // 30% discount
  'unknown': 1.0     // No discount
};

// Coverage type factors
const COVERAGE_TYPE_FACTORS = {
  'building-only': 1.0,
  'contents-only': 0.8,
  'building-contents': 1.2,
  'loss-of-use': 0.6,
  'comprehensive': 1.5
};

// Deductible factors
function getDeductibleFactor(deductiblePercentage: number): number {
  if (deductiblePercentage <= 5) return 1.4;
  if (deductiblePercentage <= 10) return 1.0;
  if (deductiblePercentage <= 15) return 0.8;
  if (deductiblePercentage <= 20) return 0.7;
  return 0.6; // 20%+
}

// Policy type factors
const POLICY_TYPE_FACTORS = {
  'standalone': 1.0,
  'endorsement': 0.9,
  'commercial': 1.3
};

// Claims history factors
const CLAIMS_HISTORY_FACTORS = {
  'none': 1.0,
  'one': 1.2,
  'multiple': 1.5
};

// Location-specific risk factors
const LOCATION_RISK_FACTORS = {
  'CA': 1.5,  // California - highest risk
  'AK': 1.4,  // Alaska
  'WA': 1.3,  // Washington
  'OR': 1.3,  // Oregon
  'NV': 1.2,  // Nevada
  'UT': 1.1,  // Utah
  'ID': 1.0,  // Idaho
  'MT': 0.9,  // Montana
  'WY': 0.8,  // Wyoming
  'CO': 0.9,  // Colorado
  'AZ': 0.8,  // Arizona
  'NM': 0.8,  // New Mexico
  'TX': 0.7,  // Texas
  'OK': 0.8,  // Oklahoma
  'AR': 0.8,  // Arkansas
  'MO': 0.9,  // Missouri
  'TN': 0.8,  // Tennessee
  'KY': 0.7,  // Kentucky
  'IL': 0.6,  // Illinois
  'IN': 0.6,  // Indiana
  'OH': 0.6,  // Ohio
  'SC': 0.7,  // South Carolina
  'NC': 0.6,  // North Carolina
  'VA': 0.6,  // Virginia
  'WV': 0.6,  // West Virginia
  'PA': 0.6,  // Pennsylvania
  'NY': 0.6,  // New York
  'VT': 0.6,  // Vermont
  'NH': 0.6,  // New Hampshire
  'ME': 0.6,  // Maine
  'MA': 0.6,  // Massachusetts
  'RI': 0.6,  // Rhode Island
  'CT': 0.6,  // Connecticut
  'NJ': 0.6,  // New Jersey
  'DE': 0.6,  // Delaware
  'MD': 0.6,  // Maryland
  'GA': 0.6,  // Georgia
  'FL': 0.5,  // Florida
  'AL': 0.6,  // Alabama
  'MS': 0.6,  // Mississippi
  'LA': 0.6,  // Louisiana
  'HI': 1.2,  // Hawaii
  'other': 0.5 // Other states
};

// Calculate base premium rate
function calculateBaseRate(inputs: CalculatorInputs): number {
  const {
    seismicZone, buildingType, buildingAge, soilType, foundationType,
    retrofitStatus, location
  } = inputs;

  const zoneFactor = SEISMIC_ZONE_FACTORS[seismicZone as keyof typeof SEISMIC_ZONE_FACTORS] || 1.0;
  const buildingFactor = BUILDING_TYPE_FACTORS[buildingType as keyof typeof BUILDING_TYPE_FACTORS] || 1.0;
  const ageFactor = getAgeFactor(Number(buildingAge));
  const soilFactor = SOIL_TYPE_FACTORS[soilType as keyof typeof SOIL_TYPE_FACTORS] || 1.0;
  const foundationFactor = FOUNDATION_TYPE_FACTORS[foundationType as keyof typeof FOUNDATION_TYPE_FACTORS] || 1.0;
  const retrofitFactor = RETROFIT_FACTORS[retrofitStatus as keyof typeof RETROFIT_FACTORS] || 1.0;
  const locationFactor = LOCATION_RISK_FACTORS[location as keyof typeof LOCATION_RISK_FACTORS] || 0.5;

  return zoneFactor * buildingFactor * ageFactor * soilFactor * foundationFactor * retrofitFactor * locationFactor;
}

// Calculate risk score
function calculateRiskScore(inputs: CalculatorInputs): number {
  const {
    seismicZone, buildingType, buildingAge, soilType, foundationType,
    retrofitStatus, location, stories
  } = inputs;

  let score = 0;

  // Seismic zone factor (0-25 points)
  switch (seismicZone) {
    case 'zone-1': score += 5; break;
    case 'zone-2': score += 15; break;
    case 'zone-3': score += 20; break;
    case 'zone-4': score += 25; break;
  }

  // Building type factor (0-20 points)
  switch (buildingType) {
    case 'steel-frame': score += 5; break;
    case 'concrete': score += 8; break;
    case 'wood-frame': score += 12; break;
    case 'mixed': score += 15; break;
    case 'masonry': score += 18; break;
    case 'manufactured': score += 20; break;
  }

  // Age factor (0-20 points)
  const age = Number(buildingAge);
  if (age < 10) score += 5;
  else if (age < 25) score += 10;
  else if (age < 50) score += 15;
  else if (age < 75) score += 18;
  else score += 20;

  // Soil factor (0-15 points)
  switch (soilType) {
    case 'rock': score += 3; break;
    case 'hard-soil': score += 8; break;
    case 'soft-soil': score += 12; break;
    case 'fill': score += 15; break;
  }

  // Foundation factor (0-10 points)
  switch (foundationType) {
    case 'post-tension': score += 2; break;
    case 'basement': score += 4; break;
    case 'slab': score += 6; break;
    case 'crawlspace': score += 8; break;
    case 'pier-beam': score += 10; break;
  }

  // Retrofit factor (0-10 points)
  switch (retrofitStatus) {
    case 'complete': score += 0; break;
    case 'partial': score += 5; break;
    case 'none': case 'unknown': score += 10; break;
  }

  return Math.min(score, 100);
}

// Calculate claim probability
function calculateClaimProbability(inputs: CalculatorInputs): number {
  const {
    seismicZone, buildingType, buildingAge, location, retrofitStatus
  } = inputs;

  let baseProbability = 0.02; // 2% base probability over 30 years

  // Adjust for seismic zone
  switch (seismicZone) {
    case 'zone-1': baseProbability *= 0.3; break;
    case 'zone-2': baseProbability *= 0.7; break;
    case 'zone-3': baseProbability *= 1.5; break;
    case 'zone-4': baseProbability *= 2.5; break;
  }

  // Adjust for building type
  switch (buildingType) {
    case 'steel-frame': baseProbability *= 0.6; break;
    case 'concrete': baseProbability *= 0.8; break;
    case 'wood-frame': baseProbability *= 1.0; break;
    case 'mixed': baseProbability *= 1.2; break;
    case 'masonry': baseProbability *= 1.5; break;
    case 'manufactured': baseProbability *= 2.0; break;
  }

  // Adjust for age
  const age = Number(buildingAge);
  if (age < 10) baseProbability *= 0.7;
  else if (age < 25) baseProbability *= 1.0;
  else if (age < 50) baseProbability *= 1.3;
  else if (age < 75) baseProbability *= 1.6;
  else baseProbability *= 2.0;

  // Adjust for retrofit
  switch (retrofitStatus) {
    case 'complete': baseProbability *= 0.5; break;
    case 'partial': baseProbability *= 0.8; break;
    case 'none': case 'unknown': baseProbability *= 1.0; break;
  }

  return Math.min(baseProbability * 100, 25); // Cap at 25%
}

// Generate seismic risk level
function getSeismicRiskLevel(riskScore: number): string {
  if (riskScore < 20) return 'Very Low Risk';
  if (riskScore < 40) return 'Low Risk';
  if (riskScore < 60) return 'Moderate Risk';
  if (riskScore < 80) return 'High Risk';
  return 'Very High Risk';
}

// Generate premium factors explanation
function generatePremiumFactors(inputs: CalculatorInputs, baseRate: number): string {
  const {
    seismicZone, buildingType, buildingAge, soilType, foundationType,
    retrofitStatus, location, coverageType, deductiblePercentage, policyType
  } = inputs;

  let factors = '**Premium Factors:**\n\n';

  factors += `• **Seismic Zone**: ${seismicZone.replace('zone-', 'Zone ')} (${SEISMIC_ZONE_FACTORS[seismicZone as keyof typeof SEISMIC_ZONE_FACTORS]?.toFixed(2)}x)\n`;
  factors += `• **Building Type**: ${buildingType.replace('-', ' ')} (${BUILDING_TYPE_FACTORS[buildingType as keyof typeof BUILDING_TYPE_FACTORS]?.toFixed(2)}x)\n`;
  factors += `• **Building Age**: ${buildingAge} years (${getAgeFactor(Number(buildingAge)).toFixed(2)}x)\n`;
  factors += `• **Soil Type**: ${soilType.replace('-', ' ')} (${SOIL_TYPE_FACTORS[soilType as keyof typeof SOIL_TYPE_FACTORS]?.toFixed(2)}x)\n`;
  factors += `• **Foundation**: ${foundationType.replace('-', ' ')} (${FOUNDATION_TYPE_FACTORS[foundationType as keyof typeof FOUNDATION_TYPE_FACTORS]?.toFixed(2)}x)\n`;
  factors += `• **Retrofit**: ${retrofitStatus} (${RETROFIT_FACTORS[retrofitStatus as keyof typeof RETROFIT_FACTORS]?.toFixed(2)}x)\n`;
  factors += `• **Location**: ${location} (${LOCATION_RISK_FACTORS[location as keyof typeof LOCATION_RISK_FACTORS]?.toFixed(2)}x)\n`;
  factors += `• **Coverage**: ${coverageType.replace('-', ' ')} (${COVERAGE_TYPE_FACTORS[coverageType as keyof typeof COVERAGE_TYPE_FACTORS]?.toFixed(2)}x)\n`;
  factors += `• **Deductible**: ${deductiblePercentage}% (${getDeductibleFactor(Number(deductiblePercentage)).toFixed(2)}x)\n`;
  factors += `• **Policy Type**: ${policyType} (${POLICY_TYPE_FACTORS[policyType as keyof typeof POLICY_TYPE_FACTORS]?.toFixed(2)}x)\n\n`;

  factors += `**Combined Base Rate**: ${baseRate.toFixed(4)} per $1,000 of coverage\n`;

  return factors;
}

// Generate coverage breakdown
function generateCoverageBreakdown(inputs: CalculatorInputs): string {
  const {
    coverageType, coverageLimit, contentsValue, businessInterruption, annualIncome
  } = inputs;

  let breakdown = '**Coverage Breakdown:**\n\n';

  switch (coverageType) {
    case 'building-only':
      breakdown += `• **Building Coverage**: $${Number(coverageLimit).toLocaleString()}\n`;
      break;
    case 'contents-only':
      breakdown += `• **Contents Coverage**: $${Number(contentsValue).toLocaleString()}\n`;
      break;
    case 'building-contents':
      breakdown += `• **Building Coverage**: $${Number(coverageLimit).toLocaleString()}\n`;
      breakdown += `• **Contents Coverage**: $${Number(contentsValue).toLocaleString()}\n`;
      break;
    case 'comprehensive':
      breakdown += `• **Building Coverage**: $${Number(coverageLimit).toLocaleString()}\n`;
      breakdown += `• **Contents Coverage**: $${Number(contentsValue).toLocaleString()}\n`;
      if (businessInterruption === 'yes' && annualIncome) {
        breakdown += `• **Business Interruption**: $${Number(annualIncome).toLocaleString()}/year\n`;
      }
      breakdown += `• **Loss of Use**: $${(Number(coverageLimit) * 0.2).toLocaleString()}\n`;
      break;
  }

  return breakdown;
}

// Generate recommendations
function generateRecommendations(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const { riskScore, annualPremium, claimProbability } = outputs;
  const { retrofitStatus, buildingType, buildingAge, seismicZone } = inputs;

  let recommendations = '**Recommendations:**\n\n';

  if (riskScore >= 70) {
    recommendations += '🚨 **High Risk Property** - Immediate action recommended\n\n';
    recommendations += '**Priority Actions:**\n';
    recommendations += '• Consider seismic retrofit\n';
    recommendations += '• Review building code compliance\n';
    recommendations += '• Implement emergency preparedness plan\n';
    recommendations += '• Consider higher coverage limits\n\n';
  } else if (riskScore >= 50) {
    recommendations += '⚠️ **Moderate Risk Property** - Mitigation recommended\n\n';
    recommendations += '**Recommended Actions:**\n';
    recommendations += '• Evaluate retrofit options\n';
    recommendations += '• Strengthen foundation connections\n';
    recommendations += '• Secure heavy furniture and appliances\n';
    recommendations += '• Review insurance coverage adequacy\n\n';
  } else {
    recommendations += '✅ **Lower Risk Property** - Standard precautions\n\n';
    recommendations += '**Maintenance Actions:**\n';
    recommendations += '• Regular structural inspections\n';
    recommendations += '• Maintain emergency supplies\n';
    recommendations += '• Review insurance coverage periodically\n\n';
  }

  if (retrofitStatus === 'none' && Number(buildingAge) > 25) {
    recommendations += '🏗️ **Retrofit Consideration:**\n';
    recommendations += '• Older buildings benefit significantly from retrofitting\n';
    recommendations += '• Retrofit can reduce premiums by 20-40%\n';
    recommendations += '• Consult with structural engineer\n\n';
  }

  if (seismicZone === 'zone-4' || seismicZone === 'zone-3') {
    recommendations += '🌋 **High Seismic Zone:**\n';
    recommendations += '• Consider earthquake insurance essential\n';
    recommendations += '• Review emergency evacuation plans\n';
    recommendations += '• Maintain emergency fund for deductible\n\n';
  }

  return recommendations;
}

// Generate cost-benefit analysis
function generateCostBenefitAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const { annualPremium, claimProbability, expectedLoss } = outputs;
  const { propertyValue } = inputs;

  const thirtyYearPremium = annualPremium * 30;
  const thirtyYearProbability = claimProbability / 100;
  const potentialLoss = Number(propertyValue) * 0.6; // Assume 60% average loss

  let analysis = '**Cost-Benefit Analysis:**\n\n';

  analysis += `• **30-Year Premium Cost**: $${thirtyYearPremium.toLocaleString()}\n`;
  analysis += `• **Claim Probability (30 years)**: ${claimProbability.toFixed(1)}%\n`;
  analysis += `• **Potential Loss**: $${potentialLoss.toLocaleString()}\n`;
  analysis += `• **Expected Loss**: $${expectedLoss.toLocaleString()}\n\n`;

  const breakEvenProbability = (thirtyYearPremium / potentialLoss) * 100;

  analysis += `**Break-Even Analysis:**\n`;
  analysis += `• Premium cost equals potential loss at ${breakEvenProbability.toFixed(1)}% probability\n`;
  analysis += `• Current claim probability: ${claimProbability.toFixed(1)}%\n\n`;

  if (claimProbability > breakEvenProbability) {
    analysis += '✅ **Insurance appears cost-effective**\n';
  } else {
    analysis += '⚠️ **Consider self-insurance or higher deductible**\n';
  }

  return analysis;
}

// Generate mitigation options
function generateMitigationOptions(inputs: CalculatorInputs): string {
  const { buildingType, buildingAge, foundationType, retrofitStatus } = inputs;

  let options = '**Mitigation Options:**\n\n';

  if (retrofitStatus === 'none') {
    options += '🏗️ **Seismic Retrofit Options:**\n';
    options += '• Foundation bolting: $3,000-$8,000\n';
    options += '• Cripple wall bracing: $2,000-$5,000\n';
    options += '• Chimney reinforcement: $1,500-$4,000\n';
    options += '• Complete retrofit: $15,000-$50,000\n\n';
  }

  options += '🔧 **Structural Improvements:**\n';
  options += '• Reinforce foundation connections\n';
  options += '• Add shear walls or bracing\n';
  options += '• Strengthen roof-to-wall connections\n';
  options += '• Install automatic gas shutoff valves\n\n';

  options += '📋 **Emergency Preparedness:**\n';
  options += '• Emergency supply kit\n';
  options += '• Family emergency plan\n';
  options += '• Property documentation\n';
  options += '• Insurance policy review\n\n';

  return options;
}

export function calculateEarthquakeInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    propertyValue, coverageLimit, deductiblePercentage, coverageType,
    contentsValue, businessInterruption, annualIncome, policyType,
    claimsHistory
  } = inputs;

  // Calculate base rate
  const baseRate = calculateBaseRate(inputs);

  // Calculate premium factors
  const coverageFactor = COVERAGE_TYPE_FACTORS[coverageType as keyof typeof COVERAGE_TYPE_FACTORS] || 1.0;
  const deductibleFactor = getDeductibleFactor(Number(deductiblePercentage));
  const policyFactor = POLICY_TYPE_FACTORS[policyType as keyof typeof POLICY_TYPE_FACTORS] || 1.0;
  const claimsFactor = CLAIMS_HISTORY_FACTORS[claimsHistory as keyof typeof CLAIMS_HISTORY_FACTORS] || 1.0;

  // Calculate annual premium
  const annualPremium = Number(coverageLimit) * (baseRate / 1000) * coverageFactor * deductibleFactor * policyFactor * claimsFactor;

  // Calculate monthly premium
  const monthlyPremium = annualPremium / 12;

  // Calculate deductible amount
  const deductibleAmount = Number(coverageLimit) * (Number(deductiblePercentage) / 100);

  // Calculate risk score
  const riskScore = calculateRiskScore(inputs);

  // Calculate claim probability
  const claimProbability = calculateClaimProbability(inputs);

  // Calculate expected loss
  const expectedLoss = Number(propertyValue) * (claimProbability / 100) * 0.6; // 60% average loss

  // Generate analysis components
  const seismicRiskLevel = getSeismicRiskLevel(riskScore);
  const premiumFactors = generatePremiumFactors(inputs, baseRate);
  const coverageBreakdown = generateCoverageBreakdown(inputs);
  const recommendations = generateRecommendations(inputs, {
    riskScore,
    annualPremium,
    claimProbability,
    expectedLoss,
    monthlyPremium,
    deductibleAmount,
    seismicRiskLevel,
    premiumFactors,
    coverageBreakdown,
    recommendations: '',
    costBenefitAnalysis: '',
    mitigationOptions: '',
    policyComparison: '',
    earthquakeInsuranceAnalysis: ''
  });
  const costBenefitAnalysis = generateCostBenefitAnalysis(inputs, {
    annualPremium,
    claimProbability,
    expectedLoss,
    riskScore,
    monthlyPremium,
    deductibleAmount,
    seismicRiskLevel,
    premiumFactors,
    coverageBreakdown,
    recommendations,
    costBenefitAnalysis: '',
    mitigationOptions: '',
    policyComparison: '',
    earthquakeInsuranceAnalysis: ''
  });
  const mitigationOptions = generateMitigationOptions(inputs);

  return {
    annualPremium: Math.round(annualPremium),
    monthlyPremium: Math.round(monthlyPremium),
    deductibleAmount: Math.round(deductibleAmount),
    riskScore: Math.round(riskScore),
    seismicRiskLevel,
    premiumFactors,
    coverageBreakdown,
    recommendations,
    costBenefitAnalysis,
    mitigationOptions,
    policyComparison: 'Compare standalone vs. endorsement policies for best value',
    claimProbability: Math.round(claimProbability * 10) / 10,
    expectedLoss: Math.round(expectedLoss),
    earthquakeInsuranceAnalysis: 'Comprehensive earthquake insurance analysis completed'
  };
}

export function generateEarthquakeInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    propertyValue, location, seismicZone, buildingType, buildingAge,
    stories, squareFootage, foundationType, soilType, retrofitStatus,
    coverageType, deductiblePercentage, coverageLimit, contentsValue,
    businessInterruption, policyType, claimsHistory
  } = inputs;

  const {
    annualPremium, monthlyPremium, deductibleAmount, riskScore,
    seismicRiskLevel, premiumFactors, coverageBreakdown, recommendations,
    costBenefitAnalysis, mitigationOptions, claimProbability, expectedLoss
  } = outputs;

  let analysis = `# Earthquake Insurance Analysis\n\n`;

  analysis += `## Property Details\n`;
  analysis += `• **Property Value**: $${Number(propertyValue).toLocaleString()}\n`;
  analysis += `• **Location**: ${location}\n`;
  analysis += `• **Seismic Zone**: ${seismicZone.replace('zone-', 'Zone ')}\n`;
  analysis += `• **Building Type**: ${buildingType.replace('-', ' ')}\n`;
  analysis += `• **Building Age**: ${buildingAge} years\n`;
  analysis += `• **Stories**: ${stories}\n`;
  analysis += `• **Square Footage**: ${Number(squareFootage).toLocaleString()} sq ft\n`;
  analysis += `• **Foundation**: ${foundationType.replace('-', ' ')}\n`;
  analysis += `• **Soil Type**: ${soilType.replace('-', ' ')}\n`;
  analysis += `• **Retrofit Status**: ${retrofitStatus}\n\n`;

  analysis += `## Insurance Details\n`;
  analysis += `• **Coverage Type**: ${coverageType.replace('-', ' ')}\n`;
  analysis += `• **Coverage Limit**: $${Number(coverageLimit).toLocaleString()}\n`;
  analysis += `• **Deductible**: ${deductiblePercentage}% ($${deductibleAmount.toLocaleString()})\n`;
  analysis += `• **Contents Value**: $${Number(contentsValue).toLocaleString()}\n`;
  analysis += `• **Business Interruption**: ${businessInterruption === 'yes' ? 'Yes' : 'No'}\n`;
  analysis += `• **Policy Type**: ${policyType}\n`;
  analysis += `• **Claims History**: ${claimsHistory}\n\n`;

  analysis += `## Premium Analysis\n`;
  analysis += `• **Annual Premium**: $${annualPremium.toLocaleString()}\n`;
  analysis += `• **Monthly Premium**: $${monthlyPremium.toLocaleString()}\n`;
  analysis += `• **Risk Score**: ${riskScore}/100\n`;
  analysis += `• **Seismic Risk Level**: ${seismicRiskLevel}\n`;
  analysis += `• **Claim Probability (30 years)**: ${claimProbability}%\n`;
  analysis += `• **Expected Loss (30 years)**: $${expectedLoss.toLocaleString()}\n\n`;

  analysis += `${premiumFactors}\n`;
  analysis += `${coverageBreakdown}\n`;
  analysis += `${recommendations}\n`;
  analysis += `${costBenefitAnalysis}\n`;
  analysis += `${mitigationOptions}\n`;

  analysis += `## Next Steps\n`;
  analysis += `1. Review and compare multiple insurance quotes\n`;
  analysis += `2. Consider seismic retrofit options\n`;
  analysis += `3. Implement emergency preparedness measures\n`;
  analysis += `4. Review coverage limits annually\n`;
  analysis += `5. Maintain property documentation\n`;

  return analysis;
}
