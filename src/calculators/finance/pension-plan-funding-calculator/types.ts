export interface PensionFundingInputs {
  currentPlanBalance: number;
  targetRetirementBalance: number;
  currentAge: number;
  retirementAge: number;
  annualContribution: number;
  employerMatch: number;
  expectedReturn: number;
  inflationRate: number;
  currentSalary: number;
  salaryGrowthRate: number;
  planType: 'defined_benefit' | 'defined_contribution' | 'cash_balance';
  fundingStrategy: 'aggressive' | 'moderate' | 'conservative';
  includeCatchUp: boolean;
}

export interface PensionFundingResults {
  totalContributions: number;
  employerContributions: number;
  investmentGrowth: number;
  yearsToGoal: number;
  monthlyContributionNeeded: number;
  projectedBalance: number;
  fundingGap: number;
  catchUpContribution: number;
  retirementReadiness: number;
}

export interface PensionFundingMetrics {
  contributionEfficiency: number;
  employerMatchUtilization: number;
  riskAdjustedProgress: number;
  fundingStatus: 'on_track' | 'behind' | 'ahead';
  retirementConfidence: 'low' | 'medium' | 'high';
}