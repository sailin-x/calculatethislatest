export interface TaxCalculatorInputs {
  // Personal Information
  personalInfo: {
    // Basic Information
    basicInfo: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      socialSecurityNumber: string;
      filingStatus: 'single' | 'married_filing_jointly' | 'married_filing_separately' | 'head_of_household' | 'qualifying_widow';
      taxYear: number;
      stateOfResidence: string;
      countryOfResidence: string;
      citizenship: string;
      dependents: number;
      exemptions: number;
    };
    
    // Income Information
    incomeInfo: {
      // Employment Income
      employmentIncome: {
        employer: string;
        wages: number;
        tips: number;
        bonuses: number;
        commissions: number;
        overtime: number;
        severance: number;
        totalEmploymentIncome: number;
      }[];
      
      // Self-Employment Income
      selfEmploymentIncome: {
        businessName: string;
        businessType: string;
        grossReceipts: number;
        businessExpenses: number;
        netEarnings: number;
        selfEmploymentTax: number;
      }[];
      
      // Investment Income
      investmentIncome: {
        interestIncome: number;
        dividendIncome: number;
        capitalGains: {
          shortTerm: number;
          longTerm: number;
          total: number;
        };
        rentalIncome: number;
        royaltyIncome: number;
        partnershipIncome: number;
        sCorporationIncome: number;
        totalInvestmentIncome: number;
      };
      
      // Other Income
      otherIncome: {
        alimony: number;
        unemployment: number;
        socialSecurity: number;
        pension: number;
        annuity: number;
        gambling: number;
        prizes: number;
        otherIncome: number;
        totalOtherIncome: number;
      };
      
      // Total Income
      totalIncome: number;
      adjustedGrossIncome: number;
    };
    
    // Deductions Information
    deductionsInfo: {
      // Standard Deduction
      standardDeduction: {
        amount: number;
        applicable: boolean;
      };
      
      // Itemized Deductions
      itemizedDeductions: {
        // Medical Expenses
        medicalExpenses: {
          medicalExpenses: number;
          dentalExpenses: number;
          visionExpenses: number;
          prescriptionDrugs: number;
          healthInsurance: number;
          longTermCare: number;
          totalMedicalExpenses: number;
          adjustedGrossIncome: number;
          threshold: number;
          deductibleAmount: number;
        };
        
        // State and Local Taxes
        stateLocalTaxes: {
          stateIncomeTax: number;
          localIncomeTax: number;
          realEstateTax: number;
          personalPropertyTax: number;
          salesTax: number;
          totalStateLocalTaxes: number;
          limit: number;
          deductibleAmount: number;
        };
        
        // Mortgage Interest
        mortgageInterest: {
          primaryResidence: number;
          secondHome: number;
          homeEquity: number;
          points: number;
          totalMortgageInterest: number;
          limit: number;
          deductibleAmount: number;
        };
        
        // Charitable Contributions
        charitableContributions: {
          cash: number;
          property: number;
          mileage: number;
          totalCharitableContributions: number;
          limit: number;
          deductibleAmount: number;
        };
        
        // Other Itemized Deductions
        otherDeductions: {
          casualtyLoss: number;
          theftLoss: number;
          gamblingLoss: number;
          jobExpenses: number;
          taxPreparation: number;
          investmentExpenses: number;
          otherDeductions: number;
          totalOtherDeductions: number;
        };
        
        totalItemizedDeductions: number;
      };
      
      // Above-the-Line Deductions
      aboveTheLineDeductions: {
        educatorExpenses: number;
        studentLoanInterest: number;
        tuitionAndFees: number;
        healthSavingsAccount: number;
        traditionalIRA: number;
        sepIRA: number;
        simpleIRA: number;
        selfEmployedHealthInsurance: number;
        selfEmployedRetirement: number;
        alimonyPaid: number;
        movingExpenses: number;
        totalAboveTheLineDeductions: number;
      };
      
      // Total Deductions
      totalDeductions: number;
    };
    
    // Credits Information
    creditsInfo: {
      // Child and Dependent Care Credits
      childDependentCare: {
        childCareExpenses: number;
        dependentCareExpenses: number;
        qualifyingChildren: number;
        qualifyingDependents: number;
        creditPercentage: number;
        creditAmount: number;
      };
      
      // Education Credits
      educationCredits: {
        americanOpportunityCredit: {
          qualifiedExpenses: number;
          creditAmount: number;
          refundableAmount: number;
        };
        lifetimeLearningCredit: {
          qualifiedExpenses: number;
          creditAmount: number;
        };
      };
      
      // Earned Income Credit
      earnedIncomeCredit: {
        earnedIncome: number;
        adjustedGrossIncome: number;
        qualifyingChildren: number;
        creditAmount: number;
        refundableAmount: number;
      };
      
      // Child Tax Credit
      childTaxCredit: {
        qualifyingChildren: number;
        creditAmount: number;
        refundableAmount: number;
      };
      
      // Other Credits
      otherCredits: {
        adoptionCredit: number;
        saverCredit: number;
        foreignTaxCredit: number;
        residentialEnergyCredit: number;
        electricVehicleCredit: number;
        otherCredits: number;
        totalOtherCredits: number;
      };
      
      // Total Credits
      totalCredits: number;
    };
    
    // Business Information
    businessInfo: {
      // Business Income
      businessIncome: {
        businessName: string;
        businessType: string;
        ein: string;
        grossReceipts: number;
        costOfGoodsSold: number;
        grossProfit: number;
        businessExpenses: {
          advertising: number;
          carAndTruck: number;
          commissions: number;
          contractLabor: number;
          depreciation: number;
          insurance: number;
          interest: number;
          legal: number;
          meals: number;
          office: number;
          pension: number;
          rent: number;
          repairs: number;
          supplies: number;
          taxes: number;
          travel: number;
          utilities: number;
          wages: number;
          otherExpenses: number;
          totalExpenses: number;
        };
        netIncome: number;
      }[];
      
      // Business Deductions
      businessDeductions: {
        homeOffice: {
          squareFootage: number;
          totalSquareFootage: number;
          percentage: number;
          expenses: number;
          deduction: number;
        };
        vehicle: {
          businessMiles: number;
          totalMiles: number;
          percentage: number;
          expenses: number;
          deduction: number;
        };
        equipment: {
          equipment: string;
          cost: number;
          usefulLife: number;
          depreciation: number;
        }[];
        totalBusinessDeductions: number;
      };
    };
    
    // Investment Information
    investmentInfo: {
      // Investment Accounts
      investmentAccounts: {
        accountType: 'individual' | 'joint' | 'ira' | '401k' | 'roth' | 'other';
        accountName: string;
        institution: string;
        accountNumber: string;
        beginningBalance: number;
        endingBalance: number;
        contributions: number;
        distributions: number;
        gains: number;
        losses: number;
      }[];
      
      // Capital Gains and Losses
      capitalGainsLosses: {
        shortTermGains: number;
        shortTermLosses: number;
        longTermGains: number;
        longTermLosses: number;
        netShortTerm: number;
        netLongTerm: number;
        netCapitalGain: number;
        carryoverLosses: number;
      };
      
      // Investment Expenses
      investmentExpenses: {
        investmentAdvisory: number;
        custodialFees: number;
        legalFees: number;
        accountingFees: number;
        otherExpenses: number;
        totalExpenses: number;
      };
    };
    
    // Real Estate Information
    realEstateInfo: {
      // Rental Properties
      rentalProperties: {
        propertyAddress: string;
        propertyType: string;
        rentalIncome: number;
        rentalExpenses: {
          mortgageInterest: number;
          propertyTax: number;
          insurance: number;
          utilities: number;
          maintenance: number;
          repairs: number;
          depreciation: number;
          management: number;
          otherExpenses: number;
          totalExpenses: number;
        };
        netRentalIncome: number;
        passiveActivity: boolean;
      }[];
      
      // Real Estate Sales
      realEstateSales: {
        propertyAddress: string;
        salePrice: number;
        costBasis: number;
        improvements: number;
        sellingExpenses: number;
        gain: number;
        exclusion: number;
        taxableGain: number;
      }[];
    };
    
    // Retirement Information
    retirementInfo: {
      // Retirement Accounts
      retirementAccounts: {
        accountType: 'traditional_ira' | 'roth_ira' | '401k' | '403b' | '457' | 'sep_ira' | 'simple_ira' | 'other';
        accountName: string;
        institution: string;
        contributions: number;
        distributions: number;
        requiredMinimumDistribution: number;
        earlyWithdrawalPenalty: number;
      }[];
      
      // Pension Income
      pensionIncome: {
        pensionName: string;
        annualPension: number;
        taxableAmount: number;
        exclusion: number;
      }[];
      
      // Social Security
      socialSecurity: {
        socialSecurityBenefits: number;
        otherIncome: number;
        provisionalIncome: number;
        taxablePercentage: number;
        taxableAmount: number;
      };
    };
    
    // Alternative Minimum Tax
    alternativeMinimumTax: {
      alternativeMinimumTaxableIncome: number;
      exemption: number;
      exemptionPhaseout: number;
      tentativeMinimumTax: number;
      regularTax: number;
      alternativeMinimumTax: number;
    };
    
    // Estimated Tax Payments
    estimatedTaxPayments: {
      firstQuarter: number;
      secondQuarter: number;
      thirdQuarter: number;
      fourthQuarter: number;
      totalEstimatedPayments: number;
    };
    
    // Withholding Information
    withholdingInfo: {
      federalWithholding: number;
      stateWithholding: number;
      localWithholding: number;
      socialSecurityWithholding: number;
      medicareWithholding: number;
      totalWithholding: number;
    };
    
    // Prior Year Information
    priorYearInfo: {
      priorYearAGI: number;
      priorYearTax: number;
      priorYearRefund: number;
      priorYearCarryover: number;
    };
  };
  
  // Tax Calculation Options
  calculationOptions: {
    includeStateTax: boolean;
    includeLocalTax: boolean;
    includeAlternativeMinimumTax: boolean;
    includeSelfEmploymentTax: boolean;
    includeMedicareSurtax: boolean;
    includeNetInvestmentIncomeTax: boolean;
    includeEstateTax: boolean;
    includeGiftTax: boolean;
    includeForeignTax: boolean;
    includeEstimatedTax: boolean;
  };
  
  // Tax Planning Scenarios
  taxPlanningScenarios: {
    scenario: string;
    description: string;
    changes: {
      category: string;
      change: string;
      amount: number;
    }[];
    probability: number;
  }[];
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeIncomeVolatility: boolean;
  includeDeductionVolatility: boolean;
  includeCreditVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  taxHorizon: number;
  includeInflation: boolean;
  includeTaxLawChanges: boolean;
  
  // Historical Data
  historicalData: {
    year: number;
    income: number;
    deductions: number;
    credits: number;
    taxLiability: number;
    effectiveTaxRate: number;
  }[];
  
  // Reporting Preferences
  includeTaxPlanning: boolean;
  includeOptimization: boolean;
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

export interface TaxCalculatorResults {
  // Core Tax Metrics
  totalIncome: number;
  adjustedGrossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveTaxRate: number;
  
  // Tax Analysis
  taxAnalysis: {
    totalIncome: number;
    adjustedGrossIncome: number;
    taxableIncome: number;
    totalTax: number;
    effectiveTaxRate: number;
    taxBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    taxEfficiency: number;
  };
  
  // Income Analysis
  incomeAnalysis: {
    employmentIncome: {
      employer: string;
      wages: number;
      tips: number;
      bonuses: number;
      commissions: number;
      overtime: number;
      severance: number;
      totalEmploymentIncome: number;
    }[];
    selfEmploymentIncome: {
      businessName: string;
      businessType: string;
      grossReceipts: number;
      businessExpenses: number;
      netEarnings: number;
      selfEmploymentTax: number;
    }[];
    investmentIncome: {
      interestIncome: number;
      dividendIncome: number;
      capitalGains: {
        shortTerm: number;
        longTerm: number;
        total: number;
      };
      rentalIncome: number;
      royaltyIncome: number;
      partnershipIncome: number;
      sCorporationIncome: number;
      totalInvestmentIncome: number;
    };
    otherIncome: {
      alimony: number;
      unemployment: number;
      socialSecurity: number;
      pension: number;
      annuity: number;
      gambling: number;
      prizes: number;
      otherIncome: number;
      totalOtherIncome: number;
    };
    totalIncome: number;
    adjustedGrossIncome: number;
    incomeEfficiency: number;
  };
  
  // Deductions Analysis
  deductionsAnalysis: {
    standardDeduction: {
      amount: number;
      applicable: boolean;
    };
    itemizedDeductions: {
      medicalExpenses: {
        medicalExpenses: number;
        dentalExpenses: number;
        visionExpenses: number;
        prescriptionDrugs: number;
        healthInsurance: number;
        longTermCare: number;
        totalMedicalExpenses: number;
        adjustedGrossIncome: number;
        threshold: number;
        deductibleAmount: number;
      };
      stateLocalTaxes: {
        stateIncomeTax: number;
        localIncomeTax: number;
        realEstateTax: number;
        personalPropertyTax: number;
        salesTax: number;
        totalStateLocalTaxes: number;
        limit: number;
        deductibleAmount: number;
      };
      mortgageInterest: {
        primaryResidence: number;
        secondHome: number;
        homeEquity: number;
        points: number;
        totalMortgageInterest: number;
        limit: number;
        deductibleAmount: number;
      };
      charitableContributions: {
        cash: number;
        property: number;
        mileage: number;
        totalCharitableContributions: number;
        limit: number;
        deductibleAmount: number;
      };
      otherDeductions: {
        casualtyLoss: number;
        theftLoss: number;
        gamblingLoss: number;
        jobExpenses: number;
        taxPreparation: number;
        investmentExpenses: number;
        otherDeductions: number;
        totalOtherDeductions: number;
      };
      totalItemizedDeductions: number;
    };
    aboveTheLineDeductions: {
      educatorExpenses: number;
      studentLoanInterest: number;
      tuitionAndFees: number;
      healthSavingsAccount: number;
      traditionalIRA: number;
      sepIRA: number;
      simpleIRA: number;
      selfEmployedHealthInsurance: number;
      selfEmployedRetirement: number;
      alimonyPaid: number;
      movingExpenses: number;
      totalAboveTheLineDeductions: number;
    };
    totalDeductions: number;
    deductionsEfficiency: number;
  };
  
  // Credits Analysis
  creditsAnalysis: {
    childDependentCare: {
      childCareExpenses: number;
      dependentCareExpenses: number;
      qualifyingChildren: number;
      qualifyingDependents: number;
      creditPercentage: number;
      creditAmount: number;
    };
    educationCredits: {
      americanOpportunityCredit: {
        qualifiedExpenses: number;
        creditAmount: number;
        refundableAmount: number;
      };
      lifetimeLearningCredit: {
        qualifiedExpenses: number;
        creditAmount: number;
      };
    };
    earnedIncomeCredit: {
      earnedIncome: number;
      adjustedGrossIncome: number;
      qualifyingChildren: number;
      creditAmount: number;
      refundableAmount: number;
    };
    childTaxCredit: {
      qualifyingChildren: number;
      creditAmount: number;
      refundableAmount: number;
    };
    otherCredits: {
      adoptionCredit: number;
      saverCredit: number;
      foreignTaxCredit: number;
      residentialEnergyCredit: number;
      electricVehicleCredit: number;
      otherCredits: number;
      totalOtherCredits: number;
    };
    totalCredits: number;
    creditsEfficiency: number;
  };
  
  // Tax Liability Analysis
  taxLiabilityAnalysis: {
    federalTax: {
      incomeTax: number;
      alternativeMinimumTax: number;
      selfEmploymentTax: number;
      medicareSurtax: number;
      netInvestmentIncomeTax: number;
      totalFederalTax: number;
    };
    stateTax: {
      stateIncomeTax: number;
      stateCredits: number;
      netStateTax: number;
    };
    localTax: {
      localIncomeTax: number;
      localCredits: number;
      netLocalTax: number;
    };
    totalTaxLiability: number;
    effectiveTaxRate: number;
    marginalTaxRate: number;
    taxEfficiency: number;
  };
  
  // Refund Analysis
  refundAnalysis: {
    totalWithholding: number;
    estimatedTaxPayments: number;
    totalPayments: number;
    totalTaxLiability: number;
    refund: number;
    amountDue: number;
    refundEfficiency: number;
  };
  
  // Business Tax Analysis
  businessTaxAnalysis: {
    businessIncome: {
      businessName: string;
      businessType: string;
      grossReceipts: number;
      costOfGoodsSold: number;
      grossProfit: number;
      businessExpenses: {
        advertising: number;
        carAndTruck: number;
        commissions: number;
        contractLabor: number;
        depreciation: number;
        insurance: number;
        interest: number;
        legal: number;
        meals: number;
        office: number;
        pension: number;
        rent: number;
        repairs: number;
        supplies: number;
        taxes: number;
        travel: number;
        utilities: number;
        wages: number;
        otherExpenses: number;
        totalExpenses: number;
      };
      netIncome: number;
    }[];
    businessDeductions: {
      homeOffice: {
        squareFootage: number;
        totalSquareFootage: number;
        percentage: number;
        expenses: number;
        deduction: number;
      };
      vehicle: {
        businessMiles: number;
        totalMiles: number;
        percentage: number;
        expenses: number;
        deduction: number;
      };
      equipment: {
        equipment: string;
        cost: number;
        usefulLife: number;
        depreciation: number;
      }[];
      totalBusinessDeductions: number;
    };
    selfEmploymentTax: number;
    businessTaxEfficiency: number;
  };
  
  // Investment Tax Analysis
  investmentTaxAnalysis: {
    investmentAccounts: {
      accountType: string;
      accountName: string;
      institution: string;
      beginningBalance: number;
      endingBalance: number;
      contributions: number;
      distributions: number;
      gains: number;
      losses: number;
    }[];
    capitalGainsLosses: {
      shortTermGains: number;
      shortTermLosses: number;
      longTermGains: number;
      longTermLosses: number;
      netShortTerm: number;
      netLongTerm: number;
      netCapitalGain: number;
      carryoverLosses: number;
    };
    investmentExpenses: {
      investmentAdvisory: number;
      custodialFees: number;
      legalFees: number;
      accountingFees: number;
      otherExpenses: number;
      totalExpenses: number;
    };
    netInvestmentIncomeTax: number;
    investmentTaxEfficiency: number;
  };
  
  // Real Estate Tax Analysis
  realEstateTaxAnalysis: {
    rentalProperties: {
      propertyAddress: string;
      propertyType: string;
      rentalIncome: number;
      rentalExpenses: {
        mortgageInterest: number;
        propertyTax: number;
        insurance: number;
        utilities: number;
        maintenance: number;
        repairs: number;
        depreciation: number;
        management: number;
        otherExpenses: number;
        totalExpenses: number;
      };
      netRentalIncome: number;
      passiveActivity: boolean;
    }[];
    realEstateSales: {
      propertyAddress: string;
      salePrice: number;
      costBasis: number;
      improvements: number;
      sellingExpenses: number;
      gain: number;
      exclusion: number;
      taxableGain: number;
    }[];
    realEstateTaxEfficiency: number;
  };
  
  // Retirement Tax Analysis
  retirementTaxAnalysis: {
    retirementAccounts: {
      accountType: string;
      accountName: string;
      institution: string;
      contributions: number;
      distributions: number;
      requiredMinimumDistribution: number;
      earlyWithdrawalPenalty: number;
    }[];
    pensionIncome: {
      pensionName: string;
      annualPension: number;
      taxableAmount: number;
      exclusion: number;
    }[];
    socialSecurity: {
      socialSecurityBenefits: number;
      otherIncome: number;
      provisionalIncome: number;
      taxablePercentage: number;
      taxableAmount: number;
    };
    retirementTaxEfficiency: number;
  };
  
  // Alternative Minimum Tax Analysis
  alternativeMinimumTaxAnalysis: {
    alternativeMinimumTaxableIncome: number;
    exemption: number;
    exemptionPhaseout: number;
    tentativeMinimumTax: number;
    regularTax: number;
    alternativeMinimumTax: number;
    amtEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowTax: number;
    highTax: number;
    sensitivity: number;
  }[];
  
  // Scenario Analysis
  scenarioAnalysis: {
    scenarioName: string;
    description: string;
    probability: number;
    incomeChange: number;
    deductionChange: number;
    creditChange: number;
    taxChange: number;
    recommendation: string;
  }[];
  
  // Tax Planning Analysis
  taxPlanningAnalysis: {
    optimizationOpportunities: {
      category: string;
      opportunity: string;
      potentialSavings: number;
      implementationDifficulty: 'low' | 'medium' | 'high';
      priority: 'low' | 'medium' | 'high';
    }[];
    taxStrategies: {
      strategy: string;
      description: string;
      expectedSavings: number;
      implementationSteps: string[];
      timeline: string;
    }[];
    planningEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeScenarios: {
      scenario: string;
      income: number;
      deductions: number;
      credits: number;
      taxLiability: number;
      efficiency: number;
    }[];
    benchmarkComparison: {
      benchmark: string;
      benchmarkTax: number;
      actualTax: number;
      difference: number;
      efficiency: number;
    };
    comparisonEfficiency: number;
  };
  
  // Tax Score
  taxScore: {
    overallScore: number;
    componentScores: {
      income: number;
      deductions: number;
      credits: number;
      planning: number;
      compliance: number;
      efficiency: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Monte Carlo Results
  monteCarloResults: {
    meanTax: number;
    medianTax: number;
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
    historicalTax: number;
    historicalIncome: number;
    historicalDeductions: number;
    historicalCredits: number;
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    taxSavings: number;
    complianceImprovement: number;
    riskReduction: number;
    efficiencyGain: number;
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
    adjustedGrossIncome: number;
    taxableIncome: number;
    totalTax: number;
    effectiveTaxRate: number;
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
    keyStrengths: string[];
    keyWeaknesses: string[];
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
