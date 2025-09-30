export interface expense_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface expense_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface expense_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface expense_ratio_calculatorOutputs {
  result: number;
  analysis: expense_ratio_calculatorAnalysis;
}
