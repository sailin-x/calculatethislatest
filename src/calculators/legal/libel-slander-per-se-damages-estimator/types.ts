export interface LibelSlanderPerSeDamagesEstimatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface LibelSlanderPerSeDamagesEstimatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface LibelSlanderPerSeDamagesEstimatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface LibelSlanderPerSeDamagesEstimatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: LibelSlanderPerSeDamagesEstimatorAnalysis;
}
