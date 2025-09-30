export interface InvestmentInputs {
  // Initial Investment
  initialInvestment: number;
  monthlyContribution: number;

  // Time Horizon
  investmentPeriodYears: number;
  investmentPeriodMonths?: number;

  // Expected Returns
  expectedAnnualReturn: number;
  expectedAnnualReturnMin?: number; // Conservative estimate
  expectedAnnualReturnMax?: number; // Aggressive estimate

  // Risk Parameters
  volatility: number; // Standard deviation of returns
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';

  // Inflation & Taxes
  inflationRate: number;
  taxRate: number;
  taxDeferred: boolean;

  // Investment Strategy
  investmentStrategy: 'lump_sum' | 'monthly_contributions' | 'both';
  rebalanceFrequency: 'never' | 'quarterly' | 'annually';

  // Asset Allocation
  stockAllocation: number; // Percentage in stocks
  bondAllocation: number; // Percentage in bonds
  cashAllocation: number; // Percentage in cash

  // Advanced Options
  includeDividends: boolean;
  dividendYield: number;
  expenseRatio: number; // Annual expense ratio
  managementFee: number; // Annual management fee

  // Goal Setting
  targetAmount: number;
  riskAdjustedTarget: boolean;

  // Scenario Analysis
  marketCrashScenario: boolean;
  bearMarketDuration?: number; // months
  recoveryTime?: number; // months

  // Withdrawal Planning
  withdrawalRate: number; // Safe withdrawal rate (e.g., 4%)
  withdrawalStartYear: number;
  withdrawalInflationAdjusted: boolean;

  // Comparison Options
  compareStrategies: boolean;
  benchmarkIndex: 'sp500' | 'nasdaq' | 'dow_jones' | 'custom';
  customBenchmarkReturn?: number;
}

export interface InvestmentResults {
  // Basic Projections
  finalBalance: number;
  totalContributions: number;
  totalGrowth: number;
  totalDividends: number;

  // Performance Metrics
  compoundAnnualGrowthRate: number;
  internalRateOfReturn: number;
  sharpeRatio: number;
  sortinoRatio: number;

  // Risk Metrics
  volatility: number;
  maximumDrawdown: number;
  valueAtRisk: number; // 95% confidence
  expectedShortfall: number;

  // Time-Weighted Returns
  timeWeightedReturn: number;
  moneyWeightedReturn: number;

  // Scenario Analysis
  conservativeProjection: number;
  moderateProjection: number;
  aggressiveProjection: number;

  // Risk-Adjusted Projections
  riskAdjustedReturn: number;
  riskAdjustedFinalBalance: number;

  // Goal Achievement
  goalAchievementProbability: number;
  yearsToReachGoal: number;
  requiredMonthlyContribution: number;

  // Withdrawal Analysis
  safeWithdrawalAmount: number;
  sustainableWithdrawalRate: number;
  portfolioLongevity: number; // years

  // Tax Analysis
  taxableGrowth: number;
  taxDeferredGrowth: number;
  taxSavings: number;
  afterTaxFinalBalance: number;

  // Benchmark Comparison
  benchmarkReturn: number;
  outperformance: number;
  alpha: number; // Excess return over benchmark

  // Asset Allocation Impact
  stockContribution: number;
  bondContribution: number;
  cashContribution: number;

  // Fee Analysis
  totalFees: number;
  feeImpact: number; // Percentage reduction in returns
  feeFreeEquivalent: number;

  // Inflation Impact
  inflationAdjustedBalance: number;
  realReturn: number; // Return after inflation
  purchasingPower: number;

  // Monte Carlo Analysis
  successProbability: number; // Probability of reaching goal
  failureProbability: number;
  bestCaseScenario: number;
  worstCaseScenario: number;

  // Market Crash Scenarios
  crashImpact: number;
  recoveryProjection: number;
  timeToRecovery: number;

  // Portfolio Optimization
  optimalAllocation: {
    stocks: number;
    bonds: number;
    cash: number;
  };
  efficientFrontier: Array<{
    risk: number;
    return: number;
  }>;

  // Recommendations
  recommendedStrategy: string;
  riskAdjustment: string;
  rebalancingSchedule: string;
  taxOptimizationTips: string[];

  // Milestone Projections
  balanceAt5Years: number;
  balanceAt10Years: number;
  balanceAt15Years: number;
  balanceAt20Years: number;

  // Contribution Analysis
  contributionGrowth: number;
  contributionPercentage: number;
  requiredVsActual: number;

  // Performance Attribution
  assetClassPerformance: {
    stocks: number;
    bonds: number;
    cash: number;
  };
  timingImpact: number;
  securitySelection: number;

  // Sustainability Metrics
  carbonFootprint: number; // If ESG investing
  socialImpact: number;
  governanceScore: number;

  // Future Value Calculations
  futureValueAtRetirement: number;
  collegeFundProjection: number;
  emergencyFundProjection: number;
  majorPurchaseProjection: number;
}