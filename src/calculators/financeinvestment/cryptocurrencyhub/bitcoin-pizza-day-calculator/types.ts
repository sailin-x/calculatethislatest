export interface bitcoin_pizza_day_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface bitcoin_pizza_day_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface bitcoin_pizza_day_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface bitcoin_pizza_day_calculatorOutputs {
  result: number;
  analysis: bitcoin_pizza_day_calculatorAnalysis;
}
