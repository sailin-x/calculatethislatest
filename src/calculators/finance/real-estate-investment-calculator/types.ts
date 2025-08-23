export interface RealEstateInvestmentInputs {
  // Property information
  propertyInfo: {
    propertyId: string;
    propertyName: string;
    propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'commercial' | 'industrial' | 'retail' | 'office' | 'land' | 'mixed-use';
    propertyAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    propertyDetails: {
      squareFootage: number;
      lotSize: number;
      bedrooms: number;
      bathrooms: number;
      yearBuilt: number;
      condition: 'excellent' | 'good' | 'fair' | 'poor';
      amenities: string[];
    };
    propertyValue: {
      purchasePrice: number;
      currentValue: number;
      appraisedValue: number;
      marketValue: number;
      landValue: number;
      buildingValue: number;
    };
  };
  
  // Financial information
  financialInfo: {
    purchaseDetails: {
      purchasePrice: number;
      downPayment: number;
      downPaymentPercentage: number;
      loanAmount: number;
      loanType: 'conventional' | 'fha' | 'va' | 'usda' | 'commercial' | 'hard-money' | 'private' | 'cash';
      interestRate: number;
      loanTerm: number;
      monthlyPayment: number;
      closingCosts: number;
      totalInvestment: number;
    };
    operatingExpenses: {
      propertyTaxes: number;
      insurance: number;
      utilities: number;
      maintenance: number;
      propertyManagement: number;
      hoaFees: number;
      landscaping: number;
      pestControl: number;
      security: number;
      otherExpenses: number;
      totalOperatingExpenses: number;
    };
    income: {
      grossRentalIncome: number;
      otherIncome: number;
      totalIncome: number;
      vacancyRate: number;
      effectiveGrossIncome: number;
    };
  };
  
  // Market analysis
  marketAnalysis: {
    marketData: {
      marketType: 'buyers' | 'sellers' | 'balanced';
      averageDaysOnMarket: number;
      pricePerSquareFoot: number;
      rentPerSquareFoot: number;
      capRate: number;
      priceToRentRatio: number;
      grossRentMultiplier: number;
    };
    comparableProperties: {
      compId: string;
      address: string;
      salePrice: number;
      saleDate: Date;
      squareFootage: number;
      bedrooms: number;
      bathrooms: number;
      pricePerSquareFoot: number;
    }[];
    marketTrends: {
      priceTrend: 'increasing' | 'decreasing' | 'stable';
      rentTrend: 'increasing' | 'decreasing' | 'stable';
      appreciationRate: number;
      rentGrowthRate: number;
    };
  };
  
  // Investment analysis
  investmentAnalysis: {
    investmentType: 'buy-and-hold' | 'fix-and-flip' | 'rental' | 'commercial' | 'land-development' | 'reits' | 'syndication';
    investmentStrategy: 'cash-flow' | 'appreciation' | 'tax-benefits' | 'diversification' | 'leverage';
    investmentHorizon: number; // Years
    exitStrategy: 'sell' | 'refinance' | '1031-exchange' | 'hold' | 'syndicate';
    targetReturn: number;
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  };
  
  // Cash flow analysis
  cashFlowAnalysis: {
    monthlyCashFlow: {
      rentalIncome: number;
      otherIncome: number;
      totalIncome: number;
      mortgagePayment: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      cashFlow: number;
    };
    annualCashFlow: {
      grossRentalIncome: number;
      vacancyLoss: number;
      effectiveGrossIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
      cashOnCashReturn: number;
    };
    cashFlowProjections: {
      year: number;
      rentalIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
      cumulativeCashFlow: number;
    }[];
  };
  
  // Return metrics
  returnMetrics: {
    cashOnCashReturn: number;
    capRate: number;
    totalReturn: number;
    internalRateOfReturn: number;
    netPresentValue: number;
    paybackPeriod: number;
    grossRentMultiplier: number;
    priceToRentRatio: number;
    returnOnInvestment: number;
    returnOnEquity: number;
  };
  
  // Tax analysis
  taxAnalysis: {
    taxStatus: 'individual' | 'llc' | 'corporation' | 'partnership' | 'trust';
    taxBracket: number;
    depreciationMethod: 'straight-line' | 'accelerated' | 'bonus';
    depreciationPeriod: number;
    annualDepreciation: number;
    taxBenefits: {
      depreciationDeduction: number;
      mortgageInterestDeduction: number;
      propertyTaxDeduction: number;
      operatingExpenseDeduction: number;
      totalTaxBenefits: number;
    };
    afterTaxCashFlow: number;
    taxEfficiency: number;
  };
  
  // Financing analysis
  financingAnalysis: {
    loanDetails: {
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
      monthlyPayment: number;
      annualPayment: number;
      totalInterest: number;
      amortizationSchedule: {
        paymentNumber: number;
        payment: number;
        principal: number;
        interest: number;
        remainingBalance: number;
      }[];
    };
    refinancing: {
      currentLoanBalance: number;
      refinanceRate: number;
      refinanceCosts: number;
      newMonthlyPayment: number;
      monthlySavings: number;
      breakEvenPeriod: number;
      refinanceSavings: number;
    };
    leverageAnalysis: {
      leverageRatio: number;
      debtToEquity: number;
      debtServiceCoverageRatio: number;
      leverageImpact: number;
    };
  };
  
  // Property management
  propertyManagement: {
    managementType: 'self-managed' | 'professional' | 'hybrid';
    managementFee: number;
    managementServices: string[];
    tenantScreening: {
      creditCheck: boolean;
      backgroundCheck: boolean;
      incomeVerification: boolean;
      rentalHistory: boolean;
    };
    leaseTerms: {
      leaseLength: number;
      rentIncrease: number;
      securityDeposit: number;
      lateFees: number;
    };
    maintenancePlan: {
      preventiveMaintenance: number;
      emergencyFund: number;
      reserveFund: number;
      totalMaintenanceBudget: number;
    };
  };
  
  // Market timing
  marketTiming: {
    marketCycle: 'recovery' | 'expansion' | 'peak' | 'contraction' | 'trough';
    marketTiming: 'buy' | 'sell' | 'hold' | 'wait';
    marketIndicators: {
      inventoryLevel: 'low' | 'medium' | 'high';
      daysOnMarket: number;
      priceTrend: 'increasing' | 'decreasing' | 'stable';
      rentTrend: 'increasing' | 'decreasing' | 'stable';
      interestRateTrend: 'increasing' | 'decreasing' | 'stable';
    };
    optimalTiming: {
      bestTimeToBuy: string;
      bestTimeToSell: string;
      holdingPeriod: number;
    };
  };
  
  // Risk analysis
  riskAnalysis: {
    marketRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    propertyRisks: {
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
    operationalRisks: {
      risk: string;
      probability: number;
      impact: number;
      mitigation: string;
    }[];
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Scenario analysis
  scenarioAnalysis: {
    scenarios: {
      scenarioName: string;
      scenarioType: 'optimistic' | 'pessimistic' | 'most-likely' | 'stress-test' | 'custom';
      probability: number;
      assumptions: {
        assumption: string;
        value: number;
        description: string;
      }[];
      cashFlow: number;
      return: number;
      risk: number;
    }[];
    stressTests: {
      testName: string;
      vacancyRate: number;
      rentDecrease: number;
      expenseIncrease: number;
      interestRateIncrease: number;
      impact: number;
    }[];
  };
  
  // Comparable analysis
  comparableAnalysis: {
    salesComparables: {
      compId: string;
      address: string;
      salePrice: number;
      saleDate: Date;
      squareFootage: number;
      pricePerSquareFoot: number;
      adjustments: {
        adjustment: string;
        amount: number;
        adjustedPrice: number;
      }[];
    }[];
    rentalComparables: {
      compId: string;
      address: string;
      rentAmount: number;
      squareFootage: number;
      rentPerSquareFoot: number;
      adjustments: {
        adjustment: string;
        amount: number;
        adjustedRent: number;
      }[];
    }[];
  };
  
  // Exit strategy
  exitStrategy: {
    exitOptions: {
      option: string;
      timeline: number;
      expectedValue: number;
      costs: number;
      netProceeds: number;
      return: number;
    }[];
    optimalExit: {
      strategy: string;
      timeline: number;
      expectedReturn: number;
      rationale: string;
    };
  };
  
  // Analysis parameters
  analysisParameters: {
    analysisType: 'basic' | 'comprehensive' | 'investment' | 'comparison' | 'custom';
    includeTaxAnalysis: boolean;
    includeFinancingAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeComparableAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeExitStrategy: boolean;
    timeHorizon: number;
    discountRate: number;
    inflationRate: number;
  };
  
  // Reporting preferences
  reporting: {
    includeDetailedBreakdown: boolean;
    includeCashFlowAnalysis: boolean;
    includeReturnMetrics: boolean;
    includeTaxAnalysis: boolean;
    includeFinancingAnalysis: boolean;
    includeScenarioAnalysis: boolean;
    includeComparableAnalysis: boolean;
    includeRiskAnalysis: boolean;
    includeExitStrategy: boolean;
    includeVisualizations: boolean;
    includeRecommendations: boolean;
  };
}

export interface RealEstateInvestmentResults {
  // Core investment metrics
  investmentMetrics: {
    totalInvestment: number;
    downPayment: number;
    loanAmount: number;
    monthlyPayment: number;
    annualPayment: number;
    totalInterest: number;
    cashOnCashReturn: number;
    capRate: number;
    totalReturn: number;
    internalRateOfReturn: number;
    netPresentValue: number;
    paybackPeriod: number;
  };
  
  // Cash flow analysis
  cashFlowAnalysis: {
    monthlyCashFlow: {
      rentalIncome: number;
      otherIncome: number;
      totalIncome: number;
      vacancyLoss: number;
      effectiveGrossIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
    };
    annualCashFlow: {
      grossRentalIncome: number;
      vacancyLoss: number;
      effectiveGrossIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
      cashOnCashReturn: number;
    };
    cashFlowProjections: {
      year: number;
      rentalIncome: number;
      operatingExpenses: number;
      netOperatingIncome: number;
      debtService: number;
      cashFlow: number;
      cumulativeCashFlow: number;
      equityBuild: number;
    }[];
  };
  
  // Return analysis
  returnAnalysis: {
    cashOnCashReturn: number;
    capRate: number;
    totalReturn: number;
    internalRateOfReturn: number;
    netPresentValue: number;
    paybackPeriod: number;
    grossRentMultiplier: number;
    priceToRentRatio: number;
    returnOnInvestment: number;
    returnOnEquity: number;
    appreciationReturn: number;
    incomeReturn: number;
    totalReturn: number;
  };
  
  // Tax analysis
  taxAnalysis: {
    annualDepreciation: number;
    taxBenefits: {
      depreciationDeduction: number;
      mortgageInterestDeduction: number;
      propertyTaxDeduction: number;
      operatingExpenseDeduction: number;
      totalTaxBenefits: number;
    };
    afterTaxCashFlow: number;
    taxEfficiency: number;
    effectiveTaxRate: number;
    taxSavings: number;
  };
  
  // Financing analysis
  financingAnalysis: {
    loanDetails: {
      loanAmount: number;
      interestRate: number;
      loanTerm: number;
      monthlyPayment: number;
      annualPayment: number;
      totalInterest: number;
      amortizationSchedule: {
        paymentNumber: number;
        payment: number;
        principal: number;
        interest: number;
        remainingBalance: number;
      }[];
    };
    refinancing: {
      currentLoanBalance: number;
      refinanceRate: number;
      refinanceCosts: number;
      newMonthlyPayment: number;
      monthlySavings: number;
      breakEvenPeriod: number;
      refinanceSavings: number;
    };
    leverageAnalysis: {
      leverageRatio: number;
      debtToEquity: number;
      debtServiceCoverageRatio: number;
      leverageImpact: number;
    };
  };
  
  // Market analysis
  marketAnalysis: {
    marketData: {
      marketType: string;
      averageDaysOnMarket: number;
      pricePerSquareFoot: number;
      rentPerSquareFoot: number;
      capRate: number;
      priceToRentRatio: number;
      grossRentMultiplier: number;
    };
    marketTrends: {
      priceTrend: string;
      rentTrend: string;
      appreciationRate: number;
      rentGrowthRate: number;
    };
    marketPosition: {
      position: string;
      advantage: number;
      disadvantage: number;
    };
  };
  
  // Comparable analysis
  comparableAnalysis: {
    salesComparables: {
      compId: string;
      address: string;
      salePrice: number;
      adjustedPrice: number;
      pricePerSquareFoot: number;
      comparison: string;
    }[];
    rentalComparables: {
      compId: string;
      address: string;
      rentAmount: number;
      adjustedRent: number;
      rentPerSquareFoot: number;
      comparison: string;
    }[];
    marketValue: {
      estimatedValue: number;
      confidence: number;
      range: {
        low: number;
        high: number;
      };
    };
  };
  
  // Risk analysis
  riskAnalysis: {
    marketRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    propertyRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    financialRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    operationalRisks: {
      risk: string;
      probability: number;
      impact: number;
      riskScore: number;
      mitigation: string;
    }[];
    overallRiskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Scenario analysis
  scenarioAnalysis: {
    scenarios: {
      scenarioName: string;
      scenarioType: string;
      probability: number;
      cashFlow: number;
      return: number;
      risk: number;
      assumptions: {
        assumption: string;
        value: number;
        description: string;
      }[];
    }[];
    stressTests: {
      testName: string;
      vacancyRate: number;
      rentDecrease: number;
      expenseIncrease: number;
      interestRateIncrease: number;
      impact: number;
      risk: number;
    }[];
    scenarioComparison: {
      scenario1: string;
      scenario2: string;
      cashFlowDifference: number;
      returnDifference: number;
      riskDifference: number;
    }[];
  };
  
  // Exit strategy
  exitStrategy: {
    exitOptions: {
      option: string;
      timeline: number;
      expectedValue: number;
      costs: number;
      netProceeds: number;
      return: number;
      risk: number;
    }[];
    optimalExit: {
      strategy: string;
      timeline: number;
      expectedReturn: number;
      rationale: string;
      conditions: string[];
    };
  };
  
  // Investment efficiency
  investmentEfficiency: {
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
    cashFlowOptimization: {
      opportunity: string;
      currentCashFlow: number;
      potentialCashFlow: number;
      improvement: number;
      implementation: string;
      timeline: string;
    }[];
    returnOptimization: {
      opportunity: string;
      currentReturn: number;
      potentialReturn: number;
      improvement: number;
      implementation: string;
      timeline: string;
    }[];
    riskOptimization: {
      opportunity: string;
      currentRisk: number;
      potentialRisk: number;
      improvement: number;
      implementation: string;
      timeline: string;
    }[];
  };
  
  // Business impact
  businessImpact: {
    cashFlowImpact: {
      currentCashFlow: number;
      potentialCashFlow: number;
      cashFlowOpportunity: number;
      impact: number;
    };
    returnImpact: {
      currentReturn: number;
      potentialReturn: number;
      returnOpportunity: number;
      impact: number;
    };
    riskImpact: {
      currentRisk: number;
      potentialRisk: number;
      riskOpportunity: number;
      impact: number;
    };
  };
  
  // Comprehensive report
  report: string;
  
  // Executive summary
  executiveSummary: {
    totalInvestment: number;
    cashOnCashReturn: number;
    capRate: number;
    totalReturn: number;
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
