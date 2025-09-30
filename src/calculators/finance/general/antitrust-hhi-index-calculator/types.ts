export interface antitrust_hhi_index_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface antitrust_hhi_index_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface antitrust_hhi_index_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface antitrust_hhi_index_calculatorOutputs {
  result: number;
  analysis: antitrust_hhi_index_calculatorAnalysis;
}
