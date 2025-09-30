export interface music_royalty_investment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface music_royalty_investment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface music_royalty_investment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface music_royalty_investment_calculatorOutputs {
  result: number;
  analysis: music_royalty_investment_calculatorAnalysis;
}
