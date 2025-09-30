export interface roofing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface roofing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface roofing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface roofing_calculatorOutputs {
  result: number;
  analysis: roofing_calculatorAnalysis;
}
