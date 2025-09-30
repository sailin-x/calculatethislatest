export interface ebitda_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ebitda_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ebitda_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ebitda_calculatorOutputs {
  result: number;
  analysis: ebitda_calculatorAnalysis;
}
