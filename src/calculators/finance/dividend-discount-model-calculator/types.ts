export interface DDMInputs {
  // Dividend data
  currentDividend: number; // Current annual dividend per share
  dividendHistory: number[]; // Historical dividend payments
  dividendGrowthRate: number; // Expected dividend growth rate
  dividendPayoutRatio: number; // Dividend payout ratio
  
  // Stock data
  currentStockPrice: number; // Current stock price
  sharesOutstanding: number; // Number of shares outstanding
  marketCap: number; // Market capitalization
  
  // Growth assumptions
  growthModel: 'constant' | 'two-stage' | 'three-stage' | 'h-model' | 'variable';
  growthStages: {
    stage: string;
    growthRate: number;
    duration: number; // Years
  }[];
  
  // Required return
  requiredReturn: number; // Required rate of return
  riskFreeRate: number; // Risk-free rate
  marketRiskPremium: number; // Market risk premium
  beta: number; // Stock beta
  
  // Company fundamentals
  earningsPerShare: number; // Current EPS
  earningsGrowthRate: number; // Expected earnings growth
  returnOnEquity: number; // Return on equity
  retentionRatio: number; // Retention ratio (1 - payout ratio)
  
  // Industry and market data
  industry: 'technology' | 'healthcare' | 'finance' | 'retail' | 'manufacturing' | 'energy' | 'utilities' | 'telecom' | 'other';
  industryGrowthRate: number; // Industry growth rate
  marketGrowthRate: number; // Market growth rate
  
  // Risk factors
  riskLevel: 'low' | 'medium' | 'high';
  businessRisk: number; // Business risk (1-10)
  financialRisk: number; // Financial risk (1-10)
  marketRisk: number; // Market risk (1-10)
  
  // Dividend sustainability
  dividendSustainability: {
    earningsCoverage: number; // Earnings coverage ratio
    cashFlowCoverage: number; // Cash flow coverage ratio
    debtToEquity: number; // Debt to equity ratio
    interestCoverage: number; // Interest coverage ratio
  };
  
  // Growth drivers
  growthDrivers: {
    revenueGrowth: number; // Revenue growth rate
    marginExpansion: number; // Margin expansion potential
    marketShareGrowth: number; // Market share growth
    newProductGrowth: number; // New product growth
  };
  
  // Competitive position
  competitivePosition: {
    marketShare: number; // Market share percentage
    competitiveAdvantage: number; // Competitive advantage (1-10)
    barriersToEntry: number; // Barriers to entry (1-10)
    pricingPower: number; // Pricing power (1-10)
  };
  
  // Economic factors
  economicFactors: {
    inflationRate: number; // Expected inflation rate
    gdpGrowth: number; // GDP growth rate
    interestRateEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
    economicCycle: 'recession' | 'recovery' | 'expansion' | 'peak';
  };
  
  // Valuation parameters
  terminalGrowthRate: number; // Terminal growth rate
  terminalValueMultiple: number; // Terminal value multiple
  discountRate: number; // Discount rate for terminal value
  
  // Sensitivity analysis
  sensitivityParameters: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
  }[];
  
  // Scenario analysis
  scenarios: {
    scenario: string;
    probability: number;
    growthRate: number;
    requiredReturn: number;
    terminalGrowth: number;
  }[];
  
  // Comparable companies
  comparableCompanies: {
    company: string;
    dividendYield: number;
    growthRate: number;
    payoutRatio: number;
    peRatio: number;
    price: number;
  }[];
  
  // Dividend policy
  dividendPolicy: {
    policy: 'stable' | 'increasing' | 'decreasing' | 'variable';
    targetPayoutRatio: number;
    dividendStability: number; // Dividend stability (1-10)
    dividendHistory: number; // Years of dividend payments
  };
  
  // Market conditions
  marketConditions: 'bull' | 'bear' | 'sideways' | 'volatile';
  sectorPerformance: 'outperforming' | 'performing' | 'underperforming';
  
  // Advanced parameters
  advancedParameters: {
    useEarningsModel: boolean; // Use earnings-based model
    useFreeCashFlow: boolean; // Use free cash flow model
    useResidualIncome: boolean; // Use residual income model
    includeShareRepurchases: boolean; // Include share repurchases
  };
  
  // Time horizon
  timeHorizon: number; // Valuation time horizon in years
  forecastPeriod: number; // Explicit forecast period
  
  // Analysis parameters
  includeSensitivityAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeComparableAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeGrowthAnalysis: boolean;
  
  // Output preferences
  includeDetailedBreakdown: boolean;
  includeMultipleModels: boolean;
  includeRecommendations: boolean;
}

export interface DDMResults {
  // Core DDM valuation
  intrinsicValue: number;
  dividendYield: number;
  expectedReturn: number;
  growthRate: number;
  
  // Model-specific results
  constantGrowthDDM: {
    value: number;
    growthRate: number;
    dividendYield: number;
  };
  
  twoStageDDM: {
    value: number;
    stage1Value: number;
    stage2Value: number;
    transitionValue: number;
  };
  
  threeStageDDM: {
    value: number;
    stage1Value: number;
    stage2Value: number;
    stage3Value: number;
  };
  
  hModelDDM: {
    value: number;
    initialGrowth: number;
    terminalGrowth: number;
    transitionPeriod: number;
  };
  
  // Valuation comparison
  valuationComparison: {
    model: string;
    intrinsicValue: number;
    upside: number;
    downside: number;
    recommendation: 'buy' | 'hold' | 'sell';
  }[];
  
  // Sensitivity analysis
  sensitivityResults: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowIntrinsicValue: number;
    highIntrinsicValue: number;
    sensitivity: number;
  }[];
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    intrinsicValue: number;
    expectedReturn: number;
    growthRate: number;
    recommendation: 'buy' | 'hold' | 'sell';
  }[];
  
  // Comparable analysis
  comparableResults: {
    company: string;
    dividendYield: number;
    growthRate: number;
    intrinsicValue: number;
    relativeValue: number;
    ranking: number;
  }[];
  
  // Risk analysis
  riskAnalysis: {
    businessRisk: number;
    financialRisk: number;
    marketRisk: number;
    totalRisk: number;
    riskAdjustedValue: number;
  };
  
  // Growth analysis
  growthAnalysis: {
    sustainableGrowthRate: number;
    earningsGrowthRate: number;
    dividendGrowthRate: number;
    growthDrivers: {
      driver: string;
      contribution: number;
      sustainability: number;
    }[];
  };
  
  // Dividend analysis
  dividendAnalysis: {
    currentYield: number;
    forwardYield: number;
    payoutRatio: number;
    coverageRatio: number;
    sustainability: number;
    growthPotential: number;
  };
  
  // Performance metrics
  performanceMetrics: {
    totalReturn: number;
    dividendReturn: number;
    capitalGainsReturn: number;
    riskAdjustedReturn: number;
  };
  
  // Valuation metrics
  valuationMetrics: {
    priceToEarnings: number;
    priceToBook: number;
    priceToSales: number;
    enterpriseValueToEBITDA: number;
    dividendYield: number;
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenGrowthRate: number;
    breakEvenRequiredReturn: number;
    marginOfSafety: number;
    requiredReturn: number;
  };
  
  // Competitive analysis
  competitiveAnalysis: {
    marketShare: number;
    competitiveAdvantage: number;
    barriersToEntry: number;
    pricingPower: number;
    overallScore: number;
  };
  
  // Economic sensitivity
  economicSensitivity: {
    inflationImpact: number;
    interestRateImpact: number;
    gdpGrowthImpact: number;
    economicCycleImpact: number;
  };
  
  // Terminal value analysis
  terminalValueAnalysis: {
    terminalValue: number;
    terminalGrowthRate: number;
    terminalValueMultiple: number;
    presentValueOfTerminalValue: number;
    terminalValueSensitivity: number;
  };
  
  // Cash flow analysis
  cashFlowAnalysis: {
    freeCashFlow: number;
    dividendCoverage: number;
    cashFlowGrowth: number;
    reinvestmentRate: number;
  };
  
  // Shareholder returns
  shareholderReturns: {
    dividendYield: number;
    shareRepurchases: number;
    totalReturn: number;
    returnOnEquity: number;
  };
  
  // Industry comparison
  industryComparison: {
    industryYield: number;
    industryGrowth: number;
    industryPayoutRatio: number;
    relativeValue: number;
    industryRanking: number;
  };
  
  // Market timing
  marketTiming: {
    currentValuation: 'undervalued' | 'fairly-valued' | 'overvalued';
    entryPoint: number;
    exitPoint: number;
    holdingPeriod: number;
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
