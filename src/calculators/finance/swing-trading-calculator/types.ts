export interface SwingTradingCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface SwingTradingCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface SwingTradingCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface SwingTradingCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: SwingTradingCalculatorAnalysis;
}
