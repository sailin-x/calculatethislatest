export interface BondYieldInputs {
  // Bond basic information
  faceValue: number; // Face value/par value
  couponRate: number; // Annual coupon rate as percentage
  couponPayment: number; // Annual coupon payment amount
  marketPrice: number; // Current market price
  yearsToMaturity: number; // Years until maturity
  
  // Payment frequency
  paymentFrequency: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
  couponPaymentsPerYear: number; // Number of coupon payments per year
  
  // Bond type
  bondType: 'government' | 'corporate' | 'municipal' | 'treasury' | 'agency' | 'mortgage-backed' | 'asset-backed' | 'convertible' | 'callable' | 'puttable';
  
  // Bond features
  callable: boolean; // Is the bond callable?
  puttable: boolean; // Is the bond puttable?
  convertible: boolean; // Is the bond convertible?
  
  // Call/Put features
  callPrice?: number; // Call price
  putPrice?: number; // Put price
  callDate?: string; // Call date
  putDate?: string; // Put date
  
  // Convertible features
  conversionRatio?: number; // Conversion ratio
  conversionPrice?: number; // Conversion price
  stockPrice?: number; // Current stock price
  
  // Credit risk
  creditRating: 'aaa' | 'aa' | 'a' | 'bbb' | 'bb' | 'b' | 'ccc' | 'cc' | 'c' | 'd';
  creditSpread: number; // Credit spread over risk-free rate
  defaultProbability: number; // Probability of default
  
  // Market conditions
  riskFreeRate: number; // Risk-free rate
  marketYield: number; // Market yield for similar bonds
  inflationRate: number; // Expected inflation rate
  
  // Tax considerations
  taxRate: number; // Marginal tax rate
  taxExempt: boolean; // Is the bond tax-exempt?
  stateTaxRate: number; // State tax rate
  
  // Settlement and payment
  settlementDate: string; // Settlement date
  issueDate: string; // Issue date
  maturityDate: string; // Maturity date
  nextCouponDate: string; // Next coupon payment date
  
  // Accrued interest
  accruedInterest: number; // Accrued interest
  daysSinceLastCoupon: number; // Days since last coupon payment
  daysInCouponPeriod: number; // Days in current coupon period
  
  // Yield calculation method
  yieldMethod: 'yield-to-maturity' | 'yield-to-call' | 'yield-to-put' | 'current-yield' | 'yield-to-worst' | 'real-yield';
  
  // Advanced parameters
  reinvestmentRate: number; // Rate for reinvesting coupon payments
  volatility: number; // Bond price volatility
  duration: number; // Macaulay duration
  modifiedDuration: number; // Modified duration
  convexity: number; // Bond convexity
  
  // Embedded options
  embeddedOptions: {
    callOption: boolean;
    putOption: boolean;
    conversionOption: boolean;
    prepaymentOption: boolean;
  };
  
  // Prepayment risk (for MBS)
  prepaymentRisk: {
    prepaymentSpeed: number; // PSA speed
    prepaymentModel: 'psa' | 'cpr' | 'custom';
    averageLife: number; // Average life
  };
  
  // Liquidity considerations
  liquidityFactors: {
    bidAskSpread: number; // Bid-ask spread
    tradingVolume: number; // Trading volume
    marketDepth: number; // Market depth
    liquidityScore: number; // Liquidity score (1-10)
  };
  
  // Currency considerations
  currencyFactors: {
    baseCurrency: string;
    bondCurrency: string;
    exchangeRate: number;
    currencyRisk: number;
  };
  
  // Inflation protection
  inflationProtection: {
    isTIPS: boolean; // Treasury Inflation-Protected Securities
    inflationIndex: 'cpi' | 'ppi' | 'custom';
    inflationAdjustment: number;
  };
  
  // Comparison bonds
  comparisonBonds: {
    bond: string;
    yield: number;
    maturity: number;
    creditRating: string;
    price: number;
  }[];
  
  // Scenario analysis
  scenarios: {
    scenario: string;
    probability: number;
    interestRateChange: number;
    creditSpreadChange: number;
    priceChange: number;
  }[];
  
  // Sensitivity analysis
  sensitivityParameters: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
  }[];
  
  // Analysis parameters
  includeAccruedInterest: boolean;
  includeTaxEffects: boolean;
  includeLiquidityAdjustments: boolean;
  includeCreditRisk: boolean;
  includeInflationEffects: boolean;
  
  // Output preferences
  includeDuration: boolean;
  includeConvexity: boolean;
  includeSensitivityAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeComparison: boolean;
}

export interface BondYieldResults {
  // Core yield metrics
  yieldToMaturity: number;
  yieldToCall: number;
  yieldToPut: number;
  currentYield: number;
  yieldToWorst: number;
  realYield: number;
  
  // Price analysis
  cleanPrice: number;
  dirtyPrice: number;
  priceChange: number;
  priceVolatility: number;
  
  // Duration and convexity
  macaulayDuration: number;
  modifiedDuration: number;
  effectiveDuration: number;
  convexity: number;
  dollarDuration: number;
  dollarConvexity: number;
  
  // Risk metrics
  interestRateRisk: number;
  creditRisk: number;
  liquidityRisk: number;
  reinvestmentRisk: number;
  callRisk: number;
  putRisk: number;
  
  // Yield spread analysis
  yieldSpread: {
    spread: number;
    spreadToTreasury: number;
    spreadToBenchmark: number;
    optionAdjustedSpread: number;
    zeroVolatilitySpread: number;
  };
  
  // Tax analysis
  taxAnalysis: {
    afterTaxYield: number;
    taxEquivalentYield: number;
    taxShield: number;
    effectiveTaxRate: number;
  };
  
  // Inflation analysis
  inflationAnalysis: {
    nominalYield: number;
    realYield: number;
    inflationAdjustedReturn: number;
    breakEvenInflation: number;
  };
  
  // Cash flow analysis
  cashFlowAnalysis: {
    totalCashFlows: number[];
    presentValue: number;
    internalRateOfReturn: number;
    netPresentValue: number;
  };
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    parameter: string;
    baseYield: number;
    lowYield: number;
    highYield: number;
    sensitivity: number;
  }[];
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    yield: number;
    price: number;
    duration: number;
  }[];
  
  // Comparison analysis
  comparisonResults: {
    bond: string;
    yield: number;
    duration: number;
    creditRating: string;
    ranking: number;
  }[];
  
  // Performance metrics
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    excessReturn: number;
    riskAdjustedReturn: number;
  };
  
  // Risk-adjusted metrics
  riskAdjustedMetrics: {
    sharpeRatio: number;
    sortinoRatio: number;
    informationRatio: number;
    treynorRatio: number;
  };
  
  // Option-adjusted analysis
  optionAdjustedAnalysis: {
    optionAdjustedSpread: number;
    optionAdjustedDuration: number;
    optionAdjustedConvexity: number;
    optionValue: number;
  };
  
  // Prepayment analysis (for MBS)
  prepaymentAnalysis: {
    averageLife: number;
    prepaymentSpeed: number;
    prepaymentRisk: number;
    yieldToAverageLife: number;
  };
  
  // Liquidity analysis
  liquidityAnalysis: {
    bidAskSpread: number;
    liquidityScore: number;
    tradingVolume: number;
    marketDepth: number;
    liquidityCost: number;
  };
  
  // Currency analysis
  currencyAnalysis: {
    currencyRisk: number;
    exchangeRateRisk: number;
    hedgedYield: number;
    unhedgedYield: number;
  };
  
  // Credit analysis
  creditAnalysis: {
    creditSpread: number;
    defaultProbability: number;
    recoveryRate: number;
    creditRating: string;
    creditScore: number;
  };
  
  // Valuation analysis
  valuationAnalysis: {
    fairValue: number;
    overvaluation: number;
    undervaluation: number;
    recommendation: 'buy' | 'hold' | 'sell';
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenYield: number;
    breakEvenPrice: number;
    marginOfSafety: number;
    requiredReturn: number;
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
