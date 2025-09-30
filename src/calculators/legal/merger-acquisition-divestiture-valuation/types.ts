export interface MergerAcquisitionDivestitureValuationInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface MergerAcquisitionDivestitureValuationMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface MergerAcquisitionDivestitureValuationAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface MergerAcquisitionDivestitureValuationOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: MergerAcquisitionDivestitureValuationAnalysis;
}
