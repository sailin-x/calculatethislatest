export interface OptionsTradingCalculatorInputs {
  // Options Information
  optionsInfo: {
    // Basic Information
    basicInfo: {
      underlyingAsset: string;
      underlyingSymbol: string;
      underlyingPrice: number;
      underlyingVolatility: number;
      underlyingDividendYield: number;
      riskFreeRate: number;
      optionType: 'call' | 'put' | 'both';
      optionStyle: 'american' | 'european' | 'bermudan';
      contractSize: number;
      multiplier: number;
      tickSize: number;
      minimumTick: number;
    };
    
    // Option Contracts
    optionContracts: {
      symbol: string;
      strikePrice: number;
      expirationDate: string;
      optionType: 'call' | 'put';
      bidPrice: number;
      askPrice: number;
      lastPrice: number;
      volume: number;
      openInterest: number;
      impliedVolatility: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      intrinsicValue: number;
      timeValue: number;
      inTheMoney: boolean;
      outOfTheMoney: boolean;
      atTheMoney: boolean;
      daysToExpiration: number;
    }[];
    
    // Option Chain
    optionChain: {
      expirationDate: string;
      calls: {
        strikePrice: number;
        bidPrice: number;
        askPrice: number;
        lastPrice: number;
        volume: number;
        openInterest: number;
        impliedVolatility: number;
        delta: number;
        gamma: number;
        theta: number;
        vega: number;
        rho: number;
        intrinsicValue: number;
        timeValue: number;
      }[];
      puts: {
        strikePrice: number;
        bidPrice: number;
        askPrice: number;
        lastPrice: number;
        volume: number;
        openInterest: number;
        impliedVolatility: number;
        delta: number;
        gamma: number;
        theta: number;
        vega: number;
        rho: number;
        intrinsicValue: number;
        timeValue: number;
      }[];
    }[];
  };
  
  // Position Information
  positionInfo: {
    // Current Positions
    currentPositions: {
      symbol: string;
      optionType: 'call' | 'put';
      strikePrice: number;
      expirationDate: string;
      quantity: number;
      side: 'long' | 'short';
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      margin: number;
      marginRequirement: number;
    }[];
    
    // Position Summary
    positionSummary: {
      totalPositions: number;
      longPositions: number;
      shortPositions: number;
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      totalRho: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      totalMargin: number;
      totalMarginRequirement: number;
      marginUtilization: number;
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
  };
  
  // Strategy Information
  strategyInfo: {
    // Strategy Type
    strategyType: {
      basic: 'long_call' | 'long_put' | 'short_call' | 'short_put' | 'covered_call' | 'protective_put';
      spreads: 'bull_call_spread' | 'bear_put_spread' | 'iron_condor' | 'butterfly_spread' | 'calendar_spread' | 'diagonal_spread';
      straddles: 'long_straddle' | 'short_straddle' | 'long_strangle' | 'short_strangle';
      combinations: 'collar' | 'fence' | 'box_spread' | 'jade_lizard' | 'iron_butterfly';
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
      impliedVolatility: number;
      expectedMove: number;
      riskRewardRatio: number;
      marginRequirement: number;
    };
    
    // Strategy Legs
    strategyLegs: {
      leg: number;
      symbol: string;
      optionType: 'call' | 'put';
      strikePrice: number;
      expirationDate: string;
      quantity: number;
      side: 'buy' | 'sell';
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
      impliedVolatility: number;
      optionPrice: number;
      volume: number;
      openInterest: number;
    }[];
    
    // Volatility Data
    volatilityData: {
      historicalVolatility: number;
      impliedVolatility: number;
      volatilitySkew: {
        strikePrice: number;
        impliedVolatility: number;
        moneyness: number;
      }[];
      volatilitySurface: {
        expirationDate: string;
        strikePrice: number;
        impliedVolatility: number;
      }[];
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      volatilityForecast: number;
    };
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      liquidityRegime: 'high' | 'medium' | 'low';
      fearGreedIndex: number;
      marketSentiment: 'fear' | 'greed' | 'neutral';
      putCallRatio: number;
      vix: number;
      vixFutures: {
        month: string;
        price: number;
        contango: number;
        backwardation: number;
      }[];
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
      rhoRisk: number;
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
    
    // Stress Testing
    stressTesting: {
      scenario: string;
      underlyingPriceChange: number;
      volatilityChange: number;
      timeDecay: number;
      interestRateChange: number;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
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
      optionType: 'call' | 'put';
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
      optionType: 'call' | 'put';
      steps: number;
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
      optionType: 'call' | 'put';
      simulations: number;
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
        rateChange: number;
        rho: number;
        exposure: number;
      }[];
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
      impliedVolatility: number;
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
      vega: number;
    }[];
    
    // Volatility Scenarios
    volatilityScenarios: {
      scenario: string;
      impliedVolatility: number;
      probability: number;
      profitLoss: number;
      vega: number;
      gamma: number;
    }[];
    
    // Time Scenarios
    timeScenarios: {
      scenario: string;
      daysToExpiration: number;
      probability: number;
      profitLoss: number;
      theta: number;
      timeValue: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      description: string;
      probability: number;
      underlyingPrice: number;
      impliedVolatility: number;
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
    includeGreeksAnalysis: boolean;
    includeProfitLossAnalysis: boolean;
    includeTradingAnalysis: boolean;
    includePricingModels: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    underlyingPrice: number;
    optionPrice: number;
    impliedVolatility: number;
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

export interface OptionsTradingCalculatorResults {
  // Core Options Metrics
  optionPrice: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  
  // Options Analysis
  optionsAnalysis: {
    optionPrice: number;
    impliedVolatility: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    optionsBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    optionsEfficiency: number;
  };
  
  // Position Analysis
  positionAnalysis: {
    currentPositions: {
      symbol: string;
      optionType: string;
      strikePrice: number;
      expirationDate: string;
      quantity: number;
      side: string;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      margin: number;
      marginRequirement: number;
    }[];
    positionSummary: {
      totalPositions: number;
      longPositions: number;
      shortPositions: number;
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      totalRho: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      totalMargin: number;
      totalMarginRequirement: number;
      marginUtilization: number;
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
    positionEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategyType: {
      basic: string;
      spreads: string;
      straddles: string;
      combinations: string;
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
      impliedVolatility: number;
      expectedMove: number;
      riskRewardRatio: number;
      marginRequirement: number;
    };
    strategyLegs: {
      leg: number;
      symbol: string;
      optionType: string;
      strikePrice: number;
      expirationDate: string;
      quantity: number;
      side: string;
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
    stressTesting: {
      scenario: string;
      underlyingPriceChange: number;
      volatilityChange: number;
      timeDecay: number;
      interestRateChange: number;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
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
      steps: number;
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
        rateChange: number;
        rho: number;
        exposure: number;
      }[];
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
      impliedVolatility: number;
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
    impliedVolatility: number;
    profitLoss: number;
    risk: number;
    recommendation: string;
  }[];
  
  // Options Trading Planning Analysis
  optionsTradingPlanningAnalysis: {
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
  
  // Options Trading Score
  optionsTradingScore: {
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
    optionsAssessment: string;
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
