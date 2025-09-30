export interface InvestmentGrowthCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface InvestmentGrowthCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface InvestmentGrowthCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface InvestmentGrowthCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: InvestmentGrowthCalculatorAnalysis;
}
