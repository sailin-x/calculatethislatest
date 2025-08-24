export interface FinancialHealthCalculatorInputs {
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
  
  // Financial Health Metrics
  financialHealthMetrics: {
    // Liquidity Metrics
    liquidityMetrics: {
      emergencyFundRatio: number;
      currentRatio: number;
      quickRatio: number;
      cashRatio: number;
      workingCapital: number;
    };
    
    // Solvency Metrics
    solvencyMetrics: {
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
      debtToEquityRatio: number;
      interestCoverageRatio: number;
      debtServiceCoverageRatio: number;
    };
    
    // Savings Metrics
    savingsMetrics: {
      savingsRate: number;
      emergencyFundMonths: number;
      retirementSavingsRate: number;
      investmentRate: number;
      netSavingsRate: number;
    };
    
    // Investment Metrics
    investmentMetrics: {
      investmentRatio: number;
      diversificationScore: number;
      riskAdjustedReturn: number;
      investmentEfficiency: number;
      assetAllocationScore: number;
    };
    
    // Cash Flow Metrics
    cashFlowMetrics: {
      operatingCashFlow: number;
      freeCashFlow: number;
      cashFlowCoverage: number;
      cashFlowStability: number;
      cashFlowGrowth: number;
    };
    
    // Credit Metrics
    creditMetrics: {
      creditScore: number;
      creditUtilization: number;
      paymentHistory: number;
      creditMix: number;
      newCredit: number;
    };
  };
  
  // Financial Health Assessment
  financialHealthAssessment: {
    // Health Indicators
    healthIndicators: {
      indicator: string;
      value: number;
      benchmark: number;
      status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
      weight: number;
    }[];
    
    // Risk Factors
    riskFactors: {
      factor: string;
      probability: number;
      impact: number;
      severity: 'low' | 'medium' | 'high' | 'critical';
      mitigation: string;
    }[];
    
    // Strengths
    strengths: {
      strength: string;
      description: string;
      impact: number;
      sustainability: number;
    }[];
    
    // Weaknesses
    weaknesses: {
      weakness: string;
      description: string;
      impact: number;
      urgency: number;
    }[];
    
    // Opportunities
    opportunities: {
      opportunity: string;
      description: string;
      potential: number;
      feasibility: number;
    }[];
    
    // Threats
    threats: {
      threat: string;
      description: string;
      probability: number;
      impact: number;
    }[];
  };
  
  // Financial Health Goals
  financialHealthGoals: {
    // Health Goals
    healthGoals: {
      goal: string;
      category: 'liquidity' | 'solvency' | 'savings' | 'investment' | 'cash_flow' | 'credit';
      targetValue: number;
      currentValue: number;
      priority: 'low' | 'medium' | 'high';
      timeline: string;
      actionSteps: string[];
    }[];
    
    // Improvement Goals
    improvementGoals: {
      goal: string;
      metric: string;
      targetImprovement: number;
      currentValue: number;
      priority: string;
      timeline: string;
      strategies: string[];
    }[];
    
    // Maintenance Goals
    maintenanceGoals: {
      goal: string;
      metric: string;
      targetRange: {
        min: number;
        max: number;
      };
      currentValue: number;
      priority: string;
      monitoring: string;
    }[];
  };
  
  // Health Strategy
  healthStrategy: {
    // Improvement Strategy
    improvementStrategy: {
      strategy: string;
      description: string;
      targetMetrics: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    
    // Maintenance Strategy
    maintenanceStrategy: {
      strategy: string;
      description: string;
      monitoringMetrics: string[];
      thresholds: {
        metric: string;
        warning: number;
        critical: number;
      }[];
      actions: string[];
    };
    
    // Risk Management Strategy
    riskManagementStrategy: {
      strategy: string;
      description: string;
      riskFactors: string[];
      mitigationActions: string[];
      monitoring: string;
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
    
    // Health Assumptions
    healthAssumptions: {
      metricGrowthRate: number;
      improvementRate: number;
      maintenanceRate: number;
      riskProbability: number;
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
  includeMarketRisk: boolean;
  includeHealthRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeHealthConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeHealthAnalysis: boolean;
    includeMetricAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    healthScore: number;
    liquidityScore: number;
    solvencyScore: number;
    savingsScore: number;
    investmentScore: number;
    cashFlowScore: number;
    creditScore: number;
  }[];
  
  // Reporting Preferences
  includeHealthAnalysis: boolean;
  includeMetricAnalysis: boolean;
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

export interface FinancialHealthCalculatorResults {
  // Core Financial Health Metrics
  financialHealthScore: number;
  liquidityScore: number;
  solvencyScore: number;
  savingsScore: number;
  investmentScore: number;
  cashFlowScore: number;
  creditScore: number;
  
  // Financial Health Analysis
  financialHealthAnalysis: {
    financialHealthScore: number;
    liquidityScore: number;
    solvencyScore: number;
    savingsScore: number;
    investmentScore: number;
    cashFlowScore: number;
    creditScore: number;
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
  
  // Financial Health Metrics Analysis
  financialHealthMetricsAnalysis: {
    liquidityMetrics: {
      emergencyFundRatio: number;
      currentRatio: number;
      quickRatio: number;
      cashRatio: number;
      workingCapital: number;
    };
    solvencyMetrics: {
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
      debtToEquityRatio: number;
      interestCoverageRatio: number;
      debtServiceCoverageRatio: number;
    };
    savingsMetrics: {
      savingsRate: number;
      emergencyFundMonths: number;
      retirementSavingsRate: number;
      investmentRate: number;
      netSavingsRate: number;
    };
    investmentMetrics: {
      investmentRatio: number;
      diversificationScore: number;
      riskAdjustedReturn: number;
      investmentEfficiency: number;
      assetAllocationScore: number;
    };
    cashFlowMetrics: {
      operatingCashFlow: number;
      freeCashFlow: number;
      cashFlowCoverage: number;
      cashFlowStability: number;
      cashFlowGrowth: number;
    };
    creditMetrics: {
      creditScore: number;
      creditUtilization: number;
      paymentHistory: number;
      creditMix: number;
      newCredit: number;
    };
    metricsEfficiency: number;
  };
  
  // Health Assessment Analysis
  healthAssessmentAnalysis: {
    healthIndicators: {
      indicator: string;
      value: number;
      benchmark: number;
      status: string;
      weight: number;
    }[];
    riskFactors: {
      factor: string;
      probability: number;
      impact: number;
      severity: string;
      mitigation: string;
    }[];
    strengths: {
      strength: string;
      description: string;
      impact: number;
      sustainability: number;
    }[];
    weaknesses: {
      weakness: string;
      description: string;
      impact: number;
      urgency: number;
    }[];
    opportunities: {
      opportunity: string;
      description: string;
      potential: number;
      feasibility: number;
    }[];
    threats: {
      threat: string;
      description: string;
      probability: number;
      impact: number;
    }[];
    assessmentEfficiency: number;
  };
  
  // Goal Analysis
  goalAnalysis: {
    healthGoals: {
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
    improvementGoals: {
      goal: string;
      metric: string;
      targetImprovement: number;
      currentValue: number;
      priority: string;
      timeline: string;
      strategies: string[];
      goalGap: number;
      requiredActions: string[];
    }[];
    maintenanceGoals: {
      goal: string;
      metric: string;
      targetRange: {
        min: number;
        max: number;
      };
      currentValue: number;
      priority: string;
      monitoring: string;
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
      targetMetrics: string[];
      actions: string[];
      timeline: string;
      expectedImprovement: number;
    };
    maintenanceStrategy: {
      strategy: string;
      description: string;
      monitoringMetrics: string[];
      thresholds: {
        metric: string;
        warning: number;
        critical: number;
      }[];
      actions: string[];
    };
    riskManagementStrategy: {
      strategy: string;
      description: string;
      riskFactors: string[];
      mitigationActions: string[];
      monitoring: string;
    };
    strategyEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    financialRisks: {
      risk: string;
      probability: number;
      impact: number;
      severity: string;
      mitigation: string;
    }[];
    marketRisks: {
      risk: string;
      probability: number;
      impact: number;
      severity: string;
      mitigation: string;
    }[];
    healthRisks: {
      risk: string;
      probability: number;
      impact: number;
      severity: string;
      mitigation: string;
    }[];
    lifeEventRisks: {
      risk: string;
      probability: number;
      impact: number;
      severity: string;
      mitigation: string;
    }[];
    totalRiskExposure: number;
    riskMitigationEfficiency: number;
  };
  
  // Health Optimization Analysis
  healthOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    metricOptimization: {
      metric: string;
      currentValue: number;
      targetValue: number;
      improvement: number;
      strategy: string;
    }[];
    riskOptimization: {
      risk: string;
      currentExposure: number;
      targetExposure: number;
      reduction: number;
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
    lowHealthScore: number;
    highHealthScore: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanHealthScore: number;
    medianHealthScore: number;
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
  
  // Financial Health Planning Analysis
  financialHealthPlanningAnalysis: {
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
      benchmarkHealth: number;
      planHealth: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Financial Health Score
  financialHealthScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      liquidity: number;
      solvency: number;
      savings: number;
      investment: number;
      cashFlow: number;
      credit: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      healthScore: number;
      liquidityScore: number;
      solvencyScore: number;
      savingsScore: number;
      investmentScore: number;
      cashFlowScore: number;
      creditScore: number;
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    healthImprovement: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    healthAssessment: string;
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
    financialHealthScore: number;
    liquidityScore: number;
    solvencyScore: number;
    savingsScore: number;
    investmentScore: number;
    cashFlowScore: number;
    creditScore: number;
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
