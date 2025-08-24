export interface DividendDiscountModelInputs {
  // Company Information
  companyInfo: {
    companyName: string;
    tickerSymbol: string;
    sector: string;
    industry: string;
    marketCap: number;
    companyType: 'large_cap' | 'mid_cap' | 'small_cap' | 'micro_cap';
    dividendPolicy: 'stable' | 'growing' | 'declining' | 'irregular' | 'no_dividend';
    payoutRatio: number;
    retentionRatio: number;
    companyDescription: string;
  };
  
  // Dividend Information
  dividendInfo: {
    // Current Dividend
    currentDividend: {
      annualDividend: number;
      quarterlyDividend: number;
      monthlyDividend: number;
      dividendPerShare: number;
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
      earningsPerShare: number;
    }[];
    
    // Dividend Growth
    dividendGrowth: {
      historicalGrowthRate: number;
      expectedGrowthRate: number;
      sustainableGrowthRate: number;
      growthPhase: 'high_growth' | 'stable_growth' | 'mature_growth' | 'declining_growth';
      growthPeriod: number; // in years
    };
    
    // Dividend Schedule
    dividendSchedule: {
      date: string;
      dividend: number;
      type: 'regular' | 'special' | 'stock_dividend';
      exDividendDate: string;
      paymentDate: string;
    }[];
  };
  
  // Financial Information
  financialInfo: {
    // Earnings Information
    earningsInfo: {
      currentEarnings: number;
      historicalEarnings: {
        year: number;
        earnings: number;
        growthRate: number;
      }[];
      expectedEarnings: {
        year: number;
        earnings: number;
        growthRate: number;
      }[];
      earningsQuality: 'high' | 'medium' | 'low';
    };
    
    // Balance Sheet Information
    balanceSheetInfo: {
      totalAssets: number;
      totalLiabilities: number;
      shareholdersEquity: number;
      bookValuePerShare: number;
      debtToEquity: number;
      currentRatio: number;
      quickRatio: number;
    };
    
    // Cash Flow Information
    cashFlowInfo: {
      operatingCashFlow: number;
      freeCashFlow: number;
      cashFlowToDebt: number;
      dividendCoverage: number;
      cashFlowQuality: 'high' | 'medium' | 'low';
    };
    
    // Financial Ratios
    financialRatios: {
      returnOnEquity: number;
      returnOnAssets: number;
      returnOnCapital: number;
      profitMargin: number;
      operatingMargin: number;
      netMargin: number;
    };
  };
  
  // Growth Assumptions
  growthAssumptions: {
    // Dividend Growth Phases
    dividendGrowthPhases: {
      phase: string;
      duration: number; // in years
      growthRate: number;
      terminalGrowthRate: number;
      probability: number;
    }[];
    
    // Earnings Growth
    earningsGrowth: {
      shortTermGrowth: number; // 1-3 years
      mediumTermGrowth: number; // 4-7 years
      longTermGrowth: number; // 8+ years
      terminalGrowth: number;
      growthDrivers: string[];
    };
    
    // Sustainable Growth
    sustainableGrowth: {
      sustainableGrowthRate: number;
      returnOnEquity: number;
      retentionRatio: number;
      reinvestmentRate: number;
      growthSustainability: 'high' | 'medium' | 'low';
    };
  };
  
  // Discount Rate
  discountRate: {
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
    
    // Required Rate of Return
    requiredRateOfReturn: {
      riskFreeRate: number;
      marketRiskPremium: number;
      beta: number;
      sizeRiskPremium: number;
      countryRiskPremium: number;
      companySpecificRiskPremium: number;
      totalRequiredReturn: number;
    };
  };
  
  // Model Parameters
  modelParameters: {
    // DDM Model Type
    modelType: 'gordon_growth' | 'two_stage' | 'three_stage' | 'h_model' | 'variable_growth' | 'custom';
    
    // Growth Stages
    growthStages: {
      stage: string;
      duration: number;
      growthRate: number;
      dividend: number;
      probability: number;
    }[];
    
    // Terminal Value
    terminalValue: {
      terminalGrowthRate: number;
      terminalDividend: number;
      terminalMultiple: number;
      perpetuityValue: number;
    };
    
    // Valuation Period
    valuationPeriod: {
      explicitPeriod: number; // in years
      terminalPeriod: number; // in years
      totalPeriod: number; // in years
    };
  };
  
  // Market Data
  marketData: {
    // Market Information
    marketInfo: {
      currentPrice: number;
      marketCap: number;
      enterpriseValue: number;
      priceToEarnings: number;
      priceToBook: number;
      priceToSales: number;
      dividendYield: number;
    };
    
    // Industry Data
    industryData: {
      industry: string;
      averageDividendYield: number;
      averageGrowthRate: number;
      averagePayoutRatio: number;
      industryBeta: number;
    };
    
    // Peer Comparison
    peerComparison: {
      peer: string;
      dividendYield: number;
      growthRate: number;
      payoutRatio: number;
      priceToEarnings: number;
      beta: number;
    }[];
  };
  
  // Risk Factors
  riskFactors: {
    // Business Risk
    businessRisk: {
      competitiveRisk: number;
      operationalRisk: number;
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
    
    // Dividend Risk
    dividendRisk: {
      dividendCutRisk: number;
      dividendSuspensionRisk: number;
      growthSlowdownRisk: number;
      payoutRatioRisk: number;
      coverageRisk: number;
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
    
    // Sector Outlook
    sectorOutlook: {
      sectorGrowth: number;
      sectorRisk: number;
      sectorOpportunities: string[];
      sectorThreats: string[];
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
      scenarioName: string;
      probability: number;
      growthRate: number;
      discountRate: number;
      dividend: number;
      description: string;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeGrowthVolatility: boolean;
  includeDiscountRateVolatility: boolean;
  includeDividendVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTaxes: boolean;
  includeInflation: boolean;
  includeTransactionCosts: boolean;
  includeLiquidityDiscount: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeSensitivityAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
    includePeerComparison: boolean;
    includeRiskAnalysis: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    dividend: number;
    earnings: number;
    growthRate: number;
    payoutRatio: number;
    stockPrice: number;
    dividendYield: number;
  }[];
  
  // Reporting Preferences
  includeDividendAnalysis: boolean;
  includeGrowthAnalysis: boolean;
  includeValuationAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includePeerComparison: boolean;
  includeSensitivityAnalysis: boolean;
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

export interface DividendDiscountModelResults {
  // Core Valuation Metrics
  intrinsicValue: number;
  currentPrice: number;
  upsidePotential: number;
  dividendYield: number;
  totalReturn: number;
  
  // DDM Analysis
  ddmAnalysis: {
    intrinsicValue: number;
    currentPrice: number;
    upsidePotential: number;
    dividendYield: number;
    totalReturn: number;
    valuationBreakdown: {
      component: string;
      value: number;
      percentage: number;
    }[];
    valuationEfficiency: number;
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
  
  // Growth Analysis
  growthAnalysis: {
    historicalGrowth: number;
    expectedGrowth: number;
    sustainableGrowth: number;
    growthPhases: {
      phase: string;
      growthRate: number;
      duration: number;
      value: number;
    }[];
    growthBreakdown: {
      component: string;
      rate: number;
      contribution: number;
    }[];
    growthEfficiency: number;
  };
  
  // Valuation Analysis
  valuationAnalysis: {
    presentValue: number;
    terminalValue: number;
    totalValue: number;
    valueComponents: {
      component: string;
      value: number;
      percentage: number;
    }[];
    valuationEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    dividendRisk: {
      dividendCutRisk: number;
      dividendSuspensionRisk: number;
      growthSlowdownRisk: number;
      riskContribution: number;
    };
    businessRisk: {
      competitiveRisk: number;
      operationalRisk: number;
      executionRisk: number;
      riskContribution: number;
    };
    financialRisk: {
      liquidityRisk: number;
      leverageRisk: number;
      cashFlowRisk: number;
      riskContribution: number;
    };
    marketRisk: {
      demandRisk: number;
      priceRisk: number;
      economicRisk: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowValue: number;
    highValue: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    intrinsicValue: number;
    upsidePotential: number;
    dividendYield: number;
    riskLevel: string;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      intrinsicValue: number;
      dividendYield: number;
      growthRate: number;
      upsidePotential: number;
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
      profitMargin: number;
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
      currentRatio: number;
      cashFlowToDebt: number;
      financialHealthBreakdown: {
        metric: string;
        value: number;
        industry: number;
        performance: string;
      }[];
      financialHealthScore: number;
    };
  };
  
  // Company Score
  companyScore: {
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
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalValue: number;
    historicalGrowth: number;
    historicalDividend: number;
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
    intrinsicValue: number;
    upsidePotential: number;
    dividendYield: number;
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
