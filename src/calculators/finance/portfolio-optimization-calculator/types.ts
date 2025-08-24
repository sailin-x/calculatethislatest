export interface PortfolioOptimizationCalculatorInputs {
  // Portfolio Information
  portfolioInfo: {
    // Basic Information
    basicInfo: {
      portfolioName: string;
      portfolioType: 'individual' | 'institutional' | 'retirement' | 'endowment' | 'foundation' | 'other';
      investmentObjective: 'growth' | 'income' | 'balanced' | 'conservative' | 'aggressive' | 'custom';
      riskTolerance: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
      timeHorizon: number; // in years
      liquidityNeeds: 'low' | 'medium' | 'high';
      taxStatus: 'taxable' | 'tax_deferred' | 'tax_free';
      currency: string;
      benchmark: string;
      rebalancingFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'as_needed';
    };
    
    // Investment Constraints
    investmentConstraints: {
      minimumInvestment: number;
      maximumInvestment: number;
      sectorLimits: {
        sector: string;
        minimum: number;
        maximum: number;
      }[];
      assetClassLimits: {
        assetClass: string;
        minimum: number;
        maximum: number;
      }[];
      concentrationLimits: {
        singleSecurity: number;
        singleSector: number;
        singleAssetClass: number;
      };
      liquidityConstraints: {
        minimumLiquidity: number;
        maximumIlliquid: number;
        lockupPeriods: string[];
      };
      taxConstraints: {
        taxLossHarvesting: boolean;
        washSalePeriod: number;
        minimumHoldingPeriod: number;
        taxEfficientInvesting: boolean;
      };
      esgConstraints: {
        esgScreening: boolean;
        esgScore: number;
        exclusionCriteria: string[];
        inclusionCriteria: string[];
      };
    };
    
    // Cash Flow Requirements
    cashFlowRequirements: {
      regularWithdrawals: {
        amount: number;
        frequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
        startDate: string;
        endDate: string;
        inflationAdjusted: boolean;
      };
      irregularWithdrawals: {
        amount: number;
        date: string;
        purpose: string;
      }[];
      regularContributions: {
        amount: number;
        frequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
        startDate: string;
        endDate: string;
        inflationAdjusted: boolean;
      };
      irregularContributions: {
        amount: number;
        date: string;
        source: string;
      }[];
    };
  };
  
  // Asset Information
  assetInfo: {
    // Current Holdings
    currentHoldings: {
      security: string;
      ticker: string;
      assetClass: string;
      sector: string;
      country: string;
      currency: string;
      shares: number;
      marketValue: number;
      costBasis: number;
      unrealizedGainLoss: number;
      weight: number;
      purchaseDate: string;
      lastRebalance: string;
    }[];
    
    // Available Assets
    availableAssets: {
      security: string;
      ticker: string;
      assetClass: string;
      sector: string;
      country: string;
      currency: string;
      assetType: 'stock' | 'bond' | 'etf' | 'mutual_fund' | 'commodity' | 'real_estate' | 'alternative' | 'cash' | 'other';
      expenseRatio: number;
      minimumInvestment: number;
      tradingCosts: number;
      liquidity: 'high' | 'medium' | 'low';
      riskLevel: 'low' | 'medium' | 'high';
      expectedReturn: number;
      volatility: number;
      correlation: number[];
    }[];
    
    // Asset Classes
    assetClasses: {
      assetClass: string;
      description: string;
      expectedReturn: number;
      volatility: number;
      correlation: number[];
      minimumWeight: number;
      maximumWeight: number;
      targetWeight: number;
      currentWeight: number;
    }[];
    
    // Sectors
    sectors: {
      sector: string;
      description: string;
      expectedReturn: number;
      volatility: number;
      correlation: number[];
      minimumWeight: number;
      maximumWeight: number;
      targetWeight: number;
      currentWeight: number;
    }[];
    
    // Geographic Regions
    geographicRegions: {
      region: string;
      description: string;
      expectedReturn: number;
      volatility: number;
      correlation: number[];
      minimumWeight: number;
      maximumWeight: number;
      targetWeight: number;
      currentWeight: number;
    }[];
  };
  
  // Market Data
  marketData: {
    // Historical Prices
    historicalPrices: {
      security: string;
      ticker: string;
      prices: {
        date: string;
        open: number;
        high: number;
        low: number;
        close: number;
        volume: number;
        adjustedClose: number;
      }[];
      returns: {
        date: string;
        return: number;
        cumulativeReturn: number;
      }[];
    }[];
    
    // Risk-Free Rate
    riskFreeRate: {
      rate: number;
      source: string;
      maturity: string;
      lastUpdated: string;
    };
    
    // Market Data
    marketData: {
      marketIndex: string;
      marketReturn: number;
      marketVolatility: number;
      marketBeta: number;
      marketSharpeRatio: number;
      marketCorrelation: number[];
    };
    
    // Economic Indicators
    economicIndicators: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      consumerConfidence: number;
      manufacturingIndex: number;
      housingStarts: number;
      retailSales: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Risk Metrics
    riskMetrics: {
      volatility: number;
      var: number;
      cvar: number;
      downsideDeviation: number;
      maximumDrawdown: number;
      beta: number;
      correlation: number;
      trackingError: number;
      informationRatio: number;
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      jensenAlpha: number;
    };
    
    // Risk Decomposition
    riskDecomposition: {
      factor: string;
      contribution: number;
      percentage: number;
      riskType: 'systematic' | 'idiosyncratic' | 'factor' | 'other';
    }[];
    
    // Stress Testing
    stressTesting: {
      scenario: string;
      description: string;
      probability: number;
      impact: number;
      portfolioReturn: number;
      portfolioRisk: number;
      worstCaseLoss: number;
    }[];
    
    // Risk Budgeting
    riskBudgeting: {
      asset: string;
      weight: number;
      riskContribution: number;
      riskBudget: number;
      riskBudgetUtilization: number;
      marginalRisk: number;
    }[];
  };
  
  // Return Analysis
  returnAnalysis: {
    // Return Metrics
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      excessReturn: number;
      alpha: number;
      beta: number;
      informationRatio: number;
      trackingError: number;
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      jensenAlpha: number;
    };
    
    // Return Attribution
    returnAttribution: {
      factor: string;
      contribution: number;
      percentage: number;
      factorType: 'asset_allocation' | 'security_selection' | 'interaction' | 'other';
    }[];
    
    // Performance Attribution
    performanceAttribution: {
      asset: string;
      weight: number;
      return: number;
      benchmarkReturn: number;
      excessReturn: number;
      contribution: number;
    }[];
    
    // Factor Analysis
    factorAnalysis: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
      risk: number;
      informationRatio: number;
    }[];
  };
  
  // Optimization Parameters
  optimizationParameters: {
    // Objective Function
    objectiveFunction: {
      type: 'maximize_return' | 'minimize_risk' | 'maximize_sharpe' | 'maximize_sortino' | 'minimize_var' | 'custom';
      targetReturn: number;
      targetRisk: number;
      targetSharpe: number;
      riskAversion: number;
      utilityFunction: string;
    };
    
    // Constraints
    constraints: {
      budgetConstraint: boolean;
      longOnly: boolean;
      shortAllowed: boolean;
      leverageAllowed: boolean;
      maximumLeverage: number;
      minimumWeight: number;
      maximumWeight: number;
      sectorConstraints: boolean;
      assetClassConstraints: boolean;
      concentrationConstraints: boolean;
      liquidityConstraints: boolean;
      taxConstraints: boolean;
      esgConstraints: boolean;
    };
    
    // Optimization Method
    optimizationMethod: {
      method: 'mean_variance' | 'black_litterman' | 'risk_parity' | 'maximum_diversification' | 'minimum_variance' | 'equal_weight' | 'custom';
      rebalancingFrequency: string;
      transactionCosts: boolean;
      taxConsiderations: boolean;
      implementationLag: number;
      optimizationHorizon: number;
    };
    
    // Black-Litterman Parameters
    blackLittermanParameters: {
      marketEquilibrium: boolean;
      investorViews: {
        asset: string;
        view: number;
        confidence: number;
        description: string;
      }[];
      tau: number;
      omega: number;
      pi: number[];
      sigma: number[][];
    };
    
    // Risk Parity Parameters
    riskParityParameters: {
      targetRiskContribution: number[];
      riskMeasure: 'volatility' | 'var' | 'cvar' | 'downside_deviation';
      rebalancingThreshold: number;
      maximumIterations: number;
      convergenceTolerance: number;
    };
  };
  
  // Transaction Costs
  transactionCosts: {
    // Trading Costs
    tradingCosts: {
      commission: number;
      spread: number;
      marketImpact: number;
      slippage: number;
      taxes: number;
      otherCosts: number;
      totalCosts: number;
    };
    
    // Asset-Specific Costs
    assetSpecificCosts: {
      asset: string;
      commission: number;
      spread: number;
      marketImpact: number;
      slippage: number;
      taxes: number;
      otherCosts: number;
      totalCosts: number;
    }[];
    
    // Cost Analysis
    costAnalysis: {
      totalTransactionCosts: number;
      costAsPercentage: number;
      breakevenPeriod: number;
      costEfficiency: number;
      implementationShortfall: number;
    };
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Tax Status
    taxStatus: {
      accountType: 'taxable' | 'tax_deferred' | 'tax_free';
      taxRate: number;
      capitalGainsRate: number;
      dividendTaxRate: number;
      interestTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
    };
    
    // Tax Loss Harvesting
    taxLossHarvesting: {
      enabled: boolean;
      washSalePeriod: number;
      minimumLossThreshold: number;
      maximumHarvestAmount: number;
      replacementSecurities: string[];
      harvestedLosses: {
        security: string;
        lossAmount: number;
        harvestDate: string;
        replacementSecurity: string;
      }[];
    };
    
    // Tax-Efficient Investing
    taxEfficientInvesting: {
      assetLocation: {
        asset: string;
        optimalLocation: string;
        reason: string;
      }[];
      dividendReinvestment: boolean;
      taxLotAccounting: boolean;
      taxAwareRebalancing: boolean;
    };
  };
  
  // ESG Considerations
  esgConsiderations: {
    // ESG Screening
    esgScreening: {
      enabled: boolean;
      esgScore: number;
      exclusionCriteria: string[];
      inclusionCriteria: string[];
      bestInClass: boolean;
      thematicInvesting: boolean;
    };
    
    // ESG Metrics
    esgMetrics: {
      environmental: {
        carbonFootprint: number;
        energyEfficiency: number;
        waterUsage: number;
        wasteManagement: number;
        biodiversity: number;
      };
      social: {
        laborRights: number;
        humanRights: number;
        communityRelations: number;
        diversity: number;
        healthSafety: number;
      };
      governance: {
        boardIndependence: number;
        executiveCompensation: number;
        shareholderRights: number;
        transparency: number;
        corruption: number;
      };
      overallEsgScore: number;
    };
    
    // ESG Impact
    esgImpact: {
      carbonReduction: number;
      socialImpact: number;
      governanceImprovement: number;
      overallImpact: number;
      impactMeasurement: string;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      probability: number;
      marketReturn: number;
      volatility: number;
      correlation: number[];
      impact: number;
      portfolioReturn: number;
      portfolioRisk: number;
    }[];
    
    // Economic Scenarios
    economicScenarios: {
      scenario: string;
      probability: number;
      gdpGrowth: number;
      inflation: number;
      interestRates: number;
      unemployment: number;
      impact: number;
      portfolioReturn: number;
      portfolioRisk: number;
    }[];
    
    // Stress Scenarios
    stressScenarios: {
      scenario: string;
      probability: number;
      description: string;
      marketShock: number;
      correlationBreakdown: boolean;
      liquidityCrisis: boolean;
      impact: number;
      portfolioReturn: number;
      portfolioRisk: number;
      worstCaseLoss: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeReturnVolatility: boolean;
  includeCorrelationVolatility: boolean;
  includeRegimeChanges: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  optimizationHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeRiskAnalysis: boolean;
    includeReturnAnalysis: boolean;
    includeOptimization: boolean;
    includeTransactionCosts: boolean;
    includeTaxConsiderations: boolean;
    includeEsgConsiderations: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    portfolioValue: number;
    portfolioReturn: number;
    benchmarkReturn: number;
    excessReturn: number;
    volatility: number;
    sharpeRatio: number;
  }[];
  
  // Reporting Preferences
  includeRiskAnalysis: boolean;
  includeReturnAnalysis: boolean;
  includeOptimization: boolean;
  includeTransactionCosts: boolean;
  includeTaxConsiderations: boolean;
  includeEsgConsiderations: boolean;
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

export interface PortfolioOptimizationCalculatorResults {
  // Core Portfolio Metrics
  portfolioValue: number;
  expectedReturn: number;
  expectedRisk: number;
  sharpeRatio: number;
  informationRatio: number;
  
  // Portfolio Analysis
  portfolioAnalysis: {
    portfolioValue: number;
    expectedReturn: number;
    expectedRisk: number;
    sharpeRatio: number;
    informationRatio: number;
    portfolioBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    portfolioEfficiency: number;
  };
  
  // Asset Allocation Analysis
  assetAllocationAnalysis: {
    currentAllocation: {
      asset: string;
      ticker: string;
      assetClass: string;
      sector: string;
      shares: number;
      marketValue: number;
      weight: number;
      expectedReturn: number;
      risk: number;
      correlation: number[];
    }[];
    optimalAllocation: {
      asset: string;
      ticker: string;
      assetClass: string;
      sector: string;
      targetWeight: number;
      currentWeight: number;
      weightChange: number;
      expectedReturn: number;
      risk: number;
      correlation: number[];
    }[];
    assetClassAllocation: {
      assetClass: string;
      currentWeight: number;
      targetWeight: number;
      weightChange: number;
      expectedReturn: number;
      risk: number;
    }[];
    sectorAllocation: {
      sector: string;
      currentWeight: number;
      targetWeight: number;
      weightChange: number;
      expectedReturn: number;
      risk: number;
    }[];
    geographicAllocation: {
      region: string;
      currentWeight: number;
      targetWeight: number;
      weightChange: number;
      expectedReturn: number;
      risk: number;
    }[];
    allocationEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskMetrics: {
      volatility: number;
      var: number;
      cvar: number;
      downsideDeviation: number;
      maximumDrawdown: number;
      beta: number;
      correlation: number;
      trackingError: number;
      informationRatio: number;
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      jensenAlpha: number;
    };
    riskDecomposition: {
      factor: string;
      contribution: number;
      percentage: number;
      riskType: string;
    }[];
    stressTesting: {
      scenario: string;
      description: string;
      probability: number;
      impact: number;
      portfolioReturn: number;
      portfolioRisk: number;
      worstCaseLoss: number;
    }[];
    riskBudgeting: {
      asset: string;
      weight: number;
      riskContribution: number;
      riskBudget: number;
      riskBudgetUtilization: number;
      marginalRisk: number;
    }[];
    riskEfficiency: number;
  };
  
  // Return Analysis
  returnAnalysis: {
    returnMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      excessReturn: number;
      alpha: number;
      beta: number;
      informationRatio: number;
      trackingError: number;
      sharpeRatio: number;
      sortinoRatio: number;
      calmarRatio: number;
      treynorRatio: number;
      jensenAlpha: number;
    };
    returnAttribution: {
      factor: string;
      contribution: number;
      percentage: number;
      factorType: string;
    }[];
    performanceAttribution: {
      asset: string;
      weight: number;
      return: number;
      benchmarkReturn: number;
      excessReturn: number;
      contribution: number;
    }[];
    factorAnalysis: {
      factor: string;
      exposure: number;
      return: number;
      contribution: number;
      risk: number;
      informationRatio: number;
    }[];
    returnEfficiency: number;
  };
  
  // Optimization Analysis
  optimizationAnalysis: {
    optimizationResults: {
      method: string;
      objectiveFunction: string;
      constraints: string[];
      optimalWeights: number[];
      expectedReturn: number;
      expectedRisk: number;
      sharpeRatio: number;
      informationRatio: number;
    };
    efficientFrontier: {
      risk: number;
      return: number;
      sharpeRatio: number;
      weights: number[];
    }[];
    optimizationComparison: {
      method: string;
      expectedReturn: number;
      expectedRisk: number;
      sharpeRatio: number;
      informationRatio: number;
      efficiency: number;
    }[];
    rebalancingAnalysis: {
      currentWeights: number[];
      targetWeights: number[];
      weightChanges: number[];
      transactionCosts: number;
      implementationLag: number;
      rebalancingEfficiency: number;
    };
    optimizationEfficiency: number;
  };
  
  // Transaction Costs Analysis
  transactionCostsAnalysis: {
    tradingCosts: {
      commission: number;
      spread: number;
      marketImpact: number;
      slippage: number;
      taxes: number;
      otherCosts: number;
      totalCosts: number;
    };
    assetSpecificCosts: {
      asset: string;
      commission: number;
      spread: number;
      marketImpact: number;
      slippage: number;
      taxes: number;
      otherCosts: number;
      totalCosts: number;
    }[];
    costAnalysis: {
      totalTransactionCosts: number;
      costAsPercentage: number;
      breakevenPeriod: number;
      costEfficiency: number;
      implementationShortfall: number;
    };
    costEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxStatus: {
      accountType: string;
      taxRate: number;
      capitalGainsRate: number;
      dividendTaxRate: number;
      interestTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
    };
    taxLossHarvesting: {
      enabled: boolean;
      washSalePeriod: number;
      minimumLossThreshold: number;
      maximumHarvestAmount: number;
      replacementSecurities: string[];
      harvestedLosses: {
        security: string;
        lossAmount: number;
        harvestDate: string;
        replacementSecurity: string;
      }[];
    };
    taxEfficientInvesting: {
      assetLocation: {
        asset: string;
        optimalLocation: string;
        reason: string;
      }[];
      dividendReinvestment: boolean;
      taxLotAccounting: boolean;
      taxAwareRebalancing: boolean;
    };
    taxEfficiency: number;
  };
  
  // ESG Analysis
  esgAnalysis: {
    esgScreening: {
      enabled: boolean;
      esgScore: number;
      exclusionCriteria: string[];
      inclusionCriteria: string[];
      bestInClass: boolean;
      thematicInvesting: boolean;
    };
    esgMetrics: {
      environmental: {
        carbonFootprint: number;
        energyEfficiency: number;
        waterUsage: number;
        wasteManagement: number;
        biodiversity: number;
      };
      social: {
        laborRights: number;
        humanRights: number;
        communityRelations: number;
        diversity: number;
        healthSafety: number;
      };
      governance: {
        boardIndependence: number;
        executiveCompensation: number;
        shareholderRights: number;
        transparency: number;
        corruption: number;
      };
      overallEsgScore: number;
    };
    esgImpact: {
      carbonReduction: number;
      socialImpact: number;
      governanceImprovement: number;
      overallImpact: number;
      impactMeasurement: string;
    };
    esgEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowReturn: number;
    highReturn: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    marketReturn: number;
    volatility: number;
    impact: number;
    portfolioReturn: number;
    portfolioRisk: number;
    recommendation: string;
  }[];
  
  // Portfolio Planning Analysis
  portfolioPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    portfolioStrategies: {
      strategy: string;
      description: string;
      expectedImprovement: number;
      implementationSteps: string[];
      timeline: string;
    }[];
    planningEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativePortfolios: {
      portfolio: string;
      expectedReturn: number;
      expectedRisk: number;
      sharpeRatio: number;
      efficiency: number;
    }[];
    benchmarkComparison: {
      benchmark: string;
      benchmarkReturn: number;
      portfolioReturn: number;
      outperformance: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Portfolio Score
  portfolioScore: {
    overallScore: number;
    componentScores: {
      allocation: number;
      risk: number;
      return: number;
      optimization: number;
      costs: number;
      planning: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanReturn: number;
    medianReturn: number;
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
    historicalReturn: number;
    historicalRisk: number;
    historicalSharpeRatio: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    returnEnhancement: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    portfolioAssessment: string;
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
    portfolioValue: number;
    expectedReturn: number;
    expectedRisk: number;
    sharpeRatio: number;
    informationRatio: number;
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedImprovement: number;
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
