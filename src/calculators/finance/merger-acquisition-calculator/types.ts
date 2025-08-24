export interface MergerAcquisitionCalculatorInputs {
  // Transaction Information
  transactionInfo: {
    transactionName: string;
    transactionType: 'merger' | 'acquisition' | 'takeover' | 'joint_venture' | 'strategic_alliance' | 'asset_purchase' | 'stock_purchase' | 'leveraged_buyout' | 'management_buyout' | 'other';
    dealStructure: 'cash' | 'stock' | 'mixed' | 'earnout' | 'contingent_value_rights' | 'other';
    transactionValue: number;
    announcementDate: string;
    expectedClosingDate: string;
    status: 'announced' | 'pending' | 'completed' | 'terminated' | 'withdrawn';
    transactionDescription: string;
  };
  
  // Target Company Information
  targetCompanyInfo: {
    // Company Details
    companyDetails: {
      companyName: string;
      tickerSymbol: string;
      industry: string;
      sector: string;
      marketCap: number;
      enterpriseValue: number;
      employeeCount: number;
      revenue: number;
      ebitda: number;
      netIncome: number;
      companyDescription: string;
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
        freeCashFlow: number;
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
        grossMargin: number;
        operatingMargin: number;
        netMargin: number;
      };
    };
    
    // Market Information
    marketInfo: {
      currentPrice: number;
      sharesOutstanding: number;
      marketCap: number;
      enterpriseValue: number;
      priceToEarnings: number;
      priceToBook: number;
      evToEbitda: number;
      dividendYield: number;
      beta: number;
    };
  };
  
  // Acquirer Company Information
  acquirerCompanyInfo: {
    // Company Details
    companyDetails: {
      companyName: string;
      tickerSymbol: string;
      industry: string;
      sector: string;
      marketCap: number;
      enterpriseValue: number;
      employeeCount: number;
      revenue: number;
      ebitda: number;
      netIncome: number;
      companyDescription: string;
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
        freeCashFlow: number;
      };
    };
    
    // Market Information
    marketInfo: {
      currentPrice: number;
      sharesOutstanding: number;
      marketCap: number;
      enterpriseValue: number;
      priceToEarnings: number;
      priceToBook: number;
      evToEbitda: number;
      dividendYield: number;
      beta: number;
    };
  };
  
  // Deal Terms
  dealTerms: {
    // Purchase Price
    purchasePrice: {
      totalValue: number;
      perShareValue: number;
      premium: number;
      premiumPercentage: number;
      exchangeRatio: number;
      cashComponent: number;
      stockComponent: number;
      earnoutComponent: number;
    };
    
    // Financing Structure
    financingStructure: {
      cashFinancing: number;
      stockFinancing: number;
      debtFinancing: number;
      equityFinancing: number;
      bridgeFinancing: number;
      totalFinancing: number;
    };
    
    // Deal Protection
    dealProtection: {
      breakUpFee: number;
      reverseBreakUpFee: number;
      goShopPeriod: number;
      noShopClause: boolean;
      matchingRights: boolean;
      specificPerformance: boolean;
    };
    
    // Regulatory Approvals
    regulatoryApprovals: {
      antitrust: boolean;
      foreignInvestment: boolean;
      industrySpecific: boolean;
      expectedTimeline: number;
      approvalProbability: number;
    };
  };
  
  // Synergy Analysis
  synergyAnalysis: {
    // Revenue Synergies
    revenueSynergies: {
      crossSelling: number;
      marketExpansion: number;
      pricingPower: number;
      distributionChannels: number;
      totalRevenueSynergies: number;
      timeline: number;
      probability: number;
    };
    
    // Cost Synergies
    costSynergies: {
      overheadReduction: number;
      operationalEfficiencies: number;
      procurementSavings: number;
      facilityConsolidation: number;
      workforceReduction: number;
      totalCostSynergies: number;
      timeline: number;
      probability: number;
    };
    
    // Financial Synergies
    financialSynergies: {
      taxBenefits: number;
      financingEfficiencies: number;
      workingCapitalOptimization: number;
      capitalStructureOptimization: number;
      totalFinancialSynergies: number;
      timeline: number;
      probability: number;
    };
    
    // Total Synergies
    totalSynergies: {
      totalSynergies: number;
      presentValue: number;
      discountRate: number;
      timeline: number;
      probability: number;
    };
  };
  
  // Valuation Analysis
  valuationAnalysis: {
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
  
  // Integration Planning
  integrationPlanning: {
    // Integration Strategy
    integrationStrategy: {
      approach: 'full_integration' | 'partial_integration' | 'standalone' | 'hybrid';
      timeline: number;
      complexity: 'low' | 'medium' | 'high';
      riskLevel: 'low' | 'medium' | 'high';
    };
    
    // Integration Costs
    integrationCosts: {
      oneTimeCosts: number;
      ongoingCosts: number;
      restructuringCosts: number;
      technologyCosts: number;
      totalIntegrationCosts: number;
      timeline: number;
    };
    
    // Integration Risks
    integrationRisks: {
      culturalRisk: number;
      operationalRisk: number;
      technologyRisk: number;
      regulatoryRisk: number;
      executionRisk: number;
      totalIntegrationRisk: number;
    };
    
    // Integration Timeline
    integrationTimeline: {
      phase: string;
      duration: number;
      activities: string[];
      milestones: string[];
      dependencies: string[];
    }[];
  };
  
  // Risk Assessment
  riskAssessment: {
    // Deal Risk
    dealRisk: {
      regulatoryRisk: number;
      financingRisk: number;
      integrationRisk: number;
      marketRisk: number;
      executionRisk: number;
    };
    
    // Business Risk
    businessRisk: {
      operationalRisk: number;
      competitiveRisk: number;
      technologyRisk: number;
      marketRisk: number;
      financialRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      leverageRisk: number;
      liquidityRisk: number;
      refinancingRisk: number;
      interestRateRisk: number;
      currencyRisk: number;
    };
    
    // Strategic Risk
    strategicRisk: {
      strategicFit: number;
      culturalFit: number;
      managementRisk: number;
      keyPersonRisk: number;
      executionRisk: number;
    };
  };
  
  // Market Analysis
  marketAnalysis: {
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
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Deal Scenarios
    dealScenarios: {
      scenarioName: string;
      probability: number;
      purchasePrice: number;
      synergies: number;
      integrationCosts: number;
      netValue: number;
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
    
    // Integration Scenarios
    integrationScenarios: {
      scenarioName: string;
      probability: number;
      integrationSuccess: number;
      synergyRealization: number;
      integrationCosts: number;
      timeline: number;
      description: string;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeSynergyVolatility: boolean;
  includeIntegrationVolatility: boolean;
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
    includeSynergyAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    targetRevenue: number;
    targetEbitda: number;
    acquirerRevenue: number;
    acquirerEbitda: number;
    combinedValue: number;
    return: number;
  }[];
  
  // Reporting Preferences
  includeValuationAnalysis: boolean;
  includeSynergyAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeIntegrationAnalysis: boolean;
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

export interface MergerAcquisitionCalculatorResults {
  // Core M&A Metrics
  transactionValue: number;
  purchasePrice: number;
  premium: number;
  synergies: number;
  netValue: number;
  irr: number;
  
  // M&A Analysis
  maAnalysis: {
    transactionValue: number;
    purchasePrice: number;
    premium: number;
    synergies: number;
    netValue: number;
    irr: number;
    maBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    maEfficiency: number;
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
  
  // Synergy Analysis
  synergyAnalysis: {
    revenueSynergies: {
      crossSelling: number;
      marketExpansion: number;
      pricingPower: number;
      distributionChannels: number;
      totalRevenueSynergies: number;
    };
    costSynergies: {
      overheadReduction: number;
      operationalEfficiencies: number;
      procurementSavings: number;
      facilityConsolidation: number;
      workforceReduction: number;
      totalCostSynergies: number;
    };
    financialSynergies: {
      taxBenefits: number;
      financingEfficiencies: number;
      workingCapitalOptimization: number;
      capitalStructureOptimization: number;
      totalFinancialSynergies: number;
    };
    totalSynergies: {
      totalSynergies: number;
      presentValue: number;
      discountRate: number;
      timeline: number;
      probability: number;
    };
    synergyEfficiency: number;
  };
  
  // Deal Analysis
  dealAnalysis: {
    purchasePrice: {
      totalValue: number;
      perShareValue: number;
      premium: number;
      premiumPercentage: number;
      exchangeRatio: number;
      cashComponent: number;
      stockComponent: number;
      earnoutComponent: number;
    };
    financingStructure: {
      cashFinancing: number;
      stockFinancing: number;
      debtFinancing: number;
      equityFinancing: number;
      bridgeFinancing: number;
      totalFinancing: number;
    };
    dealEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    dealRisk: {
      regulatoryRisk: number;
      financingRisk: number;
      integrationRisk: number;
      marketRisk: number;
      executionRisk: number;
      riskContribution: number;
    };
    businessRisk: {
      operationalRisk: number;
      competitiveRisk: number;
      technologyRisk: number;
      marketRisk: number;
      financialRisk: number;
      riskContribution: number;
    };
    integrationRisk: {
      culturalRisk: number;
      operationalRisk: number;
      technologyRisk: number;
      regulatoryRisk: number;
      executionRisk: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Integration Analysis
  integrationAnalysis: {
    integrationStrategy: {
      approach: string;
      timeline: number;
      complexity: string;
      riskLevel: string;
    };
    integrationCosts: {
      oneTimeCosts: number;
      ongoingCosts: number;
      restructuringCosts: number;
      technologyCosts: number;
      totalIntegrationCosts: number;
    };
    integrationTimeline: {
      phase: string;
      duration: number;
      activities: string[];
      milestones: string[];
      dependencies: string[];
    }[];
    integrationEfficiency: number;
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
    // Combined Financials
    combinedFinancials: {
      combinedRevenue: number;
      combinedEbitda: number;
      combinedNetIncome: number;
      combinedAssets: number;
      combinedLiabilities: number;
      combinedEquity: number;
    };
    
    // Pro Forma Analysis
    proFormaAnalysis: {
      proFormaRevenue: number;
      proFormaEbitda: number;
      proFormaNetIncome: number;
      proFormaEarningsPerShare: number;
      accretion: number;
      dilution: number;
    };
    
    // FinancialEfficiency: number;
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
    purchasePrice: number;
    synergies: number;
    integrationCosts: number;
    netValue: number;
    riskLevel: string;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      transactionValue: number;
      premium: number;
      synergies: number;
      irr: number;
      outperformance: number;
    }[];
    industryComparison: {
      metric: string;
      transaction: number;
      industry: number;
      difference: number;
    }[];
  };
  
  // M&A Score
  maScore: {
    overallScore: number;
    componentScores: {
      valuation: number;
      synergies: number;
      risk: number;
      integration: number;
      market: number;
    };
    recommendation: 'proceed' | 'modify' | 'abandon' | 'review';
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
    historicalSynergies: number;
    historicalReturns: number;
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
    transactionAssessment: string;
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
    synergies: number;
    recommendation: 'proceed' | 'modify' | 'abandon' | 'review';
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
