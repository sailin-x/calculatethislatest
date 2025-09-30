export interface SocialSecurityOptimizationCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface SocialSecurityOptimizationCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface SocialSecurityOptimizationCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface SocialSecurityOptimizationCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: SocialSecurityOptimizationCalculatorAnalysis;
}
