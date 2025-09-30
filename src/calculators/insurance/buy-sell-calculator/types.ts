export interface BuySellCalculatorInputs {
  coverageAmount: number;
  premiumRate: number;
  policyTerm: number;
  riskFactors: number;
}

export interface BuySellCalculatorMetrics {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  riskAdjustedRate: number;
}

export interface BuySellCalculatorAnalysis {
  coverageAdequacy: string;
  premiumEfficiency: string;
  recommendations: string[];
}

export interface BuySellCalculatorOutputs {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  analysis: BuySellCalculatorAnalysis;
}
