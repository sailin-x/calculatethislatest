export interface DerivativesCalculatorInputs {
  // Derivatives Information
  derivativesInfo: {
    // Basic Information
    basicInfo: {
      derivativeName: string;
      derivativeSymbol: string;
      derivativeType: 'option' | 'future' | 'forward' | 'swap' | 'warrant' | 'convertible';
      underlyingAsset: string;
      underlyingSymbol: string;
      underlyingPrice: number;
      underlyingVolatility: number;
      underlyingDividendYield: number;
      riskFreeRate: number;
      timeToExpiration: number;
      strikePrice: number;
      optionType: 'call' | 'put' | 'binary' | 'barrier' | 'asian' | 'lookback';
      contractSize: number;
      tickSize: number;
      minimumTick: number;
      marginRequirement: number;
      maintenanceMargin: number;
      initialMargin: number;
    };
    
    // Option Details
    optionDetails: {
      optionStyle: 'american' | 'european' | 'bermudan';
      exerciseType: 'physical' | 'cash';
      settlementType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'expiry';
      premium: number;
      intrinsicValue: number;
      timeValue: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      impliedVolatility: number;
      historicalVolatility: number;
      volatilitySkew: number;
      volatilitySurface: {
        strike: number;
        expiration: number;
        volatility: number;
      }[];
    };
    
    // Future Details
    futureDetails: {
      deliveryMonth: string;
      lastTradingDate: string;
      firstNoticeDate: string;
      lastNoticeDate: string;
      firstDeliveryDate: string;
      lastDeliveryDate: string;
      settlementPrice: number;
      basis: number;
      costOfCarry: number;
      fairValue: number;
      premium: number;
      discount: number;
      daysToExpiration: number;
      daysToDelivery: number;
    };
    
    // Swap Details
    swapDetails: {
      swapType: 'interest_rate' | 'currency' | 'credit_default' | 'commodity' | 'equity';
      notionalAmount: number;
      fixedRate: number;
      floatingRate: number;
      paymentFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
      dayCountConvention: '30/360' | 'actual/360' | 'actual/365' | 'actual/actual';
      startDate: string;
      endDate: string;
      nextPaymentDate: string;
      lastPaymentDate: string;
      paymentSchedule: {
        date: string;
        fixedPayment: number;
        floatingPayment: number;
        netPayment: number;
      }[];
    };
    
    // Barrier Option Details
    barrierOptionDetails: {
      barrierType: 'up_and_out' | 'up_and_in' | 'down_and_out' | 'down_and_in';
      barrierLevel: number;
      rebate: number;
      barrierHit: boolean;
      barrierHitDate: string;
      barrierProbability: number;
    };
    
    // Asian Option Details
    asianOptionDetails: {
      averagingType: 'arithmetic' | 'geometric';
      averagingPeriod: 'daily' | 'weekly' | 'monthly';
      averagingStartDate: string;
      averagingEndDate: string;
      currentAverage: number;
      remainingObservations: number;
    };
    
    // Lookback Option Details
    lookbackOptionDetails: {
      lookbackType: 'fixed_strike' | 'floating_strike';
      lookbackPeriod: string;
      maximumPrice: number;
      minimumPrice: number;
      lookbackStartDate: string;
      lookbackEndDate: string;
    };
  };
  
  // Position Information
  positionInfo: {
    // Current Positions
    currentPositions: {
      derivativeSymbol: string;
      derivativeName: string;
      derivativeType: string;
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
      rho: number;
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
      totalRho: number;
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
      rho: {
        total: number;
        long: number;
        short: number;
        interestRateExposure: 'long' | 'short' | 'neutral';
      };
    };
    
    // Position Analysis
    positionAnalysis: {
      derivativeTypeAllocation: {
        type: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
      underlyingAllocation: {
        underlying: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
      expirationAllocation: {
        expirationRange: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
      strategyAllocation: {
        strategy: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
    };
  };
  
  // Strategy Information
  strategyInfo: {
    // Strategy Type
    strategyType: {
      directional: 'long_call' | 'long_put' | 'short_call' | 'short_put' | 'long_future' | 'short_future';
      spreads: 'bull_spread' | 'bear_spread' | 'butterfly_spread' | 'calendar_spread' | 'diagonal_spread';
      straddles: 'long_straddle' | 'short_straddle' | 'long_strangle' | 'short_strangle';
      combinations: 'iron_condor' | 'iron_butterfly' | 'jade_lizard' | 'broken_wing_butterfly';
      arbitrage: 'statistical_arbitrage' | 'pairs_trading' | 'conversion_reversal' | 'box_spread';
      hedging: 'delta_hedge' | 'gamma_hedge' | 'vega_hedge' | 'portfolio_hedge';
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
      stopLoss: number;
      takeProfit: number;
      trailingStop: number;
    };
    
    // Strategy Legs
    strategyLegs: {
      leg: number;
      derivativeSymbol: string;
      derivativeType: string;
      side: 'buy' | 'sell';
      quantity: number;
      strikePrice: number;
      expirationDate: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
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
        rho: number;
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
      derivativePrice: number;
      volume: number;
      openInterest: number;
      impliedVolatility: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    }[];
    
    // Volatility Data
    volatilityData: {
      strike: number;
      expiration: number;
      impliedVolatility: number;
      historicalVolatility: number;
      volatilitySkew: number;
      volatilitySurface: {
        strike: number;
        expiration: number;
        volatility: number;
      }[];
    };
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      liquidityRegime: 'high' | 'medium' | 'low';
      marketSentiment: 'bullish' | 'bearish' | 'neutral';
      riskAppetite: 'high' | 'medium' | 'low';
      volatilityIndex: number;
      fearGreedIndex: number;
      putCallRatio: number;
    };
    
    // Economic Indicators
    economicIndicators: {
      date: string;
      interestRate: number;
      inflationRate: number;
      gdpGrowth: number;
      unemploymentRate: number;
      consumerConfidence: number;
      businessConfidence: number;
      manufacturingIndex: number;
      servicesIndex: number;
      housingStarts: number;
      retailSales: number;
      industrialProduction: number;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Position Risk
    positionRisk: {
      deltaRisk: number;
      gammaRisk: number;
      thetaRisk: number;
      vegaRisk: number;
      rhoRisk: number;
      volatilityRisk: number;
      correlationRisk: number;
      liquidityRisk: number;
      totalRisk: number;
      riskScore: number;
    };
    
    // Portfolio Risk
    portfolioRisk: {
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      totalRho: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    
    // Greeks Risk
    greeksRisk: {
      delta: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      gamma: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      theta: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      vega: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      rho: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
    };
    
    // Volatility Risk
    volatilityRisk: {
      impliedVolatility: number;
      historicalVolatility: number;
      volatilitySkew: number;
      volatilitySurface: {
        strike: number;
        expiration: number;
        volatility: number;
        risk: number;
      }[];
      volatilityRisk: number;
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
      interestRateChange: number;
      timeDecay: number;
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
      maxRho: number;
      maxPositionSize: number;
      maxPortfolioRisk: number;
      maxDrawdown: number;
      maxLeverage: number;
      maxMarginUtilization: number;
    };
  };
  
  // Pricing Models
  pricingModels: {
    // Black-Scholes Model
    blackScholesModel: {
      underlyingPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionType: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
    };
    
    // Binomial Model
    binomialModel: {
      underlyingPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionType: string;
      timeSteps: number;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
    };
    
    // Monte Carlo Model
    monteCarloModel: {
      underlyingPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionType: string;
      simulations: number;
      timeSteps: number;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
    };
    
    // Model Comparison
    modelComparison: {
      model: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
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
    
    // Rho Analysis
    rhoAnalysis: {
      totalRho: number;
      longRho: number;
      shortRho: number;
      interestRateExposure: {
        interestRateChange: number;
        rho: number;
        exposure: number;
      }[];
      rhoHedging: {
        requiredInstruments: number;
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
    
    // Volatility Analysis
    volatilityAnalysis: {
      volatility: number;
      profitLoss: number;
      vega: number;
      volatilityExposure: number;
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
        impliedVolatility: number;
        technicalSignal: string;
        fundamentalSignal: string;
        marketSentiment: string;
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
        impliedVolatility: number;
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
    // Delta Hedging
    deltaHedging: {
      targetDelta: number;
      currentDelta: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Gamma Hedging
    gammaHedging: {
      targetGamma: number;
      currentGamma: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Vega Hedging
    vegaHedging: {
      targetVega: number;
      currentVega: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Portfolio Hedging
    portfolioHedging: {
      portfolioValue: number;
      deltaExposure: number;
      gammaExposure: number;
      vegaExposure: number;
      hedgeRatio: number;
      hedgeInstruments: string[];
      hedgeCost: number;
      hedgeEffectiveness: number;
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
      hedgeCost: number;
      netBenefit: number;
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
    
    // Volatility Scenarios
    volatilityScenarios: {
      scenario: string;
      volatility: number;
      probability: number;
      profitLoss: number;
      vega: number;
    }[];
    
    // Interest Rate Scenarios
    interestRateScenarios: {
      scenario: string;
      interestRate: number;
      probability: number;
      profitLoss: number;
      rho: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      description: string;
      probability: number;
      underlyingPrice: number;
      volatility: number;
      interestRate: number;
      profitLoss: number;
      risk: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePriceVolatility: boolean;
  includeVolatilityVolatility: boolean;
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
    includePricingModels: boolean;
    includeGreeksAnalysis: boolean;
    includeProfitLossAnalysis: boolean;
    includeTradingAnalysis: boolean;
    includeHedgingAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    underlyingPrice: number;
    derivativePrice: number;
    profitLoss: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  }[];
  
  // Reporting Preferences
  includeRiskAnalysis: boolean;
  includePricingModels: boolean;
  includeGreeksAnalysis: boolean;
  includeProfitLossAnalysis: boolean;
  includeTradingAnalysis: boolean;
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

export interface DerivativesCalculatorResults {
  // Core Derivatives Metrics
  price: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  
  // Derivatives Analysis
  derivativesAnalysis: {
    price: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
    derivativesBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    derivativesEfficiency: number;
  };
  
  // Position Analysis
  positionAnalysis: {
    currentPositions: {
      derivativeSymbol: string;
      derivativeName: string;
      derivativeType: string;
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
      rho: number;
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
      totalRho: number;
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
      rho: {
        total: number;
        long: number;
        short: number;
        interestRateExposure: string;
      };
    };
    positionAnalysis: {
      derivativeTypeAllocation: {
        type: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
      underlyingAllocation: {
        underlying: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
      expirationAllocation: {
        expirationRange: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
      strategyAllocation: {
        strategy: string;
        marketValue: number;
        percentage: number;
        risk: number;
      }[];
    };
    positionEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategyType: {
      directional: string;
      spreads: string;
      straddles: string;
      combinations: string;
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
      stopLoss: number;
      takeProfit: number;
      trailingStop: number;
    };
    strategyLegs: {
      leg: number;
      derivativeSymbol: string;
      derivativeType: string;
      side: string;
      quantity: number;
      strikePrice: number;
      expirationDate: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
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
        rho: number;
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
      rhoRisk: number;
      volatilityRisk: number;
      correlationRisk: number;
      liquidityRisk: number;
      totalRisk: number;
      riskScore: number;
    };
    portfolioRisk: {
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      totalRho: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    greeksRisk: {
      delta: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      gamma: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      theta: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      vega: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
      rho: {
        exposure: number;
        risk: number;
        sensitivity: number;
      };
    };
    volatilityRisk: {
      impliedVolatility: number;
      historicalVolatility: number;
      volatilitySkew: number;
      volatilitySurface: {
        strike: number;
        expiration: number;
        volatility: number;
        risk: number;
      }[];
      volatilityRisk: number;
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
      interestRateChange: number;
      timeDecay: number;
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
      maxRho: number;
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
    blackScholesModel: {
      underlyingPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionType: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
    };
    binomialModel: {
      underlyingPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionType: string;
      timeSteps: number;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
    };
    monteCarloModel: {
      underlyingPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionType: string;
      simulations: number;
      timeSteps: number;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
    };
    modelComparison: {
      model: string;
      price: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
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
    rhoAnalysis: {
      totalRho: number;
      longRho: number;
      shortRho: number;
      interestRateExposure: {
        interestRateChange: number;
        rho: number;
        exposure: number;
      }[];
      rhoHedging: {
        requiredInstruments: number;
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
    volatilityAnalysis: {
      volatility: number;
      profitLoss: number;
      vega: number;
      volatilityExposure: number;
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
        impliedVolatility: number;
        technicalSignal: string;
        fundamentalSignal: string;
        marketSentiment: string;
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
        impliedVolatility: number;
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
    deltaHedging: {
      targetDelta: number;
      currentDelta: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    gammaHedging: {
      targetGamma: number;
      currentGamma: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    vegaHedging: {
      targetVega: number;
      currentVega: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    portfolioHedging: {
      portfolioValue: number;
      deltaExposure: number;
      gammaExposure: number;
      vegaExposure: number;
      hedgeRatio: number;
      hedgeInstruments: string[];
      hedgeCost: number;
      hedgeEffectiveness: number;
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
      hedgeCost: number;
      netBenefit: number;
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
    profitLoss: number;
    risk: number;
    recommendation: string;
  }[];
  
  // Derivatives Trading Planning Analysis
  derivativesTradingPlanningAnalysis: {
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
  
  // Derivatives Trading Score
  derivativesTradingScore: {
    overallScore: number;
    componentScores: {
      position: number;
      strategy: number;
      risk: number;
      pricing: number;
      greeks: number;
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
    historicalVolatility: number;
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
    derivativesAssessment: string;
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
    price: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
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
