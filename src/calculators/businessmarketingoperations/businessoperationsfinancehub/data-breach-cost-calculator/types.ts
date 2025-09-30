export interface data_breach_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface data_breach_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface data_breach_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface data_breach_cost_calculatorOutputs {
  result: number;
  analysis: data_breach_cost_calculatorAnalysis;
}
