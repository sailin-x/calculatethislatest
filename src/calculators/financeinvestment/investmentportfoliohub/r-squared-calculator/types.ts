export interface r_squared_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface r_squared_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface r_squared_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface r_squared_calculatorOutputs {
  result: number;
  analysis: r_squared_calculatorAnalysis;
}
