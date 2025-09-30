export interface a1c_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface a1c_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface a1c_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface a1c_calculatorOutputs {
  result: number;
  analysis: a1c_calculatorAnalysis;
}
