export interface reit_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface reit_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface reit_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface reit_calculatorOutputs {
  result: number;
  analysis: reit_calculatorAnalysis;
}
