export interface MergerAcquisitionInputs {
  // Transaction Information
  transactionName: string;
  transactionType: 'merger' | 'acquisition' | 'asset_purchase' | 'stock_purchase' | 'reverse_merger' | 'leveraged_buyout' | 'management_buyout' | 'hostile_takeover' | 'friendly_takeover' | 'joint_venture' | 'strategic_alliance';
  dealStructure: 'cash' | 'stock' | 'mixed' | 'earnout' | 'contingent_value_rights';
  announcementDate: string;
  expectedClosingDate: string;
  dealStatus: 'announced' | 'pending' | 'completed' | 'terminated' | 'withdrawn';
  
  // Target Company Information
  targetCompany: {
    name: string;
    ticker: string;
    industry: string;
    sector: string;
    marketCap: number;
    enterpriseValue: number;
    sharesOutstanding: number;
    currentPrice: number;
    bookValue: number;
    tangibleBookValue: number;
  };
  
  // Acquirer Company Information
  acquirerCompany: {
    name: string;
    ticker: string;
    industry: string;
    sector: string;
    marketCap: number;
    enterpriseValue: number;
    sharesOutstanding: number;
    currentPrice: number;
    bookValue: number;
    tangibleBookValue: number;
  };
  
  // Financial Metrics - Target
  targetFinancials: {
    revenue: number;
    ebitda: number;
    ebitdaMargin: number;
    netIncome: number;
    netMargin: number;
    freeCashFlow: number;
    fcfMargin: number;
    totalAssets: number;
    totalLiabilities: number;
    shareholdersEquity: number;
    netDebt: number;
    workingCapital: number;
  };
  
  // Financial Metrics - Acquirer
  acquirerFinancials: {
    revenue: number;
    ebitda: number;
    ebitdaMargin: number;
    netIncome: number;
    netMargin: number;
    freeCashFlow: number;
    fcfMargin: number;
    totalAssets: number;
    totalLiabilities: number;
    shareholdersEquity: number;
    netDebt: number;
    workingCapital: number;
  };
  
  // Deal Terms
  dealTerms: {
    purchasePrice: number;
    equityValue: number;
    enterpriseValue: number;
    premium: number; // percentage
    exchangeRatio: number;
    cashConsideration: number;
    stockConsideration: number;
    earnout: number;
    escrow: number;
    workingCapitalAdjustment: boolean;
    netDebtAdjustment: boolean;
  };
  
  // Valuation Metrics
  valuationMetrics: {
    priceToEarnings: number;
    priceToBook: number;
    priceToSales: number;
    evToEbitda: number;
    evToRevenue: number;
    evToFcf: number;
    priceToEarningsTarget: number;
    priceToBookTarget: number;
    priceToSalesTarget: number;
    evToEbitdaTarget: number;
    evToRevenueTarget: number;
    evToFcfTarget: number;
  };
  
  // Synergies
  synergies: {
    revenueSynergies: number;
    costSynergies: number;
    totalSynergies: number;
    synergyTimeline: number; // years
    synergyCapture: number; // percentage
    revenueSynergyDetails: {
      category: string;
      amount: number;
      probability: number;
      timeline: number;
    }[];
    costSynergyDetails: {
      category: string;
      amount: number;
      probability: number;
      timeline: number;
    }[];
  };
  
  // Financing
  financing: {
    cashOnHand: number;
    debtFinancing: number;
    equityFinancing: number;
    bridgeLoan: number;
    totalFinancing: number;
    interestRate: number;
    debtMaturity: number;
    debtTerms: {
      type: string;
      amount: number;
      interestRate: number;
      maturity: number;
      covenants: string[];
    }[];
  };
  
  // Integration Plan
  integrationPlan: {
    integrationCosts: number;
    integrationTimeline: number; // months
    integrationRisks: string[];
    integrationBenefits: string[];
    keyMilestones: {
      milestone: string;
      timeline: number;
      status: 'planned' | 'in_progress' | 'completed' | 'delayed';
    }[];
  };
  
  // Regulatory Considerations
  regulatoryConsiderations: {
    antitrustReview: boolean;
    regulatoryApprovals: string[];
    regulatoryRisks: string[];
    approvalTimeline: number; // months
    probabilityOfApproval: number;
    regulatoryConditions: string[];
  };
  
  // Due Diligence
  dueDiligence: {
    financial: boolean;
    legal: boolean;
    operational: boolean;
    tax: boolean;
    environmental: boolean;
    technology: boolean;
    humanResources: boolean;
    intellectualProperty: boolean;
    findings: {
      category: string;
      finding: string;
      impact: 'low' | 'medium' | 'high';
      mitigation: string;
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
  
  // Comparable Transactions
  comparableTransactions: {
    target: string;
    acquirer: string;
    dealValue: number;
    multiple: number;
    premium: number;
    date: string;
    industry: string;
  }[];
  
  // Comparable Companies
  comparableCompanies: {
    company: string;
    ticker: string;
    industry: string;
    marketCap: number;
    enterpriseValue: number;
    revenue: number;
    ebitda: number;
    multiple: number;
  }[];
  
  // Market Conditions
  marketConditions: {
    mandaActivity: number;
    marketValuations: number;
    financingAvailability: string;
    interestRates: number;
    economicOutlook: string;
    industryTrends: string[];
  };
  
  // Strategic Rationale
  strategicRationale: {
    horizontalIntegration: boolean;
    verticalIntegration: boolean;
    marketExpansion: boolean;
    technologyAcquisition: boolean;
    talentAcquisition: boolean;
    costReduction: boolean;
    revenueGrowth: boolean;
    diversification: boolean;
    rationale: string[];
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    purchasePrice: number;
    synergies: number;
    integrationCosts: number;
    closingDate: string;
    regulatoryApproval: boolean;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRegulatoryRisk: boolean;
  includeSynergyRisk: boolean;
  includeIntegrationRisk: boolean;
  
  // Historical Analysis
  historicalData: {
    date: string;
    targetPrice: number;
    acquirerPrice: number;
    dealValue: number;
    premium: number;
    marketReaction: number;
  }[];
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  terminalGrowthRate: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  includeSynergies: boolean;
  
  // Reporting Preferences
  includeValuationAnalysis: boolean;
  includeSynergyAnalysis: boolean;
  includeFinancingAnalysis: boolean;
  includeIntegrationAnalysis: boolean;
  includeRegulatoryAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeComparableAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface MergerAcquisitionResults {
  // Core Transaction Metrics
  transactionValue: number;
  equityValue: number;
  enterpriseValue: number;
  premium: number;
  exchangeRatio: number;
  dealMultiple: number;
  
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
      synergies: number;
      freeCashFlow: number;
      presentValue: number;
    }[];
  };
  
  // Comparable Analysis
  comparableAnalysis: {
    comparableCompanies: {
      company: string;
      ticker: string;
      multiple: number;
      impliedValue: number;
    }[];
    comparableTransactions: {
      target: string;
      multiple: number;
      premium: number;
      impliedValue: number;
    }[];
    averageMultiple: number;
    medianMultiple: number;
    impliedValuation: number;
  };
  
  // Synergy Analysis
  synergyAnalysis: {
    revenueSynergies: number;
    costSynergies: number;
    totalSynergies: number;
    synergyTimeline: number;
    synergyCapture: number;
    synergyValue: number;
    synergyBreakdown: {
      category: string;
      amount: number;
      probability: number;
      value: number;
    }[];
  };
  
  // Financing Analysis
  financingAnalysis: {
    cashOnHand: number;
    debtFinancing: number;
    equityFinancing: number;
    totalFinancing: number;
    financingCost: number;
    debtCapacity: number;
    leverageRatio: number;
    interestCoverage: number;
    financingRisk: number;
  };
  
  // Integration Analysis
  integrationAnalysis: {
    integrationCosts: number;
    integrationTimeline: number;
    integrationRisks: string[];
    integrationBenefits: string[];
    integrationValue: number;
    integrationEfficiency: number;
  };
  
  // Accretion/Dilution Analysis
  accretionDilutionAnalysis: {
    epsAccretion: number;
    bookValueAccretion: number;
    roeImpact: number;
    roaImpact: number;
    leverageImpact: number;
    accretionBreakdown: {
      metric: string;
      standalone: number;
      combined: number;
      change: number;
      percentage: number;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    regulatoryRisk: number;
    integrationRisk: number;
    financingRisk: number;
    synergyRisk: number;
    marketRisk: number;
    operationalRisk: number;
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
  
  // Financial Impact
  financialImpact: {
    revenueGrowth: number;
    ebitdaGrowth: number;
    marginExpansion: number;
    cashFlowGeneration: number;
    debtPaydown: number;
    valueCreation: number;
  };
  
  // Strategic Analysis
  strategicAnalysis: {
    marketPosition: number;
    competitiveAdvantage: number;
    marketShare: number;
    marketGrowth: number;
    strategicValue: number;
    strategicRisks: string[];
    strategicOpportunities: string[];
  };
  
  // Regulatory Analysis
  regulatoryAnalysis: {
    antitrustRisk: number;
    approvalProbability: number;
    approvalTimeline: number;
    regulatoryConditions: string[];
    complianceCost: number;
    regulatoryValue: number;
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
    tax: {
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
    transactionValue: number;
    synergies: number;
    integrationCosts: number;
    netValue: number;
    irr: number;
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
    dealTrends: string[];
    marketReaction: number;
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
    transactionValue: number;
    premium: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'proceed' | 'reconsider' | 'terminate';
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
