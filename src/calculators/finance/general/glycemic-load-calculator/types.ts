export interface glycemic_load_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface glycemic_load_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface glycemic_load_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface glycemic_load_calculatorOutputs {
  result: number;
  analysis: glycemic_load_calculatorAnalysis;
}
