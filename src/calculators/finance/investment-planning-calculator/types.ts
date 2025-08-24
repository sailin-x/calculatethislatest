export interface InvestmentPlanningCalculatorInputs {
  // Personal Information
  personalInfo: {
    // Basic Information
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: 'male' | 'female' | 'other';
      maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
      dependents: number;
      occupation: string;
      employer: string;
      employmentStatus: 'employed' | 'self_employed' | 'retired' | 'unemployed';
      education: string;
      healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
      lifeExpectancy: number;
    };
    
    // Contact Information
    contactInfo: {
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
      phone: string;
      email: string;
      emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
        email: string;
      };
    };
    
    // Tax Information
    taxInfo: {
      taxFilingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household' | 'qualifying_widow';
      taxBracket: number;
      stateOfResidence: string;
      stateTaxRate: number;
      localTaxRate: number;
      alternativeMinimumTax: boolean;
      itemizedDeductions: boolean;
    };
  };
  
  // Financial Information
  financialInfo: {
    // Income Information
    incomeInfo: {
      employmentIncome: {
        source: string;
        amount: number;
        frequency: 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'annually';
        growthRate: number;
        expectedRetirementAge: number;
      }[];
      selfEmploymentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        expectedRetirementAge: number;
      }[];
      investmentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
      }[];
      otherIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
      }[];
      totalAnnualIncome: number;
      expectedIncomeGrowth: number;
    };
    
    // Expense Information
    expenseInfo: {
      housingExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      transportationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      foodExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      healthcareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      entertainmentExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      otherExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      totalAnnualExpenses: number;
      expectedExpenseInflation: number;
    };
    
    // Asset Information
    assetInfo: {
      cashAssets: {
        account: string;
        institution: string;
        balance: number;
        interestRate: number;
        liquidity: 'high' | 'medium' | 'low';
      }[];
      investmentAssets: {
        account: string;
        institution: string;
        type: string;
        balance: number;
        expectedReturn: number;
        riskLevel: 'low' | 'medium' | 'high';
        liquidity: string;
        taxStatus: 'taxable' | 'tax_deferred' | 'tax_free';
      }[];
      realEstateAssets: {
        property: string;
        type: string;
        value: number;
        mortgage: number;
        equity: number;
        rentalIncome: number;
        expenses: number;
        appreciationRate: number;
        liquidity: string;
      }[];
      businessAssets: {
        business: string;
        type: string;
        value: number;
        income: number;
        expenses: number;
        growthRate: number;
        liquidity: string;
      }[];
      otherAssets: {
        asset: string;
        type: string;
        value: number;
        income: number;
        growthRate: number;
        liquidity: string;
      }[];
      totalAssets: number;
      totalLiabilities: number;
      netWorth: number;
    };
    
    // Liability Information
    liabilityInfo: {
      mortgageDebt: {
        property: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
        type: 'fixed' | 'adjustable' | 'interest_only';
      }[];
      consumerDebt: {
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        priority: 'high' | 'medium' | 'low';
      }[];
      studentLoanDebt: {
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
        forgivenessEligible: boolean;
      }[];
      businessDebt: {
        business: string;
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
      }[];
      otherDebt: {
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
      }[];
      totalDebt: number;
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
    };
  };
  
  // Investment Goals
  investmentGoals: {
    // Retirement Goals
    retirementGoals: {
      targetRetirementAge: number;
      targetRetirementIncome: number;
      currentRetirementSavings: number;
      expectedSocialSecurity: number;
      expectedPension: number;
      retirementLifestyle: 'basic' | 'comfortable' | 'luxury';
      retirementLocation: string;
      healthcareCosts: number;
      longTermCare: boolean;
      legacyGoals: number;
    };
    
    // Education Goals
    educationGoals: {
      beneficiary: string;
      relationship: string;
      targetYear: number;
      institution: string;
      program: string;
      estimatedCost: number;
      currentSavings: number;
      inflationRate: number;
      financialAid: boolean;
      scholarship: boolean;
    }[];
    
    // Major Purchase Goals
    majorPurchaseGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentSavings: number;
      priority: 'high' | 'medium' | 'low';
      inflationAdjusted: boolean;
    }[];
    
    // Emergency Fund Goals
    emergencyFundGoals: {
      targetAmount: number;
      currentAmount: number;
      targetDate: string;
      priority: string;
      monthlyContribution: number;
    };
    
    // Legacy Goals
    legacyGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      beneficiary: string;
      priority: string;
      taxEfficient: boolean;
    }[];
  };
  
  // Risk Profile
  riskProfile: {
    // Risk Tolerance
    riskTolerance: {
      investmentHorizon: number;
      riskCapacity: 'low' | 'medium' | 'high';
      riskWillingness: 'low' | 'medium' | 'high';
      riskNeed: 'low' | 'medium' | 'high';
      overallRiskTolerance: 'conservative' | 'moderate' | 'aggressive' | 'very_aggressive';
    };
    
    // Investment Preferences
    investmentPreferences: {
      preferredAssetClasses: string[];
      excludedAssetClasses: string[];
      preferredInvestmentTypes: string[];
      excludedInvestmentTypes: string[];
      liquidityRequirements: 'high' | 'medium' | 'low';
      taxEfficiency: boolean;
      esgConsiderations: boolean;
      internationalExposure: boolean;
    };
    
    // Behavioral Factors
    behavioralFactors: {
      lossAversion: 'low' | 'medium' | 'high';
      marketTiming: boolean;
      emotionalTrading: boolean;
      investmentExperience: 'beginner' | 'intermediate' | 'advanced';
      financialLiteracy: 'low' | 'medium' | 'high';
      decisionMakingStyle: 'analytical' | 'intuitive' | 'collaborative';
    };
  };
  
  // Market Assumptions
  marketAssumptions: {
    // Return Assumptions
    returnAssumptions: {
      assetClass: string;
      expectedReturn: number;
      volatility: number;
      correlation: number;
      inflationRate: number;
      realReturn: number;
    }[];
    
    // Economic Assumptions
    economicAssumptions: {
      inflationRate: number;
      realGdpGrowth: number;
      interestRate: number;
      taxRate: number;
      socialSecurityGrowth: number;
      healthcareInflation: number;
      educationInflation: number;
    };
    
    // Life Event Assumptions
    lifeEventAssumptions: {
      event: string;
      probability: number;
      impact: number;
      timing: number;
      description: string;
    }[];
  };
  
  // Investment Strategy
  investmentStrategy: {
    // Asset Allocation Strategy
    assetAllocationStrategy: {
      strategy: 'conservative' | 'moderate' | 'aggressive' | 'custom';
      targetAllocation: {
        assetClass: string;
        targetWeight: number;
        minWeight: number;
        maxWeight: number;
      }[];
      rebalancingFrequency: 'monthly' | 'quarterly' | 'annually' | 'trigger_based';
      rebalancingThreshold: number;
    };
    
    // Investment Vehicles
    investmentVehicles: {
      vehicle: string;
      type: string;
      advantages: string[];
      disadvantages: string[];
      suitability: 'high' | 'medium' | 'low';
      recommendation: string;
    }[];
    
    // Tax Strategy
    taxStrategy: {
      taxLossHarvesting: boolean;
      taxEfficientFunds: boolean;
      assetLocation: boolean;
      rothConversion: boolean;
      requiredMinimumDistributions: boolean;
      estateTaxPlanning: boolean;
    };
    
    // Risk Management
    riskManagement: {
      diversification: boolean;
      dollarCostAveraging: boolean;
      stopLosses: boolean;
      insurance: {
        type: string;
        coverage: number;
        premium: number;
        necessity: 'essential' | 'recommended' | 'optional';
      }[];
    };
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeMarketRisk: boolean;
  includeLongevityRisk: boolean;
  includeInflationRisk: boolean;
  includeSequenceRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGoalAnalysis: boolean;
    includeCashFlowAnalysis: boolean;
    includeAssetAllocation: boolean;
    includeTaxOptimization: boolean;
    includeRiskManagement: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    portfolioValue: number;
    income: number;
    expenses: number;
    savings: number;
    netWorth: number;
  }[];
  
  // Reporting Preferences
  includeGoalAnalysis: boolean;
  includeCashFlowAnalysis: boolean;
  includeAssetAllocation: boolean;
  includeTaxOptimization: boolean;
  includeRiskManagement: boolean;
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

export interface InvestmentPlanningCalculatorResults {
  // Core Planning Metrics
  financialIndependenceNumber: number;
  retirementReadinessScore: number;
  goalAchievementProbability: number;
  recommendedSavingsRate: number;
  investmentReturn: number;
  
  // Investment Planning Analysis
  investmentPlanningAnalysis: {
    financialIndependenceNumber: number;
    retirementReadinessScore: number;
    goalAchievementProbability: number;
    recommendedSavingsRate: number;
    investmentReturn: number;
    planningBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    planningEfficiency: number;
  };
  
  // Personal Analysis
  personalAnalysis: {
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: string;
      maritalStatus: string;
      dependents: number;
      occupation: string;
      employer: string;
      employmentStatus: string;
      education: string;
      healthStatus: string;
      lifeExpectancy: number;
    };
    contactInfo: {
      address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
      };
      phone: string;
      email: string;
      emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
        email: string;
      };
    };
    taxInfo: {
      taxFilingStatus: string;
      taxBracket: number;
      stateOfResidence: string;
      stateTaxRate: number;
      localTaxRate: number;
      alternativeMinimumTax: boolean;
      itemizedDeductions: boolean;
    };
    personalEfficiency: number;
  };
  
  // Financial Analysis
  financialAnalysis: {
    incomeInfo: {
      employmentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        expectedRetirementAge: number;
      }[];
      selfEmploymentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        expectedRetirementAge: number;
      }[];
      investmentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
      }[];
      otherIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
      }[];
      totalAnnualIncome: number;
      expectedIncomeGrowth: number;
    };
    expenseInfo: {
      housingExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      transportationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      foodExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      healthcareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      entertainmentExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      otherExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      totalAnnualExpenses: number;
      expectedExpenseInflation: number;
    };
    assetInfo: {
      cashAssets: {
        account: string;
        institution: string;
        balance: number;
        interestRate: number;
        liquidity: string;
      }[];
      investmentAssets: {
        account: string;
        institution: string;
        type: string;
        balance: number;
        expectedReturn: number;
        riskLevel: string;
        liquidity: string;
        taxStatus: string;
      }[];
      realEstateAssets: {
        property: string;
        type: string;
        value: number;
        mortgage: number;
        equity: number;
        rentalIncome: number;
        expenses: number;
        appreciationRate: number;
        liquidity: string;
      }[];
      businessAssets: {
        business: string;
        type: string;
        value: number;
        income: number;
        expenses: number;
        growthRate: number;
        liquidity: string;
      }[];
      otherAssets: {
        asset: string;
        type: string;
        value: number;
        income: number;
        growthRate: number;
        liquidity: string;
      }[];
      totalAssets: number;
      totalLiabilities: number;
      netWorth: number;
    };
    liabilityInfo: {
      mortgageDebt: {
        property: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
        type: string;
      }[];
      consumerDebt: {
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        priority: string;
      }[];
      studentLoanDebt: {
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
        forgivenessEligible: boolean;
      }[];
      businessDebt: {
        business: string;
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
      }[];
      otherDebt: {
        type: string;
        balance: number;
        interestRate: number;
        monthlyPayment: number;
        remainingTerm: number;
      }[];
      totalDebt: number;
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
    };
    financialEfficiency: number;
  };
  
  // Goal Analysis
  goalAnalysis: {
    retirementGoals: {
      targetRetirementAge: number;
      targetRetirementIncome: number;
      currentRetirementSavings: number;
      expectedSocialSecurity: number;
      expectedPension: number;
      retirementLifestyle: string;
      retirementLocation: string;
      healthcareCosts: number;
      longTermCare: boolean;
      legacyGoals: number;
      retirementReadiness: number;
      retirementGap: number;
      requiredSavings: number;
    };
    educationGoals: {
      beneficiary: string;
      relationship: string;
      targetYear: number;
      institution: string;
      program: string;
      estimatedCost: number;
      currentSavings: number;
      inflationRate: number;
      financialAid: boolean;
      scholarship: boolean;
      educationGap: number;
      requiredSavings: number;
    }[];
    majorPurchaseGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentSavings: number;
      priority: string;
      inflationAdjusted: boolean;
      purchaseGap: number;
      requiredSavings: number;
    }[];
    emergencyFundGoals: {
      targetAmount: number;
      currentAmount: number;
      targetDate: string;
      priority: string;
      monthlyContribution: number;
      emergencyFundGap: number;
      requiredSavings: number;
    };
    legacyGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      beneficiary: string;
      priority: string;
      taxEfficient: boolean;
      legacyGap: number;
      requiredSavings: number;
    }[];
    goalEfficiency: number;
  };
  
  // Risk Profile Analysis
  riskProfileAnalysis: {
    riskTolerance: {
      investmentHorizon: number;
      riskCapacity: string;
      riskWillingness: string;
      riskNeed: string;
      overallRiskTolerance: string;
    };
    investmentPreferences: {
      preferredAssetClasses: string[];
      excludedAssetClasses: string[];
      preferredInvestmentTypes: string[];
      excludedInvestmentTypes: string[];
      liquidityRequirements: string;
      taxEfficiency: boolean;
      esgConsiderations: boolean;
      internationalExposure: boolean;
    };
    behavioralFactors: {
      lossAversion: string;
      marketTiming: boolean;
      emotionalTrading: boolean;
      investmentExperience: string;
      financialLiteracy: string;
      decisionMakingStyle: string;
    };
    riskProfileEfficiency: number;
  };
  
  // Investment Strategy Analysis
  investmentStrategyAnalysis: {
    assetAllocationStrategy: {
      strategy: string;
      targetAllocation: {
        assetClass: string;
        targetWeight: number;
        minWeight: number;
        maxWeight: number;
      }[];
      rebalancingFrequency: string;
      rebalancingThreshold: number;
    };
    investmentVehicles: {
      vehicle: string;
      type: string;
      advantages: string[];
      disadvantages: string[];
      suitability: string;
      recommendation: string;
    }[];
    taxStrategy: {
      taxLossHarvesting: boolean;
      taxEfficientFunds: boolean;
      assetLocation: boolean;
      rothConversion: boolean;
      requiredMinimumDistributions: boolean;
      estateTaxPlanning: boolean;
    };
    riskManagement: {
      diversification: boolean;
      dollarCostAveraging: boolean;
      stopLosses: boolean;
      insurance: {
        type: string;
        coverage: number;
        premium: number;
        necessity: string;
      }[];
    };
    strategyEfficiency: number;
  };
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    currentCashFlow: {
      income: number;
      expenses: number;
      savings: number;
      savingsRate: number;
    };
    projectedCashFlow: {
      year: number;
      income: number;
      expenses: number;
      savings: number;
      savingsRate: number;
    }[];
    cashFlowGaps: {
      period: string;
      gap: number;
      solution: string;
    }[];
    cashFlowEfficiency: number;
  };
  
  // Tax Optimization Analysis
  taxOptimizationAnalysis: {
    currentTaxLiability: number;
    taxEfficientAllocation: {
      account: string;
      assetClass: string;
      allocation: number;
      taxEfficiency: number;
    }[];
    taxLossHarvesting: {
      opportunity: string;
      potentialSavings: number;
      implementation: string;
    }[];
    rothConversion: {
      amount: number;
      taxImpact: number;
      longTermBenefit: number;
      recommendation: string;
    };
    requiredMinimumDistributions: {
      age: number;
      amount: number;
      taxImpact: number;
      strategy: string;
    };
    taxOptimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowGoalAchievement: number;
    highGoalAchievement: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanGoalAchievement: number;
    medianGoalAchievement: number;
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
  
  // Investment Planning Planning Analysis
  investmentPlanningPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    planningStrategies: {
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
      benchmarkAchievement: number;
      planAchievement: number;
      outperformance: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Investment Planning Score
  investmentPlanningScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      goals: number;
      risk: number;
      strategy: number;
      planning: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      netWorth: number;
      goalProgress: number;
      savingsRate: number;
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    goalAchievement: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    planningAssessment: string;
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
    financialIndependenceNumber: number;
    retirementReadinessScore: number;
    goalAchievementProbability: number;
    recommendedSavingsRate: number;
    investmentReturn: number;
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
