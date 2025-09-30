export interface management_fee_hurdle_rate_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface management_fee_hurdle_rate_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface management_fee_hurdle_rate_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface management_fee_hurdle_rate_calculatorOutputs {
  result: number;
  analysis: management_fee_hurdle_rate_calculatorAnalysis;
}
