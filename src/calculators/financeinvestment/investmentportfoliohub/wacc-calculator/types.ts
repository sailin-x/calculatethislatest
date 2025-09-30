export interface wacc_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface wacc_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface wacc_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface wacc_calculatorOutputs {
  result: number;
  analysis: wacc_calculatorAnalysis;
}
