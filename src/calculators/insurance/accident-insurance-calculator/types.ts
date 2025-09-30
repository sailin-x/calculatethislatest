export interface AccidentInsuranceCalculatorInputs {
  coverageAmount: number;
  premiumRate: number;
  policyTerm: number;
  riskFactors: number;
}

export interface AccidentInsuranceCalculatorMetrics {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  riskAdjustedRate: number;
}

export interface AccidentInsuranceCalculatorAnalysis {
  coverageAdequacy: string;
  premiumEfficiency: string;
  recommendations: string[];
}

export interface AccidentInsuranceCalculatorOutputs {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  analysis: AccidentInsuranceCalculatorAnalysis;
}
