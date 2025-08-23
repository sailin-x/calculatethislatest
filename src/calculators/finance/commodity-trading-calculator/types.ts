export interface CommodityTradingInputs {
  // Commodity Information
  commodityName: string;
  commodityType: 'energy' | 'metals' | 'agriculture' | 'livestock' | 'softs' | 'precious_metals' | 'base_metals' | 'industrial_metals' | 'grains' | 'oilseeds' | 'sugar' | 'coffee' | 'cocoa' | 'cotton' | 'natural_gas' | 'crude_oil' | 'refined_products';
  commoditySymbol: string;
  exchange: string;
  contractSize: number;
  tickSize: number;
  tickValue: number;
  
  // Contract Information
  contractMonth: string;
  deliveryMonth: string;
  lastTradingDay: string;
  deliveryLocation: string;
  qualitySpecifications: string;
  
  // Price Information
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
  basis: number;
  convenienceYield: number;
  storageCost: number;
  insuranceCost: number;
  transportationCost: number;
  
  // Supply and Demand
  supplyDemand: {
    production: number;
    consumption: number;
    inventory: number;
    imports: number;
    exports: number;
    supplyDemandBalance: number;
    inventoryToConsumption: number;
  };
  
  // Weather Analysis
  weatherAnalysis: {
    weatherImpact: number;
    weatherForecast: string;
    weatherRisk: number;
    seasonalFactors: {
      month: number;
      factor: number;
    }[];
  };
  
  // Economic Indicators
  economicIndicators: {
    gdpGrowth: number;
    inflationRate: number;
    interestRate: number;
    currencyStrength: number;
    industrialProduction: number;
    consumerSpending: number;
  };
  
  // Geopolitical Factors
  geopoliticalFactors: {
    politicalStability: number;
    tradeRelations: number;
    sanctions: boolean;
    conflicts: string[];
    regulatoryChanges: string[];
  };
  
  // Technical Analysis
  technicalAnalysis: {
    movingAverages: {
      period: number;
      value: number;
      signal: 'buy' | 'sell' | 'hold';
    }[];
    supportLevels: number[];
    resistanceLevels: number[];
    trendDirection: 'bullish' | 'bearish' | 'sideways';
    momentumIndicators: {
      indicator: string;
      value: number;
      signal: string;
    }[];
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    fairValue: number;
    intrinsicValue: number;
    overvaluation: number;
    undervaluation: number;
    fundamentalScore: number;
    fundamentalFactors: {
      factor: string;
      impact: number;
      weight: number;
    }[];
  };
  
  // Seasonality Analysis
  seasonalityAnalysis: {
    seasonalPattern: string;
    seasonalStrength: number;
    seasonalFactors: {
      month: number;
      factor: number;
      significance: number;
    }[];
  };
  
  // Correlation Analysis
  correlationAnalysis: {
    correlationWithUSD: number;
    correlationWithEquities: number;
    correlationWithBonds: number;
    correlationWithOil: number;
    correlationWithGold: number;
    correlationWithCurrency: number;
  };
  
  // Volatility Analysis
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    volatilityForecast: number;
    volatilitySkew: number;
    volatilityTerm: number;
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    averageDailyVolume: number;
    bidAskSpread: number;
    marketDepth: number;
    liquidityScore: number;
    tradingHours: string;
    marketParticipants: string[];
  };
  
  // Storage and Transportation
  storageTransportation: {
    storageCapacity: number;
    storageUtilization: number;
    storageCost: number;
    transportationCost: number;
    deliveryCost: number;
    storageRisk: number;
  };
  
  // Quality and Grade
  qualityGrade: {
    grade: string;
    quality: number;
    premium: number;
    discount: number;
    specifications: string[];
  };
  
  // Risk Management
  riskManagement: {
    positionSize: number;
    stopLoss: number;
    takeProfit: number;
    maxLoss: number;
    riskRewardRatio: number;
    varLimit: number;
  };
  
  // Margin Requirements
  marginRequirements: {
    initialMargin: number;
    maintenanceMargin: number;
    variationMargin: number;
    marginCall: boolean;
    marginLevel: number;
  };
  
  // Transaction Costs
  transactionCosts: {
    commission: number;
    fees: number;
    slippage: number;
    bidAskSpread: number;
    clearingFees: number;
    exchangeFees: number;
  };
  
  // Hedging Information
  hedgingInfo: {
    hedgeType: 'natural' | 'financial' | 'operational' | 'none';
    hedgeRatio: number;
    hedgeEffectiveness: number;
    hedgeCost: number;
    hedgeInstruments: string[];
  };
  
  // Tax Considerations
  taxConsiderations: {
    taxRate: number;
    taxTreatment: string;
    markToMarketTax: boolean;
    washSaleRule: boolean;
    taxLossHarvesting: boolean;
  };
  
  // Regulatory Considerations
  regulatoryConsiderations: {
    positionLimits: number;
    reportingRequirements: boolean;
    regulatoryConstraints: string[];
    complianceCost: number;
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    priceChange: number;
    supplyChange: number;
    demandChange: number;
    weatherChange: number;
    geopoliticalChange: number;
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
    price: number;
    volume: number;
    openInterest: number;
    basis: number;
    inventory: number;
  }[];
  
  // Spread Trading
  spreadTrading: {
    isSpread: boolean;
    spreadType: 'calendar' | 'inter_commodity' | 'inter_exchange' | 'butterfly' | 'crack' | 'crush';
    leg1: {
      contract: string;
      price: number;
      quantity: number;
    };
    leg2: {
      contract: string;
      price: number;
      quantity: number;
    };
  };
  
  // Options Trading
  optionsTrading: {
    hasOptions: boolean;
    optionType: 'call' | 'put';
    strikePrice: number;
    expirationDate: string;
    premium: number;
    impliedVolatility: number;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  confidenceLevel: number;
  timeHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeStorageCosts: boolean;
  
  // Reporting Preferences
  includePriceAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeTechnicalAnalysis: boolean;
  includeFundamentalAnalysis: boolean;
  includeSeasonalityAnalysis: boolean;
  includeVolatilityAnalysis: boolean;
  includeCorrelationAnalysis: boolean;
  includeSupplyDemandAnalysis: boolean;
  includeWeatherAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeSpreadAnalysis: boolean;
  includeOptionsAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface CommodityTradingResults {
  // Core Trading Metrics
  commodityValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  unrealizedPnL: number;
  realizedPnL: number;
  totalReturn: number;
  
  // Price Analysis
  priceAnalysis: {
    currentPrice: number;
    fairValue: number;
    intrinsicValue: number;
    overvaluation: number;
    undervaluation: number;
    priceForecast: number;
    priceVolatility: number;
  };
  
  // Risk Metrics
  riskMetrics: {
    valueAtRisk: number;
    conditionalVaR: number;
    expectedShortfall: number;
    maxDrawdown: number;
    downsideDeviation: number;
    riskOfLoss: number;
  };
  
  // Performance Metrics
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
  };
  
  // Technical Analysis Results
  technicalAnalysis: {
    movingAverages: {
      period: number;
      value: number;
      signal: 'buy' | 'sell' | 'hold';
    }[];
    supportLevels: number[];
    resistanceLevels: number[];
    trendDirection: 'bullish' | 'bearish' | 'sideways';
    momentumIndicators: {
      indicator: string;
      value: number;
      signal: string;
    }[];
    technicalScore: number;
  };
  
  // Fundamental Analysis Results
  fundamentalAnalysis: {
    fairValue: number;
    intrinsicValue: number;
    overvaluation: number;
    undervaluation: number;
    fundamentalScore: number;
    fundamentalFactors: {
      factor: string;
      impact: number;
      weight: number;
    }[];
  };
  
  // Seasonality Analysis Results
  seasonalityAnalysis: {
    seasonalPattern: string;
    seasonalStrength: number;
    seasonalFactors: {
      month: number;
      factor: number;
      significance: number;
    }[];
    seasonalForecast: number;
  };
  
  // Volatility Analysis Results
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilityRegime: string;
    volatilityForecast: number;
    volatilitySkew: number;
    volatilityTerm: number;
    volatilitySurface: {
      maturity: number;
      strike: number;
      volatility: number;
    }[];
  };
  
  // Correlation Analysis Results
  correlationAnalysis: {
    correlationWithUSD: number;
    correlationWithEquities: number;
    correlationWithBonds: number;
    correlationWithOil: number;
    correlationWithGold: number;
    correlationWithCurrency: number;
    averageCorrelation: number;
  };
  
  // Supply and Demand Analysis
  supplyDemandAnalysis: {
    production: number;
    consumption: number;
    inventory: number;
    imports: number;
    exports: number;
    supplyDemandBalance: number;
    inventoryToConsumption: number;
    supplyDemandOutlook: string;
  };
  
  // Weather Analysis Results
  weatherAnalysis: {
    weatherImpact: number;
    weatherForecast: string;
    weatherRisk: number;
    seasonalFactors: {
      month: number;
      factor: number;
    }[];
    weatherSensitivity: number;
  };
  
  // Economic Analysis
  economicAnalysis: {
    gdpGrowth: number;
    inflationRate: number;
    interestRate: number;
    currencyStrength: number;
    industrialProduction: number;
    consumerSpending: number;
    economicScore: number;
  };
  
  // Geopolitical Analysis
  geopoliticalAnalysis: {
    politicalStability: number;
    tradeRelations: number;
    sanctions: boolean;
    conflicts: string[];
    regulatoryChanges: string[];
    geopoliticalRisk: number;
  };
  
  // Liquidity Analysis Results
  liquidityAnalysis: {
    averageDailyVolume: number;
    bidAskSpread: number;
    marketDepth: number;
    liquidityScore: number;
    liquidityRisk: number;
    marketImpact: number;
  };
  
  // Storage and Transportation Analysis
  storageTransportationAnalysis: {
    storageCapacity: number;
    storageUtilization: number;
    storageCost: number;
    transportationCost: number;
    deliveryCost: number;
    storageRisk: number;
    totalCost: number;
  };
  
  // Quality and Grade Analysis
  qualityGradeAnalysis: {
    grade: string;
    quality: number;
    premium: number;
    discount: number;
    specifications: string[];
    qualityScore: number;
  };
  
  // Hedging Analysis Results
  hedgingAnalysis: {
    hedgeType: string;
    hedgeRatio: number;
    hedgeEffectiveness: number;
    hedgeCost: number;
    hedgeInstruments: string[];
    hedgeValue: number;
    hedgeEfficiency: number;
  };
  
  // Transaction Cost Analysis
  transactionCostAnalysis: {
    commission: number;
    fees: number;
    slippage: number;
    bidAskSpread: number;
    clearingFees: number;
    exchangeFees: number;
    totalCost: number;
    costAsPercentage: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxRate: number;
    taxTreatment: string;
    markToMarketTax: boolean;
    washSaleRule: boolean;
    taxLossHarvesting: boolean;
    taxLiability: number;
    afterTaxReturn: number;
  };
  
  // Regulatory Analysis
  regulatoryAnalysis: {
    positionLimits: number;
    reportingRequirements: boolean;
    regulatoryConstraints: string[];
    complianceCost: number;
    regulatoryRisk: number;
  };
  
  // Spread Trading Analysis
  spreadTradingAnalysis: {
    isSpread: boolean;
    spreadType: string;
    spreadValue: number;
    spreadDirection: 'long' | 'short';
    spreadProfit: number;
    spreadRisk: number;
    leg1: {
      contract: string;
      price: number;
      quantity: number;
      value: number;
    };
    leg2: {
      contract: string;
      price: number;
      quantity: number;
      value: number;
    };
  };
  
  // Options Trading Analysis
  optionsTradingAnalysis: {
    hasOptions: boolean;
    optionType: string;
    strikePrice: number;
    expirationDate: string;
    premium: number;
    impliedVolatility: number;
    optionValue: number;
    optionRisk: number;
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    price: number;
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
    meanPrice: number;
    medianPrice: number;
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
      price: number;
      probability: number;
    }[];
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalReturn: number;
    historicalVolatility: number;
    historicalSharpeRatio: number;
    historicalMaxDrawdown: number;
    priceTrend: number;
    priceCycles: string[];
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPrice: number;
    highPrice: number;
    sensitivity: number;
  }[];
  
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
    commodityValue: number;
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
