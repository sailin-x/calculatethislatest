export interface VentureCapitalCalculatorInputs {
  // Venture Capital Information
  vcInfo: {
    vcName: string;
    vcType: 'early_stage' | 'growth_stage' | 'late_stage' | 'seed' | 'series_a' | 'series_b' | 'series_c' | 'series_d' | 'mezzanine' | 'pre_ipo' | 'other';
    fundSize: number;
    fundNumber: number;
    vintageYear: number;
    investmentPeriod: number; // in years
    fundLife: number; // in years
    managementFee: number;
    carriedInterest: number;
    vcDescription: string;
  };
  
  // Portfolio Company Information
  portfolioCompanyInfo: {
    // Company Details
    companyDetails: {
      companyName: string;
      industry: string;
      sector: string;
      stage: 'idea' | 'seed' | 'early' | 'growth' | 'expansion' | 'mature' | 'exit_ready';
      foundingYear: number;
      employeeCount: number;
      revenue: number;
      burnRate: number;
      runway: number; // in months
      companyDescription: string;
    };
    
    // Investment Details
    investmentDetails: {
      investmentAmount: number;
      ownershipPercentage: number;
      valuation: number;
      investmentDate: string;
      investmentRound: string;
      leadInvestor: boolean;
      boardSeat: boolean;
      antiDilution: boolean;
      liquidationPreference: number;
      participationRights: boolean;
    };
    
    // Financial Projections
    financialProjections: {
      year: number;
      revenue: number;
      expenses: number;
      ebitda: number;
      cashFlow: number;
      burnRate: number;
      runway: number;
      growthRate: number;
    }[];
    
    // Exit Scenarios
    exitScenarios: {
      scenario: string;
      probability: number;
      exitValue: number;
      exitMultiple: number;
      exitYear: number;
      exitType: 'ipo' | 'acquisition' | 'merger' | 'secondary_sale' | 'liquidation';
    }[];
  };
  
  // Market Information
  marketInfo: {
    // Market Size
    marketSize: {
      totalAddressableMarket: number;
      serviceableAddressableMarket: number;
      serviceableObtainableMarket: number;
      marketGrowthRate: number;
      marketMaturity: 'nascent' | 'growing' | 'mature' | 'declining';
    };
    
    // Competitive Landscape
    competitiveLandscape: {
      competitors: {
        competitor: string;
        marketShare: number;
        funding: number;
        strengths: string[];
        weaknesses: string[];
      }[];
      competitiveAdvantage: string[];
      barriersToEntry: string[];
      competitiveIntensity: 'low' | 'medium' | 'high';
    };
    
    // Industry Trends
    industryTrends: {
      trend: string;
      impact: 'positive' | 'negative' | 'neutral';
      probability: number;
      timeframe: string;
      description: string;
    }[];
    
    // Regulatory Environment
    regulatoryEnvironment: {
      regulatoryRisk: number;
      complianceCosts: number;
      regulatoryChanges: string[];
      regulatoryTrend: 'favorable' | 'neutral' | 'unfavorable';
    };
  };
  
  // Financial Metrics
  financialMetrics: {
    // Revenue Metrics
    revenueMetrics: {
      currentRevenue: number;
      projectedRevenue: number;
      revenueGrowth: number;
      recurringRevenue: number;
      customerAcquisitionCost: number;
      lifetimeValue: number;
      paybackPeriod: number;
    };
    
    // Unit Economics
    unitEconomics: {
      grossMargin: number;
      contributionMargin: number;
      unitCost: number;
      unitRevenue: number;
      breakEvenPoint: number;
      scaleEfficiency: number;
    };
    
    // Cash Flow Metrics
    cashFlowMetrics: {
      operatingCashFlow: number;
      investingCashFlow: number;
      financingCashFlow: number;
      freeCashFlow: number;
      cashBurn: number;
      cashRunway: number;
    };
    
    // Valuation Metrics
    valuationMetrics: {
      revenueMultiple: number;
      ebitdaMultiple: number;
      bookValue: number;
      tangibleBookValue: number;
      discountedCashFlow: number;
      comparableValuation: number;
    };
  };
  
  // Risk Assessment
  riskAssessment: {
    // Business Risk
    businessRisk: {
      executionRisk: number;
      marketRisk: number;
      competitiveRisk: number;
      technologyRisk: number;
      operationalRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      liquidityRisk: number;
      fundingRisk: number;
      valuationRisk: number;
      dilutionRisk: number;
      exitRisk: number;
    };
    
    // Team Risk
    teamRisk: {
      managementRisk: number;
      keyPersonRisk: number;
      hiringRisk: number;
      retentionRisk: number;
      successionRisk: number;
    };
    
    // Market Risk
    marketRisk: {
      demandRisk: number;
      supplyRisk: number;
      pricingRisk: number;
      regulatoryRisk: number;
      economicRisk: number;
    };
  };
  
  // Exit Strategy
  exitStrategy: {
    // Exit Options
    exitOptions: {
      option: string;
      probability: number;
      timeline: number; // in years
      valuation: number;
      multiple: number;
      description: string;
    }[];
    
    // IPO Analysis
    ipoAnalysis: {
      ipoReadiness: number;
      ipoTimeline: number;
      ipoValuation: number;
      ipoCosts: number;
      ipoProbability: number;
      ipoRequirements: string[];
    };
    
    // Acquisition Analysis
    acquisitionAnalysis: {
      potentialAcquirers: {
        acquirer: string;
        probability: number;
        valuation: number;
        strategicFit: number;
        synergies: string[];
      }[];
      acquisitionProbability: number;
      acquisitionTimeline: number;
      acquisitionValuation: number;
    };
    
    // Secondary Sale Analysis
    secondarySaleAnalysis: {
      secondaryMarket: 'active' | 'limited' | 'none';
      secondaryValuation: number;
      secondaryDiscount: number;
      secondaryProbability: number;
      secondaryTimeline: number;
    };
  };
  
  // Fund Performance
  fundPerformance: {
    // Fund Metrics
    fundMetrics: {
      totalInvested: number;
      totalValue: number;
      unrealizedValue: number;
      realizedValue: number;
      irr: number;
      tvpi: number;
      dpi: number;
      rvpi: number;
    };
    
    // Portfolio Metrics
    portfolioMetrics: {
      portfolioCompanies: number;
      activeInvestments: number;
      exitedInvestments: number;
      writeOffs: number;
      averageHoldingPeriod: number;
      portfolioDiversification: number;
    };
    
    // Performance Benchmarks
    performanceBenchmarks: {
      benchmark: string;
      fundPerformance: number;
      benchmarkPerformance: number;
      outperformance: number;
      percentile: number;
    }[];
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
    
    // Venture Capital Market
    vcMarket: {
      totalVcFunding: number;
      dealCount: number;
      averageDealSize: number;
      exitActivity: number;
      marketSentiment: 'bullish' | 'neutral' | 'bearish';
    };
    
    // Exit Market
    exitMarket: {
      ipoActivity: number;
      acquisitionActivity: number;
      exitValuations: number;
      exitMultiples: number;
      marketLiquidity: 'high' | 'medium' | 'low';
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Business Scenarios
    businessScenarios: {
      scenarioName: string;
      probability: number;
      revenueGrowth: number;
      marketShare: number;
      profitability: number;
      fundingNeeds: number;
      description: string;
    }[];
    
    // Exit Scenarios
    exitScenarios: {
      scenarioName: string;
      probability: number;
      exitValue: number;
      exitMultiple: number;
      exitYear: number;
      exitType: string;
      description: string;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenarioName: string;
      probability: number;
      marketGrowth: number;
      competitiveIntensity: number;
      regulatoryEnvironment: string;
      economicConditions: string;
      description: string;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRevenueVolatility: boolean;
  includeExitVolatility: boolean;
  includeMarketVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  terminalValue: number;
  includeTransactionCosts: boolean;
  includeTaxes: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeValuationAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeExitAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    investment: number;
    valuation: number;
    revenue: number;
    funding: number;
    exitValue: number;
    return: number;
  }[];
  
  // Reporting Preferences
  includeValuationAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeExitAnalysis: boolean;
  includeFundAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface VentureCapitalCalculatorResults {
  // Core VC Metrics
  investmentAmount: number;
  currentValuation: number;
  ownershipPercentage: number;
  irr: number;
  tvpi: number;
  exitValue: number;
  
  // VC Analysis
  vcAnalysis: {
    investmentAmount: number;
    currentValuation: number;
    ownershipPercentage: number;
    irr: number;
    tvpi: number;
    exitValue: number;
    vcBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    vcEfficiency: number;
  };
  
  // Valuation Analysis
  valuationAnalysis: {
    preMoneyValuation: number;
    postMoneyValuation: number;
    currentValuation: number;
    valuationMultiple: number;
    valuationMethod: string;
    valuationComponents: {
      component: string;
      value: number;
      percentage: number;
    }[];
    valuationEfficiency: number;
  };
  
  // Return Analysis
  returnAnalysis: {
    internalRateOfReturn: number;
    totalValueToPaidIn: number;
    distributedToPaidIn: number;
    residualValueToPaidIn: number;
    netPresentValue: number;
    paybackPeriod: number;
    returnBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    returnEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    businessRisk: {
      executionRisk: number;
      marketRisk: number;
      competitiveRisk: number;
      technologyRisk: number;
      operationalRisk: number;
      riskContribution: number;
    };
    financialRisk: {
      liquidityRisk: number;
      fundingRisk: number;
      valuationRisk: number;
      dilutionRisk: number;
      exitRisk: number;
      riskContribution: number;
    };
    teamRisk: {
      managementRisk: number;
      keyPersonRisk: number;
      hiringRisk: number;
      retentionRisk: number;
      successionRisk: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Exit Analysis
  exitAnalysis: {
    exitProbability: number;
    expectedExitValue: number;
    expectedExitMultiple: number;
    expectedExitYear: number;
    exitOptions: {
      option: string;
      probability: number;
      value: number;
      timeline: number;
    }[];
    exitBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    exitEfficiency: number;
  };
  
  // Fund Analysis
  fundAnalysis: {
    fundSize: number;
    totalInvested: number;
    totalValue: number;
    unrealizedValue: number;
    realizedValue: number;
    fundIrr: number;
    fundTvpi: number;
    fundDpi: number;
    fundRvpi: number;
    fundBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    fundEfficiency: number;
  };
  
  // Market Analysis
  marketAnalysis: {
    marketSize: number;
    marketGrowth: number;
    marketShare: number;
    competitivePosition: number;
    marketBreakdown: {
      factor: string;
      impact: number;
      opportunity: number;
    }[];
    marketScore: number;
  };
  
  // Financial Analysis
  financialAnalysis: {
    // Revenue Analysis
    revenueAnalysis: {
      currentRevenue: number;
      projectedRevenue: number;
      revenueGrowth: number;
      unitEconomics: {
        grossMargin: number;
        contributionMargin: number;
        customerAcquisitionCost: number;
        lifetimeValue: number;
      };
      revenueBreakdown: {
        component: string;
        value: number;
        contribution: number;
      }[];
      revenueEfficiency: number;
    };
    
    // Cash Flow Analysis
    cashFlowAnalysis: {
      operatingCashFlow: number;
      freeCashFlow: number;
      cashBurn: number;
      cashRunway: number;
      fundingNeeds: number;
      cashFlowBreakdown: {
        component: string;
        value: number;
        contribution: number;
      }[];
      cashFlowEfficiency: number;
    };
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowValuation: number;
    highValuation: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    valuation: number;
    exitValue: number;
    irr: number;
    tvpi: number;
    riskLevel: string;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      valuation: number;
      irr: number;
      tvpi: number;
      exitValue: number;
      outperformance: number;
    }[];
    industryComparison: {
      metric: string;
      company: number;
      industry: number;
      difference: number;
    }[];
  };
  
  // VC Score
  vcScore: {
    overallScore: number;
    componentScores: {
      valuation: number;
      returns: number;
      risk: number;
      exit: number;
      market: number;
    };
    recommendation: 'invest' | 'hold' | 'exit' | 'review';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanValuation: number;
    medianValuation: number;
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
      valuation: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalValuation: number;
    historicalReturns: number;
    historicalExits: number;
    historicalTrends: string[];
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
    returnImprovement: number;
    riskReduction: number;
    competitiveAdvantage: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    vcAssessment: string;
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
    investmentAmount: number;
    currentValuation: number;
    irr: number;
    recommendation: 'invest' | 'hold' | 'exit' | 'review';
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
