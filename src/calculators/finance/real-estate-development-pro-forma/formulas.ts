import { 
  RealEstateDevelopmentProFormaInputs, 
  RealEstateDevelopmentProFormaOutputs, 
  RealEstateDevelopmentProFormaAnalysis, 
  RealEstateDevelopmentProFormaMetrics, 
  CashFlowProjection, 
  SensitivityResult, 
  StressTestResult, 
  BreakEvenAnalysis,
  RiskAssessment,
  RiskDetail,
  InvestmentSummary,
  ExitStrategy,
  TimelineSummary,
  MilestoneSummary,
  ScenarioAnalysis
} from './types';

export function calculateRealEstateDevelopmentProForma(inputs: RealEstateDevelopmentProFormaInputs): RealEstateDevelopmentProFormaOutputs {
  const metrics = calculateRealEstateDevelopmentProFormaMetrics(inputs);
  const cashFlowProjections = calculateCashFlowProjections(inputs, metrics);
  const sensitivityResults = calculateSensitivityResults(inputs, metrics);
  const stressTestResults = calculateStressTestResults(inputs, metrics);
  const breakEvenAnalysis = calculateBreakEvenAnalysis(inputs, metrics);
  const analysis = calculateRealEstateDevelopmentProFormaAnalysis(inputs, metrics);
  const investmentSummary = calculateInvestmentSummary(inputs, metrics);
  const timelineSummary = calculateTimelineSummary(inputs, metrics);
  const riskAssessment = calculateRiskAssessment(inputs, metrics);

  return {
    metrics,
    analysis,
    cashFlowProjections,
    scenarioAnalysis: [],
    investmentSummary,
    timelineSummary,
    riskAssessment,
    breakEvenAnalysis,
    sensitivityResults,
    stressTestResults,
    projectViability: analysis.projectViability,
    recommendations: analysis.recommendations,
    keyMetrics: {
      totalProjectCost: metrics.totalProjectCost,
      totalRevenue: metrics.totalRevenue,
      totalProfit: metrics.totalProfit,
      irr: metrics.internalRateOfReturn,
      npv: metrics.netPresentValue,
      profitMargin: metrics.profitMargin,
      returnOnEquity: metrics.returnOnEquity,
      equityMultiple: metrics.equityMultiple,
      paybackPeriod: metrics.paybackPeriod,
      breakEvenOccupancy: metrics.breakEvenOccupancy
    },
    assumptions: {
      constructionCost: inputs.constructionCost,
      marketRent: inputs.marketRent,
      marketCapRate: inputs.marketCapRate,
      interestRate: inputs.interestRate,
      discountRate: inputs.discountRate,
      holdPeriod: inputs.holdPeriod,
      vacancyRate: inputs.vacancyRate,
      rentGrowthRate: inputs.rentGrowthRate
    }
  };
}

function calculateRealEstateDevelopmentProFormaMetrics(inputs: RealEstateDevelopmentProFormaInputs): RealEstateDevelopmentProFormaMetrics {
  // Construction costs
  const totalConstructionCost = inputs.projectSize * inputs.constructionCost;
  const softCostsAmount = totalConstructionCost * (inputs.softCosts / 100);
  const contingencyAmount = (inputs.landCost + inputs.acquisitionCosts + totalConstructionCost + softCostsAmount) * (inputs.contingency / 100);
  
  // Total project cost
  const totalProjectCost = inputs.landCost + inputs.acquisitionCosts + totalConstructionCost + 
                          softCostsAmount + contingencyAmount + inputs.financingCosts + 
                          inputs.marketingCosts + inputs.legalCosts + inputs.insuranceCosts;
  
  // Revenue calculations
  const grossPotentialRent = inputs.projectSize * inputs.marketRent * 12;
  const effectiveGrossIncome = grossPotentialRent * (1 - inputs.vacancyRate / 100);
  
  // Operating expenses
  const annualOperatingExpenses = inputs.propertyTaxes + inputs.utilities + inputs.maintenanceCosts + 
                                 (effectiveGrossIncome * inputs.managementFees / 100);
  
  const netOperatingIncome = effectiveGrossIncome - annualOperatingExpenses;
  
  // Financing calculations
  const monthlyInterestRate = inputs.interestRate / 100 / 12;
  const totalPayments = inputs.loanTerm * 12;
  const debtService = calculateMonthlyPayment(inputs.loanAmount, monthlyInterestRate, totalPayments) * 12;
  
  const cashFlow = netOperatingIncome - debtService;
  
  // Return calculations
  const totalRevenue = effectiveGrossIncome * inputs.holdPeriod;
  const totalProfit = totalRevenue - totalProjectCost - (debtService * inputs.holdPeriod);
  const profitMargin = (totalProfit / totalProjectCost) * 100;
  
  const returnOnCost = (netOperatingIncome / totalProjectCost) * 100;
  const returnOnEquity = (cashFlow / inputs.equityContribution) * 100;
  const cashOnCashReturn = (cashFlow / inputs.equityContribution) * 100;
  
  // IRR calculation (simplified)
  const cashFlows = [];
  for (let i = 0; i < inputs.holdPeriod; i++) {
    if (i === 0) {
      cashFlows.push(-inputs.equityContribution);
    } else {
      cashFlows.push(cashFlow);
    }
  }
  cashFlows.push(cashFlow + inputs.equityContribution); // Return of equity
  const internalRateOfReturn = calculateIRR(cashFlows);
  
  // NPV calculation
  const netPresentValue = calculateNPV(cashFlows, inputs.discountRate / 100);
  
  // Equity multiple
  const equityMultiple = (inputs.equityContribution + (cashFlow * inputs.holdPeriod)) / inputs.equityContribution;
  
  // Payback period
  const paybackPeriod = inputs.equityContribution / cashFlow;
  
  // Break-even calculations
  const breakEvenOccupancy = ((debtService + annualOperatingExpenses) / grossPotentialRent) * 100;
  const breakEvenRent = (debtService + annualOperatingExpenses) / (inputs.projectSize * 12 * (1 - inputs.vacancyRate / 100));
  
  // Market value
  const marketValue = netOperatingIncome / (inputs.marketCapRate / 100);
  const pricePerSqFt = marketValue / inputs.projectSize;
  const rentPerSqFt = inputs.marketRent;
  const occupancyRate = 100 - inputs.vacancyRate;
  
  // Risk metrics
  const riskAdjustedReturn = internalRateOfReturn - (inputs.constructionRisk + inputs.marketRisk + inputs.financingRisk) / 10;
  const sensitivityScore = 100 - (inputs.constructionRisk + inputs.marketRisk + inputs.financingRisk) * 5;
  const stressTestScore = 100 - (inputs.constructionRisk + inputs.marketRisk) * 8;
  
  let riskRating: 'low' | 'medium' | 'high';
  if (riskAdjustedReturn > 15) riskRating = 'low';
  else if (riskAdjustedReturn > 8) riskRating = 'medium';
  else riskRating = 'high';
  
  // Timeline metrics
  const totalTimeline = inputs.constructionDuration + inputs.leaseUpPeriod + inputs.stabilizationPeriod;
  const constructionPeriod = inputs.constructionDuration;
  const leaseUpPeriod = inputs.leaseUpPeriod;
  const stabilizationPeriod = inputs.stabilizationPeriod;
  const timeToBreakEven = paybackPeriod * 12;
  
  // Financing metrics
  const debtServiceCoverageRatio = netOperatingIncome / debtService;
  const loanToCostRatio = (inputs.loanAmount / totalProjectCost) * 100;
  const loanToValueRatio = (inputs.loanAmount / marketValue) * 100;
  const equityContribution = inputs.equityContribution;
  const equityReturn = inputs.equityReturn;
  
  return {
    totalProjectCost,
    totalRevenue,
    totalProfit,
    profitMargin,
    returnOnCost,
    returnOnEquity,
    internalRateOfReturn,
    netPresentValue,
    paybackPeriod,
    breakEvenOccupancy,
    breakEvenRent,
    constructionCostPerSqFt: inputs.constructionCost,
    totalConstructionCost,
    softCostsAmount,
    contingencyAmount,
    constructionTimeline: inputs.constructionDuration,
    grossPotentialRent,
    effectiveGrossIncome,
    netOperatingIncome,
    cashFlow,
    cashOnCashReturn,
    equityMultiple,
    debtService,
    debtServiceCoverageRatio,
    loanToCostRatio,
    loanToValueRatio,
    equityContribution,
    equityReturn,
    marketValue,
    marketCapRate: inputs.marketCapRate,
    pricePerSqFt,
    rentPerSqFt,
    occupancyRate,
    riskAdjustedReturn,
    sensitivityScore,
    stressTestScore,
    riskRating,
    totalTimeline,
    constructionPeriod,
    leaseUpPeriod,
    stabilizationPeriod,
    timeToBreakEven
  };
}

function calculateCashFlowProjections(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): CashFlowProjection[] {
  const projections: CashFlowProjection[] = [];
  const totalPeriods = inputs.constructionDuration + inputs.leaseUpPeriod + inputs.stabilizationPeriod + (inputs.holdPeriod * 12);
  
  let cumulativeCashFlow = -inputs.equityContribution;
  
  for (let i = 0; i < totalPeriods; i++) {
    let constructionCosts = 0;
    let revenue = 0;
    let operatingExpenses = 0;
    let debtService = 0;
    let occupancy = 0;
    let noi = 0;
    
    if (i < inputs.constructionDuration) {
      // Construction phase
      constructionCosts = metrics.totalConstructionCost / inputs.constructionDuration;
      occupancy = 0;
    } else if (i < inputs.constructionDuration + inputs.leaseUpPeriod) {
      // Lease-up phase
      const leaseUpMonth = i - inputs.constructionDuration;
      occupancy = (leaseUpMonth / inputs.leaseUpPeriod) * (100 - inputs.vacancyRate);
      revenue = (metrics.grossPotentialRent / 12) * (occupancy / 100);
      operatingExpenses = (metrics.netOperatingIncome / 12) * (occupancy / 100);
      debtService = metrics.debtService / 12;
      noi = revenue - operatingExpenses;
    } else {
      // Stabilized phase
      occupancy = 100 - inputs.vacancyRate;
      revenue = metrics.grossPotentialRent / 12;
      operatingExpenses = (metrics.netOperatingIncome / 12);
      debtService = metrics.debtService / 12;
      noi = revenue - operatingExpenses;
    }
    
    const cashFlow = noi - debtService;
    cumulativeCashFlow += cashFlow;
    
    projections.push({
      period: `Month ${i + 1}`,
      date: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      constructionCosts,
      revenue,
      operatingExpenses,
      debtService,
      cashFlow,
      cumulativeCashFlow,
      occupancy,
      noi
    });
  }
  
  return projections;
}

function calculateSensitivityResults(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): SensitivityResult[] {
  const scenarios = [
    { name: 'Base Case', constructionCostChange: 0, rentChange: 0, interestRateChange: 0, timelineChange: 0 },
    { name: 'Construction Cost +10%', constructionCostChange: 10, rentChange: 0, interestRateChange: 0, timelineChange: 0 },
    { name: 'Construction Cost -10%', constructionCostChange: -10, rentChange: 0, interestRateChange: 0, timelineChange: 0 },
    { name: 'Rent +10%', constructionCostChange: 0, rentChange: 10, interestRateChange: 0, timelineChange: 0 },
    { name: 'Rent -10%', constructionCostChange: 0, rentChange: -10, interestRateChange: 0, timelineChange: 0 },
    { name: 'Interest Rate +1%', constructionCostChange: 0, rentChange: 0, interestRateChange: 1, timelineChange: 0 },
    { name: 'Interest Rate -1%', constructionCostChange: 0, rentChange: 0, interestRateChange: -1, timelineChange: 0 },
    { name: 'Timeline +3 months', constructionCostChange: 0, rentChange: 0, interestRateChange: 0, timelineChange: 3 },
    { name: 'Timeline -3 months', constructionCostChange: 0, rentChange: 0, interestRateChange: 0, timelineChange: -3 }
  ];
  
  return scenarios.map(scenario => {
    const adjustedConstructionCost = inputs.constructionCost * (1 + scenario.constructionCostChange / 100);
    const adjustedRent = inputs.marketRent * (1 + scenario.rentChange / 100);
    const adjustedInterestRate = inputs.interestRate + scenario.interestRateChange;
    const adjustedTimeline = inputs.constructionDuration + scenario.timelineChange;
    
    // Simplified calculation for sensitivity
    const adjustedNPV = metrics.netPresentValue * (1 + (scenario.rentChange - scenario.constructionCostChange) / 100);
    const adjustedIRR = metrics.internalRateOfReturn + (scenario.rentChange - scenario.constructionCostChange) / 10;
    const adjustedProfitMargin = metrics.profitMargin + (scenario.rentChange - scenario.constructionCostChange);
    const adjustedBreakEvenOccupancy = metrics.breakEvenOccupancy * (1 + scenario.constructionCostChange / 100);
    
    let impact: 'positive' | 'negative' | 'neutral';
    if (adjustedIRR > metrics.internalRateOfReturn) impact = 'positive';
    else if (adjustedIRR < metrics.internalRateOfReturn) impact = 'negative';
    else impact = 'neutral';
    
    return {
      scenario: scenario.name,
      npv: adjustedNPV,
      irr: adjustedIRR,
      profitMargin: adjustedProfitMargin,
      breakEvenOccupancy: adjustedBreakEvenOccupancy,
      impact
    };
  });
}

function calculateStressTestResults(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): StressTestResult[] {
  const tests = [
    { name: 'Severe Construction Delays', constructionCostIncrease: 20, rentDecrease: 0, interestRateIncrease: 0, timelineExtension: 6, vacancyIncrease: 0 },
    { name: 'Market Downturn', constructionCostIncrease: 0, rentDecrease: 20, interestRateIncrease: 0, timelineExtension: 0, vacancyIncrease: 10 },
    { name: 'Interest Rate Spike', constructionCostIncrease: 0, rentDecrease: 0, interestRateIncrease: 2, timelineExtension: 0, vacancyIncrease: 0 },
    { name: 'Combined Stress', constructionCostIncrease: 15, rentDecrease: 15, interestRateIncrease: 1, timelineExtension: 3, vacancyIncrease: 5 }
  ];
  
  return tests.map(test => {
    // Simplified stress test calculation
    const stressNPV = metrics.netPresentValue * (1 - test.constructionCostIncrease / 100 - test.rentDecrease / 100 - test.interestRateIncrease / 10);
    const stressIRR = metrics.internalRateOfReturn - test.constructionCostIncrease / 10 - test.rentDecrease / 10 - test.interestRateIncrease / 5;
    const stressCashFlow = metrics.cashFlow * (1 - test.rentDecrease / 100 - test.vacancyIncrease / 100);
    
    let survivability: 'high' | 'medium' | 'low';
    if (stressIRR > 10) survivability = 'high';
    else if (stressIRR > 5) survivability = 'medium';
    else survivability = 'low';
    
    return {
      test: test.name,
      npv: stressNPV,
      irr: stressIRR,
      cashFlow: stressCashFlow,
      survivability,
      description: `Tests project resilience under ${test.name.toLowerCase()} conditions`
    };
  });
}

function calculateBreakEvenAnalysis(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): BreakEvenAnalysis {
  const breakEvenOccupancy = metrics.breakEvenOccupancy;
  const breakEvenRent = metrics.breakEvenRent;
  const breakEvenTimeline = metrics.timeToBreakEven;
  const marginOfSafety = ((100 - inputs.vacancyRate) - breakEvenOccupancy) / (100 - inputs.vacancyRate) * 100;
  const sensitivityToRent = (breakEvenOccupancy / inputs.marketRent) * 0.1; // 10% rent change impact
  const sensitivityToCosts = (breakEvenOccupancy / inputs.constructionCost) * 10; // 10% cost change impact
  
  return {
    breakEvenOccupancy,
    breakEvenRent,
    breakEvenTimeline,
    marginOfSafety,
    sensitivityToRent,
    sensitivityToCosts
  };
}

function calculateRealEstateDevelopmentProFormaAnalysis(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): RealEstateDevelopmentProFormaAnalysis {
  // Project viability assessment
  let projectViability: 'highly-viable' | 'viable' | 'marginal' | 'not-viable';
  let viabilityScore: number;
  
  if (metrics.internalRateOfReturn > 20 && metrics.profitMargin > 25) {
    projectViability = 'highly-viable';
    viabilityScore = 90;
  } else if (metrics.internalRateOfReturn > 15 && metrics.profitMargin > 15) {
    projectViability = 'viable';
    viabilityScore = 75;
  } else if (metrics.internalRateOfReturn > 10 && metrics.profitMargin > 10) {
    projectViability = 'marginal';
    viabilityScore = 60;
  } else {
    projectViability = 'not-viable';
    viabilityScore = 30;
  }
  
  // Key strengths and risks
  const keyStrengths: string[] = [];
  const keyRisks: string[] = [];
  
  if (metrics.internalRateOfReturn > 15) keyStrengths.push('Strong projected IRR');
  if (metrics.profitMargin > 20) keyStrengths.push('High profit margin');
  if (metrics.debtServiceCoverageRatio > 1.5) keyStrengths.push('Strong debt service coverage');
  if (inputs.marketRent > 2) keyStrengths.push('Above-market rental rates');
  
  if (inputs.constructionRisk > 7) keyRisks.push('High construction risk');
  if (inputs.marketRisk > 6) keyRisks.push('Elevated market risk');
  if (metrics.breakEvenOccupancy > 85) keyRisks.push('High break-even occupancy');
  if (inputs.constructionDuration > 24) keyRisks.push('Extended construction timeline');
  
  // Analysis summaries
  const financialSummary = `The project shows a ${metrics.profitMargin.toFixed(1)}% profit margin with an IRR of ${metrics.internalRateOfReturn.toFixed(1)}%. Total project cost is $${metrics.totalProjectCost.toLocaleString()} with expected revenue of $${metrics.totalRevenue.toLocaleString()}.`;
  
  const cashFlowAnalysis = `Annual cash flow is projected at $${metrics.cashFlow.toLocaleString()} with a cash-on-cash return of ${metrics.cashOnCashReturn.toFixed(1)}%. The project reaches break-even at ${metrics.breakEvenOccupancy.toFixed(1)}% occupancy.`;
  
  const returnAnalysis = `The project offers a ${metrics.returnOnEquity.toFixed(1)}% return on equity with an equity multiple of ${metrics.equityMultiple.toFixed(2)}x. Payback period is ${metrics.paybackPeriod.toFixed(1)} years.`;
  
  const riskAnalysis = `Overall risk rating is ${metrics.riskRating} with construction risk at ${inputs.constructionRisk}/10, market risk at ${inputs.marketRisk}/10, and financing risk at ${inputs.financingRisk}/10.`;
  
  const marketAnalysis = `Market rent of $${inputs.marketRent}/sq ft compares to a ${inputs.marketCapRate}% cap rate. The project is positioned in the ${inputs.projectType} market segment.`;
  
  // Market positioning and competitive analysis
  const marketPositioning = `This ${inputs.projectType} development is positioned as a ${metrics.pricePerSqFt > 200 ? 'premium' : 'mid-market'} project with ${inputs.projectSize.toLocaleString()} sq ft of space.`;
  
  const competitiveAnalysis = `The project competes with similar ${inputs.projectType} developments in the market, offering ${inputs.marketRent > 2.5 ? 'above-average' : 'market-rate'} rental rates.`;
  
  const demandAnalysis = `Market demand for ${inputs.projectType} space appears ${inputs.marketRent > 2 ? 'strong' : 'moderate'} based on current rental rates and vacancy levels.`;
  
  const supplyAnalysis = `Supply of ${inputs.projectType} space in the market is ${inputs.marketVacancy > 8 ? 'oversupplied' : inputs.marketVacancy < 3 ? 'undersupplied' : 'balanced'}.`;
  
  // Recommendations
  const recommendations: string[] = [];
  
  if (metrics.breakEvenOccupancy > 80) {
    recommendations.push('Consider reducing construction costs to lower break-even occupancy');
  }
  
  if (inputs.constructionRisk > 6) {
    recommendations.push('Implement robust construction management and contingency planning');
  }
  
  if (metrics.debtServiceCoverageRatio < 1.3) {
    recommendations.push('Explore additional equity or lower-cost financing options');
  }
  
  if (inputs.marketRisk > 5) {
    recommendations.push('Conduct thorough market analysis and consider pre-leasing strategies');
  }
  
  if (metrics.internalRateOfReturn < 15) {
    recommendations.push('Evaluate opportunities to increase revenue or reduce costs');
  }
  
  return {
    projectViability,
    viabilityScore,
    keyStrengths,
    keyRisks,
    recommendations,
    financialSummary,
    cashFlowAnalysis,
    returnAnalysis,
    riskAnalysis,
    marketAnalysis,
    sensitivityResults: [],
    stressTestResults: [],
    breakEvenAnalysis: calculateBreakEvenAnalysis(inputs, metrics),
    marketPositioning,
    competitiveAnalysis,
    demandAnalysis,
    supplyAnalysis,
    riskAssessment: calculateRiskAssessment(inputs, metrics),
    mitigationStrategies: [
      'Implement comprehensive construction management',
      'Develop contingency plans for market downturns',
      'Secure pre-leasing commitments',
      'Maintain adequate cash reserves'
    ],
    contingencyPlans: [
      'Extend construction timeline if needed',
      'Adjust rental rates based on market conditions',
      'Explore additional financing options',
      'Consider phased development approach'
    ],
    investmentSummary: calculateInvestmentSummary(inputs, metrics),
    exitStrategy: calculateExitStrategy(inputs, metrics),
    timelineSummary: calculateTimelineSummary(inputs, metrics)
  };
}

function calculateRiskAssessment(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): RiskAssessment {
  const constructionRisk: RiskDetail = {
    level: inputs.constructionRisk > 7 ? 'high' : inputs.constructionRisk > 4 ? 'medium' : 'low',
    probability: inputs.constructionRisk / 10,
    impact: inputs.constructionRisk,
    mitigation: 'Implement robust project management and maintain adequate contingencies'
  };
  
  const marketRisk: RiskDetail = {
    level: inputs.marketRisk > 6 ? 'high' : inputs.marketRisk > 3 ? 'medium' : 'low',
    probability: inputs.marketRisk / 10,
    impact: inputs.marketRisk,
    mitigation: 'Conduct thorough market analysis and develop flexible leasing strategies'
  };
  
  const financingRisk: RiskDetail = {
    level: inputs.financingRisk > 5 ? 'high' : inputs.financingRisk > 2 ? 'medium' : 'low',
    probability: inputs.financingRisk / 10,
    impact: inputs.financingRisk,
    mitigation: 'Secure financing commitments early and maintain strong lender relationships'
  };
  
  const regulatoryRisk: RiskDetail = {
    level: inputs.regulatoryRisk > 6 ? 'high' : inputs.regulatoryRisk > 3 ? 'medium' : 'low',
    probability: inputs.regulatoryRisk / 10,
    impact: inputs.regulatoryRisk,
    mitigation: 'Engage with local authorities early and maintain compliance throughout'
  };
  
  const environmentalRisk: RiskDetail = {
    level: inputs.environmentalRisk > 5 ? 'high' : inputs.environmentalRisk > 2 ? 'medium' : 'low',
    probability: inputs.environmentalRisk / 10,
    impact: inputs.environmentalRisk,
    mitigation: 'Conduct thorough environmental assessments and obtain necessary permits'
  };
  
  const overallRisk = (constructionRisk.level === 'high' || marketRisk.level === 'high') ? 'high' :
                     (constructionRisk.level === 'medium' || marketRisk.level === 'medium') ? 'medium' : 'low';
  
  return {
    overallRisk,
    constructionRisk,
    marketRisk,
    financingRisk,
    regulatoryRisk,
    environmentalRisk
  };
}

function calculateInvestmentSummary(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): InvestmentSummary {
  const totalInvestment = inputs.equityContribution;
  const expectedReturn = metrics.internalRateOfReturn;
  const timeline = inputs.holdPeriod;
  const riskLevel = metrics.riskRating;
  
  const keyMetrics = {
    irr: metrics.internalRateOfReturn,
    npv: metrics.netPresentValue,
    equityMultiple: metrics.equityMultiple,
    cashOnCashReturn: metrics.cashOnCashReturn,
    paybackPeriod: metrics.paybackPeriod
  };
  
  const summary = `This ${inputs.projectType} development requires $${totalInvestment.toLocaleString()} in equity investment over ${timeline} years, targeting a ${expectedReturn.toFixed(1)}% IRR with ${riskLevel} risk profile.`;
  
  return {
    totalInvestment,
    expectedReturn,
    timeline,
    riskLevel,
    keyMetrics,
    summary
  };
}

function calculateExitStrategy(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): ExitStrategy {
  const primaryStrategy = inputs.exitStrategy;
  const timing = inputs.exitTiming;
  const expectedValue = metrics.marketValue;
  const expectedReturn = metrics.internalRateOfReturn;
  
  const alternatives = ['refinance', 'partial-sale', '1031-exchange'].filter(strategy => strategy !== primaryStrategy);
  
  return {
    primaryStrategy,
    timing,
    expectedValue,
    expectedReturn,
    alternatives
  };
}

function calculateTimelineSummary(inputs: RealEstateDevelopmentProFormaInputs, metrics: RealEstateDevelopmentProFormaMetrics): TimelineSummary {
  const totalDuration = metrics.totalTimeline;
  
  const keyMilestones: MilestoneSummary[] = [
    {
      milestone: 'Construction Start',
      date: inputs.constructionStartDate,
      cost: 0,
      revenue: 0,
      description: 'Ground breaking and construction commencement'
    },
    {
      milestone: 'Construction Complete',
      date: new Date(new Date(inputs.constructionStartDate).getTime() + inputs.constructionDuration * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      cost: metrics.totalConstructionCost,
      revenue: 0,
      description: 'Substantial completion of construction'
    },
    {
      milestone: 'Stabilization',
      date: new Date(new Date(inputs.constructionStartDate).getTime() + (inputs.constructionDuration + inputs.leaseUpPeriod) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      cost: 0,
      revenue: metrics.effectiveGrossIncome,
      description: 'Project reaches stabilized occupancy'
    }
  ];
  
  const criticalPath = [
    'Site acquisition and permitting',
    'Construction financing',
    'Construction completion',
    'Lease-up and stabilization',
    'Exit strategy execution'
  ];
  
  const riskFactors = [
    'Construction delays',
    'Permitting issues',
    'Market conditions',
    'Financing availability',
    'Tenant demand'
  ];
  
  return {
    totalDuration,
    keyMilestones,
    criticalPath,
    riskFactors
  };
}

// Helper functions
function calculateMonthlyPayment(principal: number, monthlyRate: number, totalPayments: number): number {
  if (monthlyRate === 0) return principal / totalPayments;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
}

function calculateIRR(cashFlows: number[]): number {
  // Simplified IRR calculation
  let irr = 0.1; // Start with 10%
  const tolerance = 0.0001;
  const maxIterations = 100;
  
  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(cashFlows, irr);
    if (Math.abs(npv) < tolerance) break;
    
    const derivative = calculateNPVDerivative(cashFlows, irr);
    irr = irr - npv / derivative;
  }
  
  return irr * 100; // Convert to percentage
}

function calculateNPV(cashFlows: number[], rate: number): number {
  return cashFlows.reduce((npv, cashFlow, period) => {
    return npv + cashFlow / Math.pow(1 + rate, period);
  }, 0);
}

function calculateNPVDerivative(cashFlows: number[], rate: number): number {
  return cashFlows.reduce((derivative, cashFlow, period) => {
    if (period === 0) return derivative;
    return derivative - (period * cashFlow) / Math.pow(1 + rate, period + 1);
  }, 0);
}