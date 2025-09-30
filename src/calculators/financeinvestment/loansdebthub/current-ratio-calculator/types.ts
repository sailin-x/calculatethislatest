export interface current_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface current_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface current_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface current_ratio_calculatorOutputs {
  result: number;
  analysis: current_ratio_calculatorAnalysis;
}
