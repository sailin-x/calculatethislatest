export interface PriceFixingOverchargeEstimatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface PriceFixingOverchargeEstimatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface PriceFixingOverchargeEstimatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface PriceFixingOverchargeEstimatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: PriceFixingOverchargeEstimatorAnalysis;
}
