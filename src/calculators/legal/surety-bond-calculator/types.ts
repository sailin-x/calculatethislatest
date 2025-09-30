export interface SuretyBondCalculatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface SuretyBondCalculatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface SuretyBondCalculatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface SuretyBondCalculatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: SuretyBondCalculatorAnalysis;
}
