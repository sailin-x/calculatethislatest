export interface IRAInputs {
  currentBalance: number;
  annualContribution: number;
  expectedReturn: number;
  yearsToRetirement: number;
  currentAge: number;
  iraType: 'traditional' | 'roth' | 'sep' | 'simple';
  taxBracket: number;
  inflationRate: number;
  includeRequiredMinimumDistributions: boolean;
  spousalIRA: boolean;
  catchUpContributions: boolean;
}

export interface RAResults {
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
  taxSavings: number;
  netValue: number;
  requiredMinimumDistribution: number;
  effectiveReturn: number;
  breakEvenAge: number;
  retirementIncome: number;
}

export interface IRAMetrics {
  contributionEfficiency: number;
  taxAdvantageRatio: number;
  riskAdjustedReturn: number;
  retirementReadiness: 'low' | 'medium' | 'high';
}