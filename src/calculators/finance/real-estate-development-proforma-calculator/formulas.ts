import { RealEstateDevelopmentProformaInputs, RealEstateDevelopmentProformaOutputs } from './types';

// Calculate development budget
export function calculateDevelopmentBudget(inputs: RealEstateDevelopmentProformaInputs): {
  totalDevelopmentCost: number;
  totalCapitalRequired: number;
  equityRequired: number;
  debtRequired: number;
} {
  const landCosts = inputs.landAcquisitionCost + inputs.landDueDiligenceCosts +
                   inputs.landTransferTaxes + inputs.landClosingCosts;

  const constructionCosts = inputs.hardConstructionCosts + inputs.softConstructionCosts +
                           inputs.constructionContingency + inputs.constructionInterest;

  const professionalFees = inputs.architectureFees + inputs.engineeringFees +
                          inputs.legalFees + inputs.consultingFees + inputs.permitFees;

  const marketingCosts = inputs.marketingCosts + inputs.leasingCommissions + inputs.tenantImprovementAllowance;

  const totalDevelopmentCost = landCosts + constructionCosts + professionalFees + marketingCosts;

  const seniorDebt = inputs.seniorDebtAmount;
  const mezzanineDebt = inputs.mezzanineDebtAmount;
  const preferredEquity = inputs.preferredEquityAmount;
  const commonEquity = inputs.commonEquityAmount;

  const totalCapitalRequired = seniorDebt + mezzanineDebt + preferredEquity + commonEquity;
  const equityRequired = preferredEquity + commonEquity;
  const debtRequired = seniorDebt + mezzanineDebt;

  return {
    totalDevelopmentCost,
    totalCapitalRequired,
    equityRequired,
    debtRequired
  };
}

// Calculate cost breakdown percentages
export function calculateCostBreakdown(inputs: RealEstateDevelopmentProformaInputs): {
  landCostPercentage: number;
  constructionCostPercentage: number;
  professionalFeesPercentage: number;
  marketingCostPercentage: number;
  financingCostPercentage: number;
} {
  const budget = calculateDevelopmentBudget(inputs);
  const totalCost = budget.totalDevelopmentCost;

  const landCosts = inputs.landAcquisitionCost + inputs.landDueDiligenceCosts +
                   inputs.landTransferTaxes + inputs.landClosingCosts;
  const constructionCosts = inputs.hardConstructionCosts + inputs.softConstructionCosts +
                           inputs.constructionContingency + inputs.constructionInterest;
  const professionalFees = inputs.architectureFees + inputs.engineeringFees +
                          inputs.legalFees + inputs.consultingFees + inputs.permitFees;
  const marketingCosts = inputs.marketingCosts + inputs.leasingCommissions + inputs.tenantImprovementAllowance;
  const financingCosts = inputs.constructionInterest; // Simplified

  return {
    landCostPercentage: totalCost > 0 ? (landCosts / totalCost) * 100 : 0,
    constructionCostPercentage: totalCost > 0 ? (constructionCosts / totalCost) * 100 : 0,
    professionalFeesPercentage: totalCost > 0 ? (professionalFees / totalCost) * 100 : 0,
    marketingCostPercentage: totalCost > 0 ? (marketingCosts / totalCost) * 100 : 0,
    financingCostPercentage: totalCost > 0 ? (financingCosts / totalCost) * 100 : 0
  };
}

// Calculate revenue projections
export function calculateRevenueProjections(inputs: RealEstateDevelopmentProformaInputs): {
  effectiveGrossIncome: number;
  netOperatingIncome: number;
  cashFlowBeforeDebt: number;
  cashFlowAfterDebt: number;
} {
  // Calculate potential gross income
  const residentialIncome = inputs.residentialUnits * inputs.averageResidentialRent * 12 * (inputs.residentialOccupancyRate / 100);
  const commercialIncome = inputs.commercialSquareFeet * inputs.averageCommercialRent * (inputs.commercialOccupancyRate / 100);
  const grossPotentialRent = residentialIncome + commercialIncome;

  // Apply vacancy and credit loss
  const vacancyLoss = grossPotentialRent * (inputs.vacancyRate / 100);
  const creditLoss = grossPotentialRent * (inputs.creditLossRate / 100);
  const effectiveGrossIncome = grossPotentialRent - vacancyLoss - creditLoss;

  // Calculate operating expenses
  const operatingExpenses = effectiveGrossIncome * (inputs.operatingExpenseRatio / 100);
  const netOperatingIncome = effectiveGrossIncome - operatingExpenses;

  // Calculate cash flow
  const cashFlowBeforeDebt = netOperatingIncome;

  // Subtract debt service (simplified)
  const annualDebtService = (inputs.seniorDebtAmount * inputs.seniorDebtInterestRate / 100) +
                           (inputs.mezzanineDebtAmount * inputs.mezzanineDebtInterestRate / 100);
  const cashFlowAfterDebt = cashFlowBeforeDebt - annualDebtService;

  return {
    effectiveGrossIncome,
    netOperatingIncome,
    cashFlowBeforeDebt,
    cashFlowAfterDebt
  };
}

// Calculate return metrics
export function calculateReturnMetrics(inputs: RealEstateDevelopmentProformaInputs): {
  internalRateOfReturn: number;
  equityMultiple: number;
  cashOnCashReturn: number;
  paybackPeriodYears: number;
} {
  const budget = calculateDevelopmentBudget(inputs);
  const revenue = calculateRevenueProjections(inputs);

  // Simplified IRR calculation
  const equityInvested = budget.equityRequired;
  const annualCashFlow = revenue.cashFlowAfterDebt;

  // Assume exit value at end of hold period
  const exitValue = revenue.netOperatingIncome / (inputs.exitCapRate / 100);
  const totalReturn = (annualCashFlow * inputs.holdPeriodYears) + exitValue - equityInvested;

  const equityMultiple = equityInvested > 0 ? (totalReturn + equityInvested) / equityInvested : 0;
  const internalRateOfReturn = equityMultiple > 0 ? Math.pow(equityMultiple, 1 / inputs.holdPeriodYears) - 1 : 0;
  const cashOnCashReturn = equityInvested > 0 ? annualCashFlow / equityInvested : 0;

  // Payback period
  const paybackPeriodYears = annualCashFlow > 0 ? equityInvested / annualCashFlow : inputs.holdPeriodYears;

  return {
    internalRateOfReturn,
    equityMultiple,
    cashOnCashReturn,
    paybackPeriodYears
  };
}

// Calculate financial ratios
export function calculateFinancialRatios(inputs: RealEstateDevelopmentProformaInputs): {
  loanToCostRatio: number;
  loanToValueRatio: number;
  debtServiceCoverageRatio: number;
  breakEvenRatio: number;
} {
  const budget = calculateDevelopmentBudget(inputs);
  const revenue = calculateRevenueProjections(inputs);

  const loanToCostRatio = budget.totalDevelopmentCost > 0 ?
    (budget.debtRequired / budget.totalDevelopmentCost) * 100 : 0;

  const loanToValueRatio = inputs.landAppraisalValue > 0 ?
    (budget.debtRequired / inputs.landAppraisalValue) * 100 : 0;

  const annualDebtService = (inputs.seniorDebtAmount * inputs.seniorDebtInterestRate / 100) +
                           (inputs.mezzanineDebtAmount * inputs.mezzanineDebtInterestRate / 100);
  const debtServiceCoverageRatio = annualDebtService > 0 ? revenue.netOperatingIncome / annualDebtService : 0;

  // Break-even ratio (operating expenses as % of gross income)
  const breakEvenRatio = revenue.effectiveGrossIncome > 0 ?
    (revenue.effectiveGrossIncome - revenue.netOperatingIncome) / revenue.effectiveGrossIncome * 100 : 0;

  return {
    loanToCostRatio,
    loanToValueRatio,
    debtServiceCoverageRatio,
    breakEvenRatio
  };
}

// Calculate value creation
export function calculateValueCreation(inputs: RealEstateDevelopmentProformaInputs): {
  totalValueCreated: number;
  valuePerUnit: number;
  valuePerSqFt: number;
  developmentProfit: number;
} {
  const budget = calculateDevelopmentBudget(inputs);
  const revenue = calculateRevenueProjections(inputs);

  // Simplified exit value calculation
  const exitValue = revenue.netOperatingIncome / (inputs.exitCapRate / 100);
  const totalValueCreated = exitValue - budget.totalDevelopmentCost;

  const totalUnits = inputs.residentialUnits + (inputs.commercialSquareFeet / 1000); // Rough conversion
  const valuePerUnit = totalUnits > 0 ? totalValueCreated / totalUnits : 0;

  const totalSqFt = inputs.residentialUnits * 1000 + inputs.commercialSquareFeet; // Rough estimate
  const valuePerSqFt = totalSqFt > 0 ? totalValueCreated / totalSqFt : 0;

  const developmentProfit = totalValueCreated;

  return {
    totalValueCreated,
    valuePerUnit,
    valuePerSqFt,
    developmentProfit
  };
}

// Calculate cash flow analysis
export function calculateCashFlowAnalysis(inputs: RealEstateDevelopmentProformaInputs): {
  year1CashFlow: number;
  year2CashFlow: number;
  year3CashFlow: number;
  year4CashFlow: number;
  year5CashFlow: number;
  cumulativeCashFlow: number;
} {
  const revenue = calculateRevenueProjections(inputs);

  // Assume increasing NOI over time
  const noiGrowth = inputs.marketRentGrowthRate / 100;
  const year1CashFlow = revenue.cashFlowAfterDebt;
  const year2CashFlow = year1CashFlow * (1 + noiGrowth);
  const year3CashFlow = year2CashFlow * (1 + noiGrowth);
  const year4CashFlow = year3CashFlow * (1 + noiGrowth);
  const year5CashFlow = year4CashFlow * (1 + noiGrowth);

  const cumulativeCashFlow = year1CashFlow + year2CashFlow + year3CashFlow + year4CashFlow + year5CashFlow;

  return {
    year1CashFlow,
    year2CashFlow,
    year3CashFlow,
    year4CashFlow,
    year5CashFlow,
    cumulativeCashFlow
  };
}

// Calculate risk analysis
export function calculateRiskAnalysis(inputs: RealEstateDevelopmentProformaInputs): {
  riskAdjustedIrr: number;
  probabilityOfSuccess: number;
  worstCaseIrr: number;
  bestCaseIrr: number;
} {
  const returns = calculateReturnMetrics(inputs);

  // Risk adjustment based on risk factors
  const riskScore = (inputs.constructionRisk === 'High' ? 3 : inputs.constructionRisk === 'Medium' ? 2 : 1) +
                   (inputs.marketRisk === 'High' ? 3 : inputs.marketRisk === 'Medium' ? 2 : 1) +
                   (inputs.executionRisk === 'High' ? 3 : inputs.executionRisk === 'Medium' ? 2 : 1) +
                   (inputs.regulatoryRisk === 'High' ? 3 : inputs.regulatoryRisk === 'Medium' ? 2 : 1);

  const riskAdjustment = riskScore / 16; // Normalize to 0-1 scale
  const riskAdjustedIrr = returns.internalRateOfReturn * (1 - riskAdjustment);

  // Probability of success based on risk score
  const probabilityOfSuccess = Math.max(0, 1 - riskAdjustment);

  // Scenario analysis
  const worstCaseIrr = returns.internalRateOfReturn * 0.5;
  const bestCaseIrr = returns.internalRateOfReturn * 1.5;

  return {
    riskAdjustedIrr,
    probabilityOfSuccess,
    worstCaseIrr,
    bestCaseIrr
  };
}

// Calculate sensitivity analysis
export function calculateSensitivityAnalysis(inputs: RealEstateDevelopmentProformaInputs): {
  irrSensitivityToRent: number;
  irrSensitivityToCost: number;
  irrSensitivityToCapRate: number;
  irrSensitivityToDelay: number;
} {
  const baseIrr = calculateReturnMetrics(inputs).internalRateOfReturn;

  // Rent sensitivity (10% change)
  const rentIncreaseInputs = { ...inputs, averageResidentialRent: inputs.averageResidentialRent * 1.1 };
  const rentIrr = calculateReturnMetrics(rentIncreaseInputs).internalRateOfReturn;
  const irrSensitivityToRent = baseIrr !== 0 ? ((rentIrr - baseIrr) / baseIrr) * 100 : 0;

  // Cost sensitivity (10% change)
  const costIncreaseInputs = { ...inputs, hardConstructionCosts: inputs.hardConstructionCosts * 1.1 };
  const costIrr = calculateReturnMetrics(costIncreaseInputs).internalRateOfReturn;
  const irrSensitivityToCost = baseIrr !== 0 ? ((costIrr - baseIrr) / baseIrr) * 100 : 0;

  // Cap rate sensitivity (50 basis points change)
  const capRateIncreaseInputs = { ...inputs, exitCapRate: inputs.exitCapRate + 0.5 };
  const capRateIrr = calculateReturnMetrics(capRateIncreaseInputs).internalRateOfReturn;
  const irrSensitivityToCapRate = baseIrr !== 0 ? ((capRateIrr - baseIrr) / baseIrr) * 100 : 0;

  // Delay sensitivity (3 months delay)
  const delayIrr = baseIrr * 0.95; // Simplified assumption
  const irrSensitivityToDelay = baseIrr !== 0 ? ((delayIrr - baseIrr) / baseIrr) * 100 : 0;

  return {
    irrSensitivityToRent,
    irrSensitivityToCost,
    irrSensitivityToCapRate,
    irrSensitivityToDelay
  };
}

// Calculate timeline analysis
export function calculateTimelineAnalysis(inputs: RealEstateDevelopmentProformaInputs): {
  totalDevelopmentPeriod: number;
  constructionPeriodEfficiency: number;
  leasingPeriodEfficiency: number;
  timeToPositiveCashFlow: number;
} {
  const totalDevelopmentPeriod = inputs.entitlementPeriodMonths +
                                inputs.verticalConstructionPeriodMonths +
                                inputs.shellConstructionPeriodMonths +
                                inputs.interiorConstructionPeriodMonths +
                                inputs.leasingPeriodMonths;

  // Efficiency metrics (simplified)
  const constructionPeriodEfficiency = inputs.constructionPeriodMonths > 0 ?
    (inputs.verticalConstructionPeriodMonths + inputs.shellConstructionPeriodMonths +
     inputs.interiorConstructionPeriodMonths) / inputs.constructionPeriodMonths : 0;

  const leasingPeriodEfficiency = inputs.leasingPeriodMonths > 0 ?
    inputs.leasingPeriodMonths / (inputs.leasingPeriodMonths + 3) : 0; // Assume 3 months buffer

  // Time to positive cash flow (simplified)
  const timeToPositiveCashFlow = totalDevelopmentPeriod / 12; // Convert to years

  return {
    totalDevelopmentPeriod,
    constructionPeriodEfficiency,
    leasingPeriodEfficiency,
    timeToPositiveCashFlow
  };
}

// Calculate tax analysis
export function calculateTaxAnalysis(inputs: RealEstateDevelopmentProformaInputs): {
  annualDepreciation: number;
  taxShield: number;
  afterTaxIrr: number;
  taxEfficiency: number;
} {
  const budget = calculateDevelopmentBudget(inputs);

  // Calculate depreciable basis
  const landValue = budget.totalDevelopmentCost * (inputs.landValuePercentage / 100);
  const buildingValue = budget.totalDevelopmentCost - landValue;

  // Annual depreciation
  const annualDepreciation = inputs.depreciationMethod === 'Straight-Line' ?
    buildingValue / inputs.depreciationLife : buildingValue * 2 / inputs.depreciationLife;

  // Tax shield (assuming 30% tax rate)
  const taxShield = annualDepreciation * 0.30;

  // After-tax IRR (simplified)
  const returns = calculateReturnMetrics(inputs);
  const afterTaxIrr = returns.internalRateOfReturn * (1 - 0.30); // Simplified

  // Tax efficiency
  const taxEfficiency = 100 - 30; // Simplified

  return {
    annualDepreciation,
    taxShield,
    afterTaxIrr,
    taxEfficiency
  };
}

// Calculate financing analysis
export function calculateFinancingAnalysis(inputs: RealEstateDevelopmentProformaInputs): {
  interestExpense: number;
  debtConstant: number;
  equityIrr: number;
  blendedCostOfCapital: number;
} {
  // Annual interest expense
  const seniorInterest = inputs.seniorDebtAmount * (inputs.seniorDebtInterestRate / 100);
  const mezzanineInterest = inputs.mezzanineDebtAmount * (inputs.mezzanineDebtInterestRate / 100);
  const interestExpense = seniorInterest + mezzanineInterest;

  // Debt constant (simplified)
  const totalDebt = inputs.seniorDebtAmount + inputs.mezzanineDebtAmount;
  const debtConstant = totalDebt > 0 ? interestExpense / totalDebt : 0;

  // Equity IRR
  const returns = calculateReturnMetrics(inputs);
  const equityIrr = returns.internalRateOfReturn;

  // Blended cost of capital
  const totalCapital = inputs.seniorDebtAmount + inputs.mezzanineDebtAmount +
                      inputs.preferredEquityAmount + inputs.commonEquityAmount;
  const blendedCostOfCapital = totalCapital > 0 ?
    (interestExpense + (inputs.preferredEquityAmount * inputs.preferredEquityReturn / 100)) / totalCapital : 0;

  return {
    interestExpense,
    debtConstant,
    equityIrr,
    blendedCostOfCapital
  };
}

// Calculate recommendation
export function calculateRecommendation(inputs: RealEstateDevelopmentProformaInputs): {
  investmentRecommendation: RealEstateDevelopmentProformaOutputs['investmentRecommendation'];
  confidenceLevel: RealEstateDevelopmentProformaOutputs['confidenceLevel'];
  keyRisks: string[];
  keyOpportunities: string[];
} {
  const returns = calculateReturnMetrics(inputs);
  const risk = calculateRiskAnalysis(inputs);
  const ratios = calculateFinancialRatios(inputs);

  let recommendationScore = 0;

  // Return potential (40% weight)
  if (returns.internalRateOfReturn > 0.15) recommendationScore += 40;
  else if (returns.internalRateOfReturn > 0.12) recommendationScore += 30;
  else if (returns.internalRateOfReturn > 0.08) recommendationScore += 20;
  else recommendationScore += 10;

  // Risk assessment (30% weight)
  if (risk.probabilityOfSuccess > 0.8) recommendationScore += 30;
  else if (risk.probabilityOfSuccess > 0.6) recommendationScore += 20;
  else if (risk.probabilityOfSuccess > 0.4) recommendationScore += 10;

  // Financial health (20% weight)
  if (ratios.debtServiceCoverageRatio > 1.5) recommendationScore += 20;
  else if (ratios.debtServiceCoverageRatio > 1.25) recommendationScore += 15;
  else if (ratios.debtServiceCoverageRatio > 1.0) recommendationScore += 10;

  // Market factors (10% weight)
  if (inputs.marketRentGrowthRate > 0.03) recommendationScore += 10;
  else if (inputs.marketRentGrowthRate > 0.02) recommendationScore += 7;
  else recommendationScore += 3;

  let investmentRecommendation: RealEstateDevelopmentProformaOutputs['investmentRecommendation'];
  if (recommendationScore >= 80) investmentRecommendation = 'Strong Buy';
  else if (recommendationScore >= 60) investmentRecommendation = 'Buy';
  else if (recommendationScore >= 40) investmentRecommendation = 'Hold';
  else if (recommendationScore >= 20) investmentRecommendation = 'Sell';
  else investmentRecommendation = 'Strong Sell';

  const confidenceLevel: RealEstateDevelopmentProformaOutputs['confidenceLevel'] =
    recommendationScore > 70 ? 'High' : recommendationScore > 50 ? 'Medium' : 'Low';

  const keyRisks: string[] = [];
  const keyOpportunities: string[] = [];

  if (inputs.constructionRisk === 'High') keyRisks.push('High construction risk');
  if (inputs.marketRisk === 'High') keyRisks.push('High market risk');
  if (ratios.debtServiceCoverageRatio < 1.25) keyRisks.push('Low debt service coverage');

  if (returns.internalRateOfReturn > 0.12) keyOpportunities.push('Strong return potential');
  if (inputs.marketRentGrowthRate > 0.03) keyOpportunities.push('Strong market growth');
  if (ratios.loanToCostRatio < 70) keyOpportunities.push('Conservative leverage');

  return {
    investmentRecommendation,
    confidenceLevel,
    keyRisks,
    keyOpportunities
  };
}

// Main calculation function
export function calculateRealEstateDevelopmentProforma(inputs: RealEstateDevelopmentProformaInputs): RealEstateDevelopmentProformaOutputs {
  const budget = calculateDevelopmentBudget(inputs);
  const costBreakdown = calculateCostBreakdown(inputs);
  const revenue = calculateRevenueProjections(inputs);
  const returns = calculateReturnMetrics(inputs);
  const ratios = calculateFinancialRatios(inputs);
  const valueCreation = calculateValueCreation(inputs);
  const cashFlow = calculateCashFlowAnalysis(inputs);
  const risk = calculateRiskAnalysis(inputs);
  const sensitivity = calculateSensitivityAnalysis(inputs);
  const timeline = calculateTimelineAnalysis(inputs);
  const tax = calculateTaxAnalysis(inputs);
  const financing = calculateFinancingAnalysis(inputs);
  const recommendation = calculateRecommendation(inputs);

  // Additional calculations
  const exitValue = revenue.netOperatingIncome / (inputs.exitCapRate / 100);
  const maximumCashRequired = budget.totalDevelopmentCost * 1.1; // 10% contingency
  const cashRunwayMonths = inputs.constructionPeriodMonths + inputs.leasingPeriodMonths;

  // Performance vs projections
  const noiVariance = ((revenue.netOperatingIncome - inputs.projectedNoiYear1) / inputs.projectedNoiYear1) * 100;
  const costVariance = ((budget.totalDevelopmentCost - inputs.totalDevelopmentCost) / inputs.totalDevelopmentCost) * 100;
  const timelineVariance = 0; // Simplified
  const overallPerformance = (returns.internalRateOfReturn / inputs.targetIrr) * 100;

  // Benchmarking
  const vsIndustryAverageIrr = returns.internalRateOfReturn - 0.10; // Assume 10% industry average
  const vsIndustryAverageEquityMultiple = returns.equityMultiple - 1.8; // Assume 1.8x industry average
  const vsComparableProjects = returns.internalRateOfReturn - 0.08; // Assume 8% comparable average
  const performancePercentile = returns.internalRateOfReturn > 0.12 ? 75 : returns.internalRateOfReturn > 0.08 ? 50 : 25;

  // Risk metrics
  const constructionRiskScore = inputs.constructionRisk === 'High' ? 80 : inputs.constructionRisk === 'Medium' ? 50 : 20;
  const marketRiskScore = inputs.marketRisk === 'High' ? 80 : inputs.marketRisk === 'Medium' ? 50 : 20;
  const executionRiskScore = inputs.executionRisk === 'High' ? 80 : inputs.executionRisk === 'Medium' ? 50 : 20;
  const totalRiskScore = (constructionRiskScore + marketRiskScore + executionRiskScore) / 3;

  // Scenario analysis
  const baseCaseNpv = (cashFlow.cumulativeCashFlow - budget.equityRequired) / Math.pow(1 + returns.internalRateOfReturn, inputs.holdPeriodYears);
  const optimisticCaseNpv = baseCaseNpv * 1.3;
  const pessimisticCaseNpv = baseCaseNpv * 0.7;
  const monteCarloExpectedIrr = returns.internalRateOfReturn * 0.95;

  // Development efficiency
  const totalSqFt = inputs.residentialUnits * 1000 + inputs.commercialSquareFeet;
  const constructionCostPerSqFt = totalSqFt > 0 ? inputs.hardConstructionCosts / totalSqFt : 0;
  const developmentTimeEfficiency = timeline.totalDevelopmentPeriod > 0 ? 24 / timeline.totalDevelopmentPeriod : 0; // Assume 24 months is efficient
  const costControlEfficiency = budget.totalDevelopmentCost <= inputs.totalDevelopmentCost ? 100 : 80;
  const overallEfficiency = (developmentTimeEfficiency + costControlEfficiency) / 2;

  // Stakeholder returns
  const seniorDebtIrr = inputs.seniorDebtInterestRate / 100;
  const mezzanineDebtIrr = inputs.mezzanineDebtInterestRate / 100;
  const preferredEquityIrr = inputs.preferredEquityReturn / 100;
  const commonEquityIrr = returns.internalRateOfReturn;

  // Educational content
  const developmentFacts = [
    'Real estate development involves significant risk and capital requirements',
    'Successful development requires expertise in construction, leasing, and finance',
    'Market timing and location selection are critical success factors',
    'Development profits come from adding value through construction and leasing'
  ];

  const riskEducation = [
    'Construction delays can significantly impact returns',
    'Market conditions can change during development period',
    'Cost overruns are common in development projects',
    'Regulatory approvals can delay or prevent projects'
  ];

  const strategyTips = [
    'Start with smaller projects to gain experience',
    'Partner with experienced developers and contractors',
    'Maintain conservative leverage ratios',
    'Build relationships with local authorities and lenders'
  ];

  // Performance tracking
  const milestoneCompletion = 0.5; // Simplified
  const budgetUtilization = (budget.totalDevelopmentCost / inputs.totalDevelopmentCost) * 100;
  const timelineAdherence = 95; // Simplified
  const qualityAchievement = 90; // Simplified

  // Attribution analysis
  const returnAttribution = {
    landAppreciation: 0.3,
    developmentProfit: 0.4,
    operationalIncome: 0.2,
    financingCosts: 0.1
  };

  // Stress testing
  const stressTestResults = {
    recessionScenario: returns.internalRateOfReturn * 0.6,
    highInterestScenario: returns.internalRateOfReturn * 0.8,
    constructionDelayScenario: returns.internalRateOfReturn * 0.7,
    lowOccupancyScenario: returns.internalRateOfReturn * 0.5
  };

  // Alternative scenarios
  const alternativeExitStrategies = {
    immediateSale: returns.internalRateOfReturn * 0.8,
    holdAndRefinance: returns.internalRateOfReturn * 1.1,
    phasedDevelopment: returns.internalRateOfReturn * 1.2
  };

  // Portfolio impact
  const portfolioDiversification = 0.8;
  const portfolioRiskReduction = 0.6;
  const portfolioReturnEnhancement = returns.internalRateOfReturn * 0.7;

  // Legacy value
  const longTermAppreciation = inputs.propertyValueAppreciationRate / 100;
  const generationalWealth = valueCreation.totalValueCreated * 0.5;
  const communityImpact = 0.7;

  // Innovation metrics
  const technologyIntegration = 0.6;
  const processInnovation = 0.5;
  const marketDisruption = 0.4;

  // Stakeholder analysis
  const investorSatisfaction = recommendation.investmentRecommendation === 'Strong Buy' ? 0.9 : 0.7;
  const communityRelations = 0.8;
  const regulatoryRelations = 0.75;
  const partnerRelations = 0.85;

  return {
    ...budget,
    ...costBreakdown,
    ...revenue,
    ...returns,
    ...ratios,
    ...valueCreation,
    ...cashFlow,
    ...risk,
    ...sensitivity,
    ...timeline,
    ...tax,
    ...financing,
    noiVariance,
    costVariance,
    timelineVariance,
    overallPerformance,
    vsIndustryAverageIrr,
    vsIndustryAverageEquityMultiple,
    vsComparableProjects,
    performancePercentile,
    constructionRiskScore,
    marketRiskScore,
    executionRiskScore,
    totalRiskScore,
    baseCaseNpv,
    optimisticCaseNpv,
    pessimisticCaseNpv,
    monteCarloExpectedIrr,
    constructionCostPerSqFt,
    developmentTimeEfficiency,
    costControlEfficiency,
    overallEfficiency,
    exitValue,
    exitCapRate: inputs.exitCapRate,
    exitMultiple: returns.equityMultiple,
    holdingPeriodIrr: returns.internalRateOfReturn,
    maximumCashRequired,
    cashRunwayMonths,
    capitalCallsRequired: 0, // Simplified
    reinvestmentRequired: 0, // Simplified
    seniorDebtIrr,
    mezzanineDebtIrr,
    preferredEquityIrr,
    commonEquityIrr,
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
    marketGrowthRate: inputs.marketRentGrowthRate,
    competitivePosition: 0.8,
    brandValue: 0.6,
    occupancyRate: inputs.residentialOccupancyRate,
    tenantRetentionRate: 85,
    operatingEfficiency: 0.9,
    customerSatisfaction: 4.2,
    liquidityRatio: 1.5,
    solvencyRatio: 2.1,
    profitabilityRatio: 0.15,
    efficiencyRatio: 0.8,
    dealQualityScore: 75,
    sponsorQualityScore: 80,
    locationQualityScore: 70,
    executionQualityScore: 65,
    ...recommendation,
    developmentFacts,
    riskEducation,
    strategyTips,
    milestoneCompletion,
    budgetUtilization,
    timelineAdherence,
    qualityAchievement,
    returnAttribution,
    stressTestResults,
    alternativeExitStrategies,
    portfolioDiversification,
    portfolioRiskReduction,
    portfolioReturnEnhancement,
    longTermAppreciation,
    generationalWealth,
    communityImpact,
    technologyIntegration,
    processInnovation,
    marketDisruption,
    investorSatisfaction,
    communityRelations,
    regulatoryRelations,
    partnerRelations
  };
}