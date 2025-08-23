export interface CreditRiskInputs {
  // Borrower Information
  borrowerName: string;
  borrowerType: 'individual' | 'corporate' | 'sovereign' | 'municipal' | 'financial_institution' | 'non_profit';
  industry: string;
  sector: string;
  creditRating: string;
  creditScore: number;
  
  // Financial Information
  annualRevenue: number;
  ebitda: number;
  netIncome: number;
  freeCashFlow: number;
  totalAssets: number;
  totalLiabilities: number;
  shareholdersEquity: number;
  workingCapital: number;
  currentRatio: number;
  quickRatio: number;
  
  // Debt Information
  totalDebt: number;
  shortTermDebt: number;
  longTermDebt: number;
  debtToEquity: number;
  debtToEbitda: number;
  interestCoverage: number;
  fixedChargeCoverage: number;
  debtServiceCoverage: number;
  
  // Loan Information
  loanAmount: number;
  loanType: 'term_loan' | 'revolving_credit' | 'bridge_loan' | 'construction_loan' | 'mortgage' | 'personal_loan' | 'business_loan' | 'credit_card' | 'line_of_credit';
  interestRate: number;
  loanTerm: number; // in months
  paymentFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
  collateralValue: number;
  loanToValue: number;
  
  // Payment History
  paymentHistory: {
    date: string;
    payment: number;
    dueDate: string;
    actualDate: string;
    status: 'on_time' | 'late' | 'default' | 'partial';
    daysLate: number;
  }[];
  
  // Credit History
  creditHistory: {
    account: string;
    type: string;
    limit: number;
    balance: number;
    utilization: number;
    paymentHistory: string;
    status: 'open' | 'closed' | 'default' | 'charge_off';
  }[];
  
  // Market Data
  marketData: {
    stockPrice: number;
    marketCap: number;
    beta: number;
    volatility: number;
    correlationWithMarket: number;
    industryBeta: number;
  };
  
  // Economic Indicators
  economicIndicators: {
    gdpGrowth: number;
    unemploymentRate: number;
    inflationRate: number;
    interestRate: number;
    industryGrowth: number;
    sectorPerformance: number;
  };
  
  // Industry Analysis
  industryAnalysis: {
    industryRisk: number;
    competitivePosition: number;
    marketShare: number;
    barriersToEntry: number;
    regulatoryEnvironment: string;
    industryTrends: string[];
  };
  
  // Management Assessment
  managementAssessment: {
    experience: number;
    trackRecord: number;
    strategy: number;
    execution: number;
    governance: number;
    overallScore: number;
  };
  
  // Collateral Analysis
  collateralAnalysis: {
    collateralType: string;
    collateralValue: number;
    collateralQuality: number;
    collateralLiquidity: number;
    collateralVolatility: number;
    collateralCorrelation: number;
  };
  
  // Covenants
  covenants: {
    financialCovenants: {
      covenant: string;
      threshold: number;
      current: number;
      compliance: boolean;
    }[];
    nonFinancialCovenants: {
      covenant: string;
      requirement: string;
      compliance: boolean;
    }[];
  };
  
  // Risk Factors
  riskFactors: {
    category: string;
    factor: string;
    impact: 'low' | 'medium' | 'high';
    probability: number;
    mitigation: string;
  }[];
  
  // Stress Testing
  stressTests: {
    name: string;
    revenueShock: number;
    costShock: number;
    interestRateShock: number;
    collateralShock: number;
    marketShock: number;
  }[];
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    revenueChange: number;
    costChange: number;
    interestRateChange: number;
    marketChange: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeCorrelationRisk: boolean;
  includeVolatilityRisk: boolean;
  includeJumpRisk: boolean;
  
  // Historical Analysis
  historicalData: {
    date: string;
    revenue: number;
    ebitda: number;
    debt: number;
    cashFlow: number;
    creditMetrics: {
      debtToEbitda: number;
      interestCoverage: number;
      currentRatio: number;
    };
  }[];
  
  // Credit Rating Models
  creditRatingModels: {
    altmanZScore: boolean;
    mertonModel: boolean;
    kvmModel: boolean;
    creditMetrics: boolean;
    reducedFormModel: boolean;
    structuralModel: boolean;
  };
  
  // Default Probability Models
  defaultProbabilityModels: {
    logisticRegression: boolean;
    probitModel: boolean;
    survivalAnalysis: boolean;
    neuralNetwork: boolean;
    randomForest: boolean;
    supportVectorMachine: boolean;
  };
  
  // Loss Given Default
  lossGivenDefault: {
    recoveryRate: number;
    collateralRecovery: number;
    unsecuredRecovery: number;
    recoveryTimeline: number;
    recoveryCosts: number;
    lgd: number;
  };
  
  // Exposure at Default
  exposureAtDefault: {
    currentExposure: number;
    potentialExposure: number;
    committedExposure: number;
    undrawnExposure: number;
    totalExposure: number;
  };
  
  // Maturity Analysis
  maturityAnalysis: {
    averageMaturity: number;
    maturityProfile: {
      period: string;
      amount: number;
      percentage: number;
    }[];
    refinancingRisk: number;
    rolloverRisk: number;
  };
  
  // Concentration Risk
  concentrationRisk: {
    singleNameConcentration: number;
    industryConcentration: number;
    geographicConcentration: number;
    sectorConcentration: number;
    correlationRisk: number;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  confidenceLevel: number;
  timeHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeInflation: boolean;
  
  // Reporting Preferences
  includeDefaultProbability: boolean;
  includeLossGivenDefault: boolean;
  includeExposureAtDefault: boolean;
  includeExpectedLoss: boolean;
  includeUnexpectedLoss: boolean;
  includeStressTesting: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeCreditRating: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface CreditRiskResults {
  // Core Credit Risk Metrics
  defaultProbability: number;
  lossGivenDefault: number;
  exposureAtDefault: number;
  expectedLoss: number;
  unexpectedLoss: number;
  creditValueAtRisk: number;
  creditSpread: number;
  
  // Credit Rating Analysis
  creditRatingAnalysis: {
    currentRating: string;
    impliedRating: string;
    ratingOutlook: 'positive' | 'stable' | 'negative';
    ratingProbability: number;
    ratingFactors: {
      factor: string;
      score: number;
      weight: number;
      impact: string;
    }[];
  };
  
  // Default Probability Analysis
  defaultProbabilityAnalysis: {
    oneYearPd: number;
    fiveYearPd: number;
    lifetimePd: number;
    pdTrend: number;
    pdDrivers: {
      driver: string;
      impact: number;
      sensitivity: number;
    }[];
  };
  
  // Loss Given Default Analysis
  lossGivenDefaultAnalysis: {
    recoveryRate: number;
    collateralRecovery: number;
    unsecuredRecovery: number;
    recoveryTimeline: number;
    recoveryCosts: number;
    lgd: number;
    lgdDrivers: {
      driver: string;
      impact: number;
      sensitivity: number;
    }[];
  };
  
  // Exposure at Default Analysis
  exposureAtDefaultAnalysis: {
    currentExposure: number;
    potentialExposure: number;
    committedExposure: number;
    undrawnExposure: number;
    totalExposure: number;
    exposureProfile: {
      period: string;
      exposure: number;
      probability: number;
    }[];
  };
  
  // Expected Loss Analysis
  expectedLossAnalysis: {
    expectedLoss: number;
    expectedLossRate: number;
    expectedLossComponents: {
      component: string;
      amount: number;
      percentage: number;
    }[];
    expectedLossTrend: number;
  };
  
  // Unexpected Loss Analysis
  unexpectedLossAnalysis: {
    unexpectedLoss: number;
    unexpectedLossRate: number;
    unexpectedLossComponents: {
      component: string;
      amount: number;
      percentage: number;
    }[];
    unexpectedLossTrend: number;
  };
  
  // Credit Value at Risk
  creditValueAtRisk: {
    creditVar: number;
    creditVarConfidence: number;
    creditVarHorizon: number;
    creditVarComponents: {
      component: string;
      contribution: number;
      percentage: number;
    }[];
  };
  
  // Credit Spread Analysis
  creditSpreadAnalysis: {
    creditSpread: number;
    spreadToTreasury: number;
    spreadToBenchmark: number;
    spreadComponents: {
      component: string;
      basisPoints: number;
      percentage: number;
    }[];
  };
  
  // Financial Health Analysis
  financialHealthAnalysis: {
    profitability: number;
    liquidity: number;
    solvency: number;
    efficiency: number;
    growth: number;
    overallScore: number;
    healthFactors: {
      factor: string;
      score: number;
      weight: number;
      trend: string;
    }[];
  };
  
  // Debt Capacity Analysis
  debtCapacityAnalysis: {
    currentDebtCapacity: number;
    optimalDebtCapacity: number;
    debtCapacityUtilization: number;
    debtCapacityDrivers: {
      driver: string;
      impact: number;
      sensitivity: number;
    }[];
  };
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    operatingCashFlow: number;
    freeCashFlow: number;
    cashFlowCoverage: number;
    cashFlowVolatility: number;
    cashFlowTrend: number;
    cashFlowProjection: {
      period: string;
      cashFlow: number;
      probability: number;
    }[];
  };
  
  // Collateral Analysis
  collateralAnalysis: {
    collateralValue: number;
    collateralQuality: number;
    collateralLiquidity: number;
    collateralVolatility: number;
    collateralCorrelation: number;
    collateralCoverage: number;
  };
  
  // Covenant Analysis
  covenantAnalysis: {
    covenantCompliance: number;
    covenantBreachRisk: number;
    covenantBuffer: number;
    covenantTrend: number;
    covenantDetails: {
      covenant: string;
      threshold: number;
      current: number;
      compliance: boolean;
      risk: number;
    }[];
  };
  
  // Industry Analysis
  industryAnalysis: {
    industryRisk: number;
    competitivePosition: number;
    marketShare: number;
    barriersToEntry: number;
    regulatoryEnvironment: string;
    industryTrends: string[];
    industryOutlook: string;
  };
  
  // Management Analysis
  managementAnalysis: {
    experience: number;
    trackRecord: number;
    strategy: number;
    execution: number;
    governance: number;
    overallScore: number;
    managementRisks: string[];
    managementStrengths: string[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: number;
    creditRisk: number;
    liquidityRisk: number;
    operationalRisk: number;
    concentrationRisk: number;
    regulatoryRisk: number;
    totalRisk: number;
  };
  
  // Stress Test Results
  stressTestResults: {
    testName: string;
    revenueShock: number;
    costShock: number;
    interestRateShock: number;
    collateralShock: number;
    marketShock: number;
    defaultProbability: number;
    expectedLoss: number;
    creditVar: number;
  }[];
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    defaultProbability: number;
    expectedLoss: number;
    creditVar: number;
    creditSpread: number;
    keyAssumptions: string[];
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanDefaultProbability: number;
    medianDefaultProbability: number;
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
      defaultProbability: number;
      probability: number;
    }[];
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalDefaultRate: number;
    historicalRecoveryRate: number;
    historicalLossRate: number;
    historicalTrends: string[];
    historicalVolatility: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowDefaultProbability: number;
    highDefaultProbability: number;
    sensitivity: number;
  }[];
  
  // Comparative Analysis
  comparativeAnalysis: {
    peerGroup: string[];
    peerDefaultRate: number;
    peerRecoveryRate: number;
    peerLossRate: number;
    relativeRisk: number;
    peerRanking: number;
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
    creditCost: number;
    capitalRequirement: number;
    riskAdjustedReturn: number;
    creditLimit: number;
    pricingImpact: number;
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
    defaultProbability: number;
    expectedLoss: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'approve' | 'reject' | 'modify';
    keyRisks: string[];
    keyMitigations: string[];
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
