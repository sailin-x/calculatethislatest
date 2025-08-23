export interface CompoundInterestInputs {
  // Basic investment parameters
  principal: number; // Initial investment amount
  annualInterestRate: number; // Annual interest rate as percentage
  timePeriod: number; // Investment time period
  timeUnit: 'days' | 'weeks' | 'months' | 'years';
  
  // Compounding frequency
  compoundingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually' | 'continuous';
  
  // Additional contributions
  additionalContributions: number; // Regular additional contributions
  contributionFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  contributionGrowthRate: number; // Annual growth rate of contributions
  
  // Withdrawals
  withdrawals: number; // Regular withdrawals
  withdrawalFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  withdrawalGrowthRate: number; // Annual growth rate of withdrawals
  
  // Tax considerations
  taxRate: number; // Marginal tax rate
  taxTreatment: 'taxable' | 'tax-deferred' | 'tax-free';
  inflationRate: number; // Annual inflation rate
  
  // Investment details
  investmentType: 'savings' | 'cd' | 'bonds' | 'stocks' | 'mutual-funds' | 'etfs' | 'real-estate' | 'crypto' | 'other';
  riskLevel: 'low' | 'medium' | 'high';
  
  // Fees and expenses
  managementFees: number; // Annual management fees as percentage
  transactionFees: number; // Transaction fees as percentage
  expenseRatio: number; // Fund expense ratio
  
  // Market conditions
  marketVolatility: number; // Expected market volatility
  economicScenario: 'recession' | 'stable' | 'growth' | 'boom';
  
  // Advanced parameters
  reinvestmentRate: number; // Rate at which returns are reinvested
  earlyWithdrawalPenalty: number; // Penalty for early withdrawal
  minimumBalance: number; // Minimum balance requirement
  
  // Goal planning
  targetAmount: number; // Target investment goal
  targetDate: string; // Target date for goal
  goalType: 'retirement' | 'education' | 'house' | 'emergency-fund' | 'vacation' | 'other';
  
  // Risk management
  stopLossPercentage: number; // Stop loss percentage
  rebalancingFrequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually' | 'never';
  
  // Inflation adjustment
  adjustForInflation: boolean;
  realReturnCalculation: boolean;
  
  // Comparison scenarios
  comparisonScenarios?: {
    scenario: string;
    interestRate: number;
    compoundingFrequency: string;
    additionalContributions: number;
  }[];
  
  // Custom parameters
  customCompoundingPeriods?: number;
  customInterestRate?: number;
  customTimePeriod?: number;
  
  // Analysis parameters
  includeTaxes: boolean;
  includeFees: boolean;
  includeInflation: boolean;
  showDetailedBreakdown: boolean;
  includeComparison: boolean;
}

export interface CompoundInterestResults {
  // Core results
  finalAmount: number;
  totalInterest: number;
  totalContributions: number;
  totalWithdrawals: number;
  netGain: number;
  
  // Time-based breakdown
  yearByYearBreakdown: {
    year: number;
    beginningBalance: number;
    contributions: number;
    withdrawals: number;
    interest: number;
    endingBalance: number;
    cumulativeInterest: number;
  }[];
  
  // Compounding analysis
  compoundingAnalysis: {
    frequency: string;
    effectiveAnnualRate: number;
    totalPeriods: number;
    finalAmount: number;
    difference: number;
  }[];
  
  // Tax analysis
  taxAnalysis: {
    taxableInterest: number;
    taxLiability: number;
    afterTaxAmount: number;
    effectiveTaxRate: number;
    taxEfficiency: number;
  };
  
  // Inflation analysis
  inflationAnalysis: {
    nominalAmount: number;
    realAmount: number;
    inflationAdjustedReturn: number;
    purchasingPower: number;
    inflationImpact: number;
  };
  
  // Fee analysis
  feeAnalysis: {
    totalFees: number;
    managementFees: number;
    transactionFees: number;
    expenseRatioFees: number;
    netReturn: number;
    feeImpact: number;
  };
  
  // Goal analysis
  goalAnalysis: {
    targetAmount: number;
    projectedAmount: number;
    shortfall: number;
    surplus: number;
    yearsToGoal: number;
    requiredContribution: number;
    goalAchievement: 'ahead' | 'on-track' | 'behind';
  };
  
  // Risk analysis
  riskAnalysis: {
    volatility: number;
    worstCaseScenario: number;
    bestCaseScenario: number;
    expectedValue: number;
    riskAdjustedReturn: number;
    probabilityOfLoss: number;
  };
  
  // Comparison scenarios
  scenarioComparison: {
    scenario: string;
    finalAmount: number;
    totalInterest: number;
    effectiveRate: number;
    timeToGoal: number;
    riskLevel: string;
  }[];
  
  // Performance metrics
  performanceMetrics: {
    compoundAnnualGrowthRate: number;
    averageAnnualReturn: number;
    totalReturn: number;
    annualizedReturn: number;
    riskAdjustedReturn: number;
  };
  
  // Sensitivity analysis
  sensitivityAnalysis: {
    parameter: string;
    baseValue: number;
    lowValue: number;
    highValue: number;
    lowResult: number;
    highResult: number;
    sensitivity: number;
  }[];
  
  // Break-even analysis
  breakEvenAnalysis: {
    breakEvenPoint: number;
    timeToBreakEven: number;
    requiredReturn: number;
    minimumContribution: number;
  };
  
  // Monte Carlo simulation
  monteCarloResults: {
    meanFinalAmount: number;
    medianFinalAmount: number;
    standardDeviation: number;
    percentiles: {
      p10: number;
      p25: number;
      p50: number;
      p75: number;
      p90: number;
    };
    probabilityOfSuccess: number;
  };
  
  // Rebalancing analysis
  rebalancingAnalysis: {
    frequency: string;
    totalRebalancingCosts: number;
    performanceImpact: number;
    riskReduction: number;
    optimalFrequency: string;
  };
  
  // Early withdrawal analysis
  earlyWithdrawalAnalysis: {
    penaltyAmount: number;
    netAmount: number;
    effectiveReturn: number;
    breakEvenTime: number;
    recommendation: string;
  };
  
  // Tax optimization
  taxOptimization: {
    optimalContribution: number;
    taxSavings: number;
    effectiveReturn: number;
    recommendations: string[];
  };
  
  // Inflation protection
  inflationProtection: {
    realReturn: number;
    inflationAdjustedGoal: number;
    requiredRealReturn: number;
    inflationHedging: string[];
  };
  
  // Comprehensive report
  report: string;
  
  // Recommendations
  recommendations: {
    category: string;
    recommendations: string[];
    priority: 'high' | 'medium' | 'low';
    expectedImpact: number;
  }[];
  
  // Action items
  actionItems: {
    priority: 'immediate' | 'short-term' | 'long-term';
    action: string;
    owner: string;
    timeline: string;
    expectedOutcome: string;
  }[];
}
