export interface CyberLiabilityCalculatorInputs {
  coverageAmount: number;
  premiumRate: number;
  policyTerm: number;
  riskFactors: number;
}

export interface CyberLiabilityCalculatorMetrics {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  riskAdjustedRate: number;
}

export interface CyberLiabilityCalculatorAnalysis {
  coverageAdequacy: string;
  premiumEfficiency: string;
  recommendations: string[];
}

export interface CyberLiabilityCalculatorOutputs {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  analysis: CyberLiabilityCalculatorAnalysis;
}
