export interface AnnuityInputs {
  // Annuity type and structure
  annuityType: {
    type: 'immediate' | 'deferred' | 'fixed' | 'variable' | 'indexed' | 'qualified' | 'non-qualified';
    structure: 'single-premium' | 'flexible-premium' | 'periodic-premium';
    payoutOption: 'life-only' | 'life-with-period-certain' | 'joint-life' | 'period-certain' | 'refund';
  };
  
  // Premium and payment information
  premiumInfo: {
    initialPremium: number; // Initial premium amount
    additionalPremiums: number[]; // Additional premium payments
    premiumSchedule: 'single' | 'annual' | 'monthly' | 'quarterly' | 'semi-annual';
    premiumDuration: number; // Years of premium payments
    totalPremiums: number; // Total premiums paid
  };
  
  // Annuity terms
  annuityTerms: {
    issueAge: number; // Age when annuity is issued
    annuitizationAge: number; // Age when annuitization begins
    deferralPeriod: number; // Years of deferral
    payoutPeriod: number; // Years of payout
    guaranteePeriod: number; // Guarantee period (years)
    periodCertain: number; // Period certain (years)
  };
  
  // Interest and return rates
  rates: {
    guaranteedRate: number; // Guaranteed interest rate
    currentRate: number; // Current interest rate
    bonusRate: number; // Bonus rate (if applicable)
    capRate: number; // Cap rate for indexed annuities
    participationRate: number; // Participation rate for indexed annuities
    floorRate: number; // Floor rate for indexed annuities
    spreadRate: number; // Spread rate for indexed annuities
  };
  
  // Payout information
  payoutInfo: {
    monthlyPayout: number; // Monthly payout amount
    annualPayout: number; // Annual payout amount
    payoutStartDate: Date; // Date when payouts begin
    payoutFrequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
    inflationAdjustment: boolean; // Whether payouts adjust for inflation
    colaRate: number; // Cost of living adjustment rate
  };
  
  // Death benefit
  deathBenefit: {
    deathBenefitType: 'return-of-premium' | 'stepped-up' | 'earnings-enhanced' | 'none';
    deathBenefitAmount: number; // Death benefit amount
    beneficiaryType: 'spouse' | 'children' | 'other' | 'none';
    beneficiaryAge: number; // Age of primary beneficiary
    survivorBenefit: number; // Survivor benefit percentage
  };
  
  // Riders and options
  riders: {
    guaranteedMinimumIncome: boolean; // GMIB rider
    guaranteedMinimumWithdrawal: boolean; // GMWB rider
    guaranteedMinimumAccumulation: boolean; // GMAB rider
    longTermCare: boolean; // LTC rider
    nursingHome: boolean; // Nursing home rider
    terminalIllness: boolean; // Terminal illness rider
    returnOfPremium: boolean; // Return of premium rider
  };
  
  // Fees and charges
  fees: {
    mortalityAndExpense: number; // M&E fee percentage
    administrativeFee: number; // Administrative fee percentage
    riderFees: number; // Rider fees percentage
    surrenderCharge: number; // Surrender charge percentage
    premiumTax: number; // Premium tax percentage
    stateTax: number; // State tax percentage
    federalTax: number; // Federal tax rate
  };
  
  // Market and index information (for indexed annuities)
  marketInfo: {
    indexType: 's&p500' | 'nasdaq' | 'dow' | 'russell2000' | 'custom';
    indexValue: number; // Current index value
    indexHistory: number[]; // Historical index values
    creditingMethod: 'point-to-point' | 'annual-reset' | 'monthly-average' | 'high-water-mark';
    averagingPeriod: number; // Averaging period (months)
  };
  
  // Investment options (for variable annuities)
  investmentOptions: {
    subaccounts: {
      name: string;
      allocation: number; // Percentage allocation
      expenseRatio: number; // Expense ratio
      expectedReturn: number; // Expected return
      riskLevel: 'conservative' | 'moderate' | 'aggressive';
    }[];
    rebalancingFrequency: 'monthly' | 'quarterly' | 'annually' | 'never';
    dollarCostAveraging: boolean; // Whether DCA is used
  };
  
  // Withdrawal provisions
  withdrawalProvisions: {
    freeWithdrawalPercentage: number; // Free withdrawal percentage
    systematicWithdrawal: boolean; // Whether systematic withdrawals are allowed
    minimumWithdrawal: number; // Minimum withdrawal amount
    maximumWithdrawal: number; // Maximum withdrawal amount
    withdrawalPenalty: number; // Early withdrawal penalty
    penaltyPeriod: number; // Penalty period (years)
  };
  
  // Tax considerations
  taxConsiderations: {
    taxQualified: boolean; // Whether annuity is tax-qualified
    taxBasis: number; // Tax basis of the annuity
    requiredMinimumDistributions: boolean; // Whether RMDs apply
    rmdbeginAge: number; // Age when RMDs begin
    exclusionRatio: number; // Exclusion ratio for non-qualified annuities
  };
  
  // Inflation and economic factors
  economicFactors: {
    inflationRate: number; // Expected inflation rate
    discountRate: number; // Discount rate for present value calculations
    mortalityTable: '2012-iam' | '2001-cso' | '1983-iam' | 'custom';
    lifeExpectancy: number; // Expected life expectancy
  };
  
  // Comparison scenarios
  comparisonScenarios: {
    scenario: string;
    alternativeInvestment: number; // Alternative investment return
    alternativeLiquidity: number; // Alternative investment liquidity
    alternativeRisk: number; // Alternative investment risk
  }[];
  
  // Analysis parameters
  includeDeathBenefit: boolean;
  includeRiders: boolean;
  includeTaxAnalysis: boolean;
  includeComparison: boolean;
  includeSensitivityAnalysis: boolean;
  
  // Output preferences
  includeDetailedBreakdown: boolean;
  includeMultipleScenarios: boolean;
  includeMonteCarlo: boolean;
  includeRecommendations: boolean;
}

export interface AnnuityResults {
  // Core annuity metrics
  presentValue: number; // Present value of annuity
  futureValue: number; // Future value of annuity
  internalRateOfReturn: number; // IRR of the annuity
  netPresentValue: number; // NPV of the annuity
  paybackPeriod: number; // Payback period (years)
  
  // Accumulation phase analysis
  accumulationAnalysis: {
    totalPremiums: number;
    accumulatedValue: number;
    interestEarned: number;
    effectiveRate: number;
    growthTimeline: {
      year: number;
      premium: number;
      interest: number;
      totalValue: number;
    }[];
  };
  
  // Payout phase analysis
  payoutAnalysis: {
    monthlyPayout: number;
    annualPayout: number;
    totalPayouts: number;
    payoutDuration: number;
    payoutTimeline: {
      year: number;
      age: number;
      payout: number;
      remainingBalance: number;
    }[];
  };
  
  // Death benefit analysis
  deathBenefitAnalysis: {
    deathBenefitAmount: number;
    deathBenefitRatio: number; // Death benefit to premium ratio
    beneficiaryPayout: number;
    deathBenefitTimeline: {
      age: number;
      deathBenefit: number;
      cashValue: number;
      netDeathBenefit: number;
    }[];
  };
  
  // Fee analysis
  feeAnalysis: {
    totalFees: number;
    annualFees: number;
    feeImpact: number; // Impact of fees on returns
    feeBreakdown: {
      fee: string;
      amount: number;
      percentage: number;
    }[];
    netReturn: number; // Return after fees
  };
  
  // Tax analysis
  taxAnalysis: {
    taxBasis: number;
    taxableAmount: number;
    taxLiability: number;
    afterTaxValue: number;
    exclusionRatio: number;
    requiredMinimumDistributions: number;
    taxEfficiency: number;
  };
  
  // Risk analysis
  riskAnalysis: {
    interestRateRisk: number;
    inflationRisk: number;
    longevityRisk: number;
    creditRisk: number;
    liquidityRisk: number;
    overallRiskScore: number;
    riskMitigation: string[];
  };
  
  // Performance metrics
  performanceMetrics: {
    totalReturn: number;
    annualizedReturn: number;
    riskAdjustedReturn: number;
    sharpeRatio: number;
    maximumDrawdown: number;
    volatility: number;
  };
  
  // Comparison analysis
  comparisonAnalysis: {
    annuityReturn: number;
    alternativeReturn: number;
    difference: number;
    breakevenAge: number;
    breakevenReturn: number;
    recommendation: string;
  };
  
  // Sensitivity analysis
  sensitivityResults: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowNPV: number;
    highNPV: number;
    sensitivity: number;
  }[];
  
  // Scenario analysis
  scenarioResults: {
    scenario: string;
    probability: number;
    presentValue: number;
    futureValue: number;
    internalRateOfReturn: number;
    paybackPeriod: number;
    riskLevel: string;
  }[];
  
  // Monte Carlo simulation
  monteCarloResults: {
    successRate: number;
    meanPresentValue: number;
    medianPresentValue: number;
    standardDeviation: number;
    percentiles: {
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
    worstCaseScenario: number;
    bestCaseScenario: number;
  };
  
  // Annuity efficiency
  annuityEfficiency: {
    costEfficiency: number;
    taxEfficiency: number;
    riskEfficiency: number;
    liquidityEfficiency: number;
    overallEfficiency: number;
  };
  
  // Annuity opportunities
  annuityOpportunities: {
    opportunity: string;
    potentialImpact: number;
    implementation: string;
    priority: 'high' | 'medium' | 'low';
    timeline: string;
  }[];
  
  // Cost-benefit analysis
  costBenefitAnalysis: {
    totalCost: number;
    totalBenefit: number;
    netBenefit: number;
    benefitCostRatio: number;
    returnOnInvestment: number;
    paybackPeriod: number;
  };
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenAge: number;
    breakEvenReturn: number;
    marginOfSafety: number;
    requiredReturn: number;
  };
  
  // Liquidity analysis
  liquidityAnalysis: {
    surrenderValue: number;
    freeWithdrawalAmount: number;
    penaltyWithdrawalAmount: number;
    liquidityTimeline: {
      year: number;
      surrenderValue: number;
      penalty: number;
      netValue: number;
    }[];
  };
  
  // Inflation protection analysis
  inflationProtectionAnalysis: {
    inflationAdjustedPayout: number;
    purchasingPower: number;
    inflationRisk: number;
    colaImpact: number;
    realReturn: number;
  };
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
    timeline: string;
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
