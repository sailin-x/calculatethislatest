export interface aviation_accident_compensation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface aviation_accident_compensation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface aviation_accident_compensation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface aviation_accident_compensation_calculatorOutputs {
  result: number;
  analysis: aviation_accident_compensation_calculatorAnalysis;
}
