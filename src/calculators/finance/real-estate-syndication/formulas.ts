import { RealEstateSyndicationInputs, RealEstateSyndicationOutputs, RealEstateSyndicationMetrics, RealEstateSyndicationAnalysis, CashFlowProjection, WaterfallCalculation, InvestorSummary, SponsorSummary, TaxAnalysis, SensitivityAnalysis, StressTestResult } from './types';

export function calculateRealEstateSyndication(inputs: RealEstateSyndicationInputs): RealEstateSyndicationOutputs {
  // Calculate key metrics
  const metrics = calculateRealEstateSyndicationMetrics(inputs);
  
  // Generate cash flow projections
  const cashFlowProjections = generateCashFlowProjections(inputs);
  
  // Calculate waterfall structure
  const waterfallCalculations = calculateWaterfallStructure(inputs);
  
  // Generate analysis
  const analysis = generateAnalysis(inputs, metrics);
  
  // Calculate investor summary
  const investorSummary = calculateInvestorSummary(inputs, metrics);
  
  // Calculate sponsor summary
  const sponsorSummary = calculateSponsorSummary(inputs, metrics);
  
  // Calculate tax analysis
  const taxAnalysis = calculateTaxAnalysis(inputs, metrics);
  
  // Generate sensitivity analysis
  const sensitivityAnalysis = generateSensitivityAnalysis(inputs, metrics);
  
  // Generate stress test results
  const stressTestResults = generateStressTestResults(inputs, metrics);
  
  return {
    metrics,
    cashFlowProjections,
    waterfallCalculations,
    analysis,
    investorSummary,
    sponsorSummary,
    taxAnalysis,
    sensitivityAnalysis,
    stressTestResults
  };
}

export function calculateRealEstateSyndicationMetrics(inputs: RealEstateSyndicationInputs): RealEstateSyndicationMetrics {
  // Basic property metrics
  const netOperatingIncome = inputs.currentRentRoll - inputs.operatingExpenses;
  const capRate = (netOperatingIncome / inputs.propertyValue) * 100;
  
  // Financing metrics
  const totalEquityInvestment = inputs.totalEquityNeeded;
  const totalDebtFinancing = inputs.debtFinancing;
  const loanToValueRatio = (totalDebtFinancing / inputs.propertyValue) * 100;
  
  // Debt service calculation
  const monthlyInterestRate = inputs.interestRate / 100 / 12;
  const numberOfPayments = inputs.loanTerm * 12;
  const monthlyPayment = totalDebtFinancing * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  const annualDebtService = monthlyPayment * 12;
  
  // Cash flow
  const cashFlow = netOperatingIncome - annualDebtService;
  const cashOnCashReturn = (cashFlow / totalEquityInvestment) * 100;
  
  // Projected returns
  const projectedIRR = calculateProjectedIRR(inputs, cashFlowProjections);
  const projectedEquityMultiple = calculateProjectedEquityMultiple(inputs, cashFlowProjections);
  
  // Investor and sponsor returns
  const investorIRR = calculateInvestorIRR(inputs, projectedIRR);
  const sponsorIRR = calculateSponsorIRR(inputs, projectedIRR);
  
  return {
    netOperatingIncome,
    capRate,
    totalEquityInvestment,
    totalDebtFinancing,
    loanToValueRatio,
    debtService: annualDebtService,
    cashFlow,
    cashOnCashReturn,
    projectedIRR,
    projectedEquityMultiple,
    investorIRR,
    sponsorIRR
  };
}

function generateCashFlowProjections(inputs: RealEstateSyndicationInputs): CashFlowProjection[] {
  const projections: CashFlowProjection[] = [];
  let cumulativeCashFlow = 0;
  
  for (let year = 1; year <= inputs.projectedHoldPeriod; year++) {
    // Projected rent growth
    const rentGrowthFactor = Math.pow(1 + inputs.projectedRentGrowth / 100, year);
    const projectedGrossIncome = inputs.currentRentRoll * rentGrowthFactor;
    
    // Projected operating expenses
    const expenseGrowthFactor = Math.pow(1 + inputs.inflationRate / 100, year);
    const projectedOperatingExpenses = inputs.operatingExpenses * expenseGrowthFactor;
    
    // Net operating income
    const netOperatingIncome = projectedGrossIncome - projectedOperatingExpenses;
    
    // Debt service (assumes fixed rate)
    const monthlyInterestRate = inputs.interestRate / 100 / 12;
    const numberOfPayments = inputs.loanTerm * 12;
    const monthlyPayment = inputs.debtFinancing * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const annualDebtService = monthlyPayment * 12;
    
    // Cash flow
    const cashFlow = netOperatingIncome - annualDebtService;
    cumulativeCashFlow += cashFlow;
    
    projections.push({
      year,
      grossIncome: projectedGrossIncome,
      netOperatingIncome,
      debtService: annualDebtService,
      cashFlow,
      cumulativeCashFlow
    });
  }
  
  return projections;
}

function calculateWaterfallStructure(inputs: RealEstateSyndicationInputs): WaterfallCalculation[] {
  const waterfall: WaterfallCalculation[] = [];
  
  // Tier 1: Preferred Return
  waterfall.push({
    tier: 1,
    tierName: 'Preferred Return',
    irrThreshold: inputs.preferredReturn,
    promotePercentage: 0,
    investorShare: 100,
    sponsorShare: 0
  });
  
  // Tier 2: Catch-up
  waterfall.push({
    tier: 2,
    tierName: 'Catch-up',
    irrThreshold: inputs.tier1Threshold,
    promotePercentage: inputs.catchUpPercentage,
    investorShare: 100 - inputs.catchUpPercentage,
    sponsorShare: inputs.catchUpPercentage
  });
  
  // Tier 3: First Promote
  waterfall.push({
    tier: 3,
    tierName: 'First Promote',
    irrThreshold: inputs.tier2Threshold,
    promotePercentage: inputs.promoteTier1,
    investorShare: 100 - inputs.promoteTier1,
    sponsorShare: inputs.promoteTier1
  });
  
  // Tier 4: Second Promote
  waterfall.push({
    tier: 4,
    tierName: 'Second Promote',
    irrThreshold: inputs.tier3Threshold,
    promotePercentage: inputs.promoteTier2,
    investorShare: 100 - inputs.promoteTier2,
    sponsorShare: inputs.promoteTier2
  });
  
  // Tier 5: Third Promote
  waterfall.push({
    tier: 5,
    tierName: 'Third Promote',
    irrThreshold: 999, // Very high threshold
    promotePercentage: inputs.promoteTier3,
    investorShare: 100 - inputs.promoteTier3,
    sponsorShare: inputs.promoteTier3
  });
  
  return waterfall;
}

function generateAnalysis(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): RealEstateSyndicationAnalysis {
  // Risk assessment
  const riskAssessment = calculateRiskAssessment(inputs, metrics);
  
  // Key benefits
  const keyBenefits = generateKeyBenefits(inputs, metrics);
  
  // Key risks
  const keyRisks = generateKeyRisks(inputs, metrics);
  
  // Recommendations
  const recommendations = generateRecommendations(inputs, metrics);
  
  return {
    riskAssessment,
    keyBenefits,
    keyRisks,
    recommendations
  };
}

function calculateInvestorSummary(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): InvestorSummary {
  const totalInvestors = Math.min(inputs.investorCount, inputs.maximumInvestors);
  const averageInvestment = inputs.investorEquity / totalInvestors;
  
  return {
    totalInvestors,
    averageInvestment,
    projectedIRR: metrics.investorIRR,
    projectedEquityMultiple: metrics.projectedEquityMultiple,
    minimumInvestment: inputs.minimumInvestment,
    maximumInvestment: inputs.investorEquity,
    accreditedInvestorRequirement: inputs.accreditedInvestorRequirement,
    foreignInvestorAllowed: inputs.foreignInvestorAllowed,
    selfDirectedIRAAllowed: inputs.selfDirectedIRAAllowed
  };
}

function calculateSponsorSummary(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): SponsorSummary {
  const equityContribution = inputs.sponsorEquity;
  const promoteValue = calculatePromoteValue(inputs, metrics);
  const totalCompensation = promoteValue + calculateManagementFees(inputs);
  
  return {
    equityContribution,
    promoteValue,
    projectedIRR: metrics.sponsorIRR,
    totalCompensation,
    managementFees: calculateManagementFees(inputs),
    acquisitionFees: calculateAcquisitionFees(inputs),
    dispositionFees: calculateDispositionFees(inputs)
  };
}

function calculateTaxAnalysis(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): TaxAnalysis {
  const depreciationExpense = calculateDepreciationExpense(inputs);
  const taxableIncome = metrics.netOperatingIncome - depreciationExpense;
  const taxLiability = taxableIncome * (inputs.taxRate / 100);
  const afterTaxCashFlow = metrics.cashFlow - taxLiability;
  
  return {
    depreciationExpense,
    taxableIncome,
    taxLiability,
    afterTaxCashFlow,
    effectiveTaxRate: (taxLiability / metrics.netOperatingIncome) * 100,
    depreciationMethod: inputs.depreciationMethod,
    recoveryPeriod: inputs.recoveryPeriod,
    bonusDepreciationEligible: inputs.bonusDepreciationEligible,
    bonusDepreciationPercentage: inputs.bonusDepreciationPercentage
  };
}

function generateSensitivityAnalysis(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): SensitivityAnalysis {
  const scenarios = [];
  
  // Base case
  scenarios.push({
    scenario: 'Base Case',
    capRate: inputs.capRate,
    irr: metrics.projectedIRR,
    equityMultiple: metrics.projectedEquityMultiple
  });
  
  // Optimistic case
  scenarios.push({
    scenario: 'Optimistic',
    capRate: inputs.capRate - 0.5,
    irr: metrics.projectedIRR + 2,
    equityMultiple: metrics.projectedEquityMultiple + 0.2
  });
  
  // Pessimistic case
  scenarios.push({
    scenario: 'Pessimistic',
    capRate: inputs.capRate + 0.5,
    irr: metrics.projectedIRR - 2,
    equityMultiple: metrics.projectedEquityMultiple - 0.2
  });
  
  return {
    scenarios,
    keyVariables: ['Cap Rate', 'Rent Growth', 'Interest Rate', 'Exit Value'],
    impactLevels: ['Low', 'Medium', 'High']
  };
}

function generateStressTestResults(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): StressTestResult[] {
  const stressTests = [];
  
  // Interest rate stress test
  stressTests.push({
    testName: 'Interest Rate Increase',
    scenario: 'Interest rate increases by 2%',
    impact: 'Medium',
    irrImpact: -1.5,
    cashFlowImpact: -15,
    recommendation: 'Consider interest rate caps or hedging strategies'
  });
  
  // Vacancy stress test
  stressTests.push({
    testName: 'Increased Vacancy',
    scenario: 'Vacancy rate increases to 15%',
    impact: 'High',
    irrImpact: -3.0,
    cashFlowImpact: -25,
    recommendation: 'Implement aggressive leasing strategies and maintain reserves'
  });
  
  // Market downturn stress test
  stressTests.push({
    testName: 'Market Downturn',
    scenario: 'Property value decreases by 20%',
    impact: 'High',
    irrImpact: -5.0,
    cashFlowImpact: -10,
    recommendation: 'Maintain adequate reserves and consider value-add strategies'
  });
  
  return stressTests;
}

// Helper functions
function calculateProjectedIRR(inputs: RealEstateSyndicationInputs, cashFlowProjections: CashFlowProjection[]): number {
  // Simplified IRR calculation
  const totalInvestment = inputs.totalEquityNeeded;
  const totalCashFlow = cashFlowProjections.reduce((sum, projection) => sum + projection.cashFlow, 0);
  const exitValue = inputs.exitValue;
  const totalReturn = totalCashFlow + exitValue - totalInvestment;
  
  // Simple annualized return calculation
  const annualizedReturn = Math.pow((totalReturn + totalInvestment) / totalInvestment, 1 / inputs.projectedHoldPeriod) - 1;
  return annualizedReturn * 100;
}

function calculateProjectedEquityMultiple(inputs: RealEstateSyndicationInputs, cashFlowProjections: CashFlowProjection[]): number {
  const totalInvestment = inputs.totalEquityNeeded;
  const totalCashFlow = cashFlowProjections.reduce((sum, projection) => sum + projection.cashFlow, 0);
  const exitValue = inputs.exitValue;
  const totalReturn = totalCashFlow + exitValue;
  
  return totalReturn / totalInvestment;
}

function calculateInvestorIRR(inputs: RealEstateSyndicationInputs, projectedIRR: number): number {
  // Adjust for sponsor promote
  const promoteImpact = inputs.sponsorPromote / 100;
  return projectedIRR * (1 - promoteImpact);
}

function calculateSponsorIRR(inputs: RealEstateSyndicationInputs, projectedIRR: number): number {
  // Sponsor gets higher return due to promote
  const promoteImpact = inputs.sponsorPromote / 100;
  return projectedIRR * (1 + promoteImpact);
}

function calculateRiskAssessment(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics) {
  let riskScore = 50; // Base risk score
  
  // Adjust based on LTV
  if (metrics.loanToValueRatio > 80) riskScore += 20;
  else if (metrics.loanToValueRatio > 70) riskScore += 10;
  else if (metrics.loanToValueRatio < 50) riskScore -= 10;
  
  // Adjust based on cap rate
  if (metrics.capRate < 5) riskScore += 15;
  else if (metrics.capRate > 8) riskScore -= 10;
  
  // Adjust based on cash-on-cash return
  if (metrics.cashOnCashReturn < 5) riskScore += 15;
  else if (metrics.cashOnCashReturn > 10) riskScore -= 10;
  
  // Determine risk level
  let overallRisk: 'low' | 'medium' | 'high';
  if (riskScore < 40) overallRisk = 'low';
  else if (riskScore < 70) overallRisk = 'medium';
  else overallRisk = 'high';
  
  return {
    overallRisk,
    riskScore: Math.max(0, Math.min(100, riskScore)),
    riskFactors: ['LTV Ratio', 'Cap Rate', 'Cash-on-Cash Return', 'Market Conditions']
  };
}

function generateKeyBenefits(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): string[] {
  const benefits = [];
  
  if (metrics.projectedIRR > 15) {
    benefits.push('High projected IRR above 15%');
  }
  
  if (metrics.cashOnCashReturn > 8) {
    benefits.push('Strong cash-on-cash return');
  }
  
  if (metrics.loanToValueRatio < 70) {
    benefits.push('Conservative leverage with low LTV');
  }
  
  if (inputs.syndicationType === '506(b)') {
    benefits.push('Regulation D 506(b) offering provides flexibility');
  }
  
  benefits.push('Professional management and oversight');
  benefits.push('Diversification benefits');
  benefits.push('Tax advantages through depreciation');
  
  return benefits;
}

function generateKeyRisks(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): string[] {
  const risks = [];
  
  if (metrics.loanToValueRatio > 80) {
    risks.push('High leverage increases refinancing risk');
  }
  
  if (metrics.capRate < 5) {
    risks.push('Low cap rate indicates potential overvaluation');
  }
  
  if (metrics.cashOnCashReturn < 5) {
    risks.push('Low cash-on-cash return may not cover investor expectations');
  }
  
  risks.push('Market risk and economic downturns');
  risks.push('Interest rate risk on floating rate debt');
  risks.push('Property management and operational risks');
  risks.push('Liquidity risk - limited ability to sell quickly');
  risks.push('Regulatory and compliance risks');
  
  return risks;
}

function generateRecommendations(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): string[] {
  const recommendations = [];
  
  if (metrics.loanToValueRatio > 80) {
    recommendations.push('Consider reducing leverage to improve risk profile');
  }
  
  if (metrics.capRate < 5) {
    recommendations.push('Review property valuation and market comparables');
  }
  
  if (metrics.cashOnCashReturn < 5) {
    recommendations.push('Implement value-add strategies to improve returns');
  }
  
  recommendations.push('Maintain adequate reserves for unexpected expenses');
  recommendations.push('Implement comprehensive property management plan');
  recommendations.push('Consider interest rate hedging strategies');
  recommendations.push('Regular market analysis and exit strategy review');
  
  return recommendations;
}

function calculatePromoteValue(inputs: RealEstateSyndicationInputs, metrics: RealEstateSyndicationMetrics): number {
  const totalReturn = metrics.projectedEquityMultiple * inputs.totalEquityNeeded;
  const promotePercentage = inputs.sponsorPromote / 100;
  return totalReturn * promotePercentage;
}

function calculateManagementFees(inputs: RealEstateSyndicationInputs): number {
  return inputs.currentRentRoll * (inputs.managementFee / 100);
}

function calculateAcquisitionFees(inputs: RealEstateSyndicationInputs): number {
  return inputs.totalAcquisitionCost * (inputs.acquisitionFee / 100);
}

function calculateDispositionFees(inputs: RealEstateSyndicationInputs): number {
  return inputs.exitValue * (inputs.dispositionFee / 100);
}

function calculateDepreciationExpense(inputs: RealEstateSyndicationInputs): number {
  const depreciableBasis = inputs.buildingValue;
  const annualDepreciation = depreciableBasis / inputs.recoveryPeriod;
  
  if (inputs.bonusDepreciationEligible && inputs.bonusDepreciationPercentage > 0) {
    const bonusDepreciation = depreciableBasis * (inputs.bonusDepreciationPercentage / 100);
    return bonusDepreciation + annualDepreciation;
  }
  
  return annualDepreciation;
}