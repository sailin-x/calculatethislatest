export interface yield_farming_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface yield_farming_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface yield_farming_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface yield_farming_calculatorOutputs {
  result: number;
  analysis: yield_farming_calculatorAnalysis;
}
