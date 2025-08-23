export interface VaRInputs {
  // Portfolio data
  portfolioReturns: number[]; // Historical returns array
  portfolioValue: number; // Current portfolio value
  assetWeights: number[]; // Asset allocation weights
  
  // VaR parameters
  confidenceLevel: number; // Confidence level (e.g., 95%, 99%)
  timeHorizon: number; // Time horizon in days
  varMethod: 'historical' | 'parametric' | 'monte-carlo' | 'conditional';
  
  // Asset data
  assetReturns: number[][]; // Returns for each asset
  assetNames: string[]; // Names of assets
  assetValues: number[]; // Current values of each asset
  
  // Market data
  marketReturns: number[]; // Market returns for beta calculation
  riskFreeRate: number; // Risk-free rate
  
  // Volatility parameters
  volatilityMethod: 'historical' | 'exponential' | 'garch' | 'ewma';
  volatilityWindow: number; // Window for volatility calculation
  decayFactor: number; // Decay factor for EWMA
  
  // Distribution assumptions
  distributionType: 'normal' | 'student-t' | 'skewed-t' | 'empirical';
  degreesOfFreedom: number; // For Student's t-distribution
  
  // Correlation and covariance
  correlationMethod: 'historical' | 'exponential' | 'constant';
  useDynamicCorrelations: boolean;
  
  // Monte Carlo parameters
  monteCarloSimulations: number; // Number of simulations
  monteCarloSeed: number; // Random seed for reproducibility
  
  // Stress testing
  stressScenarios: {
    scenario: string;
    probability: number;
    marketShock: number;
    correlationChange: number;
    volatilityChange: number;
  }[];
  
  // Risk factors
  riskFactors: {
    factor: string;
    exposure: number;
    volatility: number;
    correlation: number;
  }[];
  
  // Liquidity considerations
  liquidityAdjustments: {
    bidAskSpread: number;
    marketImpact: number;
    holdingPeriod: number;
    liquidationTime: number;
  };
  
  // Regulatory requirements
  regulatoryVaR: {
    baselII: boolean;
    baselIII: boolean;
    solvencyII: boolean;
    regulatoryMultiplier: number;
  };
  
  // Backtesting parameters
  backtestingWindow: number; // Days for backtesting
  backtestingFrequency: 'daily' | 'weekly' | 'monthly';
  
  // Extreme value theory
  extremeValueTheory: {
    useEVT: boolean;
    threshold: number;
    tailIndex: number;
  };
  
  // Copula modeling
  copulaModel: {
    useCopula: boolean;
    copulaType: 'gaussian' | 'student-t' | 'clayton' | 'gumbel';
    copulaParameters: number[];
  };
  
  // Time-varying parameters
  timeVaryingParameters: {
    useTimeVarying: boolean;
    updateFrequency: 'daily' | 'weekly' | 'monthly';
    estimationWindow: number;
  };
  
  // Risk decomposition
  riskDecomposition: {
    includeDecomposition: boolean;
    decompositionMethod: 'marginal' | 'component' | 'incremental';
  };
  
  // Custom parameters
  customVolatility?: number;
  customCorrelation?: number[][];
  customDistribution?: number[];
  
  // Analysis parameters
  includeExpectedShortfall: boolean;
  includeStressTesting: boolean;
  includeBacktesting: boolean;
  includeRiskDecomposition: boolean;
  includeConfidenceIntervals: boolean;
}

export interface VaRResults {
  // Core VaR metrics
  var: number;
  expectedShortfall: number;
  conditionalVaR: number;
  
  // Time-based VaR
  dailyVaR: number;
  weeklyVaR: number;
  monthlyVaR: number;
  annualVaR: number;
  
  // Method-specific results
  historicalVaR: number;
  parametricVaR: number;
  monteCarloVaR: number;
  conditionalVaR: number;
  
  // Confidence intervals
  varConfidenceInterval: {
    lower: number;
    upper: number;
    confidence: number;
  };
  
  // Risk decomposition
  riskDecomposition: {
    asset: string;
    marginalVaR: number;
    componentVaR: number;
    percentageContribution: number;
  }[];
  
  // Factor analysis
  factorVaR: {
    factor: string;
    var: number;
    contribution: number;
    exposure: number;
  }[];
  
  // Stress testing results
  stressTestResults: {
    scenario: string;
    probability: number;
    var: number;
    expectedShortfall: number;
    impact: number;
  }[];
  
  // Backtesting results
  backtestingResults: {
    date: string;
    actualReturn: number;
    predictedVaR: number;
    violation: boolean;
    cumulativeViolations: number;
    violationRate: number;
  }[];
  
  // Statistical measures
  statisticalMeasures: {
    mean: number;
    standardDeviation: number;
    skewness: number;
    kurtosis: number;
    varOfReturns: number;
  };
  
  // Distribution analysis
  distributionAnalysis: {
    distributionType: string;
    goodnessOfFit: number;
    tailIndex: number;
    extremeValueVaR: number;
  };
  
  // Volatility analysis
  volatilityAnalysis: {
    historical: number;
    implied: number;
    forecast: number;
    rolling: number[];
  };
  
  // Correlation analysis
  correlationAnalysis: {
    averageCorrelation: number;
    correlationMatrix: number[][];
    correlationStability: number;
  };
  
  // Monte Carlo results
  monteCarloResults: {
    meanVaR: number;
    medianVaR: number;
    standardDeviation: number;
    percentiles: {
      p1: number;
      p5: number;
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
      p95: number;
      p99: number;
    };
    convergence: boolean;
  };
  
  // Liquidity-adjusted VaR
  liquidityAdjustedVaR: {
    basicVaR: number;
    liquidityAdjustment: number;
    adjustedVaR: number;
    liquidityCost: number;
  };
  
  // Regulatory VaR
  regulatoryVaR: {
    basicVaR: number;
    regulatoryMultiplier: number;
    regulatoryVaR: number;
    capitalRequirement: number;
  };
  
  // Risk metrics
  riskMetrics: {
    maximumDrawdown: number;
    downsideDeviation: number;
    semiDeviation: number;
    valueAtRisk: number;
    expectedShortfall: number;
  };
  
  // Performance metrics
  performanceMetrics: {
    varEfficiency: number;
    riskAdjustedReturn: number;
    informationRatio: number;
    sharpeRatio: number;
  };
  
  // Time series analysis
  timeSeriesAnalysis: {
    varTrend: number[];
    volatilityTrend: number[];
    correlationTrend: number[];
    regimeChanges: string[];
  };
  
  // Extreme events
  extremeEvents: {
    worstDay: string;
    worstReturn: number;
    varViolation: number;
    frequency: number;
  };
  
  // Risk budgeting
  riskBudgeting: {
    asset: string;
    allocation: number;
    riskContribution: number;
    riskBudget: number;
    excessRisk: number;
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
