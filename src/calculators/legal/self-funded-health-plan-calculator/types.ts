export interface SelfFundedHealthPlanCalculatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface SelfFundedHealthPlanCalculatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface SelfFundedHealthPlanCalculatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface SelfFundedHealthPlanCalculatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: SelfFundedHealthPlanCalculatorAnalysis;
}
