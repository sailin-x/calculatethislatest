export interface creatine_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface creatine_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface creatine_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface creatine_calculatorOutputs {
  result: number;
  analysis: creatine_calculatorAnalysis;
}
