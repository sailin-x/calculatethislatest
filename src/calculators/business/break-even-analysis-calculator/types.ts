/**
 * Break-Even Analysis Calculator Types
 * Comprehensive break-even analysis for business planning and decision making
 */

export interface BreakEvenAnalysisCalculatorInputs {
  // Revenue Information
  sellingPrice: number;
  expectedSalesVolume: number;
  salesGrowthRate: number;
  
  // Cost Structure
  fixedCosts: number;
  variableCostsPerUnit: number;
  totalVariableCosts: number;
  
  // Advanced Cost Analysis
  directLaborCosts: number;
  directMaterialCosts: number;
  overheadCosts: number;
  marketingCosts: number;
  administrativeCosts: number;
  
  // Production Information
  productionCapacity: number;
  capacityUtilization: number;
  unitsProduced: number;
  
  // Market Analysis
  marketSize: number;
  marketShare: number;
  competitorPricing: number;
  priceElasticity: number;
  
  // Financial Parameters
  targetProfit: number;
  taxRate: number;
  discountRate: number;
  
  // Time Analysis
  analysisPeriod: number; // in months
  seasonalityFactor: number;
  
  // Sensitivity Analysis
  includeSensitivityAnalysis: boolean;
  priceSensitivityRange: number;
  costSensitivityRange: number;
  volumeSensitivityRange: number;
  
  // Scenario Analysis
  includeScenarioAnalysis: boolean;
  optimisticScenario: {
    salesVolume: number;
    sellingPrice: number;
    variableCosts: number;
  };
  pessimisticScenario: {
    salesVolume: number;
    sellingPrice: number;
    variableCosts: number;
  };
  
  // Monte Carlo Parameters
  monteCarloSamples: number;
  confidenceLevel: number;
}

export interface BreakEvenAnalysisCalculatorResults {
  // Basic Break-Even Analysis
  basicAnalysis: {
    breakEvenPoint: number;
    breakEvenRevenue: number;
    contributionMargin: number;
    contributionMarginRatio: number;
    safetyMargin: number;
    safetyMarginRatio: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    totalFixedCosts: number;
    totalVariableCosts: number;
    totalCosts: number;
    averageCostPerUnit: number;
    marginalCost: number;
    costStructure: {
      fixedCostsPercentage: number;
      variableCostsPercentage: number;
    };
  };
  
  // Revenue Analysis
  revenueAnalysis: {
    totalRevenue: number;
    averageRevenuePerUnit: number;
    revenueAtBreakEven: number;
    revenueGrowth: number;
    priceVolumeAnalysis: {
      priceImpact: number;
      volumeImpact: number;
      combinedImpact: number;
    };
  };
  
  // Profitability Analysis
  profitabilityAnalysis: {
    grossProfit: number;
    grossProfitMargin: number;
    netProfit: number;
    netProfitMargin: number;
    operatingProfit: number;
    operatingMargin: number;
    targetProfitVolume: number;
    targetProfitRevenue: number;
  };
  
  // Production Analysis
  productionAnalysis: {
    capacityUtilization: number;
    efficiencyRatio: number;
    productionCosts: number;
    costPerUnit: number;
    economiesOfScale: number;
    optimalProductionLevel: number;
  };
  
  // Market Analysis
  marketAnalysis: {
    marketShare: number;
    marketPosition: number;
    competitiveAdvantage: number;
    priceCompetitiveness: number;
    marketPenetration: number;
    growthPotential: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis?: {
    priceSensitivity: {
      breakEvenPoint: number;
      profitImpact: number;
      revenueImpact: number;
    };
    costSensitivity: {
      breakEvenPoint: number;
      profitImpact: number;
      costImpact: number;
    };
    volumeSensitivity: {
      breakEvenPoint: number;
      profitImpact: number;
      volumeImpact: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis?: {
    optimistic: {
      breakEvenPoint: number;
      profit: number;
      revenue: number;
      probability: number;
    };
    baseCase: {
      breakEvenPoint: number;
      profit: number;
      revenue: number;
      probability: number;
    };
    pessimistic: {
      breakEvenPoint: number;
      profit: number;
      revenue: number;
      probability: number;
    };
  };
  
  // Time Analysis
  timeAnalysis: {
    timeToBreakEven: number;
    paybackPeriod: number;
    discountedPaybackPeriod: number;
    seasonalVariations: Array<{
      month: number;
      salesVolume: number;
      revenue: number;
      profit: number;
    }>;
  };
  
  // Risk Analysis
  riskAnalysis: {
    probabilityOfProfit: number;
    worstCaseScenario: number;
    bestCaseScenario: number;
    expectedValue: number;
    riskLevel: 'low' | 'medium' | 'high';
    keyRiskFactors: string[];
  };
  
  // Recommendations
  recommendations: {
    pricingStrategy: string[];
    costOptimization: string[];
    volumeStrategies: string[];
    riskMitigation: string[];
    growthOpportunities: string[];
  };
  
  // Summary
  summary: {
    breakEvenVolume: number;
    breakEvenRevenue: number;
    currentProfit: number;
    profitMargin: number;
    keyInsights: string[];
    actionItems: string[];
  };
  
  // Monte Carlo Results
  monteCarloResults?: {
    percentile10: number;
    percentile25: number;
    percentile50: number;
    percentile75: number;
    percentile90: number;
    expectedValue: number;
    standardDeviation: number;
  };
}
