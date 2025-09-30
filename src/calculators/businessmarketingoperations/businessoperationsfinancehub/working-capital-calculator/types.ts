export interface working_capital_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface working_capital_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface working_capital_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface working_capital_calculatorOutputs {
  result: number;
  analysis: working_capital_calculatorAnalysis;
}
