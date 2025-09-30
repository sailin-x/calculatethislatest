export interface simple_ira_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface simple_ira_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface simple_ira_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface simple_ira_calculatorOutputs {
  result: number;
  analysis: simple_ira_calculatorAnalysis;
}
