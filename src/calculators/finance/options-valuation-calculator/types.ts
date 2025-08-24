export interface OptionsValuationInputs {
  // Option Information
  optionInfo: {
    optionName: string;
    optionType: 'call' | 'put' | 'binary_call' | 'binary_put' | 'barrier_up_in' | 'barrier_up_out' | 'barrier_down_in' | 'barrier_down_out' | 'asian' | 'lookback' | 'spread' | 'straddle' | 'strangle' | 'butterfly' | 'iron_condor' | 'other';
    underlyingAsset: string;
    underlyingType: 'stock' | 'index' | 'etf' | 'currency' | 'commodity' | 'bond' | 'futures' | 'other';
    optionStyle: 'american' | 'european' | 'bermudan' | 'asian' | 'lookback' | 'barrier';
    optionDescription: string;
  };
  
  // Option Characteristics
  optionCharacteristics: {
    // Basic Characteristics
    basicCharacteristics: {
      strikePrice: number;
      currentPrice: number;
      expirationDate: string;
      timeToExpiration: number; // in years
      optionPrice: number;
      intrinsicValue: number;
      timeValue: number;
      moneyness: 'in_the_money' | 'at_the_money' | 'out_of_the_money' | 'deep_in_the_money' | 'deep_out_of_the_money';
    };
    
    // Option Chain
    optionChain: {
      strike: number;
      callPrice: number;
      putPrice: number;
      callVolume: number;
      putVolume: number;
      callOpenInterest: number;
      putOpenInterest: number;
      callImpliedVolatility: number;
      putImpliedVolatility: number;
    }[];
    
    // Option Greeks
    optionGreeks: {
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      lambda: number;
      epsilon: number;
      vanna: number;
      volga: number;
    };
    
    // Option Strategy
    optionStrategy: {
      strategy: 'long_call' | 'long_put' | 'short_call' | 'short_put' | 'covered_call' | 'protective_put' | 'bull_spread' | 'bear_spread' | 'iron_condor' | 'butterfly' | 'straddle' | 'strangle' | 'collar' | 'diagonal' | 'calendar' | 'custom';
      legs: {
        type: 'call' | 'put';
        strike: number;
        expiration: string;
        quantity: number;
        action: 'buy' | 'sell';
      }[];
    };
  };
  
  // Market Data
  marketData: {
    // Underlying Asset Data
    underlyingData: {
      currentPrice: number;
      historicalPrices: {
        date: string;
        price: number;
        volume: number;
      }[];
      volatility: number;
      dividendYield: number;
      beta: number;
      marketCap: number;
    };
    
    // Market Information
    marketInfo: {
      riskFreeRate: number;
      marketReturn: number;
      marketVolatility: number;
      correlation: number;
      liquidity: 'high' | 'medium' | 'low';
    };
    
    // Volatility Surface
    volatilitySurface: {
      strike: number;
      expiration: string;
      impliedVolatility: number;
      historicalVolatility: number;
      realizedVolatility: number;
    }[];
    
    // Market Conditions
    marketConditions: {
      volatilityRegime: 'low' | 'medium' | 'high';
      trendDirection: 'bullish' | 'bearish' | 'sideways';
      liquidityCondition: 'high' | 'medium' | 'low';
      marketStress: 'low' | 'medium' | 'high';
    };
  };
  
  // Pricing Model Parameters
  pricingModelParameters: {
    // Model Selection
    modelType: 'black_scholes' | 'binomial' | 'trinomial' | 'monte_carlo' | 'finite_difference' | 'barone_adesi_whaley' | 'bjerksund_stensland' | 'heston' | 'sabr' | 'custom';
    
    // Black-Scholes Parameters
    blackScholesParams: {
      underlyingPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
    };
    
    // Binomial Parameters
    binomialParams: {
      timeSteps: number;
      upFactor: number;
      downFactor: number;
      riskNeutralProbability: number;
      convergenceCriteria: number;
    };
    
    // Monte Carlo Parameters
    monteCarloParams: {
      simulations: number;
      timeSteps: number;
      randomSeed: number;
      varianceReduction: boolean;
      antitheticVariates: boolean;
      controlVariates: boolean;
    };
    
    // Volatility Models
    volatilityModels: {
      constantVolatility: number;
      localVolatility: {
        strike: number;
        time: number;
        volatility: number;
      }[];
      stochasticVolatility: {
        meanReversion: number;
        volatilityOfVolatility: number;
        correlation: number;
        longTermVolatility: number;
      };
    };
  };
  
  // Risk Parameters
  riskParameters: {
    // Greeks Risk Limits
    greeksRiskLimits: {
      maxDelta: number;
      maxGamma: number;
      maxTheta: number;
      maxVega: number;
      maxRho: number;
    };
    
    // Position Risk
    positionRisk: {
      maxPositionSize: number;
      maxLoss: number;
      maxDrawdown: number;
      var: number;
      cvar: number;
    };
    
    // Market Risk
    marketRisk: {
      priceRisk: number;
      volatilityRisk: number;
      interestRateRisk: number;
      correlationRisk: number;
      liquidityRisk: number;
    };
    
    // Counterparty Risk
    counterpartyRisk: {
      defaultProbability: number;
      recoveryRate: number;
      creditSpread: number;
      collateralValue: number;
    };
  };
  
  // Trading Parameters
  tradingParameters: {
    // Transaction Costs
    transactionCosts: {
      commission: number;
      bidAskSpread: number;
      slippage: number;
      marketImpact: number;
      totalCost: number;
    };
    
    // Margin Requirements
    marginRequirements: {
      initialMargin: number;
      maintenanceMargin: number;
      marginCallLevel: number;
      leverage: number;
    };
    
    // Liquidity Constraints
    liquidityConstraints: {
      maxTradeSize: number;
      minTradeSize: number;
      executionTime: number;
      fillProbability: number;
    };
  };
  
  // Hedging Parameters
  hedgingParameters: {
    // Hedging Strategy
    hedgingStrategy: {
      hedgeType: 'delta' | 'gamma' | 'vega' | 'delta_gamma' | 'delta_gamma_vega' | 'dynamic' | 'static' | 'none';
      rebalancingFrequency: 'continuous' | 'daily' | 'weekly' | 'monthly' | 'event_driven';
      hedgeRatio: number;
      hedgeInstruments: string[];
    };
    
    // Hedge Costs
    hedgeCosts: {
      transactionCosts: number;
      financingCosts: number;
      opportunityCosts: number;
      totalHedgeCost: number;
    };
    
    // Hedge Effectiveness
    hedgeEffectiveness: {
      hedgeRatio: number;
      hedgeEfficiency: number;
      basisRisk: number;
      trackingError: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenarioName: string;
      probability: number;
      underlyingPrice: number;
      volatility: number;
      interestRate: number;
      timeToExpiration: number;
      description: string;
    }[];
    
    // Stress Testing
    stressTesting: {
      stressTest: string;
      priceShock: number;
      volatilityShock: number;
      interestRateShock: number;
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
  includeVolatilitySmile: boolean;
  includeJumpDiffusion: boolean;
  includeStochasticVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeDividends: boolean;
  includeEarlyExercise: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGreeks: boolean;
    includeSensitivityAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
    includeHedgingAnalysis: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    date: string;
    underlyingPrice: number;
    optionPrice: number;
    impliedVolatility: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
  }[];
  
  // Reporting Preferences
  includeOptionAnalysis: boolean;
  includeGreeksAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeHedgingAnalysis: boolean;
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

export interface OptionsValuationResults {
  // Core Option Metrics
  optionPrice: number;
  intrinsicValue: number;
  timeValue: number;
  impliedVolatility: number;
  moneyness: string;
  
  // Option Analysis
  optionAnalysis: {
    optionPrice: number;
    intrinsicValue: number;
    timeValue: number;
    impliedVolatility: number;
    moneyness: string;
    optionBreakdown: {
      component: string;
      value: number;
      percentage: number;
    }[];
    optionEfficiency: number;
  };
  
  // Greeks Analysis
  greeksAnalysis: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
    lambda: number;
    epsilon: number;
    vanna: number;
    volga: number;
    greeksBreakdown: {
      greek: string;
      value: number;
      risk: number;
      contribution: number;
    }[];
    greeksEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    priceRisk: {
      delta: number;
      gamma: number;
      priceSensitivity: number;
      riskContribution: number;
    };
    volatilityRisk: {
      vega: number;
      volga: number;
      volatilitySensitivity: number;
      riskContribution: number;
    };
    timeRisk: {
      theta: number;
      timeDecay: number;
      timeSensitivity: number;
      riskContribution: number;
    };
    interestRateRisk: {
      rho: number;
      rateSensitivity: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Pricing Analysis
  pricingAnalysis: {
    theoreticalPrice: number;
    marketPrice: number;
    priceDifference: number;
    pricingModel: string;
    modelAccuracy: number;
    pricingComponents: {
      component: string;
      value: number;
      contribution: number;
    }[];
    pricingEfficiency: number;
  };
  
  // Volatility Analysis
  volatilityAnalysis: {
    impliedVolatility: number;
    historicalVolatility: number;
    realizedVolatility: number;
    volatilitySkew: number;
    volatilityTermStructure: {
      expiration: string;
      volatility: number;
    }[];
    volatilityBreakdown: {
      component: string;
      volatility: number;
      contribution: number;
    }[];
    volatilityEfficiency: number;
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
    optionPrice: number;
    underlyingPrice: number;
    impliedVolatility: number;
    profitLoss: number;
    riskLevel: string;
  }[];
  
  // Hedging Analysis
  hedgingAnalysis: {
    hedgeRatio: number;
    hedgeInstruments: {
      instrument: string;
      quantity: number;
      cost: number;
      effectiveness: number;
    }[];
    hedgeCosts: {
      transactionCosts: number;
      financingCosts: number;
      opportunityCosts: number;
      totalCost: number;
    };
    hedgeEffectiveness: {
      hedgeRatio: number;
      hedgeEfficiency: number;
      basisRisk: number;
      trackingError: number;
    };
    hedgeEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategy: string;
    profitLoss: number;
    maxProfit: number;
    maxLoss: number;
    breakevenPoints: number[];
    probabilityOfProfit: number;
    strategyBreakdown: {
      leg: string;
      profitLoss: number;
      contribution: number;
    }[];
    strategyEfficiency: number;
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
    historicalVolatility: number;
    historicalGreeks: {
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
    };
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Option Score
  optionScore: {
    overallScore: number;
    componentScores: {
      pricing: number;
      risk: number;
      liquidity: number;
      volatility: number;
      strategy: number;
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
    optionAssessment: string;
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
    optionPrice: number;
    impliedVolatility: number;
    delta: number;
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
