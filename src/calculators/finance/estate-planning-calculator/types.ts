export interface EstatePlanningCalculatorInputs {
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
      citizenship: string;
      residency: string;
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
      citizenship: string;
      residency: string;
    };
    
    // Dependents Information
    dependentsInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: string;
      relationship: string;
      occupation: string;
      education: string;
      healthStatus: string;
      specialNeeds: string[];
      expectedIndependence: number;
      guardianship: string;
    }[];
    
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
  
  // Asset Information
  assetInfo: {
    // Cash Assets
    cashAssets: {
      account: string;
      institution: string;
      balance: number;
      interestRate: number;
      liquidity: 'high' | 'medium' | 'low';
      ownership: 'individual' | 'joint' | 'trust' | 'business';
      beneficiary: string;
    }[];
    
    // Investment Assets
    investmentAssets: {
      account: string;
      institution: string;
      type: string;
      balance: number;
      expectedReturn: number;
      riskLevel: 'low' | 'medium' | 'high';
      liquidity: string;
      taxStatus: 'taxable' | 'tax_deferred' | 'tax_free';
      ownership: string;
      beneficiary: string;
    }[];
    
    // Real Estate Assets
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
      ownership: string;
      beneficiary: string;
      location: string;
      title: string;
    }[];
    
    // Business Assets
    businessAssets: {
      business: string;
      type: string;
      value: number;
      income: number;
      expenses: number;
      growthRate: number;
      liquidity: string;
      ownership: string;
      beneficiary: string;
      businessStructure: string;
      buySellAgreement: boolean;
      keyPersonInsurance: boolean;
    }[];
    
    // Retirement Assets
    retirementAssets: {
      account: string;
      type: string;
      balance: number;
      expectedReturn: number;
      requiredMinimumDistribution: number;
      distributionAge: number;
      ownership: string;
      beneficiary: string;
      taxStatus: string;
    }[];
    
    // Life Insurance
    lifeInsurance: {
      policyName: string;
      insurer: string;
      policyType: string;
      faceAmount: number;
      cashValue: number;
      premium: number;
      ownership: string;
      beneficiary: string;
      irrevocableBeneficiary: boolean;
    }[];
    
    // Personal Property
    personalProperty: {
      item: string;
      type: string;
      value: number;
      description: string;
      ownership: string;
      beneficiary: string;
      specialValue: boolean;
      appraisal: boolean;
    }[];
    
    // Other Assets
    otherAssets: {
      asset: string;
      type: string;
      value: number;
      income: number;
      growthRate: number;
      liquidity: string;
      ownership: string;
      beneficiary: string;
    }[];
    
    // Total Assets
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
  };
  
  // Liability Information
  liabilityInfo: {
    // Mortgage Debt
    mortgageDebt: {
      property: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: 'fixed' | 'adjustable' | 'interest_only';
      coSigner: string;
    }[];
    
    // Consumer Debt
    consumerDebt: {
      type: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      priority: 'high' | 'medium' | 'low';
      coSigner: string;
    }[];
    
    // Business Debt
    businessDebt: {
      business: string;
      type: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      personalGuarantee: boolean;
      coSigner: string;
    }[];
    
    // Other Debt
    otherDebt: {
      type: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      coSigner: string;
    }[];
    
    // Total Debt
    totalDebt: number;
    debtToAssetRatio: number;
  };
  
  // Estate Planning Documents
  estatePlanningDocuments: {
    // Wills
    wills: {
      documentName: string;
      type: 'simple' | 'complex' | 'pour_over' | 'holographic';
      dateCreated: string;
      lastUpdated: string;
      executor: string;
      alternateExecutor: string;
      beneficiaries: {
        name: string;
        relationship: string;
        percentage: number;
        specificBequests: string[];
      }[];
      guardians: {
        minor: string;
        guardian: string;
        alternateGuardian: string;
      }[];
      charitableBequests: {
        organization: string;
        amount: number;
        percentage: number;
      }[];
      conditions: string[];
      valid: boolean;
      probateRequired: boolean;
    }[];
    
    // Trusts
    trusts: {
      trustName: string;
      type: 'revocable' | 'irrevocable' | 'charitable' | 'special_needs' | 'life_insurance' | 'qualified_personal_residence' | 'qualified_domestic';
      dateCreated: string;
      lastUpdated: string;
      grantor: string;
      trustee: string;
      alternateTrustee: string;
      beneficiaries: {
        name: string;
        relationship: string;
        distribution: string;
        conditions: string[];
      }[];
      assets: string[];
      fundingStatus: 'funded' | 'partially_funded' | 'unfunded';
      taxIdentificationNumber: string;
      valid: boolean;
    }[];
    
    // Powers of Attorney
    powersOfAttorney: {
      documentName: string;
      type: 'financial' | 'healthcare' | 'durable' | 'springing' | 'limited';
      dateCreated: string;
      lastUpdated: string;
      principal: string;
      agent: string;
      alternateAgent: string;
      powers: string[];
      limitations: string[];
      effectiveDate: string;
      terminationDate: string;
      valid: boolean;
    }[];
    
    // Healthcare Directives
    healthcareDirectives: {
      documentName: string;
      type: 'living_will' | 'healthcare_proxy' | 'advance_directive' | 'dnr';
      dateCreated: string;
      lastUpdated: string;
      principal: string;
      agent: string;
      alternateAgent: string;
      instructions: string[];
      conditions: string[];
      valid: boolean;
    }[];
    
    // Business Documents
    businessDocuments: {
      documentName: string;
      type: 'buy_sell_agreement' | 'operating_agreement' | 'partnership_agreement' | 'shareholder_agreement';
      dateCreated: string;
      lastUpdated: string;
      business: string;
      parties: string[];
      terms: string[];
      funding: string;
      valid: boolean;
    }[];
    
    // Other Documents
    otherDocuments: {
      documentName: string;
      type: string;
      dateCreated: string;
      lastUpdated: string;
      description: string;
      parties: string[];
      valid: boolean;
    }[];
  };
  
  // Beneficiary Information
  beneficiaryInfo: {
    // Primary Beneficiaries
    primaryBeneficiaries: {
      name: string;
      relationship: string;
      dateOfBirth: string;
      age: number;
      contactInfo: {
        address: string;
        phone: string;
        email: string;
      };
      financialStatus: 'dependent' | 'independent' | 'wealthy';
      specialNeeds: string[];
      guardianship: string;
      percentage: number;
      specificAssets: string[];
      conditions: string[];
    }[];
    
    // Contingent Beneficiaries
    contingentBeneficiaries: {
      name: string;
      relationship: string;
      dateOfBirth: string;
      age: number;
      contactInfo: {
        address: string;
        phone: string;
        email: string;
      };
      financialStatus: string;
      specialNeeds: string[];
      guardianship: string;
      percentage: number;
      specificAssets: string[];
      conditions: string[];
    }[];
    
    // Charitable Beneficiaries
    charitableBeneficiaries: {
      organization: string;
      type: string;
      taxId: string;
      contactInfo: {
        address: string;
        phone: string;
        email: string;
      };
      percentage: number;
      specificAssets: string[];
      purpose: string;
      conditions: string[];
    }[];
  };
  
  // Estate Planning Goals
  estatePlanningGoals: {
    // Distribution Goals
    distributionGoals: {
      goal: string;
      beneficiary: string;
      asset: string;
      amount: number;
      percentage: number;
      timing: 'immediate' | 'deferred' | 'conditional';
      conditions: string[];
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Tax Goals
    taxGoals: {
      goal: string;
      strategy: string;
      expectedSavings: number;
      implementation: string;
      priority: string;
    }[];
    
    // Protection Goals
    protectionGoals: {
      goal: string;
      beneficiary: string;
      protection: string;
      amount: number;
      duration: number;
      priority: string;
    }[];
    
    // Charitable Goals
    charitableGoals: {
      goal: string;
      organization: string;
      amount: number;
      percentage: number;
      timing: string;
      purpose: string;
      priority: string;
    }[];
    
    // Business Succession Goals
    businessSuccessionGoals: {
      goal: string;
      business: string;
      successor: string;
      timing: string;
      method: string;
      funding: string;
      priority: string;
    }[];
  };
  
  // Tax Considerations
  taxConsiderations: {
    // Federal Estate Tax
    federalEstateTax: {
      exemption: number;
      rate: number;
      taxableEstate: number;
      estimatedTax: number;
      portability: boolean;
      portabilityAmount: number;
    };
    
    // State Estate Tax
    stateEstateTax: {
      state: string;
      exemption: number;
      rate: number;
      taxableEstate: number;
      estimatedTax: number;
    };
    
    // Gift Tax
    giftTax: {
      annualExclusion: number;
      lifetimeExemption: number;
      rate: number;
      giftsMade: number;
      remainingExemption: number;
    };
    
    // Generation-Skipping Transfer Tax
    generationSkippingTransferTax: {
      exemption: number;
      rate: number;
      transfers: number;
      estimatedTax: number;
    };
    
    // Income Tax
    incomeTax: {
      basis: 'stepped_up' | 'carryover' | 'other';
      capitalGains: number;
      ordinaryIncome: number;
      estimatedTax: number;
    };
  };
  
  // Estate Planning Strategy
  estatePlanningStrategy: {
    // Asset Protection Strategy
    assetProtectionStrategy: {
      strategy: string;
      description: string;
      assets: string[];
      protection: string;
      cost: number;
      effectiveness: number;
    };
    
    // Tax Minimization Strategy
    taxMinimizationStrategy: {
      strategy: string;
      description: string;
      expectedSavings: number;
      implementation: string;
      cost: number;
      effectiveness: number;
    };
    
    // Probate Avoidance Strategy
    probateAvoidanceStrategy: {
      strategy: string;
      description: string;
      assets: string[];
      method: string;
      cost: number;
      effectiveness: number;
    };
    
    // Business Succession Strategy
    businessSuccessionStrategy: {
      strategy: string;
      description: string;
      business: string;
      successor: string;
      method: string;
      funding: string;
      cost: number;
      effectiveness: number;
    };
    
    // Charitable Giving Strategy
    charitableGivingStrategy: {
      strategy: string;
      description: string;
      organization: string;
      method: string;
      taxBenefits: number;
      cost: number;
      effectiveness: number;
    };
  };
  
  // Market Assumptions
  marketAssumptions: {
    // Asset Growth Assumptions
    assetGrowthAssumptions: {
      assetType: string;
      currentValue: number;
      growthRate: number;
      projectedValue: number;
    }[];
    
    // Economic Assumptions
    economicAssumptions: {
      inflationRate: number;
      realGdpGrowth: number;
      interestRate: number;
      taxRate: number;
      estateTaxExemption: number;
      giftTaxExclusion: number;
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
  includeAssetGrowthRisk: boolean;
  includeTaxRisk: boolean;
  includeLegalRisk: boolean;
  includeMarketRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeLegalConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGoalAnalysis: boolean;
    includeTaxAnalysis: boolean;
    includeAssetProtection: boolean;
    includeProbateAnalysis: boolean;
    includeBusinessSuccession: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    netWorth: number;
    estateTaxLiability: number;
    giftTaxLiability: number;
    assetGrowth: number;
  }[];
  
  // Reporting Preferences
  includeGoalAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeAssetProtection: boolean;
  includeProbateAnalysis: boolean;
  includeBusinessSuccession: boolean;
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

export interface EstatePlanningCalculatorResults {
  // Core Estate Metrics
  estatePlanningScore: number;
  estateTaxLiability: number;
  probateCosts: number;
  assetProtection: number;
  estateEfficiency: number;
  
  // Estate Planning Analysis
  estatePlanningAnalysis: {
    estatePlanningScore: number;
    estateTaxLiability: number;
    probateCosts: number;
    assetProtection: number;
    estateEfficiency: number;
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
      citizenship: string;
      residency: string;
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
      citizenship: string;
      residency: string;
    };
    dependentsInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: string;
      relationship: string;
      occupation: string;
      education: string;
      healthStatus: string;
      specialNeeds: string[];
      expectedIndependence: number;
      guardianship: string;
    }[];
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
  
  // Asset Analysis
  assetAnalysis: {
    cashAssets: {
      account: string;
      institution: string;
      balance: number;
      interestRate: number;
      liquidity: string;
      ownership: string;
      beneficiary: string;
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
      ownership: string;
      beneficiary: string;
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
      ownership: string;
      beneficiary: string;
      location: string;
      title: string;
    }[];
    businessAssets: {
      business: string;
      type: string;
      value: number;
      income: number;
      expenses: number;
      growthRate: number;
      liquidity: string;
      ownership: string;
      beneficiary: string;
      businessStructure: string;
      buySellAgreement: boolean;
      keyPersonInsurance: boolean;
    }[];
    retirementAssets: {
      account: string;
      type: string;
      balance: number;
      expectedReturn: number;
      requiredMinimumDistribution: number;
      distributionAge: number;
      ownership: string;
      beneficiary: string;
      taxStatus: string;
    }[];
    lifeInsurance: {
      policyName: string;
      insurer: string;
      policyType: string;
      faceAmount: number;
      cashValue: number;
      premium: number;
      ownership: string;
      beneficiary: string;
      irrevocableBeneficiary: boolean;
    }[];
    personalProperty: {
      item: string;
      type: string;
      value: number;
      description: string;
      ownership: string;
      beneficiary: string;
      specialValue: boolean;
      appraisal: boolean;
    }[];
    otherAssets: {
      asset: string;
      type: string;
      value: number;
      income: number;
      growthRate: number;
      liquidity: string;
      ownership: string;
      beneficiary: string;
    }[];
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
    assetEfficiency: number;
  };
  
  // Liability Analysis
  liabilityAnalysis: {
    mortgageDebt: {
      property: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: string;
      coSigner: string;
    }[];
    consumerDebt: {
      type: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      priority: string;
      coSigner: string;
    }[];
    businessDebt: {
      business: string;
      type: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      personalGuarantee: boolean;
      coSigner: string;
    }[];
    otherDebt: {
      type: string;
      balance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      coSigner: string;
    }[];
    totalDebt: number;
    debtToAssetRatio: number;
    liabilityEfficiency: number;
  };
  
  // Document Analysis
  documentAnalysis: {
    wills: {
      documentName: string;
      type: string;
      dateCreated: string;
      lastUpdated: string;
      executor: string;
      alternateExecutor: string;
      beneficiaries: {
        name: string;
        relationship: string;
        percentage: number;
        specificBequests: string[];
      }[];
      guardians: {
        minor: string;
        guardian: string;
        alternateGuardian: string;
      }[];
      charitableBequests: {
        organization: string;
        amount: number;
        percentage: number;
      }[];
      conditions: string[];
      valid: boolean;
      probateRequired: boolean;
    }[];
    trusts: {
      trustName: string;
      type: string;
      dateCreated: string;
      lastUpdated: string;
      grantor: string;
      trustee: string;
      alternateTrustee: string;
      beneficiaries: {
        name: string;
        relationship: string;
        distribution: string;
        conditions: string[];
      }[];
      assets: string[];
      fundingStatus: string;
      taxIdentificationNumber: string;
      valid: boolean;
    }[];
    powersOfAttorney: {
      documentName: string;
      type: string;
      dateCreated: string;
      lastUpdated: string;
      principal: string;
      agent: string;
      alternateAgent: string;
      powers: string[];
      limitations: string[];
      effectiveDate: string;
      terminationDate: string;
      valid: boolean;
    }[];
    healthcareDirectives: {
      documentName: string;
      type: string;
      dateCreated: string;
      lastUpdated: string;
      principal: string;
      agent: string;
      alternateAgent: string;
      instructions: string[];
      conditions: string[];
      valid: boolean;
    }[];
    businessDocuments: {
      documentName: string;
      type: string;
      dateCreated: string;
      lastUpdated: string;
      business: string;
      parties: string[];
      terms: string[];
      funding: string;
      valid: boolean;
    }[];
    otherDocuments: {
      documentName: string;
      type: string;
      dateCreated: string;
      lastUpdated: string;
      description: string;
      parties: string[];
      valid: boolean;
    }[];
    documentEfficiency: number;
  };
  
  // Beneficiary Analysis
  beneficiaryAnalysis: {
    primaryBeneficiaries: {
      name: string;
      relationship: string;
      dateOfBirth: string;
      age: number;
      contactInfo: {
        address: string;
        phone: string;
        email: string;
      };
      financialStatus: string;
      specialNeeds: string[];
      guardianship: string;
      percentage: number;
      specificAssets: string[];
      conditions: string[];
    }[];
    contingentBeneficiaries: {
      name: string;
      relationship: string;
      dateOfBirth: string;
      age: number;
      contactInfo: {
        address: string;
        phone: string;
        email: string;
      };
      financialStatus: string;
      specialNeeds: string[];
      guardianship: string;
      percentage: number;
      specificAssets: string[];
      conditions: string[];
    }[];
    charitableBeneficiaries: {
      organization: string;
      type: string;
      taxId: string;
      contactInfo: {
        address: string;
        phone: string;
        email: string;
      };
      percentage: number;
      specificAssets: string[];
      purpose: string;
      conditions: string[];
    }[];
    beneficiaryEfficiency: number;
  };
  
  // Goal Analysis
  goalAnalysis: {
    distributionGoals: {
      goal: string;
      beneficiary: string;
      asset: string;
      amount: number;
      percentage: number;
      timing: string;
      conditions: string[];
      priority: string;
      goalGap: number;
      requiredActions: string[];
    }[];
    taxGoals: {
      goal: string;
      strategy: string;
      expectedSavings: number;
      implementation: string;
      priority: string;
      goalGap: number;
      requiredActions: string[];
    }[];
    protectionGoals: {
      goal: string;
      beneficiary: string;
      protection: string;
      amount: number;
      duration: number;
      priority: string;
      goalGap: number;
      requiredActions: string[];
    }[];
    charitableGoals: {
      goal: string;
      organization: string;
      amount: number;
      percentage: number;
      timing: string;
      purpose: string;
      priority: string;
      goalGap: number;
      requiredActions: string[];
    }[];
    businessSuccessionGoals: {
      goal: string;
      business: string;
      successor: string;
      timing: string;
      method: string;
      funding: string;
      priority: string;
      goalGap: number;
      requiredActions: string[];
    }[];
    goalEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    federalEstateTax: {
      exemption: number;
      rate: number;
      taxableEstate: number;
      estimatedTax: number;
      portability: boolean;
      portabilityAmount: number;
    };
    stateEstateTax: {
      state: string;
      exemption: number;
      rate: number;
      taxableEstate: number;
      estimatedTax: number;
    };
    giftTax: {
      annualExclusion: number;
      lifetimeExemption: number;
      rate: number;
      giftsMade: number;
      remainingExemption: number;
    };
    generationSkippingTransferTax: {
      exemption: number;
      rate: number;
      transfers: number;
      estimatedTax: number;
    };
    incomeTax: {
      basis: string;
      capitalGains: number;
      ordinaryIncome: number;
      estimatedTax: number;
    };
    totalTaxLiability: number;
    taxEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    assetProtectionStrategy: {
      strategy: string;
      description: string;
      assets: string[];
      protection: string;
      cost: number;
      effectiveness: number;
    };
    taxMinimizationStrategy: {
      strategy: string;
      description: string;
      expectedSavings: number;
      implementation: string;
      cost: number;
      effectiveness: number;
    };
    probateAvoidanceStrategy: {
      strategy: string;
      description: string;
      assets: string[];
      method: string;
      cost: number;
      effectiveness: number;
    };
    businessSuccessionStrategy: {
      strategy: string;
      description: string;
      business: string;
      successor: string;
      method: string;
      funding: string;
      cost: number;
      effectiveness: number;
    };
    charitableGivingStrategy: {
      strategy: string;
      description: string;
      organization: string;
      method: string;
      taxBenefits: number;
      cost: number;
      effectiveness: number;
    };
    strategyEfficiency: number;
  };
  
  // Probate Analysis
  probateAnalysis: {
    probateAssets: {
      asset: string;
      value: number;
      probateRequired: boolean;
      estimatedCost: number;
    }[];
    probateCosts: {
      courtFees: number;
      attorneyFees: number;
      executorFees: number;
      appraisalFees: number;
      otherFees: number;
      totalCosts: number;
    };
    probateTime: {
      estimatedDuration: number;
      factors: string[];
      delays: string[];
    };
    probateAvoidance: {
      strategy: string;
      assets: string[];
      method: string;
      cost: number;
      savings: number;
    };
    probateEfficiency: number;
  };
  
  // Asset Protection Analysis
  assetProtectionAnalysis: {
    protectedAssets: {
      asset: string;
      protection: string;
      method: string;
      effectiveness: number;
    }[];
    unprotectedAssets: {
      asset: string;
      risk: string;
      exposure: number;
      recommendation: string;
    }[];
    protectionStrategies: {
      strategy: string;
      description: string;
      assets: string[];
      cost: number;
      effectiveness: number;
      recommendation: string;
    }[];
    assetProtectionEfficiency: number;
  };
  
  // Business Succession Analysis
  businessSuccessionAnalysis: {
    businessValue: {
      business: string;
      currentValue: number;
      projectedValue: number;
      valuationMethod: string;
    };
    successionPlan: {
      business: string;
      successor: string;
      method: string;
      funding: string;
      timeline: string;
      cost: number;
    };
    fundingOptions: {
      option: string;
      amount: number;
      cost: number;
      feasibility: number;
      recommendation: string;
    }[];
    businessSuccessionEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowEstatePlanning: number;
    highEstatePlanning: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanEstatePlanning: number;
    medianEstatePlanning: number;
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
  
  // Estate Planning Planning Analysis
  estatePlanningPlanningAnalysis: {
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
      benchmarkScore: number;
      planScore: number;
      outperformance: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Estate Planning Score
  estatePlanningScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      assets: number;
      documents: number;
      beneficiaries: number;
      goals: number;
      strategy: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      netWorth: number;
      estateTaxLiability: number;
      estatePlanningScore: number;
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    taxSavings: number;
    probateSavings: number;
    assetProtection: number;
    efficiencyGain: number;
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
    estatePlanningScore: number;
    estateTaxLiability: number;
    probateCosts: number;
    assetProtection: number;
    estateEfficiency: number;
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
