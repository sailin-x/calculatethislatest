export interface HedgeFundCalculatorInputs {
  // Hedge Fund Information
  hedgeFundInfo: {
    fundName: string;
    fundType: 'long_short' | 'global_macro' | 'event_driven' | 'relative_value' | 'managed_futures' | 'multi_strategy' | 'quantitative' | 'distressed' | 'arbitrage' | 'other';
    strategy: string;
    fundSize: number;
    inceptionDate: string;
    managementFee: number;
    performanceFee: number;
    hurdleRate: number;
    highWaterMark: boolean;
    lockupPeriod: number; // in months
    redemptionPeriod: string;
    fundDescription: string;
  };
  
  // Portfolio Information
  portfolioInfo: {
    // Portfolio Overview
    portfolioOverview: {
      totalAssets: number;
      netAssetValue: number;
      leverage: number;
      grossExposure: number;
      netExposure: number;
      longExposure: number;
      shortExposure: number;
      cashPosition: number;
    };
    
    // Asset Allocation
    assetAllocation: {
      assetClass: string;
      allocation: number;
      exposure: number;
      weight: number;
      benchmark: number;
      activeWeight: number;
    }[];
    
    // Geographic Allocation
    geographicAllocation: {
      region: string;
      allocation: number;
      exposure: number;
      weight: number;
      benchmark: number;
      activeWeight: number;
    }[];
    
    // Sector Allocation
    sectorAllocation: {
      sector: string;
      allocation: number;
      exposure: number;
      weight: number;
      benchmark: number;
      activeWeight: number;
    }[];
  };
  
  // Performance Metrics
  performanceMetrics: {
    // Return Metrics
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      excessReturn: number;
      alpha: number;
      beta: number;
      informationRatio: number;
      trackingError: number;
    };
    
    // Risk Metrics
    riskMetrics: {
      volatility: number;
      var: number;
      cvar: number;
      maxDrawdown: number;
      downsideDeviation: number;
      semiDeviation: number;
      skewness: number;
      kurtosis: number;
    };
    
    // Risk-Adjusted Metrics
    riskAdjustedMetrics: {
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      jensenAlpha: number;
      omegaRatio: number;
    };
    
    // Attribution Metrics
    attributionMetrics: {
      assetAllocation: number;
      stockSelection: number;
      interaction: number;
      totalAttribution: number;
    };
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    // Strategy Breakdown
    strategyBreakdown: {
      strategy: string;
      allocation: number;
      return: number;
      risk: number;
      sharpeRatio: number;
      correlation: number;
    }[];
    
    // Factor Exposure
    factorExposure: {
      factor: string;
      exposure: number;
      contribution: number;
      risk: number;
    }[];
    
    // Style Analysis
    styleAnalysis: {
      style: string;
      exposure: number;
      contribution: number;
      risk: number;
    }[];
    
    // Market Neutrality
    marketNeutrality: {
      marketBeta: number;
      sectorNeutrality: number;
      sizeNeutrality: number;
      styleNeutrality: number;
      overallNeutrality: number;
    };
  };
  
  // Risk Management
  riskManagement: {
    // Risk Limits
    riskLimits: {
      maxLeverage: number;
      maxPositionSize: number;
      maxSectorExposure: number;
      maxCountryExposure: number;
      maxVar: number;
      maxDrawdown: number;
    };
    
    // Risk Decomposition
    riskDecomposition: {
      factor: string;
      risk: number;
      contribution: number;
      percentage: number;
    }[];
    
    // Stress Testing
    stressTesting: {
      scenario: string;
      impact: number;
      probability: number;
      var: number;
      description: string;
    }[];
    
    // Correlation Analysis
    correlationAnalysis: {
      asset1: string;
      asset2: string;
      correlation: number;
      rollingCorrelation: number[];
    }[];
  };
  
  // Fee Structure
  feeStructure: {
    // Management Fees
    managementFees: {
      rate: number;
      basis: 'assets' | 'equity' | 'nav';
      frequency: 'monthly' | 'quarterly' | 'annually';
      amount: number;
    };
    
    // Performance Fees
    performanceFees: {
      rate: number;
      hurdleRate: number;
      highWaterMark: boolean;
      catchUp: boolean;
      amount: number;
    };
    
    // Other Fees
    otherFees: {
      fee: string;
      rate: number;
      amount: number;
      description: string;
    }[];
    
    // Total Fee Analysis
    totalFeeAnalysis: {
      totalFees: number;
      feeRatio: number;
      netReturn: number;
      grossReturn: number;
    };
  };
  
  // Market Data
  marketData: {
    // Market Information
    marketInfo: {
      marketIndex: string;
      marketReturn: number;
      marketVolatility: number;
      riskFreeRate: number;
      marketRiskPremium: number;
    };
    
    // Benchmark Information
    benchmarkInfo: {
      benchmark: string;
      benchmarkReturn: number;
      benchmarkVolatility: number;
      benchmarkSharpeRatio: number;
      trackingError: number;
    };
    
    // Peer Comparison
    peerComparison: {
      peer: string;
      return: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
      fundSize: number;
    }[];
    
    // Market Conditions
    marketConditions: {
      bullMarket: boolean;
      bearMarket: boolean;
      volatilityRegime: 'low' | 'medium' | 'high';
      correlationRegime: 'low' | 'medium' | 'high';
    };
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    // Liquidity Metrics
    liquidityMetrics: {
      liquidityRatio: number;
      cashRatio: number;
      quickRatio: number;
      currentRatio: number;
      daysToLiquidate: number;
    };
    
    // Redemption Analysis
    redemptionAnalysis: {
      redemptionPeriod: string;
      noticePeriod: number;
      lockupPeriod: number;
      redemptionFees: number;
      redemptionRisk: number;
    };
    
    // Liquidity Stress Testing
    liquidityStressTesting: {
      scenario: string;
      liquidityNeeds: number;
      availableLiquidity: number;
      liquidityGap: number;
      timeToLiquidate: number;
    }[];
  };
  
  // Operational Risk
  operationalRisk: {
    // Operational Risk Factors
    operationalRiskFactors: {
      factor: string;
      risk: number;
      mitigation: string;
      probability: number;
    }[];
    
    // Counterparty Risk
    counterpartyRisk: {
      counterparty: string;
      exposure: number;
      creditRating: string;
      defaultProbability: number;
      collateral: number;
    }[];
    
    // Technology Risk
    technologyRisk: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    
    // Regulatory Risk
    regulatoryRisk: {
      regulation: string;
      impact: number;
      compliance: boolean;
      risk: number;
    }[];
  };
  
  // Performance Attribution
  performanceAttribution: {
    // Brinson Attribution
    brinsonAttribution: {
      sector: string;
      allocation: number;
      selection: number;
      interaction: number;
      total: number;
    }[];
    
    // Factor Attribution
    factorAttribution: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    
    // Risk Attribution
    riskAttribution: {
      factor: string;
      risk: number;
      contribution: number;
      percentage: number;
    }[];
    
    // Return Attribution
    returnAttribution: {
      source: string;
      return: number;
      contribution: number;
      percentage: number;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenarioName: string;
      probability: number;
      marketReturn: number;
      fundReturn: number;
      var: number;
      description: string;
    }[];
    
    // Stress Scenarios
    stressScenarios: {
      scenarioName: string;
      probability: number;
      marketShock: number;
      fundImpact: number;
      var: number;
      description: string;
    }[];
    
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
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeReturnVolatility: boolean;
  includeCorrelationChanges: boolean;
  includeRegimeChanges: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeFees: boolean;
  includeTaxes: boolean;
  includeTransactionCosts: boolean;
  includeLiquidityConstraints: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePerformanceAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeAttributionAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    date: string;
    nav: number;
    return: number;
    benchmarkReturn: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
  }[];
  
  // Reporting Preferences
  includePerformanceAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeAttributionAnalysis: boolean;
  includeLiquidityAnalysis: boolean;
  includeOperationalRisk: boolean;
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

export interface HedgeFundCalculatorResults {
  // Core Hedge Fund Metrics
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  informationRatio: number;
  
  // Hedge Fund Analysis
  hedgeFundAnalysis: {
    totalReturn: number;
    annualizedReturn: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    informationRatio: number;
    fundBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    fundEfficiency: number;
  };
  
  // Performance Analysis
  performanceAnalysis: {
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      excessReturn: number;
      alpha: number;
      beta: number;
      informationRatio: number;
      trackingError: number;
    };
    riskMetrics: {
      volatility: number;
      var: number;
      cvar: number;
      maxDrawdown: number;
      downsideDeviation: number;
      semiDeviation: number;
      skewness: number;
      kurtosis: number;
    };
    riskAdjustedMetrics: {
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      jensenAlpha: number;
      omegaRatio: number;
    };
    performanceEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: {
      beta: number;
      marketRisk: number;
      systematicRisk: number;
      riskContribution: number;
    };
    specificRisk: {
      alpha: number;
      specificRisk: number;
      idiosyncraticRisk: number;
      riskContribution: number;
    };
    factorRisk: {
      factorExposures: {
        factor: string;
        exposure: number;
        risk: number;
        contribution: number;
      }[];
      totalFactorRisk: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Attribution Analysis
  attributionAnalysis: {
    brinsonAttribution: {
      sector: string;
      allocation: number;
      selection: number;
      interaction: number;
      total: number;
    }[];
    factorAttribution: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    riskAttribution: {
      factor: string;
      risk: number;
      contribution: number;
      percentage: number;
    }[];
    attributionEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategyBreakdown: {
      strategy: string;
      allocation: number;
      return: number;
      risk: number;
      sharpeRatio: number;
      correlation: number;
    }[];
    marketNeutrality: {
      marketBeta: number;
      sectorNeutrality: number;
      sizeNeutrality: number;
      styleNeutrality: number;
      overallNeutrality: number;
    };
    strategyEfficiency: number;
  };
  
  // Fee Analysis
  feeAnalysis: {
    managementFees: {
      rate: number;
      amount: number;
      impact: number;
    };
    performanceFees: {
      rate: number;
      amount: number;
      impact: number;
    };
    totalFees: {
      totalFees: number;
      feeRatio: number;
      netReturn: number;
      grossReturn: number;
    };
    feeEfficiency: number;
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    liquidityMetrics: {
      liquidityRatio: number;
      cashRatio: number;
      quickRatio: number;
      currentRatio: number;
      daysToLiquidate: number;
    };
    redemptionAnalysis: {
      redemptionPeriod: string;
      noticePeriod: number;
      lockupPeriod: number;
      redemptionFees: number;
      redemptionRisk: number;
    };
    liquidityEfficiency: number;
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
    probability: number;
    marketReturn: number;
    fundReturn: number;
    var: number;
    riskLevel: string;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      return: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
      outperformance: number;
    }[];
    benchmarkComparison: {
      metric: string;
      fund: number;
      benchmark: number;
      difference: number;
    }[];
  };
  
  // Market Analysis
  marketAnalysis: {
    marketPosition: number;
    marketTiming: number;
    marketBreakdown: {
      factor: string;
      impact: number;
      opportunity: number;
    }[];
    marketScore: number;
  };
  
  // Operational Analysis
  operationalAnalysis: {
    operationalRisk: {
      totalRisk: number;
      riskBreakdown: {
        risk: string;
        level: number;
        impact: number;
      }[];
    };
    counterpartyRisk: {
      totalExposure: number;
      averageRating: string;
      defaultProbability: number;
    };
    operationalEfficiency: number;
  };
  
  // Hedge Fund Score
  hedgeFundScore: {
    overallScore: number;
    componentScores: {
      performance: number;
      risk: number;
      attribution: number;
      liquidity: number;
      operational: number;
    };
    recommendation: 'invest' | 'hold' | 'redeem' | 'review';
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
      return: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalReturn: number;
    historicalVolatility: number;
    historicalSharpeRatio: number;
    historicalMaxDrawdown: number;
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
    returnImprovement: number;
    riskReduction: number;
    costSavings: number;
    valueCreation: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    fundAssessment: string;
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
    maxDrawdown: number;
    recommendation: 'invest' | 'hold' | 'redeem' | 'review';
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
