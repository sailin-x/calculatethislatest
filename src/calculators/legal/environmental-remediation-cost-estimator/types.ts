export interface EnvironmentalRemediationCostEstimatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface EnvironmentalRemediationCostEstimatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface EnvironmentalRemediationCostEstimatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface EnvironmentalRemediationCostEstimatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: EnvironmentalRemediationCostEstimatorAnalysis;
}
