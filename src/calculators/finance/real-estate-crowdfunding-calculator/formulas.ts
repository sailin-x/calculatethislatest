import { RealEstateCrowdfundingInputs, RealEstateCrowdfundingOutputs } from './types';

// Calculate basic investment returns
export function calculateInvestmentReturns(inputs: RealEstateCrowdfundingInputs): {
  projectedAnnualReturn: number;
  projectedTotalReturn: number;
  cashOnCashYield: number;
  internalRateOfReturn: number;
  equityMultiple: number;
} {
  const investmentAmount = inputs.investmentAmount;
  const totalEquity = inputs.investorEquity;
  const investorShare = investmentAmount / totalEquity;

  // Calculate annual cash flow based on NOI projections
  const year1CashFlow = (inputs.year1Noi * investorShare) - (inputs.platformFees * investorShare) - (inputs.managementFees * investorShare);
  const year2CashFlow = (inputs.year2Noi * investorShare) - (inputs.platformFees * investorShare) - (inputs.managementFees * investorShare);
  const year3CashFlow = (inputs.year3Noi * investorShare) - (inputs.platformFees * investorShare) - (inputs.managementFees * investorShare);
  const year4CashFlow = (inputs.year4Noi * investorShare) - (inputs.platformFees * investorShare) - (inputs.managementFees * investorShare);
  const year5CashFlow = (inputs.year5Noi * investorShare) - (inputs.platformFees * investorShare) - (inputs.managementFees * investorShare);

  // Calculate exit proceeds
  const exitValue = inputs.exitValue;
  const exitEquityValue = exitValue - inputs.seniorDebtAmount - inputs.mezzanineDebtAmount;
  const investorExitProceeds = exitEquityValue * investorShare;

  // Calculate total return
  const totalCashFlow = year1CashFlow + year2CashFlow + year3CashFlow + year4CashFlow + year5CashFlow;
  const totalReturn = totalCashFlow + investorExitProceeds - investmentAmount;

  const projectedAnnualReturn = (totalReturn / investmentAmount) / inputs.holdPeriodYears;
  const projectedTotalReturn = totalReturn / investmentAmount;
  const cashOnCashYield = totalCashFlow / investmentAmount / inputs.holdPeriodYears;
  const equityMultiple = (totalReturn + investmentAmount) / investmentAmount;

  // Simplified IRR calculation (in practice, would use more sophisticated method)
  const irr = (Math.pow(equityMultiple, 1 / inputs.holdPeriodYears) - 1);

  return {
    projectedAnnualReturn,
    projectedTotalReturn,
    cashOnCashYield,
    internalRateOfReturn: irr,
    equityMultiple
  };
}

// Calculate cash flow analysis
export function calculateCashFlowAnalysis(inputs: RealEstateCrowdfundingInputs): {
  annualCashFlow: number;
  monthlyCashFlow: number;
  cumulativeCashFlow: number;
  cashFlowStability: number;
} {
  const investmentAmount = inputs.investmentAmount;
  const totalEquity = inputs.investorEquity;
  const investorShare = investmentAmount / totalEquity;

  const year1CashFlow = inputs.year1Noi * investorShare;
  const year2CashFlow = inputs.year2Noi * investorShare;
  const year3CashFlow = inputs.year3Noi * investorShare;
  const year4CashFlow = inputs.year4Noi * investorShare;
  const year5CashFlow = inputs.year5Noi * investorShare;

  const annualCashFlow = (year1CashFlow + year2CashFlow + year3CashFlow + year4CashFlow + year5CashFlow) / inputs.holdPeriodYears;
  const monthlyCashFlow = annualCashFlow / 12;
  const cumulativeCashFlow = year1CashFlow + year2CashFlow + year3CashFlow + year4CashFlow + year5CashFlow;

  // Calculate cash flow stability (coefficient of variation)
  const cashFlows = [year1CashFlow, year2CashFlow, year3CashFlow, year4CashFlow, year5CashFlow];
  const mean = cashFlows.reduce((sum, cf) => sum + cf, 0) / cashFlows.length;
  const variance = cashFlows.reduce((sum, cf) => sum + Math.pow(cf - mean, 2), 0) / cashFlows.length;
  const standardDeviation = Math.sqrt(variance);
  const cashFlowStability = mean !== 0 ? (standardDeviation / mean) : 0;

  return {
    annualCashFlow,
    monthlyCashFlow,
    cumulativeCashFlow,
    cashFlowStability
  };
}

// Calculate risk metrics
export function calculateRiskMetrics(inputs: RealEstateCrowdfundingInputs): {
  riskAdjustedReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maximumDrawdown: number;
  valueAtRisk: number;
} {
  const returns = calculateInvestmentReturns(inputs);
  const riskScore = (inputs.locationRisk === 'High' ? 3 : inputs.locationRisk === 'Medium' ? 2 : 1) +
                   (inputs.marketRisk === 'High' ? 3 : inputs.marketRisk === 'Medium' ? 2 : 1) +
                   (inputs.propertyRisk === 'High' ? 3 : inputs.propertyRisk === 'Medium' ? 2 : 1) +
                   (inputs.sponsorRisk === 'High' ? 3 : inputs.sponsorRisk === 'Medium' ? 2 : 1) +
                   (inputs.regulatoryRisk === 'High' ? 3 : inputs.regulatoryRisk === 'Medium' ? 2 : 1);

  const riskAdjustment = riskScore / 15; // Normalize to 0-1 scale
  const riskAdjustedReturn = returns.projectedAnnualReturn * (1 - riskAdjustment);

  // Simplified Sharpe ratio (assuming risk-free rate of 3%)
  const riskFreeRate = 0.03;
  const excessReturn = returns.projectedAnnualReturn - riskFreeRate;
  const volatility = 0.15; // Assumed volatility for real estate crowdfunding
  const sharpeRatio = volatility !== 0 ? excessReturn / volatility : 0;

  // Simplified Sortino ratio (downside deviation)
  const downsideVolatility = volatility * 0.7; // Typically lower than total volatility
  const sortinoRatio = downsideVolatility !== 0 ? excessReturn / downsideVolatility : 0;

  // Simplified maximum drawdown
  const maximumDrawdown = -0.20; // Typical for real estate investments

  // Value at Risk (95% confidence, simplified)
  const valueAtRisk = -2.0; // 20% VaR

  return {
    riskAdjustedReturn,
    sharpeRatio,
    sortinoRatio,
    maximumDrawdown,
    valueAtRisk
  };
}

// Calculate deal metrics
export function calculateDealMetrics(inputs: RealEstateCrowdfundingInputs): {
  equityCheck: number;
  loanToValueRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenOccupancy: number;
} {
  const totalCost = inputs.totalProjectCost;
  const seniorDebt = inputs.seniorDebtAmount;
  const mezzanineDebt = inputs.mezzanineDebtAmount;
  const equity = inputs.equityAmount;

  const equityCheck = equity / totalCost;
  const loanToValueRatio = (seniorDebt + mezzanineDebt) / inputs.propertyValue;
  const debtServiceCoverageRatio = inputs.projectedNoi / ((seniorDebt * 0.05) + (mezzanineDebt * 0.08)); // Simplified

  // Break-even occupancy (assuming average rent covers operating expenses)
  const operatingExpenses = inputs.operatingExpenses;
  const potentialIncome = inputs.projectedNoi + operatingExpenses;
  const breakEvenOccupancy = potentialIncome > 0 ? operatingExpenses / potentialIncome : 1;

  return {
    equityCheck,
    loanToValueRatio,
    debtServiceCoverageRatio,
    breakEvenOccupancy
  };
}

// Calculate fee analysis
export function calculateFeeAnalysis(inputs: RealEstateCrowdfundingInputs): {
  totalFees: number;
  feeDrag: number;
  netToInvestor: number;
  feeEfficiency: number;
} {
  const platformFees = inputs.platformFees;
  const managementFees = inputs.managementFees;
  const acquisitionFees = inputs.acquisitionFees;
  const dispositionFees = inputs.dispositionFees;

  const totalFees = platformFees + managementFees + acquisitionFees + dispositionFees;
  const investmentAmount = inputs.investmentAmount;

  // Fee drag as percentage of investment
  const feeDrag = investmentAmount > 0 ? (totalFees / investmentAmount) * 100 : 0;

  // Net to investor (simplified)
  const returns = calculateInvestmentReturns(inputs);
  const netToInvestor = returns.projectedTotalReturn - feeDrag / 100;

  // Fee efficiency (lower fees = higher efficiency)
  const feeEfficiency = Math.max(0, 100 - feeDrag);

  return {
    totalFees,
    feeDrag,
    netToInvestor,
    feeEfficiency
  };
}

// Calculate tax implications
export function calculateTaxImplications(inputs: RealEstateCrowdfundingInputs): {
  taxableIncome: number;
  depreciationDeduction: number;
  capitalGainsTax: number;
  taxEfficiency: number;
} {
  const investmentAmount = inputs.investmentAmount;
  const cashFlow = calculateCashFlowAnalysis(inputs);

  // Simplified taxable income calculation
  const taxableIncome = cashFlow.annualCashFlow * 0.7; // Assuming 30% of cash flow is return of capital

  // Depreciation deduction (simplified - 3.636% per year for residential, 2.564% for commercial)
  const depreciationRate = inputs.propertyType === 'Residential' ? 0.03636 : 0.02564;
  const depreciationDeduction = inputs.propertyValue * depreciationRate;

  // Capital gains tax (simplified)
  const returns = calculateInvestmentReturns(inputs);
  const capitalGain = (returns.projectedTotalReturn * investmentAmount) - investmentAmount;
  const capitalGainsTax = capitalGain * 0.15; // Assuming 15% capital gains rate

  // Tax efficiency score
  const taxEfficiency = 100 - (inputs.taxBracket === 'High' ? 30 : inputs.taxBracket === 'Medium' ? 20 : 10);

  return {
    taxableIncome,
    depreciationDeduction,
    capitalGainsTax,
    taxEfficiency
  };
}

// Calculate scenario analysis
export function calculateScenarioAnalysis(inputs: RealEstateCrowdfundingInputs): {
  bestCaseReturn: number;
  worstCaseReturn: number;
  baseCaseReturn: number;
  probabilityOfSuccess: number;
} {
  const returns = calculateInvestmentReturns(inputs);

  // Scenario adjustments
  const baseCaseReturn = returns.projectedTotalReturn;
  const bestCaseReturn = baseCaseReturn * 1.5; // 50% upside
  const worstCaseReturn = baseCaseReturn * 0.5; // 50% downside

  // Probability of success based on sponsor track record and risk factors
  const sponsorSuccessRate = inputs.sponsorTrackRecord.successfulExits / inputs.sponsorTrackRecord.totalProjects;
  const riskAdjustment = (inputs.locationRisk === 'High' ? 0.8 : inputs.locationRisk === 'Medium' ? 0.9 : 1.0) *
                        (inputs.marketRisk === 'High' ? 0.8 : inputs.marketRisk === 'Medium' ? 0.9 : 1.0) *
                        (inputs.propertyRisk === 'High' ? 0.8 : inputs.propertyRisk === 'Medium' ? 0.9 : 1.0) *
                        (inputs.sponsorRisk === 'High' ? 0.8 : inputs.sponsorRisk === 'Medium' ? 0.9 : 1.0);

  const probabilityOfSuccess = sponsorSuccessRate * riskAdjustment;

  return {
    bestCaseReturn,
    worstCaseReturn,
    baseCaseReturn,
    probabilityOfSuccess
  };
}

// Calculate comparison analysis
export function calculateComparisonAnalysis(inputs: RealEstateCrowdfundingInputs): {
  vsStockMarket: number;
  vsBondMarket: number;
  vsRealEstateIndex: number;
  peerComparison: number;
} {
  const returns = calculateInvestmentReturns(inputs);

  // Historical average returns (simplified)
  const stockMarketReturn = 0.08; // 8% average annual return
  const bondMarketReturn = 0.03; // 3% average annual return
  const realEstateIndexReturn = 0.06; // 6% average annual return

  const vsStockMarket = returns.projectedAnnualReturn - stockMarketReturn;
  const vsBondMarket = returns.projectedAnnualReturn - bondMarketReturn;
  const vsRealEstateIndex = returns.projectedAnnualReturn - realEstateIndexReturn;

  // Peer comparison (simplified based on sponsor track record)
  const peerComparison = returns.projectedAnnualReturn - inputs.sponsorTrackRecord.averageIrr;

  return {
    vsStockMarket,
    vsBondMarket,
    vsRealEstateIndex,
    peerComparison
  };
}

// Calculate platform analysis
export function calculatePlatformAnalysis(inputs: RealEstateCrowdfundingInputs): {
  platformValueAdd: number;
  platformRiskAdjustment: number;
  platformFeeJustification: number;
} {
  // Platform value add based on rating and track record
  const platformValueAdd = (inputs.platformRating / 5) * (inputs.platformTrackRecord / 100);

  // Risk adjustment based on platform quality
  const platformRiskAdjustment = inputs.platformRating >= 4 ? 0.95 : inputs.platformRating >= 3 ? 1.0 : 1.05;

  // Fee justification (higher fees need better performance)
  const feeJustification = inputs.platformFees > 0.02 ? 0.9 : 1.0; // 2% threshold

  return {
    platformValueAdd,
    platformRiskAdjustment,
    platformFeeJustification
  };
}

// Calculate sponsor analysis
export function calculateSponsorAnalysis(inputs: RealEstateCrowdfundingInputs): {
  sponsorQualityScore: number;
  sponsorRiskAdjustment: number;
  sponsorAlignment: number;
} {
  const trackRecord = inputs.sponsorTrackRecord;

  // Sponsor quality score (0-100)
  const successRate = trackRecord.successfulExits / trackRecord.totalProjects;
  const experienceScore = Math.min(trackRecord.totalProjects / 10, 1); // Max at 10 projects
  const performanceScore = Math.min(trackRecord.averageIrr / 0.15, 1); // Max at 15% IRR

  const sponsorQualityScore = (successRate * 40) + (experienceScore * 30) + (performanceScore * 30);

  // Risk adjustment
  const sponsorRiskAdjustment = sponsorQualityScore > 70 ? 0.95 : sponsorQualityScore > 50 ? 1.0 : 1.05;

  // Sponsor alignment (based on profit share and terms)
  const sponsorAlignment = inputs.profitShare > 0.8 ? 0.9 : inputs.profitShare > 0.7 ? 0.95 : 1.0;

  return {
    sponsorQualityScore,
    sponsorRiskAdjustment,
    sponsorAlignment
  };
}

// Calculate market analysis
export function calculateMarketAnalysis(inputs: RealEstateCrowdfundingInputs): {
  marketTiming: RealEstateCrowdfundingOutputs['marketTiming'];
  marketCyclePosition: string;
  marketRiskPremium: number;
} {
  const localGrowth = inputs.localMarketGrowth;
  const localVacancy = inputs.localVacancyRate;
  const localCapRate = inputs.localCapRate;

  // Market timing assessment
  let marketTiming: RealEstateCrowdfundingOutputs['marketTiming'] = 'Fair';
  if (localGrowth > 0.05 && localVacancy < 0.05) {
    marketTiming = 'Good';
  } else if (localGrowth < 0.01 || localVacancy > 0.1) {
    marketTiming = 'Poor';
  }

  // Market cycle position
  const marketCyclePosition = localCapRate < 0.05 ? 'Peak' : localCapRate < 0.07 ? 'Expansion' : 'Recovery';

  // Market risk premium
  const marketRiskPremium = localCapRate - 0.03; // Risk-free rate assumption

  return {
    marketTiming,
    marketCyclePosition,
    marketRiskPremium
  };
}

// Calculate property analysis
export function calculatePropertyAnalysis(inputs: RealEstateCrowdfundingInputs): {
  propertyQualityScore: number;
  propertyRiskScore: number;
  propertyValueAdd: number;
} {
  // Property quality score based on age, type, and location
  const ageScore = inputs.yearBuilt > 2000 ? 1 : inputs.yearBuilt > 1980 ? 0.8 : 0.6;
  const typeScore = inputs.propertyType === 'Commercial' ? 0.9 : inputs.propertyType === 'Residential' ? 0.8 : 0.7;
  const sizeScore = inputs.squareFootage > 10000 ? 1 : inputs.squareFootage > 5000 ? 0.8 : 0.6;

  const propertyQualityScore = (ageScore * 40) + (typeScore * 35) + (sizeScore * 25);

  // Property risk score
  const propertyRiskScore = (inputs.propertyRisk === 'High' ? 80 : inputs.propertyRisk === 'Medium' ? 50 : 20);

  // Property value add potential
  const valueAdd = inputs.projectedIrr > 0.12 ? 0.8 : inputs.projectedIrr > 0.08 ? 0.6 : 0.4;

  return {
    propertyQualityScore,
    propertyRiskScore,
    propertyValueAdd: valueAdd
  };
}

// Calculate investment suitability
export function calculateInvestmentSuitability(inputs: RealEstateCrowdfundingInputs): {
  suitabilityScore: number;
  riskSuitability: RealEstateCrowdfundingOutputs['riskSuitability'];
  returnSuitability: RealEstateCrowdfundingOutputs['returnSuitability'];
} {
  const returns = calculateInvestmentReturns(inputs);
  const riskMetrics = calculateRiskMetrics(inputs);

  // Suitability based on investor profile
  let suitabilityScore = 50; // Base score

  // Risk tolerance alignment
  if (inputs.riskTolerance === 'Conservative' && riskMetrics.riskAdjustedReturn > 0.04) suitabilityScore += 20;
  else if (inputs.riskTolerance === 'Moderate' && riskMetrics.riskAdjustedReturn > 0.06) suitabilityScore += 20;
  else if (inputs.riskTolerance === 'Aggressive' && riskMetrics.riskAdjustedReturn > 0.08) suitabilityScore += 20;

  // Experience alignment
  if (inputs.investorExperience === 'Advanced') suitabilityScore += 15;
  else if (inputs.investorExperience === 'Intermediate') suitabilityScore += 10;
  else suitabilityScore += 5;

  // Goal alignment
  if (inputs.investmentGoal === 'Income' && returns.cashOnCashYield > 0.06) suitabilityScore += 15;
  else if (inputs.investmentGoal === 'Growth' && returns.equityMultiple > 1.5) suitabilityScore += 15;
  else if (inputs.investmentGoal === 'Balanced') suitabilityScore += 10;

  const riskSuitability: RealEstateCrowdfundingOutputs['riskSuitability'] =
    riskMetrics.riskAdjustedReturn < 0.04 ? 'Low' : riskMetrics.riskAdjustedReturn < 0.08 ? 'Medium' : 'High';

  const returnSuitability: RealEstateCrowdfundingOutputs['returnSuitability'] =
    returns.projectedAnnualReturn < 0.05 ? 'Low' : returns.projectedAnnualReturn < 0.1 ? 'Medium' : 'High';

  return {
    suitabilityScore,
    riskSuitability,
    returnSuitability
  };
}

// Calculate performance projections
export function calculatePerformanceProjections(inputs: RealEstateCrowdfundingInputs): {
  year1Return: number;
  year2Return: number;
  year3Return: number;
  year4Return: number;
  year5Return: number;
} {
  const investmentAmount = inputs.investmentAmount;
  const totalEquity = inputs.investorEquity;
  const investorShare = investmentAmount / totalEquity;

  const year1Return = (inputs.year1Noi * investorShare) / investmentAmount;
  const year2Return = (inputs.year2Noi * investorShare) / investmentAmount;
  const year3Return = (inputs.year3Noi * investorShare) / investmentAmount;
  const year4Return = (inputs.year4Noi * investorShare) / investmentAmount;
  const year5Return = (inputs.year5Noi * investorShare) / investmentAmount;

  return {
    year1Return,
    year2Return,
    year3Return,
    year4Return,
    year5Return
  };
}

// Calculate distribution analysis
export function calculateDistributionAnalysis(inputs: RealEstateCrowdfundingInputs): {
  totalDistributions: number;
  distributionStability: number;
  distributionGrowth: number;
} {
  const projections = calculatePerformanceProjections(inputs);

  const totalDistributions = (projections.year1Return + projections.year2Return +
                            projections.year3Return + projections.year4Return +
                            projections.year5Return) * inputs.investmentAmount;

  // Distribution stability (lower coefficient of variation = more stable)
  const distributions = [projections.year1Return, projections.year2Return, projections.year3Return,
                        projections.year4Return, projections.year5Return];
  const mean = distributions.reduce((sum, d) => sum + d, 0) / distributions.length;
  const variance = distributions.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / distributions.length;
  const distributionStability = mean !== 0 ? Math.sqrt(variance) / mean : 0;

  // Distribution growth rate
  const growthRate = distributions.length > 1 ?
    (distributions[distributions.length - 1] - distributions[0]) / distributions[0] : 0;
  const distributionGrowth = growthRate / (distributions.length - 1);

  return {
    totalDistributions,
    distributionStability,
    distributionGrowth
  };
}

// Calculate recommendation
export function calculateRecommendation(inputs: RealEstateCrowdfundingInputs): {
  investmentRecommendation: RealEstateCrowdfundingOutputs['investmentRecommendation'];
  confidenceLevel: RealEstateCrowdfundingOutputs['confidenceLevel'];
  actionItems: string[];
} {
  const returns = calculateInvestmentReturns(inputs);
  const riskMetrics = calculateRiskMetrics(inputs);
  const suitability = calculateInvestmentSuitability(inputs);
  const sponsorAnalysis = calculateSponsorAnalysis(inputs);
  const platformAnalysis = calculatePlatformAnalysis(inputs);

  let recommendationScore = 0;

  // Return potential (40% weight)
  if (returns.projectedAnnualReturn > 0.1) recommendationScore += 40;
  else if (returns.projectedAnnualReturn > 0.07) recommendationScore += 30;
  else if (returns.projectedAnnualReturn > 0.05) recommendationScore += 20;
  else recommendationScore += 10;

  // Risk assessment (30% weight)
  if (riskMetrics.riskAdjustedReturn > 0.06) recommendationScore += 30;
  else if (riskMetrics.riskAdjustedReturn > 0.04) recommendationScore += 20;
  else if (riskMetrics.riskAdjustedReturn > 0.02) recommendationScore += 10;

  // Sponsor quality (15% weight)
  if (sponsorAnalysis.sponsorQualityScore > 70) recommendationScore += 15;
  else if (sponsorAnalysis.sponsorQualityScore > 50) recommendationScore += 10;
  else recommendationScore += 5;

  // Platform quality (10% weight)
  if (platformAnalysis.platformValueAdd > 0.7) recommendationScore += 10;
  else if (platformAnalysis.platformValueAdd > 0.5) recommendationScore += 7;
  else recommendationScore += 3;

  // Suitability (5% weight)
  if (suitability.suitabilityScore > 70) recommendationScore += 5;
  else if (suitability.suitabilityScore > 50) recommendationScore += 3;

  let investmentRecommendation: RealEstateCrowdfundingOutputs['investmentRecommendation'];
  if (recommendationScore >= 80) investmentRecommendation = 'Strong Buy';
  else if (recommendationScore >= 60) investmentRecommendation = 'Buy';
  else if (recommendationScore >= 40) investmentRecommendation = 'Hold';
  else if (recommendationScore >= 20) investmentRecommendation = 'Sell';
  else investmentRecommendation = 'Strong Sell';

  const confidenceLevel: RealEstateCrowdfundingOutputs['confidenceLevel'] =
    recommendationScore > 70 ? 'High' : recommendationScore > 50 ? 'Medium' : 'Low';

  const actionItems: string[] = [];

  if (investmentRecommendation === 'Strong Buy' || investmentRecommendation === 'Buy') {
    actionItems.push('Review offering memorandum in detail');
    actionItems.push('Verify sponsor track record');
    actionItems.push('Assess property location and condition');
    actionItems.push('Confirm accredited investor status if required');
  } else if (investmentRecommendation === 'Hold') {
    actionItems.push('Monitor deal progress and market conditions');
    actionItems.push('Wait for improved terms or market conditions');
    actionItems.push('Consider smaller investment amount');
  } else {
    actionItems.push('Look for alternative investment opportunities');
    actionItems.push('Reassess risk tolerance and investment goals');
    actionItems.push('Consider consulting with financial advisor');
  }

  return {
    investmentRecommendation,
    confidenceLevel,
    actionItems
  };
}

// Main calculation function
export function calculateRealEstateCrowdfundingAnalysis(inputs: RealEstateCrowdfundingInputs): RealEstateCrowdfundingOutputs {
  const investmentReturns = calculateInvestmentReturns(inputs);
  const cashFlowAnalysis = calculateCashFlowAnalysis(inputs);
  const riskMetrics = calculateRiskMetrics(inputs);
  const dealMetrics = calculateDealMetrics(inputs);
  const feeAnalysis = calculateFeeAnalysis(inputs);
  const taxImplications = calculateTaxImplications(inputs);
  const scenarioAnalysis = calculateScenarioAnalysis(inputs);
  const comparisonAnalysis = calculateComparisonAnalysis(inputs);
  const platformAnalysis = calculatePlatformAnalysis(inputs);
  const sponsorAnalysis = calculateSponsorAnalysis(inputs);
  const marketAnalysis = calculateMarketAnalysis(inputs);
  const propertyAnalysis = calculatePropertyAnalysis(inputs);
  const investmentSuitability = calculateInvestmentSuitability(inputs);
  const performanceProjections = calculatePerformanceProjections(inputs);
  const distributionAnalysis = calculateDistributionAnalysis(inputs);
  const recommendation = calculateRecommendation(inputs);

  // Additional calculations
  const totalInvestmentCost = inputs.in