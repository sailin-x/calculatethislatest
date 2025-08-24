export interface MortgageCalculatorInputs {
  // Mortgage Information
  mortgageInfo: {
    // Mortgage Details
    mortgageDetails: {
      mortgageType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'conforming' | 'non_conforming' | 'adjustable_rate' | 'fixed_rate' | 'interest_only' | 'balloon' | 'reverse' | 'other';
      loanPurpose: 'purchase' | 'refinance' | 'cash_out_refinance' | 'rate_term_refinance' | 'construction' | 'home_improvement' | 'debt_consolidation' | 'other';
      propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'manufactured' | 'investment' | 'vacation' | 'other';
      occupancyType: 'primary_residence' | 'secondary_residence' | 'investment_property' | 'vacation_home';
      mortgageDescription: string;
    };
    
    // Loan Parameters
    loanParameters: {
      loanAmount: number;
      purchasePrice: number;
      downPayment: number;
      downPaymentPercentage: number;
      loanToValueRatio: number;
      combinedLoanToValueRatio: number;
      interestRate: number;
      annualPercentageRate: number;
      loanTerm: number; // in years
      originationDate: string;
      firstPaymentDate: string;
      maturityDate: string;
      paymentFrequency: 'monthly' | 'bi_weekly' | 'weekly' | 'annually';
    };
  };
  
  // Borrower Information
  borrowerInfo: {
    // Primary Borrower
    primaryBorrower: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired' | 'student' | 'other';
      income: number;
      incomeType: 'salary' | 'hourly' | 'commission' | 'bonus' | 'overtime' | 'self_employment' | 'investment' | 'pension' | 'social_security' | 'other';
      creditScore: number;
      creditRating: 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor';
      debtToIncomeRatio: number;
      housingExpenseRatio: number;
    };
    
    // Co-Borrower
    coBorrower: {
      firstName: string;
      lastName: string;
      dateOfBirth: string;
      age: number;
      employmentStatus: 'employed' | 'self_employed' | 'unemployed' | 'retired' | 'student' | 'other';
      income: number;
      incomeType: 'salary' | 'hourly' | 'commission' | 'bonus' | 'overtime' | 'self_employment' | 'investment' | 'pension' | 'social_security' | 'other';
      creditScore: number;
      creditRating: 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor';
      debtToIncomeRatio: number;
      housingExpenseRatio: number;
    };
    
    // Combined Borrower Information
    combinedBorrowerInfo: {
      totalIncome: number;
      totalMonthlyDebt: number;
      combinedDebtToIncomeRatio: number;
      combinedHousingExpenseRatio: number;
      averageCreditScore: number;
      lowestCreditScore: number;
    };
  };
  
  // Property Information
  propertyInfo: {
    // Property Details
    propertyDetails: {
      propertyAddress: string;
      propertyCity: string;
      propertyState: string;
      propertyZipCode: string;
      propertyCounty: string;
      propertyType: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'manufactured' | 'investment' | 'vacation' | 'other';
      yearBuilt: number;
      squareFootage: number;
      lotSize: number;
      bedrooms: number;
      bathrooms: number;
      propertyDescription: string;
    };
    
    // Property Value
    propertyValue: {
      purchasePrice: number;
      appraisedValue: number;
      estimatedValue: number;
      marketValue: number;
      valueAppreciation: number;
      valueDepreciation: number;
    };
    
    // Property Taxes and Insurance
    propertyTaxesInsurance: {
      annualPropertyTaxes: number;
      monthlyPropertyTaxes: number;
      annualHomeownersInsurance: number;
      monthlyHomeownersInsurance: number;
      annualPrivateMortgageInsurance: number;
      monthlyPrivateMortgageInsurance: number;
      annualFloodInsurance: number;
      monthlyFloodInsurance: number;
      annualHoaFees: number;
      monthlyHoaFees: number;
    };
  };
  
  // Payment Information
  paymentInfo: {
    // Payment Breakdown
    paymentBreakdown: {
      principalAndInterest: number;
      propertyTaxes: number;
      homeownersInsurance: number;
      privateMortgageInsurance: number;
      floodInsurance: number;
      hoaFees: number;
      totalMonthlyPayment: number;
      totalAnnualPayment: number;
    };
    
    // Payment Schedule
    paymentSchedule: {
      paymentNumber: number;
      paymentDate: string;
      beginningBalance: number;
      payment: number;
      principal: number;
      interest: number;
      endingBalance: number;
      totalInterestPaid: number;
      totalPrincipalPaid: number;
    }[];
    
    // Amortization Schedule
    amortizationSchedule: {
      year: number;
      beginningBalance: number;
      totalPayments: number;
      totalPrincipal: number;
      totalInterest: number;
      endingBalance: number;
      interestPaid: number;
      principalPaid: number;
    }[];
  };
  
  // Interest Rate Information
  interestRateInfo: {
    // Rate Details
    rateDetails: {
      nominalRate: number;
      effectiveRate: number;
      annualPercentageRate: number;
      rateType: 'fixed' | 'adjustable' | 'hybrid' | 'interest_only' | 'balloon';
      rateLockPeriod: number; // in days
      rateLockExpiration: string;
    };
    
    // Adjustable Rate Mortgage
    adjustableRateMortgage: {
      initialRate: number;
      adjustmentPeriod: number; // in months
      index: 'libor' | 'prime' | 'treasury' | 'sofr' | 'other';
      margin: number;
      capStructure: {
        initialCap: number;
        periodicCap: number;
        lifetimeCap: number;
      };
      nextAdjustmentDate: string;
      projectedRate: number;
    };
    
    // Rate Comparison
    rateComparison: {
      currentMarketRate: number;
      rateDifference: number;
      rateCompetitiveness: number;
      refinanceOpportunity: boolean;
      refinanceSavings: number;
    };
  };
  
  // Fees and Costs
  feesCosts: {
    // Origination Fees
    originationFees: {
      applicationFee: number;
      originationFee: number;
      underwritingFee: number;
      processingFee: number;
      creditReportFee: number;
      appraisalFee: number;
      surveyFee: number;
      titleSearchFee: number;
      titleInsuranceFee: number;
      recordingFee: number;
      transferTax: number;
      otherFees: {
        fee: string;
        amount: number;
        description: string;
      }[];
      totalOriginationFees: number;
    };
    
    // Closing Costs
    closingCosts: {
      lenderFees: number;
      thirdPartyFees: number;
      prepaidItems: number;
      escrowDeposits: number;
      totalClosingCosts: number;
      closingCostPercentage: number;
    };
    
    // Ongoing Costs
    ongoingCosts: {
      monthlyPayment: number;
      annualPayment: number;
      totalInterest: number;
      totalCost: number;
      costBreakdown: {
        component: string;
        amount: number;
        percentage: number;
      }[];
    };
  };
  
  // Tax Information
  taxInfo: {
    // Tax Deductions
    taxDeductions: {
      mortgageInterestDeduction: number;
      propertyTaxDeduction: number;
      pointsDeduction: number;
      totalDeductions: number;
      taxSavings: number;
      effectiveInterestRate: number;
    };
    
    // Tax Implications
    taxImplications: {
      marginalTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
      afterTaxCost: number;
      taxEfficiency: number;
    };
    
    // Tax Benefits
    taxBenefits: {
      annualTaxSavings: number;
      totalTaxSavings: number;
      effectiveRate: number;
      benefitBreakdown: {
        benefit: string;
        amount: number;
        percentage: number;
      }[];
    };
  };
  
  // Risk Analysis
  riskAnalysis: {
    // Interest Rate Risk
    interestRateRisk: {
      rateSensitivity: number;
      paymentIncrease: number;
      affordabilityRisk: number;
      refinanceRisk: number;
      rateRisk: number;
    };
    
    // Credit Risk
    creditRisk: {
      creditScore: number;
      paymentHistory: number;
      debtToIncomeRatio: number;
      creditRisk: number;
      defaultProbability: number;
    };
    
    // Property Risk
    propertyRisk: {
      propertyValueRisk: number;
      marketRisk: number;
      locationRisk: number;
      propertyRisk: number;
      equityRisk: number;
    };
    
    // Liquidity Risk
    liquidityRisk: {
      emergencyFunds: number;
      monthlySavings: number;
      liquidityRatio: number;
      liquidityRisk: number;
      financialFlexibility: number;
    };
    
    // Total Risk
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    // Alternative Loans
    alternativeLoans: {
      loan: string;
      loanAmount: number;
      interestRate: number;
      monthlyPayment: number;
      totalCost: number;
      comparison: number;
    }[];
    
    // Market Comparison
    marketComparison: {
      averageRate: number;
      averagePayment: number;
      averageCost: number;
      marketPosition: number;
      competitiveness: number;
    };
    
    // Rent vs Buy
    rentVsBuy: {
      monthlyRent: number;
      annualRent: number;
      rentIncrease: number;
      totalRentCost: number;
      mortgageAdvantage: number;
      breakEvenPeriod: number;
    };
  };
  
  // Scenario Analysis
  scenarioAnalysis: {
    // Interest Rate Scenarios
    interestRateScenarios: {
      scenario: string;
      interestRate: number;
      probability: number;
      monthlyPayment: number;
      totalCost: number;
      affordability: number;
    }[];
    
    // Income Scenarios
    incomeScenarios: {
      scenario: string;
      income: number;
      probability: number;
      debtToIncomeRatio: number;
      affordability: number;
      riskLevel: string;
    }[];
    
    // Property Value Scenarios
    propertyValueScenarios: {
      scenario: string;
      propertyValue: number;
      probability: number;
      equity: number;
      loanToValueRatio: number;
      refinanceOpportunity: boolean;
    }[];
    
    // Payment Scenarios
    paymentScenarios: {
      scenario: string;
      extraPayment: number;
      probability: number;
      payoffDate: string;
      interestSavings: number;
      totalSavings: number;
    }[];
  };
  
  // Monte Carlo Simulation
  monteCarloSimulations: number;
  monteCarloTimeSteps: number;
  includeInterestRateVolatility: boolean;
  includePropertyValueVolatility: boolean;
  includeIncomeVolatility: boolean;
  
  // Analysis Parameters
  analysisPeriod: number; // in years
  inflationRate: number;
  propertyAppreciation: number;
  incomeGrowth: number;
  includeTaxes: boolean;
  includeFees: boolean;
  
  // Calculation Options
  calculationOptions: {
    includePaymentAnalysis: boolean;
    includeAmortizationAnalysis: boolean;
    includeTaxAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeComparisonAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeMonteCarlo: boolean;
  };
  
  // Historical Analysis
  historicalData: {
    year: number;
    interestRate: number;
    propertyValue: number;
    monthlyPayment: number;
    totalInterest: number;
    remainingBalance: number;
    equity: number;
  }[];
  
  // Reporting Preferences
  includePaymentAnalysis: boolean;
  includeAmortizationAnalysis: boolean;
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

export interface MortgageCalculatorResults {
  // Core Mortgage Metrics
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  payoffDate: string;
  equity: number;
  
  // Mortgage Analysis
  mortgageAnalysis: {
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    payoffDate: string;
    equity: number;
    mortgageBreakdown: {
      component: string;
      value: number;
      contribution: number;
    }[];
    mortgageEfficiency: number;
  };
  
  // Payment Analysis
  paymentAnalysis: {
    paymentBreakdown: {
      principalAndInterest: number;
      propertyTaxes: number;
      homeownersInsurance: number;
      privateMortgageInsurance: number;
      floodInsurance: number;
      hoaFees: number;
      totalMonthlyPayment: number;
      totalAnnualPayment: number;
    };
    paymentSchedule: {
      paymentNumber: number;
      paymentDate: string;
      beginningBalance: number;
      payment: number;
      principal: number;
      interest: number;
      endingBalance: number;
      totalInterestPaid: number;
      totalPrincipalPaid: number;
    }[];
    amortizationSchedule: {
      year: number;
      beginningBalance: number;
      totalPayments: number;
      totalPrincipal: number;
      totalInterest: number;
      endingBalance: number;
      interestPaid: number;
      principalPaid: number;
    }[];
    paymentEfficiency: number;
  };
  
  // Interest Rate Analysis
  interestRateAnalysis: {
    rateDetails: {
      nominalRate: number;
      effectiveRate: number;
      annualPercentageRate: number;
      rateType: string;
      rateLockPeriod: number;
      rateLockExpiration: string;
    };
    adjustableRateMortgage: {
      initialRate: number;
      adjustmentPeriod: number;
      index: string;
      margin: number;
      capStructure: {
        initialCap: number;
        periodicCap: number;
        lifetimeCap: number;
      };
      nextAdjustmentDate: string;
      projectedRate: number;
    };
    rateComparison: {
      currentMarketRate: number;
      rateDifference: number;
      rateCompetitiveness: number;
      refinanceOpportunity: boolean;
      refinanceSavings: number;
    };
    rateEfficiency: number;
  };
  
  // Fee Analysis
  feeAnalysis: {
    originationFees: {
      applicationFee: number;
      originationFee: number;
      underwritingFee: number;
      processingFee: number;
      creditReportFee: number;
      appraisalFee: number;
      surveyFee: number;
      titleSearchFee: number;
      titleInsuranceFee: number;
      recordingFee: number;
      transferTax: number;
      otherFees: {
        fee: string;
        amount: number;
        description: string;
      }[];
      totalOriginationFees: number;
    };
    closingCosts: {
      lenderFees: number;
      thirdPartyFees: number;
      prepaidItems: number;
      escrowDeposits: number;
      totalClosingCosts: number;
      closingCostPercentage: number;
    };
    ongoingCosts: {
      monthlyPayment: number;
      annualPayment: number;
      totalInterest: number;
      totalCost: number;
      costBreakdown: {
        component: string;
        amount: number;
        percentage: number;
      }[];
    };
    feeEfficiency: number;
  };
  
  // Tax Analysis
  taxAnalysis: {
    taxDeductions: {
      mortgageInterestDeduction: number;
      propertyTaxDeduction: number;
      pointsDeduction: number;
      totalDeductions: number;
      taxSavings: number;
      effectiveInterestRate: number;
    };
    taxImplications: {
      marginalTaxRate: number;
      stateTaxRate: number;
      localTaxRate: number;
      totalTaxRate: number;
      afterTaxCost: number;
      taxEfficiency: number;
    };
    taxBenefits: {
      annualTaxSavings: number;
      totalTaxSavings: number;
      effectiveRate: number;
      benefitBreakdown: {
        benefit: string;
        amount: number;
        percentage: number;
      }[];
    };
    taxEfficiency: number;
  };
  
  // Risk Analysis
  riskAnalysis: {
    interestRateRisk: {
      rateSensitivity: number;
      paymentIncrease: number;
      affordabilityRisk: number;
      refinanceRisk: number;
      rateRisk: number;
    };
    creditRisk: {
      creditScore: number;
      paymentHistory: number;
      debtToIncomeRatio: number;
      creditRisk: number;
      defaultProbability: number;
    };
    propertyRisk: {
      propertyValueRisk: number;
      marketRisk: number;
      locationRisk: number;
      propertyRisk: number;
      equityRisk: number;
    };
    liquidityRisk: {
      emergencyFunds: number;
      monthlySavings: number;
      liquidityRatio: number;
      liquidityRisk: number;
      financialFlexibility: number;
    };
    totalRisk: number;
    riskEfficiency: number;
  };
  
  // Comparison Analysis
  comparisonAnalysis: {
    alternativeLoans: {
      loan: string;
      loanAmount: number;
      interestRate: number;
      monthlyPayment: number;
      totalCost: number;
      comparison: number;
    }[];
    marketComparison: {
      averageRate: number;
      averagePayment: number;
      averageCost: number;
      marketPosition: number;
      competitiveness: number;
    };
    rentVsBuy: {
      monthlyRent: number;
      annualRent: number;
      rentIncrease: number;
      totalRentCost: number;
      mortgageAdvantage: number;
      breakEvenPeriod: number;
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
    monthlyPayment: number;
    totalCost: number;
    payoffDate: string;
    equity: number;
  }[];
  
  // Peer Comparison
  peerComparison: {
    peerComparison: {
      peer: string;
      loanAmount: number;
      interestRate: number;
      monthlyPayment: number;
      totalCost: number;
      comparison: number;
    }[];
    marketComparison: {
      metric: string;
      mortgage: number;
      market: number;
      difference: number;
    }[];
  };
  
  // Mortgage Score
  mortgageScore: {
    overallScore: number;
    componentScores: {
      payment: number;
      rate: number;
      fees: number;
      tax: number;
      risk: number;
      comparison: number;
    };
    recommendation: 'approve' | 'approve_with_conditions' | 'deny' | 'review';
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
    historicalInterestRate: number;
    historicalPropertyValue: number;
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
    interestSavings: number;
    taxSavings: number;
    equityBuilding: number;
    overallBenefit: number;
  };
  
  // Comprehensive Report
  comprehensiveReport: {
    executiveSummary: string;
    keyFindings: string[];
    mortgageAssessment: string;
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
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
    payoffDate: string;
    recommendation: 'approve' | 'approve_with_conditions' | 'deny' | 'review';
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
