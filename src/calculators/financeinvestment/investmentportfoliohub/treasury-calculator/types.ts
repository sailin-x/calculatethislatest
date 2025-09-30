export interface treasury_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface treasury_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface treasury_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface treasury_calculatorOutputs {
  result: number;
  analysis: treasury_calculatorAnalysis;
}
