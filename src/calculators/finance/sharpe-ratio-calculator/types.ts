export interface SharpeRatioInputs {
  // Portfolio data
  portfolioReturns: number[]; // Historical returns array
  riskFreeRate: number; // Risk-free rate (e.g., Treasury yield)
  
  // Time period
  timePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  
  // Portfolio details
  portfolioValue: number;
  portfolioName: string;
  investmentStrategy: 'active' | 'passive' | 'quantitative' | 'fundamental' | 'technical';
  
  // Risk-free rate details
  riskFreeRateType: 'treasury-bill' | 'treasury-bond' | 'federal-funds' | 'libor' | 'custom';
  riskFreeRatePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  
  // Benchmark data
  benchmarkReturns?: number[]; // Benchmark returns for comparison
  benchmarkName?: string;
  
  // Risk metrics
  confidenceLevel: number; // For VaR calculations (e.g., 95%)
  lookbackPeriod: number; // Number of periods for calculations
  
  // Advanced parameters
  sharpeRatioType: 'ex-post' | 'ex-ante' | 'information';
  riskAdjustment: 'none' | 'downside' | 'semi-variance' | 'var';
  returnCalculation: 'arithmetic' | 'geometric' | 'logarithmic';
  
  // Risk-free rate adjustments
  riskFreeRateAdjustments: {
    inflationAdjustment: boolean;
    taxAdjustment: boolean;
    liquidityAdjustment: boolean;
  };
  
  // Volatility analysis
  volatilityWindow: number; // Rolling window for volatility
  volatilityMethod: 'standard' | 'exponential' | 'garch' | 'ewma';
  
  // Performance attribution
  sectorAllocation?: {
    sector: string;
    weight: number;
    return: number;
    risk: number;
  }[];
  
  // Factor analysis
  factorExposures?: {
    factor: string;
    exposure: number;
    return: number;
    risk: number;
  }[];
  
  // Transaction costs
  transactionCosts: number; // Percentage
  managementFees: number; // Percentage
  performanceFees: number; // Percentage
  
  // Benchmark comparison
  benchmarkExpenseRatio: number;
  benchmarkTrackingError: number;
  
  // Risk management
  stopLossPercentage: number; // Stop loss percentage
  rebalancingFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually' | 'never';
  
  // Market conditions
  marketConditions: 'bull' | 'bear' | 'sideways' | 'volatile';
  economicScenario: 'recession' | 'stable' | 'growth' | 'boom';
  
  // Custom parameters
  customRiskFreeRate?: number;
  customVolatility?: number;
  customReturn?: number;
  
  // Analysis parameters
  includeTransactionCosts: boolean;
  includeFees: boolean;
  adjustForRisk: boolean;
  useRollingWindows: boolean;
  includeBenchmarkComparison: boolean;
  includeFactorAnalysis: boolean;
}

export interface SharpeRatioResults {
  // Core Sharpe ratio metrics
  sharpeRatio: number;
  excessReturn: number;
  volatility: number;
  riskFreeRate: number;
  
  // Alternative risk-adjusted ratios
  sortinoRatio: number;
  calmarRatio: number;
  informationRatio: number;
  treynorRatio: number;
  jensenAlpha: number;
  
  // Performance metrics
  totalReturn: number;
  annualizedReturn: number;
  annualizedVolatility: number;
  annualizedExcessReturn: number;
  
  // Statistical measures
  standardError: number;
  tStatistic: number;
  pValue: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  
  // Rolling analysis
  rollingSharpeRatio: number[];
  rollingVolatility: number[];
  rollingReturns: number[];
  rollingExcessReturns: number[];
  
  // Risk analysis
  riskAnalysis: {
    downsideDeviation: number;
    maximumDrawdown: number;
    valueAtRisk: number;
    expectedShortfall: number;
    skewness: number;
    kurtosis: number;
  };
  
  // Benchmark comparison
  benchmarkComparison: {
    benchmarkSharpeRatio: number;
    benchmarkReturn: number;
    benchmarkVolatility: number;
    outperformance: number;
    trackingError: number;
    informationRatio: number;
  };
  
  // Factor analysis
  factorAnalysis: {
    factor: string;
    contribution: number;
    weight: number;
    sharpeRatio: number;
  }[];
  
  // Performance attribution
  performanceAttribution: {
    assetAllocation: number;
    stockSelection: number;
    interaction: number;
    total: number;
  };
  
  // Risk decomposition
  riskDecomposition: {
    systematic: number;
    idiosyncratic: number;
    total: number;
  };
  
  // Market timing analysis
  marketTimingAnalysis: {
    bullMarketSharpe: number;
    bearMarketSharpe: number;
    marketTimingSkill: number;
    timingContribution: number;
  };
  
  // Volatility analysis
  volatilityAnalysis: {
    historical: number;
    implied: number;
    rolling: number[];
    forecast: number;
  };
  
  // Correlation analysis
  correlationAnalysis: {
    correlationWithMarket: number;
    correlationWithBenchmark: number;
    rollingCorrelation: number[];
  };
  
  // Performance persistence
  performancePersistence: {
    sharpeRatioPersistence: number;
    returnPersistence: number;
    riskPersistence: number;
  };
  
  // Risk-adjusted performance
  riskAdjustedPerformance: {
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    informationRatio: number;
    treynorRatio: number;
    jensenAlpha: number;
  };
  
  // Rolling performance
  rollingPerformance: {
    period: string;
    sharpeRatio: number;
    return: number;
    volatility: number;
    excessReturn: number;
  }[];
  
  // Value at Risk
  valueAtRisk: {
    daily: number;
    weekly: number;
    monthly: number;
    annual: number;
  };
  
  // Expected Shortfall
  expectedShortfall: {
    daily: number;
    weekly: number;
    monthly: number;
    annual: number;
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    area: string;
    currentValue: number;
    potentialValue: number;
    improvement: number;
    recommendations: string[];
  }[];
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
  }[];
}
