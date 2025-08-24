export interface BondTradingCalculatorInputs {
  // Bond Information
  bondInfo: {
    // Basic Information
    basicInfo: {
      bondName: string;
      bondSymbol: string;
      issuer: string;
      bondType: 'government' | 'corporate' | 'municipal' | 'agency' | 'supranational';
      couponRate: number;
      faceValue: number;
      issueDate: string;
      maturityDate: string;
      settlementDate: string;
      dayCountConvention: '30/360' | 'actual/360' | 'actual/365' | 'actual/actual';
      paymentFrequency: 'annual' | 'semi_annual' | 'quarterly' | 'monthly';
      callable: boolean;
      putable: boolean;
      convertible: boolean;
      creditRating: string;
      yieldToMaturity: number;
      currentPrice: number;
      dirtyPrice: number;
      cleanPrice: number;
      accruedInterest: number;
    };
    
    // Bond Details
    bondDetails: {
      cusip: string;
      isin: string;
      figi: string;
      sector: string;
      industry: string;
      country: string;
      currency: string;
      minimumDenomination: number;
      issueSize: number;
      outstandingAmount: number;
      tradingVolume: number;
      bidPrice: number;
      askPrice: number;
      bidYield: number;
      askYield: number;
      spread: number;
      lastTradePrice: number;
      lastTradeYield: number;
      lastTradeDate: string;
    };
    
    // Bond Features
    bondFeatures: {
      callable: {
        callable: boolean;
        callDate: string;
        callPrice: number;
        callSchedule: {
          date: string;
          price: number;
        }[];
      };
      putable: {
        putable: boolean;
        putDate: string;
        putPrice: number;
        putSchedule: {
          date: string;
          price: number;
        }[];
      };
      convertible: {
        convertible: boolean;
        conversionRatio: number;
        conversionPrice: number;
        underlyingStock: string;
        conversionValue: number;
        conversionPremium: number;
      };
      sinkingFund: {
        hasSinkingFund: boolean;
        sinkingFundSchedule: {
          date: string;
          amount: number;
        }[];
      };
    };
    
    // Bond Cash Flows
    bondCashFlows: {
      date: string;
      type: 'coupon' | 'principal' | 'call' | 'put' | 'conversion';
      amount: number;
      principal: number;
      interest: number;
      remainingPrincipal: number;
    }[];
  };
  
  // Position Information
  positionInfo: {
    // Current Positions
    currentPositions: {
      bondSymbol: string;
      bondName: string;
      quantity: number;
      faceValue: number;
      marketValue: number;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      yieldToMaturity: number;
      duration: number;
      modifiedDuration: number;
      convexity: number;
      accruedInterest: number;
      dirtyPrice: number;
      cleanPrice: number;
    }[];
    
    // Position Summary
    positionSummary: {
      totalPositions: number;
      totalFaceValue: number;
      totalMarketValue: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      averageYield: number;
      averageDuration: number;
      averageModifiedDuration: number;
      averageConvexity: number;
      totalAccruedInterest: number;
      portfolioYield: number;
      portfolioDuration: number;
      portfolioModifiedDuration: number;
      portfolioConvexity: number;
    };
    
    // Position Analysis
    positionAnalysis: {
      sectorAllocation: {
        sector: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
      maturityAllocation: {
        maturityRange: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
      creditAllocation: {
        creditRating: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
      issuerAllocation: {
        issuer: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
    };
  };
  
  // Strategy Information
  strategyInfo: {
    // Strategy Type
    strategyType: {
      directional: 'long_bond' | 'short_bond' | 'barbell' | 'bullet' | 'ladder';
      relative_value: 'yield_spread' | 'curve_trade' | 'sector_rotation' | 'credit_spread';
      arbitrage: 'cash_and_carry' | 'basis_trade' | 'conversion_arbitrage' | 'statistical_arbitrage';
      hedging: 'duration_hedge' | 'convexity_hedge' | 'credit_hedge' | 'inflation_hedge';
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
      bondSymbol: string;
      bondName: string;
      side: 'buy' | 'sell';
      quantity: number;
      price: number;
      yield: number;
      duration: number;
      stopLoss: number;
      takeProfit: number;
      entryCondition: string;
      exitCondition: string;
    }[];
    
    // Strategy Analysis
    strategyAnalysis: {
      profitLoss: {
        yieldChange: number;
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
      durationExposure: {
        totalDuration: number;
        longDuration: number;
        shortDuration: number;
        netDuration: number;
      };
      convexityExposure: {
        totalConvexity: number;
        longConvexity: number;
        shortConvexity: number;
        netConvexity: number;
      };
    };
  };
  
  // Market Data
  marketData: {
    // Yield Curve Data
    yieldCurveData: {
      maturity: number;
      yield: number;
      duration: number;
      modifiedDuration: number;
      convexity: number;
      zeroCouponYield: number;
      forwardRate: number;
      parYield: number;
    }[];
    
    // Credit Spread Data
    creditSpreadData: {
      rating: string;
      maturity: number;
      spread: number;
      spreadChange: number;
      spreadVolatility: number;
    }[];
    
    // Sector Spread Data
    sectorSpreadData: {
      sector: string;
      maturity: number;
      spread: number;
      spreadChange: number;
      spreadVolatility: number;
    }[];
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      liquidityRegime: 'high' | 'medium' | 'low';
      marketSentiment: 'bullish' | 'bearish' | 'neutral';
      riskAppetite: 'high' | 'medium' | 'low';
      flightToQuality: 'high' | 'medium' | 'low';
      creditDemand: 'high' | 'medium' | 'low';
      yieldCurveSlope: number;
      yieldCurveCurvature: number;
    };
    
    // Economic Indicators
    economicIndicators: {
      date: string;
      gdpGrowth: number;
      inflationRate: number;
      unemploymentRate: number;
      interestRate: number;
      consumerConfidence: number;
      businessConfidence: number;
      manufacturingIndex: number;
      servicesIndex: number;
      housingStarts: number;
      retailSales: number;
      industrialProduction: number;
    }[];
    
    // Central Bank Data
    centralBankData: {
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
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Interest Rate Risk
    interestRateRisk: {
      durationRisk: number;
      convexityRisk: number;
      yieldCurveRisk: number;
      basisRisk: number;
      totalInterestRateRisk: number;
      riskScore: number;
    };
    
    // Credit Risk
    creditRisk: {
      defaultRisk: number;
      downgradeRisk: number;
      spreadRisk: number;
      recoveryRisk: number;
      totalCreditRisk: number;
      riskScore: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      bidAskSpread: number;
      tradingVolume: number;
      marketDepth: number;
      timeToLiquidate: number;
      totalLiquidityRisk: number;
      riskScore: number;
    };
    
    // Portfolio Risk
    portfolioRisk: {
      totalDuration: number;
      totalConvexity: number;
      totalCreditExposure: number;
      totalLiquidityExposure: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    
    // Sector Risk
    sectorRisk: {
      sector: string;
      exposure: number;
      volatility: number;
      risk: number;
      correlation: number;
      diversification: number;
    }[];
    
    // Maturity Risk
    maturityRisk: {
      maturityRange: string;
      exposure: number;
      duration: number;
      risk: number;
      yield: number;
      sensitivity: number;
    }[];
    
    // Credit Rating Risk
    creditRatingRisk: {
      rating: string;
      exposure: number;
      defaultProbability: number;
      risk: number;
      spread: number;
      sensitivity: number;
    }[];
    
    // Stress Testing
    stressTesting: {
      scenario: string;
      yieldChange: number;
      spreadChange: number;
      volatilityChange: number;
      liquidityShock: boolean;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
      marginCall: boolean;
    }[];
    
    // Risk Limits
    riskLimits: {
      maxDuration: number;
      maxConvexity: number;
      maxCreditExposure: number;
      maxLiquidityExposure: number;
      maxPositionSize: number;
      maxPortfolioRisk: number;
      maxDrawdown: number;
      maxLeverage: number;
    };
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    // Issuer Analysis
    issuerAnalysis: {
      issuer: string;
      creditRating: string;
      financialMetrics: {
        debtToEquity: number;
        interestCoverage: number;
        currentRatio: number;
        quickRatio: number;
        returnOnEquity: number;
        returnOnAssets: number;
        operatingMargin: number;
        netMargin: number;
      };
      industryMetrics: {
        industry: string;
        industryAverage: number;
        peerComparison: number;
        marketPosition: number;
      };
      economicOutlook: {
        gdpGrowth: number;
        inflationOutlook: number;
        interestRateOutlook: number;
        creditOutlook: string;
      };
    }[];
    
    // Economic Analysis
    economicAnalysis: {
      gdpGrowth: {
        current: number;
        expected: number;
        trend: 'increasing' | 'decreasing' | 'stable';
        impact: number;
      };
      inflationAnalysis: {
        currentInflation: number;
        expectedInflation: number;
        trend: 'increasing' | 'decreasing' | 'stable';
        impact: number;
      };
      interestRateAnalysis: {
        currentRate: number;
        expectedRate: number;
        trend: 'increasing' | 'decreasing' | 'stable';
        impact: number;
      };
      monetaryPolicy: {
        policyStance: 'accommodative' | 'neutral' | 'restrictive';
        outlook: 'hawkish' | 'dovish' | 'neutral';
        impact: number;
      };
    };
    
    // Sector Analysis
    sectorAnalysis: {
      sector: string;
      outlook: 'positive' | 'negative' | 'neutral';
      growthProspects: number;
      creditQuality: string;
      defaultProbability: number;
      recoveryRate: number;
      sectorSpread: number;
      sectorDuration: number;
    }[];
  };
  
  // Technical Analysis
  technicalAnalysis: {
    // Yield Curve Analysis
    yieldCurveAnalysis: {
      curveShape: 'normal' | 'inverted' | 'flat' | 'humped';
      slope: number;
      curvature: number;
      butterfly: number;
      trend: 'steepening' | 'flattening' | 'stable';
      strength: number;
    };
    
    // Spread Analysis
    spreadAnalysis: {
      type: string;
      currentSpread: number;
      historicalAverage: number;
      percentile: number;
      trend: 'widening' | 'narrowing' | 'stable';
      volatility: number;
      zScore: number;
    }[];
    
    // Momentum Analysis
    momentumAnalysis: {
      bondSymbol: string;
      priceMomentum: number;
      yieldMomentum: number;
      spreadMomentum: number;
      relativeStrength: number;
      trend: 'bullish' | 'bearish' | 'neutral';
      strength: number;
    }[];
    
    // Support/Resistance Analysis
    supportResistanceAnalysis: {
      bondSymbol: string;
      supportLevels: number[];
      resistanceLevels: number[];
      currentPrice: number;
      distanceToSupport: number;
      distanceToResistance: number;
    }[];
    
    // Volume Analysis
    volumeAnalysis: {
      bondSymbol: string;
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
      yieldChange: number;
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
    
    // Duration Analysis
    durationAnalysis: {
      duration: number;
      profitLoss: number;
      sensitivity: number;
      risk: number;
    };
    
    // Convexity Analysis
    convexityAnalysis: {
      convexity: number;
      profitLoss: number;
      sensitivity: number;
      risk: number;
    };
  };
  
  // Trading Analysis
  tradingAnalysis: {
    // Entry Analysis
    entryAnalysis: {
      entryPrice: number;
      entryYield: number;
      entryDate: string;
      entryConditions: {
        yield: number;
        spread: number;
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
      exitYield: number;
      exitDate: string;
      exitReason: string;
      exitConditions: {
        yield: number;
        spread: number;
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
    // Duration Hedging
    durationHedging: {
      targetDuration: number;
      currentDuration: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Convexity Hedging
    convexityHedging: {
      targetConvexity: number;
      currentConvexity: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Credit Hedging
    creditHedging: {
      creditExposure: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Portfolio Hedging
    portfolioHedging: {
      portfolioValue: number;
      durationExposure: number;
      convexityExposure: number;
      creditExposure: number;
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
    // Yield Scenarios
    yieldScenarios: {
      scenario: string;
      yieldChange: number;
      probability: number;
      profitLoss: number;
      impact: number;
    }[];
    
    // Spread Scenarios
    spreadScenarios: {
      scenario: string;
      spreadChange: number;
      probability: number;
      profitLoss: number;
      impact: number;
    }[];
    
    // Credit Scenarios
    creditScenarios: {
      scenario: string;
      creditEvent: string;
      probability: number;
      profitLoss: number;
      impact: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      description: string;
      probability: number;
      yieldChange: number;
      spreadChange: number;
      volatilityChange: number;
      profitLoss: number;
      risk: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeYieldVolatility: boolean;
  includeSpreadVolatility: boolean;
  includeCreditRisk: boolean;
  
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
    bondSymbol: string;
    price: number;
    yield: number;
    profitLoss: number;
    duration: number;
    convexity: number;
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

export interface BondTradingCalculatorResults {
  // Core Bond Metrics
  yieldToMaturity: number;
  duration: number;
  modifiedDuration: number;
  convexity: number;
  price: number;
  accruedInterest: number;
  
  // Bond Analysis
  bondAnalysis: {
    yieldToMaturity: number;
    duration: number;
    modifiedDuration: number;
    convexity: number;
    price: number;
    accruedInterest: number;
    bondBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    bondEfficiency: number;
  };
  
  // Position Analysis
  positionAnalysis: {
    currentPositions: {
      bondSymbol: string;
      bondName: string;
      quantity: number;
      faceValue: number;
      marketValue: number;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      yieldToMaturity: number;
      duration: number;
      modifiedDuration: number;
      convexity: number;
      accruedInterest: number;
      dirtyPrice: number;
      cleanPrice: number;
    }[];
    positionSummary: {
      totalPositions: number;
      totalFaceValue: number;
      totalMarketValue: number;
      totalUnrealizedPnL: number;
      totalRealizedPnL: number;
      totalPnL: number;
      averageYield: number;
      averageDuration: number;
      averageModifiedDuration: number;
      averageConvexity: number;
      totalAccruedInterest: number;
      portfolioYield: number;
      portfolioDuration: number;
      portfolioModifiedDuration: number;
      portfolioConvexity: number;
    };
    positionAnalysis: {
      sectorAllocation: {
        sector: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
      maturityAllocation: {
        maturityRange: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
      creditAllocation: {
        creditRating: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
      issuerAllocation: {
        issuer: string;
        marketValue: number;
        percentage: number;
        yield: number;
        duration: number;
      }[];
    };
    positionEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategyType: {
      directional: string;
      relative_value: string;
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
      bondSymbol: string;
      bondName: string;
      side: string;
      quantity: number;
      price: number;
      yield: number;
      duration: number;
      stopLoss: number;
      takeProfit: number;
      entryCondition: string;
      exitCondition: string;
    }[];
    strategyAnalysis: {
      profitLoss: {
        yieldChange: number;
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
      durationExposure: {
        totalDuration: number;
        longDuration: number;
        shortDuration: number;
        netDuration: number;
      };
      convexityExposure: {
        totalConvexity: number;
        longConvexity: number;
        shortConvexity: number;
        netConvexity: number;
      };
    };
    strategyEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    interestRateRisk: {
      durationRisk: number;
      convexityRisk: number;
      yieldCurveRisk: number;
      basisRisk: number;
      totalInterestRateRisk: number;
      riskScore: number;
    };
    creditRisk: {
      defaultRisk: number;
      downgradeRisk: number;
      spreadRisk: number;
      recoveryRisk: number;
      totalCreditRisk: number;
      riskScore: number;
    };
    liquidityRisk: {
      bidAskSpread: number;
      tradingVolume: number;
      marketDepth: number;
      timeToLiquidate: number;
      totalLiquidityRisk: number;
      riskScore: number;
    };
    portfolioRisk: {
      totalDuration: number;
      totalConvexity: number;
      totalCreditExposure: number;
      totalLiquidityExposure: number;
      portfolioRisk: number;
      riskBudget: number;
      riskUtilization: number;
    };
    sectorRisk: {
      sector: string;
      exposure: number;
      volatility: number;
      risk: number;
      correlation: number;
      diversification: number;
    }[];
    maturityRisk: {
      maturityRange: string;
      exposure: number;
      duration: number;
      risk: number;
      yield: number;
      sensitivity: number;
    }[];
    creditRatingRisk: {
      rating: string;
      exposure: number;
      defaultProbability: number;
      risk: number;
      spread: number;
      sensitivity: number;
    }[];
    stressTesting: {
      scenario: string;
      yieldChange: number;
      spreadChange: number;
      volatilityChange: number;
      liquidityShock: boolean;
      impact: number;
      portfolioValue: number;
      portfolioRisk: number;
      marginCall: boolean;
    }[];
    riskLimits: {
      maxDuration: number;
      maxConvexity: number;
      maxCreditExposure: number;
      maxLiquidityExposure: number;
      maxPositionSize: number;
      maxPortfolioRisk: number;
      maxDrawdown: number;
      maxLeverage: number;
    };
    riskEfficiency: number;
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    issuerAnalysis: {
      issuer: string;
      creditRating: string;
      financialMetrics: {
        debtToEquity: number;
        interestCoverage: number;
        currentRatio: number;
        quickRatio: number;
        returnOnEquity: number;
        returnOnAssets: number;
        operatingMargin: number;
        netMargin: number;
      };
      industryMetrics: {
        industry: string;
        industryAverage: number;
        peerComparison: number;
        marketPosition: number;
      };
      economicOutlook: {
        gdpGrowth: number;
        inflationOutlook: number;
        interestRateOutlook: number;
        creditOutlook: string;
      };
    }[];
    economicAnalysis: {
      gdpGrowth: {
        current: number;
        expected: number;
        trend: string;
        impact: number;
      };
      inflationAnalysis: {
        currentInflation: number;
        expectedInflation: number;
        trend: string;
        impact: number;
      };
      interestRateAnalysis: {
        currentRate: number;
        expectedRate: number;
        trend: string;
        impact: number;
      };
      monetaryPolicy: {
        policyStance: string;
        outlook: string;
        impact: number;
      };
    };
    sectorAnalysis: {
      sector: string;
      outlook: string;
      growthProspects: number;
      creditQuality: string;
      defaultProbability: number;
      recoveryRate: number;
      sectorSpread: number;
      sectorDuration: number;
    }[];
    fundamentalEfficiency: number;
  };
  
  // Technical Analysis
  technicalAnalysis: {
    yieldCurveAnalysis: {
      curveShape: string;
      slope: number;
      curvature: number;
      butterfly: number;
      trend: string;
      strength: number;
    };
    spreadAnalysis: {
      type: string;
      currentSpread: number;
      historicalAverage: number;
      percentile: number;
      trend: string;
      volatility: number;
      zScore: number;
    }[];
    momentumAnalysis: {
      bondSymbol: string;
      priceMomentum: number;
      yieldMomentum: number;
      spreadMomentum: number;
      relativeStrength: number;
      trend: string;
      strength: number;
    }[];
    supportResistanceAnalysis: {
      bondSymbol: string;
      supportLevels: number[];
      resistanceLevels: number[];
      currentPrice: number;
      distanceToSupport: number;
      distanceToResistance: number;
    }[];
    volumeAnalysis: {
      bondSymbol: string;
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
      yieldChange: number;
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
    durationAnalysis: {
      duration: number;
      profitLoss: number;
      sensitivity: number;
      risk: number;
    };
    convexityAnalysis: {
      convexity: number;
      profitLoss: number;
      sensitivity: number;
      risk: number;
    };
    profitLossEfficiency: number;
  };
  
  // Trading Analysis
  tradingAnalysis: {
    entryAnalysis: {
      entryPrice: number;
      entryYield: number;
      entryDate: string;
      entryConditions: {
        yield: number;
        spread: number;
        technicalSignal: string;
        fundamentalSignal: string;
        marketSentiment: string;
      };
      entryRationale: string;
      entryRisk: number;
    };
    exitAnalysis: {
      exitPrice: number;
      exitYield: number;
      exitDate: string;
      exitReason: string;
      exitConditions: {
        yield: number;
        spread: number;
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
    durationHedging: {
      targetDuration: number;
      currentDuration: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    convexityHedging: {
      targetConvexity: number;
      currentConvexity: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    creditHedging: {
      creditExposure: number;
      hedgeRatio: number;
      hedgeInstrument: string;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    portfolioHedging: {
      portfolioValue: number;
      durationExposure: number;
      convexityExposure: number;
      creditExposure: number;
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
    yieldChange: number;
    profitLoss: number;
    risk: number;
    recommendation: string;
  }[];
  
  // Bond Trading Planning Analysis
  bondTradingPlanningAnalysis: {
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
  
  // Bond Trading Score
  bondTradingScore: {
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
    historicalYield: number;
    historicalReturn: number;
    historicalDuration: number;
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
    bondAssessment: string;
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
    yieldToMaturity: number;
    duration: number;
    modifiedDuration: number;
    convexity: number;
    price: number;
    accruedInterest: number;
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
