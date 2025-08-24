export interface ForexTradingCalculatorInputs {
  // Forex Information
  forexInfo: {
    // Basic Information
    basicInfo: {
      baseCurrency: string;
      quoteCurrency: string;
      currencyPair: string;
      exchangeRate: number;
      bidPrice: number;
      askPrice: number;
      spread: number;
      pipValue: number;
      lotSize: number;
      marginRequirement: number;
      leverage: number;
      swapRate: number;
      rolloverRate: number;
    };
    
    // Currency Pairs
    currencyPairs: {
      pair: string;
      baseCurrency: string;
      quoteCurrency: string;
      exchangeRate: number;
      bidPrice: number;
      askPrice: number;
      spread: number;
      pipValue: number;
      lotSize: number;
      marginRequirement: number;
      leverage: number;
      swapRate: number;
      rolloverRate: number;
      volatility: number;
      correlation: number;
      liquidity: 'high' | 'medium' | 'low';
      tradingHours: string;
      spreadType: 'fixed' | 'variable' | 'commission';
    }[];
    
    // Currency Information
    currencyInfo: {
      currency: string;
      country: string;
      centralBank: string;
      interestRate: number;
      inflationRate: number;
      gdpGrowth: number;
      unemploymentRate: number;
      tradeBalance: number;
      currentAccount: number;
      foreignReserves: number;
      debtToGdp: number;
      creditRating: string;
      politicalStability: number;
      economicFreedom: number;
    }[];
    
    // Exchange Rate Data
    exchangeRateData: {
      pair: string;
      date: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
      change: number;
      changePercent: number;
    }[];
  };
  
  // Position Information
  positionInfo: {
    // Current Positions
    currentPositions: {
      pair: string;
      side: 'long' | 'short';
      lotSize: number;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      margin: number;
      marginRequirement: number;
      marginUtilization: number;
      leverage: number;
      swap: number;
      rollover: number;
      pipValue: number;
      pipPnL: number;
    }[];
    
    // Position Summary
    positionSummary: {
      totalPositions: number;
      longPositions: number;
      shortPositions: number;
      totalLotSize: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      totalMargin: number;
      totalMarginRequirement: number;
      totalMarginUtilization: number;
      averageLeverage: number;
      totalSwap: number;
      totalRollover: number;
      netExposure: number;
      currencyExposure: {
        currency: string;
        exposure: number;
        percentage: number;
      }[];
    };
    
    // Position Analysis
    positionAnalysis: {
      currencyExposure: {
        currency: string;
        longExposure: number;
        shortExposure: number;
        netExposure: number;
        percentage: number;
      }[];
      correlationAnalysis: {
        pair1: string;
        pair2: string;
        correlation: number;
        impact: number;
      }[];
      riskConcentration: {
        currency: string;
        concentration: number;
        risk: number;
      }[];
    };
  };
  
  // Strategy Information
  strategyInfo: {
    // Strategy Type
    strategyType: {
      directional: 'trend_following' | 'mean_reversion' | 'breakout' | 'momentum';
      carry: 'interest_rate_carry' | 'dividend_carry' | 'yield_carry';
      arbitrage: 'triangular_arbitrage' | 'statistical_arbitrage' | 'covered_interest_arbitrage';
      hedging: 'currency_hedge' | 'portfolio_hedge' | 'transaction_hedge';
      scalping: 'high_frequency' | 'news_trading' | 'technical_scalping';
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
      holdingPeriod: number;
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
      pair: string;
      side: 'buy' | 'sell';
      lotSize: number;
      price: number;
      stopLoss: number;
      takeProfit: number;
      entryCondition: string;
      exitCondition: string;
    }[];
    
    // Strategy Analysis
    strategyAnalysis: {
      profitLoss: {
        exchangeRate: number;
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
      currencyExposure: {
        currency: string;
        exposure: number;
        risk: number;
      }[];
      correlationImpact: {
        pair1: string;
        pair2: string;
        correlation: number;
        impact: number;
      }[];
    };
  };
  
  // Market Data
  marketData: {
    // Historical Data
    historicalData: {
      date: string;
      pair: string;
      open: number;
      high: number;
      low: number;
      close: number;
      volume: number;
      change: number;
      changePercent: number;
    }[];
    
    // Economic Data
    economicData: {
      currency: string;
      date: string;
      interestRate: number;
      inflationRate: number;
      gdpGrowth: number;
      unemploymentRate: number;
      tradeBalance: number;
      currentAccount: number;
      consumerPriceIndex: number;
      producerPriceIndex: number;
      retailSales: number;
      industrialProduction: number;
      manufacturingIndex: number;
      servicesIndex: number;
      consumerConfidence: number;
      businessConfidence: number;
    }[];
    
    // Central Bank Data
    centralBankData: {
      currency: string;
      centralBank: string;
      lastMeeting: string;
      nextMeeting: string;
      currentRate: number;
      previousRate: number;
      change: number;
      outlook: 'hawkish' | 'dovish' | 'neutral';
      minutes: string;
      pressConference: boolean;
      economicProjections: {
        gdp: number;
        inflation: number;
        unemployment: number;
      };
    }[];
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      liquidityRegime: 'high' | 'medium' | 'low';
      marketSentiment: 'bullish' | 'bearish' | 'neutral';
      riskAppetite: 'high' | 'medium' | 'low';
      safeHavenDemand: 'high' | 'medium' | 'low';
      carryTradeDemand: 'high' | 'medium' | 'low';
      volatilityIndex: number;
      fearGreedIndex: number;
    };
    
    // Technical Indicators
    technicalIndicators: {
      pair: string;
      date: string;
      movingAverages: {
        sma20: number;
        sma50: number;
        sma200: number;
        ema12: number;
        ema26: number;
      };
      oscillators: {
        rsi: number;
        stochastics: number;
        macd: number;
        williamsR: number;
        cci: number;
      };
      supportResistance: {
        support1: number;
        support2: number;
        resistance1: number;
        resistance2: number;
        pivotPoint: number;
      };
      volatility: {
        atr: number;
        bollingerBands: {
          upper: number;
          middle: number;
          lower: number;
        };
        standardDeviation: number;
      };
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Position Risk
    positionRisk: {
      currencyRisk: number;
      interestRateRisk: number;
      politicalRisk: number;
      liquidityRisk: number;
      correlationRisk: number;
      leverageRisk: number;
      totalRisk: number;
      riskScore: number;
    };
    
    // Portfolio Risk
    portfolioRisk: {
      totalCurrencyExposure: number;
      totalInterestRateExposure: number;
      totalPoliticalExposure: number;
      totalLiquidityExposure: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    
    // Currency Risk
    currencyRisk: {
      currency: string;
      exposure: number;
      volatility: number;
      risk: number;
      correlation: number;
      diversification: number;
    }[];
    
    // Interest Rate Risk
    interestRateRisk: {
      currency: string;
      exposure: number;
      interestRate: number;
      risk: number;
      carry: number;
      rollover: number;
    }[];
    
    // Political Risk
    politicalRisk: {
      country: string;
      currency: string;
      politicalStability: number;
      economicFreedom: number;
      creditRating: string;
      risk: number;
    }[];
    
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
      exchangeRateChange: number;
      volatilityChange: number;
      interestRateChange: number;
      politicalShock: boolean;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
      marginCall: boolean;
    }[];
    
    // Risk Limits
    riskLimits: {
      maxCurrencyExposure: number;
      maxInterestRateExposure: number;
      maxPoliticalExposure: number;
      maxPositionSize: number;
      maxPortfolioRisk: number;
      maxDrawdown: number;
      maxLeverage: number;
      maxMarginUtilization: number;
    };
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    // Economic Indicators
    economicIndicators: {
      currency: string;
      indicator: string;
      value: number;
      previous: number;
      expected: number;
      impact: 'positive' | 'negative' | 'neutral';
      importance: 'high' | 'medium' | 'low';
      releaseDate: string;
      nextRelease: string;
    }[];
    
    // Interest Rate Analysis
    interestRateAnalysis: {
      currency: string;
      currentRate: number;
      previousRate: number;
      change: number;
      nextMeeting: string;
      expectedChange: number;
      probability: number;
      impact: number;
    }[];
    
    // Inflation Analysis
    inflationAnalysis: {
      currency: string;
      currentInflation: number;
      targetInflation: number;
      difference: number;
      trend: 'increasing' | 'decreasing' | 'stable';
      impact: number;
    }[];
    
    // Growth Analysis
    growthAnalysis: {
      currency: string;
      currentGrowth: number;
      expectedGrowth: number;
      trend: 'increasing' | 'decreasing' | 'stable';
      impact: number;
    }[];
    
    // Trade Analysis
    tradeAnalysis: {
      currency: string;
      tradeBalance: number;
      currentAccount: number;
      exports: number;
      imports: number;
      impact: number;
    }[];
    
    // Political Analysis
    politicalAnalysis: {
      country: string;
      currency: string;
      politicalStability: number;
      economicFreedom: number;
      creditRating: string;
      risk: number;
      impact: number;
    }[];
  };
  
  // Technical Analysis
  technicalAnalysis: {
    // Trend Analysis
    trendAnalysis: {
      pair: string;
      timeframe: string;
      trend: 'uptrend' | 'downtrend' | 'sideways';
      strength: number;
      duration: number;
      support: number;
      resistance: number;
      breakout: boolean;
      breakdown: boolean;
    }[];
    
    // Pattern Analysis
    patternAnalysis: {
      pair: string;
      pattern: string;
      type: 'reversal' | 'continuation';
      reliability: number;
      target: number;
      stopLoss: number;
      completion: number;
    }[];
    
    // Indicator Analysis
    indicatorAnalysis: {
      pair: string;
      indicator: string;
      value: number;
      signal: 'buy' | 'sell' | 'neutral';
      strength: number;
      divergence: boolean;
      confirmation: boolean;
    }[];
    
    // Support/Resistance Analysis
    supportResistanceAnalysis: {
      pair: string;
      level: number;
      type: 'support' | 'resistance';
      strength: number;
      touches: number;
      lastTouch: string;
      break: boolean;
    }[];
    
    // Volume Analysis
    volumeAnalysis: {
      pair: string;
      volume: number;
      averageVolume: number;
      volumeRatio: number;
      trend: 'increasing' | 'decreasing' | 'stable';
      confirmation: boolean;
    }[];
  };
  
  // Profit/Loss Analysis
  profitLossAnalysis: {
    // Profit/Loss Profile
    profitLossProfile: {
      exchangeRate: number;
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
    
    // Currency Analysis
    currencyAnalysis: {
      currency: string;
      profitLoss: number;
      exposure: number;
      risk: number;
    }[];
    
    // Correlation Analysis
    correlationAnalysis: {
      pair1: string;
      pair2: string;
      correlation: number;
      profitLoss: number;
      impact: number;
    }[];
  };
  
  // Trading Analysis
  tradingAnalysis: {
    // Entry Analysis
    entryAnalysis: {
      entryPrice: number;
      entryDate: string;
      entryConditions: {
        exchangeRate: number;
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
        exchangeRate: number;
        profitTarget: number;
        stopLoss: number;
        timeLimit: number;
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
      scaling: {
        entry: number;
        scaleIn: number[];
        scaleOut: number[];
      };
    };
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    // Currency Hedging
    currencyHedging: {
      currency: string;
      exposure: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    }[];
    
    // Portfolio Hedging
    portfolioHedging: {
      portfolioValue: number;
      currencyExposure: number;
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
    // Exchange Rate Scenarios
    exchangeRateScenarios: {
      scenario: string;
      exchangeRate: number;
      probability: number;
      profitLoss: number;
      impact: number;
    }[];
    
    // Interest Rate Scenarios
    interestRateScenarios: {
      scenario: string;
      interestRateChange: number;
      probability: number;
      profitLoss: number;
      impact: number;
    }[];
    
    // Political Scenarios
    politicalScenarios: {
      scenario: string;
      politicalEvent: string;
      probability: number;
      profitLoss: number;
      impact: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      description: string;
      probability: number;
      exchangeRate: number;
      volatility: number;
      interestRate: number;
      profitLoss: number;
      risk: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeExchangeRateVolatility: boolean;
  includeInterestRateVolatility: boolean;
  includePoliticalRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeRiskAnalysis: boolean;
    includeFundamentalAnalysis: boolean;
    includeTechnicalAnalysis: boolean;
    includeProfitLossAnalysis: boolean;
    includeTradingAnalysis: boolean;
    includeHedgingAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    pair: string;
    exchangeRate: number;
    profitLoss: number;
    exposure: number;
    risk: number;
  }[];
  
  // Reporting Preferences
  includeRiskAnalysis: boolean;
  includeFundamentalAnalysis: boolean;
  includeTechnicalAnalysis: boolean;
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

export interface ForexTradingCalculatorResults {
  // Core Forex Metrics
  exchangeRate: number;
  pipValue: number;
  marginUtilization: number;
  leverage: number;
  swap: number;
  rollover: number;
  
  // Forex Analysis
  forexAnalysis: {
    exchangeRate: number;
    pipValue: number;
    marginUtilization: number;
    leverage: number;
    swap: number;
    rollover: number;
    forexBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    forexEfficiency: number;
  };
  
  // Position Analysis
  positionAnalysis: {
    currentPositions: {
      pair: string;
      side: string;
      lotSize: number;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      margin: number;
      marginRequirement: number;
      marginUtilization: number;
      leverage: number;
      swap: number;
      rollover: number;
      pipValue: number;
      pipPnL: number;
    }[];
    positionSummary: {
      totalPositions: number;
      longPositions: number;
      shortPositions: number;
      totalLotSize: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      totalMargin: number;
      totalMarginRequirement: number;
      totalMarginUtilization: number;
      averageLeverage: number;
      totalSwap: number;
      totalRollover: number;
      netExposure: number;
      currencyExposure: {
        currency: string;
        exposure: number;
        percentage: number;
      }[];
    };
    positionAnalysis: {
      currencyExposure: {
        currency: string;
        longExposure: number;
        shortExposure: number;
        netExposure: number;
        percentage: number;
      }[];
      correlationAnalysis: {
        pair1: string;
        pair2: string;
        correlation: number;
        impact: number;
      }[];
      riskConcentration: {
        currency: string;
        concentration: number;
        risk: number;
      }[];
    };
    positionEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategyType: {
      directional: string;
      carry: string;
      arbitrage: string;
      hedging: string;
      scalping: string;
      custom: string;
    };
    strategyParameters: {
      strategy: string;
      description: string;
      maxProfit: number;
      maxLoss: number;
      breakevenPoints: number[];
      probabilityOfProfit: number;
      holdingPeriod: number;
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
      pair: string;
      side: string;
      lotSize: number;
      price: number;
      stopLoss: number;
      takeProfit: number;
      entryCondition: string;
      exitCondition: string;
    }[];
    strategyAnalysis: {
      profitLoss: {
        exchangeRate: number;
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
      currencyExposure: {
        currency: string;
        exposure: number;
        risk: number;
      }[];
      correlationImpact: {
        pair1: string;
        pair2: string;
        correlation: number;
        impact: number;
      }[];
    };
    strategyEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    positionRisk: {
      currencyRisk: number;
      interestRateRisk: number;
      politicalRisk: number;
      liquidityRisk: number;
      correlationRisk: number;
      leverageRisk: number;
      totalRisk: number;
      riskScore: number;
    };
    portfolioRisk: {
      totalCurrencyExposure: number;
      totalInterestRateExposure: number;
      totalPoliticalExposure: number;
      totalLiquidityExposure: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    currencyRisk: {
      currency: string;
      exposure: number;
      volatility: number;
      risk: number;
      correlation: number;
      diversification: number;
    }[];
    interestRateRisk: {
      currency: string;
      exposure: number;
      interestRate: number;
      risk: number;
      carry: number;
      rollover: number;
    }[];
    politicalRisk: {
      country: string;
      currency: string;
      politicalStability: number;
      economicFreedom: number;
      creditRating: string;
      risk: number;
    }[];
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
      exchangeRateChange: number;
      volatilityChange: number;
      interestRateChange: number;
      politicalShock: boolean;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
      marginCall: boolean;
    }[];
    riskLimits: {
      maxCurrencyExposure: number;
      maxInterestRateExposure: number;
      maxPoliticalExposure: number;
      maxPositionSize: number;
      maxPortfolioRisk: number;
      maxDrawdown: number;
      maxLeverage: number;
      maxMarginUtilization: number;
    };
    riskEfficiency: number;
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    economicIndicators: {
      currency: string;
      indicator: string;
      value: number;
      previous: number;
      expected: number;
      impact: string;
      importance: string;
      releaseDate: string;
      nextRelease: string;
    }[];
    interestRateAnalysis: {
      currency: string;
      currentRate: number;
      previousRate: number;
      change: number;
      nextMeeting: string;
      expectedChange: number;
      probability: number;
      impact: number;
    }[];
    inflationAnalysis: {
      currency: string;
      currentInflation: number;
      targetInflation: number;
      difference: number;
      trend: string;
      impact: number;
    }[];
    growthAnalysis: {
      currency: string;
      currentGrowth: number;
      expectedGrowth: number;
      trend: string;
      impact: number;
    }[];
    tradeAnalysis: {
      currency: string;
      tradeBalance: number;
      currentAccount: number;
      exports: number;
      imports: number;
      impact: number;
    }[];
    politicalAnalysis: {
      country: string;
      currency: string;
      politicalStability: number;
      economicFreedom: number;
      creditRating: string;
      risk: number;
      impact: number;
    }[];
    fundamentalEfficiency: number;
  };
  
  // Technical Analysis
  technicalAnalysis: {
    trendAnalysis: {
      pair: string;
      timeframe: string;
      trend: string;
      strength: number;
      duration: number;
      support: number;
      resistance: number;
      breakout: boolean;
      breakdown: boolean;
    }[];
    patternAnalysis: {
      pair: string;
      pattern: string;
      type: string;
      reliability: number;
      target: number;
      stopLoss: number;
      completion: number;
    }[];
    indicatorAnalysis: {
      pair: string;
      indicator: string;
      value: number;
      signal: string;
      strength: number;
      divergence: boolean;
      confirmation: boolean;
    }[];
    supportResistanceAnalysis: {
      pair: string;
      level: number;
      type: string;
      strength: number;
      touches: number;
      lastTouch: string;
      break: boolean;
    }[];
    volumeAnalysis: {
      pair: string;
      volume: number;
      averageVolume: number;
      volumeRatio: number;
      trend: string;
      confirmation: boolean;
    }[];
    technicalEfficiency: number;
  };
  
  // Profit/Loss Analysis
  profitLossAnalysis: {
    profitLossProfile: {
      exchangeRate: number;
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
    currencyAnalysis: {
      currency: string;
      profitLoss: number;
      exposure: number;
      risk: number;
    }[];
    correlationAnalysis: {
      pair1: string;
      pair2: string;
      correlation: number;
      profitLoss: number;
      impact: number;
    }[];
    profitLossEfficiency: number;
  };
  
  // Trading Analysis
  tradingAnalysis: {
    entryAnalysis: {
      entryPrice: number;
      entryDate: string;
      entryConditions: {
        exchangeRate: number;
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
        exchangeRate: number;
        profitTarget: number;
        stopLoss: number;
        timeLimit: number;
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
      scaling: {
        entry: number;
        scaleIn: number[];
        scaleOut: number[];
      };
    };
    tradingEfficiency: number;
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    currencyHedging: {
      currency: string;
      exposure: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    }[];
    portfolioHedging: {
      portfolioValue: number;
      currencyExposure: number;
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
    lowProfitLoss: number;
    highProfitLoss: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    exchangeRate: number;
    profitLoss: number;
    risk: number;
    recommendation: string;
  }[];
  
  // Forex Trading Planning Analysis
  forexTradingPlanningAnalysis: {
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
  
  // Forex Trading Score
  forexTradingScore: {
    overallScore: number;
    componentScores: {
      position: number;
      strategy: number;
      risk: number;
      fundamental: number;
      technical: number;
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
    historicalRate: number;
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
    forexAssessment: string;
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
    exchangeRate: number;
    pipValue: number;
    marginUtilization: number;
    leverage: number;
    swap: number;
    rollover: number;
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
