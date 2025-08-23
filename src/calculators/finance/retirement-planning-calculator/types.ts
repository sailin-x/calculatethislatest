export interface RetirementPlanningInputs {
  // Personal information
  personalInfo: {
    age: number; // Current age
    retirementAge: number; // Target retirement age
    lifeExpectancy: number; // Expected life expectancy
    gender: 'male' | 'female' | 'other';
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    dependents: number; // Number of dependents
    healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  };
  
  // Current financial situation
  currentFinances: {
    annualIncome: number; // Current annual income
    annualExpenses: number; // Current annual expenses
    currentSavings: number; // Current total savings
    emergencyFund: number; // Emergency fund amount
    debtAmount: number; // Total debt amount
    monthlyDebtPayments: number; // Monthly debt payments
  };
  
  // Retirement accounts
  retirementAccounts: {
    traditionalIRA: {
      balance: number; // Current balance
      annualContribution: number; // Annual contribution
      employerMatch: number; // Employer match percentage
      expectedReturn: number; // Expected annual return
    };
    rothIRA: {
      balance: number; // Current balance
      annualContribution: number; // Annual contribution
      expectedReturn: number; // Expected annual return
    };
    employerPlans: {
      balance: number; // Current balance (401k, 403b, etc.)
      annualContribution: number; // Annual contribution
      employerMatch: number; // Employer match percentage
      expectedReturn: number; // Expected annual return
    };
    otherRetirement: {
      balance: number; // Other retirement accounts
      annualContribution: number; // Annual contribution
      expectedReturn: number; // Expected annual return
    };
  };
  
  // Social Security
  socialSecurity: {
    expectedBenefit: number; // Expected monthly benefit
    claimingAge: number; // Age when claiming benefits
    spouseBenefit: number; // Spouse's expected benefit
    spouseClaimingAge: number; // Spouse's claiming age
    survivorBenefit: number; // Survivor benefit amount
  };
  
  // Pension benefits
  pensionBenefits: {
    definedBenefit: {
      monthlyBenefit: number; // Monthly pension benefit
      startAge: number; // Age when benefits start
      survivorBenefit: number; // Survivor benefit percentage
      costOfLivingAdjustment: boolean; // COLA adjustment
    };
    definedContribution: {
      balance: number; // Current balance
      annualContribution: number; // Annual contribution
      expectedReturn: number; // Expected annual return
    };
  };
  
  // Investment portfolio
  investmentPortfolio: {
    totalValue: number; // Total portfolio value
    assetAllocation: {
      stocks: number; // Percentage in stocks
      bonds: number; // Percentage in bonds
      cash: number; // Percentage in cash
      realEstate: number; // Percentage in real estate
      alternatives: number; // Percentage in alternatives
    };
    expectedReturn: number; // Expected portfolio return
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
    rebalancingFrequency: 'monthly' | 'quarterly' | 'annually' | 'never';
  };
  
  // Real estate
  realEstate: {
    primaryResidence: {
      value: number; // Current value
      mortgage: number; // Remaining mortgage
      monthlyPayment: number; // Monthly payment
      expectedAppreciation: number; // Expected annual appreciation
    };
    investmentProperties: {
      value: number; // Total value
      monthlyRentalIncome: number; // Monthly rental income
      monthlyExpenses: number; // Monthly expenses
      expectedAppreciation: number; // Expected annual appreciation
    };
  };
  
  // Insurance
  insurance: {
    lifeInsurance: {
      deathBenefit: number; // Death benefit amount
      annualPremium: number; // Annual premium
      policyType: 'term' | 'whole' | 'universal' | 'variable';
      coverageDuration: number; // Years of coverage
    };
    longTermCare: {
      monthlyBenefit: number; // Monthly benefit amount
      annualPremium: number; // Annual premium
      eliminationPeriod: number; // Elimination period (days)
      benefitPeriod: number; // Benefit period (years)
    };
    healthInsurance: {
      monthlyPremium: number; // Monthly premium
      deductible: number; // Annual deductible
      outOfPocketMax: number; // Out-of-pocket maximum
    };
  };
  
  // Retirement goals
  retirementGoals: {
    desiredAnnualIncome: number; // Desired annual income in retirement
    replacementRatio: number; // Income replacement ratio
    retirementLifestyle: 'basic' | 'comfortable' | 'luxury';
    travelBudget: number; // Annual travel budget
    healthcareBudget: number; // Annual healthcare budget
    legacyGoals: number; // Amount to leave to heirs
    charitableGiving: number; // Annual charitable giving
  };
  
  // Inflation and taxes
  inflationAndTaxes: {
    inflationRate: number; // Expected annual inflation rate
    taxRate: {
      current: number; // Current tax rate
      retirement: number; // Expected retirement tax rate
    };
    socialSecurityTaxable: boolean; // Whether SS benefits are taxable
    requiredMinimumDistributions: boolean; // Whether RMDs apply
  };
  
  // Risk factors
  riskFactors: {
    marketRisk: number; // Market risk tolerance (1-10)
    longevityRisk: number; // Longevity risk concern (1-10)
    healthcareRisk: number; // Healthcare cost concern (1-10)
    inflationRisk: number; // Inflation risk concern (1-10)
    sequenceRisk: number; // Sequence of returns risk (1-10)
  };
  
  // Additional income sources
  additionalIncome: {
    partTimeWork: {
      annualIncome: number; // Annual part-time income
      duration: number; // Years of part-time work
    };
    businessIncome: {
      annualIncome: number; // Annual business income
      duration: number; // Years of business income
    };
    rentalIncome: {
      annualIncome: number; // Annual rental income
      duration: number; // Years of rental income
    };
    otherIncome: {
      annualIncome: number; // Other income sources
      duration: number; // Years of other income
    };
  };
  
  // Estate planning
  estatePlanning: {
    will: boolean; // Has a will
    trust: boolean; // Has a trust
    powerOfAttorney: boolean; // Has power of attorney
    healthcareDirective: boolean; // Has healthcare directive
    beneficiaryDesignations: boolean; // Has beneficiary designations
    estateTaxExemption: number; // Estate tax exemption amount
  };
  
  // Scenario analysis
  scenarios: {
    scenario: string;
    probability: number;
    marketReturn: number;
    inflationRate: number;
    lifeExpectancy: number;
    healthcareCosts: number;
  }[];
  
  // Analysis parameters
  includeSocialSecurity: boolean;
  includePension: boolean;
  includeRealEstate: boolean;
  includeInsurance: boolean;
  includeEstatePlanning: boolean;
  
  // Output preferences
  includeDetailedBreakdown: boolean;
  includeMultipleScenarios: boolean;
  includeMonteCarlo: boolean;
  includeRecommendations: boolean;
}

export interface RetirementPlanningResults {
  // Core retirement metrics
  retirementReadiness: number; // Retirement readiness score (0-100)
  retirementAge: number; // Calculated retirement age
  retirementSavings: number; // Required retirement savings
  monthlyRetirementIncome: number; // Monthly retirement income
  retirementIncomeGap: number; // Gap between desired and projected income
  
  // Financial analysis
  financialAnalysis: {
    currentNetWorth: number;
    projectedNetWorth: number;
    retirementSavings: number;
    totalRetirementIncome: number;
    incomeReplacementRatio: number;
    savingsRate: number;
    debtToIncomeRatio: number;
  };
  
  // Retirement account analysis
  retirementAccountAnalysis: {
    totalBalance: number;
    projectedBalance: number;
    annualContributions: number;
    employerMatch: number;
    expectedReturn: number;
    accountBreakdown: {
      account: string;
      balance: number;
      percentage: number;
    }[];
  };
  
  // Social Security analysis
  socialSecurityAnalysis: {
    monthlyBenefit: number;
    annualBenefit: number;
    totalLifetimeBenefit: number;
    optimalClaimingAge: number;
    spouseBenefit: number;
    survivorBenefit: number;
    benefitReduction: number;
    benefitIncrease: number;
  };
  
  // Pension analysis
  pensionAnalysis: {
    definedBenefit: {
      monthlyBenefit: number;
      annualBenefit: number;
      totalLifetimeBenefit: number;
      survivorBenefit: number;
      colaAdjustment: boolean;
    };
    definedContribution: {
      balance: number;
      projectedBalance: number;
      annualContribution: number;
      expectedReturn: number;
    };
  };
  
  // Investment portfolio analysis
  investmentPortfolioAnalysis: {
    totalValue: number;
    projectedValue: number;
    assetAllocation: {
      category: string;
      percentage: number;
      value: number;
    }[];
    expectedReturn: number;
    riskLevel: string;
    rebalancingRecommendation: string;
  };
  
  // Real estate analysis
  realEstateAnalysis: {
    primaryResidence: {
      value: number;
      equity: number;
      monthlyPayment: number;
      projectedValue: number;
    };
    investmentProperties: {
      value: number;
      monthlyCashFlow: number;
      annualCashFlow: number;
      projectedValue: number;
    };
    totalRealEstateValue: number;
    realEstateIncome: number;
  };
  
  // Insurance analysis
  insuranceAnalysis: {
    lifeInsurance: {
      deathBenefit: number;
      annualPremium: number;
      coverageGap: number;
      recommendation: string;
    };
    longTermCare: {
      monthlyBenefit: number;
      annualPremium: number;
      coverageGap: number;
      recommendation: string;
    };
    healthInsurance: {
      monthlyPremium: number;
      annualCost: number;
      coverageAdequacy: string;
    };
  };
  
  // Retirement income analysis
  retirementIncomeAnalysis: {
    totalMonthlyIncome: number;
    totalAnnualIncome: number;
    incomeSources: {
      source: string;
      monthlyAmount: number;
      percentage: number;
    }[];
    incomeGap: number;
    replacementRatio: number;
    sustainabilityScore: number;
  };
  
  // Expense analysis
  expenseAnalysis: {
    currentAnnualExpenses: number;
    projectedRetirementExpenses: number;
    expenseBreakdown: {
      category: string;
      currentAmount: number;
      projectedAmount: number;
      percentage: number;
    }[];
    inflationAdjustedExpenses: number;
  };
  
  // Tax analysis
  taxAnalysis: {
    currentTaxRate: number;
    retirementTaxRate: number;
    socialSecurityTaxable: boolean;
    requiredMinimumDistributions: number;
    taxEfficiency: number;
    taxOptimization: string[];
  };
  
  // Risk analysis
  riskAnalysis: {
    marketRisk: number;
    longevityRisk: number;
    healthcareRisk: number;
    inflationRisk: number;
    sequenceRisk: number;
    overallRiskScore: number;
    riskMitigation: string[];
  };
  
  // Retirement readiness assessment
  retirementReadinessAssessment: {
    overallScore: number;
    savingsScore: number;
    incomeScore: number;
    expenseScore: number;
    riskScore: number;
    timelineScore: number;
    recommendations: string[];
  };
  
  // Timeline analysis
  timelineAnalysis: {
    yearsToRetirement: number;
    savingsTimeline: {
      year: number;
      age: number;
      projectedSavings: number;
      projectedIncome: number;
      projectedExpenses: number;
    }[];
    retirementTimeline: {
      year: number;
      age: number;
      retirementIncome: number;
      expenses: number;
      netIncome: number;
    }[];
  };
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    retirementReadiness: number;
    retirementAge: number;
    monthlyIncome: number;
    incomeGap: number;
    riskLevel: string;
  }[];
  
  // Monte Carlo simulation
  monteCarloResults: {
    successRate: number;
    meanRetirementAge: number;
    medianRetirementAge: number;
    standardDeviation: number;
    percentiles: {
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
    worstCaseScenario: number;
    bestCaseScenario: number;
  };
  
  // Sensitivity analysis
  sensitivityResults: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowReadiness: number;
    highReadiness: number;
    sensitivity: number;
  }[];
  
  // Performance metrics
  performanceMetrics: {
    savingsEfficiency: number;
    investmentEfficiency: number;
    taxEfficiency: number;
    riskEfficiency: number;
    overallEfficiency: number;
  };
  
  // Retirement planning opportunities
  planningOpportunities: {
    opportunity: string;
    potentialImpact: number;
    implementation: string;
    priority: 'high' | 'medium' | 'low';
    timeline: string;
  }[];
  
  // Cost-benefit analysis
  costBenefitAnalysis: {
    planningCosts: number;
    potentialSavings: number;
    taxSavings: number;
    investmentGains: number;
    netBenefit: number;
    returnOnInvestment: number;
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenAge: number;
    breakEvenSavings: number;
    marginOfSafety: number;
    requiredSavingsRate: number;
  };
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    timeline: string;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
    cost: number;
  }[];
}
