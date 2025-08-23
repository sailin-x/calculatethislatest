export interface VentureCapitalInputs {
  // Fund Information
  fundName: string;
  fundSize: number;
  fundVintage: number;
  fundLife: number; // in years
  fundType: 'early_stage' | 'growth_stage' | 'late_stage' | 'seed' | 'series_a' | 'series_b' | 'series_c' | 'series_d' | 'mezzanine' | 'pre_ipo' | 'multi_stage';
  
  // Investment Information
  investmentAmount: number;
  investmentDate: string;
  investmentStage: 'seed' | 'series_a' | 'series_b' | 'series_c' | 'series_d' | 'series_e' | 'mezzanine' | 'pre_ipo';
  ownershipPercentage: number;
  valuation: number;
  preMoneyValuation: number;
  postMoneyValuation: number;
  
  // Company Information
  companyName: string;
  companyStage: 'idea' | 'mvp' | 'early_traction' | 'product_market_fit' | 'scaling' | 'mature' | 'exit_ready';
  industry: string;
  sector: string;
  businessModel: string;
  revenueModel: string;
  
  // Financial Metrics
  currentRevenue: number;
  projectedRevenue: number;
  revenueGrowth: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  burnRate: number;
  runway: number; // in months
  cashPosition: number;
  
  // Key Performance Indicators
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  churnRate: number;
  netPromoterScore: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  totalAddressableMarket: number;
  serviceableAddressableMarket: number;
  serviceableObtainableMarket: number;
  
  // Team Information
  teamSize: number;
  founderExperience: number; // in years
  technicalTeam: number;
  salesTeam: number;
  marketingTeam: number;
  operationsTeam: number;
  
  // Market Analysis
  marketSize: number;
  marketGrowth: number;
  competitiveLandscape: string[];
  competitiveAdvantage: string[];
  barriersToEntry: string[];
  regulatoryEnvironment: string[];
  
  // Technology and Product
  technologyStack: string[];
  intellectualProperty: string[];
  patents: number;
  trademarks: number;
  tradeSecrets: number;
  productRoadmap: {
    milestone: string;
    timeline: string;
    status: 'completed' | 'in_progress' | 'planned';
  }[];
  
  // Traction Metrics
  userMetrics: {
    totalUsers: number;
    activeUsers: number;
    payingUsers: number;
    userGrowth: number;
    engagementRate: number;
  };
  
  customerMetrics: {
    totalCustomers: number;
    enterpriseCustomers: number;
    smbCustomers: number;
    customerGrowth: number;
    averageContractValue: number;
  };
  
  // Exit Strategy
  exitStrategy: 'ipo' | 'acquisition' | 'merger' | 'secondary_sale' | 'management_buyout' | 'liquidation';
  expectedExitValue: number;
  expectedExitDate: string;
  exitMultiple: number;
  
  // Comparable Companies
  comparableCompanies: {
    company: string;
    valuation: number;
    revenue: number;
    growth: number;
    multiple: number;
  }[];
  
  // Risk Assessment
  riskFactors: {
    category: string;
    factor: string;
    impact: 'low' | 'medium' | 'high';
    probability: number;
    mitigation: string;
  }[];
  
  // Due Diligence
  dueDiligence: {
    financial: boolean;
    legal: boolean;
    technical: boolean;
    market: boolean;
    team: boolean;
    competitive: boolean;
    regulatory: boolean;
    environmental: boolean;
  };
  
  // Investment Terms
  investmentTerms: {
    liquidationPreference: number;
    participationRights: boolean;
    antiDilution: boolean;
    boardSeats: number;
    vetoRights: string[];
    dragAlong: boolean;
    tagAlong: boolean;
    rightOfFirstRefusal: boolean;
  };
  
  // Fund Performance
  fundPerformance: {
    irr: number;
    tvpi: number;
    dpi: number;
    rvpi: number;
    jCurve: boolean;
    timeToFirstExit: number;
    timeToLiquidity: number;
  };
  
  // Portfolio Company Performance
  portfolioPerformance: {
    revenueGrowth: number;
    userGrowth: number;
    customerGrowth: number;
    valuationGrowth: number;
    fundingRaised: number;
    fundingRounds: number;
    lastValuation: number;
    lastValuationDate: string;
  };
  
  // Market Conditions
  marketConditions: {
    vcFunding: number;
    exitActivity: number;
    ipoMarket: string;
    mandaMarket: string;
    interestRates: number;
    inflation: number;
    economicOutlook: string;
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    revenueGrowth: number;
    valuationMultiple: number;
    exitValue: number;
    exitDate: string;
    irr: number;
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
    valuation: number;
    revenue: number;
    users: number;
    customers: number;
    funding: number;
  }[];
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  terminalGrowthRate: number;
  exitMultiple: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeDilution: boolean;
  
  // Reporting Preferences
  includeValuationAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeComparableAnalysis: boolean;
  includeDueDiligence: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface VentureCapitalResults {
  // Core Investment Metrics
  investmentValue: number;
  currentValue: number;
  unrealizedGain: number;
  realizedGain: number;
  totalReturn: number;
  irr: number;
  tvpi: number;
  dpi: number;
  rvpi: number;
  
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
      ebitda: number;
      freeCashFlow: number;
      presentValue: number;
    }[];
  };
  
  // Comparable Analysis
  comparableAnalysis: {
    comparableCompanies: {
      company: string;
      valuation: number;
      revenue: number;
      growth: number;
      multiple: number;
    }[];
    averageMultiple: number;
    medianMultiple: number;
    impliedValuation: number;
  };
  
  // Exit Analysis
  exitAnalysis: {
    exitStrategy: string;
    expectedExitValue: number;
    expectedExitDate: string;
    exitMultiple: number;
    probabilityOfExit: number;
    timeToExit: number;
    exitScenarios: {
      scenario: string;
      value: number;
      probability: number;
      irr: number;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: number;
    executionRisk: number;
    technologyRisk: number;
    competitiveRisk: number;
    regulatoryRisk: number;
    teamRisk: number;
    financialRisk: number;
    totalRisk: number;
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
  
  // Financial Health
  financialHealth: {
    burnRate: number;
    runway: number;
    cashPosition: number;
    revenueGrowth: number;
    marginTrend: number;
    unitEconomics: {
      cac: number;
      clv: number;
      ltvCacRatio: number;
      paybackPeriod: number;
    };
  };
  
  // Traction Analysis
  tractionAnalysis: {
    userGrowth: number;
    customerGrowth: number;
    revenueGrowth: number;
    engagementMetrics: {
      dau: number;
      mau: number;
      engagementRate: number;
      retentionRate: number;
    };
    customerMetrics: {
      totalCustomers: number;
      payingCustomers: number;
      averageContractValue: number;
      churnRate: number;
    };
  };
  
  // Market Analysis
  marketAnalysis: {
    marketSize: number;
    marketGrowth: number;
    marketShare: number;
    competitivePosition: number;
    competitiveAdvantage: string[];
    marketOpportunities: string[];
    marketThreats: string[];
  };
  
  // Team Analysis
  teamAnalysis: {
    teamSize: number;
    experienceLevel: number;
    skillGaps: string[];
    hiringPlan: string[];
    managementQuality: number;
    executionCapability: number;
  };
  
  // Technology Analysis
  technologyAnalysis: {
    technologyStack: string[];
    intellectualProperty: string[];
    technicalRisk: number;
    scalability: number;
    competitiveAdvantage: number;
    innovationLevel: number;
  };
  
  // Due Diligence Results
  dueDiligenceResults: {
    financial: {
      completed: boolean;
      findings: string[];
      risks: string[];
      recommendations: string[];
    };
    legal: {
      completed: boolean;
      findings: string[];
      risks: string[];
      recommendations: string[];
    };
    technical: {
      completed: boolean;
      findings: string[];
      risks: string[];
      recommendations: string[];
    };
    market: {
      completed: boolean;
      findings: string[];
      risks: string[];
      recommendations: string[];
    };
    team: {
      completed: boolean;
      findings: string[];
      risks: string[];
      recommendations: string[];
    };
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    investmentValue: number;
    irr: number;
    tvpi: number;
    exitValue: number;
    exitDate: string;
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
    valuationTrend: number;
    revenueTrend: number;
  };
  
  // Portfolio Impact
  portfolioImpact: {
    portfolioValue: number;
    positionWeight: number;
    portfolioReturn: number;
    portfolioRisk: number;
    diversificationImpact: number;
    correlationWithPortfolio: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowValuation: number;
    highValuation: number;
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
    investmentValue: number;
    totalReturn: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'invest' | 'pass' | 'hold';
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
