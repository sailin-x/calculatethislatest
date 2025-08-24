export interface CurrencyExchangeCalculatorInputs {
  // Exchange Information
  exchangeInfo: {
    // Transaction Details
    transactionDetails: {
      transactionType: 'spot' | 'forward' | 'swap' | 'option' | 'futures' | 'cross_currency' | 'other';
      baseCurrency: string;
      quoteCurrency: string;
      exchangeRate: number;
      transactionAmount: number;
      transactionDate: string;
      valueDate: string;
      settlementDate: string;
      transactionDescription: string;
    };
    
    // Currency Pair Information
    currencyPairInfo: {
      baseCurrency: string;
      quoteCurrency: string;
      pairName: string;
      pipValue: number;
      lotSize: number;
      minimumTradeSize: number;
      maximumTradeSize: number;
      tradingHours: string;
      marketStatus: 'open' | 'closed' | 'holiday';
    };
  };
  
  // Market Data
  marketData: {
    // Current Market Information
    currentMarketInfo: {
      spotRate: number;
      bidRate: number;
      askRate: number;
      spread: number;
      spreadPercentage: number;
      lastUpdated: string;
      marketSource: string;
    };
    
    // Forward Market Information
    forwardMarketInfo: {
      forwardRate: number;
      forwardPoints: number;
      forwardPremium: number;
      forwardDiscount: number;
      forwardSpread: number;
      maturityDate: string;
    };
    
    // Interest Rate Information
    interestRateInfo: {
      baseCurrencyRate: number;
      quoteCurrencyRate: number;
      rateDifferential: number;
      rateSource: string;
      rateDate: string;
    };
    
    // Volatility Information
    volatilityInfo: {
      impliedVolatility: number;
      historicalVolatility: number;
      volatilitySurface: {
        maturity: number;
        strike: number;
        volatility: number;
      }[];
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    };
  };
  
  // Transaction Details
  transactionDetails: {
    // Amount Information
    amountInfo: {
      baseAmount: number;
      quoteAmount: number;
      exchangeRate: number;
      commission: number;
      fees: number;
      totalCost: number;
      netAmount: number;
    };
    
    // Timing Information
    timingInfo: {
      transactionDate: string;
      valueDate: string;
      settlementDate: string;
      deliveryDate: string;
      timeToSettlement: number;
      businessDays: number;
    };
    
    // Counterparty Information
    counterpartyInfo: {
      counterpartyName: string;
      counterpartyType: 'bank' | 'broker' | 'exchange' | 'other';
      creditRating: string;
      country: string;
      regulatoryStatus: string;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Exchange Rate Risk
    exchangeRateRisk: {
      spotRisk: number;
      forwardRisk: number;
      volatilityRisk: number;
      correlationRisk: number;
      totalExchangeRateRisk: number;
    };
    
    // Credit Risk
    creditRisk: {
      counterpartyRisk: number;
      settlementRisk: number;
      countryRisk: number;
      sovereignRisk: number;
      totalCreditRisk: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      marketLiquidity: number;
      bidAskSpread: number;
      marketDepth: number;
      executionRisk: number;
      totalLiquidityRisk: number;
    };
    
    // Operational Risk
    operationalRisk: {
      settlementRisk: number;
      technologyRisk: number;
      complianceRisk: number;
      legalRisk: number;
      totalOperationalRisk: number;
    };
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    // Hedging Strategy
    hedgingStrategy: {
      strategy: 'forward' | 'option' | 'swap' | 'natural' | 'none';
      hedgeRatio: number;
      hedgeAmount: number;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    
    // Forward Contract
    forwardContract: {
      forwardRate: number;
      forwardAmount: number;
      forwardValue: number;
      forwardPremium: number;
      forwardDiscount: number;
    };
    
    // Option Contract
    optionContract: {
      optionType: 'call' | 'put';
      strikeRate: number;
      optionPremium: number;
      optionAmount: number;
      optionValue: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    };
    
    // Currency Swap
    currencySwap: {
      swapRate: number;
      swapAmount: number;
      swapValue: number;
      swapPayments: {
        date: string;
        payment: number;
        currency: string;
      }[];
    };
  };
  
  // Economic Analysis
  economicAnalysis: {
    // Economic Indicators
    economicIndicators: {
      baseCountryGdp: number;
      quoteCountryGdp: number;
      baseCountryInflation: number;
      quoteCountryInflation: number;
      baseCountryInterestRate: number;
      quoteCountryInterestRate: number;
      baseCountryUnemployment: number;
      quoteCountryUnemployment: number;
    };
    
    // Purchasing Power Parity
    purchasingPowerParity: {
      pppRate: number;
      pppDeviation: number;
      pppOvervaluation: number;
      pppUndervaluation: number;
      pppEquilibrium: number;
    };
    
    // Interest Rate Parity
    interestRateParity: {
      coveredInterestRate: number;
      uncoveredInterestRate: number;
      interestRateDifferential: number;
      forwardRateBias: number;
      carryTradeOpportunity: number;
    };
    
    // Balance of Payments
    balanceOfPayments: {
      currentAccount: number;
      capitalAccount: number;
      financialAccount: number;
      reserves: number;
      balanceOfPayments: number;
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
    };
    
    // Technical Indicators
    technicalIndicators: {
      movingAverage: {
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
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    // Economic Fundamentals
    economicFundamentals: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      tradeBalance: number;
      fiscalBalance: number;
      debtToGdp: number;
    };
    
    // Political Factors
    politicalFactors: {
      politicalStability: number;
      governmentEffectiveness: number;
      regulatoryEnvironment: number;
      policyUncertainty: number;
      electionRisk: number;
    };
    
    // Central Bank Policy
    centralBankPolicy: {
      monetaryPolicy: 'expansionary' | 'neutral' | 'contractionary';
      policyRate: number;
      quantitativeEasing: boolean;
      forwardGuidance: string;
      policyCredibility: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Economic Scenarios
    economicScenarios: {
      scenario: string;
      probability: number;
      baseCurrencyGrowth: number;
      quoteCurrencyGrowth: number;
      interestRateDifferential: number;
      inflationDifferential: number;
      exchangeRate: number;
    }[];
    
    // Political Scenarios
    politicalScenarios: {
      scenario: string;
      probability: number;
      politicalStability: number;
      policyChanges: string[];
      regulatoryImpact: number;
      exchangeRate: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      probability: number;
      volatility: number;
      liquidity: number;
      correlation: number;
      exchangeRate: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeVolatilityChanges: boolean;
  includeCorrelationChanges: boolean;
  includeJumpRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeRiskAnalysis: boolean;
    includeHedgingAnalysis: boolean;
    includeEconomicAnalysis: boolean;
    includeTechnicalAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    date: string;
    exchangeRate: number;
    volume: number;
    volatility: number;
    interestRateDifferential: number;
    economicConditions: string;
  }[];
  
  // Reporting Preferences
  includeRiskAnalysis: boolean;
  includeHedgingAnalysis: boolean;
  includeEconomicAnalysis: boolean;
  includeTechnicalAnalysis: boolean;
  includeFundamentalAnalysis: boolean;
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

export interface CurrencyExchangeCalculatorResults {
  // Core Exchange Metrics
  exchangeRate: number;
  transactionAmount: number;
  totalCost: number;
  netAmount: number;
  exchangeRisk: number;
  
  // Exchange Analysis
  exchangeAnalysis: {
    exchangeRate: number;
    transactionAmount: number;
    totalCost: number;
    netAmount: number;
    exchangeRisk: number;
    exchangeBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    exchangeEfficiency: number;
  };
  
  // Market Analysis
  marketAnalysis: {
    spotRate: number;
    bidRate: number;
    askRate: number;
    spread: number;
    spreadPercentage: number;
    forwardRate: number;
    forwardPoints: number;
    marketComponents: {
      component: string;
      value: number;
      impact: number;
    }[];
    marketEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    exchangeRateRisk: {
      spotRisk: number;
      forwardRisk: number;
      volatilityRisk: number;
      correlationRisk: number;
      totalExchangeRateRisk: number;
      riskContribution: number;
    };
    creditRisk: {
      counterpartyRisk: number;
      settlementRisk: number;
      countryRisk: number;
      sovereignRisk: number;
      totalCreditRisk: number;
      riskContribution: number;
    };
    liquidityRisk: {
      marketLiquidity: number;
      bidAskSpread: number;
      marketDepth: number;
      executionRisk: number;
      totalLiquidityRisk: number;
      riskContribution: number;
    };
    operationalRisk: {
      settlementRisk: number;
      technologyRisk: number;
      complianceRisk: number;
      legalRisk: number;
      totalOperationalRisk: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Hedging Analysis
  hedgingAnalysis: {
    hedgingStrategy: {
      strategy: string;
      hedgeRatio: number;
      hedgeAmount: number;
      hedgeCost: number;
      hedgeEffectiveness: number;
    };
    forwardContract: {
      forwardRate: number;
      forwardAmount: number;
      forwardValue: number;
      forwardPremium: number;
      forwardDiscount: number;
    };
    optionContract: {
      optionType: string;
      strikeRate: number;
      optionPremium: number;
      optionAmount: number;
      optionValue: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    };
    currencySwap: {
      swapRate: number;
      swapAmount: number;
      swapValue: number;
      swapPayments: {
        date: string;
        payment: number;
        currency: string;
      }[];
    };
    hedgingEfficiency: number;
  };
  
  // Economic Analysis
  economicAnalysis: {
    economicIndicators: {
      baseCountryGdp: number;
      quoteCountryGdp: number;
      baseCountryInflation: number;
      quoteCountryInflation: number;
      baseCountryInterestRate: number;
      quoteCountryInterestRate: number;
      baseCountryUnemployment: number;
      quoteCountryUnemployment: number;
    };
    purchasingPowerParity: {
      pppRate: number;
      pppDeviation: number;
      pppOvervaluation: number;
      pppUndervaluation: number;
      pppEquilibrium: number;
    };
    interestRateParity: {
      coveredInterestRate: number;
      uncoveredInterestRate: number;
      interestRateDifferential: number;
      forwardRateBias: number;
      carryTradeOpportunity: number;
    };
    balanceOfPayments: {
      currentAccount: number;
      capitalAccount: number;
      financialAccount: number;
      reserves: number;
      balanceOfPayments: number;
    };
    economicEfficiency: number;
  };
  
  // Technical Analysis
  technicalAnalysis: {
    priceAction: {
      supportLevel: number;
      resistanceLevel: number;
      trendDirection: string;
      trendStrength: number;
      momentum: number;
    };
    technicalIndicators: {
      movingAverage: {
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
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    economicFundamentals: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      tradeBalance: number;
      fiscalBalance: number;
      debtToGdp: number;
    };
    politicalFactors: {
      politicalStability: number;
      governmentEffectiveness: number;
      regulatoryEnvironment: number;
      policyUncertainty: number;
      electionRisk: number;
    };
    centralBankPolicy: {
      monetaryPolicy: string;
      policyRate: number;
      quantitativeEasing: boolean;
      forwardGuidance: string;
      policyCredibility: number;
    };
    fundamentalEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowRate: number;
    highRate: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    exchangeRate: number;
    riskLevel: string;
    impact: number;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      exchangeRate: number;
      spread: number;
      volatility: number;
      risk: number;
      outperformance: number;
    }[];
    marketComparison: {
      metric: string;
      transaction: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Currency Exchange Score
  currencyExchangeScore: {
    overallScore: number;
    componentScores: {
      market: number;
      risk: number;
      hedging: number;
      economic: number;
      technical: number;
    };
    recommendation: 'execute' | 'hedge' | 'delay' | 'review';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanExchangeRate: number;
    medianExchangeRate: number;
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
    historicalVolatility: number;
    historicalTrend: number;
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
    costSavings: number;
    riskReduction: number;
    efficiencyImprovement: number;
    competitiveAdvantage: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    exchangeAssessment: string;
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
    transactionAmount: number;
    totalCost: number;
    recommendation: 'execute' | 'hedge' | 'delay' | 'review';
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
