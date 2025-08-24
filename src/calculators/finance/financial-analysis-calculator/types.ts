export interface FinancialAnalysisCalculatorInputs {
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
  
  // Financial Analysis Assessment
  financialAnalysisAssessment: {
    // Analysis Components
    analysisComponents: {
      component: string;
      score: number;
      weight: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      description: string;
    }[];
    
    // Analysis Metrics
    analysisMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    
    // Analysis Goals
    analysisGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Analysis Challenges
    analysisChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: 'low' | 'medium' | 'high';
      solutions: string[];
    }[];
  };
  
  // Analysis Components
  analysisComponents: {
    // Cash Flow Analysis
    cashFlowAnalysis: {
      monthlyIncome: number;
      monthlyExpenses: number;
      netCashFlow: number;
      cashFlowProjection: number;
      emergencyFund: number;
      emergencyFundMonths: number;
      cashFlowStability: 'stable' | 'moderate' | 'volatile';
      cashFlowEfficiency: number;
      cashFlowOptimization: boolean;
      cashFlowMonitoring: boolean;
      cashFlowReporting: boolean;
    };
    
    // Profitability Analysis
    profitabilityAnalysis: {
      grossIncome: number;
      netIncome: number;
      profitMargin: number;
      operatingExpenses: number;
      operatingMargin: number;
      netProfitMargin: number;
      returnOnAssets: number;
      returnOnEquity: number;
      profitabilityTrends: string[];
      profitabilityBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    
    // Liquidity Analysis
    liquidityAnalysis: {
      currentAssets: number;
      currentLiabilities: number;
      currentRatio: number;
      quickRatio: number;
      cashRatio: number;
      workingCapital: number;
      workingCapitalRatio: number;
      liquidityTrends: string[];
      liquidityBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    
    // Solvency Analysis
    solvencyAnalysis: {
      totalAssets: number;
      totalLiabilities: number;
      debtToAssetRatio: number;
      debtToEquityRatio: number;
      equityRatio: number;
      debtServiceCoverage: number;
      interestCoverage: number;
      solvencyTrends: string[];
      solvencyBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    
    // Efficiency Analysis
    efficiencyAnalysis: {
      assetTurnover: number;
      inventoryTurnover: number;
      receivablesTurnover: number;
      payablesTurnover: number;
      operatingCycle: number;
      cashConversionCycle: number;
      efficiencyTrends: string[];
      efficiencyBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    
    // Growth Analysis
    growthAnalysis: {
      revenueGrowth: number;
      incomeGrowth: number;
      assetGrowth: number;
      equityGrowth: number;
      growthTrends: string[];
      growthProjections: {
        period: string;
        projectedGrowth: number;
        confidence: number;
      }[];
      growthBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    
    // Risk Analysis
    riskAnalysis: {
      riskAssessment: string;
      riskIdentification: string[];
      riskQuantification: boolean;
      riskMitigation: string[];
      riskTolerance: string;
      riskCapacity: string;
      riskBudget: number;
      riskLimits: {
        category: string;
        limit: number;
        current: number;
      }[];
      riskTrends: string[];
      riskBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    
    // Valuation Analysis
    valuationAnalysis: {
      netWorth: number;
      assetValuation: number;
      liabilityValuation: number;
      equityValuation: number;
      valuationMethods: string[];
      valuationTrends: string[];
      valuationBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
      valuationProjections: {
        period: string;
        projectedValue: number;
        confidence: number;
      }[];
    };
  };
  
  // Analysis Goals
  analysisGoals: {
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
  
  // Analysis Strategy
  analysisStrategy: {
    // Analysis Plan
    analysisPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    
    // Monitoring Strategy
    monitoringStrategy: {
      strategy: string;
      description: string;
      monitoringMetrics: string[];
      reviewFrequency: string;
      adjustmentTriggers: string[];
    };
    
    // Reporting Strategy
    reportingStrategy: {
      strategy: string;
      description: string;
      reportingMetrics: string[];
      reportingFrequency: string;
      reportingFormat: string;
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
    
    // Analysis Assumptions
    analysisAssumptions: {
      analysisRate: number;
      monitoringRate: number;
      reportingRate: number;
      analysisDecay: number;
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
  includeAnalysisRisk: boolean;
  includeBehaviorRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeAnalysisConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeAnalysisAnalysis: boolean;
    includeComponentAnalysis: boolean;
    includeGoalAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    analysisScore: number;
    componentScores: {
      component: string;
      score: number;
    }[];
    goalProgress: {
      goal: string;
      progress: number;
    }[];
  }[];
  
  // Reporting Preferences
  includeAnalysisAnalysis: boolean;
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

export interface FinancialAnalysisCalculatorResults {
  // Core Financial Analysis Metrics
  financialAnalysisScore: number;
  cashFlowAnalysisScore: number;
  profitabilityAnalysisScore: number;
  liquidityAnalysisScore: number;
  solvencyAnalysisScore: number;
  efficiencyAnalysisScore: number;
  growthAnalysisScore: number;
  riskAnalysisScore: number;
  valuationAnalysisScore: number;
  
  // Financial Analysis Analysis
  financialAnalysisAnalysis: {
    financialAnalysisScore: number;
    cashFlowAnalysisScore: number;
    profitabilityAnalysisScore: number;
    liquidityAnalysisScore: number;
    solvencyAnalysisScore: number;
    efficiencyAnalysisScore: number;
    growthAnalysisScore: number;
    riskAnalysisScore: number;
    valuationAnalysisScore: number;
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
  
  // Analysis Assessment Analysis
  analysisAssessmentAnalysis: {
    analysisComponents: {
      component: string;
      score: number;
      weight: number;
      status: string;
      description: string;
    }[];
    analysisMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    analysisGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    analysisChallenges: {
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
    cashFlowAnalysis: {
      monthlyIncome: number;
      monthlyExpenses: number;
      netCashFlow: number;
      cashFlowProjection: number;
      emergencyFund: number;
      emergencyFundMonths: number;
      cashFlowStability: string;
      cashFlowEfficiency: number;
      cashFlowOptimization: boolean;
      cashFlowMonitoring: boolean;
      cashFlowReporting: boolean;
    };
    profitabilityAnalysis: {
      grossIncome: number;
      netIncome: number;
      profitMargin: number;
      operatingExpenses: number;
      operatingMargin: number;
      netProfitMargin: number;
      returnOnAssets: number;
      returnOnEquity: number;
      profitabilityTrends: string[];
      profitabilityBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    liquidityAnalysis: {
      currentAssets: number;
      currentLiabilities: number;
      currentRatio: number;
      quickRatio: number;
      cashRatio: number;
      workingCapital: number;
      workingCapitalRatio: number;
      liquidityTrends: string[];
      liquidityBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    solvencyAnalysis: {
      totalAssets: number;
      totalLiabilities: number;
      debtToAssetRatio: number;
      debtToEquityRatio: number;
      equityRatio: number;
      debtServiceCoverage: number;
      interestCoverage: number;
      solvencyTrends: string[];
      solvencyBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    efficiencyAnalysis: {
      assetTurnover: number;
      inventoryTurnover: number;
      receivablesTurnover: number;
      payablesTurnover: number;
      operatingCycle: number;
      cashConversionCycle: number;
      efficiencyTrends: string[];
      efficiencyBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    growthAnalysis: {
      revenueGrowth: number;
      incomeGrowth: number;
      assetGrowth: number;
      equityGrowth: number;
      growthTrends: string[];
      growthProjections: {
        period: string;
        projectedGrowth: number;
        confidence: number;
      }[];
      growthBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    riskAnalysis: {
      riskAssessment: string;
      riskIdentification: string[];
      riskQuantification: boolean;
      riskMitigation: string[];
      riskTolerance: string;
      riskCapacity: string;
      riskBudget: number;
      riskLimits: {
        category: string;
        limit: number;
        current: number;
      }[];
      riskTrends: string[];
      riskBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
    };
    valuationAnalysis: {
      netWorth: number;
      assetValuation: number;
      liabilityValuation: number;
      equityValuation: number;
      valuationMethods: string[];
      valuationTrends: string[];
      valuationBenchmarks: {
        metric: string;
        value: number;
        benchmark: number;
        status: string;
      }[];
      valuationProjections: {
        period: string;
        projectedValue: number;
        confidence: number;
      }[];
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
    analysisPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    monitoringStrategy: {
      strategy: string;
      description: string;
      monitoringMetrics: string[];
      reviewFrequency: string;
      adjustmentTriggers: string[];
    };
    reportingStrategy: {
      strategy: string;
      description: string;
      reportingMetrics: string[];
      reportingFrequency: string;
      reportingFormat: string;
    };
    strategyEfficiency: number;
  };
  
  // Analysis Optimization Analysis
  analysisOptimizationAnalysis: {
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
    lowAnalysisScore: number;
    highAnalysisScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanAnalysisScore: number;
    medianAnalysisScore: number;
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
  
  // Financial Analysis Planning Analysis
  financialAnalysisPlanningAnalysis: {
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
      benchmarkAnalysis: number;
      planAnalysis: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Analysis Score
  financialAnalysisScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      cashFlowAnalysis: number;
      profitabilityAnalysis: number;
      liquidityAnalysis: number;
      solvencyAnalysis: number;
      efficiencyAnalysis: number;
      growthAnalysis: number;
      riskAnalysis: number;
      valuationAnalysis: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      analysisScore: number;
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
    analysisImprovement: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    analysisAssessment: string;
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
    financialAnalysisScore: number;
    cashFlowAnalysisScore: number;
    profitabilityAnalysisScore: number;
    liquidityAnalysisScore: number;
    solvencyAnalysisScore: number;
    efficiencyAnalysisScore: number;
    growthAnalysisScore: number;
    riskAnalysisScore: number;
    valuationAnalysisScore: number;
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
