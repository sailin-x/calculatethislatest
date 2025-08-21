import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export function calculateWindstormInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    propertyValue,
    propertyType,
    constructionType,
    roofType,
    windZone,
    distanceFromCoast,
    buildingAge,
    deductible,
    coverageType,
    additionalCoverages,
    mitigationFeatures,
    claimsHistory,
    policyTerm,
    insuranceCompany,
    agentCommission
  } = inputs;

  // Base premium calculation
  const baseRate = calculateBaseRate(propertyType as string, constructionType as string, windZone as string);
  const propertyFactor = calculatePropertyFactor(propertyValue as number, buildingAge as number);
  const windFactor = calculateWindFactor(windZone as string, distanceFromCoast as number);
  const roofFactor = calculateRoofFactor(roofType as string);
  
  // Base premium
  const basePremium = (propertyValue as number) * baseRate * propertyFactor * windFactor * roofFactor;
  
  // Deductible adjustment
  const deductibleFactor = calculateDeductibleFactor(deductible as number, propertyValue as number);
  
  // Coverage type adjustment
  const coverageFactor = calculateCoverageFactor(coverageType as string);
  
  // Additional coverages
  const additionalCoverageCost = calculateAdditionalCoverages(additionalCoverages as string[], propertyValue as number);
  
  // Mitigation features discount
  const mitigationDiscount = calculateMitigationDiscount(mitigationFeatures as string[]);
  
  // Claims history adjustment
  const claimsFactor = calculateClaimsFactor(claimsHistory as string);
  
  // Final premium calculation
  const grossPremium = basePremium * deductibleFactor * coverageFactor * claimsFactor;
  const netPremium = grossPremium + additionalCoverageCost;
  const finalPremium = netPremium * (1 - mitigationDiscount);
  
  // Monthly premium
  const monthlyPremium = finalPremium / (policyTerm as number);
  
  // Risk assessment
  const riskScore = calculateRiskScore(inputs);
  const riskLevel = getRiskLevel(riskScore);
  
  // Coverage analysis
  const coverageAnalysis = analyzeCoverage(inputs, finalPremium);
  
  // Cost-benefit analysis
  const costBenefitAnalysis = analyzeCostBenefit(inputs, finalPremium);
  
  // Recommendations
  const recommendations = generateRecommendations(inputs, finalPremium, riskScore);

  return {
    basePremium: Math.round(basePremium),
    deductibleAdjustment: Math.round(basePremium * (deductibleFactor - 1)),
    coverageAdjustment: Math.round(basePremium * (coverageFactor - 1)),
    additionalCoverageCost: Math.round(additionalCoverageCost),
    mitigationDiscount: Math.round(netPremium * mitigationDiscount),
    claimsAdjustment: Math.round(basePremium * (claimsFactor - 1)),
    grossPremium: Math.round(grossPremium),
    netPremium: Math.round(netPremium),
    annualPremium: Math.round(finalPremium),
    monthlyPremium: Math.round(monthlyPremium),
    riskScore: Math.round(riskScore),
    riskLevel,
    coverageAdequacy: coverageAnalysis.adequacy,
    coverageGaps: coverageAnalysis.gaps,
    costBenefitRatio: costBenefitAnalysis.ratio,
    savingsOpportunities: costBenefitAnalysis.savings,
    recommendedDeductible: recommendations.deductible,
    recommendedCoverage: recommendations.coverage,
    mitigationRecommendations: recommendations.mitigation,
    insuranceScore: Math.round(calculateInsuranceScore(inputs, finalPremium)),
    valueScore: Math.round(calculateValueScore(inputs, finalPremium)),
    protectionScore: Math.round(calculateProtectionScore(inputs, finalPremium)),
    affordabilityScore: Math.round(calculateAffordabilityScore(inputs, finalPremium))
  };
}

function calculateBaseRate(propertyType: string, constructionType: string, windZone: string): number {
  let baseRate = 0.002; // 0.2% base rate
  
  // Property type adjustments
  switch (propertyType) {
    case 'residential':
      baseRate *= 1.0;
      break;
    case 'commercial':
      baseRate *= 1.3;
      break;
    case 'industrial':
      baseRate *= 1.5;
      break;
    case 'agricultural':
      baseRate *= 0.8;
      break;
  }
  
  // Construction type adjustments
  switch (constructionType) {
    case 'frame':
      baseRate *= 1.4;
      break;
    case 'masonry':
      baseRate *= 1.0;
      break;
    case 'steel':
      baseRate *= 0.7;
      break;
    case 'concrete':
      baseRate *= 0.6;
      break;
  }
  
  // Wind zone adjustments
  switch (windZone) {
    case 'low':
      baseRate *= 0.5;
      break;
    case 'medium':
      baseRate *= 1.0;
      break;
    case 'high':
      baseRate *= 1.8;
      break;
    case 'extreme':
      baseRate *= 2.5;
      break;
  }
  
  return baseRate;
}

function calculatePropertyFactor(propertyValue: number, buildingAge: number): number {
  let factor = 1.0;
  
  // Property value factor
  if (propertyValue < 100000) {
    factor *= 1.2;
  } else if (propertyValue > 1000000) {
    factor *= 0.9;
  }
  
  // Building age factor
  if (buildingAge < 5) {
    factor *= 0.9;
  } else if (buildingAge > 30) {
    factor *= 1.3;
  }
  
  return factor;
}

function calculateWindFactor(windZone: string, distanceFromCoast: number): number {
  let factor = 1.0;
  
  // Distance from coast factor
  if (distanceFromCoast <= 1) {
    factor *= 2.0;
  } else if (distanceFromCoast <= 5) {
    factor *= 1.5;
  } else if (distanceFromCoast <= 10) {
    factor *= 1.2;
  }
  
  // Wind zone specific adjustments
  if (windZone === 'extreme' && distanceFromCoast <= 1) {
    factor *= 1.5;
  }
  
  return factor;
}

function calculateRoofFactor(roofType: string): number {
  switch (roofType) {
    case 'asphalt_shingle':
      return 1.0;
    case 'metal':
      return 0.8;
    case 'tile':
      return 0.9;
    case 'flat':
      return 1.2;
    case 'hip':
      return 0.7;
    case 'gable':
      return 1.1;
    default:
      return 1.0;
  }
}

function calculateDeductibleFactor(deductible: number, propertyValue: number): number {
  const deductiblePercentage = deductible / propertyValue;
  
  if (deductiblePercentage <= 0.01) { // 1% or less
    return 1.3;
  } else if (deductiblePercentage <= 0.02) { // 2%
    return 1.1;
  } else if (deductiblePercentage <= 0.05) { // 5%
    return 0.9;
  } else { // 10% or more
    return 0.7;
  }
}

function calculateCoverageFactor(coverageType: string): number {
  switch (coverageType) {
    case 'basic':
      return 0.8;
    case 'standard':
      return 1.0;
    case 'comprehensive':
      return 1.3;
    case 'premium':
      return 1.5;
    default:
      return 1.0;
  }
}

function calculateAdditionalCoverages(coverages: string[], propertyValue: number): number {
  let totalCost = 0;
  
  coverages.forEach(coverage => {
    switch (coverage) {
      case 'contents':
        totalCost += propertyValue * 0.001;
        break;
      case 'loss_of_use':
        totalCost += propertyValue * 0.0005;
        break;
      case 'debris_removal':
        totalCost += propertyValue * 0.0003;
        break;
      case 'code_upgrades':
        totalCost += propertyValue * 0.0008;
        break;
      case 'ordinance_law':
        totalCost += propertyValue * 0.0006;
        break;
    }
  });
  
  return totalCost;
}

function calculateMitigationDiscount(features: string[]): number {
  let totalDiscount = 0;
  
  features.forEach(feature => {
    switch (feature) {
      case 'impact_windows':
        totalDiscount += 0.15;
        break;
      case 'storm_shutters':
        totalDiscount += 0.10;
        break;
      case 'reinforced_roof':
        totalDiscount += 0.12;
        break;
      case 'wind_mitigation':
        totalDiscount += 0.08;
        break;
      case 'elevated_foundation':
        totalDiscount += 0.05;
        break;
    }
  });
  
  return Math.min(totalDiscount, 0.35); // Cap at 35%
}

function calculateClaimsFactor(claimsHistory: string): number {
  switch (claimsHistory) {
    case 'none':
      return 0.9;
    case 'one':
      return 1.0;
    case 'two':
      return 1.2;
    case 'three_plus':
      return 1.5;
    default:
      return 1.0;
  }
}

function calculateRiskScore(inputs: CalculatorInputs): number {
  let score = 50; // Base score
  
  // Property type risk
  switch (inputs.propertyType) {
    case 'residential':
      score += 0;
      break;
    case 'commercial':
      score += 10;
      break;
    case 'industrial':
      score += 20;
      break;
  }
  
  // Construction type risk
  switch (inputs.constructionType) {
    case 'frame':
      score += 20;
      break;
    case 'masonry':
      score += 10;
      break;
    case 'steel':
      score -= 10;
      break;
    case 'concrete':
      score -= 15;
      break;
  }
  
  // Wind zone risk
  switch (inputs.windZone) {
    case 'low':
      score -= 20;
      break;
    case 'medium':
      score += 0;
      break;
    case 'high':
      score += 20;
      break;
    case 'extreme':
      score += 40;
      break;
  }
  
  // Distance from coast
  const distance = inputs.distanceFromCoast as number;
  if (distance <= 1) {
    score += 30;
  } else if (distance <= 5) {
    score += 20;
  } else if (distance <= 10) {
    score += 10;
  }
  
  // Building age
  const age = inputs.buildingAge as number;
  if (age > 30) {
    score += 15;
  } else if (age < 5) {
    score -= 10;
  }
  
  // Claims history
  switch (inputs.claimsHistory) {
    case 'none':
      score -= 10;
      break;
    case 'three_plus':
      score += 20;
      break;
  }
  
  return Math.max(0, Math.min(100, score));
}

function getRiskLevel(score: number): string {
  if (score < 30) return 'Low';
  if (score < 60) return 'Medium';
  if (score < 80) return 'High';
  return 'Extreme';
}

function analyzeCoverage(inputs: CalculatorInputs, premium: number): { adequacy: string; gaps: string[] } {
  const gaps: string[] = [];
  let adequacy = 'Good';
  
  // Check for coverage gaps
  if (!(inputs.additionalCoverages as string[]).includes('contents')) {
    gaps.push('Personal property coverage not included');
  }
  
  if (!(inputs.additionalCoverages as string[]).includes('loss_of_use')) {
    gaps.push('Loss of use coverage not included');
  }
  
  if ((inputs.deductible as number) / (inputs.propertyValue as number) > 0.05) {
    gaps.push('High deductible may be unaffordable');
  }
  
  if ((inputs.mitigationFeatures as string[]).length === 0) {
    gaps.push('No wind mitigation features');
  }
  
  if (gaps.length > 2) {
    adequacy = 'Poor';
  } else if (gaps.length > 0) {
    adequacy = 'Fair';
  }
  
  return { adequacy, gaps };
}

function analyzeCostBenefit(inputs: CalculatorInputs, premium: number): { ratio: number; savings: string[] } {
  const savings: string[] = [];
  const propertyValue = inputs.propertyValue as number;
  const ratio = premium / propertyValue;
  
  // Identify savings opportunities
  if ((inputs.deductible as number) / propertyValue < 0.02) {
    savings.push('Consider higher deductible to reduce premium');
  }
  
  if ((inputs.mitigationFeatures as string[]).length === 0) {
    savings.push('Install wind mitigation features for premium discounts');
  }
  
  if ((inputs.additionalCoverages as string[]).length > 3) {
    savings.push('Review if all additional coverages are necessary');
  }
  
  if (ratio > 0.01) {
    savings.push('Premium is high relative to property value - shop around');
  }
  
  return { ratio, savings };
}

function generateRecommendations(inputs: CalculatorInputs, premium: number, riskScore: number): {
  deductible: string;
  coverage: string;
  mitigation: string[];
} {
  const recommendations = {
    deductible: '',
    coverage: '',
    mitigation: [] as string[]
  };
  
  // Deductible recommendations
  const currentDeductiblePct = (inputs.deductible as number) / (inputs.propertyValue as number);
  if (currentDeductiblePct < 0.02) {
    recommendations.deductible = 'Consider increasing deductible to 2-5% to reduce premium';
  } else if (currentDeductiblePct > 0.10) {
    recommendations.deductible = 'Deductible may be too high - consider reducing for better affordability';
  } else {
    recommendations.deductible = 'Current deductible is appropriate';
  }
  
  // Coverage recommendations
  if (riskScore > 70) {
    recommendations.coverage = 'Consider comprehensive coverage due to high wind risk';
  } else if (riskScore < 30) {
    recommendations.coverage = 'Basic coverage may be sufficient for low-risk area';
  } else {
    recommendations.coverage = 'Standard coverage provides good protection';
  }
  
  // Mitigation recommendations
  if (!(inputs.mitigationFeatures as string[]).includes('impact_windows')) {
    recommendations.mitigation.push('Install impact-resistant windows for 15% premium discount');
  }
  
  if (!(inputs.mitigationFeatures as string[]).includes('storm_shutters')) {
    recommendations.mitigation.push('Add storm shutters for 10% premium discount');
  }
  
  if (!(inputs.mitigationFeatures as string[]).includes('reinforced_roof')) {
    recommendations.mitigation.push('Reinforce roof structure for 12% premium discount');
  }
  
  return recommendations;
}

function calculateInsuranceScore(inputs: CalculatorInputs, premium: number): number {
  let score = 70; // Base score
  
  // Premium affordability (lower is better)
  const premiumRatio = premium / (inputs.propertyValue as number);
  if (premiumRatio < 0.005) score += 20;
  else if (premiumRatio < 0.01) score += 10;
  else if (premiumRatio > 0.02) score -= 20;
  
  // Coverage adequacy
  const coverageCount = (inputs.additionalCoverages as string[]).length;
  if (coverageCount >= 3) score += 10;
  else if (coverageCount === 0) score -= 10;
  
  // Mitigation features
  const mitigationCount = (inputs.mitigationFeatures as string[]).length;
  score += mitigationCount * 5;
  
  return Math.max(0, Math.min(100, score));
}

function calculateValueScore(inputs: CalculatorInputs, premium: number): number {
  let score = 60; // Base score
  
  // Premium to coverage ratio
  const coverageValue = (inputs.propertyValue as number) * 1.1; // Assuming 110% coverage
  const valueRatio = coverageValue / premium;
  
  if (valueRatio > 200) score += 20;
  else if (valueRatio > 150) score += 10;
  else if (valueRatio < 100) score -= 20;
  
  // Deductible appropriateness
  const deductibleRatio = (inputs.deductible as number) / (inputs.propertyValue as number);
  if (deductibleRatio >= 0.02 && deductibleRatio <= 0.05) score += 10;
  else if (deductibleRatio > 0.10) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function calculateProtectionScore(inputs: CalculatorInputs, premium: number): number {
  let score = 50; // Base score
  
  // Coverage type
  switch (inputs.coverageType) {
    case 'basic':
      score += 20;
      break;
    case 'standard':
      score += 40;
      break;
    case 'comprehensive':
      score += 60;
      break;
    case 'premium':
      score += 80;
      break;
  }
  
  // Additional coverages
  const additionalCoverages = inputs.additionalCoverages as string[];
  score += additionalCoverages.length * 5;
  
  // Risk level consideration
  const riskScore = calculateRiskScore(inputs);
  if (riskScore > 70 && additionalCoverages.length >= 3) score += 20;
  
  return Math.max(0, Math.min(100, score));
}

function calculateAffordabilityScore(inputs: CalculatorInputs, premium: number): number {
  let score = 70; // Base score
  
  // Premium as percentage of property value
  const premiumRatio = premium / (inputs.propertyValue as number);
  if (premiumRatio < 0.005) score += 30;
  else if (premiumRatio < 0.01) score += 20;
  else if (premiumRatio < 0.015) score += 10;
  else if (premiumRatio > 0.025) score -= 30;
  
  // Deductible affordability
  const deductibleRatio = (inputs.deductible as number) / (inputs.propertyValue as number);
  if (deductibleRatio > 0.10) score -= 20;
  
  // Mitigation discounts
  const mitigationFeatures = inputs.mitigationFeatures as string[];
  score += mitigationFeatures.length * 5;
  
  return Math.max(0, Math.min(100, score));
}

export function generateWindstormInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const riskLevel = outputs.riskLevel;
  const annualPremium = outputs.annualPremium;
  const monthlyPremium = outputs.monthlyPremium;
  const propertyValue = inputs.propertyValue as number;
  const premiumRatio = (annualPremium / propertyValue) * 100;
  
  return `# Windstorm Insurance Analysis

## Premium Summary
- **Annual Premium**: $${annualPremium.toLocaleString()}
- **Monthly Premium**: $${monthlyPremium.toLocaleString()}
- **Premium as % of Property Value**: ${premiumRatio.toFixed(2)}%
- **Risk Level**: ${riskLevel} (Score: ${outputs.riskScore}/100)

## Premium Breakdown
- **Base Premium**: $${outputs.basePremium.toLocaleString()}
- **Deductible Adjustment**: $${outputs.deductibleAdjustment.toLocaleString()}
- **Coverage Adjustment**: $${outputs.coverageAdjustment.toLocaleString()}
- **Additional Coverages**: $${outputs.additionalCoverageCost.toLocaleString()}
- **Mitigation Discount**: -$${outputs.mitigationDiscount.toLocaleString()}
- **Claims Adjustment**: $${outputs.claimsAdjustment.toLocaleString()}

## Risk Assessment
Your property is classified as **${riskLevel} risk** based on:
- **Property Type**: ${inputs.propertyType}
- **Construction**: ${inputs.constructionType}
- **Wind Zone**: ${inputs.windZone}
- **Distance from Coast**: ${inputs.distanceFromCoast} miles
- **Building Age**: ${inputs.buildingAge} years

## Coverage Analysis
- **Coverage Adequacy**: ${outputs.coverageAdequacy}
${outputs.coverageGaps.length > 0 ? `- **Coverage Gaps**:\n${outputs.coverageGaps.map(gap => `  - ${gap}`).join('\n')}` : ''}

## Cost-Benefit Analysis
- **Cost-Benefit Ratio**: ${outputs.costBenefitRatio.toFixed(2)}
${outputs.savingsOpportunities.length > 0 ? `- **Savings Opportunities**:\n${outputs.savingsOpportunities.map(saving => `  - ${saving}`).join('\n')}` : ''}

## Recommendations
- **Deductible**: ${outputs.recommendedDeductible}
- **Coverage**: ${outputs.recommendedCoverage}
${outputs.mitigationRecommendations.length > 0 ? `- **Mitigation**:\n${outputs.mitigationRecommendations.map(rec => `  - ${rec}`).join('\n')}` : ''}

## Assessment Scores
- **Insurance Score**: ${outputs.insuranceScore}/100
- **Value Score**: ${outputs.valueScore}/100
- **Protection Score**: ${outputs.protectionScore}/100
- **Affordability Score**: ${outputs.affordabilityScore}/100

## Key Insights
${riskLevel === 'Extreme' ? '- **High Risk Area**: Consider comprehensive coverage and maximum mitigation features' : ''}
${riskLevel === 'Low' ? '- **Low Risk Area**: Basic coverage may be sufficient' : ''}
${premiumRatio > 2 ? '- **High Premium**: Consider shopping around or increasing deductible' : ''}
${outputs.mitigationDiscount > 0 ? '- **Mitigation Benefits**: You\'re receiving discounts for safety features' : ''}

This analysis provides a comprehensive view of your windstorm insurance needs and opportunities for optimization.`;
}
