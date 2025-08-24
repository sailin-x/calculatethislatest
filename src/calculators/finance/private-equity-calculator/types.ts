export interface PrivateEquityCalculatorInputs {
  // Private Equity Information
  peInfo: {
    peName: string;
    peType: 'buyout' | 'growth' | 'venture' | 'mezzanine' | 'distressed' | 'real_estate' | 'infrastructure' | 'fund_of_funds' | 'secondary' | 'other';
    fundSize: number;
    fundNumber: number;
    vintageYear: number;
    investmentPeriod: number; // in years
    fundLife: number; // in years
    managementFee: number;
    carriedInterest: number;
    hurdleRate: number;
    peDescription: string;
  };
  
  // Portfolio Company Information
  portfolioCompanyInfo: {
    // Company Details
    companyDetails: {
      companyName: string;
      industry: string;
      sector: string;
      stage: 'startup' | 'growth' | 'mature' | 'turnaround' | 'distressed' | 'exit_ready';
      foundingYear: number;
      employeeCount: number;
      revenue: number;
      ebitda: number;
      netIncome: number;
      companyDescription: string;
    };
    
    // Investment Details
    investmentDetails: {
      investmentAmount: number;
      ownershipPercentage: number;
      valuation: number;
      investmentDate: string;
      investmentType: 'majority' | 'minority' | 'control' | 'influence' | 'passive';
      boardSeats: number;
      managementParticipation: boolean;
      coInvestment: boolean;
      syndicateSize: number;
    };
    
    // Financial Projections
    financialProjections: {
      year: number;
      revenue: number;
      ebitda: number;
      netIncome: number;
      freeCashFlow: number;
      debt: number;
      equity: number;
      growthRate: number;
    }[];
    
    // Exit Scenarios
    exitScenarios: {
      scenario: string;
      probability: number;
      exitValue: number;
      exitMultiple: number;
      exitYear: number;
      exitType: 'ipo' | 'strategic_sale' | 'financial_sale' | 'recapitalization' | 'liquidation';
    }[];
  };
  
  // Financial Information
  financialInfo: {
    // Income Statement
    incomeStatement: {
      revenue: number;
      costOfGoodsSold: number;
      grossProfit: number;
      operatingExpenses: number;
      ebitda: number;
      depreciation: number;
      amortization: number;
      ebit: number;
      interestExpense: number;
      ebt: number;
      taxes: number;
      netIncome: number;
    };
    
    // Balance Sheet
    balanceSheet: {
      totalAssets: number;
      currentAssets: number;
      fixedAssets: number;
      intangibleAssets: number;
      totalLiabilities: number;
      currentLiabilities: number;
      longTermDebt: number;
      shareholdersEquity: number;
      workingCapital: number;
      netDebt: number;
    };
    
    // Cash Flow Statement
    cashFlowStatement: {
      operatingCashFlow: number;
      investingCashFlow: number;
      financingCashFlow: number;
      netCashFlow: number;
      capitalExpenditures: number;
      acquisitions: number;
      dispositions: number;
      debtIssuance: number;
      debtRepayment: number;
      dividendPayments: number;
    };
    
    // Financial Ratios
    financialRatios: {
      debtToEquity: number;
      debtToEbitda: number;
      interestCoverage: number;
      currentRatio: number;
      quickRatio: number;
      returnOnEquity: number;
      returnOnAssets: number;
      returnOnInvestment: number;
      grossMargin: number;
      operatingMargin: number;
      netMargin: number;
    };
  };
  
  // Capital Structure
  capitalStructure: {
    // Equity Structure
    equityStructure: {
      commonEquity: number;
      preferredEquity: number;
      managementEquity: number;
      totalEquity: number;
      equityPercentage: number;
    };
    
    // Debt Structure
    debtStructure: {
      seniorDebt: number;
      mezzanineDebt: number;
      subordinatedDebt: number;
      totalDebt: number;
      debtPercentage: number;
      averageInterestRate: number;
      averageMaturity: number;
    };
    
    // Capital Structure Summary
    capitalStructureSummary: {
      totalCapital: number;
      equityWeight: number;
      debtWeight: number;
      targetCapitalStructure: {
        equity: number;
        debt: number;
      };
    };
  };
  
  // Operational Metrics
  operationalMetrics: {
    // Operational Performance
    operationalPerformance: {
      revenueGrowth: number;
      ebitdaGrowth: number;
      marginExpansion: number;
      costReduction: number;
      efficiencyImprovement: number;
      marketShare: number;
      customerRetention: number;
      employeeProductivity: number;
    };
    
    // Key Performance Indicators
    keyPerformanceIndicators: {
      kpi: string;
      currentValue: number;
      targetValue: number;
      performance: number;
      trend: 'improving' | 'stable' | 'declining';
    }[];
    
    // Operational Improvements
    operationalImprovements: {
      improvement: string;
      impact: number;
      implementationCost: number;
      timeline: number;
      probability: number;
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
        revenue: number;
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
  
  // Valuation Parameters
  valuationParameters: {
    // DCF Analysis
    dcfAnalysis: {
      freeCashFlow: number;
      growthRate: number;
      terminalGrowthRate: number;
      discountRate: number;
      terminalValue: number;
      presentValue: number;
    };
    
    // Comparable Analysis
    comparableAnalysis: {
      comparableCompanies: {
        company: string;
        evToEbitda: number;
        priceToEarnings: number;
        priceToBook: number;
        revenueMultiple: number;
      }[];
      averageMultiples: {
        evToEbitda: number;
        priceToEarnings: number;
        priceToBook: number;
        revenueMultiple: number;
      };
    };
    
    // Precedent Transactions
    precedentTransactions: {
      transaction: string;
      date: string;
      evToEbitda: number;
      priceToEarnings: number;
      priceToBook: number;
      revenueMultiple: number;
    }[];
    
    // Asset-Based Valuation
    assetBasedValuation: {
      bookValue: number;
      tangibleBookValue: number;
      replacementValue: number;
      liquidationValue: number;
      adjustedBookValue: number;
    };
  };
  
  // Risk Assessment
  riskAssessment: {
    // Business Risk
    businessRisk: {
      executionRisk: number;
      marketRisk: number;
      competitiveRisk: number;
      operationalRisk: number;
      technologyRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      leverageRisk: number;
      liquidityRisk: number;
      refinancingRisk: number;
      interestRateRisk: number;
      currencyRisk: number;
    };
    
    // Management Risk
    managementRisk: {
      managementQuality: number;
      keyPersonRisk: number;
      successionRisk: number;
      alignmentRisk: number;
      executionRisk: number;
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
    
    // Strategic Sale Analysis
    strategicSaleAnalysis: {
      potentialBuyers: {
        buyer: string;
        probability: number;
        valuation: number;
        strategicFit: number;
        synergies: string[];
      }[];
      saleProbability: number;
      saleTimeline: number;
      saleValuation: number;
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
    
    // Private Equity Market
    peMarket: {
      totalPeFunding: number;
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
      ebitdaGrowth: number;
      marginExpansion: number;
      marketShare: number;
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
  includeEbitdaVolatility: boolean;
  includeExitVolatility: boolean;
  
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
    ebitda: number;
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

export interface PrivateEquityCalculatorResults {
  // Core PE Metrics
  investmentAmount: number;
  currentValuation: number;
  ownershipPercentage: number;
  irr: number;
  tvpi: number;
  exitValue: number;
  
  // PE Analysis
  peAnalysis: {
    investmentAmount: number;
    currentValuation: number;
    ownershipPercentage: number;
    irr: number;
    tvpi: number;
    exitValue: number;
    peBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    peEfficiency: number;
  };
  
  // Valuation Analysis
  valuationAnalysis: {
    dcfValue: number;
    comparableValue: number;
    precedentValue: number;
    assetValue: number;
    weightedValue: number;
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
      operationalRisk: number;
      technologyRisk: number;
      riskContribution: number;
    };
    financialRisk: {
      leverageRisk: number;
      liquidityRisk: number;
      refinancingRisk: number;
      interestRateRisk: number;
      currencyRisk: number;
      riskContribution: number;
    };
    managementRisk: {
      managementQuality: number;
      keyPersonRisk: number;
      successionRisk: number;
      alignmentRisk: number;
      executionRisk: number;
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
      revenueBreakdown: {
        component: string;
        value: number;
        contribution: number;
      }[];
      revenueEfficiency: number;
    };
    
    // EBITDA Analysis
    ebitdaAnalysis: {
      currentEbitda: number;
      projectedEbitda: number;
      ebitdaGrowth: number;
      ebitdaMargin: number;
      ebitdaBreakdown: {
        component: string;
        value: number;
        contribution: number;
      }[];
      ebitdaEfficiency: number;
    };
    
    // Cash Flow Analysis
    cashFlowAnalysis: {
      operatingCashFlow: number;
      freeCashFlow: number;
      cashFlowGrowth: number;
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
  
  // PE Score
  peScore: {
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
    peAssessment: string;
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
