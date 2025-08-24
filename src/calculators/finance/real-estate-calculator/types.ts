export interface RealEstateCalculatorInputs {
  // Property Information
  propertyInfo: {
    // Property Details
    propertyDetails: {
      propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'industrial' | 'land' | 'mixed_use' | 'other';
      propertyAddress: string;
      propertyCity: string;
      propertyState: string;
      propertyZipCode: string;
      propertyCountry: string;
      propertySize: number; // square feet
      lotSize: number; // square feet
      yearBuilt: number;
      bedrooms: number;
      bathrooms: number;
      parkingSpaces: number;
      propertyCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_renovation';
      propertyDescription: string;
    };
    
    // Property Features
    propertyFeatures: {
      features: string[];
      amenities: string[];
      utilities: string[];
      appliances: string[];
      heatingType: string;
      coolingType: string;
      foundationType: string;
      roofType: string;
      exteriorMaterial: string;
      interiorFeatures: string[];
    };
    
    // Property Classification
    propertyClassification: {
      zoning: string;
      landUse: string;
      propertyTaxClass: string;
      assessmentClass: string;
      floodZone: boolean;
      floodZoneType: string;
      environmentalHazards: string[];
      historicalDesignation: boolean;
      historicalDetails: string;
    };
  };
  
  // Financial Information
  financialInfo: {
    // Purchase Information
    purchaseInfo: {
      purchasePrice: number;
      downPayment: number;
      downPaymentPercentage: number;
      loanAmount: number;
      loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'arm' | 'balloon' | 'other';
      interestRate: number;
      loanTerm: number; // in years
      points: number;
      closingCosts: number;
      totalInvestment: number;
      purchaseDate: string;
    };
    
    // Financing Details
    financingDetails: {
      lender: string;
      loanNumber: string;
      monthlyPayment: number;
      principalAndInterest: number;
      propertyTaxes: number;
      insurance: number;
      pmi: number;
      hoaFees: number;
      totalMonthlyPayment: number;
      annualPayment: number;
      totalInterestPaid: number;
      totalCost: number;
    };
    
    // Operating Expenses
    operatingExpenses: {
      propertyTaxes: number;
      insurance: number;
      utilities: number;
      maintenance: number;
      repairs: number;
      propertyManagement: number;
      hoaFees: number;
      landscaping: number;
      pestControl: number;
      security: number;
      totalOperatingExpenses: number;
      operatingExpenseRatio: number;
    };
    
    // Income Information
    incomeInfo: {
      rentalIncome: number;
      otherIncome: number;
      totalIncome: number;
      vacancyRate: number;
      effectiveGrossIncome: number;
      netOperatingIncome: number;
      cashFlow: number;
      cashOnCashReturn: number;
      capRate: number;
    };
  };
  
  // Market Information
  marketInfo: {
    // Market Data
    marketData: {
      marketType: 'buyers_market' | 'sellers_market' | 'balanced_market';
      averageDaysOnMarket: number;
      medianPrice: number;
      pricePerSquareFoot: number;
      inventoryLevel: number;
      monthsOfInventory: number;
      marketTrend: 'appreciating' | 'depreciating' | 'stable';
      appreciationRate: number;
      marketVolatility: number;
    };
    
    // Comparable Properties
    comparableProperties: {
      address: string;
      salePrice: number;
      saleDate: string;
      squareFootage: number;
      bedrooms: number;
      bathrooms: number;
      pricePerSquareFoot: number;
      daysOnMarket: number;
      condition: string;
      adjustments: number;
      adjustedPrice: number;
    }[];
    
    // Market Analysis
    marketAnalysis: {
      supplyDemandRatio: number;
      absorptionRate: number;
      marketEfficiency: number;
      marketLiquidity: number;
      marketRisk: number;
      marketOpportunity: number;
    };
  };
  
  // Investment Analysis
  investmentAnalysis: {
    // Investment Metrics
    investmentMetrics: {
      totalInvestment: number;
      equity: number;
      leverage: number;
      returnOnInvestment: number;
      returnOnEquity: number;
      internalRateOfReturn: number;
      netPresentValue: number;
      paybackPeriod: number;
      breakevenAnalysis: number;
    };
    
    // Cash Flow Analysis
    cashFlowAnalysis: {
      grossRentalIncome: number;
      vacancyLoss: number;
      effectiveGrossIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
      cashOnCashReturn: number;
      debtCoverageRatio: number;
    };
    
    // Appreciation Analysis
    appreciationAnalysis: {
      historicalAppreciation: number;
      projectedAppreciation: number;
      appreciationFactors: {
        factor: string;
        impact: number;
        probability: number;
      }[];
      appreciationScenarios: {
        scenario: string;
        appreciationRate: number;
        probability: number;
        impact: number;
      }[];
    };
    
    // Tax Analysis
    taxAnalysis: {
      propertyTaxes: number;
      incomeTaxes: number;
      depreciation: number;
      taxBenefits: number;
      taxLiability: number;
      effectiveTaxRate: number;
      taxDeductions: {
        deduction: string;
        amount: number;
        type: string;
      }[];
    };
  };
  
  // Property Management
  propertyManagement: {
    // Management Details
    managementDetails: {
      managementType: 'self_managed' | 'professional_management' | 'hybrid';
      managementFee: number;
      managementFeePercentage: number;
      managementServices: string[];
      managementCompany: string;
      managementContact: string;
      managementContract: string;
      managementTerm: number;
    };
    
    // Tenant Information
    tenantInfo: {
      tenantName: string;
      tenantPhone: string;
      tenantEmail: string;
      leaseStartDate: string;
      leaseEndDate: string;
      leaseTerm: number;
      monthlyRent: number;
      securityDeposit: number;
      petDeposit: number;
      tenantCreditScore: number;
      tenantIncome: number;
      rentToIncomeRatio: number;
    }[];
    
    // Maintenance Schedule
    maintenanceSchedule: {
      item: string;
      frequency: string;
      lastService: string;
      nextService: string;
      estimatedCost: number;
      actualCost: number;
      vendor: string;
      priority: 'low' | 'medium' | 'high' | 'critical';
    }[];
    
    // Property Improvements
    propertyImprovements: {
      improvement: string;
      description: string;
      cost: number;
      completionDate: string;
      roi: number;
      usefulLife: number;
      depreciation: number;
      impactOnValue: number;
    }[];
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Market Risk
    marketRisk: {
      priceRisk: number;
      liquidityRisk: number;
      interestRateRisk: number;
      economicRisk: number;
      marketRisk: number;
    };
    
    // Property Risk
    propertyRisk: {
      physicalRisk: number;
      environmentalRisk: number;
      legalRisk: number;
      titleRisk: number;
      propertyRisk: number;
    };
    
    // Tenant Risk
    tenantRisk: {
      vacancyRisk: number;
      defaultRisk: number;
      damageRisk: number;
      legalRisk: number;
      tenantRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      leverageRisk: number;
      cashFlowRisk: number;
      refinancingRisk: number;
      taxRisk: number;
      financialRisk: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Location Analysis
  locationAnalysis: {
    // Neighborhood Information
    neighborhoodInfo: {
      neighborhoodName: string;
      schoolDistrict: string;
      crimeRate: number;
      walkScore: number;
      transitScore: number;
      bikeScore: number;
      populationDensity: number;
      medianIncome: number;
      medianAge: number;
      employmentRate: number;
    };
    
    // Economic Indicators
    economicIndicators: {
      jobGrowth: number;
      populationGrowth: number;
      incomeGrowth: number;
      gdpGrowth: number;
      unemploymentRate: number;
      economicDiversification: number;
      economicStability: number;
    };
    
    // Infrastructure
    infrastructure: {
      highways: string[];
      publicTransport: string[];
      airports: string[];
      hospitals: string[];
      schools: string[];
      shopping: string[];
      entertainment: string[];
      parks: string[];
    };
    
    // Development Plans
    developmentPlans: {
      plan: string;
      description: string;
      timeline: string;
      impact: 'positive' | 'negative' | 'neutral';
      probability: number;
      valueImpact: number;
    }[];
  };
  
  // Valuation Analysis
  valuationAnalysis: {
    // Appraisal Information
    appraisalInfo: {
      appraisedValue: number;
      appraisalDate: string;
      appraiser: string;
      appraisalMethod: 'sales_comparison' | 'income_capitalization' | 'cost_approach' | 'hybrid';
      appraisalConfidence: number;
      appraisalNotes: string;
    };
    
    // Valuation Methods
    valuationMethods: {
      salesComparison: {
        comparableSales: {
          address: string;
          salePrice: number;
          saleDate: string;
          adjustments: number;
          adjustedPrice: number;
        }[];
        estimatedValue: number;
        confidence: number;
      };
      incomeCapitalization: {
        netOperatingIncome: number;
        capRate: number;
        estimatedValue: number;
        confidence: number;
      };
      costApproach: {
        landValue: number;
        constructionCost: number;
        depreciation: number;
        estimatedValue: number;
        confidence: number;
      };
    };
    
    // Market Value
    marketValue: {
      estimatedValue: number;
      valueRange: {
        low: number;
        high: number;
      };
      confidenceLevel: number;
      valuationDate: string;
      marketConditions: string;
    };
  };
  
  // Exit Strategy
  exitStrategy: {
    // Exit Options
    exitOptions: {
      option: 'sell' | 'refinance' | 'exchange' | 'gift' | 'inheritance' | 'other';
      description: string;
      timeline: number;
      probability: number;
      expectedReturn: number;
      costs: number;
      netReturn: number;
    }[];
    
    // Sale Analysis
    saleAnalysis: {
      estimatedSalePrice: number;
      saleCosts: number;
      netProceeds: number;
      capitalGains: number;
      taxLiability: number;
      netAfterTax: number;
      holdingPeriod: number;
      annualizedReturn: number;
    };
    
    // Refinancing Analysis
    refinancingAnalysis: {
      currentLoanBalance: number;
      newLoanAmount: number;
      newInterestRate: number;
      newLoanTerm: number;
      newMonthlyPayment: number;
      cashOutAmount: number;
      refinancingCosts: number;
      breakevenPeriod: number;
      savings: number;
    };
  };
  
  // Performance Tracking
  performanceTracking: {
    // Historical Performance
    historicalPerformance: {
      date: string;
      propertyValue: number;
      equity: number;
      cashFlow: number;
      totalReturn: number;
      appreciation: number;
      income: number;
      expenses: number;
    }[];
    
    // Performance Metrics
    performanceMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      appreciationReturn: number;
      incomeReturn: number;
      cashOnCashReturn: number;
      returnOnEquity: number;
      returnOnInvestment: number;
    };
    
    // Benchmark Comparison
    benchmarkComparison: {
      benchmark: string;
      benchmarkReturn: number;
      propertyReturn: number;
      outperformance: number;
      correlation: number;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      probability: number;
      appreciationRate: number;
      rentalGrowth: number;
      interestRate: number;
      impact: number;
      return: number;
    }[];
    
    // Economic Scenarios
    economicScenarios: {
      scenario: string;
      probability: number;
      economicGrowth: number;
      unemploymentRate: number;
      inflationRate: number;
      impact: number;
      return: number;
    }[];
    
    // Property Scenarios
    propertyScenarios: {
      scenario: string;
      probability: number;
      propertyCondition: string;
      tenantQuality: string;
      maintenanceCosts: number;
      impact: number;
      return: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePriceVolatility: boolean;
  includeRentalVolatility: boolean;
  includeExpenseVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  confidenceLevel: number;
  riskHorizon: number;
  includeTransactionCosts: boolean;
  includeTaxBenefits: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeInvestmentAnalysis: boolean;
    includeMarketAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeLocationAnalysis: boolean;
    includeValuationAnalysis: boolean;
    includeExitStrategy: boolean;
    includePerformanceTracking: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    propertyValue: number;
    rentalIncome: number;
    expenses: number;
    cashFlow: number;
    return: number;
    volatility: number;
  }[];
  
  // Reporting Preferences
  includeInvestmentAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeLocationAnalysis: boolean;
  includeValuationAnalysis: boolean;
  includeExitStrategy: boolean;
  includePerformanceTracking: boolean;
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

export interface RealEstateCalculatorResults {
  // Core Real Estate Metrics
  propertyValue: number;
  totalInvestment: number;
  cashFlow: number;
  totalReturn: number;
  capRate: number;
  
  // Real Estate Analysis
  realEstateAnalysis: {
    propertyValue: number;
    totalInvestment: number;
    cashFlow: number;
    totalReturn: number;
    capRate: number;
    realEstateBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    realEstateEfficiency: number;
  };
  
  // Investment Analysis
  investmentAnalysis: {
    investmentMetrics: {
      totalInvestment: number;
      equity: number;
      leverage: number;
      returnOnInvestment: number;
      returnOnEquity: number;
      internalRateOfReturn: number;
      netPresentValue: number;
      paybackPeriod: number;
      breakevenAnalysis: number;
    };
    cashFlowAnalysis: {
      grossRentalIncome: number;
      vacancyLoss: number;
      effectiveGrossIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
      cashOnCashReturn: number;
      debtCoverageRatio: number;
    };
    appreciationAnalysis: {
      historicalAppreciation: number;
      projectedAppreciation: number;
      appreciationFactors: {
        factor: string;
        impact: number;
        probability: number;
      }[];
      appreciationScenarios: {
        scenario: string;
        appreciationRate: number;
        probability: number;
        impact: number;
      }[];
    };
    taxAnalysis: {
      propertyTaxes: number;
      incomeTaxes: number;
      depreciation: number;
      taxBenefits: number;
      taxLiability: number;
      effectiveTaxRate: number;
      taxDeductions: {
        deduction: string;
        amount: number;
        type: string;
      }[];
    };
    investmentEfficiency: number;
  };
  
  // Market Analysis
  marketAnalysis: {
    marketData: {
      marketType: string;
      averageDaysOnMarket: number;
      medianPrice: number;
      pricePerSquareFoot: number;
      inventoryLevel: number;
      monthsOfInventory: number;
      marketTrend: string;
      appreciationRate: number;
      marketVolatility: number;
    };
    comparableProperties: {
      address: string;
      salePrice: number;
      saleDate: string;
      squareFootage: number;
      bedrooms: number;
      bathrooms: number;
      pricePerSquareFoot: number;
      daysOnMarket: number;
      condition: string;
      adjustments: number;
      adjustedPrice: number;
    }[];
    marketAnalysis: {
      supplyDemandRatio: number;
      absorptionRate: number;
      marketEfficiency: number;
      marketLiquidity: number;
      marketRisk: number;
      marketOpportunity: number;
    };
    marketEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: {
      priceRisk: number;
      liquidityRisk: number;
      interestRateRisk: number;
      economicRisk: number;
      marketRisk: number;
    };
    propertyRisk: {
      physicalRisk: number;
      environmentalRisk: number;
      legalRisk: number;
      titleRisk: number;
      propertyRisk: number;
    };
    tenantRisk: {
      vacancyRisk: number;
      defaultRisk: number;
      damageRisk: number;
      legalRisk: number;
      tenantRisk: number;
    };
    financialRisk: {
      leverageRisk: number;
      cashFlowRisk: number;
      refinancingRisk: number;
      taxRisk: number;
      financialRisk: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Location Analysis
  locationAnalysis: {
    neighborhoodInfo: {
      neighborhoodName: string;
      schoolDistrict: string;
      crimeRate: number;
      walkScore: number;
      transitScore: number;
      bikeScore: number;
      populationDensity: number;
      medianIncome: number;
      medianAge: number;
      employmentRate: number;
    };
    economicIndicators: {
      jobGrowth: number;
      populationGrowth: number;
      incomeGrowth: number;
      gdpGrowth: number;
      unemploymentRate: number;
      economicDiversification: number;
      economicStability: number;
    };
    infrastructure: {
      highways: string[];
      publicTransport: string[];
      airports: string[];
      hospitals: string[];
      schools: string[];
      shopping: string[];
      entertainment: string[];
      parks: string[];
    };
    developmentPlans: {
      plan: string;
      description: string;
      timeline: string;
      impact: string;
      probability: number;
      valueImpact: number;
    }[];
    locationEfficiency: number;
  };
  
  // Valuation Analysis
  valuationAnalysis: {
    appraisalInfo: {
      appraisedValue: number;
      appraisalDate: string;
      appraiser: string;
      appraisalMethod: string;
      appraisalConfidence: number;
      appraisalNotes: string;
    };
    valuationMethods: {
      salesComparison: {
        comparableSales: {
          address: string;
          salePrice: number;
          saleDate: string;
          adjustments: number;
          adjustedPrice: number;
        }[];
        estimatedValue: number;
        confidence: number;
      };
      incomeCapitalization: {
        netOperatingIncome: number;
        capRate: number;
        estimatedValue: number;
        confidence: number;
      };
      costApproach: {
        landValue: number;
        constructionCost: number;
        depreciation: number;
        estimatedValue: number;
        confidence: number;
      };
    };
    marketValue: {
      estimatedValue: number;
      valueRange: {
        low: number;
        high: number;
      };
      confidenceLevel: number;
      valuationDate: string;
      marketConditions: string;
    };
    valuationEfficiency: number;
  };
  
  // Property Management
  propertyManagement: {
    managementDetails: {
      managementType: string;
      managementFee: number;
      managementFeePercentage: number;
      managementServices: string[];
      managementCompany: string;
      managementContact: string;
      managementContract: string;
      managementTerm: number;
    };
    tenantInfo: {
      tenantName: string;
      tenantPhone: string;
      tenantEmail: string;
      leaseStartDate: string;
      leaseEndDate: string;
      leaseTerm: number;
      monthlyRent: number;
      securityDeposit: number;
      petDeposit: number;
      tenantCreditScore: number;
      tenantIncome: number;
      rentToIncomeRatio: number;
    }[];
    maintenanceSchedule: {
      item: string;
      frequency: string;
      lastService: string;
      nextService: string;
      estimatedCost: number;
      actualCost: number;
      vendor: string;
      priority: string;
    }[];
    propertyImprovements: {
      improvement: string;
      description: string;
      cost: number;
      completionDate: string;
      roi: number;
      usefulLife: number;
      depreciation: number;
      impactOnValue: number;
    }[];
    managementEfficiency: number;
  };
  
  // Exit Strategy
  exitStrategy: {
    exitOptions: {
      option: string;
      description: string;
      timeline: number;
      probability: number;
      expectedReturn: number;
      costs: number;
      netReturn: number;
    }[];
    saleAnalysis: {
      estimatedSalePrice: number;
      saleCosts: number;
      netProceeds: number;
      capitalGains: number;
      taxLiability: number;
      netAfterTax: number;
      holdingPeriod: number;
      annualizedReturn: number;
    };
    refinancingAnalysis: {
      currentLoanBalance: number;
      newLoanAmount: number;
      newInterestRate: number;
      newLoanTerm: number;
      newMonthlyPayment: number;
      cashOutAmount: number;
      refinancingCosts: number;
      breakevenPeriod: number;
      savings: number;
    };
    exitEfficiency: number;
  };
  
  // Performance Tracking
  performanceTracking: {
    historicalPerformance: {
      date: string;
      propertyValue: number;
      equity: number;
      cashFlow: number;
      totalReturn: number;
      appreciation: number;
      income: number;
      expenses: number;
    }[];
    performanceMetrics: {
      totalReturn: number;
      annualizedReturn: number;
      appreciationReturn: number;
      incomeReturn: number;
      cashOnCashReturn: number;
      returnOnEquity: number;
      returnOnInvestment: number;
    };
    benchmarkComparison: {
      benchmark: string;
      benchmarkReturn: number;
      propertyReturn: number;
      outperformance: number;
      correlation: number;
    }[];
    performanceEfficiency: number;
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
    appreciationRate: number;
    rentalGrowth: number;
    impact: number;
    return: number;
  }[];
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeInvestments: {
      investment: string;
      expectedReturn: number;
      risk: number;
      correlation: number;
      comparison: number;
    }[];
    comparableProperties: {
      property: string;
      return: number;
      risk: number;
      outperformance: number;
    }[];
    marketComparison: {
      benchmark: string;
      benchmarkReturn: number;
      propertyReturn: number;
      outperformance: number;
      correlation: number;
    };
    comparisonEfficiency: number;
  };
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      return: number;
      risk: number;
      outperformance: number;
    }[];
    marketComparison: {
      metric: string;
      property: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Real Estate Score
  realEstateScore: {
    overallScore: number;
    componentScores: {
      investment: number;
      market: number;
      risk: number;
      location: number;
      valuation: number;
      management: number;
    };
    recommendation: 'buy' | 'sell' | 'hold' | 'avoid';
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
    historicalVolatility: number;
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
    returnEnhancement: number;
    riskReduction: number;
    costSavings: number;
    taxBenefits: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    realEstateAssessment: string;
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
    propertyValue: number;
    totalInvestment: number;
    cashFlow: number;
    totalReturn: number;
    recommendation: 'buy' | 'sell' | 'hold' | 'avoid';
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
