export interface VariableAnnuityInputs {
  initialInvestment: number;
  monthlyContribution: number;
  investmentHorizon: number;
  currentAge: number;
  annuityStartAge: number;
  expectedReturnRate: number;
  volatility: number;
  annuityPayoutRate: number;
  inflationRate: number;
  taxBracket: number;
  annuityType: 'immediate' | 'deferred';
  payoutType: 'lifetime' | 'period_certain' | 'joint_survivor';
  riderFees: number;
  managementFees: number;
}

export interface VariableAnnuityOutputs {
  projectedValue: number;
  annuityIncome: number;
  totalContributions: number;
  totalEarnings: number;
  taxLiability: number;
  netAnnuityIncome: number;
  breakEvenAge: number;
  internalRateOfReturn: number;
  riskAdjustedReturn: number;
  annuityPurchaseValue: number;
  lifetimeIncome: number;
}

export interface VariableAnnuityMetrics {
  result: number;
  totalContributions: number;
  totalEarnings: number;
  annuityIncome: number;
  netValue: number;
}

export interface VariableAnnuityAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  suitabilityScore: number;
  taxEfficiency: number;
  incomeStability: number;
}