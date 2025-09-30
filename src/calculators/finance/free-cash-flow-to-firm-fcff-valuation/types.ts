export interface FreeCashFlowToFirmFcffValuationInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface FreeCashFlowToFirmFcffValuationMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface FreeCashFlowToFirmFcffValuationAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface FreeCashFlowToFirmFcffValuationOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: FreeCashFlowToFirmFcffValuationAnalysis;
}
