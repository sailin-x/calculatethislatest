import { FixAndFlipInputs, FixAndFlipOutputs, FixAndFlipMetrics, FixAndFlipAnalysis } from './types';

export function calculateFixAndFlip(inputs: FixAndFlipInputs): FixAndFlipOutputs {
  // Calculate total purchase costs
  const totalPurchaseCosts = inputs.purchasePrice + inputs.closingCosts + 
    (inputs.inspectionCosts || 0) + (inputs.titleInsurance || 0) + 
    (inputs.transferTaxes || 0) + (inputs.attorneyFees || 0) + 
    (inputs.otherPurchaseCosts || 0);

  // Calculate total renovation costs
  const totalRenovationCosts = (inputs.structuralWorkCost || 0) + 
    (inputs.electricalWorkCost || 0) + (inputs.plumbingWorkCost || 0) + 
    (inputs.hvacWorkCost || 0) + (inputs.roofingWorkCost || 0) + 
    (inputs.kitchenRemodelCost || 0) + (inputs.bathroomRemodelCost || 0) + 
    (inputs.flooringWorkCost || 0) + (inputs.paintingWorkCost || 0) + 
    (inputs.landscapingWorkCost || 0) + (inputs.permitsAndFees || 0) + 
    (inputs.contingencyBudget || 0);

  // Calculate monthly holding costs
  const monthlyHoldingCosts = inputs.propertyTaxes + inputs.insurance + 
    (inputs.utilities || 0) + (inputs.hoaFees || 0) + 
    (inputs.propertyManagement || 0) + (inputs.maintenance || 0) + 
    (inputs.otherHoldingCosts || 0);

  // Calculate total timeline
  const totalTimeline = (inputs.acquisitionTimeline || 30) + 
    (inputs.renovationTimeline || inputs.renovationTimeline * 30) + 
    (inputs.marketingTimeline || 45);

  // Calculate total holding costs
  const totalHoldingCosts = monthlyHoldingCosts * (totalTimeline / 30);

  // Calculate financing costs
  const monthlyPayment = calculateMonthlyPayment(inputs.loanAmount, inputs.interestRate / 100 / 12, inputs.loanTerm);
  const totalInterestPaid = (monthlyPayment * inputs.loanTerm) - inputs.loanAmount;
  const totalFinancingCosts = totalInterestPaid + (inputs.originationFee || 0) + 
    ((inputs.points || 0) / 100 * inputs.loanAmount);

  // Calculate selling costs
  const realtorCommission = (inputs.targetSalePrice * (inputs.realtorCommission || 6)) / 100;
  const totalSellingCosts = realtorCommission + (inputs.closingCostsSeller || 0) + 
    (inputs.stagingCosts || 0) + (inputs.marketingCosts || 0);

  // Calculate total costs
  const totalCosts = totalPurchaseCosts + totalRenovationCosts + totalHoldingCosts + 
    totalSellingCosts + totalFinancingCosts;

  // Calculate total investment
  const totalInvestment = inputs.downPayment + totalPurchaseCosts + totalRenovationCosts;

  // Calculate net profit
  const netProfit = inputs.targetSalePrice - totalCosts;

  // Calculate returns
  const roi = (netProfit / totalInvestment) * 100;
  const cashOnCashReturn = (netProfit / totalInvestment) * 100;
  const annualizedReturn = calculateAnnualizedReturn(totalInvestment, netProfit, totalTimeline / 365);

  // Calculate profitability metrics
  const profitMargin = (netProfit / inputs.targetSalePrice) * 100;
  const profitPerSquareFoot = netProfit / inputs.propertySize;
  const profitPerDay = netProfit / totalTimeline;
  const breakEvenPrice = totalCosts;

  // Calculate after repair value
  const afterRepairValue = inputs.purchasePrice + totalRenovationCosts + 
    (inputs.purchasePrice * (inputs.appreciationRate || 3) / 100 * (totalTimeline / 365));

  // Calculate market value
  const marketValue = afterRepairValue;
  const pricePerSquareFoot = marketValue / inputs.propertySize;

  // Calculate financing metrics
  const loanToValueRatio = inputs.loanAmount / inputs.purchasePrice;
  const debtToEquityRatio = inputs.loanAmount / inputs.downPayment;

  // Calculate cash flow
  const monthlyCashFlow = -monthlyPayment - monthlyHoldingCosts;
  const totalCashFlow = monthlyCashFlow * (totalTimeline / 30);

  // Calculate risk metrics
  const riskScore = calculateRiskScore(inputs);
  const probabilityOfProfit = calculateProbabilityOfProfit(inputs, netProfit);
  const expectedValue = netProfit * (probabilityOfProfit / 100);

  // Generate comprehensive analysis
  const analysis = generateAnalysis(inputs, {
    totalInvestment,
    totalCosts,
    netProfit,
    roi,
    riskScore,
    probabilityOfProfit,
    profitMargin,
    totalTimeline
  });

  // Calculate quality metrics
  const dataQuality = assessDataQuality(inputs);
  const modelAccuracy = assessModelAccuracy(inputs);
  const confidenceLevel = calculateConfidenceLevel(inputs, roi);

  return {
    // Investment Analysis
    totalInvestment,
    totalCosts,
    totalRevenue: inputs.targetSalePrice,
    netProfit,
    roi,
    cashOnCashReturn,
    annualizedReturn,

    // Financial Metrics
    purchaseCosts: totalPurchaseCosts,
    renovationCosts: totalRenovationCosts,
    holdingCosts: totalHoldingCosts,
    sellingCosts: totalSellingCosts,
    financingCosts: totalFinancingCosts,

    // Timeline Analysis
    totalTimeline,
    acquisitionTimeline: inputs.acquisitionTimeline || 30,
    renovationTimeline: inputs.renovationTimeline * 30,
    marketingTimeline: inputs.marketingTimeline || 45,
    holdingPeriod: totalTimeline,

    // Profitability Analysis
    profitMargin,
    profitPerSquareFoot,
    profitPerDay,
    breakEvenPrice,
    breakEvenTimeline: totalTimeline,

    // Risk Metrics
    riskScore,
    probabilityOfProfit,
    worstCaseScenario: netProfit * 0.5,
    bestCaseScenario: netProfit * 1.5,
    expectedValue,

    // Market Analysis
    afterRepairValue,
    marketValue,
    pricePerSquareFoot,
    comparableAnalysis: {
      averagePrice: inputs.targetSalePrice * 0.95,
      medianPrice: inputs.targetSalePrice,
      priceRange: { min: inputs.targetSalePrice * 0.85, max: inputs.targetSalePrice * 1.15 },
      daysOnMarket: inputs.averageDaysOnMarket || 45
    },

    // Financing Analysis
    monthlyPayment,
    totalInterestPaid,
    debtServiceCoverage: inputs.targetSalePrice / (monthlyPayment * 12),
    loanToValueRatio,
    debtToEquityRatio,

    // Cash Flow Analysis
    monthlyCashFlow,
    totalCashFlow,
    cashFlowTimeline: generateCashFlowTimeline(inputs, totalTimeline, monthlyCashFlow),

    // Sensitivity Analysis
    sensitivityMatrix: generateSensitivityMatrix(inputs, netProfit),

    // Scenario Analysis
    scenarios: generateScenarios(inputs, netProfit, totalTimeline),

    // Analysis
    analysis,

    // Additional Output Metrics
    dataQuality,
    modelAccuracy,
    confidenceLevel,

    // Time Series Analysis
    timeSeriesAnalysis: generateProjectTimeline(inputs, totalTimeline),

    // Cash Flow Projections
    cashFlowProjections: generateCashFlowProjections(inputs, totalTimeline),

    // Comparative Analysis
    comparativeAnalysis: generateComparativeAnalysis(inputs, roi, profitMargin),

    // Risk Metrics
    riskMetrics: generateRiskMetrics(inputs, riskScore),

    // Financial Projections
    financialProjections: generateFinancialProjections(inputs, totalTimeline),

    // Project Timeline
    projectTimeline: generateProjectTimeline(inputs, totalTimeline),

    // Due Diligence Checklist
    dueDiligenceChecklist: generateDueDiligenceChecklist(inputs),

    // Project Plan
    projectPlan: generateProjectPlan(inputs),

    // Exit Planning
    exitPlanning: generateExitPlanning(inputs),

    // Risk Mitigation
    riskMitigation: generateRiskMitigation(inputs),

    // Performance Tracking
    performanceTracking: generatePerformanceTracking(inputs)
  };
}

function calculateMonthlyPayment(principal: number, monthlyRate: number, term: number): number {
  if (monthlyRate === 0) return principal / term;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
}

function calculateAnnualizedReturn(investment: number, profit: number, years: number): number {
  if (investment === 0 || years === 0) return 0;
  return (Math.pow((investment + profit) / investment, 1 / years) - 1) * 100;
}

function calculateRiskScore(inputs: FixAndFlipInputs): number {
  let score = 5; // Base score

  // Market risk
  if (inputs.marketRisk === 'high') score += 2;
  else if (inputs.marketRisk === 'medium') score += 1;

  // Renovation risk
  if (inputs.renovationRisk === 'high') score += 2;
  else if (inputs.renovationRisk === 'medium') score += 1;

  // Financing risk
  if (inputs.financingRisk === 'high') score += 2;
  else if (inputs.financingRisk === 'medium') score += 1;

  // Timeline risk
  if (inputs.timelineRisk === 'high') score += 2;
  else if (inputs.timelineRisk === 'medium') score += 1;

  // Property condition
  if (inputs.propertyCondition === 'needs_work') score += 2;
  else if (inputs.propertyCondition === 'poor') score += 1;

  // Loan type risk
  if (inputs.loanType === 'hard_money') score += 1;
  if (inputs.loanType === 'private_money') score += 1;

  return Math.min(10, Math.max(1, score));
}

function calculateProbabilityOfProfit(inputs: FixAndFlipInputs, netProfit: number): number {
  let probability = 70; // Base probability

  // Market conditions
  if (inputs.marketTrends === 'appreciating') probability += 15;
  else if (inputs.marketTrends === 'declining') probability -= 20;

  // Risk factors
  if (inputs.marketRisk === 'low') probability += 10;
  else if (inputs.marketRisk === 'high') probability -= 15;

  if (inputs.renovationRisk === 'low') probability += 10;
  else if (inputs.renovationRisk === 'high') probability -= 15;

  // Profit margin
  if (netProfit > 0) {
    const profitMargin = (netProfit / inputs.targetSalePrice) * 100;
    if (profitMargin > 20) probability += 10;
    else if (profitMargin > 10) probability += 5;
    else if (profitMargin < 5) probability -= 10;
  } else {
    probability -= 30;
  }

  return Math.min(95, Math.max(5, probability));
}

function generateAnalysis(inputs: FixAndFlipInputs, metrics: any): FixAndFlipAnalysis {
  const isGoodROI = metrics.roi > 20;
  const isGoodProfitMargin = metrics.profitMargin > 15;
  const isLowRisk = metrics.riskScore < 6;
  const isHighProbability = metrics.probabilityOfProfit > 70;
  const isGoodTimeline = metrics.totalTimeline < 180;

  let projectRating: 'Excellent' | 'Good' | 'Average' | 'Poor' | 'Very Poor' = 'Average';
  let riskRating: 'Low' | 'Moderate' | 'High' | 'Very High' = 'Moderate';
  let recommendation: 'Proceed' | 'Proceed with Caution' | 'Reconsider' | 'Decline' | 'Require Changes' = 'Proceed with Caution';

  // Project rating logic
  if (isGoodROI && isGoodProfitMargin && isLowRisk && isHighProbability) {
    projectRating = 'Excellent';
  } else if (isGoodROI && isGoodProfitMargin && isHighProbability) {
    projectRating = 'Good';
  } else if (metrics.roi < 10 || metrics.profitMargin < 5) {
    projectRating = 'Poor';
  } else if (metrics.roi < 5) {
    projectRating = 'Very Poor';
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
  if (projectRating === 'Excellent') {
    recommendation = 'Proceed';
  } else if (projectRating === 'Good') {
    recommendation = 'Proceed with Caution';
  } else if (projectRating === 'Poor') {
    recommendation = 'Reconsider';
  } else if (projectRating === 'Very Poor') {
    recommendation = 'Decline';
  }

  return {
    projectRating,
    riskRating,
    recommendation,
    keyStrengths: [
      isGoodROI ? 'Strong ROI potential' : 'Moderate ROI potential',
      isGoodProfitMargin ? 'High profit margin' : 'Moderate profit margin',
      isHighProbability ? 'High probability of success' : 'Moderate probability of success',
      isGoodTimeline ? 'Reasonable timeline' : 'Timeline needs optimization',
      inputs.propertyCondition !== 'needs_work' ? 'Good property condition' : 'Property condition manageable'
    ],
    keyWeaknesses: [
      !isGoodROI ? 'Below target ROI' : 'ROI meets targets',
      !isGoodProfitMargin ? 'Below target profit margin' : 'Profit margin meets targets',
      !isHighProbability ? 'Low probability of success' : 'Success probability acceptable',
      !isGoodTimeline ? 'Extended timeline' : 'Timeline acceptable',
      inputs.propertyCondition === 'needs_work' ? 'Property needs significant work' : 'Property condition acceptable'
    ],
    riskFactors: [
      'Market volatility risk',
      'Renovation cost overruns',
      'Timeline delays',
      'Financing risk',
      'Selling market risk'
    ],
    opportunities: [
      'Market appreciation potential',
      'Value-add improvements',
      'Efficient renovation process',
      'Strong exit market',
      'Favorable financing terms'
    ],
    projectSummary: `Fix and flip project at ${inputs.propertyAddress} with $${metrics.totalInvestment.toLocaleString()} total investment.`,
    financialAnalysis: `Expected ROI of ${metrics.roi.toFixed(1)}% with profit margin of ${metrics.profitMargin.toFixed(1)}%.`,
    marketAnalysis: `Target sale price of $${inputs.targetSalePrice.toLocaleString()} with ${inputs.propertySize} sq ft.`,
    investmentSummary: `Investment of $${metrics.totalInvestment.toLocaleString()} with expected profit of $${metrics.netProfit.toLocaleString()}.`,
    profitabilityAnalysis: `Profit margin of ${metrics.profitMargin.toFixed(1)}% with ${metrics.profitPerSquareFoot.toFixed(2)} profit per sq ft.`,
    cashFlowAnalysis: `Monthly cash flow of $${(metrics.monthlyCashFlow || 0).toLocaleString()} over ${metrics.totalTimeline} days.`,
    marketAssessment: `Market trends: ${inputs.marketTrends || 'stable'} with ${inputs.averageDaysOnMarket || 45} days on market.`,
    comparableAnalysis: `Target price of $${inputs.targetSalePrice.toLocaleString()} based on market comparables.`,
    riskProfile: `Risk score of ${metrics.riskScore.toFixed(1)}/10 with ${metrics.probabilityOfProfit.toFixed(0)}% success probability.`,
    marketRisk: inputs.marketRisk === 'high' ? 'High market risk requires careful timing' : 'Market risk is manageable',
    renovationRisk: inputs.renovationRisk === 'high' ? 'High renovation risk requires experienced contractors' : 'Renovation risk is manageable',
    financingRisk: inputs.financingRisk === 'high' ? 'High financing risk requires backup options' : 'Financing risk is manageable',
    timelineRisk: inputs.timelineRisk === 'high' ? 'High timeline risk requires efficient project management' : 'Timeline risk is manageable',
    timelineAssessment: `Total timeline of ${metrics.totalTimeline} days with ${inputs.renovationTimeline} months renovation.`,
    criticalPath: 'Critical path includes acquisition, renovation, and marketing phases.',
    timelineRisks: 'Timeline risks include permitting delays and contractor availability.',
    financingAssessment: `Financing through ${inputs.loanType} with ${inputs.interestRate}% interest rate.`,
    debtServiceAnalysis: `Monthly payment of $${(metrics.monthlyPayment || 0).toLocaleString()} with LTV of ${(metrics.loanToValueRatio || 0).toFixed(2)}.`,
    equityAnalysis: `Equity investment of $${inputs.downPayment.toLocaleString()} with ${(metrics.debtToEquityRatio || 0).toFixed(2)} debt-to-equity ratio.`,
    exitStrategy: `Exit strategy: ${inputs.sellingStrategy || 'mls'} with target sale date of ${inputs.targetSaleDate}.`,
    marketingPlan: `Marketing plan includes staging, professional photos, and MLS listing.`,
    approvalConditions: [
      'Complete due diligence',
      'Secure financing',
      'Obtain permits',
      'Hire qualified contractors'
    ],
    riskMitigation: [
      'Contingency budget allocation',
      'Experienced contractor selection',
      'Market timing optimization',
      'Backup financing options'
    ],
    optimizationSuggestions: [
      'Optimize renovation scope',
      'Negotiate better purchase price',
      'Reduce holding costs',
      'Improve marketing strategy'
    ],
    projectPlan: 'Comprehensive project plan with detailed timeline and budget.',
    resourceRequirements: [
      'Experienced contractors',
      'Project manager',
      'Real estate agent',
      'Financing partner'
    ],
    timelineMilestones: [
      'Property acquisition',
      'Renovation completion',
      'Marketing launch',
      'Sale closing'
    ],
    monitoringPlan: 'Regular progress monitoring with weekly updates and milestone tracking.',
    keyMetrics: [
      'Renovation progress',
      'Budget adherence',
      'Timeline compliance',
      'Market conditions'
    ],
    reportingSchedule: 'Weekly progress reports and monthly financial updates.',
    exitPlanning: 'Exit planning begins 30 days before target sale date.',
    marketingStrategy: 'Multi-channel marketing strategy including MLS, social media, and investor networks.',
    pricingStrategy: 'Competitive pricing strategy based on market comparables and property condition.',
    riskMitigationStrategies: [
      'Contingency budget management',
      'Experienced team selection',
      'Market timing optimization',
      'Backup exit strategies'
    ],
    contingencyPlans: [
      'Extended holding period',
      'Price reduction strategy',
      'Rental conversion',
      'Wholesale exit'
    ],
    insuranceRequirements: [
      'General liability insurance',
      'Builder\'s risk insurance',
      'Property insurance',
      'Workers compensation'
    ],
    performanceBenchmarks: [
      {
        metric: 'ROI',
        target: 20,
        benchmark: 15,
        industry: 'Fix and Flip'
      },
      {
        metric: 'Profit Margin',
        target: 15,
        benchmark: 12,
        industry: 'Fix and Flip'
      }
    ],
    committeeRecommendation: `Recommend ${recommendation} based on ${projectRating.toLowerCase()} project rating.`,
    presentationPoints: [
      'Strong market opportunity',
      'Experienced team',
      'Detailed project plan',
      'Comprehensive risk analysis'
    ],
    decisionFactors: [
      'Expected returns',
      'Risk profile',
      'Market conditions',
      'Team capability'
    ]
  };
}

function generateCashFlowTimeline(inputs: FixAndFlipInputs, totalTimeline: number, monthlyCashFlow: number) {
  const timeline = [];
  for (let month = 1; month <= Math.ceil(totalTimeline / 30); month++) {
    timeline.push({
      month,
      cashFlow: monthlyCashFlow,
      cumulativeCashFlow: monthlyCashFlow * month
    });
  }
  return timeline;
}

function generateSensitivityMatrix(inputs: FixAndFlipInputs, netProfit: number) {
  return [
    {
      variable: 'Sale Price',
      values: [inputs.targetSalePrice * 0.9, inputs.targetSalePrice, inputs.targetSalePrice * 1.1],
      impacts: [netProfit * 0.7, netProfit, netProfit * 1.3]
    },
    {
      variable: 'Renovation Costs',
      values: [inputs.renovationBudget * 0.9, inputs.renovationBudget, inputs.renovationBudget * 1.1],
      impacts: [netProfit * 1.1, netProfit, netProfit * 0.9]
    }
  ];
}

function generateScenarios(inputs: FixAndFlipInputs, netProfit: number, totalTimeline: number) {
  return [
    {
      scenario: 'Conservative',
      probability: 0.3,
      profit: netProfit * 0.8,
      roi: (netProfit * 0.8 / (inputs.downPayment + inputs.closingCosts + inputs.renovationBudget)) * 100,
      timeline: totalTimeline * 1.2
    },
    {
      scenario: 'Base Case',
      probability: 0.5,
      profit: netProfit,
      roi: (netProfit / (inputs.downPayment + inputs.closingCosts + inputs.renovationBudget)) * 100,
      timeline: totalTimeline
    },
    {
      scenario: 'Optimistic',
      probability: 0.2,
      profit: netProfit * 1.3,
      roi: (netProfit * 1.3 / (inputs.downPayment + inputs.closingCosts + inputs.renovationBudget)) * 100,
      timeline: totalTimeline * 0.8
    }
  ];
}

function generateProjectTimeline(inputs: FixAndFlipInputs, totalTimeline: number) {
  return [
    {
      day: 1,
      activity: 'Property Acquisition',
      cost: inputs.purchasePrice + inputs.closingCosts,
      cumulativeCost: inputs.purchasePrice + inputs.closingCosts,
      progress: 10
    },
    {
      day: Math.ceil(totalTimeline * 0.3),
      activity: 'Renovation 50% Complete',
      cost: inputs.renovationBudget * 0.5,
      cumulativeCost: inputs.purchasePrice + inputs.closingCosts + inputs.renovationBudget * 0.5,
      progress: 50
    },
    {
      day: Math.ceil(totalTimeline * 0.7),
      activity: 'Renovation Complete',
      cost: inputs.renovationBudget * 0.5,
      cumulativeCost: inputs.purchasePrice + inputs.closingCosts + inputs.renovationBudget,
      progress: 80
    },
    {
      day: totalTimeline,
      activity: 'Sale Closing',
      cost: 0,
      cumulativeCost: inputs.purchasePrice + inputs.closingCosts + inputs.renovationBudget,
      progress: 100
    }
  ];
}

function generateCashFlowProjections(inputs: FixAndFlipInputs, totalTimeline: number) {
  const projections = [];
  const monthlyExpenses = inputs.propertyTaxes + inputs.insurance + (inputs.utilities || 0);
  
  for (let month = 1; month <= Math.ceil(totalTimeline / 30); month++) {
    projections.push({
      month,
      revenue: month === Math.ceil(totalTimeline / 30) ? inputs.targetSalePrice : 0,
      expenses: monthlyExpenses,
      netCashFlow: month === Math.ceil(totalTimeline / 30) ? inputs.targetSalePrice - monthlyExpenses : -monthlyExpenses,
      cumulativeCashFlow: month === Math.ceil(totalTimeline / 30) ? inputs.targetSalePrice - (monthlyExpenses * month) : -(monthlyExpenses * month)
    });
  }
  return projections;
}

function generateComparativeAnalysis(inputs: FixAndFlipInputs, roi: number, profitMargin: number) {
  return [
    {
      metric: 'ROI',
      thisProject: roi,
      industryAverage: 15,
      topQuartile: 25,
      bottomQuartile: 8
    },
    {
      metric: 'Profit Margin',
      thisProject: profitMargin,
      industryAverage: 12,
      topQuartile: 20,
      bottomQuartile: 6
    }
  ];
}

function generateRiskMetrics(inputs: FixAndFlipInputs, riskScore: number) {
  return [
    {
      metric: 'Overall Risk Score',
      value: riskScore,
      benchmark: 5,
      riskLevel: riskScore <= 4 ? 'low' : riskScore <= 6 ? 'medium' : 'high'
    },
    {
      metric: 'Market Risk',
      value: inputs.marketRisk === 'high' ? 8 : inputs.marketRisk === 'medium' ? 5 : 2,
      benchmark: 5,
      riskLevel: inputs.marketRisk || 'medium'
    }
  ];
}

function generateFinancialProjections(inputs: FixAndFlipInputs, totalTimeline: number) {
  const projections = [];
  for (let month = 1; month <= Math.ceil(totalTimeline / 30); month++) {
    projections.push({
      month,
      revenue: month === Math.ceil(totalTimeline / 30) ? inputs.targetSalePrice : 0,
      expenses: (inputs.propertyTaxes + inputs.insurance + (inputs.utilities || 0)) * month,
      profit: month === Math.ceil(totalTimeline / 30) ? inputs.targetSalePrice - ((inputs.propertyTaxes + inputs.insurance + (inputs.utilities || 0)) * month) : -((inputs.propertyTaxes + inputs.insurance + (inputs.utilities || 0)) * month),
      roi: month === Math.ceil(totalTimeline / 30) ? ((inputs.targetSalePrice - ((inputs.propertyTaxes + inputs.insurance + (inputs.utilities || 0)) * month)) / (inputs.downPayment + inputs.closingCosts + inputs.renovationBudget)) * 100 : 0
    });
  }
  return projections;
}

function generateDueDiligenceChecklist(inputs: FixAndFlipInputs) {
  return [
    {
      category: 'Property',
      items: [
        { item: 'Property inspection', status: 'pending', priority: 'high', notes: 'Required before purchase' },
        { item: 'Title search', status: 'pending', priority: 'high', notes: 'Verify clean title' },
        { item: 'Property survey', status: 'pending', priority: 'medium', notes: 'Verify property boundaries' }
      ]
    },
    {
      category: 'Financial',
      items: [
        { item: 'Financing approval', status: 'pending', priority: 'high', notes: 'Secure loan commitment' },
        { item: 'Budget review', status: 'pending', priority: 'high', notes: 'Verify renovation budget' },
        { item: 'Insurance quotes', status: 'pending', priority: 'medium', notes: 'Obtain property insurance' }
      ]
    }
  ];
}

function generateProjectPlan(inputs: FixAndFlipInputs) {
  return [
    {
      phase: 'Acquisition',
      activities: ['Property inspection', 'Financing approval', 'Closing'],
      timeline: `${inputs.acquisitionTimeline || 30} days`,
      budget: inputs.purchasePrice + inputs.closingCosts
    },
    {
      phase: 'Renovation',
      activities: ['Permits', 'Contractor selection', 'Renovation work'],
      timeline: `${inputs.renovationTimeline} months`,
      budget: inputs.renovationBudget
    },
    {
      phase: 'Marketing',
      activities: ['Staging', 'Photography', 'Listing'],
      timeline: `${inputs.marketingTimeline || 45} days`,
      budget: (inputs.stagingCosts || 0) + (inputs.marketingCosts || 0)
    }
  ];
}

function generateExitPlanning(inputs: FixAndFlipInputs) {
  return {
    strategy: inputs.sellingStrategy || 'mls',
    timeline: `${inputs.marketingTimeline || 45} days`,
    marketing: ['Professional photography', 'Virtual tour', 'Open houses'],
    pricing: ['Market analysis', 'Competitive pricing', 'Price adjustments']
  };
}

function generateRiskMitigation(inputs: FixAndFlipInputs) {
  return [
    {
      risk: 'Renovation cost overruns',
      mitigation: 'Contingency budget allocation',
      cost: inputs.contingencyBudget || 5000,
      effectiveness: 80
    },
    {
      risk: 'Timeline delays',
      mitigation: 'Experienced contractor selection',
      cost: 0,
      effectiveness: 70
    }
  ];
}

function generatePerformanceTracking(inputs: FixAndFlipInputs) {
  return [
    {
      metric: 'Renovation Progress',
      current: 0,
      target: 100,
      frequency: 'Weekly',
      owner: 'Project Manager'
    },
    {
      metric: 'Budget Adherence',
      current: 0,
      target: 100,
      frequency: 'Weekly',
      owner: 'Project Manager'
    }
  ];
}

function assessDataQuality(inputs: FixAndFlipInputs): number {
  let quality = 80;
  
  if (inputs.purchasePrice <= 0) quality -= 20;
  if (inputs.targetSalePrice <= 0) quality -= 20;
  if (inputs.renovationBudget < 0) quality -= 15;
  
  if (!inputs.propertyAddress) quality -= 10;
  if (!inputs.purchaseDate) quality -= 10;
  
  return Math.max(50, Math.min(100, quality));
}

function assessModelAccuracy(inputs: FixAndFlipInputs): number {
  let accuracy = 70;
  
  if (inputs.analysisPeriod >= 12) accuracy += 10;
  if (inputs.marketTrends) accuracy += 10;
  if (inputs.averageDaysOnMarket) accuracy += 10;
  
  return Math.max(60, Math.min(95, accuracy));
}

function calculateConfidenceLevel(inputs: FixAndFlipInputs, roi: number): number {
  let confidence = 70;
  
  if (roi > 20) confidence += 15;
  else if (roi > 15) confidence += 10;
  else if (roi < 10) confidence -= 20;
  
  if (inputs.marketTrends === 'appreciating') confidence += 10;
  if (inputs.marketRisk === 'low') confidence += 10;
  
  return Math.max(50, Math.min(95, confidence));
}

export function generateFixAndFlipAnalysis(inputs: FixAndFlipInputs, outputs: FixAndFlipOutputs): string {
  return `
# Fix and Flip Analysis Report

## Executive Summary
**Property**: ${inputs.propertyAddress}
**Property Type**: ${inputs.propertyType}
**Purchase Price**: $${inputs.purchasePrice.toLocaleString()}
**Target Sale Price**: $${inputs.targetSalePrice.toLocaleString()}
**Total Investment**: $${outputs.totalInvestment.toLocaleString()}

**Project Rating**: ${outputs.analysis.projectRating}
**Risk Rating**: ${outputs.analysis.riskRating}
**Recommendation**: ${outputs.analysis.recommendation}

## Investment Analysis
- **Total Investment**: $${outputs.totalInvestment.toLocaleString()}
- **Total Costs**: $${outputs.totalCosts.toLocaleString()}
- **Net Profit**: $${outputs.netProfit.toLocaleString()}
- **ROI**: ${outputs.roi.toFixed(1)}%
- **Cash on Cash Return**: ${outputs.cashOnCashReturn.toFixed(1)}%
- **Annualized Return**: ${outputs.annualizedReturn.toFixed(1)}%

## Financial Breakdown
- **Purchase Costs**: $${outputs.purchaseCosts.toLocaleString()}
- **Renovation Costs**: $${outputs.renovationCosts.toLocaleString()}
- **Holding Costs**: $${outputs.holdingCosts.toLocaleString()}
- **Selling Costs**: $${outputs.sellingCosts.toLocaleString()}
- **Financing Costs**: $${outputs.financingCosts.toLocaleString()}

## Property Information
- **Property Size**: ${inputs.propertySize} sq ft
- **Bedrooms**: ${inputs.bedrooms}
- **Bathrooms**: ${inputs.bathrooms}
- **Year Built**: ${inputs.yearBuilt}
- **Property Condition**: ${inputs.propertyCondition}
- **Lot Size**: ${inputs.lotSize} sq ft

## Timeline Analysis
- **Total Timeline**: ${outputs.totalTimeline} days
- **Acquisition Timeline**: ${outputs.acquisitionTimeline} days
- **Renovation Timeline**: ${outputs.renovationTimeline} days
- **Marketing Timeline**: ${outputs.marketingTimeline} days

## Profitability Analysis
- **Profit Margin**: ${outputs.profitMargin.toFixed(1)}%
- **Profit per Square Foot**: $${outputs.profitPerSquareFoot.toFixed(2)}
- **Profit per Day**: $${outputs.profitPerDay.toFixed(2)}
- **Break Even Price**: $${outputs.breakEvenPrice.toLocaleString()}

## Risk Assessment
- **Risk Score**: ${outputs.riskScore.toFixed(1)}/10
- **Probability of Profit**: ${outputs.probabilityOfProfit.toFixed(0)}%
- **Expected Value**: $${outputs.expectedValue.toLocaleString()}
- **Market Risk**: ${inputs.marketRisk || 'Not specified'}
- **Renovation Risk**: ${inputs.renovationRisk || 'Not specified'}
- **Financing Risk**: ${inputs.financingRisk || 'Not specified'}
- **Timeline Risk**: ${inputs.timelineRisk || 'Not specified'}

## Market Analysis
- **After Repair Value**: $${outputs.afterRepairValue.toLocaleString()}
- **Market Value**: $${outputs.marketValue.toLocaleString()}
- **Price per Square Foot**: $${outputs.pricePerSquareFoot.toFixed(2)}
- **Market Trends**: ${inputs.marketTrends || 'Not specified'}
- **Average Days on Market**: ${inputs.averageDaysOnMarket || 'Not specified'}

## Financing Analysis
- **Loan Amount**: $${inputs.loanAmount.toLocaleString()}
- **Interest Rate**: ${inputs.interestRate}%
- **Loan Type**: ${inputs.loanType}
- **Monthly Payment**: $${outputs.monthlyPayment.toLocaleString()}
- **Total Interest Paid**: $${outputs.totalInterestPaid.toLocaleString()}
- **Loan to Value Ratio**: ${outputs.loanToValueRatio.toFixed(2)}
- **Debt to Equity Ratio**: ${outputs.debtToEquityRatio.toFixed(2)}

## Renovation Details
- **Renovation Budget**: $${inputs.renovationBudget.toLocaleString()}
- **Renovation Timeline**: ${inputs.renovationTimeline} months
- **Kitchen Remodel**: ${inputs.kitchenRemodel ? 'Yes' : 'No'} ${inputs.kitchenRemodelCost ? `($${inputs.kitchenRemodelCost.toLocaleString()})` : ''}
- **Bathroom Remodel**: ${inputs.bathroomRemodel ? 'Yes' : 'No'} ${inputs.bathroomRemodelCost ? `($${inputs.bathroomRemodelCost.toLocaleString()})` : ''}
- **Electrical Work**: ${inputs.electricalWork ? 'Yes' : 'No'} ${inputs.electricalWorkCost ? `($${inputs.electricalWorkCost.toLocaleString()})` : ''}
- **Plumbing Work**: ${inputs.plumbingWork ? 'Yes' : 'No'} ${inputs.plumbingWorkCost ? `($${inputs.plumbingWorkCost.toLocaleString()})` : ''}
- **HVAC Work**: ${inputs.hvacWork ? 'Yes' : 'No'} ${inputs.hvacWorkCost ? `($${inputs.hvacWorkCost.toLocaleString()})` : ''}

## Holding Costs (Monthly)
- **Property Taxes**: $${inputs.propertyTaxes.toLocaleString()}
- **Insurance**: $${inputs.insurance.toLocaleString()}
- **Utilities**: $${(inputs.utilities || 0).toLocaleString()}
- **HOA Fees**: $${(inputs.hoaFees || 0).toLocaleString()}
- **Maintenance**: $${(inputs.maintenance || 0).toLocaleString()}

## Exit Strategy
- **Selling Strategy**: ${inputs.sellingStrategy || 'Not specified'}
- **Target Sale Date**: ${inputs.targetSaleDate}
- **Realtor Commission**: ${inputs.realtorCommission || 6}%
- **Staging Costs**: $${(inputs.stagingCosts || 0).toLocaleString()}
- **Marketing Costs**: $${(inputs.marketingCosts || 0).toLocaleString()}

## Key Strengths
${outputs.analysis.keyStrengths.map(strength => `• ${strength}`).join('\n')}

## Key Weaknesses
${outputs.analysis.keyWeaknesses.map(weakness => `• ${weakness}`).join('\n')}

## Risk Factors
${outputs.analysis.riskFactors.map(risk => `• ${risk}`).join('\n')}

## Opportunities
${outputs.analysis.opportunities.map(opportunity => `• ${opportunity}`).join('\n')}

## Recommendations
${outputs.analysis.approvalConditions.map(condition => `• ${condition}`).join('\n')}

## Risk Mitigation
${outputs.analysis.riskMitigation.map(mitigation => `• ${mitigation}`).join('\n')}

## Project Timeline
${outputs.analysis.timelineMilestones.map(milestone => `• ${milestone}`).join('\n')}

## Exit Planning
${outputs.analysis.exitStrategy}

## Marketing Plan
${outputs.analysis.marketingPlan}

## Contingency Plans
${outputs.analysis.contingencyPlans.map(plan => `• ${plan}`).join('\n')}

---
*This analysis is based on the provided inputs and industry standards. Past performance does not guarantee future results. Consider consulting with real estate professionals for personalized advice.*
  `.trim();
}
