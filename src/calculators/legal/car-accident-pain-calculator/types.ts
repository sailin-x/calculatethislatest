export interface CarAccidentPainCalculatorInputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface CarAccidentPainCalculatorMetrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface CarAccidentPainCalculatorAnalysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface CarAccidentPainCalculatorOutputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: CarAccidentPainCalculatorAnalysis;
}
