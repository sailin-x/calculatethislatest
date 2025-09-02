export interface RetirementPlanningCalculatorInputs {
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
      expectedRetirementAge: number;
      expectedRetirementDate: string;
      yearsToRetirement: number;
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
      healthStatus: string;
      lifeExpectancy: number;
      expectedRetirementAge: number;
      expectedRetirementDate: string;
      yearsToRetirement: number;
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
      expectedRetirementAge: number;
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
    
    // Self-Employment Income
    selfEmploymentIncome: {
      source: string;
      amount: number;
      frequency: string;
      growthRate: number;
      expectedRetirementAge: number;
      businessExpenses: number;
      selfEmploymentTax: number;
    }[];
    
    // Investment Income
    investmentIncome: {
      source: string;
      amount: number;
      frequency: string;
      growthRate: number;
      taxable: boolean;
      taxRate: number;
    }[];
    
    // Rental Income
    rentalIncome: {
      property: string;
      grossRentalIncome: number;
      expenses: number;
      netRentalIncome: number;
      depreciation: number;
      taxableIncome: number;
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
  
  // Retirement Assets
  retirementAssets: {
    // Employer-Sponsored Plans
    employerPlans: {
      planName: string;
      planType: '401k' | '403b' | '457' | 'pension' | 'profit_sharing' | 'other';
      currentBalance: number;
      employerMatch: number;
      employeeContribution: number;
      totalContribution: number;
      expectedReturn: number;
      vestingSchedule: {
        years: number;
        percentage: number;
      }[];
      expectedRetirementBalance: number;
      requiredMinimumDistribution: number;
      distributionAge: number;
    }[];
    
    // Individual Retirement Accounts
    individualAccounts: {
      accountName: string;
      accountType: 'traditional_ira' | 'roth_ira' | 'sep_ira' | 'simple_ira' | 'rollover_ira';
      currentBalance: number;
      annualContribution: number;
      catchUpContribution: number;
      expectedReturn: number;
      expectedRetirementBalance: number;
      requiredMinimumDistribution: number;
      distributionAge: number;
      taxStatus: 'tax_deferred' | 'tax_free' | 'taxable';
    }[];
    
    // Social Security
    socialSecurity: {
      primaryInsuranceAmount: number;
      fullRetirementAge: number;
      earlyRetirementAge: number;
      earlyRetirementReduction: number;
      delayedRetirementCredit: number;
      expectedMonthlyBenefit: number;
      expectedAnnualBenefit: number;
      spousalBenefit: number;
      survivorBenefit: number;
      costOfLivingAdjustment: number;
      taxablePercentage: number;
    };
    
    // Pension Benefits
    pensionBenefits: {
      pensionName: string;
      planType: 'defined_benefit' | 'defined_contribution' | 'cash_balance';
      currentValue: number;
      monthlyBenefit: number;
      annualBenefit: number;
      startDate: string;
      survivorBenefit: number;
      costOfLivingAdjustment: number;
      lumpSumOption: number;
      expectedRetirementValue: number;
    }[];
    
    // Other Retirement Assets
    otherRetirementAssets: {
      asset: string;
      type: string;
      currentValue: number;
      expectedReturn: number;
      expectedRetirementValue: number;
      liquidity: 'high' | 'medium' | 'low';
      taxStatus: string;
    }[];
    
    // Total Retirement Assets
    totalRetirementAssets: number;
    expectedRetirementAssets: number;
    retirementSavingsRate: number;
  };
  
  // Retirement Goals
  retirementGoals: {
    // Retirement Lifestyle
    retirementLifestyle: {
      lifestyle: 'basic' | 'comfortable' | 'luxury' | 'ultra_high_net_worth';
      annualIncomeNeeded: number;
      monthlyIncomeNeeded: number;
      inflationAdjustment: boolean;
      inflationRate: number;
      retirementLocation: string;
      costOfLivingAdjustment: number;
    };
    
    // Retirement Expenses
    retirementExpenses: {
      housingExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      healthcareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        insuranceCoverage: number;
      }[];
      transportationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      foodExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      entertainmentExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      travelExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      insuranceExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      otherExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      totalAnnualExpenses: number;
      expectedExpenseInflation: number;
    };
    
    // Retirement Phases
    retirementPhases: {
      phase: string;
      startAge: number;
      endAge: number;
      annualIncomeNeeded: number;
      expenses: number;
      activities: string[];
      healthConsiderations: string[];
    }[];
    
    // Legacy Goals
    legacyGoals: {
      goal: string;
      targetAmount: number;
      beneficiary: string;
      priority: 'high' | 'medium' | 'low';
      taxEfficient: boolean;
      method: string;
    }[];
  };
  
  // Risk Profile
  riskProfile: {
    // Risk Tolerance
    riskTolerance: {
      investmentHorizon: number;
      riskCapacity: 'low' | 'medium' | 'high';
      riskWillingness: 'low' | 'medium' | 'high';
      riskNeed: 'low' | 'medium' | 'high';
      overallRiskTolerance: 'conservative' | 'moderate' | 'aggressive';
    };
    
    // Investment Preferences
    investmentPreferences: {
      preferredAssetClasses: string[];
      excludedAssetClasses: string[];
      preferredInvestmentTypes: string[];
      excludedInvestmentTypes: string[];
      liquidityRequirements: 'high' | 'medium' | 'low';
      taxEfficiency: boolean;
      esgConsiderations: boolean;
      internationalExposure: boolean;
    };
    
    // Behavioral Factors
    behavioralFactors: {
      lossAversion: 'low' | 'medium' | 'high';
      marketTiming: boolean;
      emotionalTrading: boolean;
      investmentExperience: 'beginner' | 'intermediate' | 'advanced';
      financialLiteracy: 'low' | 'medium' | 'high';
      decisionMakingStyle: 'analytical' | 'intuitive' | 'collaborative';
    };
  };
  
  // Market Assumptions
  marketAssumptions: {
    // Return Assumptions
    returnAssumptions: {
      assetClass: string;
      expectedReturn: number;
      volatility: number;
      correlation: number;
      inflationRate: number;
      realReturn: number;
    }[];
    
    // Economic Assumptions
    economicAssumptions: {
      inflationRate: number;
      realGdpGrowth: number;
      interestRate: number;
      taxRate: number;
      socialSecurityGrowth: number;
      healthcareInflation: number;
      lifeExpectancy: number;
      socialSecuritySolvency: number;
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
  
  // Retirement Strategy
  retirementStrategy: {
    // Asset Allocation Strategy
    assetAllocationStrategy: {
      strategy: 'conservative' | 'moderate' | 'aggressive' | 'custom';
      targetAllocation: {
        assetClass: string;
        targetWeight: number;
        minWeight: number;
        maxWeight: number;
      }[];
      rebalancingFrequency: 'monthly' | 'quarterly' | 'annually' | 'trigger_based';
      rebalancingThreshold: number;
      glidePath: boolean;
      targetDateFund: boolean;
    };
    
    // Investment Vehicles
    investmentVehicles: {
      vehicle: string;
      type: string;
      advantages: string[];
      disadvantages: string[];
      suitability: 'high' | 'medium' | 'low';
      recommendation: string;
    }[];
    
    // Tax Strategy
    taxStrategy: {
      taxLossHarvesting: boolean;
      taxEfficientFunds: boolean;
      assetLocation: boolean;
      rothConversion: boolean;
      requiredMinimumDistributions: boolean;
      socialSecurityOptimization: boolean;
      medicareOptimization: boolean;
    };
    
    // Risk Management
    riskManagement: {
      diversification: boolean;
      dollarCostAveraging: boolean;
      stopLosses: boolean;
      insurance: {
        type: string;
        coverage: number;
        premium: number;
        necessity: 'essential' | 'recommended' | 'optional';
      }[];
      longTermCare: boolean;
      annuities: boolean;
    };
    
    // Distribution Strategy
    distributionStrategy: {
      strategy: 'systematic_withdrawal' | 'bucket_strategy' | 'dynamic_withdrawal' | 'annuity' | 'hybrid';
      withdrawalRate: number;
      inflationAdjustment: boolean;
      requiredMinimumDistributions: boolean;
      socialSecurityTiming: 'early' | 'full_retirement' | 'delayed';
      medicareTiming: number;
      distributionOrder: string[];
    };
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeMarketRisk: boolean;
  includeLongevityRisk: boolean;
  includeInflationRisk: boolean;
  includeSequenceRisk: boolean;
  includeHealthcareRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeHealthcareConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGoalAnalysis: boolean;
    includeCashFlowAnalysis: boolean;
    includeAssetAllocation: boolean;
    includeTaxOptimization: boolean;
    includeRiskManagement: boolean;
    includeDistributionStrategy: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    retirementAssets: number;
    income: number;
    expenses: number;
    savings: number;
    investmentReturn: number;
  }[];
  
  // Reporting Preferences
  includeGoalAnalysis: boolean;
  includeCashFlowAnalysis: boolean;
  includeAssetAllocation: boolean;
  includeTaxOptimization: boolean;
  includeRiskManagement: boolean;
  includeDistributionStrategy: boolean;
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

export interface RetirementPlanningCalculatorResults {
  // Core Retirement Metrics
  retirementReadinessScore: number;
  retirementIncomeGap: number;
  requiredRetirementSavings: number;
  retirementIncomeReplacement: number;
  retirementSuccessProbability: number;
  
  // Retirement Planning Analysis
  retirementPlanningAnalysis: {
    retirementReadinessScore: number;
    retirementIncomeGap: number;
    requiredRetirementSavings: number;
    retirementIncomeReplacement: number;
    retirementSuccessProbability: number;
    planningBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    planningEfficiency: number;
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
      expectedRetirementAge: number;
      expectedRetirementDate: string;
      yearsToRetirement: number;
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
      healthStatus: string;
      lifeExpectancy: number;
      expectedRetirementAge: number;
      expectedRetirementDate: string;
      yearsToRetirement: number;
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
      expectedRetirementAge: number;
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
      expectedRetirementAge: number;
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
  
  // Retirement Assets Analysis
  retirementAssetsAnalysis: {
    employerPlans: {
      planName: string;
      planType: string;
      currentBalance: number;
      employerMatch: number;
      employeeContribution: number;
      totalContribution: number;
      expectedReturn: number;
      vestingSchedule: {
        years: number;
        percentage: number;
      }[];
      expectedRetirementBalance: number;
      requiredMinimumDistribution: number;
      distributionAge: number;
    }[];
    individualAccounts: {
      accountName: string;
      accountType: string;
      currentBalance: number;
      annualContribution: number;
      catchUpContribution: number;
      expectedReturn: number;
      expectedRetirementBalance: number;
      requiredMinimumDistribution: number;
      distributionAge: number;
      taxStatus: string;
    }[];
    socialSecurity: {
      primaryInsuranceAmount: number;
      fullRetirementAge: number;
      earlyRetirementAge: number;
      earlyRetirementReduction: number;
      delayedRetirementCredit: number;
      expectedMonthlyBenefit: number;
      expectedAnnualBenefit: number;
      spousalBenefit: number;
      survivorBenefit: number;
      costOfLivingAdjustment: number;
      taxablePercentage: number;
    };
    pensionBenefits: {
      pensionName: string;
      planType: string;
      currentValue: number;
      monthlyBenefit: number;
      annualBenefit: number;
      startDate: string;
      survivorBenefit: number;
      costOfLivingAdjustment: number;
      lumpSumOption: number;
      expectedRetirementValue: number;
    }[];
    otherRetirementAssets: {
      asset: string;
      type: string;
      currentValue: number;
      expectedReturn: number;
      expectedRetirementValue: number;
      liquidity: string;
      taxStatus: string;
    }[];
    totalRetirementAssets: number;
    expectedRetirementAssets: number;
    retirementSavingsRate: number;
    retirementAssetsEfficiency: number;
  };
  
  // Goal Analysis
  goalAnalysis: {
    retirementLifestyle: {
      lifestyle: string;
      annualIncomeNeeded: number;
      monthlyIncomeNeeded: number;
      inflationAdjustment: boolean;
      inflationRate: number;
      retirementLocation: string;
      costOfLivingAdjustment: number;
    };
    retirementExpenses: {
      housingExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      healthcareExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
        insuranceCoverage: number;
      }[];
      transportationExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      foodExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      entertainmentExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      travelExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      insuranceExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      otherExpenses: {
        category: string;
        amount: number;
        frequency: string;
        inflationRate: number;
      }[];
      totalAnnualExpenses: number;
      expectedExpenseInflation: number;
    };
    retirementPhases: {
      phase: string;
      startAge: number;
      endAge: number;
      annualIncomeNeeded: number;
      expenses: number;
      activities: string[];
      healthConsiderations: string[];
    }[];
    legacyGoals: {
      goal: string;
      targetAmount: number;
      beneficiary: string;
      priority: string;
      taxEfficient: boolean;
      method: string;
    }[];
    goalEfficiency: number;
  };
  
  // Risk Profile Analysis
  riskProfileAnalysis: {
    riskTolerance: {
      investmentHorizon: number;
      riskCapacity: string;
      riskWillingness: string;
      riskNeed: string;
      overallRiskTolerance: string;
    };
    investmentPreferences: {
      preferredAssetClasses: string[];
      excludedAssetClasses: string[];
      preferredInvestmentTypes: string[];
      excludedInvestmentTypes: string[];
      liquidityRequirements: string;
      taxEfficiency: boolean;
      esgConsiderations: boolean;
      internationalExposure: boolean;
    };
    behavioralFactors: {
      lossAversion: string;
      marketTiming: boolean;
      emotionalTrading: boolean;
      investmentExperience: string;
      financialLiteracy: string;
      decisionMakingStyle: string;
    };
    riskProfileEfficiency: number;
  };
  
  // Retirement Strategy Analysis
  retirementStrategyAnalysis: {
    assetAllocationStrategy: {
      strategy: string;
      targetAllocation: {
        assetClass: string;
        targetWeight: number;
        minWeight: number;
        maxWeight: number;
      }[];
      rebalancingFrequency: string;
      rebalancingThreshold: number;
      glidePath: boolean;
      targetDateFund: boolean;
    };
    investmentVehicles: {
      vehicle: string;
      type: string;
      advantages: string[];
      disadvantages: string[];
      suitability: string;
      recommendation: string;
    }[];
    taxStrategy: {
      taxLossHarvesting: boolean;
      taxEfficientFunds: boolean;
      assetLocation: boolean;
      rothConversion: boolean;
      requiredMinimumDistributions: boolean;
      socialSecurityOptimization: boolean;
      medicareOptimization: boolean;
    };
    riskManagement: {
      diversification: boolean;
      dollarCostAveraging: boolean;
      stopLosses: boolean;
      insurance: {
        type: string;
        coverage: number;
        premium: number;
        necessity: string;
      }[];
      longTermCare: boolean;
      annuities: boolean;
    };
    distributionStrategy: {
      strategy: string;
      withdrawalRate: number;
      inflationAdjustment: boolean;
      requiredMinimumDistributions: boolean;
      socialSecurityTiming: string;
      medicareTiming: number;
      distributionOrder: string[];
    };
    strategyEfficiency: number;
  };
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    currentCashFlow: {
      income: number;
      expenses: number;
      savings: number;
      savingsRate: number;
    };
    projectedCashFlow: {
      year: number;
      income: number;
      expenses: number;
      savings: number;
      savingsRate: number;
    }[];
    retirementCashFlow: {
      year: number;
      retirementIncome: number;
      retirementExpenses: number;
      netCashFlow: number;
      withdrawalRate: number;
    }[];
    cashFlowGaps: {
      period: string;
      gap: number;
      solution: string;
    }[];
    cashFlowEfficiency: number;
  };
  
  // Tax Optimization Analysis
  taxOptimizationAnalysis: {
    currentTaxLiability: number;
    retirementTaxLiability: number;
    taxEfficientAllocation: {
      account: string;
      assetClass: string;
      allocation: number;
      taxEfficiency: number;
    }[];
    taxLossHarvesting: {
      opportunity: string;
      potentialSavings: number;
      implementation: string;
    }[];
    rothConversion: {
      amount: number;
      taxImpact: number;
      longTermBenefit: number;
      recommendation: string;
    };
    requiredMinimumDistributions: {
      age: number;
      amount: number;
      taxImpact: number;
      strategy: string;
    };
    socialSecurityTaxation: {
      provisionalIncome: number;
      taxablePercentage: number;
      taxImpact: number;
      optimization: string;
    };
    taxOptimizationEfficiency: number;
  };
  
  // Distribution Strategy Analysis
  distributionStrategyAnalysis: {
    withdrawalStrategy: {
      strategy: string;
      initialWithdrawalRate: number;
      inflationAdjustment: boolean;
      dynamicAdjustment: boolean;
      floorAndCeiling: boolean;
    };
    distributionOrder: {
      account: string;
      type: string;
      order: number;
      rationale: string;
    }[];
    requiredMinimumDistributions: {
      age: number;
      account: string;
      amount: number;
      taxImpact: number;
      strategy: string;
    }[];
    socialSecurityTiming: {
      age: number;
      benefit: number;
      reduction: number;
      recommendation: string;
    };
    medicareTiming: {
      age: number;
      premium: number;
      penalty: number;
      recommendation: string;
    };
    distributionEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowRetirementReadiness: number;
    highRetirementReadiness: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanRetirementReadiness: number;
    medianRetirementReadiness: number;
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
  
  // Retirement Planning Planning Analysis
  retirementPlanningPlanningAnalysis: {
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
      benchmarkReadiness: number;
      planReadiness: number;
      outperformance: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Retirement Planning Score
  retirementPlanningScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      income: number;
      assets: number;
      goals: number;
      risk: number;
      strategy: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      retirementAssets: number;
      retirementReadiness: number;
      savingsRate: number;
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    retirementReadiness: number;
    riskReduction: number;
    costSavings: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    retirementAssessment: string;
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
    retirementReadinessScore: number;
    retirementIncomeGap: number;
    requiredRetirementSavings: number;
    retirementIncomeReplacement: number;
    retirementSuccessProbability: number;
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

export interface RetirementPlanningCalculatorOutputs {
  // Core Retirement Planning Results
  retirementReadinessScore: number;
  retirementIncomeGap: number;
  requiredRetirementSavings: number;
  retirementIncomeReplacement: number;
  retirementSuccessProbability: number;
  recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  
  // Financial Projections
  projectedRetirementAssets: number;
  projectedRetirementIncome: number;
  projectedRetirementExpenses: number;
  
  // Savings Analysis
  currentSavingsRate: number;
  targetSavingsRate: number;
  savingsGap: number;
  yearsToRetirement: number;
  
  // Investment Analysis
  expectedInvestmentReturn: number;
  inflationAdjustedReturn: number;
  portfolioGrowth: number;
  
  // Risk Analysis
  riskAssessment: {
    inflationRisk: number;
    marketRisk: number;
    longevityRisk: number;
    healthcareRisk: number;
    totalRisk: number;
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanRetirementReadiness: number;
    medianRetirementReadiness: number;
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
    successProbability: number;
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedImprovement: number;
    implementationSteps: string[];
  }[];
  
  // Key Metrics
  keyMetrics: {
    savingsRate: number;
    investmentReturn: number;
    expenseRatio: number;
    debtToIncome: number;
    emergencyFund: number;
  };
  
  // Timeline Analysis
  timelineAnalysis: {
    milestones: {
      year: number;
      age: number;
      projectedAssets: number;
      projectedIncome: number;
      projectedExpenses: number;
      readinessScore: number;
    }[];
  };
}
