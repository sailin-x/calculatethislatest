export interface consultant_utilization_rate_profitability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface consultant_utilization_rate_profitability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface consultant_utilization_rate_profitability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface consultant_utilization_rate_profitability_calculatorOutputs {
  result: number;
  analysis: consultant_utilization_rate_profitability_calculatorAnalysis;
}
