export interface FuturesTradingCalculatorInputs {
  // Futures Information
  futuresInfo: {
    // Basic Information
    basicInfo: {
      underlyingAsset: string;
      underlyingSymbol: string;
      underlyingPrice: number;
      underlyingVolatility: number;
      underlyingDividendYield: number;
      riskFreeRate: number;
      futuresType: 'commodity' | 'financial' | 'currency' | 'index' | 'other';
      contractSize: number;
      tickSize: number;
      minimumTick: number;
      marginRequirement: number;
      maintenanceMargin: number;
      initialMargin: number;
    };
    
    // Futures Contracts
    futuresContracts: {
      symbol: string;
      contractMonth: string;
      expirationDate: string;
      lastTradingDate: string;
      firstNoticeDate: string;
      lastNoticeDate: string;
      firstDeliveryDate: string;
      lastDeliveryDate: string;
      bidPrice: number;
      askPrice: number;
      lastPrice: number;
      settlementPrice: number;
      volume: number;
      openInterest: number;
      basis: number;
      costOfCarry: number;
      fairValue: number;
      premium: number;
      discount: number;
      daysToExpiration: number;
      daysToDelivery: number;
    }[];
    
    // Futures Chain
    futuresChain: {
      contractMonth: string;
      expirationDate: string;
      lastTradingDate: string;
      bidPrice: number;
      askPrice: number;
      lastPrice: number;
      settlementPrice: number;
      volume: number;
      openInterest: number;
      basis: number;
      costOfCarry: number;
      fairValue: number;
      premium: number;
      discount: number;
      daysToExpiration: number;
    }[];
  };
  
  // Position Information
  positionInfo: {
    // Current Positions
    currentPositions: {
      symbol: string;
      contractMonth: string;
      expirationDate: string;
      quantity: number;
      side: 'long' | 'short';
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      margin: number;
      marginRequirement: number;
      maintenanceMargin: number;
      marginUtilization: number;
      leverage: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    }[];
    
    // Position Summary
    positionSummary: {
      totalPositions: number;
      longPositions: number;
      shortPositions: number;
      totalQuantity: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      totalMargin: number;
      totalMarginRequirement: number;
      totalMaintenanceMargin: number;
      totalMarginUtilization: number;
      averageLeverage: number;
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
    };
    
    // Position Greeks
    positionGreeks: {
      delta: {
        total: number;
        long: number;
        short: number;
        neutral: boolean;
        directional: 'bullish' | 'bearish' | 'neutral';
      };
      gamma: {
        total: number;
        long: number;
        short: number;
        exposure: 'high' | 'medium' | 'low';
      };
      theta: {
        total: number;
        long: number;
        short: number;
        timeDecay: 'beneficial' | 'detrimental' | 'neutral';
      };
      vega: {
        total: number;
        long: number;
        short: number;
        volatilityExposure: 'long' | 'short' | 'neutral';
      };
    };
  };
  
  // Strategy Information
  strategyInfo: {
    // Strategy Type
    strategyType: {
      directional: 'long_futures' | 'short_futures' | 'spread_trading' | 'basis_trading';
      spreads: 'calendar_spread' | 'inter_commodity_spread' | 'inter_market_spread' | 'butterfly_spread';
      arbitrage: 'cash_and_carry' | 'reverse_cash_and_carry' | 'calendar_arbitrage' | 'cross_market_arbitrage';
      hedging: 'long_hedge' | 'short_hedge' | 'cross_hedge' | 'minimum_variance_hedge';
      custom: string;
    };
    
    // Strategy Parameters
    strategyParameters: {
      strategy: string;
      description: string;
      maxProfit: number;
      maxLoss: number;
      breakevenPoints: number[];
      probabilityOfProfit: number;
      daysToExpiration: number;
      expectedMove: number;
      riskRewardRatio: number;
      marginRequirement: number;
      leverage: number;
    };
    
    // Strategy Legs
    strategyLegs: {
      leg: number;
      symbol: string;
      contractMonth: string;
      expirationDate: string;
      quantity: number;
      side: 'buy' | 'sell';
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    }[];
    
    // Strategy Analysis
    strategyAnalysis: {
      profitLoss: {
        underlyingPrice: number;
        profitLoss: number;
        percentage: number;
      }[];
      riskMetrics: {
        maxProfit: number;
        maxLoss: number;
        breakevenPoints: number[];
        probabilityOfProfit: number;
        expectedValue: number;
        standardDeviation: number;
        var: number;
        cvar: number;
      };
      greeks: {
        delta: number;
        gamma: number;
        theta: number;
        vega: number;
      };
      timeDecay: {
        daysToExpiration: number;
        theta: number;
        timeValue: number;
        intrinsicValue: number;
      }[];
    };
  };
  
  // Market Data
  marketData: {
    // Historical Data
    historicalData: {
      date: string;
      underlyingPrice: number;
      futuresPrice: number;
      basis: number;
      volume: number;
      openInterest: number;
    }[];
    
    // Basis Data
    basisData: {
      historicalBasis: number;
      currentBasis: number;
      basisTrend: 'strengthening' | 'weakening' | 'stable';
      basisForecast: number;
      basisVolatility: number;
      basisCorrelation: number;
    };
    
    // Cost of Carry
    costOfCarry: {
      interestRate: number;
      storageCosts: number;
      insuranceCosts: number;
      transportationCosts: number;
      convenienceYield: number;
      totalCostOfCarry: number;
      fairValue: number;
      premium: number;
      discount: number;
    };
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      liquidityRegime: 'high' | 'medium' | 'low';
      contango: boolean;
      backwardation: boolean;
      marketSentiment: 'bullish' | 'bearish' | 'neutral';
      openInterest: number;
      volume: number;
    };
    
    // Economic Indicators
    economicIndicators: {
      interestRate: number;
      inflationRate: number;
      gdpGrowth: number;
      unemploymentRate: number;
      consumerConfidence: number;
      manufacturingIndex: number;
      housingStarts: number;
      retailSales: number;
      currencyStrength: number;
      commodityIndex: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Position Risk
    positionRisk: {
      deltaRisk: number;
      gammaRisk: number;
      thetaRisk: number;
      vegaRisk: number;
      basisRisk: number;
      deliveryRisk: number;
      totalRisk: number;
      riskScore: number;
    };
    
    // Portfolio Risk
    portfolioRisk: {
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    
    // Margin Risk
    marginRisk: {
      initialMargin: number;
      maintenanceMargin: number;
      currentMargin: number;
      marginUtilization: number;
      marginCall: boolean;
      marginCallAmount: number;
      marginBuffer: number;
      leverage: number;
      maxLeverage: number;
    };
    
    // Stress Testing
    stressTesting: {
      scenario: string;
      underlyingPriceChange: number;
      volatilityChange: number;
      basisChange: number;
      interestRateChange: number;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
      marginCall: boolean;
    }[];
    
    // Risk Limits
    riskLimits: {
      maxDelta: number;
      maxGamma: number;
      maxTheta: number;
      maxVega: number;
      maxPositionSize: number;
      maxPortfolioRisk: number;
      maxDrawdown: number;
      maxLeverage: number;
      maxMarginUtilization: number;
    };
  };
  
  // Pricing Models
  pricingModels: {
    // Cost of Carry Model
    costOfCarryModel: {
      spotPrice: number;
      interestRate: number;
      storageCosts: number;
      insuranceCosts: number;
      transportationCosts: number;
      convenienceYield: number;
      timeToExpiration: number;
      fairValue: number;
      premium: number;
      discount: number;
    };
    
    // Basis Model
    basisModel: {
      spotPrice: number;
      futuresPrice: number;
      basis: number;
      basisVolatility: number;
      basisCorrelation: number;
      basisForecast: number;
      basisRisk: number;
    };
    
    // Arbitrage Model
    arbitrageModel: {
      cashAndCarry: {
        spotPrice: number;
        futuresPrice: number;
        costOfCarry: number;
        arbitrageProfit: number;
        arbitrageThreshold: number;
        profitable: boolean;
      };
      reverseCashAndCarry: {
        spotPrice: number;
        futuresPrice: number;
        costOfCarry: number;
        arbitrageProfit: number;
        arbitrageThreshold: number;
        profitable: boolean;
      };
    };
    
    // Model Comparison
    modelComparison: {
      model: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      accuracy: number;
    }[];
  };
  
  // Greeks Analysis
  greeksAnalysis: {
    // Delta Analysis
    deltaAnalysis: {
      totalDelta: number;
      longDelta: number;
      shortDelta: number;
      deltaNeutral: boolean;
      deltaHedging: {
        requiredShares: number;
        hedgeCost: number;
        hedgeEffectiveness: number;
      };
      deltaExposure: {
        underlyingPrice: number;
        delta: number;
        exposure: number;
      }[];
    };
    
    // Gamma Analysis
    gammaAnalysis: {
      totalGamma: number;
      longGamma: number;
      shortGamma: number;
      gammaExposure: {
        underlyingPrice: number;
        gamma: number;
        exposure: number;
      }[];
      gammaScalping: {
        threshold: number;
        frequency: number;
        cost: number;
        benefit: number;
      };
    };
    
    // Theta Analysis
    thetaAnalysis: {
      totalTheta: number;
      longTheta: number;
      shortTheta: number;
      timeDecay: {
        daysToExpiration: number;
        theta: number;
        timeValue: number;
      }[];
      thetaDecay: {
        date: string;
        theta: number;
        cumulativeDecay: number;
      }[];
    };
    
    // Vega Analysis
    vegaAnalysis: {
      totalVega: number;
      longVega: number;
      shortVega: number;
      volatilityExposure: {
        volatilityChange: number;
        vega: number;
        exposure: number;
      }[];
      vegaHedging: {
        requiredOptions: number;
        hedgeCost: number;
        hedgeEffectiveness: number;
      };
    };
  };
  
  // Profit/Loss Analysis
  profitLossAnalysis: {
    // Profit/Loss Profile
    profitLossProfile: {
      underlyingPrice: number;
      profitLoss: number;
      percentage: number;
      breakeven: boolean;
    }[];
    
    // Risk/Reward Analysis
    riskRewardAnalysis: {
      maxProfit: number;
      maxLoss: number;
      breakevenPoints: number[];
      probabilityOfProfit: number;
      expectedValue: number;
      riskRewardRatio: number;
      sharpeRatio: number;
      sortinoRatio: number;
    };
    
    // Time Decay Analysis
    timeDecayAnalysis: {
      daysToExpiration: number;
      profitLoss: number;
      theta: number;
      timeValue: number;
      intrinsicValue: number;
    }[];
    
    // Basis Analysis
    basisAnalysis: {
      basis: number;
      profitLoss: number;
      basisRisk: number;
      basisExposure: number;
    }[];
  };
  
  // Trading Analysis
  tradingAnalysis: {
    // Entry Analysis
    entryAnalysis: {
      entryPrice: number;
      entryDate: string;
      entryConditions: {
        underlyingPrice: number;
        basis: number;
        marketSentiment: string;
        technicalIndicators: string[];
      };
      entryRationale: string;
      entryRisk: number;
    };
    
    // Exit Analysis
    exitAnalysis: {
      exitPrice: number;
      exitDate: string;
      exitReason: string;
      exitConditions: {
        underlyingPrice: number;
        basis: number;
        profitTarget: number;
        stopLoss: number;
        timeDecay: number;
      };
      exitEfficiency: number;
    };
    
    // Trade Management
    tradeManagement: {
      profitTargets: {
        level: number;
        percentage: number;
        action: string;
      }[];
      stopLosses: {
        level: number;
        percentage: number;
        action: string;
      }[];
      adjustments: {
        trigger: string;
        condition: string;
        action: string;
        cost: number;
      }[];
      rollover: {
        currentExpiration: string;
        newExpiration: string;
        cost: number;
        benefit: number;
      };
    };
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    // Hedge Ratio
    hedgeRatio: {
      optimalHedgeRatio: number;
      currentHedgeRatio: number;
      hedgeEffectiveness: number;
      minimumVarianceHedge: number;
      regressionHedge: number;
    };
    
    // Cross Hedging
    crossHedging: {
      correlation: number;
      hedgeRatio: number;
      hedgeEffectiveness: number;
      basisRisk: number;
      crossHedgeRisk: number;
    };
    
    // Dynamic Hedging
    dynamicHedging: {
      rebalancingFrequency: string;
      rebalancingThreshold: number;
      hedgingCosts: number;
      hedgingEffectiveness: number;
      trackingError: number;
    };
    
    // Hedge Performance
    hedgePerformance: {
      hedgeReturn: number;
      unhedgedReturn: number;
      hedgeEffectiveness: number;
      basisRisk: number;
      trackingError: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Price Scenarios
    priceScenarios: {
      scenario: string;
      underlyingPrice: number;
      probability: number;
      profitLoss: number;
      delta: number;
      gamma: number;
      theta: number;
    }[];
    
    // Basis Scenarios
    basisScenarios: {
      scenario: string;
      basis: number;
      probability: number;
      profitLoss: number;
      basisRisk: number;
    }[];
    
    // Volatility Scenarios
    volatilityScenarios: {
      scenario: string;
      volatility: number;
      probability: number;
      profitLoss: number;
      vega: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      description: string;
      probability: number;
      underlyingPrice: number;
      basis: number;
      volatility: number;
      profitLoss: number;
      risk: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePriceVolatility: boolean;
  includeBasisVolatility: boolean;
  includeJumpRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeRiskAnalysis: boolean;
    includeGreeksAnalysis: boolean;
    includeProfitLossAnalysis: boolean;
    includeTradingAnalysis: boolean;
    includeHedgingAnalysis: boolean;
    includePricingModels: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    underlyingPrice: number;
    futuresPrice: number;
    basis: number;
    profitLoss: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  }[];
  
  // Reporting Preferences
  includeRiskAnalysis: boolean;
  includeGreeksAnalysis: boolean;
  includeProfitLossAnalysis: boolean;
  includeTradingAnalysis: boolean;
  includeHedgingAnalysis: boolean;
  includePricingModels: boolean;
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

export interface FuturesTradingCalculatorResults {
  // Core Futures Metrics
  futuresPrice: number;
  basis: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  
  // Futures Analysis
  futuresAnalysis: {
    futuresPrice: number;
    basis: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    futuresBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    futuresEfficiency: number;
  };
  
  // Position Analysis
  positionAnalysis: {
    currentPositions: {
      symbol: string;
      contractMonth: string;
      expirationDate: string;
      quantity: number;
      side: string;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      margin: number;
      marginRequirement: number;
      maintenanceMargin: number;
      marginUtilization: number;
      leverage: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    }[];
    positionSummary: {
      totalPositions: number;
      longPositions: number;
      shortPositions: number;
      totalQuantity: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      totalMargin: number;
      totalMarginRequirement: number;
      totalMaintenanceMargin: number;
      totalMarginUtilization: number;
      averageLeverage: number;
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
    };
    positionGreeks: {
      delta: {
        total: number;
        long: number;
        short: number;
        neutral: boolean;
        directional: string;
      };
      gamma: {
        total: number;
        long: number;
        short: number;
        exposure: string;
      };
      theta: {
        total: number;
        long: number;
        short: number;
        timeDecay: string;
      };
      vega: {
        total: number;
        long: number;
        short: number;
        volatilityExposure: string;
      };
    };
    positionEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategyType: {
      directional: string;
      spreads: string;
      arbitrage: string;
      hedging: string;
      custom: string;
    };
    strategyParameters: {
      strategy: string;
      description: string;
      maxProfit: number;
      maxLoss: number;
      breakevenPoints: number[];
      probabilityOfProfit: number;
      daysToExpiration: number;
      expectedMove: number;
      riskRewardRatio: number;
      marginRequirement: number;
      leverage: number;
    };
    strategyLegs: {
      leg: number;
      symbol: string;
      contractMonth: string;
      expirationDate: string;
      quantity: number;
      side: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    }[];
    strategyAnalysis: {
      profitLoss: {
        underlyingPrice: number;
        profitLoss: number;
        percentage: number;
      }[];
      riskMetrics: {
        maxProfit: number;
        maxLoss: number;
        breakevenPoints: number[];
        probabilityOfProfit: number;
        expectedValue: number;
        standardDeviation: number;
        var: number;
        cvar: number;
      };
      greeks: {
        delta: number;
        gamma: number;
        theta: number;
        vega: number;
      };
      timeDecay: {
        daysToExpiration: number;
        theta: number;
        timeValue: number;
        intrinsicValue: number;
      }[];
    };
    strategyEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    positionRisk: {
      deltaRisk: number;
      gammaRisk: number;
      thetaRisk: number;
      vegaRisk: number;
      basisRisk: number;
      deliveryRisk: number;
      totalRisk: number;
      riskScore: number;
    };
    portfolioRisk: {
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    marginRisk: {
      initialMargin: number;
      maintenanceMargin: number;
      currentMargin: number;
      marginUtilization: number;
      marginCall: boolean;
      marginCallAmount: number;
      marginBuffer: number;
      leverage: number;
      maxLeverage: number;
    };
    stressTesting: {
      scenario: string;
      underlyingPriceChange: number;
      volatilityChange: number;
      basisChange: number;
      interestRateChange: number;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
      marginCall: boolean;
    }[];
    riskLimits: {
      maxDelta: number;
      maxGamma: number;
      maxTheta: number;
      maxVega: number;
      maxPositionSize: number;
      maxPortfolioRisk: number;
      maxDrawdown: number;
      maxLeverage: number;
      maxMarginUtilization: number;
    };
    riskEfficiency: number;
  };
  
  // Pricing Models Analysis
  pricingModelsAnalysis: {
    costOfCarryModel: {
      spotPrice: number;
      interestRate: number;
      storageCosts: number;
      insuranceCosts: number;
      transportationCosts: number;
      convenienceYield: number;
      timeToExpiration: number;
      fairValue: number;
      premium: number;
      discount: number;
    };
    basisModel: {
      spotPrice: number;
      futuresPrice: number;
      basis: number;
      basisVolatility: number;
      basisCorrelation: number;
      basisForecast: number;
      basisRisk: number;
    };
    arbitrageModel: {
      cashAndCarry: {
        spotPrice: number;
        futuresPrice: number;
        costOfCarry: number;
        arbitrageProfit: number;
        arbitrageThreshold: number;
        profitable: boolean;
      };
      reverseCashAndCarry: {
        spotPrice: number;
        futuresPrice: number;
        costOfCarry: number;
        arbitrageProfit: number;
        arbitrageThreshold: number;
        profitable: boolean;
      };
    };
    modelComparison: {
      model: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      accuracy: number;
    }[];
    pricingEfficiency: number;
  };
  
  // Greeks Analysis
  greeksAnalysis: {
    deltaAnalysis: {
      totalDelta: number;
      longDelta: number;
      shortDelta: number;
      deltaNeutral: boolean;
      deltaHedging: {
        requiredShares: number;
        hedgeCost: number;
        hedgeEffectiveness: number;
      };
      deltaExposure: {
        underlyingPrice: number;
        delta: number;
        exposure: number;
      }[];
    };
    gammaAnalysis: {
      totalGamma: number;
      longGamma: number;
      shortGamma: number;
      gammaExposure: {
        underlyingPrice: number;
        gamma: number;
        exposure: number;
      }[];
      gammaScalping: {
        threshold: number;
        frequency: number;
        cost: number;
        benefit: number;
      };
    };
    thetaAnalysis: {
      totalTheta: number;
      longTheta: number;
      shortTheta: number;
      timeDecay: {
        daysToExpiration: number;
        theta: number;
        timeValue: number;
      }[];
      thetaDecay: {
        date: string;
        theta: number;
        cumulativeDecay: number;
      }[];
    };
    vegaAnalysis: {
      totalVega: number;
      longVega: number;
      shortVega: number;
      volatilityExposure: {
        volatilityChange: number;
        vega: number;
        exposure: number;
      }[];
      vegaHedging: {
        requiredOptions: number;
        hedgeCost: number;
        hedgeEffectiveness: number;
      };
    };
    greeksEfficiency: number;
  };
  
  // Profit/Loss Analysis
  profitLossAnalysis: {
    profitLossProfile: {
      underlyingPrice: number;
      profitLoss: number;
      percentage: number;
      breakeven: boolean;
    }[];
    riskRewardAnalysis: {
      maxProfit: number;
      maxLoss: number;
      breakevenPoints: number[];
      probabilityOfProfit: number;
      expectedValue: number;
      riskRewardRatio: number;
      sharpeRatio: number;
      sortinoRatio: number;
    };
    timeDecayAnalysis: {
      daysToExpiration: number;
      profitLoss: number;
      theta: number;
      timeValue: number;
      intrinsicValue: number;
    }[];
    basisAnalysis: {
      basis: number;
      profitLoss: number;
      basisRisk: number;
      basisExposure: number;
    }[];
    profitLossEfficiency: number;
  };
  
  // Trading Analysis
  tradingAnalysis: {
    entryAnalysis: {
      entryPrice: number;
      entryDate: string;
      entryConditions: {
        underlyingPrice: number;
        basis: number;
        marketSentiment: string;
        technicalIndicators: string[];
      };
      entryRationale: string;
      entryRisk: number;
    };
    exitAnalysis: {
      exitPrice: number;
      exitDate: string;
      exitReason: string;
      exitConditions: {
        underlyingPrice: number;
        basis: number;
        profitTarget: number;
        stopLoss: number;
        timeDecay: number;
      };
      exitEfficiency: number;
    };
    tradeManagement: {
      profitTargets: {
        level: number;
        percentage: number;
        action: string;
      }[];
      stopLosses: {
        level: number;
        percentage: number;
        action: string;
      }[];
      adjustments: {
        trigger: string;
        condition: string;
        action: string;
        cost: number;
      }[];
      rollover: {
        currentExpiration: string;
        newExpiration: string;
        cost: number;
        benefit: number;
      };
    };
    tradingEfficiency: number;
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    hedgeRatio: {
      optimalHedgeRatio: number;
      currentHedgeRatio: number;
      hedgeEffectiveness: number;
      minimumVarianceHedge: number;
      regressionHedge: number;
    };
    crossHedging: {
      correlation: number;
      hedgeRatio: number;
      hedgeEffectiveness: number;
      basisRisk: number;
      crossHedgeRisk: number;
    };
    dynamicHedging: {
      rebalancingFrequency: string;
      rebalancingThreshold: number;
      hedgingCosts: number;
      hedgingEffectiveness: number;
      trackingError: number;
    };
    hedgePerformance: {
      hedgeReturn: number;
      unhedgedReturn: number;
      hedgeEffectiveness: number;
      basisRisk: number;
      trackingError: number;
    };
    hedgingEfficiency: number;
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
    description: string;
    probability: number;
    underlyingPrice: number;
    basis: number;
    profitLoss: number;
    risk: number;
    recommendation: string;
  }[];
  
  // Futures Trading Planning Analysis
  futuresTradingPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    tradingStrategies: {
      strategy: string;
      description: string;
      expectedImprovement: number;
      implementationSteps: string[];
      timeline: string;
    }[];
    planningEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeStrategies: {
      strategy: string;
      expectedReturn: number;
      risk: number;
      efficiency: number;
    }[];
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      strategyReturn: number;
      outperformance: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Futures Trading Score
  futuresTradingScore: {
    overallScore: number;
    componentScores: {
      position: number;
      strategy: number;
      risk: number;
      greeks: number;
      profitLoss: number;
      trading: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
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
    historicalBasis: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    returnEnhancement: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
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
    futuresPrice: number;
    basis: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedImprovement: number;
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
