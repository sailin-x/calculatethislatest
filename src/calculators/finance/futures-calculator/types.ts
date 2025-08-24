export interface FuturesCalculatorInputs {
  // Futures Information
  futuresInfo: {
    futuresName: string;
    futuresSymbol: string;
    underlyingAsset: string;
    assetType: 'commodity' | 'currency' | 'index' | 'bond' | 'stock' | 'interest_rate' | 'energy' | 'metals' | 'agriculture' | 'other';
    exchange: string;
    contractSize: number;
    tickSize: number;
    tickValue: number;
    futuresDescription: string;
  };
  
  // Contract Specifications
  contractSpecifications: {
    // Basic Contract Details
    basicDetails: {
      contractSize: number;
      tickSize: number;
      tickValue: number;
      minimumPriceMovement: number;
      priceQuotation: string;
      tradingHours: string;
      lastTradingDay: string;
      deliveryDate: string;
      deliveryLocation: string;
    };
    
    // Contract Months
    contractMonths: {
      month: string;
      symbol: string;
      lastTradingDay: string;
      deliveryDate: string;
      openInterest: number;
      volume: number;
    }[];
    
    // Margin Requirements
    marginRequirements: {
      initialMargin: number;
      maintenanceMargin: number;
      variationMargin: number;
      marginCallLevel: number;
      leverage: number;
    };
    
    // Delivery Specifications
    deliverySpecifications: {
      deliveryType: 'physical' | 'cash' | 'both';
      deliveryLocation: string;
      deliveryGrade: string;
      deliveryPeriod: string;
      deliveryNotice: number; // days
    };
  };
  
  // Market Data
  marketData: {
    // Current Market Information
    currentMarketInfo: {
      currentPrice: number;
      bidPrice: number;
      askPrice: number;
      lastPrice: number;
      openPrice: number;
      highPrice: number;
      lowPrice: number;
      volume: number;
      openInterest: number;
      change: number;
      changePercent: number;
    };
    
    // Price Data
    priceData: {
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
      openInterest: number;
    }[];
    
    // Term Structure
    termStructure: {
      month: string;
      price: number;
      basis: number;
      contango: number;
      backwardation: number;
      openInterest: number;
      volume: number;
    }[];
    
    // Market Conditions
    marketConditions: {
      marketType: 'contango' | 'backwardation' | 'normal';
      volatilityRegime: 'low' | 'medium' | 'high';
      liquidityCondition: 'high' | 'medium' | 'low';
      marketStress: 'low' | 'medium' | 'high';
    };
  };
  
  // Position Information
  positionInformation: {
    // Position Details
    positionDetails: {
      positionType: 'long' | 'short' | 'spread' | 'calendar' | 'butterfly' | 'straddle' | 'strangle' | 'other';
      quantity: number;
      entryPrice: number;
      currentPrice: number;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
    };
    
    // Position Legs
    positionLegs: {
      leg: string;
      contract: string;
      quantity: number;
      price: number;
      type: 'long' | 'short';
      month: string;
    }[];
    
    // Position Risk
    positionRisk: {
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      var: number;
      maxLoss: number;
      maxProfit: number;
    };
  };
  
  // Pricing Parameters
  pricingParameters: {
    // Cost of Carry Model
    costOfCarryModel: {
      spotPrice: number;
      riskFreeRate: number;
      storageCost: number;
      convenienceYield: number;
      dividendYield: number;
      timeToDelivery: number;
      theoreticalPrice: number;
    };
    
    // Basis Analysis
    basisAnalysis: {
      cashPrice: number;
      futuresPrice: number;
      basis: number;
      basisRisk: number;
      convergence: number;
      basisComponents: {
        component: string;
        value: number;
        contribution: number;
      }[];
    };
    
    // Arbitrage Analysis
    arbitrageAnalysis: {
      arbitrageOpportunity: boolean;
      arbitrageProfit: number;
      transactionCosts: number;
      netProfit: number;
      arbitrageType: 'cash_and_carry' | 'reverse_cash_and_carry' | 'calendar' | 'inter_commodity' | 'none';
    };
  };
  
  // Risk Parameters
  riskParameters: {
    // Market Risk
    marketRisk: {
      priceRisk: number;
      basisRisk: number;
      volatilityRisk: number;
      correlationRisk: number;
      liquidityRisk: number;
    };
    
    // Position Risk
    positionRisk: {
      deltaRisk: number;
      gammaRisk: number;
      thetaRisk: number;
      vegaRisk: number;
      concentrationRisk: number;
    };
    
    // Credit Risk
    creditRisk: {
      counterpartyRisk: number;
      defaultProbability: number;
      recoveryRate: number;
      creditSpread: number;
    };
    
    // Operational Risk
    operationalRisk: {
      settlementRisk: number;
      deliveryRisk: number;
      regulatoryRisk: number;
      technologyRisk: number;
    };
  };
  
  // Hedging Parameters
  hedgingParameters: {
    // Hedging Strategy
    hedgingStrategy: {
      hedgeType: 'long' | 'short' | 'cross' | 'calendar' | 'ratio' | 'none';
      hedgeRatio: number;
      hedgeEffectiveness: number;
      hedgeInstruments: string[];
      rebalancingFrequency: 'daily' | 'weekly' | 'monthly' | 'event_driven';
    };
    
    // Hedge Costs
    hedgeCosts: {
      transactionCosts: number;
      marginCosts: number;
      opportunityCosts: number;
      totalHedgeCost: number;
    };
    
    // Hedge Performance
    hedgePerformance: {
      hedgeRatio: number;
      hedgeEfficiency: number;
      basisRisk: number;
      trackingError: number;
    };
  };
  
  // Trading Parameters
  tradingParameters: {
    // Transaction Costs
    transactionCosts: {
      commission: number;
      exchangeFees: number;
      clearingFees: number;
      bidAskSpread: number;
      slippage: number;
      totalCost: number;
    };
    
    // Execution Parameters
    executionParameters: {
      orderType: 'market' | 'limit' | 'stop' | 'stop_limit' | 'iceberg' | 'twap' | 'vwap';
      orderSize: number;
      executionTime: number;
      fillProbability: number;
      marketImpact: number;
    };
    
    // Liquidity Constraints
    liquidityConstraints: {
      maxTradeSize: number;
      minTradeSize: number;
      averageDailyVolume: number;
      openInterest: number;
      liquidityScore: number;
    };
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    // Supply and Demand
    supplyDemand: {
      supply: number;
      demand: number;
      surplus: number;
      deficit: number;
      inventory: number;
      production: number;
      consumption: number;
    };
    
    // Seasonal Factors
    seasonalFactors: {
      season: string;
      impact: number;
      historicalPattern: string;
      currentPhase: string;
    }[];
    
    // Weather Impact
    weatherImpact: {
      weatherCondition: string;
      impact: number;
      probability: number;
      duration: number;
    }[];
    
    // Economic Factors
    economicFactors: {
      factor: string;
      impact: number;
      direction: 'positive' | 'negative' | 'neutral';
      probability: number;
    }[];
  };
  
  // Technical Analysis
  technicalAnalysis: {
    // Price Patterns
    pricePatterns: {
      pattern: string;
      signal: 'buy' | 'sell' | 'hold';
      strength: number;
      target: number;
      stopLoss: number;
    }[];
    
    // Technical Indicators
    technicalIndicators: {
      indicator: string;
      value: number;
      signal: 'buy' | 'sell' | 'hold';
      strength: number;
    }[];
    
    // Support and Resistance
    supportResistance: {
      level: number;
      type: 'support' | 'resistance';
      strength: number;
      touches: number;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenarioName: string;
      probability: number;
      priceChange: number;
      volumeChange: number;
      volatilityChange: number;
      description: string;
    }[];
    
    // Stress Testing
    stressTesting: {
      stressTest: string;
      priceShock: number;
      volumeShock: number;
      volatilityShock: number;
      correlationShock: number;
      description: string;
    }[];
    
    // Sensitivity Analysis
    sensitivityAnalysis: {
      variable: string;
      baseValue: number;
      lowValue: number;
      highValue: number;
      stepSize: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePriceVolatility: boolean;
  includeVolumeVolatility: boolean;
  includeCorrelationChanges: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeStorageCosts: boolean;
  includeDeliveryCosts: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePricingAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeHedgingAnalysis: boolean;
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
    volatility: number;
    return: number;
  }[];
  
  // Reporting Preferences
  includePricingAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeHedgingAnalysis: boolean;
  includeFundamentalAnalysis: boolean;
  includeTechnicalAnalysis: boolean;
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

export interface FuturesCalculatorResults {
  // Core Futures Metrics
  currentPrice: number;
  theoreticalPrice: number;
  basis: number;
  contango: number;
  backwardation: number;
  unrealizedPnL: number;
  
  // Futures Analysis
  futuresAnalysis: {
    currentPrice: number;
    theoreticalPrice: number;
    basis: number;
    contango: number;
    backwardation: number;
    pricingEfficiency: number;
    futuresBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
  };
  
  // Pricing Analysis
  pricingAnalysis: {
    spotPrice: number;
    futuresPrice: number;
    theoreticalPrice: number;
    costOfCarry: number;
    convenienceYield: number;
    storageCost: number;
    pricingComponents: {
      component: string;
      value: number;
      contribution: number;
    }[];
    pricingEfficiency: number;
  };
  
  // Basis Analysis
  basisAnalysis: {
    cashPrice: number;
    futuresPrice: number;
    basis: number;
    basisRisk: number;
    convergence: number;
    basisComponents: {
      component: string;
      value: number;
      contribution: number;
    }[];
    basisEfficiency: number;
  };
  
  // Position Analysis
  positionAnalysis: {
    positionType: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    unrealizedPnL: number;
    realizedPnL: number;
    totalPnL: number;
    positionBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    positionEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: {
      priceRisk: number;
      basisRisk: number;
      volatilityRisk: number;
      correlationRisk: number;
      liquidityRisk: number;
      riskContribution: number;
    };
    positionRisk: {
      deltaRisk: number;
      gammaRisk: number;
      thetaRisk: number;
      vegaRisk: number;
      concentrationRisk: number;
      riskContribution: number;
    };
    creditRisk: {
      counterpartyRisk: number;
      defaultProbability: number;
      recoveryRate: number;
      creditSpread: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    hedgeType: string;
    hedgeRatio: number;
    hedgeEffectiveness: number;
    hedgeInstruments: {
      instrument: string;
      quantity: number;
      cost: number;
      effectiveness: number;
    }[];
    hedgeCosts: {
      transactionCosts: number;
      marginCosts: number;
      opportunityCosts: number;
      totalCost: number;
    };
    hedgePerformance: {
      hedgeRatio: number;
      hedgeEfficiency: number;
      basisRisk: number;
      trackingError: number;
    };
    hedgeEfficiency: number;
  };
  
  // Arbitrage Analysis
  arbitrageAnalysis: {
    arbitrageOpportunity: boolean;
    arbitrageType: string;
    arbitrageProfit: number;
    transactionCosts: number;
    netProfit: number;
    arbitrageComponents: {
      component: string;
      value: number;
      contribution: number;
    }[];
    arbitrageEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPrice: number;
    highPrice: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    price: number;
    volume: number;
    volatility: number;
    profitLoss: number;
    riskLevel: string;
  }[];
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    supplyDemand: {
      supply: number;
      demand: number;
      surplus: number;
      deficit: number;
      inventory: number;
      production: number;
      consumption: number;
    };
    seasonalFactors: {
      season: string;
      impact: number;
      historicalPattern: string;
      currentPhase: string;
    }[];
    weatherImpact: {
      weatherCondition: string;
      impact: number;
      probability: number;
      duration: number;
    }[];
    fundamentalScore: number;
  };
  
  // Technical Analysis
  technicalAnalysis: {
    pricePatterns: {
      pattern: string;
      signal: string;
      strength: number;
      target: number;
      stopLoss: number;
    }[];
    technicalIndicators: {
      indicator: string;
      value: number;
      signal: string;
      strength: number;
    }[];
    supportResistance: {
      level: number;
      type: string;
      strength: number;
      touches: number;
    }[];
    technicalScore: number;
  };
  
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
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalPrice: number;
    historicalBasis: number;
    historicalVolatility: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Futures Score
  futuresScore: {
    overallScore: number;
    componentScores: {
      pricing: number;
      risk: number;
      liquidity: number;
      fundamentals: number;
      technical: number;
    };
    recommendation: 'buy' | 'sell' | 'hold' | 'close' | 'review';
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
    profitPotential: number;
    riskReduction: number;
    costSavings: number;
    valueCreation: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    futuresAssessment: string;
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
    theoreticalPrice: number;
    basis: number;
    recommendation: 'buy' | 'sell' | 'hold' | 'close' | 'review';
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
