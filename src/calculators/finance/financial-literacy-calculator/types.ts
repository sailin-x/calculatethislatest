export interface FinancialLiteracyCalculatorInputs {
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
  
  // Financial Literacy Assessment
  financialLiteracyAssessment: {
    // Literacy Components
    literacyComponents: {
      component: string;
      score: number;
      weight: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      description: string;
    }[];
    
    // Literacy Metrics
    literacyMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    
    // Literacy Goals
    literacyGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Literacy Challenges
    literacyChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: 'low' | 'medium' | 'high';
      solutions: string[];
    }[];
  };
  
  // Literacy Components
  literacyComponents: {
    // Basic Financial Concepts
    basicFinancialConcepts: {
      understandingOfMoney: 'low' | 'medium' | 'high';
      understandingOfInflation: 'low' | 'medium' | 'high';
      understandingOfInterest: 'low' | 'medium' | 'high';
      understandingOfTaxes: 'low' | 'medium' | 'high';
      understandingOfInsurance: 'low' | 'medium' | 'high';
      understandingOfCredit: 'low' | 'medium' | 'high';
    };
    
    // Budgeting Literacy
    budgetingLiteracy: {
      hasBudget: boolean;
      budgetType: 'none' | 'mental' | 'written' | 'digital' | 'app';
      budgetFrequency: 'never' | 'monthly' | 'weekly' | 'daily';
      budgetAdherence: number;
      budgetFlexibility: number;
      budgetAccuracy: number;
      expenseTracking: boolean;
      incomeTracking: boolean;
    };
    
    // Saving Literacy
    savingLiteracy: {
      hasEmergencyFund: boolean;
      emergencyFundAmount: number;
      emergencyFundMonths: number;
      savingsRate: number;
      automaticSavings: boolean;
      savingsGoals: boolean;
      savingsDiscipline: number;
      understandingOfCompoundInterest: 'low' | 'medium' | 'high';
    };
    
    // Debt Literacy
    debtLiteracy: {
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
      debtPayoffStrategy: 'none' | 'avalanche' | 'snowball' | 'hybrid';
      debtStress: 'low' | 'medium' | 'high';
      debtReduction: boolean;
      debtDiscipline: number;
      understandingOfInterestRates: 'low' | 'medium' | 'high';
      understandingOfCreditScores: 'low' | 'medium' | 'high';
    };
    
    // Investment Literacy
    investmentLiteracy: {
      investmentKnowledge: 'low' | 'medium' | 'high';
      investmentExperience: 'none' | 'beginner' | 'intermediate' | 'advanced';
      investmentStrategy: string;
      investmentConfidence: number;
      investmentDiscipline: number;
      diversification: number;
      understandingOfRisk: 'low' | 'medium' | 'high';
      understandingOfReturns: 'low' | 'medium' | 'high';
      understandingOfFees: 'low' | 'medium' | 'high';
    };
    
    // Insurance Literacy
    insuranceLiteracy: {
      hasLifeInsurance: boolean;
      hasHealthInsurance: boolean;
      hasDisabilityInsurance: boolean;
      hasPropertyInsurance: boolean;
      insuranceAdequacy: number;
      insuranceReview: boolean;
      understandingOfCoverage: 'low' | 'medium' | 'high';
      understandingOfPremiums: 'low' | 'medium' | 'high';
      understandingOfDeductibles: 'low' | 'medium' | 'high';
    };
    
    // Tax Literacy
    taxLiteracy: {
      taxKnowledge: 'low' | 'medium' | 'high';
      taxPlanning: boolean;
      taxOptimization: boolean;
      taxEfficiency: number;
      taxCompliance: boolean;
      understandingOfDeductions: 'low' | 'medium' | 'high';
      understandingOfCredits: 'low' | 'medium' | 'high';
      understandingOfTaxBrackets: 'low' | 'medium' | 'high';
    };
    
    // Retirement Literacy
    retirementLiteracy: {
      hasRetirementPlan: boolean;
      retirementSavings: number;
      retirementReadiness: number;
      retirementStrategy: string;
      retirementConfidence: number;
      understandingOfSocialSecurity: 'low' | 'medium' | 'high';
      understandingOfPensions: 'low' | 'medium' | 'high';
      understandingOfRequiredMinimumDistributions: 'low' | 'medium' | 'high';
    };
    
    // Estate Planning Literacy
    estatePlanningLiteracy: {
      hasWill: boolean;
      hasTrust: boolean;
      hasPowerOfAttorney: boolean;
      hasHealthcareDirective: boolean;
      estatePlanningCompleteness: number;
      understandingOfProbate: 'low' | 'medium' | 'high';
      understandingOfTrusts: 'low' | 'medium' | 'high';
      understandingOfEstateTaxes: 'low' | 'medium' | 'high';
    };
  };
  
  // Literacy Goals
  literacyGoals: {
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
  
  // Literacy Strategy
  literacyStrategy: {
    // Improvement Strategy
    improvementStrategy: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    
    // Maintenance Strategy
    maintenanceStrategy: {
      strategy: string;
      description: string;
      monitoringComponents: string[];
      thresholds: {
        component: string;
        warning: number;
        critical: number;
      }[];
      actions: string[];
    };
    
    // Recovery Strategy
    recoveryStrategy: {
      strategy: string;
      description: string;
      recoveryAreas: string[];
      recoveryActions: string[];
      timeline: string;
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
    
    // Literacy Assumptions
    literacyAssumptions: {
      improvementRate: number;
      maintenanceRate: number;
      recoveryRate: number;
      literacyDecay: number;
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
  includeLiteracyRisk: boolean;
  includeBehaviorRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeLiteracyConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeLiteracyAnalysis: boolean;
    includeComponentAnalysis: boolean;
    includeGoalAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    literacyScore: number;
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
  includeLiteracyAnalysis: boolean;
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

export interface FinancialLiteracyCalculatorResults {
  // Core Financial Literacy Metrics
  financialLiteracyScore: number;
  basicFinancialConceptsScore: number;
  budgetingLiteracyScore: number;
  savingLiteracyScore: number;
  debtLiteracyScore: number;
  investmentLiteracyScore: number;
  insuranceLiteracyScore: number;
  taxLiteracyScore: number;
  retirementLiteracyScore: number;
  estatePlanningLiteracyScore: number;
  
  // Financial Literacy Analysis
  financialLiteracyAnalysis: {
    financialLiteracyScore: number;
    basicFinancialConceptsScore: number;
    budgetingLiteracyScore: number;
    savingLiteracyScore: number;
    debtLiteracyScore: number;
    investmentLiteracyScore: number;
    insuranceLiteracyScore: number;
    taxLiteracyScore: number;
    retirementLiteracyScore: number;
    estatePlanningLiteracyScore: number;
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
  
  // Literacy Assessment Analysis
  literacyAssessmentAnalysis: {
    literacyComponents: {
      component: string;
      score: number;
      weight: number;
      status: string;
      description: string;
    }[];
    literacyMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    literacyGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    literacyChallenges: {
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
    basicFinancialConcepts: {
      understandingOfMoney: string;
      understandingOfInflation: string;
      understandingOfInterest: string;
      understandingOfTaxes: string;
      understandingOfInsurance: string;
      understandingOfCredit: string;
    };
    budgetingLiteracy: {
      hasBudget: boolean;
      budgetType: string;
      budgetFrequency: string;
      budgetAdherence: number;
      budgetFlexibility: number;
      budgetAccuracy: number;
      expenseTracking: boolean;
      incomeTracking: boolean;
    };
    savingLiteracy: {
      hasEmergencyFund: boolean;
      emergencyFundAmount: number;
      emergencyFundMonths: number;
      savingsRate: number;
      automaticSavings: boolean;
      savingsGoals: boolean;
      savingsDiscipline: number;
      understandingOfCompoundInterest: string;
    };
    debtLiteracy: {
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
      debtPayoffStrategy: string;
      debtStress: string;
      debtReduction: boolean;
      debtDiscipline: number;
      understandingOfInterestRates: string;
      understandingOfCreditScores: string;
    };
    investmentLiteracy: {
      investmentKnowledge: string;
      investmentExperience: string;
      investmentStrategy: string;
      investmentConfidence: number;
      investmentDiscipline: number;
      diversification: number;
      understandingOfRisk: string;
      understandingOfReturns: string;
      understandingOfFees: string;
    };
    insuranceLiteracy: {
      hasLifeInsurance: boolean;
      hasHealthInsurance: boolean;
      hasDisabilityInsurance: boolean;
      hasPropertyInsurance: boolean;
      insuranceAdequacy: number;
      insuranceReview: boolean;
      understandingOfCoverage: string;
      understandingOfPremiums: string;
      understandingOfDeductibles: string;
    };
    taxLiteracy: {
      taxKnowledge: string;
      taxPlanning: boolean;
      taxOptimization: boolean;
      taxEfficiency: number;
      taxCompliance: boolean;
      understandingOfDeductions: string;
      understandingOfCredits: string;
      understandingOfTaxBrackets: string;
    };
    retirementLiteracy: {
      hasRetirementPlan: boolean;
      retirementSavings: number;
      retirementReadiness: number;
      retirementStrategy: string;
      retirementConfidence: number;
      understandingOfSocialSecurity: string;
      understandingOfPensions: string;
      understandingOfRequiredMinimumDistributions: string;
    };
    estatePlanningLiteracy: {
      hasWill: boolean;
      hasTrust: boolean;
      hasPowerOfAttorney: boolean;
      hasHealthcareDirective: boolean;
      estatePlanningCompleteness: number;
      understandingOfProbate: string;
      understandingOfTrusts: string;
      understandingOfEstateTaxes: string;
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
    improvementStrategy: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    maintenanceStrategy: {
      strategy: string;
      description: string;
      monitoringComponents: string[];
      thresholds: {
        component: string;
        warning: number;
        critical: number;
      }[];
      actions: string[];
    };
    recoveryStrategy: {
      strategy: string;
      description: string;
      recoveryAreas: string[];
      recoveryActions: string[];
      timeline: string;
    };
    strategyEfficiency: number;
  };
  
  // Literacy Optimization Analysis
  literacyOptimizationAnalysis: {
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
    lowLiteracyScore: number;
    highLiteracyScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanLiteracyScore: number;
    medianLiteracyScore: number;
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
  
  // Financial Literacy Planning Analysis
  financialLiteracyPlanningAnalysis: {
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
      benchmarkLiteracy: number;
      planLiteracy: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Literacy Score
  financialLiteracyScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      basicConcepts: number;
      budgeting: number;
      saving: number;
      debt: number;
      investment: number;
      insurance: number;
      tax: number;
      retirement: number;
      estatePlanning: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      literacyScore: number;
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
    literacyImprovement: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    literacyAssessment: string;
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
    financialLiteracyScore: number;
    basicFinancialConceptsScore: number;
    budgetingLiteracyScore: number;
    savingLiteracyScore: number;
    debtLiteracyScore: number;
    investmentLiteracyScore: number;
    insuranceLiteracyScore: number;
    taxLiteracyScore: number;
    retirementLiteracyScore: number;
    estatePlanningLiteracyScore: number;
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
