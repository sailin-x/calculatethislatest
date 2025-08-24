export interface CryptocurrencyCalculatorInputs {
  // Cryptocurrency Information
  cryptocurrencyInfo: {
    // Cryptocurrency Details
    cryptocurrencyDetails: {
      cryptocurrencyName: string;
      cryptocurrencySymbol: string;
      cryptocurrencyType: 'bitcoin' | 'ethereum' | 'altcoin' | 'stablecoin' | 'meme_coin' | 'defi_token' | 'nft_token' | 'governance_token' | 'utility_token' | 'other';
      blockchain: string;
      consensusMechanism: 'proof_of_work' | 'proof_of_stake' | 'delegated_proof_of_stake' | 'proof_of_authority' | 'proof_of_space' | 'other';
      maxSupply: number;
      circulatingSupply: number;
      totalSupply: number;
      marketCap: number;
      cryptocurrencyDescription: string;
    };
    
    // Token Economics
    tokenEconomics: {
      tokenUtility: string[];
      useCase: string[];
      tokenDistribution: {
        category: string;
        percentage: number;
        amount: number;
      }[];
      inflationRate: number;
      deflationRate: number;
      stakingRewards: number;
      miningRewards: number;
      burnRate: number;
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
      volume24h: number;
      marketCap: number;
      fullyDilutedMarketCap: number;
    };
    
    // Historical Price Data
    historicalPriceData: {
      date: string;
      openPrice: number;
      highPrice: number;
      lowPrice: number;
      closePrice: number;
      volume: number;
      marketCap: number;
    }[];
    
    // Exchange Data
    exchangeData: {
      exchange: string;
      price: number;
      volume: number;
      bid: number;
      ask: number;
      spread: number;
      liquidity: 'high' | 'medium' | 'low';
    }[];
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
      liquidityRegime: 'high' | 'medium' | 'low';
      fearGreedIndex: number;
      marketSentiment: 'fear' | 'greed' | 'neutral';
      dominance: number;
    };
  };
  
  // Trading Information
  tradingInfo: {
    // Position Details
    positionDetails: {
      positionType: 'long' | 'short' | 'spot' | 'futures' | 'options' | 'margin' | 'other';
      positionSize: number;
      entryPrice: number;
      currentPrice: number;
      entryDate: string;
      positionValue: number;
      unrealizedPnL: number;
      realizedPnL: number;
      totalPnL: number;
      leverage: number;
    };
    
    // Trade Details
    tradeDetails: {
      tradeType: 'buy' | 'sell' | 'swap' | 'stake' | 'unstake' | 'yield_farm' | 'other';
      quantity: number;
      price: number;
      commission: number;
      fees: number;
      slippage: number;
      gasFees: number;
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
    // Network Metrics
    networkMetrics: {
      activeAddresses: number;
      transactionCount: number;
      transactionVolume: number;
      averageTransactionSize: number;
      networkHashRate: number;
      difficulty: number;
      blockTime: number;
      blockSize: number;
      totalTransactions: number;
      uniqueAddresses: number;
    };
    
    // Development Activity
    developmentActivity: {
      githubCommits: number;
      githubStars: number;
      githubForks: number;
      contributors: number;
      lastCommit: string;
      developmentScore: number;
      codeQuality: number;
      documentation: number;
    };
    
    // Adoption Metrics
    adoptionMetrics: {
      merchantAdoption: number;
      institutionalAdoption: number;
      retailAdoption: number;
      regulatoryStatus: string;
      countryAdoption: {
        country: string;
        adoption: number;
        regulation: string;
      }[];
      useCaseAdoption: {
        useCase: string;
        adoption: number;
        growth: number;
      }[];
    };
    
    // Economic Indicators
    economicIndicators: {
      velocity: number;
      nvtRatio: number;
      mcapToTvlRatio: number;
      priceToSalesRatio: number;
      priceToEarningsRatio: number;
      burnRate: number;
      stakingYield: number;
      apy: number;
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
      atr: number;
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
      fibonacci: {
        level: number;
        price: number;
        retracement: number;
      }[];
    };
    
    // Chart Patterns
    chartPatterns: {
      pattern: string;
      probability: number;
      target: number;
      stopLoss: number;
      timeframe: string;
    }[];
    
    // On-Chain Analysis
    onChainAnalysis: {
      whaleMovements: {
        address: string;
        balance: number;
        movement: 'inflow' | 'outflow';
        amount: number;
      }[];
      exchangeFlows: {
        exchange: string;
        flow: 'inflow' | 'outflow';
        amount: number;
      }[];
      networkGrowth: number;
      activeSupply: number;
      hodlWaves: {
        period: string;
        percentage: number;
      }[];
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Market Risk
    marketRisk: {
      priceRisk: number;
      volatilityRisk: number;
      liquidityRisk: number;
      correlationRisk: number;
      marketRisk: number;
    };
    
    // Technology Risk
    technologyRisk: {
      securityRisk: number;
      scalabilityRisk: number;
      networkRisk: number;
      smartContractRisk: number;
      technologyRisk: number;
    };
    
    // Regulatory Risk
    regulatoryRisk: {
      regulatoryUncertainty: number;
      banRisk: number;
      complianceRisk: number;
      taxRisk: number;
      regulatoryRisk: number;
    };
    
    // Operational Risk
    operationalRisk: {
      exchangeRisk: number;
      walletRisk: number;
      keyManagementRisk: number;
      counterpartyRisk: number;
      operationalRisk: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // DeFi Analysis
  defiAnalysis: {
    // DeFi Metrics
    defiMetrics: {
      totalValueLocked: number;
      totalValueLockedChange: number;
      protocolRevenue: number;
      protocolRevenueChange: number;
      userCount: number;
      userCountChange: number;
      transactionCount: number;
      transactionCountChange: number;
    };
    
    // Yield Farming
    yieldFarming: {
      pool: string;
      apy: number;
      apr: number;
      rewards: {
        token: string;
        amount: number;
        value: number;
      }[];
      impermanentLoss: number;
      risk: number;
    }[];
    
    // Liquidity Provision
    liquidityProvision: {
      pool: string;
      liquidity: number;
      fees: number;
      impermanentLoss: number;
      risk: number;
    }[];
    
    // Lending and Borrowing
    lendingBorrowing: {
      protocol: string;
      supplyApy: number;
      borrowApr: number;
      utilizationRate: number;
      collateralRatio: number;
      liquidationThreshold: number;
    }[];
  };
  
  // Staking Analysis
  stakingAnalysis: {
    // Staking Metrics
    stakingMetrics: {
      stakingRate: number;
      stakingRewards: number;
      stakingApy: number;
      validatorCount: number;
      minimumStake: number;
      unbondingPeriod: number;
    };
    
    // Validator Information
    validatorInfo: {
      validator: string;
      commission: number;
      uptime: number;
      delegators: number;
      totalStake: number;
      performance: number;
    }[];
    
    // Staking Rewards
    stakingRewards: {
      period: string;
      rewards: number;
      apy: number;
      compound: boolean;
    }[];
  };
  
  // Cost Analysis
  costAnalysis: {
    // Transaction Costs
    transactionCosts: {
      networkFees: number;
      exchangeFees: number;
      slippage: number;
      gasFees: number;
      totalTransactionCosts: number;
      costAsPercentage: number;
    };
    
    // Mining Costs
    miningCosts: {
      electricityCost: number;
      hardwareCost: number;
      maintenanceCost: number;
      totalMiningCosts: number;
      costAsPercentage: number;
    };
    
    // Staking Costs
    stakingCosts: {
      validatorFees: number;
      slashingRisk: number;
      opportunityCost: number;
      totalStakingCosts: number;
      costAsPercentage: number;
    };
    
    // Total Costs
    totalCosts: {
      transactionCosts: number;
      miningCosts: number;
      stakingCosts: number;
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
      stakingContribution: number;
      yieldContribution: number;
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
    
    // Related Cryptocurrencies
    relatedCryptocurrencies: {
      cryptocurrency: string;
      correlation: number;
      marketCap: number;
      performance: number;
    }[];
    
    // Market Comparison
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      cryptocurrencyReturn: number;
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
    
    // Adoption Scenarios
    adoptionScenarios: {
      scenario: string;
      probability: number;
      adoptionChange: number;
      priceImpact: number;
      return: number;
    }[];
    
    // Regulatory Scenarios
    regulatoryScenarios: {
      scenario: string;
      probability: number;
      regulatoryImpact: number;
      priceImpact: number;
      return: number;
    }[];
    
    // Technology Scenarios
    technologyScenarios: {
      scenario: string;
      probability: number;
      technologyImpact: number;
      priceImpact: number;
      return: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePriceVolatility: boolean;
  includeAdoptionVolatility: boolean;
  includeRegulatoryVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeStakingRewards: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeFundamentalAnalysis: boolean;
    includeTechnicalAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeDefiAnalysis: boolean;
    includeStakingAnalysis: boolean;
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
    marketCap: number;
    activeAddresses: number;
    transactionCount: number;
    return: number;
    volatility: number;
  }[];
  
  // Reporting Preferences
  includeFundamentalAnalysis: boolean;
  includeTechnicalAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeDefiAnalysis: boolean;
  includeStakingAnalysis: boolean;
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

export interface CryptocurrencyCalculatorResults {
  // Core Cryptocurrency Metrics
  currentPrice: number;
  marketCap: number;
  totalReturn: number;
  volatility: number;
  sharpeRatio: number;
  
  // Cryptocurrency Analysis
  cryptocurrencyAnalysis: {
    currentPrice: number;
    marketCap: number;
    totalReturn: number;
    volatility: number;
    sharpeRatio: number;
    cryptocurrencyBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    cryptocurrencyEfficiency: number;
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    networkMetrics: {
      activeAddresses: number;
      transactionCount: number;
      transactionVolume: number;
      averageTransactionSize: number;
      networkHashRate: number;
      difficulty: number;
      blockTime: number;
      blockSize: number;
      totalTransactions: number;
      uniqueAddresses: number;
    };
    developmentActivity: {
      githubCommits: number;
      githubStars: number;
      githubForks: number;
      contributors: number;
      lastCommit: string;
      developmentScore: number;
      codeQuality: number;
      documentation: number;
    };
    adoptionMetrics: {
      merchantAdoption: number;
      institutionalAdoption: number;
      retailAdoption: number;
      regulatoryStatus: string;
      countryAdoption: {
        country: string;
        adoption: number;
        regulation: string;
      }[];
      useCaseAdoption: {
        useCase: string;
        adoption: number;
        growth: number;
      }[];
    };
    economicIndicators: {
      velocity: number;
      nvtRatio: number;
      mcapToTvlRatio: number;
      priceToSalesRatio: number;
      priceToEarningsRatio: number;
      burnRate: number;
      stakingYield: number;
      apy: number;
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
      atr: number;
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
      fibonacci: {
        level: number;
        price: number;
        retracement: number;
      }[];
    };
    chartPatterns: {
      pattern: string;
      probability: number;
      target: number;
      stopLoss: number;
      timeframe: string;
    }[];
    onChainAnalysis: {
      whaleMovements: {
        address: string;
        balance: number;
        movement: string;
        amount: number;
      }[];
      exchangeFlows: {
        exchange: string;
        flow: string;
        amount: number;
      }[];
      networkGrowth: number;
      activeSupply: number;
      hodlWaves: {
        period: string;
        percentage: number;
      }[];
    };
    technicalEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: {
      priceRisk: number;
      volatilityRisk: number;
      liquidityRisk: number;
      correlationRisk: number;
      marketRisk: number;
    };
    technologyRisk: {
      securityRisk: number;
      scalabilityRisk: number;
      networkRisk: number;
      smartContractRisk: number;
      technologyRisk: number;
    };
    regulatoryRisk: {
      regulatoryUncertainty: number;
      banRisk: number;
      complianceRisk: number;
      taxRisk: number;
      regulatoryRisk: number;
    };
    operationalRisk: {
      exchangeRisk: number;
      walletRisk: number;
      keyManagementRisk: number;
      counterpartyRisk: number;
      operationalRisk: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // DeFi Analysis
  defiAnalysis: {
    defiMetrics: {
      totalValueLocked: number;
      totalValueLockedChange: number;
      protocolRevenue: number;
      protocolRevenueChange: number;
      userCount: number;
      userCountChange: number;
      transactionCount: number;
      transactionCountChange: number;
    };
    yieldFarming: {
      pool: string;
      apy: number;
      apr: number;
      rewards: {
        token: string;
        amount: number;
        value: number;
      }[];
      impermanentLoss: number;
      risk: number;
    }[];
    liquidityProvision: {
      pool: string;
      liquidity: number;
      fees: number;
      impermanentLoss: number;
      risk: number;
    }[];
    lendingBorrowing: {
      protocol: string;
      supplyApy: number;
      borrowApr: number;
      utilizationRate: number;
      collateralRatio: number;
      liquidationThreshold: number;
    }[];
    defiEfficiency: number;
  };
  
  // Staking Analysis
  stakingAnalysis: {
    stakingMetrics: {
      stakingRate: number;
      stakingRewards: number;
      stakingApy: number;
      validatorCount: number;
      minimumStake: number;
      unbondingPeriod: number;
    };
    validatorInfo: {
      validator: string;
      commission: number;
      uptime: number;
      delegators: number;
      totalStake: number;
      performance: number;
    }[];
    stakingRewards: {
      period: string;
      rewards: number;
      apy: number;
      compound: boolean;
    }[];
    stakingEfficiency: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    transactionCosts: {
      networkFees: number;
      exchangeFees: number;
      slippage: number;
      gasFees: number;
      totalTransactionCosts: number;
      costAsPercentage: number;
    };
    miningCosts: {
      electricityCost: number;
      hardwareCost: number;
      maintenanceCost: number;
      totalMiningCosts: number;
      costAsPercentage: number;
    };
    stakingCosts: {
      validatorFees: number;
      slashingRisk: number;
      opportunityCost: number;
      totalStakingCosts: number;
      costAsPercentage: number;
    };
    totalCosts: {
      transactionCosts: number;
      miningCosts: number;
      stakingCosts: number;
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
      stakingContribution: number;
      yieldContribution: number;
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
    relatedCryptocurrencies: {
      cryptocurrency: string;
      correlation: number;
      marketCap: number;
      performance: number;
    }[];
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      cryptocurrencyReturn: number;
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
      cryptocurrency: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Cryptocurrency Score
  cryptocurrencyScore: {
    overallScore: number;
    componentScores: {
      fundamental: number;
      technical: number;
      risk: number;
      defi: number;
      staking: number;
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
    stakingRewards: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    cryptocurrencyAssessment: string;
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
    marketCap: number;
    totalReturn: number;
    sharpeRatio: number;
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
