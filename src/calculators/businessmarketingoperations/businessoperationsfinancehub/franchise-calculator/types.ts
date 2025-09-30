export interface franchise_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface franchise_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface franchise_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface franchise_calculatorOutputs {
  result: number;
  analysis: franchise_calculatorAnalysis;
}
