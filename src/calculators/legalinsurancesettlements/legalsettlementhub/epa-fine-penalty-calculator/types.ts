export interface epa_fine_penalty_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface epa_fine_penalty_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface epa_fine_penalty_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface epa_fine_penalty_calculatorOutputs {
  result: number;
  analysis: epa_fine_penalty_calculatorAnalysis;
}
