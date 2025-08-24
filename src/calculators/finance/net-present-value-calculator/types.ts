export interface NetPresentValueInputs {
  // Project Information
  projectInfo: {
    projectName: string;
    projectType: 'investment' | 'business_venture' | 'real_estate' | 'infrastructure' | 'technology' | 'acquisition' | 'expansion' | 'refinancing' | 'research_development' | 'marketing' | 'equipment' | 'other';
    projectCategory: 'capital_expenditure' | 'operating_expense' | 'strategic_investment' | 'maintenance' | 'replacement' | 'expansion' | 'new_venture' | 'other';
    projectStage: 'planning' | 'development' | 'implementation' | 'operation' | 'maintenance' | 'decommissioning';
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
    
    // Operating Cash Flows
    operatingCashFlows: {
      year: number;
      revenue: number;
      operatingExpenses: number;
      depreciation: number;
      amortization: number;
      taxes: number;
      netOperatingCashFlow: number;
    }[];
    
    // Capital Expenditures
    capitalExpenditures: {
      year: number;
      amount: number;
      type: 'equipment' | 'building' | 'technology' | 'infrastructure' | 'other';
      description: string;
    }[];
    
    // Working Capital
    workingCapital: {
      year: number;
      currentAssets: number;
      currentLiabilities: number;
      netWorkingCapital: number;
      workingCapitalChange: number;
    }[];
    
    // Financing Cash Flows
    financingCashFlows: {
      year: number;
      debtIssuance: number;
      debtRepayment: number;
      equityIssuance: number;
      dividendPayments: number;
      netFinancingCashFlow: number;
    }[];
    
    // Terminal Value
    terminalValue: {
      method: 'perpetuity' | 'exit_multiple' | 'salvage_value' | 'custom';
      value: number;
      growthRate: number;
      multiple: number;
      assumptions: {
        assumption: string;
        value: number;
        description: string;
      }[];
    };
    
    // Net Cash Flows
    netCashFlows: {
      year: number;
      operatingCashFlow: number;
      capitalExpenditure: number;
      workingCapitalChange: number;
      financingCashFlow: number;
      netCashFlow: number;
      cumulativeCashFlow: number;
    }[];
  };
  
  // Discount Rate
  discountRate: {
    // Cost of Capital Components
    costOfEquity: number;
    costOfDebt: number;
    taxRate: number;
    debtToEquityRatio: number;
    weightedAverageCostOfCapital: number;
    
    // Risk Adjustments
    riskFreeRate: number;
    marketRiskPremium: number;
    beta: number;
    countryRiskPremium: number;
    sizeRiskPremium: number;
    liquidityRiskPremium: number;
    
    // Project-Specific Risk
    projectRiskPremium: number;
    industryRiskPremium: number;
    technologyRiskPremium: number;
    regulatoryRiskPremium: number;
    
    // Final Discount Rate
    finalDiscountRate: number;
    discountRateBreakdown: {
      component: string;
      rate: number;
      percentage: number;
    }[];
  };
  
  // Financial Metrics
  financialMetrics: {
    // Revenue Projections
    revenueProjections: {
      year: number;
      revenue: number;
      growthRate: number;
      seasonality: number;
      marketShare: number;
    }[];
    
    // Cost Projections
    costProjections: {
      year: number;
      costOfGoodsSold: number;
      operatingExpenses: number;
      sellingExpenses: number;
      administrativeExpenses: number;
      researchDevelopment: number;
      totalCosts: number;
    }[];
    
    // Profitability Metrics
    profitabilityMetrics: {
      grossMargin: number;
      operatingMargin: number;
      netMargin: number;
      ebitda: number;
      ebitdaMargin: number;
      returnOnInvestment: number;
      returnOnEquity: number;
    };
    
    // Balance Sheet Metrics
    balanceSheetMetrics: {
      totalAssets: number;
      totalLiabilities: number;
      netWorth: number;
      debtToEquity: number;
      currentRatio: number;
      quickRatio: number;
      assetTurnover: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Risk Factors
    riskFactors: {
      marketRisk: number;
      operationalRisk: number;
      financialRisk: number;
      regulatoryRisk: number;
      technologyRisk: number;
      competitiveRisk: number;
      executionRisk: number;
    };
    
    // Risk Scenarios
    riskScenarios: {
      scenario: string;
      probability: number;
      cashFlowImpact: number;
      discountRateImpact: number;
      npvImpact: number;
    }[];
    
    // Sensitivity Analysis
    sensitivityAnalysis: {
      variable: string;
      baseValue: number;
      lowValue: number;
      highValue: number;
      npvImpact: number;
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
  
  // Inflation and Currency
  inflationAndCurrency: {
    // Inflation
    inflationRate: number;
    inflationProjection: {
      year: number;
      inflationRate: number;
    }[];
    realDiscountRate: number;
    nominalDiscountRate: number;
    
    // Currency
    baseCurrency: string;
    foreignCurrency: string;
    exchangeRate: number;
    exchangeRateProjection: {
      year: number;
      exchangeRate: number;
    }[];
    currencyRisk: number;
  };
  
  // Comparable Analysis
  comparableAnalysis: {
    // Peer Companies
    peerCompanies: {
      company: string;
      industry: string;
      size: number;
      npv: number;
      irr: number;
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
  reinvestmentRate: number;
  includeTaxes: boolean;
  includeInflation: boolean;
  includeRiskAdjustment: boolean;
  includeWorkingCapital: boolean;
  includeFinancing: boolean;
  
  // Calculation Method
  calculationMethod: 'traditional_npv' | 'adjusted_npv' | 'real_npv' | 'nominal_npv';
  terminalValueMethod: 'perpetuity' | 'exit_multiple' | 'salvage_value' | 'custom';
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeCashFlowVolatility: boolean;
  includeDiscountRateVolatility: boolean;
  includeTerminalValueVolatility: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    cashFlow: number;
    discountRate: number;
    npv: number;
    cumulativeNpv: number;
  }[];
  
  // Reporting Preferences
  includeCashFlowAnalysis: boolean;
  includeDiscountRateAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeSensitivityAnalysis: boolean;
  includeComparableAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeInflationAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includeTerminalValueAnalysis: boolean;
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

export interface NetPresentValueResults {
  // Core NPV Metrics
  netPresentValue: number;
  presentValueOfCashFlows: number;
  presentValueOfInvestment: number;
  profitabilityIndex: number;
  internalRateOfReturn: number;
  
  // NPV Analysis
  npvAnalysis: {
    netPresentValue: number;
    presentValueOfCashFlows: number;
    presentValueOfInvestment: number;
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
    totalCashFlows: number;
    netCashFlow: number;
    cashFlowBreakdown: {
      year: number;
      operatingCashFlow: number;
      capitalExpenditure: number;
      workingCapitalChange: number;
      financingCashFlow: number;
      netCashFlow: number;
      presentValue: number;
      cumulativeNpv: number;
    }[];
    cashFlowEfficiency: number;
  };
  
  // Discount Rate Analysis
  discountRateAnalysis: {
    weightedAverageCostOfCapital: number;
    costOfEquity: number;
    costOfDebt: number;
    riskAdjustments: {
      adjustment: string;
      rate: number;
      impact: number;
    }[];
    discountRateBreakdown: {
      component: string;
      rate: number;
      percentage: number;
    }[];
    discountRateEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskAdjustedNpv: number;
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
    lowNpv: number;
    highNpv: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    npv: number;
    irr: number;
    paybackPeriod: number;
    riskLevel: string;
  }[];
  
  // Comparable Analysis
  comparableAnalysis: {
    peerComparison: {
      peer: string;
      npv: number;
      irr: number;
      paybackPeriod: number;
      riskProfile: string;
    }[];
    industryBenchmark: number;
    marketPosition: number;
  };
  
  // Terminal Value Analysis
  terminalValueAnalysis: {
    terminalValue: number;
    terminalValueMethod: string;
    terminalValueMultiple: number;
    growthRate: number;
    terminalValueContribution: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    beforeTaxNpv: number;
    afterTaxNpv: number;
    taxEfficiency: number;
    taxBenefits: number;
    taxOptimization: number;
  };
  
  // Inflation Analysis
  inflationAnalysis: {
    nominalNpv: number;
    realNpv: number;
    inflationImpact: number;
    inflationEfficiency: number;
  };
  
  // Investment Score
  investmentScore: {
    overallScore: number;
    componentScores: {
      npv: number;
      irr: number;
      payback: number;
      risk: number;
      terminal: number;
      taxes: number;
      inflation: number;
    };
    recommendation: 'invest' | 'consider' | 'decline' | 'modify';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanNpv: number;
    medianNpv: number;
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
      npv: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalNpv: number;
    historicalIrr: number;
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
    valueCreation: number;
    riskReduction: number;
    returnEnhancement: number;
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
    netPresentValue: number;
    internalRateOfReturn: number;
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
