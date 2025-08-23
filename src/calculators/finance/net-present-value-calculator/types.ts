export interface NPVInputs {
  // Cash flow data
  cashFlows: number[]; // Array of cash flows (negative for outflows, positive for inflows)
  initialInvestment: number; // Initial investment amount
  projectDuration: number; // Project duration in years
  
  // Discount rate parameters
  discountRate: number; // Required rate of return
  costOfCapital: number; // Weighted average cost of capital
  riskFreeRate: number; // Risk-free rate
  marketRiskPremium: number; // Market risk premium
  beta: number; // Project beta for CAPM
  
  // Time periods
  timePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  
  // Project details
  projectType: 'business' | 'real-estate' | 'equipment' | 'technology' | 'marketing' | 'research' | 'expansion' | 'acquisition' | 'other';
  investmentCategory: 'capital-expenditure' | 'operating-expense' | 'research-development' | 'marketing' | 'acquisition' | 'expansion';
  
  // Risk factors
  riskLevel: 'low' | 'medium' | 'high';
  marketConditions: 'recession' | 'stable' | 'growth' | 'boom';
  industryVolatility: number; // Industry-specific volatility
  
  // Cash flow assumptions
  revenueGrowthRate: number; // Expected revenue growth
  costInflationRate: number; // Expected cost inflation
  taxRate: number; // Effective tax rate
  depreciationRate: number; // Asset depreciation rate
  
  // Project specifics
  salvageValue: number; // Terminal value at end of project
  workingCapital: number; // Working capital requirements
  maintenanceCosts: number; // Annual maintenance costs
  operatingCosts: number; // Annual operating costs
  
  // Terminal value
  terminalValueMethod: 'salvage' | 'perpetuity' | 'exit-multiple' | 'custom';
  terminalGrowthRate: number; // Growth rate for perpetuity method
  exitMultiple: number; // Exit multiple for terminal value
  
  // Risk adjustments
  riskAdjustments: {
    countryRisk: number;
    currencyRisk: number;
    politicalRisk: number;
    regulatoryRisk: number;
    technologyRisk: number;
  };
  
  // Tax considerations
  taxConsiderations: {
    taxLossCarryforward: number;
    taxCredits: number;
    depreciationMethod: 'straight-line' | 'declining-balance' | 'sum-of-years' | 'custom';
    taxTiming: 'immediate' | 'deferred' | 'accelerated';
  };
  
  // Inflation adjustments
  inflationAdjustments: {
    adjustForInflation: boolean;
    realNPV: boolean;
    inflationRate: number;
    inflationIndex: 'cpi' | 'ppi' | 'custom';
  };
  
  // Sensitivity analysis
  sensitivityParameters: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
  }[];
  
  // Scenario analysis
  scenarios?: {
    scenario: string;
    probability: number;
    cashFlows: number[];
    discountRate: number;
  }[];
  
  // Comparison projects
  comparisonProjects?: {
    name: string;
    cashFlows: number[];
    initialInvestment: number;
    duration: number;
    discountRate: number;
  }[];
  
  // Advanced parameters
  reinvestmentRate: number; // Rate at which positive cash flows are reinvested
  financingRate: number; // Rate for financing negative cash flows
  opportunityCost: number; // Opportunity cost of capital
  
  // Analysis parameters
  calculationMethod: 'standard' | 'modified' | 'adjusted';
  includeOpportunityCost: boolean;
  includeRiskAdjustments: boolean;
  includeTaxEffects: boolean;
  includeInflationEffects: boolean;
  
  // Output preferences
  includeIRR: boolean;
  includePaybackPeriod: boolean;
  includeProfitabilityIndex: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;
  includeMonteCarlo: boolean;
}

export interface NPVResults {
  // Core NPV metrics
  npv: number;
  irr: number;
  paybackPeriod: number;
  discountedPaybackPeriod: number;
  profitabilityIndex: number;
  
  // Time-based analysis
  cumulativeNPV: number[];
  discountedCashFlows: number[];
  timeToBreakEven: number;
  
  // Risk-adjusted metrics
  riskAdjustedNPV: number;
  certaintyEquivalentNPV: number;
  expectedNPV: number;
  npvVolatility: number;
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    npv: number;
    irr: number;
    paybackPeriod: number;
  }[];
  
  // Sensitivity analysis
  sensitivityResults: {
    parameter: string;
    baseNPV: number;
    lowNPV: number;
    highNPV: number;
    sensitivity: number;
  }[];
  
  // Comparison analysis
  comparisonResults: {
    project: string;
    npv: number;
    irr: number;
    paybackPeriod: number;
    ranking: number;
  }[];
  
  // Financial metrics
  financialMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    excessReturn: number;
    riskAdjustedReturn: number;
  };
  
  // Risk analysis
  riskAnalysis: {
    worstCaseNPV: number;
    bestCaseNPV: number;
    expectedNPV: number;
    npvConfidenceInterval: {
      lower: number;
      upper: number;
    };
    probabilityOfLoss: number;
    valueAtRisk: number;
  };
  
  // Cash flow analysis
  cashFlowAnalysis: {
    totalInflows: number;
    totalOutflows: number;
    netCashFlow: number;
    averageAnnualCashFlow: number;
    cashFlowVolatility: number;
    presentValueOfInflows: number;
    presentValueOfOutflows: number;
  };
  
  // Investment efficiency
  investmentEfficiency: {
    returnOnInvestment: number;
    returnOnCapital: number;
    economicValueAdded: number;
    residualIncome: number;
    netPresentValueRatio: number;
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenPoint: number;
    breakEvenTime: number;
    marginOfSafety: number;
    operatingLeverage: number;
    financialLeverage: number;
  };
  
  // Monte Carlo simulation
  monteCarloResults: {
    meanNPV: number;
    medianNPV: number;
    standardDeviation: number;
    percentiles: {
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
    probabilityOfSuccess: number;
    probabilityOfPositiveNPV: number;
  };
  
  // Inflation-adjusted results
  inflationAdjustedResults: {
    realNPV: number;
    nominalNPV: number;
    inflationImpact: number;
    purchasingPower: number;
    realDiscountRate: number;
  };
  
  // Tax-adjusted results
  taxAdjustedResults: {
    afterTaxNPV: number;
    taxShield: number;
    effectiveTaxRate: number;
    taxEfficiency: number;
    taxImpact: number;
  };
  
  // Project ranking
  projectRanking: {
    rank: number;
    score: number;
    recommendation: 'accept' | 'reject' | 'consider';
    reasoning: string[];
  };
  
  // Decision criteria
  decisionCriteria: {
    npvPositive: boolean;
    irrVsDiscountRate: boolean;
    paybackAcceptable: boolean;
    riskAcceptable: boolean;
    overallRecommendation: 'accept' | 'reject' | 'consider';
  };
  
  // Performance metrics
  performanceMetrics: {
    npvRanking: number;
    irrRanking: number;
    riskAdjustedRanking: number;
    overallScore: number;
  };
  
  // Terminal value analysis
  terminalValueAnalysis: {
    terminalValue: number;
    presentValueOfTerminalValue: number;
    terminalValueMethod: string;
    terminalValueSensitivity: number;
  };
  
  // Discount rate analysis
  discountRateAnalysis: {
    costOfEquity: number;
    costOfDebt: number;
    weightedAverageCostOfCapital: number;
    projectSpecificDiscountRate: number;
    riskAdjustedDiscountRate: number;
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
