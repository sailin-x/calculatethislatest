export interface NetUnrealizedAppreciationNuaTaxCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface NetUnrealizedAppreciationNuaTaxCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface NetUnrealizedAppreciationNuaTaxCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface NetUnrealizedAppreciationNuaTaxCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: NetUnrealizedAppreciationNuaTaxCalculatorAnalysis;
}
