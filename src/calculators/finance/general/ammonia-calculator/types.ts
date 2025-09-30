export interface ammonia_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ammonia_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ammonia_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ammonia_calculatorOutputs {
  result: number;
  analysis: ammonia_calculatorAnalysis;
}
