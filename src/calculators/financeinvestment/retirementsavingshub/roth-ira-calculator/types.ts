export interface roth_ira_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface roth_ira_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface roth_ira_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface roth_ira_calculatorOutputs {
  result: number;
  analysis: roth_ira_calculatorAnalysis;
}
