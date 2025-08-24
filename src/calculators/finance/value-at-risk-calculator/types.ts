export interface ValueAtRiskInputs {
  // Portfolio Information
  portfolioInfo: {
    portfolioName: string;
    portfolioType: 'equity' | 'fixed_income' | 'multi_asset' | 'hedge_fund' | 'private_equity' | 'real_estate' | 'commodity' | 'cryptocurrency' | 'other';
    portfolioCategory: 'retail' | 'institutional' | 'pension' | 'endowment' | 'sovereign_wealth' | 'hedge_fund' | 'private_equity' | 'other';
    portfolioStrategy: 'passive' | 'active' | 'factor_based' | 'smart_beta' | 'quantitative' | 'fundamental' | 'tactical' | 'strategic';
    portfolioCurrency: string;
    portfolioValue: number;
    portfolioDescription: string;
  };
  
  // Asset Allocation
  assetAllocation: {
    // Asset Classes
    assetClasses: {
      assetClass: string;
      weight: number;
      value: number;
      currency: string;
    }[];
    
    // Individual Assets
    individualAssets: {
      asset: string;
      assetClass: string;
      weight: number;
      value: number;
      currency: string;
      ticker: string;
    }[];
    
    // Geographic Allocation
    geographicAllocation: {
      region: string;
      weight: number;
      value: number;
    }[];
    
    // Sector Allocation
    sectorAllocation: {
      sector: string;
      weight: number;
      value: number;
    }[];
  };
  
  // Historical Data
  historicalData: {
    // Price Data
    priceData: {
      date: string;
      asset: string;
      price: number;
      volume: number;
    }[];
    
    // Return Data
    returnData: {
      date: string;
      asset: string;
      return: number;
      logReturn: number;
    }[];
    
    // Portfolio Data
    portfolioData: {
      date: string;
      value: number;
      return: number;
      weight: number;
    }[];
    
    // Market Data
    marketData: {
      date: string;
      marketIndex: string;
      value: number;
      return: number;
    }[];
  };
  
  // VaR Parameters
  varParameters: {
    // Confidence Level
    confidenceLevel: number; // e.g., 95%, 99%
    confidenceLevels: number[]; // multiple confidence levels
    
    // Time Horizon
    timeHorizon: number; // in days
    timeHorizons: number[]; // multiple time horizons
    
    // Calculation Method
    calculationMethod: 'historical' | 'parametric' | 'monte_carlo' | 'hybrid';
    distributionType: 'normal' | 'student_t' | 'skewed_t' | 'empirical' | 'custom';
    
    // Lookback Period
    lookbackPeriod: number; // in days
    dataFrequency: 'daily' | 'weekly' | 'monthly';
    
    // Risk Metrics
    riskMetrics: {
      standardDeviation: number;
      variance: number;
      skewness: number;
      kurtosis: number;
      correlation: number;
    };
  };
  
  // Risk Factors
  riskFactors: {
    // Market Risk
    marketRisk: {
      equityRisk: number;
      interestRateRisk: number;
      currencyRisk: number;
      commodityRisk: number;
      volatilityRisk: number;
    };
    
    // Credit Risk
    creditRisk: {
      defaultRisk: number;
      downgradeRisk: number;
      spreadRisk: number;
      counterpartyRisk: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      bidAskSpread: number;
      tradingVolume: number;
      marketDepth: number;
      timeToLiquidate: number;
    };
    
    // Operational Risk
    operationalRisk: {
      systemRisk: number;
      processRisk: number;
      peopleRisk: number;
      externalRisk: number;
    };
    
    // Specific Risks
    specificRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
  };
  
  // Correlation Matrix
  correlationMatrix: {
    // Asset Correlations
    assetCorrelations: {
      asset1: string;
      asset2: string;
      correlation: number;
    }[];
    
    // Factor Correlations
    factorCorrelations: {
      factor1: string;
      factor2: string;
      correlation: number;
    }[];
    
    // Correlation Estimation
    correlationEstimation: {
      method: 'historical' | 'exponential' | 'garch' | 'custom';
      decayFactor: number;
      minimumObservations: number;
    };
  };
  
  // Volatility Models
  volatilityModels: {
    // Historical Volatility
    historicalVolatility: {
      method: 'simple' | 'exponential' | 'garch' | 'ewma';
      window: number;
      decayFactor: number;
    };
    
    // Implied Volatility
    impliedVolatility: {
      source: 'options' | 'swaps' | 'futures' | 'other';
      surface: {
        strike: number;
        maturity: number;
        volatility: number;
      }[];
    };
    
    // Volatility Forecasting
    volatilityForecasting: {
      method: 'garch' | 'ewma' | 'regime_switching' | 'custom';
      forecastHorizon: number;
      confidenceInterval: number;
    };
  };
  
  // Stress Testing
  stressTesting: {
    // Historical Scenarios
    historicalScenarios: {
      scenario: string;
      date: string;
      description: string;
      impact: number;
    }[];
    
    // Hypothetical Scenarios
    hypotheticalScenarios: {
      scenario: string;
      probability: number;
      marketShock: number;
      interestRateShock: number;
      currencyShock: number;
      commodityShock: number;
      impact: number;
    }[];
    
    // Factor Shocks
    factorShocks: {
      factor: string;
      shock: number;
      impact: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulation: {
    // Simulation Parameters
    simulations: number;
    timeSteps: number;
    seed: number;
    
    // Distribution Parameters
    distributionParameters: {
      mean: number;
      standardDeviation: number;
      skewness: number;
      kurtosis: number;
    };
    
    // Correlation Structure
    correlationStructure: {
      method: 'cholesky' | 'copula' | 'custom';
      copulaType: 'gaussian' | 'student_t' | 'clayton' | 'gumbel';
    };
  };
  
  // Risk Limits
  riskLimits: {
    // VaR Limits
    varLimits: {
      daily: number;
      weekly: number;
      monthly: number;
      annual: number;
    };
    
    // Position Limits
    positionLimits: {
      asset: string;
      limit: number;
      current: number;
      utilization: number;
    }[];
    
    // Concentration Limits
    concentrationLimits: {
      assetClass: string;
      limit: number;
      current: number;
      utilization: number;
    }[];
  };
  
  // Market Conditions
  marketConditions: {
    // Economic Environment
    economicEnvironment: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      consumerConfidence: number;
    };
    
    // Market Regime
    marketRegime: {
      regime: 'bull' | 'bear' | 'sideways' | 'volatile';
      volatilityRegime: 'low' | 'medium' | 'high';
      correlationRegime: 'low' | 'medium' | 'high';
    };
    
    // Market Stress
    marketStress: {
      stressLevel: 'low' | 'medium' | 'high' | 'extreme';
      stressFactors: string[];
      stressDuration: number;
    };
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  includeTransactionCosts: boolean;
  includeFees: boolean;
  includeTaxes: boolean;
  includeCurrency: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePartialPeriods: boolean;
    interpolationMethod: 'linear' | 'cubic' | 'spline';
    roundingMethod: 'nearest' | 'up' | 'down';
    precision: number;
  };
  
  // Reporting Preferences
  includeVaRAnalysis: boolean;
  includeStressTesting: boolean;
  includeMonteCarlo: boolean;
  includeRiskDecomposition: boolean;
  includeScenarioAnalysis: boolean;
  includeBacktesting: boolean;
  includeRiskLimits: boolean;
  includeMarketAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface ValueAtRiskResults {
  // Core VaR Metrics
  valueAtRisk: number;
  conditionalValueAtRisk: number;
  expectedShortfall: number;
  tailRisk: number;
  
  // VaR Analysis
  varAnalysis: {
    valueAtRisk: number;
    conditionalValueAtRisk: number;
    expectedShortfall: number;
    varBreakdown: {
      component: string;
      value: number;
      percentage: number;
    }[];
    varEfficiency: number;
  };
  
  // Risk Decomposition
  riskDecomposition: {
    // Asset Decomposition
    assetDecomposition: {
      asset: string;
      contribution: number;
      percentage: number;
      marginalVaR: number;
    }[];
    
    // Factor Decomposition
    factorDecomposition: {
      factor: string;
      contribution: number;
      percentage: number;
      exposure: number;
    }[];
    
    // Risk Type Decomposition
    riskTypeDecomposition: {
      riskType: string;
      contribution: number;
      percentage: number;
    }[];
  };
  
  // Portfolio Analysis
  portfolioAnalysis: {
    totalValue: number;
    totalRisk: number;
    riskPerUnit: number;
    portfolioBreakdown: {
      asset: string;
      value: number;
      weight: number;
      risk: number;
      contribution: number;
    }[];
    portfolioEfficiency: number;
  };
  
  // Volatility Analysis
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    forecastVolatility: number;
    volatilityBreakdown: {
      component: string;
      volatility: number;
      contribution: number;
    }[];
    volatilityEfficiency: number;
  };
  
  // Correlation Analysis
  correlationAnalysis: {
    averageCorrelation: number;
    correlationMatrix: {
      asset1: string;
      asset2: string;
      correlation: number;
    }[];
    correlationImpact: number;
    diversificationBenefit: number;
  };
  
  // Stress Testing Results
  stressTestingResults: {
    // Historical Scenarios
    historicalScenarios: {
      scenario: string;
      date: string;
      var: number;
      impact: number;
      probability: number;
    }[];
    
    // Hypothetical Scenarios
    hypotheticalScenarios: {
      scenario: string;
      var: number;
      impact: number;
      probability: number;
      severity: string;
    }[];
    
    // Worst Case Scenarios
    worstCaseScenarios: {
      scenario: string;
      var: number;
      probability: number;
      impact: number;
    }[];
  };
  
  // Monte Carlo Results
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
    probabilityDistribution: {
      var: number;
      probability: number;
    }[];
    confidenceIntervals: {
      level: number;
      lower: number;
      upper: number;
    }[];
  };
  
  // Backtesting Results
  backtestingResults: {
    // VaR Violations
    varViolations: {
      date: string;
      actualLoss: number;
      predictedVaR: number;
      violation: boolean;
      severity: number;
    }[];
    
    // Backtesting Statistics
    backtestingStatistics: {
      totalObservations: number;
      violations: number;
      violationRate: number;
      expectedViolations: number;
      kupiecTest: number;
      christoffersenTest: number;
    };
    
    // Performance Metrics
    performanceMetrics: {
      hitRate: number;
      meanViolation: number;
      maxViolation: number;
      violationSeverity: number;
    };
  };
  
  // Risk Limits Analysis
  riskLimitsAnalysis: {
    // VaR Limits
    varLimits: {
      limit: number;
      current: number;
      utilization: number;
      status: 'within' | 'approaching' | 'exceeded';
    };
    
    // Position Limits
    positionLimits: {
      asset: string;
      limit: number;
      current: number;
      utilization: number;
      status: string;
    }[];
    
    // Concentration Limits
    concentrationLimits: {
      assetClass: string;
      limit: number;
      current: number;
      utilization: number;
      status: string;
    }[];
  };
  
  // Market Analysis
  marketAnalysis: {
    marketSensitivity: number;
    beta: number;
    marketImpact: number;
    marketBreakdown: {
      factor: string;
      sensitivity: number;
      impact: number;
    }[];
    marketScore: number;
  };
  
  // Risk Score
  riskScore: {
    overallScore: number;
    componentScores: {
      var: number;
      volatility: number;
      correlation: number;
      concentration: number;
      liquidity: number;
      stress: number;
    };
    riskLevel: 'low' | 'medium' | 'high' | 'very_high';
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    peerComparison: {
      peer: string;
      var: number;
      volatility: number;
      riskLevel: string;
    }[];
    benchmarkComparison: {
      benchmark: string;
      var: number;
      difference: number;
      relativeRisk: number;
    };
    historicalComparison: {
      period: string;
      var: number;
      change: number;
      trend: string;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    var: number;
    impact: number;
    severity: string;
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
    riskReduction: number;
    capitalEfficiency: number;
    regulatoryCompliance: number;
    strategicAlignment: number;
    overallBenefit: number;
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
    valueAtRisk: number;
    conditionalValueAtRisk: number;
    riskLevel: string;
    recommendation: 'maintain' | 'reduce' | 'increase' | 'hedge';
    keyRisks: string[];
    keyMitigations: string[];
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
