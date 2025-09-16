export interface GenerationSkippingTransferInputs {
  transferAmount: number;
  gstTaxRate: number;
  annualExclusionAmount: number;
  gstExemptionAmount: number;
  gstExemptionUsed: number;
  numberOfSkipBeneficiaries: number;
  transferType: 'direct' | 'trust' | 'life-insurance' | 'other';
  includeStateGstTax: boolean;
  stateGstTaxRate: number;
  inflationAdjustment: number;
  planningHorizon: number;
  expectedGrowthRate: number;
  discountRate: number;
}

export interface GenerationSkippingTransferResults {
  gstTaxableAmount: number;
  gstTaxLiability: number;
  gstExemptionRemaining: number;
  gstTaxSavings: number;
  effectiveGstTaxRate: number;
  totalTaxLiability: number;
  afterTaxTransferValue: number;
  gstTaxPerBeneficiary: number;
  presentValueOfTaxLiability: number;
  breakEvenAnalysis: number;
  optimalTransferAmount: number;
  taxEfficiencyScore: number;
  planningRecommendations: string[];
}

export interface GenerationSkippingTransferMetrics {
  gstTaxBurden: number;
  exemptionUtilization: number;
  intergenerationalWealthTransfer: number;
  taxOptimizationPotential: number;
  riskAdjustedReturn: number;
}