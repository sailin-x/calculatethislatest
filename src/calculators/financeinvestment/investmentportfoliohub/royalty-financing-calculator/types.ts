export interface royalty_financing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface royalty_financing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface royalty_financing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface royalty_financing_calculatorOutputs {
  result: number;
  analysis: royalty_financing_calculatorAnalysis;
}
