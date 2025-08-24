export interface FinancialGrowthCalculatorInputs {
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
      employmentStatus: 'employed' | 'self_employed' | 'retired' | 'unemployed' | 'student';
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
      rentalIncome: {
        property: string;
        grossRentalIncome: number;
        expenses: number;
        netRentalIncome: number;
        depreciation: number;
        taxableIncome: number;
      }[];
      businessIncome: {
        business: string;
        grossIncome: number;
        expenses: number;
        netIncome: number;
        distributions: number;
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
      retirementAssets: {
        account: string;
        type: string;
        balance: number;
        expectedReturn: number;
        requiredMinimumDistribution: number;
        distributionAge: number;
        taxStatus: string;
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
  
  // Expense Information
  expenseInfo: {
    // Essential Expenses
    essentialExpenses: {
      housingExpenses: {
        category: string;
        amount: number;
        frequency: 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'annually';
        inflationRate: number;
        essential: boolean;
      }[];
      healthcareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
        insuranceCoverage: number;
      }[];
      foodExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
      }[];
      transportationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
      }[];
      insuranceExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
      }[];
      debtPayments: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
        interestRate: number;
        remainingBalance: number;
      }[];
      totalEssentialExpenses: number;
    };
    
    // Discretionary Expenses
    discretionaryExpenses: {
      entertainmentExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      travelExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      personalCareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      educationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      otherDiscretionaryExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      totalDiscretionaryExpenses: number;
    };
    
    // Total Expenses
    totalAnnualExpenses: number;
    expectedExpenseInflation: number;
  };
  
  // Financial Growth Assessment
  financialGrowthAssessment: {
    // Growth Components
    growthComponents: {
      component: string;
      score: number;
      weight: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      description: string;
    }[];
    
    // Growth Metrics
    growthMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    
    // Growth Goals
    growthGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Growth Challenges
    growthChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: 'low' | 'medium' | 'high';
      solutions: string[];
    }[];
  };
  
  // Growth Components
  growthComponents: {
    // Asset Growth
    assetGrowth: {
      totalAssetGrowth: boolean;
      investmentAssetGrowth: boolean;
      realEstateAssetGrowth: boolean;
      businessAssetGrowth: boolean;
      retirementAssetGrowth: boolean;
      cashAssetGrowth: boolean;
      otherAssetGrowth: boolean;
      assetAppreciation: boolean;
      assetAccumulation: boolean;
    };
    
    // Income Growth
    incomeGrowth: {
      totalIncomeGrowth: boolean;
      employmentIncomeGrowth: boolean;
      investmentIncomeGrowth: boolean;
      rentalIncomeGrowth: boolean;
      businessIncomeGrowth: boolean;
      passiveIncomeGrowth: boolean;
      activeIncomeGrowth: boolean;
      incomeDiversification: boolean;
      incomeStability: boolean;
    };
    
    // Net Worth Growth
    netWorthGrowth: {
      netWorthGrowth: boolean;
      equityGrowth: boolean;
      wealthAccumulation: boolean;
      debtReduction: boolean;
      leverageOptimization: boolean;
      netWorthStability: boolean;
      netWorthProjection: boolean;
      netWorthTargets: boolean;
      netWorthBenchmarks: boolean;
    };
    
    // Cash Flow Growth
    cashFlowGrowth: {
      operatingCashFlowGrowth: boolean;
      investingCashFlowGrowth: boolean;
      financingCashFlowGrowth: boolean;
      freeCashFlowGrowth: boolean;
      discretionaryCashFlowGrowth: boolean;
      netCashFlowGrowth: boolean;
      cashFlowStability: boolean;
      cashFlowProjection: boolean;
      cashFlowOptimization: boolean;
    };
    
    // Investment Growth
    investmentGrowth: {
      portfolioGrowth: boolean;
      investmentReturns: boolean;
      investmentContributions: boolean;
      investmentReinvestments: boolean;
      investmentDiversification: boolean;
      investmentOptimization: boolean;
      investmentRisk: boolean;
      investmentTiming: boolean;
      investmentStrategy: boolean;
    };
    
    // Savings Growth
    savingsGrowth: {
      savingsRate: boolean;
      savingsAmount: boolean;
      savingsGrowth: boolean;
      emergencyFundGrowth: boolean;
      shortTermSavings: boolean;
      longTermSavings: boolean;
      savingsAutomation: boolean;
      savingsOptimization: boolean;
      savingsGoals: boolean;
    };
    
    // Debt Reduction
    debtReduction: {
      totalDebtReduction: boolean;
      mortgageDebtReduction: boolean;
      consumerDebtReduction: boolean;
      studentLoanReduction: boolean;
      businessDebtReduction: boolean;
      debtToIncomeReduction: boolean;
      debtToAssetReduction: boolean;
      debtOptimization: boolean;
      debtElimination: boolean;
    };
    
    // Equity Growth
    equityGrowth: {
      homeEquityGrowth: boolean;
      businessEquityGrowth: boolean;
      investmentEquityGrowth: boolean;
      totalEquityGrowth: boolean;
      equityAccumulation: boolean;
      equityLeverage: boolean;
      equityOptimization: boolean;
      equityProjection: boolean;
      equityTargets: boolean;
    };
    
    // Wealth Accumulation
    wealthAccumulation: {
      totalWealthGrowth: boolean;
      liquidWealthGrowth: boolean;
      illiquidWealthGrowth: boolean;
      wealthDiversification: boolean;
      wealthPreservation: boolean;
      wealthTransfer: boolean;
      wealthOptimization: boolean;
      wealthProjection: boolean;
      wealthTargets: boolean;
    };
  };
  
  // Growth Goals
  growthGoals: {
    // Short-term Goals
    shortTermGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Medium-term Goals
    mediumTermGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Long-term Goals
    longTermGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
  };
  
  // Growth Strategy
  growthStrategy: {
    // Growth Plan
    growthPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    
    // Investment Strategy
    investmentStrategy: {
      strategy: string;
      description: string;
      investmentMethods: string[];
      investmentFrequency: string;
      investmentMetrics: string[];
    };
    
    // Savings Strategy
    savingsStrategy: {
      strategy: string;
      description: string;
      savingsMethods: string[];
      savingsFrequency: string;
      savingsTargets: string[];
    };
  };
  
  // Market Assumptions
  marketAssumptions: {
    // Economic Assumptions
    economicAssumptions: {
      inflationRate: number;
      realGdpGrowth: number;
      interestRate: number;
      taxRate: number;
      wageGrowth: number;
      expenseInflation: number;
    };
    
    // Growth Assumptions
    growthAssumptions: {
      growthRate: number;
      investmentRate: number;
      savingsRate: number;
      growthDecay: number;
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
  includeFinancialRisk: boolean;
  includeGrowthRisk: boolean;
  includeBehaviorRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeGrowthConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGrowthAnalysis: boolean;
    includeComponentAnalysis: boolean;
    includeGoalAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    growthScore: number;
    componentScores: {
      component: string;
      score: number;
    }[];
    goalProgress: {
      goal: string;
      progress: number;
    }[];
  }[];
  
  // Growth Preferences
  includeGrowthAnalysis: boolean;
  includeComponentAnalysis: boolean;
  includeGoalAnalysis: boolean;
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

export interface FinancialGrowthCalculatorResults {
  // Core Financial Growth Metrics
  financialGrowthScore: number;
  assetGrowthScore: number;
  incomeGrowthScore: number;
  netWorthGrowthScore: number;
  cashFlowGrowthScore: number;
  investmentGrowthScore: number;
  savingsGrowthScore: number;
  debtReductionScore: number;
  equityGrowthScore: number;
  wealthAccumulationScore: number;
  
  // Financial Growth Analysis
  financialGrowthAnalysis: {
    financialGrowthScore: number;
    assetGrowthScore: number;
    incomeGrowthScore: number;
    netWorthGrowthScore: number;
    cashFlowGrowthScore: number;
    investmentGrowthScore: number;
    savingsGrowthScore: number;
    debtReductionScore: number;
    equityGrowthScore: number;
    wealthAccumulationScore: number;
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
      rentalIncome: {
        property: string;
        grossRentalIncome: number;
        expenses: number;
        netRentalIncome: number;
        depreciation: number;
        taxableIncome: number;
      }[];
      businessIncome: {
        business: string;
        grossIncome: number;
        expenses: number;
        netIncome: number;
        distributions: number;
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
      retirementAssets: {
        account: string;
        type: string;
        balance: number;
        expectedReturn: number;
        requiredMinimumDistribution: number;
        distributionAge: number;
        taxStatus: string;
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
  
  // Expense Analysis
  expenseAnalysis: {
    essentialExpenses: {
      housingExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
      }[];
      healthcareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
        insuranceCoverage: number;
      }[];
      foodExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
      }[];
      transportationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
      }[];
      insuranceExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
      }[];
      debtPayments: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        essential: boolean;
        interestRate: number;
        remainingBalance: number;
      }[];
      totalEssentialExpenses: number;
    };
    discretionaryExpenses: {
      entertainmentExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      travelExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      personalCareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      educationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      otherDiscretionaryExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        discretionary: boolean;
      }[];
      totalDiscretionaryExpenses: number;
    };
    totalAnnualExpenses: number;
    expectedExpenseInflation: number;
    expenseEfficiency: number;
  };
  
  // Growth Assessment Analysis
  growthAssessmentAnalysis: {
    growthComponents: {
      component: string;
      score: number;
      weight: number;
      status: string;
      description: string;
    }[];
    growthMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    growthGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    growthChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: string;
      solutions: string[];
    }[];
    assessmentEfficiency: number;
  };
  
  // Component Analysis
  componentAnalysis: {
    assetGrowth: {
      totalAssetGrowth: boolean;
      investmentAssetGrowth: boolean;
      realEstateAssetGrowth: boolean;
      businessAssetGrowth: boolean;
      retirementAssetGrowth: boolean;
      cashAssetGrowth: boolean;
      otherAssetGrowth: boolean;
      assetAppreciation: boolean;
      assetAccumulation: boolean;
    };
    incomeGrowth: {
      totalIncomeGrowth: boolean;
      employmentIncomeGrowth: boolean;
      investmentIncomeGrowth: boolean;
      rentalIncomeGrowth: boolean;
      businessIncomeGrowth: boolean;
      passiveIncomeGrowth: boolean;
      activeIncomeGrowth: boolean;
      incomeDiversification: boolean;
      incomeStability: boolean;
    };
    netWorthGrowth: {
      netWorthGrowth: boolean;
      equityGrowth: boolean;
      wealthAccumulation: boolean;
      debtReduction: boolean;
      leverageOptimization: boolean;
      netWorthStability: boolean;
      netWorthProjection: boolean;
      netWorthTargets: boolean;
      netWorthBenchmarks: boolean;
    };
    cashFlowGrowth: {
      operatingCashFlowGrowth: boolean;
      investingCashFlowGrowth: boolean;
      financingCashFlowGrowth: boolean;
      freeCashFlowGrowth: boolean;
      discretionaryCashFlowGrowth: boolean;
      netCashFlowGrowth: boolean;
      cashFlowStability: boolean;
      cashFlowProjection: boolean;
      cashFlowOptimization: boolean;
    };
    investmentGrowth: {
      portfolioGrowth: boolean;
      investmentReturns: boolean;
      investmentContributions: boolean;
      investmentReinvestments: boolean;
      investmentDiversification: boolean;
      investmentOptimization: boolean;
      investmentRisk: boolean;
      investmentTiming: boolean;
      investmentStrategy: boolean;
    };
    savingsGrowth: {
      savingsRate: boolean;
      savingsAmount: boolean;
      savingsGrowth: boolean;
      emergencyFundGrowth: boolean;
      shortTermSavings: boolean;
      longTermSavings: boolean;
      savingsAutomation: boolean;
      savingsOptimization: boolean;
      savingsGoals: boolean;
    };
    debtReduction: {
      totalDebtReduction: boolean;
      mortgageDebtReduction: boolean;
      consumerDebtReduction: boolean;
      studentLoanReduction: boolean;
      businessDebtReduction: boolean;
      debtToIncomeReduction: boolean;
      debtToAssetReduction: boolean;
      debtOptimization: boolean;
      debtElimination: boolean;
    };
    equityGrowth: {
      homeEquityGrowth: boolean;
      businessEquityGrowth: boolean;
      investmentEquityGrowth: boolean;
      totalEquityGrowth: boolean;
      equityAccumulation: boolean;
      equityLeverage: boolean;
      equityOptimization: boolean;
      equityProjection: boolean;
      equityTargets: boolean;
    };
    wealthAccumulation: {
      totalWealthGrowth: boolean;
      liquidWealthGrowth: boolean;
      illiquidWealthGrowth: boolean;
      wealthDiversification: boolean;
      wealthPreservation: boolean;
      wealthTransfer: boolean;
      wealthOptimization: boolean;
      wealthProjection: boolean;
      wealthTargets: boolean;
    };
    componentEfficiency: number;
  };
  
  // Goal Analysis
  goalAnalysis: {
    shortTermGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
      goalGap: number;
      requiredActions: string[];
    }[];
    mediumTermGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
      goalGap: number;
      requiredActions: string[];
    }[];
    longTermGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
      goalGap: number;
      requiredActions: string[];
    }[];
    goalEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    growthPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    investmentStrategy: {
      strategy: string;
      description: string;
      investmentMethods: string[];
      investmentFrequency: string;
      investmentMetrics: string[];
    };
    savingsStrategy: {
      strategy: string;
      description: string;
      savingsMethods: string[];
      savingsFrequency: string;
      savingsTargets: string[];
    };
    strategyEfficiency: number;
  };
  
  // Growth Optimization Analysis
  growthOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    componentOptimization: {
      component: string;
      currentScore: number;
      targetScore: number;
      improvement: number;
      strategy: string;
    }[];
    goalOptimization: {
      goal: string;
      currentProgress: number;
      targetProgress: number;
      improvement: number;
      strategy: string;
    }[];
    optimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowGrowthScore: number;
    highGrowthScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanGrowthScore: number;
    medianGrowthScore: number;
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
  
  // Financial Growth Planning Analysis
  financialGrowthPlanningAnalysis: {
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
      benchmarkGrowth: number;
      planGrowth: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Growth Score
  financialGrowthScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      assetGrowth: number;
      incomeGrowth: number;
      netWorthGrowth: number;
      cashFlowGrowth: number;
      investmentGrowth: number;
      savingsGrowth: number;
      debtReduction: number;
      equityGrowth: number;
      wealthAccumulation: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      growthScore: number;
      componentScores: {
        component: string;
        score: number;
      }[];
      goalProgress: {
        goal: string;
        progress: number;
      }[];
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    growthImprovement: number;
    wealthAccumulation: number;
    riskReduction: number;
    performanceGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    growthAssessment: string;
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
    financialGrowthScore: number;
    assetGrowthScore: number;
    incomeGrowthScore: number;
    netWorthGrowthScore: number;
    cashFlowGrowthScore: number;
    investmentGrowthScore: number;
    savingsGrowthScore: number;
    debtReductionScore: number;
    equityGrowthScore: number;
    wealthAccumulationScore: number;
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
