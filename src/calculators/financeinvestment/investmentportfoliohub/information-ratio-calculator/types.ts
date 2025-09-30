export interface information_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface information_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface information_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface information_ratio_calculatorOutputs {
  result: number;
  analysis: information_ratio_calculatorAnalysis;
}
