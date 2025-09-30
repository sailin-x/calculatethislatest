export interface combined_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface combined_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface combined_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface combined_ratio_calculatorOutputs {
  result: number;
  analysis: combined_ratio_calculatorAnalysis;
}
