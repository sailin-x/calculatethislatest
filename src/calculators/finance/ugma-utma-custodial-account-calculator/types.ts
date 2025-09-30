export interface UgmaUtmaCustodialAccountCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface UgmaUtmaCustodialAccountCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface UgmaUtmaCustodialAccountCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface UgmaUtmaCustodialAccountCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: UgmaUtmaCustodialAccountCalculatorAnalysis;
}
