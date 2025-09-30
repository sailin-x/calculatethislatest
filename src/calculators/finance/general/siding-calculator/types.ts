export interface siding_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface siding_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface siding_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface siding_calculatorOutputs {
  result: number;
  analysis: siding_calculatorAnalysis;
}
