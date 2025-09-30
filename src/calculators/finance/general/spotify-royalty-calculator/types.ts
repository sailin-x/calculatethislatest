export interface spotify_royalty_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface spotify_royalty_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface spotify_royalty_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface spotify_royalty_calculatorOutputs {
  result: number;
  analysis: spotify_royalty_calculatorAnalysis;
}
