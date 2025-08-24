export interface FinancialPeaceCalculatorInputs {
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
  
  // Financial Peace Assessment
  financialPeaceAssessment: {
    // Peace Components
    peaceComponents: {
      component: string;
      score: number;
      weight: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      description: string;
    }[];
    
    // Peace Metrics
    peaceMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    
    // Peace Goals
    peaceGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Peace Challenges
    peaceChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: 'low' | 'medium' | 'high';
      solutions: string[];
    }[];
  };
  
  // Peace Components
  peaceComponents: {
    // Financial Peace
    financialPeace: {
      wealthPeace: boolean;
      incomePeace: boolean;
      securityPeace: boolean;
      freedomPeace: boolean;
      abundancePeace: boolean;
      prosperityPeace: boolean;
      comfortPeace: boolean;
      luxuryPeace: boolean;
      legacyPeace: boolean;
    };
    
    // Personal Peace
    personalPeace: {
      healthPeace: boolean;
      fitnessPeace: boolean;
      wellnessPeace: boolean;
      energyPeace: boolean;
      vitalityPeace: boolean;
      strengthPeace: boolean;
      resiliencePeace: boolean;
      longevityPeace: boolean;
      wellbeingPeace: boolean;
    };
    
    // Relationship Peace
    relationshipPeace: {
      familyPeace: boolean;
      friendshipPeace: boolean;
      lovePeace: boolean;
      connectionPeace: boolean;
      communityPeace: boolean;
      socialPeace: boolean;
      supportPeace: boolean;
      belongingPeace: boolean;
      intimacyPeace: boolean;
    };
    
    // Career Peace
    careerPeace: {
      workPeace: boolean;
      achievementPeace: boolean;
      growthPeace: boolean;
      learningPeace: boolean;
      contributionPeace: boolean;
      impactPeace: boolean;
      recognitionPeace: boolean;
      advancementPeace: boolean;
      successPeace: boolean;
    };
    
    // Lifestyle Peace
    lifestylePeace: {
      travelPeace: boolean;
      experiencePeace: boolean;
      adventurePeace: boolean;
      leisurePeace: boolean;
      recreationPeace: boolean;
      enjoymentPeace: boolean;
      funPeace: boolean;
      pleasurePeace: boolean;
      satisfactionPeace: boolean;
    };
    
    // Spiritual Peace
    spiritualPeace: {
      faithPeace: boolean;
      purposePeace: boolean;
      meaningPeace: boolean;
      connectionPeace: boolean;
      innerPeace: boolean;
      wisdomPeace: boolean;
      enlightenmentPeace: boolean;
      transcendencePeace: boolean;
      divinePeace: boolean;
    };
    
    // Creative Peace
    creativePeace: {
      expressionPeace: boolean;
      artPeace: boolean;
      musicPeace: boolean;
      writingPeace: boolean;
      designPeace: boolean;
      innovationPeace: boolean;
      imaginationPeace: boolean;
      inspirationPeace: boolean;
      beautyPeace: boolean;
    };
    
    // Intellectual Peace
    intellectualPeace: {
      knowledgePeace: boolean;
      learningPeace: boolean;
      wisdomPeace: boolean;
      understandingPeace: boolean;
      insightPeace: boolean;
      discoveryPeace: boolean;
      explorationPeace: boolean;
      curiosityPeace: boolean;
      growthPeace: boolean;
    };
    
    // Emotional Peace
    emotionalPeace: {
      happinessPeace: boolean;
      joyPeace: boolean;
      contentmentPeace: boolean;
      gratitudePeace: boolean;
      lovePeace: boolean;
      compassionPeace: boolean;
      empathyPeace: boolean;
      harmonyPeace: boolean;
      blissPeace: boolean;
    };
  };
  
  // Peace Goals
  peaceGoals: {
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
  
  // Peace Strategy
  peaceStrategy: {
    // Peace Plan
    peacePlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedPeace: number;
    };
    
    // Harmony Strategy
    harmonyStrategy: {
      strategy: string;
      description: string;
      harmonyMethods: string[];
      harmonyFrequency: string;
      harmonyMetrics: string[];
    };
    
    // Balance Strategy
    balanceStrategy: {
      strategy: string;
      description: string;
      balanceMethods: string[];
      balanceFrequency: string;
      balanceMetrics: string[];
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
    
    // Peace Assumptions
    peaceAssumptions: {
      peaceRate: number;
      harmonyRate: number;
      balanceRate: number;
      peaceDecay: number;
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
  includePeaceRisk: boolean;
  includeBehaviorRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includePeaceConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePeaceAnalysis: boolean;
    includeComponentAnalysis: boolean;
    includeGoalAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    peaceScore: number;
    componentScores: {
      component: string;
      score: number;
    }[];
    goalProgress: {
      goal: string;
      progress: number;
    }[];
  }[];
  
  // Peace Preferences
  includePeaceAnalysis: boolean;
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

export interface FinancialPeaceCalculatorResults {
  // Core Financial Peace Metrics
  financialPeaceScore: number;
  personalPeaceScore: number;
  relationshipPeaceScore: number;
  careerPeaceScore: number;
  lifestylePeaceScore: number;
  spiritualPeaceScore: number;
  creativePeaceScore: number;
  intellectualPeaceScore: number;
  emotionalPeaceScore: number;
  
  // Financial Peace Analysis
  financialPeaceAnalysis: {
    financialPeaceScore: number;
    personalPeaceScore: number;
    relationshipPeaceScore: number;
    careerPeaceScore: number;
    lifestylePeaceScore: number;
    spiritualPeaceScore: number;
    creativePeaceScore: number;
    intellectualPeaceScore: number;
    emotionalPeaceScore: number;
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
  
  // Peace Assessment Analysis
  peaceAssessmentAnalysis: {
    peaceComponents: {
      component: string;
      score: number;
      weight: number;
      status: string;
      description: string;
    }[];
    peaceMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    peaceGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    peaceChallenges: {
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
    financialPeace: {
      wealthPeace: boolean;
      incomePeace: boolean;
      securityPeace: boolean;
      freedomPeace: boolean;
      abundancePeace: boolean;
      prosperityPeace: boolean;
      comfortPeace: boolean;
      luxuryPeace: boolean;
      legacyPeace: boolean;
    };
    personalPeace: {
      healthPeace: boolean;
      fitnessPeace: boolean;
      wellnessPeace: boolean;
      energyPeace: boolean;
      vitalityPeace: boolean;
      strengthPeace: boolean;
      resiliencePeace: boolean;
      longevityPeace: boolean;
      wellbeingPeace: boolean;
    };
    relationshipPeace: {
      familyPeace: boolean;
      friendshipPeace: boolean;
      lovePeace: boolean;
      connectionPeace: boolean;
      communityPeace: boolean;
      socialPeace: boolean;
      supportPeace: boolean;
      belongingPeace: boolean;
      intimacyPeace: boolean;
    };
    careerPeace: {
      workPeace: boolean;
      achievementPeace: boolean;
      growthPeace: boolean;
      learningPeace: boolean;
      contributionPeace: boolean;
      impactPeace: boolean;
      recognitionPeace: boolean;
      advancementPeace: boolean;
      successPeace: boolean;
    };
    lifestylePeace: {
      travelPeace: boolean;
      experiencePeace: boolean;
      adventurePeace: boolean;
      leisurePeace: boolean;
      recreationPeace: boolean;
      enjoymentPeace: boolean;
      funPeace: boolean;
      pleasurePeace: boolean;
      satisfactionPeace: boolean;
    };
    spiritualPeace: {
      faithPeace: boolean;
      purposePeace: boolean;
      meaningPeace: boolean;
      connectionPeace: boolean;
      innerPeace: boolean;
      wisdomPeace: boolean;
      enlightenmentPeace: boolean;
      transcendencePeace: boolean;
      divinePeace: boolean;
    };
    creativePeace: {
      expressionPeace: boolean;
      artPeace: boolean;
      musicPeace: boolean;
      writingPeace: boolean;
      designPeace: boolean;
      innovationPeace: boolean;
      imaginationPeace: boolean;
      inspirationPeace: boolean;
      beautyPeace: boolean;
    };
    intellectualPeace: {
      knowledgePeace: boolean;
      learningPeace: boolean;
      wisdomPeace: boolean;
      understandingPeace: boolean;
      insightPeace: boolean;
      discoveryPeace: boolean;
      explorationPeace: boolean;
      curiosityPeace: boolean;
      growthPeace: boolean;
    };
    emotionalPeace: {
      happinessPeace: boolean;
      joyPeace: boolean;
      contentmentPeace: boolean;
      gratitudePeace: boolean;
      lovePeace: boolean;
      compassionPeace: boolean;
      empathyPeace: boolean;
      harmonyPeace: boolean;
      blissPeace: boolean;
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
    peacePlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedPeace: number;
    };
    harmonyStrategy: {
      strategy: string;
      description: string;
      harmonyMethods: string[];
      harmonyFrequency: string;
      harmonyMetrics: string[];
    };
    balanceStrategy: {
      strategy: string;
      description: string;
      balanceMethods: string[];
      balanceFrequency: string;
      balanceMetrics: string[];
    };
    strategyEfficiency: number;
  };
  
  // Peace Optimization Analysis
  peaceOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialPeace: number;
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
    lowPeaceScore: number;
    highPeaceScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanPeaceScore: number;
    medianPeaceScore: number;
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
  
  // Financial Peace Planning Analysis
  financialPeacePlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialPeace: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    planningStrategies: {
      strategy: string;
      description: string;
      expectedPeace: number;
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
      benchmarkPeace: number;
      planPeace: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Peace Score
  financialPeaceScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      financialPeace: number;
      personalPeace: number;
      relationshipPeace: number;
      careerPeace: number;
      lifestylePeace: number;
      spiritualPeace: number;
      creativePeace: number;
      intellectualPeace: number;
      emotionalPeace: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      peaceScore: number;
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
    peaceImprovement: number;
    harmonyGain: number;
    satisfactionImprovement: number;
    wellbeingImprovement: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    peaceAssessment: string;
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
    financialPeaceScore: number;
    personalPeaceScore: number;
    relationshipPeaceScore: number;
    careerPeaceScore: number;
    lifestylePeaceScore: number;
    spiritualPeaceScore: number;
    creativePeaceScore: number;
    intellectualPeaceScore: number;
    emotionalPeaceScore: number;
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedPeace: number;
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
