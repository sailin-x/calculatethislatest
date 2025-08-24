export interface RiskManagementCalculatorInputs {
  // Portfolio Information
  portfolioInfo: {
    // Basic Information
    basicInfo: {
      portfolioName: string;
      portfolioType: 'equity' | 'fixed_income' | 'balanced' | 'alternative' | 'multi_asset';
      totalValue: number;
      currency: string;
      benchmark: string;
      inceptionDate: string;
      lastRebalanceDate: string;
      nextRebalanceDate: string;
      rebalancingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
      riskTolerance: 'conservative' | 'moderate' | 'aggressive' | 'very_aggressive';
      investmentHorizon: number;
      liquidityRequirements: 'high' | 'medium' | 'low';
    };
    
    // Portfolio Holdings
    portfolioHoldings: {
      asset: string;
      symbol: string;
      assetType: 'stock' | 'bond' | 'etf' | 'mutual_fund' | 'commodity' | 'real_estate' | 'derivative' | 'cash';
      quantity: number;
      price: number;
      marketValue: number;
      weight: number;
      sector: string;
      country: string;
      currency: string;
      beta: number;
      volatility: number;
      correlation: number;
      expectedReturn: number;
      riskFreeRate: number;
      marketReturn: number;
    }[];
    
    // Asset Allocation
    assetAllocation: {
      assetClass: string;
      marketValue: number;
      weight: number;
      targetWeight: number;
      deviation: number;
      expectedReturn: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
    }[];
    
    // Sector Allocation
    sectorAllocation: {
      sector: string;
      marketValue: number;
      weight: number;
      targetWeight: number;
      deviation: number;
      expectedReturn: number;
      volatility: number;
      correlation: number;
    }[];
    
    // Geographic Allocation
    geographicAllocation: {
      country: string;
      marketValue: number;
      weight: number;
      targetWeight: number;
      deviation: number;
      expectedReturn: number;
      volatility: number;
      correlation: number;
      politicalRisk: number;
      currencyRisk: number;
    }[];
  };
  
  // Risk Metrics
  riskMetrics: {
    // Volatility Metrics
    volatilityMetrics: {
      portfolioVolatility: number;
      annualizedVolatility: number;
      dailyVolatility: number;
      weeklyVolatility: number;
      monthlyVolatility: number;
      rollingVolatility: {
        period: number;
        volatility: number;
      }[];
      volatilityDecomposition: {
        factor: string;
        contribution: number;
        percentage: number;
      }[];
    };
    
    // Value at Risk (VaR)
    valueAtRisk: {
      confidenceLevel: number;
      timeHorizon: number;
      historicalVaR: number;
      parametricVaR: number;
      monteCarloVaR: number;
      conditionalVaR: number;
      expectedShortfall: number;
      varDecomposition: {
        asset: string;
        contribution: number;
        percentage: number;
      }[];
    };
    
    // Expected Shortfall
    expectedShortfall: {
      confidenceLevel: number;
      timeHorizon: number;
      historicalES: number;
      parametricES: number;
      monteCarloES: number;
      esDecomposition: {
        asset: string;
        contribution: number;
        percentage: number;
      }[];
    };
    
    // Beta and Systematic Risk
    systematicRisk: {
      portfolioBeta: number;
      marketBeta: number;
      sectorBetas: {
        sector: string;
        beta: number;
        weight: number;
        contribution: number;
      }[];
      assetBetas: {
        asset: string;
        beta: number;
        weight: number;
        contribution: number;
      }[];
      systematicRisk: number;
      idiosyncraticRisk: number;
      totalRisk: number;
    };
    
    // Correlation Analysis
    correlationAnalysis: {
      averageCorrelation: number;
      correlationMatrix: {
        asset1: string;
        asset2: string;
        correlation: number;
      }[];
      correlationClusters: {
        cluster: string;
        assets: string[];
        averageCorrelation: number;
      }[];
      diversificationRatio: number;
      effectiveN: number;
    };
    
    // Drawdown Analysis
    drawdownAnalysis: {
      currentDrawdown: number;
      maxDrawdown: number;
      maxDrawdownDuration: number;
      averageDrawdown: number;
      drawdownFrequency: number;
      recoveryTime: number;
      drawdownHistory: {
        date: string;
        drawdown: number;
        duration: number;
      }[];
    };
    
    // Tracking Error
    trackingError: {
      trackingError: number;
      informationRatio: number;
      activeShare: number;
      factorExposure: {
        factor: string;
        exposure: number;
        contribution: number;
      }[];
      riskDecomposition: {
        factor: string;
        contribution: number;
        percentage: number;
      }[];
    };
  };
  
  // Risk Factors
  riskFactors: {
    // Market Risk Factors
    marketRiskFactors: {
      factor: string;
      exposure: number;
      sensitivity: number;
      contribution: number;
      volatility: number;
      correlation: number;
    }[];
    
    // Interest Rate Risk
    interestRateRisk: {
      duration: number;
      modifiedDuration: number;
      convexity: number;
      keyRateDurations: {
        maturity: number;
        duration: number;
        contribution: number;
      }[];
      yieldCurveRisk: number;
      basisRisk: number;
      totalInterestRateRisk: number;
    };
    
    // Credit Risk
    creditRisk: {
      creditSpread: number;
      defaultProbability: number;
      recoveryRate: number;
      creditVaR: number;
      creditExposure: {
        rating: string;
        exposure: number;
        defaultProbability: number;
        expectedLoss: number;
      }[];
      sectorCreditRisk: {
        sector: string;
        exposure: number;
        averageRating: string;
        creditRisk: number;
      }[];
      totalCreditRisk: number;
    };
    
    // Currency Risk
    currencyRisk: {
      currencyExposure: {
        currency: string;
        exposure: number;
        volatility: number;
        correlation: number;
        risk: number;
      }[];
      hedgingRatio: number;
      unhedgedRisk: number;
      hedgedRisk: number;
      totalCurrencyRisk: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      liquidityMetrics: {
        asset: string;
        bidAskSpread: number;
        tradingVolume: number;
        marketDepth: number;
        timeToLiquidate: number;
        liquidityScore: number;
      }[];
      portfolioLiquidity: number;
      liquidityVaR: number;
      stressLiquidity: number;
      totalLiquidityRisk: number;
    };
    
    // Operational Risk
    operationalRisk: {
      operationalRiskScore: number;
      riskCategories: {
        category: string;
        riskScore: number;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      totalOperationalRisk: number;
    };
    
    // Regulatory Risk
    regulatoryRisk: {
      regulatoryCompliance: number;
      capitalRequirements: number;
      leverageRatio: number;
      liquidityCoverageRatio: number;
      netStableFundingRatio: number;
      regulatoryRiskScore: number;
    };
  };
  
  // Stress Testing
  stressTesting: {
    // Historical Scenarios
    historicalScenarios: {
      scenario: string;
      date: string;
      description: string;
      marketShock: number;
      interestRateShock: number;
      currencyShock: number;
      creditShock: number;
      impact: number;
      probability: number;
    }[];
    
    // Hypothetical Scenarios
    hypotheticalScenarios: {
      scenario: string;
      description: string;
      marketShock: number;
      interestRateShock: number;
      currencyShock: number;
      creditShock: number;
      liquidityShock: number;
      correlationBreakdown: boolean;
      impact: number;
      probability: number;
    }[];
    
    // Sensitivity Analysis
    sensitivityAnalysis: {
      factor: string;
      baseValue: number;
      shock: number;
      impact: number;
      sensitivity: number;
    }[];
    
    // Reverse Stress Testing
    reverseStressTesting: {
      targetLoss: number;
      requiredShock: number;
      scenario: string;
      probability: number;
    }[];
  };
  
  // Risk Limits
  riskLimits: {
    // Position Limits
    positionLimits: {
      maxPositionSize: number;
      maxSectorWeight: number;
      maxCountryWeight: number;
      maxCurrencyExposure: number;
      maxLeverage: number;
      minLiquidity: number;
    };
    
    // Risk Limits
    riskLimits: {
      maxVolatility: number;
      maxVaR: number;
      maxDrawdown: number;
      maxTrackingError: number;
      maxBeta: number;
      maxDuration: number;
      maxCreditExposure: number;
      maxCurrencyRisk: number;
    };
    
    // Concentration Limits
    concentrationLimits: {
      maxSingleAssetWeight: number;
      maxTopTenWeight: number;
      maxSectorConcentration: number;
      maxCountryConcentration: number;
      maxIssuerConcentration: number;
    };
    
    // Liquidity Limits
    liquidityLimits: {
      minLiquidityRatio: number;
      maxIlliquidAssets: number;
      minCashReserve: number;
      maxRedemptionRisk: number;
    };
  };
  
  // Risk Attribution
  riskAttribution: {
    // Factor Attribution
    factorAttribution: {
      factor: string;
      exposure: number;
      riskContribution: number;
      returnContribution: number;
      informationRatio: number;
    }[];
    
    // Asset Attribution
    assetAttribution: {
      asset: string;
      weight: number;
      return: number;
      risk: number;
      riskContribution: number;
      returnContribution: number;
      sharpeRatio: number;
    }[];
    
    // Sector Attribution
    sectorAttribution: {
      sector: string;
      weight: number;
      return: number;
      risk: number;
      riskContribution: number;
      returnContribution: number;
      informationRatio: number;
    }[];
    
    // Geographic Attribution
    geographicAttribution: {
      country: string;
      weight: number;
      return: number;
      risk: number;
      riskContribution: number;
      returnContribution: number;
      informationRatio: number;
    }[];
  };
  
  // Risk Monitoring
  riskMonitoring: {
    // Risk Alerts
    riskAlerts: {
      alert: string;
      type: 'warning' | 'critical' | 'info';
      severity: 'low' | 'medium' | 'high';
      threshold: number;
      currentValue: number;
      breach: boolean;
      action: string;
    }[];
    
    // Risk Dashboard
    riskDashboard: {
      metric: string;
      currentValue: number;
      targetValue: number;
      limit: number;
      status: 'green' | 'yellow' | 'red';
      trend: 'improving' | 'stable' | 'deteriorating';
    }[];
    
    // Risk Reports
    riskReports: {
      report: string;
      frequency: string;
      lastGenerated: string;
      nextDue: string;
      recipients: string[];
      status: 'pending' | 'generated' | 'delivered';
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeMarketRisk: boolean;
  includeInterestRateRisk: boolean;
  includeCreditRisk: boolean;
  includeCurrencyRisk: boolean;
  includeLiquidityRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeRiskMetrics: boolean;
    includeRiskFactors: boolean;
    includeStressTesting: boolean;
    includeRiskLimits: boolean;
    includeRiskAttribution: boolean;
    includeRiskMonitoring: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    portfolioValue: number;
    return: number;
    volatility: number;
    var: number;
    drawdown: number;
    trackingError: number;
  }[];
  
  // Reporting Preferences
  includeRiskMetrics: boolean;
  includeRiskFactors: boolean;
  includeStressTesting: boolean;
  includeRiskLimits: boolean;
  includeRiskAttribution: boolean;
  includeRiskMonitoring: boolean;
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

export interface RiskManagementCalculatorResults {
  // Core Risk Metrics
  portfolioVolatility: number;
  valueAtRisk: number;
  expectedShortfall: number;
  maxDrawdown: number;
  sharpeRatio: number;
  informationRatio: number;
  
  // Risk Analysis
  riskAnalysis: {
    portfolioVolatility: number;
    valueAtRisk: number;
    expectedShortfall: number;
    maxDrawdown: number;
    sharpeRatio: number;
    informationRatio: number;
    riskBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    riskEfficiency: number;
  };
  
  // Portfolio Analysis
  portfolioAnalysis: {
    portfolioHoldings: {
      asset: string;
      symbol: string;
      assetType: string;
      quantity: number;
      price: number;
      marketValue: number;
      weight: number;
      sector: string;
      country: string;
      currency: string;
      beta: number;
      volatility: number;
      correlation: number;
      expectedReturn: number;
      riskFreeRate: number;
      marketReturn: number;
    }[];
    assetAllocation: {
      assetClass: string;
      marketValue: number;
      weight: number;
      targetWeight: number;
      deviation: number;
      expectedReturn: number;
      volatility: number;
      sharpeRatio: number;
      maxDrawdown: number;
    }[];
    sectorAllocation: {
      sector: string;
      marketValue: number;
      weight: number;
      targetWeight: number;
      deviation: number;
      expectedReturn: number;
      volatility: number;
      correlation: number;
    }[];
    geographicAllocation: {
      country: string;
      marketValue: number;
      weight: number;
      targetWeight: number;
      deviation: number;
      expectedReturn: number;
      volatility: number;
      correlation: number;
      politicalRisk: number;
      currencyRisk: number;
    }[];
    portfolioEfficiency: number;
  };
  
  // Risk Metrics Analysis
  riskMetricsAnalysis: {
    volatilityMetrics: {
      portfolioVolatility: number;
      annualizedVolatility: number;
      dailyVolatility: number;
      weeklyVolatility: number;
      monthlyVolatility: number;
      rollingVolatility: {
        period: number;
        volatility: number;
      }[];
      volatilityDecomposition: {
        factor: string;
        contribution: number;
        percentage: number;
      }[];
    };
    valueAtRisk: {
      confidenceLevel: number;
      timeHorizon: number;
      historicalVaR: number;
      parametricVaR: number;
      monteCarloVaR: number;
      conditionalVaR: number;
      expectedShortfall: number;
      varDecomposition: {
        asset: string;
        contribution: number;
        percentage: number;
      }[];
    };
    expectedShortfall: {
      confidenceLevel: number;
      timeHorizon: number;
      historicalES: number;
      parametricES: number;
      monteCarloES: number;
      esDecomposition: {
        asset: string;
        contribution: number;
        percentage: number;
      }[];
    };
    systematicRisk: {
      portfolioBeta: number;
      marketBeta: number;
      sectorBetas: {
        sector: string;
        beta: number;
        weight: number;
        contribution: number;
      }[];
      assetBetas: {
        asset: string;
        beta: number;
        weight: number;
        contribution: number;
      }[];
      systematicRisk: number;
      idiosyncraticRisk: number;
      totalRisk: number;
    };
    correlationAnalysis: {
      averageCorrelation: number;
      correlationMatrix: {
        asset1: string;
        asset2: string;
        correlation: number;
      }[];
      correlationClusters: {
        cluster: string;
        assets: string[];
        averageCorrelation: number;
      }[];
      diversificationRatio: number;
      effectiveN: number;
    };
    drawdownAnalysis: {
      currentDrawdown: number;
      maxDrawdown: number;
      maxDrawdownDuration: number;
      averageDrawdown: number;
      drawdownFrequency: number;
      recoveryTime: number;
      drawdownHistory: {
        date: string;
        drawdown: number;
        duration: number;
      }[];
    };
    trackingError: {
      trackingError: number;
      informationRatio: number;
      activeShare: number;
      factorExposure: {
        factor: string;
        exposure: number;
        contribution: number;
      }[];
      riskDecomposition: {
        factor: string;
        contribution: number;
        percentage: number;
      }[];
    };
    riskMetricsEfficiency: number;
  };
  
  // Risk Factors Analysis
  riskFactorsAnalysis: {
    marketRiskFactors: {
      factor: string;
      exposure: number;
      sensitivity: number;
      contribution: number;
      volatility: number;
      correlation: number;
    }[];
    interestRateRisk: {
      duration: number;
      modifiedDuration: number;
      convexity: number;
      keyRateDurations: {
        maturity: number;
        duration: number;
        contribution: number;
      }[];
      yieldCurveRisk: number;
      basisRisk: number;
      totalInterestRateRisk: number;
    };
    creditRisk: {
      creditSpread: number;
      defaultProbability: number;
      recoveryRate: number;
      creditVaR: number;
      creditExposure: {
        rating: string;
        exposure: number;
        defaultProbability: number;
        expectedLoss: number;
      }[];
      sectorCreditRisk: {
        sector: string;
        exposure: number;
        averageRating: string;
        creditRisk: number;
      }[];
      totalCreditRisk: number;
    };
    currencyRisk: {
      currencyExposure: {
        currency: string;
        exposure: number;
        volatility: number;
        correlation: number;
        risk: number;
      }[];
      hedgingRatio: number;
      unhedgedRisk: number;
      hedgedRisk: number;
      totalCurrencyRisk: number;
    };
    liquidityRisk: {
      liquidityMetrics: {
        asset: string;
        bidAskSpread: number;
        tradingVolume: number;
        marketDepth: number;
        timeToLiquidate: number;
        liquidityScore: number;
      }[];
      portfolioLiquidity: number;
      liquidityVaR: number;
      stressLiquidity: number;
      totalLiquidityRisk: number;
    };
    operationalRisk: {
      operationalRiskScore: number;
      riskCategories: {
        category: string;
        riskScore: number;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      totalOperationalRisk: number;
    };
    regulatoryRisk: {
      regulatoryCompliance: number;
      capitalRequirements: number;
      leverageRatio: number;
      liquidityCoverageRatio: number;
      netStableFundingRatio: number;
      regulatoryRiskScore: number;
    };
    riskFactorsEfficiency: number;
  };
  
  // Stress Testing Analysis
  stressTestingAnalysis: {
    historicalScenarios: {
      scenario: string;
      date: string;
      description: string;
      marketShock: number;
      interestRateShock: number;
      currencyShock: number;
      creditShock: number;
      impact: number;
      probability: number;
    }[];
    hypotheticalScenarios: {
      scenario: string;
      description: string;
      marketShock: number;
      interestRateShock: number;
      currencyShock: number;
      creditShock: number;
      liquidityShock: number;
      correlationBreakdown: boolean;
      impact: number;
      probability: number;
    }[];
    sensitivityAnalysis: {
      factor: string;
      baseValue: number;
      shock: number;
      impact: number;
      sensitivity: number;
    }[];
    reverseStressTesting: {
      targetLoss: number;
      requiredShock: number;
      scenario: string;
      probability: number;
    }[];
    stressTestingEfficiency: number;
  };
  
  // Risk Limits Analysis
  riskLimitsAnalysis: {
    positionLimits: {
      maxPositionSize: number;
      maxSectorWeight: number;
      maxCountryWeight: number;
      maxCurrencyExposure: number;
      maxLeverage: number;
      minLiquidity: number;
    };
    riskLimits: {
      maxVolatility: number;
      maxVaR: number;
      maxDrawdown: number;
      maxTrackingError: number;
      maxBeta: number;
      maxDuration: number;
      maxCreditExposure: number;
      maxCurrencyRisk: number;
    };
    concentrationLimits: {
      maxSingleAssetWeight: number;
      maxTopTenWeight: number;
      maxSectorConcentration: number;
      maxCountryConcentration: number;
      maxIssuerConcentration: number;
    };
    liquidityLimits: {
      minLiquidityRatio: number;
      maxIlliquidAssets: number;
      minCashReserve: number;
      maxRedemptionRisk: number;
    };
    limitBreaches: {
      limit: string;
      currentValue: number;
      limitValue: number;
      breach: number;
      severity: string;
      action: string;
    }[];
    riskLimitsEfficiency: number;
  };
  
  // Risk Attribution Analysis
  riskAttributionAnalysis: {
    factorAttribution: {
      factor: string;
      exposure: number;
      riskContribution: number;
      returnContribution: number;
      informationRatio: number;
    }[];
    assetAttribution: {
      asset: string;
      weight: number;
      return: number;
      risk: number;
      riskContribution: number;
      returnContribution: number;
      sharpeRatio: number;
    }[];
    sectorAttribution: {
      sector: string;
      weight: number;
      return: number;
      risk: number;
      riskContribution: number;
      returnContribution: number;
      informationRatio: number;
    }[];
    geographicAttribution: {
      country: string;
      weight: number;
      return: number;
      risk: number;
      riskContribution: number;
      returnContribution: number;
      informationRatio: number;
    }[];
    riskAttributionEfficiency: number;
  };
  
  // Risk Monitoring Analysis
  riskMonitoringAnalysis: {
    riskAlerts: {
      alert: string;
      type: string;
      severity: string;
      threshold: number;
      currentValue: number;
      breach: boolean;
      action: string;
    }[];
    riskDashboard: {
      metric: string;
      currentValue: number;
      targetValue: number;
      limit: number;
      status: string;
      trend: string;
    }[];
    riskReports: {
      report: string;
      frequency: string;
      lastGenerated: string;
      nextDue: string;
      recipients: string[];
      status: string;
    }[];
    riskMonitoringEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowRisk: number;
    highRisk: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    impact: number;
    risk: number;
    recommendation: string;
  }[];
  
  // Risk Management Planning Analysis
  riskManagementPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    riskStrategies: {
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
    alternativeStrategies: {
      strategy: string;
      expectedReturn: number;
      risk: number;
      efficiency: number;
    }[];
    benchmarkComparison: {
      benchmark: string;
      benchmarkRisk: number;
      portfolioRisk: number;
      difference: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Risk Management Score
  riskManagementScore: {
    overallScore: number;
    componentScores: {
      portfolio: number;
      riskMetrics: number;
      riskFactors: number;
      stressTesting: number;
      riskLimits: number;
      monitoring: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanRisk: number;
    medianRisk: number;
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
    historicalRisk: number;
    historicalReturn: number;
    historicalVolatility: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    riskReduction: number;
    returnEnhancement: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    riskAssessment: string;
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
    portfolioVolatility: number;
    valueAtRisk: number;
    expectedShortfall: number;
    maxDrawdown: number;
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
