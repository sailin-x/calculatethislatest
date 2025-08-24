export interface FinancialGovernanceCalculatorInputs {
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
  
  // Financial Governance Assessment
  financialGovernanceAssessment: {
    // Governance Components
    governanceComponents: {
      component: string;
      score: number;
      weight: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      description: string;
    }[];
    
    // Governance Metrics
    governanceMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    
    // Governance Goals
    governanceGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Governance Challenges
    governanceChallenges: {
      challenge: string;
      category: string;
      impact: number;
      difficulty: 'low' | 'medium' | 'high';
      solutions: string[];
    }[];
  };
  
  // Governance Components
  governanceComponents: {
    // Board Governance
    boardGovernance: {
      boardComposition: boolean;
      boardIndependence: boolean;
      boardExpertise: boolean;
      boardCommittees: boolean;
      boardMeetings: boolean;
      boardEvaluation: boolean;
      boardSuccession: boolean;
      boardCompensation: boolean;
      boardOversight: boolean;
    };
    
    // Executive Governance
    executiveGovernance: {
      executiveLeadership: boolean;
      executiveCompensation: boolean;
      executiveSuccession: boolean;
      executivePerformance: boolean;
      executiveAccountability: boolean;
      executiveEthics: boolean;
      executiveRiskManagement: boolean;
      executiveStrategy: boolean;
      executiveOversight: boolean;
    };
    
    // Risk Governance
    riskGovernance: {
      riskIdentification: boolean;
      riskAssessment: boolean;
      riskMitigation: boolean;
      riskMonitoring: boolean;
      riskReporting: boolean;
      riskCulture: boolean;
      riskAppetite: boolean;
      riskTolerance: boolean;
      riskOversight: boolean;
    };
    
    // Compliance Governance
    complianceGovernance: {
      complianceFramework: boolean;
      complianceMonitoring: boolean;
      complianceReporting: boolean;
      complianceTraining: boolean;
      complianceAudit: boolean;
      complianceRemediation: boolean;
      complianceCulture: boolean;
      complianceOversight: boolean;
      complianceEffectiveness: boolean;
    };
    
    // Financial Governance
    financialGovernance: {
      financialControls: boolean;
      financialReporting: boolean;
      financialAudit: boolean;
      financialTransparency: boolean;
      financialAccountability: boolean;
      financialOversight: boolean;
      financialRisk: boolean;
      financialStrategy: boolean;
      financialPerformance: boolean;
    };
    
    // Strategic Governance
    strategicGovernance: {
      strategicPlanning: boolean;
      strategicExecution: boolean;
      strategicMonitoring: boolean;
      strategicAlignment: boolean;
      strategicRisk: boolean;
      strategicPerformance: boolean;
      strategicOversight: boolean;
      strategicAdaptation: boolean;
      strategicEffectiveness: boolean;
    };
    
    // Stakeholder Governance
    stakeholderGovernance: {
      stakeholderEngagement: boolean;
      stakeholderCommunication: boolean;
      stakeholderRelations: boolean;
      stakeholderTrust: boolean;
      stakeholderValue: boolean;
      stakeholderOversight: boolean;
      stakeholderAlignment: boolean;
      stakeholderSatisfaction: boolean;
      stakeholderEffectiveness: boolean;
    };
    
    // Ethics Governance
    ethicsGovernance: {
      ethicsFramework: boolean;
      ethicsTraining: boolean;
      ethicsMonitoring: boolean;
      ethicsReporting: boolean;
      ethicsInvestigation: boolean;
      ethicsRemediation: boolean;
      ethicsCulture: boolean;
      ethicsOversight: boolean;
      ethicsEffectiveness: boolean;
    };
  };
  
  // Governance Goals
  governanceGoals: {
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
  
  // Governance Strategy
  governanceStrategy: {
    // Governance Plan
    governancePlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    
    // Oversight Strategy
    oversightStrategy: {
      strategy: string;
      description: string;
      oversightMechanisms: string[];
      oversightFrequency: string;
      oversightReporting: string;
    };
    
    // Accountability Strategy
    accountabilityStrategy: {
      strategy: string;
      description: string;
      accountabilityMechanisms: string[];
      accountabilityMeasures: string[];
      accountabilityReporting: string;
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
    
    // Governance Assumptions
    governanceAssumptions: {
      governanceRate: number;
      oversightRate: number;
      accountabilityRate: number;
      governanceDecay: number;
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
  includeGovernanceRisk: boolean;
  includeBehaviorRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeGovernanceConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGovernanceAnalysis: boolean;
    includeComponentAnalysis: boolean;
    includeGoalAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    governanceScore: number;
    componentScores: {
      component: string;
      score: number;
    }[];
    goalProgress: {
      goal: string;
      progress: number;
    }[];
  }[];
  
  // Governance Preferences
  includeGovernanceAnalysis: boolean;
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

export interface FinancialGovernanceCalculatorResults {
  // Core Financial Governance Metrics
  financialGovernanceScore: number;
  boardGovernanceScore: number;
  executiveGovernanceScore: number;
  riskGovernanceScore: number;
  complianceGovernanceScore: number;
  financialGovernanceScore: number;
  strategicGovernanceScore: number;
  stakeholderGovernanceScore: number;
  ethicsGovernanceScore: number;
  
  // Financial Governance Analysis
  financialGovernanceAnalysis: {
    financialGovernanceScore: number;
    boardGovernanceScore: number;
    executiveGovernanceScore: number;
    riskGovernanceScore: number;
    complianceGovernanceScore: number;
    financialGovernanceScore: number;
    strategicGovernanceScore: number;
    stakeholderGovernanceScore: number;
    ethicsGovernanceScore: number;
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
  
  // Governance Assessment Analysis
  governanceAssessmentAnalysis: {
    governanceComponents: {
      component: string;
      score: number;
      weight: number;
      status: string;
      description: string;
    }[];
    governanceMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
      category: string;
    }[];
    governanceGoals: {
      goal: string;
      category: string;
      targetValue: number;
      currentValue: number;
      priority: string;
      timeline: string;
      actionSteps: string[];
    }[];
    governanceChallenges: {
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
    boardGovernance: {
      boardComposition: boolean;
      boardIndependence: boolean;
      boardExpertise: boolean;
      boardCommittees: boolean;
      boardMeetings: boolean;
      boardEvaluation: boolean;
      boardSuccession: boolean;
      boardCompensation: boolean;
      boardOversight: boolean;
    };
    executiveGovernance: {
      executiveLeadership: boolean;
      executiveCompensation: boolean;
      executiveSuccession: boolean;
      executivePerformance: boolean;
      executiveAccountability: boolean;
      executiveEthics: boolean;
      executiveRiskManagement: boolean;
      executiveStrategy: boolean;
      executiveOversight: boolean;
    };
    riskGovernance: {
      riskIdentification: boolean;
      riskAssessment: boolean;
      riskMitigation: boolean;
      riskMonitoring: boolean;
      riskReporting: boolean;
      riskCulture: boolean;
      riskAppetite: boolean;
      riskTolerance: boolean;
      riskOversight: boolean;
    };
    complianceGovernance: {
      complianceFramework: boolean;
      complianceMonitoring: boolean;
      complianceReporting: boolean;
      complianceTraining: boolean;
      complianceAudit: boolean;
      complianceRemediation: boolean;
      complianceCulture: boolean;
      complianceOversight: boolean;
      complianceEffectiveness: boolean;
    };
    financialGovernance: {
      financialControls: boolean;
      financialReporting: boolean;
      financialAudit: boolean;
      financialTransparency: boolean;
      financialAccountability: boolean;
      financialOversight: boolean;
      financialRisk: boolean;
      financialStrategy: boolean;
      financialPerformance: boolean;
    };
    strategicGovernance: {
      strategicPlanning: boolean;
      strategicExecution: boolean;
      strategicMonitoring: boolean;
      strategicAlignment: boolean;
      strategicRisk: boolean;
      strategicPerformance: boolean;
      strategicOversight: boolean;
      strategicAdaptation: boolean;
      strategicEffectiveness: boolean;
    };
    stakeholderGovernance: {
      stakeholderEngagement: boolean;
      stakeholderCommunication: boolean;
      stakeholderRelations: boolean;
      stakeholderTrust: boolean;
      stakeholderValue: boolean;
      stakeholderOversight: boolean;
      stakeholderAlignment: boolean;
      stakeholderSatisfaction: boolean;
      stakeholderEffectiveness: boolean;
    };
    ethicsGovernance: {
      ethicsFramework: boolean;
      ethicsTraining: boolean;
      ethicsMonitoring: boolean;
      ethicsReporting: boolean;
      ethicsInvestigation: boolean;
      ethicsRemediation: boolean;
      ethicsCulture: boolean;
      ethicsOversight: boolean;
      ethicsEffectiveness: boolean;
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
    governancePlan: {
      strategy: string;
      description: string;
      targetComponents: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    oversightStrategy: {
      strategy: string;
      description: string;
      oversightMechanisms: string[];
      oversightFrequency: string;
      oversightReporting: string;
    };
    accountabilityStrategy: {
      strategy: string;
      description: string;
      accountabilityMechanisms: string[];
      accountabilityMeasures: string[];
      accountabilityReporting: string;
    };
    strategyEfficiency: number;
  };
  
  // Governance Optimization Analysis
  governanceOptimizationAnalysis: {
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
    lowGovernanceScore: number;
    highGovernanceScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanGovernanceScore: number;
    medianGovernanceScore: number;
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
  
  // Financial Governance Planning Analysis
  financialGovernancePlanningAnalysis: {
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
      benchmarkGovernance: number;
      planGovernance: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Governance Score
  financialGovernanceScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      boardGovernance: number;
      executiveGovernance: number;
      riskGovernance: number;
      complianceGovernance: number;
      financialGovernance: number;
      strategicGovernance: number;
      stakeholderGovernance: number;
      ethicsGovernance: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      governanceScore: number;
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
    governanceImprovement: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    governanceAssessment: string;
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
    financialGovernanceScore: number;
    boardGovernanceScore: number;
    executiveGovernanceScore: number;
    riskGovernanceScore: number;
    complianceGovernanceScore: number;
    financialGovernanceScore: number;
    strategicGovernanceScore: number;
    stakeholderGovernanceScore: number;
    ethicsGovernanceScore: number;
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
