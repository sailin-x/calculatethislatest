export interface GiftTaxCalculatorInputs {
  giftAmount: number;
  annualExclusionUsed: number;
  lifetimeExclusionUsed: number;
  relationship: 'spouse' | 'child' | 'grandchild' | 'other';
  isAnnualExclusion: boolean;
  isLifetimeExclusion: boolean;
  giftTaxRate: number;
}

export interface GiftTaxCalculatorMetrics {
  taxableAmount: number;
  giftTaxDue: number;
  remainingAnnualExclusion: number;
  remainingLifetimeExclusion: number;
  afterTaxGiftAmount: number;
  effectiveTaxRate: number;
}

export interface GiftTaxCalculatorAnalysis {
  taxEfficiency: string;
  exemptionUtilization: string;
  planningRecommendations: string[];
  riskConsiderations: string[];
}

export interface GiftTaxCalculatorOutputs {
  giftTaxDue: number;
  remainingAnnualExclusion: number;
  remainingLifetimeExclusion: number;
  afterTaxGiftAmount: number;
  effectiveTaxRate: number;
  analysis: GiftTaxCalculatorAnalysis;
}