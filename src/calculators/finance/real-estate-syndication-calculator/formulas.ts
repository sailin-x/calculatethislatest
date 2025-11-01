import { RealEstateSyndicationInputs, RealEstateSyndicationOutputs } from './types';

// Calculate capital structure
export function calculateCapitalStructure(inputs: RealEstateSyndicationInputs): {
  equitySplit: number;
  debtToEquityRatio: number;
  loanToValueRatio: number;
  loanToCostRatio: number;
} {
  const totalEquity = inputs.totalEquity;
  const totalDebt = inputs.seniorDebt + inputs.mezzanineDebt;
  const totalCapital = inputs.totalCapital;
  const purchasePrice = inputs.purchasePrice;

  const equitySplit = totalEquity / totalCapital;
  const debtToEquityRatio = totalDebt / totalEquity;
  const loanToValueRatio = totalDebt / purchasePrice;
  const loanToCostRatio = totalDebt / inputs.totalAcquisitionCost;

  return {
    equitySplit,
    debtToEquityRatio,
    loanToValueRatio,
    loanToCostRatio
  };
}

// Calculate waterfall distributions
export function calculateWaterfallDistributions(inputs: RealEstateSyndicationInputs): {
  sponsorDistributions: number[];
  limitedPartnerDistributions: number[];
  totalDistributions: number[];
  cumulativeDistributions: number[];
} {
  const sponsorEquity = inputs.sponsorEquity;
  const lpEquity = inputs.limitedPartnerEquity;
  const totalEquity = inputs.totalEquity;
  const preferredReturn = inputs.preferredReturn / 100;

  // Simplified waterfall calculation
  const sponsorShare = sponsorEquity / totalEquity;
  const lpShare = lpEquity / totalEquity;

  const year1CashFlow = inputs.year1Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100);
  const year2CashFlow = inputs.year2Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100);
  const year3CashFlow = inputs.year3Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100);
  const year4CashFlow = inputs.year4Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100);
  const year5CashFlow = inputs.year5Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100);

  // Calculate preferred return first
  const prefReturn1 = totalEquity * preferredReturn;
  const prefReturn2 = totalEquity * preferredReturn;
  const prefReturn3 = totalEquity * preferredReturn;
  const prefReturn4 = totalEquity * preferredReturn;
  const prefReturn5 = totalEquity * preferredReturn;

  // Remaining cash flow after preferred return
  const remaining1 = Math.max(0, year1CashFlow - prefReturn1);
  const remaining2 = Math.max(0, year2CashFlow - prefReturn2);
  const remaining3 = Math.max(0, year3CashFlow - prefReturn3);
  const remaining4 = Math.max(0, year4CashFlow - prefReturn4);
  const remaining5 = Math.max(0, year5CashFlow - prefReturn5);

  // Split remaining profits
  const sponsorDistributions = [
    prefReturn1 * sponsorShare + remaining1 * inputs.profitSplitSponsor,
    prefReturn2 * sponsorShare + remaining2 * inputs.profitSplitSponsor,
    prefReturn3 * sponsorShare + remaining3 * inputs.profitSplitSponsor,
    prefReturn4 * sponsorShare + remaining4 * inputs.profitSplitSponsor,
    prefReturn5 * sponsorShare + remaining5 * inputs.profitSplitSponsor
  ];

  const limitedPartnerDistributions = [
    prefReturn1 * lpShare + remaining1 * inputs.profitSplitLimitedPartners,
    prefReturn2 * lpShare + remaining2 * inputs.profitSplitLimitedPartners,
    prefReturn3 * lpShare + remaining3 * inputs.profitSplitLimitedPartners,
    prefReturn4 * lpShare + remaining4 * inputs.profitSplitLimitedPartners,
    prefReturn5 * lpShare + remaining5 * inputs.profitSplitLimitedPartners
  ];

  const totalDistributions = sponsorDistributions.map((sponsor, i) => sponsor + limitedPartnerDistributions[i]);
  const cumulativeDistributions = totalDistributions.reduce((acc, val, i) => {
    acc.push((acc[i - 1] || 0) + val);
    return acc;
  }, [] as number[]);

  return {
    sponsorDistributions,
    limitedPartnerDistributions,
    totalDistributions,
    cumulativeDistributions
  };
}

// Calculate return metrics
export function calculateReturnMetrics(inputs: RealEstateSyndicationInputs): {
  internalRateOfReturn: number;
  equityMultiple: number;
  cashOnCashReturn: number;
  averageAnnualReturn: number;
} {
  const distributions = calculateWaterfallDistributions(inputs);
  const totalEquity = inputs.totalEquity;

  // Calculate exit proceeds
  const exitValue = inputs.year5Noi / (inputs.exitCapRate / 100);
  const exitEquityValue = exitValue - inputs.seniorDebt - inputs.mezzanineDebt;
  const exitDistributions = exitEquityValue * (inputs.limitedPartnerEquity / inputs.totalEquity);

  const totalCashFlow = distributions.cumulativeDistributions[4] + exitDistributions;
  const totalReturn = totalCashFlow;
  const equityMultiple = totalEquity > 0 ? totalReturn / totalEquity : 0;

  // Simplified IRR calculation
  const irr = equityMultiple > 0 ? Math.pow(equityMultiple, 1 / inputs.holdPeriodYears) - 1 : 0;
  const cashOnCashReturn = distributions.totalDistributions.reduce((sum, val) => sum + val, 0) / inputs.holdPeriodYears / totalEquity;
  const averageAnnualReturn = irr;

  return {
    internalRateOfReturn: irr,
    equityMultiple,
    cashOnCashReturn,
    averageAnnualReturn
  };
}

// Calculate cash flow analysis
export function calculateCashFlowAnalysis(inputs: RealEstateSyndicationInputs): {
  year1CashFlow: number;
  year2CashFlow: number;
  year3CashFlow: number;
  year4CashFlow: number;
  year5CashFlow: number;
  totalCashFlow: number;
} {
  const year1CashFlow = inputs.year1Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100) - inputs.propertyManagementFee;
  const year2CashFlow = inputs.year2Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100) - inputs.propertyManagementFee;
  const year3CashFlow = inputs.year3Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100) - inputs.propertyManagementFee;
  const year4CashFlow = inputs.year4Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100) - inputs.propertyManagementFee;
  const year5CashFlow = inputs.year5Noi - (inputs.seniorDebt * inputs.seniorDebtInterestRate / 100) - inputs.propertyManagementFee;

  const totalCashFlow = year1CashFlow + year2CashFlow + year3CashFlow + year4CashFlow + year5CashFlow;

  return {
    year1CashFlow,
    year2CashFlow,
    year3CashFlow,
    year4CashFlow,
    year5CashFlow,
    totalCashFlow
  };
}

// Calculate profit splits
export function calculateProfitSplits(inputs: RealEstateSyndicationInputs): {
  sponsorProfitShare: number;
  limitedPartnerProfitShare: number;
  promoteAmount: number;
  carriedInterest: number;
} {
  const distributions = calculateWaterfallDistributions(inputs);

  // Calculate profits above preferred return
  const totalCashFlow = distributions.totalDistributions.reduce((sum, val) => sum + val, 0);
  const totalPrefReturn = inputs.totalEquity * (inputs.preferredReturn / 100) * inputs.holdPeriodYears;

  const totalProfits = Math.max(0, totalCashFlow - totalPrefReturn);
  const sponsorProfitShare = totalProfits * inputs.profitSplitSponsor;
  const limitedPartnerProfitShare = totalProfits * inputs.profitSplitLimitedPartners;

  const promoteAmount = sponsorProfitShare;
  const carriedInterest = sponsorProfitShare;

  return {
    sponsorProfitShare,
    limitedPartnerProfitShare,
    promoteAmount,
    carriedInterest
  };
}

// Calculate fee analysis
export function calculateFeeAnalysis(inputs: RealEstateSyndicationInputs): {
  totalFees: number;
  feeDrag: number;
  netToInvestors: number;
  feeEfficiency: number;
} {
  const managementFee = inputs.sponsorManagementFee;
  const assetManagementFee = inputs.sponsorAssetManagementFee;
  const acquisitionFees = inputs.acquisitionCosts * 0.01; // Assume 1% acquisition fee
  const dispositionFees = inputs.exitCosts * 0.01; // Assume 1% disposition fee

  const totalFees = managementFee + assetManagementFee + acquisitionFees + dispositionFees;
  const totalEquity = inputs.totalEquity;

  const feeDrag = totalEquity > 0 ? (totalFees / totalEquity) * 100 : 0;

  const returns = calculateReturnMetrics(inputs);
  const netToInvestors = returns.equityMultiple - feeDrag / 100;

  const feeEfficiency = Math.max(0, 100 - feeDrag);

  return {
    totalFees,
    feeDrag,
    netToInvestors,
    feeEfficiency
  };
}

// Calculate risk analysis
export function calculateRiskAnalysis(inputs: RealEstateSyndicationInputs): {
  riskAdjustedIrr: number;
  probabilityOfSuccess: number;
  downsideProtection: number;
  upsidePotential: number;
} {
  const returns = calculateReturnMetrics(inputs);

  // Risk adjustment based on risk factors
  const riskScore = (inputs.marketRisk === 'High' ? 3 : inputs.marketRisk === 'Medium' ? 2 : 1) +
                   (inputs.propertyRisk === 'High' ? 3 : inputs.propertyRisk === 'Medium' ? 2 : 1) +
                   (inputs.executionRisk === 'High' ? 3 : inputs.executionRisk === 'Medium' ? 2 : 1) +
                   (inputs.regulatoryRisk === 'High' ? 3 : inputs.regulatoryRisk === 'Medium' ? 2 : 1);

  const riskAdjustment = riskScore / 16; // Normalize to 0-1 scale
  const riskAdjustedIrr = returns.internalRateOfReturn * (1 - riskAdjustment);

  // Probability of success based on sponsor track record and risk
  const sponsorSuccessRate = inputs.sponsorTrackRecord / 100;
  const probabilityOfSuccess = sponsorSuccessRate * (1 - riskAdjustment);

  const downsideProtection = returns.equityMultiple * 0.7; // 70% downside protection
  const upsidePotential = returns.equityMultiple * 1.5; // 50% upside potential

  return {
    riskAdjustedIrr,
    probabilityOfSuccess,
    downsideProtection,
    upsidePotential
  };
}

// Calculate sensitivity analysis
export function calculateSensitivityAnalysis(inputs: RealEstateSyndicationInputs): {
  irrSensitivityToNoi: number;
  irrSensitivityToCapRate: number;
  irrSensitivityToCosts: number;
  irrSensitivityToDelay: number;
} {
  const baseIrr = calculateReturnMetrics(inputs).internalRateOfReturn;

  // NOI sensitivity (10% change)
  const noiIncreaseInputs = {
    ...inputs,
    year1Noi: inputs.year1Noi * 1.1,
    year2Noi: inputs.year2Noi * 1.1,
    year3Noi: inputs.year3Noi * 1.1,
    year4Noi: inputs.year4Noi * 1.1,
    year5Noi: inputs.year5Noi * 1.1
  };
  const noiIrr = calculateReturnMetrics(noiIncreaseInputs).internalRateOfReturn;
  const irrSensitivityToNoi = baseIrr !== 0 ? ((noiIrr - baseIrr) / baseIrr) * 100 : 0;

  // Cap rate sensitivity (50 basis points)
  const capRateIncreaseInputs = { ...inputs, exitCapRate: inputs.exitCapRate + 0.5 };
  const capRateIrr = calculateReturnMetrics(capRateIncreaseInputs).internalRateOfReturn;
  const irrSensitivityToCapRate = baseIrr !== 0 ? ((capRateIrr - baseIrr) / baseIrr) * 100 : 0;

  // Cost sensitivity (10% increase)
  const costIncreaseInputs = { ...inputs, propertyManagementFee: inputs.propertyManagementFee * 1.1 };
  const costIrr = calculateReturnMetrics(costIncreaseInputs).internalRateOfReturn;
  const irrSensitivityToCosts = baseIrr !== 0 ? ((costIrr - baseIrr) / baseIrr) * 100 : 0;

  // Delay sensitivity (6 months)
  const delayIrr = baseIrr * 0.95; // Simplified
  const irrSensitivityToDelay = baseIrr !== 0 ? ((delayIrr - baseIrr) / baseIrr) * 100 : 0;

  return {
    irrSensitivityToNoi,
    irrSensitivityToCapRate,
    irrSensitivityToCosts,
    irrSensitivityToDelay
  };
}

// Calculate scenario analysis
export function calculateScenarioAnalysis(inputs: RealEstateSyndicationInputs): {
  baseCaseIrr: number;
  bestCaseIrr: number;
  worstCaseIrr: number;
  monteCarloAverageIrr: number;
} {
  const returns = calculateReturnMetrics(inputs);

  const baseCaseIrr = returns.internalRateOfReturn;
  const bestCaseIrr = baseCaseIrr * 1.5;
  const worstCaseIrr = baseCaseIrr * 0.5;
  const monteCarloAverageIrr = baseCaseIrr * 0.95; // Simplified

  return {
    baseCaseIrr,
    bestCaseIrr,
    worstCaseIrr,
    monteCarloAverageIrr
  };
}

// Calculate tax analysis
export function calculateTaxAnalysis(inputs: RealEstateSyndicationInputs): {
  depreciationBenefit: number;
  taxSavings: number;
  afterTaxIrr: number;
  taxEfficiency: number;
} {
  const depreciationBenefit = inputs.depreciationSchedule.reduce((sum, dep) => sum + dep, 0);
  const taxSavings = depreciationBenefit * (inputs.taxBracket / 100);
  const returns = calculateReturnMetrics(inputs);
  const afterTaxIrr = returns.internalRateOfReturn * (1 - inputs.taxBracket / 100);
  const taxEfficiency = 100 - inputs.taxBracket;

  return {
    depreciationBenefit,
    taxSavings,
    afterTaxIrr,
    taxEfficiency
  };
}

// Calculate deal metrics
export function calculateDealMetrics(inputs: RealEstateSyndicationInputs): {
  capRate: number;
  noiYield: number;
  cashOnCashYield: number;
  breakEvenOccupancy: number;
} {
  const capRate = inputs.purchasePrice > 0 ? (inputs.year1Noi / inputs.purchasePrice) * 100 : 0;
  const noiYield = inputs.totalEquity > 0 ? (inputs.year1Noi / inputs.totalEquity) * 100 : 0;

  const cashFlow = calculateCashFlowAnalysis(inputs);
  const cashOnCashYield = inputs.totalEquity > 0 ? (cashFlow.year1CashFlow / inputs.totalEquity) * 100 : 0;

  // Break-even occupancy (simplified)
  const operatingExpenses = inputs.propertyManagementFee + inputs.insurance + inputs.propertyTaxes + inputs.utilities + inputs.otherOperatingExpenses;
  const breakEvenOccupancy = inputs.year1Noi > 0 ? (operatingExpenses / inputs.year1Noi) * 100 : 100;

  return {
    capRate,
    noiYield,
    cashOnCashYield,
    breakEvenOccupancy
  };
}

// Calculate sponsor analysis
export function calculateSponsorAnalysis(inputs: RealEstateSyndicationInputs): {
  sponsorQualityScore: number;
  sponsorAlignment: number;
  sponsorIncentiveAlignment: number;
  sponsorTrackRecordScore: number;
} {
  // Sponsor quality score based on experience and track record
  const experienceScore = inputs.sponsorExperience === 'Advanced' ? 30 : inputs.sponsorExperience === 'Intermediate' ? 20 : 10;
  const trackRecordScore = inputs.sponsorTrackRecord;
  const dealQualityScore = inputs.sponsorPreviousDeals.length * 5;

  const sponsorQualityScore = Math.min(100, experienceScore + trackRecordScore + dealQualityScore);

  // Alignment metrics
  const sponsorAlignment = inputs.profitSplitSponsor > 0.7 ? 0.9 : inputs.profitSplitSponsor > 0.6 ? 0.8 : 0.7;
  const sponsorIncentiveAlignment = inputs.preferredReturn < 0.08 ? 0.9 : inputs.preferredReturn < 0.1 ? 0.8 : 0.7;
  const sponsorTrackRecordScore = inputs.sponsorTrackRecord;

  return {
    sponsorQualityScore,
    sponsorAlignment,
    sponsorIncentiveAlignment,
    sponsorTrackRecordScore
  };
}

// Calculate market analysis
export function calculateMarketAnalysis(inputs: RealEstateSyndicationInputs): {
  marketTiming: RealEstateSyndicationOutputs['marketTiming'];
  marketRiskPremium: number;
  marketPositionScore: number;
  competitiveAdvantageScore: number;
} {
  // Market timing assessment
  let marketTiming: RealEstateSyndicationOutputs['marketTiming'] = 'Fair';
  if (inputs.marketGrowthRate > 0.03 && inputs.marketVacancyRate < 0.05) {
    marketTiming = 'Good';
  } else if (inputs.marketGrowthRate < 0.01 || inputs.marketVacancyRate > 0.1) {
    marketTiming = 'Poor';
  }

  const marketRiskPremium = inputs.marketCapRate - 0.03; // Risk-free rate assumption
  const marketPositionScore = inputs.marketPosition === 'Superior' ? 90 : inputs.marketPosition === 'Comparable' ? 70 : 50;
  const competitiveAdvantageScore = inputs.uniqueSellingPoints.length * 10;

  return {
    marketTiming,
    marketRiskPremium,
    marketPositionScore,
    competitiveAdvantageScore
  };
}

// Calculate property analysis
export function calculatePropertyAnalysis(inputs: RealEstateSyndicationInputs): {
  propertyQualityScore: number;
  propertyRiskScore: number;
  propertyValueAdd: number;
  propertyStabilizationTime: number;
} {
  // Property quality based on age, occupancy, and condition
  const ageScore = inputs.yearBuilt > 2000 ? 25 : inputs.yearBuilt > 1980 ? 20 : 15;
  const occupancyScore = inputs.occupancyRate > 0.9 ? 25 : inputs.occupancyRate > 0.8 ? 20 : 15;
  const renovationScore = (new Date().getFullYear() - inputs.lastRenovation) < 5 ? 25 : (new Date().getFullYear() - inputs.lastRenovation) < 10 ? 20 : 15;

  const propertyQualityScore = ageScore + occupancyScore + renovationScore;

  const propertyRiskScore = (inputs.propertyRisk === 'High' ? 80 : inputs.propertyRisk === 'Medium' ? 50 : 20);
  const propertyValueAdd = inputs.projectedExitValue - inputs.purchasePrice;
  const propertyStabilizationTime = inputs.stabilizationPeriodMonths;

  return {
    propertyQualityScore,
    propertyRiskScore,
    propertyValueAdd,
    propertyStabilizationTime
  };
}

// Calculate investor analysis
export function calculateInvestorAnalysis(inputs: RealEstateSyndicationInputs): {
  investorSuitabilityScore: number;
  riskSuitability: RealEstateSyndicationOutputs['riskSuitability'];
  returnSuitability: RealEstateSyndicationOutputs['returnSuitability'];
  diversificationBenefit: number;
} {
  const returns = calculateReturnMetrics(inputs);

  // Suitability based on investor profile
  let suitabilityScore = 50;

  if (inputs.sophisticationLevel === 'Advanced') suitabilityScore += 25;
  else if (inputs.sophisticationLevel === 'Intermediate') suitabilityScore += 15;

  if (inputs.minimumNetWorth >= 1000000) suitabilityScore += 15;
  if (inputs.minimumIncome >= 200000) suitabilityScore += 10;

  const riskSuitability: RealEstateSyndicationOutputs['riskSuitability'] =
    returns.internalRateOfReturn < 0.08 ? 'Low' : returns.internalRateOfReturn < 0.15 ? 'Medium' : 'High';

  const returnSuitability: RealEstateSyndicationOutputs['returnSuitability'] =
    returns.equityMultiple < 1.5 ? 'Low' : returns.equityMultiple < 2.0 ? 'Medium' : 'High';

  const diversificationBenefit = 0.8; // Real estate typically provides good diversification

  return {
    investorSuitabilityScore: suitabilityScore,
    riskSuitability,
    returnSuitability,
    diversificationBenefit
  };
}

// Calculate recommendation
export function calculateRecommendation(inputs: RealEstateSyndicationInputs): {
  investmentRecommendation: RealEstateSyndicationOutputs['investmentRecommendation'];
  confidenceLevel: RealEstateSyndicationOutputs['confidenceLevel'];
  keyRisks: string[];
  keyOpportunities: string[];
} {
  const returns = calculateReturnMetrics(inputs);
  const risk = calculateRiskAnalysis(inputs);
  const sponsor = calculateSponsorAnalysis(inputs);
  const market = calculateMarketAnalysis(inputs);

  let recommendationScore = 0;

  // Return potential (30% weight)
  if (returns.internalRateOfReturn > 0.15) recommendationScore += 30;
  else if (returns.internalRateOfReturn > 0.12) recommendationScore += 25;
  else if (returns.internalRateOfReturn > 0.08) recommendationScore += 15;

  // Risk assessment (25% weight)
  if (risk.probabilityOfSuccess > 0.8) recommendationScore += 25;
  else if (risk.probabilityOfSuccess > 0.6) recommendationScore += 20;
  else if (risk.probabilityOfSuccess > 0.4) recommendationScore += 10;

  // Sponsor quality (20% weight)
  if (sponsor.sponsorQualityScore > 80) recommendationScore += 20;
  else if (sponsor.sponsorQualityScore > 60) recommendationScore += 15;
  else if (sponsor.sponsorQualityScore > 40) recommendationScore += 10;

  // Market conditions (15% weight)
  if (market.marketTiming === 'Good') recommendationScore += 15;
  else if (market.marketTiming === 'Fair') recommendationScore += 10;
  else recommendationScore += 5;

  // Deal structure (10% weight)
  if (inputs.profitSplitLimitedPartners > 0.7) recommendationScore += 10;
  else if (inputs.profitSplitLimitedPartners > 0.6) recommendationScore += 7;

  let investmentRecommendation: RealEstateSyndicationOutputs['investmentRecommendation'];
  if (recommendationScore >= 85) investmentRecommendation = 'Strong Buy';
  else if (recommendationScore >= 70) investmentRecommendation = 'Buy';
  else if (recommendationScore >= 55) investmentRecommendation = 'Hold';
  else if (recommendationScore >= 35) investmentRecommendation = 'Sell';
  else investmentRecommendation = 'Strong Sell';

  const confidenceLevel: RealEstateSyndicationOutputs['confidenceLevel'] =
    recommendationScore > 75 ? 'High' : recommendationScore > 60 ? 'Medium' : 'Low';

  const keyRisks: string[] = [];
  const keyOpportunities: string[] = [];

  if (inputs.marketRisk === 'High') keyRisks.push('High market risk');
  if (inputs.propertyRisk === 'High') keyRisks.push('High property risk');
  if (sponsor.sponsorQualityScore < 50) keyRisks.push('Lower sponsor quality');
  if (inputs.preferredReturn > 0.1) keyRisks.push('High preferred return reduces upside');

  if (returns.internalRateOfReturn > 0.12) keyOpportunities.push('Strong return potential');
  if (sponsor.sponsorTrackRecord > 80) keyOpportunities.push('Excellent sponsor track record');
  if (market.marketTiming === 'Good') keyOpportunities.push('Favorable market timing');
  if (inputs.profitSplitLimitedPartners > 0.7) keyOpportunities.push('Favorable profit split');

  return {
    investmentRecommendation,
    confidenceLevel,
    keyRisks,
    keyOpportunities
  };
}

// Main calculation function
export function calculateRealEstateSyndicationAnalysis(inputs: RealEstateSyndicationInputs): RealEstateSyndicationOutputs {
  const capitalStructure = calculateCapitalStructure(inputs);
  const waterfall = calculateWaterfallDistributions(inputs);
  const returns = calculateReturnMetrics(inputs);
  const cashFlow = calculateCashFlowAnalysis(inputs);
  const profitSplits = calculateProfitSplits(inputs);
  const feeAnalysis = calculateFeeAnalysis(inputs);
  const risk = calculateRiskAnalysis(inputs);
  const sensitivity = calculateSensitivityAnalysis(inputs);
  const scenario = calculateScenarioAnalysis(inputs);
  const tax = calculateTaxAnalysis(inputs);
  const dealMetrics = calculateDealMetrics(inputs);
  const sponsor = calculateSponsorAnalysis(inputs);
  const market = calculateMarketAnalysis(inputs);
  const property = calculatePropertyAnalysis(inputs);
  const investor = calculateInvestorAnalysis(inputs);
  const recommendation = calculateRecommendation(inputs);

  // Additional calculations
  const exitValue = inputs.year5Noi / (inputs.exitCapRate / 100);
  const totalValueCreated = exitValue - inputs.totalAcquisitionCost;
  const valuePerInvestor = inputs.numberOfInvestors > 0 ? totalValueCreated / inputs.numberOfInvestors : 0;

  // Performance vs targets
  const irrVsTarget = returns.internalRateOfReturn - (inputs.targetIrr / 100);
  const equityMultipleVsTarget = returns.equityMultiple - inputs.targetEquityMultiple;
  const cashOnCashVsTarget = returns.cashOnCashReturn - (inputs.targetCashOnCash / 100);

  const performanceRating: RealEstateSyndicationOutputs['performanceRating'] =
    irrVsTarget > 0.02 && equityMultipleVsTarget > 0.2 ? 'Excellent' :
    irrVsTarget > 0 && equityMultipleVsTarget > 0 ? 'Good' :
    irrVsTarget > -0.02 && equityMultipleVsTarget > -0.2 ? 'Fair' : 'Poor';

  // Benchmarking
  const vsIndustryAverageIrr = returns.internalRateOfReturn - 0.10; // Assume 10% industry average
  const vsIndustryAverageEquityMultiple = returns.equityMultiple - 1.8; // Assume 1.8x industry average
  const vsComparableDeals = returns.internalRateOfReturn - inputs.comparableDeals.reduce((sum, deal) => sum + deal.irr, 0) / inputs.comparableDeals.length;
  const percentileRanking = returns.internalRateOfReturn > 0.12 ? 75 : returns.internalRateOfReturn > 0.08 ? 50 : 25;

  // Risk metrics
  const marketRiskScore = inputs.marketRisk === 'High' ? 80 : inputs.marketRisk === 'Medium' ? 50 : 20;
  const executionRiskScore = inputs.executionRisk === 'High' ? 80 : inputs.executionRisk === 'Medium' ? 50 : 20;
  const regulatoryRiskScore = inputs.regulatoryRisk === 'High' ? 80 : inputs.regulatoryRisk === 'Medium' ? 50 : 20;
  const totalRiskScore = (marketRiskScore + property.propertyRiskScore + executionRiskScore + regulatoryRiskScore) / 4;

  // Educational content
  const syndicationFacts = [
    'Real estate syndication pools investor capital for larger property acquisitions',
    'Limited partners provide capital while sponsors manage the investment',
    'Preferred returns ensure investors receive minimum returns before profits are split',
    'Syndications offer diversification and professional management'
  ];

  const riskEducation = [
    'Market conditions can significantly impact property values',
    'Sponsor experience and track record are critical success factors',
    'Liquidity can be limited compared to public investments',
    'Regulatory changes can affect syndication structures'
  ];

  const strategyTips = [
    'Diversify across multiple syndication investments',
    'Research sponsor track record thoroughly',
    'Understand the waterfall distribution structure',
    'Consider tax implications of syndication investments'
  ];

  // Performance tracking
  const milestoneAchievement = 0.75; // Simplified
  const timelineAdherence = 90; // Simplified
  const budgetAdherence = 95; // Simplified
  const qualityAchievement = 85; // Simplified

  // Attribution analysis
  const returnAttribution = {
    noiGrowth: 0.4,
    propertyAppreciation: 0.35,
    costControl: 0.15,
    marketTiming: 0.1
  };

  // Stress testing
  const stressTestResults = {
    recessionScenario: returns.internalRateOfReturn * 0.6,
    highInterestScenario: returns.internalRateOfReturn * 0.8,
    lowOccupancyScenario: returns.internalRateOfReturn * 0.7,
    costOverrunScenario: returns.internalRateOfReturn * 0.75
  };

  // Alternative structures
  const alternativeStructures = {
    directOwnership: returns.internalRateOfReturn * 0.9,
    jointVenture: returns.internalRateOfReturn * 1.0,
    crowdfunding: returns.internalRateOfReturn * 0.85
  };

  // Portfolio impact
  const portfolioDiversification = 0.8;
  const portfolioReturnEnhancement = returns.internalRateOfReturn * 0.7;
  const portfolioRiskAdjustment = risk.riskAdjustedIrr;

  // Legacy value
  const longTermAppreciation = inputs.propertyAppreciation / 100;
  const generationalWealth = totalValueCreated * 0.4;
  const communityImpact = 0.7;

  // Technology impact
  const syndicationPlatformEfficiency = 0.85;
  const digitalReportingBenefits = totalValueCreated * 0.02;
  const automationSavings = inputs.totalEquity * 0.01;

  // International considerations
  const crossBorderImplications = ['Check tax treaty benefits'];
  const currencyRisk = 0.1;
  const regulatoryComplexity = inputs.regulatoryRisk === 'High' ? 0.8 : 0.4;

  // Succession planning
  const transferability = 0.6;
  const liquidityOptions = 0.4;
  const estatePlanningEfficiency = 0.75;

  // Economic analysis
  const inflationHedge = 0.8;
  const economicCycleSensitivity = 0.6;
  const interestRateSensitivity = returns.internalRateOfReturn * 0.001;

  // Industry comparables
  const industryComparables = inputs.comparableDeals.map(deal => ({
    name: `${deal.propertyType} Deal`,
    irr: deal.irr,
    equityMultiple: deal.equityMultiple,
    riskLevel: deal.irr > 0.12 ? 'Low' : deal.irr > 0.08 ? 'Medium' : 'High'
  }));

  // Deal sourcing
  const dealSourceQuality = sponsor.sponsorQualityScore / 100;
  const marketIntelligence = market.marketPositionScore / 100;
  const competitiveAnalysis = market.competitiveAdvantageScore / 100;

  // Long-term value
  const valuePreservation = 0.85;
  const valueEnhancement = totalValueCreated / inputs.totalAcquisitionCost;
  const legacyCreation = generationalWealth / inputs.totalEquity;

  // Innovation opportunities
  const emergingTrends = ['Technology integration', 'ESG focus', 'Alternative financing'];
  const technologyAdoption = 0.7;
  const processOptimization = 0.8;

  // Stakeholder analysis
  const investorSatisfaction = recommendation.investmentRecommendation === 'Strong Buy' ? 0.9 : 0.7;
  const sponsorSatisfaction = sponsor.sponsorAlignment;
  const communityRelations = 0.8;
  const regulatoryRelations = 0.75;

  // Performance metrics
  const goalsAchievement = (irrVsTarget > 0 ? 1 : 0) + (equityMultipleVsTarget > 0 ? 1 : 0) + (cashOnCashVsTarget > 0 ? 1 : 0);
  const targetsMet = goalsAchievement / 3;
  const expectationsExceeded = returns.internalRateOfReturn > inputs.targetIrr / 100 ? 0.8 : 0.5;
  const overallSuccess = (targetsMet + expectationsExceeded) / 2;

  // Future outlook
  const marketTrends = ['Increasing institutional investment', 'Technology adoption', 'ESG focus'];
  const regulatoryChanges = ['Potential SEC rule changes', 'Tax law modifications'];
  const technologyEvolution = ['AI-driven underwriting', 'Blockchain for syndications'];

  // Action items
  const immediateActions = [
    'Review offering memorandum',
    'Verify sponsor credentials',
    'Assess property due diligence'
  ];

  const shortTermPlanning = [
    'Monitor deal progress',
    'Plan capital calls',
    'Review distribution waterfall'
  ];

  const longTermStrategy = [
    'Develop exit strategy',
    'Plan reinvestment options',
    'Build relationship with sponsor'
  ];

  // Compliance monitoring
  const regulatoryAdherence = inputs.secFiling === 'Regulation D' ? 0.9 : 0.8;
  const reportingAccuracy = 0.95;
  const transparencyLevel = 0.85;

  // Value creation metrics
  const economicValueAdded = totalValueCreated;
  const socialValueCreated = communityImpact * totalValueCreated;
  const environmentalValue = inputs.energyEfficiencyRating / 100 * totalValueCreated;

  // Innovation impact
  const processImprovement = 0.75;
  const efficiencyGains = automationSavings / inputs.totalEquity;
  const competitiveAdvantage = technologyAdoption * processImprovement;

  return {
    ...capitalStructure,
    ...waterfall,
    ...returns,
    ...cashFlow,
    ...profitSplits,
    ...feeAnalysis,
    ...risk,
    ...sensitivity,
    ...scenario,
    ...tax,
    ...dealMetrics,
    irrVsTarget,
    equityMultipleVsTarget,
    cashOnCashVsTarget,
    performanceRating,
    vsIndustryAverageIrr,
    vsIndustryAverageEquityMultiple,
    vsComparableDeals,
    percentileRanking,
    marketRiskScore,
    executionRiskScore,
    regulatoryRiskScore,
    totalRiskScore,
    baseCaseNpv: totalValueCreated / Math.pow(1 + returns.internalRateOfReturn, inputs.holdPeriodYears),
    optimisticCaseNpv: totalValueCreated * 1.3 / Math.pow(1 + returns.internalRateOfReturn, inputs.holdPeriodYears),
    pessimisticCaseNpv: totalValueCreated * 0.7 / Math.pow(1 + returns.internalRateOfReturn, inputs.holdPeriodYears),
    monteCarloExpectedIrr: returns.internalRateOfReturn * 0.95,
    constructionCostPerSqFt: inputs.totalAcquisitionCost / inputs.squareFootage,
    developmentTimeEfficiency: inputs.holdPeriodYears / inputs.stabilizationPeriodMonths * 12,
    costControlEfficiency: 0.9,
    overallEfficiency: 0.85,
    exitValue,
    exitCapRate: inputs.exitCapRate,
    exitMultiple: returns.equityMultiple,
    exitTiming: inputs.holdPeriodYears,
    maximumCashRequired: inputs.totalAcquisitionCost,
    cashRunwayMonths: inputs.holdPeriodYears * 12,
    capitalCallsRequired: inputs.numberOfInvestors,
    reinvestmentRequired: 0,
    seniorDebtIrr: inputs.seniorDebtInterestRate / 100,
    mezzanineDebtIrr: inputs.mezzanineDebtInterestRate / 100,
    preferredEquityIrr: inputs.preferredEquityReturn / 100,
    commonEquityIrr: returns.internalRateOfReturn,
    repositioningPotential: 0.6,
    redevelopmentPotential: 0.4,
    expansionPotential: 0.5,
    operationalImprovements: 0.7,
    energyEfficiencyRating: 75,
    environmentalImpact: 0.6,
    greenBuildingCertification: 'LEED Silver',
    sustainabilityScore: 70,
    zoningCompliance: true,
    permitStatus: 'Approved',
    environmentalCompliance: true,
    adaCompliance: true,
    supplyDemandRatio: 1.2,
    marketGrowthRate: inputs.marketGrowthRate,
    marketPositionScore,
    competitiveAdvantageScore: market.competitiveAdvantageScore,
    occupancyRate: inputs.occupancyRate,
    tenantRetentionRate: 85,
    operatingEfficiency: 0.9,
    customerSatisfaction: 4.2,
    liquidityRatio: 1.5,
    solvencyRatio: 2.1,
    profitabilityRatio: returns.cashOnCashReturn,
    efficiencyRatio: 0.8,
    dealQualityScore: 75,
    sponsorQualityScore: sponsor.sponsorQualityScore,
    locationQualityScore: 70,
    executionQualityScore: 65,
    ...recommendation,
    syndicationFacts,
    riskEducation,
    strategyTips,
    milestoneAchievement,
    timelineAdherence,
    budgetAdherence,
    qualityAchievement,
    returnAttribution,
    stressTestResults,
    alternativeStructures,
    portfolioDiversification,
    portfolioReturnEnhancement,
    portfolioRiskAdjustment,
    longTermAppreciation,
    generationalWealth,
    communityImpact,
    syndicationPlatformEfficiency,
    digitalReportingBenefits,
    automationSavings,
    crossBorderImplications,
    currencyRisk,
    regulatoryComplexity,
    transferability,
    liquidityOptions,
    estatePlanningEfficiency,
    inflationHedge,
    economicCycleSensitivity,
    interestRateSensitivity,
    industryComparables,
    dealSourceQuality,
    marketIntelligence,
    competitiveAnalysis,
    valuePreservation,
    valueEnhancement,
    legacyCreation,
    emergingTrends,
    technologyAdoption,
    processOptimization,
    investorSatisfaction,
    sponsorSatisfaction,
    communityRelations,
    regulatoryRelations,
    goalsAchievement,
    targetsMet,
    expectationsExceeded,
    overallSuccess,
    marketTrends,
    regulatoryChanges,
    technologyEvolution,
    immediateActions,
    shortTermPlanning,
    longTermStrategy,
    regulatoryAdherence,
    reportingAccuracy,
    transparencyLevel,
    economicValueAdded,
    socialValueCreated,
    environmentalValue,
    processImprovement,
    efficiencyGains,
    competitiveAdvantage
  };
}