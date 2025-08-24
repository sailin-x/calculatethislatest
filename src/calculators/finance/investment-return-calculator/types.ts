export interface InvestmentReturnCalculatorInputs {
  // Investment Information
  investmentInfo: {
    // Investment Details
    investmentDetails: {
      investmentName: string;
      investmentType: 'stock' | 'bond' | 'mutual_fund' | 'etf' | 'real_estate' | 'commodity' | 'cryptocurrency' | 'private_equity' | 'venture_capital' | 'hedge_fund' | 'other';
      tickerSymbol: string;
      investmentDescription: string;
      investmentCategory: 'equity' | 'fixed_income' | 'real_assets' | 'alternatives' | 'cash_equivalents';
      investmentStyle: 'growth' | 'value' | 'blend' | 'momentum' | 'contrarian' | 'index' | 'active' | 'passive';
      currency: string;
    };
    
    // Investment Parameters
    investmentParameters: {
      initialInvestment: number;
      additionalInvestments: {
        date: string;
        amount: number;
        type: 'purchase' | 'dividend_reinvestment' | 'capital_gain_reinvestment' | 'other';
      }[];
      withdrawals: {
        date: string;
        amount: number;
        type: 'sale' | 'dividend' | 'capital_gain' | 'other';
      }[];
      currentValue: number;
      investmentPeriod: number; // in years
      startDate: string;
      endDate: string;
    };
  };
  
  // Market Data
  marketData: {
    // Price Data
    priceData: {
      date: string;
      price: number;
      volume: number;
      marketCap: number;
      sharesOutstanding: number;
    }[];
    
    // Dividend Data
    dividendData: {
      date: string;
      dividend: number;
      dividendYield: number;
      payoutRatio: number;
      exDividendDate: string;
      paymentDate: string;
    }[];
    
    // Market Index Data
    marketIndexData: {
      index: string;
      date: string;
      value: number;
      return: number;
    }[];
    
    // Economic Data
    economicData: {
      date: string;
      riskFreeRate: number;
      inflationRate: number;
      gdpGrowth: number;
      unemploymentRate: number;
      consumerPriceIndex: number;
    }[];
  };
  
  // Performance Metrics
  performanceMetrics: {
    // Return Metrics
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      simpleReturn: number;
      geometricReturn: number;
      excessReturn: number;
      alpha: number;
      beta: number;
      informationRatio: number;
      trackingError: number;
    };
    
    // Risk Metrics
    riskMetrics: {
      volatility: number;
      variance: number;
      standardDeviation: number;
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
      gainLossRatio: number;
      ulcerIndex: number;
    };
    
    // Attribution Metrics
    attributionMetrics: {
      assetAllocation: number;
      stockSelection: number;
      interaction: number;
      totalAttribution: number;
      factorAttribution: {
        factor: string;
        exposure: number;
        return: number;
        contribution: number;
      }[];
    };
  };
  
  // Benchmark Information
  benchmarkInfo: {
    // Benchmark Details
    benchmarkDetails: {
      benchmarkName: string;
      benchmarkType: 'market_index' | 'peer_group' | 'custom' | 'risk_free_rate' | 'other';
      benchmarkDescription: string;
      benchmarkData: {
        date: string;
        value: number;
        return: number;
      }[];
    };
    
    // Benchmark Comparison
    benchmarkComparison: {
      benchmarkReturn: number;
      benchmarkVolatility: number;
      benchmarkSharpeRatio: number;
      benchmarkMaxDrawdown: number;
      outperformance: number;
      underperformance: number;
      correlation: number;
      rSquared: number;
    };
    
    // Peer Comparison
    peerComparison: {
      peer: string;
      return: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
      outperformance: number;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Market Risk
    marketRisk: {
      beta: number;
      marketRisk: number;
      systematicRisk: number;
      riskContribution: number;
    };
    
    // Specific Risk
    specificRisk: {
      alpha: number;
      specificRisk: number;
      idiosyncraticRisk: number;
      riskContribution: number;
    };
    
    // Factor Risk
    factorRisk: {
      factorExposures: {
        factor: string;
        exposure: number;
        risk: number;
        contribution: number;
      }[];
      totalFactorRisk: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      liquidityRatio: number;
      bidAskSpread: number;
      marketImpact: number;
      timeToLiquidate: number;
      liquidityRisk: number;
    };
    
    // Credit Risk
    creditRisk: {
      creditRating: string;
      defaultProbability: number;
      creditSpread: number;
      creditRisk: number;
    };
    
    // Currency Risk
    currencyRisk: {
      currencyExposure: number;
      currencyVolatility: number;
      currencyCorrelation: number;
      currencyRisk: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Transaction Analysis
  transactionAnalysis: {
    // Transaction History
    transactionHistory: {
      date: string;
      type: 'buy' | 'sell' | 'dividend' | 'capital_gain' | 'fee' | 'other';
      amount: number;
      shares: number;
      price: number;
      commission: number;
      fees: number;
      netAmount: number;
    }[];
    
    // Transaction Costs
    transactionCosts: {
      totalCommissions: number;
      totalFees: number;
      totalTaxes: number;
      totalTransactionCosts: number;
      transactionCostRatio: number;
      impactOnReturn: number;
    };
    
    // Trading Activity
    tradingActivity: {
      numberOfTrades: number;
      averageTradeSize: number;
      turnover: number;
      averageHoldingPeriod: number;
      tradeFrequency: number;
      tradingEfficiency: number;
    };
  };
  
  // Tax Analysis
  taxAnalysis: {
    // Tax Treatment
    taxTreatment: {
      accountType: 'taxable' | 'traditional_ira' | 'roth_ira' | '401k' | '403b' | '457' | 'other';
      taxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
    };
    
    // Tax Implications
    taxImplications: {
      dividendTax: number;
      capitalGainsTax: number;
      interestTax: number;
      totalTaxes: number;
      afterTaxReturn: number;
      taxEfficiency: number;
    };
    
    // Tax Loss Harvesting
    taxLossHarvesting: {
      realizedLosses: number;
      unrealizedLosses: number;
      taxBenefit: number;
      harvestingOpportunity: number;
    };
  };
  
  // Economic Analysis
  economicAnalysis: {
    // Economic Indicators
    economicIndicators: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      consumerConfidence: number;
      businessConfidence: number;
    };
    
    // Market Conditions
    marketConditions: {
      bullMarket: boolean;
      bearMarket: boolean;
      volatilityRegime: 'low' | 'medium' | 'high';
      correlationRegime: 'low' | 'medium' | 'high';
      liquidityRegime: 'high' | 'medium' | 'low';
    };
    
    // Sector Analysis
    sectorAnalysis: {
      sector: string;
      sectorReturn: number;
      sectorWeight: number;
      sectorContribution: number;
    }[];
    
    // Geographic Analysis
    geographicAnalysis: {
      region: string;
      regionReturn: number;
      regionWeight: number;
      regionContribution: number;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      probability: number;
      marketReturn: number;
      investmentReturn: number;
      volatility: number;
      maxDrawdown: number;
    }[];
    
    // Economic Scenarios
    economicScenarios: {
      scenario: string;
      probability: number;
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      investmentReturn: number;
    }[];
    
    // Stress Scenarios
    stressScenarios: {
      scenario: string;
      probability: number;
      marketShock: number;
      volatilityShock: number;
      correlationShock: number;
      investmentReturn: number;
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
  rebalancingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
  includeFees: boolean;
  includeTaxes: boolean;
  includeTransactionCosts: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePerformanceAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeAttributionAnalysis: boolean;
    includeTransactionAnalysis: boolean;
    includeTaxAnalysis: boolean;
    includeEconomicAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    date: string;
    value: number;
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
  includeTransactionAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeEconomicAnalysis: boolean;
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

export interface InvestmentReturnCalculatorResults {
  // Core Investment Metrics
  totalReturn: number;
  annualizedReturn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  
  // Investment Analysis
  investmentAnalysis: {
    totalReturn: number;
    annualizedReturn: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    investmentBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    investmentEfficiency: number;
  };
  
  // Performance Analysis
  performanceAnalysis: {
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      simpleReturn: number;
      geometricReturn: number;
      excessReturn: number;
      alpha: number;
      beta: number;
      informationRatio: number;
      trackingError: number;
    };
    riskMetrics: {
      volatility: number;
      variance: number;
      standardDeviation: number;
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
      gainLossRatio: number;
      ulcerIndex: number;
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
    liquidityRisk: {
      liquidityRatio: number;
      bidAskSpread: number;
      marketImpact: number;
      timeToLiquidate: number;
      liquidityRisk: number;
    };
    creditRisk: {
      creditRating: string;
      defaultProbability: number;
      creditSpread: number;
      creditRisk: number;
    };
    currencyRisk: {
      currencyExposure: number;
      currencyVolatility: number;
      currencyCorrelation: number;
      currencyRisk: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Attribution Analysis
  attributionAnalysis: {
    assetAllocation: number;
    stockSelection: number;
    interaction: number;
    totalAttribution: number;
    factorAttribution: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    attributionEfficiency: number;
  };
  
  // Benchmark Analysis
  benchmarkAnalysis: {
    benchmarkReturn: number;
    benchmarkVolatility: number;
    benchmarkSharpeRatio: number;
    benchmarkMaxDrawdown: number;
    outperformance: number;
    underperformance: number;
    correlation: number;
    rSquared: number;
    benchmarkEfficiency: number;
  };
  
  // Transaction Analysis
  transactionAnalysis: {
    transactionHistory: {
      date: string;
      type: string;
      amount: number;
      shares: number;
      price: number;
      commission: number;
      fees: number;
      netAmount: number;
    }[];
    transactionCosts: {
      totalCommissions: number;
      totalFees: number;
      totalTaxes: number;
      totalTransactionCosts: number;
      transactionCostRatio: number;
      impactOnReturn: number;
    };
    tradingActivity: {
      numberOfTrades: number;
      averageTradeSize: number;
      turnover: number;
      averageHoldingPeriod: number;
      tradeFrequency: number;
      tradingEfficiency: number;
    };
    transactionEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxTreatment: {
      accountType: string;
      taxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
    };
    taxImplications: {
      dividendTax: number;
      capitalGainsTax: number;
      interestTax: number;
      totalTaxes: number;
      afterTaxReturn: number;
      taxEfficiency: number;
    };
    taxLossHarvesting: {
      realizedLosses: number;
      unrealizedLosses: number;
      taxBenefit: number;
      harvestingOpportunity: number;
    };
    taxEfficiency: number;
  };
  
  // Economic Analysis
  economicAnalysis: {
    economicIndicators: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      consumerConfidence: number;
      businessConfidence: number;
    };
    marketConditions: {
      bullMarket: boolean;
      bearMarket: boolean;
      volatilityRegime: string;
      correlationRegime: string;
      liquidityRegime: string;
    };
    sectorAnalysis: {
      sector: string;
      sectorReturn: number;
      sectorWeight: number;
      sectorContribution: number;
    }[];
    geographicAnalysis: {
      region: string;
      regionReturn: number;
      regionWeight: number;
      regionContribution: number;
    }[];
    economicEfficiency: number;
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
    description: string;
    probability: number;
    marketReturn: number;
    investmentReturn: number;
    volatility: number;
    maxDrawdown: number;
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
      investment: number;
      benchmark: number;
      difference: number;
    }[];
  };
  
  // Investment Score
  investmentScore: {
    overallScore: number;
    componentScores: {
      performance: number;
      risk: number;
      attribution: number;
      transaction: number;
      tax: number;
      economic: number;
    };
    recommendation: 'buy' | 'hold' | 'sell' | 'review';
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
      value: number;
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
    taxOptimization: number;
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
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
    recommendation: 'buy' | 'hold' | 'sell' | 'review';
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
