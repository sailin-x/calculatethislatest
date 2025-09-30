export interface chaturbate_token_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface chaturbate_token_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface chaturbate_token_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface chaturbate_token_calculatorOutputs {
  result: number;
  analysis: chaturbate_token_calculatorAnalysis;
}
