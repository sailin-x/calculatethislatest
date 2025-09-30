export interface paint_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface paint_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface paint_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface paint_calculatorOutputs {
  result: number;
  analysis: paint_calculatorAnalysis;
}
