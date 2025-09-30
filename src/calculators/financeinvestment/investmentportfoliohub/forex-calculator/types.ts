export interface forex_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface forex_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface forex_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface forex_calculatorOutputs {
  result: number;
  analysis: forex_calculatorAnalysis;
}
