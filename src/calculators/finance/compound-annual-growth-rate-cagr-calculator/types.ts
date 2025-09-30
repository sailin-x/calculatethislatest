export interface CompoundAnnualGrowthRateCagrCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface CompoundAnnualGrowthRateCagrCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface CompoundAnnualGrowthRateCagrCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface CompoundAnnualGrowthRateCagrCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: CompoundAnnualGrowthRateCagrCalculatorAnalysis;
}
