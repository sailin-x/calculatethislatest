export interface BreakEvenAnalysisInputs {
  // Product/Service information
  productInfo: {
    productId: string;
    productName: string;
    productType: 'product' | 'service' | 'subscription' | 'project';
    unitPrice: number;
    unitCost: number;
    contributionMargin: number;
    contributionMarginPercentage: number;
    salesVolume: number;
    capacity: number;
    productionEfficiency: number;
  }[];
  
  // Cost structure
  costStructure: {
    fixedCosts: {
      costId: string;
      costName: string;
      costCategory: 'rent' | 'utilities' | 'salaries' | 'insurance' | 'depreciation' | 'marketing' | 'administrative' | 'other';
      monthlyAmount: number;
      annualAmount: number;
      isEssential: boolean;
      canBeReduced: boolean;
      reductionPotential: number;
    }[];
    variableCosts: {
      costId: string;
      costName: string;
      costCategory: 'materials' | 'labor' | 'commission' | 'shipping' | 'packaging' | 'utilities' | 'other';
      perUnitCost: number;
      totalCost: number;
      costDriver: string;
      efficiency: number;
    }[];
    semiVariableCosts: {
      costId: string;
      costName: string;
      costCategory: string;
      fixedComponent: number;
      variableComponent: number;
      perUnitVariable: number;
      breakPoint: number;
    }[];
  };
  
  // Revenue structure
  revenueStructure: {
    revenueStreams: {
      streamId: string;
      streamName: string;
      streamType: 'sales' | 'subscription' | 'service' | 'licensing' | 'advertising' | 'other';
      unitPrice: number;
      expectedVolume: number;
      growthRate: number;
      seasonality: {
        january: number;
        february: number;
        march: number;
        april: number;
        may: number;
        june: number;
        july: number;
        august: number;
        september: number;
        october: number;
        november: number;
        december: number;
      };
    }[];
    pricingStrategy: {
      strategy: 'cost-plus' | 'value-based' | 'competitive' | 'penetration' | 'skimming' | 'dynamic';
      markup: number;
      targetMargin: number;
      priceElasticity: number;
      competitivePricing: {
        competitor: string;
        price: number;
        marketShare: number;
      }[];
    };
  };
  
  // Market analysis
  marketAnalysis: {
    marketSize: {
      totalAddressableMarket: number;
      serviceableAddressableMarket: number;
      serviceableObtainableMarket: number;
      currentMarketShare: number;
      targetMarketShare: number;
    };
    demandAnalysis: {
      currentDemand: number;
      projectedDemand: number;
      demandGrowth: number;
      seasonality: boolean;
      cyclicalFactors: string[];
    };
    competitiveAnalysis: {
      competitors: {
        competitor: string;
        marketShare: number;
        pricing: number;
        costStructure: string;
        competitiveAdvantage: string[];
      }[];
      competitiveIntensity: number;
      entryBarriers: string[];
      exitBarriers: string[];
    };
  };
  
  // Break-even parameters
  breakEvenParameters: {
    analysisPeriod: {
      startDate: Date;
      endDate: Date;
      periodType: 'monthly' | 'quarterly' | 'yearly' | 'custom';
    };
    breakEvenType: 'unit' | 'revenue' | 'time' | 'comprehensive';
    includeTaxes: boolean;
    taxRate: number;
    includeInflation: boolean;
    inflationRate: number;
    includeDiscounting: boolean;
    discountRate: number;
    sensitivityAnalysis: {
      enableSensitivity: boolean;
      variables: string[];
      ranges: {
        variable: string;
        minValue: number;
        maxValue: number;
        stepSize: number;
      }[];
    };
  };
  
  // Operational factors
  operationalFactors: {
    productionCapacity: {
      currentCapacity: number;
      maximumCapacity: number;
      capacityUtilization: number;
      capacityExpansion: {
        cost: number;
        additionalCapacity: number;
        paybackPeriod: number;
      };
    };
    efficiencyMetrics: {
      productionEfficiency: number;
      laborEfficiency: number;
      materialEfficiency: number;
      qualityRate: number;
      downtime: number;
    };
    supplyChain: {
      suppliers: {
        supplier: string;
        reliability: number;
        leadTime: number;
        cost: number;
        quality: number;
      }[];
      inventory: {
        currentLevel: number;
        optimalLevel: number;
        holdingCost: number;
        stockoutCost: number;
      };
    };
  };
  
  // Financial factors
  financialFactors: {
    capitalStructure: {
      equity: number;
      debt: number;
      debtToEquity: number;
      interestRate: number;
      interestExpense: number;
    };
    workingCapital: {
      currentAssets: number;
      currentLiabilities: number;
      workingCapital: number;
      cashCycle: number;
      cashRequirements: number;
    };
    cashFlow: {
      operatingCashFlow: number;
      investingCashFlow: number;
      financingCashFlow: number;
      freeCashFlow: number;
      cashBurnRate: number;
    };
  };
  
  // Risk factors
  riskFactors: {
    marketRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    operationalRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    financialRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    externalRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
  };
  
  // Scenario analysis
  scenarioAnalysis: {
    scenarios: {
      scenarioName: string;
      scenarioType: 'best-case' | 'worst-case' | 'most-likely' | 'optimistic' | 'pessimistic';
      probability: number;
      assumptions: {
        variable: string;
        value: number;
        description: string;
      }[];
      breakEvenPoint: number;
      breakEvenRevenue: number;
      breakEvenTime: number;
    }[];
    sensitivityVariables: {
      variable: string;
      baseValue: number;
      minValue: number;
      maxValue: number;
      impact: number;
    }[];
  };
  
  // Historical data
  historicalData: {
    periods: {
      period: Date;
      sales: number;
      revenue: number;
      costs: number;
      profit: number;
      breakEvenPoint: number;
      marginOfSafety: number;
    }[];
    trends: {
      trend: string;
      direction: 'improving' | 'declining' | 'stable';
      strength: number;
      factors: string[];
    }[];
  };
  
  // Business context
  businessContext: {
    businessModel: 'b2c' | 'b2b' | 'marketplace' | 'subscription' | 'ecommerce' | 'manufacturing' | 'services';
    industry: string;
    businessStage: 'startup' | 'growth' | 'mature' | 'decline' | 'turnaround';
    businessSize: 'micro' | 'small' | 'medium' | 'large' | 'enterprise';
    geographicScope: 'local' | 'regional' | 'national' | 'international' | 'global';
    regulatoryEnvironment: string[];
  };
  
  // Analysis parameters
  analysisParameters: {
    analysisLevel: 'basic' | 'intermediate' | 'advanced' | 'comprehensive';
    includeScenarioAnalysis: boolean;
    includeSensitivityAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeHistoricalAnalysis: boolean;
    includeProjections: boolean;
    confidenceLevel: number;
    timeHorizon: number;
  };
  
  // Reporting preferences
  reporting: {
    includeDetailedBreakdown: boolean;
    includeScenarioResults: boolean;
    includeSensitivityResults: boolean;
    includeRiskAssessment: boolean;
    includeHistoricalAnalysis: boolean;
    includeProjections: boolean;
    includeRecommendations: boolean;
    includeActionPlan: boolean;
    includeVisualizations: boolean;
  };
}

export interface BreakEvenAnalysisResults {
  // Core break-even metrics
  breakEvenMetrics: {
    breakEvenPoint: number;
    breakEvenRevenue: number;
    breakEvenTime: number;
    marginOfSafety: number;
    marginOfSafetyPercentage: number;
    contributionMargin: number;
    contributionMarginPercentage: number;
    profitVolumeRatio: number;
    operatingLeverage: number;
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    unitBreakEven: {
      units: number;
      revenue: number;
      time: number;
      assumptions: string[];
    };
    revenueBreakEven: {
      revenue: number;
      units: number;
      time: number;
      assumptions: string[];
    };
    timeBreakEven: {
      time: number;
      units: number;
      revenue: number;
      assumptions: string[];
    };
    comprehensiveBreakEven: {
      breakEvenPoint: number;
      breakEvenRevenue: number;
      breakEvenTime: number;
      marginOfSafety: number;
      assumptions: string[];
    };
  };
  
  // Cost analysis
  costAnalysis: {
    totalFixedCosts: number;
    totalVariableCosts: number;
    totalSemiVariableCosts: number;
    totalCosts: number;
    costBreakdown: {
      category: string;
      amount: number;
      percentage: number;
      type: 'fixed' | 'variable' | 'semi-variable';
    }[];
    costStructure: {
      fixedCostPercentage: number;
      variableCostPercentage: number;
      semiVariableCostPercentage: number;
    };
    costEfficiency: {
      efficiency: number;
      improvement: number;
      potential: number;
    };
  };
  
  // Revenue analysis
  revenueAnalysis: {
    totalRevenue: number;
    revenueBreakdown: {
      stream: string;
      amount: number;
      percentage: number;
      contribution: number;
    }[];
    revenueProjections: {
      period: Date;
      projectedRevenue: number;
      projectedUnits: number;
      growthRate: number;
    }[];
    revenueEfficiency: {
      efficiency: number;
      improvement: number;
      potential: number;
    };
  };
  
  // Profitability analysis
  profitabilityAnalysis: {
    grossProfit: number;
    grossMargin: number;
    operatingProfit: number;
    operatingMargin: number;
    netProfit: number;
    netMargin: number;
    profitabilityTrends: {
      period: Date;
      grossMargin: number;
      operatingMargin: number;
      netMargin: number;
      trend: 'improving' | 'declining' | 'stable';
    }[];
    profitabilityDrivers: {
      driver: string;
      impact: number;
      contribution: number;
    }[];
  };
  
  // Scenario analysis results
  scenarioResults: {
    scenarios: {
      scenarioName: string;
      scenarioType: string;
      probability: number;
      breakEvenPoint: number;
      breakEvenRevenue: number;
      breakEvenTime: number;
      marginOfSafety: number;
      profit: number;
      risk: string;
    }[];
    scenarioComparison: {
      scenario1: string;
      scenario2: string;
      breakEvenDifference: number;
      revenueDifference: number;
      timeDifference: number;
      riskDifference: number;
    }[];
    bestScenario: {
      scenario: string;
      rationale: string;
      expectedOutcomes: string[];
    };
  };
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    variables: {
      variable: string;
      baseValue: number;
      breakEvenImpact: number;
      revenueImpact: number;
      timeImpact: number;
      sensitivity: 'low' | 'medium' | 'high';
    }[];
    criticalFactors: {
      factor: string;
      sensitivity: number;
      impact: number;
      mitigation: string;
    }[];
    sensitivityMatrix: {
      variable: string;
      values: number[];
      breakEvenPoints: number[];
      revenues: number[];
      times: number[];
    }[];
  };
  
  // Risk assessment
  riskAssessment: {
    marketRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    operationalRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    financialRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Market analysis
  marketAnalysis: {
    marketPosition: {
      marketShare: number;
      competitivePosition: string;
      marketGrowth: number;
      marketPotential: number;
    };
    demandAnalysis: {
      currentDemand: number;
      projectedDemand: number;
      demandGrowth: number;
      demandElasticity: number;
    };
    competitiveAnalysis: {
      competitiveIntensity: number;
      competitiveAdvantages: string[];
      competitiveDisadvantages: string[];
      marketOpportunities: string[];
      marketThreats: string[];
    };
  };
  
  // Operational analysis
  operationalAnalysis: {
    capacityAnalysis: {
      currentCapacity: number;
      capacityUtilization: number;
      capacityGap: number;
      capacityExpansion: {
        required: boolean;
        cost: number;
        paybackPeriod: number;
        roi: number;
      };
    };
    efficiencyAnalysis: {
      overallEfficiency: number;
      productionEfficiency: number;
      laborEfficiency: number;
      materialEfficiency: number;
      improvement: number;
    };
    supplyChainAnalysis: {
      supplierReliability: number;
      leadTime: number;
      inventoryEfficiency: number;
      supplyChainRisk: number;
    };
  };
  
  // Financial analysis
  financialAnalysis: {
    capitalStructure: {
      debtToEquity: number;
      interestCoverage: number;
      financialLeverage: number;
      costOfCapital: number;
    };
    cashFlowAnalysis: {
      operatingCashFlow: number;
      freeCashFlow: number;
      cashBurnRate: number;
      cashRunway: number;
    };
    workingCapitalAnalysis: {
      workingCapital: number;
      cashCycle: number;
      cashRequirements: number;
      workingCapitalEfficiency: number;
    };
  };
  
  // Break-even efficiency
  breakEvenEfficiency: {
    overallEfficiency: number;
    efficiencyByProduct: {
      product: string;
      efficiency: number;
      improvement: number;
      potential: number;
    }[];
    efficiencyByPeriod: {
      period: Date;
      efficiency: number;
      trend: 'improving' | 'declining' | 'stable';
    }[];
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    costOptimization: {
      opportunity: string;
      currentCost: number;
      potentialCost: number;
      savings: number;
      implementation: string;
      paybackPeriod: number;
      priority: 'high' | 'medium' | 'low';
    }[];
    revenueOptimization: {
      opportunity: string;
      currentRevenue: number;
      potentialRevenue: number;
      increase: number;
      implementation: string;
      timeline: string;
      priority: 'high' | 'medium' | 'low';
    }[];
    operationalOptimization: {
      opportunity: string;
      currentEfficiency: number;
      potentialEfficiency: number;
      improvement: number;
      implementation: string;
      timeline: string;
      priority: 'high' | 'medium' | 'low';
    }[];
  };
  
  // Business impact
  businessImpact: {
    profitabilityImpact: {
      currentProfit: number;
      potentialProfit: number;
      profitOpportunity: number;
      impact: number;
    };
    cashFlowImpact: {
      currentCashFlow: number;
      potentialCashFlow: number;
      cashFlowOpportunity: number;
      impact: number;
    };
    marketImpact: {
      currentMarketShare: number;
      potentialMarketShare: number;
      marketShareOpportunity: number;
      impact: number;
    };
  };
  
  // Comprehensive report
  report: string;
  
  // Executive summary
  executiveSummary: {
    breakEvenPoint: number;
    breakEvenRevenue: number;
    breakEvenTime: number;
    marginOfSafety: number;
    keyFindings: string[];
    criticalFactors: string[];
    recommendations: string[];
    riskLevel: string;
    nextSteps: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementation: string;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
    cost: number;
  }[];
}
