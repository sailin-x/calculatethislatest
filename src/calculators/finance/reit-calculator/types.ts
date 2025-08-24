export interface REITCalculatorInputs {
  // REIT Information
  reitInfo: {
    reitName: string;
    tickerSymbol: string;
    reitType: 'equity' | 'mortgage' | 'hybrid' | 'public' | 'private' | 'exchange_traded' | 'non_traded';
    propertyType: 'office' | 'retail' | 'industrial' | 'residential' | 'healthcare' | 'hotel' | 'data_center' | 'self_storage' | 'timber' | 'infrastructure' | 'diversified' | 'other';
    marketCap: number;
    totalAssets: number;
    totalLiabilities: number;
    shareholdersEquity: number;
    reitDescription: string;
  };
  
  // Property Portfolio
  propertyPortfolio: {
    // Portfolio Overview
    portfolioOverview: {
      totalProperties: number;
      totalSquareFootage: number;
      totalUnits: number;
      occupancyRate: number;
      averageLeaseTerm: number;
      geographicDiversification: number;
      propertyTypeDiversification: number;
    };
    
    // Property Details
    propertyDetails: {
      propertyName: string;
      propertyType: string;
      location: string;
      squareFootage: number;
      units: number;
      occupancyRate: number;
      annualRent: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      propertyValue: number;
      acquisitionDate: string;
    }[];
    
    // Geographic Distribution
    geographicDistribution: {
      region: string;
      properties: number;
      squareFootage: number;
      annualRent: number;
      percentage: number;
    }[];
    
    // Property Type Distribution
    propertyTypeDistribution: {
      propertyType: string;
      properties: number;
      squareFootage: number;
      annualRent: number;
      percentage: number;
    }[];
  };
  
  // Financial Information
  financialInfo: {
    // Income Statement
    incomeStatement: {
      totalRevenue: number;
      rentalRevenue: number;
      otherRevenue: number;
      operatingExpenses: number;
      propertyManagementFees: number;
      generalAndAdministrative: number;
      depreciationAndAmortization: number;
      interestExpense: number;
      netIncome: number;
      fundsFromOperations: number;
      adjustedFundsFromOperations: number;
    };
    
    // Balance Sheet
    balanceSheet: {
      totalAssets: number;
      realEstateAssets: number;
      cashAndEquivalents: number;
      accountsReceivable: number;
      otherAssets: number;
      totalLiabilities: number;
      totalDebt: number;
      accountsPayable: number;
      otherLiabilities: number;
      shareholdersEquity: number;
      commonStock: number;
      retainedEarnings: number;
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
      debtToAssets: number;
      interestCoverage: number;
      debtServiceCoverage: number;
      fixedChargeCoverage: number;
      currentRatio: number;
      quickRatio: number;
      returnOnEquity: number;
      returnOnAssets: number;
      returnOnInvestment: number;
    };
  };
  
  // Dividend Information
  dividendInfo: {
    // Current Dividend
    currentDividend: {
      annualDividend: number;
      quarterlyDividend: number;
      monthlyDividend: number;
      dividendPerShare: number;
      dividendYield: number;
      payoutRatio: number;
      exDividendDate: string;
      paymentDate: string;
      declarationDate: string;
    };
    
    // Historical Dividends
    historicalDividends: {
      year: number;
      dividend: number;
      growthRate: number;
      payoutRatio: number;
      fundsFromOperations: number;
      adjustedFundsFromOperations: number;
    }[];
    
    // Dividend Growth
    dividendGrowth: {
      historicalGrowthRate: number;
      expectedGrowthRate: number;
      sustainableGrowthRate: number;
      growthPhase: 'high_growth' | 'stable_growth' | 'mature_growth' | 'declining_growth';
      growthPeriod: number; // in years
    };
    
    // Dividend Coverage
    dividendCoverage: {
      ffoCoverage: number;
      affoCoverage: number;
      cashFlowCoverage: number;
      earningsCoverage: number;
      coverageTrend: 'improving' | 'stable' | 'declining';
    };
  };
  
  // Valuation Parameters
  valuationParameters: {
    // FFO/AFFO Analysis
    ffoAffoAnalysis: {
      fundsFromOperations: number;
      adjustedFundsFromOperations: number;
      ffoPerShare: number;
      affoPerShare: number;
      ffoGrowth: number;
      affoGrowth: number;
      ffoQuality: 'high' | 'medium' | 'low';
    };
    
    // NAV Analysis
    navAnalysis: {
      netAssetValue: number;
      navPerShare: number;
      priceToNav: number;
      navGrowth: number;
      assetAppreciation: number;
      navComponents: {
        component: string;
        value: number;
        percentage: number;
      }[];
    };
    
    // Cap Rate Analysis
    capRateAnalysis: {
      marketCapRate: number;
      impliedCapRate: number;
      capRateSpread: number;
      capRateTrend: 'increasing' | 'stable' | 'decreasing';
      capRateComparison: {
        peer: string;
        capRate: number;
        difference: number;
      }[];
    };
    
    // Multiple Analysis
    multipleAnalysis: {
      priceToFFO: number;
      priceToAFFO: number;
      priceToBook: number;
      priceToSales: number;
      evToEbitda: number;
      multipleComparison: {
        peer: string;
        multiple: number;
        difference: number;
      }[];
    };
  };
  
  // Market Data
  marketData: {
    // Current Market Information
    currentMarketInfo: {
      currentPrice: number;
      marketCap: number;
      enterpriseValue: number;
      sharesOutstanding: number;
      volume: number;
      beta: number;
      dividendYield: number;
    };
    
    // Industry Data
    industryData: {
      industry: string;
      averageDividendYield: number;
      averageFFO: number;
      averageCapRate: number;
      averageMultiple: number;
    };
    
    // Peer Comparison
    peerComparison: {
      peer: string;
      dividendYield: number;
      ffoGrowth: number;
      capRate: number;
      multiple: number;
      marketCap: number;
    }[];
    
    // Market Conditions
    marketConditions: {
      realEstateMarket: 'bull' | 'bear' | 'sideways';
      interestRateEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
      economicCycle: 'expansion' | 'peak' | 'contraction' | 'trough';
      marketVolatility: 'low' | 'medium' | 'high';
    };
  };
  
  // Risk Factors
  riskFactors: {
    // Property Risk
    propertyRisk: {
      occupancyRisk: number;
      leaseRolloverRisk: number;
      tenantConcentrationRisk: number;
      propertyConcentrationRisk: number;
      geographicConcentrationRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      leverageRisk: number;
      interestRateRisk: number;
      refinancingRisk: number;
      liquidityRisk: number;
      cashFlowRisk: number;
    };
    
    // Market Risk
    marketRisk: {
      realEstateMarketRisk: number;
      economicRisk: number;
      regulatoryRisk: number;
      taxRisk: number;
      currencyRisk: number;
    };
    
    // Operational Risk
    operationalRisk: {
      managementRisk: number;
      executionRisk: number;
      technologyRisk: number;
      environmentalRisk: number;
      legalRisk: number;
    };
  };
  
  // Growth Projections
  growthProjections: {
    // Revenue Growth
    revenueGrowth: {
      shortTermGrowth: number; // 1-3 years
      mediumTermGrowth: number; // 4-7 years
      longTermGrowth: number; // 8+ years
      growthDrivers: string[];
      growthSustainability: 'high' | 'medium' | 'low';
    };
    
    // FFO Growth
    ffoGrowth: {
      shortTermGrowth: number;
      mediumTermGrowth: number;
      longTermGrowth: number;
      ffoQuality: 'high' | 'medium' | 'low';
      ffoStability: 'high' | 'medium' | 'low';
    };
    
    // Dividend Growth
    dividendGrowth: {
      shortTermGrowth: number;
      mediumTermGrowth: number;
      longTermGrowth: number;
      dividendSustainability: 'high' | 'medium' | 'low';
      payoutRatioTarget: number;
    };
    
    // NAV Growth
    navGrowth: {
      shortTermGrowth: number;
      mediumTermGrowth: number;
      longTermGrowth: number;
      assetAppreciation: number;
      developmentPipeline: number;
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
    
    // Real Estate Market
    realEstateMarket: {
      marketCycle: 'expansion' | 'peak' | 'contraction' | 'trough';
      vacancyRates: number;
      rentalGrowth: number;
      propertyValues: number;
      transactionVolume: number;
    };
    
    // Interest Rate Environment
    interestRateEnvironment: {
      federalFundsRate: number;
      treasuryYields: {
        maturity: number;
        yield: number;
      }[];
      mortgageRates: number;
      capRateTrend: 'increasing' | 'stable' | 'decreasing';
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenarioName: string;
      probability: number;
      priceChange: number;
      dividendChange: number;
      ffoChange: number;
      capRateChange: number;
      description: string;
    }[];
    
    // Economic Scenarios
    economicScenarios: {
      scenarioName: string;
      probability: number;
      gdpGrowth: number;
      interestRate: number;
      inflationRate: number;
      unemploymentRate: number;
      description: string;
    }[];
    
    // Property Scenarios
    propertyScenarios: {
      scenarioName: string;
      probability: number;
      occupancyRate: number;
      rentalGrowth: number;
      propertyValues: number;
      capRates: number;
      description: string;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRevenueVolatility: boolean;
  includeExpenseVolatility: boolean;
  includePropertyValueVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTaxes: boolean;
  includeInflation: boolean;
  includeTransactionCosts: boolean;
  includeLiquidityDiscount: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeValuationAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeGrowthAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    price: number;
    dividend: number;
    ffo: number;
    affo: number;
    nav: number;
    occupancyRate: number;
    return: number;
  }[];
  
  // Reporting Preferences
  includeValuationAnalysis: boolean;
  includeDividendAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeGrowthAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includePeerComparison: boolean;
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

export interface REITCalculatorResults {
  // Core REIT Metrics
  currentPrice: number;
  dividendYield: number;
  ffoPerShare: number;
  affoPerShare: number;
  navPerShare: number;
  totalReturn: number;
  
  // REIT Analysis
  reitAnalysis: {
    currentPrice: number;
    dividendYield: number;
    ffoPerShare: number;
    affoPerShare: number;
    navPerShare: number;
    totalReturn: number;
    reitBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    reitEfficiency: number;
  };
  
  // Valuation Analysis
  valuationAnalysis: {
    netAssetValue: number;
    navPerShare: number;
    priceToNav: number;
    impliedCapRate: number;
    marketCapRate: number;
    capRateSpread: number;
    valuationComponents: {
      component: string;
      value: number;
      percentage: number;
    }[];
    valuationEfficiency: number;
  };
  
  // FFO/AFFO Analysis
  ffoAffoAnalysis: {
    fundsFromOperations: number;
    adjustedFundsFromOperations: number;
    ffoPerShare: number;
    affoPerShare: number;
    ffoGrowth: number;
    affoGrowth: number;
    ffoQuality: 'high' | 'medium' | 'low';
    ffoBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    ffoEfficiency: number;
  };
  
  // Dividend Analysis
  dividendAnalysis: {
    currentDividend: number;
    expectedDividend: number;
    dividendGrowth: number;
    dividendYield: number;
    payoutRatio: number;
    dividendCoverage: number;
    dividendBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    dividendEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    propertyRisk: {
      occupancyRisk: number;
      leaseRolloverRisk: number;
      tenantConcentrationRisk: number;
      propertyConcentrationRisk: number;
      geographicConcentrationRisk: number;
      riskContribution: number;
    };
    financialRisk: {
      leverageRisk: number;
      interestRateRisk: number;
      refinancingRisk: number;
      liquidityRisk: number;
      cashFlowRisk: number;
      riskContribution: number;
    };
    marketRisk: {
      realEstateMarketRisk: number;
      economicRisk: number;
      regulatoryRisk: number;
      taxRisk: number;
      currencyRisk: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Growth Analysis
  growthAnalysis: {
    revenueGrowth: {
      shortTermGrowth: number;
      mediumTermGrowth: number;
      longTermGrowth: number;
      growthDrivers: string[];
      growthSustainability: 'high' | 'medium' | 'low';
    };
    ffoGrowth: {
      shortTermGrowth: number;
      mediumTermGrowth: number;
      longTermGrowth: number;
      ffoQuality: 'high' | 'medium' | 'low';
      ffoStability: 'high' | 'medium' | 'low';
    };
    dividendGrowth: {
      shortTermGrowth: number;
      mediumTermGrowth: number;
      longTermGrowth: number;
      dividendSustainability: 'high' | 'medium' | 'low';
      payoutRatioTarget: number;
    };
    growthEfficiency: number;
  };
  
  // Multiple Analysis
  multipleAnalysis: {
    priceToFFO: number;
    priceToAFFO: number;
    priceToBook: number;
    priceToSales: number;
    evToEbitda: number;
    multipleComparison: {
      peer: string;
      multiple: number;
      difference: number;
      relativeValue: number;
    }[];
    multipleEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPrice: number;
    highPrice: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    price: number;
    dividend: number;
    ffo: number;
    nav: number;
    riskLevel: string;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      dividendYield: number;
      ffoGrowth: number;
      capRate: number;
      multiple: number;
      outperformance: number;
    }[];
    industryComparison: {
      metric: string;
      reit: number;
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
      returnOnInvestment: number;
      profitabilityBreakdown: {
        metric: string;
        value: number;
        industry: number;
        performance: string;
      }[];
      profitabilityScore: number;
    };
    
    // Financial Health Analysis
    financialHealthAnalysis: {
      debtToEquity: number;
      debtToAssets: number;
      interestCoverage: number;
      debtServiceCoverage: number;
      financialHealthBreakdown: {
        metric: string;
        value: number;
        industry: number;
        performance: string;
      }[];
      financialHealthScore: number;
    };
  };
  
  // REIT Score
  reitScore: {
    overallScore: number;
    componentScores: {
      valuation: number;
      dividend: number;
      growth: number;
      risk: number;
      financial: number;
    };
    recommendation: 'buy' | 'hold' | 'sell' | 'review';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanPrice: number;
    medianPrice: number;
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
      price: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalPrice: number;
    historicalDividend: number;
    historicalFFO: number;
    historicalNAV: number;
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
    reitAssessment: string;
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
    currentPrice: number;
    dividendYield: number;
    ffoPerShare: number;
    recommendation: 'buy' | 'hold' | 'sell' | 'review';
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
