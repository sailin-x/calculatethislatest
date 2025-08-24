export interface InternalRateOfReturnInputs {
  // Project Information
  projectInfo: {
    projectName: string;
    projectType: 'investment' | 'business_venture' | 'real_estate' | 'private_equity' | 'venture_capital' | 'infrastructure' | 'research_development' | 'acquisition' | 'expansion' | 'refinancing' | 'other';
    projectCategory: 'equity' | 'debt' | 'real_assets' | 'infrastructure' | 'technology' | 'healthcare' | 'energy' | 'consumer' | 'financial' | 'industrial' | 'other';
    projectStage: 'seed' | 'early_stage' | 'growth' | 'mature' | 'turnaround' | 'distressed' | 'exit';
    projectDuration: number; // in years
    projectStartDate: string;
    projectEndDate: string;
    projectDescription: string;
  };
  
  // Cash Flows
  cashFlows: {
    // Initial Investment
    initialInvestment: {
      amount: number;
      date: string;
      type: 'equity' | 'debt' | 'hybrid' | 'other';
      currency: string;
    };
    
    // Additional Investments
    additionalInvestments: {
      date: string;
      amount: number;
      type: 'equity' | 'debt' | 'capital_call' | 'follow_on' | 'bridge' | 'other';
      description: string;
    }[];
    
    // Cash Inflows
    cashInflows: {
      date: string;
      amount: number;
      type: 'revenue' | 'dividend' | 'interest' | 'rental_income' | 'royalty' | 'sale_proceeds' | 'refinancing' | 'exit' | 'other';
      description: string;
    }[];
    
    // Cash Outflows
    cashOutflows: {
      date: string;
      amount: number;
      type: 'operating_expenses' | 'capital_expenditure' | 'debt_service' | 'taxes' | 'fees' | 'maintenance' | 'other';
      description: string;
    }[];
    
    // Net Cash Flows
    netCashFlows: {
      date: string;
      netFlow: number;
      cumulativeFlow: number;
    }[];
    
    // Total Flows
    totalInvestment: number;
    totalInflows: number;
    totalOutflows: number;
    netCashFlow: number;
  };
  
  // Financial Metrics
  financialMetrics: {
    // Revenue Projections
    revenueProjections: {
      year: number;
      revenue: number;
      growthRate: number;
      seasonality: number;
    }[];
    
    // Cost Projections
    costProjections: {
      year: number;
      operatingCosts: number;
      capitalCosts: number;
      financingCosts: number;
      totalCosts: number;
    }[];
    
    // Profitability Metrics
    profitabilityMetrics: {
      grossMargin: number;
      operatingMargin: number;
      netMargin: number;
      ebitda: number;
      ebitdaMargin: number;
      freeCashFlow: number;
      freeCashFlowYield: number;
    };
    
    // Balance Sheet Metrics
    balanceSheetMetrics: {
      totalAssets: number;
      totalLiabilities: number;
      netWorth: number;
      debtToEquity: number;
      currentRatio: number;
      quickRatio: number;
    };
  };
  
  // Exit Strategy
  exitStrategy: {
    exitType: 'ipo' | 'acquisition' | 'merger' | 'management_buyout' | 'secondary_sale' | 'liquidation' | 'refinancing' | 'dividend_recap' | 'other';
    exitTimeline: number; // in years
    exitValue: number;
    exitMultiple: number;
    exitAssumptions: {
      assumption: string;
      value: number;
      description: string;
    }[];
    exitProbability: number;
  };
  
  // Risk Factors
  riskFactors: {
    // Market Risk
    marketRisk: {
      marketVolatility: number;
      marketCorrelation: number;
      marketBeta: number;
      marketRiskPremium: number;
    };
    
    // Business Risk
    businessRisk: {
      operationalRisk: number;
      competitiveRisk: number;
      regulatoryRisk: number;
      technologyRisk: number;
      executionRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      liquidityRisk: number;
      leverageRisk: number;
      interestRateRisk: number;
      currencyRisk: number;
      creditRisk: number;
    };
    
    // Specific Risks
    specificRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    
    // Overall Risk Assessment
    overallRiskScore: number;
    riskCategory: 'low' | 'medium' | 'high' | 'very_high';
  };
  
  // Market Conditions
  marketConditions: {
    // Economic Environment
    economicEnvironment: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      consumerConfidence: number;
    };
    
    // Industry Conditions
    industryConditions: {
      industryGrowth: number;
      competitiveIntensity: number;
      regulatoryEnvironment: string;
      technologicalDisruption: number;
      marketMaturity: 'emerging' | 'growth' | 'mature' | 'declining';
    };
    
    // Market Valuation
    marketValuation: {
      peRatio: number;
      evEbitda: number;
      priceToBook: number;
      dividendYield: number;
      marketCap: number;
    };
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Tax Status
    taxStatus: 'taxable' | 'tax_deferred' | 'tax_free' | 'tax_advantaged';
    effectiveTaxRate: number;
    marginalTaxRate: number;
    stateTaxRate: number;
    localTaxRate: number;
    
    // Tax Benefits
    taxBenefits: {
      depreciation: number;
      amortization: number;
      interestDeduction: number;
      taxCredits: number;
      lossCarryforward: number;
      totalTaxBenefits: number;
    };
    
    // Tax Implications
    taxImplications: {
      afterTaxCashFlows: number;
      taxEfficiency: number;
      taxOptimization: number;
    };
  };
  
  // Financing Structure
  financingStructure: {
    // Capital Structure
    capitalStructure: {
      equity: number;
      debt: number;
      preferred: number;
      other: number;
      totalCapital: number;
    };
    
    // Debt Terms
    debtTerms: {
      principal: number;
      interestRate: number;
      maturity: number;
      paymentFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      amortization: 'bullet' | 'straight_line' | 'declining_balance' | 'custom';
    };
    
    // Equity Terms
    equityTerms: {
      shares: number;
      pricePerShare: number;
      votingRights: number;
      dividendPolicy: string;
      dilutionProtection: boolean;
    };
    
    // Cost of Capital
    costOfCapital: {
      costOfEquity: number;
      costOfDebt: number;
      weightedAverageCostOfCapital: number;
      hurdleRate: number;
    };
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    // Key Variables
    keyVariables: {
      variable: string;
      baseValue: number;
      lowValue: number;
      highValue: number;
      impact: number;
    }[];
    
    // Scenarios
    scenarios: {
      scenario: string;
      probability: number;
      assumptions: {
        variable: string;
        value: number;
      }[];
      irr: number;
      npv: number;
      paybackPeriod: number;
    }[];
  };
  
  // Comparable Analysis
  comparableAnalysis: {
    // Peer Companies
    peerCompanies: {
      company: string;
      industry: string;
      size: number;
      irr: number;
      npv: number;
      paybackPeriod: number;
      riskProfile: string;
    }[];
    
    // Industry Benchmarks
    industryBenchmarks: {
      metric: string;
      industry: string;
      average: number;
      median: number;
      percentile25: number;
      percentile75: number;
    }[];
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  inflationRate: number;
  reinvestmentRate: number;
  terminalValue: number;
  terminalValueMultiple: number;
  includeTaxes: boolean;
  includeInflation: boolean;
  includeRiskAdjustment: boolean;
  
  // Calculation Method
  calculationMethod: 'traditional_irr' | 'modified_irr' | 'financial_irr' | 'real_irr' | 'nominal_irr';
  iterationLimit: number;
  tolerance: number;
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeCashFlowVolatility: boolean;
  includeExitValueVolatility: boolean;
  includeTimelineVolatility: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    cashFlow: number;
    cumulativeFlow: number;
    irr: number;
    npv: number;
  }[];
  
  // Reporting Preferences
  includeCashFlowAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeSensitivityAnalysis: boolean;
  includeComparableAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeFinancingAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includeExitAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface InternalRateOfReturnResults {
  // Core IRR Metrics
  internalRateOfReturn: number;
  modifiedInternalRateOfReturn: number;
  netPresentValue: number;
  paybackPeriod: number;
  discountedPaybackPeriod: number;
  
  // IRR Analysis
  irrAnalysis: {
    internalRateOfReturn: number;
    modifiedInternalRateOfReturn: number;
    financialInternalRateOfReturn: number;
    realInternalRateOfReturn: number;
    nominalInternalRateOfReturn: number;
    irrBreakdown: {
      component: string;
      value: number;
      percentage: number;
    }[];
    irrEfficiency: number;
  };
  
  // NPV Analysis
  npvAnalysis: {
    netPresentValue: number;
    presentValueOfInflows: number;
    presentValueOfOutflows: number;
    npvBreakdown: {
      component: string;
      value: number;
      percentage: number;
    }[];
    npvEfficiency: number;
  };
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    totalInvestment: number;
    totalInflows: number;
    totalOutflows: number;
    netCashFlow: number;
    cashFlowBreakdown: {
      period: string;
      investment: number;
      inflows: number;
      outflows: number;
      netFlow: number;
      cumulativeFlow: number;
    }[];
    cashFlowEfficiency: number;
  };
  
  // Payback Analysis
  paybackAnalysis: {
    paybackPeriod: number;
    discountedPaybackPeriod: number;
    paybackBreakdown: {
      period: string;
      cumulativeFlow: number;
      discountedFlow: number;
      paybackStatus: 'not_recovered' | 'recovered';
    }[];
    paybackEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskAdjustedIrr: number;
    riskScore: number;
    riskBreakdown: {
      risk: string;
      level: number;
      impact: number;
    }[];
    riskMitigation: string[];
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowIrr: number;
    highIrr: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    irr: number;
    npv: number;
    paybackPeriod: number;
    riskLevel: string;
  }[];
  
  // Comparable Analysis
  comparableAnalysis: {
    peerComparison: {
      peer: string;
      irr: number;
      npv: number;
      paybackPeriod: number;
      riskProfile: string;
    }[];
    industryBenchmark: number;
    marketPosition: number;
  };
  
  // Exit Analysis
  exitAnalysis: {
    exitValue: number;
    exitMultiple: number;
    exitIrr: number;
    exitNpv: number;
    exitProbability: number;
    exitTimeline: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    beforeTaxIrr: number;
    afterTaxIrr: number;
    taxEfficiency: number;
    taxBenefits: number;
    taxOptimization: number;
  };
  
  // Financing Analysis
  financingAnalysis: {
    costOfCapital: number;
    hurdleRate: number;
    irrSpread: number;
    financingEfficiency: number;
    optimalCapitalStructure: {
      equity: number;
      debt: number;
      preferred: number;
    };
  };
  
  // Investment Score
  investmentScore: {
    overallScore: number;
    componentScores: {
      irr: number;
      npv: number;
      payback: number;
      risk: number;
      exit: number;
      taxes: number;
      financing: number;
    };
    recommendation: 'invest' | 'consider' | 'decline' | 'modify';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanIrr: number;
    medianIrr: number;
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
      irr: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalIrr: number;
    historicalNpv: number;
    historicalTrends: string[];
    historicalVolatility: number;
    yearOverYearChange: number;
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
    returnEnhancement: number;
    riskReduction: number;
    valueCreation: number;
    strategicAlignment: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    investmentAssessment: string;
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
    internalRateOfReturn: number;
    netPresentValue: number;
    paybackPeriod: number;
    recommendation: 'invest' | 'consider' | 'decline' | 'modify';
    keyStrengths: string[];
    keyWeaknesses: string[];
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
