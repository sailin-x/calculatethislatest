export interface graph_theory_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface graph_theory_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface graph_theory_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface graph_theory_calculatorOutputs {
  result: number;
  analysis: graph_theory_calculatorAnalysis;
}
