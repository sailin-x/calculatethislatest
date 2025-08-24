export interface FinancialLegacyCalculatorInputs {
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
  
  // Financial Legacy Assessment
  financialLegacyAssessment: {
    // Legacy Components
    legacyComponents: {
      component: string;
      score: number;
      weight: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      description: string;
    }[];
    
    // Legacy Metrics
    legacyMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    
    // Legacy Goals
    legacyGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Legacy Challenges
    legacyChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: 'low' | 'medium' | 'high';
      solutions: string[];
    }[];
  };
  
  // Legacy Components
  legacyComponents: {
    // Wealth Legacy
    wealthLegacy: {
      financialWealth: boolean;
      realEstateWealth: boolean;
      businessWealth: boolean;
      investmentWealth: boolean;
      intellectualWealth: boolean;
      socialWealth: boolean;
      culturalWealth: boolean;
      spiritualWealth: boolean;
      generationalWealth: boolean;
    };
    
    // Knowledge Legacy
    knowledgeLegacy: {
      financialKnowledge: boolean;
      businessKnowledge: boolean;
      lifeKnowledge: boolean;
      skillKnowledge: boolean;
      wisdomKnowledge: boolean;
      experienceKnowledge: boolean;
      learningKnowledge: boolean;
      teachingKnowledge: boolean;
      mentoringKnowledge: boolean;
    };
    
    // Values Legacy
    valuesLegacy: {
      personalValues: boolean;
      familyValues: boolean;
      businessValues: boolean;
      communityValues: boolean;
      ethicalValues: boolean;
      spiritualValues: boolean;
      culturalValues: boolean;
      socialValues: boolean;
      generationalValues: boolean;
    };
    
    // Impact Legacy
    impactLegacy: {
      familyImpact: boolean;
      communityImpact: boolean;
      businessImpact: boolean;
      socialImpact: boolean;
      environmentalImpact: boolean;
      culturalImpact: boolean;
      educationalImpact: boolean;
      charitableImpact: boolean;
      globalImpact: boolean;
    };
    
    // Philanthropy Legacy
    philanthropyLegacy: {
      charitableGiving: boolean;
      foundationCreation: boolean;
      communityService: boolean;
      volunteerWork: boolean;
      socialCauses: boolean;
      environmentalCauses: boolean;
      educationalCauses: boolean;
      healthcareCauses: boolean;
      culturalCauses: boolean;
    };
    
    // Family Legacy
    familyLegacy: {
      familyUnity: boolean;
      familyEducation: boolean;
      familyValues: boolean;
      familyBusiness: boolean;
      familyWealth: boolean;
      familyTraditions: boolean;
      familyStories: boolean;
      familyConnections: boolean;
      familyFuture: boolean;
    };
    
    // Business Legacy
    businessLegacy: {
      businessSuccess: boolean;
      businessInnovation: boolean;
      businessLeadership: boolean;
      businessCulture: boolean;
      businessSustainability: boolean;
      businessGrowth: boolean;
      businessImpact: boolean;
      businessContinuity: boolean;
      businessFuture: boolean;
    };
    
    // Community Legacy
    communityLegacy: {
      communityLeadership: boolean;
      communityService: boolean;
      communityDevelopment: boolean;
      communityEducation: boolean;
      communityHealth: boolean;
      communityCulture: boolean;
      communityUnity: boolean;
      communityGrowth: boolean;
      communityFuture: boolean;
    };
    
    // Personal Legacy
    personalLegacy: {
      personalAchievement: boolean;
      personalGrowth: boolean;
      personalWisdom: boolean;
      personalCharacter: boolean;
      personalInfluence: boolean;
      personalInspiration: boolean;
      personalLeadership: boolean;
      personalImpact: boolean;
      personalMemory: boolean;
    };
  };
  
  // Legacy Goals
  legacyGoals: {
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
  
  // Legacy Strategy
  legacyStrategy: {
    // Legacy Plan
    legacyPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImpact: number;
    };
    
    // Estate Planning Strategy
    estatePlanningStrategy: {
      strategy: string;
      description: string;
      estatePlanningMethods: string[];
      estatePlanningFrequency: string;
      estatePlanningMetrics: string[];
    };
    
    // Philanthropy Strategy
    philanthropyStrategy: {
      strategy: string;
      description: string;
      philanthropyMethods: string[];
      philanthropyFrequency: string;
      philanthropyMetrics: string[];
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
    
    // Legacy Assumptions
    legacyAssumptions: {
      legacyGrowthRate: number;
      impactMultiplier: number;
      sustainabilityRate: number;
      legacyDecay: number;
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
  includeLegacyRisk: boolean;
  includeBehaviorRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeLegacyConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeLegacyAnalysis: boolean;
    includeComponentAnalysis: boolean;
    includeGoalAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    legacyScore: number;
    componentScores: {
      component: string;
      score: number;
    }[];
    goalProgress: {
      goal: string;
      progress: number;
    }[];
  }[];
  
  // Legacy Preferences
  includeLegacyAnalysis: boolean;
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

export interface FinancialLegacyCalculatorResults {
  // Core Financial Legacy Metrics
  financialLegacyScore: number;
  wealthLegacyScore: number;
  knowledgeLegacyScore: number;
  valuesLegacyScore: number;
  impactLegacyScore: number;
  philanthropyLegacyScore: number;
  familyLegacyScore: number;
  businessLegacyScore: number;
  communityLegacyScore: number;
  personalLegacyScore: number;
  
  // Financial Legacy Analysis
  financialLegacyAnalysis: {
    financialLegacyScore: number;
    wealthLegacyScore: number;
    knowledgeLegacyScore: number;
    valuesLegacyScore: number;
    impactLegacyScore: number;
    philanthropyLegacyScore: number;
    familyLegacyScore: number;
    businessLegacyScore: number;
    communityLegacyScore: number;
    personalLegacyScore: number;
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
  
  // Legacy Assessment Analysis
  legacyAssessmentAnalysis: {
    legacyComponents: {
      component: string;
      score: number;
      weight: number;
      status: string;
      description: string;
    }[];
    legacyMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    legacyGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    legacyChallenges: {
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
    wealthLegacy: {
      financialWealth: boolean;
      realEstateWealth: boolean;
      businessWealth: boolean;
      investmentWealth: boolean;
      intellectualWealth: boolean;
      socialWealth: boolean;
      culturalWealth: boolean;
      spiritualWealth: boolean;
      generationalWealth: boolean;
    };
    knowledgeLegacy: {
      financialKnowledge: boolean;
      businessKnowledge: boolean;
      lifeKnowledge: boolean;
      skillKnowledge: boolean;
      wisdomKnowledge: boolean;
      experienceKnowledge: boolean;
      learningKnowledge: boolean;
      teachingKnowledge: boolean;
      mentoringKnowledge: boolean;
    };
    valuesLegacy: {
      personalValues: boolean;
      familyValues: boolean;
      businessValues: boolean;
      communityValues: boolean;
      ethicalValues: boolean;
      spiritualValues: boolean;
      culturalValues: boolean;
      socialValues: boolean;
      generationalValues: boolean;
    };
    impactLegacy: {
      familyImpact: boolean;
      communityImpact: boolean;
      businessImpact: boolean;
      socialImpact: boolean;
      environmentalImpact: boolean;
      culturalImpact: boolean;
      educationalImpact: boolean;
      charitableImpact: boolean;
      globalImpact: boolean;
    };
    philanthropyLegacy: {
      charitableGiving: boolean;
      foundationCreation: boolean;
      communityService: boolean;
      volunteerWork: boolean;
      socialCauses: boolean;
      environmentalCauses: boolean;
      educationalCauses: boolean;
      healthcareCauses: boolean;
      culturalCauses: boolean;
    };
    familyLegacy: {
      familyUnity: boolean;
      familyEducation: boolean;
      familyValues: boolean;
      familyBusiness: boolean;
      familyWealth: boolean;
      familyTraditions: boolean;
      familyStories: boolean;
      familyConnections: boolean;
      familyFuture: boolean;
    };
    businessLegacy: {
      businessSuccess: boolean;
      businessInnovation: boolean;
      businessLeadership: boolean;
      businessCulture: boolean;
      businessSustainability: boolean;
      businessGrowth: boolean;
      businessImpact: boolean;
      businessContinuity: boolean;
      businessFuture: boolean;
    };
    communityLegacy: {
      communityLeadership: boolean;
      communityService: boolean;
      communityDevelopment: boolean;
      communityEducation: boolean;
      communityHealth: boolean;
      communityCulture: boolean;
      communityUnity: boolean;
      communityGrowth: boolean;
      communityFuture: boolean;
    };
    personalLegacy: {
      personalAchievement: boolean;
      personalGrowth: boolean;
      personalWisdom: boolean;
      personalCharacter: boolean;
      personalInfluence: boolean;
      personalInspiration: boolean;
      personalLeadership: boolean;
      personalImpact: boolean;
      personalMemory: boolean;
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
    legacyPlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImpact: number;
    };
    estatePlanningStrategy: {
      strategy: string;
      description: string;
      estatePlanningMethods: string[];
      estatePlanningFrequency: string;
      estatePlanningMetrics: string[];
    };
    philanthropyStrategy: {
      strategy: string;
      description: string;
      philanthropyMethods: string[];
      philanthropyFrequency: string;
      philanthropyMetrics: string[];
    };
    strategyEfficiency: number;
  };
  
  // Legacy Optimization Analysis
  legacyOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImpact: number;
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
    lowLegacyScore: number;
    highLegacyScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanLegacyScore: number;
    medianLegacyScore: number;
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
  
  // Financial Legacy Planning Analysis
  financialLegacyPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImpact: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    planningStrategies: {
      strategy: string;
      description: string;
      expectedImpact: number;
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
      benchmarkLegacy: number;
      planLegacy: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Legacy Score
  financialLegacyScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      wealthLegacy: number;
      knowledgeLegacy: number;
      valuesLegacy: number;
      impactLegacy: number;
      philanthropyLegacy: number;
      familyLegacy: number;
      businessLegacy: number;
      communityLegacy: number;
      personalLegacy: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      legacyScore: number;
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
    legacyImprovement: number;
    impactMultiplier: number;
    sustainabilityGain: number;
    influenceImprovement: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    legacyAssessment: string;
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
    financialLegacyScore: number;
    wealthLegacyScore: number;
    knowledgeLegacyScore: number;
    valuesLegacyScore: number;
    impactLegacyScore: number;
    philanthropyLegacyScore: number;
    familyLegacyScore: number;
    businessLegacyScore: number;
    communityLegacyScore: number;
    personalLegacyScore: number;
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
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
