export interface PaybackPeriodInputs {
  // Project Information
  projectInfo: {
    projectName: string;
    projectType: 'investment' | 'business_venture' | 'real_estate' | 'equipment' | 'technology' | 'marketing' | 'research_development' | 'acquisition' | 'expansion' | 'refinancing' | 'other';
    projectCategory: 'capital_expenditure' | 'operating_expense' | 'strategic_investment' | 'maintenance' | 'replacement' | 'expansion' | 'new_venture' | 'other';
    projectStage: 'planning' | 'development' | 'implementation' | 'operation' | 'maintenance' | 'decommissioning';
    projectDuration: number; // in years
    projectStartDate: string;
    projectEndDate: string;
    projectDescription: string;
  };
  
  // Investment Details
  investmentDetails: {
    // Initial Investment
    initialInvestment: {
      amount: number;
      date: string;
      type: 'equity' | 'debt' | 'hybrid' | 'other';
      currency: string;
    };
    
    // Additional Investments
    additionalInvestments: {
      date: string;
      amount: number;
      type: 'equity' | 'debt' | 'capital_call' | 'follow_on' | 'bridge' | 'other';
      description: string;
    }[];
    
    // Total Investment
    totalInvestment: number;
    investmentBreakdown: {
      component: string;
      amount: number;
      percentage: number;
    }[];
  };
  
  // Cash Flows
  cashFlows: {
    // Cash Inflows
    cashInflows: {
      year: number;
      revenue: number;
      costSavings: number;
      taxBenefits: number;
      otherIncome: number;
      totalInflows: number;
    }[];
    
    // Cash Outflows
    cashOutflows: {
      year: number;
      operatingExpenses: number;
      maintenanceCosts: number;
      taxes: number;
      debtService: number;
      otherExpenses: number;
      totalOutflows: number;
    }[];
    
    // Net Cash Flows
    netCashFlows: {
      year: number;
      inflows: number;
      outflows: number;
      netFlow: number;
      cumulativeFlow: number;
      remainingInvestment: number;
    }[];
    
    // Cash Flow Summary
    totalInflows: number;
    totalOutflows: number;
    netCashFlow: number;
  };
  
  // Payback Analysis Parameters
  paybackAnalysis: {
    // Calculation Method
    calculationMethod: 'simple_payback' | 'discounted_payback' | 'modified_payback' | 'break_even_payback';
    
    // Discount Rate (for discounted payback)
    discountRate: number;
    riskFreeRate: number;
    marketRiskPremium: number;
    projectRiskPremium: number;
    
    // Payback Criteria
    maximumPaybackPeriod: number;
    acceptablePaybackPeriod: number;
    targetPaybackPeriod: number;
    
    // Break-even Analysis
    breakEvenAnalysis: {
      includeFixedCosts: boolean;
      includeVariableCosts: boolean;
      includeOpportunityCosts: boolean;
      includeTimeValue: boolean;
    };
  };
  
  // Financial Metrics
  financialMetrics: {
    // Revenue Projections
    revenueProjections: {
      year: number;
      revenue: number;
      growthRate: number;
      seasonality: number;
      marketShare: number;
    }[];
    
    // Cost Projections
    costProjections: {
      year: number;
      fixedCosts: number;
      variableCosts: number;
      totalCosts: number;
      costPerUnit: number;
    }[];
    
    // Profitability Metrics
    profitabilityMetrics: {
      grossMargin: number;
      operatingMargin: number;
      netMargin: number;
      contributionMargin: number;
      breakEvenPoint: number;
    };
    
    // Cash Flow Metrics
    cashFlowMetrics: {
      averageAnnualCashFlow: number;
      cashFlowVolatility: number;
      cashFlowStability: number;
      cashFlowPredictability: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Risk Factors
    riskFactors: {
      marketRisk: number;
      operationalRisk: number;
      financialRisk: number;
      regulatoryRisk: number;
      technologyRisk: number;
      competitiveRisk: number;
      executionRisk: number;
    };
    
    // Risk Scenarios
    riskScenarios: {
      scenario: string;
      probability: number;
      cashFlowImpact: number;
      paybackImpact: number;
    }[];
    
    // Sensitivity Analysis
    sensitivityAnalysis: {
      variable: string;
      baseValue: number;
      lowValue: number;
      highValue: number;
      paybackImpact: number;
    }[];
    
    // Overall Risk Assessment
    overallRiskScore: number;
    riskCategory: 'low' | 'medium' | 'high' | 'very_high';
  };
  
  // Market Conditions
  marketConditions: {
    // Economic Environment
    economicEnvironment: {
      gdpGrowth: number;
      inflationRate: number;
      interestRate: number;
      unemploymentRate: number;
      consumerConfidence: number;
    };
    
    // Industry Conditions
    industryConditions: {
      industryGrowth: number;
      competitiveIntensity: number;
      regulatoryEnvironment: string;
      technologicalDisruption: number;
      marketMaturity: 'emerging' | 'growth' | 'mature' | 'declining';
    };
    
    // Market Timing
    marketTiming: {
      marketPhase: 'recession' | 'recovery' | 'expansion' | 'peak';
      marketVolatility: number;
      marketCorrelation: number;
    };
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Tax Status
    taxStatus: 'taxable' | 'tax_deferred' | 'tax_free' | 'tax_advantaged';
    effectiveTaxRate: number;
    marginalTaxRate: number;
    stateTaxRate: number;
    localTaxRate: number;
    
    // Tax Benefits
    taxBenefits: {
      depreciation: number;
      amortization: number;
      taxCredits: number;
      lossCarryforward: number;
      totalTaxBenefits: number;
    };
    
    // Tax Implications
    taxImplications: {
      afterTaxCashFlows: number;
      taxEfficiency: number;
      taxOptimization: number;
    };
  };
  
  // Inflation and Currency
  inflationAndCurrency: {
    // Inflation
    inflationRate: number;
    inflationProjection: {
      year: number;
      inflationRate: number;
    }[];
    realCashFlows: boolean;
    nominalCashFlows: boolean;
    
    // Currency
    baseCurrency: string;
    foreignCurrency: string;
    exchangeRate: number;
    exchangeRateProjection: {
      year: number;
      exchangeRate: number;
    }[];
    currencyRisk: number;
  };
  
  // Comparable Analysis
  comparableAnalysis: {
    // Peer Projects
    peerProjects: {
      project: string;
      industry: string;
      size: number;
      paybackPeriod: number;
      riskProfile: string;
      successRate: number;
    }[];
    
    // Industry Benchmarks
    industryBenchmarks: {
      metric: string;
      industry: string;
      average: number;
      median: number;
      percentile25: number;
      percentile75: number;
    }[];
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTaxes: boolean;
  includeInflation: boolean;
  includeRiskAdjustment: boolean;
  includeOpportunityCosts: boolean;
  includeTimeValue: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePartialYears: boolean;
    interpolationMethod: 'linear' | 'exponential' | 'logarithmic';
    roundingMethod: 'nearest' | 'up' | 'down';
    precision: number;
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeCashFlowVolatility: boolean;
  includeDiscountRateVolatility: boolean;
  includeInvestmentVolatility: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    investment: number;
    cashFlow: number;
    cumulativeFlow: number;
    paybackPeriod: number;
  }[];
  
  // Reporting Preferences
  includeCashFlowAnalysis: boolean;
  includePaybackAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeSensitivityAnalysis: boolean;
  includeComparableAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeInflationAnalysis: boolean;
  includeMarketAnalysis: boolean;
  includeBreakEvenAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface PaybackPeriodResults {
  // Core Payback Metrics
  paybackPeriod: number;
  discountedPaybackPeriod: number;
  modifiedPaybackPeriod: number;
  breakEvenPaybackPeriod: number;
  paybackEfficiency: number;
  
  // Payback Analysis
  paybackAnalysis: {
    paybackPeriod: number;
    discountedPaybackPeriod: number;
    modifiedPaybackPeriod: number;
    breakEvenPaybackPeriod: number;
    paybackBreakdown: {
      method: string;
      period: number;
      efficiency: number;
    }[];
    paybackEfficiency: number;
  };
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    totalInvestment: number;
    totalCashFlows: number;
    netCashFlow: number;
    cashFlowBreakdown: {
      year: number;
      investment: number;
      inflows: number;
      outflows: number;
      netFlow: number;
      cumulativeFlow: number;
      remainingInvestment: number;
      paybackStatus: 'not_recovered' | 'recovered';
    }[];
    cashFlowEfficiency: number;
  };
  
  // Investment Recovery Analysis
  investmentRecoveryAnalysis: {
    totalInvestment: number;
    recoveredAmount: number;
    unrecoveredAmount: number;
    recoveryPercentage: number;
    recoveryTimeline: {
      year: number;
      recoveredAmount: number;
      remainingAmount: number;
      recoveryPercentage: number;
    }[];
    recoveryEfficiency: number;
  };
  
  // Break-even Analysis
  breakEvenAnalysis: {
    breakEvenPoint: number;
    breakEvenTime: number;
    breakEvenCashFlow: number;
    marginOfSafety: number;
    breakEvenBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    breakEvenEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskAdjustedPaybackPeriod: number;
    riskScore: number;
    riskBreakdown: {
      risk: string;
      level: number;
      impact: number;
    }[];
    riskMitigation: string[];
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPaybackPeriod: number;
    highPaybackPeriod: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    paybackPeriod: number;
    discountedPaybackPeriod: number;
    riskLevel: string;
  }[];
  
  // Comparable Analysis
  comparableAnalysis: {
    peerComparison: {
      peer: string;
      paybackPeriod: number;
      discountedPaybackPeriod: number;
      riskProfile: string;
      successRate: number;
    }[];
    industryBenchmark: number;
    marketPosition: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    beforeTaxPaybackPeriod: number;
    afterTaxPaybackPeriod: number;
    taxEfficiency: number;
    taxBenefits: number;
    taxOptimization: number;
  };
  
  // Inflation Analysis
  inflationAnalysis: {
    nominalPaybackPeriod: number;
    realPaybackPeriod: number;
    inflationImpact: number;
    inflationEfficiency: number;
  };
  
  // Investment Score
  investmentScore: {
    overallScore: number;
    componentScores: {
      payback: number;
      discountedPayback: number;
      risk: number;
      cashFlow: number;
      recovery: number;
      taxes: number;
      inflation: number;
    };
    recommendation: 'invest' | 'consider' | 'decline' | 'modify';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanPaybackPeriod: number;
    medianPaybackPeriod: number;
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
      paybackPeriod: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalPaybackPeriod: number;
    historicalRecoveryRate: number;
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
    recoveryEnhancement: number;
    riskReduction: number;
    cashFlowImprovement: number;
    strategicAlignment: number;
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
    paybackPeriod: number;
    discountedPaybackPeriod: number;
    breakEvenPoint: number;
    recommendation: 'invest' | 'consider' | 'decline' | 'modify';
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
