export interface construction_accident_claims_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface construction_accident_claims_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface construction_accident_claims_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface construction_accident_claims_calculatorOutputs {
  result: number;
  analysis: construction_accident_claims_calculatorAnalysis;
}
