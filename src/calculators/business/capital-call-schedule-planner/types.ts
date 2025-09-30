export interface CapitalCallSchedulePlannerInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface CapitalCallSchedulePlannerMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface CapitalCallSchedulePlannerAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface CapitalCallSchedulePlannerOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: CapitalCallSchedulePlannerAnalysis;
}
