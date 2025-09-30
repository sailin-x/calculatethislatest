export interface GenerationSkippingTransferGstTaxCalculatorInputs {
  transferAmount: number;
  relationship: 'grandchild' | 'great-grandchild' | 'great-great-grandchild' | 'other-descendant';
  gstExemptionUsed: number;
  gstTaxRate: number;
  isDirectSkip: boolean;
  isTrustDistribution: boolean;
}

export interface GenerationSkippingTransferGstTaxCalculatorMetrics {
  gstExemptionAvailable: number;
  taxableAmount: number;
  gstTaxDue: number;
  afterTaxTransferAmount: number;
  taxSavingsFromExemption: number;
  effectiveTaxRate: number;
}

export interface GenerationSkippingTransferGstTaxCalculatorAnalysis {
  exemptionUtilization: string;
  taxEfficiency: string;
  planningRecommendations: string[];
  riskConsiderations: string[];
}

export interface GenerationSkippingTransferGstTaxCalculatorOutputs {
  gstTaxDue: number;
  remainingGstExemption: number;
  afterTaxTransferAmount: number;
  taxSavingsFromExemption: number;
  effectiveTaxRate: number;
  analysis: GenerationSkippingTransferGstTaxCalculatorAnalysis;
}