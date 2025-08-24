export interface StockOptionsCalculatorInputs {
  // Option Information
  optionInfo: {
    // Option Details
    optionDetails: {
      optionType: 'call' | 'put' | 'covered_call' | 'cash_secured_put' | 'bull_call_spread' | 'bear_put_spread' | 'iron_condor' | 'butterfly' | 'straddle' | 'strangle' | 'calendar_spread' | 'diagonal_spread' | 'other';
      optionName: string;
      underlyingStock: string;
      stockSymbol: string;
      optionSymbol: string;
      optionDescription: string;
    };
    
    // Option Parameters
    optionParameters: {
      strikePrice: number;
      currentStockPrice: number;
      optionPrice: number;
      expirationDate: string;
      daysToExpiration: number;
      contractSize: number; // typically 100 shares
      numberOfContracts: number;
      totalShares: number;
      optionStyle: 'american' | 'european' | 'bermudan';
      settlementType: 'physical' | 'cash';
    };
  };
  
  // Market Information
  marketInfo: {
    // Stock Data
    stockData: {
      currentPrice: number;
      bidPrice: number;
      askPrice: number;
      lastPrice: number;
      volume: number;
      marketCap: number;
      sharesOutstanding: number;
      beta: number;
      dividendYield: number;
      exDividendDate: string;
    };
    
    // Option Chain Data
    optionChainData: {
      expirationDate: string;
      strikePrice: number;
      callBid: number;
      callAsk: number;
      callLast: number;
      callVolume: number;
      callOpenInterest: number;
      putBid: number;
      putAsk: number;
      putLast: number;
      putVolume: number;
      putOpenInterest: number;
      impliedVolatility: number;
    }[];
    
    // Volatility Data
    volatilityData: {
      historicalVolatility: number;
      impliedVolatility: number;
      volatilitySkew: number;
      volatilitySurface: {
        expiration: number;
        strike: number;
        volatility: number;
      }[];
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    };
    
    // Market Conditions
    marketConditions: {
      marketTrend: 'bullish' | 'bearish' | 'sideways' | 'volatile';
      sectorPerformance: number;
      marketVolatility: number;
      correlation: number;
      liquidity: 'high' | 'medium' | 'low';
    };
  };
  
  // Greeks and Risk Metrics
  greeksRiskMetrics: {
    // Option Greeks
    optionGreeks: {
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      epsilon: number;
      lambda: number;
    };
    
    // Risk Metrics
    riskMetrics: {
      valueAtRisk: number;
      conditionalVaR: number;
      expectedShortfall: number;
      maxLoss: number;
      maxGain: number;
      probabilityOfProfit: number;
      probabilityOfLoss: number;
      breakEvenPrice: number;
      breakEvenProbability: number;
    };
    
    // Position Metrics
    positionMetrics: {
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      totalRho: number;
      positionValue: number;
      marginRequirement: number;
      buyingPower: number;
    };
  };
  
  // Strategy Information
  strategyInfo: {
    // Strategy Details
    strategyDetails: {
      strategyType: 'long_call' | 'long_put' | 'covered_call' | 'cash_secured_put' | 'bull_call_spread' | 'bear_put_spread' | 'iron_condor' | 'butterfly' | 'straddle' | 'strangle' | 'calendar_spread' | 'diagonal_spread' | 'other';
      strategyName: string;
      strategyDescription: string;
      riskProfile: 'conservative' | 'moderate' | 'aggressive';
      timeHorizon: 'short_term' | 'medium_term' | 'long_term';
      marketOutlook: 'bullish' | 'bearish' | 'neutral' | 'volatile';
    };
    
    // Strategy Legs
    strategyLegs: {
      leg: number;
      optionType: 'call' | 'put';
      action: 'buy' | 'sell';
      strikePrice: number;
      expirationDate: string;
      optionPrice: number;
      numberOfContracts: number;
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
    }[];
    
    // Strategy Parameters
    strategyParameters: {
      maxRisk: number;
      maxReward: number;
      riskRewardRatio: number;
      probabilityOfProfit: number;
      breakEvenPoints: number[];
      profitTargets: number[];
      stopLossLevels: number[];
    };
  };
  
  // Pricing Models
  pricingModels: {
    // Black-Scholes Model
    blackScholesModel: {
      stockPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionPrice: number;
      theoreticalValue: number;
      intrinsicValue: number;
      timeValue: number;
    };
    
    // Binomial Model
    binomialModel: {
      numberOfSteps: number;
      upFactor: number;
      downFactor: number;
      riskNeutralProbability: number;
      optionPrice: number;
      theoreticalValue: number;
    };
    
    // Monte Carlo Model
    monteCarloModel: {
      numberOfSimulations: number;
      timeSteps: number;
      optionPrice: number;
      theoreticalValue: number;
      confidenceInterval: {
        lower: number;
        upper: number;
      };
    };
    
    // Model Comparison
    modelComparison: {
      model: string;
      optionPrice: number;
      theoreticalValue: number;
      difference: number;
      accuracy: number;
    }[];
  };
  
  // Income and Yield Analysis
  incomeYieldAnalysis: {
    // Income Generation
    incomeGeneration: {
      premiumReceived: number;
      dividendIncome: number;
      totalIncome: number;
      incomeYield: number;
      monthlyIncome: number;
      annualIncome: number;
    };
    
    // Yield Metrics
    yieldMetrics: {
      currentYield: number;
      yieldToExpiration: number;
      yieldToWorst: number;
      yieldOnCost: number;
      yieldOnMargin: number;
    };
    
    // Income Projections
    incomeProjections: {
      month: number;
      premiumIncome: number;
      dividendIncome: number;
      totalIncome: number;
      cumulativeIncome: number;
    }[];
  };
  
  // Profit and Loss Analysis
  profitLossAnalysis: {
    // P&L Scenarios
    profitLossScenarios: {
      stockPrice: number;
      optionValue: number;
      profitLoss: number;
      return: number;
      probability: number;
    }[];
    
    // P&L at Expiration
    profitLossAtExpiration: {
      stockPrice: number;
      intrinsicValue: number;
      timeValue: number;
      totalValue: number;
      profitLoss: number;
      return: number;
    }[];
    
    // P&L Over Time
    profitLossOverTime: {
      date: string;
      stockPrice: number;
      optionValue: number;
      profitLoss: number;
      return: number;
    }[];
    
    // Break-Even Analysis
    breakEvenAnalysis: {
      breakEvenPrice: number;
      breakEvenProbability: number;
      breakEvenDate: string;
      breakEvenReturn: number;
    };
  };
  
  // Risk Management
  riskManagement: {
    // Position Sizing
    positionSizing: {
      accountSize: number;
      positionSize: number;
      positionPercentage: number;
      maxPositionSize: number;
      recommendedSize: number;
      sizingEfficiency: number;
    };
    
    // Risk Limits
    riskLimits: {
      maxLoss: number;
      maxRisk: number;
      stopLoss: number;
      profitTarget: number;
      timeStop: number;
      deltaLimit: number;
      gammaLimit: number;
      vegaLimit: number;
    };
    
    // Hedging Strategies
    hedgingStrategies: {
      hedgeType: 'delta' | 'gamma' | 'vega' | 'theta' | 'portfolio';
      hedgeInstrument: string;
      hedgeRatio: number;
      hedgeCost: number;
      hedgeEffectiveness: number;
      hedgeEfficiency: number;
    };
    
    // Risk Monitoring
    riskMonitoring: {
      dailyVaR: number;
      weeklyVaR: number;
      monthlyVaR: number;
      stressTestResults: {
        scenario: string;
        impact: number;
        probability: number;
      }[];
    };
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Tax Treatment
    taxTreatment: {
      optionType: 'equity' | 'index' | 'futures' | 'forex';
      holdingPeriod: 'short_term' | 'long_term';
      taxRate: number;
      washSaleRule: boolean;
      straddleRule: boolean;
      constructiveSale: boolean;
    };
    
    // Tax Implications
    taxImplications: {
      realizedGain: number;
      realizedLoss: number;
      unrealizedGain: number;
      unrealizedLoss: number;
      taxLiability: number;
      afterTaxReturn: number;
      taxEfficiency: number;
    };
    
    // Tax Optimization
    taxOptimization: {
      taxLossHarvesting: boolean;
      taxLossAmount: number;
      taxBenefit: number;
      optimizationStrategies: string[];
    };
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    // Alternative Strategies
    alternativeStrategies: {
      strategy: string;
      maxRisk: number;
      maxReward: number;
      probabilityOfProfit: number;
      expectedReturn: number;
      comparison: number;
    }[];
    
    // Market Comparison
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      optionReturn: number;
      outperformance: number;
      correlation: number;
      beta: number;
    };
    
    // Peer Comparison
    peerComparison: {
      peer: string;
      strategy: string;
      return: number;
      risk: number;
      outperformance: number;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      probability: number;
      stockPrice: number;
      volatility: number;
      optionValue: number;
      profitLoss: number;
      return: number;
    }[];
    
    // Volatility Scenarios
    volatilityScenarios: {
      scenario: string;
      probability: number;
      volatility: number;
      optionValue: number;
      profitLoss: number;
      return: number;
    }[];
    
    // Time Scenarios
    timeScenarios: {
      scenario: string;
      probability: number;
      daysToExpiration: number;
      optionValue: number;
      profitLoss: number;
      return: number;
    }[];
    
    // Interest Rate Scenarios
    interestRateScenarios: {
      scenario: string;
      probability: number;
      interestRate: number;
      optionValue: number;
      profitLoss: number;
      return: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeVolatilityChanges: boolean;
  includeJumpRisk: boolean;
  includeCorrelationChanges: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGreeksAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includePricingAnalysis: boolean;
    includeIncomeAnalysis: boolean;
    includeProfitLossAnalysis: boolean;
    includeRiskManagement: boolean;
    includeTaxAnalysis: boolean;
    includeComparisonAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    date: string;
    stockPrice: number;
    optionPrice: number;
    impliedVolatility: number;
    volume: number;
    openInterest: number;
    profitLoss: number;
    return: number;
  }[];
  
  // Reporting Preferences
  includeGreeksAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includePricingAnalysis: boolean;
  includeIncomeAnalysis: boolean;
  includeProfitLossAnalysis: boolean;
  includeRiskManagement: boolean;
  includeTaxAnalysis: boolean;
  includeComparisonAnalysis: boolean;
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

export interface StockOptionsCalculatorResults {
  // Core Option Metrics
  optionPrice: number;
  intrinsicValue: number;
  timeValue: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  
  // Option Analysis
  optionAnalysis: {
    optionPrice: number;
    intrinsicValue: number;
    timeValue: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    optionBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    optionEfficiency: number;
  };
  
  // Greeks Analysis
  greeksAnalysis: {
    optionGreeks: {
      delta: number;
      gamma: number;
      theta: number;
      vega: number;
      rho: number;
      epsilon: number;
      lambda: number;
    };
    positionGreeks: {
      totalDelta: number;
      totalGamma: number;
      totalTheta: number;
      totalVega: number;
      totalRho: number;
      positionValue: number;
      marginRequirement: number;
      buyingPower: number;
    };
    greeksEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskMetrics: {
      valueAtRisk: number;
      conditionalVaR: number;
      expectedShortfall: number;
      maxLoss: number;
      maxGain: number;
      probabilityOfProfit: number;
      probabilityOfLoss: number;
      breakEvenPrice: number;
      breakEvenProbability: number;
    };
    riskEfficiency: number;
  };
  
  // Pricing Analysis
  pricingAnalysis: {
    blackScholesModel: {
      stockPrice: number;
      strikePrice: number;
      timeToExpiration: number;
      riskFreeRate: number;
      volatility: number;
      dividendYield: number;
      optionPrice: number;
      theoreticalValue: number;
      intrinsicValue: number;
      timeValue: number;
    };
    binomialModel: {
      numberOfSteps: number;
      upFactor: number;
      downFactor: number;
      riskNeutralProbability: number;
      optionPrice: number;
      theoreticalValue: number;
    };
    monteCarloModel: {
      numberOfSimulations: number;
      timeSteps: number;
      optionPrice: number;
      theoreticalValue: number;
      confidenceInterval: {
        lower: number;
        upper: number;
      };
    };
    modelComparison: {
      model: string;
      optionPrice: number;
      theoreticalValue: number;
      difference: number;
      accuracy: number;
    }[];
    pricingEfficiency: number;
  };
  
  // Income Analysis
  incomeAnalysis: {
    incomeGeneration: {
      premiumReceived: number;
      dividendIncome: number;
      totalIncome: number;
      incomeYield: number;
      monthlyIncome: number;
      annualIncome: number;
    };
    yieldMetrics: {
      currentYield: number;
      yieldToExpiration: number;
      yieldToWorst: number;
      yieldOnCost: number;
      yieldOnMargin: number;
    };
    incomeProjections: {
      month: number;
      premiumIncome: number;
      dividendIncome: number;
      totalIncome: number;
      cumulativeIncome: number;
    }[];
    incomeEfficiency: number;
  };
  
  // Profit and Loss Analysis
  profitLossAnalysis: {
    profitLossScenarios: {
      stockPrice: number;
      optionValue: number;
      profitLoss: number;
      return: number;
      probability: number;
    }[];
    profitLossAtExpiration: {
      stockPrice: number;
      intrinsicValue: number;
      timeValue: number;
      totalValue: number;
      profitLoss: number;
      return: number;
    }[];
    profitLossOverTime: {
      date: string;
      stockPrice: number;
      optionValue: number;
      profitLoss: number;
      return: number;
    }[];
    breakEvenAnalysis: {
      breakEvenPrice: number;
      breakEvenProbability: number;
      breakEvenDate: string;
      breakEvenReturn: number;
    };
    profitLossEfficiency: number;
  };
  
  // Risk Management Analysis
  riskManagementAnalysis: {
    positionSizing: {
      accountSize: number;
      positionSize: number;
      positionPercentage: number;
      maxPositionSize: number;
      recommendedSize: number;
      sizingEfficiency: number;
    };
    riskLimits: {
      maxLoss: number;
      maxRisk: number;
      stopLoss: number;
      profitTarget: number;
      timeStop: number;
      deltaLimit: number;
      gammaLimit: number;
      vegaLimit: number;
    };
    hedgingStrategies: {
      hedgeType: string;
      hedgeInstrument: string;
      hedgeRatio: number;
      hedgeCost: number;
      hedgeEffectiveness: number;
      hedgeEfficiency: number;
    };
    riskMonitoring: {
      dailyVaR: number;
      weeklyVaR: number;
      monthlyVaR: number;
      stressTestResults: {
        scenario: string;
        impact: number;
        probability: number;
      }[];
    };
    riskManagementEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxTreatment: {
      optionType: string;
      holdingPeriod: string;
      taxRate: number;
      washSaleRule: boolean;
      straddleRule: boolean;
      constructiveSale: boolean;
    };
    taxImplications: {
      realizedGain: number;
      realizedLoss: number;
      unrealizedGain: number;
      unrealizedLoss: number;
      taxLiability: number;
      afterTaxReturn: number;
      taxEfficiency: number;
    };
    taxOptimization: {
      taxLossHarvesting: boolean;
      taxLossAmount: number;
      taxBenefit: number;
      optimizationStrategies: string[];
    };
    taxEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowOptionPrice: number;
    highOptionPrice: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    stockPrice: number;
    volatility: number;
    optionValue: number;
    profitLoss: number;
    return: number;
  }[];
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeStrategies: {
      strategy: string;
      maxRisk: number;
      maxReward: number;
      probabilityOfProfit: number;
      expectedReturn: number;
      comparison: number;
    }[];
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      optionReturn: number;
      outperformance: number;
      correlation: number;
      beta: number;
    };
    peerComparison: {
      peer: string;
      strategy: string;
      return: number;
      risk: number;
      outperformance: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      strategy: string;
      return: number;
      risk: number;
      outperformance: number;
    }[];
    marketComparison: {
      metric: string;
      option: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Option Score
  optionScore: {
    overallScore: number;
    componentScores: {
      pricing: number;
      risk: number;
      income: number;
      profitLoss: number;
      riskManagement: number;
      tax: number;
    };
    recommendation: 'buy' | 'sell' | 'hold' | 'avoid';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanOptionPrice: number;
    medianOptionPrice: number;
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
    historicalOptionPrice: number;
    historicalVolatility: number;
    historicalReturn: number;
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
    returnEnhancement: number;
    riskReduction: number;
    incomeGeneration: number;
    taxOptimization: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    optionAssessment: string;
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
    optionPrice: number;
    intrinsicValue: number;
    delta: number;
    probabilityOfProfit: number;
    recommendation: 'buy' | 'sell' | 'hold' | 'avoid';
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
