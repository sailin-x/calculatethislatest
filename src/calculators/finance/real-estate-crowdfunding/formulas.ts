import { RealEstateCrowdfundingInputs, RealEstateCrowdfundingOutputs, RealEstateCrowdfundingAnalysis, RealEstateCrowdfundingMetrics, CashFlowProjection, ExitScenario, RiskScenario } from './types';

export function calculateRealEstateCrowdfunding(inputs: RealEstateCrowdfundingInputs): RealEstateCrowdfundingOutputs {
  // Calculate basic metrics
  const metrics = calculateRealEstateCrowdfundingMetrics(inputs);
  
  // Generate cash flow projections
  const cashFlowProjections = calculateCashFlowProjections(inputs, metrics);
  
  // Generate exit scenarios
  const exitScenarios = calculateExitScenarios(inputs, metrics);
  
  // Generate risk scenarios
  const riskScenarios = calculateRiskScenarios(inputs, metrics);
  
  // Generate analysis
  const analysis = calculateRealEstateCrowdfundingAnalysis(inputs, metrics);
  
  return {
    // Basic Information
    investmentAmount: inputs.investmentAmount,
    effectiveInvestment: metrics.effectiveInvestment,
    investmentType: inputs.investmentType,
    investmentTerm: inputs.investmentTerm,
    propertyValue: inputs.propertyValue,
    propertyType: inputs.propertyType,
    
    // Return Metrics
    totalReturn: metrics.totalReturn,
    annualizedReturn: metrics.annualizedReturn,
    irr: metrics.irr,
    equityMultiple: metrics.equityMultiple,
    cashOnCashReturn: metrics.cashOnCashReturn,
    
    // Risk Metrics
    riskAdjustedReturn: metrics.riskAdjustedReturn,
    sharpeRatio: metrics.sharpeRatio,
    maximumDrawdown: metrics.maximumDrawdown,
    valueAtRisk: metrics.valueAtRisk,
    
    // Cash Flow Analysis
    monthlyCashFlow: metrics.monthlyCashFlow,
    annualCashFlow: metrics.annualCashFlow,
    totalCashFlow: metrics.totalCashFlow,
    cashFlowYield: metrics.cashFlowYield,
    
    // Tax Analysis
    taxableIncome: metrics.taxableIncome,
    taxLiability: metrics.taxLiability,
    afterTaxReturn: metrics.afterTaxReturn,
    taxEfficiency: metrics.taxEfficiency,
    
    // Platform Analysis
    platformFees: metrics.platformFees,
    totalFees: metrics.totalFees,
    netInvestment: metrics.netInvestment,
    feeImpact: metrics.feeImpact,
    
    // Liquidity Analysis
    liquidityScore: metrics.liquidityScore,
    timeToLiquidity: metrics.timeToLiquidity,
    secondaryMarketValue: metrics.secondaryMarketValue,
    
    // Property Performance
    propertyAppreciation: metrics.propertyAppreciation,
    rentalGrowth: metrics.rentalGrowth,
    marketValueGrowth: metrics.marketValueGrowth,
    
    // Analysis Arrays
    cashFlowProjections,
    exitScenarios,
    riskScenarios,
    
    // Analysis Object
    analysis,
    
    // Additional Metrics
    investmentRating: analysis.investmentRating,
    riskRating: analysis.riskRating,
    liquidityRating: analysis.liquidityRating,
    taxEfficiencyRating: analysis.taxEfficiencyRating,
    
    // Investment Details
    investmentMultiple: metrics.investmentMultiple,
    modifiedIRR: metrics.modifiedIRR,
    sortinoRatio: metrics.sortinoRatio,
    beta: metrics.beta,
    
    // Summary
    investmentSummary: {
      totalInvestment: inputs.investmentAmount,
      projectedReturn: metrics.totalReturn,
      riskLevel: analysis.riskRating,
      liquidityLevel: analysis.liquidityRating,
      recommendation: analysis.recommendation,
    },
  };
}

function calculateRealEstateCrowdfundingMetrics(inputs: RealEstateCrowdfundingInputs): RealEstateCrowdfundingMetrics {
  // Platform fees calculation
  const platformFees = inputs.platformFeeType === 'percentage' 
    ? inputs.investmentAmount * (inputs.platformFee / 100)
    : inputs.platformFee;
  
  const effectiveInvestment = inputs.investmentAmount - platformFees;
  const netInvestment = effectiveInvestment;
  
  // Basic cash flow calculations
  const monthlyRent = inputs.annualRent / 12;
  const monthlyOperatingExpenses = inputs.operatingExpenses / 12;
  const monthlyDebtService = calculateMonthlyDebtService(inputs.loanAmount, inputs.interestRate, inputs.loanTerm);
  
  const monthlyCashFlow = monthlyRent - monthlyOperatingExpenses - monthlyDebtService;
  const annualCashFlow = monthlyCashFlow * 12;
  const totalCashFlow = annualCashFlow * (inputs.investmentTerm / 12);
  
  // Return calculations
  const totalReturn = totalCashFlow + (inputs.projectedExitValue - inputs.propertyValue) * (effectiveInvestment / inputs.propertyValue);
  const annualizedReturn = ((totalReturn / effectiveInvestment) / (inputs.investmentTerm / 12)) * 100;
  const irr = calculateIRR(effectiveInvestment, cashFlowProjectionsToArray(inputs, totalCashFlow, inputs.projectedExitValue));
  const equityMultiple = (effectiveInvestment + totalReturn) / effectiveInvestment;
  const cashOnCashReturn = (annualCashFlow / effectiveInvestment) * 100;
  const cashFlowYield = (annualCashFlow / inputs.propertyValue) * 100;
  
  // Investment multiple
  const investmentMultiple = (effectiveInvestment + totalReturn) / effectiveInvestment;
  
  // Risk calculations
  const riskAdjustedReturn = calculateRiskAdjustedReturn(annualizedReturn, inputs);
  const sharpeRatio = calculateSharpeRatio(annualizedReturn, inputs);
  const sortinoRatio = calculateSortinoRatio(annualizedReturn, inputs);
  const maximumDrawdown = calculateMaximumDrawdown(inputs);
  const valueAtRisk = calculateValueAtRisk(inputs);
  const beta = calculateBeta(inputs);
  
  // Tax calculations
  const taxableIncome = calculateTaxableIncome(annualCashFlow, inputs);
  const taxLiability = calculateTaxLiability(taxableIncome, inputs);
  const afterTaxReturn = annualizedReturn - (taxLiability / effectiveInvestment) * 100;
  const taxEfficiency = (afterTaxReturn / annualizedReturn) * 100;
  
  // Liquidity calculations
  const liquidityScore = calculateLiquidityScore(inputs);
  const timeToLiquidity = inputs.minimumHoldPeriod;
  const secondaryMarketValue = calculateSecondaryMarketValue(effectiveInvestment, inputs);
  
  // Property performance
  const propertyAppreciation = inputs.marketAppreciationRate;
  const rentalGrowth = calculateRentalGrowth(inputs);
  const marketValueGrowth = calculateMarketValueGrowth(inputs);
  
  // Modified IRR
  const modifiedIRR = calculateModifiedIRR(effectiveInvestment, cashFlowProjectionsToArray(inputs, totalCashFlow, inputs.projectedExitValue));
  
  return {
    totalInvestment: inputs.investmentAmount,
    effectiveInvestment,
    investmentMultiple,
    totalReturn,
    annualizedReturn,
    irr,
    modifiedIRR,
    equityMultiple,
    totalReturnPercentage: (totalReturn / effectiveInvestment) * 100,
    annualizedReturnPercentage: annualizedReturn,
    
    monthlyCashFlow,
    annualCashFlow,
    totalCashFlow,
    cashOnCashReturn,
    cashFlowYield,
    
    riskAdjustedReturn,
    sharpeRatio,
    sortinoRatio,
    maximumDrawdown,
    valueAtRisk,
    beta,
    
    taxableIncome,
    taxLiability,
    afterTaxReturn,
    taxEfficiency,
    depreciationBenefit: calculateDepreciationBenefit(inputs),
    
    liquidityScore,
    timeToLiquidity,
    secondaryMarketValue,
    earlyExitValue: calculateEarlyExitValue(effectiveInvestment, inputs),
    
    platformFees,
    totalFees: platformFees,
    netInvestment,
    feeImpact: (platformFees / inputs.investmentAmount) * 100,
    
    propertyAppreciation,
    rentalGrowth,
    occupancyImpact: calculateOccupancyImpact(inputs),
    marketValueGrowth,
  };
}

function calculateCashFlowProjections(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): CashFlowProjection[] {
  const projections: CashFlowProjection[] = [];
  const totalPeriods = Math.ceil(inputs.investmentTerm / 12);
  
  let cumulativeCashFlow = 0;
  let currentRent = inputs.annualRent;
  let currentExpenses = inputs.operatingExpenses;
  
  for (let period = 1; period <= totalPeriods; period++) {
    // Apply growth rates
    if (period > 1) {
      currentRent *= (1 + inputs.marketAppreciationRate / 100);
      currentExpenses *= (1 + inputs.inflationRate / 100);
    }
    
    const rentalIncome = currentRent;
    const operatingExpenses = currentExpenses;
    const debtService = metrics.monthlyCashFlow < 0 ? Math.abs(metrics.monthlyCashFlow) * 12 : 0;
    const netCashFlow = rentalIncome - operatingExpenses - debtService;
    
    cumulativeCashFlow += netCashFlow;
    const returnOnInvestment = (cumulativeCashFlow / inputs.investmentAmount) * 100;
    
    projections.push({
      period,
      date: new Date(Date.now() + period * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      rentalIncome,
      operatingExpenses,
      debtService,
      netCashFlow,
      cumulativeCashFlow,
      returnOnInvestment,
    });
  }
  
  return projections;
}

function calculateExitScenarios(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): ExitScenario[] {
  const scenarios: ExitScenario[] = [];
  
  // Base case scenario
  scenarios.push({
    scenario: 'Base Case',
    probability: 50,
    exitValue: inputs.projectedExitValue,
    exitYear: inputs.projectedExitYear,
    totalReturn: metrics.totalReturnPercentage,
    irr: metrics.irr,
    equityMultiple: metrics.equityMultiple,
  });
  
  // Optimistic scenario
  const optimisticExitValue = inputs.projectedExitValue * 1.3;
  const optimisticReturn = calculateScenarioReturn(inputs.investmentAmount, metrics.totalCashFlow, optimisticExitValue, inputs.investmentTerm);
  scenarios.push({
    scenario: 'Optimistic',
    probability: 25,
    exitValue: optimisticExitValue,
    exitYear: inputs.projectedExitYear,
    totalReturn: optimisticReturn.totalReturn,
    irr: optimisticReturn.irr,
    equityMultiple: optimisticReturn.equityMultiple,
  });
  
  // Pessimistic scenario
  const pessimisticExitValue = inputs.projectedExitValue * 0.7;
  const pessimisticReturn = calculateScenarioReturn(inputs.investmentAmount, metrics.totalCashFlow, pessimisticExitValue, inputs.investmentTerm);
  scenarios.push({
    scenario: 'Pessimistic',
    probability: 25,
    exitValue: pessimisticExitValue,
    exitYear: inputs.projectedExitYear,
    totalReturn: pessimisticReturn.totalReturn,
    irr: pessimisticReturn.irr,
    equityMultiple: pessimisticReturn.equityMultiple,
  });
  
  return scenarios;
}

function calculateRiskScenarios(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): RiskScenario[] {
  const scenarios: RiskScenario[] = [];
  
  // Market risk
  scenarios.push({
    scenario: 'Market Downturn',
    probability: 15,
    impact: 'high',
    description: 'Property values decline due to economic recession',
    mitigation: 'Diversify across multiple properties and markets',
  });
  
  // Interest rate risk
  scenarios.push({
    scenario: 'Interest Rate Increase',
    probability: 20,
    impact: 'medium',
    description: 'Rising interest rates affect refinancing and property values',
    mitigation: 'Lock in long-term financing and monitor rate trends',
  });
  
  // Liquidity risk
  scenarios.push({
    scenario: 'Liquidity Constraint',
    probability: 30,
    impact: 'high',
    description: 'Unable to sell investment when needed',
    mitigation: 'Choose platforms with secondary market options',
  });
  
  // Tenant risk
  scenarios.push({
    scenario: 'Tenant Default',
    probability: 10,
    impact: 'medium',
    description: 'Major tenant fails to pay rent',
    mitigation: 'Diversify tenant base and maintain reserves',
  });
  
  // Regulatory risk
  scenarios.push({
    scenario: 'Regulatory Changes',
    probability: 5,
    impact: 'low',
    description: 'New regulations affect crowdfunding or real estate',
    mitigation: 'Stay informed about regulatory developments',
  });
  
  return scenarios;
}

function calculateRealEstateCrowdfundingAnalysis(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): RealEstateCrowdfundingAnalysis {
  // Calculate ratings
  const investmentRating = calculateInvestmentRating(metrics);
  const riskRating = calculateRiskRating(inputs, metrics);
  const liquidityRating = calculateLiquidityRating(inputs);
  const taxEfficiencyRating = calculateTaxEfficiencyRating(metrics);
  
  // Generate recommendation
  const recommendation = generateRecommendation(metrics, inputs);
  
  // Generate strengths and weaknesses
  const keyStrengths = generateKeyStrengths(metrics, inputs);
  const keyWeaknesses = generateKeyWeaknesses(metrics, inputs);
  
  // Generate optimization suggestions
  const optimizationSuggestions = generateOptimizationSuggestions(metrics, inputs);
  
  // Generate risk assessment
  const investmentRisks = generateInvestmentRisks(inputs, metrics);
  const mitigationStrategies = generateMitigationStrategies(inputs);
  const contingencyPlans = generateContingencyPlans(inputs);
  
  // Generate market analysis
  const marketOutlook = generateMarketOutlook(inputs);
  const marketFactors = generateMarketFactors(inputs);
  const economicImpact = generateEconomicImpact(inputs);
  const futureProjections = generateFutureProjections(inputs, metrics);
  
  // Generate tax analysis
  const taxImplications = generateTaxImplications(inputs, metrics);
  const taxOptimization = generateTaxOptimization(inputs);
  const taxRisks = generateTaxRisks(inputs);
  
  // Generate liquidity analysis
  const liquidityFactors = generateLiquidityFactors(inputs);
  const exitOptions = generateExitOptions(inputs);
  const secondaryMarketAnalysis = generateSecondaryMarketAnalysis(inputs);
  
  // Generate platform analysis
  const platformStrengths = generatePlatformStrengths(inputs);
  const platformWeaknesses = generatePlatformWeaknesses(inputs);
  const platformComparison = generatePlatformComparison(inputs);
  
  // Generate action items
  const nextSteps = generateNextSteps(inputs, metrics);
  const timeline = generateTimeline(inputs);
  const priorityActions = generatePriorityActions(inputs, metrics);
  
  // Generate performance benchmarks
  const performanceBenchmarks = generatePerformanceBenchmarks(metrics);
  
  // Generate presentation data
  const presentationPoints = generatePresentationPoints(metrics, inputs);
  const decisionFactors = generateDecisionFactors(metrics, inputs);
  const summaryPoints = generateSummaryPoints(metrics, inputs);
  
  return {
    investmentRating,
    riskRating,
    liquidityRating,
    taxEfficiencyRating,
    recommendation,
    keyStrengths,
    keyWeaknesses,
    optimizationSuggestions,
    investmentRisks,
    mitigationStrategies,
    contingencyPlans,
    marketOutlook,
    marketFactors,
    economicImpact,
    futureProjections,
    taxImplications,
    taxOptimization,
    taxRisks,
    liquidityFactors,
    exitOptions,
    secondaryMarketAnalysis,
    platformStrengths,
    platformWeaknesses,
    platformComparison,
    nextSteps,
    timeline,
    priorityActions,
    performanceBenchmarks,
    presentationPoints,
    decisionFactors,
    summaryPoints,
  };
}

// Helper functions
function calculateMonthlyDebtService(loanAmount: number, interestRate: number, loanTerm: number): number {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  if (monthlyRate === 0) return loanAmount / numberOfPayments;
  
  return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateIRR(initialInvestment: number, cashFlows: number[]): number {
  // Simplified IRR calculation
  const totalCashFlow = cashFlows.reduce((sum, cf) => sum + cf, 0);
  const totalReturn = totalCashFlow - initialInvestment;
  const years = cashFlows.length / 12;
  
  if (years === 0) return 0;
  
  return Math.pow((totalCashFlow / initialInvestment), 1 / years) - 1;
}

function cashFlowProjectionsToArray(inputs: RealEstateCrowdfundingInputs, totalCashFlow: number, exitValue: number): number[] {
  const monthlyCashFlow = totalCashFlow / (inputs.investmentTerm / 12);
  const cashFlows: number[] = [];
  
  for (let i = 0; i < inputs.investmentTerm; i++) {
    if (i === inputs.investmentTerm - 1) {
      cashFlows.push(monthlyCashFlow + exitValue);
    } else {
      cashFlows.push(monthlyCashFlow);
    }
  }
  
  return cashFlows;
}

function calculateRiskAdjustedReturn(returnRate: number, inputs: RealEstateCrowdfundingInputs): number {
  const riskFactor = getRiskFactor(inputs);
  return returnRate - (riskFactor * 2);
}

function calculateSharpeRatio(returnRate: number, inputs: RealEstateCrowdfundingInputs): number {
  const riskFreeRate = 2.5; // Assume 2.5% risk-free rate
  const volatility = getVolatility(inputs);
  return (returnRate - riskFreeRate) / volatility;
}

function calculateSortinoRatio(returnRate: number, inputs: RealEstateCrowdfundingInputs): number {
  const riskFreeRate = 2.5;
  const downsideDeviation = getDownsideDeviation(inputs);
  return (returnRate - riskFreeRate) / downsideDeviation;
}

function calculateMaximumDrawdown(inputs: RealEstateCrowdfundingInputs): number {
  const riskFactor = getRiskFactor(inputs);
  return riskFactor * 15; // 15% base drawdown
}

function calculateValueAtRisk(inputs: RealEstateCrowdfundingInputs): number {
  const riskFactor = getRiskFactor(inputs);
  return riskFactor * 10; // 10% base VaR
}

function calculateBeta(inputs: RealEstateCrowdfundingInputs): number {
  const marketRisk = getMarketRiskScore(inputs.propertyMarketRisk);
  return 0.5 + (marketRisk * 0.5); // Beta between 0.5 and 1.0
}

function calculateTaxableIncome(annualCashFlow: number, inputs: RealEstateCrowdfundingInputs): number {
  const depreciation = inputs.propertyValue * 0.0275; // 27.5 years for residential
  return Math.max(0, annualCashFlow - depreciation);
}

function calculateTaxLiability(taxableIncome: number, inputs: RealEstateCrowdfundingInputs): number {
  const totalTaxRate = (inputs.taxBracket + inputs.stateTaxRate + inputs.localTaxRate) / 100;
  return taxableIncome * totalTaxRate;
}

function calculateLiquidityScore(inputs: RealEstateCrowdfundingInputs): number {
  let score = 50; // Base score
  
  // Adjust based on liquidity options
  switch (inputs.liquidityOptions) {
    case 'secondary_market': score += 30; break;
    case 'buyback_program': score += 25; break;
    case 'periodic_redemption': score += 20; break;
    case 'none': score -= 20; break;
  }
  
  // Adjust based on hold period
  if (inputs.minimumHoldPeriod <= 12) score += 20;
  else if (inputs.minimumHoldPeriod <= 24) score += 10;
  else score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function calculateSecondaryMarketValue(effectiveInvestment: number, inputs: RealEstateCrowdfundingInputs): number {
  const discount = inputs.secondaryMarketFee / 100;
  return effectiveInvestment * (1 - discount);
}

function calculateRentalGrowth(inputs: RealEstateCrowdfundingInputs): number {
  return inputs.marketAppreciationRate * 0.8; // Rental growth typically 80% of appreciation
}

function calculateMarketValueGrowth(inputs: RealEstateCrowdfundingInputs): number {
  return inputs.marketAppreciationRate;
}

function calculateModifiedIRR(initialInvestment: number, cashFlows: number[]): number {
  // Simplified MIRR calculation
  return calculateIRR(initialInvestment, cashFlows) * 0.9; // Slightly lower than IRR
}

function calculateDepreciationBenefit(inputs: RealEstateCrowdfundingInputs): number {
  const depreciation = inputs.propertyValue * 0.0275;
  const taxRate = inputs.taxBracket / 100;
  return depreciation * taxRate;
}

function calculateEarlyExitValue(effectiveInvestment: number, inputs: RealEstateCrowdfundingInputs): number {
  const penalty = inputs.earlyExitPenalty / 100;
  return effectiveInvestment * (1 - penalty);
}

function calculateOccupancyImpact(inputs: RealEstateCrowdfundingInputs): number {
  return (100 - inputs.occupancyRate) * 0.5; // 0.5% impact per 1% vacancy
}

function calculateScenarioReturn(investment: number, cashFlow: number, exitValue: number, term: number): { totalReturn: number; irr: number; equityMultiple: number } {
  const totalReturn = ((cashFlow + exitValue - investment) / investment) * 100;
  const irr = Math.pow((cashFlow + exitValue) / investment, 12 / term) - 1;
  const equityMultiple = (investment + cashFlow + exitValue - investment) / investment;
  
  return { totalReturn, irr: irr * 100, equityMultiple };
}

// Rating calculation functions
function calculateInvestmentRating(metrics: RealEstateCrowdfundingMetrics): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  const score = metrics.irr;
  
  if (score >= 15) return 'Excellent';
  if (score >= 10) return 'Good';
  if (score >= 5) return 'Fair';
  return 'Poor';
}

function calculateRiskRating(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): 'Low' | 'Medium' | 'High' {
  const riskScore = getRiskFactor(inputs);
  
  if (riskScore <= 0.3) return 'Low';
  if (riskScore <= 0.6) return 'Medium';
  return 'High';
}

function calculateLiquidityRating(inputs: RealEstateCrowdfundingInputs): 'High' | 'Medium' | 'Low' {
  const liquidityScore = calculateLiquidityScore(inputs);
  
  if (liquidityScore >= 70) return 'High';
  if (liquidityScore >= 40) return 'Medium';
  return 'Low';
}

function calculateTaxEfficiencyRating(metrics: RealEstateCrowdfundingMetrics): 'Excellent' | 'Good' | 'Fair' | 'Poor' {
  const efficiency = metrics.taxEfficiency;
  
  if (efficiency >= 90) return 'Excellent';
  if (efficiency >= 75) return 'Good';
  if (efficiency >= 60) return 'Fair';
  return 'Poor';
}

// Risk factor calculations
function getRiskFactor(inputs: RealEstateCrowdfundingInputs): number {
  let riskFactor = 0.5; // Base risk factor
  
  // Property market risk
  riskFactor += getMarketRiskScore(inputs.propertyMarketRisk) * 0.2;
  
  // Liquidity risk
  riskFactor += getLiquidityRiskScore(inputs.liquidityRisk) * 0.15;
  
  // Sponsor track record
  riskFactor += getSponsorRiskScore(inputs.sponsorTrackRecord) * 0.1;
  
  // Interest rate environment
  riskFactor += getInterestRateRiskScore(inputs.interestRateEnvironment) * 0.1;
  
  return Math.min(1, Math.max(0, riskFactor));
}

function getMarketRiskScore(risk: string): number {
  switch (risk) {
    case 'low': return 0.2;
    case 'medium': return 0.5;
    case 'high': return 0.8;
    default: return 0.5;
  }
}

function getLiquidityRiskScore(risk: string): number {
  switch (risk) {
    case 'low': return 0.2;
    case 'medium': return 0.5;
    case 'high': return 0.8;
    default: return 0.5;
  }
}

function getSponsorRiskScore(record: string): number {
  switch (record) {
    case 'excellent': return 0.1;
    case 'good': return 0.3;
    case 'fair': return 0.6;
    case 'poor': return 0.9;
    default: return 0.5;
  }
}

function getInterestRateRiskScore(environment: string): number {
  switch (environment) {
    case 'low': return 0.2;
    case 'moderate': return 0.5;
    case 'high': return 0.8;
    case 'rising': return 0.7;
    case 'falling': return 0.3;
    default: return 0.5;
  }
}

function getVolatility(inputs: RealEstateCrowdfundingInputs): number {
  switch (inputs.marketVolatility) {
    case 'low': return 8;
    case 'medium': return 12;
    case 'high': return 18;
    default: return 12;
  }
}

function getDownsideDeviation(inputs: RealEstateCrowdfundingInputs): number {
  return getVolatility(inputs) * 0.7; // Downside deviation is typically 70% of volatility
}

// Analysis generation functions
function generateRecommendation(metrics: RealEstateCrowdfundingMetrics, inputs: RealEstateCrowdfundingInputs): string {
  const rating = calculateInvestmentRating(metrics);
  
  switch (rating) {
    case 'Excellent':
      return 'Strong buy recommendation. This investment offers excellent returns with manageable risk profile.';
    case 'Good':
      return 'Buy recommendation. This investment provides good returns and aligns with typical crowdfunding expectations.';
    case 'Fair':
      return 'Hold recommendation. Consider this investment if it fits your specific investment criteria and risk tolerance.';
    case 'Poor':
      return 'Avoid recommendation. This investment does not meet minimum return requirements for the associated risks.';
    default:
      return 'Neutral recommendation. Further analysis required.';
  }
}

function generateKeyStrengths(metrics: RealEstateCrowdfundingMetrics, inputs: RealEstateCrowdfundingInputs): string[] {
  const strengths: string[] = [];
  
  if (metrics.irr >= 12) strengths.push('Strong IRR above 12%');
  if (metrics.cashOnCashReturn >= 8) strengths.push('Attractive cash-on-cash return');
  if (inputs.liquidityOptions !== 'none') strengths.push('Liquidity options available');
  if (inputs.sponsorTrackRecord === 'excellent' || inputs.sponsorTrackRecord === 'good') {
    strengths.push('Experienced sponsor with good track record');
  }
  if (metrics.taxEfficiency >= 80) strengths.push('Tax-efficient investment structure');
  
  return strengths;
}

function generateKeyWeaknesses(metrics: RealEstateCrowdfundingMetrics, inputs: RealEstateCrowdfundingInputs): string[] {
  const weaknesses: string[] = [];
  
  if (metrics.irr < 8) weaknesses.push('Below-average IRR');
  if (inputs.liquidityRisk === 'high') weaknesses.push('High liquidity risk');
  if (inputs.propertyMarketRisk === 'high') weaknesses.push('High market risk');
  if (inputs.minimumHoldPeriod > 36) weaknesses.push('Long minimum hold period');
  if (metrics.feeImpact > 3) weaknesses.push('High platform fees');
  
  return weaknesses;
}

function generateOptimizationSuggestions(metrics: RealEstateCrowdfundingMetrics, inputs: RealEstateCrowdfundingInputs): string[] {
  const suggestions: string[] = [];
  
  if (metrics.feeImpact > 2) suggestions.push('Consider negotiating lower platform fees');
  if (inputs.liquidityRisk === 'high') suggestions.push('Look for platforms with better liquidity options');
  if (metrics.taxEfficiency < 80) suggestions.push('Consult tax advisor for optimization strategies');
  
  return suggestions;
}

function generateInvestmentRisks(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): string[] {
  const risks: string[] = [];
  
  if (inputs.propertyMarketRisk === 'high') risks.push('Property market volatility');
  if (inputs.liquidityRisk === 'high') risks.push('Limited liquidity options');
  if (inputs.interestRateRisk === 'high') risks.push('Interest rate fluctuations');
  if (inputs.tenantCreditRisk === 'high') risks.push('Tenant credit risk');
  
  return risks;
}

function generateMitigationStrategies(inputs: RealEstateCrowdfundingInputs): string[] {
  const strategies: string[] = [];
  
  strategies.push('Diversify across multiple properties');
  strategies.push('Choose experienced sponsors');
  strategies.push('Monitor market conditions regularly');
  strategies.push('Maintain adequate reserves');
  
  return strategies;
}

function generateContingencyPlans(inputs: RealEstateCrowdfundingInputs): string[] {
  const plans: string[] = [];
  
  plans.push('Have alternative investment options ready');
  plans.push('Maintain emergency fund for unexpected expenses');
  plans.push('Consider insurance coverage for property risks');
  
  return plans;
}

function generateMarketOutlook(inputs: RealEstateCrowdfundingInputs): string {
  if (inputs.marketAppreciationRate > 4) {
    return 'Strong market growth expected with positive appreciation trends.';
  } else if (inputs.marketAppreciationRate > 2) {
    return 'Moderate market growth with stable appreciation.';
  } else {
    return 'Conservative market outlook with limited appreciation potential.';
  }
}

function generateMarketFactors(inputs: RealEstateCrowdfundingInputs): string[] {
  const factors: string[] = [];
  
  factors.push(`Market appreciation rate: ${inputs.marketAppreciationRate}%`);
  factors.push(`Local economic growth: ${inputs.localEconomicGrowth}%`);
  factors.push(`Interest rate environment: ${inputs.interestRateEnvironment}`);
  factors.push(`Market volatility: ${inputs.marketVolatility}`);
  
  return factors;
}

function generateEconomicImpact(inputs: RealEstateCrowdfundingInputs): string[] {
  const impacts: string[] = [];
  
  impacts.push(`Inflation impact: ${inputs.inflationRate}% annually`);
  impacts.push(`Economic growth: ${inputs.localEconomicGrowth}% annually`);
  impacts.push(`Interest rate sensitivity: ${inputs.interestRateEnvironment}`);
  
  return impacts;
}

function generateFutureProjections(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): string[] {
  const projections: string[] = [];
  
  projections.push(`Projected IRR: ${metrics.irr.toFixed(1)}%`);
  projections.push(`Expected equity multiple: ${metrics.equityMultiple.toFixed(2)}x`);
  projections.push(`Cash-on-cash return: ${metrics.cashOnCashReturn.toFixed(1)}%`);
  projections.push(`Exit value: $${inputs.projectedExitValue.toLocaleString()}`);
  
  return projections;
}

function generateTaxImplications(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): string[] {
  const implications: string[] = [];
  
  implications.push(`Tax bracket: ${inputs.taxBracket}%`);
  implications.push(`State tax rate: ${inputs.stateTaxRate}%`);
  implications.push(`Local tax rate: ${inputs.localTaxRate}%`);
  implications.push(`Tax efficiency: ${metrics.taxEfficiency.toFixed(1)}%`);
  
  return implications;
}

function generateTaxOptimization(inputs: RealEstateCrowdfundingInputs): string[] {
  const optimizations: string[] = [];
  
  if (inputs.depreciationRecapture) optimizations.push('Utilize depreciation benefits');
  if (inputs.section1031Eligible) optimizations.push('Consider 1031 exchange options');
  if (inputs.qualifiedBusinessIncome) optimizations.push('QBI deduction available');
  
  return optimizations;
}

function generateTaxRisks(inputs: RealEstateCrowdfundingInputs): string[] {
  const risks: string[] = [];
  
  risks.push('Tax law changes may affect benefits');
  risks.push('Depreciation recapture on sale');
  risks.push('State and local tax variations');
  
  return risks;
}

function generateLiquidityFactors(inputs: RealEstateCrowdfundingInputs): string[] {
  const factors: string[] = [];
  
  factors.push(`Minimum hold period: ${inputs.minimumHoldPeriod} months`);
  factors.push(`Liquidity options: ${inputs.liquidityOptions}`);
  factors.push(`Secondary market fee: ${inputs.secondaryMarketFee}%`);
  factors.push(`Early exit penalty: ${inputs.earlyExitPenalty}%`);
  
  return factors;
}

function generateExitOptions(inputs: RealEstateCrowdfundingInputs): string[] {
  const options: string[] = [];
  
  options.push(`Primary exit: ${inputs.exitStrategy}`);
  options.push(`Projected exit year: ${inputs.projectedExitYear}`);
  options.push(`Exit costs: $${inputs.exitCosts.toLocaleString()}`);
  
  return options;
}

function generateSecondaryMarketAnalysis(inputs: RealEstateCrowdfundingInputs): string[] {
  const analysis: string[] = [];
  
  if (inputs.liquidityOptions === 'secondary_market') {
    analysis.push('Secondary market available for liquidity');
    analysis.push(`Market fee: ${inputs.secondaryMarketFee}%`);
  } else {
    analysis.push('Limited secondary market options');
  }
  
  return analysis;
}

function generatePlatformStrengths(inputs: RealEstateCrowdfundingInputs): string[] {
  const strengths: string[] = [];
  
  if (inputs.platformFee < 3) strengths.push('Competitive platform fees');
  if (inputs.liquidityOptions !== 'none') strengths.push('Liquidity options provided');
  if (inputs.minimumHoldPeriod <= 12) strengths.push('Short minimum hold period');
  
  return strengths;
}

function generatePlatformWeaknesses(inputs: RealEstateCrowdfundingInputs): string[] {
  const weaknesses: string[] = [];
  
  if (inputs.platformFee > 5) weaknesses.push('High platform fees');
  if (inputs.liquidityOptions === 'none') weaknesses.push('No liquidity options');
  if (inputs.minimumHoldPeriod > 36) weaknesses.push('Long minimum hold period');
  
  return weaknesses;
}

function generatePlatformComparison(inputs: RealEstateCrowdfundingInputs): string[] {
  const comparisons: string[] = [];
  
  comparisons.push(`Platform fee: ${inputs.platformFee}% (industry average: 2-5%)`);
  comparisons.push(`Hold period: ${inputs.minimumHoldPeriod} months (typical: 12-60 months)`);
  
  return comparisons;
}

function generateNextSteps(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): string[] {
  const steps: string[] = [];
  
  steps.push('Review offering documents thoroughly');
  steps.push('Conduct due diligence on sponsor');
  steps.push('Verify property information and valuations');
  steps.push('Consult with tax advisor');
  steps.push('Assess personal liquidity needs');
  
  return steps;
}

function generateTimeline(inputs: RealEstateCrowdfundingInputs): string[] {
  const timeline: string[] = [];
  
  timeline.push('Week 1: Review offering and conduct initial due diligence');
  timeline.push('Week 2: Consult with advisors and make investment decision');
  timeline.push('Week 3: Complete investment process and documentation');
  timeline.push(`Month ${inputs.minimumHoldPeriod}: Minimum hold period ends`);
  timeline.push(`Year ${inputs.projectedExitYear}: Expected exit`);
  
  return timeline;
}

function generatePriorityActions(inputs: RealEstateCrowdfundingInputs, metrics: RealEstateCrowdfundingMetrics): string[] {
  const actions: string[] = [];
  
  if (metrics.irr < 10) actions.push('Negotiate better terms or consider alternatives');
  if (inputs.liquidityRisk === 'high') actions.push('Ensure adequate emergency funds');
  if (metrics.feeImpact > 3) actions.push('Compare with other platform options');
  
  return actions;
}

function generatePerformanceBenchmarks(metrics: RealEstateCrowdfundingMetrics): any[] {
  return [
    {
      metric: 'IRR',
      target: 12,
      benchmark: metrics.irr,
      industry: 'Real Estate Crowdfunding',
      status: metrics.irr >= 12 ? 'excellent' : metrics.irr >= 8 ? 'good' : 'fair',
    },
    {
      metric: 'Cash-on-Cash Return',
      target: 8,
      benchmark: metrics.cashOnCashReturn,
      industry: 'Real Estate Crowdfunding',
      status: metrics.cashOnCashReturn >= 8 ? 'excellent' : metrics.cashOnCashReturn >= 6 ? 'good' : 'fair',
    },
    {
      metric: 'Equity Multiple',
      target: 2.0,
      benchmark: metrics.equityMultiple,
      industry: 'Real Estate Crowdfunding',
      status: metrics.equityMultiple >= 2.0 ? 'excellent' : metrics.equityMultiple >= 1.5 ? 'good' : 'fair',
    },
  ];
}

function generatePresentationPoints(metrics: RealEstateCrowdfundingMetrics, inputs: RealEstateCrowdfundingInputs): string[] {
  const points: string[] = [];
  
  points.push(`Investment Amount: $${inputs.investmentAmount.toLocaleString()}`);
  points.push(`Projected IRR: ${metrics.irr.toFixed(1)}%`);
  points.push(`Cash-on-Cash Return: ${metrics.cashOnCashReturn.toFixed(1)}%`);
  points.push(`Equity Multiple: ${metrics.equityMultiple.toFixed(2)}x`);
  points.push(`Investment Term: ${inputs.investmentTerm} months`);
  
  return points;
}

function generateDecisionFactors(metrics: RealEstateCrowdfundingMetrics, inputs: RealEstateCrowdfundingInputs): string[] {
  const factors: string[] = [];
  
  factors.push(`Return vs. Risk: ${metrics.irr.toFixed(1)}% IRR with ${calculateRiskRating(inputs, metrics)} risk`);
  factors.push(`Liquidity: ${calculateLiquidityRating(inputs)} liquidity rating`);
  factors.push(`Tax Efficiency: ${metrics.taxEfficiency.toFixed(1)}% tax efficiency`);
  factors.push(`Platform Quality: ${inputs.platformFee}% platform fee`);
  
  return factors;
}

function generateSummaryPoints(metrics: RealEstateCrowdfundingMetrics, inputs: RealEstateCrowdfundingInputs): string[] {
  const points: string[] = [];
  
  points.push(`Total Investment: $${inputs.investmentAmount.toLocaleString()}`);
  points.push(`Projected Total Return: $${metrics.totalReturn.toLocaleString()}`);
  points.push(`Annualized Return: ${metrics.annualizedReturn.toFixed(1)}%`);
  points.push(`Risk Level: ${calculateRiskRating(inputs, metrics)}`);
  points.push(`Recommendation: ${calculateInvestmentRating(metrics)}`);
  
  return points;
}