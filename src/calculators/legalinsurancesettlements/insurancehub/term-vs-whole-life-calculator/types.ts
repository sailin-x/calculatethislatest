export interface term_vs_whole_life_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface term_vs_whole_life_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface term_vs_whole_life_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface term_vs_whole_life_calculatorOutputs {
  result: number;
  analysis: term_vs_whole_life_calculatorAnalysis;
}
