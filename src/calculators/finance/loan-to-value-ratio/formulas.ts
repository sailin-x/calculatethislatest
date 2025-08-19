import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Property type LTV adjustments
const PROPERTY_TYPE_LTV = {
  'Single Family': 80,
  'Multi-Family': 75,
  'Condo': 75,
  'Townhouse': 80,
  'Commercial': 70,
  'Investment': 75,
  'Vacation Home': 70,
  'Manufactured Home': 70,
  'Land': 50,
  'Mixed-Use': 70
};

// Occupancy type LTV adjustments
const OCCUPANCY_TYPE_LTV = {
  'Primary Residence': 80,
  'Secondary Home': 70,
  'Investment Property': 75,
  'Vacation Rental': 70,
  'Commercial Use': 70
};

// Loan type LTV adjustments
const LOAN_TYPE_LTV = {
  'Conventional': 80,
  'FHA': 96.5,
  'VA': 100,
  'USDA': 100,
  'Jumbo': 80,
  'Portfolio': 85,
  'Hard Money': 70,
  'Bridge Loan': 80,
  'Construction Loan': 80,
  'HELOC': 85
};

// Market condition adjustments
const MARKET_CONDITION_ADJUSTMENTS = {
  'Strong': 5,
  'Stable': 0,
  'Weak': -10,
  'Recovering': 2,
  'Declining': -15,
  'Volatile': -20
};

// Lender type adjustments
const LENDER_TYPE_ADJUSTMENTS = {
  'Commercial Bank': 0,
  'Credit Union': -2,
  'Mortgage Banker': 0,
  'Mortgage Broker': 0,
  'Private Lender': 10,
  'Hard Money Lender': 20,
  'Government Agency': -5,
  'Regional Bank': -1,
  'National Bank': 0,
  'Online Lender': 2
};

// Property condition adjustments
const PROPERTY_CONDITION_ADJUSTMENTS = {
  'Excellent': 5,
  'Good': 0,
  'Fair': -5,
  'Poor': -15,
  'Needs Renovation': -20,
  'New Construction': 5
};

// Zoning restrictions adjustments
const ZONING_RESTRICTIONS_ADJUSTMENTS = {
  'None': 0,
  'Minor': -5,
  'Moderate': -10,
  'Significant': -20,
  'Non-Conforming Use': -25,
  'Pending Zoning Change': -15
};

// Environmental issues adjustments
const ENVIRONMENTAL_ISSUES_ADJUSTMENTS = {
  'None': 0,
  'Minor': -5,
  'Moderate': -15,
  'Significant': -30,
  'Unknown': -10,
  'Remediation Required': -25
};

// Title issues adjustments
const TITLE_ISSUES_ADJUSTMENTS = {
  'Clear Title': 0,
  'Minor Issues': -5,
  'Moderate Issues': -15,
  'Significant Issues': -30,
  'Clouded Title': -40,
  'Pending Resolution': -20
};

// Insurance requirements adjustments
const INSURANCE_REQUIREMENTS_ADJUSTMENTS = {
  'Standard': 0,
  'Flood Insurance Required': -5,
  'Earthquake Insurance Required': -5,
  'Wind Insurance Required': -3,
  'Additional Coverage Required': -10,
  'No Insurance Required': 0
};

// PMI rates by LTV ratio
const PMI_RATES = {
  80: 0.005,
  85: 0.007,
  90: 0.009,
  95: 0.012,
  96.5: 0.015
};

// Helper function to calculate risk score
function calculateRiskScore(inputs: CalculatorInputs, ltvRatio: number): number {
  let riskScore = 20; // Base risk score

  // LTV ratio risk
  if (ltvRatio <= 60) riskScore += 0;
  else if (ltvRatio <= 70) riskScore += 5;
  else if (ltvRatio <= 80) riskScore += 10;
  else if (ltvRatio <= 90) riskScore += 20;
  else if (ltvRatio <= 95) riskScore += 30;
  else riskScore += 40;

  // Property type risk
  if (inputs.propertyType && ['Commercial', 'Investment', 'Vacation Home'].includes(inputs.propertyType)) {
    riskScore += 10;
  }

  // Occupancy type risk
  if (inputs.occupancyType && ['Investment Property', 'Vacation Rental', 'Commercial Use'].includes(inputs.occupancyType)) {
    riskScore += 15;
  }

  // Loan type risk
  if (inputs.loanType && ['Hard Money', 'Bridge Loan'].includes(inputs.loanType)) {
    riskScore += 25;
  }

  // Credit score risk
  if (inputs.creditScore) {
    if (inputs.creditScore >= 800) riskScore -= 15;
    else if (inputs.creditScore >= 750) riskScore -= 10;
    else if (inputs.creditScore >= 700) riskScore -= 5;
    else if (inputs.creditScore >= 650) riskScore += 5;
    else riskScore += 20;
  }

  // DTI ratio risk
  if (inputs.debtToIncomeRatio) {
    if (inputs.debtToIncomeRatio <= 28) riskScore -= 10;
    else if (inputs.debtToIncomeRatio <= 36) riskScore -= 5;
    else if (inputs.debtToIncomeRatio <= 43) riskScore += 5;
    else if (inputs.debtToIncomeRatio <= 50) riskScore += 15;
    else riskScore += 25;
  }

  // Market condition adjustment
  if (inputs.marketCondition && MARKET_CONDITION_ADJUSTMENTS[inputs.marketCondition as keyof typeof MARKET_CONDITION_ADJUSTMENTS]) {
    riskScore += MARKET_CONDITION_ADJUSTMENTS[inputs.marketCondition as keyof typeof MARKET_CONDITION_ADJUSTMENTS];
  }

  // Property condition adjustment
  if (inputs.propertyCondition && PROPERTY_CONDITION_ADJUSTMENTS[inputs.propertyCondition as keyof typeof PROPERTY_CONDITION_ADJUSTMENTS]) {
    riskScore += PROPERTY_CONDITION_ADJUSTMENTS[inputs.propertyCondition as keyof typeof PROPERTY_CONDITION_ADJUSTMENTS];
  }

  // Zoning restrictions adjustment
  if (inputs.zoningRestrictions && ZONING_RESTRICTIONS_ADJUSTMENTS[inputs.zoningRestrictions as keyof typeof ZONING_RESTRICTIONS_ADJUSTMENTS]) {
    riskScore += ZONING_RESTRICTIONS_ADJUSTMENTS[inputs.zoningRestrictions as keyof typeof ZONING_RESTRICTIONS_ADJUSTMENTS];
  }

  // Environmental issues adjustment
  if (inputs.environmentalIssues && ENVIRONMENTAL_ISSUES_ADJUSTMENTS[inputs.environmentalIssues as keyof typeof ENVIRONMENTAL_ISSUES_ADJUSTMENTS]) {
    riskScore += ENVIRONMENTAL_ISSUES_ADJUSTMENTS[inputs.environmentalIssues as keyof typeof ENVIRONMENTAL_ISSUES_ADJUSTMENTS];
  }

  // Title issues adjustment
  if (inputs.titleIssues && TITLE_ISSUES_ADJUSTMENTS[inputs.titleIssues as keyof typeof TITLE_ISSUES_ADJUSTMENTS]) {
    riskScore += TITLE_ISSUES_ADJUSTMENTS[inputs.titleIssues as keyof typeof TITLE_ISSUES_ADJUSTMENTS];
  }

  // Property age adjustment
  if (inputs.propertyAge) {
    if (inputs.propertyAge <= 5) riskScore -= 5;
    else if (inputs.propertyAge <= 15) riskScore += 0;
    else if (inputs.propertyAge <= 30) riskScore += 5;
    else if (inputs.propertyAge <= 50) riskScore += 10;
    else riskScore += 15;
  }

  return Math.max(0, Math.min(100, riskScore));
}

// Helper function to calculate approval probability
function calculateApprovalProbability(riskScore: number, ltvRatio: number, inputs: CalculatorInputs): number {
  let probability = 50; // Base probability

  // Risk score adjustment
  if (riskScore <= 20) probability += 30;
  else if (riskScore <= 40) probability += 20;
  else if (riskScore <= 60) probability += 10;
  else if (riskScore <= 80) probability -= 10;
  else probability -= 30;

  // LTV ratio adjustment
  if (ltvRatio <= 60) probability += 20;
  else if (ltvRatio <= 70) probability += 15;
  else if (ltvRatio <= 80) probability += 10;
  else if (ltvRatio <= 90) probability -= 10;
  else probability -= 20;

  // Credit score bonus
  if (inputs.creditScore && inputs.creditScore >= 750) probability += 15;

  // Down payment bonus
  if (inputs.downPayment && inputs.propertyValue) {
    const downPaymentPercentage = (inputs.downPayment / inputs.propertyValue) * 100;
    if (downPaymentPercentage >= 20) probability += 10;
    else if (downPaymentPercentage >= 10) probability += 5;
  }

  // Loan type adjustment
  if (inputs.loanType === 'FHA' || inputs.loanType === 'VA') probability += 10;

  return Math.max(0, Math.min(100, probability));
}

// Helper function to determine PMI requirement and cost
function calculatePMI(ltvRatio: number, loanAmount: number): { required: boolean; cost: number } {
  if (ltvRatio <= 80) {
    return { required: false, cost: 0 };
  }

  let pmiRate = 0.015; // Default rate
  if (ltvRatio <= 85) pmiRate = PMI_RATES[85] || 0.007;
  else if (ltvRatio <= 90) pmiRate = PMI_RATES[90] || 0.009;
  else if (ltvRatio <= 95) pmiRate = PMI_RATES[95] || 0.012;
  else pmiRate = PMI_RATES[96.5] || 0.015;

  const monthlyPMI = (loanAmount * pmiRate) / 12;
  return { required: true, cost: Math.round(monthlyPMI) };
}

// Helper function to generate recommendation
function generateRecommendation(ltvRatio: number, riskScore: number, approvalProbability: number, pmiRequired: boolean): string {
  if (approvalProbability >= 80 && ltvRatio <= 80) {
    return 'Strongly Recommended - Excellent loan profile with low LTV ratio and high approval probability';
  } else if (approvalProbability >= 70 && ltvRatio <= 85) {
    return 'Recommended - Good loan profile with reasonable LTV ratio and favorable approval prospects';
  } else if (approvalProbability >= 60 && ltvRatio <= 90) {
    return 'Conditionally Recommended - May require additional down payment or risk mitigation';
  } else if (approvalProbability >= 50 && ltvRatio <= 95) {
    return 'Proceed with Caution - Higher LTV ratio may require PMI and additional scrutiny';
  } else {
    return 'Not Recommended - High LTV ratio and low approval probability';
  }
}

export function calculateLoanToValueRatio(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const propertyValue = inputs.propertyValue || 0;
  const loanAmount = inputs.loanAmount || 0;
  const downPayment = inputs.downPayment || 0;
  const maxLtvRatio = inputs.maxLtvRatio || 80;

  // Calculate LTV ratio
  const ltvRatio = propertyValue > 0 ? (loanAmount / propertyValue) * 100 : 0;

  // Calculate maximum loan amount based on LTV ratio
  const maxLoanAmount = propertyValue * (maxLtvRatio / 100);

  // Calculate required down payment
  const requiredDownPayment = propertyValue - maxLoanAmount;

  // Determine loan approval status
  let loanApprovalStatus = 'Approved';
  if (ltvRatio > maxLtvRatio) {
    loanApprovalStatus = 'Denied - LTV ratio exceeds maximum';
  } else if (ltvRatio > 95) {
    loanApprovalStatus = 'Conditional - Requires additional down payment';
  } else if (ltvRatio > 90) {
    loanApprovalStatus = 'Conditional - May require PMI';
  }

  // Calculate risk assessment
  const riskScore = calculateRiskScore(inputs, ltvRatio);
  const approvalProbability = calculateApprovalProbability(riskScore, ltvRatio, inputs);

  // Determine risk assessment
  let riskAssessment = 'Low Risk';
  if (riskScore >= 70) riskAssessment = 'Very High Risk';
  else if (riskScore >= 60) riskAssessment = 'High Risk';
  else if (riskScore >= 40) riskAssessment = 'Moderate Risk';
  else if (riskScore >= 20) riskAssessment = 'Low Risk';
  else riskAssessment = 'Very Low Risk';

  // Calculate PMI
  const pmiCalculation = calculatePMI(ltvRatio, loanAmount);

  // Generate recommendation
  const recommendation = generateRecommendation(ltvRatio, riskScore, approvalProbability, pmiCalculation.required);

  // Key metrics
  const keyMetrics = {
    equityPercentage: propertyValue > 0 ? ((propertyValue - loanAmount) / propertyValue) * 100 : 0,
    downPaymentPercentage: propertyValue > 0 ? (downPayment / propertyValue) * 100 : 0,
    loanToIncomeRatio: 0, // Placeholder - would need income data
    debtServiceCoverageRatio: 1.25, // Placeholder
    monthlyPayment: 0, // Placeholder - would need rate and term
    totalMonthlyPayment: 0 // Placeholder - would include PMI
  };

  return {
    ltvRatio: Math.round(ltvRatio * 100) / 100,
    maxLoanAmount: Math.round(maxLoanAmount),
    requiredDownPayment: Math.round(requiredDownPayment),
    loanApprovalStatus,
    riskAssessment,
    pmiRequired: pmiCalculation.required,
    pmiCost: pmiCalculation.cost,
    riskScore: Math.round(riskScore),
    approvalProbability: Math.round(approvalProbability),
    recommendation,
    keyMetrics,
    loanToValueRatioAnalysis: 'Comprehensive LTV ratio analysis completed'
  };
}

export function generateLoanToValueRatioAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Loan-to-Value (LTV) Ratio Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**LTV Ratio:** ${outputs.ltvRatio}%
**Risk Score:** ${outputs.riskScore}/100
**Approval Probability:** ${outputs.approvalProbability}%
**Loan Status:** ${outputs.loanApprovalStatus}

## Loan Analysis
- **Property Value:** $${inputs.propertyValue?.toLocaleString() || 'Not specified'}
- **Loan Amount:** $${inputs.loanAmount?.toLocaleString() || 'Not specified'}
- **Down Payment:** $${inputs.downPayment?.toLocaleString() || 'Not specified'}
- **Maximum LTV Ratio:** ${inputs.maxLtvRatio || 80}%
- **Calculated LTV Ratio:** ${outputs.ltvRatio}%

## Financing Structure
- **Maximum Loan Amount:** $${outputs.maxLoanAmount.toLocaleString()}
- **Required Down Payment:** $${outputs.requiredDownPayment.toLocaleString()}
- **Equity Percentage:** ${outputs.keyMetrics.equityPercentage.toFixed(1)}%
- **Down Payment Percentage:** ${outputs.keyMetrics.downPaymentPercentage.toFixed(1)}%

## Risk Assessment
**Risk Level:** ${outputs.riskAssessment}

**Risk Factors:**
${inputs.propertyType ? `- Property Type: ${inputs.propertyType}` : ''}
${inputs.occupancyType ? `- Occupancy Type: ${inputs.occupancyType}` : ''}
${inputs.loanType ? `- Loan Type: ${inputs.loanType}` : ''}
${inputs.creditScore ? `- Credit Score: ${inputs.creditScore}` : ''}
${inputs.debtToIncomeRatio ? `- DTI Ratio: ${inputs.debtToIncomeRatio}%` : ''}
${inputs.propertyCondition ? `- Property Condition: ${inputs.propertyCondition}` : ''}
${inputs.propertyAge ? `- Property Age: ${inputs.propertyAge} years` : ''}

## PMI Analysis
- **PMI Required:** ${outputs.pmiRequired ? 'Yes' : 'No'}
${outputs.pmiRequired ? `- **Monthly PMI Cost:** $${outputs.pmiCost.toLocaleString()}` : ''}

## Key Metrics
- **Equity Percentage:** ${outputs.keyMetrics.equityPercentage.toFixed(1)}%
- **Down Payment Percentage:** ${outputs.keyMetrics.downPaymentPercentage.toFixed(1)}%
- **Debt Service Coverage Ratio:** ${outputs.keyMetrics.debtServiceCoverageRatio}

## Property Details
${inputs.propertyLocation ? `- **Location:** ${inputs.propertyLocation}` : ''}
${inputs.marketCondition ? `- **Market Condition:** ${inputs.marketCondition}` : ''}
${inputs.appraisalType ? `- **Appraisal Type:** ${inputs.appraisalType}` : ''}
${inputs.zoningRestrictions ? `- **Zoning Restrictions:** ${inputs.zoningRestrictions}` : ''}
${inputs.environmentalIssues ? `- **Environmental Issues:** ${inputs.environmentalIssues}` : ''}
${inputs.titleIssues ? `- **Title Issues:** ${inputs.titleIssues}` : ''}
${inputs.insuranceRequired ? `- **Insurance Requirements:** ${inputs.insuranceRequired}` : ''}

## Recommendations
1. **LTV Ratio:** ${outputs.ltvRatio > 80 ? 'Consider increasing down payment to avoid PMI' : 'Current LTV ratio is acceptable'}
2. **Risk Mitigation:** ${outputs.riskScore > 60 ? 'Consider additional risk mitigation strategies' : 'Current risk profile is acceptable'}
3. **Lender Selection:** ${outputs.approvalProbability > 70 ? 'Multiple lender options available' : 'Focus on specialized lenders'}
4. **PMI Consideration:** ${outputs.pmiRequired ? 'Factor PMI costs into total monthly payment calculations' : 'No PMI required'}

## Next Steps
- ${outputs.ltvRatio > inputs.maxLtvRatio ? 'Increase down payment or reduce loan amount' : 'Proceed with current loan structure'}
- ${outputs.pmiRequired ? 'Shop for competitive PMI rates' : 'No PMI required'}
- ${outputs.riskScore > 60 ? 'Address identified risk factors' : 'Current risk profile is acceptable'}
- Prepare loan application documentation
- Schedule property appraisal if required
- Review and compare lender offers
`;
}
