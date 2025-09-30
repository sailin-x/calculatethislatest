export interface stretch_ira_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface stretch_ira_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface stretch_ira_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface stretch_ira_calculatorOutputs {
  result: number;
  analysis: stretch_ira_calculatorAnalysis;
}
