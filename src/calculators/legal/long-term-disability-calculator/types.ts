export interface LongTermDisabilityCalculatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface LongTermDisabilityCalculatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface LongTermDisabilityCalculatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface LongTermDisabilityCalculatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: LongTermDisabilityCalculatorAnalysis;
}
