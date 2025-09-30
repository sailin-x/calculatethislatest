export interface inventory_turnover_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface inventory_turnover_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface inventory_turnover_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface inventory_turnover_calculatorOutputs {
  result: number;
  analysis: inventory_turnover_calculatorAnalysis;
}
