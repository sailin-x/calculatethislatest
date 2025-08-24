export interface DebtManagementCalculatorInputs {
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
    discretionaryIncome: number;
  };
  
  // Debt Information
  debtInfo: {
    // Mortgage Debt
    mortgageDebt: {
      property: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: 'fixed' | 'adjustable' | 'interest_only' | 'balloon' | 'reverse';
      paymentFrequency: 'monthly' | 'bi_weekly' | 'weekly';
      escrowIncluded: boolean;
      escrowAmount: number;
      pmi: boolean;
      pmiAmount: number;
      refinanceEligible: boolean;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Credit Card Debt
    creditCardDebt: {
      cardName: string;
      issuer: string;
      currentBalance: number;
      creditLimit: number;
      interestRate: number;
      minimumPayment: number;
      actualPayment: number;
      paymentDueDate: string;
      gracePeriod: number;
      lateFees: number;
      annualFees: number;
      balanceTransferFee: number;
      cashAdvanceFee: number;
      rewardsProgram: string;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Student Loan Debt
    studentLoanDebt: {
      loanName: string;
      servicer: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: 'federal_subsidized' | 'federal_unsubsidized' | 'federal_parent_plus' | 'private' | 'institutional';
      repaymentPlan: 'standard' | 'graduated' | 'income_based' | 'pay_as_you_earn' | 'revised_pay_as_you_earn' | 'income_contigent';
      forgivenessEligible: boolean;
      forgivenessProgram: string;
      forgivenessRequirements: string[];
      defermentEligible: boolean;
      forbearanceEligible: boolean;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Auto Loan Debt
    autoLoanDebt: {
      vehicle: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      vehicleValue: number;
      upsideDown: boolean;
      gapInsurance: boolean;
      gapInsuranceAmount: number;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Personal Loan Debt
    personalLoanDebt: {
      loanName: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      purpose: string;
      secured: boolean;
      collateral: string;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Business Loan Debt
    businessLoanDebt: {
      loanName: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      businessName: string;
      businessType: string;
      secured: boolean;
      collateral: string;
      personalGuarantee: boolean;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Medical Debt
    medicalDebt: {
      provider: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      serviceDate: string;
      serviceType: string;
      insuranceCoverage: number;
      negotiatedAmount: number;
      hardshipEligible: boolean;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Tax Debt
    taxDebt: {
      taxYear: number;
      taxType: 'federal' | 'state' | 'local';
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      penaltyRate: number;
      monthlyPayment: number;
      paymentPlan: boolean;
      paymentPlanType: string;
      remainingTerm: number;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Other Debt
    otherDebt: {
      debtName: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: string;
      purpose: string;
      secured: boolean;
      collateral: string;
      priority: 'high' | 'medium' | 'low';
    }[];
    
    // Total Debt Summary
    totalDebtSummary: {
      totalDebt: number;
      totalMonthlyPayments: number;
      averageInterestRate: number;
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
      creditUtilization: number;
      totalInterestPaid: number;
      totalPrincipalPaid: number;
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
      emergencyFund: boolean;
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
    }[];
    
    // Other Assets
    otherAssets: {
      asset: string;
      type: string;
      value: number;
      income: number;
      growthRate: number;
      liquidity: string;
    }[];
    
    // Total Assets
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
  };
  
  // Debt Management Goals
  debtManagementGoals: {
    // Debt Payoff Goals
    debtPayoffGoals: {
      debt: string;
      targetPayoffDate: string;
      targetAmount: number;
      priority: 'high' | 'medium' | 'low';
      strategy: 'avalanche' | 'snowball' | 'hybrid' | 'custom';
      monthlyPayment: number;
      additionalPayment: number;
    }[];
    
    // Debt Consolidation Goals
    debtConsolidationGoals: {
      debtsToConsolidate: string[];
      consolidationAmount: number;
      targetInterestRate: number;
      targetTerm: number;
      monthlyPayment: number;
      savings: number;
      strategy: 'personal_loan' | 'balance_transfer' | 'home_equity' | 'refinance';
    }[];
    
    // Credit Score Goals
    creditScoreGoals: {
      currentScore: number;
      targetScore: number;
      timeframe: number;
      strategies: string[];
      priority: 'high' | 'medium' | 'low';
    };
    
    // Financial Freedom Goals
    financialFreedomGoals: {
      goal: string;
      targetDate: string;
      targetAmount: number;
      priority: 'high' | 'medium' | 'low';
      description: string;
    }[];
  };
  
  // Debt Management Strategy
  debtManagementStrategy: {
    // Payoff Strategy
    payoffStrategy: {
      strategy: 'avalanche' | 'snowball' | 'hybrid' | 'custom';
      description: string;
      advantages: string[];
      disadvantages: string[];
      recommendedOrder: string[];
      expectedPayoffTime: number;
      totalInterestPaid: number;
      totalSavings: number;
    };
    
    // Consolidation Strategy
    consolidationStrategy: {
      strategy: 'personal_loan' | 'balance_transfer' | 'home_equity' | 'refinance' | 'none';
      description: string;
      eligibleDebts: string[];
      consolidationAmount: number;
      targetInterestRate: number;
      targetTerm: number;
      monthlyPayment: number;
      totalSavings: number;
      risks: string[];
    };
    
    // Refinancing Strategy
    refinancingStrategy: {
      strategy: 'mortgage_refinance' | 'auto_refinance' | 'student_loan_refinance' | 'none';
      description: string;
      eligibleDebts: string[];
      currentTerms: string;
      proposedTerms: string;
      closingCosts: number;
      monthlySavings: number;
      breakEvenTime: number;
      totalSavings: number;
    };
    
    // Negotiation Strategy
    negotiationStrategy: {
      strategy: 'interest_rate_reduction' | 'payment_plan' | 'settlement' | 'forbearance' | 'none';
      description: string;
      eligibleDebts: string[];
      negotiationTactics: string[];
      expectedOutcomes: string[];
      risks: string[];
    };
    
    // Budget Strategy
    budgetStrategy: {
      strategy: 'zero_based' | 'envelope' | 'percentage' | 'custom';
      description: string;
      monthlyIncome: number;
      essentialExpenses: number;
      discretionaryExpenses: number;
      debtPayments: number;
      savings: number;
      emergencyFund: number;
    };
  };
  
  // Credit Information
  creditInfo: {
    // Credit Reports
    creditReports: {
      bureau: 'equifax' | 'experian' | 'transunion';
      score: number;
      lastUpdated: string;
      factors: {
        factor: string;
        impact: 'positive' | 'negative' | 'neutral';
        description: string;
      }[];
      accounts: {
        account: string;
        type: string;
        balance: number;
        limit: number;
        paymentHistory: string;
        status: string;
      }[];
      inquiries: {
        date: string;
        creditor: string;
        type: string;
      }[];
      publicRecords: {
        type: string;
        date: string;
        amount: number;
        status: string;
      }[];
    }[];
    
    // Credit Utilization
    creditUtilization: {
      totalCreditLimit: number;
      totalBalance: number;
      utilizationRate: number;
      recommendedRate: number;
      improvementNeeded: boolean;
    };
    
    // Payment History
    paymentHistory: {
      account: string;
      onTimePayments: number;
      latePayments: number;
      missedPayments: number;
      paymentPattern: string;
      lastLatePayment: string;
    }[];
  };
  
  // Market Assumptions
  marketAssumptions: {
    // Interest Rate Assumptions
    interestRateAssumptions: {
      debtType: string;
      currentRate: number;
      projectedRate: number;
      rateChangeProbability: number;
      rateChangeDirection: 'increase' | 'decrease' | 'stable';
    }[];
    
    // Economic Assumptions
    economicAssumptions: {
      inflationRate: number;
      realGdpGrowth: number;
      unemploymentRate: number;
      federalFundsRate: number;
      primeRate: number;
      creditAvailability: 'tight' | 'normal' | 'loose';
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
  includeInterestRateRisk: boolean;
  includeIncomeRisk: boolean;
  includeExpenseRisk: boolean;
  includeCreditRisk: boolean;
  
  // Analysis Parameters
  analysisPeriod: number;
  confidenceLevel: number;
  planningHorizon: number;
  includeTaxConsiderations: boolean;
  includeInflationAdjustments: boolean;
  includeCreditScoreImpact: boolean;
  
  // Calculation Options
  calculationOptions: {
    includeGoalAnalysis: boolean;
    includeCashFlowAnalysis: boolean;
    includeDebtOptimization: boolean;
    includeTaxOptimization: boolean;
    includeRiskManagement: boolean;
    includeCreditOptimization: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Data
  historicalData: {
    date: string;
    totalDebt: number;
    income: number;
    expenses: number;
    debtPayments: number;
    creditScore: number;
  }[];
  
  // Reporting Preferences
  includeGoalAnalysis: boolean;
  includeCashFlowAnalysis: boolean;
  includeDebtOptimization: boolean;
  includeTaxOptimization: boolean;
  includeRiskManagement: boolean;
  includeCreditOptimization: boolean;
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

export interface DebtManagementCalculatorResults {
  // Core Debt Metrics
  debtManagementScore: number;
  debtToIncomeRatio: number;
  debtToAssetRatio: number;
  creditUtilization: number;
  debtFreedomDate: number;
  
  // Debt Management Analysis
  debtManagementAnalysis: {
    debtManagementScore: number;
    debtToIncomeRatio: number;
    debtToAssetRatio: number;
    creditUtilization: number;
    debtFreedomDate: number;
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
    discretionaryIncome: number;
    incomeEfficiency: number;
  };
  
  // Debt Analysis
  debtAnalysis: {
    mortgageDebt: {
      property: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: string;
      paymentFrequency: string;
      escrowIncluded: boolean;
      escrowAmount: number;
      pmi: boolean;
      pmiAmount: number;
      refinanceEligible: boolean;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: string;
    }[];
    creditCardDebt: {
      cardName: string;
      issuer: string;
      currentBalance: number;
      creditLimit: number;
      interestRate: number;
      minimumPayment: number;
      actualPayment: number;
      paymentDueDate: string;
      gracePeriod: number;
      lateFees: number;
      annualFees: number;
      balanceTransferFee: number;
      cashAdvanceFee: number;
      rewardsProgram: string;
      priority: string;
    }[];
    studentLoanDebt: {
      loanName: string;
      servicer: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: string;
      repaymentPlan: string;
      forgivenessEligible: boolean;
      forgivenessProgram: string;
      forgivenessRequirements: string[];
      defermentEligible: boolean;
      forbearanceEligible: boolean;
      priority: string;
    }[];
    autoLoanDebt: {
      vehicle: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      vehicleValue: number;
      upsideDown: boolean;
      gapInsurance: boolean;
      gapInsuranceAmount: number;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: string;
    }[];
    personalLoanDebt: {
      loanName: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      purpose: string;
      secured: boolean;
      collateral: string;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: string;
    }[];
    businessLoanDebt: {
      loanName: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      businessName: string;
      businessType: string;
      secured: boolean;
      collateral: string;
      personalGuarantee: boolean;
      prepaymentPenalty: boolean;
      prepaymentPenaltyAmount: number;
      priority: string;
    }[];
    medicalDebt: {
      provider: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      serviceDate: string;
      serviceType: string;
      insuranceCoverage: number;
      negotiatedAmount: number;
      hardshipEligible: boolean;
      priority: string;
    }[];
    taxDebt: {
      taxYear: number;
      taxType: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      penaltyRate: number;
      monthlyPayment: number;
      paymentPlan: boolean;
      paymentPlanType: string;
      remainingTerm: number;
      priority: string;
    }[];
    otherDebt: {
      debtName: string;
      lender: string;
      originalAmount: number;
      currentBalance: number;
      interestRate: number;
      monthlyPayment: number;
      remainingTerm: number;
      type: string;
      purpose: string;
      secured: boolean;
      collateral: string;
      priority: string;
    }[];
    totalDebtSummary: {
      totalDebt: number;
      totalMonthlyPayments: number;
      averageInterestRate: number;
      debtToIncomeRatio: number;
      debtToAssetRatio: number;
      creditUtilization: number;
      totalInterestPaid: number;
      totalPrincipalPaid: number;
    };
    debtEfficiency: number;
  };
  
  // Asset Analysis
  assetAnalysis: {
    cashAssets: {
      account: string;
      institution: string;
      balance: number;
      interestRate: number;
      liquidity: string;
      emergencyFund: boolean;
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
    assetEfficiency: number;
  };
  
  // Goal Analysis
  goalAnalysis: {
    debtPayoffGoals: {
      debt: string;
      targetPayoffDate: string;
      targetAmount: number;
      priority: string;
      strategy: string;
      monthlyPayment: number;
      additionalPayment: number;
      goalGap: number;
      requiredSavings: number;
    }[];
    debtConsolidationGoals: {
      debtsToConsolidate: string[];
      consolidationAmount: number;
      targetInterestRate: number;
      targetTerm: number;
      monthlyPayment: number;
      savings: number;
      strategy: string;
      goalGap: number;
      requiredSavings: number;
    }[];
    creditScoreGoals: {
      currentScore: number;
      targetScore: number;
      timeframe: number;
      strategies: string[];
      priority: string;
      goalGap: number;
      requiredActions: string[];
    };
    financialFreedomGoals: {
      goal: string;
      targetDate: string;
      targetAmount: number;
      priority: string;
      description: string;
      goalGap: number;
      requiredSavings: number;
    }[];
    goalEfficiency: number;
  };
  
  // Strategy Analysis
  strategyAnalysis: {
    payoffStrategy: {
      strategy: string;
      description: string;
      advantages: string[];
      disadvantages: string[];
      recommendedOrder: string[];
      expectedPayoffTime: number;
      totalInterestPaid: number;
      totalSavings: number;
    };
    consolidationStrategy: {
      strategy: string;
      description: string;
      eligibleDebts: string[];
      consolidationAmount: number;
      targetInterestRate: number;
      targetTerm: number;
      monthlyPayment: number;
      totalSavings: number;
      risks: string[];
    };
    refinancingStrategy: {
      strategy: string;
      description: string;
      eligibleDebts: string[];
      currentTerms: string;
      proposedTerms: string;
      closingCosts: number;
      monthlySavings: number;
      breakEvenTime: number;
      totalSavings: number;
    };
    negotiationStrategy: {
      strategy: string;
      description: string;
      eligibleDebts: string[];
      negotiationTactics: string[];
      expectedOutcomes: string[];
      risks: string[];
    };
    budgetStrategy: {
      strategy: string;
      description: string;
      monthlyIncome: number;
      essentialExpenses: number;
      discretionaryExpenses: number;
      debtPayments: number;
      savings: number;
      emergencyFund: number;
    };
    strategyEfficiency: number;
  };
  
  // Credit Analysis
  creditAnalysis: {
    creditReports: {
      bureau: string;
      score: number;
      lastUpdated: string;
      factors: {
        factor: string;
        impact: string;
        description: string;
      }[];
      accounts: {
        account: string;
        type: string;
        balance: number;
        limit: number;
        paymentHistory: string;
        status: string;
      }[];
      inquiries: {
        date: string;
        creditor: string;
        type: string;
      }[];
      publicRecords: {
        type: string;
        date: string;
        amount: number;
        status: string;
      }[];
    }[];
    creditUtilization: {
      totalCreditLimit: number;
      totalBalance: number;
      utilizationRate: number;
      recommendedRate: number;
      improvementNeeded: boolean;
    };
    paymentHistory: {
      account: string;
      onTimePayments: number;
      latePayments: number;
      missedPayments: number;
      paymentPattern: string;
      lastLatePayment: string;
    }[];
    creditEfficiency: number;
  };
  
  // Cash Flow Analysis
  cashFlowAnalysis: {
    currentCashFlow: {
      income: number;
      expenses: number;
      debtPayments: number;
      discretionaryIncome: number;
      savings: number;
    };
    projectedCashFlow: {
      year: number;
      income: number;
      expenses: number;
      debtPayments: number;
      discretionaryIncome: number;
      savings: number;
    }[];
    debtFreeCashFlow: {
      year: number;
      income: number;
      expenses: number;
      debtPayments: number;
      discretionaryIncome: number;
      savings: number;
    }[];
    cashFlowGaps: {
      period: string;
      gap: number;
      solution: string;
    }[];
    cashFlowEfficiency: number;
  };
  
  // Debt Optimization Analysis
  debtOptimizationAnalysis: {
    currentDebtCost: number;
    optimizedDebtCost: number;
    potentialSavings: number;
    optimizationStrategies: {
      strategy: string;
      description: string;
      potentialSavings: number;
      implementation: string;
    }[];
    refinancingOpportunities: {
      debt: string;
      currentRate: number;
      newRate: number;
      monthlySavings: number;
      totalSavings: number;
      recommendation: string;
    }[];
    consolidationOpportunities: {
      debts: string[];
      consolidationAmount: number;
      newRate: number;
      monthlySavings: number;
      totalSavings: number;
      recommendation: string;
    }[];
    payoffOptimization: {
      strategy: string;
      payoffOrder: string[];
      totalInterestPaid: number;
      payoffTime: number;
      recommendation: string;
    };
    debtOptimizationEfficiency: number;
  };
  
  // Tax Optimization Analysis
  taxOptimizationAnalysis: {
    currentTaxLiability: number;
    debtRelatedDeductions: {
      deduction: string;
      amount: number;
      eligibility: boolean;
      recommendation: string;
    }[];
    mortgageInterestDeduction: {
      amount: number;
      taxSavings: number;
      eligibility: boolean;
      recommendation: string;
    };
    studentLoanInterestDeduction: {
      amount: number;
      taxSavings: number;
      eligibility: boolean;
      recommendation: string;
    };
    businessInterestDeduction: {
      amount: number;
      taxSavings: number;
      eligibility: boolean;
      recommendation: string;
    };
    taxOptimizationEfficiency: number;
  };
  
  // Credit Optimization Analysis
  creditOptimizationAnalysis: {
    currentCreditScore: number;
    targetCreditScore: number;
    scoreImprovement: number;
    creditFactors: {
      factor: string;
      currentImpact: string;
      improvementAction: string;
      potentialImprovement: number;
    }[];
    utilizationOptimization: {
      currentUtilization: number;
      targetUtilization: number;
      improvementNeeded: number;
      strategies: string[];
    }[];
    paymentHistoryOptimization: {
      currentHistory: string;
      improvementActions: string[];
      expectedImprovement: number;
    }[];
    creditMixOptimization: {
      currentMix: string[];
      recommendedMix: string[];
      improvementActions: string[];
    }[];
    creditOptimizationEfficiency: number;
  };
  
  // Sensitivity Analysis
  sensitivityAnalysis: {
    variable: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowDebtManagement: number;
    highDebtManagement: number;
    sensitivity: number;
  }[];
  
  // Monte Carlo Results
  monteCarloResults: {
    meanDebtFreedom: number;
    medianDebtFreedom: number;
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
  
  // Debt Management Planning Analysis
  debtManagementPlanningAnalysis: {
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
  
  // Debt Management Score
  debtManagementScore: {
    overallScore: number;
    componentScores: {
      personal: number;
      income: number;
      debt: number;
      assets: number;
      goals: number;
      strategy: number;
    };
    recommendation: 'excellent' | 'good' | 'fair' | 'poor' | 'needs_improvement';
  };
  
  // Historical Analysis
  historicalAnalysis: {
    historicalProgress: {
      date: string;
      totalDebt: number;
      debtManagementScore: number;
      creditScore: number;
    }[];
    historicalTrends: string[];
    yearOverYearChange: number;
  };
  
  // Business Impact
  businessImpact: {
    debtReduction: number;
    interestSavings: number;
    creditImprovement: number;
    efficiencyGain: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    debtAssessment: string;
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
    debtManagementScore: number;
    debtToIncomeRatio: number;
    debtToAssetRatio: number;
    creditUtilization: number;
    debtFreedomDate: number;
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
