export interface CompoundInterestInputs {
  // Investment Information
  investmentInfo: {
    investmentName: string;
    investmentType: 'savings' | 'investment' | 'retirement' | 'education' | 'real_estate' | 'business' | 'other';
    investmentCategory: 'personal' | 'business' | 'institutional' | 'retirement' | 'education' | 'other';
    investmentPurpose: 'savings' | 'growth' | 'income' | 'preservation' | 'speculation' | 'other';
    investmentStrategy: 'conservative' | 'moderate' | 'aggressive' | 'custom';
    currency: string;
    investmentDescription: string;
  };
  
  // Principal and Contributions
  principalAndContributions: {
    // Initial Investment
    initialInvestment: {
      amount: number;
      date: string;
      type: 'lump_sum' | 'installment' | 'other';
    };
    
    // Regular Contributions
    regularContributions: {
      amount: number;
      frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      startDate: string;
      endDate: string;
      type: 'fixed' | 'percentage' | 'increasing' | 'decreasing';
      growthRate: number;
    };
    
    // Additional Contributions
    additionalContributions: {
      date: string;
      amount: number;
      type: 'bonus' | 'windfall' | 'refund' | 'other';
      description: string;
    }[];
    
    // Total Contributions
    totalContributions: number;
    contributionBreakdown: {
      component: string;
      amount: number;
      percentage: number;
    }[];
  };
  
  // Interest Rate Information
  interestRateInfo: {
    // Base Interest Rate
    baseInterestRate: number;
    rateType: 'simple' | 'compound' | 'continuous';
    rateFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    
    // Rate Adjustments
    rateAdjustments: {
      inflationAdjustment: number;
      taxAdjustment: number;
      riskAdjustment: number;
      marketAdjustment: number;
      finalRate: number;
    };
    
    // Variable Rates
    variableRates: {
      period: string;
      rate: number;
      effectiveRate: number;
    }[];
    
    // Rate Projections
    rateProjections: {
      year: number;
      rate: number;
      assumption: string;
    }[];
  };
  
  // Time Period
  timePeriod: {
    startDate: string;
    endDate: string;
    investmentPeriod: number; // in years
    calculationPeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    compoundingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Tax Status
    taxStatus: 'taxable' | 'tax_deferred' | 'tax_free' | 'tax_advantaged';
    effectiveTaxRate: number;
    marginalTaxRate: number;
    stateTaxRate: number;
    localTaxRate: number;
    
    // Tax Implications
    taxImplications: {
      interestTax: number;
      contributionTax: number;
      withdrawalTax: number;
      totalTax: number;
      afterTaxReturn: number;
    };
    
    // Tax Benefits
    taxBenefits: {
      deduction: number;
      credit: number;
      exemption: number;
      totalBenefits: number;
    };
  };
  
  // Inflation Considerations
  inflationConsiderations: {
    // Inflation Rate
    inflationRate: number;
    inflationType: 'constant' | 'variable' | 'projected';
    
    // Inflation Projections
    inflationProjections: {
      year: number;
      rate: number;
      cumulativeInflation: number;
    }[];
    
    // Real Return
    realReturn: number;
    purchasingPower: number;
    inflationAdjustedValue: number;
  };
  
  // Fees and Expenses
  feesAndExpenses: {
    // Management Fees
    managementFees: {
      annualRate: number;
      amount: number;
      frequency: string;
    };
    
    // Transaction Costs
    transactionCosts: {
      brokerage: number;
      commissions: number;
      spreads: number;
      taxes: number;
      total: number;
    };
    
    // Other Fees
    otherFees: {
      custodian: number;
      legal: number;
      audit: number;
      other: number;
      total: number;
    };
    
    // Total Costs
    totalFees: number;
    feeImpact: number;
    netReturn: number;
  };
  
  // Withdrawals and Distributions
  withdrawalsAndDistributions: {
    // Regular Withdrawals
    regularWithdrawals: {
      amount: number;
      frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      startDate: string;
      endDate: string;
      type: 'fixed' | 'percentage' | 'increasing' | 'decreasing';
    };
    
    // One-time Withdrawals
    oneTimeWithdrawals: {
      date: string;
      amount: number;
      type: 'emergency' | 'planned' | 'required' | 'other';
      description: string;
    }[];
    
    // Required Minimum Distributions
    requiredMinimumDistributions: {
      age: number;
      percentage: number;
      amount: number;
      startDate: string;
    };
    
    // Total Withdrawals
    totalWithdrawals: number;
    withdrawalBreakdown: {
      component: string;
      amount: number;
      percentage: number;
    }[];
  };
  
  // Risk Factors
  riskFactors: {
    // Interest Rate Risk
    interestRateRisk: {
      rateVolatility: number;
      reinvestmentRisk: number;
      durationRisk: number;
    };
    
    // Credit Risk
    creditRisk: {
      defaultRisk: number;
      downgradeRisk: number;
      counterpartyRisk: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      marketability: number;
      timeToLiquidate: number;
      penaltyRisk: number;
    };
    
    // Inflation Risk
    inflationRisk: {
      purchasingPowerRisk: number;
      realReturnRisk: number;
    };
    
    // Other Risks
    otherRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Scenarios
    scenarios: {
      scenario: string;
      probability: number;
      interestRate: number;
      inflationRate: number;
      taxRate: number;
      finalValue: number;
    }[];
    
    // Stress Testing
    stressTesting: {
      test: string;
      interestRateShock: number;
      inflationShock: number;
      taxShock: number;
      finalValue: number;
    }[];
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    // Alternative Investments
    alternativeInvestments: {
      investment: string;
      rate: number;
      finalValue: number;
      risk: string;
    }[];
    
    // Benchmark Comparison
    benchmarkComparison: {
      benchmark: string;
      rate: number;
      finalValue: number;
      outperformance: number;
    }[];
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  includeTaxes: boolean;
  includeInflation: boolean;
  includeFees: boolean;
  includeWithdrawals: boolean;
  includeRiskAdjustment: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePartialPeriods: boolean;
    includeContinuousCompounding: boolean;
    includeVariableRates: boolean;
    includeSensitivityAnalysis: boolean;
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeRateVolatility: boolean;
  includeInflationVolatility: boolean;
  includeContributionVolatility: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    principal: number;
    interest: number;
    balance: number;
    rate: number;
    inflation: number;
  }[];
  
  // Reporting Preferences
  includePrincipalAnalysis: boolean;
  includeInterestAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeInflationAnalysis: boolean;
  includeFeeAnalysis: boolean;
  includeWithdrawalAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeComparisonAnalysis: boolean;
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

export interface CompoundInterestResults {
  // Core Compound Interest Metrics
  finalValue: number;
  totalInterest: number;
  totalContributions: number;
  effectiveAnnualRate: number;
  compoundAnnualGrowthRate: number;
  
  // Compound Interest Analysis
  compoundInterestAnalysis: {
    finalValue: number;
    totalInterest: number;
    totalContributions: number;
    interestBreakdown: {
      component: string;
      value: number;
      percentage: number;
    }[];
    interestEfficiency: number;
  };
  
  // Principal Analysis
  principalAnalysis: {
    initialInvestment: number;
    totalContributions: number;
    totalWithdrawals: number;
    netPrincipal: number;
    principalBreakdown: {
      component: string;
      amount: number;
      percentage: number;
    }[];
    principalEfficiency: number;
  };
  
  // Interest Analysis
  interestAnalysis: {
    totalInterest: number;
    simpleInterest: number;
    compoundInterest: number;
    interestBreakdown: {
      period: string;
      principal: number;
      interest: number;
      balance: number;
      rate: number;
    }[];
    interestEfficiency: number;
  };
  
  // Growth Analysis
  growthAnalysis: {
    compoundAnnualGrowthRate: number;
    effectiveAnnualRate: number;
    annualizedReturn: number;
    growthBreakdown: {
      year: number;
      beginningBalance: number;
      contributions: number;
      interest: number;
      withdrawals: number;
      endingBalance: number;
      growthRate: number;
    }[];
    growthEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    beforeTaxValue: number;
    afterTaxValue: number;
    totalTaxes: number;
    taxEfficiency: number;
    taxBreakdown: {
      tax: string;
      amount: number;
      impact: number;
    }[];
    taxOptimization: number;
  };
  
  // Inflation Analysis
  inflationAnalysis: {
    nominalValue: number;
    realValue: number;
    inflationImpact: number;
    purchasingPower: number;
    inflationBreakdown: {
      year: number;
      nominalValue: number;
      inflationRate: number;
      realValue: number;
    }[];
    inflationEfficiency: number;
  };
  
  // Fee Analysis
  feeAnalysis: {
    totalFees: number;
    feeImpact: number;
    netValue: number;
    feeBreakdown: {
      fee: string;
      amount: number;
      percentage: number;
    }[];
    feeEfficiency: number;
  };
  
  // Withdrawal Analysis
  withdrawalAnalysis: {
    totalWithdrawals: number;
    withdrawalImpact: number;
    finalValue: number;
    withdrawalBreakdown: {
      period: string;
      withdrawal: number;
      remainingBalance: number;
      impact: number;
    }[];
    withdrawalEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    riskAdjustedValue: number;
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
    lowFinalValue: number;
    highFinalValue: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    finalValue: number;
    totalInterest: number;
    effectiveRate: number;
    riskLevel: string;
  }[];
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeComparison: {
      alternative: string;
      finalValue: number;
      totalInterest: number;
      risk: string;
      outperformance: number;
    }[];
    benchmarkComparison: {
      benchmark: string;
      finalValue: number;
      outperformance: number;
      relativePerformance: number;
    }[];
  };
  
  // Investment Score
  investmentScore: {
    overallScore: number;
    componentScores: {
      growth: number;
      tax: number;
      inflation: number;
      fees: number;
      risk: number;
      efficiency: number;
    };
    recommendation: 'invest' | 'consider' | 'modify' | 'avoid';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanFinalValue: number;
    medianFinalValue: number;
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
      finalValue: number;
      probability: number;
    }[];
    successProbability: number;
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalGrowth: number;
    historicalReturn: number;
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
    valueCreation: number;
    costSavings: number;
    taxEfficiency: number;
    riskReduction: number;
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
    finalValue: number;
    totalInterest: number;
    effectiveRate: number;
    recommendation: 'invest' | 'consider' | 'modify' | 'avoid';
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
