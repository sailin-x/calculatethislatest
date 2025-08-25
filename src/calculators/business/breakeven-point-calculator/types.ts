/**
 * Breakeven Point Calculator Types
 */

export interface BreakevenPointCalculatorInputs {
  // Basic business parameters
  sellingPrice: number;
  variableCostPerUnit: number;
  fixedCosts: number;
  targetProfit: number;
  
  // Advanced cost analysis
  costStructure: {
    directMaterials: number;
    directLabor: number;
    variableOverhead: number;
    fixedOverhead: number;
    sellingExpenses: number;
    administrativeExpenses: number;
    depreciation: number;
    interest: number;
    taxes: number;
  };
  
  // Revenue analysis
  revenueAnalysis: {
    expectedSalesVolume: number;
    priceElasticity: number;
    marketDemand: number;
    seasonalVariation: number;
    growthRate: number;
  };
  
  // Production analysis
  productionAnalysis: {
    productionCapacity: number;
    utilizationRate: number;
    efficiencyFactor: number;
    qualityRate: number;
    scrapRate: number;
    reworkRate: number;
  };
  
  // Market analysis
  marketAnalysis: {
    marketSize: number;
    marketShare: number;
    competitorPricing: number;
    competitiveAdvantage: number;
    marketGrowthRate: number;
    customerLoyalty: number;
  };
  
  // Financial parameters
  financialParameters: {
    discountRate: number;
    inflationRate: number;
    taxRate: number;
    interestRate: number;
    currency: string;
  };
  
  // Analysis options
  analysisOptions: {
    includeSensitivityAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarloSimulation: boolean;
    includeRiskAssessment: boolean;
    includeProfitabilityAnalysis: boolean;
    includeCashFlowAnalysis: boolean;
    includeROIAnalysis: boolean;
    includePaybackPeriodAnalysis: boolean;
  };
  
  // Simulation parameters
  simulationParameters: {
    monteCarloSamples: number;
    confidenceLevel: number;
    timeHorizon: number;
    scenarios: Array<{
      name: string;
      probability: number;
      sellingPriceVariation: number;
      costVariation: number;
      volumeVariation: number;
    }>;
  };
}

export interface BreakevenPointCalculatorResults {
  // Basic breakeven analysis
  basicBreakeven: {
    breakevenPoint: number;
    breakevenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
    safetyMargin: number;
    safetyMarginRatio: number;
    targetProfitVolume: number;
    targetProfitRevenue: number;
  };
  
  // Cost analysis
  costAnalysis: {
    totalVariableCosts: number;
    totalFixedCosts: number;
    totalCosts: number;
    averageCostPerUnit: number;
    marginalCost: number;
    costBreakdown: {
      materials: number;
      labor: number;
      overhead: number;
      selling: number;
      administrative: number;
      depreciation: number;
      interest: number;
      taxes: number;
    };
    costStructureAnalysis: {
      fixedCostPercentage: number;
      variableCostPercentage: number;
      costEfficiency: number;
      economiesOfScale: number;
    };
  };
  
  // Revenue analysis
  revenueAnalysis: {
    totalRevenue: number;
    averageRevenuePerUnit: number;
    revenueBreakdown: {
      productSales: number;
      serviceRevenue: number;
      otherIncome: number;
    };
    revenueEfficiency: {
      revenuePerEmployee: number;
      revenuePerAsset: number;
      revenueGrowthRate: number;
    };
  };
  
  // Profitability analysis
  profitabilityAnalysis: {
    grossProfit: number;
    grossProfitMargin: number;
    operatingProfit: number;
    operatingProfitMargin: number;
    netProfit: number;
    netProfitMargin: number;
    profitBreakdown: {
      contributionMargin: number;
      fixedCosts: number;
      interest: number;
      taxes: number;
      netIncome: number;
    };
    profitabilityMetrics: {
      returnOnSales: number;
      returnOnAssets: number;
      returnOnEquity: number;
      returnOnInvestment: number;
    };
  };
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    priceSensitivity: Array<{
      priceChange: number;
      breakevenPoint: number;
      profitImpact: number;
      sensitivity: number;
    }>;
    costSensitivity: Array<{
      costChange: number;
      breakevenPoint: number;
      profitImpact: number;
      sensitivity: number;
    }>;
    volumeSensitivity: Array<{
      volumeChange: number;
      breakevenPoint: number;
      profitImpact: number;
      sensitivity: number;
    }>;
    criticalFactors: Array<{
      factor: string;
      impact: number;
      risk: 'high' | 'medium' | 'low';
      recommendation: string;
    }>;
  };
  
  // Scenario analysis
  scenarioAnalysis: {
    scenarios: Array<{
      name: string;
      probability: number;
      breakevenPoint: number;
      expectedProfit: number;
      riskLevel: 'low' | 'medium' | 'high';
      keyAssumptions: string[];
    }>;
    bestCase: {
      breakevenPoint: number;
      expectedProfit: number;
      probability: number;
    };
    worstCase: {
      breakevenPoint: number;
      expectedProfit: number;
      probability: number;
    };
    mostLikely: {
      breakevenPoint: number;
      expectedProfit: number;
      probability: number;
    };
  };
  
  // Risk assessment
  riskAssessment: {
    businessRisks: Array<{
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }>;
    financialRisks: Array<{
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }>;
    marketRisks: Array<{
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }>;
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  
  // Cash flow analysis
  cashFlowAnalysis: {
    operatingCashFlow: number;
    investingCashFlow: number;
    financingCashFlow: number;
    netCashFlow: number;
    cashFlowBreakdown: {
      cashInflows: number;
      cashOutflows: number;
      workingCapital: number;
      capitalExpenditure: number;
    };
    cashFlowMetrics: {
      cashFlowMargin: number;
      cashFlowCoverage: number;
      cashConversionCycle: number;
      freeCashFlow: number;
    };
  };
  
  // ROI analysis
  roiAnalysis: {
    returnOnInvestment: number;
    paybackPeriod: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    profitabilityIndex: number;
    roiBreakdown: {
      initialInvestment: number;
      annualCashFlows: number[];
      terminalValue: number;
      discountRate: number;
    };
    roiMetrics: {
      roiByYear: number[];
      cumulativeRoi: number;
      riskAdjustedRoi: number;
    };
  };
  
  // Strategic insights
  strategicInsights: {
    keyInsights: string[];
    recommendations: Array<{
      category: string;
      recommendation: string;
      impact: number;
      implementation: string;
      timeline: string;
    }>;
    actionItems: string[];
    successFactors: Array<{
      factor: string;
      importance: number;
      currentStatus: string;
      improvementNeeded: boolean;
    }>;
  };
  
  // Monte Carlo results
  monteCarloResults: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
    confidenceInterval: {
      lower: number;
      upper: number;
    };
  };
  
  // Summary
  summary: {
    keyMetrics: {
      breakevenPoint: number;
      contributionMargin: number;
      safetyMargin: number;
      targetProfitVolume: number;
      returnOnInvestment: number;
      paybackPeriod: number;
    };
    keyInsights: string[];
    actionItems: string[];
    riskLevel: 'low' | 'medium' | 'high';
    profitability: 'high' | 'medium' | 'low';
    feasibility: 'high' | 'medium' | 'low';
  };
}
