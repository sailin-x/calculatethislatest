export interface drug_royalty_rate_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface drug_royalty_rate_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface drug_royalty_rate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface drug_royalty_rate_calculatorOutputs {
  result: number;
  analysis: drug_royalty_rate_calculatorAnalysis;
}
