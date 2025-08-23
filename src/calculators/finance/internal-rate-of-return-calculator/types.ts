export interface IRRInputs {
  // Cash flow data
  cashFlows: number[]; // Array of cash flows (negative for outflows, positive for inflows)
  initialInvestment: number; // Initial investment amount
  projectDuration: number; // Project duration in years
  
  // Time periods
  timePeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  
  // Investment details
  projectType: 'business' | 'real-estate' | 'equipment' | 'technology' | 'marketing' | 'research' | 'expansion' | 'acquisition' | 'other';
  investmentCategory: 'capital-expenditure' | 'operating-expense' | 'research-development' | 'marketing' | 'acquisition' | 'expansion';
  
  // Financial parameters
  discountRate: number; // Required rate of return
  costOfCapital: number; // Weighted average cost of capital
  hurdleRate: number; // Minimum acceptable rate of return
  inflationRate: number; // Expected inflation rate
  
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
  }[];
  
  // Advanced parameters
  reinvestmentRate: number; // Rate at which positive cash flows are reinvested
  financingRate: number; // Rate for financing negative cash flows
  terminalValueMethod: 'salvage' | 'perpetuity' | 'exit-multiple' | 'custom';
  
  // Risk adjustments
  riskAdjustments: {
    countryRisk: number;
    currencyRisk: number;
    politicalRisk: number;
    regulatoryRisk: number;
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
    realIRR: boolean;
    inflationIndex: 'cpi' | 'ppi' | 'custom';
  };
  
  // Analysis parameters
  calculationMethod: 'newton-raphson' | 'bisection' | 'secant' | 'excel-approximation';
  tolerance: number; // Convergence tolerance
  maxIterations: number; // Maximum iterations for convergence
  
  // Output preferences
  includeNPV: boolean;
  includePaybackPeriod: boolean;
  includeProfitabilityIndex: boolean;
  includeModifiedIRR: boolean;
  includeScenarioAnalysis: boolean;
  includeSensitivityAnalysis: boolean;
}

export interface IRRResults {
  // Core IRR metrics
  irr: number;
  npv: number;
  paybackPeriod: number;
  discountedPaybackPeriod: number;
  profitabilityIndex: number;
  modifiedIRR: number;
  
  // Time-based analysis
  timeToBreakEven: number;
  cumulativeCashFlow: number[];
  discountedCashFlow: number[];
  
  // Risk-adjusted metrics
  riskAdjustedIRR: number;
  certaintyEquivalentIRR: number;
  expectedIRR: number;
  irrVolatility: number;
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    irr: number;
    npv: number;
    paybackPeriod: number;
  }[];
  
  // Sensitivity analysis
  sensitivityResults: {
    parameter: string;
    baseIRR: number;
    lowIRR: number;
    highIRR: number;
    sensitivity: number;
  }[];
  
  // Comparison analysis
  comparisonResults: {
    project: string;
    irr: number;
    npv: number;
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
    worstCaseIRR: number;
    bestCaseIRR: number;
    expectedIRR: number;
    irrConfidenceInterval: {
      lower: number;
      upper: number;
    };
    probabilityOfLoss: number;
  };
  
  // Cash flow analysis
  cashFlowAnalysis: {
    totalInflows: number;
    totalOutflows: number;
    netCashFlow: number;
    averageAnnualCashFlow: number;
    cashFlowVolatility: number;
  };
  
  // Investment efficiency
  investmentEfficiency: {
    returnOnInvestment: number;
    returnOnCapital: number;
    economicValueAdded: number;
    residualIncome: number;
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenPoint: number;
    breakEvenTime: number;
    marginOfSafety: number;
    operatingLeverage: number;
  };
  
  // Monte Carlo simulation
  monteCarloResults: {
    meanIRR: number;
    medianIRR: number;
    standardDeviation: number;
    percentiles: {
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
    probabilityOfSuccess: number;
  };
  
  // Inflation-adjusted results
  inflationAdjustedResults: {
    realIRR: number;
    nominalIRR: number;
    inflationImpact: number;
    purchasingPower: number;
  };
  
  // Tax-adjusted results
  taxAdjustedResults: {
    afterTaxIRR: number;
    taxShield: number;
    effectiveTaxRate: number;
    taxEfficiency: number;
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
    irrVsHurdle: boolean;
    npvPositive: boolean;
    paybackAcceptable: boolean;
    riskAcceptable: boolean;
    overallRecommendation: 'accept' | 'reject' | 'consider';
  };
  
  // Performance metrics
  performanceMetrics: {
    irrRanking: number;
    npvRanking: number;
    riskAdjustedRanking: number;
    overallScore: number;
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
