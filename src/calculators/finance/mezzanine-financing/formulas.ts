import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

// Project type risk factors
const PROJECT_TYPE_RISK = {
  'Residential': 0.8,
  'Commercial': 1.0,
  'Industrial': 0.9,
  'Mixed-Use': 1.2,
  'Hospitality': 1.3,
  'Healthcare': 0.7,
  'Educational': 0.8,
  'Retail': 1.1,
  'Office': 1.0,
  'Warehouse': 0.8,
  'Multifamily': 0.9,
  'Single Family': 0.7,
  'Land Development': 1.5
};

// Location risk factors
const LOCATION_RISK = {
  'Urban': 1.0,
  'Suburban': 0.9,
  'Rural': 1.2,
  'Downtown': 1.1,
  'Airport Area': 0.8,
  'University Area': 0.9,
  'Medical District': 0.7,
  'Business District': 1.0,
  'Residential Area': 0.8,
  'Industrial Zone': 0.9,
  'Coastal': 1.3,
  'Mountain': 1.1,
  'Desert': 1.2
};

// Market condition factors
const MARKET_CONDITION_FACTORS = {
  'Strong': 0.8,
  'Stable': 1.0,
  'Weak': 1.3,
  'Recovering': 1.1,
  'Declining': 1.4,
  'Volatile': 1.5
};

// Lender type factors
const LENDER_TYPE_FACTORS = {
  'Private Equity': 1.2,
  'Hedge Fund': 1.3,
  'Real Estate Fund': 1.1,
  'Insurance Company': 0.9,
  'Pension Fund': 0.8,
  'Family Office': 1.0,
  'Commercial Bank': 0.9,
  'Investment Bank': 1.1,
  'Credit Union': 0.8,
  'Hard Money Lender': 1.4
};

// Borrower experience factors
const BORROWER_EXPERIENCE_FACTORS = {
  'Novice': 1.4,
  'Experienced': 1.0,
  'Expert': 0.7,
  'Institutional': 0.6
};

// Pre-leasing factors
const PRE_LEASING_FACTORS = {
  'None': 1.3,
  'Partial': 1.1,
  'Substantial': 0.9,
  'Fully Leased': 0.7
};

// Environmental and zoning risk factors
const ENVIRONMENTAL_RISK = {
  'None': 0.8,
  'Minor': 1.0,
  'Moderate': 1.2,
  'Significant': 1.5,
  'Unknown': 1.3
};

const ZONING_RISK = {
  'None': 0.8,
  'Minor': 1.0,
  'Moderate': 1.2,
  'Significant': 1.4,
  'Pending Approval': 1.3
};

// Construction and market risk factors
const CONSTRUCTION_RISK = {
  'Low': 0.8,
  'Moderate': 1.0,
  'High': 1.3,
  'Very High': 1.6
};

const MARKET_RISK = {
  'Low': 0.8,
  'Moderate': 1.0,
  'High': 1.3,
  'Very High': 1.6
};

// Exit strategy factors
const EXIT_STRATEGY_FACTORS = {
  'Sale': 1.0,
  'Refinance': 0.9,
  'Hold': 1.1,
  'IPO': 1.4,
  'Merger': 1.2,
  'Joint Venture': 1.1,
  '1031 Exchange': 0.9
};

// Senior lender approval factors
const SENIOR_LENDER_APPROVAL_FACTORS = {
  'Approved': 0.7,
  'Pending': 1.0,
  'Conditional': 1.2,
  'Denied': 1.8,
  'Not Required': 1.0
};

// Guarantee requirement factors
const GUARANTEE_FACTORS = {
  'None': 1.3,
  'Partial': 1.0,
  'Full': 0.8,
  'Corporate Only': 0.9
};

// Helper function to calculate monthly payment
function calculateMonthlyPayment(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal / (years * 12);
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

// Helper function to calculate risk score
function calculateRiskScore(inputs: CalculatorInputs): number {
  let riskScore = 50; // Base risk score

  // Project type risk
  if (inputs.projectType && PROJECT_TYPE_RISK[inputs.projectType as keyof typeof PROJECT_TYPE_RISK]) {
    riskScore += (PROJECT_TYPE_RISK[inputs.projectType as keyof typeof PROJECT_TYPE_RISK] - 1) * 20;
  }

  // Location risk
  if (inputs.location && LOCATION_RISK[inputs.location as keyof typeof LOCATION_RISK]) {
    riskScore += (LOCATION_RISK[inputs.location as keyof typeof LOCATION_RISK] - 1) * 15;
  }

  // Market condition risk
  if (inputs.marketCondition && MARKET_CONDITION_FACTORS[inputs.marketCondition as keyof typeof MARKET_CONDITION_FACTORS]) {
    riskScore += (MARKET_CONDITION_FACTORS[inputs.marketCondition as keyof typeof MARKET_CONDITION_FACTORS] - 1) * 20;
  }

  // Lender type risk
  if (inputs.lenderType && LENDER_TYPE_FACTORS[inputs.lenderType as keyof typeof LENDER_TYPE_FACTORS]) {
    riskScore += (LENDER_TYPE_FACTORS[inputs.lenderType as keyof typeof LENDER_TYPE_FACTORS] - 1) * 15;
  }

  // Borrower experience risk
  if (inputs.borrowerExperience && BORROWER_EXPERIENCE_FACTORS[inputs.borrowerExperience as keyof typeof BORROWER_EXPERIENCE_FACTORS]) {
    riskScore += (BORROWER_EXPERIENCE_FACTORS[inputs.borrowerExperience as keyof typeof BORROWER_EXPERIENCE_FACTORS] - 1) * 20;
  }

  // Credit score impact
  if (inputs.borrowerCreditScore) {
    if (inputs.borrowerCreditScore < 600) riskScore += 20;
    else if (inputs.borrowerCreditScore < 650) riskScore += 15;
    else if (inputs.borrowerCreditScore < 700) riskScore += 10;
    else if (inputs.borrowerCreditScore < 750) riskScore += 5;
    else if (inputs.borrowerCreditScore >= 800) riskScore -= 10;
  }

  // Pre-leasing risk
  if (inputs.preLeasing && PRE_LEASING_FACTORS[inputs.preLeasing as keyof typeof PRE_LEASING_FACTORS]) {
    riskScore += (PRE_LEASING_FACTORS[inputs.preLeasing as keyof typeof PRE_LEASING_FACTORS] - 1) * 15;
  }

  // Environmental risk
  if (inputs.environmentalIssues && ENVIRONMENTAL_RISK[inputs.environmentalIssues as keyof typeof ENVIRONMENTAL_RISK]) {
    riskScore += (ENVIRONMENTAL_RISK[inputs.environmentalIssues as keyof typeof ENVIRONMENTAL_RISK] - 1) * 15;
  }

  // Zoning risk
  if (inputs.zoningIssues && ZONING_RISK[inputs.zoningIssues as keyof typeof ZONING_RISK]) {
    riskScore += (ZONING_RISK[inputs.zoningIssues as keyof typeof ZONING_RISK] - 1) * 15;
  }

  // Construction risk
  if (inputs.constructionRisk && CONSTRUCTION_RISK[inputs.constructionRisk as keyof typeof CONSTRUCTION_RISK]) {
    riskScore += (CONSTRUCTION_RISK[inputs.constructionRisk as keyof typeof CONSTRUCTION_RISK] - 1) * 20;
  }

  // Market risk
  if (inputs.marketRisk && MARKET_RISK[inputs.marketRisk as keyof typeof MARKET_RISK]) {
    riskScore += (MARKET_RISK[inputs.marketRisk as keyof typeof MARKET_RISK] - 1) * 20;
  }

  // Exit strategy risk
  if (inputs.exitStrategy && EXIT_STRATEGY_FACTORS[inputs.exitStrategy as keyof typeof EXIT_STRATEGY_FACTORS]) {
    riskScore += (EXIT_STRATEGY_FACTORS[inputs.exitStrategy as keyof typeof EXIT_STRATEGY_FACTORS] - 1) * 15;
  }

  // Senior lender approval risk
  if (inputs.seniorLenderApproval && SENIOR_LENDER_APPROVAL_FACTORS[inputs.seniorLenderApproval as keyof typeof SENIOR_LENDER_APPROVAL_FACTORS]) {
    riskScore += (SENIOR_LENDER_APPROVAL_FACTORS[inputs.seniorLenderApproval as keyof typeof SENIOR_LENDER_APPROVAL_FACTORS] - 1) * 25;
  }

  // Guarantee requirement impact
  if (inputs.guaranteeRequired && GUARANTEE_FACTORS[inputs.guaranteeRequired as keyof typeof GUARANTEE_FACTORS]) {
    riskScore += (GUARANTEE_FACTORS[inputs.guaranteeRequired as keyof typeof GUARANTEE_FACTORS] - 1) * 15;
  }

  // Leverage risk
  const totalLeverage = ((inputs.seniorLoanAmount || 0) + (inputs.mezzanineLoanAmount || 0)) / (inputs.projectValue || 1) * 100;
  if (totalLeverage > 90) riskScore += 25;
  else if (totalLeverage > 85) riskScore += 20;
  else if (totalLeverage > 80) riskScore += 15;
  else if (totalLeverage > 75) riskScore += 10;
  else if (totalLeverage < 60) riskScore -= 10;

  return Math.max(0, Math.min(100, riskScore));
}

// Helper function to calculate feasibility score
function calculateFeasibilityScore(riskScore: number, inputs: CalculatorInputs): number {
  let feasibilityScore = 100 - riskScore; // Base feasibility is inverse of risk

  // DSCR impact
  if (inputs.stabilizedNOI) {
    const totalAnnualDebtService = ((inputs.seniorLoanAmount || 0) * (inputs.seniorLoanRate || 0) / 100) + 
                                  ((inputs.mezzanineLoanAmount || 0) * (inputs.mezzanineLoanRate || 0) / 100);
    const dscr = inputs.stabilizedNOI / totalAnnualDebtService;
    
    if (dscr > 2.0) feasibilityScore += 20;
    else if (dscr > 1.5) feasibilityScore += 15;
    else if (dscr > 1.25) feasibilityScore += 10;
    else if (dscr > 1.1) feasibilityScore += 5;
    else if (dscr < 1.0) feasibilityScore -= 20;
  }

  // Project timeline impact
  if (inputs.projectTimeline) {
    if (inputs.projectTimeline <= 12) feasibilityScore += 10;
    else if (inputs.projectTimeline <= 18) feasibilityScore += 5;
    else if (inputs.projectTimeline > 36) feasibilityScore -= 10;
  }

  // Pre-leasing impact
  if (inputs.preLeasingPercentage) {
    if (inputs.preLeasingPercentage >= 80) feasibilityScore += 15;
    else if (inputs.preLeasingPercentage >= 60) feasibilityScore += 10;
    else if (inputs.preLeasingPercentage >= 40) feasibilityScore += 5;
    else if (inputs.preLeasingPercentage < 20) feasibilityScore -= 10;
  }

  return Math.max(0, Math.min(100, feasibilityScore));
}

// Helper function to calculate approval probability
function calculateApprovalProbability(riskScore: number, feasibilityScore: number, inputs: CalculatorInputs): number {
  let probability = (feasibilityScore * 0.6) + ((100 - riskScore) * 0.4);

  // Senior lender approval impact
  if (inputs.seniorLenderApproval === 'Approved') probability += 20;
  else if (inputs.seniorLenderApproval === 'Denied') probability -= 40;
  else if (inputs.seniorLenderApproval === 'Conditional') probability -= 15;

  // Credit score impact
  if (inputs.borrowerCreditScore) {
    if (inputs.borrowerCreditScore >= 750) probability += 15;
    else if (inputs.borrowerCreditScore >= 700) probability += 10;
    else if (inputs.borrowerCreditScore < 600) probability -= 25;
  }

  // Leverage impact
  const totalLeverage = ((inputs.seniorLoanAmount || 0) + (inputs.mezzanineLoanAmount || 0)) / (inputs.projectValue || 1) * 100;
  if (totalLeverage > 90) probability -= 30;
  else if (totalLeverage > 85) probability -= 20;
  else if (totalLeverage > 80) probability -= 10;
  else if (totalLeverage < 70) probability += 10;

  return Math.max(0, Math.min(100, probability));
}

// Helper function to generate recommendation
function generateRecommendation(riskScore: number, feasibilityScore: number, approvalProbability: number, inputs: CalculatorInputs): string {
  if (approvalProbability >= 80) {
    return 'Strongly Recommended - Excellent project fundamentals with high approval probability';
  } else if (approvalProbability >= 65) {
    return 'Recommended - Good project fundamentals with reasonable approval probability';
  } else if (approvalProbability >= 50) {
    return 'Conditionally Recommended - Project has potential but requires improvements';
  } else if (approvalProbability >= 35) {
    return 'Not Recommended - Significant risks and low approval probability';
  } else {
    return 'Strongly Not Recommended - High risk project with very low approval probability';
  }
}

export function calculateMezzanineFinancing(inputs: CalculatorInputs): CalculatorOutputs {
  // Extract inputs with defaults
  const projectValue = inputs.projectValue || 0;
  const seniorLoanAmount = inputs.seniorLoanAmount || 0;
  const mezzanineLoanAmount = inputs.mezzanineLoanAmount || 0;
  const equityInvestment = inputs.equityInvestment || 0;
  const seniorLoanRate = inputs.seniorLoanRate || 0;
  const mezzanineLoanRate = inputs.mezzanineLoanRate || 0;
  const seniorLoanTerm = inputs.seniorLoanTerm || 30;
  const mezzanineLoanTerm = inputs.mezzanineLoanTerm || 5;
  const stabilizedNOI = inputs.stabilizedNOI || 0;
  const exitValue = inputs.exitValue || projectValue * 1.2;
  const exitTimeline = inputs.exitTimeline || 5;
  const mezzanineFees = inputs.mezzanineFees || 0;
  const mezzaninePoints = inputs.mezzaninePoints || 2;
  const prepaymentPenalty = inputs.prepaymentPenalty || 5;

  // Calculate basic metrics
  const totalCapitalization = seniorLoanAmount + mezzanineLoanAmount + equityInvestment;
  const seniorLeverage = (seniorLoanAmount / projectValue) * 100;
  const mezzanineLeverage = (mezzanineLoanAmount / projectValue) * 100;
  const totalLeverage = seniorLeverage + mezzanineLeverage;
  const equityPercentage = (equityInvestment / projectValue) * 100;

  // Calculate monthly payments
  const seniorMonthlyPayment = calculateMonthlyPayment(seniorLoanAmount, seniorLoanRate, seniorLoanTerm);
  const mezzanineMonthlyPayment = calculateMonthlyPayment(mezzanineLoanAmount, mezzanineLoanRate, mezzanineLoanTerm);
  const totalMonthlyPayment = seniorMonthlyPayment + mezzanineMonthlyPayment;

  // Calculate debt service coverage
  const totalAnnualDebtService = totalMonthlyPayment * 12;
  const debtServiceCoverageRatio = stabilizedNOI > 0 ? stabilizedNOI / totalAnnualDebtService : 0;
  const interestCoverageRatio = stabilizedNOI > 0 ? stabilizedNOI / ((seniorLoanAmount * seniorLoanRate / 100) + (mezzanineLoanAmount * mezzanineLoanRate / 100)) : 0;

  // Calculate ratios
  const loanToCostRatio = (totalCapitalization > 0) ? ((seniorLoanAmount + mezzanineLoanAmount) / totalCapitalization) * 100 : 0;
  const loanToValueRatio = totalLeverage;

  // Calculate mezzanine costs
  const mezzaninePointsCost = (mezzanineLoanAmount * mezzaninePoints) / 100;
  const mezzanineCost = mezzanineFees + mezzaninePointsCost;
  const mezzanineCostPercentage = mezzanineLoanAmount > 0 ? (mezzanineCost / mezzanineLoanAmount) * 100 : 0;

  // Calculate total financing cost
  const totalFinancingCost = mezzanineCost + (seniorLoanAmount * 0.01) + (mezzanineLoanAmount * 0.02); // Assuming 1% senior fees, 2% mezzanine fees

  // Calculate weighted average cost
  const totalDebt = seniorLoanAmount + mezzanineLoanAmount;
  const weightedAverageCost = totalDebt > 0 ? 
    ((seniorLoanAmount * seniorLoanRate) + (mezzanineLoanAmount * mezzanineLoanRate)) / totalDebt : 0;

  // Calculate projected returns
  const totalInvestment = equityInvestment + mezzanineFees;
  const projectedGain = exitValue - projectValue;
  const projectedROI = totalInvestment > 0 ? (projectedGain / totalInvestment) * 100 : 0;
  const projectedROE = equityInvestment > 0 ? (projectedGain / equityInvestment) * 100 : 0;

  // Simplified IRR calculation (this would be more complex in practice)
  const projectedIRR = equityInvestment > 0 ? 
    Math.pow((exitValue / equityInvestment), (1 / exitTimeline)) - 1 : 0;

  // Calculate risk and feasibility scores
  const riskScore = calculateRiskScore(inputs);
  const feasibilityScore = calculateFeasibilityScore(riskScore, inputs);
  const approvalProbability = calculateApprovalProbability(riskScore, feasibilityScore, inputs);

  // Generate recommendation
  const recommendation = generateRecommendation(riskScore, feasibilityScore, approvalProbability, inputs);

  // Break-even analysis
  const breakEvenAnalysis = {
    breakEvenNOI: totalAnnualDebtService,
    breakEvenOccupancy: stabilizedNOI > 0 ? (totalAnnualDebtService / stabilizedNOI) * 100 : 0,
    breakEvenTimeline: exitTimeline * (projectValue / exitValue),
    cashFlowBreakEven: totalMonthlyPayment * 12
  };

  // Sensitivity analysis
  const sensitivityAnalysis = {
    valueChange10Percent: {
      irr: projectedIRR * 1.1,
      roe: projectedROE * 1.1,
      roi: projectedROI * 1.1
    },
    valueChangeMinus10Percent: {
      irr: projectedIRR * 0.9,
      roe: projectedROE * 0.9,
      roi: projectedROI * 0.9
    },
    rateChange1Percent: {
      seniorPayment: calculateMonthlyPayment(seniorLoanAmount, seniorLoanRate + 1, seniorLoanTerm),
      mezzaninePayment: calculateMonthlyPayment(mezzanineLoanAmount, mezzanineLoanRate + 1, mezzanineLoanTerm)
    }
  };

  // Key metrics
  const keyMetrics = {
    totalCapitalization,
    seniorLeverage,
    mezzanineLeverage,
    totalLeverage,
    equityPercentage,
    debtServiceCoverageRatio,
    interestCoverageRatio,
    loanToCostRatio,
    loanToValueRatio,
    weightedAverageCost,
    projectedIRR,
    projectedROE,
    projectedROI,
    riskScore,
    feasibilityScore,
    approvalProbability
  };

  return {
    totalCapitalization: Math.round(totalCapitalization),
    seniorLeverage: Math.round(seniorLeverage * 100) / 100,
    mezzanineLeverage: Math.round(mezzanineLeverage * 100) / 100,
    totalLeverage: Math.round(totalLeverage * 100) / 100,
    equityPercentage: Math.round(equityPercentage * 100) / 100,
    seniorMonthlyPayment: Math.round(seniorMonthlyPayment),
    mezzanineMonthlyPayment: Math.round(mezzanineMonthlyPayment),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    debtServiceCoverageRatio: Math.round(debtServiceCoverageRatio * 100) / 100,
    interestCoverageRatio: Math.round(interestCoverageRatio * 100) / 100,
    loanToCostRatio: Math.round(loanToCostRatio * 100) / 100,
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    mezzanineCost: Math.round(mezzanineCost),
    mezzanineCostPercentage: Math.round(mezzanineCostPercentage * 100) / 100,
    totalFinancingCost: Math.round(totalFinancingCost),
    weightedAverageCost: Math.round(weightedAverageCost * 100) / 100,
    projectedIRR: Math.round(projectedIRR * 100) / 100,
    projectedROE: Math.round(projectedROE * 100) / 100,
    projectedROI: Math.round(projectedROI * 100) / 100,
    breakEvenAnalysis,
    sensitivityAnalysis,
    riskScore: Math.round(riskScore),
    feasibilityScore: Math.round(feasibilityScore),
    approvalProbability: Math.round(approvalProbability),
    recommendation,
    keyMetrics,
    mezzanineFinancingAnalysis: 'Comprehensive mezzanine financing analysis completed'
  };
}

export function generateMezzanineFinancingAnalysis(inputs: CalculatorInputs, outputs: CalculatorOutputs): string {
  return `# Mezzanine Financing Analysis

## Executive Summary
**Recommendation:** ${outputs.recommendation}

**Risk Score:** ${outputs.riskScore}/100
**Feasibility Score:** ${outputs.feasibilityScore}/100
**Approval Probability:** ${outputs.approvalProbability}%

## Capital Structure
- **Total Project Value:** $${inputs.projectValue?.toLocaleString()}
- **Senior Loan:** $${inputs.seniorLoanAmount?.toLocaleString()} (${outputs.seniorLeverage}%)
- **Mezzanine Loan:** $${inputs.mezzanineLoanAmount?.toLocaleString()} (${outputs.mezzanineLeverage}%)
- **Equity Investment:** $${inputs.equityInvestment?.toLocaleString()} (${outputs.equityPercentage}%)
- **Total Leverage:** ${outputs.totalLeverage}%

## Debt Service Analysis
- **Senior Monthly Payment:** $${outputs.seniorMonthlyPayment?.toLocaleString()}
- **Mezzanine Monthly Payment:** $${outputs.mezzanineMonthlyPayment?.toLocaleString()}
- **Total Monthly Payment:** $${outputs.totalMonthlyPayment?.toLocaleString()}
- **Debt Service Coverage Ratio:** ${outputs.debtServiceCoverageRatio}
- **Interest Coverage Ratio:** ${outputs.interestCoverageRatio}

## Financing Costs
- **Mezzanine Loan Cost:** $${outputs.mezzanineCost?.toLocaleString()} (${outputs.mezzanineCostPercentage}%)
- **Total Financing Cost:** $${outputs.totalFinancingCost?.toLocaleString()}
- **Weighted Average Cost:** ${outputs.weightedAverageCost}%

## Projected Returns
- **Projected IRR:** ${outputs.projectedIRR}%
- **Projected ROE:** ${outputs.projectedROE}%
- **Projected ROI:** ${outputs.projectedROI}%

## Risk Assessment
- **Risk Score:** ${outputs.riskScore}/100
- **Feasibility Score:** ${outputs.feasibilityScore}/100
- **Approval Probability:** ${outputs.approvalProbability}%

## Break-Even Analysis
- **Break-Even NOI:** $${outputs.breakEvenAnalysis?.breakEvenNOI?.toLocaleString()}
- **Break-Even Occupancy:** ${outputs.breakEvenAnalysis?.breakEvenOccupancy?.toFixed(1)}%
- **Cash Flow Break-Even:** $${outputs.breakEvenAnalysis?.cashFlowBreakEven?.toLocaleString()}

## Key Ratios
- **Loan to Cost Ratio:** ${outputs.loanToCostRatio}%
- **Loan to Value Ratio:** ${outputs.loanToValueRatio}%
- **Total Leverage:** ${outputs.totalLeverage}%

## Project Details
- **Project Type:** ${inputs.projectType || 'Not specified'}
- **Property Type:** ${inputs.propertyType || 'Not specified'}
- **Location:** ${inputs.location || 'Not specified'}
- **Market Condition:** ${inputs.marketCondition || 'Not specified'}
- **Exit Strategy:** ${inputs.exitStrategy || 'Not specified'}

## Recommendations
${outputs.recommendation}

## Next Steps
1. Review risk factors and consider mitigation strategies
2. Evaluate alternative financing structures
3. Assess market conditions and timing
4. Consider additional equity if needed
5. Prepare detailed financial projections
6. Engage with potential mezzanine lenders

## Risk Factors
- **High Leverage:** ${outputs.totalLeverage}% total leverage
- **Market Risk:** ${inputs.marketRisk || 'Not assessed'}
- **Construction Risk:** ${inputs.constructionRisk || 'Not assessed'}
- **Exit Risk:** ${inputs.exitStrategy || 'Not specified'}

## Sensitivity Analysis
- **10% Value Increase:** IRR ${outputs.sensitivityAnalysis?.valueChange10Percent?.irr?.toFixed(2)}%, ROE ${outputs.sensitivityAnalysis?.valueChange10Percent?.roe?.toFixed(2)}%
- **10% Value Decrease:** IRR ${outputs.sensitivityAnalysis?.valueChangeMinus10Percent?.irr?.toFixed(2)}%, ROE ${outputs.sensitivityAnalysis?.valueChangeMinus10Percent?.roe?.toFixed(2)}%
- **1% Rate Increase:** Senior payment $${outputs.sensitivityAnalysis?.rateChange1Percent?.seniorPayment?.toLocaleString()}, Mezzanine payment $${outputs.sensitivityAnalysis?.rateChange1Percent?.mezzaninePayment?.toLocaleString()}
`;
}
