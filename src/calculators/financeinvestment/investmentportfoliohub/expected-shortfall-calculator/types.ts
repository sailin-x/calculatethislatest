export interface expected_shortfall_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface expected_shortfall_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface expected_shortfall_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface expected_shortfall_calculatorOutputs {
  result: number;
  analysis: expected_shortfall_calculatorAnalysis;
}
