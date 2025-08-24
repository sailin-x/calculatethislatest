export interface AnnuityCalculatorInputs {
  // Annuity Information
  annuityInfo: {
    // Annuity Details
    annuityDetails: {
      annuityType: 'immediate' | 'deferred' | 'fixed' | 'variable' | 'indexed' | 'qualified_longevity' | 'charitable_gift' | 'structured_settlement' | 'other';
      annuityName: string;
      insuranceCompany: string;
      contractNumber: string;
      issueDate: string;
      annuitizationDate: string;
      annuityDescription: string;
    };
    
    // Contract Specifications
    contractSpecifications: {
      premiumAmount: number;
      paymentFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      paymentAmount: number;
      guaranteedPeriod: number; // in years
      lifeOnly: boolean;
      jointLife: boolean;
      beneficiary: string;
      surrenderPeriod: number; // in years
      surrenderCharge: number;
    };
  };
  
  // Annuitant Information
  annuitantInfo: {
    // Primary Annuitant
    primaryAnnuitant: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: 'male' | 'female' | 'other';
      healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
      lifeExpectancy: number;
      smokingStatus: 'non_smoker' | 'smoker' | 'former_smoker';
      occupation: string;
    };
    
    // Joint Annuitant
    jointAnnuitant: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      gender: 'male' | 'female' | 'other';
      healthStatus: 'excellent' | 'good' | 'fair' | 'poor';
      lifeExpectancy: number;
      smokingStatus: 'non_smoker' | 'smoker' | 'former_smoker';
      occupation: string;
    };
    
    // Beneficiary Information
    beneficiaryInfo: {
      name: string;
      relationship: string;
      dateOfBirth: string;
      age: number;
      percentage: number;
      contingentBeneficiaries: {
        name: string;
        relationship: string;
        percentage: number;
      }[];
    };
  };
  
  // Payment Information
  paymentInfo: {
    // Payment Options
    paymentOptions: {
      paymentType: 'life_only' | 'life_with_period_certain' | 'joint_life' | 'joint_life_with_period_certain' | 'period_certain_only' | 'refund_life' | 'installment_refund' | 'cash_refund';
      paymentAmount: number;
      paymentFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      guaranteedPeriod: number; // in years
      periodCertain: number; // in years
      refundOption: boolean;
      refundAmount: number;
    };
    
    // Payment Schedule
    paymentSchedule: {
      startDate: string;
      endDate: string;
      totalPayments: number;
      paymentAmount: number;
      totalPaymentsValue: number;
    };
    
    // Cost of Living Adjustments
    costOfLivingAdjustments: {
      cola: boolean;
      colaRate: number;
      colaFrequency: 'annually' | 'semi_annually' | 'quarterly';
      colaCap: number;
      colaFloor: number;
    };
  };
  
  // Investment Information
  investmentInfo: {
    // Fixed Annuity
    fixedAnnuity: {
      guaranteedRate: number;
      currentRate: number;
      minimumRate: number;
      rateGuaranteePeriod: number; // in years
      rateResetFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
      bonusRate: number;
      bonusPeriod: number; // in years
    };
    
    // Variable Annuity
    variableAnnuity: {
      subaccounts: {
        subaccount: string;
        allocation: number;
        expenseRatio: number;
        expectedReturn: number;
        riskLevel: 'conservative' | 'moderate' | 'aggressive';
      }[];
      guaranteedMinimumIncomeBenefit: boolean;
      gmibRate: number;
      gmibReset: boolean;
      guaranteedMinimumWithdrawalBenefit: boolean;
      gmwbRate: number;
      gmwbReset: boolean;
      guaranteedMinimumAccumulationBenefit: boolean;
      gmbRate: number;
      gmbReset: boolean;
    };
    
    // Indexed Annuity
    indexedAnnuity: {
      indexType: 's_and_p_500' | 'nasdaq' | 'dow_jones' | 'euro_stoxx' | 'other';
      participationRate: number;
      capRate: number;
      floorRate: number;
      spread: number;
      creditingMethod: 'annual_point_to_point' | 'monthly_averaging' | 'daily_averaging' | 'other';
      resetFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    };
  };
  
  // Fees and Charges
  feesCharges: {
    // Mortality and Expense Charges
    mortalityExpenseCharges: {
      meaRate: number;
      meaAmount: number;
      meaFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    };
    
    // Administrative Charges
    administrativeCharges: {
      adminRate: number;
      adminAmount: number;
      adminFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    };
    
    // Investment Management Fees
    investmentManagementFees: {
      imfRate: number;
      imfAmount: number;
      imfFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    };
    
    // Rider Charges
    riderCharges: {
      rider: string;
      rate: number;
      amount: number;
      frequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    }[];
    
    // Surrender Charges
    surrenderCharges: {
      surrenderPeriod: number; // in years
      surrenderSchedule: {
        year: number;
        charge: number;
      }[];
      totalSurrenderCharge: number;
    };
    
    // Total Fees
    totalFees: {
      totalFeeRate: number;
      totalFeeAmount: number;
      feeImpact: number;
    };
  };
  
  // Tax Information
  taxInfo: {
    // Tax Treatment
    taxTreatment: {
      taxQualified: boolean;
      taxQualificationType: 'traditional_ira' | 'roth_ira' | '401k' | '403b' | '457' | 'sep_ira' | 'simple_ira' | 'other';
      exclusionRatio: number;
      taxablePortion: number;
      taxFreePortion: number;
    };
    
    // Required Minimum Distributions
    requiredMinimumDistributions: {
      rmdRequired: boolean;
      rmdStartAge: number;
      rmdStartDate: string;
      rmdAmount: number;
      rmdFrequency: 'monthly' | 'quarterly' | 'semi_annually' | 'annually';
    };
    
    // Tax Implications
    taxImplications: {
      currentTaxRate: number;
      retirementTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
      afterTaxIncome: number;
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Longevity Risk
    longevityRisk: {
      lifeExpectancy: number;
      outlivingAnnuity: number;
      longevityRisk: number;
      riskMitigation: string[];
    };
    
    // Inflation Risk
    inflationRisk: {
      inflationRate: number;
      purchasingPowerLoss: number;
      inflationRisk: number;
      colaProtection: boolean;
      colaEffectiveness: number;
    };
    
    // Interest Rate Risk
    interestRateRisk: {
      currentInterestRate: number;
      interestRateSensitivity: number;
      interestRateRisk: number;
      rateGuarantee: boolean;
      rateGuaranteePeriod: number;
    };
    
    // Credit Risk
    creditRisk: {
      insuranceCompanyRating: string;
      financialStrength: number;
      creditRisk: number;
      stateGuarantee: boolean;
      guaranteeLimit: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      surrenderValue: number;
      surrenderCharge: number;
      netSurrenderValue: number;
      liquidityRisk: number;
      accessToFunds: boolean;
    };
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    // Alternative Investments
    alternativeInvestments: {
      investment: string;
      expectedReturn: number;
      risk: number;
      liquidity: number;
      taxEfficiency: number;
      comparison: number;
    }[];
    
    // Other Annuities
    otherAnnuities: {
      company: string;
      annuityType: string;
      paymentAmount: number;
      fees: number;
      features: string[];
      rating: number;
    }[];
    
    // Market Analysis
    marketAnalysis: {
      averageAnnuityRate: number;
      marketRange: {
        low: number;
        high: number;
        median: number;
      };
      competitivePosition: number;
      marketTrend: 'increasing' | 'decreasing' | 'stable';
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Life Expectancy Scenarios
    lifeExpectancyScenarios: {
      scenario: string;
      lifeExpectancy: number;
      probability: number;
      totalPayments: number;
      netPresentValue: number;
      internalRateOfReturn: number;
    }[];
    
    // Interest Rate Scenarios
    interestRateScenarios: {
      scenario: string;
      interestRate: number;
      probability: number;
      paymentAmount: number;
      totalPayments: number;
      netPresentValue: number;
    }[];
    
    // Inflation Scenarios
    inflationScenarios: {
      scenario: string;
      inflationRate: number;
      probability: number;
      purchasingPowerLoss: number;
      realReturn: number;
      netPresentValue: number;
    }[];
    
    // Market Scenarios
    marketScenarios: {
      scenario: string;
      marketReturn: number;
      probability: number;
      alternativeReturn: number;
      opportunityCost: number;
      netPresentValue: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeLongevityVolatility: boolean;
  includeInterestRateVolatility: boolean;
  includeInflationVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  discountRate: number;
  inflationRate: number;
  includeTaxes: boolean;
  includeFees: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePaymentAnalysis: boolean;
    includeInvestmentAnalysis: boolean;
    includeTaxAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeComparisonAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    paymentAmount: number;
    inflationAdjustedPayment: number;
    cumulativePayments: number;
    surrenderValue: number;
    interestRate: number;
    inflationRate: number;
  }[];
  
  // Reporting Preferences
  includePaymentAnalysis: boolean;
  includeInvestmentAnalysis: boolean;
  includeTaxAnalysis: boolean;
  includeRiskAnalysis: boolean;
  includeComparisonAnalysis: boolean;
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

export interface AnnuityCalculatorResults {
  // Core Annuity Metrics
  paymentAmount: number;
  totalPayments: number;
  netPresentValue: number;
  internalRateOfReturn: number;
  breakEvenAge: number;
  
  // Annuity Analysis
  annuityAnalysis: {
    paymentAmount: number;
    totalPayments: number;
    netPresentValue: number;
    internalRateOfReturn: number;
    breakEvenAge: number;
    annuityBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    annuityEfficiency: number;
  };
  
  // Payment Analysis
  paymentAnalysis: {
    paymentOptions: {
      paymentType: string;
      paymentAmount: number;
      paymentFrequency: string;
      guaranteedPeriod: number;
      periodCertain: number;
      refundOption: boolean;
      refundAmount: number;
    };
    paymentSchedule: {
      startDate: string;
      endDate: string;
      totalPayments: number;
      paymentAmount: number;
      totalPaymentsValue: number;
    };
    costOfLivingAdjustments: {
      cola: boolean;
      colaRate: number;
      colaFrequency: string;
      colaCap: number;
      colaFloor: number;
      colaEffectiveness: number;
    };
    paymentEfficiency: number;
  };
  
  // Investment Analysis
  investmentAnalysis: {
    fixedAnnuity: {
      guaranteedRate: number;
      currentRate: number;
      minimumRate: number;
      rateGuaranteePeriod: number;
      rateResetFrequency: string;
      bonusRate: number;
      bonusPeriod: number;
    };
    variableAnnuity: {
      subaccounts: {
        subaccount: string;
        allocation: number;
        expenseRatio: number;
        expectedReturn: number;
        riskLevel: string;
      }[];
      guaranteedMinimumIncomeBenefit: boolean;
      gmibRate: number;
      gmibReset: boolean;
      guaranteedMinimumWithdrawalBenefit: boolean;
      gmwbRate: number;
      gmwbReset: boolean;
      guaranteedMinimumAccumulationBenefit: boolean;
      gmbRate: number;
      gmbReset: boolean;
    };
    indexedAnnuity: {
      indexType: string;
      participationRate: number;
      capRate: number;
      floorRate: number;
      spread: number;
      creditingMethod: string;
      resetFrequency: string;
    };
    investmentEfficiency: number;
  };
  
  // Fee Analysis
  feeAnalysis: {
    mortalityExpenseCharges: {
      meaRate: number;
      meaAmount: number;
      meaFrequency: string;
    };
    administrativeCharges: {
      adminRate: number;
      adminAmount: number;
      adminFrequency: string;
    };
    investmentManagementFees: {
      imfRate: number;
      imfAmount: number;
      imfFrequency: string;
    };
    riderCharges: {
      rider: string;
      rate: number;
      amount: number;
      frequency: string;
    }[];
    surrenderCharges: {
      surrenderPeriod: number;
      surrenderSchedule: {
        year: number;
        charge: number;
      }[];
      totalSurrenderCharge: number;
    };
    totalFees: {
      totalFeeRate: number;
      totalFeeAmount: number;
      feeImpact: number;
    };
    feeEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxTreatment: {
      taxQualified: boolean;
      taxQualificationType: string;
      exclusionRatio: number;
      taxablePortion: number;
      taxFreePortion: number;
    };
    requiredMinimumDistributions: {
      rmdRequired: boolean;
      rmdStartAge: number;
      rmdStartDate: string;
      rmdAmount: number;
      rmdFrequency: string;
    };
    taxImplications: {
      currentTaxRate: number;
      retirementTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
      afterTaxIncome: number;
    };
    taxEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    longevityRisk: {
      lifeExpectancy: number;
      outlivingAnnuity: number;
      longevityRisk: number;
      riskMitigation: string[];
    };
    inflationRisk: {
      inflationRate: number;
      purchasingPowerLoss: number;
      inflationRisk: number;
      colaProtection: boolean;
      colaEffectiveness: number;
    };
    interestRateRisk: {
      currentInterestRate: number;
      interestRateSensitivity: number;
      interestRateRisk: number;
      rateGuarantee: boolean;
      rateGuaranteePeriod: number;
    };
    creditRisk: {
      insuranceCompanyRating: string;
      financialStrength: number;
      creditRisk: number;
      stateGuarantee: boolean;
      guaranteeLimit: number;
    };
    liquidityRisk: {
      surrenderValue: number;
      surrenderCharge: number;
      netSurrenderValue: number;
      liquidityRisk: number;
      accessToFunds: boolean;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeInvestments: {
      investment: string;
      expectedReturn: number;
      risk: number;
      liquidity: number;
      taxEfficiency: number;
      comparison: number;
    }[];
    otherAnnuities: {
      company: string;
      annuityType: string;
      paymentAmount: number;
      fees: number;
      features: string[];
      rating: number;
    }[];
    marketAnalysis: {
      averageAnnuityRate: number;
      marketRange: {
        low: number;
        high: number;
        median: number;
      };
      competitivePosition: number;
      marketTrend: string;
    };
    comparisonEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowPayment: number;
    highPayment: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    paymentAmount: number;
    totalPayments: number;
    netPresentValue: number;
    internalRateOfReturn: number;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      paymentAmount: number;
      fees: number;
      rating: number;
      outperformance: number;
    }[];
    marketComparison: {
      metric: string;
      annuity: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Annuity Score
  annuityScore: {
    overallScore: number;
    componentScores: {
      payment: number;
      investment: number;
      tax: number;
      risk: number;
      comparison: number;
    };
    recommendation: 'purchase' | 'consider' | 'avoid' | 'review';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanPayment: number;
    medianPayment: number;
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
    historicalPayment: number;
    historicalInflation: number;
    historicalInterestRate: number;
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
    incomeSecurity: number;
    riskReduction: number;
    taxOptimization: number;
    costSavings: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    annuityAssessment: string;
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
    paymentAmount: number;
    totalPayments: number;
    internalRateOfReturn: number;
    recommendation: 'purchase' | 'consider' | 'avoid' | 'review';
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
