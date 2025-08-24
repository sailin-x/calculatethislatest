export interface CommodityTradingCalculatorInputs {
  // Commodity Information
  commodityInfo: {
    // Commodity Details
    commodityDetails: {
      commodityName: string;
      commodityType: 'energy' | 'metals' | 'agriculture' | 'livestock' | 'softs' | 'other';
      commodityCategory: 'crude_oil' | 'natural_gas' | 'gold' | 'silver' | 'copper' | 'corn' | 'wheat' | 'soybeans' | 'cattle' | 'hogs' | 'coffee' | 'cocoa' | 'sugar' | 'cotton' | 'other';
      commoditySymbol: string;
      exchange: string;
      contractSize: number;
      tickSize: number;
      tickValue: number;
      commodityDescription: string;
    };
    
    // Contract Specifications
    contractSpecifications: {
      contractMonth: string;
      expirationDate: string;
      lastTradingDay: string;
      deliveryDate: string;
      deliveryLocation: string;
      qualitySpecifications: string[];
      deliveryMethod: 'physical' | 'cash_settled' | 'exchange_for_physical';
      marginRequirement: number;
      maintenanceMargin: number;
    };
  };
  
  // Market Information
  marketInfo: {
    // Price Data
    priceData: {
      currentPrice: number;
      bidPrice: number;
      askPrice: number;
      lastPrice: number;
      highPrice: number;
      lowPrice: number;
      openPrice: number;
      previousClose: number;
      priceChange: number;
      priceChangePercent: number;
      volume: number;
      openInterest: number;
    };
    
    // Historical Price Data
    historicalPriceData: {
      date: string;
      openPrice: number;
      highPrice: number;
      lowPrice: number;
      closePrice: number;
      volume: number;
      openInterest: number;
    }[];
    
    // Term Structure
    termStructure: {
      contractMonth: string;
      price: number;
      basis: number;
      volume: number;
      openInterest: number;
    }[];
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      liquidityRegime: 'high' | 'medium' | 'low';
      contango: boolean;
      backwardation: boolean;
      basisStrength: number;
    };
  };
  
  // Trading Information
  tradingInfo: {
    // Position Details
    positionDetails: {
      positionType: 'long' | 'short' | 'spread' | 'straddle' | 'strangle' | 'butterfly' | 'calendar_spread' | 'other';
      positionSize: number;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      positionValue: number;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
    };
    
    // Trade Details
    tradeDetails: {
      tradeType: 'buy' | 'sell' | 'spread' | 'other';
      quantity: number;
      price: number;
      commission: number;
      fees: number;
      slippage: number;
      totalCost: number;
      tradeDate: string;
      tradeTime: string;
    }[];
    
    // Order Management
    orderManagement: {
      stopLoss: number;
      takeProfit: number;
      trailingStop: number;
      timeStop: string;
      orderType: 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop';
      orderStatus: 'pending' | 'filled' | 'cancelled' | 'rejected';
    };
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    // Supply and Demand
    supplyDemand: {
      production: number;
      consumption: number;
      imports: number;
      exports: number;
      endingStocks: number;
      stockToUseRatio: number;
      supplyDemandBalance: number;
    };
    
    // Inventory Analysis
    inventoryAnalysis: {
      currentInventory: number;
      historicalInventory: number;
      inventoryChange: number;
      inventoryLevel: 'low' | 'normal' | 'high';
      daysOfSupply: number;
      inventoryTurnover: number;
    };
    
    // Weather Analysis
    weatherAnalysis: {
      weatherCondition: 'favorable' | 'unfavorable' | 'neutral';
      temperature: number;
      precipitation: number;
      droughtIndex: number;
      frostRisk: boolean;
      weatherImpact: number;
    };
    
    // Economic Indicators
    economicIndicators: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      currencyStrength: number;
      economicOutlook: 'positive' | 'negative' | 'neutral';
    };
  };
  
  // Technical Analysis
  technicalAnalysis: {
    // Price Action
    priceAction: {
      supportLevel: number;
      resistanceLevel: number;
      trendDirection: 'bullish' | 'bearish' | 'sideways';
      trendStrength: number;
      momentum: number;
      volatility: number;
    };
    
    // Technical Indicators
    technicalIndicators: {
      movingAverages: {
        period: number;
        value: number;
        signal: 'buy' | 'sell' | 'hold';
      }[];
      rsi: number;
      macd: {
        macdLine: number;
        signalLine: number;
        histogram: number;
        signal: 'buy' | 'sell' | 'hold';
      };
      bollingerBands: {
        upper: number;
        middle: number;
        lower: number;
        position: 'above' | 'between' | 'below';
      };
      stochastic: {
        k: number;
        d: number;
        signal: 'buy' | 'sell' | 'hold';
      };
    };
    
    // Chart Patterns
    chartPatterns: {
      pattern: string;
      probability: number;
      target: number;
      stopLoss: number;
      timeframe: string;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Market Risk
    marketRisk: {
      priceRisk: number;
      volatilityRisk: number;
      liquidityRisk: number;
      basisRisk: number;
      marketRisk: number;
    };
    
    // Position Risk
    positionRisk: {
      leverageRisk: number;
      concentrationRisk: number;
      correlationRisk: number;
      timingRisk: number;
      positionRisk: number;
    };
    
    // Operational Risk
    operationalRisk: {
      executionRisk: number;
      settlementRisk: number;
      counterpartyRisk: number;
      regulatoryRisk: number;
      operationalRisk: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    // Hedging Strategy
    hedgingStrategy: {
      hedgeType: 'long' | 'short' | 'cross' | 'basis' | 'calendar' | 'ratio';
      hedgeRatio: number;
      hedgeAmount: number;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Basis Trading
    basisTrading: {
      cashPrice: number;
      futuresPrice: number;
      basis: number;
      basisStrength: number;
      basisOpportunity: number;
    };
    
    // Calendar Spread
    calendarSpread: {
      nearMonth: string;
      farMonth: string;
      spreadValue: number;
      spreadStrength: number;
      rollOpportunity: number;
    };
  };
  
  // Cost Analysis
  costAnalysis: {
    // Transaction Costs
    transactionCosts: {
      commission: number;
      fees: number;
      slippage: number;
      bidAskSpread: number;
      totalTransactionCosts: number;
      costAsPercentage: number;
    };
    
    // Carrying Costs
    carryingCosts: {
      storageCosts: number;
      insuranceCosts: number;
      financingCosts: number;
      totalCarryingCosts: number;
      costAsPercentage: number;
    };
    
    // Total Costs
    totalCosts: {
      transactionCosts: number;
      carryingCosts: number;
      totalCosts: number;
      costEfficiency: number;
    };
  };
  
  // Performance Analysis
  performanceAnalysis: {
    // Return Metrics
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      excessReturn: number;
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      maxDrawdown: number;
    };
    
    // Risk Metrics
    riskMetrics: {
      volatility: number;
      var: number;
      cvar: number;
      downsideDeviation: number;
      beta: number;
      correlation: number;
    };
    
    // Attribution Analysis
    attributionAnalysis: {
      priceContribution: number;
      basisContribution: number;
      rollContribution: number;
      costContribution: number;
      totalAttribution: number;
    };
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    // Alternative Investments
    alternativeInvestments: {
      investment: string;
      expectedReturn: number;
      risk: number;
      correlation: number;
      comparison: number;
    }[];
    
    // Related Commodities
    relatedCommodities: {
      commodity: string;
      correlation: number;
      spreadValue: number;
      spreadOpportunity: number;
    }[];
    
    // Market Comparison
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      commodityReturn: number;
      outperformance: number;
      correlation: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Price Scenarios
    priceScenarios: {
      scenario: string;
      probability: number;
      priceChange: number;
      impact: number;
      return: number;
    }[];
    
    // Supply Scenarios
    supplyScenarios: {
      scenario: string;
      probability: number;
      supplyChange: number;
      priceImpact: number;
      return: number;
    }[];
    
    // Demand Scenarios
    demandScenarios: {
      scenario: string;
      probability: number;
      demandChange: number;
      priceImpact: number;
      return: number;
    }[];
    
    // Weather Scenarios
    weatherScenarios: {
      scenario: string;
      probability: number;
      weatherImpact: number;
      priceImpact: number;
      return: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePriceVolatility: boolean;
  includeBasisVolatility: boolean;
  includeCorrelationChanges: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeCarryingCosts: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeFundamentalAnalysis: boolean;
    includeTechnicalAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeHedgingAnalysis: boolean;
    includeCostAnalysis: boolean;
    includePerformanceAnalysis: boolean;
    includeComparisonAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    date: string;
    price: number;
    volume: number;
    openInterest: number;
    basis: number;
    return: number;
    volatility: number;
  }[];
  
  // Reporting Preferences
  includeFundamentalAnalysis: boolean;
  includeTechnicalAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeHedgingAnalysis: boolean;
  includeCostAnalysis: boolean;
  includePerformanceAnalysis: boolean;
  includeComparisonAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface CommodityTradingCalculatorResults {
  // Core Trading Metrics
  currentPrice: number;
  positionValue: number;
  unrealizedPnL: number;
  totalReturn: number;
  sharpeRatio: number;
  
  // Trading Analysis
  tradingAnalysis: {
    currentPrice: number;
    positionValue: number;
    unrealizedPnL: number;
    totalReturn: number;
    sharpeRatio: number;
    tradingBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    tradingEfficiency: number;
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    supplyDemand: {
      production: number;
      consumption: number;
      imports: number;
      exports: number;
      endingStocks: number;
      stockToUseRatio: number;
      supplyDemandBalance: number;
    };
    inventoryAnalysis: {
      currentInventory: number;
      historicalInventory: number;
      inventoryChange: number;
      inventoryLevel: string;
      daysOfSupply: number;
      inventoryTurnover: number;
    };
    weatherAnalysis: {
      weatherCondition: string;
      temperature: number;
      precipitation: number;
      droughtIndex: number;
      frostRisk: boolean;
      weatherImpact: number;
    };
    economicIndicators: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      currencyStrength: number;
      economicOutlook: string;
    };
    fundamentalEfficiency: number;
  };
  
  // Technical Analysis
  technicalAnalysis: {
    priceAction: {
      supportLevel: number;
      resistanceLevel: number;
      trendDirection: string;
      trendStrength: number;
      momentum: number;
      volatility: number;
    };
    technicalIndicators: {
      movingAverages: {
        period: number;
        value: number;
        signal: string;
      }[];
      rsi: number;
      macd: {
        macdLine: number;
        signalLine: number;
        histogram: number;
        signal: string;
      };
      bollingerBands: {
        upper: number;
        middle: number;
        lower: number;
        position: string;
      };
      stochastic: {
        k: number;
        d: number;
        signal: string;
      };
    };
    chartPatterns: {
      pattern: string;
      probability: number;
      target: number;
      stopLoss: number;
      timeframe: string;
    }[];
    technicalEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: {
      priceRisk: number;
      volatilityRisk: number;
      liquidityRisk: number;
      basisRisk: number;
      marketRisk: number;
    };
    positionRisk: {
      leverageRisk: number;
      concentrationRisk: number;
      correlationRisk: number;
      timingRisk: number;
      positionRisk: number;
    };
    operationalRisk: {
      executionRisk: number;
      settlementRisk: number;
      counterpartyRisk: number;
      regulatoryRisk: number;
      operationalRisk: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    hedgingStrategy: {
      hedgeType: string;
      hedgeRatio: number;
      hedgeAmount: number;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    basisTrading: {
      cashPrice: number;
      futuresPrice: number;
      basis: number;
      basisStrength: number;
      basisOpportunity: number;
    };
    calendarSpread: {
      nearMonth: string;
      farMonth: string;
      spreadValue: number;
      spreadStrength: number;
      rollOpportunity: number;
    };
    hedgingEfficiency: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    transactionCosts: {
      commission: number;
      fees: number;
      slippage: number;
      bidAskSpread: number;
      totalTransactionCosts: number;
      costAsPercentage: number;
    };
    carryingCosts: {
      storageCosts: number;
      insuranceCosts: number;
      financingCosts: number;
      totalCarryingCosts: number;
      costAsPercentage: number;
    };
    totalCosts: {
      transactionCosts: number;
      carryingCosts: number;
      totalCosts: number;
      costEfficiency: number;
    };
    costEfficiency: number;
  };
  
  // Performance Analysis
  performanceAnalysis: {
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      excessReturn: number;
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      maxDrawdown: number;
    };
    riskMetrics: {
      volatility: number;
      var: number;
      cvar: number;
      downsideDeviation: number;
      beta: number;
      correlation: number;
    };
    attributionAnalysis: {
      priceContribution: number;
      basisContribution: number;
      rollContribution: number;
      costContribution: number;
      totalAttribution: number;
    };
    performanceEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowReturn: number;
    highReturn: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    priceChange: number;
    impact: number;
    return: number;
  }[];
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeInvestments: {
      investment: string;
      expectedReturn: number;
      risk: number;
      correlation: number;
      comparison: number;
    }[];
    relatedCommodities: {
      commodity: string;
      correlation: number;
      spreadValue: number;
      spreadOpportunity: number;
    }[];
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      commodityReturn: number;
      outperformance: number;
      correlation: number;
    };
    comparisonEfficiency: number;
  };
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      return: number;
      risk: number;
      outperformance: number;
    }[];
    marketComparison: {
      metric: string;
      commodity: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Trading Score
  tradingScore: {
    overallScore: number;
    componentScores: {
      fundamental: number;
      technical: number;
      risk: number;
      hedging: number;
      cost: number;
      performance: number;
    };
    recommendation: 'buy' | 'sell' | 'hold' | 'avoid';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanReturn: number;
    medianReturn: number;
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
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalPrice: number;
    historicalReturn: number;
    historicalVolatility: number;
    historicalTrends: string[];
    yearOverYearChange: number;
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
    returnEnhancement: number;
    riskReduction: number;
    costSavings: number;
    hedgingEffectiveness: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    tradingAssessment: string;
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
    currentPrice: number;
    totalReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    recommendation: 'buy' | 'sell' | 'hold' | 'avoid';
    keyStrengths: string[];
    keyWeaknesses: string[];
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
