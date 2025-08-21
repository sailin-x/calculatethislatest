import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Base premium rates per $1,000 of coverage (simplified - actual rates vary by state and insurer)
const BASE_RATES = {
  'owners-policy': {
    '0-100000': 3.5,
    '100001-500000': 2.5,
    '500001-1000000': 2.0,
    '1000001+': 1.5
  },
  'lenders-policy': {
    '0-100000': 2.0,
    '100001-500000': 1.5,
    '500001-1000000': 1.2,
    '1000001+': 1.0
  }
};

// State-specific rate adjustments
const STATE_RATE_ADJUSTMENTS = {
  'ca': 1.2, // California - higher rates
  'ny': 1.3, // New York - higher rates
  'fl': 1.1, // Florida - slightly higher
  'tx': 0.9, // Texas - lower rates
  'default': 1.0
};

function getRateTier(coverageAmount: number): string {
  if (coverageAmount <= 100000) return '0-100000';
  if (coverageAmount <= 500000) return '100001-500000';
  if (coverageAmount <= 1000000) return '500001-1000000';
  return '1000001+';
}

function calculateBasePremium(coverageAmount: number, policyType: string): number {
  const tier = getRateTier(coverageAmount);
  const baseRate = BASE_RATES[policyType][tier];
  return (coverageAmount / 1000) * baseRate;
}

function calculateStateAdjustment(state: string): number {
  return STATE_RATE_ADJUSTMENTS[state] || STATE_RATE_ADJUSTMENTS.default;
}

function calculateTransactionMultiplier(transactionType: string): number {
  switch (transactionType) {
    case 'purchase': return 1.0;
    case 'refinance': return 0.8; // Often discounted for refinances
    case 'construction': return 1.2; // Higher risk
    case 'equity-line': return 0.9;
    default: return 1.0;
  }
}

function calculatePropertyTypeMultiplier(propertyType: string): number {
  switch (propertyType) {
    case 'single-family': return 1.0;
    case 'condo': return 0.9;
    case 'townhouse': return 1.0;
    case 'multi-family': return 1.3;
    case 'commercial': return 1.5;
    case 'land': return 1.2;
    default: return 1.0;
  }
}

function calculateRiskMultiplier(
  knownIssues: string,
  previousClaims: string,
  chainOfTitle: string,
  propertyAge: number
): number {
  let multiplier = 1.0;
  
  // Known issues
  switch (knownIssues) {
    case 'easements': multiplier *= 1.1; break;
    case 'liens': multiplier *= 1.3; break;
    case 'encroachments': multiplier *= 1.2; break;
    case 'boundary-disputes': multiplier *= 1.4; break;
    case 'multiple': multiplier *= 1.5; break;
  }
  
  // Previous claims
  switch (previousClaims) {
    case 'one': multiplier *= 1.2; break;
    case 'multiple': multiplier *= 1.5; break;
  }
  
  // Chain of title complexity
  switch (chainOfTitle) {
    case 'moderate': multiplier *= 1.1; break;
    case 'complex': multiplier *= 1.3; break;
    case 'very-complex': multiplier *= 1.6; break;
  }
  
  // Property age
  if (propertyAge > 50) multiplier *= 1.2;
  if (propertyAge > 100) multiplier *= 1.4;
  
  return multiplier;
}

function calculateEndorsementCosts(endorsements: string, coverageAmount: number): number {
  let totalCost = 0;
  
  switch (endorsements) {
    case 'survey':
      totalCost += 150;
      break;
    case 'access':
      totalCost += 100;
      break;
    case 'zoning':
      totalCost += 200;
      break;
    case 'condo':
      totalCost += 125;
      break;
    case 'multiple':
      totalCost += 400;
      break;
  }
  
  return totalCost;
}

function calculateExtendedCoverageCosts(extendedCoverage: string, coverageAmount: number): number {
  const baseCost = coverageAmount * 0.001; // 0.1% of coverage amount
  
  switch (extendedCoverage) {
    case 'basic': return baseCost * 0.5;
    case 'enhanced': return baseCost * 1.0;
    case 'premium': return baseCost * 1.5;
    default: return 0;
  }
}

function calculateSearchFees(
  titleSearchDepth: string,
  surveyRequired: string,
  abstractRequired: string
): number {
  let fees = 0;
  
  // Base search fees
  switch (titleSearchDepth) {
    case 'standard': fees += 300; break;
    case 'extended': fees += 500; break;
    case 'comprehensive': fees += 800; break;
  }
  
  // Additional services
  if (surveyRequired === 'yes') fees += 400;
  if (abstractRequired === 'yes') fees += 250;
  
  return fees;
}

function calculateSettlementFees(
  escrowServices: string,
  transactionType: string,
  propertyValue: number
): number {
  let fees = 0;
  
  // Base settlement fees
  fees += 500;
  
  // Escrow services
  switch (escrowServices) {
    case 'basic': fees += 300; break;
    case 'full': fees += 600; break;
    case 'custom': fees += 800; break;
  }
  
  // Transaction type adjustments
  if (transactionType === 'refinance') fees *= 0.8;
  if (transactionType === 'construction') fees *= 1.2;
  
  return fees;
}

function calculateRiskScore(
  knownIssues: string,
  previousClaims: string,
  chainOfTitle: string,
  propertyAge: number,
  propertyType: string
): number {
  let score = 50; // Base score
  
  // Known issues
  switch (knownIssues) {
    case 'easements': score += 10; break;
    case 'liens': score += 20; break;
    case 'encroachments': score += 15; break;
    case 'boundary-disputes': score += 25; break;
    case 'multiple': score += 30; break;
  }
  
  // Previous claims
  switch (previousClaims) {
    case 'one': score += 15; break;
    case 'multiple': score += 25; break;
  }
  
  // Chain of title complexity
  switch (chainOfTitle) {
    case 'moderate': score += 10; break;
    case 'complex': score += 20; break;
    case 'very-complex': score += 30; break;
  }
  
  // Property age
  if (propertyAge > 50) score += 10;
  if (propertyAge > 100) score += 20;
  
  // Property type
  switch (propertyType) {
    case 'multi-family': score += 10; break;
    case 'commercial': score += 15; break;
    case 'land': score += 5; break;
  }
  
  return Math.min(score, 100);
}

function calculateCoverageScore(
  coverageType: string,
  coverageAmount: number,
  propertyValue: number,
  loanAmount: number
): number {
  let score = 100;
  
  // Check if coverage is adequate
  if (coverageType === 'owners-policy' || coverageType === 'both') {
    if (coverageAmount < propertyValue * 0.8) score -= 20;
    if (coverageAmount < propertyValue * 0.6) score -= 30;
  }
  
  if (coverageType === 'lenders-policy' || coverageType === 'both') {
    if (loanAmount && coverageAmount < loanAmount) score -= 25;
  }
  
  return Math.max(score, 0);
}

function calculateValueScore(
  totalCosts: number,
  propertyValue: number,
  riskScore: number
): number {
  const costPercentage = (totalCosts / propertyValue) * 100;
  let score = 100;
  
  // Penalize high cost percentages
  if (costPercentage > 2) score -= 30;
  else if (costPercentage > 1.5) score -= 20;
  else if (costPercentage > 1) score -= 10;
  
  // Adjust for risk level
  if (riskScore > 80) score += 10; // Good value for high risk
  else if (riskScore < 30) score -= 10; // May be overpriced for low risk
  
  return Math.max(score, 0);
}

export function calculateTitleInsurance(inputs: CalculatorInputs): CalculatorOutputs {
  const {
    propertyValue, purchasePrice, loanAmount, propertyType, propertyAge,
    transactionType, buyerType, occupancyType, coverageType, coverageAmount,
    endorsements, extendedCoverage, state, county, marketType,
    titleSearchDepth, knownIssues, previousClaims, chainOfTitle,
    surveyRequired, abstractRequired, escrowServices,
    closingCosts, discountRate, inflationRate
  } = inputs;

  // Determine coverage amount
  const effectiveCoverageAmount = coverageAmount || propertyValue;
  
  // Calculate base premiums
  let ownersPolicyPremium = 0;
  let lendersPolicyPremium = 0;
  
  if (coverageType === 'owners-policy' || coverageType === 'both') {
    ownersPolicyPremium = calculateBasePremium(effectiveCoverageAmount, 'owners-policy');
  }
  
  if (coverageType === 'lenders-policy' || coverageType === 'both') {
    const lenderCoverage = loanAmount || effectiveCoverageAmount;
    lendersPolicyPremium = calculateBasePremium(lenderCoverage, 'lenders-policy');
  }
  
  // Apply adjustments
  const stateAdjustment = calculateStateAdjustment(state);
  const transactionMultiplier = calculateTransactionMultiplier(transactionType);
  const propertyTypeMultiplier = calculatePropertyTypeMultiplier(propertyType);
  const riskMultiplier = calculateRiskMultiplier(knownIssues, previousClaims, chainOfTitle, propertyAge);
  
  const totalMultiplier = stateAdjustment * transactionMultiplier * propertyTypeMultiplier * riskMultiplier;
  
  ownersPolicyPremium *= totalMultiplier;
  lendersPolicyPremium *= totalMultiplier;
  
  const totalPremium = ownersPolicyPremium + lendersPolicyPremium;
  
  // Calculate additional costs
  const endorsementCosts = calculateEndorsementCosts(endorsements, effectiveCoverageAmount);
  const extendedCoverageCosts = calculateExtendedCoverageCosts(extendedCoverage, effectiveCoverageAmount);
  const searchFees = calculateSearchFees(titleSearchDepth, surveyRequired, abstractRequired);
  const settlementFees = calculateSettlementFees(escrowServices, transactionType, propertyValue);
  
  const totalCosts = totalPremium + endorsementCosts + extendedCoverageCosts + searchFees + settlementFees;
  
  // Calculate metrics
  const premiumPerThousand = totalPremium / (effectiveCoverageAmount / 1000);
  const costPercentage = (totalCosts / propertyValue) * 100;
  const presentValue = totalCosts / Math.pow(1 + (discountRate || 5) / 100, 1);
  
  // Calculate scores
  const riskScore = calculateRiskScore(knownIssues, previousClaims, chainOfTitle, propertyAge, propertyType);
  const coverageScore = calculateCoverageScore(coverageType, effectiveCoverageAmount, propertyValue, loanAmount);
  const valueScore = calculateValueScore(totalCosts, propertyValue, riskScore);
  
  // Policy comparison
  const policyComparison = [
    {
      type: 'Owner\'s Policy Only',
      premium: calculateBasePremium(effectiveCoverageAmount, 'owners-policy') * totalMultiplier,
      coverage: 'Owner protection only',
      cost: calculateBasePremium(effectiveCoverageAmount, 'owners-policy') * totalMultiplier + searchFees + settlementFees
    },
    {
      type: 'Lender\'s Policy Only',
      premium: calculateBasePremium(loanAmount || effectiveCoverageAmount, 'lenders-policy') * totalMultiplier,
      coverage: 'Lender protection only',
      cost: calculateBasePremium(loanAmount || effectiveCoverageAmount, 'lenders-policy') * totalMultiplier + searchFees + settlementFees
    },
    {
      type: 'Both Policies',
      premium: totalPremium,
      coverage: 'Full protection',
      cost: totalCosts
    }
  ];
  
  // Risk breakdown
  const riskBreakdown = {
    knownIssues: knownIssues !== 'none' ? 'High' : 'Low',
    previousClaims: previousClaims !== 'none' ? 'High' : 'Low',
    chainOfTitle: chainOfTitle === 'complex' || chainOfTitle === 'very-complex' ? 'High' : 'Low',
    propertyAge: propertyAge > 50 ? 'High' : 'Low',
    overallRisk: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low'
  };
  
  // Cost breakdown
  const costBreakdown = {
    basePremium: totalPremium,
    endorsements: endorsementCosts,
    extendedCoverage: extendedCoverageCosts,
    searchFees: searchFees,
    settlementFees: settlementFees,
    totalCosts: totalCosts
  };
  
  return {
    ownersPolicyPremium,
    lendersPolicyPremium,
    totalPremium,
    endorsementCosts,
    searchFees,
    settlementFees,
    totalCosts,
    premiumPerThousand,
    costPercentage,
    presentValue,
    riskScore,
    coverageScore,
    valueScore,
    policyComparison,
    riskBreakdown,
    costBreakdown,
    recommendations: generateRecommendations(inputs, {
      totalCosts, riskScore, coverageScore, valueScore, effectiveCoverageAmount, propertyValue
    }),
    keyFactors: generateKeyFactors(inputs, { totalCosts, riskScore }),
    risks: generateRisks(inputs, { riskScore, knownIssues }),
    titleInsuranceAnalysis: generateTitleInsuranceAnalysis(inputs, {
      ownersPolicyPremium, lendersPolicyPremium, totalPremium, endorsementCosts,
      searchFees, settlementFees, totalCosts, premiumPerThousand, costPercentage,
      riskScore, coverageScore, valueScore, policyComparison, riskBreakdown, costBreakdown
    })
  };
}

function generateRecommendations(inputs: CalculatorInputs, outputs: any): string {
  const { totalCosts, riskScore, coverageScore, valueScore, effectiveCoverageAmount, propertyValue } = outputs;
  const recommendations = [];
  
  if (coverageScore < 80) {
    recommendations.push('Consider increasing coverage amount to better protect your investment');
  }
  
  if (riskScore > 70) {
    recommendations.push('High title risk detected - consider additional endorsements for protection');
  }
  
  if (valueScore < 60) {
    recommendations.push('Consider shopping around for better rates or negotiating fees');
  }
  
  if (inputs.coverageType === 'lenders-policy' && inputs.transactionType === 'purchase') {
    recommendations.push('Consider adding owner\'s policy for complete protection');
  }
  
  if (inputs.knownIssues !== 'none') {
    recommendations.push('Address known title issues before closing to reduce risk');
  }
  
  return recommendations.join('. ') + '.';
}

function generateKeyFactors(inputs: CalculatorInputs, outputs: any): string {
  const factors = [];
  
  if (inputs.state === 'ca' || inputs.state === 'ny') {
    factors.push('State-specific rates apply');
  }
  
  if (inputs.transactionType === 'refinance') {
    factors.push('Refinance discount applied');
  }
  
  if (inputs.propertyType === 'commercial' || inputs.propertyType === 'multi-family') {
    factors.push('Commercial property rates apply');
  }
  
  if (outputs.riskScore > 50) {
    factors.push('Risk factors increase premium');
  }
  
  return factors.join('. ') + '.';
}

function generateRisks(inputs: CalculatorInputs, outputs: any): string {
  const risks = [];
  
  if (outputs.riskScore > 70) {
    risks.push('High title risk - consider additional protection');
  }
  
  if (inputs.knownIssues !== 'none') {
    risks.push('Known title issues may affect insurability');
  }
  
  if (inputs.propertyAge > 100) {
    risks.push('Very old property may have complex title history');
  }
  
  if (inputs.chainOfTitle === 'very-complex') {
    risks.push('Complex chain of title increases risk');
  }
  
  return risks.join('. ') + '.';
}

export function generateTitleInsuranceAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  const {
    ownersPolicyPremium, lendersPolicyPremium, totalPremium, endorsementCosts,
    searchFees, settlementFees, totalCosts, premiumPerThousand, costPercentage,
    riskScore, coverageScore, valueScore, policyComparison, riskBreakdown, costBreakdown
  } = outputs;

  return `# Title Insurance Analysis Report

## Policy Summary
- **Property Value:** $${inputs.propertyValue.toLocaleString()}
- **Transaction Type:** ${inputs.transactionType}
- **Coverage Type:** ${inputs.coverageType}
- **Effective Coverage:** $${(outputs.effectiveCoverageAmount || inputs.propertyValue).toLocaleString()}

## Premium Breakdown
- **Owner's Policy Premium:** $${ownersPolicyPremium.toLocaleString()}
- **Lender's Policy Premium:** $${lendersPolicyPremium.toLocaleString()}
- **Total Premium:** $${totalPremium.toLocaleString()}
- **Premium per $1,000:** $${premiumPerThousand.toFixed(2)}

## Additional Costs
- **Endorsement Costs:** $${endorsementCosts.toLocaleString()}
- **Title Search Fees:** $${searchFees.toLocaleString()}
- **Settlement Fees:** $${settlementFees.toLocaleString()}
- **Total Costs:** $${totalCosts.toLocaleString()}
- **Cost Percentage:** ${costPercentage.toFixed(2)}%

## Assessment Scores
- **Risk Score:** ${riskScore}/100
- **Coverage Score:** ${coverageScore}/100
- **Value Score:** ${valueScore}/100

## Risk Breakdown
- **Known Issues:** ${riskBreakdown.knownIssues}
- **Previous Claims:** ${riskBreakdown.previousClaims}
- **Chain of Title:** ${riskBreakdown.chainOfTitle}
- **Property Age:** ${riskBreakdown.propertyAge}
- **Overall Risk:** ${riskBreakdown.overallRisk}

## Cost Breakdown
- **Base Premium:** $${costBreakdown.basePremium.toLocaleString()}
- **Endorsements:** $${costBreakdown.endorsements.toLocaleString()}
- **Extended Coverage:** $${costBreakdown.extendedCoverage.toLocaleString()}
- **Search Fees:** $${costBreakdown.searchFees.toLocaleString()}
- **Settlement Fees:** $${costBreakdown.settlementFees.toLocaleString()}

## Policy Comparison
${policyComparison.map(policy => 
  `- **${policy.type}:** $${policy.premium.toLocaleString()} premium, $${policy.cost.toLocaleString()} total cost`
).join('\n')}

## Recommendations
${outputs.recommendations}

## Key Factors
${outputs.keyFactors}

## Risks
${outputs.risks}

## Next Steps
1. Review title search results carefully
2. Address any title issues before closing
3. Consider additional endorsements if needed
4. Compare quotes from multiple title companies
5. Understand your coverage limits and exclusions`;
}
