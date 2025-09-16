export interface PlannedGivingInputs {
  giftAmount: number;
  donorAge: number;
  lifeExpectancy: number;
  givingMethod: 'outright' | 'charitable_remainder_trust' | 'charitable_lead_trust' | 'life_insurance' | 'bequest';
  taxBracket: number;
  expectedReturn: number;
  inflationRate: number;
  charitableDeductionRate: number;
  trustType: 'annuity' | 'unitrust' | 'lead' | 'perpetual';
  payoutRate: number;
  trustTerm: number;
  includeSpouse: boolean;
  spouseAge: number;
}

export interface PlannedGivingResults {
  taxSavings: number;
  netCost: number;
  charitableImpact: number;
  incomeGenerated: number;
  remainderValue: number;
  effectiveTaxRate: number;
  breakEvenYears: number;
  lifetimeGivingValue: number;
  optimalGivingStrategy: string;
}

export interface PlannedGivingMetrics {
  taxEfficiency: number;
  charitableLeverage: number;
  incomeReplacement: number;
  wealthTransferEfficiency: 'low' | 'medium' | 'high';
  givingStrategy: 'immediate' | 'deferred' | 'legacy';
}