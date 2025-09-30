export interface leverage_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface leverage_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface leverage_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface leverage_ratio_calculatorOutputs {
  result: number;
  analysis: leverage_ratio_calculatorAnalysis;
}
