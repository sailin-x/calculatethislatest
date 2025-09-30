export interface glycemic_index_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface glycemic_index_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface glycemic_index_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface glycemic_index_calculatorOutputs {
  result: number;
  analysis: glycemic_index_calculatorAnalysis;
}
