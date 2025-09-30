export interface RequiredBeginningDateRbdForRmdsCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface RequiredBeginningDateRbdForRmdsCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface RequiredBeginningDateRbdForRmdsCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface RequiredBeginningDateRbdForRmdsCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: RequiredBeginningDateRbdForRmdsCalculatorAnalysis;
}
