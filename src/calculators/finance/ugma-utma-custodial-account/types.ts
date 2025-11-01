export interface UGMACustodialAccountInputs {
  initialContribution: number;
  annualContribution: number;
  contributionFrequency: 'monthly' | 'quarterly' | 'annually';
  expectedReturnRate: number;
  inflationRate: number;
  childAge: number;
  custodialAccountType: 'UGMA' | 'UTMA';
  state: string;
  taxYear: number;
  giftTaxExclusionUsed: number;
}

export interface UGMACustodialAccountOutputs {
  futureValue: number;
  totalContributions: number;
  totalEarnings: number;
  taxLiability: number;
  netValue: number;
  annualTaxSavings: number;
  giftTaxImpact: number;
  stateTaxImpact: number;
  custodialAccountValue: number;
  transferAge: number;
  transferValue: number;
}

export interface UGMACustodialAccountMetrics {
  result: number;
  totalContributions: number;
  totalEarnings: number;
  taxLiability: number;
  netValue: number;
}

export interface UGMACustodialAccountAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  taxEfficiency: number;
  growthPotential: number;
}