import { AngelInvestmentInputs, AngelInvestmentOutputs, AngelInvestmentMetrics, AngelInvestmentAnalysis } from './types';

export function calculateAngelInvestment(inputs: AngelInvestmentInputs): AngelInvestmentOutputs {
  // Post-money valuation calculation
  const postMoneyValuation = inputs.postMoneyValuation || (inputs.preMoneyValuation + inputs.investmentAmount);
  
  // Equity percentage calculation
  const equityPercentage = inputs.equityPercentage || (inputs.investmentAmount / postMoneyValuation) * 100;
  
  // Valuation multiple calculation
  const valuationMultiple = inputs.revenueMultiple || (postMoneyValuation / inputs.currentRevenue);
  
  // Financial metrics calculations
  const ltvToCacRatio = inputs.customerLifetimeValue / inputs.customerAcquisitionCost;
  const revenueMultiple = postMoneyValuation / inputs.currentRevenue;
  
  // Market analysis calculations
  const marketPenetration = (inputs.currentRevenue / inputs.serviceableAddressableMarket) * 100;
  const marketShare = (inputs.currentRevenue / inputs.totalAddressableMarket) * 100;
  
  // Competitive position calculation (1-10 scale)
  const competitivePosition = calculateCompetitivePosition(inputs);
  
  // Risk score calculation (1-10 scale)
  const riskScore = calculateRiskScore(inputs);
  
  // Probability of success calculation
  const probabilityOfSuccess = calculateProbabilityOfSuccess(inputs);
  
  // Exit scenario calculations
  const exitScenarios = calculateExitScenarios(inputs, equityPercentage);
  
  // Expected return calculations
  const expectedReturn = calculateExpectedReturn(exitScenarios);
  const expectedIRR = calculateIRR(inputs.investmentAmount, expectedReturn, inputs.expectedTimeline);
  const expectedMOIC = expectedReturn / inputs.investmentAmount;
  const riskAdjustedReturn = expectedIRR * (probabilityOfSuccess / 100);
  
  // Generate comprehensive analysis
  const analysis = generateAnalysis(inputs, {
    postMoneyValuation,
    equityPercentage,
    expectedIRR,
    expectedMOIC,
    riskScore,
    probabilityOfSuccess,
    competitivePosition,
    ltvToCacRatio
  });
  
  // Calculate quality metrics
  const dataQuality = assessDataQuality(inputs);
  const modelAccuracy = assessModelAccuracy(inputs);
  const confidenceLevel = calculateConfidenceLevel(inputs, expectedIRR);
  
  return {
    // Investment Analysis
    investmentAmount: inputs.investmentAmount,
    equityReceived: equityPercentage,
    equityPercentage,
    effectivePricePerShare: inputs.preMoneyValuation / 1000000, // Simplified calculation
    
    // Valuation Analysis
    preMoneyValuation: inputs.preMoneyValuation,
    postMoneyValuation,
    impliedValuation: postMoneyValuation,
    valuationMultiple,
    
    // Financial Metrics
    revenueMultiple,
    priceToSalesRatio: revenueMultiple,
    burnRate: inputs.burnRate,
    runway: inputs.runway,
    customerLifetimeValue: inputs.customerLifetimeValue,
    customerAcquisitionCost: inputs.customerAcquisitionCost,
    ltvToCacRatio,
    
    // Market Analysis
    marketPenetration,
    marketShare,
    competitivePosition,
    
    // Risk Metrics
    riskScore,
    riskAdjustedReturn,
    probabilityOfSuccess,
    
    // Return Analysis
    expectedIRR,
    expectedMOIC,
    expectedReturn,
    expectedExitValue: expectedReturn,
    
    // Exit Scenarios
    exitReturns: exitScenarios,
    
    // Sensitivity Analysis
    sensitivityMatrix: [],
    
    // Monte Carlo Results
    monteCarloResults: undefined,
    
    // Comparable Analysis
    comparableMetrics: [],
    
    // Portfolio Impact
    portfolioImpact: {
      sectorAllocation: 0,
      stageAllocation: 0,
      geographicAllocation: 0,
      diversificationScore: 0
    },
    
    // Analysis
    analysis,
    
    // Additional Output Metrics
    dataQuality,
    modelAccuracy,
    confidenceLevel,
    
    // Time Series Analysis
    investmentReturns: [],
    
    // Scenario Analysis
    scenarioAnalysis: [],
    
    // Comparative Analysis
    comparativeAnalysis: [],
    
    // Risk Metrics
    riskMetrics: [],
    
    // Financial Projections
    financialProjections: [],
    
    // Investment Timeline
    investmentTimeline: [],
    
    // Due Diligence Checklist
    dueDiligenceChecklist: [],
    
    // Post-Investment Plan
    postInvestmentPlan: [],
    
    // Exit Planning
    exitPlanning: [],
    
    // Risk Mitigation
    riskMitigation: [],
    
    // Performance Tracking
    performanceTracking: []
  };
}

function calculateCompetitivePosition(inputs: AngelInvestmentInputs): number {
  let score = 5; // Base score
  
  // Team factors
  if (inputs.founderExperience >= 10) score += 2;
  else if (inputs.founderExperience >= 5) score += 1;
  
  if (inputs.technicalTeam) score += 1;
  if (inputs.salesTeam) score += 1;
  if (inputs.marketingTeam) score += 1;
  if (inputs.advisoryBoard) score += 1;
  
  // Product factors
  if (inputs.productStage === 'scaling' || inputs.productStage === 'mature') score += 2;
  else if (inputs.productStage === 'launched') score += 1;
  
  if (inputs.intellectualProperty) score += 1;
  if (inputs.patents && inputs.patents > 0) score += 1;
  
  // Financial factors
  if (inputs.ltvToCacRatio > 3) score += 2;
  else if (inputs.ltvToCacRatio > 1) score += 1;
  
  if (inputs.runway >= 18) score += 1;
  else if (inputs.runway >= 12) score += 0.5;
  
  // Market factors
  if (inputs.marketGrowthRate > 10) score += 1;
  if (inputs.marketPenetration < 1) score += 1; // Room to grow
  
  return Math.min(10, Math.max(1, score));
}

function calculateRiskScore(inputs: AngelInvestmentInputs): number {
  let score = 5; // Base score
  
  // Company stage risk
  if (inputs.companyStage === 'idea') score += 3;
  else if (inputs.companyStage === 'mvp') score += 2;
  else if (inputs.companyStage === 'early_traction') score += 1;
  
  // Financial risk
  if (inputs.runway < 6) score += 2;
  else if (inputs.runway < 12) score += 1;
  
  if (inputs.ltvToCacRatio < 1) score += 2;
  else if (inputs.ltvToCacRatio < 2) score += 1;
  
  // Market risk
  if (inputs.marketConditions === 'bear') score += 1;
  if (inputs.sectorTrends === 'declining') score += 1;
  if (inputs.regulatoryEnvironment === 'unfavorable') score += 1;
  
  // Team risk
  if (inputs.founderExperience < 3) score += 1;
  if (!inputs.technicalTeam) score += 1;
  
  // Due diligence risk
  if (!inputs.financialDueDiligence) score += 1;
  if (!inputs.legalDueDiligence) score += 1;
  
  return Math.min(10, Math.max(1, score));
}

function calculateProbabilityOfSuccess(inputs: AngelInvestmentInputs): number {
  let probability = 50; // Base probability
  
  // Company stage impact
  if (inputs.companyStage === 'mature') probability += 20;
  else if (inputs.companyStage === 'scaling') probability += 15;
  else if (inputs.companyStage === 'product_market_fit') probability += 10;
  else if (inputs.companyStage === 'early_traction') probability += 5;
  else if (inputs.companyStage === 'idea') probability -= 20;
  
  // Team impact
  if (inputs.founderExperience >= 10) probability += 10;
  else if (inputs.founderExperience >= 5) probability += 5;
  
  if (inputs.technicalTeam) probability += 5;
  if (inputs.salesTeam) probability += 5;
  if (inputs.advisoryBoard) probability += 5;
  
  // Financial impact
  if (inputs.ltvToCacRatio > 3) probability += 10;
  else if (inputs.ltvToCacRatio > 1) probability += 5;
  
  if (inputs.runway >= 18) probability += 5;
  
  // Market impact
  if (inputs.marketGrowthRate > 10) probability += 5;
  if (inputs.marketConditions === 'bull') probability += 5;
  
  return Math.min(95, Math.max(5, probability));
}

function calculateExitScenarios(inputs: AngelInvestmentInputs, equityPercentage: number) {
  const scenarios = [
    { scenario: 'Conservative', probability: 0.3, exitValue: inputs.preMoneyValuation * 2, exitYear: 3 },
    { scenario: 'Base Case', probability: 0.5, exitValue: inputs.preMoneyValuation * 5, exitYear: 5 },
    { scenario: 'Optimistic', probability: 0.2, exitValue: inputs.preMoneyValuation * 10, exitYear: 7 }
  ];
  
  return scenarios.map(scenario => {
    const investorReturn = (scenario.exitValue * equityPercentage / 100);
    const investorIRR = calculateIRR(inputs.investmentAmount, investorReturn, scenario.exitYear);
    const investorMOIC = investorReturn / inputs.investmentAmount;
    
    return {
      scenario: scenario.scenario,
      probability: scenario.probability * 100,
      exitValue: scenario.exitValue,
      investorReturn,
      investorIRR,
      investorMOIC,
      exitYear: scenario.exitYear
    };
  });
}

function calculateExpectedReturn(exitScenarios: any[]) {
  return exitScenarios.reduce((total, scenario) => {
    return total + (scenario.investorReturn * scenario.probability / 100);
  }, 0);
}

function calculateIRR(investment: number, returnValue: number, years: number): number {
  if (investment === 0) return 0;
  return Math.pow(returnValue / investment, 1 / years) - 1;
}

function generateAnalysis(inputs: AngelInvestmentInputs, metrics: any): AngelInvestmentAnalysis {
  const isGoodIRR = metrics.expectedIRR > 25;
  const isGoodMOIC = metrics.expectedMOIC > 3;
  const isLowRisk = metrics.riskScore < 6;
  const isHighProbability = metrics.probabilityOfSuccess > 60;
  const isGoodLTV = metrics.ltvToCacRatio > 3;
  
  let investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High' = 'Moderate';
  let recommendation: 'Invest' | 'Pass' | 'Negotiate' | 'Strong Invest' | 'Strong Pass' = 'Negotiate';
  
  // Investment rating logic
  if (isGoodIRR && isGoodMOIC && isLowRisk && isHighProbability) {
    investmentRating = 'Excellent';
  } else if (isGoodIRR && isGoodMOIC && isHighProbability) {
    investmentRating = 'Good';
  } else if (metrics.expectedIRR < 15 || metrics.expectedMOIC < 2) {
    investmentRating = 'Poor';
  } else if (metrics.expectedIRR < 10) {
    investmentRating = 'Very Poor';
  }
  
  // Risk rating logic
  if (metrics.riskScore <= 4) {
    riskRating = 'Low';
  } else if (metrics.riskScore <= 6) {
    riskRating = 'Moderate';
  } else if (metrics.riskScore <= 8) {
    riskRating = 'High';
  } else {
    riskRating = 'Very High';
  }
  
  // Recommendation logic
  if (investmentRating === 'Excellent') {
    recommendation = 'Strong Invest';
  } else if (investmentRating === 'Good') {
    recommendation = 'Invest';
  } else if (investmentRating === 'Poor') {
    recommendation = 'Pass';
  } else if (investmentRating === 'Very Poor') {
    recommendation = 'Strong Pass';
  }
  
  return {
    investmentRating,
    riskRating,
    recommendation,
    keyStrengths: [
      isGoodIRR ? 'Strong expected IRR' : 'Moderate expected IRR',
      isGoodMOIC ? 'High potential MOIC' : 'Moderate potential MOIC',
      isHighProbability ? 'High probability of success' : 'Moderate probability of success',
      isGoodLTV ? 'Strong unit economics' : 'Moderate unit economics',
      inputs.technicalTeam ? 'Strong technical team' : 'Technical team needs assessment'
    ],
    keyWeaknesses: [
      !isGoodIRR ? 'Below target IRR' : 'IRR meets targets',
      !isGoodMOIC ? 'Below target MOIC' : 'MOIC meets targets',
      !isHighProbability ? 'Low probability of success' : 'Success probability acceptable',
      !isGoodLTV ? 'Weak unit economics' : 'Unit economics acceptable',
      inputs.runway < 12 ? 'Limited runway' : 'Adequate runway'
    ],
    riskFactors: [
      'Early-stage startup risk',
      'Market competition risk',
      'Execution risk',
      'Liquidity risk',
      'Regulatory risk'
    ],
    opportunities: [
      'High growth potential',
      'Market expansion opportunities',
      'Strategic partnerships',
      'Technology advancement',
      'Team scaling'
    ],
    investmentSummary: `Investment of $${inputs.investmentAmount.toLocaleString()} in ${inputs.companyName} at $${metrics.postMoneyValuation.toLocaleString()} post-money valuation.`,
    valuationAnalysis: `Pre-money valuation of $${inputs.preMoneyValuation.toLocaleString()} with ${metrics.equityPercentage.toFixed(1)}% equity stake.`,
    returnAnalysis: `Expected IRR of ${(metrics.expectedIRR * 100).toFixed(1)}% with MOIC of ${metrics.expectedMOIC.toFixed(1)}x.`,
    marketAssessment: `Market opportunity of $${inputs.totalAddressableMarket.toLocaleString()} with ${metrics.marketPenetration.toFixed(2)}% penetration.`,
    competitiveAnalysis: `Competitive position score of ${metrics.competitivePosition.toFixed(1)}/10.`,
    growthPotential: `Revenue growth rate of ${inputs.revenueGrowthRate}% with market growth of ${inputs.marketGrowthRate}%.`,
    teamAnalysis: `Founder experience of ${inputs.founderExperience} years with ${inputs.teamSize} team members.`,
    executionCapability: inputs.technicalTeam ? 'Strong technical execution capability' : 'Technical execution needs assessment',
    trackRecord: 'Track record assessment requires detailed due diligence',
    productAssessment: `${inputs.productType} product at ${inputs.productStage} stage.`,
    marketFit: inputs.companyStage === 'product_market_fit' ? 'Product-market fit achieved' : 'Product-market fit in progress',
    competitiveAdvantage: inputs.intellectualProperty ? 'IP protection provides competitive advantage' : 'Competitive advantage needs assessment',
    financialHealth: `Current revenue of $${inputs.currentRevenue.toLocaleString()} with ${inputs.runway} months runway.`,
    cashFlowAnalysis: `Monthly burn rate of $${inputs.burnRate.toLocaleString()} with LTV/CAC ratio of ${metrics.ltvToCacRatio.toFixed(1)}.`,
    fundingRequirements: 'Future funding requirements need assessment',
    riskProfile: `Risk score of ${metrics.riskScore.toFixed(1)}/10 with ${metrics.probabilityOfSuccess.toFixed(0)}% success probability.`,
    marketRisk: inputs.marketConditions === 'bear' ? 'Bear market conditions increase risk' : 'Market conditions are favorable',
    executionRisk: inputs.founderExperience < 5 ? 'Limited founder experience increases execution risk' : 'Experienced founders reduce execution risk',
    financialRisk: inputs.runway < 12 ? 'Limited runway increases financial risk' : 'Adequate runway reduces financial risk',
    termSheetAssessment: 'Term sheet assessment requires legal review',
    negotiationPoints: [
      'Valuation adjustment',
      'Board representation',
      'Information rights',
      'Anti-dilution protection',
      'Liquidation preferences'
    ],
    dealStructure: `Deal structured as ${inputs.investmentType} at ${inputs.investmentStage} stage.`,
    exitStrategy: 'Exit strategy typically involves acquisition or IPO within 5-7 years.',
    exitTimeline: `Expected exit timeline is ${inputs.expectedTimeline} years.`,
    exitValueProjections: 'Exit value projections require detailed financial modeling.',
    dueDiligenceStatus: 'Due diligence status requires assessment',
    criticalIssues: [
      'Team capability assessment',
      'Market validation',
      'Financial verification',
      'Legal compliance',
      'Technical assessment'
    ],
    recommendedActions: [
      'Complete due diligence',
      'Negotiate terms',
      'Prepare investment documents',
      'Set up monitoring plan'
    ],
    thesisValidation: `Investment thesis: ${inputs.investmentThesis}`,
    valueAddAssessment: 'Value-add activities need to be defined',
    strategicFit: inputs.portfolioFit ? `Portfolio fit: ${inputs.portfolioFit}` : 'Portfolio fit needs assessment',
    portfolioFit: 'Portfolio fit assessment required',
    diversificationImpact: inputs.sectorDiversification ? 'Provides sector diversification' : 'Sector diversification impact needs assessment',
    correlationAnalysis: 'Correlation analysis requires portfolio review',
    marketEnvironment: `Market conditions: ${inputs.marketConditions || 'neutral'}`,
    sectorOutlook: `Sector trends: ${inputs.sectorTrends || 'stable'}`,
    regulatoryOutlook: `Regulatory environment: ${inputs.regulatoryEnvironment || 'neutral'}`,
    sensitivityFactors: [
      {
        factor: 'Revenue Growth',
        impact: 0.2,
        direction: 'positive' as const
      },
      {
        factor: 'Market Conditions',
        impact: 0.15,
        direction: 'negative' as const
      }
    ],
    investmentProcess: [
      'Initial screening',
      'Due diligence',
      'Investment committee review',
      'Closing'
    ],
    legalRequirements: [
      'Securities law compliance',
      'Investment agreement',
      'Shareholder agreement'
    ],
    operationalRequirements: [
      'Board observer rights',
      'Information rights',
      'Financial reporting'
    ],
    postInvestmentPlan: 'Active involvement in strategic decisions and introductions.',
    valueAddActivities: [
      'Strategic guidance',
      'Network introductions',
      'Recruitment support',
      'Customer introductions'
    ],
    monitoringFrequency: 'Monthly updates and quarterly board meetings.',
    exitPlanning: 'Exit planning begins 12-18 months before target exit.',
    exitTriggers: [
      'Revenue milestones',
      'Market conditions',
      'Strategic interest',
      'Timeline targets'
    ],
    exitPreparation: [
      'Financial housekeeping',
      'Legal compliance',
      'Market positioning',
      'Investor relations'
    ],
    riskMitigation: [
      'Diversification',
      'Active monitoring',
      'Contingency planning'
    ],
    contingencyPlans: [
      'Down round protection',
      'Bridge financing',
      'Strategic alternatives'
    ],
    insuranceRequirements: [
      'Directors and officers insurance',
      'General liability insurance',
      'Key person insurance'
    ],
    performanceBenchmarks: [
      {
        metric: 'IRR',
        target: 25,
        benchmark: 20,
        industry: 'Angel Investment'
      },
      {
        metric: 'MOIC',
        target: 3,
        benchmark: 2.5,
        industry: 'Angel Investment'
      }
    ],
    committeeRecommendation: `Recommend ${recommendation} based on ${investmentRating.toLowerCase()} investment rating.`,
    presentationPoints: [
      'Strong market opportunity',
      'Experienced team',
      'Proven traction',
      'Clear exit strategy'
    ],
    decisionFactors: [
      'Expected returns',
      'Risk profile',
      'Team capability',
      'Market opportunity'
    ]
  };
}

function assessDataQuality(inputs: AngelInvestmentInputs): number {
  let quality = 80;
  
  if (inputs.investmentAmount <= 0) quality -= 20;
  if (inputs.preMoneyValuation <= 0) quality -= 20;
  if (inputs.currentRevenue < 0) quality -= 15;
  
  if (!inputs.financialDueDiligence) quality -= 10;
  if (!inputs.legalDueDiligence) quality -= 10;
  
  return Math.max(50, Math.min(100, quality));
}

function assessModelAccuracy(inputs: AngelInvestmentInputs): number {
  let accuracy = 70;
  
  if (inputs.analysisPeriod >= 5) accuracy += 10;
  if (inputs.sensitivityAnalysis) accuracy += 10;
  if (inputs.monteCarloSimulation) accuracy += 10;
  
  return Math.max(60, Math.min(95, accuracy));
}

function calculateConfidenceLevel(inputs: AngelInvestmentInputs, expectedIRR: number): number {
  let confidence = 70;
  
  if (expectedIRR > 25) confidence += 15;
  else if (expectedIRR > 15) confidence += 10;
  else if (expectedIRR < 10) confidence -= 20;
  
  if (inputs.financialDueDiligence) confidence += 10;
  if (inputs.legalDueDiligence) confidence += 10;
  
  return Math.max(50, Math.min(95, confidence));
}

export function generateAngelInvestmentAnalysis(inputs: AngelInvestmentInputs, outputs: AngelInvestmentOutputs): string {
  return `
# Angel Investment Analysis Report

## Executive Summary
**Company**: ${inputs.companyName}
**Investment Amount**: $${inputs.investmentAmount.toLocaleString()}
**Investment Type**: ${inputs.investmentType}
**Investment Stage**: ${inputs.investmentStage}
**Industry**: ${inputs.industry} - ${inputs.sector}

**Investment Rating**: ${outputs.analysis.investmentRating}
**Risk Rating**: ${outputs.analysis.riskRating}
**Recommendation**: ${outputs.analysis.recommendation}

## Investment Analysis
- **Pre-Money Valuation**: $${outputs.preMoneyValuation.toLocaleString()}
- **Post-Money Valuation**: $${outputs.postMoneyValuation.toLocaleString()}
- **Equity Percentage**: ${outputs.equityPercentage.toFixed(1)}%
- **Valuation Multiple**: ${outputs.valuationMultiple.toFixed(1)}x revenue

## Financial Metrics
- **Current Revenue**: $${inputs.currentRevenue.toLocaleString()}
- **Revenue Growth Rate**: ${inputs.revenueGrowthRate}% monthly
- **Burn Rate**: $${inputs.burnRate.toLocaleString()}/month
- **Runway**: ${inputs.runway} months
- **LTV/CAC Ratio**: ${outputs.ltvToCacRatio.toFixed(1)}
- **Customer Count**: ${inputs.customerCount.toLocaleString()}

## Market Analysis
- **Total Addressable Market**: $${inputs.totalAddressableMarket.toLocaleString()}
- **Serviceable Addressable Market**: $${inputs.serviceableAddressableMarket.toLocaleString()}
- **Market Penetration**: ${outputs.marketPenetration.toFixed(2)}%
- **Market Growth Rate**: ${inputs.marketGrowthRate}%
- **Competitive Position**: ${outputs.competitivePosition.toFixed(1)}/10

## Team Assessment
- **Founder Experience**: ${inputs.founderExperience} years
- **Team Size**: ${inputs.teamSize} employees
- **Technical Team**: ${inputs.technicalTeam ? 'Yes' : 'No'}
- **Sales Team**: ${inputs.salesTeam ? 'Yes' : 'No'}
- **Marketing Team**: ${inputs.marketingTeam ? 'Yes' : 'No'}
- **Advisory Board**: ${inputs.advisoryBoard ? 'Yes' : 'No'}

## Product/Service Analysis
- **Product Type**: ${inputs.productType}
- **Product Stage**: ${inputs.productStage}
- **Intellectual Property**: ${inputs.intellectualProperty ? 'Yes' : 'No'}
- **Patents**: ${inputs.patents || 0}
- **Trademarks**: ${inputs.trademarks || 0}

## Risk Assessment
- **Risk Score**: ${outputs.riskScore.toFixed(1)}/10
- **Probability of Success**: ${outputs.probabilityOfSuccess.toFixed(0)}%
- **Market Conditions**: ${inputs.marketConditions || 'Neutral'}
- **Sector Trends**: ${inputs.sectorTrends || 'Stable'}
- **Regulatory Environment**: ${inputs.regulatoryEnvironment || 'Neutral'}

## Expected Returns
- **Expected IRR**: ${(outputs.expectedIRR * 100).toFixed(1)}%
- **Expected MOIC**: ${outputs.expectedMOIC.toFixed(1)}x
- **Expected Return**: $${outputs.expectedReturn.toLocaleString()}
- **Expected Timeline**: ${inputs.expectedTimeline} years

## Exit Scenarios
${outputs.exitReturns.map(scenario => `
### ${scenario.scenario} Scenario
- **Probability**: ${scenario.probability.toFixed(0)}%
- **Exit Value**: $${scenario.exitValue.toLocaleString()}
- **Investor Return**: $${scenario.investorReturn.toLocaleString()}
- **Investor IRR**: ${(scenario.investorIRR * 100).toFixed(1)}%
- **Investor MOIC**: ${scenario.investorMOIC.toFixed(1)}x
- **Exit Year**: ${scenario.exitYear}
`).join('')}

## Investment Thesis
**Thesis**: ${inputs.investmentThesis}

## Key Strengths
${outputs.analysis.keyStrengths.map(strength => `• ${strength}`).join('\n')}

## Key Weaknesses
${outputs.analysis.keyWeaknesses.map(weakness => `• ${weakness}`).join('\n')}

## Risk Factors
${outputs.analysis.riskFactors.map(risk => `• ${risk}`).join('\n')}

## Opportunities
${outputs.analysis.opportunities.map(opportunity => `• ${opportunity}`).join('\n')}

## Due Diligence Status
- **Financial DD**: ${inputs.financialDueDiligence ? 'Complete' : 'Pending'}
- **Legal DD**: ${inputs.legalDueDiligence ? 'Complete' : 'Pending'}
- **Technical DD**: ${inputs.technicalDueDiligence ? 'Complete' : 'Pending'}
- **Market DD**: ${inputs.marketDueDiligence ? 'Complete' : 'Pending'}

## Recommendations
${outputs.analysis.recommendedActions.map(action => `• ${action}`).join('\n')}

## Investment Timeline
${outputs.analysis.investmentProcess.map(step => `• ${step}`).join('\n')}

## Post-Investment Plan
${outputs.analysis.valueAddActivities.map(activity => `• ${activity}`).join('\n')}

---
*This analysis is based on the provided inputs and industry standards. Past performance does not guarantee future results. Consider consulting with investment professionals for personalized advice.*
  `.trim();
}
