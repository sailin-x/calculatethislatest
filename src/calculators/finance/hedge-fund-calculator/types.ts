export interface HedgeFundInputs {
  // Fund Information
  fundName: string;
  fundSize: number;
  fundInception: string;
  fundType: 'long_short' | 'global_macro' | 'event_driven' | 'relative_value' | 'directional' | 'quantitative' | 'multi_strategy' | 'fund_of_funds' | 'distressed' | 'arbitrage' | 'managed_futures' | 'cta';
  strategy: string;
  investmentStyle: 'growth' | 'value' | 'momentum' | 'mean_reversion' | 'statistical_arbitrage' | 'pairs_trading' | 'market_neutral' | 'directional' | 'systematic' | 'discretionary';
  
  // Investment Information
  investmentAmount: number;
  investmentDate: string;
  shareClass: string;
  currency: string;
  lockupPeriod: number; // in months
  noticePeriod: number; // in days
  redemptionFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
  
  // Fee Structure
  managementFee: number; // percentage
  performanceFee: number; // percentage
  hurdleRate: number; // percentage
  highWaterMark: boolean;
  catchUp: number; // percentage
  otherFees: {
    fee: string;
    amount: number;
    frequency: string;
  }[];
  
  // Performance Metrics
  netAssetValue: number;
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  treynorRatio: number;
  informationRatio: number;
  jensenAlpha: number;
  beta: number;
  rSquared: number;
  
  // Risk Metrics
  valueAtRisk: number;
  conditionalVaR: number;
  expectedShortfall: number;
  maxDrawdown: number;
  downsideDeviation: number;
  riskOfLoss: number;
  varConfidence: number;
  
  // Portfolio Composition
  portfolioComposition: {
    assetClass: string;
    allocation: number;
    benchmark: string;
    activeWeight: number;
  }[];
  
  // Geographic Allocation
  geographicAllocation: {
    region: string;
    allocation: number;
    benchmark: number;
    activeWeight: number;
  }[];
  
  // Sector Allocation
  sectorAllocation: {
    sector: string;
    allocation: number;
    benchmark: number;
    activeWeight: number;
  }[];
  
  // Market Cap Allocation
  marketCapAllocation: {
    category: string;
    allocation: number;
    benchmark: number;
    activeWeight: number;
  }[];
  
  // Leverage and Exposure
  grossExposure: number;
  netExposure: number;
  longExposure: number;
  shortExposure: number;
  leverage: number;
  marginUtilization: number;
  
  // Position Sizing
  positionSizing: {
    maxPositionSize: number;
    maxSectorWeight: number;
    maxCountryWeight: number;
    maxSingleName: number;
    averagePositionSize: number;
    concentrationRisk: number;
  };
  
  // Trading Activity
  tradingActivity: {
    turnover: number;
    averageHoldingPeriod: number;
    tradeFrequency: number;
    averageTradeSize: number;
    slippage: number;
    transactionCosts: number;
  };
  
  // Risk Management
  riskManagement: {
    stopLoss: number;
    positionLimits: number;
    sectorLimits: number;
    countryLimits: number;
    correlationLimits: number;
    varLimits: number;
    stressTesting: boolean;
    scenarioAnalysis: boolean;
  };
  
  // Benchmark Information
  benchmark: string;
  benchmarkReturn: number;
  benchmarkVolatility: number;
  trackingError: number;
  informationRatio: number;
  activeShare: number;
  
  // Market Conditions
  marketConditions: {
    marketRegime: 'bull' | 'bear' | 'sideways' | 'volatile' | 'trending' | 'mean_reverting';
    volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    correlationRegime: 'low' | 'normal' | 'high';
    liquidityRegime: 'high' | 'normal' | 'low';
    interestRateEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
  };
  
  // Factor Exposures
  factorExposures: {
    market: number;
    size: number;
    value: number;
    momentum: number;
    quality: number;
    volatility: number;
    credit: number;
    currency: number;
    commodity: number;
    interestRate: number;
  };
  
  // Alpha Analysis
  alphaAnalysis: {
    totalAlpha: number;
    systematicAlpha: number;
    idiosyncraticAlpha: number;
    alphaStability: number;
    alphaPersistence: number;
    alphaDecay: number;
  };
  
  // Attribution Analysis
  attributionAnalysis: {
    assetAllocation: number;
    stockSelection: number;
    interaction: number;
    totalActive: number;
    benchmarkReturn: number;
    excessReturn: number;
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    liquidityScore: number;
    averageBidAskSpread: number;
    marketImpact: number;
    timeToLiquidate: number;
    liquidityRisk: number;
    redemptionRisk: number;
  };
  
  // Operational Risk
  operationalRisk: {
    counterpartyRisk: number;
    settlementRisk: number;
    custodyRisk: number;
    technologyRisk: number;
    complianceRisk: number;
    regulatoryRisk: number;
    totalOperationalRisk: number;
  };
  
  // Manager Analysis
  managerAnalysis: {
    experience: number;
    trackRecord: number;
    teamSize: number;
    infrastructure: number;
    riskManagement: number;
    compliance: number;
    overallScore: number;
  };
  
  // Fund Structure
  fundStructure: {
    domicile: string;
    structure: string;
    taxTreatment: string;
    regulatoryStatus: string;
    auditFirm: string;
    administrator: string;
    primeBroker: string;
  };
  
  // Historical Performance
  historicalPerformance: {
    monthlyReturns: {
      date: string;
      return: number;
      nav: number;
      benchmark: number;
    }[];
    rollingMetrics: {
      period: number;
      return: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
    }[];
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    marketReturn: number;
    fundReturn: number;
    volatility: number;
    correlation: number;
    liquidity: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRegimeChanges: boolean;
  regimeChangeProbability: number;
  regimeChangeImpact: number;
  
  // Stress Testing
  stressTests: {
    name: string;
    marketShock: number;
    volatilityShock: number;
    correlationShock: number;
    liquidityShock: number;
    expectedLoss: number;
    var: number;
  }[];
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  rebalancingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  includeFees: boolean;
  includeTaxes: boolean;
  includeTransactionCosts: boolean;
  
  // Reporting Preferences
  includePerformanceAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeAttributionAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeStressTesting: boolean;
  includeLiquidityAnalysis: boolean;
  includeOperationalRisk: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface HedgeFundResults {
  // Core Performance Metrics
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  treynorRatio: number;
  informationRatio: number;
  jensenAlpha: number;
  beta: number;
  rSquared: number;
  
  // Risk Metrics
  riskMetrics: {
    valueAtRisk: number;
    conditionalVaR: number;
    expectedShortfall: number;
    maxDrawdown: number;
    downsideDeviation: number;
    riskOfLoss: number;
    varConfidence: number;
    tailRisk: number;
  };
  
  // Performance Analysis
  performanceAnalysis: {
    totalReturn: number;
    excessReturn: number;
    benchmarkReturn: number;
    trackingError: number;
    informationRatio: number;
    activeShare: number;
    performanceAttribution: {
      assetAllocation: number;
      stockSelection: number;
      interaction: number;
      totalActive: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: number;
    systematicRisk: number;
    idiosyncraticRisk: number;
    liquidityRisk: number;
    operationalRisk: number;
    leverageRisk: number;
    concentrationRisk: number;
    totalRisk: number;
  };
  
  // Factor Analysis
  factorAnalysis: {
    factorExposures: {
      market: number;
      size: number;
      value: number;
      momentum: number;
      quality: number;
      volatility: number;
      credit: number;
      currency: number;
      commodity: number;
      interestRate: number;
    };
    factorContributions: {
      factor: string;
      contribution: number;
      risk: number;
      informationRatio: number;
    }[];
    factorTiming: number;
    factorSelection: number;
  };
  
  // Alpha Analysis
  alphaAnalysis: {
    totalAlpha: number;
    systematicAlpha: number;
    idiosyncraticAlpha: number;
    alphaStability: number;
    alphaPersistence: number;
    alphaDecay: number;
    alphaConsistency: number;
    alphaQuality: number;
  };
  
  // Attribution Analysis
  attributionAnalysis: {
    assetAllocation: number;
    stockSelection: number;
    interaction: number;
    totalActive: number;
    benchmarkReturn: number;
    excessReturn: number;
    attributionBreakdown: {
      category: string;
      contribution: number;
      risk: number;
      informationRatio: number;
    }[];
  };
  
  // Portfolio Analysis
  portfolioAnalysis: {
    portfolioComposition: {
      assetClass: string;
      allocation: number;
      benchmark: number;
      activeWeight: number;
      contribution: number;
    }[];
    geographicAllocation: {
      region: string;
      allocation: number;
      benchmark: number;
      activeWeight: number;
      contribution: number;
    }[];
    sectorAllocation: {
      sector: string;
      allocation: number;
      benchmark: number;
      activeWeight: number;
      contribution: number;
    }[];
    marketCapAllocation: {
      category: string;
      allocation: number;
      benchmark: number;
      activeWeight: number;
      contribution: number;
    }[];
  };
  
  // Exposure Analysis
  exposureAnalysis: {
    grossExposure: number;
    netExposure: number;
    longExposure: number;
    shortExposure: number;
    leverage: number;
    marginUtilization: number;
    exposureEfficiency: number;
    exposureRisk: number;
  };
  
  // Trading Analysis
  tradingAnalysis: {
    turnover: number;
    averageHoldingPeriod: number;
    tradeFrequency: number;
    averageTradeSize: number;
    slippage: number;
    transactionCosts: number;
    tradingEfficiency: number;
    tradingImpact: number;
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    liquidityScore: number;
    averageBidAskSpread: number;
    marketImpact: number;
    timeToLiquidate: number;
    liquidityRisk: number;
    redemptionRisk: number;
    liquidityEfficiency: number;
    liquidityCost: number;
  };
  
  // Operational Risk Analysis
  operationalRiskAnalysis: {
    counterpartyRisk: number;
    settlementRisk: number;
    custodyRisk: number;
    technologyRisk: number;
    complianceRisk: number;
    regulatoryRisk: number;
    totalOperationalRisk: number;
    riskMitigation: string[];
  };
  
  // Manager Analysis
  managerAnalysis: {
    experience: number;
    trackRecord: number;
    teamSize: number;
    infrastructure: number;
    riskManagement: number;
    compliance: number;
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    fundReturn: number;
    benchmarkReturn: number;
    excessReturn: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
  }[];
  
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
      return: number;
      probability: number;
    }[];
  };
  
  // Stress Test Results
  stressTestResults: {
    testName: string;
    marketShock: number;
    volatilityShock: number;
    correlationShock: number;
    liquidityShock: number;
    expectedLoss: number;
    var: number;
    maxDrawdown: number;
    recoveryTime: number;
  }[];
  
  // Historical Analysis
  historicalAnalysis: {
    historicalReturn: number;
    historicalVolatility: number;
    historicalSharpeRatio: number;
    historicalMaxDrawdown: number;
    rollingMetrics: {
      period: number;
      return: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
    }[];
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    peerGroup: string[];
    peerRanking: number;
    peerPercentile: number;
    relativePerformance: number;
    relativeRisk: number;
    relativeSharpeRatio: number;
    relativeInformationRatio: number;
  };
  
  // Fee Analysis
  feeAnalysis: {
    totalFees: number;
    managementFee: number;
    performanceFee: number;
    otherFees: number;
    feeImpact: number;
    afterFeeReturn: number;
    feeEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowReturn: number;
    highReturn: number;
    sensitivity: number;
  }[];
  
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
    totalReturn: number;
    sharpeRatio: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'invest' | 'pass' | 'hold';
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
