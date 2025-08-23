export interface InsuranceInputs {
  // Policy Information
  policyType: 'life' | 'health' | 'auto' | 'home' | 'business' | 'liability' | 'disability' | 'long_term_care' | 'travel' | 'pet' | 'umbrella' | 'professional' | 'cyber' | 'directors_officers' | 'errors_omissions';
  policyName: string;
  policyNumber: string;
  insuranceCompany: string;
  policyStartDate: string;
  policyEndDate: string;
  policyTerm: number; // in years
  
  // Insured Information
  insuredName: string;
  insuredAge: number;
  insuredGender: 'male' | 'female' | 'other';
  insuredOccupation: string;
  insuredHealthStatus: 'excellent' | 'good' | 'fair' | 'poor';
  insuredLifestyle: {
    smoker: boolean;
    alcoholUse: string;
    exerciseFrequency: string;
    medicalConditions: string[];
    familyHistory: string[];
  };
  
  // Coverage Information
  coverageAmount: number;
  coverageType: string;
  coverageLimits: {
    perOccurrence: number;
    aggregate: number;
    deductible: number;
    coinsurance: number;
  };
  
  // Premium Information
  annualPremium: number;
  monthlyPremium: number;
  premiumPaymentFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
  premiumPaymentMethod: 'automatic' | 'manual' | 'payroll_deduction';
  
  // Risk Assessment
  riskAssessment: {
    riskScore: number;
    riskCategory: 'low' | 'medium' | 'high' | 'very_high';
    riskFactors: {
      factor: string;
      impact: 'low' | 'medium' | 'high';
      weight: number;
    }[];
  };
  
  // Claims History
  claimsHistory: {
    totalClaims: number;
    claimsAmount: number;
    claimsFrequency: number;
    lastClaimDate: string;
    claims: {
      date: string;
      type: string;
      amount: number;
      status: 'pending' | 'approved' | 'denied' | 'settled';
      description: string;
    }[];
  };
  
  // Underwriting Information
  underwritingInfo: {
    underwritingClass: string;
    ratingFactors: {
      factor: string;
      value: string;
      impact: number;
    }[];
    exclusions: string[];
    riders: string[];
    endorsements: string[];
  };
  
  // Life Insurance Specific
  lifeInsurance: {
    deathBenefit: number;
    cashValue: number;
    surrenderValue: number;
    policyLoan: number;
    dividend: number;
    riders: {
      waiverOfPremium: boolean;
      accidentalDeath: boolean;
      criticalIllness: boolean;
      longTermCare: boolean;
    };
  };
  
  // Health Insurance Specific
  healthInsurance: {
    networkType: 'ppo' | 'hmo' | 'epo' | 'pos' | 'hdhp';
    inNetworkDeductible: number;
    outNetworkDeductible: number;
    inNetworkCoinsurance: number;
    outNetworkCoinsurance: number;
    copays: {
      primaryCare: number;
      specialist: number;
      urgentCare: number;
      emergencyRoom: number;
      prescription: number;
    };
    coveredServices: string[];
    excludedServices: string[];
  };
  
  // Auto Insurance Specific
  autoInsurance: {
    vehicleInfo: {
      make: string;
      model: string;
      year: number;
      vin: string;
      value: number;
    };
    drivers: {
      name: string;
      age: number;
      licenseYears: number;
      drivingRecord: string[];
    }[];
    coverageTypes: {
      liability: boolean;
      collision: boolean;
      comprehensive: boolean;
      uninsuredMotorist: boolean;
      underinsuredMotorist: boolean;
      medicalPayments: boolean;
      personalInjuryProtection: boolean;
    };
  };
  
  // Home Insurance Specific
  homeInsurance: {
    propertyInfo: {
      address: string;
      propertyType: string;
      constructionType: string;
      yearBuilt: number;
      squareFootage: number;
      replacementCost: number;
    };
    coverageTypes: {
      dwelling: boolean;
      personalProperty: boolean;
      liability: boolean;
      medicalPayments: boolean;
      additionalLivingExpenses: boolean;
    };
    perils: string[];
    exclusions: string[];
  };
  
  // Business Insurance Specific
  businessInsurance: {
    businessInfo: {
      businessType: string;
      industry: string;
      annualRevenue: number;
      employeeCount: number;
      businessLocation: string;
    };
    coverageTypes: {
      generalLiability: boolean;
      professionalLiability: boolean;
      property: boolean;
      workersCompensation: boolean;
      businessInterruption: boolean;
      cyberLiability: boolean;
    };
  };
  
  // Financial Information
  financialInfo: {
    annualIncome: number;
    netWorth: number;
    debtToIncomeRatio: number;
    creditScore: number;
    financialObligations: number;
  };
  
  // Market Conditions
  marketConditions: {
    interestRate: number;
    inflationRate: number;
    marketCompetition: number;
    regulatoryEnvironment: string;
    industryTrends: string[];
  };
  
  // Actuarial Data
  actuarialData: {
    mortalityTable: string;
    morbidityTable: string;
    lapseRate: number;
    expenseRatio: number;
    lossRatio: number;
    combinedRatio: number;
  };
  
  // Investment Information
  investmentInfo: {
    investmentStrategy: string;
    assetAllocation: {
      assetClass: string;
      percentage: number;
    }[];
    expectedReturn: number;
    riskTolerance: 'low' | 'medium' | 'high';
  };
  
  // Tax Considerations
  taxConsiderations: {
    taxDeductible: boolean;
    taxRate: number;
    taxTreatment: string;
    taxBenefits: string[];
  };
  
  // Regulatory Environment
  regulatoryEnvironment: {
    regulatoryStatus: string;
    complianceRequirements: string[];
    regulatoryRisks: string[];
    solvencyRequirements: number;
  };
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    claimAmount: number;
    premiumChange: number;
    coverageChange: number;
    regulatoryChange: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeCatastrophicEvents: boolean;
  catastrophicEventProbability: number;
  catastrophicEventImpact: number;
  
  // Historical Analysis
  historicalData: {
    date: string;
    premium: number;
    claims: number;
    lossRatio: number;
    investmentReturn: number;
  }[];
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  inflationRate: number;
  includeTaxes: boolean;
  includeInvestmentReturns: boolean;
  includeRegulatoryChanges: boolean;
  
  // Reporting Preferences
  includePremiumAnalysis: boolean;
  includeRiskMetrics: boolean;
  includeClaimsAnalysis: boolean;
  includeUnderwritingAnalysis: boolean;
  includeInvestmentAnalysis: boolean;
  includeRegulatoryAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeScenarioAnalysis: boolean;
  includeMonteCarlo: boolean;
  includeHistoricalAnalysis: boolean;
  includeComparativeAnalysis: boolean;
  includeRecommendations: boolean;
  includeActionItems: boolean;
  
  // Output Format
  outputFormat: 'detailed' | 'summary' | 'executive';
  includeCharts: boolean;
  includeTables: boolean;
  includeRecommendations: boolean;
}

export interface InsuranceResults {
  // Core Insurance Metrics
  policyValue: number;
  premiumCost: number;
  coverageValue: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  
  // Premium Analysis
  premiumAnalysis: {
    annualPremium: number;
    monthlyPremium: number;
    premiumBreakdown: {
      component: string;
      amount: number;
      percentage: number;
    }[];
    premiumTrend: number;
    premiumEfficiency: number;
  };
  
  // Risk Metrics
  riskMetrics: {
    riskScore: number;
    riskCategory: string;
    expectedLoss: number;
    valueAtRisk: number;
    conditionalVaR: number;
    riskOfLoss: number;
  };
  
  // Performance Metrics
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    sortinoRatio: number;
    calmarRatio: number;
    treynorRatio: number;
    informationRatio: number;
  };
  
  // Claims Analysis
  claimsAnalysis: {
    expectedClaims: number;
    claimsFrequency: number;
    claimsSeverity: number;
    lossRatio: number;
    claimsTrend: number;
    claimsProjection: {
      year: number;
      expectedClaims: number;
      probability: number;
    }[];
  };
  
  // Underwriting Analysis
  underwritingAnalysis: {
    underwritingClass: string;
    ratingFactors: {
      factor: string;
      value: string;
      impact: number;
    }[];
    underwritingScore: number;
    pricingEfficiency: number;
    riskSelection: number;
  };
  
  // Life Insurance Analysis
  lifeInsuranceAnalysis: {
    deathBenefit: number;
    cashValue: number;
    surrenderValue: number;
    policyLoan: number;
    dividend: number;
    policyEfficiency: number;
    riders: {
      waiverOfPremium: boolean;
      accidentalDeath: boolean;
      criticalIllness: boolean;
      longTermCare: boolean;
    };
  };
  
  // Health Insurance Analysis
  healthInsuranceAnalysis: {
    networkType: string;
    inNetworkDeductible: number;
    outNetworkDeductible: number;
    inNetworkCoinsurance: number;
    outNetworkCoinsurance: number;
    copays: {
      primaryCare: number;
      specialist: number;
      urgentCare: number;
      emergencyRoom: number;
      prescription: number;
    };
    coverageEfficiency: number;
    costEffectiveness: number;
  };
  
  // Auto Insurance Analysis
  autoInsuranceAnalysis: {
    vehicleInfo: {
      make: string;
      model: string;
      year: number;
      value: number;
    };
    drivers: {
      name: string;
      age: number;
      riskScore: number;
    }[];
    coverageEfficiency: number;
    riskAssessment: number;
  };
  
  // Home Insurance Analysis
  homeInsuranceAnalysis: {
    propertyInfo: {
      address: string;
      propertyType: string;
      replacementCost: number;
    };
    coverageEfficiency: number;
    riskAssessment: number;
    propertyProtection: number;
  };
  
  // Business Insurance Analysis
  businessInsuranceAnalysis: {
    businessInfo: {
      businessType: string;
      industry: string;
      annualRevenue: number;
    };
    coverageEfficiency: number;
    riskAssessment: number;
    businessProtection: number;
  };
  
  // Investment Analysis
  investmentAnalysis: {
    investmentStrategy: string;
    assetAllocation: {
      assetClass: string;
      percentage: number;
      return: number;
    }[];
    expectedReturn: number;
    investmentRisk: number;
    investmentEfficiency: number;
  };
  
  // Financial Analysis
  financialAnalysis: {
    annualIncome: number;
    netWorth: number;
    debtToIncomeRatio: number;
    creditScore: number;
    financialObligations: number;
    financialHealth: number;
    affordability: number;
  };
  
  // Market Analysis
  marketAnalysis: {
    interestRate: number;
    inflationRate: number;
    marketCompetition: number;
    regulatoryEnvironment: string;
    marketEfficiency: number;
    competitivePosition: number;
  };
  
  // Actuarial Analysis
  actuarialAnalysis: {
    mortalityTable: string;
    morbidityTable: string;
    lapseRate: number;
    expenseRatio: number;
    lossRatio: number;
    combinedRatio: number;
    actuarialSoundness: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxDeductible: boolean;
    taxRate: number;
    taxTreatment: string;
    taxBenefits: string[];
    afterTaxCost: number;
    taxEfficiency: number;
  };
  
  // Regulatory Analysis
  regulatoryAnalysis: {
    regulatoryStatus: string;
    complianceRequirements: string[];
    regulatoryRisks: string[];
    solvencyRequirements: number;
    regulatoryCompliance: number;
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    marketAverage: number;
    competitorComparison: {
      competitor: string;
      premium: number;
      coverage: number;
      rating: number;
    }[];
    marketPosition: number;
    competitiveAdvantage: string[];
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    premiumCost: number;
    coverageValue: number;
    netValue: number;
    riskMetrics: {
      expectedLoss: number;
      var: number;
      cvar: number;
    };
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanValue: number;
    medianValue: number;
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
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalPremium: number;
    historicalClaims: number;
    historicalLossRatio: number;
    historicalTrends: string[];
    historicalVolatility: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPremium: number;
    highPremium: number;
    sensitivity: number;
  }[];
  
  // Optimization Opportunities
  optimizationOpportunities: {
    category: string;
    description: string;
    potentialSavings: number;
    implementationDifficulty: 'low' | 'medium' | 'high';
    priority: 'low' | 'medium' | 'high';
  }[];
  
  // Business Impact
  businessImpact: {
    costSavings: number;
    riskReduction: number;
    coverageImprovement: number;
    financialProtection: number;
    peaceOfMind: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    riskAssessment: string;
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
    policyValue: number;
    premiumCost: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'purchase' | 'modify' | 'decline';
    keyRisks: string[];
    keyBenefits: string[];
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
