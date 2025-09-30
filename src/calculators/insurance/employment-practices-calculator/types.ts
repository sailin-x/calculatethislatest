export interface EmploymentPracticesCalculatorInputs {
  coverageAmount: number;
  premiumRate: number;
  policyTerm: number;
  riskFactors: number;
}

export interface EmploymentPracticesCalculatorMetrics {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  riskAdjustedRate: number;
}

export interface EmploymentPracticesCalculatorAnalysis {
  coverageAdequacy: string;
  premiumEfficiency: string;
  recommendations: string[];
}

export interface EmploymentPracticesCalculatorOutputs {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  analysis: EmploymentPracticesCalculatorAnalysis;
}
