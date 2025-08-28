import { AngelInvestmentDilutionInputs, AngelInvestmentDilutionOutputs, AngelInvestmentDilutionMetrics, AngelInvestmentDilutionAnalysis } from './types';

export function calculateAngelInvestmentDilution(inputs: AngelInvestmentDilutionInputs): AngelInvestmentDilutionOutputs {
  // Pre-investment calculations
  const preMoneyValuation = inputs.currentValuation;
  const preMoneyShares = inputs.totalSharesOutstanding;
  const pricePerShare = preMoneyValuation / preMoneyShares;
  
  // Post-investment calculations
  const postMoneyValuation = preMoneyValuation + inputs.investmentAmount;
  const newSharesIssued = inputs.investmentAmount / pricePerShare;
  const effectivePricePerShare = pricePerShare;
  
  // Convertible security calculations
  let conversionShares = newSharesIssued;
  let conversionPrice = pricePerShare;
  let effectiveDiscount = 0;
  
  if (inputs.investmentType === 'convertible_note' || inputs.investmentType === 'safe') {
    if (inputs.conversionPrice) {
      conversionPrice = inputs.conversionPrice;
      if (inputs.discountRate) {
        conversionPrice = conversionPrice * (1 - inputs.discountRate / 100);
        effectiveDiscount = inputs.discountRate;
      }
    }
    
    if (inputs.investmentType === 'safe' && inputs.cap) {
      const capPrice = inputs.cap / preMoneyShares;
      conversionPrice = Math.min(conversionPrice, capPrice);
    }
    
    conversionShares = inputs.investmentAmount / conversionPrice;
  }
  
  // Anti-dilution calculations
  let antiDilutionAdjustment = 0;
  let adjustedConversionPrice = conversionPrice;
  let adjustedShares = conversionShares;
  
  if (inputs.antiDilutionProtection && inputs.antiDilutionType) {
    // Simplified anti-dilution calculation
    antiDilutionAdjustment = conversionShares * 0.1; // 10% adjustment for demonstration
    adjustedShares = conversionShares + antiDilutionAdjustment;
  }
  
  // Ownership calculations
  const totalSharesAfterInvestment = preMoneyShares + adjustedShares;
  const investorOwnership = (adjustedShares / totalSharesAfterInvestment) * 100;
  
  // Exit scenario calculations
  const exitScenarios = calculateExitScenarios(inputs, adjustedShares, totalSharesAfterInvestment);
  
  // Risk-adjusted returns
  const expectedReturn = calculateExpectedReturn(exitScenarios);
  const expectedIRR = calculateIRR(inputs.investmentAmount, expectedReturn, inputs.analysisPeriod);
  const expectedMOIC = expectedReturn / inputs.investmentAmount;
  const riskAdjustedReturn = expectedIRR * 0.8; // Risk adjustment factor
  
  // Generate comprehensive analysis
  const analysis = generateAnalysis(inputs, {
    preMoneyValuation,
    postMoneyValuation,
    investorOwnership,
    expectedIRR,
    expectedMOIC,
    riskAdjustedReturn
  });
  
  // Calculate quality metrics
  const dataQuality = assessDataQuality(inputs);
  const modelAccuracy = assessModelAccuracy(inputs);
  const confidenceLevel = calculateConfidenceLevel(inputs, expectedIRR);
  
  return {
    // Pre-Investment Metrics
    preMoneyValuation,
    preMoneyShares,
    preMoneyOwnership: { 'Investor': 0, 'Founders': 100 },
    
    // Investment Impact
    postMoneyValuation,
    newSharesIssued,
    effectivePricePerShare,
    ownershipDilution: { 'Investor': investorOwnership, 'Founders': 100 - investorOwnership },
    
    // Convertible Security Analysis
    conversionShares,
    conversionPrice,
    effectiveDiscount,
    
    // Anti-Dilution Impact
    antiDilutionAdjustment,
    adjustedConversionPrice,
    adjustedShares,
    
    // Future Round Impact
    futureRoundDilution: [],
    
    // Option Pool Impact
    optionPoolDilution: {},
    postOptionPoolOwnership: {},
    
    // Exit Analysis
    exitReturns: exitScenarios,
    
    // Risk-Adjusted Returns
    expectedReturn,
    expectedIRR,
    expectedMOIC,
    riskAdjustedReturn,
    
    // Sensitivity Analysis
    sensitivityMatrix: [],
    
    // Monte Carlo Results
    monteCarloResults: undefined,
    
    // Benchmark Comparison
    benchmarkComparison: [],
    
    // Analysis
    analysis,
    
    // Additional Output Metrics
    dataQuality,
    modelAccuracy,
    confidenceLevel,
    
    // Time Series Analysis
    ownershipOverTime: [],
    
    // Scenario Analysis
    scenarioAnalysis: [],
    
    // Comparative Analysis
    comparativeAnalysis: [],
    
    // Risk Metrics
    riskMetrics: [],
    
    // Financial Projections
    financialProjections: [],
    
    // Investment Returns
    investmentReturns: [],
    
    // Dilution Impact
    dilutionImpact: [],
    
    // Term Sheet Analysis
    termSheetAnalysis: [],
    
    // Due Diligence Checklist
    dueDiligenceChecklist: [],
    
    // Investment Timeline
    investmentTimeline: [],
    
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

function calculateExitScenarios(inputs: AngelInvestmentDilutionInputs, shares: number, totalShares: number) {
  const scenarios = [
    { scenario: 'Conservative', probability: 0.3, exitValue: inputs.currentValuation * 2, exitYear: 3 },
    { scenario: 'Base Case', probability: 0.5, exitValue: inputs.currentValuation * 5, exitYear: 5 },
    { scenario: 'Optimistic', probability: 0.2, exitValue: inputs.currentValuation * 10, exitYear: 7 }
  ];
  
  return scenarios.map(scenario => {
    const ownershipPercentage = (shares / totalShares) * 100;
    const investorReturn = (scenario.exitValue * ownershipPercentage / 100) * (inputs.liquidationPreference || 1);
    const investorIRR = calculateIRR(inputs.investmentAmount, investorReturn, scenario.exitYear);
    const investorMOIC = investorReturn / inputs.investmentAmount;
    
    return {
      scenario: scenario.scenario,
      investorReturn,
      investorIRR,
      investorMOIC,
      founderReturn: scenario.exitValue * (100 - ownershipPercentage) / 100,
      founderIRR: calculateIRR(0, scenario.exitValue * (100 - ownershipPercentage) / 100, scenario.exitYear),
      founderMOIC: scenario.exitValue * (100 - ownershipPercentage) / 100
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

function generateAnalysis(inputs: AngelInvestmentDilutionInputs, metrics: any): AngelInvestmentDilutionAnalysis {
  const isGoodIRR = metrics.expectedIRR > 25;
  const isGoodMOIC = metrics.expectedMOIC > 3;
  const isReasonableValuation = metrics.postMoneyValuation / inputs.investmentAmount < 20;
  
  let investmentRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High' = 'Moderate';
  let recommendation: 'Invest' | 'Pass' | 'Negotiate' | 'Strong Invest' | 'Strong Pass' = 'Negotiate';
  
  // Investment rating logic
  if (isGoodIRR && isGoodMOIC && isReasonableValuation) {
    investmentRating = 'Excellent';
  } else if (isGoodIRR && isGoodMOIC) {
    investmentRating = 'Good';
  } else if (metrics.expectedIRR < 15) {
    investmentRating = 'Poor';
  } else if (metrics.expectedIRR < 10) {
    investmentRating = 'Very Poor';
  }
  
  // Risk rating logic
  if (inputs.investmentType === 'equity' && inputs.antiDilutionProtection) {
    riskRating = 'Moderate';
  } else if (inputs.investmentType === 'safe') {
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
      inputs.antiDilutionProtection ? 'Anti-dilution protection included' : 'No anti-dilution protection'
    ],
    keyWeaknesses: [
      !isGoodIRR ? 'Below target IRR' : 'IRR meets targets',
      !isGoodMOIC ? 'Below target MOIC' : 'MOIC meets targets',
      !inputs.antiDilutionProtection ? 'No anti-dilution protection' : 'Anti-dilution protection included'
    ],
    riskFactors: [
      'Early-stage startup risk',
      'Market competition risk',
      'Execution risk',
      'Liquidity risk'
    ],
    opportunities: [
      'High growth potential',
      'Market expansion opportunities',
      'Strategic partnerships'
    ],
    investmentSummary: `Investment of $${inputs.investmentAmount.toLocaleString()} in ${inputs.companyName} at $${metrics.postMoneyValuation.toLocaleString()} post-money valuation.`,
    dilutionAnalysis: `Investor ownership will be ${metrics.investorOwnership.toFixed(1)}% post-investment.`,
    returnAnalysis: `Expected IRR of ${(metrics.expectedIRR * 100).toFixed(1)}% with MOIC of ${metrics.expectedMOIC.toFixed(1)}x.`,
    valuationAssessment: `Pre-money valuation of $${metrics.preMoneyValuation.toLocaleString()} appears ${isReasonableValuation ? 'reasonable' : 'high'} for the stage.`,
    comparableAnalysis: 'Comparable analysis requires additional market data.',
    growthProjections: 'Growth projections require detailed financial modeling.',
    riskProfile: `Risk profile is ${riskRating.toLowerCase()} based on investment structure and market conditions.`,
    marketRisk: 'Market risk assessment requires sector analysis.',
    executionRisk: 'Execution risk depends on team capabilities and market conditions.',
    termSheetAssessment: 'Term sheet includes standard angel investment terms.',
    negotiationPoints: [
      'Valuation adjustment',
      'Anti-dilution protection',
      'Board representation',
      'Information rights'
    ],
    dealStructure: `Deal structured as ${inputs.investmentType} with ${inputs.liquidationPreference}x liquidation preference.`,
    exitStrategy: 'Exit strategy typically involves acquisition or IPO within 5-7 years.',
    exitTimeline: 'Expected exit timeline is 5-7 years based on industry standards.',
    exitValueProjections: 'Exit value projections require detailed financial modeling.',
    competitivePosition: 'Competitive position analysis requires market research.',
    marketOpportunity: 'Market opportunity assessment requires industry analysis.',
    competitiveAdvantages: [
      'First-mover advantage',
      'Proprietary technology',
      'Strong team'
    ],
    teamAssessment: 'Team assessment requires detailed due diligence.',
    managementCapability: 'Management capability assessment requires reference checks.',
    executionTrackRecord: 'Execution track record requires historical analysis.',
    financialHealth: 'Financial health assessment requires detailed review.',
    cashFlowProjections: 'Cash flow projections require financial modeling.',
    fundingRequirements: 'Future funding requirements need to be assessed.',
    legalAssessment: 'Legal assessment requires legal due diligence.',
    complianceStatus: 'Compliance status requires regulatory review.',
    regulatoryRisks: [
      'Securities law compliance',
      'Industry regulations',
      'Tax implications'
    ],
    taxAnalysis: 'Tax analysis requires professional tax advice.',
    taxBenefits: [
      'Qualified small business stock',
      'Long-term capital gains treatment'
    ],
    taxRisks: [
      'Section 1202 eligibility',
      'Holding period requirements'
    ],
    optimalStructure: `Optimal structure is ${inputs.investmentType} with anti-dilution protection.`,
    alternativeStructures: [
      'Convertible note with cap',
      'SAFE with discount',
      'Preferred stock'
    ],
    structureRecommendations: [
      'Include anti-dilution protection',
      'Negotiate board observer rights',
      'Include information rights'
    ],
    monitoringPlan: 'Quarterly board meetings and monthly updates.',
    reportingRequirements: [
      'Monthly financial updates',
      'Quarterly board presentations',
      'Annual audited financials'
    ],
    keyMetrics: [
      'Monthly Recurring Revenue (MRR)',
      'Customer Acquisition Cost (CAC)',
      'Lifetime Value (LTV)',
      'Burn rate'
    ],
    dueDiligenceItems: [
      'Financial due diligence',
      'Legal due diligence',
      'Technical due diligence',
      'Market due diligence'
    ],
    criticalIssues: [
      'Team capability assessment',
      'Market validation',
      'Competitive analysis'
    ],
    recommendedActions: [
      'Complete due diligence',
      'Negotiate terms',
      'Prepare investment documents'
    ],
    investmentTimeline: 'Investment timeline is 4-6 weeks from term sheet to closing.',
    milestones: [
      'Term sheet execution',
      'Due diligence completion',
      'Investment committee approval',
      'Closing'
    ],
    keyDates: [
      'Term sheet: Week 1',
      'Due diligence: Weeks 2-4',
      'Approval: Week 5',
      'Closing: Week 6'
    ],
    portfolioFit: 'Investment fits well with portfolio strategy.',
    diversificationImpact: 'Investment provides sector diversification.',
    correlationAnalysis: 'Low correlation with existing portfolio.',
    marketEnvironment: 'Current market environment is favorable for early-stage investments.',
    sectorOutlook: 'Sector outlook is positive based on market trends.',
    economicFactors: [
      'Low interest rates',
      'Strong venture capital activity',
      'Technology adoption trends'
    ],
    sensitivityFactors: [
      {
        factor: 'Valuation',
        impact: 0.2,
        direction: 'negative' as const
      },
      {
        factor: 'Exit Timeline',
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
      'Reasonable valuation',
      'Clear exit strategy'
    ],
    decisionFactors: [
      'Expected returns',
      'Risk profile',
      'Portfolio fit',
      'Market conditions'
    ]
  };
}

function assessDataQuality(inputs: AngelInvestmentDilutionInputs): number {
  let quality = 80;
  
  if (inputs.currentValuation <= 0) quality -= 20;
  if (inputs.totalSharesOutstanding <= 0) quality -= 20;
  if (inputs.investmentAmount <= 0) quality -= 20;
  
  if (inputs.investmentType === 'convertible_note' || inputs.investmentType === 'safe') {
    if (!inputs.conversionPrice && !inputs.cap) quality -= 15;
  }
  
  return Math.max(50, Math.min(100, quality));
}

function assessModelAccuracy(inputs: AngelInvestmentDilutionInputs): number {
  let accuracy = 70;
  
  if (inputs.analysisPeriod >= 5) accuracy += 10;
  if (inputs.sensitivityAnalysis) accuracy += 10;
  if (inputs.monteCarloSimulation) accuracy += 10;
  
  return Math.max(60, Math.min(95, accuracy));
}

function calculateConfidenceLevel(inputs: AngelInvestmentDilutionInputs, expectedIRR: number): number {
  let confidence = 70;
  
  if (expectedIRR > 25) confidence += 15;
  else if (expectedIRR > 15) confidence += 10;
  else if (expectedIRR < 10) confidence -= 20;
  
  if (inputs.antiDilutionProtection) confidence += 10;
  if (inputs.regulatoryCompliance) confidence += 5;
  
  return Math.max(50, Math.min(95, confidence));
}

export function generateAngelInvestmentDilutionAnalysis(inputs: AngelInvestmentDilutionInputs, outputs: AngelInvestmentDilutionOutputs): string {
  return `
# Angel Investment Dilution Analysis Report

## Executive Summary
**Company**: ${inputs.companyName}
**Investment Amount**: $${inputs.investmentAmount.toLocaleString()}
**Pre-Money Valuation**: $${outputs.preMoneyValuation.toLocaleString()}
**Post-Money Valuation**: $${outputs.postMoneyValuation.toLocaleString()}

**Investment Rating**: ${outputs.analysis.investmentRating}
**Risk Rating**: ${outputs.analysis.riskRating}
**Recommendation**: ${outputs.analysis.recommendation}

## Investment Structure
- **Investment Type**: ${inputs.investmentType}
- **Price Per Share**: $${outputs.effectivePricePerShare.toFixed(2)}
- **New Shares Issued**: ${outputs.newSharesIssued.toLocaleString()}
- **Investor Ownership**: ${outputs.ownershipDilution['Investor'].toFixed(1)}%

## Convertible Security Analysis
${outputs.conversionShares ? `
- **Conversion Shares**: ${outputs.conversionShares.toLocaleString()}
- **Conversion Price**: $${outputs.conversionPrice?.toFixed(2) || 'N/A'}
- **Effective Discount**: ${outputs.effectiveDiscount?.toFixed(1)}%
` : 'N/A'}

## Anti-Dilution Protection
${outputs.antiDilutionAdjustment ? `
- **Anti-Dilution Adjustment**: ${outputs.antiDilutionAdjustment.toLocaleString()} shares
- **Adjusted Conversion Price**: $${outputs.adjustedConversionPrice?.toFixed(2) || 'N/A'}
- **Total Adjusted Shares**: ${outputs.adjustedShares?.toLocaleString() || 'N/A'}
` : 'No anti-dilution protection'}

## Expected Returns
- **Expected Return**: $${outputs.expectedReturn.toLocaleString()}
- **Expected IRR**: ${(outputs.expectedIRR * 100).toFixed(1)}%
- **Expected MOIC**: ${outputs.expectedMOIC.toFixed(1)}x
- **Risk-Adjusted Return**: ${(outputs.riskAdjustedReturn * 100).toFixed(1)}%

## Exit Scenarios
${outputs.exitReturns.map(scenario => `
### ${scenario.scenario} Scenario
- **Investor Return**: $${scenario.investorReturn.toLocaleString()}
- **Investor IRR**: ${(scenario.investorIRR * 100).toFixed(1)}%
- **Investor MOIC**: ${scenario.investorMOIC.toFixed(1)}x
- **Founder Return**: $${scenario.founderReturn.toLocaleString()}
`).join('')}

## Key Strengths
${outputs.analysis.keyStrengths.map(strength => `• ${strength}`).join('\n')}

## Key Weaknesses
${outputs.analysis.keyWeaknesses.map(weakness => `• ${weakness}`).join('\n')}

## Risk Factors
${outputs.analysis.riskFactors.map(risk => `• ${risk}`).join('\n')}

## Recommendations
${outputs.analysis.structureRecommendations.map(rec => `• ${rec}`).join('\n')}

## Due Diligence Checklist
${outputs.analysis.dueDiligenceItems.map(item => `• ${item}`).join('\n')}

## Investment Timeline
${outputs.analysis.milestones.map(milestone => `• ${milestone}`).join('\n')}

## Post-Investment Plan
${outputs.analysis.valueAddActivities.map(activity => `• ${activity}`).join('\n')}

---
*This analysis is based on the provided inputs and industry standards. Past performance does not guarantee future results. Consider consulting with investment professionals for personalized advice.*
  `.trim();
}
