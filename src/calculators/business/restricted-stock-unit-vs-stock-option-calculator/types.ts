export interface RestrictedStockUnitVsStockOptionCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface RestrictedStockUnitVsStockOptionCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface RestrictedStockUnitVsStockOptionCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface RestrictedStockUnitVsStockOptionCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: RestrictedStockUnitVsStockOptionCalculatorAnalysis;
}
