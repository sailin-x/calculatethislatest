export interface sep_ira_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface sep_ira_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface sep_ira_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface sep_ira_calculatorOutputs {
  result: number;
  analysis: sep_ira_calculatorAnalysis;
}
