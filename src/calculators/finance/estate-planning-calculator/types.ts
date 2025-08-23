export interface EstatePlanningInputs {
  // Client Information
  clientInfo: {
    name: string;
    age: number;
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    citizenship: string;
    stateOfResidence: string;
    healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
    lifeExpectancy: number;
    dependents: number;
    beneficiaries: {
      name: string;
      relationship: string;
      age: number;
      percentage: number;
    }[];
  };
  
  // Estate Assets
  estateAssets: {
    // Liquid Assets
    liquidAssets: {
      cash: number;
      checkingAccounts: number;
      savingsAccounts: number;
      moneyMarketAccounts: number;
      certificatesOfDeposit: number;
      totalLiquidAssets: number;
    };
    
    // Investment Assets
    investmentAssets: {
      stocks: number;
      bonds: number;
      mutualFunds: number;
      exchangeTradedFunds: number;
      realEstateInvestmentTrusts: number;
      commodities: number;
      cryptocurrencies: number;
      otherInvestments: number;
      totalInvestmentAssets: number;
    };
    
    // Real Estate
    realEstate: {
      primaryResidence: {
        address: string;
        value: number;
        mortgage: number;
        equity: number;
      };
      vacationHomes: {
        address: string;
        value: number;
        mortgage: number;
        equity: number;
      }[];
      investmentProperties: {
        address: string;
        value: number;
        mortgage: number;
        equity: number;
        rentalIncome: number;
      }[];
      commercialProperties: {
        address: string;
        value: number;
        mortgage: number;
        equity: number;
        rentalIncome: number;
      }[];
      totalRealEstate: number;
    };
    
    // Business Interests
    businessInterests: {
      soleProprietorship: number;
      partnerships: number;
      limitedLiabilityCompanies: number;
      sCorporations: number;
      cCorporations: number;
      professionalCorporations: number;
      totalBusinessInterests: number;
    };
    
    // Retirement Assets
    retirementAssets: {
      traditionalIra: number;
      rothIra: number;
      k401k: number;
      k403b: number;
      pension: number;
      annuities: number;
      otherRetirement: number;
      totalRetirementAssets: number;
    };
    
    // Life Insurance
    lifeInsurance: {
      termLife: number;
      wholeLife: number;
      universalLife: number;
      variableLife: number;
      groupLife: number;
      totalLifeInsurance: number;
    };
    
    // Personal Property
    personalProperty: {
      vehicles: number;
      jewelry: number;
      artwork: number;
      collectibles: number;
      furniture: number;
      electronics: number;
      otherPersonalProperty: number;
      totalPersonalProperty: number;
    };
    
    // Other Assets
    otherAssets: {
      intellectualProperty: number;
      royalties: number;
      mineralRights: number;
      oilAndGas: number;
      otherAssets: number;
      totalOtherAssets: number;
    };
    
    totalEstateValue: number;
  };
  
  // Estate Liabilities
  estateLiabilities: {
    mortgages: number;
    personalLoans: number;
    creditCardDebt: number;
    medicalDebt: number;
    taxLiabilities: number;
    businessDebt: number;
    otherLiabilities: number;
    totalLiabilities: number;
  };
  
  // Estate Planning Documents
  estatePlanningDocuments: {
    // Wills
    will: {
      hasWill: boolean;
      lastUpdated: string;
      executor: string;
      backupExecutor: string;
      guardians: string[];
      backupGuardians: string[];
    };
    
    // Trusts
    trusts: {
      revocableLivingTrust: {
        hasTrust: boolean;
        trustee: string;
        backupTrustee: string;
        beneficiaries: string[];
        trustValue: number;
      };
      irrevocableTrust: {
        hasTrust: boolean;
        trustee: string;
        backupTrustee: string;
        beneficiaries: string[];
        trustValue: number;
        trustType: string;
      };
      charitableTrust: {
        hasTrust: boolean;
        trustee: string;
        backupTrustee: string;
        beneficiaries: string[];
        trustValue: number;
        charitableOrganization: string;
      };
      specialNeedsTrust: {
        hasTrust: boolean;
        trustee: string;
        backupTrustee: string;
        beneficiary: string;
        trustValue: number;
      };
    };
    
    // Powers of Attorney
    powersOfAttorney: {
      financialPowerOfAttorney: {
        hasDocument: boolean;
        agent: string;
        backupAgent: string;
        effectiveDate: string;
      };
      healthcarePowerOfAttorney: {
        hasDocument: boolean;
        agent: string;
        backupAgent: string;
        effectiveDate: string;
      };
    };
    
    // Advanced Directives
    advancedDirectives: {
      livingWill: {
        hasDocument: boolean;
        lastUpdated: string;
        healthcareAgent: string;
      };
      doNotResuscitate: {
        hasDocument: boolean;
        lastUpdated: string;
      };
      organDonation: {
        hasDocument: boolean;
        preferences: string;
      };
    };
    
    // Business Succession
    businessSuccession: {
      buySellAgreement: {
        hasAgreement: boolean;
        type: 'cross_purchase' | 'entity_purchase' | 'wait_and_see';
        funding: 'life_insurance' | 'sinking_fund' | 'installment_sale';
        value: number;
      };
      keyPersonInsurance: {
        hasInsurance: boolean;
        insured: string;
        beneficiary: string;
        amount: number;
      };
    };
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Federal Estate Tax
    federalEstateTax: {
      applicableExclusionAmount: number;
      currentExclusion: number;
      taxableEstate: number;
      estateTaxRate: number;
      estimatedEstateTax: number;
    };
    
    // State Estate Tax
    stateEstateTax: {
      stateExclusion: number;
      stateTaxableEstate: number;
      stateEstateTaxRate: number;
      estimatedStateEstateTax: number;
    };
    
    // Gift Tax
    giftTax: {
      annualExclusion: number;
      lifetimeExclusion: number;
      giftsGiven: number;
      remainingExclusion: number;
    };
    
    // Generation Skipping Transfer Tax
    generationSkippingTransferTax: {
      gsttExclusion: number;
      gsttExemptionUsed: number;
      remainingGsttExemption: number;
    };
    
    // Income Tax
    incomeTax: {
      stepUpInBasis: boolean;
      capitalGainsTax: number;
      incomeTaxRate: number;
    };
  };
  
  // Charitable Planning
  charitablePlanning: {
    charitableIntentions: {
      hasCharitableIntentions: boolean;
      charitableOrganizations: string[];
      intendedAmount: number;
      percentageOfEstate: number;
    };
    
    charitableGiving: {
      charitableGiftAnnuity: {
        hasAnnuity: boolean;
        amount: number;
        organization: string;
        annuityRate: number;
      };
      charitableRemainderTrust: {
        hasTrust: boolean;
        amount: number;
        organization: string;
        payoutRate: number;
      };
      charitableLeadTrust: {
        hasTrust: boolean;
        amount: number;
        organization: string;
        payoutRate: number;
      };
      donorAdvisedFund: {
        hasFund: boolean;
        amount: number;
        organization: string;
      };
    };
  };
  
  // Family Dynamics
  familyDynamics: {
    familyStructure: {
      spouse: {
        name: string;
        age: number;
        healthStatus: string;
        financialDependency: boolean;
      };
      children: {
        name: string;
        age: number;
        financialDependency: boolean;
        specialNeeds: boolean;
        guardianship: string;
      }[];
      grandchildren: {
        name: string;
        age: number;
        relationship: string;
      }[];
      parents: {
        name: string;
        age: number;
        financialDependency: boolean;
        careNeeds: boolean;
      }[];
    };
    
    familyRelationships: {
      familyHarmony: 'excellent' | 'good' | 'fair' | 'poor';
      potentialConflicts: string[];
      specialConsiderations: string[];
    };
  };
  
  // Goals and Objectives
  goalsAndObjectives: {
    primaryGoals: {
      assetProtection: boolean;
      taxMinimization: boolean;
      probateAvoidance: boolean;
      familyHarmony: boolean;
      charitableGiving: boolean;
      businessContinuity: boolean;
      privacy: boolean;
      control: boolean;
    };
    
    specificObjectives: {
      provideForSpouse: boolean;
      provideForChildren: boolean;
      provideForGrandchildren: boolean;
      provideForCharity: boolean;
      minimizeTaxes: boolean;
      avoidProbate: boolean;
      protectAssets: boolean;
      maintainControl: boolean;
    };
    
    timeline: {
      immediate: string[];
      shortTerm: string[];
      longTerm: string[];
    };
  };
  
  // Risk Assessment
  riskAssessment: {
    legalRisks: {
      willContest: boolean;
      trustChallenges: boolean;
      beneficiaryDisputes: boolean;
      executorIssues: boolean;
      trusteeIssues: boolean;
    };
    
    financialRisks: {
      marketVolatility: boolean;
      inflationRisk: boolean;
      interestRateRisk: boolean;
      currencyRisk: boolean;
      concentrationRisk: boolean;
    };
    
    familyRisks: {
      divorce: boolean;
      remarriage: boolean;
      blendedFamily: boolean;
      substanceAbuse: boolean;
      financialIrresponsibility: boolean;
      specialNeeds: boolean;
    };
    
    businessRisks: {
      businessFailure: boolean;
      keyPersonRisk: boolean;
      successionFailure: boolean;
      marketChanges: boolean;
      regulatoryChanges: boolean;
    };
  };
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  inflationRate: number;
  investmentReturn: number;
  taxRateProjection: number;
  includeFederalTaxes: boolean;
  includeStateTaxes: boolean;
  includeGiftTaxes: boolean;
  includeGenerationSkippingTax: boolean;
  
  // Scenario Analysis
  scenarios: {
    name: string;
    probability: number;
    assetGrowth: number;
    taxLawChanges: number;
    familyChanges: number;
    healthChanges: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeTaxLawChanges: boolean;
  includeMarketVolatility: boolean;
  includeLifeExpectancy: boolean;
  
  // Historical Analysis
  historicalData: {
    year: number;
    estateValue: number;
    taxLiability: number;
    netEstate: number;
    beneficiaries: number;
  }[];
  
  // Reporting Preferences
  includeAssetAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeDocumentAnalysis: boolean;
  includeCharitableAnalysis: boolean;
  includeFamilyAnalysis: boolean;
  includeRiskAnalysis: boolean;
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

export interface EstatePlanningResults {
  // Core Estate Metrics
  totalEstateValue: number;
  totalLiabilities: number;
  netEstateValue: number;
  estimatedTaxLiability: number;
  netToBeneficiaries: number;
  
  // Asset Analysis
  assetAnalysis: {
    totalEstateValue: number;
    assetBreakdown: {
      category: string;
      value: number;
      percentage: number;
    }[];
    liquidAssets: number;
    illiquidAssets: number;
    assetLiquidity: number;
    assetDiversification: number;
  };
  
  // Liability Analysis
  liabilityAnalysis: {
    totalLiabilities: number;
    liabilityBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    debtToEstateRatio: number;
    liquidityCoverage: number;
    liabilityRisk: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    federalEstateTax: number;
    stateEstateTax: number;
    totalEstateTax: number;
    effectiveTaxRate: number;
    taxBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    taxEfficiency: number;
  };
  
  // Document Analysis
  documentAnalysis: {
    documentCompleteness: number;
    missingDocuments: string[];
    documentStrengths: string[];
    documentWeaknesses: string[];
    documentRecommendations: string[];
  };
  
  // Beneficiary Analysis
  beneficiaryAnalysis: {
    totalBeneficiaries: number;
    beneficiaryBreakdown: {
      beneficiary: string;
      relationship: string;
      percentage: number;
      amount: number;
    }[];
    beneficiaryProtection: number;
    beneficiaryFairness: number;
  };
  
  // Trust Analysis
  trustAnalysis: {
    totalTrusts: number;
    trustBreakdown: {
      trustType: string;
      value: number;
      beneficiaries: string[];
      taxBenefits: number;
    }[];
    trustEfficiency: number;
    probateAvoidance: number;
  };
  
  // Charitable Analysis
  charitableAnalysis: {
    charitableIntentions: boolean;
    charitableAmount: number;
    charitablePercentage: number;
    taxBenefits: number;
    charitableEfficiency: number;
  };
  
  // Family Analysis
  familyAnalysis: {
    familyStructure: string;
    familyHarmony: number;
    potentialConflicts: string[];
    specialNeeds: boolean;
    familyProtection: number;
  };
  
  // Business Analysis
  businessAnalysis: {
    businessValue: number;
    businessPercentage: number;
    successionPlan: boolean;
    keyPersonInsurance: boolean;
    businessContinuity: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    legalRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    financialRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    familyRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    businessRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    overallRiskScore: number;
  };
  
  // Estate Planning Score
  estatePlanningScore: {
    overallScore: number;
    componentScores: {
      assetProtection: number;
      taxEfficiency: number;
      probateAvoidance: number;
      familyHarmony: number;
      charitableGiving: number;
      businessContinuity: number;
      privacy: number;
      control: number;
    };
    recommendations: string[];
  };
  
  // Comparative Analysis
  comparativeAnalysis: {
    averageEstateSize: number;
    averageTaxRate: number;
    peerComparison: {
      peer: string;
      estateSize: number;
      taxRate: number;
      planningScore: number;
    }[];
    marketPosition: number;
  };
  
  // Scenario Analysis Results
  scenarioResults: {
    scenarioName: string;
    probability: number;
    estateValue: number;
    taxLiability: number;
    netToBeneficiaries: number;
    planningScore: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanEstateValue: number;
    medianEstateValue: number;
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
      estateValue: number;
      probability: number;
    }[];
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalEstateValue: number;
    historicalTaxLiability: number;
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
    lowEstateValue: number;
    highEstateValue: number;
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
    probateSavings: number;
    familyProtection: number;
    assetProtection: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    estateAssessment: string;
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
    totalEstateValue: number;
    netToBeneficiaries: number;
    taxLiability: number;
    recommendation: 'implement' | 'review' | 'maintain';
    keyStrengths: string[];
    keyWeaknesses: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendation: string;
    rationale: string;
    expectedBenefit: number;
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
