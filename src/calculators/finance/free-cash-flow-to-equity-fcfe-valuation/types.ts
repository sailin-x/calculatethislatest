export interface FreeCashFlowToEquityFcfeValuationInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface FreeCashFlowToEquityFcfeValuationMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface FreeCashFlowToEquityFcfeValuationAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface FreeCashFlowToEquityFcfeValuationOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: FreeCashFlowToEquityFcfeValuationAnalysis;
}
