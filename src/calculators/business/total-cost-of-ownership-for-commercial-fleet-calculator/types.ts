export interface TotalCostOfOwnershipForCommercialFleetCalculatorInputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface TotalCostOfOwnershipForCommercialFleetCalculatorMetrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface TotalCostOfOwnershipForCommercialFleetCalculatorAnalysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface TotalCostOfOwnershipForCommercialFleetCalculatorOutputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: TotalCostOfOwnershipForCommercialFleetCalculatorAnalysis;
}
