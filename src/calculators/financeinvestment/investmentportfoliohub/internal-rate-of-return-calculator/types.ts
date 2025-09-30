export interface internal_rate_of_return_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface internal_rate_of_return_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface internal_rate_of_return_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface internal_rate_of_return_calculatorOutputs {
  result: number;
  analysis: internal_rate_of_return_calculatorAnalysis;
}
