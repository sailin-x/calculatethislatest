import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';

export interface MezzanineFinancingInputs extends CalculatorInputs {
  projectValue: number;
  seniorDebt: number;
  equityInvestment: number;
  mezzanineAmount: number;
  seniorInterestRate: number;
  mezzanineInterestRate: number;
  mezzanineTerm: number;
  originationFee?: number;
  exitFee?: number;
  warrantCoverage?: number;
  projectType?: string;
  projectStage?: string;
  location?: string;
  sponsorTrackRecord?: string;
  marketCondition?: string;
  preLeasing?: string;
  preLeasingPercentage?: number;
  constructionRisk?: string;
  marketRisk?: string;
  exitStrategy?: string;
  exitTimeline?: number;
  projectedNOI?: number;
  projectedCapRate?: number;
}

export interface MezzanineFinancingOutputs extends CalculatorOutputs {
  totalCapitalization: number;
  seniorLeverage: number;
  mezzanineLeverage: number;
  totalLeverage: number;
  equityPercentage: number;
  mezzanineCost: number;
  totalDebtService: number;
  debtServiceCoverage: number;
  mezzanineYield: number;
  sponsorIRR: number;
  mezzanineIRR: number;
  riskAssessment: string;
  feasibilityScore: number;
  recommendations: string;
  keyMetrics: {
    totalLeverage: number;
    debtServiceCoverage: number;
    mezzanineYield: number;
    sponsorIRR: number;
  };
  mezzanineAnalysis: string;
}

export function calculateMezzanineFinancing(inputs: MezzanineFinancingInputs): MezzanineFinancingOutputs {
  const {
    projectValue,
    seniorDebt,
    equityInvestment,
    mezzanineAmount,
    seniorInterestRate,
    mezzanineInterestRate,
    mezzanineTerm,
    originationFee = 2,
    exitFee = 1,
    warrantCoverage = 10,
    projectType = 'Residential Development',
    projectStage = 'Construction',
    location = 'Primary Market',
    sponsorTrackRecord = 'Experienced',
    marketCondition = 'Stable',
    preLeasing = 'None',
    preLeasingPercentage = 0,
    constructionRisk = 'Moderate',
    marketRisk = 'Moderate',
    exitStrategy = 'Sale',
    exitTimeline = 5,
    projectedNOI = 800000,
    projectedCapRate = 6.5
  } = inputs;

  // Core calculations
  const totalCapitalization = seniorDebt + mezzanineAmount + equityInvestment;
  const seniorLeverage = (seniorDebt / projectValue) * 100;
  const mezzanineLeverage = (mezzanineAmount / projectValue) * 100;
  const totalLeverage = seniorLeverage + mezzanineLeverage;
  const equityPercentage = (equityInvestment / projectValue) * 100;

  // Debt service calculations
  const seniorDebtService = seniorDebt * (seniorInterestRate / 100);
  const mezzanineCost = mezzanineAmount * (mezzanineInterestRate / 100);
  const totalDebtService = seniorDebtService + mezzanineCost;

  // DSCR calculation
  const debtServiceCoverage = projectedNOI > 0 ? projectedNOI / totalDebtService : 0;

  // Mezzanine yield calculation
  const originationFeeAmount = mezzanineAmount * (originationFee / 100);
  const exitFeeAmount = mezzanineAmount * (exitFee / 100);
  const warrantValue = calculateWarrantValue(mezzanineAmount, warrantCoverage, projectValue, exitTimeline);
  const totalMezzanineReturn = mezzanineCost * mezzanineTerm + originationFeeAmount + exitFeeAmount + warrantValue;
  const mezzanineYield = (totalMezzanineReturn / mezzanineAmount) * 100;

  // IRR calculations
  const sponsorIRR = calculateSponsorIRR(inputs, totalDebtService);
  const mezzanineIRR = calculateMezzanineIRR(inputs, totalMezzanineReturn);

  // Risk assessment
  const riskAssessment = assessRiskLevel(inputs, totalLeverage, debtServiceCoverage);
  const feasibilityScore = calculateFeasibilityScore(inputs, totalLeverage, debtServiceCoverage, mezzanineYield);

  // Generate recommendations
  const recommendations = generateRecommendations(inputs, totalLeverage, debtServiceCoverage, mezzanineYield);

  // Key metrics
  const keyMetrics = {
    totalLeverage,
    debtServiceCoverage,
    mezzanineYield,
    sponsorIRR
  };

  // Comprehensive analysis
  const mezzanineAnalysis = generateMezzanineAnalysis(inputs, {
    totalLeverage,
    mezzanineLeverage,
    debtServiceCoverage,
    mezzanineYield,
    sponsorIRR,
    riskAssessment,
    feasibilityScore
  });

  return {
    totalCapitalization: Math.round(totalCapitalization),
    seniorLeverage: Math.round(seniorLeverage * 100) / 100,
    mezzanineLeverage: Math.round(mezzanineLeverage * 100) / 100,
    totalLeverage: Math.round(totalLeverage * 100) / 100,
    equityPercentage: Math.round(equityPercentage * 100) / 100,
    mezzanineCost: Math.round(mezzanineCost),
    totalDebtService: Math.round(totalDebtService),
    debtServiceCoverage: Math.round(debtServiceCoverage * 100) / 100,
    mezzanineYield: Math.round(mezzanineYield * 100) / 100,
    sponsorIRR: Math.round(sponsorIRR * 100) / 100,
    mezzanineIRR: Math.round(mezzanineIRR * 100) / 100,
    riskAssessment,
    feasibilityScore: Math.round(feasibilityScore),
    recommendations,
    keyMetrics,
    mezzanineAnalysis
  };
}

function calculateWarrantValue(mezzanineAmount: number, warrantCoverage: number, projectValue: number, exitTimeline: number): number {
  // Simplified warrant valuation
  const warrantPercentage = warrantCoverage / 100;
  const warrantEquity = mezzanineAmount * warrantPercentage;
  const projectedGrowth = Math.pow(1.05, exitTimeline); // 5% annual growth assumption
  const warrantValue = warrantEquity * projectedGrowth * 0.3; // 30% of projected value
  return warrantValue;
}

function calculateSponsorIRR(inputs: MezzanineFinancingInputs, totalDebtService: number): number {
  const {
    projectValue,
    equityInvestment,
    projectedNOI,
    projectedCapRate,
    exitTimeline,
    mezzanineTerm
  } = inputs;

  // Simplified IRR calculation
  const annualCashFlow = projectedNOI - totalDebtService;
  const exitValue = projectedNOI / (projectedCapRate / 100);
  const remainingDebt = calculateRemainingDebt(inputs, exitTimeline);
  const netExitProceeds = exitValue - remainingDebt;
  
  // IRR calculation using simplified method
  const totalCashOutflow = equityInvestment;
  const totalCashInflow = (annualCashFlow * exitTimeline) + netExitProceeds;
  const irr = Math.pow(totalCashInflow / totalCashOutflow, 1 / exitTimeline) - 1;
  
  return Math.max(0, irr * 100);
}

function calculateMezzanineIRR(inputs: MezzanineFinancingInputs, totalMezzanineReturn: number): number {
  const { mezzanineAmount, mezzanineTerm } = inputs;
  
  // Simplified IRR calculation for mezzanine lender
  const irr = Math.pow((totalMezzanineReturn + mezzanineAmount) / mezzanineAmount, 1 / mezzanineTerm) - 1;
  return Math.max(0, irr * 100);
}

function calculateRemainingDebt(inputs: MezzanineFinancingInputs, exitTimeline: number): number {
  const { seniorDebt, mezzanineAmount, seniorInterestRate, mezzanineInterestRate, mezzanineTerm } = inputs;
  
  // Simplified remaining debt calculation
  const seniorRemaining = seniorDebt; // Assume interest-only or minimal principal reduction
  const mezzanineRemaining = exitTimeline <= mezzanineTerm ? mezzanineAmount : 0;
  
  return seniorRemaining + mezzanineRemaining;
}

function assessRiskLevel(inputs: MezzanineFinancingInputs, totalLeverage: number, debtServiceCoverage: number): string {
  let riskScore = 0;
  
  // Leverage risk
  if (totalLeverage >= 85) riskScore += 30;
  else if (totalLeverage >= 80) riskScore += 20;
  else if (totalLeverage >= 75) riskScore += 10;
  else if (totalLeverage >= 70) riskScore += 5;
  
  // DSCR risk
  if (debtServiceCoverage < 1.1) riskScore += 25;
  else if (debtServiceCoverage < 1.2) riskScore += 15;
  else if (debtServiceCoverage < 1.3) riskScore += 10;
  else if (debtServiceCoverage < 1.4) riskScore += 5;
  
  // Project stage risk
  if (inputs.projectStage === 'Pre-Development') riskScore += 20;
  else if (inputs.projectStage === 'Construction') riskScore += 15;
  else if (inputs.projectStage === 'Value-Add') riskScore += 10;
  
  // Location risk
  if (inputs.location === 'Tertiary Market') riskScore += 15;
  else if (inputs.location === 'Secondary Market') riskScore += 10;
  
  // Sponsor risk
  if (inputs.sponsorTrackRecord === 'First-Time') riskScore += 20;
  else if (inputs.sponsorTrackRecord === 'Experienced') riskScore += 5;
  
  // Market condition risk
  if (inputs.marketCondition === 'Weak' || inputs.marketCondition === 'Declining') riskScore += 15;
  else if (inputs.marketCondition === 'Volatile') riskScore += 10;
  
  // Pre-leasing risk
  if (inputs.preLeasing === 'None') riskScore += 15;
  else if (inputs.preLeasing === 'Partial') riskScore += 10;
  
  // Construction risk
  if (inputs.constructionRisk === 'High' || inputs.constructionRisk === 'Very High') riskScore += 15;
  
  // Market risk
  if (inputs.marketRisk === 'High' || inputs.marketRisk === 'Very High') riskScore += 15;
  
  if (riskScore >= 60) return 'High Risk';
  if (riskScore >= 40) return 'Higher Risk';
  if (riskScore >= 25) return 'Moderate Risk';
  if (riskScore >= 15) return 'Low Risk';
  return 'Very Low Risk';
}

function calculateFeasibilityScore(inputs: MezzanineFinancingInputs, totalLeverage: number, debtServiceCoverage: number, mezzanineYield: number): number {
  let score = 100;
  
  // Leverage impact
  if (totalLeverage >= 85) score -= 25;
  else if (totalLeverage >= 80) score -= 15;
  else if (totalLeverage >= 75) score -= 10;
  else if (totalLeverage >= 70) score -= 5;
  
  // DSCR impact
  if (debtServiceCoverage < 1.1) score -= 30;
  else if (debtServiceCoverage < 1.2) score -= 20;
  else if (debtServiceCoverage < 1.3) score -= 10;
  else if (debtServiceCoverage >= 1.4) score += 5;
  
  // Mezzanine yield impact (higher yield = higher risk)
  if (mezzanineYield >= 20) score -= 20;
  else if (mezzanineYield >= 15) score -= 10;
  else if (mezzanineYield >= 12) score -= 5;
  else if (mezzanineYield <= 10) score += 5;
  
  // Project stage impact
  if (inputs.projectStage === 'Pre-Development') score -= 15;
  else if (inputs.projectStage === 'Construction') score -= 10;
  else if (inputs.projectStage === 'Stabilization') score += 5;
  
  // Location impact
  if (inputs.location === 'Primary Market') score += 10;
  else if (inputs.location === 'Secondary Market') score -= 5;
  else if (inputs.location === 'Tertiary Market') score -= 15;
  
  // Sponsor track record impact
  if (inputs.sponsorTrackRecord === 'Top-Tier' || inputs.sponsorTrackRecord === 'Institutional') score += 15;
  else if (inputs.sponsorTrackRecord === 'Seasoned') score += 10;
  else if (inputs.sponsorTrackRecord === 'Experienced') score += 5;
  else if (inputs.sponsorTrackRecord === 'First-Time') score -= 15;
  
  // Market condition impact
  if (inputs.marketCondition === 'Strong') score += 10;
  else if (inputs.marketCondition === 'Stable') score += 5;
  else if (inputs.marketCondition === 'Weak' || inputs.marketCondition === 'Declining') score -= 15;
  
  // Pre-leasing impact
  if (inputs.preLeasing === 'Fully Leased') score += 15;
  else if (inputs.preLeasing === 'Substantial') score += 10;
  else if (inputs.preLeasing === 'Partial') score += 5;
  else if (inputs.preLeasing === 'None') score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function generateRecommendations(inputs: MezzanineFinancingInputs, totalLeverage: number, debtServiceCoverage: number, mezzanineYield: number): string {
  const recommendations: string[] = [];
  
  if (totalLeverage > 85) {
    recommendations.push('Consider reducing total leverage to improve financing terms and reduce risk.');
  }
  
  if (debtServiceCoverage < 1.2) {
    recommendations.push('Improve debt service coverage through additional equity or reduced debt.');
  }
  
  if (mezzanineYield > 18) {
    recommendations.push('High mezzanine yield indicates elevated risk. Consider additional equity or improved project fundamentals.');
  }
  
  if (inputs.projectStage === 'Pre-Development') {
    recommendations.push('Pre-development projects carry higher risk. Consider additional equity or securing pre-leasing commitments.');
  }
  
  if (inputs.location === 'Tertiary Market') {
    recommendations.push('Tertiary market locations may require additional equity or reduced leverage.');
  }
  
  if (inputs.sponsorTrackRecord === 'First-Time') {
    recommendations.push('First-time sponsors may need additional equity or co-sponsor arrangements.');
  }
  
  if (inputs.preLeasing === 'None') {
    recommendations.push('Secure pre-leasing commitments to improve financing terms and reduce risk.');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Strong mezzanine financing structure. Consider optimizing terms based on market conditions.');
  }
  
  return recommendations.join(' ');
}

export function generateMezzanineFinancingAnalysis(
  inputs: MezzanineFinancingInputs,
  outputs: Partial<MezzanineFinancingOutputs>
): string {
  const {
    projectValue,
    seniorDebt,
    mezzanineAmount,
    equityInvestment,
    projectType = 'Residential Development',
    projectStage = 'Construction',
    location = 'Primary Market',
    sponsorTrackRecord = 'Experienced',
    marketCondition = 'Stable',
    preLeasing = 'None'
  } = inputs;

  const {
    totalLeverage = 0,
    mezzanineLeverage = 0,
    debtServiceCoverage = 0,
    mezzanineYield = 0,
    sponsorIRR = 0,
    riskAssessment = 'Unknown',
    feasibilityScore = 0
  } = outputs;

  let analysis = `The ${totalLeverage.toFixed(1)}% total leverage structure `;

  // Leverage analysis
  if (totalLeverage <= 70) {
    analysis += 'provides conservative financing with low risk profile. ';
  } else if (totalLeverage <= 80) {
    analysis += 'offers optimal capital efficiency while maintaining reasonable risk levels. ';
  } else if (totalLeverage <= 85) {
    analysis += 'represents aggressive financing that requires strong project fundamentals. ';
  } else {
    analysis += 'indicates very high leverage that may limit financing options and increase costs. ';
  }

  // Capital stack analysis
  analysis += `The capital stack includes $${seniorDebt.toLocaleString()} in senior debt (${(seniorDebt/projectValue*100).toFixed(1)}%), $${mezzanineAmount.toLocaleString()} in mezzanine financing (${mezzanineLeverage.toFixed(1)}%), and $${equityInvestment.toLocaleString()} in equity (${(equityInvestment/projectValue*100).toFixed(1)}%). `;

  // DSCR analysis
  if (debtServiceCoverage >= 1.4) {
    analysis += 'Excellent debt service coverage provides strong cash flow protection. ';
  } else if (debtServiceCoverage >= 1.25) {
    analysis += 'Good debt service coverage indicates adequate cash flow for debt obligations. ';
  } else if (debtServiceCoverage >= 1.15) {
    analysis += 'Moderate debt service coverage requires careful cash flow monitoring. ';
  } else {
    analysis += 'Tight debt service coverage may require additional equity or improved cash flow projections. ';
  }

  // Mezzanine yield analysis
  if (mezzanineYield <= 12) {
    analysis += 'Attractive mezzanine yield indicates strong project fundamentals and lower risk. ';
  } else if (mezzanineYield <= 16) {
    analysis += 'Moderate mezzanine yield reflects balanced risk-return profile. ';
  } else {
    analysis += 'High mezzanine yield indicates elevated risk and may require additional equity consideration. ';
  }

  // Project-specific analysis
  analysis += `The ${projectType} project in ${location} `;
  
  if (projectStage === 'Pre-Development') {
    analysis += 'carries higher risk due to pre-development stage. ';
  } else if (projectStage === 'Construction') {
    analysis += 'is in construction phase with moderate risk profile. ';
  } else if (projectStage === 'Stabilization') {
    analysis += 'is approaching stabilization with lower risk profile. ';
  }

  // Sponsor analysis
  if (sponsorTrackRecord === 'Top-Tier' || sponsorTrackRecord === 'Institutional') {
    analysis += 'Top-tier sponsor track record significantly reduces execution risk. ';
  } else if (sponsorTrackRecord === 'Seasoned') {
    analysis += 'Seasoned sponsor experience provides confidence in project execution. ';
  } else if (sponsorTrackRecord === 'First-Time') {
    analysis += 'First-time sponsor may require additional oversight or co-sponsor arrangements. ';
  }

  // Market condition analysis
  if (marketCondition === 'Strong') {
    analysis += 'Strong market conditions support project success and exit strategies. ';
  } else if (marketCondition === 'Stable') {
    analysis += 'Stable market conditions provide reasonable project outlook. ';
  } else if (marketCondition === 'Weak' || marketCondition === 'Declining') {
    analysis += 'Challenging market conditions require careful risk assessment and contingency planning. ';
  }

  // Pre-leasing analysis
  if (preLeasing === 'Fully Leased') {
    analysis += 'Full pre-leasing significantly reduces leasing risk and improves financing terms. ';
  } else if (preLeasing === 'Substantial') {
    analysis += 'Substantial pre-leasing provides good leasing momentum and reduces risk. ';
  } else if (preLeasing === 'None') {
    analysis += 'No pre-leasing increases leasing risk and may require additional equity consideration. ';
  }

  // Overall assessment
  analysis += `Overall risk assessment: ${riskAssessment}. `;
  analysis += `Feasibility score: ${feasibilityScore}/100. `;
  analysis += `Projected sponsor IRR: ${sponsorIRR.toFixed(1)}%. `;

  if (feasibilityScore >= 80) {
    analysis += 'Excellent project feasibility with strong financing structure.';
  } else if (feasibilityScore >= 70) {
    analysis += 'Good project feasibility with reasonable risk-return profile.';
  } else if (feasibilityScore >= 60) {
    analysis += 'Moderate project feasibility requiring careful risk management.';
  } else {
    analysis += 'Lower project feasibility that may require structural changes or additional equity.';
  }

  return analysis;
}