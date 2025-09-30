export interface HospitalNegligenceCalculatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface HospitalNegligenceCalculatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface HospitalNegligenceCalculatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface HospitalNegligenceCalculatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: HospitalNegligenceCalculatorAnalysis;
}
