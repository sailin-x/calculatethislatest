export interface BreakEvenAnalysisInputs {
  // Business Information
  businessInfo: {
    businessName: string;
    businessType: 'manufacturing' | 'retail' | 'service' | 'technology' | 'healthcare' | 'financial' | 'real_estate' | 'consulting' | 'restaurant' | 'ecommerce' | 'other';
    businessCategory: 'startup' | 'small_business' | 'medium_business' | 'large_corporation' | 'franchise' | 'nonprofit' | 'other';
    businessStage: 'startup' | 'growth' | 'mature' | 'decline' | 'turnaround';
    businessModel: 'b2b' | 'b2c' | 'b2b2c' | 'marketplace' | 'subscription' | 'franchise' | 'other';
    businessDescription: string;
  };
  
  // Revenue Information
  revenueInfo: {
    // Revenue Streams
    revenueStreams: {
      stream: string;
      type: 'product_sales' | 'service_fees' | 'subscription' | 'licensing' | 'advertising' | 'commission' | 'other';
      price: number;
      volume: number;
      totalRevenue: number;
      growthRate: number;
    }[];
    
    // Pricing Strategy
    pricingStrategy: {
      strategy: 'cost_plus' | 'value_based' | 'competitive' | 'penetration' | 'skimming' | 'dynamic' | 'other';
      basePrice: number;
      discountRate: number;
      markupPercentage: number;
      priceElasticity: number;
    };
    
    // Sales Projections
    salesProjections: {
      period: string;
      units: number;
      price: number;
      revenue: number;
      growthRate: number;
    }[];
    
    // Total Revenue
    totalRevenue: number;
    averageRevenue: number;
    revenueGrowthRate: number;
  };
  
  // Cost Information
  costInfo: {
    // Fixed Costs
    fixedCosts: {
      category: string;
      type: 'rent' | 'utilities' | 'insurance' | 'salaries' | 'depreciation' | 'marketing' | 'administrative' | 'other';
      amount: number;
      frequency: 'monthly' | 'quarterly' | 'annually';
      annualAmount: number;
    }[];
    
    // Variable Costs
    variableCosts: {
      category: string;
      type: 'materials' | 'labor' | 'commission' | 'shipping' | 'packaging' | 'utilities' | 'other';
      costPerUnit: number;
      totalCost: number;
      percentageOfRevenue: number;
    }[];
    
    // Semi-Variable Costs
    semiVariableCosts: {
      category: string;
      fixedComponent: number;
      variableComponent: number;
      totalCost: number;
    }[];
    
    // Cost Structure
    costStructure: {
      totalFixedCosts: number;
      totalVariableCosts: number;
      totalSemiVariableCosts: number;
      totalCosts: number;
      fixedCostPercentage: number;
      variableCostPercentage: number;
    };
  };
  
  // Product/Service Information
  productInfo: {
    // Products/Services
    products: {
      product: string;
      type: 'product' | 'service' | 'subscription' | 'digital' | 'physical' | 'other';
      price: number;
      variableCost: number;
      contributionMargin: number;
      contributionMarginPercentage: number;
      salesMix: number;
    }[];
    
    // Production Capacity
    productionCapacity: {
      currentCapacity: number;
      maximumCapacity: number;
      utilizationRate: number;
      capacityCost: number;
    };
    
    // Inventory
    inventory: {
      beginningInventory: number;
      endingInventory: number;
      averageInventory: number;
      inventoryTurnover: number;
      carryingCost: number;
    };
  };
  
  // Market Information
  marketInfo: {
    // Market Size
    marketSize: {
      totalAddressableMarket: number;
      serviceableAddressableMarket: number;
      serviceableObtainableMarket: number;
      marketShare: number;
    };
    
    // Competition
    competition: {
      competitors: number;
      marketConcentration: number;
      competitiveIntensity: number;
      barriersToEntry: number;
    };
    
    // Customer Information
    customerInfo: {
      customerSegments: {
        segment: string;
        size: number;
        price: number;
        cost: number;
        margin: number;
      }[];
      customerAcquisitionCost: number;
      customerLifetimeValue: number;
      retentionRate: number;
    };
  };
  
  // Financial Metrics
  financialMetrics: {
    // Profitability Metrics
    profitabilityMetrics: {
      grossMargin: number;
      operatingMargin: number;
      netMargin: number;
      contributionMargin: number;
      breakEvenMargin: number;
    };
    
    // Efficiency Metrics
    efficiencyMetrics: {
      assetTurnover: number;
      inventoryTurnover: number;
      receivablesTurnover: number;
      payablesTurnover: number;
    };
    
    // Liquidity Metrics
    liquidityMetrics: {
      currentRatio: number;
      quickRatio: number;
      cashRatio: number;
      workingCapital: number;
    };
  };
  
  // Break-even Analysis Parameters
  breakEvenParameters: {
    // Calculation Method
    calculationMethod: 'units' | 'revenue' | 'time' | 'comprehensive';
    
    // Time Period
    timePeriod: number; // in months
    analysisPeriod: 'monthly' | 'quarterly' | 'annually';
    
    // Assumptions
    assumptions: {
      priceStability: boolean;
      costStability: boolean;
      salesMixStability: boolean;
      capacityConstraints: boolean;
    };
    
    // Sensitivity Analysis
    sensitivityAnalysis: {
      priceSensitivity: number;
      costSensitivity: number;
      volumeSensitivity: number;
      fixedCostSensitivity: number;
    };
  };
  
  // Risk Factors
  riskFactors: {
    // Market Risk
    marketRisk: {
      demandRisk: number;
      competitionRisk: number;
      priceRisk: number;
      marketShockRisk: number;
    };
    
    // Operational Risk
    operationalRisk: {
      productionRisk: number;
      supplyChainRisk: number;
      qualityRisk: number;
      capacityRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      costRisk: number;
      cashFlowRisk: number;
      creditRisk: number;
      interestRateRisk: number;
    };
    
    // External Risk
    externalRisk: {
      regulatoryRisk: number;
      economicRisk: number;
      technologyRisk: number;
      environmentalRisk: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Scenarios
    scenarios: {
      scenario: string;
      probability: number;
      price: number;
      volume: number;
      fixedCosts: number;
      variableCosts: number;
      breakEvenPoint: number;
    }[];
    
    // Stress Testing
    stressTesting: {
      test: string;
      priceShock: number;
      volumeShock: number;
      costShock: number;
      breakEvenImpact: number;
    }[];
  };
  
  // Growth Projections
  growthProjections: {
    // Revenue Growth
    revenueGrowth: {
      period: string;
      growthRate: number;
      revenue: number;
      cumulativeRevenue: number;
    }[];
    
    // Cost Growth
    costGrowth: {
      period: string;
      fixedCostGrowth: number;
      variableCostGrowth: number;
      totalCostGrowth: number;
    }[];
    
    // Profitability Growth
    profitabilityGrowth: {
      period: string;
      grossProfit: number;
      operatingProfit: number;
      netProfit: number;
      margin: number;
    }[];
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in months
  includeTaxes: boolean;
  includeInflation: boolean;
  includeSeasonality: boolean;
  includeGrowth: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeMultipleProducts: boolean;
    includeTimeValue: boolean;
    includeRiskAdjustment: boolean;
    includeSensitivityAnalysis: boolean;
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePriceVolatility: boolean;
  includeVolumeVolatility: boolean;
  includeCostVolatility: boolean;
  
  // Historical Analysis
  historicalData: {
    period: string;
    revenue: number;
    costs: number;
    profit: number;
    units: number;
    breakEvenPoint: number;
  }[];
  
  // Reporting Preferences
  includeRevenueAnalysis: boolean;
  includeCostAnalysis: boolean;
  includeBreakEvenAnalysis: boolean;
  includeSensitivityAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeGrowthAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeMarketAnalysis: boolean;
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

export interface BreakEvenAnalysisResults {
  // Core Break-even Metrics
  breakEvenPoint: number;
  breakEvenRevenue: number;
  breakEvenUnits: number;
  breakEvenTime: number;
  marginOfSafety: number;
  
  // Break-even Analysis
  breakEvenAnalysis: {
    breakEvenPoint: number;
    breakEvenRevenue: number;
    breakEvenUnits: number;
    breakEvenTime: number;
    breakEvenBreakdown: {
      component: string;
      value: number;
      percentage: number;
    }[];
    breakEvenEfficiency: number;
  };
  
  // Revenue Analysis
  revenueAnalysis: {
    totalRevenue: number;
    averageRevenue: number;
    revenueGrowthRate: number;
    revenueBreakdown: {
      stream: string;
      revenue: number;
      percentage: number;
    }[];
    revenueEfficiency: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    totalFixedCosts: number;
    totalVariableCosts: number;
    totalCosts: number;
    costBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    costEfficiency: number;
  };
  
  // Profitability Analysis
  profitabilityAnalysis: {
    grossProfit: number;
    operatingProfit: number;
    netProfit: number;
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    contributionMargin: number;
    profitabilityBreakdown: {
      metric: string;
      value: number;
      target: number;
      performance: string;
    }[];
    profitabilityScore: number;
  };
  
  // Margin Analysis
  marginAnalysis: {
    contributionMargin: number;
    contributionMarginPercentage: number;
    grossMargin: number;
    operatingMargin: number;
    netMargin: number;
    marginBreakdown: {
      component: string;
      margin: number;
      contribution: number;
    }[];
    marginEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowBreakEvenPoint: number;
    highBreakEvenPoint: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    breakEvenPoint: number;
    breakEvenRevenue: number;
    breakEvenUnits: number;
    riskLevel: string;
  }[];
  
  // Market Analysis
  marketAnalysis: {
    marketShare: number;
    competitivePosition: number;
    marketBreakdown: {
      factor: string;
      impact: number;
      opportunity: number;
    }[];
    marketScore: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskAdjustedBreakEvenPoint: number;
    riskScore: number;
    riskBreakdown: {
      risk: string;
      level: number;
      impact: number;
    }[];
    riskMitigation: string[];
  };
  
  // Growth Analysis
  growthAnalysis: {
    revenueGrowth: number;
    costGrowth: number;
    profitGrowth: number;
    growthBreakdown: {
      period: string;
      revenue: number;
      costs: number;
      profit: number;
    }[];
    growthEfficiency: number;
  };
  
  // Business Score
  businessScore: {
    overallScore: number;
    componentScores: {
      breakEven: number;
      profitability: number;
      efficiency: number;
      growth: number;
      risk: number;
      market: number;
    };
    recommendation: 'proceed' | 'modify' | 'reconsider' | 'abandon';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanBreakEvenPoint: number;
    medianBreakEvenPoint: number;
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
      breakEvenPoint: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalBreakEvenPoint: number;
    historicalProfitability: number;
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
    profitEnhancement: number;
    costReduction: number;
    revenueGrowth: number;
    riskReduction: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    businessAssessment: string;
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
    breakEvenPoint: number;
    breakEvenRevenue: number;
    marginOfSafety: number;
    recommendation: 'proceed' | 'modify' | 'reconsider' | 'abandon';
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
