export interface CryptocurrencyInputs {
  // Cryptocurrency Information
  cryptocurrencyName: string;
  cryptocurrencySymbol: string;
  blockchain: string;
  consensusMechanism: 'proof_of_work' | 'proof_of_stake' | 'delegated_proof_of_stake' | 'proof_of_authority' | 'proof_of_space' | 'proof_of_capacity' | 'hybrid';
  tokenType: 'coin' | 'token' | 'stablecoin' | 'governance_token' | 'utility_token' | 'security_token' | 'nft';
  
  // Price Information
  currentPrice: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  volume24h: number;
  priceChange24h: number;
  priceChange7d: number;
  priceChange30d: number;
  
  // Technical Information
  blockTime: number; // in seconds
  blockSize: number;
  transactionPerSecond: number;
  totalTransactions: number;
  activeAddresses: number;
  networkHashRate: number;
  
  // Staking Information
  stakingInfo: {
    stakingEnabled: boolean;
    stakingReward: number;
    stakingAPY: number;
    minimumStake: number;
    stakingPeriod: number;
    totalStaked: number;
    stakingRatio: number;
  };
  
  // Mining Information
  miningInfo: {
    miningEnabled: boolean;
    miningReward: number;
    miningDifficulty: number;
    miningHashRate: number;
    miningCost: number;
    miningProfitability: number;
  };
  
  // DeFi Information
  defiInfo: {
    totalValueLocked: number;
    defiProtocols: number;
    yieldFarming: boolean;
    lendingProtocols: boolean;
    dexVolume: number;
    liquidityPools: number;
  };
  
  // Smart Contract Information
  smartContractInfo: {
    smartContracts: number;
    contractAddresses: string[];
    contractAudits: boolean;
    auditScore: number;
    vulnerabilities: string[];
  };
  
  // Network Information
  networkInfo: {
    nodes: number;
    validators: number;
    decentralizationScore: number;
    networkUptime: number;
    networkSecurity: number;
    networkScalability: number;
  };
  
  // Adoption Metrics
  adoptionMetrics: {
    activeUsers: number;
    dailyTransactions: number;
    merchantAdoption: number;
    institutionalAdoption: number;
    regulatoryStatus: string;
    countryAdoption: string[];
  };
  
  // Developer Activity
  developerActivity: {
    githubRepositories: number;
    githubStars: number;
    githubForks: number;
    developerCount: number;
    codeCommits: number;
    developerScore: number;
  };
  
  // Market Data
  marketData: {
    bidPrice: number;
    askPrice: number;
    spread: number;
    orderBookDepth: number;
    marketDepth: number;
    tradingPairs: string[];
    exchanges: string[];
  };
  
  // Technical Analysis
  technicalAnalysis: {
    movingAverages: {
      period: number;
      value: number;
      signal: 'buy' | 'sell' | 'hold';
    }[];
    supportLevels: number[];
    resistanceLevels: number[];
    trendDirection: 'bullish' | 'bearish' | 'sideways';
    momentumIndicators: {
      indicator: string;
      value: number;
      signal: string;
    }[];
  };
  
  // On-Chain Analysis
  onChainAnalysis: {
    activeAddresses: number;
    newAddresses: number;
    transactionCount: number;
    averageTransactionValue: number;
    whaleTransactions: number;
    exchangeFlows: {
      exchange: string;
      inflow: number;
      outflow: number;
      netFlow: number;
    }[];
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    networkValue: number;
    networkValueToTransactions: number;
    priceToSales: number;
    priceToBook: number;
    fundamentalScore: number;
    fundamentalFactors: {
      factor: string;
      impact: number;
      weight: number;
    }[];
  };
  
  // Volatility Analysis
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    volatilityForecast: number;
    volatilitySkew: number;
    volatilityTerm: number;
  };
  
  // Correlation Analysis
  correlationAnalysis: {
    correlationWithBitcoin: number;
    correlationWithEthereum: number;
    correlationWithSP500: number;
    correlationWithGold: number;
    correlationWithUSD: number;
    correlationWithCryptoIndex: number;
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    averageDailyVolume: number;
    bidAskSpread: number;
    marketDepth: number;
    liquidityScore: number;
    tradingHours: string;
    marketParticipants: string[];
  };
  
  // Risk Factors
  riskFactors: {
    category: string;
    factor: string;
    impact: 'low' | 'medium' | 'high';
    probability: number;
    mitigation: string;
  }[];
  
  // Regulatory Environment
  regulatoryEnvironment: {
    regulatoryStatus: string;
    regulatoryRisks: string[];
    complianceCost: number;
    legalUncertainty: number;
    countryRegulations: {
      country: string;
      status: string;
      restrictions: string[];
    }[];
  };
  
  // Competition Analysis
  competitionAnalysis: {
    competitors: string[];
    competitiveAdvantage: string[];
    marketShare: number;
    competitivePosition: number;
    competitiveThreats: string[];
  };
  
  // Technology Analysis
  technologyAnalysis: {
    technologyScore: number;
    innovationLevel: number;
    scalability: number;
    security: number;
    efficiency: number;
    technologyRisks: string[];
  };
  
  // Team and Governance
  teamGovernance: {
    teamSize: number;
    teamExperience: number;
    teamTransparency: number;
    governanceModel: string;
    decisionMaking: string;
    communityParticipation: number;
  };
  
  // Tokenomics
  tokenomics: {
    tokenDistribution: {
      category: string;
      percentage: number;
      amount: number;
    }[];
    vestingSchedule: {
      period: string;
      percentage: number;
      amount: number;
    }[];
    inflationRate: number;
    deflationaryMechanism: boolean;
    burnRate: number;
  };
  
  // Use Cases
  useCases: {
    primaryUseCase: string;
    useCaseCategories: string[];
    realWorldAdoption: number;
    useCaseStrength: number;
    useCaseExamples: string[];
  };
  
  // Investment Information
  investmentInfo: {
    investmentAmount: number;
    investmentDate: string;
    investmentStrategy: 'hodl' | 'trading' | 'staking' | 'yield_farming' | 'defi' | 'nft';
    riskTolerance: 'low' | 'medium' | 'high';
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    priceChange: number;
    adoptionChange: number;
    regulatoryChange: number;
    technologyChange: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeJumpDiffusion: boolean;
  jumpIntensity: number;
  jumpSize: number;
  
  // Historical Analysis
  historicalData: {
    date: string;
    price: number;
    volume: number;
    marketCap: number;
    activeAddresses: number;
    transactions: number;
  }[];
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  confidenceLevel: number;
  timeHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeStakingRewards: boolean;
  
  // Reporting Preferences
  includePriceAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeTechnicalAnalysis: boolean;
  includeFundamentalAnalysis: boolean;
  includeOnChainAnalysis: boolean;
  includeVolatilityAnalysis: boolean;
  includeCorrelationAnalysis: boolean;
  includeAdoptionAnalysis: boolean;
  includeTechnologyAnalysis: boolean;
  includeRegulatoryAnalysis: boolean;
  includeCompetitionAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeTokenomicsAnalysis: boolean;
  includeUseCaseAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface CryptocurrencyResults {
  // Core Cryptocurrency Metrics
  cryptocurrencyValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  unrealizedPnL: number;
  realizedPnL: number;
  totalReturn: number;
  
  // Price Analysis
  priceAnalysis: {
    currentPrice: number;
    fairValue: number;
    intrinsicValue: number;
    overvaluation: number;
    undervaluation: number;
    priceForecast: number;
    priceVolatility: number;
  };
  
  // Risk Metrics
  riskMetrics: {
    valueAtRisk: number;
    conditionalVaR: number;
    expectedShortfall: number;
    maxDrawdown: number;
    downsideDeviation: number;
    riskOfLoss: number;
  };
  
  // Performance Metrics
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
  };
  
  // Technical Analysis Results
  technicalAnalysis: {
    movingAverages: {
      period: number;
      value: number;
      signal: 'buy' | 'sell' | 'hold';
    }[];
    supportLevels: number[];
    resistanceLevels: number[];
    trendDirection: 'bullish' | 'bearish' | 'sideways';
    momentumIndicators: {
      indicator: string;
      value: number;
      signal: string;
    }[];
    technicalScore: number;
  };
  
  // Fundamental Analysis Results
  fundamentalAnalysis: {
    networkValue: number;
    networkValueToTransactions: number;
    priceToSales: number;
    priceToBook: number;
    fundamentalScore: number;
    fundamentalFactors: {
      factor: string;
      impact: number;
      weight: number;
    }[];
  };
  
  // On-Chain Analysis Results
  onChainAnalysis: {
    activeAddresses: number;
    newAddresses: number;
    transactionCount: number;
    averageTransactionValue: number;
    whaleTransactions: number;
    exchangeFlows: {
      exchange: string;
      inflow: number;
      outflow: number;
      netFlow: number;
    }[];
    onChainScore: number;
  };
  
  // Volatility Analysis Results
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilityRegime: string;
    volatilityForecast: number;
    volatilitySkew: number;
    volatilityTerm: number;
    volatilitySurface: {
      maturity: number;
      strike: number;
      volatility: number;
    }[];
  };
  
  // Correlation Analysis Results
  correlationAnalysis: {
    correlationWithBitcoin: number;
    correlationWithEthereum: number;
    correlationWithSP500: number;
    correlationWithGold: number;
    correlationWithUSD: number;
    correlationWithCryptoIndex: number;
    averageCorrelation: number;
  };
  
  // Adoption Analysis
  adoptionAnalysis: {
    activeUsers: number;
    dailyTransactions: number;
    merchantAdoption: number;
    institutionalAdoption: number;
    regulatoryStatus: string;
    countryAdoption: string[];
    adoptionScore: number;
    adoptionTrend: string;
  };
  
  // Technology Analysis Results
  technologyAnalysis: {
    technologyScore: number;
    innovationLevel: number;
    scalability: number;
    security: number;
    efficiency: number;
    technologyRisks: string[];
    technologyStrengths: string[];
  };
  
  // Regulatory Analysis
  regulatoryAnalysis: {
    regulatoryStatus: string;
    regulatoryRisks: string[];
    complianceCost: number;
    legalUncertainty: number;
    countryRegulations: {
      country: string;
      status: string;
      restrictions: string[];
    }[];
    regulatoryScore: number;
  };
  
  // Competition Analysis Results
  competitionAnalysis: {
    competitors: string[];
    competitiveAdvantage: string[];
    marketShare: number;
    competitivePosition: number;
    competitiveThreats: string[];
    competitiveScore: number;
  };
  
  // Liquidity Analysis Results
  liquidityAnalysis: {
    averageDailyVolume: number;
    bidAskSpread: number;
    marketDepth: number;
    liquidityScore: number;
    liquidityRisk: number;
    marketImpact: number;
  };
  
  // Staking Analysis
  stakingAnalysis: {
    stakingEnabled: boolean;
    stakingReward: number;
    stakingAPY: number;
    minimumStake: number;
    stakingPeriod: number;
    totalStaked: number;
    stakingRatio: number;
    stakingValue: number;
    stakingEfficiency: number;
  };
  
  // Mining Analysis
  miningAnalysis: {
    miningEnabled: boolean;
    miningReward: number;
    miningDifficulty: number;
    miningHashRate: number;
    miningCost: number;
    miningProfitability: number;
    miningValue: number;
    miningEfficiency: number;
  };
  
  // DeFi Analysis
  defiAnalysis: {
    totalValueLocked: number;
    defiProtocols: number;
    yieldFarming: boolean;
    lendingProtocols: boolean;
    dexVolume: number;
    liquidityPools: number;
    defiValue: number;
    defiEfficiency: number;
  };
  
  // Tokenomics Analysis
  tokenomicsAnalysis: {
    tokenDistribution: {
      category: string;
      percentage: number;
      amount: number;
    }[];
    vestingSchedule: {
      period: string;
      percentage: number;
      amount: number;
    }[];
    inflationRate: number;
    deflationaryMechanism: boolean;
    burnRate: number;
    tokenomicsScore: number;
  };
  
  // Use Case Analysis
  useCaseAnalysis: {
    primaryUseCase: string;
    useCaseCategories: string[];
    realWorldAdoption: number;
    useCaseStrength: number;
    useCaseExamples: string[];
    useCaseScore: number;
  };
  
  // Team and Governance Analysis
  teamGovernanceAnalysis: {
    teamSize: number;
    teamExperience: number;
    teamTransparency: number;
    governanceModel: string;
    decisionMaking: string;
    communityParticipation: number;
    teamGovernanceScore: number;
  };
  
  // Developer Activity Analysis
  developerActivityAnalysis: {
    githubRepositories: number;
    githubStars: number;
    githubForks: number;
    developerCount: number;
    codeCommits: number;
    developerScore: number;
    developerTrend: string;
  };
  
  // Network Analysis
  networkAnalysis: {
    nodes: number;
    validators: number;
    decentralizationScore: number;
    networkUptime: number;
    networkSecurity: number;
    networkScalability: number;
    networkScore: number;
  };
  
  // Smart Contract Analysis
  smartContractAnalysis: {
    smartContracts: number;
    contractAddresses: string[];
    contractAudits: boolean;
    auditScore: number;
    vulnerabilities: string[];
    smartContractScore: number;
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    price: number;
    profitLoss: number;
    return: number;
    riskMetrics: {
      var: number;
      cvar: number;
      maxDrawdown: number;
    };
  }[];
  
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
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalReturn: number;
    historicalVolatility: number;
    historicalSharpeRatio: number;
    historicalMaxDrawdown: number;
    priceTrend: number;
    priceCycles: string[];
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPrice: number;
    highPrice: number;
    sensitivity: number;
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    benchmark: string;
    benchmarkReturn: number;
    excessReturn: number;
    trackingError: number;
    informationRatio: number;
    relativePerformance: number;
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
    roi: number;
    paybackPeriod: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    riskAdjustedReturn: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    riskAssessment: string;
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
    cryptocurrencyValue: number;
    totalReturn: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'buy' | 'sell' | 'hold';
    keyRisks: string[];
    keyOpportunities: string[];
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
