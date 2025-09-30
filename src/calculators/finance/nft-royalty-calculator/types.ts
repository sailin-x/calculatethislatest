export interface NftRoyaltyCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface NftRoyaltyCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface NftRoyaltyCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface NftRoyaltyCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: NftRoyaltyCalculatorAnalysis;
}
