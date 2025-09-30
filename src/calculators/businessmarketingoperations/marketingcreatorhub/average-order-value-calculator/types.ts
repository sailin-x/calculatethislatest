export interface average_order_value_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface average_order_value_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface average_order_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface average_order_value_calculatorOutputs {
  result: number;
  analysis: average_order_value_calculatorAnalysis;
}
