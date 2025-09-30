export interface InheritanceTaxEstimatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface InheritanceTaxEstimatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface InheritanceTaxEstimatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface InheritanceTaxEstimatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: InheritanceTaxEstimatorAnalysis;
}
