export interface REITInputs {
  // REIT Information
  reitName: string;
  reitSymbol: string;
  reitType: 'equity' | 'mortgage' | 'hybrid' | 'healthcare' | 'office' | 'retail' | 'industrial' | 'residential' | 'hotel' | 'data_center' | 'self_storage' | 'timber' | 'infrastructure' | 'specialty';
  exchange: string;
  marketCap: number;
  
  // Share Information
  sharesOutstanding: number;
  currentPrice: number;
  bookValue: number;
  tangibleBookValue: number;
  priceToBook: number;
  priceToEarnings: number;
  priceToFFO: number;
  priceToAFFO: number;
  
  // Financial Performance
  totalRevenue: number;
  netIncome: number;
  fundsFromOperations: number;
  adjustedFundsFromOperations: number;
  cashAvailableForDistribution: number;
  normalizedFFO: number;
  normalizedAFFO: number;
  
  // Property Portfolio
  totalProperties: number;
  totalSquareFootage: number;
  occupancyRate: number;
  weightedAverageLeaseTerm: number;
  averageRentPerSqFt: number;
  sameStoreNOI: number;
  sameStoreNOIGrowth: number;
  
  // Property Types
  propertyTypes: {
    type: string;
    count: number;
    squareFootage: number;
    value: number;
    percentage: number;
  }[];
  
  // Geographic Distribution
  geographicDistribution: {
    region: string;
    properties: number;
    squareFootage: number;
    value: number;
    percentage: number;
  }[];
  
  // Tenant Information
  tenantConcentration: {
    tenant: string;
    squareFootage: number;
    rent: number;
    percentage: number;
    creditRating: string;
  }[];
  
  // Debt and Leverage
  totalDebt: number;
  netDebt: number;
  debtToEquity: number;
  debtToEBITDA: number;
  interestCoverage: number;
  fixedChargeCoverage: number;
  weightedAverageInterestRate: number;
  weightedAverageMaturity: number;
  
  // Debt Maturity Schedule
  debtMaturitySchedule: {
    year: number;
    amount: number;
    percentage: number;
  }[];
  
  // Dividend Information
  annualDividend: number;
  dividendYield: number;
  dividendPayoutRatio: number;
  dividendGrowthRate: number;
  dividendCoverage: number;
  dividendHistory: {
    year: number;
    dividend: number;
    growth: number;
  }[];
  
  // Growth Metrics
  revenueGrowth: number;
  NOIGrowth: number;
  FFOGrowth: number;
  AFFOGrowth: number;
  dividendGrowth: number;
  sameStoreGrowth: number;
  
  // Valuation Metrics
  capRate: number;
  impliedCapRate: number;
  netAssetValue: number;
  priceToNAV: number;
  enterpriseValue: number;
  EVToEBITDA: number;
  EVToFFO: number;
  EVToAFFO: number;
  
  // Operating Metrics
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  FFOmargin: number;
  AFFOmargin: number;
  expenseRatio: number;
  managementFee: number;
  
  // Market Data
  beta: number;
  volatility: number;
  correlationWithMarket: number;
  correlationWithBonds: number;
  correlationWithRealEstate: number;
  
  // Interest Rate Sensitivity
  interestRateSensitivity: number;
  duration: number;
  convexity: number;
  
  // Inflation Sensitivity
  inflationSensitivity: number;
  rentEscalation: number;
  expenseEscalation: number;
  
  // Economic Indicators
  gdpGrowth: number;
  unemploymentRate: number;
  inflationRate: number;
  interestRate: number;
  realEstateMarketGrowth: number;
  
  // Sector Analysis
  sectorPerformance: number;
  sectorValuation: number;
  sectorGrowth: number;
  sectorRisk: number;
  
  // Peer Comparison
  peerGroup: string[];
  peerMetrics: {
    metric: string;
    reitValue: number;
    peerAverage: number;
    peerMedian: number;
    percentile: number;
  }[];
  
  // Development Pipeline
  developmentPipeline: {
    project: string;
    type: string;
    squareFootage: number;
    cost: number;
    completionDate: string;
    expectedNOI: number;
    expectedYield: number;
  }[];
  
  // Acquisition Pipeline
  acquisitionPipeline: {
    property: string;
    type: string;
    squareFootage: number;
    purchasePrice: number;
    expectedNOI: number;
    expectedYield: number;
    closingDate: string;
  }[];
  
  // Disposition Pipeline
  dispositionPipeline: {
    property: string;
    type: string;
    squareFootage: number;
    salePrice: number;
    gain: number;
    closingDate: string;
  }[];
  
  // Risk Factors
  riskFactors: {
    category: string;
    factor: string;
    impact: 'low' | 'medium' | 'high';
    probability: number;
  }[];
  
  // ESG Metrics
  esgMetrics: {
    environmentalScore: number;
    socialScore: number;
    governanceScore: number;
    overallScore: number;
    carbonFootprint: number;
    energyEfficiency: number;
    waterEfficiency: number;
    wasteReduction: number;
    communityImpact: number;
    employeeSatisfaction: number;
    boardIndependence: number;
    executiveCompensation: number;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  terminalGrowthRate: number;
  exitCapRate: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeInflation: boolean;
  
  // Scenario Analysis
  scenarios: {
    name: string;
    revenueGrowth: number;
    NOIGrowth: number;
    capRateChange: number;
    interestRateChange: number;
    occupancyChange: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeMarketShocks: boolean;
  marketShockProbability: number;
  marketShockSize: number;
  
  // Historical Analysis
  historicalData: {
    date: string;
    price: number;
    dividend: number;
    FFO: number;
    AFFO: number;
    NAV: number;
    occupancy: number;
  }[];
  
  // Reporting Preferences
  includeValuationAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includePeerComparison: boolean;
  includeESGAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface REITResults {
  // Core REIT Metrics
  reitValue: number;
  intrinsicValue: number;
  fairValue: number;
  targetPrice: number;
  upsidePotential: number;
  
  // Valuation Analysis
  valuationAnalysis: {
    method: string;
    value: number;
    weight: number;
    assumptions: string[];
  }[];
  
  // DCF Analysis
  dcfAnalysis: {
    presentValue: number;
    terminalValue: number;
    enterpriseValue: number;
    equityValue: number;
    valuePerShare: number;
    cashFlows: {
      year: number;
      revenue: number;
      NOI: number;
      FFO: number;
      AFFO: number;
      freeCashFlow: number;
      presentValue: number;
    }[];
  };
  
  // NAV Analysis
  navAnalysis: {
    netAssetValue: number;
    priceToNAV: number;
    impliedCapRate: number;
    propertyValues: {
      property: string;
      value: number;
      capRate: number;
    }[];
  };
  
  // Dividend Analysis
  dividendAnalysis: {
    currentYield: number;
    sustainableYield: number;
    dividendCoverage: number;
    dividendGrowth: number;
    dividendSafety: number;
    dividendProjection: {
      year: number;
      dividend: number;
      growth: number;
      coverage: number;
    }[];
  };
  
  // Growth Analysis
  growthAnalysis: {
    revenueGrowth: number;
    NOIGrowth: number;
    FFOGrowth: number;
    AFFOGrowth: number;
    dividendGrowth: number;
    sameStoreGrowth: number;
    growthDrivers: string[];
    growthRisks: string[];
  };
  
  // Risk Metrics
  riskMetrics: {
    beta: number;
    volatility: number;
    valueAtRisk: number;
    conditionalVaR: number;
    maxDrawdown: number;
    downsideDeviation: number;
    riskOfLoss: number;
  };
  
  // Performance Metrics
  performanceMetrics: {
    totalReturn: number;
    priceReturn: number;
    dividendReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
  };
  
  // Financial Health
  financialHealth: {
    debtToEquity: number;
    interestCoverage: number;
    fixedChargeCoverage: number;
    debtToEBITDA: number;
    liquidityRatio: number;
    currentRatio: number;
    quickRatio: number;
    cashRatio: number;
  };
  
  // Operating Efficiency
  operatingEfficiency: {
    occupancyRate: number;
    rentPerSqFt: number;
    expenseRatio: number;
    NOImargin: number;
    FFOmargin: number;
    AFFOmargin: number;
    sameStorePerformance: number;
  };
  
  // Portfolio Quality
  portfolioQuality: {
    propertyQuality: number;
    tenantQuality: number;
    leaseQuality: number;
    locationQuality: number;
    overallQuality: number;
    qualityFactors: string[];
  };
  
  // Market Analysis
  marketAnalysis: {
    marketPosition: number;
    competitiveAdvantage: number;
    marketShare: number;
    marketGrowth: number;
    marketRisk: number;
    marketOpportunities: string[];
    marketThreats: string[];
  };
  
  // Peer Comparison
  peerComparison: {
    peerGroup: string[];
    relativeValuation: number;
    relativePerformance: number;
    relativeRisk: number;
    relativeGrowth: number;
    peerRanking: number;
    peerPercentile: number;
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    reitValue: number;
    upsidePotential: number;
    downsideRisk: number;
    probability: number;
    keyAssumptions: string[];
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
  
  // Historical Analysis
  historicalAnalysis: {
    historicalReturn: number;
    historicalVolatility: number;
    historicalSharpeRatio: number;
    historicalMaxDrawdown: number;
    priceCorrelation: number;
    dividendCorrelation: number;
  };
  
  // ESG Analysis
  esgAnalysis: {
    environmentalScore: number;
    socialScore: number;
    governanceScore: number;
    overallScore: number;
    esgRisk: number;
    esgOpportunity: number;
    esgFactors: string[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: number;
    interestRateRisk: number;
    creditRisk: number;
    liquidityRisk: number;
    operationalRisk: number;
    regulatoryRisk: number;
    environmentalRisk: number;
    totalRisk: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPrice: number;
    highPrice: number;
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
    reitValue: number;
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
