export interface SharpeRatioInputs {
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
    // Historical Returns
    historicalReturns: {
      date: string;
      return: number;
      price: number;
      volume: number;
    }[];
    
    // Return Periods
    returnPeriods: {
      daily: number[];
      weekly: number[];
      monthly: number[];
      quarterly: number[];
      annually: number[];
    };
    
    // Return Statistics
    returnStatistics: {
      meanReturn: number;
      medianReturn: number;
      geometricMean: number;
      arithmeticMean: number;
      totalReturn: number;
      annualizedReturn: number;
    };
  };
  
  // Risk Data
  riskData: {
    // Volatility Metrics
    volatilityMetrics: {
      standardDeviation: number;
      variance: number;
      downsideDeviation: number;
      semiDeviation: number;
      historicalVolatility: number;
      impliedVolatility: number;
    };
    
    // Risk Metrics
    riskMetrics: {
      valueAtRisk: number;
      conditionalValueAtRisk: number;
      maximumDrawdown: number;
      averageDrawdown: number;
      drawdownDuration: number;
      recoveryTime: number;
    };
    
    // Risk Factors
    riskFactors: {
      marketRisk: number;
      interestRateRisk: number;
      creditRisk: number;
      liquidityRisk: number;
      currencyRisk: number;
      inflationRisk: number;
      politicalRisk: number;
      regulatoryRisk: number;
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
  
  // Benchmark Information
  benchmarkInfo: {
    // Benchmark Selection
    benchmarkName: string;
    benchmarkType: 'index' | 'peer_group' | 'custom' | 'risk_free_rate';
    benchmarkTicker: string;
    benchmarkCurrency: string;
    
    // Benchmark Data
    benchmarkData: {
      date: string;
      return: number;
      value: number;
    }[];
    
    // Benchmark Statistics
    benchmarkStatistics: {
      meanReturn: number;
      standardDeviation: number;
      sharpeRatio: number;
      beta: number;
      correlation: number;
    };
  };
  
  // Time Period
  timePeriod: {
    startDate: string;
    endDate: string;
    analysisPeriod: number; // in years
    dataFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
    rollingWindow: number; // for rolling Sharpe ratio
    calculationMethod: 'arithmetic' | 'geometric' | 'logarithmic';
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
    
    // Risk-Adjusted Returns
    riskAdjustedReturns: {
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      informationRatio: number;
      jensenAlpha: number;
    };
    
    // Drawdown Metrics
    drawdownMetrics: {
      maximumDrawdown: number;
      averageDrawdown: number;
      drawdownDuration: number;
      recoveryTime: number;
      underwaterPeriods: number;
    };
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
    // Risk Decomposition
    riskDecomposition: {
      risk: string;
      contribution: number;
      percentage: number;
    }[];
    
    // Risk Budgeting
    riskBudgeting: {
      factor: string;
      allocation: number;
      limit: number;
      utilization: number;
    }[];
    
    // Stress Testing
    stressTesting: {
      scenario: string;
      probability: number;
      impact: number;
      sharpeRatio: number;
    }[];
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Tax Status
    taxStatus: 'taxable' | 'tax_deferred' | 'tax_free' | 'tax_advantaged';
    effectiveTaxRate: number;
    marginalTaxRate: number;
    
    // Tax Implications
    taxImplications: {
      beforeTaxReturn: number;
      afterTaxReturn: number;
      taxEfficiency: number;
      afterTaxSharpeRatio: number;
    };
  };
  
  // Fees and Expenses
  feesAndExpenses: {
    // Management Fees
    managementFees: {
      annualRate: number;
      amount: number;
    };
    
    // Transaction Costs
    transactionCosts: {
      brokerage: number;
      commissions: number;
      spreads: number;
      taxes: number;
      total: number;
    };
    
    // Other Fees
    otherFees: {
      custodian: number;
      legal: number;
      audit: number;
      other: number;
      total: number;
    };
    
    // Total Costs
    totalFees: number;
    feeImpact: number;
    netSharpeRatio: number;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  confidenceLevel: number;
  includeTaxes: boolean;
  includeFees: boolean;
  includeInflation: boolean;
  includeCurrency: boolean;
  
  // Calculation Method
  calculationMethod: 'traditional_sharpe' | 'modified_sharpe' | 'ex_post_sharpe' | 'ex_ante_sharpe';
  riskFreeRateMethod: 'constant' | 'time_varying' | 'matching_maturity';
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeReturnVolatility: boolean;
  includeRiskFreeRateVolatility: boolean;
  includeCorrelationChanges: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    return: number;
    volatility: number;
    sharpeRatio: number;
    benchmarkReturn: number;
    excessReturn: number;
  }[];
  
  // Reporting Preferences
  includeReturnAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeAttributionAnalysis: boolean;
  includeBenchmarkAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeFeeAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includeStressTesting: boolean;
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

export interface SharpeRatioResults {
  // Core Sharpe Ratio Metrics
  sharpeRatio: number;
  modifiedSharpeRatio: number;
  excessReturn: number;
  riskFreeRate: number;
  volatility: number;
  
  // Sharpe Ratio Analysis
  sharpeRatioAnalysis: {
    sharpeRatio: number;
    modifiedSharpeRatio: number;
    exPostSharpeRatio: number;
    exAnteSharpeRatio: number;
    sharpeRatioBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    sharpeRatioEfficiency: number;
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
    volatility: number;
    standardDeviation: number;
    downsideDeviation: number;
    maximumDrawdown: number;
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
  
  // Benchmark Analysis
  benchmarkAnalysis: {
    benchmarkReturn: number;
    benchmarkSharpeRatio: number;
    excessReturn: number;
    informationRatio: number;
    beta: number;
    alpha: number;
    benchmarkComparison: {
      metric: string;
      investment: number;
      benchmark: number;
      difference: number;
    }[];
    benchmarkScore: number;
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
  
  // Tax Analysis
  taxAnalysis: {
    beforeTaxSharpeRatio: number;
    afterTaxSharpeRatio: number;
    taxEfficiency: number;
    taxBreakdown: {
      tax: string;
      amount: number;
      impact: number;
    }[];
    taxOptimization: number;
  };
  
  // Fee Analysis
  feeAnalysis: {
    totalFees: number;
    feeImpact: number;
    netSharpeRatio: number;
    feeBreakdown: {
      fee: string;
      amount: number;
      percentage: number;
    }[];
    feeEfficiency: number;
  };
  
  // Market Analysis
  marketAnalysis: {
    marketSensitivity: number;
    inflationImpact: number;
    interestRateImpact: number;
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
      sharpeRatio: number;
      return: number;
      risk: number;
      performance: number;
      benchmark: number;
      attribution: number;
      taxes: number;
      fees: number;
    };
    recommendation: 'buy' | 'hold' | 'sell' | 'avoid';
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    peerComparison: {
      peer: string;
      sharpeRatio: number;
      return: number;
      risk: number;
      score: number;
    }[];
    marketPosition: number;
    competitiveAdvantage: string[];
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    sharpeRatio: number;
    return: number;
    risk: number;
    score: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanSharpeRatio: number;
    medianSharpeRatio: number;
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
      sharpeRatio: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalSharpeRatio: number;
    historicalReturn: number;
    historicalVolatility: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowSharpeRatio: number;
    highSharpeRatio: number;
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
    sharpeRatio: number;
    annualizedReturn: number;
    volatility: number;
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
