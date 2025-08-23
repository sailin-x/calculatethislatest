export interface FuturesInputs {
  // Futures Contract Information
  contractType: 'commodity' | 'financial' | 'currency' | 'index' | 'interest_rate' | 'energy' | 'metals' | 'agriculture' | 'livestock' | 'softs';
  underlyingAsset: string;
  contractSymbol: string;
  exchange: string;
  
  // Contract Specifications
  contractSize: number;
  tickSize: number;
  tickValue: number;
  priceQuotation: string; // e.g., "dollars per barrel", "points"
  deliveryMonth: string;
  lastTradingDay: string;
  deliveryLocation: string;
  
  // Pricing Information
  currentPrice: number;
  bidPrice: number;
  askPrice: number;
  lastPrice: number;
  settlementPrice: number;
  openInterest: number;
  volume: number;
  
  // Position Information
  positionType: 'long' | 'short';
  positionSize: number;
  entryPrice: number;
  currentPrice: number;
  markToMarket: number;
  
  // Market Conditions
  spotPrice: number;
  riskFreeRate: number;
  timeToExpiration: number; // in years
  volatility: number;
  convenienceYield: number;
  storageCost: number;
  insuranceCost: number;
  
  // Cost of Carry
  costOfCarry: number;
  basis: number;
  basisRisk: number;
  convergence: number;
  
  // Margin Requirements
  initialMargin: number;
  maintenanceMargin: number;
  variationMargin: number;
  marginCall: boolean;
  marginLevel: number;
  
  // Risk Management
  stopLoss: number;
  takeProfit: number;
  maxLoss: number;
  riskRewardRatio: number;
  positionSizing: number;
  
  // Hedging Parameters
  hedgeRatio: number;
  hedgeEffectiveness: number;
  basisRisk: number;
  crossHedge: boolean;
  hedgeInstrument: string;
  
  // Transaction Costs
  commission: number;
  fees: number;
  slippage: number;
  bidAskSpread: number;
  clearingFees: number;
  exchangeFees: number;
  
  // Tax Considerations
  taxRate: number;
  taxTreatment: 'section_1256' | 'ordinary_income' | 'capital_gains';
  markToMarketTax: boolean;
  washSaleRule: boolean;
  
  // Portfolio Context
  portfolioValue: number;
  portfolioBeta: number;
  portfolioVolatility: number;
  correlationWithPortfolio: number;
  diversificationImpact: number;
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  rebalancingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'never';
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeStorageCosts: boolean;
  includeFinancingCosts: boolean;
  
  // Scenario Analysis
  scenarios: {
    name: string;
    priceChange: number; // percentage
    volatilityChange: number; // percentage
    timeDecay: number; // days
    interestRateChange: number; // percentage
    basisChange: number; // percentage
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeJumpDiffusion: boolean;
  jumpIntensity: number;
  jumpSize: number;
  
  // Historical Analysis
  historicalData: {
    date: string;
    futuresPrice: number;
    spotPrice: number;
    basis: number;
    volume: number;
    openInterest: number;
    volatility: number;
  }[];
  
  // Seasonality Analysis
  seasonalityAnalysis: boolean;
  seasonalFactors: {
    month: number;
    factor: number;
  }[];
  
  // Supply and Demand Analysis
  supplyDemandAnalysis: {
    supplyFactors: string[];
    demandFactors: string[];
    inventoryLevels: number;
    productionCapacity: number;
    consumptionRate: number;
  };
  
  // Weather Analysis (for agricultural/energy futures)
  weatherAnalysis: {
    weatherImpact: number;
    weatherForecast: string;
    weatherRisk: number;
  };
  
  // Regulatory Considerations
  positionLimits: number;
  reportingRequirements: boolean;
  regulatoryConstraints: string[];
  
  // Reporting Preferences
  includePricingAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeSeasonalityAnalysis: boolean;
  includeSupplyDemandAnalysis: boolean;
  includeWeatherAnalysis: boolean;
  includeRegulatoryAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface FuturesResults {
  // Core Futures Metrics
  futuresValue: number;
  fairValue: number;
  theoreticalPrice: number;
  basis: number;
  costOfCarry: number;
  convenienceYield: number;
  
  // Profit/Loss Analysis
  profitLoss: number;
  profitLossPercentage: number;
  unrealizedPnL: number;
  realizedPnL: number;
  totalReturn: number;
  annualizedReturn: number;
  
  // Risk Metrics
  valueAtRisk: number;
  conditionalVaR: number;
  expectedShortfall: number;
  maxDrawdown: number;
  downsideDeviation: number;
  riskOfLoss: number;
  
  // Performance Metrics
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  treynorRatio: number;
  informationRatio: number;
  
  // Pricing Analysis
  pricingAnalysis: {
    spotPrice: number;
    futuresPrice: number;
    theoreticalPrice: number;
    fairValue: number;
    basis: number;
    costOfCarry: number;
    convenienceYield: number;
    arbitrageOpportunity: number;
  };
  
  // Profit/Loss Analysis Over Time
  profitLossAnalysis: {
    price: number;
    futuresValue: number;
    profitLoss: number;
    return: number;
  }[];
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    price: number;
    futuresValue: number;
    profitLoss: number;
    return: number;
    riskMetrics: {
      var: number;
      cvar: number;
      maxDrawdown: number;
    };
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanValue: number;
    medianValue: number;
    standardDeviation: number;
    percentiles: {
      p5: number;
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
      p95: number;
    };
    probabilityDistribution: {
      value: number;
      probability: number;
    }[];
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalVolatility: number;
    historicalReturn: number;
    historicalSharpeRatio: number;
    historicalMaxDrawdown: number;
    priceCorrelation: number;
    basisCorrelation: number;
  };
  
  // Seasonality Analysis
  seasonalityAnalysis: {
    seasonalFactors: {
      month: number;
      factor: number;
      significance: number;
    }[];
    seasonalPattern: string;
    seasonalStrength: number;
  };
  
  // Supply and Demand Analysis
  supplyDemandAnalysis: {
    supplyFactors: string[];
    demandFactors: string[];
    inventoryLevels: number;
    productionCapacity: number;
    consumptionRate: number;
    supplyDemandBalance: number;
    priceImpact: number;
  };
  
  // Weather Analysis
  weatherAnalysis: {
    weatherImpact: number;
    weatherForecast: string;
    weatherRisk: number;
    priceSensitivity: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    priceRisk: number;
    basisRisk: number;
    liquidityRisk: number;
    counterpartyRisk: number;
    deliveryRisk: number;
    regulatoryRisk: number;
    weatherRisk: number;
    totalRisk: number;
  };
  
  // Margin Analysis
  marginAnalysis: {
    initialMargin: number;
    maintenanceMargin: number;
    variationMargin: number;
    marginLevel: number;
    marginCall: boolean;
    marginUtilization: number;
    marginEfficiency: number;
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    hedgeRatio: number;
    hedgeEffectiveness: number;
    basisRisk: number;
    crossHedge: boolean;
    hedgeInstrument: string;
    hedgeCost: number;
    hedgeBenefit: number;
  };
  
  // Transaction Analysis
  transactionAnalysis: {
    totalCost: number;
    commission: number;
    fees: number;
    slippage: number;
    bidAskSpread: number;
    clearingFees: number;
    exchangeFees: number;
    netCost: number;
    costAsPercentage: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxRate: number;
    taxTreatment: string;
    taxableGain: number;
    taxLiability: number;
    afterTaxReturn: number;
    taxEfficiency: number;
  };
  
  // Portfolio Impact
  portfolioImpact: {
    portfolioValue: number;
    positionWeight: number;
    portfolioBeta: number;
    portfolioVolatility: number;
    correlationWithPortfolio: number;
    diversificationImpact: number;
    riskContribution: number;
  };
  
  // Regulatory Analysis
  regulatoryAnalysis: {
    positionLimits: number;
    reportingRequirements: boolean;
    regulatoryConstraints: string[];
    complianceScore: number;
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    benchmark: string;
    benchmarkReturn: number;
    excessReturn: number;
    trackingError: number;
    informationRatio: number;
    relativePerformance: number;
  };
  
  // Optimization Opportunities
  optimizationOpportunities: {
    category: string;
    description: string;
    potentialImprovement: number;
    implementationDifficulty: 'low' | 'medium' | 'high';
    priority: 'low' | 'medium' | 'high';
  }[];
  
  // Business Impact
  businessImpact: {
    roi: number;
    paybackPeriod: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    riskAdjustedReturn: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    riskAssessment: string;
    recommendations: string[];
    actionItems: {
      action: string;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      responsibleParty: string;
    }[];
  };
  
  // Executive Summary
  executiveSummary: {
    futuresValue: number;
    totalReturn: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'buy' | 'sell' | 'hold';
    keyRisks: string[];
    keyOpportunities: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedImpact: number;
    implementationSteps: string[];
  }[];
  
  // Action Items
  actionItems: {
    action: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    timeline: string;
    responsibleParty: string;
    dependencies: string[];
    successMetrics: string[];
  }[];
}
