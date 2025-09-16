export interface GSTTaxInputs {
  transferAmount: number;
  gstTaxRate: number;
  gstExemptionUsed: number;
  gstExemptionLimit: number;
  numberOfSkipGenerations: number;
  isDirectSkip: boolean;
  isTrustDistribution: boolean;
  includeStateTax: boolean;
  stateTaxRate: number;
  inflationRate: number;
  planningHorizon: number;
}

export interface GSTTaxResults {
  taxableGSTAmount: number;
  gstTaxLiability: number;
  effectiveGSTTaxRate: number;
  remainingGSTExemption: number;
  totalGSTTaxSavings: number;
  projectedFutureValue: number;
  optimalTransferStrategy: string;
  stateTaxLiability: number;
  totalTaxLiability: number;
}

export interface GSTTaxMetrics {
  exemptionUtilizationRate: number;
  taxEfficiencyScore: number;
  generationSkipBenefit: number;
  riskAssessment: 'low' | 'medium' | 'high';
}