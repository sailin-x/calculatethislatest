export interface WACCInputs {
  // Capital structure
  marketValueOfEquity: number; // Market value of equity
  marketValueOfDebt: number; // Market value of debt
  marketValueOfPreferredStock: number; // Market value of preferred stock
  totalCapital: number; // Total capital (equity + debt + preferred)
  
  // Cost of equity
  riskFreeRate: number; // Risk-free rate
  marketRiskPremium: number; // Market risk premium
  beta: number; // Equity beta
  costOfEquity: number; // Pre-calculated cost of equity
  
  // Cost of debt
  costOfDebt: number; // Pre-tax cost of debt
  taxRate: number; // Corporate tax rate
  debtRating: 'aaa' | 'aa' | 'a' | 'bbb' | 'bb' | 'b' | 'ccc' | 'cc' | 'c' | 'd';
  debtSpread: number; // Credit spread over risk-free rate
  
  // Cost of preferred stock
  preferredDividend: number; // Annual preferred dividend
  preferredStockPrice: number; // Current preferred stock price
  costOfPreferredStock: number; // Pre-calculated cost of preferred stock
  
  // Market data
  marketCap: number; // Market capitalization
  enterpriseValue: number; // Enterprise value
  bookValueOfEquity: number; // Book value of equity
  bookValueOfDebt: number; // Book value of debt
  
  // Industry and company specifics
  industry: 'technology' | 'healthcare' | 'finance' | 'retail' | 'manufacturing' | 'energy' | 'utilities' | 'telecom' | 'other';
  companySize: 'small' | 'medium' | 'large' | 'mega-cap';
  geographicRegion: 'domestic' | 'international' | 'emerging-markets' | 'global';
  
  // Risk factors
  countryRisk: number; // Country risk premium
  currencyRisk: number; // Currency risk premium
  politicalRisk: number; // Political risk premium
  regulatoryRisk: number; // Regulatory risk premium
  
  // Capital structure preferences
  targetCapitalStructure: {
    targetDebtRatio: number;
    targetEquityRatio: number;
    targetPreferredRatio: number;
  };
  
  // Debt structure
  debtStructure: {
    shortTermDebt: number;
    longTermDebt: number;
    floatingRateDebt: number;
    fixedRateDebt: number;
    convertibleDebt: number;
  };
  
  // Equity structure
  equityStructure: {
    commonStock: number;
    preferredStock: number;
    retainedEarnings: number;
    treasuryStock: number;
  };
  
  // Market conditions
  marketConditions: 'recession' | 'stable' | 'growth' | 'boom';
  interestRateEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
  
  // Industry benchmarks
  industryBenchmarks: {
    industryBeta: number;
    industryCostOfEquity: number;
    industryCostOfDebt: number;
    industryWACC: number;
  };
  
  // Comparable companies
  comparableCompanies: {
    company: string;
    beta: number;
    costOfEquity: number;
    costOfDebt: number;
    wacc: number;
    debtRatio: number;
  }[];
  
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
    riskFreeRate: number;
    marketRiskPremium: number;
    beta: number;
    costOfDebt: number;
    taxRate: number;
  }[];
  
  // Advanced parameters
  flotationCosts: number; // Flotation costs for new equity
  debtIssuanceCosts: number; // Debt issuance costs
  preferredIssuanceCosts: number; // Preferred stock issuance costs
  
  // Time-varying parameters
  timeVaryingParameters: {
    useTimeVarying: boolean;
    updateFrequency: 'monthly' | 'quarterly' | 'annually';
    historicalData: {
      date: string;
      wacc: number;
      costOfEquity: number;
      costOfDebt: number;
    }[];
  };
  
  // Risk adjustments
  riskAdjustments: {
    sizeRiskPremium: number;
    liquidityRiskPremium: number;
    sectorRiskPremium: number;
    companySpecificRisk: number;
  };
  
  // Tax considerations
  taxConsiderations: {
    effectiveTaxRate: number;
    marginalTaxRate: number;
    taxLossCarryforward: number;
    taxCredits: number;
    internationalTaxRate: number;
  };
  
  // Currency considerations
  currencyConsiderations: {
    baseCurrency: string;
    foreignCurrencyExposure: number;
    currencyRiskPremium: number;
    hedgingCosts: number;
  };
  
  // Analysis parameters
  calculationMethod: 'standard' | 'adjusted' | 'international';
  includeFlotationCosts: boolean;
  includeCountryRisk: boolean;
  includeCurrencyRisk: boolean;
  includeSizeRisk: boolean;
  includeLiquidityRisk: boolean;
  
  // Output preferences
  includeSensitivityAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeComparableAnalysis: boolean;
  includeHistoricalAnalysis: boolean;
  includeBreakdown: boolean;
}

export interface WACCResults {
  // Core WACC metrics
  wacc: number;
  costOfEquity: number;
  costOfDebt: number;
  costOfPreferredStock: number;
  
  // Capital structure weights
  equityWeight: number;
  debtWeight: number;
  preferredWeight: number;
  
  // Component breakdown
  equityComponent: number;
  debtComponent: number;
  preferredComponent: number;
  
  // Risk-adjusted metrics
  riskAdjustedWACC: number;
  countryRiskAdjustedWACC: number;
  currencyRiskAdjustedWACC: number;
  
  // Industry comparison
  industryComparison: {
    industryWACC: number;
    companyWACC: number;
    difference: number;
    percentile: number;
    performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  };
  
  // Comparable analysis
  comparableAnalysis: {
    company: string;
    wacc: number;
    costOfEquity: number;
    costOfDebt: number;
    debtRatio: number;
    ranking: number;
  }[];
  
  // Sensitivity analysis
  sensitivityResults: {
    parameter: string;
    baseWACC: number;
    lowWACC: number;
    highWACC: number;
    sensitivity: number;
  }[];
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    wacc: number;
    costOfEquity: number;
    costOfDebt: number;
    equityWeight: number;
    debtWeight: number;
  }[];
  
  // Historical analysis
  historicalAnalysis: {
    date: string;
    wacc: number;
    costOfEquity: number;
    costOfDebt: number;
    equityWeight: number;
    debtWeight: number;
  }[];
  
  // Capital structure analysis
  capitalStructureAnalysis: {
    currentStructure: {
      equity: number;
      debt: number;
      preferred: number;
    };
    optimalStructure: {
      equity: number;
      debt: number;
      preferred: number;
    };
    targetStructure: {
      equity: number;
      debt: number;
      preferred: number;
    };
    waccAtOptimal: number;
    waccAtTarget: number;
  };
  
  // Risk analysis
  riskAnalysis: {
    totalRiskPremium: number;
    countryRiskPremium: number;
    currencyRiskPremium: number;
    sizeRiskPremium: number;
    liquidityRiskPremium: number;
    companySpecificRisk: number;
  };
  
  // Tax analysis
  taxAnalysis: {
    taxShield: number;
    effectiveTaxRate: number;
    marginalTaxRate: number;
    taxBenefit: number;
    afterTaxCostOfDebt: number;
  };
  
  // Market analysis
  marketAnalysis: {
    marketRiskPremium: number;
    riskFreeRate: number;
    beta: number;
    marketCap: number;
    enterpriseValue: number;
  };
  
  // Performance metrics
  performanceMetrics: {
    waccRanking: number;
    costOfEquityRanking: number;
    costOfDebtRanking: number;
    overallScore: number;
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    area: string;
    currentValue: number;
    potentialValue: number;
    improvement: number;
    recommendations: string[];
  }[];
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenReturn: number;
    marginOfSafety: number;
    requiredReturn: number;
    projectAcceptance: boolean;
  };
  
  // Valuation implications
  valuationImplications: {
    discountRate: number;
    terminalValue: number;
    presentValue: number;
    valuationImpact: number;
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
