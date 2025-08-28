import { CalculatorInputs, CalculatorOutputs } from '../../../types/calculator';
import { AccretionDilutionInputs, AccretionDilutionOutputs, AccretionDilutionMetrics, AccretionDilutionAnalysis } from './types';

/**
 * Calculate comprehensive M&A accretion/dilution analysis
 */
export function calculateAccretionDilution(inputs: AccretionDilutionInputs): AccretionDilutionOutputs {
  // Pre-transaction calculations
  const targetMarketCap = inputs.targetSharesOutstanding * inputs.targetSharePrice;
  const acquirerMarketCap = inputs.acquirerSharesOutstanding * inputs.acquirerSharePrice;
  
  const targetEnterpriseValue = targetMarketCap + inputs.targetDebt - inputs.targetCash;
  const acquirerEnterpriseValue = acquirerMarketCap + inputs.acquirerDebt - inputs.acquirerCash;
  
  const targetEVEBITDA = inputs.targetEBITDA > 0 ? targetEnterpriseValue / inputs.targetEBITDA : 0;
  const acquirerEVEBITDA = inputs.acquirerEBITDA > 0 ? acquirerEnterpriseValue / inputs.acquirerEBITDA : 0;
  const targetPERatio = inputs.targetNetIncome > 0 ? targetMarketCap / inputs.targetNetIncome : 0;
  const acquirerPERatio = inputs.acquirerNetIncome > 0 ? acquirerMarketCap / inputs.acquirerNetIncome : 0;

  // Transaction structure calculations
  const totalTransactionValue = inputs.purchasePrice + inputs.transactionCosts;
  const premiumPaid = inputs.purchasePrice - targetMarketCap;
  const premiumPercentage = targetMarketCap > 0 ? (premiumPaid / targetMarketCap) * 100 : 0;
  
  const cashAmount = inputs.purchasePrice * (inputs.cashPortion / 100);
  const stockAmount = inputs.purchasePrice * (inputs.stockPortion / 100);
  
  const exchangeRatio = inputs.acquirerSharePrice > 0 ? (inputs.purchasePrice / inputs.targetSharesOutstanding) / inputs.acquirerSharePrice : 0;
  const newSharesIssued = inputs.acquirerSharePrice > 0 ? stockAmount / inputs.acquirerSharePrice : 0;

  // Pro forma calculations
  const proFormaRevenue = inputs.acquirerRevenue + inputs.targetRevenue;
  const totalSynergies = inputs.synergiesRevenue + inputs.synergiesCost;
  
  // Apply synergy ramp-up over time
  const synergyRampFactor = Math.min(1, 1 / inputs.synergyRampPeriod);
  const year1Synergies = totalSynergies * synergyRampFactor;
  
  const proFormaEBITDA = inputs.acquirerEBITDA + inputs.targetEBITDA + year1Synergies;
  
  // Calculate financing costs
  const totalDebt = inputs.acquirerDebt + inputs.targetDebt + inputs.debtFinancing;
  const interestExpense = totalDebt * (inputs.debtInterestRate / 100);
  
  // Pro forma net income calculation
  const combinedNetIncome = inputs.acquirerNetIncome + inputs.targetNetIncome + year1Synergies;
  const additionalInterestExpense = inputs.debtFinancing * (inputs.debtInterestRate / 100);
  const taxShield = additionalInterestExpense * (inputs.taxRate / 100);
  const integrationCostImpact = inputs.integrationCosts * (1 - inputs.taxRate / 100);
  
  const proFormaNetIncome = combinedNetIncome - additionalInterestExpense + taxShield - integrationCostImpact;
  
  const proFormaSharesOutstanding = inputs.acquirerSharesOutstanding + newSharesIssued;
  const proFormaEPS = proFormaSharesOutstanding > 0 ? proFormaNetIncome / proFormaSharesOutstanding : 0;
  
  // Standalone acquirer EPS
  const standaloneEPS = inputs.acquirerSharesOutstanding > 0 ? inputs.acquirerNetIncome / inputs.acquirerSharesOutstanding : 0;
  
  // Accretion/dilution calculation
  const epsAccretionDilution = standaloneEPS !== 0 ? ((proFormaEPS - standaloneEPS) / standaloneEPS) * 100 : 0;
  
  // Breakeven price calculation
  const epsBreakevenPrice = standaloneEPS > 0 ? 
    (standaloneEPS * proFormaSharesOutstanding - inputs.targetNetIncome) / inputs.targetSharesOutstanding : 0;

  // Synergy analysis
  const netPresentValueSynergies = calculateSynergyNPV(totalSynergies, inputs.synergyRampPeriod, inputs.discountRate, inputs.analysisYears);
  const synergyMultiple = premiumPaid > 0 ? netPresentValueSynergies / premiumPaid : 0;

  // Returns analysis
  const internalRateOfReturn = calculateTransactionIRR(inputs, totalSynergies, inputs.analysisYears);
  const returnOnInvestment = premiumPaid > 0 ? (netPresentValueSynergies / premiumPaid) * 100 : 0;
  const paybackPeriod = totalSynergies > 0 ? premiumPaid / totalSynergies : 0;

  // Financing impact
  const proFormaLeverage = proFormaEBITDA > 0 ? totalDebt / proFormaEBITDA : 0;
  const interestCoverageRatio = interestExpense > 0 ? proFormaEBITDA / interestExpense : 0;
  const newDebtServiceCoverage = interestCoverageRatio;

  // Valuation metrics
  const impliedEVEBITDA = inputs.targetEBITDA > 0 ? (inputs.purchasePrice + inputs.targetDebt - inputs.targetCash) / inputs.targetEBITDA : 0;
  const impliedPERatio = inputs.targetNetIncome > 0 ? inputs.purchasePrice / inputs.targetNetIncome : 0;
  const fairValueEstimate = inputs.targetEBITDA * inputs.marketMultiple / inputs.targetSharesOutstanding;

  // Scenario analysis
  const scenarioAnalysis = calculateScenarioAnalysis(inputs, standaloneEPS, proFormaSharesOutstanding);

  // Integration complexity assessment
  const integrationComplexity = assessIntegrationComplexity(inputs);
  const culturalFit = assessCulturalFit(inputs);
  const operationalOverlap = assessOperationalOverlap(inputs);

  // Generate comprehensive analysis
  const analysis = generateAnalysis(inputs, {
    epsAccretionDilution,
    premiumPercentage,
    synergyMultiple,
    internalRateOfReturn,
    proFormaLeverage,
    integrationComplexity
  });

  // Create detailed projections
  const projectedMetrics = generateProjections(inputs, totalSynergies);

  // Timeline and risk assessment
  const timeline = generateTransactionTimeline(inputs);
  const riskProfile = assessTransactionRisks(inputs);
  const valueDrivers = identifyValueDrivers(inputs, totalSynergies);

  return {
    // Pre-Transaction Metrics
    targetEnterpriseValue,
    targetEquityValue: targetMarketCap,
    targetEVEBITDA,
    targetPERatio,
    acquirerEnterpriseValue,
    acquirerEquityValue: acquirerMarketCap,
    acquirerEVEBITDA,
    acquirerPERatio,

    // Transaction Metrics
    totalTransactionValue,
    premiumPaid,
    premiumPercentage,
    exchangeRatio,
    newSharesIssued,

    // Pro Forma Metrics
    proFormaRevenue,
    proFormaEBITDA,
    proFormaNetIncome,
    proFormaSharesOutstanding,
    proFormaEPS,

    // Accretion/Dilution Analysis
    epsAccretionDilution,
    epsBreakevenPrice,

    // Synergy Analysis
    totalSynergies,
    netPresentValueSynergies,
    synergyMultiple,

    // Returns Analysis
    internalRateOfReturn,
    returnOnInvestment,
    paybackPeriod,

    // Financing Impact
    newDebtServiceCoverage,
    proFormaLeverage,
    interestCoverageRatio,

    // Valuation Metrics
    impliedEVEBITDA,
    impliedPERatio,
    fairValueEstimate,

    // Risk Metrics
    scenarioAnalysis,

    // Integration Metrics
    integrationComplexity,
    culturalFit,
    operationalOverlap,

    // Analysis
    analysis,

    // Additional Output Metrics
    confidenceLevel: calculateConfidenceLevel(inputs),
    modelAccuracy: assessModelAccuracy(inputs),
    dataQuality: assessDataQuality(inputs),

    // Detailed Projections
    projectedMetrics,

    // Transaction Timeline
    timeline,

    // Risk Assessment
    riskProfile,

    // Value Creation Opportunities
    valueDrivers
  };
}

/**
 * Calculate NPV of synergies over time
 */
function calculateSynergyNPV(totalSynergies: number, rampPeriod: number, discountRate: number, analysisYears: number): number {
  let npv = 0;
  const discount = discountRate / 100;
  
  for (let year = 1; year <= analysisYears; year++) {
    const rampFactor = Math.min(1, year / rampPeriod);
    const yearSynergies = totalSynergies * rampFactor;
    npv += yearSynergies / Math.pow(1 + discount, year);
  }
  
  // Add terminal value
  const terminalSynergies = totalSynergies;
  const terminalValue = terminalSynergies / (discount - 0.03); // Assuming 3% terminal growth
  npv += terminalValue / Math.pow(1 + discount, analysisYears);
  
  return npv;
}

/**
 * Calculate transaction IRR
 */
function calculateTransactionIRR(inputs: AccretionDilutionInputs, totalSynergies: number, years: number): number {
  const initialInvestment = inputs.purchasePrice + inputs.transactionCosts + inputs.integrationCosts;
  
  // Simple IRR approximation using synergies as cash flows
  const annualCashFlow = totalSynergies;
  
  // Use trial and error to find IRR (simplified)
  let irr = 0.1; // Starting guess of 10%
  for (let i = 0; i < 100; i++) {
    let npv = -initialInvestment;
    for (let year = 1; year <= years; year++) {
      npv += annualCashFlow / Math.pow(1 + irr, year);
    }
    
    if (Math.abs(npv) < 1000) break; // Close enough
    
    irr += npv > 0 ? 0.001 : -0.001; // Adjust IRR
  }
  
  return irr * 100;
}

/**
 * Calculate scenario analysis
 */
function calculateScenarioAnalysis(inputs: AccretionDilutionInputs, standaloneEPS: number, proFormaShares: number) {
  const baseCase = inputs.synergiesRevenue + inputs.synergiesCost;
  const optimistic = baseCase * 1.25;
  const pessimistic = baseCase * 0.75;
  
  const calculateEPSImpact = (synergies: number) => {
    const netIncomeImpact = synergies * (1 - inputs.taxRate / 100);
    const newEPS = (inputs.acquirerNetIncome + inputs.targetNetIncome + netIncomeImpact) / proFormaShares;
    return standaloneEPS !== 0 ? ((newEPS - standaloneEPS) / standaloneEPS) * 100 : 0;
  };
  
  return {
    base: calculateEPSImpact(baseCase),
    optimistic: calculateEPSImpact(optimistic),
    pessimistic: calculateEPSImpact(pessimistic)
  };
}

/**
 * Assess integration complexity
 */
function assessIntegrationComplexity(inputs: AccretionDilutionInputs): number {
  let complexity = 5; // Base complexity
  
  // Adjust based on deal size
  const dealSize = inputs.purchasePrice;
  if (dealSize > 10000000000) complexity += 2; // Large deals are more complex
  if (dealSize < 1000000000) complexity -= 1; // Smaller deals are less complex
  
  // Adjust based on deal type
  if (inputs.dealType === 'merger') complexity += 1;
  if (inputs.dealType === 'tender-offer') complexity += 2;
  
  // Adjust based on financing mix
  if (inputs.stockPortion > 50) complexity += 1; // Stock deals are more complex
  
  return Math.max(1, Math.min(10, complexity));
}

/**
 * Assess cultural fit
 */
function assessCulturalFit(inputs: AccretionDilutionInputs): number {
  // Simplified cultural fit assessment based on available inputs
  let fit = 7; // Assume reasonable fit by default
  
  // Adjust based on industry growth (proxy for industry similarity)
  if (inputs.industryGrowthRate && inputs.industryGrowthRate > 10) fit -= 1; // High growth industries may have different cultures
  if (inputs.industryGrowthRate && inputs.industryGrowthRate < 0) fit -= 2; // Declining industries may have stressed cultures
  
  return Math.max(1, Math.min(10, fit));
}

/**
 * Assess operational overlap
 */
function assessOperationalOverlap(inputs: AccretionDilutionInputs): number {
  // Simplified operational overlap assessment
  let overlap = 6; // Assume moderate overlap
  
  // Higher synergies suggest more overlap
  const synergyPercentage = (inputs.synergiesRevenue + inputs.synergiesCost) / inputs.targetRevenue * 100;
  if (synergyPercentage > 15) overlap += 2;
  if (synergyPercentage > 25) overlap += 1;
  if (synergyPercentage < 5) overlap -= 2;
  
  return Math.max(1, Math.min(10, overlap));
}

/**
 * Generate comprehensive analysis
 */
function generateAnalysis(inputs: AccretionDilutionInputs, metrics: any): AccretionDilutionAnalysis {
  const isAccretive = metrics.epsAccretionDilution > 0;
  const isHighPremium = metrics.premiumPercentage > 30;
  const hasStrongSynergies = metrics.synergyMultiple > 1;
  
  let recommendationRating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell' = 'Hold';
  
  if (isAccretive && hasStrongSynergies && !isHighPremium) {
    recommendationRating = 'Strong Buy';
  } else if (isAccretive && hasStrongSynergies) {
    recommendationRating = 'Buy';
  } else if (!isAccretive && isHighPremium) {
    recommendationRating = 'Sell';
  } else if (!isAccretive && isHighPremium && metrics.internalRateOfReturn < 10) {
    recommendationRating = 'Strong Sell';
  }
  
  return {
    recommendationRating,
    keyDrivers: [
      isAccretive ? 'EPS Accretive Transaction' : 'EPS Dilutive Transaction',
      hasStrongSynergies ? 'Strong Synergy Potential' : 'Limited Synergies',
      `${metrics.premiumPercentage.toFixed(1)}% Premium Paid`
    ],
    majorRisks: [
      'Integration execution risk',
      'Synergy realization risk',
      'Market conditions risk',
      'Regulatory approval risk'
    ],
    criticalSuccessFactors: [
      'Effective integration management',
      'Synergy realization',
      'Talent retention',
      'Customer retention'
    ],
    yearOneImpact: {
      epsChange: metrics.epsAccretionDilution,
      revenueGrowth: (inputs.targetRevenue / inputs.acquirerRevenue) * 100,
      marginImpact: 0, // Simplified
      roicChange: 0 // Simplified
    },
    strategicFit: isAccretive ? 'Strong strategic fit with accretive returns' : 'Strategic fit requires careful execution',
    marketPosition: 'Enhanced market position through combination',
    competitiveAdvantages: ['Scale advantages', 'Cost synergies', 'Revenue synergies'],
    synergySources: ['Cost reduction', 'Revenue enhancement', 'Operational efficiency'],
    optimalStructure: inputs.paymentMethod === 'mixed' ? 'Mixed cash/stock optimal' : `${inputs.paymentMethod} structure appropriate`,
    financingRecommendations: ['Optimize debt/equity mix', 'Consider market timing'],
    alternativeStructures: ['All-cash alternative', 'All-stock alternative'],
    integrationTimeline: `${inputs.synergyRampPeriod}-year integration timeline`,
    keyMilestones: ['Day 1 readiness', '100-day plan execution', 'Synergy realization'],
    resourceRequirements: 'Dedicated integration team required',
    riskMitigation: ['Detailed integration planning', 'Communication strategy', 'Retention programs'],
    valuationMethods: ['DCF analysis', 'Comparable transactions', 'Market multiples'],
    comparableTransactions: 'Based on industry precedents',
    discountedCashFlow: 'NPV-positive with synergies',
    marketMultiples: `${inputs.marketMultiple}x EV/EBITDA multiple applied`,
    keyVariables: ['Synergy realization', 'Integration costs', 'Market conditions'],
    breakEvenScenarios: ['75% synergy realization required'],
    worstCaseImpact: 'Significant dilution if synergies not realized',
    bestCaseUpside: 'Strong accretion with full synergy realization',
    regulatoryRisks: ['Antitrust review', 'Regulatory approvals'],
    antitrust: inputs.regulatoryApprovalTime ? `${inputs.regulatoryApprovalTime}-month approval process` : 'Standard review expected',
    approvalTimeline: `${inputs.regulatoryApprovalTime || 6}-12 months`,
    contingencyPlanning: 'Breakup fee and alternative structures available',
    organizationalStructure: 'Combined entity structure optimization',
    talentRetention: 'Key talent retention critical',
    systemsIntegration: 'IT systems integration required',
    customerRetention: 'Customer retention programs essential',
    kpiFramework: ['EPS accretion tracking', 'Synergy realization', 'Integration milestones'],
    milestoneTracking: 'Monthly progress reporting',
    valueRealizationPlan: 'Structured synergy capture program',
    industryTrends: 'Industry consolidation trend',
    competitiveLandscape: 'Enhanced competitive position',
    marketTiming: 'Favorable market conditions',
    macroeconomicFactors: 'Consider interest rate environment'
  };
}

/**
 * Generate 5-year projections
 */
function generateProjections(inputs: AccretionDilutionInputs, totalSynergies: number) {
  const projections = [];
  const baseRevenue = inputs.acquirerRevenue + inputs.targetRevenue;
  const baseEBITDA = inputs.acquirerEBITDA + inputs.targetEBITDA;
  const baseNetIncome = inputs.acquirerNetIncome + inputs.targetNetIncome;
  
  for (let year = 1; year <= 5; year++) {
    const growthRate = (inputs.industryGrowthRate || 5) / 100;
    const synergyRampFactor = Math.min(1, year / inputs.synergyRampPeriod);
    
    const revenue = baseRevenue * Math.pow(1 + growthRate, year);
    const ebitda = (baseEBITDA + totalSynergies * synergyRampFactor) * Math.pow(1 + growthRate, year);
    const netIncome = (baseNetIncome + totalSynergies * synergyRampFactor * 0.75) * Math.pow(1 + growthRate, year);
    const eps = netIncome / (inputs.acquirerSharesOutstanding + (inputs.purchasePrice * inputs.stockPortion / 100) / inputs.acquirerSharePrice);
    
    projections.push({
      year,
      revenue,
      ebitda,
      netIncome,
      eps,
      fcf: ebitda * 0.7, // Simplified FCF
      roic: netIncome / (inputs.purchasePrice * 0.6) * 100 // Simplified ROIC
    });
  }
  
  return projections;
}

/**
 * Generate transaction timeline
 */
function generateTransactionTimeline(inputs: AccretionDilutionInputs) {
  return [
    {
      phase: 'Due Diligence',
      duration: 2,
      keyActivities: ['Financial analysis', 'Legal review', 'Commercial assessment'],
      dependencies: ['Management presentations', 'Data room access']
    },
    {
      phase: 'Regulatory Approval',
      duration: inputs.regulatoryApprovalTime || 6,
      keyActivities: ['Antitrust filing', 'Regulatory submissions', 'Approval process'],
      dependencies: ['Complete documentation', 'Regulatory cooperation']
    },
    {
      phase: 'Integration Planning',
      duration: 3,
      keyActivities: ['Integration team formation', 'Day 1 planning', 'Synergy planning'],
      dependencies: ['Deal announcement', 'Management alignment']
    },
    {
      phase: 'Closing',
      duration: 1,
      keyActivities: ['Final approvals', 'Funding', 'Legal closing'],
      dependencies: ['All conditions met', 'Regulatory clearance']
    }
  ];
}

/**
 * Assess transaction risks
 */
function assessTransactionRisks(inputs: AccretionDilutionInputs) {
  return [
    {
      category: 'Integration Risk',
      probability: 100 - (inputs.executionRisk || 85),
      impact: 8,
      mitigation: 'Detailed integration planning and experienced team'
    },
    {
      category: 'Synergy Risk',
      probability: 30,
      impact: 7,
      mitigation: 'Conservative synergy estimates and tracking'
    },
    {
      category: 'Market Risk',
      probability: 25,
      impact: 6,
      mitigation: 'Diversified business model and hedging strategies'
    },
    {
      category: 'Regulatory Risk',
      probability: 15,
      impact: 9,
      mitigation: 'Early engagement with regulators and contingency planning'
    }
  ];
}

/**
 * Identify value creation opportunities
 */
function identifyValueDrivers(inputs: AccretionDilutionInputs, totalSynergies: number) {
  return [
    {
      source: 'Cost Synergies',
      potential: inputs.synergiesCost,
      timeline: inputs.synergyRampPeriod,
      probability: 85
    },
    {
      source: 'Revenue Synergies',
      potential: inputs.synergiesRevenue,
      timeline: inputs.synergyRampPeriod + 1,
      probability: 70
    },
    {
      source: 'Scale Economies',
      potential: inputs.targetRevenue * 0.05,
      timeline: 2,
      probability: 75
    },
    {
      source: 'Tax Optimization',
      potential: inputs.debtFinancing * (inputs.debtInterestRate / 100) * (inputs.taxRate / 100),
      timeline: 1,
      probability: 95
    }
  ];
}

/**
 * Calculate confidence level
 */
function calculateConfidenceLevel(inputs: AccretionDilutionInputs): number {
  let confidence = 70; // Base confidence
  
  // Adjust based on synergy certainty
  const synergyRatio = (inputs.synergiesRevenue + inputs.synergiesCost) / inputs.targetRevenue;
  if (synergyRatio > 0.2) confidence -= 10; // High synergies are less certain
  if (synergyRatio < 0.05) confidence += 10; // Conservative synergies are more certain
  
  // Adjust based on execution risk
  if (inputs.executionRisk) {
    confidence = confidence * (inputs.executionRisk / 100);
  }
  
  return Math.max(50, Math.min(95, confidence));
}

/**
 * Assess model accuracy
 */
function assessModelAccuracy(inputs: AccretionDilutionInputs): number {
  // Simplified accuracy assessment
  let accuracy = 80;
  
  // More inputs generally mean higher accuracy
  const inputCount = Object.keys(inputs).length;
  if (inputCount > 20) accuracy += 5;
  if (inputCount < 15) accuracy -= 5;
  
  return Math.max(70, Math.min(95, accuracy));
}

/**
 * Assess data quality
 */
function assessDataQuality(inputs: AccretionDilutionInputs): number {
  // Simplified data quality assessment
  let quality = 85;
  
  // Check for reasonable values
  if (inputs.targetEBITDA <= 0 || inputs.acquirerEBITDA <= 0) quality -= 10;
  if (inputs.purchasePrice <= 0) quality -= 20;
  
  return Math.max(60, Math.min(100, quality));
}

/**
 * Generate comprehensive M&A analysis report
 */
export function generateAccretionDilutionAnalysis(inputs: AccretionDilutionInputs, outputs: AccretionDilutionOutputs): string {
  const isAccretive = outputs.epsAccretionDilution > 0;
  const accretionText = isAccretive ? 'accretive' : 'dilutive';
  
  return `
# M&A Accretion/Dilution Analysis Report

## Executive Summary
This ${inputs.dealType} transaction is **${outputs.epsAccretionDilution.toFixed(1)}% ${accretionText}** to earnings per share in Year 1, with a **${outputs.premiumPercentage.toFixed(1)}% premium** paid over the target's current market value.

**Investment Recommendation: ${outputs.analysis.recommendationRating}**

## Transaction Overview
- **Target Company**: ${inputs.targetRevenue.toLocaleString()} revenue, ${inputs.targetEBITDA.toLocaleString()} EBITDA
- **Purchase Price**: $${inputs.purchasePrice.toLocaleString()}
- **Transaction Value**: $${outputs.totalTransactionValue.toLocaleString()}
- **Payment Structure**: ${inputs.cashPortion}% cash, ${inputs.stockPortion}% stock
- **Premium Paid**: ${outputs.premiumPercentage.toFixed(1)}% (${outputs.premiumPaid.toLocaleString()})

## Financial Impact Analysis

### Pro Forma Metrics
- **Combined Revenue**: $${outputs.proFormaRevenue.toLocaleString()}
- **Combined EBITDA**: $${outputs.proFormaEBITDA.toLocaleString()}
- **Pro Forma EPS**: $${outputs.proFormaEPS.toFixed(2)}
- **EPS Impact**: ${outputs.epsAccretionDilution.toFixed(1)}% ${accretionText}

### Synergy Analysis
- **Total Annual Synergies**: $${outputs.totalSynergies.toLocaleString()}
- **NPV of Synergies**: $${outputs.netPresentValueSynergies.toLocaleString()}
- **Synergy Multiple**: ${outputs.synergyMultiple.toFixed(1)}x
- **Revenue Synergies**: $${inputs.synergiesRevenue.toLocaleString()}
- **Cost Synergies**: $${inputs.synergiesCost.toLocaleString()}

### Returns Analysis
- **Transaction IRR**: ${outputs.internalRateOfReturn.toFixed(1)}%
- **ROI**: ${outputs.returnOnInvestment.toFixed(1)}%
- **Payback Period**: ${outputs.paybackPeriod.toFixed(1)} years

### Financing Impact
- **Pro Forma Leverage**: ${outputs.proFormaLeverage.toFixed(1)}x
- **Interest Coverage**: ${outputs.interestCoverageRatio.toFixed(1)}x
- **New Debt Issued**: $${inputs.debtFinancing.toLocaleString()}

## Valuation Analysis
- **Implied EV/EBITDA**: ${outputs.impliedEVEBITDA.toFixed(1)}x
- **Market EV/EBITDA**: ${inputs.marketMultiple.toFixed(1)}x
- **Fair Value Estimate**: $${outputs.fairValueEstimate.toFixed(2)} per share
- **Current Target Price**: $${inputs.targetSharePrice.toFixed(2)} per share

## Scenario Analysis
- **Base Case EPS Impact**: ${outputs.scenarioAnalysis.base.toFixed(1)}%
- **Optimistic Case**: ${outputs.scenarioAnalysis.optimistic.toFixed(1)}%
- **Pessimistic Case**: ${outputs.scenarioAnalysis.pessimistic.toFixed(1)}%

## Key Investment Highlights
${outputs.analysis.keyDrivers.map(driver => `• ${driver}`).join('\n')}

## Major Risks
${outputs.analysis.majorRisks.map(risk => `• ${risk}`).join('\n')}

## Critical Success Factors
${outputs.analysis.criticalSuccessFactors.map(factor => `• ${factor}`).join('\n')}

## Integration Assessment
- **Integration Complexity**: ${outputs.integrationComplexity}/10
- **Cultural Fit**: ${outputs.culturalFit}/10
- **Operational Overlap**: ${outputs.operationalOverlap}/10
- **Synergy Ramp Period**: ${inputs.synergyRampPeriod} years

## Transaction Timeline
- **Due Diligence**: 2-3 months
- **Regulatory Approval**: ${inputs.regulatoryApprovalTime || 6}-12 months
- **Integration Planning**: 3-6 months
- **Closing**: 1 month

## Recommendation
${outputs.analysis.recommendationRating === 'Strong Buy' ? 
  'This transaction represents an attractive strategic opportunity with strong financial returns and manageable risks.' :
  outputs.analysis.recommendationRating === 'Buy' ?
  'This transaction offers reasonable strategic value with acceptable financial returns.' :
  outputs.analysis.recommendationRating === 'Hold' ?
  'This transaction requires careful consideration of risks and execution capabilities.' :
  'This transaction presents significant risks that may outweigh the potential benefits.'}

**Confidence Level**: ${outputs.confidenceLevel.toFixed(0)}%
**Model Accuracy**: ${outputs.modelAccuracy.toFixed(0)}%

---
*This analysis is based on current market conditions and management projections. Actual results may vary based on execution, market conditions, and other factors.*
  `.trim();
}
