export interface ViaticalSettlementInputs {
  faceValue: number;
  currentAge: number;
  lifeExpectancy: number;
  healthCondition: 'terminal' | 'critical' | 'serious';
  policyType: 'whole_life' | 'universal' | 'term';
  premiumAmount: number;
  premiumFrequency: 'monthly' | 'quarterly' | 'annually';
  yearsOwned: number;
  discountRate: number;
  settlementFees: number;
  state: string;
  taxBracket: number;
}

export interface ViaticalSettlementOutputs {
  settlementValue: number;
  netSettlementAmount: number;
  viaticalDiscount: number;
  monthlyPremiumSavings: number;
  annualPremiumSavings: number;
  breakEvenPeriod: number;
  taxLiability: number;
  netBenefit: number;
  settlementRatio: number;
  internalRateOfReturn: number;
  riskAdjustedValue: number;
}

export interface ViaticalSettlementMetrics {
  result: number;
  settlementValue: number;
  netBenefit: number;
  breakEvenPeriod: number;
}

export interface ViaticalSettlementAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  viabilityScore: number;
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  marketCondition: 'Favorable' | 'Neutral' | 'Unfavorable';
}