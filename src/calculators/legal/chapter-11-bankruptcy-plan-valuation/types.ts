export interface Chapter11BankruptcyPlanValuationInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface Chapter11BankruptcyPlanValuationMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface Chapter11BankruptcyPlanValuationAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface Chapter11BankruptcyPlanValuationOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: Chapter11BankruptcyPlanValuationAnalysis;
}
