export interface CreditRiskCalculatorInputs {
  // Borrower Information
  borrowerInfo: {
    // Company Details
    companyDetails: {
      companyName: string;
      industry: string;
      sector: string;
      companySize: 'small' | 'medium' | 'large' | 'enterprise';
      creditRating: string;
      yearsInBusiness: number;
      employeeCount: number;
      companyDescription: string;
    };
    
    // Financial Information
    financialInfo: {
      // Income Statement
      incomeStatement: {
        revenue: number;
        costOfGoodsSold: number;
        grossProfit: number;
        operatingExpenses: number;
        ebitda: number;
        depreciation: number;
        amortization: number;
        ebit: number;
        interestExpense: number;
        ebt: number;
        taxes: number;
        netIncome: number;
      };
      
      // Balance Sheet
      balanceSheet: {
        totalAssets: number;
        currentAssets: number;
        fixedAssets: number;
        intangibleAssets: number;
        totalLiabilities: number;
        currentLiabilities: number;
        longTermDebt: number;
        shareholdersEquity: number;
        workingCapital: number;
        netDebt: number;
      };
      
      // Cash Flow Statement
      cashFlowStatement: {
        operatingCashFlow: number;
        investingCashFlow: number;
        financingCashFlow: number;
        netCashFlow: number;
        capitalExpenditures: number;
        freeCashFlow: number;
      };
      
      // Financial Ratios
      financialRatios: {
        debtToEquity: number;
        debtToEbitda: number;
        interestCoverage: number;
        currentRatio: number;
        quickRatio: number;
        returnOnEquity: number;
        returnOnAssets: number;
        grossMargin: number;
        operatingMargin: number;
        netMargin: number;
      };
    };
    
    // Market Information
    marketInfo: {
      marketCap: number;
      enterpriseValue: number;
      beta: number;
      volatility: number;
      correlation: number;
    };
  };
  
  // Loan Information
  loanInfo: {
    // Loan Details
    loanDetails: {
      loanAmount: number;
      loanType: 'term_loan' | 'revolving' | 'bridge' | 'construction' | 'acquisition' | 'refinancing' | 'working_capital' | 'equipment' | 'real_estate' | 'other';
      loanPurpose: string;
      interestRate: number;
      loanTerm: number; // in months
      paymentFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      collateralType: 'real_estate' | 'equipment' | 'inventory' | 'receivables' | 'securities' | 'personal_guarantee' | 'corporate_guarantee' | 'unsecured' | 'other';
      collateralValue: number;
      loanToValue: number;
      debtServiceCoverage: number;
    };
    
    // Loan Structure
    loanStructure: {
      principalAmount: number;
      interestOnly: boolean;
      interestOnlyPeriod: number;
      balloonPayment: number;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      covenants: string[];
      defaultEvents: string[];
    };
    
    // Payment Schedule
    paymentSchedule: {
      paymentNumber: number;
      paymentDate: string;
      principalPayment: number;
      interestPayment: number;
      totalPayment: number;
      remainingBalance: number;
    }[];
  };
  
  // Credit Risk Factors
  creditRiskFactors: {
    // Financial Risk
    financialRisk: {
      leverageRisk: number;
      liquidityRisk: number;
      profitabilityRisk: number;
      cashFlowRisk: number;
      assetQualityRisk: number;
      totalFinancialRisk: number;
    };
    
    // Business Risk
    businessRisk: {
      industryRisk: number;
      competitiveRisk: number;
      marketRisk: number;
      operationalRisk: number;
      managementRisk: number;
      totalBusinessRisk: number;
    };
    
    // Market Risk
    marketRisk: {
      interestRateRisk: number;
      currencyRisk: number;
      commodityRisk: number;
      equityRisk: number;
      correlationRisk: number;
      totalMarketRisk: number;
    };
    
    // Structural Risk
    structuralRisk: {
      seniorityRisk: number;
      collateralRisk: number;
      covenantRisk: number;
      maturityRisk: number;
      refinancingRisk: number;
      totalStructuralRisk: number;
    };
  };
  
  // Credit Scoring
  creditScoring: {
    // Quantitative Factors
    quantitativeFactors: {
      debtToEquity: number;
      debtToEbitda: number;
      interestCoverage: number;
      currentRatio: number;
      quickRatio: number;
      returnOnEquity: number;
      returnOnAssets: number;
      grossMargin: number;
      operatingMargin: number;
      netMargin: number;
      freeCashFlow: number;
      workingCapital: number;
    };
    
    // Qualitative Factors
    qualitativeFactors: {
      managementQuality: number;
      industryPosition: number;
      marketShare: number;
      competitiveAdvantage: number;
      regulatoryEnvironment: number;
      technologyRisk: number;
      environmentalRisk: number;
      legalRisk: number;
    };
    
    // Credit Score
    creditScore: {
      overallScore: number;
      financialScore: number;
      businessScore: number;
      marketScore: number;
      structuralScore: number;
      riskGrade: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C' | 'D';
    };
  };
  
  // Default Probability
  defaultProbability: {
    // Historical Default Rates
    historicalDefaultRates: {
      rating: string;
      oneYear: number;
      threeYear: number;
      fiveYear: number;
      tenYear: number;
    }[];
    
    // Probability of Default Models
    probabilityOfDefaultModels: {
      model: 'merton' | 'kvm' | 'logit' | 'probit' | 'survival' | 'machine_learning' | 'other';
      pd: number;
      confidence: number;
      assumptions: string[];
    }[];
    
    // Default Probability
    defaultProbability: {
      oneYear: number;
      threeYear: number;
      fiveYear: number;
      tenYear: number;
      lifetime: number;
      confidence: number;
    };
  };
  
  // Loss Given Default
  lossGivenDefault: {
    // Recovery Analysis
    recoveryAnalysis: {
      collateralRecovery: number;
      unsecuredRecovery: number;
      totalRecovery: number;
      recoveryTimeline: number;
      recoveryCosts: number;
      netRecovery: number;
    };
    
    // Loss Given Default
    lossGivenDefault: {
      lgd: number;
      confidence: number;
      assumptions: string[];
      stressScenarios: {
        scenario: string;
        lgd: number;
        probability: number;
      }[];
    };
  };
  
  // Exposure at Default
  exposureAtDefault: {
    // Current Exposure
    currentExposure: {
      drawnAmount: number;
      undrawnAmount: number;
      totalExposure: number;
      utilizationRate: number;
    };
    
    // Future Exposure
    futureExposure: {
      expectedDrawdown: number;
      maximumDrawdown: number;
      exposureAtDefault: number;
      confidence: number;
    };
    
    // Exposure Profile
    exposureProfile: {
      timeHorizon: number;
      exposure: number;
      probability: number;
    }[];
  };
  
  // Expected Loss
  expectedLoss: {
    // Expected Loss Calculation
    expectedLossCalculation: {
      probabilityOfDefault: number;
      lossGivenDefault: number;
      exposureAtDefault: number;
      expectedLoss: number;
      confidence: number;
    };
    
    // Expected Loss Components
    expectedLossComponents: {
      component: string;
      value: number;
      contribution: number;
    }[];
    
    // Expected Loss Profile
    expectedLossProfile: {
      timeHorizon: number;
      expectedLoss: number;
      cumulativeLoss: number;
    }[];
  };
  
  // Credit Portfolio
  creditPortfolio: {
    // Portfolio Composition
    portfolioComposition: {
      borrower: string;
      exposure: number;
      rating: string;
      sector: string;
      industry: string;
      correlation: number;
    }[];
    
    // Portfolio Risk
    portfolioRisk: {
      totalExposure: number;
      weightedAverageRating: string;
      concentrationRisk: number;
      diversificationBenefit: number;
      portfolioExpectedLoss: number;
      portfolioUnexpectedLoss: number;
    };
    
    // Correlation Matrix
    correlationMatrix: {
      borrower1: string;
      borrower2: string;
      correlation: number;
    }[];
  };
  
  // Stress Testing
  stressTesting: {
    // Economic Scenarios
    economicScenarios: {
      scenario: string;
      probability: number;
      gdpGrowth: number;
      interestRate: number;
      unemployment: number;
      inflation: number;
      defaultRate: number;
      recoveryRate: number;
    }[];
    
    // Industry Scenarios
    industryScenarios: {
      scenario: string;
      probability: number;
      industryGrowth: number;
      competitiveIntensity: number;
      regulatoryChanges: string[];
      technologyDisruption: number;
      defaultRate: number;
    }[];
    
    // Company-Specific Scenarios
    companyScenarios: {
      scenario: string;
      probability: number;
      revenueShock: number;
      marginShock: number;
      liquidityShock: number;
      managementRisk: number;
      defaultProbability: number;
    }[];
  };
  
  // Credit Derivatives
  creditDerivatives: {
    // Credit Default Swap
    creditDefaultSwap: {
      notionalAmount: number;
      spread: number;
      maturity: number;
      paymentFrequency: string;
      referenceEntity: string;
      referenceObligation: string;
      protectionSeller: string;
      protectionBuyer: string;
    };
    
    // Credit Linked Note
    creditLinkedNote: {
      principalAmount: number;
      couponRate: number;
      maturity: number;
      referenceEntity: string;
      creditEvent: string;
      recoveryRate: number;
    };
    
    // Total Return Swap
    totalReturnSwap: {
      notionalAmount: number;
      referenceAsset: string;
      totalReturnPayer: string;
      totalReturnReceiver: string;
      maturity: number;
      paymentFrequency: string;
    };
  };
  
  // Regulatory Capital
  regulatoryCapital: {
    // Basel Requirements
    baselRequirements: {
      riskWeight: number;
      capitalRequirement: number;
      tier1Capital: number;
      tier2Capital: number;
      totalCapital: number;
      capitalAdequacyRatio: number;
    };
    
    // Internal Ratings Based
    internalRatingsBased: {
      pd: number;
      lgd: number;
      ead: number;
      maturity: number;
      riskWeight: number;
      capitalRequirement: number;
    };
    
    // Standardized Approach
    standardizedApproach: {
      exposureCategory: string;
      riskWeight: number;
      capitalRequirement: number;
    };
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeDefaultCorrelation: boolean;
  includeRecoveryVolatility: boolean;
  includeExposureVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  confidenceLevel: number;
  riskHorizon: number;
  includePortfolioEffects: boolean;
  includeRegulatoryCapital: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeCreditScoring: boolean;
    includeDefaultProbability: boolean;
    includeLossGivenDefault: boolean;
    includeExpectedLoss: boolean;
    includeStressTesting: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    date: string;
    rating: string;
    defaultRate: number;
    recoveryRate: number;
    spread: number;
    economicConditions: string;
  }[];
  
  // Reporting Preferences
  includeCreditScoring: boolean;
  includeDefaultProbability: boolean;
  includeLossGivenDefault: boolean;
  includeExpectedLoss: boolean;
  includePortfolioAnalysis: boolean;
  includeStressTesting: boolean;
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

export interface CreditRiskCalculatorResults {
  // Core Credit Risk Metrics
  creditScore: number;
  defaultProbability: number;
  lossGivenDefault: number;
  expectedLoss: number;
  riskRating: string;
  
  // Credit Risk Analysis
  creditRiskAnalysis: {
    creditScore: number;
    defaultProbability: number;
    lossGivenDefault: number;
    expectedLoss: number;
    riskRating: string;
    riskBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    riskEfficiency: number;
  };
  
  // Credit Scoring Analysis
  creditScoringAnalysis: {
    overallScore: number;
    financialScore: number;
    businessScore: number;
    marketScore: number;
    structuralScore: number;
    riskGrade: string;
    scoreComponents: {
      factor: string;
      score: number;
      weight: number;
      contribution: number;
    }[];
    scoreEfficiency: number;
  };
  
  // Default Probability Analysis
  defaultProbabilityAnalysis: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
    tenYear: number;
    lifetime: number;
    confidence: number;
    defaultProbabilityModels: {
      model: string;
      pd: number;
      confidence: number;
      assumptions: string[];
    }[];
    defaultProbabilityEfficiency: number;
  };
  
  // Loss Given Default Analysis
  lossGivenDefaultAnalysis: {
    lgd: number;
    confidence: number;
    recoveryAnalysis: {
      collateralRecovery: number;
      unsecuredRecovery: number;
      totalRecovery: number;
      recoveryTimeline: number;
      recoveryCosts: number;
      netRecovery: number;
    };
    stressScenarios: {
      scenario: string;
      lgd: number;
      probability: number;
    }[];
    lgdEfficiency: number;
  };
  
  // Exposure at Default Analysis
  exposureAtDefaultAnalysis: {
    currentExposure: {
      drawnAmount: number;
      undrawnAmount: number;
      totalExposure: number;
      utilizationRate: number;
    };
    futureExposure: {
      expectedDrawdown: number;
      maximumDrawdown: number;
      exposureAtDefault: number;
      confidence: number;
    };
    exposureProfile: {
      timeHorizon: number;
      exposure: number;
      probability: number;
    }[];
    exposureEfficiency: number;
  };
  
  // Expected Loss Analysis
  expectedLossAnalysis: {
    expectedLoss: number;
    confidence: number;
    expectedLossComponents: {
      component: string;
      value: number;
      contribution: number;
    }[];
    expectedLossProfile: {
      timeHorizon: number;
      expectedLoss: number;
      cumulativeLoss: number;
    }[];
    expectedLossEfficiency: number;
  };
  
  // Portfolio Analysis
  portfolioAnalysis: {
    portfolioComposition: {
      borrower: string;
      exposure: number;
      rating: string;
      sector: string;
      industry: string;
      correlation: number;
    }[];
    portfolioRisk: {
      totalExposure: number;
      weightedAverageRating: string;
      concentrationRisk: number;
      diversificationBenefit: number;
      portfolioExpectedLoss: number;
      portfolioUnexpectedLoss: number;
    };
    correlationMatrix: {
      borrower1: string;
      borrower2: string;
      correlation: number;
    }[];
    portfolioEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    financialRisk: {
      leverageRisk: number;
      liquidityRisk: number;
      profitabilityRisk: number;
      cashFlowRisk: number;
      assetQualityRisk: number;
      totalFinancialRisk: number;
      riskContribution: number;
    };
    businessRisk: {
      industryRisk: number;
      competitiveRisk: number;
      marketRisk: number;
      operationalRisk: number;
      managementRisk: number;
      totalBusinessRisk: number;
      riskContribution: number;
    };
    marketRisk: {
      interestRateRisk: number;
      currencyRisk: number;
      commodityRisk: number;
      equityRisk: number;
      correlationRisk: number;
      totalMarketRisk: number;
      riskContribution: number;
    };
    structuralRisk: {
      seniorityRisk: number;
      collateralRisk: number;
      covenantRisk: number;
      maturityRisk: number;
      refinancingRisk: number;
      totalStructuralRisk: number;
      riskContribution: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Stress Testing Analysis
  stressTestingAnalysis: {
    economicScenarios: {
      scenario: string;
      probability: number;
      gdpGrowth: number;
      interestRate: number;
      unemployment: number;
      inflation: number;
      defaultRate: number;
      recoveryRate: number;
      impact: number;
    }[];
    industryScenarios: {
      scenario: string;
      probability: number;
      industryGrowth: number;
      competitiveIntensity: number;
      regulatoryChanges: string[];
      technologyDisruption: number;
      defaultRate: number;
      impact: number;
    }[];
    companyScenarios: {
      scenario: string;
      probability: number;
      revenueShock: number;
      marginShock: number;
      liquidityShock: number;
      managementRisk: number;
      defaultProbability: number;
      impact: number;
    }[];
    stressTestingEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowRisk: number;
    highRisk: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    probability: number;
    defaultProbability: number;
    lossGivenDefault: number;
    expectedLoss: number;
    riskLevel: string;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      creditScore: number;
      defaultProbability: number;
      lossGivenDefault: number;
      expectedLoss: number;
      outperformance: number;
    }[];
    industryComparison: {
      metric: string;
      borrower: number;
      industry: number;
      difference: number;
    }[];
  };
  
  // Credit Risk Score
  creditRiskScore: {
    overallScore: number;
    componentScores: {
      creditScoring: number;
      defaultProbability: number;
      lossGivenDefault: number;
      expectedLoss: number;
      portfolio: number;
    };
    recommendation: 'approve' | 'approve_with_conditions' | 'decline' | 'review';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanExpectedLoss: number;
    medianExpectedLoss: number;
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
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalDefaultRate: number;
    historicalRecoveryRate: number;
    historicalSpread: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Optimization Opportunities
  optimizationOpportunities: {
    category: string;
    description: string;
    potentialImprovement: number;
    implementationDifficulty: 'low' | 'medium' | 'high';
    priority: 'low' | 'medium' | 'high';
  }[];
  
  // Business Impact
  businessImpact: {
    riskReduction: number;
    capitalEfficiency: number;
    returnImprovement: number;
    costSavings: number;
    overallBenefit: number;
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
    creditScore: number;
    defaultProbability: number;
    expectedLoss: number;
    recommendation: 'approve' | 'approve_with_conditions' | 'decline' | 'review';
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
