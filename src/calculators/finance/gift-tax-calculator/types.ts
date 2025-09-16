export interface GiftTaxInputs {
  giftAmount: number;
  annualExclusionAmount: number;
  lifetimeExclusionUsed: number;
  lifetimeExclusionLimit: number;
  giftTaxRate: number;
  numberOfRecipients: number;
  maritalStatus: 'single' | 'married';
  includeSpousalPortion: boolean;
  inflationAdjustment: number;
  planningHorizon: number;
  expectedGrowthRate: number;
}

export interface GiftTaxResults {
  taxableGiftAmount: number;
  giftTaxLiability: number;
  effectiveTaxRate: number;
  remainingLifetimeExclusion: number;
  totalAnnualExclusions: number;
  netGiftAmount: number;
  projectedFutureValue: number;
  taxSavingsFromExclusions: number;
  breakEvenGiftAmount: number;
  optimalGiftStrategy: string;
}

export interface GiftTaxMetrics {
  taxEfficiencyScore: number;
  exclusionUtilizationRate: number;
  projectedTaxSavings: number;
  riskAssessment: 'low' | 'medium' | 'high';
}