export interface FinancialStabilityCalculatorInputs {
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
  
  // Financial Stability Assessment
  financialStabilityAssessment: {
    // Stability Components
    stabilityComponents: {
      component: string;
      score: number;
      weight: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      description: string;
    }[];
    
    // Stability Metrics
    stabilityMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    
    // Stability Goals
    stabilityGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Stability Challenges
    stabilityChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: 'low' | 'medium' | 'high';
      solutions: string[];
    }[];
  };
  
  // Stability Components
  stabilityComponents: {
    // Cash Flow Stability
    cashFlowStability: {
      operatingCashFlow: boolean;
      investingCashFlow: boolean;
      financingCashFlow: boolean;
      freeCashFlow: boolean;
      discretionaryCashFlow: boolean;
      netCashFlow: boolean;
      cashFlowStability: boolean;
      cashFlowProjection: boolean;
      cashFlowOptimization: boolean;
    };
    
    // Income Stability
    incomeStability: {
      totalIncomeStability: boolean;
      employmentIncomeStability: boolean;
      investmentIncomeStability: boolean;
      rentalIncomeStability: boolean;
      businessIncomeStability: boolean;
      passiveIncomeStability: boolean;
      incomeDiversification: boolean;
      incomeGrowth: boolean;
      incomeProjection: boolean;
    };
    
    // Expense Stability
    expenseStability: {
      totalExpenseStability: boolean;
      essentialExpenseStability: boolean;
      discretionaryExpenseStability: boolean;
      expenseInflation: boolean;
      expenseOptimization: boolean;
      expenseProjection: boolean;
      expenseControl: boolean;
      expenseMonitoring: boolean;
      expensePlanning: boolean;
    };
    
    // Debt Stability
    debtStability: {
      totalDebtStability: boolean;
      mortgageDebtStability: boolean;
      consumerDebtStability: boolean;
      studentLoanStability: boolean;
      businessDebtStability: boolean;
      debtToIncomeRatio: boolean;
      debtToAssetRatio: boolean;
      debtProjection: boolean;
      debtOptimization: boolean;
    };
    
    // Asset Stability
    assetStability: {
      totalAssetStability: boolean;
      investmentAssetStability: boolean;
      realEstateAssetStability: boolean;
      businessAssetStability: boolean;
      retirementAssetStability: boolean;
      cashAssetStability: boolean;
      assetDiversification: boolean;
      assetProjection: boolean;
      assetOptimization: boolean;
    };
    
    // Investment Stability
    investmentStability: {
      portfolioStability: boolean;
      investmentReturns: boolean;
      investmentRisk: boolean;
      investmentDiversification: boolean;
      investmentLiquidity: boolean;
      investmentProjection: boolean;
      investmentOptimization: boolean;
      investmentMonitoring: boolean;
      investmentPlanning: boolean;
    };
    
    // Savings Stability
    savingsStability: {
      savingsRate: boolean;
      savingsStability: boolean;
      emergencyFund: boolean;
      shortTermSavings: boolean;
      longTermSavings: boolean;
      savingsProjection: boolean;
      savingsOptimization: boolean;
      savingsMonitoring: boolean;
      savingsPlanning: boolean;
    };
    
    // Retirement Stability
    retirementStability: {
      retirementIncome: boolean;
      retirementExpenses: boolean;
      retirementSavings: boolean;
      retirementInvestments: boolean;
      retirementProjection: boolean;
      retirementOptimization: boolean;
      retirementMonitoring: boolean;
      retirementPlanning: boolean;
      retirementSecurity: boolean;
    };
    
    // Insurance Stability
    insuranceStability: {
      healthInsurance: boolean;
      lifeInsurance: boolean;
      disabilityInsurance: boolean;
      propertyInsurance: boolean;
      liabilityInsurance: boolean;
      insuranceCoverage: boolean;
      insuranceCost: boolean;
      insuranceProjection: boolean;
      insuranceOptimization: boolean;
    };
  };
  
  // Stability Goals
  stabilityGoals: {
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
  
  // Stability Strategy
  stabilityStrategy: {
    // Stability Plan
    stabilityPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    
    // Risk Management Strategy
    riskManagementStrategy: {
      strategy: string;
      description: string;
      riskManagementMethods: string[];
      riskManagementFrequency: string;
      riskManagementMetrics: string[];
    };
    
    // Monitoring Strategy
    monitoringStrategy: {
      strategy: string;
      description: string;
      monitoringFrequency: string;
      monitoringMethods: string[];
      stabilityThresholds: string[];
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
    
    // Stability Assumptions
    stabilityAssumptions: {
      stabilityRate: number;
      riskManagementRate: number;
      monitoringRate: number;
      stabilityDecay: number;
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
  includeStabilityRisk: boolean;
  includeBehaviorRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeStabilityConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeStabilityAnalysis: boolean;
    includeComponentAnalysis: boolean;
    includeGoalAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    stabilityScore: number;
    componentScores: {
      component: string;
      score: number;
    }[];
    goalProgress: {
      goal: string;
      progress: number;
    }[];
  }[];
  
  // Stability Preferences
  includeStabilityAnalysis: boolean;
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

export interface FinancialStabilityCalculatorResults {
  // Core Financial Stability Metrics
  financialStabilityScore: number;
  cashFlowStabilityScore: number;
  incomeStabilityScore: number;
  expenseStabilityScore: number;
  debtStabilityScore: number;
  assetStabilityScore: number;
  investmentStabilityScore: number;
  savingsStabilityScore: number;
  retirementStabilityScore: number;
  insuranceStabilityScore: number;
  
  // Financial Stability Analysis
  financialStabilityAnalysis: {
    financialStabilityScore: number;
    cashFlowStabilityScore: number;
    incomeStabilityScore: number;
    expenseStabilityScore: number;
    debtStabilityScore: number;
    assetStabilityScore: number;
    investmentStabilityScore: number;
    savingsStabilityScore: number;
    retirementStabilityScore: number;
    insuranceStabilityScore: number;
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
  
  // Stability Assessment Analysis
  stabilityAssessmentAnalysis: {
    stabilityComponents: {
      component: string;
      score: number;
      weight: number;
      status: string;
      description: string;
    }[];
    stabilityMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    stabilityGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    stabilityChallenges: {
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
    cashFlowStability: {
      operatingCashFlow: boolean;
      investingCashFlow: boolean;
      financingCashFlow: boolean;
      freeCashFlow: boolean;
      discretionaryCashFlow: boolean;
      netCashFlow: boolean;
      cashFlowStability: boolean;
      cashFlowProjection: boolean;
      cashFlowOptimization: boolean;
    };
    incomeStability: {
      totalIncomeStability: boolean;
      employmentIncomeStability: boolean;
      investmentIncomeStability: boolean;
      rentalIncomeStability: boolean;
      businessIncomeStability: boolean;
      passiveIncomeStability: boolean;
      incomeDiversification: boolean;
      incomeGrowth: boolean;
      incomeProjection: boolean;
    };
    expenseStability: {
      totalExpenseStability: boolean;
      essentialExpenseStability: boolean;
      discretionaryExpenseStability: boolean;
      expenseInflation: boolean;
      expenseOptimization: boolean;
      expenseProjection: boolean;
      expenseControl: boolean;
      expenseMonitoring: boolean;
      expensePlanning: boolean;
    };
    debtStability: {
      totalDebtStability: boolean;
      mortgageDebtStability: boolean;
      consumerDebtStability: boolean;
      studentLoanStability: boolean;
      businessDebtStability: boolean;
      debtToIncomeRatio: boolean;
      debtToAssetRatio: boolean;
      debtProjection: boolean;
      debtOptimization: boolean;
    };
    assetStability: {
      totalAssetStability: boolean;
      investmentAssetStability: boolean;
      realEstateAssetStability: boolean;
      businessAssetStability: boolean;
      retirementAssetStability: boolean;
      cashAssetStability: boolean;
      assetDiversification: boolean;
      assetProjection: boolean;
      assetOptimization: boolean;
    };
    investmentStability: {
      portfolioStability: boolean;
      investmentReturns: boolean;
      investmentRisk: boolean;
      investmentDiversification: boolean;
      investmentLiquidity: boolean;
      investmentProjection: boolean;
      investmentOptimization: boolean;
      investmentMonitoring: boolean;
      investmentPlanning: boolean;
    };
    savingsStability: {
      savingsRate: boolean;
      savingsStability: boolean;
      emergencyFund: boolean;
      shortTermSavings: boolean;
      longTermSavings: boolean;
      savingsProjection: boolean;
      savingsOptimization: boolean;
      savingsMonitoring: boolean;
      savingsPlanning: boolean;
    };
    retirementStability: {
      retirementIncome: boolean;
      retirementExpenses: boolean;
      retirementSavings: boolean;
      retirementInvestments: boolean;
      retirementProjection: boolean;
      retirementOptimization: boolean;
      retirementMonitoring: boolean;
      retirementPlanning: boolean;
      retirementSecurity: boolean;
    };
    insuranceStability: {
      healthInsurance: boolean;
      lifeInsurance: boolean;
      disabilityInsurance: boolean;
      propertyInsurance: boolean;
      liabilityInsurance: boolean;
      insuranceCoverage: boolean;
      insuranceCost: boolean;
      insuranceProjection: boolean;
      insuranceOptimization: boolean;
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
    stabilityPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    riskManagementStrategy: {
      strategy: string;
      description: string;
      riskManagementMethods: string[];
      riskManagementFrequency: string;
      riskManagementMetrics: string[];
    };
    monitoringStrategy: {
      strategy: string;
      description: string;
      monitoringFrequency: string;
      monitoringMethods: string[];
      stabilityThresholds: string[];
    };
    strategyEfficiency: number;
  };
  
  // Stability Optimization Analysis
  stabilityOptimizationAnalysis: {
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
    lowStabilityScore: number;
    highStabilityScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanStabilityScore: number;
    medianStabilityScore: number;
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
  
  // Financial Stability Planning Analysis
  financialStabilityPlanningAnalysis: {
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
      benchmarkStability: number;
      planStability: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Stability Score
  financialStabilityScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      cashFlowStability: number;
      incomeStability: number;
      expenseStability: number;
      debtStability: number;
      assetStability: number;
      investmentStability: number;
      savingsStability: number;
      retirementStability: number;
      insuranceStability: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      stabilityScore: number;
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
    stabilityImprovement: number;
    riskReduction: number;
    securityGain: number;
    confidenceImprovement: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    stabilityAssessment: string;
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
    financialStabilityScore: number;
    cashFlowStabilityScore: number;
    incomeStabilityScore: number;
    expenseStabilityScore: number;
    debtStabilityScore: number;
    assetStabilityScore: number;
    investmentStabilityScore: number;
    savingsStabilityScore: number;
    retirementStabilityScore: number;
    insuranceStabilityScore: number;
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
