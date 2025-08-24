export interface FinancialGoalCalculatorInputs {
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
    
    // Spouse Information
    spouseInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: string;
      occupation: string;
      employer: string;
      employmentStatus: string;
      education: string;
      healthStatus: string;
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
      taxDeductions: number;
      taxCredits: number;
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
        benefits: {
          healthInsurance: number;
          dentalInsurance: number;
          visionInsurance: number;
          lifeInsurance: number;
          disabilityInsurance: number;
          retirementMatch: number;
          stockOptions: number;
          otherBenefits: number;
        };
      }[];
      selfEmploymentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        businessExpenses: number;
        selfEmploymentTax: number;
      }[];
      investmentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
        taxRate: number;
      }[];
      otherIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
        taxRate: number;
      }[];
      totalAnnualIncome: number;
      expectedIncomeGrowth: number;
      afterTaxIncome: number;
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
  
  // Financial Goals
  financialGoals: {
    // Retirement Goals
    retirementGoals: {
      goalName: string;
      targetRetirementAge: number;
      targetRetirementDate: string;
      targetRetirementIncome: number;
      currentRetirementSavings: number;
      expectedSocialSecurity: number;
      expectedPension: number;
      retirementLifestyle: 'basic' | 'comfortable' | 'luxury' | 'ultra_high_net_worth';
      retirementLocation: string;
      healthcareCosts: number;
      longTermCare: boolean;
      legacyGoals: number;
      priority: 'high' | 'medium' | 'low';
      inflationAdjustment: boolean;
      inflationRate: number;
    }[];
    
    // Education Goals
    educationGoals: {
      goalName: string;
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
      priority: string;
      inflationAdjustment: boolean;
    }[];
    
    // Major Purchase Goals
    majorPurchaseGoals: {
      goalName: string;
      purchase: string;
      targetAmount: number;
      targetDate: string;
      currentSavings: number;
      priority: string;
      inflationAdjusted: boolean;
      inflationRate: number;
      financing: boolean;
      downPayment: number;
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
    }[];
    
    // Emergency Fund Goals
    emergencyFundGoals: {
      goalName: string;
      targetAmount: number;
      currentAmount: number;
      targetDate: string;
      priority: string;
      monthlyContribution: number;
      monthsOfExpenses: number;
      monthlyExpenses: number;
    };
    
    // Debt Payoff Goals
    debtPayoffGoals: {
      goalName: string;
      debt: string;
      currentBalance: number;
      targetPayoffDate: string;
      monthlyPayment: number;
      additionalPayment: number;
      priority: string;
      interestRate: number;
      payoffStrategy: 'avalanche' | 'snowball' | 'hybrid' | 'custom';
    }[];
    
    // Investment Goals
    investmentGoals: {
      goalName: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      monthlyContribution: number;
      expectedReturn: number;
      priority: string;
      riskTolerance: 'conservative' | 'moderate' | 'aggressive';
      investmentType: string;
    }[];
    
    // Business Goals
    businessGoals: {
      goalName: string;
      business: string;
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentValue: number;
      priority: string;
      businessType: string;
      growthRate: number;
    }[];
    
    // Legacy Goals
    legacyGoals: {
      goalName: string;
      goal: string;
      targetAmount: number;
      targetDate: string;
      beneficiary: string;
      priority: string;
      taxEfficient: boolean;
      method: string;
      charitable: boolean;
      organization: string;
    }[];
    
    // Travel Goals
    travelGoals: {
      goalName: string;
      destination: string;
      targetAmount: number;
      targetDate: string;
      currentSavings: number;
      priority: string;
      duration: number;
      travelers: number;
      inflationRate: number;
    }[];
    
    // Other Goals
    otherGoals: {
      goalName: string;
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      priority: string;
      description: string;
      category: string;
    }[];
  };
  
  // Goal Prioritization
  goalPrioritization: {
    // Priority Matrix
    priorityMatrix: {
      goal: string;
      importance: 'high' | 'medium' | 'low';
      urgency: 'high' | 'medium' | 'low';
      priority: 'high' | 'medium' | 'low';
      score: number;
    }[];
    
    // Goal Conflicts
    goalConflicts: {
      conflict: string;
      goals: string[];
      impact: number;
      resolution: string;
    }[];
    
    // Goal Dependencies
    goalDependencies: {
      goal: string;
      dependencies: string[];
      prerequisites: string[];
      impact: number;
    }[];
  };
  
  // Goal Funding Strategy
  goalFundingStrategy: {
    // Funding Allocation
    fundingAllocation: {
      goal: string;
      monthlyAllocation: number;
      percentage: number;
      priority: string;
      fundingSource: string[];
    }[];
    
    // Savings Strategy
    savingsStrategy: {
      strategy: string;
      description: string;
      monthlySavings: number;
      savingsRate: number;
      automation: boolean;
      accounts: string[];
    };
    
    // Investment Strategy
    investmentStrategy: {
      strategy: string;
      description: string;
      assetAllocation: {
        assetClass: string;
        percentage: number;
      }[];
      riskTolerance: string;
      timeHorizon: number;
      rebalancing: boolean;
      rebalancingFrequency: string;
    };
    
    // Debt Management Strategy
    debtManagementStrategy: {
      strategy: string;
      description: string;
      payoffOrder: string[];
      additionalPayments: number;
      refinancing: boolean;
      consolidation: boolean;
    };
  };
  
  // Risk Profile
  riskProfile: {
    // Risk Tolerance
    riskTolerance: {
      investmentRiskTolerance: 'conservative' | 'moderate' | 'aggressive';
      goalRiskTolerance: string;
      timeHorizon: number;
      riskCapacity: 'low' | 'medium' | 'high';
      riskWillingness: string;
      riskNeed: string;
    };
    
    // Risk Factors
    riskFactors: {
      healthRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      financialRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      marketRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      lifeEventRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
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
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeMarketRisk: boolean;
  includeIncomeRisk: boolean;
  includeExpenseRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeGoalInteractions: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGoalAnalysis: boolean;
    includePrioritization: boolean;
    includeFundingStrategy: boolean;
    includeRiskAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    goalProgress: {
      goal: string;
      targetAmount: number;
      currentAmount: number;
      progress: number;
    }[];
    savings: number;
    investments: number;
    netWorth: number;
  }[];
  
  // Reporting Preferences
  includeGoalAnalysis: boolean;
  includePrioritization: boolean;
  includeFundingStrategy: boolean;
  includeRiskAnalysis: boolean;
  includeOptimization: boolean;
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

export interface FinancialGoalCalculatorResults {
  // Core Goal Metrics
  goalAchievementScore: number;
  totalGoalValue: number;
  totalCurrentSavings: number;
  totalRequiredSavings: number;
  goalFundingGap: number;
  
  // Financial Goal Analysis
  financialGoalAnalysis: {
    goalAchievementScore: number;
    totalGoalValue: number;
    totalCurrentSavings: number;
    totalRequiredSavings: number;
    goalFundingGap: number;
    analysisBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    analysisEfficiency: number;
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
    spouseInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: string;
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
      taxDeductions: number;
      taxCredits: number;
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
        benefits: {
          healthInsurance: number;
          dentalInsurance: number;
          visionInsurance: number;
          lifeInsurance: number;
          disabilityInsurance: number;
          retirementMatch: number;
          stockOptions: number;
          otherBenefits: number;
        };
      }[];
      selfEmploymentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        businessExpenses: number;
        selfEmploymentTax: number;
      }[];
      investmentIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
        taxRate: number;
      }[];
      otherIncome: {
        source: string;
        amount: number;
        frequency: string;
        growthRate: number;
        taxable: boolean;
        taxRate: number;
      }[];
      totalAnnualIncome: number;
      expectedIncomeGrowth: number;
      afterTaxIncome: number;
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
      goalName: string;
      targetRetirementAge: number;
      targetRetirementDate: string;
      targetRetirementIncome: number;
      currentRetirementSavings: number;
      expectedSocialSecurity: number;
      expectedPension: number;
      retirementLifestyle: string;
      retirementLocation: string;
      healthcareCosts: number;
      longTermCare: boolean;
      legacyGoals: number;
      priority: string;
      inflationAdjustment: boolean;
      inflationRate: number;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    }[];
    educationGoals: {
      goalName: string;
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
      priority: string;
      inflationAdjustment: boolean;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    }[];
    majorPurchaseGoals: {
      goalName: string;
      purchase: string;
      targetAmount: number;
      targetDate: string;
      currentSavings: number;
      priority: string;
      inflationAdjusted: boolean;
      inflationRate: number;
      financing: boolean;
      downPayment: number;
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    }[];
    emergencyFundGoals: {
      goalName: string;
      targetAmount: number;
      currentAmount: number;
      targetDate: string;
      priority: string;
      monthlyContribution: number;
      monthsOfExpenses: number;
      monthlyExpenses: number;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    };
    debtPayoffGoals: {
      goalName: string;
      debt: string;
      currentBalance: number;
      targetPayoffDate: string;
      monthlyPayment: number;
      additionalPayment: number;
      priority: string;
      interestRate: number;
      payoffStrategy: string;
      goalGap: number;
      requiredPayments: number;
      achievementProbability: number;
    }[];
    investmentGoals: {
      goalName: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      monthlyContribution: number;
      expectedReturn: number;
      priority: string;
      riskTolerance: string;
      investmentType: string;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    }[];
    businessGoals: {
      goalName: string;
      business: string;
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentValue: number;
      priority: string;
      businessType: string;
      growthRate: number;
      goalGap: number;
      requiredGrowth: number;
      achievementProbability: number;
    }[];
    legacyGoals: {
      goalName: string;
      goal: string;
      targetAmount: number;
      targetDate: string;
      beneficiary: string;
      priority: string;
      taxEfficient: boolean;
      method: string;
      charitable: boolean;
      organization: string;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    }[];
    travelGoals: {
      goalName: string;
      destination: string;
      targetAmount: number;
      targetDate: string;
      currentSavings: number;
      priority: string;
      duration: number;
      travelers: number;
      inflationRate: number;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    }[];
    otherGoals: {
      goalName: string;
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      priority: string;
      description: string;
      category: string;
      goalGap: number;
      requiredSavings: number;
      achievementProbability: number;
    }[];
    goalEfficiency: number;
  };
  
  // Prioritization Analysis
  prioritizationAnalysis: {
    priorityMatrix: {
      goal: string;
      importance: string;
      urgency: string;
      priority: string;
      score: number;
    }[];
    goalConflicts: {
      conflict: string;
      goals: string[];
      impact: number;
      resolution: string;
    }[];
    goalDependencies: {
      goal: string;
      dependencies: string[];
      prerequisites: string[];
      impact: number;
    }[];
    prioritizationEfficiency: number;
  };
  
  // Funding Strategy Analysis
  fundingStrategyAnalysis: {
    fundingAllocation: {
      goal: string;
      monthlyAllocation: number;
      percentage: number;
      priority: string;
      fundingSource: string[];
    }[];
    savingsStrategy: {
      strategy: string;
      description: string;
      monthlySavings: number;
      savingsRate: number;
      automation: boolean;
      accounts: string[];
    };
    investmentStrategy: {
      strategy: string;
      description: string;
      assetAllocation: {
        assetClass: string;
        percentage: number;
      }[];
      riskTolerance: string;
      timeHorizon: number;
      rebalancing: boolean;
      rebalancingFrequency: string;
    };
    debtManagementStrategy: {
      strategy: string;
      description: string;
      payoffOrder: string[];
      additionalPayments: number;
      refinancing: boolean;
      consolidation: boolean;
    };
    fundingEfficiency: number;
  };
  
  // Risk Profile Analysis
  riskProfileAnalysis: {
    riskTolerance: {
      investmentRiskTolerance: string;
      goalRiskTolerance: string;
      timeHorizon: number;
      riskCapacity: string;
      riskWillingness: string;
      riskNeed: string;
    };
    riskFactors: {
      healthRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      financialRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      marketRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
      lifeEventRisks: {
        factor: string;
        probability: number;
        impact: number;
        mitigation: string;
      }[];
    };
    riskProfileEfficiency: number;
  };
  
  // Goal Progress Analysis
  goalProgressAnalysis: {
    currentProgress: {
      goal: string;
      targetAmount: number;
      currentAmount: number;
      progress: number;
      remaining: number;
      timeline: number;
    }[];
    projectedProgress: {
      year: number;
      goal: string;
      projectedAmount: number;
      targetAmount: number;
      progress: number;
    }[];
    goalInteractions: {
      interaction: string;
      goals: string[];
      impact: number;
      type: 'positive' | 'negative' | 'neutral';
    }[];
    progressEfficiency: number;
  };
  
  // Goal Optimization Analysis
  goalOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    goalAdjustments: {
      goal: string;
      currentTarget: number;
      recommendedTarget: number;
      adjustment: number;
      rationale: string;
    }[];
    fundingOptimization: {
      goal: string;
      currentAllocation: number;
      recommendedAllocation: number;
      adjustment: number;
      rationale: string;
    }[];
    optimizationEfficiency: number;
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
  
  // Financial Goal Planning Analysis
  financialGoalPlanningAnalysis: {
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
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Goal Score
  financialGoalScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      goals: number;
      prioritization: number;
      funding: number;
      risk: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      goalProgress: {
        goal: string;
        targetAmount: number;
        currentAmount: number;
        progress: number;
      }[];
      savings: number;
      investments: number;
      netWorth: number;
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
    goalAssessment: string;
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
    goalAchievementScore: number;
    totalGoalValue: number;
    totalCurrentSavings: number;
    totalRequiredSavings: number;
    goalFundingGap: number;
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
