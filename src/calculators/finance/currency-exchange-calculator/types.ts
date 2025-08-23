export interface CurrencyExchangeInputs {
  // Currency Information
  baseCurrency: string;
  quoteCurrency: string;
  currencyPair: string;
  exchangeRate: number;
  bidRate: number;
  askRate: number;
  spread: number;
  
  // Transaction Information
  transactionAmount: number;
  transactionType: 'spot' | 'forward' | 'swap' | 'option' | 'futures' | 'cross_currency';
  transactionDate: string;
  settlementDate: string;
  valueDate: string;
  
  // Forward Contract Information
  forwardContract: {
    forwardRate: number;
    forwardPoints: number;
    maturity: number; // in days
    interestRateBase: number;
    interestRateQuote: number;
    forwardPremium: number;
  };
  
  // Option Information
  optionContract: {
    optionType: 'call' | 'put';
    strikeRate: number;
    premium: number;
    expirationDate: string;
    volatility: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
  };
  
  // Market Data
  marketData: {
    spotRate: number;
    forwardRates: {
      period: string;
      rate: number;
      points: number;
    }[];
    impliedVolatility: number;
    volatilitySurface: {
      maturity: number;
      strike: number;
      volatility: number;
    }[];
    interestRates: {
      currency: string;
      rate: number;
      term: number;
    }[];
  };
  
  // Economic Indicators
  economicIndicators: {
    gdpGrowth: number;
    inflationRate: number;
    interestRate: number;
    unemploymentRate: number;
    tradeBalance: number;
    currentAccount: number;
    foreignReserves: number;
  };
  
  // Central Bank Information
  centralBankInfo: {
    baseCurrencyBank: string;
    quoteCurrencyBank: string;
    baseCurrencyRate: number;
    quoteCurrencyRate: number;
    policyOutlook: string;
    interventionHistory: string[];
  };
  
  // Political and Economic Risk
  politicalEconomicRisk: {
    politicalStability: number;
    economicStability: number;
    sovereignRisk: number;
    countryRating: string;
    riskFactors: string[];
  };
  
  // Technical Analysis
  technicalAnalysis: {
    movingAverages: {
      period: number;
      value: number;
      signal: 'buy' | 'sell' | 'hold';
    }[];
    supportLevels: number[];
    resistanceLevels: number[];
    trendDirection: 'bullish' | 'bearish' | 'sideways';
    momentumIndicators: {
      indicator: string;
      value: number;
      signal: string;
    }[];
  };
  
  // Fundamental Analysis
  fundamentalAnalysis: {
    purchasingPowerParity: number;
    interestRateParity: number;
    fisherEffect: number;
    uncoveredInterestParity: number;
    coveredInterestParity: number;
    fundamentalValue: number;
  };
  
  // Correlation Analysis
  correlationAnalysis: {
    correlationWithUSD: number;
    correlationWithEUR: number;
    correlationWithGBP: number;
    correlationWithJPY: number;
    correlationWithCommodities: number;
    correlationWithEquities: number;
    correlationWithBonds: number;
  };
  
  // Volatility Analysis
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    volatilityForecast: number;
    volatilitySkew: number;
    volatilityTerm: number;
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    averageDailyVolume: number;
    bidAskSpread: number;
    marketDepth: number;
    liquidityScore: number;
    tradingHours: string;
    marketParticipants: string[];
  };
  
  // Hedging Information
  hedgingInfo: {
    hedgeType: 'natural' | 'financial' | 'operational' | 'none';
    hedgeRatio: number;
    hedgeEffectiveness: number;
    hedgeCost: number;
    hedgeInstruments: string[];
  };
  
  // Transaction Costs
  transactionCosts: {
    commission: number;
    fees: number;
    slippage: number;
    bidAskSpread: number;
    totalCost: number;
    costAsPercentage: number;
  };
  
  // Tax Considerations
  taxConsiderations: {
    taxRate: number;
    taxTreatment: string;
    withholdingTax: number;
    taxReporting: boolean;
    taxOptimization: string[];
  };
  
  // Regulatory Considerations
  regulatoryConsiderations: {
    reportingRequirements: boolean;
    capitalControls: boolean;
    exchangeControls: boolean;
    regulatoryConstraints: string[];
    complianceCost: number;
  };
  
  // Risk Management
  riskManagement: {
    positionSize: number;
    stopLoss: number;
    takeProfit: number;
    maxLoss: number;
    riskRewardRatio: number;
    varLimit: number;
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    exchangeRateChange: number;
    volatilityChange: number;
    interestRateChange: number;
    economicShock: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeJumpDiffusion: boolean;
  jumpIntensity: number;
  jumpSize: number;
  
  // Historical Analysis
  historicalData: {
    date: string;
    exchangeRate: number;
    volume: number;
    volatility: number;
    interestRateBase: number;
    interestRateQuote: number;
  }[];
  
  // Cross Currency Analysis
  crossCurrencyAnalysis: {
    crossRates: {
      pair: string;
      rate: number;
      bid: number;
      ask: number;
    }[];
    triangularArbitrage: {
      opportunity: boolean;
      profit: number;
      path: string[];
    };
  };
  
  // Carry Trade Analysis
  carryTradeAnalysis: {
    interestRateDifferential: number;
    expectedReturn: number;
    carryTradeRisk: number;
    unwindProbability: number;
    carryTradeProfitability: number;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  confidenceLevel: number;
  timeHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeInflation: boolean;
  
  // Reporting Preferences
  includeRateAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeTechnicalAnalysis: boolean;
  includeFundamentalAnalysis: boolean;
  includeVolatilityAnalysis: boolean;
  includeCorrelationAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeCrossCurrencyAnalysis: boolean;
  includeCarryTradeAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface CurrencyExchangeResults {
  // Core Exchange Metrics
  exchangeRate: number;
  convertedAmount: number;
  transactionCost: number;
  netAmount: number;
  effectiveRate: number;
  
  // Rate Analysis
  rateAnalysis: {
    spotRate: number;
    forwardRate: number;
    forwardPoints: number;
    forwardPremium: number;
    interestRateDifferential: number;
    rateForecast: number;
    rateVolatility: number;
  };
  
  // Forward Analysis
  forwardAnalysis: {
    forwardRate: number;
    forwardPoints: number;
    interestRateParity: number;
    coveredInterestParity: number;
    forwardBias: number;
    forwardEfficiency: number;
  };
  
  // Option Analysis
  optionAnalysis: {
    optionValue: number;
    intrinsicValue: number;
    timeValue: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    impliedVolatility: number;
  };
  
  // Risk Metrics
  riskMetrics: {
    valueAtRisk: number;
    conditionalVaR: number;
    expectedShortfall: number;
    maxDrawdown: number;
    downsideDeviation: number;
    riskOfLoss: number;
  };
  
  // Performance Metrics
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
  };
  
  // Technical Analysis Results
  technicalAnalysis: {
    movingAverages: {
      period: number;
      value: number;
      signal: 'buy' | 'sell' | 'hold';
    }[];
    supportLevels: number[];
    resistanceLevels: number[];
    trendDirection: 'bullish' | 'bearish' | 'sideways';
    momentumIndicators: {
      indicator: string;
      value: number;
      signal: string;
    }[];
    technicalScore: number;
  };
  
  // Fundamental Analysis Results
  fundamentalAnalysis: {
    purchasingPowerParity: number;
    interestRateParity: number;
    fisherEffect: number;
    uncoveredInterestParity: number;
    coveredInterestParity: number;
    fundamentalValue: number;
    misalignment: number;
    fundamentalScore: number;
  };
  
  // Volatility Analysis Results
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilityRegime: string;
    volatilityForecast: number;
    volatilitySkew: number;
    volatilityTerm: number;
    volatilitySurface: {
      maturity: number;
      strike: number;
      volatility: number;
    }[];
  };
  
  // Correlation Analysis Results
  correlationAnalysis: {
    correlationWithUSD: number;
    correlationWithEUR: number;
    correlationWithGBP: number;
    correlationWithJPY: number;
    correlationWithCommodities: number;
    correlationWithEquities: number;
    correlationWithBonds: number;
    averageCorrelation: number;
  };
  
  // Liquidity Analysis Results
  liquidityAnalysis: {
    averageDailyVolume: number;
    bidAskSpread: number;
    marketDepth: number;
    liquidityScore: number;
    liquidityRisk: number;
    marketImpact: number;
  };
  
  // Hedging Analysis Results
  hedgingAnalysis: {
    hedgeType: string;
    hedgeRatio: number;
    hedgeEffectiveness: number;
    hedgeCost: number;
    hedgeInstruments: string[];
    hedgeValue: number;
    hedgeEfficiency: number;
  };
  
  // Transaction Cost Analysis
  transactionCostAnalysis: {
    commission: number;
    fees: number;
    slippage: number;
    bidAskSpread: number;
    totalCost: number;
    costAsPercentage: number;
    costEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxRate: number;
    taxTreatment: string;
    withholdingTax: number;
    taxLiability: number;
    afterTaxReturn: number;
    taxEfficiency: number;
  };
  
  // Regulatory Analysis
  regulatoryAnalysis: {
    reportingRequirements: boolean;
    capitalControls: boolean;
    exchangeControls: boolean;
    regulatoryConstraints: string[];
    complianceCost: number;
    regulatoryRisk: number;
  };
  
  // Cross Currency Analysis Results
  crossCurrencyAnalysis: {
    crossRates: {
      pair: string;
      rate: number;
      bid: number;
      ask: number;
    }[];
    triangularArbitrage: {
      opportunity: boolean;
      profit: number;
      path: string[];
    };
    arbitrageEfficiency: number;
  };
  
  // Carry Trade Analysis Results
  carryTradeAnalysis: {
    interestRateDifferential: number;
    expectedReturn: number;
    carryTradeRisk: number;
    unwindProbability: number;
    carryTradeProfitability: number;
    carryTradeEfficiency: number;
  };
  
  // Economic Analysis
  economicAnalysis: {
    gdpGrowth: number;
    inflationRate: number;
    interestRate: number;
    unemploymentRate: number;
    tradeBalance: number;
    currentAccount: number;
    foreignReserves: number;
    economicScore: number;
  };
  
  // Political Risk Analysis
  politicalRiskAnalysis: {
    politicalStability: number;
    economicStability: number;
    sovereignRisk: number;
    countryRating: string;
    riskFactors: string[];
    politicalRiskScore: number;
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    exchangeRate: number;
    convertedAmount: number;
    profitLoss: number;
    return: number;
    riskMetrics: {
      var: number;
      cvar: number;
      maxDrawdown: number;
    };
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanRate: number;
    medianRate: number;
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
      rate: number;
      probability: number;
    }[];
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalReturn: number;
    historicalVolatility: number;
    historicalSharpeRatio: number;
    historicalMaxDrawdown: number;
    rateTrend: number;
    rateCycles: string[];
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowRate: number;
    highRate: number;
    sensitivity: number;
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    benchmark: string;
    benchmarkReturn: number;
    excessReturn: number;
    trackingError: number;
    informationRatio: number;
    relativePerformance: number;
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
    roi: number;
    paybackPeriod: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    riskAdjustedReturn: number;
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
    exchangeRate: number;
    convertedAmount: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'execute' | 'wait' | 'hedge';
    keyRisks: string[];
    keyOpportunities: string[];
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
