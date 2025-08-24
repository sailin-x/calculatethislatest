export interface CashFlowCalculatorInputs {
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
  
  // Income Information
  incomeInfo: {
    // Employment Income
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
      taxes: {
        federalIncomeTax: number;
        stateIncomeTax: number;
        localIncomeTax: number;
        socialSecurityTax: number;
        medicareTax: number;
        otherTaxes: number;
      };
    }[];
    
    // Self-Employment Income
    selfEmploymentIncome: {
      source: string;
      amount: number;
      frequency: string;
      growthRate: number;
      businessExpenses: number;
      selfEmploymentTax: number;
      estimatedTaxes: number;
    }[];
    
    // Investment Income
    investmentIncome: {
      source: string;
      amount: number;
      frequency: string;
      growthRate: number;
      taxable: boolean;
      taxRate: number;
      reinvested: boolean;
    }[];
    
    // Rental Income
    rentalIncome: {
      property: string;
      grossRentalIncome: number;
      expenses: number;
      netRentalIncome: number;
      depreciation: number;
      taxableIncome: number;
      taxes: number;
    }[];
    
    // Business Income
    businessIncome: {
      business: string;
      grossIncome: number;
      expenses: number;
      netIncome: number;
      taxes: number;
      distributions: number;
    }[];
    
    // Other Income
    otherIncome: {
      source: string;
      amount: number;
      frequency: string;
      growthRate: number;
      taxable: boolean;
      taxRate: number;
    }[];
    
    // Total Income
    totalAnnualIncome: number;
    expectedIncomeGrowth: number;
    afterTaxIncome: number;
  };
  
  // Expense Information
  expenseInfo: {
    // Housing Expenses
    housingExpenses: {
      category: string;
      amount: number;
      frequency: 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'annually';
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Transportation Expenses
    transportationExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Food Expenses
    foodExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Healthcare Expenses
    healthcareExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
      insuranceCoverage: number;
    }[];
    
    // Insurance Expenses
    insuranceExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Debt Payments
    debtPayments: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
      interestRate: number;
      remainingBalance: number;
    }[];
    
    // Entertainment Expenses
    entertainmentExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Personal Care Expenses
    personalCareExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Education Expenses
    educationExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Business Expenses
    businessExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Other Expenses
    otherExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    
    // Total Expenses
    totalAnnualExpenses: number;
    expectedExpenseInflation: number;
  };
  
  // Cash Flow Goals
  cashFlowGoals: {
    // Savings Goals
    savingsGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      monthlyContribution: number;
      priority: 'high' | 'medium' | 'low';
      type: 'emergency_fund' | 'retirement' | 'education' | 'major_purchase' | 'other';
    }[];
    
    // Debt Payoff Goals
    debtPayoffGoals: {
      debt: string;
      currentBalance: number;
      targetPayoffDate: string;
      monthlyPayment: number;
      additionalPayment: number;
      priority: string;
    }[];
    
    // Investment Goals
    investmentGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      monthlyContribution: number;
      expectedReturn: number;
      priority: string;
    }[];
    
    // Cash Flow Targets
    cashFlowTargets: {
      target: string;
      amount: number;
      frequency: string;
      priority: string;
    }[];
  };
  
  // Cash Flow Strategy
  cashFlowStrategy: {
    // Budget Strategy
    budgetStrategy: {
      strategy: 'zero_based' | 'envelope' | 'percentage' | '50_30_20' | 'custom';
      description: string;
      essentialExpenses: number;
      discretionaryExpenses: number;
      savings: number;
      debtPayments: number;
    };
    
    // Expense Management Strategy
    expenseManagementStrategy: {
      strategy: string;
      description: string;
      costReductionTargets: {
        category: string;
        currentAmount: number;
        targetAmount: number;
        reduction: number;
        method: string;
      }[];
      efficiencyImprovements: {
        category: string;
        improvement: string;
        expectedSavings: number;
        implementation: string;
      }[];
    };
    
    // Income Optimization Strategy
    incomeOptimizationStrategy: {
      strategy: string;
      description: string;
      incomeEnhancement: {
        source: string;
        currentAmount: number;
        targetAmount: number;
        increase: number;
        method: string;
      }[];
      taxOptimization: {
        strategy: string;
        expectedSavings: number;
        implementation: string;
      }[];
    };
    
    // Emergency Fund Strategy
    emergencyFundStrategy: {
      strategy: string;
      description: string;
      targetAmount: number;
      currentAmount: number;
      monthlyContribution: number;
      timeline: string;
      fundingSource: string;
    };
  };
  
  // Seasonal Variations
  seasonalVariations: {
    // Income Variations
    incomeVariations: {
      month: string;
      incomeMultiplier: number;
      reason: string;
    }[];
    
    // Expense Variations
    expenseVariations: {
      month: string;
      expenseMultiplier: number;
      reason: string;
    }[];
    
    // Cash Flow Variations
    cashFlowVariations: {
      month: string;
      cashFlowMultiplier: number;
      reason: string;
    }[];
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
    
    // Life Event Assumptions
    lifeEventAssumptions: {
      event: string;
      probability: number;
      incomeImpact: number;
      expenseImpact: number;
      timing: number;
      description: string;
    }[];
    
    // Cash Flow Assumptions
    cashFlowAssumptions: {
      assumption: string;
      value: number;
      description: string;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeIncomeRisk: boolean;
  includeExpenseRisk: boolean;
  includeInflationRisk: boolean;
  includeLifeEventRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeSeasonalAdjustments: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGoalAnalysis: boolean;
    includeBudgetAnalysis: boolean;
    includeCashFlowProjection: boolean;
    includeOptimization: boolean;
    includeRiskAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    income: number;
    expenses: number;
    cashFlow: number;
    savings: number;
    debtPayments: number;
  }[];
  
  // Reporting Preferences
  includeGoalAnalysis: boolean;
  includeBudgetAnalysis: boolean;
  includeCashFlowProjection: boolean;
  includeOptimization: boolean;
  includeRiskAnalysis: boolean;
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

export interface CashFlowCalculatorResults {
  // Core Cash Flow Metrics
  cashFlowScore: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
  savingsRate: number;
  debtToIncomeRatio: number;
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    cashFlowScore: number;
    monthlyCashFlow: number;
    annualCashFlow: number;
    savingsRate: number;
    debtToIncomeRatio: number;
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
  
  // Income Analysis
  incomeAnalysis: {
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
      taxes: {
        federalIncomeTax: number;
        stateIncomeTax: number;
        localIncomeTax: number;
        socialSecurityTax: number;
        medicareTax: number;
        otherTaxes: number;
      };
    }[];
    selfEmploymentIncome: {
      source: string;
      amount: number;
      frequency: string;
      growthRate: number;
      businessExpenses: number;
      selfEmploymentTax: number;
      estimatedTaxes: number;
    }[];
    investmentIncome: {
      source: string;
      amount: number;
      frequency: string;
      growthRate: number;
      taxable: boolean;
      taxRate: number;
      reinvested: boolean;
    }[];
    rentalIncome: {
      property: string;
      grossRentalIncome: number;
      expenses: number;
      netRentalIncome: number;
      depreciation: number;
      taxableIncome: number;
      taxes: number;
    }[];
    businessIncome: {
      business: string;
      grossIncome: number;
      expenses: number;
      netIncome: number;
      taxes: number;
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
    incomeEfficiency: number;
  };
  
  // Expense Analysis
  expenseAnalysis: {
    housingExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    transportationExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    foodExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    healthcareExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
      insuranceCoverage: number;
    }[];
    insuranceExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    debtPayments: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
      interestRate: number;
      remainingBalance: number;
    }[];
    entertainmentExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    personalCareExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    educationExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    businessExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    otherExpenses: {
      category: string;
      amount: number;
      frequency: string;
      inflationRate: number;
      essential: boolean;
      discretionary: boolean;
      fixed: boolean;
      variable: boolean;
    }[];
    totalAnnualExpenses: number;
    expectedExpenseInflation: number;
    expenseEfficiency: number;
  };
  
  // Goal Analysis
  goalAnalysis: {
    savingsGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      monthlyContribution: number;
      priority: string;
      type: string;
      goalGap: number;
      requiredSavings: number;
    }[];
    debtPayoffGoals: {
      debt: string;
      currentBalance: number;
      targetPayoffDate: string;
      monthlyPayment: number;
      additionalPayment: number;
      priority: string;
      goalGap: number;
      requiredPayments: number;
    }[];
    investmentGoals: {
      goal: string;
      targetAmount: number;
      targetDate: string;
      currentAmount: number;
      monthlyContribution: number;
      expectedReturn: number;
      priority: string;
      goalGap: number;
      requiredSavings: number;
    }[];
    cashFlowTargets: {
      target: string;
      amount: number;
      frequency: string;
      priority: string;
      goalGap: number;
      requiredActions: string[];
    }[];
    goalEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    budgetStrategy: {
      strategy: string;
      description: string;
      essentialExpenses: number;
      discretionaryExpenses: number;
      savings: number;
      debtPayments: number;
    };
    expenseManagementStrategy: {
      strategy: string;
      description: string;
      costReductionTargets: {
        category: string;
        currentAmount: number;
        targetAmount: number;
        reduction: number;
        method: string;
      }[];
      efficiencyImprovements: {
        category: string;
        improvement: string;
        expectedSavings: number;
        implementation: string;
      }[];
    };
    incomeOptimizationStrategy: {
      strategy: string;
      description: string;
      incomeEnhancement: {
        source: string;
        currentAmount: number;
        targetAmount: number;
        increase: number;
        method: string;
      }[];
      taxOptimization: {
        strategy: string;
        expectedSavings: number;
        implementation: string;
      }[];
    };
    emergencyFundStrategy: {
      strategy: string;
      description: string;
      targetAmount: number;
      currentAmount: number;
      monthlyContribution: number;
      timeline: string;
      fundingSource: string;
    };
    strategyEfficiency: number;
  };
  
  // Cash Flow Projection Analysis
  cashFlowProjectionAnalysis: {
    currentCashFlow: {
      income: number;
      expenses: number;
      cashFlow: number;
      savings: number;
      debtPayments: number;
    };
    projectedCashFlow: {
      year: number;
      income: number;
      expenses: number;
      cashFlow: number;
      savings: number;
      debtPayments: number;
    }[];
    seasonalCashFlow: {
      month: string;
      income: number;
      expenses: number;
      cashFlow: number;
      savings: number;
      debtPayments: number;
    }[];
    cashFlowGaps: {
      period: string;
      gap: number;
      solution: string;
    }[];
    cashFlowEfficiency: number;
  };
  
  // Budget Analysis
  budgetAnalysis: {
    budgetAllocation: {
      category: string;
      amount: number;
      percentage: number;
      recommended: number;
      variance: number;
    }[];
    budgetVariance: {
      category: string;
      budgeted: number;
      actual: number;
      variance: number;
      variancePercentage: number;
    }[];
    budgetEfficiency: {
      category: string;
      efficiency: number;
      improvement: string;
    }[];
    budgetEfficiency: number;
  };
  
  // Cash Flow Optimization Analysis
  cashFlowOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialImprovement: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    incomeOptimization: {
      strategy: string;
      description: string;
      expectedIncrease: number;
      implementation: string;
    }[];
    expenseOptimization: {
      strategy: string;
      description: string;
      expectedSavings: number;
      implementation: string;
    }[];
    cashFlowOptimization: {
      strategy: string;
      description: string;
      expectedImprovement: number;
      implementation: string;
    }[];
    optimizationEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    cashFlowRisks: {
      risk: string;
      probability: number;
      impact: number;
      exposure: number;
      mitigation: string;
    }[];
    incomeRisks: {
      risk: string;
      probability: number;
      impact: number;
      exposure: number;
      mitigation: string;
    }[];
    expenseRisks: {
      risk: string;
      probability: number;
      impact: number;
      exposure: number;
      mitigation: string;
    }[];
    riskEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowCashFlow: number;
    highCashFlow: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanCashFlow: number;
    medianCashFlow: number;
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
  
  // Cash Flow Planning Analysis
  cashFlowPlanningAnalysis: {
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
      benchmarkCashFlow: number;
      planCashFlow: number;
      outperformance: number;
      efficiency: number;
    }[];
    comparisonEfficiency: number;
  };
  
  // Cash Flow Score
  cashFlowScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      income: number;
      expenses: number;
      goals: number;
      strategy: number;
      projection: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      income: number;
      expenses: number;
      cashFlow: number;
      savings: number;
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    cashFlowImprovement: number;
    costSavings: number;
    efficiencyGain: number;
    riskReduction: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    cashFlowAssessment: string;
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
    cashFlowScore: number;
    monthlyCashFlow: number;
    annualCashFlow: number;
    savingsRate: number;
    debtToIncomeRatio: number;
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
