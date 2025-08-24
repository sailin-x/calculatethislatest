export interface AlphaBetaInputs {
  // Investment Information
  investmentInfo: {
    investmentName: string;
    investmentType: 'stock' | 'bond' | 'mutual_fund' | 'etf' | 'portfolio' | 'hedge_fund' | 'private_equity' | 'real_estate' | 'commodity' | 'cryptocurrency' | 'other';
    investmentCategory: 'equity' | 'fixed_income' | 'real_assets' | 'alternatives' | 'cash' | 'multi_asset';
    investmentStyle: 'growth' | 'value' | 'blend' | 'momentum' | 'quality' | 'size' | 'sector' | 'geographic';
    investmentStrategy: 'passive' | 'active' | 'factor_based' | 'smart_beta' | 'quantitative' | 'fundamental';
    currency: string;
    exchange: string;
    ticker: string;
  };
  
  // Return Data
  returnData: {
    // Investment Returns
    investmentReturns: {
      date: string;
      return: number;
      price: number;
      volume: number;
    }[];
    
    // Market Returns
    marketReturns: {
      date: string;
      return: number;
      index: string;
      value: number;
    }[];
    
    // Risk-Free Rate
    riskFreeRate: {
      date: string;
      rate: number;
      source: string;
      maturity: number;
    }[];
    
    // Return Statistics
    returnStatistics: {
      meanReturn: number;
      medianReturn: number;
      standardDeviation: number;
      variance: number;
      skewness: number;
      kurtosis: number;
    };
  };
  
  // Market Information
  marketInfo: {
    // Market Index
    marketIndex: {
      name: string;
      ticker: string;
      type: 'broad_market' | 'sector' | 'geographic' | 'custom';
      description: string;
    };
    
    // Market Data
    marketData: {
      date: string;
      return: number;
      value: number;
      volatility: number;
    }[];
    
    // Market Statistics
    marketStatistics: {
      meanReturn: number;
      standardDeviation: number;
      variance: number;
      marketRiskPremium: number;
    };
  };
  
  // Risk-Free Rate
  riskFreeRate: {
    // Risk-Free Rate Sources
    riskFreeRateSources: {
      treasuryBills: number;
      treasuryNotes: number;
      treasuryBonds: number;
      federalFundsRate: number;
      libor: number;
      customRate: number;
    };
    
    // Risk-Free Rate Selection
    selectedRiskFreeRate: number;
    riskFreeRateType: 'treasury_bills' | 'treasury_notes' | 'treasury_bonds' | 'federal_funds' | 'libor' | 'custom';
    riskFreeRateMaturity: number; // in years
    riskFreeRateCurrency: string;
    
    // Risk-Free Rate Adjustments
    riskFreeRateAdjustments: {
      inflationAdjustment: number;
      currencyAdjustment: number;
      liquidityAdjustment: number;
      creditAdjustment: number;
      finalRiskFreeRate: number;
    };
  };
  
  // Time Period
  timePeriod: {
    startDate: string;
    endDate: string;
    analysisPeriod: number; // in years
    dataFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
    rollingWindow: number; // for rolling beta calculation
    calculationMethod: 'arithmetic' | 'geometric' | 'logarithmic';
  };
  
  // Beta Calculation
  betaCalculation: {
    // Calculation Method
    calculationMethod: 'regression' | 'covariance' | 'correlation' | 'rolling' | 'exponential';
    
    // Regression Parameters
    regressionParameters: {
      method: 'ols' | 'robust' | 'weighted' | 'non_linear';
      confidenceLevel: number;
      significanceLevel: number;
    };
    
    // Rolling Beta
    rollingBeta: {
      window: number;
      step: number;
      method: 'simple' | 'exponential' | 'garch';
    };
    
    // Beta Adjustments
    betaAdjustments: {
      unleveredBeta: boolean;
      releveredBeta: boolean;
      industryBeta: boolean;
      fundamentalBeta: boolean;
    };
  };
  
  // Alpha Calculation
  alphaCalculation: {
    // Alpha Model
    alphaModel: 'capm' | 'fama_french' | 'carhart' | 'custom' | 'multi_factor';
    
    // Risk-Adjusted Returns
    riskAdjustedReturns: {
      sharpeRatio: number;
      sortinoRatio: number;
      treynorRatio: number;
      informationRatio: number;
      jensenAlpha: number;
    };
    
    // Alpha Decomposition
    alphaDecomposition: {
      totalAlpha: number;
      systematicAlpha: number;
      idiosyncraticAlpha: number;
      timingAlpha: number;
      selectionAlpha: number;
    };
  };
  
  // Factor Models
  factorModels: {
    // CAPM Model
    capmModel: {
      beta: number;
      alpha: number;
      rSquared: number;
      standardError: number;
      tStatistic: number;
      pValue: number;
    };
    
    // Fama-French Model
    famaFrenchModel: {
      beta: number;
      sizeFactor: number;
      valueFactor: number;
      alpha: number;
      rSquared: number;
    };
    
    // Carhart Model
    carhartModel: {
      beta: number;
      sizeFactor: number;
      valueFactor: number;
      momentumFactor: number;
      alpha: number;
      rSquared: number;
    };
    
    // Custom Factors
    customFactors: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
  };
  
  // Performance Metrics
  performanceMetrics: {
    // Return Metrics
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      excessReturn: number;
      riskAdjustedReturn: number;
      compoundAnnualGrowthRate: number;
    };
    
    // Risk Metrics
    riskMetrics: {
      volatility: number;
      standardDeviation: number;
      downsideDeviation: number;
      maximumDrawdown: number;
      valueAtRisk: number;
    };
    
    // Risk-Adjusted Metrics
    riskAdjustedMetrics: {
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      informationRatio: number;
      jensenAlpha: number;
    };
  };
  
  // Attribution Analysis
  attributionAnalysis: {
    // Factor Attribution
    factorAttribution: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    
    // Sector Attribution
    sectorAttribution: {
      sector: string;
      weight: number;
      return: number;
      contribution: number;
    }[];
    
    // Geographic Attribution
    geographicAttribution: {
      region: string;
      weight: number;
      return: number;
      contribution: number;
    }[];
    
    // Style Attribution
    styleAttribution: {
      style: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Systematic Risk
    systematicRisk: {
      marketRisk: number;
      factorRisk: number;
      totalSystematicRisk: number;
    };
    
    // Idiosyncratic Risk
    idiosyncraticRisk: {
      specificRisk: number;
      residualRisk: number;
      totalIdiosyncraticRisk: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskDecomposition: {
      risk: string;
      contribution: number;
      percentage: number;
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
    
    // Market Conditions
    marketConditions: {
      bullMarket: boolean;
      bearMarket: boolean;
      volatilityRegime: 'low' | 'medium' | 'high';
      correlationRegime: 'low' | 'medium' | 'high';
    };
    
    // Monetary Policy
    monetaryPolicy: {
      federalFundsRate: number;
      quantitativeEasing: boolean;
      policyStance: 'accommodative' | 'neutral' | 'restrictive';
    };
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  confidenceLevel: number;
  includeTaxes: boolean;
  includeFees: boolean;
  includeInflation: boolean;
  includeCurrency: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeRollingAnalysis: boolean;
    includeOutlierAdjustment: boolean;
    includeHeteroscedasticityAdjustment: boolean;
    includeAutocorrelationAdjustment: boolean;
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeReturnVolatility: boolean;
  includeBetaVolatility: boolean;
  includeMarketVolatility: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    return: number;
    marketReturn: number;
    beta: number;
    alpha: number;
    rSquared: number;
  }[];
  
  // Reporting Preferences
  includeReturnAnalysis: boolean;
  includeBetaAnalysis: boolean;
  includeAlphaAnalysis: boolean;
  includeFactorAnalysis: boolean;
  includeAttributionAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includeRollingAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface AlphaBetaResults {
  // Core Alpha & Beta Metrics
  alpha: number;
  beta: number;
  rSquared: number;
  standardError: number;
  tStatistic: number;
  pValue: number;
  
  // Alpha Analysis
  alphaAnalysis: {
    alpha: number;
    jensenAlpha: number;
    informationRatio: number;
    alphaBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    alphaEfficiency: number;
  };
  
  // Beta Analysis
  betaAnalysis: {
    beta: number;
    unleveredBeta: number;
    releveredBeta: number;
    industryBeta: number;
    fundamentalBeta: number;
    betaBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    betaEfficiency: number;
  };
  
  // Return Analysis
  returnAnalysis: {
    totalReturn: number;
    annualizedReturn: number;
    excessReturn: number;
    riskAdjustedReturn: number;
    returnBreakdown: {
      component: string;
      return: number;
      percentage: number;
    }[];
    returnEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    systematicRisk: number;
    idiosyncraticRisk: number;
    totalRisk: number;
    riskBreakdown: {
      risk: string;
      level: number;
      contribution: number;
    }[];
    riskScore: number;
  };
  
  // Performance Analysis
  performanceAnalysis: {
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
    jensenAlpha: number;
    performanceBreakdown: {
      metric: string;
      value: number;
      benchmark: number;
      difference: number;
    }[];
    performanceScore: number;
  };
  
  // Factor Analysis
  factorAnalysis: {
    // CAPM Analysis
    capmAnalysis: {
      beta: number;
      alpha: number;
      rSquared: number;
      standardError: number;
      tStatistic: number;
      pValue: number;
      confidenceInterval: {
        lower: number;
        upper: number;
      };
    };
    
    // Multi-Factor Analysis
    multiFactorAnalysis: {
      factors: {
        factor: string;
        exposure: number;
        return: number;
        contribution: number;
      }[];
      totalR: number;
      adjustedRSquared: number;
      fStatistic: number;
      pValue: number;
    };
    
    // Factor Attribution
    factorAttribution: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
  };
  
  // Attribution Analysis
  attributionAnalysis: {
    factorAttribution: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    sectorAttribution: {
      sector: string;
      weight: number;
      return: number;
      contribution: number;
    }[];
    geographicAttribution: {
      region: string;
      weight: number;
      return: number;
      contribution: number;
    }[];
    styleAttribution: {
      style: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    attributionScore: number;
  };
  
  // Rolling Analysis
  rollingAnalysis: {
    // Rolling Beta
    rollingBeta: {
      date: string;
      beta: number;
      alpha: number;
      rSquared: number;
    }[];
    
    // Beta Stability
    betaStability: {
      meanBeta: number;
      standardDeviation: number;
      coefficientOfVariation: number;
      stabilityScore: number;
    };
    
    // Beta Regime Changes
    betaRegimeChanges: {
      date: string;
      oldBeta: number;
      newBeta: number;
      change: number;
      significance: number;
    }[];
  };
  
  // Market Analysis
  marketAnalysis: {
    marketSensitivity: number;
    marketCorrelation: number;
    marketImpact: number;
    marketBreakdown: {
      factor: string;
      sensitivity: number;
      impact: number;
    }[];
    marketScore: number;
  };
  
  // Investment Score
  investmentScore: {
    overallScore: number;
    componentScores: {
      alpha: number;
      beta: number;
      return: number;
      risk: number;
      performance: number;
      factor: number;
    };
    recommendation: 'buy' | 'hold' | 'sell' | 'avoid';
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    peerComparison: {
      peer: string;
      alpha: number;
      beta: number;
      sharpeRatio: number;
      score: number;
    }[];
    marketPosition: number;
    competitiveAdvantage: string[];
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    alpha: number;
    beta: number;
    return: number;
    risk: number;
    score: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanAlpha: number;
    medianAlpha: number;
    meanBeta: number;
    medianBeta: number;
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
      alpha: number;
      beta: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalAlpha: number;
    historicalBeta: number;
    historicalReturn: number;
    historicalTrends: string[];
    historicalVolatility: number;
    yearOverYearChange: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowAlpha: number;
    highAlpha: number;
    lowBeta: number;
    highBeta: number;
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
    returnEnhancement: number;
    riskReduction: number;
    costSavings: number;
    taxEfficiency: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    investmentAssessment: string;
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
    alpha: number;
    beta: number;
    sharpeRatio: number;
    recommendation: 'buy' | 'hold' | 'sell' | 'avoid';
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
