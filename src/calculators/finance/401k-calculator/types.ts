export interface FourZeroOneKInputs {
  // Personal Information
  currentAge: number;
  retirementAge: number;
  currentBalance: number;

  // Contribution Information
  annualSalary: number;
  employeeContributionPercent: number; // percentage of salary
  employerMatchPercent: number; // percentage of salary matched by employer
  employerMatchLimit: number; // percentage limit for employer match
  catchUpContributions: boolean; // age 50+ can contribute extra

  // Investment Information
  expectedAnnualReturn: number; // percentage
  inflationRate: number; // percentage

  // Tax Information
  currentTaxRate: number; // percentage
  retirementTaxRate: number; // percentage

  // Time Horizon
  yearsToRetirement: number;

  // Advanced Options
  contributionIncreaseRate?: number; // annual percentage increase in contributions
  salaryIncreaseRate?: number; // annual percentage increase in salary
  fees?: number; // annual fee percentage
}

export interface FourZeroOneKResults {
  // Current Status
  currentBalance: number;
  monthlyContribution: number;
  annualContribution: number;
  employerMatch: number;

  // Projections
  projectedBalance: number;
  totalContributions: number;
  totalEmployerMatch: number;
  totalInvestmentGrowth: number;

  // Retirement Income
  monthlyRetirementIncome: number;
  annualRetirementIncome: number;
  retirementIncomeReplacement: number; // percentage of pre-retirement income

  // Tax Analysis
  taxDeferredAmount: number;
  taxSavings: number;
  effectiveTaxRate: number;

  // Growth Breakdown
  contributionGrowth: number;
  employerMatchGrowth: number;
  investmentGrowth: number;

  // Risk Analysis
  requiredMonthlyContribution: number; // to reach target
  shortfallAmount: number; // if current contributions insufficient
  yearsToReachTarget: number;

  // Scenario Analysis
  conservativeProjection: number; // 4% return
  moderateProjection: number; // 6% return
  aggressiveProjection: number; // 8% return

  // Recommendations
  recommendedContributionIncrease: number;
  catchUpContributionAmount: number;
  investmentStrategy: string;
  taxOptimizationTips: string[];

  // Milestone Projections
  balanceAtAge50: number;
  balanceAtAge60: number;
  balanceAtAge70: number;

  // Withdrawal Analysis
  requiredMinimumDistribution: number; // RMD at age 73
  sustainableWithdrawalRate: number; // 4% rule
  longevityRisk: string;

  // Comparison Metrics
  vsTargetBalance: number;
  vsAverageRetirement: number;
  percentileRanking: string;
}