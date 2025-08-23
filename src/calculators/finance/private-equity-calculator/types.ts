export interface PrivateEquityInputs {
  // Fund Information
  fundName: string;
  fundSize: number;
  fundVintage: number;
  fundLife: number; // in years
  fundType: 'buyout' | 'growth' | 'venture' | 'mezzanine' | 'distressed' | 'special_situations' | 'infrastructure' | 'real_estate' | 'secondaries' | 'fund_of_funds';
  
  // Investment Information
  investmentAmount: number;
  investmentDate: string;
  investmentType: 'control' | 'minority' | 'growth' | 'distressed' | 'special_situations';
  ownershipPercentage: number;
  enterpriseValue: number;
  equityValue: number;
  debtValue: number;
  
  // Company Information
  companyName: string;
  companyStage: 'startup' | 'growth' | 'mature' | 'turnaround' | 'distressed' | 'stable';
  industry: string;
  sector: string;
  businessModel: string;
  revenueModel: string;
  
  // Financial Metrics
  currentRevenue: number;
  projectedRevenue: number;
  revenueGrowth: number;
  ebitda: number;
  ebitdaMargin: number;
  netIncome: number;
  netMargin: number;
  freeCashFlow: number;
  fcfMargin: number;
  
  // Balance Sheet
  totalAssets: number;
  totalLiabilities: number;
  shareholdersEquity: number;
  workingCapital: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquity: number;
  debtToEbitda: number;
  
  // Capital Structure
  seniorDebt: number;
  mezzanineDebt: number;
  preferredEquity: number;
  commonEquity: number;
  totalDebt: number;
  netDebt: number;
  leverageRatio: number;
  interestCoverage: number;
  
  // Debt Terms
  debtTerms: {
    type: string;
    amount: number;
    interestRate: number;
    maturity: string;
    amortization: string;
    covenants: string[];
  }[];
  
  // Operational Metrics
  operationalMetrics: {
    revenuePerEmployee: number;
    ebitdaPerEmployee: number;
    assetTurnover: number;
    inventoryTurnover: number;
    receivablesDays: number;
    payablesDays: number;
    cashConversionCycle: number;
  };
  
  // Market Analysis
  marketSize: number;
  marketGrowth: number;
  marketShare: number;
  competitiveLandscape: string[];
  competitiveAdvantage: string[];
  barriersToEntry: string[];
  regulatoryEnvironment: string[];
  
  // Industry Analysis
  industryMetrics: {
    averageEbitdaMargin: number;
    averageRevenueGrowth: number;
    averageLeverage: number;
    averageValuationMultiple: number;
    industryTrends: string[];
  };
  
  // Management Team
  managementTeam: {
    ceo: {
      name: string;
      experience: number;
      trackRecord: string;
      compensation: number;
    };
    cfo: {
      name: string;
      experience: number;
      trackRecord: string;
      compensation: number;
    };
    keyExecutives: {
      name: string;
      title: string;
      experience: number;
      compensation: number;
    }[];
  };
  
  // Value Creation Plan
  valueCreationPlan: {
    operationalImprovements: {
      initiative: string;
      impact: number;
      timeline: string;
      cost: number;
    }[];
    growthInitiatives: {
      initiative: string;
      impact: number;
      timeline: string;
      investment: number;
    }[];
    costReductions: {
      initiative: string;
      savings: number;
      timeline: string;
      cost: number;
    }[];
    strategicInitiatives: {
      initiative: string;
      impact: number;
      timeline: string;
      investment: number;
    }[];
  };
  
  // Exit Strategy
  exitStrategy: 'ipo' | 'strategic_sale' | 'financial_sale' | 'recapitalization' | 'dividend_recap' | 'secondary_sale' | 'liquidation';
  expectedExitValue: number;
  expectedExitDate: string;
  exitMultiple: number;
  exitProbability: number;
  
  // Comparable Companies
  comparableCompanies: {
    company: string;
    valuation: number;
    revenue: number;
    ebitda: number;
    multiple: number;
    leverage: number;
  }[];
  
  // Comparable Transactions
  comparableTransactions: {
    target: string;
    acquirer: string;
    dealValue: number;
    multiple: number;
    date: string;
    type: string;
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
    operational: boolean;
    market: boolean;
    environmental: boolean;
    tax: boolean;
    regulatory: boolean;
    technology: boolean;
  };
  
  // Investment Terms
  investmentTerms: {
    purchasePrice: number;
    earnout: number;
    escrow: number;
    workingCapitalAdjustment: boolean;
    indemnification: boolean;
    representations: string[];
    warranties: string[];
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
    ebitdaGrowth: number;
    marginExpansion: number;
    cashFlowGeneration: number;
    debtPaydown: number;
    valueCreation: number;
  };
  
  // Market Conditions
  marketConditions: {
    peFundraising: number;
    exitActivity: number;
    ipoMarket: string;
    mandaMarket: string;
    debtMarkets: string;
    interestRates: number;
    inflation: number;
    economicOutlook: string;
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    revenueGrowth: number;
    marginExpansion: number;
    exitMultiple: number;
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
    ebitda: number;
    debt: number;
    cashFlow: number;
  }[];
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  terminalGrowthRate: number;
  exitMultiple: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeSynergies: boolean;
  
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

export interface PrivateEquityResults {
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
      ebitda: number;
      multiple: number;
      leverage: number;
    }[];
    comparableTransactions: {
      target: string;
      dealValue: number;
      multiple: number;
      date: string;
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
    operationalRisk: number;
    financialRisk: number;
    regulatoryRisk: number;
    managementRisk: number;
    competitiveRisk: number;
    executionRisk: number;
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
    revenueGrowth: number;
    ebitdaGrowth: number;
    marginExpansion: number;
    cashFlowGeneration: number;
    debtPaydown: number;
    leverageRatio: number;
    interestCoverage: number;
    liquidityRatio: number;
  };
  
  // Operational Performance
  operationalPerformance: {
    revenuePerEmployee: number;
    ebitdaPerEmployee: number;
    assetTurnover: number;
    inventoryTurnover: number;
    receivablesDays: number;
    payablesDays: number;
    cashConversionCycle: number;
    operationalEfficiency: number;
  };
  
  // Value Creation Analysis
  valueCreationAnalysis: {
    operationalImprovements: {
      initiative: string;
      impact: number;
      status: string;
      valueCreated: number;
    }[];
    growthInitiatives: {
      initiative: string;
      impact: number;
      status: string;
      valueCreated: number;
    }[];
    costReductions: {
      initiative: string;
      savings: number;
      status: string;
      valueCreated: number;
    }[];
    strategicInitiatives: {
      initiative: string;
      impact: number;
      status: string;
      valueCreated: number;
    }[];
    totalValueCreated: number;
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
  
  // Industry Analysis
  industryAnalysis: {
    averageEbitdaMargin: number;
    averageRevenueGrowth: number;
    averageLeverage: number;
    averageValuationMultiple: number;
    industryTrends: string[];
    relativePerformance: number;
    industryRanking: number;
  };
  
  // Management Analysis
  managementAnalysis: {
    managementQuality: number;
    executionCapability: number;
    alignment: number;
    trackRecord: number;
    compensation: number;
    retentionRisk: number;
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
    operational: {
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
    environmental: {
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
    ebitdaTrend: number;
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
