import { OpportunityZoneInvestmentInputs, OpportunityZoneInvestmentMetrics, OpportunityZoneInvestmentAnalysis } from './types';

export function calculateTaxDeferralBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  if (!inputs.taxDeferral) return 0;

  const originalTax = inputs.originalGainAmount * inputs.investorTaxRate / 100;
  return originalTax * (inputs.deferralPercentage / 100);
}

export function calculateTaxExclusionBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  if (!inputs.taxExclusion) return 0;

  const gainAfterDeferral = inputs.originalGainAmount - calculateTaxDeferralBenefit(inputs);
  return gainAfterDeferral * (inputs.exclusionPercentage / 100);
}

export function calculateBasisStepUpBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  if (!inputs.basisStepUp) return 0;

  const basisIncrease = inputs.investmentAmount * (inputs.basisStepUpPercentage / 100);
  return basisIncrease * inputs.investorTaxRate / 100;
}

export function calculateTotalTaxBenefit(inputs: OpportunityZoneInvestmentInputs): number {
  return calculateTaxDeferralBenefit(inputs) +
         calculateTaxExclusionBenefit(inputs) +
         calculateBasisStepUpBenefit(inputs);
}

export function calculateEffectiveTaxRate(inputs: OpportunityZoneInvestmentInputs): number {
  const totalTaxBenefit = calculateTotalTaxBenefit(inputs);
  const originalTax = inputs.originalGainAmount * inputs.investorTaxRate / 100;

  return originalTax > 0 ? ((originalTax - totalTaxBenefit) / originalTax) * 100 : 0;
}

export function calculateTotalReturn(inputs: OpportunityZoneInvestmentInputs): number {
  let totalReturn = inputs.expectedCashFlow * inputs.analysisPeriod;

  // Add appreciation
  const appreciation = inputs.expectedExitValue - inputs.investmentAmount;
  totalReturn += appreciation;

  return totalReturn;
}

export function calculateAnnualizedReturn(inputs: OpportunityZoneInvestmentInputs): number {
  const totalReturn = calculateTotalReturn(inputs);
  const totalReturnPercentage = (totalReturn / inputs.investmentAmount) * 100;

  return totalReturnPercentage / inputs.analysisPeriod;
}

export function calculateInternalRateOfReturn(inputs: OpportunityZoneInvestmentInputs): number {
  // Simplified IRR calculation
  const totalReturn = calculateTotalReturn(inputs);
  const totalCashFlow = inputs.expectedCashFlow * inputs.analysisPeriod;

  if (totalCashFlow <= 0) return 0;

  const averageReturn = (totalReturn / inputs.investmentAmount) / inputs.analysisPeriod;
  return averageReturn * 100;
}

export function calculateNetPresentValue(inputs: OpportunityZoneInvestmentInputs): number {
  const discountRate = inputs.discountRate / 100;
  let npv = -inputs.investmentAmount;

  // Add present value of cash flows
  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    npv += inputs.expectedCashFlow / Math.pow(1 + discountRate, year);
  }

  // Add present value of exit
  npv += inputs.expectedExitValue / Math.pow(1 + discountRate, inputs.analysisPeriod);

  return npv;
}

export function calculatePaybackPeriod(inputs: OpportunityZoneInvestmentInputs): number {
  const annualCashFlow = inputs.expectedCashFlow;

  if (annualCashFlow <= 0) return Infinity;

  return inputs.investmentAmount / annualCashFlow;
}

export function calculateAnnualCashFlow(inputs: OpportunityZoneInvestmentInputs): number {
  return inputs.expectedCashFlow;
}

export function calculateTotalCashFlow(inputs: OpportunityZoneInvestmentInputs): number {
  return inputs.expectedCashFlow * inputs.analysisPeriod;
}

export function calculateCashOnCashReturn(inputs: OpportunityZoneInvestmentInputs): number {
  return inputs.investmentAmount > 0 ? (inputs.expectedCashFlow / inputs.investmentAmount) * 100 : 0;
}

export function calculateEquityMultiple(inputs: OpportunityZoneInvestmentInputs): number {
  const totalReturn = calculateTotalReturn(inputs);
  return inputs.investmentAmount > 0 ? totalReturn / inputs.investmentAmount : 0;
}

export function calculateTaxSavings(inputs: OpportunityZoneInvestmentInputs): number {
  return calculateTotalTaxBenefit(inputs);
}

export function calculateAfterTaxReturn(inputs: OpportunityZoneInvestmentInputs): number {
  const totalReturn = calculateTotalReturn(inputs);
  const taxSavings = calculateTaxSavings(inputs);

  return totalReturn + taxSavings;
}

export function calculateTaxEfficiency(inputs: OpportunityZoneInvestmentInputs): number {
  const afterTaxReturn = calculateAfterTaxReturn(inputs);
  const totalReturn = calculateTotalReturn(inputs);

  return totalReturn > 0 ? (afterTaxReturn / totalReturn) * 100 : 0;
}

export function calculateTaxAdvantage(inputs: OpportunityZoneInvestmentInputs): number {
  const taxSavings = calculateTaxSavings(inputs);
  const originalTax = inputs.originalGainAmount * inputs.investorTaxRate / 100;

  return originalTax > 0 ? (taxSavings / originalTax) * 100 : 0;
}

export function calculateRiskScore(inputs: OpportunityZoneInvestmentInputs): number {
  let score = 0;

  // Market risk
  if (inputs.marketRisk === 'high') score += 30;
  else if (inputs.marketRisk === 'medium') score += 15;

  // Regulatory risk
  if (inputs.regulatoryRisk === 'high') score += 25;
  else if (inputs.regulatoryRisk === 'medium') score += 12;

  // Liquidity risk
  if (inputs.liquidityRisk === 'high') score += 20;
  else if (inputs.liquidityRisk === 'medium') score += 10;

  // Development risk
  if (inputs.developmentRisk === 'high') score += 25;
  else if (inputs.developmentRisk === 'medium') score += 12;

  // Market condition
  if (inputs.marketCondition === 'declining') score += 15;
  else if (inputs.marketCondition === 'hot') score += 8;

  return Math.min(100, score);
}

export function calculateProbabilityOfSuccess(inputs: OpportunityZoneInvestmentInputs): number {
  const riskScore = calculateRiskScore(inputs);
  const irr = calculateInternalRateOfReturn(inputs);

  let probability = 50;

  // Risk factor
  probability -= riskScore * 0.4;

  // Return factor
  if (irr > 15) probability += 20;
  else if (irr > 10) probability += 10;
  else if (irr < 5) probability -= 15;

  // Market factor
  if (inputs.marketCondition === 'growing') probability += 15;
  else if (inputs.marketCondition === 'hot') probability += 10;

  return Math.max(0, Math.min(100, probability));
}

export function calculateWorstCaseScenario(inputs: OpportunityZoneInvestmentInputs): number {
  const reducedCashFlow = inputs.expectedCashFlow * 0.7;
  const reducedExitValue = inputs.expectedExitValue * 0.8;
  const reducedTaxBenefits = calculateTotalTaxBenefit(inputs) * 0.5;

  const worstInputs = {
    ...inputs,
    expectedCashFlow: reducedCashFlow,
    expectedExitValue: reducedExitValue
  };

  return calculateTotalReturn(worstInputs) + reducedTaxBenefits;
}

export function calculateBestCaseScenario(inputs: OpportunityZoneInvestmentInputs): number {
  const increasedCashFlow = inputs.expectedCashFlow * 1.3;
  const increasedExitValue = inputs.expectedExitValue * 1.2;
  const fullTaxBenefits = calculateTotalTaxBenefit(inputs);

  const bestInputs = {
    ...inputs,
    expectedCashFlow: increasedCashFlow,
    expectedExitValue: increasedExitValue
  };

  return calculateTotalReturn(bestInputs) + fullTaxBenefits;
}

export function calculateComparisonAnalysis(inputs: OpportunityZoneInvestmentInputs): Array<{
  metric: string;
  opportunityZone: number;
  traditional: number;
  difference: number;
  advantage: string;
}> {
  const analysis = [];
  const ozReturn = calculateTotalReturn(inputs) + calculateTotalTaxBenefit(inputs);
  const traditionalReturn = calculateTotalReturn(inputs); // Without tax benefits

  // Total Return
  analysis.push({
    metric: 'Total Return',
    opportunityZone: ozReturn,
    traditional: traditionalReturn,
    difference: ozReturn - traditionalReturn,
    advantage: ozReturn > traditionalReturn ? 'Opportunity Zone' : 'Traditional'
  });

  // Tax Efficiency
  const ozTaxEfficiency = calculateTaxEfficiency(inputs);
  analysis.push({
    metric: 'Tax Efficiency',
    opportunityZone: ozTaxEfficiency,
    traditional: 70, // Assumed traditional tax efficiency
    difference: ozTaxEfficiency - 70,
    advantage: ozTaxEfficiency > 70 ? 'Opportunity Zone' : 'Traditional'
  });

  // Risk-Adjusted Return
  const ozRiskAdjusted = ozReturn / (calculateRiskScore(inputs) + 1);
  const traditionalRiskAdjusted = traditionalReturn / 50; // Assumed traditional risk score
  analysis.push({
    metric: 'Risk-Adjusted Return',
    opportunityZone: ozRiskAdjusted,
    traditional: traditionalRiskAdjusted,
    difference: ozRiskAdjusted - traditionalRiskAdjusted,
    advantage: ozRiskAdjusted > traditionalRiskAdjusted ? 'Opportunity Zone' : 'Traditional'
  });

  return analysis;
}

export function calculateSensitivityMatrix(inputs: OpportunityZoneInvestmentInputs): Array<{
  variable: string;
  values: number[];
  impacts: number[];
}> {
  const matrix = [];

  // Exit value sensitivity
  const exitValues = [inputs.expectedExitValue * 0.8, inputs.expectedExitValue, inputs.expectedExitValue * 1.2];
  const exitImpacts = exitValues.map(value => {
    const testInputs = { ...inputs, expectedExitValue: value };
    return calculateTotalReturn(testInputs) - calculateTotalReturn(inputs);
  });

  matrix.push({
    variable: 'Exit Value',
    values: exitValues,
    impacts: exitImpacts
  });

  // Cash flow sensitivity
  const cashFlowValues = [inputs.expectedCashFlow * 0.8, inputs.expectedCashFlow, inputs.expectedCashFlow * 1.2];
  const cashFlowImpacts = cashFlowValues.map(value => {
    const testInputs = { ...inputs, expectedCashFlow: value };
    return calculateTotalReturn(testInputs) - calculateTotalReturn(inputs);
  });

  matrix.push({
    variable: 'Annual Cash Flow',
    values: cashFlowValues,
    impacts: cashFlowImpacts
  });

  return matrix;
}

export function calculateScenarios(inputs: OpportunityZoneInvestmentInputs): Array<{
  scenario: string;
  probability: number;
  roi: number;
  irr: number;
  taxBenefit: number;
}> {
  const scenarios = [];

  // Base case
  scenarios.push({
    scenario: 'Base Case',
    probability: 0.4,
    roi: calculateAnnualizedReturn(inputs),
    irr: calculateInternalRateOfReturn(inputs),
    taxBenefit: calculateTotalTaxBenefit(inputs)
  });

  // Bull market scenario
  const bullInputs = {
    ...inputs,
    expectedExitValue: inputs.expectedExitValue * 1.3,
    expectedCashFlow: inputs.expectedCashFlow * 1.1
  };
  scenarios.push({
    scenario: 'Bull Market',
    probability: 0.3,
    roi: calculateAnnualizedReturn(bullInputs),
    irr: calculateInternalRateOfReturn(bullInputs),
    taxBenefit: calculateTotalTaxBenefit(bullInputs)
  });

  // Bear market scenario
  const bearInputs = {
    ...inputs,
    expectedExitValue: inputs.expectedExitValue * 0.7,
    expectedCashFlow: inputs.expectedCashFlow * 0.8
  };
  scenarios.push({
    scenario: 'Bear Market',
    probability: 0.2,
    roi: calculateAnnualizedReturn(bearInputs),
    irr: calculateInternalRateOfReturn(bearInputs),
    taxBenefit: calculateTotalTaxBenefit(bearInputs)
  });

  // Regulatory change scenario
  const regulatoryInputs = {
    ...inputs,
    exclusionPercentage: inputs.exclusionPercentage * 0.7,
    basisStepUpPercentage: inputs.basisStepUpPercentage * 0.7
  };
  scenarios.push({
    scenario: 'Regulatory Change',
    probability: 0.1,
    roi: calculateAnnualizedReturn(regulatoryInputs),
    irr: calculateInternalRateOfReturn(regulatoryInputs),
    taxBenefit: calculateTotalTaxBenefit(regulatoryInputs)
  });

  return scenarios;
}

export function calculateTimelineAnalysis(inputs: OpportunityZoneInvestmentInputs): Array<{
  year: number;
  investment: number;
  cashFlow: number;
  taxBenefit: number;
  totalValue: number;
}> {
  const analysis = [];
  let cumulativeCashFlow = 0;
  let cumulativeTaxBenefit = 0;

  for (let year = 1; year <= inputs.analysisPeriod; year++) {
    cumulativeCashFlow += inputs.expectedCashFlow;

    // Tax benefits accrue over time
    if (year <= inputs.deferralPeriod) {
      cumulativeTaxBenefit += calculateTaxDeferralBenefit(inputs) / inputs.deferralPeriod;
    }
    if (year >= inputs.exclusionPeriod) {
      cumulativeTaxBenefit += calculateTaxExclusionBenefit(inputs) / (inputs.analysisPeriod - inputs.exclusionPeriod + 1);
    }
    if (year >= inputs.basisStepUpPeriod) {
      cumulativeTaxBenefit += calculateBasisStepUpBenefit(inputs) / (inputs.analysisPeriod - inputs.basisStepUpPeriod + 1);
    }

    const totalValue = inputs.investmentAmount + cumulativeCashFlow + cumulativeTaxBenefit;

    analysis.push({
      year,
      investment: inputs.investmentAmount,
      cashFlow: cumulativeCashFlow,
      taxBenefit: cumulativeTaxBenefit,
      totalValue
    });
  }

  return analysis;
}

export function calculateMarketAnalysis(inputs: OpportunityZoneInvestmentInputs): Array<{
  factor: string;
  impact: number;
  risk: string;
  opportunity: string;
}> {
  const analysis = [];

  // Market growth
  analysis.push({
    factor: 'Market Growth',
    impact: inputs.marketGrowthRate,
    risk: inputs.marketGrowthRate < 2 ? 'High' : 'Low',
    opportunity: inputs.marketGrowthRate > 4 ? 'High' : 'Moderate'
  });

  // Property appreciation
  analysis.push({
    factor: 'Property Appreciation',
    impact: inputs.expectedAppreciation,
    risk: inputs.expectedAppreciation < 3 ? 'High' : 'Low',
    opportunity: inputs.expectedAppreciation > 6 ? 'High' : 'Moderate'
  });

  // Regulatory stability
  analysis.push({
    factor: 'Regulatory Stability',
    impact: inputs.regulatoryRisk === 'low' ? 8 : inputs.regulatoryRisk === 'medium' ? 5 : 2,
    risk: inputs.regulatoryRisk,
    opportunity: inputs.regulatoryRisk === 'low' ? 'High' : 'Low'
  });

  return analysis;
}

export function generateOpportunityZoneInvestmentAnalysis(inputs: OpportunityZoneInvestmentInputs, metrics: OpportunityZoneInvestmentMetrics): OpportunityZoneInvestmentAnalysis {
  const irr = calculateInternalRateOfReturn(inputs);
  const taxBenefit = calculateTotalTaxBenefit(inputs);
  const riskScore = calculateRiskScore(inputs);

  let investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor';
  if (irr > 20 && taxBenefit > 100000) investmentRating = 'Excellent';
  else if (irr > 15 && taxBenefit > 50000) investmentRating = 'Good';
  else if (irr > 10 && taxBenefit > 25000) investmentRating = 'Average';
  else if (irr > 5) investmentRating = 'Poor';
  else investmentRating = 'Very Poor';

  let taxBenefitRating: 'High Benefit' | 'Good Benefit' | 'Moderate Benefit' | 'Low Benefit' | 'No Benefit';
  if (taxBenefit > 100000) taxBenefitRating = 'High Benefit';
  else if (taxBenefit > 50000) taxBenefitRating = 'Good Benefit';
  else if (taxBenefit > 25000) taxBenefitRating = 'Moderate Benefit';
  else if (taxBenefit > 0) taxBenefitRating = 'Low Benefit';
  else taxBenefitRating = 'No Benefit';

  const recommendation = irr > 12 && taxBenefit > 30000 ? 'Proceed' :
                        irr > 8 && taxBenefit > 15000 ? 'Consider' : 'Reconsider';

  return {
    investmentRating,
    taxBenefitRating,
    recommendation,
    keyStrengths: [
      `IRR: ${irr.toFixed(1)}%`,
      `Tax benefits: $${taxBenefit.toLocaleString()}`,
      `Cash flow: $${metrics.annualCashFlow.toLocaleString()}`
    ],
    keyWeaknesses: [
      `Risk score: ${riskScore}`,
      `Payback period: ${metrics.paybackPeriod.toFixed(1)} years`,
      `Market condition: ${inputs.marketCondition}`
    ],
    valueFactors: [
      'Tax deferral benefits',
      'Capital gains exclusion',
      'Basis step-up advantages',
      'Investment returns'
    ],
    opportunities: [
      'Tax-advantaged growth',
      'Capital appreciation potential',
      'Cash flow generation',
      'Portfolio diversification'
    ],
    investmentSummary: `Opportunity Zone investment analysis shows ${investmentRating.toLowerCase()} rating with ${irr.toFixed(1)}% IRR and $${taxBenefit.toLocaleString()} in tax benefits.`,
    returnAnalysis: `Return analysis indicates ${irr.toFixed(1)}% IRR with ${metrics.annualizedReturn.toFixed(1)}% annualized return and $${metrics.totalReturn.toLocaleString()} total return.`,
    cashFlowAnalysis: `Cash flow analysis shows $${metrics.annualCashFlow.toLocaleString()} annual cash flow with ${metrics.cashOnCashReturn.toFixed(1)}% cash-on-cash return.`,
    taxBenefitSummary: `Tax benefit analysis indicates $${taxBenefit.toLocaleString()} total tax benefits with ${metrics.taxAdvantage.toFixed(1)}% tax advantage.`,
    deferralAnalysis: `Tax deferral analysis shows $${metrics.taxDeferralBenefit.toLocaleString()} deferral benefit over ${inputs.deferralPeriod} year period.`,
    exclusionAnalysis: `Tax exclusion analysis indicates $${metrics.taxExclusionBenefit.toLocaleString()} exclusion benefit with ${inputs.exclusionPercentage}% exclusion rate.`,
    basisStepUpAnalysis: `Basis step-up analysis shows $${metrics.basisStepUpBenefit.toLocaleString()} basis increase with ${inputs.basisStepUpPercentage}% step-up rate.`,
    riskAssessment: `Overall risk assessment of ${riskScore} with ${metrics.probabilityOfSuccess.toFixed(1)}% probability of success.`,
    marketRisk: `Market risk assessment for ${inputs.marketLocation} with ${inputs.marketCondition} conditions and ${inputs.marketGrowthRate}% growth rate.`,
    regulatoryRisk: `Regulatory risk assessment based on ${inputs.regulatoryRisk} risk level and ${inputs.opportunityZoneTier} designation.`,
    liquidityRisk: `Liquidity risk assessment based on ${inputs.liquidityRisk} risk level and ${inputs.investmentStructure} structure.`,
    developmentRisk: `Development risk assessment based on ${inputs.developmentRisk} risk level and ${inputs.investmentType} type.`,
    marketAnalysis: `Market analysis indicates ${inputs.marketCondition} conditions with ${inputs.marketGrowthRate}% growth rate in ${inputs.marketLocation}.`,
    opportunityZoneAnalysis: `Opportunity Zone analysis shows ${inputs.opportunityZoneTier} designation with ${inputs.opportunityZoneBenefits.filter(b => b.applicable).length} applicable benefits.`,
    competitiveAnalysis: `Competitive analysis indicates performance relative to ${inputs.comparableInvestments.length} comparable investments.`,
    comparisonSummary: `Comparison analysis shows ${metrics.comparisonAnalysis.length} key metrics compared to traditional investments.`,
    traditionalComparison: `Traditional investment comparison indicates ${metrics.comparisonAnalysis.find(c => c.metric === 'Total Return')?.advantage} advantage for ${metrics.comparisonAnalysis.find(c => c.metric === 'Total Return')?.advantage === 'Opportunity Zone' ? 'Opportunity Zone' : 'traditional'} investments.`,
    advantageAnalysis: `Advantage analysis shows ${metrics.comparisonAnalysis.filter(c => c.advantage === 'Opportunity Zone').length} metrics favoring Opportunity Zone investments.`,
    timelineSummary: `Timeline analysis covers ${inputs.analysisPeriod} year period with benefits accruing over ${inputs.exclusionPeriod} year exclusion period.`,
    benefitTimeline: `Benefit timeline shows tax deferral for ${inputs.deferralPeriod} years, exclusion after ${inputs.exclusionPeriod} years, and basis step-up after ${inputs.basisStepUpPeriod} years.`,
    exitStrategy: `Exit strategy analysis recommends holding for ${inputs.exclusionPeriod} years to maximize tax benefits.`,
    investmentRecommendations: [
      irr > 15 ? 'Strong investment opportunity with excellent returns' : 'Consider investment with caution',
      taxBenefit > 50000 ? 'Significant tax benefits available' : 'Limited tax advantages'
    ],
    optimizationSuggestions: [
      'Maximize deferral period utilization',
      'Consider basis step-up opportunities',
      'Monitor regulatory changes',
      'Plan exit strategy carefully'
    ],
    riskMitigation: [
      'Diversify across multiple zones',
      'Monitor regulatory developments',
      'Plan for liquidity needs',
      'Assess development risks'
    ],
    implementationPlan: `Implementation plan includes ${recommendation.toLowerCase()} with focus on tax benefit maximization and risk management.`,
    nextSteps: [
      'Complete due diligence on opportunity zone',
      'Consult tax advisor on benefits',
      'Review investment structure options',
      'Assess risk tolerance and timeline'
    ],
    timeline: `${inputs.analysisPeriod} year investment period with ${inputs.exclusionPeriod} year tax benefit horizon.`,
    monitoringPlan: 'Quarterly performance monitoring and annual tax benefit assessment.',
    keyMetrics: [
      'IRR',
      'Tax benefits',
      'Cash flow',
      'Risk score'
    ],
    reviewSchedule: 'Annual investment review and tax planning assessment.',
    riskManagement: `Risk management includes monitoring ${riskScore} risk score and implementing mitigation strategies.`,
    mitigationStrategies: [
      'Regulatory risk monitoring',
      'Market condition assessment',
      'Liquidity planning',
      'Diversification strategy'
    ],
    contingencyPlans: [
      'Regulatory change response',
      'Market downturn planning',
      'Early exit options',
      'Alternative investment backup'
    ],
    performanceBenchmarks: [
      {
        metric: 'IRR',
        target: 12,
        benchmark: irr,
        industry: 'Opportunity Zone Investment'
      },
      {
        metric: 'Tax Benefit',
        target: 50000,
        benchmark: taxBenefit,
        industry: 'Opportunity Zone Investment'
      },
      {
        metric: 'Risk Score',
        target: 40,
        benchmark: riskScore,
        industry: 'Opportunity Zone Investment'
      }
    ],
    decisionRecommendation: `${recommendation} with ${investmentRating.toLowerCase()} investment rating and ${taxBenefitRating.toLowerCase()}.`,
    presentationPoints: [
      `IRR: ${irr.toFixed(1)}%`,
      `Tax Benefits: $${taxBenefit.toLocaleString()}`,
      `Risk Score: ${riskScore}`,
      `Recommendation: ${recommendation}`
    ],
    decisionFactors: [
      'Return potential analysis',
      'Tax benefit evaluation',
      'Risk assessment',
      'Market condition review',
      'Timeline consideration'
    ]
  };
}