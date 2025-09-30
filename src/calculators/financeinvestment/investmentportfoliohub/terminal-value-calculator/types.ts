export interface terminal_value_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface terminal_value_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface terminal_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface terminal_value_calculatorOutputs {
  result: number;
  analysis: terminal_value_calculatorAnalysis;
}
