export interface StockOptionsInputs {
  // Option Information
  optionType: 'call' | 'put';
  optionStyle: 'american' | 'european';
  optionCategory: 'equity' | 'index' | 'etf' | 'futures' | 'currency' | 'commodity';
  
  // Underlying Asset Information
  underlyingSymbol: string;
  underlyingPrice: number;
  underlyingVolatility: number;
  underlyingDividendYield: number;
  underlyingBeta: number;
  underlyingSector: string;
  underlyingMarketCap: number;
  
  // Option Contract Details
  strikePrice: number;
  expirationDate: string;
  timeToExpiration: number; // in years
  contractSize: number;
  lotSize: number;
  
  // Option Pricing
  optionPrice: number;
  bidPrice: number;
  askPrice: number;
  lastPrice: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  
  // Market Conditions
  riskFreeRate: number;
  marketReturn: number;
  marketVolatility: number;
  correlationWithMarket: number;
  
  // Greeks Calculation Parameters
  calculateGreeks: boolean;
  deltaHedge: boolean;
  gammaHedge: boolean;
  vegaHedge: boolean;
  thetaHedge: boolean;
  rhoHedge: boolean;
  
  // Risk Management
  positionSize: number;
  maxLoss: number;
  stopLoss: number;
  takeProfit: number;
  riskRewardRatio: number;
  
  // Strategy Information
  strategyType: 'long_call' | 'long_put' | 'short_call' | 'short_put' | 'covered_call' | 'protective_put' | 'bull_spread' | 'bear_spread' | 'butterfly' | 'straddle' | 'strangle' | 'iron_condor' | 'calendar_spread' | 'diagonal_spread' | 'collar' | 'synthetic_stock' | 'box_spread' | 'jade_lizard' | 'broken_wing_butterfly' | 'custom';
  strategyName: string;
  strategyDescription: string;
  
  // Multi-Leg Options
  legs: {
    optionType: 'call' | 'put';
    strikePrice: number;
    expirationDate: string;
    quantity: number;
    action: 'buy' | 'sell';
    price: number;
  }[];
  
  // Transaction Costs
  commission: number;
  fees: number;
  slippage: number;
  bidAskSpread: number;
  
  // Tax Considerations
  taxRate: number;
  taxTreatment: 'short_term' | 'long_term' | 'section_1256' | 'qualified_dividend';
  washSaleRule: boolean;
  taxLossHarvesting: boolean;
  
  // Portfolio Context
  portfolioValue: number;
  portfolioBeta: number;
  portfolioVolatility: number;
  correlationWithPortfolio: number;
  diversificationImpact: number;
  
  // Analysis Parameters
  analysisPeriod: number; // in days
  rebalancingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'never';
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeDividends: boolean;
  includeEarlyExercise: boolean;
  
  // Scenario Analysis
  scenarios: {
    name: string;
    underlyingPriceChange: number; // percentage
    volatilityChange: number; // percentage
    timeDecay: number; // days
    interestRateChange: number; // percentage
    dividendChange: number; // percentage
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
    underlyingPrice: number;
    optionPrice: number;
    volume: number;
    openInterest: number;
    impliedVolatility: number;
  }[];
  
  // Volatility Analysis
  volatilitySurface: {
    strike: number;
    expiration: number;
    impliedVolatility: number;
  }[];
  
  volatilitySkew: number;
  volatilityTerm: number;
  volatilitySmile: boolean;
  
  // Liquidity Analysis
  bidAskSpreadAnalysis: boolean;
  volumeAnalysis: boolean;
  openInterestAnalysis: boolean;
  liquidityScore: number;
  
  // Regulatory Considerations
  marginRequirements: number;
  capitalRequirements: number;
  regulatoryConstraints: string[];
  
  // Reporting Preferences
  includeGreeks: boolean;
  includeRiskMetrics: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeVolatilityAnalysis: boolean;
  includeLiquidityAnalysis: boolean;
  includeRegulatoryAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface StockOptionsResults {
  // Core Option Metrics
  optionValue: number;
  intrinsicValue: number;
  timeValue: number;
  breakEvenPrice: number;
  maxProfit: number;
  maxLoss: number;
  probabilityOfProfit: number;
  
  // Greeks
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
  epsilon: number;
  lambda: number;
  
  // Risk Metrics
  valueAtRisk: number;
  conditionalVaR: number;
  expectedShortfall: number;
  maxDrawdown: number;
  downsideDeviation: number;
  riskOfLoss: number;
  
  // Performance Metrics
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  treynorRatio: number;
  informationRatio: number;
  
  // Profit/Loss Analysis
  profitLoss: {
    underlyingPrice: number;
    optionValue: number;
    profitLoss: number;
    return: number;
  }[];
  
  // Greeks Analysis
  greeksAnalysis: {
    underlyingPrice: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
  }[];
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    underlyingPrice: number;
    optionValue: number;
    profitLoss: number;
    return: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanValue: number;
    medianValue: number;
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
  };
  
  // Volatility Analysis
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilitySkew: number;
    volatilityTerm: number;
    volatilitySurface: {
      strike: number;
      expiration: number;
      impliedVolatility: number;
    }[];
  };
  
  // Liquidity Analysis
  liquidityAnalysis: {
    bidAskSpread: number;
    volume: number;
    openInterest: number;
    liquidityScore: number;
    marketImpact: number;
    slippageEstimate: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: number;
    volatilityRisk: number;
    timeDecayRisk: number;
    interestRateRisk: number;
    dividendRisk: number;
    liquidityRisk: number;
    correlationRisk: number;
    totalRisk: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    strategyType: string;
    strategyName: string;
    strategyDescription: string;
    legs: {
      optionType: 'call' | 'put';
      strikePrice: number;
      expirationDate: string;
      quantity: number;
      action: 'buy' | 'sell';
      price: number;
      value: number;
      profitLoss: number;
    }[];
    netCost: number;
    maxProfit: number;
    maxLoss: number;
    breakEvenPoints: number[];
    probabilityOfProfit: number;
  };
  
  // Transaction Analysis
  transactionAnalysis: {
    totalCost: number;
    commission: number;
    fees: number;
    slippage: number;
    bidAskSpread: number;
    netCost: number;
    costAsPercentage: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxRate: number;
    taxTreatment: string;
    taxableGain: number;
    taxLiability: number;
    afterTaxReturn: number;
    taxEfficiency: number;
  };
  
  // Portfolio Impact
  portfolioImpact: {
    portfolioValue: number;
    positionWeight: number;
    portfolioBeta: number;
    portfolioVolatility: number;
    correlationWithPortfolio: number;
    diversificationImpact: number;
    riskContribution: number;
  };
  
  // Regulatory Analysis
  regulatoryAnalysis: {
    marginRequirements: number;
    capitalRequirements: number;
    regulatoryConstraints: string[];
    complianceScore: number;
  };
  
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
    optionValue: number;
    totalReturn: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'buy' | 'sell' | 'hold';
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
