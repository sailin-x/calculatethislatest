export interface AlphaBetaInputs {
  // Portfolio data
  portfolioReturns: number[]; // Historical returns array
  benchmarkReturns: number[]; // Benchmark returns array (e.g., S&P 500)
  riskFreeRate: number; // Risk-free rate (e.g., Treasury yield)
  
  // Time period
  timePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  
  // Market data
  marketReturns: number[]; // Market returns for CAPM
  marketRiskPremium: number; // Market risk premium
  
  // Portfolio details
  portfolioValue: number;
  benchmarkName: string;
  investmentStrategy: 'active' | 'passive' | 'quantitative' | 'fundamental' | 'technical';
  
  // Risk metrics
  confidenceLevel: number; // For VaR calculations (e.g., 95%)
  lookbackPeriod: number; // Number of periods for calculations
  
  // Advanced parameters
  betaCalculationMethod: 'regression' | 'covariance' | 'correlation';
  alphaCalculationMethod: 'jensen' | 'treynor' | 'sharpe';
  riskAdjustment: 'none' | 'sharpe' | 'sortino' | 'calmar' | 'information';
  
  // Performance attribution
  sectorAllocation?: {
    sector: string;
    weight: number;
    return: number;
  }[];
  
  // Factor analysis
  factorExposures?: {
    factor: string;
    exposure: number;
    return: number;
  }[];
  
  // Transaction costs
  transactionCosts: number; // Percentage
  managementFees: number; // Percentage
  performanceFees: number; // Percentage
  
  // Benchmark comparison
  benchmarkExpenseRatio: number;
  benchmarkTrackingError: number;
  
  // Volatility analysis
  volatilityWindow: number; // Rolling window for volatility
  correlationWindow: number; // Rolling window for correlation
  
  // Stress testing
  stressScenarios?: {
    scenario: string;
    marketShock: number;
    correlationChange: number;
    volatilityChange: number;
  }[];
  
  // Custom parameters
  customRiskFreeRate?: number;
  customMarketPremium?: number;
  customBeta?: number;
  
  // Analysis parameters
  includeTransactionCosts: boolean;
  includeFees: boolean;
  adjustForRisk: boolean;
  useRollingWindows: boolean;
  includeStressTesting: boolean;
}

export interface AlphaBetaResults {
  // Core metrics
  alpha: number;
  beta: number;
  rSquared: number;
  correlation: number;
  
  // Risk metrics
  volatility: number;
  trackingError: number;
  informationRatio: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  treynorRatio: number;
  jensenAlpha: number;
  
  // Performance metrics
  totalReturn: number;
  excessReturn: number;
  riskAdjustedReturn: number;
  benchmarkReturn: number;
  marketReturn: number;
  
  // Statistical measures
  standardError: number;
  tStatistic: number;
  pValue: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  
  // Rolling analysis
  rollingAlpha: number[];
  rollingBeta: number[];
  rollingVolatility: number[];
  rollingSharpe: number[];
  
  // Factor analysis
  factorContributions: {
    factor: string;
    contribution: number;
    weight: number;
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
  
  // Benchmark analysis
  benchmarkComparison: {
    metric: string;
    portfolio: number;
    benchmark: number;
    difference: number;
    outperformance: boolean;
  }[];
  
  // Stress testing results
  stressTestResults: {
    scenario: string;
    alpha: number;
    beta: number;
    return: number;
    risk: number;
  }[];
  
  // Statistical significance
  statisticalSignificance: {
    alphaSignificant: boolean;
    betaSignificant: boolean;
    rSquaredSignificant: boolean;
  };
  
  // Risk-adjusted performance
  riskAdjustedMetrics: {
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
    alpha: number;
    beta: number;
    return: number;
    volatility: number;
    sharpeRatio: number;
  }[];
  
  // Correlation analysis
  correlationAnalysis: {
    period: string;
    correlation: number;
    rollingCorrelation: number[];
  };
  
  // Volatility analysis
  volatilityAnalysis: {
    historical: number;
    implied: number;
    rolling: number[];
    forecast: number;
  };
  
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
  
  // Performance persistence
  performancePersistence: {
    alphaPersistence: number;
    betaStability: number;
    returnConsistency: number;
  };
  
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
