export interface MortgageInputs {
  // Loan information
  loanInfo: {
    loanAmount: number;
    loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'jumbo' | 'conforming' | 'non-conforming';
    loanTerm: number; // Years
    interestRate: number;
    annualPercentageRate: number;
    loanPurpose: 'purchase' | 'refinance' | 'cash-out' | 'construction' | 'investment';
    propertyType: 'single-family' | 'condo' | 'townhouse' | 'multi-family' | 'commercial' | 'land';
    occupancyType: 'primary' | 'secondary' | 'investment';
  };
  
  // Property information
  propertyInfo: {
    propertyValue: number;
    purchasePrice: number;
    downPayment: number;
    downPaymentPercentage: number;
    closingCosts: number;
    propertyTaxes: number;
    homeownersInsurance: number;
    privateMortgageInsurance: number;
    homeownersAssociation: number;
    propertyLocation: {
      state: string;
      county: string;
      city: string;
      zipCode: string;
    };
    propertyAge: number;
    propertyCondition: 'excellent' | 'good' | 'fair' | 'poor';
  };
  
  // Borrower information
  borrowerInfo: {
    primaryBorrower: {
      income: number;
      creditScore: number;
      debtToIncomeRatio: number;
      employmentType: 'full-time' | 'part-time' | 'self-employed' | 'retired' | 'unemployed';
      employmentLength: number;
      bankruptcyHistory: boolean;
      foreclosureHistory: boolean;
    };
    coBorrower: {
      income: number;
      creditScore: number;
      debtToIncomeRatio: number;
      employmentType: 'full-time' | 'part-time' | 'self-employed' | 'retired' | 'unemployed';
      employmentLength: number;
    } | null;
    totalIncome: number;
    totalDebt: number;
    totalAssets: number;
    totalLiabilities: number;
  };
  
  // Payment information
  paymentInfo: {
    paymentFrequency: 'monthly' | 'bi-weekly' | 'weekly' | 'annual';
    paymentType: 'principal-interest' | 'interest-only' | 'balloon' | 'adjustable';
    escrowAccount: boolean;
    escrowAmount: number;
    additionalPayment: number;
    extraPaymentFrequency: 'monthly' | 'quarterly' | 'annually' | 'one-time';
    prepaymentPenalty: boolean;
    prepaymentPenaltyAmount: number;
  };
  
  // Rate information
  rateInfo: {
    rateType: 'fixed' | 'adjustable' | 'hybrid' | 'interest-only';
    initialRate: number;
    margin: number;
    index: 'libor' | 'prime' | 'treasury' | 'sofr' | 'custom';
    adjustmentPeriod: number;
    rateCap: {
      periodic: number;
      lifetime: number;
    };
    rateFloor: number;
    rateHistory: {
      date: Date;
      rate: number;
      indexValue: number;
    }[];
  };
  
  // Fees and costs
  feesAndCosts: {
    originationFee: number;
    applicationFee: number;
    appraisalFee: number;
    creditReportFee: number;
    titleInsurance: number;
    recordingFee: number;
    transferTax: number;
    surveyFee: number;
    pestInspection: number;
    homeInspection: number;
    floodCertification: number;
    taxServiceFee: number;
    underwritingFee: number;
    processingFee: number;
    otherFees: {
      feeName: string;
      amount: number;
    }[];
  };
  
  // Tax information
  taxInfo: {
    propertyTaxRate: number;
    propertyTaxAmount: number;
    taxAssessment: number;
    homesteadExemption: boolean;
    homesteadExemptionAmount: number;
    mortgageInterestDeduction: boolean;
    propertyTaxDeduction: boolean;
    pointsDeduction: boolean;
    taxBracket: number;
    stateTaxRate: number;
    localTaxRate: number;
  };
  
  // Insurance information
  insuranceInfo: {
    homeownersInsurance: {
      annualPremium: number;
      coverageAmount: number;
      deductible: number;
      policyType: 'ho1' | 'ho2' | 'ho3' | 'ho4' | 'ho5' | 'ho6' | 'ho8';
    };
    privateMortgageInsurance: {
      required: boolean;
      annualPremium: number;
      monthlyPremium: number;
      cancellationDate: Date;
      cancellationEquity: number;
    };
    floodInsurance: {
      required: boolean;
      annualPremium: number;
      coverageAmount: number;
      zone: string;
    };
    titleInsurance: {
      lenderPolicy: number;
      ownerPolicy: number;
      coverageAmount: number;
    };
  };
  
  // Refinance information
  refinanceInfo: {
    isRefinance: boolean;
    currentLoanBalance: number;
    currentInterestRate: number;
    currentPayment: number;
    refinanceCosts: number;
    breakEvenPeriod: number;
    refinanceSavings: number;
    refinancePurpose: 'lower-rate' | 'cash-out' | 'debt-consolidation' | 'term-change' | 'removal-pmi';
    cashOutAmount: number;
    newLoanAmount: number;
  };
  
  // Investment analysis
  investmentAnalysis: {
    investmentProperty: boolean;
    rentalIncome: number;
    vacancyRate: number;
    operatingExpenses: number;
    propertyManagementFee: number;
    maintenanceReserve: number;
    appreciationRate: number;
    capRate: number;
    cashOnCashReturn: number;
    totalReturn: number;
    investmentHorizon: number;
  };
  
  // Market conditions
  marketConditions: {
    marketType: 'buyers' | 'sellers' | 'balanced';
    homePriceIndex: number;
    priceTrend: 'increasing' | 'decreasing' | 'stable';
    inventoryLevel: 'low' | 'medium' | 'high';
    daysOnMarket: number;
    marketVolatility: number;
    interestRateTrend: 'increasing' | 'decreasing' | 'stable';
    economicOutlook: 'recession' | 'slowdown' | 'stable' | 'growth' | 'boom';
  };
  
  // Comparison scenarios
  comparisonScenarios: {
    scenarios: {
      scenarioName: string;
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
      downPayment: number;
      monthlyPayment: number;
      totalCost: number;
      savings: number;
    }[];
    comparisonPeriod: number;
    includeRefinance: boolean;
    includeInvestment: boolean;
  };
  
  // Analysis parameters
  analysisParameters: {
    analysisType: 'basic' | 'comprehensive' | 'investment' | 'refinance' | 'comparison';
    includeTaxAnalysis: boolean;
    includeInvestmentAnalysis: boolean;
    includeRefinanceAnalysis: boolean;
    includeSensitivityAnalysis: boolean;
    includeAmortizationSchedule: boolean;
    includePaymentSchedule: boolean;
    includeCostBreakdown: boolean;
    timeHorizon: number;
    inflationRate: number;
    discountRate: number;
  };
  
  // Reporting preferences
  reporting: {
    includeDetailedBreakdown: boolean;
    includeAmortizationTable: boolean;
    includePaymentSchedule: boolean;
    includeCostAnalysis: boolean;
    includeTaxAnalysis: boolean;
    includeInvestmentAnalysis: boolean;
    includeRefinanceAnalysis: boolean;
    includeComparisonAnalysis: boolean;
    includeSensitivityAnalysis: boolean;
    includeRecommendations: boolean;
    includeVisualizations: boolean;
  };
}

export interface MortgageResults {
  // Core mortgage calculations
  mortgageCalculations: {
    monthlyPayment: number;
    principalAndInterest: number;
    totalMonthlyPayment: number;
    annualPayment: number;
    totalPayments: number;
    totalInterest: number;
    totalCost: number;
    loanToValueRatio: number;
    debtToIncomeRatio: number;
    paymentToIncomeRatio: number;
  };
  
  // Amortization schedule
  amortizationSchedule: {
    payments: {
      paymentNumber: number;
      paymentDate: Date;
      beginningBalance: number;
      payment: number;
      principal: number;
      interest: number;
      endingBalance: number;
      cumulativeInterest: number;
      cumulativePrincipal: number;
    }[];
    summary: {
      totalPayments: number;
      totalPrincipal: number;
      totalInterest: number;
      averageMonthlyPayment: number;
      lastPaymentDate: Date;
    };
  };
  
  // Payment breakdown
  paymentBreakdown: {
    principalAndInterest: number;
    propertyTaxes: number;
    homeownersInsurance: number;
    privateMortgageInsurance: number;
    homeownersAssociation: number;
    escrowAmount: number;
    totalMonthlyPayment: number;
    paymentComponents: {
      component: string;
      amount: number;
      percentage: number;
    }[];
  };
  
  // Cost analysis
  costAnalysis: {
    totalLoanCost: number;
    totalInterestCost: number;
    totalFees: number;
    totalClosingCosts: number;
    totalPropertyCosts: number;
    costBreakdown: {
      category: string;
      amount: number;
      percentage: number;
    }[];
    costEfficiency: {
      efficiency: number;
      comparison: number;
      savings: number;
    };
  };
  
  // Tax analysis
  taxAnalysis: {
    annualInterestDeduction: number;
    annualPropertyTaxDeduction: number;
    annualPointsDeduction: number;
    totalTaxSavings: number;
    effectiveInterestRate: number;
    afterTaxCost: number;
    taxBenefits: {
      benefit: string;
      amount: number;
      description: string;
    }[];
  };
  
  // Investment analysis
  investmentAnalysis: {
    cashFlow: {
      monthlyRentalIncome: number;
      monthlyExpenses: number;
      monthlyCashFlow: number;
      annualCashFlow: number;
      cashOnCashReturn: number;
    };
    returns: {
      capRate: number;
      totalReturn: number;
      appreciationReturn: number;
      incomeReturn: number;
      internalRateOfReturn: number;
    };
    investmentMetrics: {
      metric: string;
      value: number;
      benchmark: number;
      performance: 'excellent' | 'good' | 'average' | 'poor';
    }[];
  };
  
  // Refinance analysis
  refinanceAnalysis: {
    currentLoan: {
      monthlyPayment: number;
      remainingBalance: number;
      remainingTerm: number;
      totalInterestRemaining: number;
    };
    newLoan: {
      monthlyPayment: number;
      totalCost: number;
      totalInterest: number;
      savings: number;
    };
    refinanceMetrics: {
      breakEvenPeriod: number;
      monthlySavings: number;
      totalSavings: number;
      paybackPeriod: number;
      roi: number;
    };
    refinanceRecommendation: {
      recommended: boolean;
      rationale: string;
      conditions: string[];
    };
  };
  
  // Comparison analysis
  comparisonAnalysis: {
    scenarios: {
      scenarioName: string;
      monthlyPayment: number;
      totalCost: number;
      totalInterest: number;
      savings: number;
      paybackPeriod: number;
      roi: number;
    }[];
    bestScenario: {
      scenario: string;
      rationale: string;
      advantages: string[];
      disadvantages: string[];
    };
    scenarioComparison: {
      scenario1: string;
      scenario2: string;
      paymentDifference: number;
      costDifference: number;
      savingsDifference: number;
    }[];
  };
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    interestRateSensitivity: {
      rate: number;
      monthlyPayment: number;
      totalCost: number;
      change: number;
    }[];
    downPaymentSensitivity: {
      downPayment: number;
      monthlyPayment: number;
      totalCost: number;
      pmiRequired: boolean;
    }[];
    termSensitivity: {
      term: number;
      monthlyPayment: number;
      totalCost: number;
      totalInterest: number;
    }[];
    criticalFactors: {
      factor: string;
      sensitivity: number;
      impact: number;
      recommendation: string;
    }[];
  };
  
  // Risk analysis
  riskAnalysis: {
    interestRateRisk: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    propertyValueRisk: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    incomeRisk: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    marketRisk: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Affordability analysis
  affordabilityAnalysis: {
    maximumLoanAmount: number;
    maximumHomePrice: number;
    maximumMonthlyPayment: number;
    affordabilityFactors: {
      factor: string;
      impact: number;
      recommendation: string;
    }[];
    affordabilityScore: number;
    affordabilityLevel: 'excellent' | 'good' | 'marginal' | 'poor';
  };
  
  // Market analysis
  marketAnalysis: {
    marketConditions: {
      condition: string;
      impact: 'positive' | 'negative' | 'neutral';
      description: string;
    }[];
    priceTrends: {
      trend: string;
      direction: 'increasing' | 'decreasing' | 'stable';
      impact: number;
    }[];
    marketRecommendations: {
      recommendation: string;
      rationale: string;
      priority: 'high' | 'medium' | 'low';
    }[];
  };
  
  // Mortgage efficiency
  mortgageEfficiency: {
    overallEfficiency: number;
    efficiencyByComponent: {
      component: string;
      efficiency: number;
      improvement: number;
      potential: number;
    }[];
    efficiencyComparison: {
      benchmark: string;
      efficiency: number;
      difference: number;
      performance: 'above' | 'below' | 'at';
    }[];
  };
  
  // Optimization opportunities
  optimizationOpportunities: {
    paymentOptimization: {
      opportunity: string;
      currentPayment: number;
      optimizedPayment: number;
      savings: number;
      implementation: string;
      timeline: string;
    }[];
    costOptimization: {
      opportunity: string;
      currentCost: number;
      optimizedCost: number;
      savings: number;
      implementation: string;
      timeline: string;
    }[];
    termOptimization: {
      opportunity: string;
      currentTerm: number;
      optimizedTerm: number;
      impact: number;
      implementation: string;
      timeline: string;
    }[];
  };
  
  // Business impact
  businessImpact: {
    cashFlowImpact: {
      currentCashFlow: number;
      projectedCashFlow: number;
      impact: number;
      timeline: string;
    };
    investmentImpact: {
      currentReturn: number;
      projectedReturn: number;
      impact: number;
      timeline: string;
    };
    taxImpact: {
      currentTaxSavings: number;
      projectedTaxSavings: number;
      impact: number;
      timeline: string;
    };
  };
  
  // Comprehensive report
  report: string;
  
  // Executive summary
  executiveSummary: {
    monthlyPayment: number;
    totalCost: number;
    totalInterest: number;
    keyFindings: string[];
    criticalFactors: string[];
    recommendations: string[];
    riskLevel: string;
    nextSteps: string[];
  };
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    implementation: string;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
    cost: number;
  }[];
}
