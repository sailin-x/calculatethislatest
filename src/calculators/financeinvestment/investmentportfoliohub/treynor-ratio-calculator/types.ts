export interface treynor_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface treynor_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface treynor_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface treynor_ratio_calculatorOutputs {
  result: number;
  analysis: treynor_ratio_calculatorAnalysis;
}
