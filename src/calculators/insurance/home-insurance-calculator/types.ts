export interface HomeInsuranceCalculatorInputs {
  coverageAmount: number;
  premiumRate: number;
  policyTerm: number;
  riskFactors: number;
}

export interface HomeInsuranceCalculatorMetrics {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  riskAdjustedRate: number;
}

export interface HomeInsuranceCalculatorAnalysis {
  coverageAdequacy: string;
  premiumEfficiency: string;
  recommendations: string[];
}

export interface HomeInsuranceCalculatorOutputs {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  analysis: HomeInsuranceCalculatorAnalysis;
}
