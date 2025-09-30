export interface travel_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface travel_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface travel_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface travel_calculatorOutputs {
  result: number;
  analysis: travel_calculatorAnalysis;
}
