export interface InsurancePlanningCalculatorInputs {
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
      height: number;
      weight: number;
      bmi: number;
      smoker: boolean;
      smokerType: 'never' | 'former' | 'current';
      yearsSmoking: number;
      familyHistory: string[];
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
      height: number;
      weight: number;
      bmi: number;
      smoker: boolean;
      smokerType: string;
      yearsSmoking: number;
      familyHistory: string[];
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
  
  // Current Insurance Coverage
  currentInsuranceCoverage: {
    // Life Insurance
    lifeInsurance: {
      policyName: string;
      insurer: string;
      policyType: 'term' | 'whole' | 'universal' | 'variable' | 'group' | 'accidental';
      faceAmount: number;
      currentValue: number;
      premium: number;
      frequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      term: number;
      startDate: string;
      endDate: string;
      beneficiaries: {
        name: string;
        relationship: string;
        percentage: number;
      }[];
      riders: {
        rider: string;
        coverage: number;
        premium: number;
      }[];
      cashValue: number;
      surrenderValue: number;
      loanValue: number;
      dividend: number;
      guaranteed: boolean;
      convertible: boolean;
      renewable: boolean;
    }[];
    
    // Health Insurance
    healthInsurance: {
      policyName: string;
      insurer: string;
      policyType: 'individual' | 'family' | 'group' | 'medicare' | 'medicaid' | 'tricare';
      coverageType: 'ppo' | 'hmo' | 'epo' | 'pos' | 'hdhp' | 'catastrophic';
      deductible: number;
      outOfPocketMaximum: number;
      copay: {
        primaryCare: number;
        specialist: number;
        urgentCare: number;
        emergencyRoom: number;
        prescription: number;
      };
      coinsurance: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      network: string;
      prescriptionCoverage: boolean;
      dentalCoverage: boolean;
      visionCoverage: boolean;
      mentalHealthCoverage: boolean;
      maternityCoverage: boolean;
      preExistingConditions: boolean;
    }[];
    
    // Disability Insurance
    disabilityInsurance: {
      policyName: string;
      insurer: string;
      policyType: 'short_term' | 'long_term' | 'own_occupation' | 'any_occupation' | 'group';
      monthlyBenefit: number;
      benefitPeriod: number;
      eliminationPeriod: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      definitionOfDisability: string;
      partialDisability: boolean;
      residualDisability: boolean;
      costOfLivingAdjustment: boolean;
      futureIncreaseOption: boolean;
      nonCancelable: boolean;
      guaranteedRenewable: boolean;
    }[];
    
    // Long-Term Care Insurance
    longTermCareInsurance: {
      policyName: string;
      insurer: string;
      policyType: 'traditional' | 'hybrid' | 'partnership' | 'group';
      dailyBenefit: number;
      benefitPeriod: number;
      eliminationPeriod: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      inflationProtection: boolean;
      inflationRate: number;
      sharedCare: boolean;
      returnOfPremium: boolean;
      nonCancelable: boolean;
      guaranteedRenewable: boolean;
      preExistingConditions: boolean;
    }[];
    
    // Auto Insurance
    autoInsurance: {
      policyName: string;
      insurer: string;
      vehicle: string;
      liabilityLimits: {
        bodilyInjury: number;
        propertyDamage: number;
        uninsuredMotorist: number;
        underinsuredMotorist: number;
      };
      comprehensive: boolean;
      comprehensiveDeductible: number;
      collision: boolean;
      collisionDeductible: number;
      medicalPayments: number;
      personalInjuryProtection: number;
      rentalReimbursement: boolean;
      roadsideAssistance: boolean;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      drivers: string[];
      usage: string;
      annualMileage: number;
    }[];
    
    // Homeowners Insurance
    homeownersInsurance: {
      policyName: string;
      insurer: string;
      property: string;
      dwellingCoverage: number;
      personalPropertyCoverage: number;
      liabilityCoverage: number;
      medicalPayments: number;
      additionalCoverages: {
        coverage: string;
        amount: number;
      }[];
      deductible: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      replacementCost: boolean;
      guaranteedReplacementCost: boolean;
      ordinanceOrLaw: boolean;
      waterBackup: boolean;
      identityTheft: boolean;
      jewelry: boolean;
      electronics: boolean;
      collectibles: boolean;
    }[];
    
    // Umbrella Insurance
    umbrellaInsurance: {
      policyName: string;
      insurer: string;
      coverageAmount: number;
      underlyingLimits: {
        auto: number;
        homeowners: number;
        other: number;
      };
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      coveredPerils: string[];
      excludedPerils: string[];
      worldwideCoverage: boolean;
      defenseCosts: boolean;
    }[];
    
    // Business Insurance
    businessInsurance: {
      policyName: string;
      insurer: string;
      business: string;
      policyType: 'general_liability' | 'professional_liability' | 'property' | 'workers_comp' | 'cyber' | 'directors_officers' | 'business_interruption';
      coverageAmount: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      deductible: number;
      coveredPerils: string[];
      excludedPerils: string[];
      additionalInsureds: string[];
    }[];
    
    // Other Insurance
    otherInsurance: {
      policyName: string;
      insurer: string;
      type: string;
      coverageAmount: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      description: string;
    }[];
  };
  
  // Insurance Needs Analysis
  insuranceNeedsAnalysis: {
    // Life Insurance Needs
    lifeInsuranceNeeds: {
      immediateExpenses: {
        funeralCosts: number;
        medicalExpenses: number;
        finalExpenses: number;
        totalImmediateExpenses: number;
      };
      debtObligations: {
        mortgage: number;
        consumerDebt: number;
        studentLoans: number;
        businessDebt: number;
        otherDebt: number;
        totalDebtObligations: number;
      };
      incomeReplacement: {
        annualIncome: number;
        yearsOfSupport: number;
        inflationRate: number;
        totalIncomeReplacement: number;
      };
      educationFunding: {
        dependents: {
          name: string;
          currentAge: number;
          yearsToCollege: number;
          estimatedCost: number;
          inflationRate: number;
          totalCost: number;
        }[];
        totalEducationFunding: number;
      };
      emergencyFund: {
        monthsOfExpenses: number;
        monthlyExpenses: number;
        totalEmergencyFund: number;
      };
      totalLifeInsuranceNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
    };
    
    // Disability Insurance Needs
    disabilityInsuranceNeeds: {
      monthlyExpenses: number;
      yearsOfSupport: number;
      inflationRate: number;
      totalDisabilityNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      eliminationPeriod: number;
      benefitPeriod: number;
    };
    
    // Long-Term Care Needs
    longTermCareNeeds: {
      dailyCost: {
        homeCare: number;
        assistedLiving: number;
        nursingHome: number;
        averageDailyCost: number;
      };
      yearsOfCare: number;
      inflationRate: number;
      totalLongTermCareNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      eliminationPeriod: number;
      benefitPeriod: number;
    };
    
    // Health Insurance Needs
    healthInsuranceNeeds: {
      annualMedicalExpenses: number;
      prescriptionCosts: number;
      dentalCosts: number;
      visionCosts: number;
      mentalHealthCosts: number;
      totalHealthNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      preferredProviders: string[];
      prescriptionDrugs: string[];
    };
    
    // Property Insurance Needs
    propertyInsuranceNeeds: {
      dwellingReplacementCost: number;
      personalPropertyValue: number;
      liabilityExposure: number;
      totalPropertyNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      specialItems: {
        item: string;
        value: number;
        coverage: number;
      }[];
    };
  };
  
  // Risk Profile
  riskProfile: {
    // Risk Tolerance
    riskTolerance: {
      insuranceRiskTolerance: 'low' | 'medium' | 'high';
      deductiblePreference: 'low' | 'medium' | 'high';
      coveragePreference: 'minimal' | 'adequate' | 'comprehensive';
      premiumSensitivity: 'low' | 'medium' | 'high';
    };
    
    // Risk Factors
    riskFactors: {
      healthRisks: {
        factor: string;
        severity: 'low' | 'medium' | 'high';
        impact: string;
      }[];
      lifestyleRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
      occupationalRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
      financialRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
      propertyRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
    };
    
    // Insurance Preferences
    insurancePreferences: {
      preferredInsurers: string[];
      excludedInsurers: string[];
      preferredPolicyTypes: string[];
      excludedPolicyTypes: string[];
      preferredFeatures: string[];
      excludedFeatures: string[];
      premiumBudget: number;
      deductibleBudget: number;
    };
  };
  
  // Market Assumptions
  marketAssumptions: {
    // Insurance Rate Assumptions
    insuranceRateAssumptions: {
      insuranceType: string;
      currentRate: number;
      projectedRate: number;
      rateChangeProbability: number;
      rateChangeDirection: 'increase' | 'decrease' | 'stable';
    }[];
    
    // Economic Assumptions
    economicAssumptions: {
      inflationRate: number;
      realGdpGrowth: number;
      interestRate: number;
      taxRate: number;
      healthcareInflation: number;
      propertyInflation: number;
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
  includeInsuranceRateRisk: boolean;
  includeHealthRisk: boolean;
  includeLiabilityRisk: boolean;
  includePropertyRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeHealthConsiderations: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeNeedsAnalysis: boolean;
    includeCoverageAnalysis: boolean;
    includeCostAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    insurancePremiums: number;
    claims: number;
    coverage: number;
    healthStatus: string;
  }[];
  
  // Reporting Preferences
  includeNeedsAnalysis: boolean;
  includeCoverageAnalysis: boolean;
  includeCostAnalysis: boolean;
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

export interface InsurancePlanningCalculatorResults {
  // Core Insurance Metrics
  insuranceReadinessScore: number;
  coverageGap: number;
  premiumEfficiency: number;
  riskProtection: number;
  insuranceOptimization: number;
  
  // Insurance Planning Analysis
  insurancePlanningAnalysis: {
    insuranceReadinessScore: number;
    coverageGap: number;
    premiumEfficiency: number;
    riskProtection: number;
    insuranceOptimization: number;
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
      height: number;
      weight: number;
      bmi: number;
      smoker: boolean;
      smokerType: string;
      yearsSmoking: number;
      familyHistory: string[];
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
      height: number;
      weight: number;
      bmi: number;
      smoker: boolean;
      smokerType: string;
      yearsSmoking: number;
      familyHistory: string[];
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
  
  // Current Coverage Analysis
  currentCoverageAnalysis: {
    lifeInsurance: {
      policyName: string;
      insurer: string;
      policyType: string;
      faceAmount: number;
      currentValue: number;
      premium: number;
      frequency: string;
      term: number;
      startDate: string;
      endDate: string;
      beneficiaries: {
        name: string;
        relationship: string;
        percentage: number;
      }[];
      riders: {
        rider: string;
        coverage: number;
        premium: number;
      }[];
      cashValue: number;
      surrenderValue: number;
      loanValue: number;
      dividend: number;
      guaranteed: boolean;
      convertible: boolean;
      renewable: boolean;
    }[];
    healthInsurance: {
      policyName: string;
      insurer: string;
      policyType: string;
      coverageType: string;
      deductible: number;
      outOfPocketMaximum: number;
      copay: {
        primaryCare: number;
        specialist: number;
        urgentCare: number;
        emergencyRoom: number;
        prescription: number;
      };
      coinsurance: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      network: string;
      prescriptionCoverage: boolean;
      dentalCoverage: boolean;
      visionCoverage: boolean;
      mentalHealthCoverage: boolean;
      maternityCoverage: boolean;
      preExistingConditions: boolean;
    }[];
    disabilityInsurance: {
      policyName: string;
      insurer: string;
      policyType: string;
      monthlyBenefit: number;
      benefitPeriod: number;
      eliminationPeriod: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      definitionOfDisability: string;
      partialDisability: boolean;
      residualDisability: boolean;
      costOfLivingAdjustment: boolean;
      futureIncreaseOption: boolean;
      nonCancelable: boolean;
      guaranteedRenewable: boolean;
    }[];
    longTermCareInsurance: {
      policyName: string;
      insurer: string;
      policyType: string;
      dailyBenefit: number;
      benefitPeriod: number;
      eliminationPeriod: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      inflationProtection: boolean;
      inflationRate: number;
      sharedCare: boolean;
      returnOfPremium: boolean;
      nonCancelable: boolean;
      guaranteedRenewable: boolean;
      preExistingConditions: boolean;
    }[];
    autoInsurance: {
      policyName: string;
      insurer: string;
      vehicle: string;
      liabilityLimits: {
        bodilyInjury: number;
        propertyDamage: number;
        uninsuredMotorist: number;
        underinsuredMotorist: number;
      };
      comprehensive: boolean;
      comprehensiveDeductible: number;
      collision: boolean;
      collisionDeductible: number;
      medicalPayments: number;
      personalInjuryProtection: number;
      rentalReimbursement: boolean;
      roadsideAssistance: boolean;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      drivers: string[];
      usage: string;
      annualMileage: number;
    }[];
    homeownersInsurance: {
      policyName: string;
      insurer: string;
      property: string;
      dwellingCoverage: number;
      personalPropertyCoverage: number;
      liabilityCoverage: number;
      medicalPayments: number;
      additionalCoverages: {
        coverage: string;
        amount: number;
      }[];
      deductible: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      replacementCost: boolean;
      guaranteedReplacementCost: boolean;
      ordinanceOrLaw: boolean;
      waterBackup: boolean;
      identityTheft: boolean;
      jewelry: boolean;
      electronics: boolean;
      collectibles: boolean;
    }[];
    umbrellaInsurance: {
      policyName: string;
      insurer: string;
      coverageAmount: number;
      underlyingLimits: {
        auto: number;
        homeowners: number;
        other: number;
      };
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      coveredPerils: string[];
      excludedPerils: string[];
      worldwideCoverage: boolean;
      defenseCosts: boolean;
    }[];
    businessInsurance: {
      policyName: string;
      insurer: string;
      business: string;
      policyType: string;
      coverageAmount: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      deductible: number;
      coveredPerils: string[];
      excludedPerils: string[];
      additionalInsureds: string[];
    }[];
    otherInsurance: {
      policyName: string;
      insurer: string;
      type: string;
      coverageAmount: number;
      premium: number;
      frequency: string;
      startDate: string;
      endDate: string;
      description: string;
    }[];
    totalPremiums: number;
    totalCoverage: number;
    coverageEfficiency: number;
  };
  
  // Needs Analysis
  needsAnalysis: {
    lifeInsuranceNeeds: {
      immediateExpenses: {
        funeralCosts: number;
        medicalExpenses: number;
        finalExpenses: number;
        totalImmediateExpenses: number;
      };
      debtObligations: {
        mortgage: number;
        consumerDebt: number;
        studentLoans: number;
        businessDebt: number;
        otherDebt: number;
        totalDebtObligations: number;
      };
      incomeReplacement: {
        annualIncome: number;
        yearsOfSupport: number;
        inflationRate: number;
        totalIncomeReplacement: number;
      };
      educationFunding: {
        dependents: {
          name: string;
          currentAge: number;
          yearsToCollege: number;
          estimatedCost: number;
          inflationRate: number;
          totalCost: number;
        }[];
        totalEducationFunding: number;
      };
      emergencyFund: {
        monthsOfExpenses: number;
        monthlyExpenses: number;
        totalEmergencyFund: number;
      };
      totalLifeInsuranceNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
    };
    disabilityInsuranceNeeds: {
      monthlyExpenses: number;
      yearsOfSupport: number;
      inflationRate: number;
      totalDisabilityNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      eliminationPeriod: number;
      benefitPeriod: number;
    };
    longTermCareNeeds: {
      dailyCost: {
        homeCare: number;
        assistedLiving: number;
        nursingHome: number;
        averageDailyCost: number;
      };
      yearsOfCare: number;
      inflationRate: number;
      totalLongTermCareNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      eliminationPeriod: number;
      benefitPeriod: number;
    };
    healthInsuranceNeeds: {
      annualMedicalExpenses: number;
      prescriptionCosts: number;
      dentalCosts: number;
      visionCosts: number;
      mentalHealthCosts: number;
      totalHealthNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      preferredProviders: string[];
      prescriptionDrugs: string[];
    };
    propertyInsuranceNeeds: {
      dwellingReplacementCost: number;
      personalPropertyValue: number;
      liabilityExposure: number;
      totalPropertyNeeds: number;
      existingCoverage: number;
      additionalNeeds: number;
      specialItems: {
        item: string;
        value: number;
        coverage: number;
      }[];
    };
    needsEfficiency: number;
  };
  
  // Risk Profile Analysis
  riskProfileAnalysis: {
    riskTolerance: {
      insuranceRiskTolerance: string;
      deductiblePreference: string;
      coveragePreference: string;
      premiumSensitivity: string;
    };
    riskFactors: {
      healthRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
      lifestyleRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
      occupationalRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
      financialRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
      propertyRisks: {
        factor: string;
        severity: string;
        impact: string;
      }[];
    };
    insurancePreferences: {
      preferredInsurers: string[];
      excludedInsurers: string[];
      preferredPolicyTypes: string[];
      excludedPolicyTypes: string[];
      preferredFeatures: string[];
      excludedFeatures: string[];
      premiumBudget: number;
      deductibleBudget: number;
    };
    riskProfileEfficiency: number;
  };
  
  // Coverage Gap Analysis
  coverageGapAnalysis: {
    lifeInsuranceGap: {
      needed: number;
      current: number;
      gap: number;
      recommendation: string;
    };
    disabilityInsuranceGap: {
      needed: number;
      current: number;
      gap: number;
      recommendation: string;
    };
    longTermCareGap: {
      needed: number;
      current: number;
      gap: number;
      recommendation: string;
    };
    healthInsuranceGap: {
      needed: number;
      current: number;
      gap: number;
      recommendation: string;
    };
    propertyInsuranceGap: {
      needed: number;
      current: number;
      gap: number;
      recommendation: string;
    };
    liabilityInsuranceGap: {
      needed: number;
      current: number;
      gap: number;
      recommendation: string;
    };
    totalCoverageGap: number;
    gapEfficiency: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    currentPremiums: {
      insuranceType: string;
      premium: number;
      frequency: string;
      annualCost: number;
    }[];
    projectedPremiums: {
      year: number;
      insuranceType: string;
      premium: number;
      annualCost: number;
    }[];
    premiumEfficiency: {
      insuranceType: string;
      coveragePerDollar: number;
      efficiency: number;
    }[];
    costSavings: {
      opportunity: string;
      currentCost: number;
      proposedCost: number;
      savings: number;
      implementation: string;
    }[];
    costEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    uninsuredRisks: {
      risk: string;
      probability: number;
      impact: number;
      exposure: number;
      recommendation: string;
    }[];
    underinsuredRisks: {
      risk: string;
      currentCoverage: number;
      neededCoverage: number;
      gap: number;
      recommendation: string;
    }[];
    riskMitigation: {
      risk: string;
      strategy: string;
      cost: number;
      effectiveness: number;
      recommendation: string;
    }[];
    riskEfficiency: number;
  };
  
  // Insurance Optimization Analysis
  insuranceOptimizationAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialSavings: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    policyRecommendations: {
      insuranceType: string;
      currentPolicy: string;
      recommendedPolicy: string;
      benefits: string[];
      costs: number;
      savings: number;
      recommendation: string;
    }[];
    coverageRecommendations: {
      insuranceType: string;
      currentCoverage: number;
      recommendedCoverage: number;
      rationale: string;
      cost: number;
      benefit: number;
    }[];
    optimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowInsuranceReadiness: number;
    highInsuranceReadiness: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanInsuranceReadiness: number;
    medianInsuranceReadiness: number;
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
  
  // Insurance Planning Planning Analysis
  insurancePlanningPlanningAnalysis: {
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
  
  // Insurance Planning Score
  insurancePlanningScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      financial: number;
      coverage: number;
      needs: number;
      risk: number;
      optimization: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      insurancePremiums: number;
      coverage: number;
      insuranceReadiness: number;
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    riskProtection: number;
    costSavings: number;
    coverageImprovement: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    insuranceAssessment: string;
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
    insuranceReadinessScore: number;
    coverageGap: number;
    premiumEfficiency: number;
    riskProtection: number;
    insuranceOptimization: number;
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
