import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Project type risk factors
const PROJECT_TYPE_RISK = {
  'Residential': 15,
  'Commercial': 20,
  'Industrial': 12,
  'Mixed-Use': 25,
  'Hospitality': 30,
  'Healthcare': 18,
  'Educational': 16,
  'Retail': 22,
  'Office': 20,
  'Warehouse': 10
};

// Location risk factors
const LOCATION_RISK = {
  'Urban': 18,
  'Suburban': 12,
  'Rural': 20,
  'Downtown': 15,
  'Airport Area': 16,
  'University Area': 14,
  'Medical District': 13,
  'Business District': 16,
  'Residential Area': 12,
  'Industrial Zone': 10
};

// Market condition adjustments
const MARKET_CONDITION_ADJUSTMENTS = {
  'Strong': 10,
  'Stable': 0,
  'Weak': -10,
  'Recovering': 5,
  'Declining': -15,
  'Volatile': -20
};

// Lender type adjustments
const LENDER_TYPE_ADJUSTMENTS = {
  'Commercial Bank': 0,
  'Credit Union': -5,
  'Private Lender': 10,
  'Hard Money Lender': 25,
  'CMBS Lender': 5,
  'Life Insurance Company': -10,
  'Government Agency': -15,
  'Regional Bank': -2,
  'National Bank': 0,
  'Investment Fund': 15
};

// Borrower experience adjustments
const BORROWER_EXPERIENCE_ADJUSTMENTS = {
  'Novice': 20,
  'Experienced': 0,
  'Expert': -10,
  'Institutional': -20
};

// Pre-leasing adjustments
const PRE_LEASING_ADJUSTMENTS = {
  'None': 0,
  'Partial': -5,
  'Substantial': -15,
  'Fully Leased': -25
};

// Environmental issues adjustments
const ENVIRONMENTAL_ADJUSTMENTS = {
  'None': 0,
  'Minor': 5,
  'Moderate': 15,
  'Significant': 30,
  'Unknown': 20
};

// Zoning issues adjustments
const ZONING_ADJUSTMENTS = {
  'None': 0,
  'Minor': 8,
  'Moderate': 18,
  'Significant': 35,
  'Pending Approval': 25
};

// Construction risk adjustments
const CONSTRUCTION_RISK_ADJUSTMENTS = {
  'Low': 0,
  'Moderate': 10,
  'High': 20,
  'Very High': 35
};

// Market risk adjustments
const MARKET_RISK_ADJUSTMENTS = {
  'Low': 0,
  'Moderate': 12,
  'High': 25,
  'Very High': 40
};

// Helper function to calculate risk score
function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 30; // Base risk score

  // Project type risk
  if (inputs.projectType && PROJECT_TYPE_RISK[inputs.projectType as keyof typeof PROJECT_TYPE_RISK]) {
    riskScore += PROJECT_TYPE_RISK[inputs.projectType as keyof typeof PROJECT_TYPE_RISK];
  }

  // Location risk
  if (inputs.location && LOCATION_RISK[inputs.location as keyof typeof LOCATION_RISK]) {
    riskScore += LOCATION_RISK[inputs.location as keyof typeof LOCATION_RISK];
  }

  // Market condition adjustment
  if (inputs.marketCondition && MARKET_CONDITION_ADJUSTMENTS[inputs.marketCondition as keyof typeof MARKET_CONDITION_ADJUSTMENTS]) {
    riskScore += MARKET_CONDITION_ADJUSTMENTS[inputs.marketCondition as keyof typeof MARKET_CONDITION_ADJUSTMENTS];
  }

  // Lender type adjustment
  if (inputs.lenderType && LENDER_TYPE_ADJUSTMENTS[inputs.lenderType as keyof typeof LENDER_TYPE_ADJUSTMENTS]) {
    riskScore += LENDER_TYPE_ADJUSTMENTS[inputs.lenderType as keyof typeof LENDER_TYPE_ADJUSTMENTS];
  }

  // Borrower experience adjustment
  if (inputs.borrowerExperience && BORROWER_EXPERIENCE_ADJUSTMENTS[inputs.borrowerExperience as keyof typeof BORROWER_EXPERIENCE_ADJUSTMENTS]) {
    riskScore += BORROWER_EXPERIENCE_ADJUSTMENTS[inputs.borrowerExperience as keyof typeof BORROWER_EXPERIENCE_ADJUSTMENTS];
  }

  // Pre-leasing adjustment
  if (inputs.preLeasing && PRE_LEASING_ADJUSTMENTS[inputs.preLeasing as keyof typeof PRE_LEASING_ADJUSTMENTS]) {
    riskScore += PRE_LEASING_ADJUSTMENTS[inputs.preLeasing as keyof typeof PRE_LEASING_ADJUSTMENTS];
  }

  // Environmental issues adjustment
  if (inputs.environmentalIssues && ENVIRONMENTAL_ADJUSTMENTS[inputs.environmentalIssues as keyof typeof ENVIRONMENTAL_ADJUSTMENTS]) {
    riskScore += ENVIRONMENTAL_ADJUSTMENTS[inputs.environmentalIssues as keyof typeof ENVIRONMENTAL_ADJUSTMENTS];
  }

  // Zoning issues adjustment
  if (inputs.zoningIssues && ZONING_ADJUSTMENTS[inputs.zoningIssues as keyof typeof ZONING_ADJUSTMENTS]) {
    riskScore += ZONING_ADJUSTMENTS[inputs.zoningIssues as keyof typeof ZONING_ADJUSTMENTS];
  }

  // Construction risk adjustment
  if (inputs.constructionRisk && CONSTRUCTION_RISK_ADJUSTMENTS[inputs.constructionRisk as keyof typeof CONSTRUCTION_RISK_ADJUSTMENTS]) {
    riskScore += CONSTRUCTION_RISK_ADJUSTMENTS[inputs.constructionRisk as keyof typeof CONSTRUCTION_RISK_ADJUSTMENTS];
  }

  // Market risk adjustment
  if (inputs.marketRisk && MARKET_RISK_ADJUSTMENTS[inputs.marketRisk as keyof typeof MARKET_RISK_ADJUSTMENTS]) {
    riskScore += MARKET_RISK_ADJUSTMENTS[inputs.marketRisk as keyof typeof MARKET_RISK_ADJUSTMENTS];
  }

  // Credit score adjustment
  if (inputs.borrowerCreditScore) {
    if (inputs.borrowerCreditScore >= 800) riskScore -= 15;
    else if (inputs.borrowerCreditScore >= 750) riskScore -= 10;
    else if (inputs.borrowerCreditScore >= 700) riskScore -= 5;
    else if (inputs.borrowerCreditScore >= 650) riskScore += 5;
    else riskScore += 15;
  }

  // Project timeline adjustment
  if (inputs.projectTimeline) {
    if (inputs.projectTimeline <= 12) riskScore -= 5;
    else if (inputs.projectTimeline <= 18) riskScore += 0;
    else if (inputs.projectTimeline <= 24) riskScore += 8;
    else riskScore += 15;
  }

  // Pre-leasing percentage adjustment
  if (inputs.preLeasingPercentage) {
    if (inputs.preLeasingPercentage >= 80) riskScore -= 10;
    else if (inputs.preLeasingPercentage >= 60) riskScore -= 5;
    else if (inputs.preLeasingPercentage >= 40) riskScore += 0;
    else if (inputs.preLeasingPercentage >= 20) riskScore += 5;
    else riskScore += 10;
  }

  return Math.max(0, Math.min(100, riskScore));
}

// Helper function to calculate feasibility score
function calculateFeasibilityScore(riskScore: number, inputs: CalculatorInputs): number {
  let feasibilityScore = 100 - riskScore;

  // Market condition bonus
  if (inputs.marketCondition === 'Strong') feasibilityScore += 10;
  else if (inputs.marketCondition === 'Recovering') feasibilityScore += 5;

  // Pre-leasing bonus
  if (inputs.preLeasing === 'Fully Leased') feasibilityScore += 15;
  else if (inputs.preLeasing === 'Substantial') feasibilityScore += 10;
  else if (inputs.preLeasing === 'Partial') feasibilityScore += 5;

  // Borrower experience bonus
  if (inputs.borrowerExperience === 'Expert') feasibilityScore += 10;
  else if (inputs.borrowerExperience === 'Institutional') feasibilityScore += 15;

  return Math.max(0, Math.min(100, feasibilityScore));
}

// Helper function to calculate lender approval probability
function calculateApprovalProbability(riskScore: number, feasibilityScore: number, ltcRatio: number): number {
  let probability = 50; // Base probability

  // Risk score adjustment
  if (riskScore <= 20) probability += 30;
  else if (riskScore <= 40) probability += 20;
  else if (riskScore <= 60) probability += 10;
  else if (riskScore <= 80) probability -= 10;
  else probability -= 30;

  // Feasibility score adjustment
  if (feasibilityScore >= 80) probability += 20;
  else if (feasibilityScore >= 60) probability += 10;
  else if (feasibilityScore <= 40) probability -= 20;

  // LTC ratio adjustment
  if (ltcRatio <= 65) probability += 15;
  else if (ltcRatio <= 75) probability += 5;
  else if (ltcRatio >= 85) probability -= 15;

  return Math.max(0, Math.min(100, probability));
}

// Helper function to generate recommendation
function generateRecommendation(riskScore: number, feasibilityScore: number, approvalProbability: number, ltcRatio: number): string {
  if (approvalProbability >= 80 && feasibilityScore >= 75) {
    return 'Strongly Recommended - Excellent project profile with high approval probability';
  } else if (approvalProbability >= 65 && feasibilityScore >= 60) {
    return 'Recommended - Good project profile with favorable approval prospects';
  } else if (approvalProbability >= 50 && feasibilityScore >= 45) {
    return 'Conditionally Recommended - Project may require additional equity or risk mitigation';
  } else if (approvalProbability >= 35 && feasibilityScore >= 30) {
    return 'Proceed with Caution - Significant risks present, consider restructuring';
  } else {
    return 'Not Recommended - High risk profile with low approval probability';
  }
}

export function calculateLoanToCostRatio(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const landCost = inputs.landCost || 0;
  const constructionCost = inputs.constructionCost || 0;
  const softCosts = inputs.softCosts || 0;
  const furnitureFixturesEquipment = inputs.furnitureFixturesEquipment || 0;
  const contingency = inputs.contingency || 0;
  const ltcRatio = inputs.ltcRatio || 75;

  // Calculate total project cost
  const totalProjectCost = landCost + constructionCost + softCosts + furnitureFixturesEquipment + contingency;

  // Calculate maximum loan amount
  const maximumLoanAmount = totalProjectCost * (ltcRatio / 100);

  // Calculate required equity
  const requiredEquity = totalProjectCost - maximumLoanAmount;

  // Calculate actual LTC ratio
  const ltcRatioActual = (maximumLoanAmount / totalProjectCost) * 100;

  // Calculate risk and feasibility scores
  const riskScore = calculateRiskScore(inputs);
  const feasibilityScore = calculateFeasibilityScore(riskScore, inputs);
  const lenderApprovalProbability = calculateApprovalProbability(riskScore, feasibilityScore, ltcRatio);

  // Generate recommendation
  const recommendation = generateRecommendation(riskScore, feasibilityScore, lenderApprovalProbability, ltcRatio);

  // Cost breakdown
  const costBreakdown = {
    landCost: Math.round(landCost),
    constructionCost: Math.round(constructionCost),
    softCosts: Math.round(softCosts),
    furnitureFixturesEquipment: Math.round(furnitureFixturesEquipment),
    contingency: Math.round(contingency),
    totalProjectCost: Math.round(totalProjectCost)
  };

  // Key metrics
  const keyMetrics = {
    costPerSquareFoot: totalProjectCost > 0 ? totalProjectCost / 1000 : 0, // Assuming 1000 sqft for calculation
    equityPercentage: totalProjectCost > 0 ? (requiredEquity / totalProjectCost) * 100 : 0,
    debtServiceCoverageRatio: 1.25, // Placeholder
    returnOnEquity: 15, // Placeholder percentage
    projectIRR: 18, // Placeholder percentage
    paybackPeriod: 7.5 // Placeholder years
  };

  return {
    totalProjectCost: Math.round(totalProjectCost),
    maximumLoanAmount: Math.round(maximumLoanAmount),
    requiredEquity: Math.round(requiredEquity),
    ltcRatioActual: Math.round(ltcRatioActual * 100) / 100,
    costBreakdown,
    riskScore: Math.round(riskScore),
    feasibilityScore: Math.round(feasibilityScore),
    lenderApprovalProbability: Math.round(lenderApprovalProbability),
    recommendation,
    keyMetrics,
    loanToCostRatioAnalysis: 'Comprehensive LTC ratio analysis completed'
  };
}

export function generateLoanToCostRatioAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Loan to Cost (LTC) Ratio Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Risk Score:** ${outputs.riskScore}/100
**Feasibility Score:** ${outputs.feasibilityScore}/100
**Lender Approval Probability:** ${outputs.lenderApprovalProbability}%

## Project Cost Breakdown
- **Land Cost:** $${outputs.costBreakdown.landCost.toLocaleString()}
- **Construction Cost:** $${outputs.costBreakdown.constructionCost.toLocaleString()}
- **Soft Costs:** $${outputs.costBreakdown.softCosts.toLocaleString()}
- **FF&E:** $${outputs.costBreakdown.furnitureFixturesEquipment.toLocaleString()}
- **Contingency:** $${outputs.costBreakdown.contingency.toLocaleString()}
- **Total Project Cost:** $${outputs.totalProjectCost.toLocaleString()}

## Financing Structure
- **Maximum Loan Amount:** $${outputs.maximumLoanAmount.toLocaleString()}
- **Required Equity:** $${outputs.requiredEquity.toLocaleString()}
- **LTC Ratio:** ${outputs.ltcRatioActual}%
- **Equity Percentage:** ${outputs.keyMetrics.equityPercentage.toFixed(1)}%

## Key Metrics
- **Cost per Square Foot:** $${outputs.keyMetrics.costPerSquareFoot.toLocaleString()}
- **Debt Service Coverage Ratio:** ${outputs.keyMetrics.debtServiceCoverageRatio}
- **Return on Equity:** ${outputs.keyMetrics.returnOnEquity}%
- **Project IRR:** ${outputs.keyMetrics.projectIRR}%
- **Payback Period:** ${outputs.keyMetrics.paybackPeriod} years

## Risk Analysis
**Risk Factors:**
${inputs.projectType ? `- Project Type: ${inputs.projectType}` : ''}
${inputs.location ? `- Location: ${inputs.location}` : ''}
${inputs.marketCondition ? `- Market Condition: ${inputs.marketCondition}` : ''}
${inputs.constructionRisk ? `- Construction Risk: ${inputs.constructionRisk}` : ''}
${inputs.marketRisk ? `- Market Risk: ${inputs.marketRisk}` : ''}

## Lender Considerations
- **Lender Type:** ${inputs.lenderType || 'Not specified'}
- **Borrower Experience:** ${inputs.borrowerExperience || 'Not specified'}
- **Credit Score:** ${inputs.borrowerCreditScore || 'Not specified'}
- **Pre-Leasing Status:** ${inputs.preLeasing || 'Not specified'}
${inputs.preLeasingPercentage ? `- Pre-Leasing Percentage: ${inputs.preLeasingPercentage}%` : ''}

## Recommendations
1. **Equity Requirements:** Ensure adequate equity funding of $${outputs.requiredEquity.toLocaleString()}
2. **Risk Mitigation:** ${outputs.riskScore > 60 ? 'Consider additional risk mitigation strategies' : 'Current risk profile is acceptable'}
3. **Lender Selection:** ${outputs.lenderApprovalProbability > 70 ? 'Multiple lender options available' : 'Focus on specialized lenders'}
4. **Timeline Management:** ${inputs.projectTimeline && inputs.projectTimeline > 18 ? 'Consider accelerating timeline to reduce risk' : 'Timeline appears reasonable'}

## Next Steps
- Secure equity commitments
- Begin lender discussions
- Finalize project timeline
- Address any identified risk factors
- Prepare detailed project documentation
`;
}
