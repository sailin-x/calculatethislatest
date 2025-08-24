export interface AssetAllocationCalculatorInputs {
  // Portfolio Information
  portfolioInfo: {
    // Basic Information
    basicInfo: {
      portfolioName: string;
      portfolioType: 'individual' | 'institutional' | 'endowment' | 'pension' | 'foundation';
      totalValue: number;
      currency: string;
      baseCurrency: string;
      investmentHorizon: number;
      riskTolerance: 'very_conservative' | 'conservative' | 'moderate' | 'aggressive' | 'very_aggressive';
      liquidityRequirements: 'high' | 'medium' | 'low';
      taxStatus: 'taxable' | 'tax_deferred' | 'tax_free';
      regulatoryConstraints: string[];
      investmentConstraints: string[];
    };
    
    // Current Portfolio
    currentPortfolio: {
      asset: string;
      symbol: string;
      assetClass: 'equity' | 'fixed_income' | 'cash' | 'real_estate' | 'commodities' | 'alternatives' | 'currencies';
      subAssetClass: string;
      quantity: number;
      price: number;
      marketValue: number;
      weight: number;
      currency: string;
      country: string;
      sector: string;
      expectedReturn: number;
      volatility: number;
      beta: number;
      correlation: number;
      liquidity: 'high' | 'medium' | 'low';
      taxEfficiency: number;
    }[];
    
    // Current Asset Allocation
    currentAllocation: {
      assetClass: string;
      subAssetClass: string;
      marketValue: number;
      weight: number;
      expectedReturn: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
      correlation: number;
    }[];
    
    // Investment Goals
    investmentGoals: {
      goal: string;
      priority: 'high' | 'medium' | 'low';
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      requiredReturn: number;
      riskTolerance: string;
      liquidityNeeds: string;
    }[];
    
    // Cash Flow Requirements
    cashFlowRequirements: {
      period: string;
      amount: number;
      frequency: 'monthly' | 'quarterly' | 'annually';
      priority: 'high' | 'medium' | 'low';
      inflationAdjusted: boolean;
    }[];
  };
  
  // Asset Classes
  assetClasses: {
    // Equity Asset Class
    equity: {
      domesticLargeCap: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        sharpeRatio: number;
        maxDrawdown: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      domesticMidCap: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        sharpeRatio: number;
        maxDrawdown: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      domesticSmallCap: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        sharpeRatio: number;
        maxDrawdown: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      internationalDeveloped: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        sharpeRatio: number;
        maxDrawdown: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        currencyRisk: number;
      };
      internationalEmerging: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        sharpeRatio: number;
        maxDrawdown: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        currencyRisk: number;
        politicalRisk: number;
      };
    };
    
    // Fixed Income Asset Class
    fixedIncome: {
      governmentBonds: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        duration: number;
        yield: number;
        creditQuality: string;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      corporateBonds: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        duration: number;
        yield: number;
        creditQuality: string;
        defaultRisk: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      municipalBonds: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        duration: number;
        yield: number;
        creditQuality: string;
        taxAdvantage: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      highYieldBonds: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        duration: number;
        yield: number;
        creditQuality: string;
        defaultRisk: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      internationalBonds: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        duration: number;
        yield: number;
        creditQuality: string;
        currencyRisk: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
    };
    
    // Real Estate Asset Class
    realEstate: {
      domesticREITs: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        dividendYield: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      internationalREITs: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        dividendYield: number;
        currencyRisk: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      directRealEstate: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        rentalYield: number;
        appreciation: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        managementCosts: number;
      };
    };
    
    // Commodities Asset Class
    commodities: {
      preciousMetals: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        inflationHedge: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      energy: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        inflationHedge: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      agriculture: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        inflationHedge: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      broadCommodities: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        inflationHedge: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
    };
    
    // Alternatives Asset Class
    alternatives: {
      hedgeFunds: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        alpha: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        lockupPeriod: number;
        managementFee: number;
        performanceFee: number;
      };
      privateEquity: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        alpha: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        lockupPeriod: number;
        managementFee: number;
        performanceFee: number;
      };
      ventureCapital: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        alpha: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        lockupPeriod: number;
        managementFee: number;
        performanceFee: number;
      };
      infrastructure: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        beta: number;
        alpha: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        lockupPeriod: number;
        managementFee: number;
        performanceFee: number;
      };
    };
    
    // Cash Asset Class
    cash: {
      moneyMarket: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        yield: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      shortTermBonds: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        duration: number;
        yield: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
      };
      certificatesOfDeposit: {
        expectedReturn: number;
        volatility: number;
        correlation: number;
        yield: number;
        liquidity: string;
        taxEfficiency: number;
        minimumInvestment: number;
        maximumInvestment: number;
        term: number;
      };
    };
  };
  
  // Optimization Parameters
  optimizationParameters: {
    // Optimization Method
    optimizationMethod: 'mean_variance' | 'black_litterman' | 'risk_parity' | 'maximum_sharpe' | 'minimum_variance' | 'maximum_diversification' | 'equal_weight' | 'custom';
    
    // Risk Measures
    riskMeasures: {
      primaryRiskMeasure: 'volatility' | 'var' | 'expected_shortfall' | 'max_drawdown' | 'downside_deviation';
      secondaryRiskMeasure: 'volatility' | 'var' | 'expected_shortfall' | 'max_drawdown' | 'downside_deviation';
      confidenceLevel: number;
      timeHorizon: number;
    };
    
    // Return Measures
    returnMeasures: {
      primaryReturnMeasure: 'arithmetic_mean' | 'geometric_mean' | 'excess_return' | 'risk_adjusted_return';
      secondaryReturnMeasure: 'arithmetic_mean' | 'geometric_mean' | 'excess_return' | 'risk_adjusted_return';
      riskFreeRate: number;
      benchmarkReturn: number;
    };
    
    // Constraints
    constraints: {
      // Weight Constraints
      weightConstraints: {
        minWeight: number;
        maxWeight: number;
        assetClass: string;
      }[];
      
      // Risk Constraints
      riskConstraints: {
        maxVolatility: number;
        maxVaR: number;
        maxDrawdown: number;
        maxTrackingError: number;
        maxBeta: number;
      };
      
      // Allocation Constraints
      allocationConstraints: {
        minEquity: number;
        maxEquity: number;
        minFixedIncome: number;
        maxFixedIncome: number;
        minCash: number;
        maxCash: number;
        minInternational: number;
        maxInternational: number;
        minAlternatives: number;
        maxAlternatives: number;
      };
      
      // Sector Constraints
      sectorConstraints: {
        sector: string;
        minWeight: number;
        maxWeight: number;
      }[];
      
      // Geographic Constraints
      geographicConstraints: {
        country: string;
        minWeight: number;
        maxWeight: number;
      }[];
      
      // Liquidity Constraints
      liquidityConstraints: {
        minLiquidity: number;
        maxIlliquidAssets: number;
        minCashReserve: number;
      };
      
      // Tax Constraints
      taxConstraints: {
        taxEfficientWeighting: boolean;
        taxLossHarvesting: boolean;
        taxLotOptimization: boolean;
      };
    };
    
    // Rebalancing
    rebalancing: {
      frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually' | 'trigger_based';
      threshold: number;
      tolerance: number;
      transactionCosts: number;
      taxImpact: boolean;
    };
  };
  
  // Market Data
  marketData: {
    // Historical Returns
    historicalReturns: {
      assetClass: string;
      subAssetClass: string;
      returns: {
        date: string;
        return: number;
        cumulativeReturn: number;
      }[];
    }[];
    
    // Correlation Matrix
    correlationMatrix: {
      asset1: string;
      asset2: string;
      correlation: number;
      period: number;
    }[];
    
    // Volatility Data
    volatilityData: {
      assetClass: string;
      subAssetClass: string;
      volatility: number;
      rollingVolatility: {
        period: number;
        volatility: number;
      }[];
    }[];
    
    // Market Conditions
    marketConditions: {
      marketRegime: 'bull_market' | 'bear_market' | 'sideways_market' | 'volatile_market';
      economicCycle: 'expansion' | 'peak' | 'contraction' | 'trough';
      interestRateEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
      inflationEnvironment: 'low' | 'normal' | 'high' | 'rising' | 'falling';
      volatilityRegime: 'low' | 'normal' | 'high' | 'extreme';
    };
    
    // Economic Indicators
    economicIndicators: {
      date: string;
      gdpGrowth: number;
      inflationRate: number;
      unemploymentRate: number;
      interestRate: number;
      consumerConfidence: number;
      businessConfidence: number;
      manufacturingIndex: number;
      servicesIndex: number;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Economic Scenarios
    economicScenarios: {
      scenario: string;
      probability: number;
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      marketReturn: number;
      bondReturn: number;
      realEstateReturn: number;
      commodityReturn: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      probability: number;
      equityReturn: number;
      bondReturn: number;
      realEstateReturn: number;
      commodityReturn: number;
      alternativeReturn: number;
      cashReturn: number;
    }[];
    
    // Stress Scenarios
    stressScenarios: {
      scenario: string;
      probability: number;
      description: string;
      equityShock: number;
      bondShock: number;
      realEstateShock: number;
      commodityShock: number;
      alternativeShock: number;
      currencyShock: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeMarketRisk: boolean;
  includeInterestRateRisk: boolean;
  includeCurrencyRisk: boolean;
  includeInflationRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeOptimization: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
    includeRebalancing: boolean;
    includeTaxOptimization: boolean;
    includeRiskDecomposition: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    portfolioValue: number;
    return: number;
    volatility: number;
    sharpeRatio: number;
    maxDrawdown: number;
    assetAllocation: {
      assetClass: string;
      weight: number;
    }[];
  }[];
  
  // Reporting Preferences
  includeOptimization: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeRebalancing: boolean;
  includeTaxOptimization: boolean;
  includeRiskDecomposition: boolean;
  includeHistoricalAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface AssetAllocationCalculatorResults {
  // Core Allocation Metrics
  optimalAllocation: {
    assetClass: string;
    weight: number;
    expectedReturn: number;
    volatility: number;
    contribution: number;
  }[];
  expectedReturn: number;
  expectedVolatility: number;
  sharpeRatio: number;
  informationRatio: number;
  
  // Asset Allocation Analysis
  assetAllocationAnalysis: {
    optimalAllocation: {
      assetClass: string;
      weight: number;
      expectedReturn: number;
      volatility: number;
      contribution: number;
    }[];
    expectedReturn: number;
    expectedVolatility: number;
    sharpeRatio: number;
    informationRatio: number;
    allocationBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    allocationEfficiency: number;
  };
  
  // Portfolio Analysis
  portfolioAnalysis: {
    currentPortfolio: {
      asset: string;
      symbol: string;
      assetClass: string;
      subAssetClass: string;
      quantity: number;
      price: number;
      marketValue: number;
      weight: number;
      currency: string;
      country: string;
      sector: string;
      expectedReturn: number;
      volatility: number;
      beta: number;
      correlation: number;
      liquidity: string;
      taxEfficiency: number;
    }[];
    currentAllocation: {
      assetClass: string;
      subAssetClass: string;
      marketValue: number;
      weight: number;
      expectedReturn: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
      correlation: number;
    }[];
    investmentGoals: {
      goal: string;
      priority: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      requiredReturn: number;
      riskTolerance: string;
      liquidityNeeds: string;
    }[];
    cashFlowRequirements: {
      period: string;
      amount: number;
      frequency: string;
      priority: string;
      inflationAdjusted: boolean;
    }[];
    portfolioEfficiency: number;
  };
  
  // Optimization Analysis
  optimizationAnalysis: {
    optimizationMethod: string;
    riskMeasures: {
      primaryRiskMeasure: string;
      secondaryRiskMeasure: string;
      confidenceLevel: number;
      timeHorizon: number;
    };
    returnMeasures: {
      primaryReturnMeasure: string;
      secondaryReturnMeasure: string;
      riskFreeRate: number;
      benchmarkReturn: number;
    };
    constraints: {
      weightConstraints: {
        minWeight: number;
        maxWeight: number;
        assetClass: string;
      }[];
      riskConstraints: {
        maxVolatility: number;
        maxVaR: number;
        maxDrawdown: number;
        maxTrackingError: number;
        maxBeta: number;
      };
      allocationConstraints: {
        minEquity: number;
        maxEquity: number;
        minFixedIncome: number;
        maxFixedIncome: number;
        minCash: number;
        maxCash: number;
        minInternational: number;
        maxInternational: number;
        minAlternatives: number;
        maxAlternatives: number;
      };
      sectorConstraints: {
        sector: string;
        minWeight: number;
        maxWeight: number;
      }[];
      geographicConstraints: {
        country: string;
        minWeight: number;
        maxWeight: number;
      }[];
      liquidityConstraints: {
        minLiquidity: number;
        maxIlliquidAssets: number;
        minCashReserve: number;
      };
      taxConstraints: {
        taxEfficientWeighting: boolean;
        taxLossHarvesting: boolean;
        taxLotOptimization: boolean;
      };
    };
    rebalancing: {
      frequency: string;
      threshold: number;
      tolerance: number;
      transactionCosts: number;
      taxImpact: boolean;
    };
    optimizationEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskMetrics: {
      volatility: number;
      var: number;
      expectedShortfall: number;
      maxDrawdown: number;
      downsideDeviation: number;
      beta: number;
      trackingError: number;
      informationRatio: number;
    };
    riskDecomposition: {
      assetClass: string;
      riskContribution: number;
      percentage: number;
    }[];
    correlationAnalysis: {
      averageCorrelation: number;
      correlationMatrix: {
        asset1: string;
        asset2: string;
        correlation: number;
      }[];
      diversificationRatio: number;
      effectiveN: number;
    };
    factorExposure: {
      factor: string;
      exposure: number;
      contribution: number;
    }[];
    riskEfficiency: number;
  };
  
  // Return Analysis
  returnAnalysis: {
    returnMetrics: {
      expectedReturn: number;
      arithmeticMean: number;
      geometricMean: number;
      excessReturn: number;
      riskAdjustedReturn: number;
      alpha: number;
      beta: number;
      informationRatio: number;
    };
    returnDecomposition: {
      assetClass: string;
      returnContribution: number;
      percentage: number;
    }[];
    returnAttribution: {
      factor: string;
      returnContribution: number;
      percentage: number;
    }[];
    returnEfficiency: number;
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    economicScenarios: {
      scenario: string;
      probability: number;
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      marketReturn: number;
      bondReturn: number;
      realEstateReturn: number;
      commodityReturn: number;
      portfolioReturn: number;
    }[];
    marketScenarios: {
      scenario: string;
      probability: number;
      equityReturn: number;
      bondReturn: number;
      realEstateReturn: number;
      commodityReturn: number;
      alternativeReturn: number;
      cashReturn: number;
      portfolioReturn: number;
    }[];
    stressScenarios: {
      scenario: string;
      probability: number;
      description: string;
      equityShock: number;
      bondShock: number;
      realEstateShock: number;
      commodityShock: number;
      alternativeShock: number;
      currencyShock: number;
      portfolioImpact: number;
    }[];
    scenarioEfficiency: number;
  };
  
  // Rebalancing Analysis
  rebalancingAnalysis: {
    rebalancingSchedule: {
      date: string;
      currentAllocation: {
        assetClass: string;
        weight: number;
      }[];
      targetAllocation: {
        assetClass: string;
        weight: number;
      }[];
      trades: {
        assetClass: string;
        action: string;
        amount: number;
        cost: number;
      }[];
      totalCost: number;
    }[];
    rebalancingMetrics: {
      frequency: string;
      averageCost: number;
      totalCost: number;
      trackingError: number;
      drift: number;
    };
    taxOptimization: {
      taxLossHarvesting: {
        opportunity: string;
        potentialSavings: number;
        implementation: string;
      }[];
      taxEfficientAllocation: {
        assetClass: string;
        taxEfficiency: number;
        allocation: number;
      }[];
      totalTaxSavings: number;
    };
    rebalancingEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowAllocation: {
      assetClass: string;
      weight: number;
    }[];
    highAllocation: {
      assetClass: string;
      weight: number;
    }[];
    sensitivity: number;
  }[];
  
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
    monteCarloEfficiency: number;
  };
  
  // Asset Allocation Planning Analysis
  assetAllocationPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    allocationStrategies: {
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
    alternativeAllocations: {
      allocation: string;
      expectedReturn: number;
      risk: number;
      efficiency: number;
    }[];
    benchmarkComparison: {
      benchmark: string;
      benchmarkReturn: number;
      allocationReturn: number;
      outperformance: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Asset Allocation Score
  assetAllocationScore: {
    overallScore: number;
    componentScores: {
      optimization: number;
      risk: number;
      return: number;
      scenario: number;
      rebalancing: number;
      planning: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalAllocation: {
      date: string;
      allocation: {
        assetClass: string;
        weight: number;
      }[];
      return: number;
      volatility: number;
      sharpeRatio: number;
    }[];
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
    allocationAssessment: string;
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
    optimalAllocation: {
      assetClass: string;
      weight: number;
    }[];
    expectedReturn: number;
    expectedVolatility: number;
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
