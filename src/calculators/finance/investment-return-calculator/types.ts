export interface InvestmentReturnInputs {
  // Investment information
  investmentInfo: {
    investmentId: string;
    investmentName: string;
    investmentType: 'stocks' | 'bonds' | 'mutual-funds' | 'etfs' | 'real-estate' | 'commodities' | 'cryptocurrency' | 'private-equity' | 'venture-capital' | 'hedge-funds' | 'options' | 'futures' | 'forex' | 'other';
    investmentCategory: 'equity' | 'fixed-income' | 'real-estate' | 'commodities' | 'alternatives' | 'cash';
    investmentStyle: 'growth' | 'value' | 'blend' | 'momentum' | 'dividend' | 'index' | 'sector' | 'geographic';
    investmentStrategy: 'buy-and-hold' | 'active-trading' | 'dollar-cost-averaging' | 'value-investing' | 'growth-investing' | 'momentum-trading' | 'arbitrage' | 'hedging';
    riskProfile: 'conservative' | 'moderate' | 'aggressive' | 'very-aggressive';
    investmentHorizon: number; // Years
    liquidityNeeds: 'high' | 'medium' | 'low';
  };
  
  // Investment amounts
  investmentAmounts: {
    initialInvestment: number;
    additionalInvestments: {
      date: Date;
      amount: number;
      type: 'contribution' | 'dividend-reinvestment' | 'capital-gain-reinvestment' | 'other';
    }[];
    withdrawals: {
      date: Date;
      amount: number;
      type: 'withdrawal' | 'distribution' | 'dividend' | 'capital-gain' | 'other';
    }[];
    totalInvested: number;
    currentValue: number;
    marketValue: number;
  };
  
  // Time period
  timePeriod: {
    startDate: Date;
    endDate: Date;
    periodType: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
    holdingPeriod: number; // Days
    tradingDays: number;
  };
  
  // Price data
  priceData: {
    prices: {
      date: Date;
      openPrice: number;
      highPrice: number;
      lowPrice: number;
      closePrice: number;
      adjustedClose: number;
      volume: number;
    }[];
    dividends: {
      date: Date;
      amount: number;
      type: 'regular' | 'special' | 'stock' | 'other';
    }[];
    splits: {
      date: Date;
      ratio: number;
      description: string;
    }[];
  };
  
  // Performance metrics
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    simpleReturn: number;
    compoundReturn: number;
    geometricMean: number;
    arithmeticMean: number;
    volatility: number;
    standardDeviation: number;
    variance: number;
    skewness: number;
    kurtosis: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
    jensenAlpha: number;
    beta: number;
    rSquared: number;
    correlation: number;
  };
  
  // Risk metrics
  riskMetrics: {
    valueAtRisk: number;
    conditionalValueAtRisk: number;
    maximumDrawdown: number;
    maximumDrawdownDuration: number;
    downsideDeviation: number;
    semiDeviation: number;
    downsideRisk: number;
    upsideRisk: number;
    riskOfLoss: number;
    probabilityOfLoss: number;
    expectedShortfall: number;
    tailRisk: number;
  };
  
  // Benchmark comparison
  benchmarkComparison: {
    benchmark: {
      name: string;
      type: 'index' | 'fund' | 'custom';
      symbol: string;
      description: string;
    };
    benchmarkData: {
      date: Date;
      value: number;
      return: number;
    }[];
    benchmarkMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      volatility: number;
      sharpeRatio: number;
      beta: number;
      alpha: number;
      informationRatio: number;
      trackingError: number;
    };
  };
  
  // Market data
  marketData: {
    marketIndex: {
      name: string;
      symbol: string;
      data: {
        date: Date;
        value: number;
        return: number;
      }[];
    };
    riskFreeRate: {
      rate: number;
      source: string;
      frequency: string;
    };
    marketRiskPremium: number;
    inflationRate: number;
    currency: string;
    exchangeRate: number;
  };
  
  // Sector and industry analysis
  sectorAnalysis: {
    sector: string;
    industry: string;
    sectorPerformance: {
      sector: string;
      return: number;
      weight: number;
      contribution: number;
    }[];
    industryPerformance: {
      industry: string;
      return: number;
      weight: number;
      contribution: number;
    }[];
  };
  
  // Geographic analysis
  geographicAnalysis: {
    regions: {
      region: string;
      return: number;
      weight: number;
      contribution: number;
    }[];
    countries: {
      country: string;
      return: number;
      weight: number;
      contribution: number;
    }[];
    currencies: {
      currency: string;
      return: number;
      weight: number;
      contribution: number;
    }[];
  };
  
  // Factor analysis
  factorAnalysis: {
    factors: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    factorModel: 'fama-french' | 'carhart' | 'custom';
    factorReturns: {
      date: Date;
      market: number;
      size: number;
      value: number;
      momentum: number;
      quality: number;
      lowVolatility: number;
    }[];
  };
  
  // Attribution analysis
  attributionAnalysis: {
    attributionPeriod: {
      startDate: Date;
      endDate: Date;
    };
    attributionFactors: {
      factor: string;
      contribution: number;
      weight: number;
      return: number;
    }[];
    attributionBreakdown: {
      allocation: number;
      selection: number;
      interaction: number;
      total: number;
    };
  };
  
  // Transaction analysis
  transactionAnalysis: {
    transactions: {
      date: Date;
      type: 'buy' | 'sell' | 'dividend' | 'split' | 'merger' | 'spinoff' | 'other';
      quantity: number;
      price: number;
      value: number;
      commission: number;
      tax: number;
      netValue: number;
    }[];
    transactionCosts: {
      totalCommissions: number;
      totalTaxes: number;
      totalFees: number;
      totalCosts: number;
      costImpact: number;
    };
  };
  
  // Tax analysis
  taxAnalysis: {
    taxStatus: 'taxable' | 'tax-deferred' | 'tax-free';
    taxRate: number;
    capitalGainsRate: number;
    dividendTaxRate: number;
    interestTaxRate: number;
    taxLossHarvesting: boolean;
    taxLossCarryforward: number;
    afterTaxReturn: number;
    taxEfficiency: number;
  };
  
  // Inflation analysis
  inflationAnalysis: {
    inflationRate: number;
    inflationData: {
      date: Date;
      inflationRate: number;
      cpiValue: number;
    }[];
    realReturn: number;
    purchasingPower: number;
    inflationAdjustedValue: number;
  };
  
  // Currency analysis
  currencyAnalysis: {
    baseCurrency: string;
    foreignCurrency: string;
    exchangeRates: {
      date: Date;
      rate: number;
      return: number;
    }[];
    currencyReturn: number;
    hedgedReturn: number;
    unhedgedReturn: number;
    currencyRisk: number;
  };
  
  // Scenario analysis
  scenarioAnalysis: {
    scenarios: {
      scenarioName: string;
      scenarioType: 'optimistic' | 'pessimistic' | 'most-likely' | 'stress-test' | 'custom';
      probability: number;
      return: number;
      assumptions: {
        assumption: string;
        value: number;
        description: string;
      }[];
    }[];
    stressTests: {
      testName: string;
      marketShock: number;
      return: number;
      impact: number;
    }[];
  };
  
  // Monte Carlo simulation
  monteCarloSimulation: {
    simulations: number;
    timeHorizon: number;
    confidenceLevel: number;
    results: {
      percentile: number;
      return: number;
      value: number;
    }[];
    probabilityDistribution: {
      range: string;
      probability: number;
      frequency: number;
    }[];
  };
  
  // Rebalancing analysis
  rebalancingAnalysis: {
    rebalancingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'never';
    rebalancingThreshold: number;
    rebalancingCosts: number;
    rebalancingBenefits: number;
    rebalancingImpact: number;
    rebalancingHistory: {
      date: Date;
      action: string;
      cost: number;
      benefit: number;
    }[];
  };
  
  // Analysis parameters
  analysisParameters: {
    analysisType: 'basic' | 'comprehensive' | 'risk-adjusted' | 'attribution' | 'factor' | 'custom';
    includeRiskMetrics: boolean;
    includeBenchmarkComparison: boolean;
    includeAttributionAnalysis: boolean;
    includeFactorAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
    includeTaxAnalysis: boolean;
    includeInflationAnalysis: boolean;
    includeCurrencyAnalysis: boolean;
    confidenceLevel: number;
    significanceLevel: number;
  };
  
  // Reporting preferences
  reporting: {
    includeDetailedBreakdown: boolean;
    includePerformanceMetrics: boolean;
    includeRiskMetrics: boolean;
    includeBenchmarkComparison: boolean;
    includeAttributionAnalysis: boolean;
    includeFactorAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarloResults: boolean;
    includeTaxAnalysis: boolean;
    includeInflationAnalysis: boolean;
    includeCurrencyAnalysis: boolean;
    includeVisualizations: boolean;
    includeRecommendations: boolean;
  };
}

export interface InvestmentReturnResults {
  // Core return metrics
  returnMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    simpleReturn: number;
    compoundReturn: number;
    geometricMean: number;
    arithmeticMean: number;
    timeWeightedReturn: number;
    moneyWeightedReturn: number;
    internalRateOfReturn: number;
    modifiedInternalRateOfReturn: number;
  };
  
  // Performance analysis
  performanceAnalysis: {
    periodReturns: {
      period: Date;
      return: number;
      cumulativeReturn: number;
      value: number;
    }[];
    rollingReturns: {
      period: Date;
      return: number;
      average: number;
      volatility: number;
    }[];
    performanceAttribution: {
      factor: string;
      contribution: number;
      weight: number;
      return: number;
    }[];
  };
  
  // Risk metrics
  riskMetrics: {
    volatility: number;
    standardDeviation: number;
    variance: number;
    skewness: number;
    kurtosis: number;
    valueAtRisk: number;
    conditionalValueAtRisk: number;
    maximumDrawdown: number;
    maximumDrawdownDuration: number;
    downsideDeviation: number;
    semiDeviation: number;
    downsideRisk: number;
    upsideRisk: number;
    riskOfLoss: number;
    probabilityOfLoss: number;
    expectedShortfall: number;
    tailRisk: number;
  };
  
  // Risk-adjusted returns
  riskAdjustedReturns: {
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
    jensenAlpha: number;
    appraisalRatio: number;
    gainToPainRatio: number;
    calmarRatio: number;
    sterlingRatio: number;
  };
  
  // Benchmark comparison
  benchmarkComparison: {
    benchmarkReturn: number;
    excessReturn: number;
    trackingError: number;
    informationRatio: number;
    beta: number;
    alpha: number;
    rSquared: number;
    correlation: number;
    upCapture: number;
    downCapture: number;
    upDownRatio: number;
    relativeStrength: number;
  };
  
  // Attribution analysis
  attributionAnalysis: {
    totalAttribution: number;
    allocationEffect: number;
    selectionEffect: number;
    interactionEffect: number;
    factorAttribution: {
      factor: string;
      contribution: number;
      weight: number;
      return: number;
    }[];
    sectorAttribution: {
      sector: string;
      contribution: number;
      weight: number;
      return: number;
    }[];
    geographicAttribution: {
      region: string;
      contribution: number;
      weight: number;
      return: number;
    }[];
  };
  
  // Factor analysis
  factorAnalysis: {
    factorExposures: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
    }[];
    factorReturns: {
      date: Date;
      market: number;
      size: number;
      value: number;
      momentum: number;
      quality: number;
      lowVolatility: number;
    }[];
    factorRisk: {
      factor: string;
      risk: number;
      contribution: number;
    }[];
  };
  
  // Sector and geographic analysis
  sectorGeographicAnalysis: {
    sectorPerformance: {
      sector: string;
      return: number;
      weight: number;
      contribution: number;
      performance: 'outperform' | 'underperform' | 'neutral';
    }[];
    geographicPerformance: {
      region: string;
      return: number;
      weight: number;
      contribution: number;
      performance: 'outperform' | 'underperform' | 'neutral';
    }[];
    currencyPerformance: {
      currency: string;
      return: number;
      weight: number;
      contribution: number;
      performance: 'outperform' | 'underperform' | 'neutral';
    }[];
  };
  
  // Transaction analysis
  transactionAnalysis: {
    totalTransactions: number;
    totalCommissions: number;
    totalTaxes: number;
    totalFees: number;
    totalCosts: number;
    costImpact: number;
    transactionEfficiency: number;
    turnoverRatio: number;
    averageHoldingPeriod: number;
  };
  
  // Tax analysis
  taxAnalysis: {
    beforeTaxReturn: number;
    afterTaxReturn: number;
    taxEfficiency: number;
    taxLossHarvesting: number;
    taxLossCarryforward: number;
    capitalGainsTax: number;
    dividendTax: number;
    interestTax: number;
    totalTaxes: number;
    effectiveTaxRate: number;
  };
  
  // Inflation analysis
  inflationAnalysis: {
    nominalReturn: number;
    realReturn: number;
    inflationRate: number;
    purchasingPower: number;
    inflationAdjustedValue: number;
    inflationRisk: number;
    realReturnVolatility: number;
  };
  
  // Currency analysis
  currencyAnalysis: {
    localReturn: number;
    foreignReturn: number;
    currencyReturn: number;
    hedgedReturn: number;
    unhedgedReturn: number;
    currencyRisk: number;
    exchangeRateRisk: number;
    currencyContribution: number;
  };
  
  // Scenario analysis
  scenarioAnalysis: {
    scenarios: {
      scenarioName: string;
      scenarioType: string;
      probability: number;
      return: number;
      value: number;
      risk: number;
    }[];
    stressTests: {
      testName: string;
      marketShock: number;
      return: number;
      impact: number;
      risk: number;
    }[];
    scenarioComparison: {
      scenario1: string;
      scenario2: string;
      returnDifference: number;
      riskDifference: number;
    }[];
  };
  
  // Monte Carlo simulation
  monteCarloSimulation: {
    simulations: number;
    timeHorizon: number;
    confidenceLevel: number;
    expectedReturn: number;
    expectedValue: number;
    expectedRisk: number;
    percentiles: {
      percentile: number;
      return: number;
      value: number;
    }[];
    probabilityDistribution: {
      range: string;
      probability: number;
      frequency: number;
    }[];
    successRate: number;
  };
  
  // Rebalancing analysis
  rebalancingAnalysis: {
    rebalancingFrequency: string;
    rebalancingThreshold: number;
    rebalancingCosts: number;
    rebalancingBenefits: number;
    rebalancingImpact: number;
    rebalancingEfficiency: number;
    rebalancingHistory: {
      date: Date;
      action: string;
      cost: number;
      benefit: number;
      impact: number;
    }[];
  };
  
  // Investment efficiency
  investmentEfficiency: {
    overallEfficiency: number;
    efficiencyByComponent: {
      component: string;
      efficiency: number;
      improvement: number;
      potential: number;
    }[];
    efficiencyComparison: {
      benchmark: string;
      efficiency: number;
      difference: number;
      performance: 'above' | 'below' | 'at';
    }[];
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    returnOptimization: {
      opportunity: string;
      currentReturn: number;
      potentialReturn: number;
      improvement: number;
      implementation: string;
      timeline: string;
    }[];
    riskOptimization: {
      opportunity: string;
      currentRisk: number;
      potentialRisk: number;
      improvement: number;
      implementation: string;
      timeline: string;
    }[];
    costOptimization: {
      opportunity: string;
      currentCost: number;
      potentialCost: number;
      savings: number;
      implementation: string;
      timeline: string;
    }[];
  };
  
  // Business impact
  businessImpact: {
    returnImpact: {
      currentReturn: number;
      potentialReturn: number;
      returnOpportunity: number;
      impact: number;
    };
    riskImpact: {
      currentRisk: number;
      potentialRisk: number;
      riskOpportunity: number;
      impact: number;
    };
    efficiencyImpact: {
      currentEfficiency: number;
      potentialEfficiency: number;
      efficiencyOpportunity: number;
      impact: number;
    };
  };
  
  // Comprehensive report
  report: string;
  
  // Executive summary
  executiveSummary: {
    totalReturn: number;
    annualizedReturn: number;
    riskMetrics: string[];
    keyFindings: string[];
    criticalFactors: string[];
    recommendations: string[];
    riskLevel: string;
    nextSteps: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementation: string;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
    cost: number;
  }[];
}
