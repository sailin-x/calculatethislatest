export interface InsuranceCalculatorInputs {
  // Personal Information
  personalInfo: {
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      gender: 'male' | 'female' | 'other';
      maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'separated';
      occupation: string;
      annualIncome: number;
      smokingStatus: 'non_smoker' | 'smoker' | 'former_smoker';
      height: number;
      weight: number;
      bmi: number;
    };
    healthInfo: {
      healthStatus: 'excellent' | 'very_good' | 'good' | 'fair' | 'poor';
      medicalConditions: {
        condition: string;
        diagnosisDate: string;
        severity: 'mild' | 'moderate' | 'severe';
        treatment: string;
        controlled: boolean;
      }[];
      medications: {
        medication: string;
        dosage: string;
        frequency: string;
        startDate: string;
      }[];
      familyHistory: {
        condition: string;
        relationship: string;
        ageAtDiagnosis: number;
      }[];
    };
    contactInfo: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      phoneNumber: string;
      emailAddress: string;
      emergencyContact: {
        name: string;
        relationship: string;
        phoneNumber: string;
      };
    };
  };
  
  // Insurance Information
  insuranceInfo: {
    lifeInsurance: {
      policyType: 'term' | 'whole' | 'universal' | 'variable' | 'final_expense' | 'other';
      coverageAmount: number;
      policyTerm: number;
      premiumAmount: number;
      premiumFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
      riders: {
        rider: string;
        coverage: number;
        cost: number;
        description: string;
      }[];
      beneficiary: {
        name: string;
        relationship: string;
        percentage: number;
      }[];
      policyStartDate: string;
      policyEndDate: string;
      cashValue: number;
      surrenderValue: number;
      loanBalance: number;
    };
    healthInsurance: {
      policyType: 'individual' | 'family' | 'group' | 'medicare' | 'medicaid' | 'other';
      coverageType: 'hmo' | 'ppo' | 'epo' | 'pos' | 'hdhp' | 'other';
      deductible: number;
      outOfPocketMaximum: number;
      copay: {
        service: string;
        amount: number;
      }[];
      coinsurance: number;
      premiumAmount: number;
      premiumFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
      network: string;
      prescriptionCoverage: boolean;
      dentalCoverage: boolean;
      visionCoverage: boolean;
      mentalHealthCoverage: boolean;
      policyStartDate: string;
      policyEndDate: string;
    };
    autoInsurance: {
      policyType: 'liability' | 'collision' | 'comprehensive' | 'full_coverage' | 'other';
      coverageLimits: {
        bodilyInjury: number;
        propertyDamage: number;
        uninsuredMotorist: number;
        underinsuredMotorist: number;
        personalInjuryProtection: number;
        medicalPayments: number;
      };
      deductible: number;
      premiumAmount: number;
      premiumFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
      vehicleInfo: {
        make: string;
        model: string;
        year: number;
        vin: string;
        value: number;
        safetyFeatures: string[];
      }[];
      drivers: {
        name: string;
        age: number;
        licenseNumber: string;
        drivingRecord: {
          violation: string;
          date: string;
          points: number;
        }[];
      }[];
      policyStartDate: string;
      policyEndDate: string;
    };
    homeInsurance: {
      policyType: 'ho1' | 'ho2' | 'ho3' | 'ho4' | 'ho5' | 'ho6' | 'ho8' | 'other';
      coverageLimits: {
        dwelling: number;
        personalProperty: number;
        liability: number;
        medicalPayments: number;
        additionalLivingExpenses: number;
        otherStructures: number;
      };
      deductible: number;
      premiumAmount: number;
      premiumFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
      propertyInfo: {
        address: string;
        constructionType: string;
        yearBuilt: number;
        squareFootage: number;
        replacementCost: number;
        securityFeatures: string[];
      };
      policyStartDate: string;
      policyEndDate: string;
    };
    disabilityInsurance: {
      policyType: 'short_term' | 'long_term' | 'own_occupation' | 'any_occupation' | 'other';
      coverageAmount: number;
      benefitPeriod: number;
      eliminationPeriod: number;
      premiumAmount: number;
      premiumFrequency: 'monthly' | 'quarterly' | 'semi_annual' | 'annual';
      riders: {
        rider: string;
        coverage: number;
        cost: number;
        description: string;
      }[];
      policyStartDate: string;
      policyEndDate: string;
    };
    otherInsurance: {
      umbrellaInsurance: {
        coverageAmount: number;
        premiumAmount: number;
        underlyingPolicies: string[];
      };
      petInsurance: {
        petType: string;
        petAge: number;
        coverageAmount: number;
        premiumAmount: number;
        deductible: number;
      };
      travelInsurance: {
        tripCost: number;
        coverageAmount: number;
        premiumAmount: number;
        tripDuration: number;
        destinations: string[];
      };
    };
  };
  
  // Risk Assessment
  riskAssessment: {
    lifeRiskFactors: {
      age: number;
      gender: string;
      healthStatus: string;
      smokingStatus: string;
      bmi: number;
      familyHistory: string[];
      occupation: string;
      hobbies: string[];
      travelFrequency: number;
      riskScore: number;
    };
    healthRiskFactors: {
      age: number;
      gender: string;
      bmi: number;
      medicalConditions: string[];
      familyHistory: string[];
      lifestyleFactors: string[];
      occupation: string;
      geographicLocation: string;
      riskScore: number;
    };
    autoRiskFactors: {
      age: number;
      gender: string;
      drivingExperience: number;
      drivingRecord: string[];
      vehicleType: string;
      annualMileage: number;
      location: string;
      usage: string;
      riskScore: number;
    };
    homeRiskFactors: {
      location: string;
      constructionType: string;
      age: number;
      securityFeatures: string[];
      proximityToFireStation: number;
      crimeRate: number;
      naturalDisasterRisk: string[];
      maintenanceHistory: string[];
      riskScore: number;
    };
    disabilityRiskFactors: {
      age: number;
      gender: string;
      occupation: string;
      healthStatus: string;
      medicalConditions: string[];
      lifestyleFactors: string[];
      workEnvironment: string;
      riskScore: number;
    };
  };
  
  // Coverage Analysis
  coverageAnalysis: {
    coverageGaps: {
      gap: string;
      description: string;
      riskLevel: 'low' | 'medium' | 'high' | 'critical';
      recommendedCoverage: number;
      estimatedCost: number;
      priority: 'low' | 'medium' | 'high';
    }[];
    overlappingCoverage: {
      coverage: string;
      policies: string[];
      overlapAmount: number;
      efficiency: number;
      recommendation: string;
    }[];
    coverageAdequacy: {
      category: string;
      currentCoverage: number;
      recommendedCoverage: number;
      adequacy: number;
      gap: number;
      recommendation: string;
    }[];
  };
  
  // Cost Analysis
  costAnalysis: {
    premiumAnalysis: {
      policy: string;
      premiumAmount: number;
      premiumFrequency: string;
      annualPremium: number;
      premiumBreakdown: {
        component: string;
        amount: number;
        percentage: number;
      }[];
      premiumTrend: number;
      premiumEfficiency: number;
    }[];
    costComparison: {
      policy: string;
      provider: string;
      premium: number;
      coverage: number;
      costPerThousand: number;
      valueScore: number;
      recommendation: string;
    }[];
    deductibleAnalysis: {
      policy: string;
      currentDeductible: number;
      alternativeDeductibles: {
        deductible: number;
        premiumSavings: number;
        breakevenPoint: number;
        recommendation: string;
      }[];
    }[];
    totalCostOfOwnership: {
      policy: string;
      annualPremium: number;
      expectedClaims: number;
      outOfPocketCosts: number;
      totalCost: number;
      costEfficiency: number;
    }[];
  };
  
  // Claims Analysis
  claimsAnalysis: {
    claimsHistory: {
      policy: string;
      claims: {
        date: string;
        type: string;
        amount: number;
        status: string;
        description: string;
      }[];
      totalClaims: number;
      averageClaim: number;
      claimsFrequency: number;
    }[];
    claimsProjections: {
      policy: string;
      projectedClaims: number;
      confidenceInterval: {
        low: number;
        high: number;
      };
      riskFactors: string[];
      mitigationStrategies: string[];
    }[];
    claimsEfficiency: {
      policy: string;
      claimsRatio: number;
      lossRatio: number;
      expenseRatio: number;
      combinedRatio: number;
      efficiency: number;
    }[];
  };
  
  // Provider Analysis
  providerAnalysis: {
    providerInfo: {
      provider: string;
      rating: number;
      financialStrength: string;
      customerSatisfaction: number;
      claimsSettlement: number;
      networkSize: number;
      serviceQuality: number;
    }[];
    providerComparison: {
      provider: string;
      premium: number;
      coverage: number;
      rating: number;
      customerSatisfaction: number;
      claimsSettlement: number;
      overallScore: number;
      recommendation: string;
    }[];
    marketAnalysis: {
      marketShare: {
        provider: string;
        share: number;
        growth: number;
      }[];
      marketTrends: {
        trend: string;
        impact: 'positive' | 'negative' | 'neutral';
        probability: number;
      }[];
      competitivePosition: {
        provider: string;
        position: string;
        strengths: string[];
        weaknesses: string[];
      }[];
    };
  };
  
  // Policy Optimization
  policyOptimization: {
    coverageOptimization: {
      category: string;
      currentCoverage: number;
      optimalCoverage: number;
      costBenefit: number;
      recommendation: string;
      implementation: string[];
    }[];
    premiumOptimization: {
      policy: string;
      currentPremium: number;
      optimizedPremium: number;
      savings: number;
      changes: string[];
      implementation: string[];
    }[];
    deductibleOptimization: {
      policy: string;
      currentDeductible: number;
      optimalDeductible: number;
      premiumSavings: number;
      riskIncrease: number;
      recommendation: string;
    }[];
    bundleOptimization: {
      currentPolicies: string[];
      recommendedBundle: string[];
      savings: number;
      additionalCoverage: string[];
      recommendation: string;
    }[];
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    lifeScenarios: {
      scenario: string;
      probability: number;
      impact: number;
      coverageNeeded: number;
      currentCoverage: number;
      gap: number;
      recommendation: string;
    }[];
    healthScenarios: {
      scenario: string;
      probability: number;
      medicalCosts: number;
      currentCoverage: number;
      outOfPocket: number;
      recommendation: string;
    }[];
    autoScenarios: {
      scenario: string;
      probability: number;
      damageCosts: number;
      liabilityCosts: number;
      currentCoverage: number;
      gap: number;
      recommendation: string;
    }[];
    homeScenarios: {
      scenario: string;
      probability: number;
      damageCosts: number;
      currentCoverage: number;
      gap: number;
      recommendation: string;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includePremiumVolatility: boolean;
  includeClaimsVolatility: boolean;
  includeMarketVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  riskHorizon: number;
  includeInflation: boolean;
  includeTaxBenefits: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeRiskAssessment: boolean;
    includeCoverageAnalysis: boolean;
    includeCostAnalysis: boolean;
    includeClaimsAnalysis: boolean;
    includeProviderAnalysis: boolean;
    includePolicyOptimization: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    premium: number;
    claims: number;
    coverage: number;
    cost: number;
    efficiency: number;
  }[];
  
  // Reporting Preferences
  includeRiskAssessment: boolean;
  includeCoverageAnalysis: boolean;
  includeCostAnalysis: boolean;
  includeClaimsAnalysis: boolean;
  includeProviderAnalysis: boolean;
  includePolicyOptimization: boolean;
  includeScenarioAnalysis: boolean;
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

export interface InsuranceCalculatorResults {
  // Core Insurance Metrics
  totalPremium: number;
  totalCoverage: number;
  coverageGap: number;
  costEfficiency: number;
  riskScore: number;
  
  // Insurance Analysis
  insuranceAnalysis: {
    totalPremium: number;
    totalCoverage: number;
    coverageGap: number;
    costEfficiency: number;
    riskScore: number;
    insuranceBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    insuranceEfficiency: number;
  };
  
  // Risk Assessment
  riskAssessment: {
    lifeRiskFactors: {
      age: number;
      gender: string;
      healthStatus: string;
      smokingStatus: string;
      bmi: number;
      familyHistory: string[];
      occupation: string;
      hobbies: string[];
      travelFrequency: number;
      riskScore: number;
    };
    healthRiskFactors: {
      age: number;
      gender: string;
      bmi: number;
      medicalConditions: string[];
      familyHistory: string[];
      lifestyleFactors: string[];
      occupation: string;
      geographicLocation: string;
      riskScore: number;
    };
    autoRiskFactors: {
      age: number;
      gender: string;
      drivingExperience: number;
      drivingRecord: string[];
      vehicleType: string;
      annualMileage: number;
      location: string;
      usage: string;
      riskScore: number;
    };
    homeRiskFactors: {
      location: string;
      constructionType: string;
      age: number;
      securityFeatures: string[];
      proximityToFireStation: number;
      crimeRate: number;
      naturalDisasterRisk: string[];
      maintenanceHistory: string[];
      riskScore: number;
    };
    disabilityRiskFactors: {
      age: number;
      gender: string;
      occupation: string;
      healthStatus: string;
      medicalConditions: string[];
      lifestyleFactors: string[];
      workEnvironment: string;
      riskScore: number;
    };
    riskEfficiency: number;
  };
  
  // Coverage Analysis
  coverageAnalysis: {
    coverageGaps: {
      gap: string;
      description: string;
      riskLevel: string;
      recommendedCoverage: number;
      estimatedCost: number;
      priority: string;
    }[];
    overlappingCoverage: {
      coverage: string;
      policies: string[];
      overlapAmount: number;
      efficiency: number;
      recommendation: string;
    }[];
    coverageAdequacy: {
      category: string;
      currentCoverage: number;
      recommendedCoverage: number;
      adequacy: number;
      gap: number;
      recommendation: string;
    }[];
    coverageEfficiency: number;
  };
  
  // Cost Analysis
  costAnalysis: {
    premiumAnalysis: {
      policy: string;
      premiumAmount: number;
      premiumFrequency: string;
      annualPremium: number;
      premiumBreakdown: {
        component: string;
        amount: number;
        percentage: number;
      }[];
      premiumTrend: number;
      premiumEfficiency: number;
    }[];
    costComparison: {
      policy: string;
      provider: string;
      premium: number;
      coverage: number;
      costPerThousand: number;
      valueScore: number;
      recommendation: string;
    }[];
    deductibleAnalysis: {
      policy: string;
      currentDeductible: number;
      alternativeDeductibles: {
        deductible: number;
        premiumSavings: number;
        breakevenPoint: number;
        recommendation: string;
      }[];
    }[];
    totalCostOfOwnership: {
      policy: string;
      annualPremium: number;
      expectedClaims: number;
      outOfPocketCosts: number;
      totalCost: number;
      costEfficiency: number;
    }[];
    costEfficiency: number;
  };
  
  // Claims Analysis
  claimsAnalysis: {
    claimsHistory: {
      policy: string;
      claims: {
        date: string;
        type: string;
        amount: number;
        status: string;
        description: string;
      }[];
      totalClaims: number;
      averageClaim: number;
      claimsFrequency: number;
    }[];
    claimsProjections: {
      policy: string;
      projectedClaims: number;
      confidenceInterval: {
        low: number;
        high: number;
      };
      riskFactors: string[];
      mitigationStrategies: string[];
    }[];
    claimsEfficiency: {
      policy: string;
      claimsRatio: number;
      lossRatio: number;
      expenseRatio: number;
      combinedRatio: number;
      efficiency: number;
    }[];
    claimsEfficiency: number;
  };
  
  // Provider Analysis
  providerAnalysis: {
    providerInfo: {
      provider: string;
      rating: number;
      financialStrength: string;
      customerSatisfaction: number;
      claimsSettlement: number;
      networkSize: number;
      serviceQuality: number;
    }[];
    providerComparison: {
      provider: string;
      premium: number;
      coverage: number;
      rating: number;
      customerSatisfaction: number;
      claimsSettlement: number;
      overallScore: number;
      recommendation: string;
    }[];
    marketAnalysis: {
      marketShare: {
        provider: string;
        share: number;
        growth: number;
      }[];
      marketTrends: {
        trend: string;
        impact: string;
        probability: number;
      }[];
      competitivePosition: {
        provider: string;
        position: string;
        strengths: string[];
        weaknesses: string[];
      }[];
    };
    providerEfficiency: number;
  };
  
  // Policy Optimization
  policyOptimization: {
    coverageOptimization: {
      category: string;
      currentCoverage: number;
      optimalCoverage: number;
      costBenefit: number;
      recommendation: string;
      implementation: string[];
    }[];
    premiumOptimization: {
      policy: string;
      currentPremium: number;
      optimizedPremium: number;
      savings: number;
      changes: string[];
      implementation: string[];
    }[];
    deductibleOptimization: {
      policy: string;
      currentDeductible: number;
      optimalDeductible: number;
      premiumSavings: number;
      riskIncrease: number;
      recommendation: string;
    }[];
    bundleOptimization: {
      currentPolicies: string[];
      recommendedBundle: string[];
      savings: number;
      additionalCoverage: string[];
      recommendation: string;
    }[];
    optimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowCost: number;
    highCost: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    impact: number;
    coverageNeeded: number;
    currentCoverage: number;
    gap: number;
    recommendation: string;
  }[];
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativePolicies: {
      policy: string;
      expectedCost: number;
      coverage: number;
      efficiency: number;
      comparison: number;
    }[];
    marketComparison: {
      benchmark: string;
      benchmarkCost: number;
      policyCost: number;
      difference: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      cost: number;
      coverage: number;
      efficiency: number;
    }[];
    marketComparison: {
      metric: string;
      policy: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Insurance Score
  insuranceScore: {
    overallScore: number;
    componentScores: {
      coverage: number;
      cost: number;
      risk: number;
      provider: number;
      claims: number;
      optimization: number;
    };
    recommendation: 'adequate' | 'inadequate' | 'excessive' | 'optimize';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanCost: number;
    medianCost: number;
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
    historicalCost: number;
    historicalCoverage: number;
    historicalEfficiency: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
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
    coverageImprovement: number;
    riskReduction: number;
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
    totalPremium: number;
    totalCoverage: number;
    coverageGap: number;
    costEfficiency: number;
    recommendation: 'adequate' | 'inadequate' | 'excessive' | 'optimize';
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
