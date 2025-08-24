export interface WACCInputs {
  // Company Information
  companyInfo: {
    companyName: string;
    companyType: 'public' | 'private' | 'startup' | 'subsidiary' | 'joint_venture' | 'other';
    companyCategory: 'manufacturing' | 'retail' | 'service' | 'technology' | 'healthcare' | 'financial' | 'real_estate' | 'energy' | 'utilities' | 'other';
    companyStage: 'startup' | 'growth' | 'mature' | 'decline' | 'turnaround';
    industry: string;
    sector: string;
    companyDescription: string;
  };
  
  // Capital Structure
  capitalStructure: {
    // Equity Information
    equity: {
      commonStock: number;
      preferredStock: number;
      retainedEarnings: number;
      additionalPaidInCapital: number;
      treasuryStock: number;
      totalEquity: number;
      sharesOutstanding: number;
      marketPrice: number;
      marketValue: number;
    };
    
    // Debt Information
    debt: {
      shortTermDebt: number;
      longTermDebt: number;
      capitalLeases: number;
      operatingLeases: number;
      totalDebt: number;
      averageInterestRate: number;
      averageMaturity: number;
      marketValue: number;
    };
    
    // Hybrid Securities
    hybridSecurities: {
      convertibleBonds: number;
      convertiblePreferred: number;
      warrants: number;
      options: number;
      totalHybrid: number;
    };
    
    // Capital Structure Summary
    capitalStructureSummary: {
      totalCapital: number;
      equityWeight: number;
      debtWeight: number;
      hybridWeight: number;
      targetCapitalStructure: {
        equity: number;
        debt: number;
        hybrid: number;
      };
    };
  };
  
  // Cost of Equity
  costOfEquity: {
    // Risk-Free Rate
    riskFreeRate: {
      rate: number;
      source: 'treasury_bills' | 'treasury_notes' | 'treasury_bonds' | 'federal_funds' | 'libor' | 'custom';
      maturity: number;
      currency: string;
    };
    
    // Market Risk Premium
    marketRiskPremium: {
      premium: number;
      source: 'historical' | 'survey' | 'implied' | 'custom';
      timePeriod: number;
      market: string;
    };
    
    // Beta
    beta: {
      unleveredBeta: number;
      leveredBeta: number;
      industryBeta: number;
      fundamentalBeta: number;
      source: 'regression' | 'industry' | 'fundamental' | 'custom';
      confidenceInterval: {
        lower: number;
        upper: number;
      };
    };
    
    // Size Risk Premium
    sizeRiskPremium: {
      premium: number;
      sizeCategory: 'large' | 'mid' | 'small' | 'micro';
      marketCap: number;
      source: string;
    };
    
    // Country Risk Premium
    countryRiskPremium: {
      premium: number;
      country: string;
      sovereignRating: string;
      source: string;
    };
    
    // Company-Specific Risk Premium
    companySpecificRiskPremium: {
      premium: number;
      factors: {
        factor: string;
        premium: number;
        rationale: string;
      }[];
      totalPremium: number;
    };
    
    // Cost of Equity Calculation
    costOfEquityCalculation: {
      riskFreeRate: number;
      marketRiskPremium: number;
      beta: number;
      sizeRiskPremium: number;
      countryRiskPremium: number;
      companySpecificRiskPremium: number;
      totalCostOfEquity: number;
    };
  };
  
  // Cost of Debt
  costOfDebt: {
    // Current Debt
    currentDebt: {
      amount: number;
      interestRate: number;
      maturity: number;
      creditRating: string;
      marketValue: number;
    }[];
    
    // Marginal Cost of Debt
    marginalCostOfDebt: {
      rate: number;
      creditRating: string;
      spread: number;
      taxRate: number;
      afterTaxCost: number;
    };
    
    // Debt Ratings
    debtRatings: {
      rating: string;
      spread: number;
      probability: number;
      weightedSpread: number;
    }[];
    
    // Tax Considerations
    taxConsiderations: {
      effectiveTaxRate: number;
      marginalTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      taxShield: number;
    };
  };
  
  // Cost of Preferred Stock
  costOfPreferredStock: {
    // Preferred Stock Details
    preferredStock: {
      amount: number;
      dividendRate: number;
      marketPrice: number;
      parValue: number;
      callPrice: number;
      callDate: string;
    }[];
    
    // Cost Calculation
    costCalculation: {
      dividendRate: number;
      marketPrice: number;
      flotationCosts: number;
      costOfPreferred: number;
    };
  };
  
  // Market Data
  marketData: {
    // Market Information
    marketInfo: {
      marketIndex: string;
      marketReturn: number;
      marketVolatility: number;
      riskFreeRate: number;
      marketRiskPremium: number;
    };
    
    // Industry Data
    industryData: {
      industry: string;
      averageBeta: number;
      averageCostOfEquity: number;
      averageCostOfDebt: number;
      averageWACC: number;
    };
    
    // Peer Comparison
    peerComparison: {
      peer: string;
      beta: number;
      costOfEquity: number;
      costOfDebt: number;
      wacc: number;
      capitalStructure: {
        equity: number;
        debt: number;
      };
    }[];
  };
  
  // Financial Metrics
  financialMetrics: {
    // Profitability Metrics
    profitabilityMetrics: {
      returnOnEquity: number;
      returnOnAssets: number;
      returnOnCapital: number;
      operatingMargin: number;
      netMargin: number;
    };
    
    // Leverage Metrics
    leverageMetrics: {
      debtToEquity: number;
      debtToAssets: number;
      interestCoverage: number;
      debtServiceCoverage: number;
      timesInterestEarned: number;
    };
    
    // Liquidity Metrics
    liquidityMetrics: {
      currentRatio: number;
      quickRatio: number;
      cashRatio: number;
      workingCapital: number;
    };
  };
  
  // Risk Factors
  riskFactors: {
    // Business Risk
    businessRisk: {
      operationalRisk: number;
      competitiveRisk: number;
      technologyRisk: number;
      executionRisk: number;
      managementRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      liquidityRisk: number;
      leverageRisk: number;
      cashFlowRisk: number;
      creditRisk: number;
      interestRateRisk: number;
    };
    
    // Market Risk
    marketRisk: {
      demandRisk: number;
      supplyRisk: number;
      priceRisk: number;
      currencyRisk: number;
      economicRisk: number;
    };
    
    // Regulatory Risk
    regulatoryRisk: {
      complianceRisk: number;
      legalRisk: number;
      taxRisk: number;
      environmentalRisk: number;
      politicalRisk: number;
    };
  };
  
  // Economic Environment
  economicEnvironment: {
    // Economic Indicators
    economicIndicators: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      consumerConfidence: number;
    };
    
    // Market Conditions
    marketConditions: {
      bullMarket: boolean;
      bearMarket: boolean;
      volatilityRegime: 'low' | 'medium' | 'high';
      correlationRegime: 'low' | 'medium' | 'high';
    };
    
    // Monetary Policy
    monetaryPolicy: {
      federalFundsRate: number;
      quantitativeEasing: boolean;
      policyStance: 'accommodative' | 'neutral' | 'restrictive';
    };
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTaxes: boolean;
  includeFlotationCosts: boolean;
  includeMarketRisk: boolean;
  includeCompanySpecificRisk: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePreferredStock: boolean;
    includeHybridSecurities: boolean;
    includeOperatingLeases: boolean;
    includeSensitivityAnalysis: boolean;
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRateVolatility: boolean;
  includeBetaVolatility: boolean;
  includeMarketVolatility: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    costOfEquity: number;
    costOfDebt: number;
    wacc: number;
    capitalStructure: {
      equity: number;
      debt: number;
    };
  }[];
  
  // Reporting Preferences
  includeCapitalStructureAnalysis: boolean;
  includeCostOfEquityAnalysis: boolean;
  includeCostOfDebtAnalysis: boolean;
  includeWACCAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includePeerComparison: boolean;
  includeSensitivityAnalysis: boolean;
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

export interface WACCResults {
  // Core WACC Metrics
  weightedAverageCostOfCapital: number;
  costOfEquity: number;
  costOfDebt: number;
  costOfPreferredStock: number;
  effectiveTaxRate: number;
  
  // WACC Analysis
  waccAnalysis: {
    weightedAverageCostOfCapital: number;
    costOfEquity: number;
    costOfDebt: number;
    costOfPreferredStock: number;
    waccBreakdown: {
      component: string;
      cost: number;
      weight: number;
      contribution: number;
    }[];
    waccEfficiency: number;
  };
  
  // Capital Structure Analysis
  capitalStructureAnalysis: {
    totalCapital: number;
    equityWeight: number;
    debtWeight: number;
    preferredWeight: number;
    capitalStructureBreakdown: {
      component: string;
      amount: number;
      weight: number;
      marketValue: number;
    }[];
    capitalStructureEfficiency: number;
  };
  
  // Cost of Equity Analysis
  costOfEquityAnalysis: {
    costOfEquity: number;
    riskFreeRate: number;
    marketRiskPremium: number;
    beta: number;
    sizeRiskPremium: number;
    countryRiskPremium: number;
    companySpecificRiskPremium: number;
    equityBreakdown: {
      component: string;
      rate: number;
      contribution: number;
    }[];
    equityEfficiency: number;
  };
  
  // Cost of Debt Analysis
  costOfDebtAnalysis: {
    costOfDebt: number;
    beforeTaxCost: number;
    afterTaxCost: number;
    effectiveTaxRate: number;
    taxShield: number;
    debtBreakdown: {
      component: string;
      rate: number;
      amount: number;
      contribution: number;
    }[];
    debtEfficiency: number;
  };
  
  // Cost of Preferred Stock Analysis
  costOfPreferredStockAnalysis: {
    costOfPreferred: number;
    dividendRate: number;
    marketPrice: number;
    flotationCosts: number;
    preferredBreakdown: {
      component: string;
      rate: number;
      contribution: number;
    }[];
    preferredEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskAdjustedWACC: number;
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
    lowWACC: number;
    highWACC: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    wacc: number;
    costOfEquity: number;
    costOfDebt: number;
    riskLevel: string;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      wacc: number;
      costOfEquity: number;
      costOfDebt: number;
      capitalStructure: {
        equity: number;
        debt: number;
      };
      outperformance: number;
    }[];
    industryComparison: {
      metric: string;
      company: number;
      industry: number;
      difference: number;
    }[];
  };
  
  // Market Analysis
  marketAnalysis: {
    marketPosition: number;
    competitiveAdvantage: number;
    marketBreakdown: {
      factor: string;
      impact: number;
      opportunity: number;
    }[];
    marketScore: number;
  };
  
  // Financial Analysis
  financialAnalysis: {
    // Profitability Analysis
    profitabilityAnalysis: {
      returnOnEquity: number;
      returnOnAssets: number;
      returnOnCapital: number;
      profitabilityBreakdown: {
        metric: string;
        value: number;
        industry: number;
        performance: string;
      }[];
      profitabilityScore: number;
    };
    
    // Leverage Analysis
    leverageAnalysis: {
      debtToEquity: number;
      debtToAssets: number;
      interestCoverage: number;
      leverageBreakdown: {
        metric: string;
        value: number;
        industry: number;
        performance: string;
      }[];
      leverageScore: number;
    };
  };
  
  // Company Score
  companyScore: {
    overallScore: number;
    componentScores: {
      wacc: number;
      capitalStructure: number;
      costOfEquity: number;
      costOfDebt: number;
      risk: number;
      financial: number;
    };
    recommendation: 'optimize' | 'maintain' | 'restructure' | 'review';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanWACC: number;
    medianWACC: number;
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
      wacc: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalWACC: number;
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
    costReduction: number;
    valueCreation: number;
    riskReduction: number;
    competitiveAdvantage: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    companyAssessment: string;
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
    weightedAverageCostOfCapital: number;
    costOfEquity: number;
    costOfDebt: number;
    recommendation: 'optimize' | 'maintain' | 'restructure' | 'review';
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
