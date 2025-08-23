export interface PortfolioOptimizationInputs {
  // Asset data
  assetReturns: number[][]; // Historical returns for each asset
  assetNames: string[]; // Names of assets
  assetPrices: number[]; // Current prices of assets
  assetWeights: number[]; // Current portfolio weights
  
  // Portfolio constraints
  totalInvestment: number; // Total amount to invest
  minWeight: number; // Minimum weight per asset
  maxWeight: number; // Maximum weight per asset
  targetReturn: number; // Target portfolio return
  
  // Risk parameters
  riskFreeRate: number; // Risk-free rate
  riskAversion: number; // Risk aversion coefficient
  confidenceLevel: number; // For VaR calculations
  
  // Optimization method
  optimizationMethod: 'mean-variance' | 'black-litterman' | 'risk-parity' | 'maximum-sharpe' | 'minimum-variance' | 'maximum-diversification';
  
  // Time period
  timePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  
  // Market data
  marketReturns: number[]; // Market returns for CAPM
  benchmarkReturns: number[]; // Benchmark returns
  benchmarkName: string;
  
  // Asset categories
  assetCategories: {
    asset: string;
    category: string;
    sector: string;
    region: string;
    marketCap: 'small' | 'mid' | 'large';
  }[];
  
  // Constraints
  constraints: {
    sectorLimits: {
      sector: string;
      minWeight: number;
      maxWeight: number;
    }[];
    regionLimits: {
      region: string;
      minWeight: number;
      maxWeight: number;
    }[];
    categoryLimits: {
      category: string;
      minWeight: number;
      maxWeight: number;
    }[];
    concentrationLimits: {
      maxSingleAsset: number;
      maxTop5Assets: number;
      maxTop10Assets: number;
    };
  };
  
  // Transaction costs
  transactionCosts: {
    fixedCost: number;
    variableCost: number; // Percentage
    minimumCost: number;
    maximumCost: number;
  };
  
  // Rebalancing
  rebalancing: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
    threshold: number; // Rebalancing threshold
    cost: number; // Rebalancing cost
  };
  
  // Risk models
  riskModel: {
    type: 'historical' | 'parametric' | 'monte-carlo' | 'factor';
    volatilityMethod: 'standard' | 'exponential' | 'garch' | 'ewma';
    correlationMethod: 'historical' | 'exponential' | 'constant';
    covarianceMethod: 'sample' | 'shrinkage' | 'robust';
  };
  
  // Factor models
  factorModel: {
    useFactorModel: boolean;
    factors: {
      factor: string;
      exposure: number[];
      return: number[];
      risk: number;
    }[];
  };
  
  // Black-Litterman model
  blackLitterman: {
    useBlackLitterman: boolean;
    views: {
      asset: string;
      expectedReturn: number;
      confidence: number;
    }[];
    tau: number; // Scaling parameter
  };
  
  // Risk parity
  riskParity: {
    useRiskParity: boolean;
    targetRiskContribution: number[];
    riskMeasure: 'volatility' | 'var' | 'expected-shortfall';
  };
  
  // Maximum diversification
  maximumDiversification: {
    useMaximumDiversification: boolean;
    diversificationMeasure: 'diversification-ratio' | 'effective-n';
  };
  
  // Scenario analysis
  scenarios: {
    scenario: string;
    probability: number;
    assetReturns: number[];
    marketReturn: number;
  }[];
  
  // Stress testing
  stressTests: {
    test: string;
    marketShock: number;
    correlationBreakdown: number;
    volatilityIncrease: number;
  }[];
  
  // Performance attribution
  performanceAttribution: {
    includeAttribution: boolean;
    attributionMethod: 'brinson' | 'factor' | 'risk';
  };
  
  // Optimization parameters
  optimizationParams: {
    maxIterations: number;
    tolerance: number;
    solver: 'quadratic' | 'linear' | 'nonlinear';
    includeTransactionCosts: boolean;
    includeTaxes: boolean;
  };
  
  // Output preferences
  outputPreferences: {
    includeEfficientFrontier: boolean;
    includeRiskDecomposition: boolean;
    includePerformanceAttribution: boolean;
    includeStressTesting: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
}

export interface PortfolioOptimizationResults {
  // Optimal portfolio
  optimalPortfolio: {
    weights: number[];
    expectedReturn: number;
    expectedRisk: number;
    sharpeRatio: number;
    informationRatio: number;
  };
  
  // Efficient frontier
  efficientFrontier: {
    return: number;
    risk: number;
    sharpeRatio: number;
    weights: number[];
  }[];
  
  // Risk decomposition
  riskDecomposition: {
    asset: string;
    weight: number;
    riskContribution: number;
    percentageContribution: number;
    marginalRisk: number;
  }[];
  
  // Performance attribution
  performanceAttribution: {
    assetAllocation: number;
    stockSelection: number;
    interaction: number;
    total: number;
  };
  
  // Factor analysis
  factorAnalysis: {
    factor: string;
    exposure: number;
    contribution: number;
    risk: number;
  }[];
  
  // Risk metrics
  riskMetrics: {
    volatility: number;
    valueAtRisk: number;
    expectedShortfall: number;
    maximumDrawdown: number;
    downsideDeviation: number;
    beta: number;
    trackingError: number;
  };
  
  // Performance metrics
  performanceMetrics: {
    totalReturn: number;
    excessReturn: number;
    riskAdjustedReturn: number;
    informationRatio: number;
    treynorRatio: number;
    jensenAlpha: number;
  };
  
  // Optimization statistics
  optimizationStats: {
    iterations: number;
    convergence: boolean;
    objectiveValue: number;
    constraintViolations: number[];
  };
  
  // Transaction analysis
  transactionAnalysis: {
    currentWeights: number[];
    optimalWeights: number[];
    trades: {
      asset: string;
      currentWeight: number;
      optimalWeight: number;
      trade: number;
      cost: number;
    }[];
    totalCost: number;
    netBenefit: number;
  };
  
  // Rebalancing analysis
  rebalancingAnalysis: {
    frequency: string;
    threshold: number;
    rebalancingCost: number;
    trackingError: number;
    turnover: number;
  };
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    return: number;
    risk: number;
    weights: number[];
  }[];
  
  // Stress testing results
  stressTestResults: {
    test: string;
    return: number;
    risk: number;
    var: number;
    expectedShortfall: number;
  }[];
  
  // Monte Carlo simulation
  monteCarloResults: {
    meanReturn: number;
    medianReturn: number;
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
    probabilityOfLoss: number;
  };
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowReturn: number;
    highReturn: number;
    lowRisk: number;
    highRisk: number;
  }[];
  
  // Benchmark comparison
  benchmarkComparison: {
    portfolioReturn: number;
    benchmarkReturn: number;
    outperformance: number;
    trackingError: number;
    informationRatio: number;
    beta: number;
    alpha: number;
  };
  
  // Risk budgeting
  riskBudgeting: {
    asset: string;
    allocation: number;
    riskContribution: number;
    riskBudget: number;
    excessRisk: number;
  }[];
  
  // Diversification analysis
  diversificationAnalysis: {
    diversificationRatio: number;
    effectiveN: number;
    concentrationIndex: number;
    herfindahlIndex: number;
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
