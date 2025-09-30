export interface FundLevelIrrTvpiAndDpiCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface FundLevelIrrTvpiAndDpiCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface FundLevelIrrTvpiAndDpiCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface FundLevelIrrTvpiAndDpiCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: FundLevelIrrTvpiAndDpiCalculatorAnalysis;
}
