export interface OptionsValuationInputs {
  // Option basic information
  optionType: 'call' | 'put' | 'american-call' | 'american-put' | 'european-call' | 'european-put';
  underlyingPrice: number; // Current price of underlying asset
  strikePrice: number; // Strike price
  timeToExpiration: number; // Time to expiration in years
  riskFreeRate: number; // Risk-free interest rate
  
  // Volatility
  volatility: number; // Implied volatility
  volatilityModel: 'constant' | 'time-varying' | 'stochastic' | 'local' | 'implied';
  volatilitySurface: {
    strike: number;
    maturity: number;
    volatility: number;
  }[];
  
  // Dividend information
  dividendYield: number; // Continuous dividend yield
  dividendPayments: {
    amount: number;
    exDate: string;
  }[];
  
  // Option features
  barrierOptions: {
    isBarrier: boolean;
    barrierType: 'up-and-out' | 'down-and-out' | 'up-and-in' | 'down-and-in';
    barrierLevel: number;
  };
  
  binaryOptions: {
    isBinary: boolean;
    payout: number;
  };
  
  // Greeks calculation
  calculateGreeks: boolean;
  greekPrecision: number; // Precision for numerical calculations
  
  // Pricing model
  pricingModel: 'black-scholes' | 'binomial' | 'trinomial' | 'monte-carlo' | 'finite-difference' | 'analytical';
  
  // Binomial/Trinomial parameters
  latticeParameters: {
    steps: number; // Number of time steps
    method: 'cox-ross-rubinstein' | 'jarrow-rudd' | 'leisen-reimer' | 'tian';
  };
  
  // Monte Carlo parameters
  monteCarloParameters: {
    simulations: number;
    seed: number;
    antithetic: boolean;
    controlVariate: boolean;
  };
  
  // Market data
  marketData: {
    bidPrice: number;
    askPrice: number;
    lastPrice: number;
    volume: number;
    openInterest: number;
  };
  
  // Risk metrics
  riskMetrics: {
    calculateVaR: boolean;
    confidenceLevel: number;
    timeHorizon: number;
  };
  
  // Hedging parameters
  hedgingParameters: {
    deltaHedging: boolean;
    gammaHedging: boolean;
    vegaHedging: boolean;
    rebalancingFrequency: 'daily' | 'weekly' | 'monthly';
  };
  
  // Volatility analysis
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilitySkew: number;
    volatilityTermStructure: number[];
  };
  
  // Option strategies
  optionStrategies: {
    strategy: 'long-call' | 'long-put' | 'covered-call' | 'protective-put' | 'bull-spread' | 'bear-spread' | 'butterfly' | 'straddle' | 'strangle' | 'iron-condor';
    legs: {
      type: 'call' | 'put';
      strike: number;
      quantity: number;
      premium: number;
    }[];
  };
  
  // Sensitivity analysis
  sensitivityParameters: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    steps: number;
  }[];
  
  // Scenario analysis
  scenarios: {
    scenario: string;
    probability: number;
    underlyingPrice: number;
    volatility: number;
    timeToExpiration: number;
  }[];
  
  // Market conditions
  marketConditions: {
    marketRegime: 'bull' | 'bear' | 'sideways' | 'volatile';
    volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    interestRateEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
  };
  
  // Transaction costs
  transactionCosts: {
    commission: number;
    bidAskSpread: number;
    slippage: number;
    financingCost: number;
  };
  
  // Early exercise
  earlyExercise: {
    americanOptions: boolean;
    optimalExercise: boolean;
    exerciseBoundary: number[];
  };
  
  // Exotic options
  exoticFeatures: {
    isExotic: boolean;
    exoticType: 'asian' | 'barrier' | 'binary' | 'lookback' | 'chooser' | 'compound' | 'spread' | 'basket';
    parameters: Record<string, number>;
  };
  
  // Analysis parameters
  includeGreeks: boolean;
  includeSensitivityAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeHedgingAnalysis: boolean;
  
  // Output preferences
  includeDetailedBreakdown: boolean;
  includeMultipleModels: boolean;
  includeComparisons: boolean;
  includeRecommendations: boolean;
}

export interface OptionsValuationResults {
  // Core option valuation
  optionPrice: number;
  intrinsicValue: number;
  timeValue: number;
  impliedVolatility: number;
  
  // Greeks
  greeks: {
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
    lambda: number;
    epsilon: number;
    vanna: number;
    volga: number;
  };
  
  // Model-specific results
  blackScholesResults: {
    price: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
  };
  
  binomialResults: {
    price: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    rho: number;
    convergence: boolean;
  };
  
  monteCarloResults: {
    price: number;
    standardError: number;
    confidenceInterval: {
      lower: number;
      upper: number;
    };
    convergence: boolean;
  };
  
  // Risk metrics
  riskMetrics: {
    valueAtRisk: number;
    expectedShortfall: number;
    maximumLoss: number;
    probabilityOfProfit: number;
    expectedValue: number;
  };
  
  // Sensitivity analysis
  sensitivityResults: {
    parameter: string;
    basePrice: number;
    lowPrice: number;
    highPrice: number;
    sensitivity: number;
  }[];
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    optionPrice: number;
    profit: number;
    return: number;
  }[];
  
  // Volatility analysis
  volatilityAnalysis: {
    historicalVolatility: number;
    impliedVolatility: number;
    volatilitySkew: number;
    volatilitySmile: number[];
    volatilityTermStructure: number[];
  };
  
  // Hedging analysis
  hedgingAnalysis: {
    deltaHedge: {
      shares: number;
      cost: number;
      effectiveness: number;
    };
    gammaHedge: {
      additionalShares: number;
      cost: number;
      effectiveness: number;
    };
    vegaHedge: {
      vegaExposure: number;
      hedgeCost: number;
    };
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenPrice: number;
    breakEvenTime: number;
    probabilityOfBreakEven: number;
    marginOfSafety: number;
  };
  
  // Profit/Loss analysis
  profitLossAnalysis: {
    maxProfit: number;
    maxLoss: number;
    breakEvenPoints: number[];
    profitProbability: number;
    expectedProfit: number;
  };
  
  // Option strategies
  strategyResults: {
    strategy: string;
    totalCost: number;
    maxProfit: number;
    maxLoss: number;
    breakEvenPoints: number[];
    profitProbability: number;
  };
  
  // Market comparison
  marketComparison: {
    theoreticalPrice: number;
    marketPrice: number;
    difference: number;
    mispricing: number;
    arbitrageOpportunity: boolean;
  };
  
  // Performance metrics
  performanceMetrics: {
    returnOnInvestment: number;
    riskAdjustedReturn: number;
    sharpeRatio: number;
    sortinoRatio: number;
  };
  
  // Early exercise analysis
  earlyExerciseAnalysis: {
    optimalExercise: boolean;
    exerciseValue: number;
    holdingValue: number;
    exerciseBoundary: number[];
  };
  
  // Volatility trading
  volatilityTrading: {
    volatilityPosition: number;
    vegaExposure: number;
    gammaExposure: number;
    volatilityPnl: number;
  };
  
  // Time decay analysis
  timeDecayAnalysis: {
    theta: number;
    timeDecay: number;
    daysToExpiration: number;
    timeValueDecay: number[];
  };
  
  // Strike analysis
  strikeAnalysis: {
    inTheMoney: boolean;
    outOfTheMoney: boolean;
    atTheMoney: boolean;
    moneyness: number;
    leverage: number;
  };
  
  // Liquidity analysis
  liquidityAnalysis: {
    bidAskSpread: number;
    volume: number;
    openInterest: number;
    liquidityScore: number;
  };
  
  // Transaction cost analysis
  transactionCostAnalysis: {
    totalCost: number;
    commission: number;
    bidAskSpread: number;
    slippage: number;
    netProfit: number;
  };
  
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
