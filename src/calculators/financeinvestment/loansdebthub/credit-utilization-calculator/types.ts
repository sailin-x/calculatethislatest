export interface credit_utilization_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface credit_utilization_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface credit_utilization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface credit_utilization_calculatorOutputs {
  result: number;
  analysis: credit_utilization_calculatorAnalysis;
}
