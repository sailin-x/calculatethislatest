export interface RetirementInputs {
  // Personal Information
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;

  // Current Financial Situation
  currentSavings: number;
  monthlySavings: number;
  annualIncome: number;
  annualExpenses: number;

  // Expected Returns & Inflation
  expectedAnnualReturn: number;
  inflationRate: number;
  salaryGrowthRate: number;

  // Retirement Income Sources
  socialSecurityBenefit: number;
  socialSecurityStartAge: number;
  pensionAmount: number;
  otherIncome: number;

  // Retirement Expenses
  retirementAnnualExpenses: number;
  healthcareCosts: number;
  longTermCareCosts: number;

  // Tax Considerations
  currentTaxRate: number;
  retirementTaxRate: number;
  taxDeferred: boolean;

  // Risk Parameters
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  marketVolatility: number;

  // Scenario Analysis
  includeMarketCrash: boolean;
  bearMarketDuration: number;
  recoveryTime: number;

  // Advanced Options
  includeInheritance: boolean;
  inheritanceAmount: number;
  inheritanceAge: number;

  // Withdrawal Strategy
  withdrawalRate: number; // 4% rule
  withdrawalInflationAdjusted: boolean;
  requiredMinimumDistribution: boolean;

  // Healthcare Planning
  medicareStartAge: number;
  supplementalInsurance: number;

  // Lifestyle Adjustments
  retirementLocation: 'current' | 'lower_cost' | 'higher_cost';
  lifestyleChange: 'maintain' | 'reduce_20' | 'reduce_40' | 'luxury';

  // Legacy Planning
  leaveLegacy: boolean;
  legacyAmount: number;
}

export interface RetirementResults {
  // Basic Projections
  yearsToRetirement: number;
  totalSavingsAtRetirement: number;
  monthlyRetirementIncome: number;
  annualRetirementIncome: number;

  // Income Sources Breakdown
  savingsIncome: number;
  socialSecurityIncome: number;
  pensionIncome: number;
  totalIncome: number;

  // Expense Analysis
  annualExpenses: number;
  monthlyExpenses: number;
  expenseCoverage: number; // Income / Expenses ratio

  // Savings Analysis
  totalContributions: number;
  totalGrowth: number;
  requiredMonthlySavings: number;
  savingsGap: number;

  // Risk Analysis
  successProbability: number;
  failureProbability: number;
  riskAdjustedIncome: number;

  // Scenario Projections
  conservativeProjection: number;
  moderateProjection: number;
  aggressiveProjection: number;

  // Withdrawal Analysis
  safeWithdrawalAmount: number;
  sustainableWithdrawalRate: number;
  portfolioLongevity: number;

  // Tax Analysis
  preTaxIncome: number;
  afterTaxIncome: number;
  taxSavings: number;

  // Healthcare Costs
  totalHealthcareCosts: number;
  medicareSavings: number;
  outOfPocketHealthcare: number;

  // Lifestyle Analysis
  locationAdjustment: number;
  lifestyleAdjustment: number;
  adjustedExpenses: number;

  // Legacy Planning
  legacyValue: number;
  inheritanceTax: number;
  netLegacy: number;

  // Milestone Analysis
  age65Balance: number;
  age70Balance: number;
  age75Balance: number;
  age80Balance: number;

  // Sensitivity Analysis
  incomeSensitivity: number[]; // Impact of different return rates
  expenseSensitivity: number[]; // Impact of different expense levels

  // Recommendations
  recommendedSavingsIncrease: number;
  recommendedRetirementAge: number;
  riskAdjustment: string;
  strategyRecommendations: string[];

  // Emergency Planning
  emergencyFundNeeded: number;
  emergencyFundProgress: number;

  // Social Security Optimization
  optimalClaimingAge: number;
  claimingStrategy: string;
  benefitComparison: {
    early: number;
    full: number;
    delayed: number;
  };

  // Investment Allocation
  recommendedAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
  };

  // Longevity Risk
  longevityAdjustment: number;
  additionalSavingsNeeded: number;

  // Inflation Impact
  inflationAdjustedIncome: number;
  purchasingPower: number;

  // Success Metrics
  retirementReadinessScore: number;
  confidenceLevel: number;
  actionItems: string[];
}
