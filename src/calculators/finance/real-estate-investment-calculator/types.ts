export interface RealEstateInvestmentCalculatorInputs {
  // Property Information
  propertyInfo: {
    // Property Details
    propertyDetails: {
      propertyName: string;
      propertyType: 'single_family' | 'multi_family' | 'condo' | 'townhouse' | 'commercial' | 'industrial' | 'retail' | 'office' | 'land' | 'mixed_use' | 'other';
      propertyAddress: string;
      propertyCity: string;
      propertyState: string;
      propertyZipCode: string;
      propertyCounty: string;
      yearBuilt: number;
      squareFootage: number;
      lotSize: number;
      bedrooms: number;
      bathrooms: number;
      parkingSpaces: number;
      propertyDescription: string;
    };
    
    // Property Value
    propertyValue: {
      purchasePrice: number;
      appraisedValue: number;
      estimatedValue: number;
      marketValue: number;
      valueAppreciation: number;
      valueDepreciation: number;
      comparableSales: {
        address: string;
        salePrice: number;
        saleDate: string;
        squareFootage: number;
        bedrooms: number;
        bathrooms: number;
      }[];
    };
    
    // Property Condition
    propertyCondition: {
      overallCondition: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_renovation';
      roofCondition: 'excellent' | 'good' | 'fair' | 'poor';
      hvacCondition: 'excellent' | 'good' | 'fair' | 'poor';
      plumbingCondition: 'excellent' | 'good' | 'fair' | 'poor';
      electricalCondition: 'excellent' | 'good' | 'fair' | 'poor';
      foundationCondition: 'excellent' | 'good' | 'fair' | 'poor';
      estimatedRenovationCost: number;
      renovationPriority: 'low' | 'medium' | 'high';
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
      loanToValueRatio: number;
      closingCosts: number;
      totalInvestment: number;
      purchaseDate: string;
    };
    
    // Financing Information
    financingInfo: {
      loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'hard_money' | 'private' | 'cash' | 'other';
      interestRate: number;
      loanTerm: number; // in years
      monthlyPayment: number;
      annualPayment: number;
      totalInterest: number;
      loanBalance: number;
      refinanceOpportunity: boolean;
      refinanceSavings: number;
    };
    
    // Operating Expenses
    operatingExpenses: {
      propertyTaxes: number;
      homeownersInsurance: number;
      propertyManagementFee: number;
      maintenanceReserve: number;
      utilities: number;
      landscaping: number;
      pestControl: number;
      security: number;
      otherExpenses: {
        expense: string;
        amount: number;
        frequency: 'monthly' | 'quarterly' | 'annually';
      }[];
      totalOperatingExpenses: number;
    };
  };
  
  // Income Information
  incomeInfo: {
    // Rental Income
    rentalIncome: {
      monthlyRent: number;
      annualRent: number;
      rentIncrease: number;
      rentGrowthRate: number;
      vacancyRate: number;
      effectiveRent: number;
      rentComparables: {
        address: string;
        monthlyRent: number;
        bedrooms: number;
        bathrooms: number;
        squareFootage: number;
      }[];
    };
    
    // Additional Income
    additionalIncome: {
      parkingFees: number;
      storageFees: number;
      petFees: number;
      lateFees: number;
      applicationFees: number;
      otherIncome: {
        source: string;
        amount: number;
        frequency: 'monthly' | 'quarterly' | 'annually';
      }[];
      totalAdditionalIncome: number;
    };
    
    // Income Projections
    incomeProjections: {
      year: number;
      grossRent: number;
      vacancyLoss: number;
      effectiveRent: number;
      additionalIncome: number;
      totalIncome: number;
    }[];
  };
  
  // Market Information
  marketInfo: {
    // Market Data
    marketData: {
      marketType: 'buyers' | 'sellers' | 'balanced';
      averageDaysOnMarket: number;
      inventoryLevel: 'low' | 'medium' | 'high';
      priceTrend: 'increasing' | 'decreasing' | 'stable';
      rentTrend: 'increasing' | 'decreasing' | 'stable';
      marketVolatility: number;
      marketGrowth: number;
    };
    
    // Economic Indicators
    economicIndicators: {
      gdpGrowth: number;
      unemploymentRate: number;
      populationGrowth: number;
      jobGrowth: number;
      incomeGrowth: number;
      inflationRate: number;
      interestRate: number;
    };
    
    // Neighborhood Analysis
    neighborhoodAnalysis: {
      schoolRating: number;
      crimeRate: number;
      walkabilityScore: number;
      transitScore: number;
      amenities: string[];
      developmentPlans: string[];
      neighborhoodTrend: 'improving' | 'stable' | 'declining';
    };
  };
  
  // Investment Analysis
  investmentAnalysis: {
    // Cash Flow Analysis
    cashFlowAnalysis: {
      grossRent: number;
      vacancyLoss: number;
      effectiveRent: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
      cashOnCashReturn: number;
      cashFlowProjections: {
        year: number;
        grossRent: number;
        operatingExpenses: number;
        netOperatingIncome: number;
        debtService: number;
        cashFlow: number;
      }[];
    };
    
    // Return Metrics
    returnMetrics: {
      capRate: number;
      cashOnCashReturn: number;
      totalReturn: number;
      internalRateOfReturn: number;
      netPresentValue: number;
      paybackPeriod: number;
      returnOnInvestment: number;
      returnOnEquity: number;
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
      totalReturn: number;
      equityBuildUp: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Market Risk
    marketRisk: {
      marketVolatility: number;
      priceRisk: number;
      rentRisk: number;
      liquidityRisk: number;
      marketRisk: number;
    };
    
    // Property Risk
    propertyRisk: {
      propertyCondition: number;
      locationRisk: number;
      environmentalRisk: number;
      legalRisk: number;
      propertyRisk: number;
    };
    
    // Financial Risk
    financialRisk: {
      leverageRisk: number;
      interestRateRisk: number;
      cashFlowRisk: number;
      refinanceRisk: number;
      financialRisk: number;
    };
    
    // Tenant Risk
    tenantRisk: {
      vacancyRisk: number;
      creditRisk: number;
      evictionRisk: number;
      damageRisk: number;
      tenantRisk: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Tax Information
  taxInfo: {
    // Tax Benefits
    taxBenefits: {
      depreciation: number;
      mortgageInterestDeduction: number;
      propertyTaxDeduction: number;
      operatingExpenseDeduction: number;
      totalDeductions: number;
      taxSavings: number;
      effectiveTaxRate: number;
    };
    
    // Tax Implications
    taxImplications: {
      marginalTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
      afterTaxCashFlow: number;
      taxEfficiency: number;
    };
    
    // 1031 Exchange
    exchange1031: {
      eligible: boolean;
      exchangeValue: number;
      taxDeferral: number;
      exchangeTimeline: string;
      exchangeRequirements: string[];
    };
  };
  
  // Management Information
  managementInfo: {
    // Property Management
    propertyManagement: {
      selfManaged: boolean;
      managementCompany: string;
      managementFee: number;
      managementServices: string[];
      managementQuality: 'excellent' | 'good' | 'fair' | 'poor';
      managementCost: number;
    };
    
    // Maintenance Plan
    maintenancePlan: {
      preventiveMaintenance: number;
      emergencyMaintenance: number;
      capitalImprovements: number;
      totalMaintenance: number;
      maintenanceSchedule: {
        item: string;
        frequency: string;
        cost: number;
        priority: 'low' | 'medium' | 'high';
      }[];
    };
    
    // Insurance Coverage
    insuranceCoverage: {
      propertyInsurance: number;
      liabilityInsurance: number;
      floodInsurance: number;
      earthquakeInsurance: number;
      umbrellaInsurance: number;
      totalInsurance: number;
      coverageLimits: {
        coverage: string;
        limit: number;
        deductible: number;
      }[];
    };
  };
  
  // Exit Strategy
  exitStrategy: {
    // Exit Options
    exitOptions: {
      hold: {
        holdPeriod: number;
        projectedValue: number;
        projectedReturn: number;
        probability: number;
      };
      sell: {
        salePrice: number;
        saleCosts: number;
        netProceeds: number;
        capitalGains: number;
        probability: number;
      };
      refinance: {
        refinanceAmount: number;
        refinanceCosts: number;
        cashOut: number;
        newPayment: number;
        probability: number;
      };
      exchange: {
        exchangeValue: number;
        taxDeferral: number;
        exchangeCosts: number;
        probability: number;
      };
    };
    
    // Exit Timeline
    exitTimeline: {
      preferredExit: string;
      timeline: number; // in years
      exitConditions: string[];
      exitTriggers: string[];
    };
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    // Alternative Investments
    alternativeInvestments: {
      investment: string;
      expectedReturn: number;
      risk: number;
      liquidity: number;
      taxEfficiency: number;
      comparison: number;
    }[];
    
    // Similar Properties
    similarProperties: {
      property: string;
      purchasePrice: number;
      monthlyRent: number;
      capRate: number;
      cashOnCashReturn: number;
      totalReturn: number;
    }[];
    
    // Market Comparison
    marketComparison: {
      averageCapRate: number;
      averageCashOnCashReturn: number;
      averageAppreciation: number;
      marketPosition: number;
      competitiveness: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      probability: number;
      appreciationRate: number;
      rentGrowth: number;
      vacancyRate: number;
      totalReturn: number;
    }[];
    
    // Economic Scenarios
    economicScenarios: {
      scenario: string;
      probability: number;
      gdpGrowth: number;
      interestRate: number;
      inflationRate: number;
      totalReturn: number;
    }[];
    
    // Property Scenarios
    propertyScenarios: {
      scenario: string;
      probability: number;
      propertyValue: number;
      rentalIncome: number;
      operatingExpenses: number;
      totalReturn: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeAppreciationVolatility: boolean;
  includeRentVolatility: boolean;
  includeExpenseVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  inflationRate: number;
  includeTaxes: boolean;
  includeFees: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeCashFlowAnalysis: boolean;
    includeReturnAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeTaxAnalysis: boolean;
    includeManagementAnalysis: boolean;
    includeExitStrategy: boolean;
    includeComparisonAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    propertyValue: number;
    rentalIncome: number;
    operatingExpenses: number;
    cashFlow: number;
    totalReturn: number;
    capRate: number;
  }[];
  
  // Reporting Preferences
  includeCashFlowAnalysis: boolean;
  includeReturnAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeManagementAnalysis: boolean;
  includeExitStrategy: boolean;
  includeComparisonAnalysis: boolean;
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

export interface RealEstateInvestmentCalculatorResults {
  // Core Investment Metrics
  capRate: number;
  cashOnCashReturn: number;
  totalReturn: number;
  internalRateOfReturn: number;
  netPresentValue: number;
  
  // Investment Analysis
  investmentAnalysis: {
    capRate: number;
    cashOnCashReturn: number;
    totalReturn: number;
    internalRateOfReturn: number;
    netPresentValue: number;
    investmentBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    investmentEfficiency: number;
  };
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    grossRent: number;
    vacancyLoss: number;
    effectiveRent: number;
    operatingExpenses: number;
    netOperatingIncome: number;
    debtService: number;
    cashFlow: number;
    cashOnCashReturn: number;
    cashFlowProjections: {
      year: number;
      grossRent: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
    }[];
    cashFlowEfficiency: number;
  };
  
  // Return Analysis
  returnAnalysis: {
    returnMetrics: {
      capRate: number;
      cashOnCashReturn: number;
      totalReturn: number;
      internalRateOfReturn: number;
      netPresentValue: number;
      paybackPeriod: number;
      returnOnInvestment: number;
      returnOnEquity: number;
    };
    appreciationAnalysis: {
      historicalAppreciation: number;
      projectedAppreciation: number;
      appreciationFactors: {
        factor: string;
        impact: number;
        probability: number;
      }[];
      totalReturn: number;
      equityBuildUp: number;
    };
    returnEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    marketRisk: {
      marketVolatility: number;
      priceRisk: number;
      rentRisk: number;
      liquidityRisk: number;
      marketRisk: number;
    };
    propertyRisk: {
      propertyCondition: number;
      locationRisk: number;
      environmentalRisk: number;
      legalRisk: number;
      propertyRisk: number;
    };
    financialRisk: {
      leverageRisk: number;
      interestRateRisk: number;
      cashFlowRisk: number;
      refinanceRisk: number;
      financialRisk: number;
    };
    tenantRisk: {
      vacancyRisk: number;
      creditRisk: number;
      evictionRisk: number;
      damageRisk: number;
      tenantRisk: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxBenefits: {
      depreciation: number;
      mortgageInterestDeduction: number;
      propertyTaxDeduction: number;
      operatingExpenseDeduction: number;
      totalDeductions: number;
      taxSavings: number;
      effectiveTaxRate: number;
    };
    taxImplications: {
      marginalTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
      afterTaxCashFlow: number;
      taxEfficiency: number;
    };
    exchange1031: {
      eligible: boolean;
      exchangeValue: number;
      taxDeferral: number;
      exchangeTimeline: string;
      exchangeRequirements: string[];
    };
    taxEfficiency: number;
  };
  
  // Management Analysis
  managementAnalysis: {
    propertyManagement: {
      selfManaged: boolean;
      managementCompany: string;
      managementFee: number;
      managementServices: string[];
      managementQuality: string;
      managementCost: number;
    };
    maintenancePlan: {
      preventiveMaintenance: number;
      emergencyMaintenance: number;
      capitalImprovements: number;
      totalMaintenance: number;
      maintenanceSchedule: {
        item: string;
        frequency: string;
        cost: number;
        priority: string;
      }[];
    };
    insuranceCoverage: {
      propertyInsurance: number;
      liabilityInsurance: number;
      floodInsurance: number;
      earthquakeInsurance: number;
      umbrellaInsurance: number;
      totalInsurance: number;
      coverageLimits: {
        coverage: string;
        limit: number;
        deductible: number;
      }[];
    };
    managementEfficiency: number;
  };
  
  // Exit Strategy Analysis
  exitStrategyAnalysis: {
    exitOptions: {
      hold: {
        holdPeriod: number;
        projectedValue: number;
        projectedReturn: number;
        probability: number;
      };
      sell: {
        salePrice: number;
        saleCosts: number;
        netProceeds: number;
        capitalGains: number;
        probability: number;
      };
      refinance: {
        refinanceAmount: number;
        refinanceCosts: number;
        cashOut: number;
        newPayment: number;
        probability: number;
      };
      exchange: {
        exchangeValue: number;
        taxDeferral: number;
        exchangeCosts: number;
        probability: number;
      };
    };
    exitTimeline: {
      preferredExit: string;
      timeline: number;
      exitConditions: string[];
      exitTriggers: string[];
    };
    exitEfficiency: number;
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
    capRate: number;
    cashOnCashReturn: number;
    totalReturn: number;
    internalRateOfReturn: number;
  }[];
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeInvestments: {
      investment: string;
      expectedReturn: number;
      risk: number;
      liquidity: number;
      taxEfficiency: number;
      comparison: number;
    }[];
    similarProperties: {
      property: string;
      purchasePrice: number;
      monthlyRent: number;
      capRate: number;
      cashOnCashReturn: number;
      totalReturn: number;
    }[];
    marketComparison: {
      averageCapRate: number;
      averageCashOnCashReturn: number;
      averageAppreciation: number;
      marketPosition: number;
      competitiveness: number;
    };
    comparisonEfficiency: number;
  };
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      capRate: number;
      cashOnCashReturn: number;
      totalReturn: number;
      outperformance: number;
    }[];
    marketComparison: {
      metric: string;
      investment: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Investment Score
  investmentScore: {
    overallScore: number;
    componentScores: {
      cashFlow: number;
      return: number;
      risk: number;
      tax: number;
      management: number;
      exit: number;
    };
    recommendation: 'invest' | 'consider' | 'avoid' | 'review';
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
    historicalCapRate: number;
    historicalCashOnCashReturn: number;
    historicalTotalReturn: number;
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
    cashFlowImprovement: number;
    returnEnhancement: number;
    riskReduction: number;
    taxOptimization: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    investmentAssessment: string;
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
    capRate: number;
    cashOnCashReturn: number;
    totalReturn: number;
    internalRateOfReturn: number;
    recommendation: 'invest' | 'consider' | 'avoid' | 'review';
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
