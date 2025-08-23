export interface TaxInputs {
  // Taxpayer Information
  taxpayerInfo: {
    name: string;
    filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household' | 'qualifying_widow';
    age: number;
    dependents: number;
    stateOfResidence: string;
    countryOfResidence: string;
    citizenship: string;
    taxYear: number;
  };
  
  // Income Information
  incomeInfo: {
    // Employment Income
    wages: number;
    salary: number;
    bonuses: number;
    tips: number;
    commissions: number;
    severancePay: number;
    
    // Business Income
    businessIncome: number;
    businessExpenses: number;
    netBusinessIncome: number;
    
    // Investment Income
    interestIncome: number;
    dividendIncome: number;
    capitalGains: {
      shortTerm: number;
      longTerm: number;
      qualifiedDividends: number;
    };
    rentalIncome: number;
    rentalExpenses: number;
    netRentalIncome: number;
    
    // Retirement Income
    socialSecurityBenefits: number;
    pensionIncome: number;
    annuityIncome: number;
    iraDistributions: number;
    rothIraDistributions: number;
    k401kDistributions: number;
    
    // Other Income
    alimonyReceived: number;
    childSupport: number;
    unemploymentBenefits: number;
    disabilityBenefits: number;
    gamblingWinnings: number;
    lotteryWinnings: number;
    inheritance: number;
    gifts: number;
    foreignIncome: number;
    otherIncome: number;
    
    // Total Income
    totalIncome: number;
    adjustedGrossIncome: number;
  };
  
  // Deductions
  deductions: {
    // Standard vs Itemized
    useStandardDeduction: boolean;
    standardDeduction: number;
    
    // Itemized Deductions
    itemizedDeductions: {
      // Medical Expenses
      medicalExpenses: number;
      dentalExpenses: number;
      visionExpenses: number;
      prescriptionDrugs: number;
      healthInsurance: number;
      longTermCare: number;
      
      // State and Local Taxes
      stateIncomeTax: number;
      localIncomeTax: number;
      propertyTax: number;
      salesTax: number;
      
      // Interest
      mortgageInterest: number;
      homeEquityInterest: number;
      investmentInterest: number;
      studentLoanInterest: number;
      
      // Charitable Contributions
      cashDonations: number;
      nonCashDonations: number;
      charitableMileage: number;
      
      // Casualty and Theft Losses
      casualtyLosses: number;
      theftLosses: number;
      
      // Other Deductions
      jobExpenses: number;
      taxPreparationFees: number;
      investmentExpenses: number;
      gamblingLosses: number;
      otherDeductions: number;
    };
    
    // Above-the-Line Deductions
    aboveTheLineDeductions: {
      educatorExpenses: number;
      studentLoanInterest: number;
      hsaContributions: number;
      traditionalIraContributions: number;
      sepIraContributions: number;
      simpleIraContributions: number;
      selfEmployedHealthInsurance: number;
      alimonyPaid: number;
      movingExpenses: number;
      otherAboveTheLine: number;
    };
    
    totalDeductions: number;
  };
  
  // Credits
  credits: {
    // Child and Family Credits
    childTaxCredit: number;
    childAndDependentCareCredit: number;
    earnedIncomeTaxCredit: number;
    adoptionCredit: number;
    
    // Education Credits
    americanOpportunityCredit: number;
    lifetimeLearningCredit: number;
    
    // Health Care Credits
    premiumTaxCredit: number;
    healthCoverageTaxCredit: number;
    
    // Energy Credits
    residentialEnergyCredit: number;
    electricVehicleCredit: number;
    solarEnergyCredit: number;
    
    // Other Credits
    foreignTaxCredit: number;
    generalBusinessCredit: number;
    workOpportunityCredit: number;
    researchAndDevelopmentCredit: number;
    otherCredits: number;
    
    totalCredits: number;
  };
  
  // Business Information
  businessInfo: {
    businessType: 'sole_proprietorship' | 'partnership' | 'llc' | 's_corporation' | 'c_corporation';
    businessName: string;
    businessCode: string;
    businessIncome: number;
    businessExpenses: {
      costOfGoodsSold: number;
      advertising: number;
      carAndTruckExpenses: number;
      commissions: number;
      contractLabor: number;
      depreciation: number;
      employeeBenefits: number;
      insurance: number;
      interest: number;
      legalAndProfessional: number;
      officeExpenses: number;
      pensionAndProfitSharing: number;
      rentOrLease: number;
      repairsAndMaintenance: number;
      supplies: number;
      taxesAndLicenses: number;
      travel: number;
      meals: number;
      utilities: number;
      wages: number;
      otherExpenses: number;
    };
    netBusinessIncome: number;
  };
  
  // Investment Information
  investmentInfo: {
    // Capital Gains and Losses
    capitalGains: {
      shortTermGains: number;
      shortTermLosses: number;
      longTermGains: number;
      longTermLosses: number;
      qualifiedDividends: number;
      collectiblesGains: number;
      collectiblesLosses: number;
      section1250Gains: number;
      section1250Losses: number;
    };
    
    // Investment Expenses
    investmentExpenses: number;
    investmentInterest: number;
    
    // Foreign Investments
    foreignInvestments: number;
    foreignTaxPaid: number;
  };
  
  // Real Estate Information
  realEstateInfo: {
    // Rental Properties
    rentalProperties: {
      address: string;
      rentalIncome: number;
      rentalExpenses: {
        mortgageInterest: number;
        propertyTax: number;
        insurance: number;
        repairs: number;
        maintenance: number;
        utilities: number;
        propertyManagement: number;
        depreciation: number;
        otherExpenses: number;
      };
      netRentalIncome: number;
    }[];
    
    // Home Office
    homeOffice: {
      squareFootage: number;
      totalSquareFootage: number;
      homeOfficeExpenses: number;
      homeOfficeDeduction: number;
    };
    
    // Real Estate Professional
    realEstateProfessional: boolean;
    materialParticipation: boolean;
  };
  
  // Retirement Information
  retirementInfo: {
    // Contributions
    traditionalIraContribution: number;
    rothIraContribution: number;
    k401kContribution: number;
    sepIraContribution: number;
    simpleIraContribution: number;
    
    // Distributions
    traditionalIraDistribution: number;
    rothIraDistribution: number;
    k401kDistribution: number;
    requiredMinimumDistribution: number;
    
    // Rollovers
    iraRollover: number;
    k401kRollover: number;
  };
  
  // Estate and Gift Information
  estateGiftInfo: {
    estateValue: number;
    giftAmount: number;
    inheritanceAmount: number;
    trustIncome: number;
    trustDistributions: number;
  };
  
  // Alternative Minimum Tax
  amtInfo: {
    preferenceItems: {
      stateAndLocalTaxes: number;
      miscellaneousDeductions: number;
      interestOnPrivateActivityBonds: number;
      acceleratedDepreciation: number;
      stockOptions: number;
      otherPreferences: number;
    };
    amtExemption: number;
  };
  
  // State and Local Taxes
  stateLocalTaxes: {
    stateIncomeTax: number;
    localIncomeTax: number;
    propertyTax: number;
    salesTax: number;
    otherStateTaxes: number;
  };
  
  // International Tax
  internationalTax: {
    foreignIncome: number;
    foreignTaxPaid: number;
    foreignTaxCredit: number;
    foreignEarnedIncomeExclusion: number;
    foreignHousingExclusion: number;
    foreignBankAccountReporting: boolean;
    foreignAssetReporting: boolean;
  };
  
  // Tax Planning
  taxPlanning: {
    // Timing Strategies
    incomeDeferral: number;
    expenseAcceleration: number;
    lossHarvesting: number;
    
    // Entity Selection
    entityType: string;
    entityTaxRate: number;
    
    // Investment Strategies
    taxLossHarvesting: boolean;
    taxGainHarvesting: boolean;
    assetLocation: string;
    
    // Retirement Planning
    retirementContribution: number;
    retirementDistribution: number;
    requiredMinimumDistribution: number;
  };
  
  // Tax Law Changes
  taxLawChanges: {
    newLaws: string[];
    sunsetProvisions: string[];
    phaseOuts: string[];
    inflationAdjustments: number;
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  inflationRate: number;
  taxRateProjection: number;
  includeStateTaxes: boolean;
  includeLocalTaxes: boolean;
  includeAlternativeMinimumTax: boolean;
  includeEstateTax: boolean;
  includeGiftTax: boolean;
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    incomeChange: number;
    deductionChange: number;
    creditChange: number;
    taxRateChange: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeTaxLawChanges: boolean;
  includeEconomicChanges: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    income: number;
    deductions: number;
    credits: number;
    taxLiability: number;
    effectiveTaxRate: number;
  }[];
  
  // Reporting Preferences
  includeDetailedBreakdown: boolean;
  includeTaxOptimization: boolean;
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

export interface TaxResults {
  // Core Tax Metrics
  totalIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  totalTaxLiability: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  
  // Income Analysis
  incomeAnalysis: {
    totalIncome: number;
    adjustedGrossIncome: number;
    incomeBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    incomeTrend: number;
    incomeEfficiency: number;
  };
  
  // Deduction Analysis
  deductionAnalysis: {
    totalDeductions: number;
    standardDeduction: number;
    itemizedDeductions: number;
    aboveTheLineDeductions: number;
    deductionBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    deductionEfficiency: number;
  };
  
  // Credit Analysis
  creditAnalysis: {
    totalCredits: number;
    refundableCredits: number;
    nonRefundableCredits: number;
    creditBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    creditEfficiency: number;
  };
  
  // Tax Liability Analysis
  taxLiabilityAnalysis: {
    federalTax: number;
    stateTax: number;
    localTax: number;
    alternativeMinimumTax: number;
    selfEmploymentTax: number;
    totalTaxLiability: number;
    taxBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
  };
  
  // Tax Rate Analysis
  taxRateAnalysis: {
    effectiveTaxRate: number;
    marginalTaxRate: number;
    averageTaxRate: number;
    taxBracket: string;
    nextBracketThreshold: number;
    taxRateEfficiency: number;
  };
  
  // Business Tax Analysis
  businessTaxAnalysis: {
    businessIncome: number;
    businessExpenses: number;
    netBusinessIncome: number;
    selfEmploymentTax: number;
    businessDeductions: number;
    businessCredits: number;
    businessTaxLiability: number;
    businessTaxRate: number;
  };
  
  // Investment Tax Analysis
  investmentTaxAnalysis: {
    investmentIncome: number;
    capitalGains: {
      shortTerm: number;
      longTerm: number;
      qualifiedDividends: number;
    };
    investmentExpenses: number;
    investmentTaxLiability: number;
    investmentTaxRate: number;
    taxLossHarvesting: number;
  };
  
  // Real Estate Tax Analysis
  realEstateTaxAnalysis: {
    rentalIncome: number;
    rentalExpenses: number;
    netRentalIncome: number;
    depreciation: number;
    passiveActivityLoss: number;
    realEstateTaxLiability: number;
    realEstateTaxRate: number;
  };
  
  // Retirement Tax Analysis
  retirementTaxAnalysis: {
    retirementContributions: number;
    retirementDistributions: number;
    retirementTaxLiability: number;
    retirementTaxRate: number;
    requiredMinimumDistribution: number;
    earlyWithdrawalPenalty: number;
  };
  
  // Alternative Minimum Tax Analysis
  amtAnalysis: {
    amtIncome: number;
    amtExemption: number;
    amtTaxableIncome: number;
    amtTax: number;
    regularTax: number;
    amtLiability: number;
    amtCredit: number;
  };
  
  // State and Local Tax Analysis
  stateLocalTaxAnalysis: {
    stateIncomeTax: number;
    localIncomeTax: number;
    propertyTax: number;
    salesTax: number;
    totalStateLocalTax: number;
    stateLocalTaxRate: number;
  };
  
  // International Tax Analysis
  internationalTaxAnalysis: {
    foreignIncome: number;
    foreignTaxPaid: number;
    foreignTaxCredit: number;
    foreignEarnedIncomeExclusion: number;
    foreignHousingExclusion: number;
    internationalTaxLiability: number;
  };
  
  // Tax Optimization Analysis
  taxOptimizationAnalysis: {
    currentTaxLiability: number;
    optimizedTaxLiability: number;
    potentialSavings: number;
    optimizationStrategies: {
      strategy: string;
      savings: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
    }[];
    optimizationEfficiency: number;
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    averageTaxRate: number;
    medianTaxRate: number;
    taxRatePercentile: number;
    peerComparison: {
      peer: string;
      taxRate: number;
      taxLiability: number;
    }[];
    marketPosition: number;
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    income: number;
    deductions: number;
    credits: number;
    taxLiability: number;
    effectiveTaxRate: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanTaxLiability: number;
    medianTaxLiability: number;
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
      taxLiability: number;
      probability: number;
    }[];
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalTaxLiability: number;
    historicalEffectiveTaxRate: number;
    historicalTrends: string[];
    historicalVolatility: number;
    yearOverYearChange: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowTaxLiability: number;
    highTaxLiability: number;
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
    taxSavings: number;
    cashFlowImprovement: number;
    complianceCost: number;
    auditRisk: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    taxAssessment: string;
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
    totalIncome: number;
    taxLiability: number;
    effectiveTaxRate: number;
    recommendation: 'optimize' | 'maintain' | 'review';
    keySavings: string[];
    keyRisks: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedSavings: number;
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
