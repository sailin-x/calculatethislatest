import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface LoanToValueRatioInputs extends CalculatorInputs {
  propertyValue: number;
  loanAmount: number;
  downPayment?: number;
  propertyType?: string;
  loanType?: string;
  occupancyType?: string;
  creditScore?: number;
  debtToIncomeRatio?: number;
  reserves?: number;
  marketCondition?: string;
  location?: string;
  propertyAge?: number;
  propertyCondition?: string;
  appraisalType?: string;
  lenderType?: string;
  loanPurpose?: string;
  loanTerm?: number;
  interestRate?: number;
  points?: number;
  closingCosts?: number;
}

export interface LoanToValueRatioOutputs extends CalculatorOutputs {
  ltvRatio: number;
  equityAmount: number;
  equityPercentage: number;
  riskAssessment: string;
  pmiRequired: boolean;
  pmiCost: number;
  maxLoanAmount: number;
  lendingScore: number;
  approvalProbability: number;
  recommendations: string;
  keyMetrics: {
    ltvRatio: number;
    equityPercentage: number;
    debtToIncomeRatio?: number;
    creditScore?: number;
  };
  ltvAnalysis: string;
}

export function calculateLoanToValueRatio(inputs: LoanToValueRatioInputs): LoanToValueRatioOutputs {
  const {
    propertyValue,
    loanAmount,
    propertyType = 'Single Family Home',
    loanType = 'Conventional',
    occupancyType = 'Primary Residence',
    creditScore,
    debtToIncomeRatio,
    reserves,
    marketCondition = 'Stable',
    location = 'Suburban',
    propertyAge,
    propertyCondition = 'Good',
    appraisalType = 'Full Appraisal',
    lenderType = 'Commercial Bank',
    loanPurpose = 'Purchase',
    loanTerm = 30,
    interestRate = 6.5
  } = inputs;

  // Core LTV calculations
  const ltvRatio = (loanAmount / propertyValue) * 100;
  const equityAmount = propertyValue - loanAmount;
  const equityPercentage = (equityAmount / propertyValue) * 100;

  // PMI determination
  const pmiRequired = determinePMIRequirement(ltvRatio, loanType, occupancyType);
  const pmiCost = calculatePMICost(loanAmount, ltvRatio, loanType, creditScore);

  // Risk assessment
  const riskAssessment = assessRiskLevel(ltvRatio, loanType, occupancyType, creditScore);
  const lendingScore = calculateLendingScore(inputs, ltvRatio);
  const approvalProbability = calculateApprovalProbability(lendingScore, inputs);

  // Maximum loan amount based on LTV limits
  const maxLoanAmount = calculateMaxLoanAmount(propertyValue, loanType, occupancyType);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, ltvRatio, pmiRequired);

  // Key metrics
  const keyMetrics = {
    ltvRatio,
    equityPercentage,
    debtToIncomeRatio,
    creditScore
  };

  // Comprehensive analysis
  const ltvAnalysis = generateLTVAnalysis(inputs, {
    ltvRatio,
    equityAmount,
    equityPercentage,
    riskAssessment,
    pmiRequired,
    pmiCost,
    lendingScore,
    approvalProbability
  });

  return {
    ltvRatio: Math.round(ltvRatio * 100) / 100,
    equityAmount: Math.round(equityAmount),
    equityPercentage: Math.round(equityPercentage * 100) / 100,
    riskAssessment,
    pmiRequired,
    pmiCost: Math.round(pmiCost),
    maxLoanAmount: Math.round(maxLoanAmount),
    lendingScore: Math.round(lendingScore),
    approvalProbability: Math.round(approvalProbability),
    recommendations,
    keyMetrics,
    ltvAnalysis
  };
}

function determinePMIRequirement(ltvRatio: number, loanType: string, occupancyType: string): boolean {
  if (loanType === 'FHA') {
    return ltvRatio > 78; // FHA requires MIP for life of loan if LTV > 78%
  }
  if (loanType === 'VA') {
    return false; // VA loans don't require PMI
  }
  if (loanType === 'USDA') {
    return false; // USDA loans have guarantee fee instead of PMI
  }
  
  // Conventional loans
  if (occupancyType === 'Investment Property') {
    return ltvRatio > 75; // Investment properties typically require PMI above 75% LTV
  }
  
  return ltvRatio > 80; // Standard conventional PMI threshold
}

function calculatePMICost(loanAmount: number, ltvRatio: number, loanType: string, creditScore?: number): number {
  if (loanType === 'FHA') {
    // FHA MIP rates (simplified)
    const baseRate = 0.85; // Base MIP rate
    const upfrontRate = 1.75; // Upfront MIP
    return (loanAmount * baseRate) / 100;
  }
  
  if (loanType === 'VA') {
    return 0; // VA loans don't have PMI
  }
  
  if (loanType === 'USDA') {
    // USDA guarantee fee
    return (loanAmount * 1.0) / 100;
  }
  
  // Conventional PMI (simplified calculation)
  if (ltvRatio <= 80) {
    return 0;
  }
  
  let pmiRate = 0.5; // Base rate
  
  // Adjust for LTV
  if (ltvRatio > 95) pmiRate += 0.3;
  else if (ltvRatio > 90) pmiRate += 0.2;
  else if (ltvRatio > 85) pmiRate += 0.1;
  
  // Adjust for credit score
  if (creditScore) {
    if (creditScore < 620) pmiRate += 0.5;
    else if (creditScore < 680) pmiRate += 0.3;
    else if (creditScore < 720) pmiRate += 0.1;
  }
  
  return (loanAmount * pmiRate) / 100;
}

function assessRiskLevel(ltvRatio: number, loanType: string, occupancyType: string, creditScore?: number): string {
  let riskScore = 0;
  
  // LTV risk
  if (ltvRatio >= 95) riskScore += 40;
  else if (ltvRatio >= 90) riskScore += 30;
  else if (ltvRatio >= 85) riskScore += 20;
  else if (ltvRatio >= 80) riskScore += 10;
  else if (ltvRatio >= 70) riskScore += 5;
  else riskScore += 0;
  
  // Loan type risk
  if (loanType === 'Hard Money') riskScore += 20;
  else if (loanType === 'FHA') riskScore += 5;
  else if (loanType === 'VA') riskScore += 3;
  
  // Occupancy risk
  if (occupancyType === 'Investment Property') riskScore += 15;
  else if (occupancyType === 'Secondary Home') riskScore += 10;
  
  // Credit score risk
  if (creditScore) {
    if (creditScore < 620) riskScore += 25;
    else if (creditScore < 680) riskScore += 15;
    else if (creditScore < 720) riskScore += 5;
  }
  
  if (riskScore >= 50) return 'High Risk';
  if (riskScore >= 30) return 'Moderate Risk';
  if (riskScore >= 15) return 'Low Risk';
  return 'Very Low Risk';
}

function calculateLendingScore(inputs: LoanToValueRatioInputs, ltvRatio: number): number {
  let score = 100;
  
  // LTV impact
  if (ltvRatio >= 95) score -= 30;
  else if (ltvRatio >= 90) score -= 20;
  else if (ltvRatio >= 85) score -= 15;
  else if (ltvRatio >= 80) score -= 10;
  else if (ltvRatio >= 70) score -= 5;
  
  // Credit score impact
  if (inputs.creditScore) {
    if (inputs.creditScore < 620) score -= 25;
    else if (inputs.creditScore < 680) score -= 15;
    else if (inputs.creditScore < 720) score -= 5;
    else if (inputs.creditScore >= 780) score += 5;
  }
  
  // Debt-to-income impact
  if (inputs.debtToIncomeRatio) {
    if (inputs.debtToIncomeRatio > 50) score -= 20;
    else if (inputs.debtToIncomeRatio > 43) score -= 10;
    else if (inputs.debtToIncomeRatio > 36) score -= 5;
    else if (inputs.debtToIncomeRatio <= 28) score += 5;
  }
  
  // Reserves impact
  if (inputs.reserves) {
    if (inputs.reserves < 3) score -= 10;
    else if (inputs.reserves >= 12) score += 5;
  }
  
  // Property condition impact
  if (inputs.propertyCondition === 'Poor') score -= 15;
  else if (inputs.propertyCondition === 'Needs Renovation') score -= 10;
  else if (inputs.propertyCondition === 'Excellent') score += 5;
  
  // Market condition impact
  if (inputs.marketCondition === 'Weak') score -= 10;
  else if (inputs.marketCondition === 'Declining') score -= 15;
  else if (inputs.marketCondition === 'Strong') score += 5;
  
  // Occupancy impact
  if (inputs.occupancyType === 'Investment Property') score -= 10;
  else if (inputs.occupancyType === 'Secondary Home') score -= 5;
  
  return Math.max(0, Math.min(100, score));
}

function calculateApprovalProbability(lendingScore: number, inputs: LoanToValueRatioInputs): number {
  let probability = lendingScore;
  
  // Loan type adjustments
  if (inputs.loanType === 'FHA') probability += 5;
  else if (inputs.loanType === 'VA') probability += 3;
  else if (inputs.loanType === 'Hard Money') probability -= 20;
  
  // Property type adjustments
  if (inputs.propertyType === 'Commercial Property') probability -= 10;
  else if (inputs.propertyType === 'Land') probability -= 15;
  
  // Appraisal type adjustments
  if (inputs.appraisalType === 'Desktop Appraisal') probability -= 5;
  else if (inputs.appraisalType === 'Broker Price Opinion') probability -= 10;
  
  return Math.max(0, Math.min(100, probability));
}

function calculateMaxLoanAmount(propertyValue: number, loanType: string, occupancyType: string): number {
  let maxLTV = 0.80; // Default conventional
  
  if (loanType === 'FHA') {
    maxLTV = 0.965; // FHA maximum
  } else if (loanType === 'VA') {
    maxLTV = 1.0; // VA can go up to 100%
  } else if (loanType === 'USDA') {
    maxLTV = 1.0; // USDA can go up to 100%
  } else if (loanType === 'Hard Money') {
    maxLTV = 0.70; // Hard money typically 70% max
  }
  
  // Adjust for occupancy
  if (occupancyType === 'Investment Property') {
    maxLTV = Math.min(maxLTV, 0.75); // Investment properties typically max at 75%
  } else if (occupancyType === 'Secondary Home') {
    maxLTV = Math.min(maxLTV, 0.85); // Secondary homes typically max at 85%
  }
  
  return propertyValue * maxLTV;
}

function generateRecommendations(inputs: LoanToValueRatioInputs, ltvRatio: number, pmiRequired: boolean): string {
  const recommendations: string[] = [];
  
  if (ltvRatio > 90) {
    recommendations.push('Consider a larger down payment to reduce LTV ratio and improve loan terms.');
  }
  
  if (pmiRequired) {
    recommendations.push('Explore options to reach 20% equity to eliminate PMI costs.');
  }
  
  if (inputs.creditScore && inputs.creditScore < 720) {
    recommendations.push('Improving credit score could result in better interest rates and terms.');
  }
  
  if (inputs.debtToIncomeRatio && inputs.debtToIncomeRatio > 43) {
    recommendations.push('Consider reducing debt-to-income ratio for better approval odds.');
  }
  
  if (inputs.reserves && inputs.reserves < 6) {
    recommendations.push('Building reserves to 6+ months could improve loan approval probability.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Your loan profile looks strong. Consider shopping multiple lenders for the best terms.');
  }
  
  return recommendations.join(' ');
}

export function generateLoanToValueRatioAnalysis(
  inputs: LoanToValueRatioInputs,
  outputs: Partial<LoanToValueRatioOutputs>
): string {
  const {
    propertyValue,
    loanAmount,
    propertyType = 'Single Family Home',
    loanType = 'Conventional',
    occupancyType = 'Primary Residence',
    creditScore,
    debtToIncomeRatio,
    marketCondition = 'Stable'
  } = inputs;

  const {
    ltvRatio = 0,
    equityAmount = 0,
    equityPercentage = 0,
    riskAssessment = 'Unknown',
    pmiRequired = false,
    lendingScore = 0,
    approvalProbability = 0
  } = outputs;

  let analysis = `The ${ltvRatio.toFixed(1)}% LTV ratio `;

  // LTV assessment
  if (ltvRatio <= 70) {
    analysis += 'represents excellent equity position with low lending risk. ';
  } else if (ltvRatio <= 80) {
    analysis += 'is within conventional lending standards with moderate risk. ';
  } else if (ltvRatio <= 90) {
    analysis += 'indicates higher risk and may require PMI. ';
  } else {
    analysis += 'represents very high risk and limited lender options. ';
  }

  // Equity analysis
  analysis += `You have $${equityAmount.toLocaleString()} in equity (${equityPercentage.toFixed(1)}% of property value). `;

  // PMI analysis
  if (pmiRequired) {
    analysis += 'Private Mortgage Insurance will be required, adding to your monthly costs. ';
  } else {
    analysis += 'No PMI required, which saves on monthly payments. ';
  }

  // Risk assessment
  analysis += `Risk assessment: ${riskAssessment}. `;

  // Credit and DTI impact
  if (creditScore) {
    if (creditScore >= 780) {
      analysis += 'Excellent credit score supports strong approval probability. ';
    } else if (creditScore >= 720) {
      analysis += 'Good credit score provides favorable terms. ';
    } else if (creditScore >= 680) {
      analysis += 'Fair credit score may result in higher rates. ';
    } else {
      analysis += 'Credit score may limit loan options and increase costs. ';
    }
  }

  if (debtToIncomeRatio) {
    if (debtToIncomeRatio <= 28) {
      analysis += 'Low debt-to-income ratio strengthens application. ';
    } else if (debtToIncomeRatio <= 36) {
      analysis += 'Debt-to-income ratio is within acceptable limits. ';
    } else if (debtToIncomeRatio <= 43) {
      analysis += 'Debt-to-income ratio is at the higher end of acceptable range. ';
    } else {
      analysis += 'High debt-to-income ratio may limit loan approval. ';
    }
  }

  // Market condition impact
  if (marketCondition === 'Strong') {
    analysis += 'Strong market conditions support property values and lending. ';
  } else if (marketCondition === 'Weak' || marketCondition === 'Declining') {
    analysis += 'Market conditions may affect property values and lending terms. ';
  }

  // Loan type specific analysis
  if (loanType === 'FHA') {
    analysis += 'FHA loan provides flexibility with lower down payment requirements. ';
  } else if (loanType === 'VA') {
    analysis += 'VA loan offers favorable terms for eligible borrowers. ';
  } else if (loanType === 'Conventional') {
    analysis += 'Conventional loan provides standard terms and flexibility. ';
  }

  // Occupancy impact
  if (occupancyType === 'Investment Property') {
    analysis += 'Investment property financing typically requires higher down payments and stricter terms. ';
  } else if (occupancyType === 'Primary Residence') {
    analysis += 'Primary residence financing offers the most favorable terms. ';
  }

  // Overall assessment
  analysis += `Overall lending score: ${lendingScore}/100. `;
  analysis += `Approval probability: ${approvalProbability}%. `;

  if (approvalProbability >= 90) {
    analysis += 'Very high likelihood of loan approval with favorable terms.';
  } else if (approvalProbability >= 75) {
    analysis += 'Good probability of approval with standard terms.';
  } else if (approvalProbability >= 60) {
    analysis += 'Moderate approval probability, may require additional documentation or conditions.';
  } else {
    analysis += 'Lower approval probability, consider improving loan profile or exploring alternative financing.';
  }

  return analysis;
}